/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    (win[namespace] = win[namespace] || {}).components = components;
    if (!win.customElements) {
        // temporary customElements polyfill only for "whenDefined"
        // this is incase customElements.whenDefined('my-tag') is
        // used before the polyfill is downloaded
        win.$whenDefined = [];
        win.customElements = {
            whenDefined: function (tag) {
                return {
                    then: function (cb) {
                        win.$whenDefined.push([tag, cb]);
                    }
                };
            }
        };
    }
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force es2015 build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        // Need to look for define specifically because we polyfill customElements
        // above to support whenDefined.
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // force es5 build w/ polyfills
        return true;
    }
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}


init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "App","app",0,"app.core.js","es5-build-disabled.js","hydrated",[["app-home","app-home",1],["app-match","app-match",1,[["isFinished",5],["loading",5],["locals",5],["match",5],["matchId",1,0,"match-id",2],["visitors",5]]],["app-play",{"ios":"app-play.ios","md":"app-play.md"},1,[["filteredPersons",5],["loading",5],["players",5],["toastCtrl",4,0,0,0,"ion-toast-controller"],["users",5]]],["app-profile",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["name",1,0,1,2],["notify",5],["swSupport",5],["toastCtrl",4,0,0,0,"ion-toast-controller"]],0,[["ionChange","subscribeToNotify"]]],["ion-animation-controller","ion-animation-controller",0,[["create",6]]],["ion-app",{"ios":"my-app.ios","md":"my-app.md"},1,[["config",3,0,0,0,"config"],["el",7]]],["ion-avatar",{"ios":"ion-avatar.ios","md":"ion-avatar.md"},1],["ion-back-button",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["config",3,0,0,0,"config"],["defaultHref",1,0,"default-href",2],["el",7],["icon",1,0,1,2],["mode",1],["text",1]]],["ion-button",{"ios":"ion-button.ios","md":"ion-button.md"},1,[["buttonType",2,0,"button-type",2],["color",1,0,1,2],["disabled",1,0,1,3],["el",7],["expand",1],["fill",1],["goBack",1,0,"go-back",3],["href",1,0,1,2],["keyFocus",5],["mode",1],["round",1,0,1,3],["size",1],["strong",1,0,1,3],["type",1,0,1,2]]],["ion-buttons",{"ios":"app-profile.ios","md":"app-profile.md"}],["ion-card",{"ios":"app-play.ios","md":"app-play.md"},1,[["color",1,0,1,2],["mode",1]]],["ion-content",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["config",3,0,0,0,"config"],["dom",3,0,0,0,"dom"],["el",7],["forceOverscroll",1,0,"force-overscroll",3],["fullscreen",1,0,1,3],["scrollByPoint",6],["scrollEnabled",1,0,"scroll-enabled",3],["scrollEvents",1,0,"scroll-events",3],["scrollToBottom",6],["scrollToPoint",6],["scrollToTop",6]],0,[["body:ionNavDidChange","onNavChanged"]]],["ion-footer",{"ios":"app-play.ios","md":"app-play.md"},1,[["translucent",1,0,1,3]]],["ion-gesture","ion-gesture",0,[["attachTo",1],["autoBlockAll",1,0,"auto-block-all",3],["canStart",1],["direction",1,0,1,2],["disableScroll",1,0,"disable-scroll",3],["disabled",1,0,1,3],["dom",3,0,0,0,"dom"],["enableListener",3,0,0,0,"enableListener"],["gestureCtrl",4,0,0,0,"ion-gesture-controller"],["gestureName",1,0,"gesture-name",2],["gesturePriority",1,0,"gesture-priority",4],["maxAngle",1,0,"max-angle",4],["notCaptured",1],["onEnd",1],["onMove",1],["onPress",1],["onStart",1],["onWillStart",1],["passive",1,0,1,3],["threshold",1,0,1,4],["type",1,0,1,2]],0,[["document:mousemove","onMoveMove",1,1],["document:mouseup","onMouseUp",1,1],["mousedown","onMouseDown",1,1],["touchcancel","onTouchCancel",1,1],["touchend","onTouchCancel",1,1],["touchmove","onTouchMove",1,1],["touchstart","onTouchStart",1,1]]],["ion-gesture-controller","ion-gesture",0,[["create",6],["createBlocker",6]]],["ion-header",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["translucent",1,0,1,3]]],["ion-icon","ion-icon",1,[["ariaLabel",1,0,1,2],["color",1,0,1,2],["ios",1,0,1,2],["isServer",3,0,0,0,"isServer"],["md",1,0,1,2],["mode",3,0,0,0,"mode"],["name",1,0,1,2],["publicPath",3,0,0,0,"publicPath"],["size",1,0,1,2],["svgContent",5]]],["ion-input-shims",{"ios":"my-app.ios","md":"my-app.md"},0,[["config",3,0,0,0,"config"]],0,[["body:ionInputDidLoad","onInputDidLoad"],["body:ionInputDidUnload","onInputDidUnload"]]],["ion-item",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["button",1,0,1,3],["color",1,0,1,2],["detail",1,0,1,3],["disabled",1,0,1,3],["el",7],["goBack",1,0,"go-back",3],["hasStyleChange",5],["href",1,0,1,2],["mode",1]],0,[["ionStyle","itemStyle"]]],["ion-label",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["color",1,0,1,2],["el",7],["fixed",1,0,1,3],["floating",1,0,1,3],["getText",6],["mode",1],["stacked",1,0,1,3]]],["ion-list",{"ios":"app-play.ios","md":"app-play.md"},1,[["closeSlidingItems",6],["getOpenItem",6],["setOpenItem",6]]],["ion-nav",{"ios":"my-app.ios","md":"my-app.md"},0,[["animated",2,0,1,3],["animationCtrl",4,0,0,0,"ion-animation-controller"],["canGoBack",6],["config",3,0,0,0,"config"],["delegate",1],["dom",3,0,0,0,"dom"],["el",7],["getActive",6],["getByIndex",6],["getPrevious",6],["getRouteId",6],["insert",6],["insertPages",6],["length",6],["pop",6],["popTo",6],["popToRoot",6],["push",6],["removeIndex",6],["root",1],["rootParams",1],["setPages",6],["setRoot",6],["setRouteId",6],["swipeBackEnabled",2,0,"swipe-back-enabled",3]]],["ion-ripple-effect","ion-ripple-effect",1,[["addRipple",6],["dom",3,0,0,0,"dom"],["el",7],["enableListener",3,0,0,0,"enableListener"],["useTapClick",1,0,"use-tap-click",3]],0,[["mousedown","mouseDown",1,1],["parent:ionActivated","ionActivated",1],["touchstart","touchStart",1,1]]],["ion-route",{"ios":"my-app.ios","md":"my-app.md"},0,[["component",1,0,1,2],["componentProps",1],["url",1,0,1,2]]],["ion-router",{"ios":"my-app.ios","md":"my-app.md"},0,[["base",1,0,1,2],["config",3,0,0,0,"config"],["dom",3,0,0,0,"dom"],["el",7],["navChanged",6],["push",6],["useHash",1,0,"use-hash",3]],0,[["ionRouteDataChanged","onRoutesChanged"],["ionRouteRedirectChanged","onRedirectChanged"],["window:popstate","onPopState"]]],["ion-scroll",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["config",3,0,0,0,"config"],["dom",3,0,0,0,"dom"],["el",7],["forceOverscroll",2,0,"force-overscroll",3],["mode",1,0,1,2],["scrollByPoint",6],["scrollEvents",1,0,"scroll-events",3],["scrollToBottom",6],["scrollToPoint",6],["scrollToTop",6]],0,[["scroll","onScroll",0,1]]],["ion-searchbar",{"ios":"app-play.ios","md":"app-play.md"},1,[["activated",5],["animated",1,0,1,3],["autocomplete",1,0,1,2],["autocorrect",1,0,1,2],["cancelButtonText",1,0,"cancel-button-text",2],["color",1,0,1,2],["debounce",1,0,1,4],["el",7],["focused",5],["mode",1],["placeholder",1,0,1,2],["showCancelButton",1,0,"show-cancel-button",3],["spellcheck",1,0,1,3],["type",1,0,1,2],["value",2,0,1,2]]],["ion-status-tap",{"ios":"my-app.ios","md":"my-app.md"},0,[["dom",3,0,0,0,"dom"],["duration",1,0,1,4]],0,[["window:statusTap","onStatusTap"]]],["ion-tap-click",{"ios":"my-app.ios","md":"my-app.md"},0,[["el",7],["enableListener",3,0,0,0,"enableListener"],["isServer",3,0,0,0,"isServer"]],0,[["body:click","onBodyClick",0,0,1],["body:ionGestureCaptured","cancelActive"],["body:ionScrollStart","cancelActive"],["document:mousedown","onMouseDown",0,1,1],["document:mouseup","onMouseUp",0,0,1],["document:touchcancel","onTouchEnd",0,0,1],["document:touchend","onTouchEnd",0,0,1],["document:touchstart","onTouchStart",0,1,1]]],["ion-title",{"ios":"ion-content.ios","md":"ion-content.md"},1],["ion-toast",{"ios":"ion-toast.ios","md":"ion-toast.md"},1,[["animationCtrl",4,0,0,0,"ion-animation-controller"],["closeButtonText",1,0,"close-button-text",2],["config",3,0,0,0,"config"],["cssClass",1],["dismiss",6],["dismissOnPageChange",1,0,"dismiss-on-page-change",3],["duration",1,0,1,4],["el",7],["enterAnimation",1],["keyboardClose",1,0,"keyboard-close",3],["leaveAnimation",1],["message",1,0,1,2],["onDidDismiss",6],["onWillDismiss",6],["overlayId",1,0,"overlay-id",4],["position",1,0,1,2],["present",6],["showCloseButton",1,0,"show-close-button",3],["translucent",1,0,1,3],["willAnimate",1,0,"will-animate",3]],0,[["ionDismiss","onDismiss"]]],["ion-toast-controller",{"ios":"app-profile.ios","md":"app-profile.md"},0,[["create",6],["dismiss",6],["getTop",6]],0,[["body:ionToastDidUnload","toastWillDismiss"],["body:ionToastWillDismiss","toastWillDismiss"],["body:ionToastWillPresent","toastWillPresent"],["body:keyup.escape","escapeKeyUp"]]],["ion-toggle",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["activated",5],["checked",2,0,1,3],["color",1,0,1,2],["disabled",2,0,1,3],["keyFocus",5],["mode",1],["name",2,0,1,2],["value",1,0,1,2]]],["ion-toolbar",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["color",1,0,1,2],["config",3,0,0,0,"config"],["mode",1],["translucent",1,0,1,3]]],["lazy-img","lazy-img",1,[["alt",1,0,1,2],["el",7],["oldSrc",5],["src",1,0,1,2],["width",1,0,1,4]]],["my-app",{"ios":"my-app.ios","md":"my-app.md"},1,[["toastCtrl",4,0,0,0,"ion-toast-controller"]],0,[["body:ionToastWillDismiss","reload"]]]]);