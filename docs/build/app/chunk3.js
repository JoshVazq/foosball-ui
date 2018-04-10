/*! Built with http://stenciljs.com */
const { h } = window.App;

let lastId = 1;
function createOverlay(element, opts) {
    // convert the passed in overlay options into props
    // that get passed down into the new alert
    Object.assign(element, opts);
    element.overlayId = lastId++;
    // append the alert element to the document body
    const appRoot = document.querySelector('ion-app') || document.body;
    appRoot.appendChild(element);
    return element.componentOnReady();
}
function dismissOverlay(data, role, overlays, id) {
    id = id >= 0 ? id : getHighestId(overlays);
    const overlay = overlays.get(id);
    if (!overlay) {
        return Promise.reject('overlay does not exist');
    }
    return overlay.dismiss(data, role);
}
function getTopOverlay(overlays) {
    return overlays.get(getHighestId(overlays));
}
function getHighestId(overlays) {
    let minimum = -1;
    overlays.forEach((_, id) => {
        if (id > minimum) {
            minimum = id;
        }
    });
    return minimum;
}
function removeLastOverlay(overlays) {
    const toRemove = getTopOverlay(overlays);
    return toRemove ? toRemove.dismiss() : Promise.resolve();
}
async function present(overlay, name, iosEnterAnimation, mdEnterAnimation, opts) {
    if (overlay.presented) {
        return;
    }
    overlay.presented = true;
    overlay.willPresent.emit();
    // get the user's animation fn if one was provided
    const animationBuilder = (overlay.enterAnimation)
        ? overlay.enterAnimation
        : overlay.config.get(name, overlay.mode === 'ios' ? iosEnterAnimation : mdEnterAnimation);
    await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    overlay.didPresent.emit();
}
async function dismiss(overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) {
    if (!overlay.presented) {
        return;
    }
    overlay.presented = false;
    overlay.willDismiss.emit({ data, role });
    const animationBuilder = (overlay.leaveAnimation)
        ? overlay.leaveAnimation
        : overlay.config.get(name, overlay.mode === 'ios' ? iosLeaveAnimation : mdLeaveAnimation);
    await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    overlay.didDismiss.emit({ data, role });
    overlay.el.remove();
}
async function overlayAnimation(overlay, animationBuilder, baseEl, opts) {
    if (overlay.keyboardClose) {
        closeKeyboard();
    }
    if (overlay.animation) {
        overlay.animation.destroy();
        overlay.animation = undefined;
    }
    const animation = overlay.animation = await overlay.animationCtrl.create(animationBuilder, baseEl, opts);
    overlay.animation = animation;
    if (!overlay.willAnimate) {
        animation.duration(0);
    }
    await animation.playAsync();
    animation.destroy();
    overlay.animation = undefined;
}
function eventMethod(element, eventName, callback) {
    let resolve;
    const promise = new Promise(r => resolve = r);
    onceEvent(element, eventName, (event) => {
        const detail = event.detail;
        callback && callback(detail);
        resolve(detail);
    });
    return promise;
}
function onceEvent(element, eventName, callback) {
    const handler = (ev) => {
        element.removeEventListener(eventName, handler);
        callback(ev);
    };
    element.addEventListener(eventName, handler);
}
function closeKeyboard() {
    const activeElement = document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
}

export { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay, dismiss, eventMethod, present };
