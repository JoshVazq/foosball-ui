/*! Built with http://stenciljs.com */
const { h } = window.App;

import { createThemedClasses, getClassMap } from './chunk2.js';
import { dismiss, eventMethod, present } from './chunk3.js';

/**
 * iOS Toast Enter Animation
 */
function iosEnterAnimation(Animation, baseEl, position) {
    const baseAnimation = new Animation();
    const wrapperAnimation = new Animation();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', '10px');
            break;
        case 'middle':
            const topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', '-10px');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * iOS Toast Leave Animation
 */
function iosLeaveAnimation(Animation, baseEl, position) {
    const baseAnimation = new Animation();
    const wrapperAnimation = new Animation();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', `${10}px`, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', `${0 - 10}px`, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

/**
 * MD Toast Enter Animation
 */
function mdEnterAnimation(Animation, baseEl, position) {
    const baseAnimation = new Animation();
    const wrapperAnimation = new Animation();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', '0%');
            break;
        case 'middle':
            const topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', '0%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * md Toast Leave Animation
 */
function mdLeaveAnimation(Animation, baseEl, position) {
    const baseAnimation = new Animation();
    const wrapperAnimation = new Animation();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '0px', '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', `0px`, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

class Toast {
    constructor() {
        this.presented = false;
        this.keyboardClose = false;
        /**
         * If true, the close button will be displayed. Defaults to `false`.
         */
        this.showCloseButton = false;
        /**
         * If true, the toast will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the toast will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    componentDidLoad() {
        this.ionToastDidLoad.emit();
    }
    componentDidUnload() {
        this.ionToastDidUnload.emit();
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    /**
     * Present the toast overlay after it has been created.
     */
    async present() {
        await present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    /**
     * Dismiss the toast overlay after it has been presented.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    /**
     * Returns a promise that resolves when the toast did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onDidDismiss();
     * ```
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionToastDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the toast will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onWillDismiss();
     * ```
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionToastWillDismiss', callback);
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'toast-translucent') : {};
        return {
            class: Object.assign({}, themedClasses, getClassMap(this.cssClass))
        };
    }
    render() {
        const position = this.position ? this.position : 'bottom';
        const wrapperClass = {
            'toast-wrapper': true,
            [`toast-${position}`]: true
        };
        return (h("div", { class: wrapperClass },
            h("div", { class: 'toast-container' },
                this.message
                    ? h("div", { class: 'toast-message' }, this.message)
                    : null,
                this.showCloseButton
                    ? h("ion-button", { fill: 'clear', color: 'light', class: 'toast-button', onClick: () => this.dismiss() }, this.closeButtonText || 'Close')
                    : null)));
    }
    static get is() { return "ion-toast"; }
    static get host() { return { "theme": "toast" }; }
    static get properties() { return { "animationCtrl": { "connect": "ion-animation-controller" }, "closeButtonText": { "type": String, "attr": "close-button-text" }, "config": { "context": "config" }, "cssClass": { "type": "Any", "attr": "css-class" }, "dismiss": { "method": true }, "dismissOnPageChange": { "type": Boolean, "attr": "dismiss-on-page-change" }, "duration": { "type": Number, "attr": "duration" }, "el": { "elementRef": true }, "enterAnimation": { "type": "Any", "attr": "enter-animation" }, "keyboardClose": { "type": Boolean, "attr": "keyboard-close" }, "leaveAnimation": { "type": "Any", "attr": "leave-animation" }, "message": { "type": String, "attr": "message" }, "onDidDismiss": { "method": true }, "onWillDismiss": { "method": true }, "overlayId": { "type": Number, "attr": "overlay-id" }, "position": { "type": String, "attr": "position" }, "present": { "method": true }, "showCloseButton": { "type": Boolean, "attr": "show-close-button" }, "translucent": { "type": Boolean, "attr": "translucent" }, "willAnimate": { "type": Boolean, "attr": "will-animate" } }; }
    static get events() { return [{ "name": "ionToastDidLoad", "method": "ionToastDidLoad", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionToastDidPresent", "method": "didPresent", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionToastWillPresent", "method": "willPresent", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionToastWillDismiss", "method": "willDismiss", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionToastDidDismiss", "method": "didDismiss", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionToastDidUnload", "method": "ionToastDidUnload", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "ion-toast {\n  left: 0;\n  top: 0;\n  position: absolute;\n  z-index: 1000;\n  display: block;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  contain: strict;\n}\n\n.toast-container {\n  display: flex;\n  align-items: center;\n  pointer-events: auto;\n  contain: content;\n}\n\n.toast-button {\n  font-size: 15px;\n}\n\n.toast-message {\n  flex: 1;\n}\n\n.toast-md {\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n}\n\n.toast-md .toast-wrapper {\n  left: 0;\n  right: 0;\n  margin: auto;\n  position: absolute;\n  z-index: 10;\n  display: block;\n  width: 100%;\n  max-width: 700px;\n  background: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n}\n\n.toast-md .toast-wrapper.toast-top {\n  transform: translate3d(0,  -100%,  0);\n  top: 0;\n}\n\n.toast-md .toast-wrapper.toast-bottom {\n  transform: translate3d(0,  100%,  0);\n  bottom: 0;\n}\n\n.toast-md .toast-wrapper.toast-middle {\n  opacity: .01;\n}\n\n.toast-md .toast-message {\n  padding: 19px 16px 17px;\n  font-size: 15px;\n  color: var(--ion-background-md-color, var(--ion-background-color, #fff));\n}"; }
    static get styleMode() { return "md"; }
}

export { Toast as IonToast };
