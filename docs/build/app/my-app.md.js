/*! Built with http://stenciljs.com */
const { h } = window.App;

import { pointerCoord, assert, now } from './chunk1.js';

class MyApp {
    componentDidLoad() {
        /*
          Handle service worker updates correctly.
          This code will show a toast letting the
          user of the PWA know that there is a
          new version available. When they click the
          reload button it then reloads the page
          so that the new service worker can take over
          and serve the fresh content
        */
        window.addEventListener('swUpdate', () => {
            this.toastCtrl.create({
                message: 'New version available',
                showCloseButton: true,
                closeButtonText: 'Reload'
            }).then((toast) => {
                toast.present();
            });
        });
    }
    reload() {
        window.location.reload();
    }
    render() {
        return (h("ion-app", null,
            h("main", null,
                h("ion-router", { useHash: false },
                    h("ion-route", { url: '/', component: 'app-play' }),
                    h("ion-route", { url: '/match/:matchId', component: 'app-match' }),
                    h("ion-route", { url: '/profile/:name', component: 'app-profile' }),
                    h("ion-nav", null)))));
    }
    static get is() { return "my-app"; }
    static get properties() { return { "toastCtrl": { "connect": "ion-toast-controller" } }; }
    static get style() { return ""; }
}

class App {
    constructor() {
        this.isDevice = false;
        this.deviceHacks = false;
    }
    componentWillLoad() {
        this.isDevice = this.config.getBoolean('isDevice', false);
        this.deviceHacks = this.config.getBoolean('deviceHacks', false);
    }
    hostData() {
        const mode = this.config.get('mode');
        const hoverCSS = this.config.getBoolean('hoverCSS', false);
        return {
            class: {
                [mode]: true,
                'enable-hover': hoverCSS
            }
        };
    }
    render() {
        return [
            this.deviceHacks && h("ion-input-shims", null),
            h("ion-tap-click", null),
            this.isDevice && h("ion-status-tap", null),
            h("slot", null)
        ];
    }
    static get is() { return "ion-app"; }
    static get host() { return { "theme": "app" }; }
    static get properties() { return { "config": { "context": "config" }, "el": { "elementRef": true } }; }
    static get style() { return "audio,\ncanvas,\nprogress,\nvideo {\n  vertical-align: baseline;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\nb,\nstrong {\n  font-weight: bold;\n}\n\nimg {\n  max-width: 100%;\n  border: 0;\n}\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\nfigure {\n  margin: 1em 40px;\n}\n\nhr {\n  height: 1px;\n  border-width: 0;\n  box-sizing: content-box;\n}\n\npre {\n  overflow: auto;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nlabel,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  line-height: normal;\n}\n\ntextarea {\n  overflow: auto;\n  height: auto;\n  font: inherit;\n  color: inherit;\n}\n\ntextarea::placeholder {\n  padding-left: 2px;\n}\n\nform,\ninput,\noptgroup,\nselect {\n  margin: 0;\n  font: inherit;\n  color: inherit;\n}\n\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  cursor: pointer;\n  -webkit-appearance: button;\n}\n\na,\na div,\na span,\na ion-icon,\na ion-label,\nbutton,\nbutton div,\nbutton span,\nbutton ion-icon,\nbutton ion-label,\n[tappable],\n[tappable] div,\n[tappable] span,\n[tappable] ion-icon,\n[tappable] ion-label,\ninput,\ntextarea {\n  touch-action: manipulation;\n}\n\na ion-label,\nbutton ion-label {\n  pointer-events: none;\n}\n\nbutton {\n  border: 0;\n  border-radius: 0;\n  font-family: inherit;\n  font-style: inherit;\n  font-variant: inherit;\n  line-height: 1;\n  text-transform: none;\n  cursor: pointer;\n  -webkit-appearance: button;\n}\n\n[tappable] {\n  cursor: pointer;\n}\n\na[disabled],\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  padding: 0;\n  box-sizing: border-box;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n.hide,\n[hidden],\ntemplate {\n  display: none !important;\n}\n\n.sticky {\n  position: sticky;\n  top: 0;\n}\n\n.click-block {\n  display: none;\n}\n\n.click-block-enabled {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  transform: translate3d(0,  -100%,  0) translateY(1px);\n  position: absolute;\n  z-index: 99999;\n  display: block;\n  opacity: 0;\n  contain: strict;\n}\n\n.click-block-active {\n  transform: translate3d(0,  0,  0);\n}\n\n* {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nhtml {\n  width: 100%;\n  height: 100%;\n  text-size-adjust: 100%;\n}\n\nbody {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin: 0;\n  padding: 0;\n  position: fixed;\n  overflow: hidden;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 100%;\n  text-rendering: optimizeLegibility;\n  -webkit-user-drag: none;\n  -ms-content-zooming: none;\n  touch-action: manipulation;\n  word-wrap: break-word;\n  overscroll-behavior-y: contain;\n  text-size-adjust: none;\n  user-select: none;\n}\n\na {\n  background-color: transparent;\n}\n\n.enable-hover a:not(.button):hover {\n  opacity: .7;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 16px;\n  margin-bottom: 10px;\n  font-weight: 500;\n  line-height: 1.2;\n}\n\nh1 {\n  margin-top: 20px;\n  font-size: 26px;\n}\n\nh2 {\n  margin-top: 18px;\n  font-size: 24px;\n}\n\nh3 {\n  font-size: 22px;\n}\n\nh4 {\n  font-size: 20px;\n}\n\nh5 {\n  font-size: 18px;\n}\n\nh6 {\n  font-size: 16px;\n}\n\nsmall {\n  font-size: 75%;\n}\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -.5em;\n}\n\nsub {\n  bottom: -.25em;\n}\n\nion-app,\nion-router-outlet,\nion-tab,\nion-tabs,\nion-nav,\n.ion-page {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  z-index: 0;\n  overflow: hidden;\n  contain: layout size style;\n}\n\nion-app,\n.ion-page {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.hide-page {\n  opacity: 0;\n}\n\n.nav-decor {\n  display: none;\n}\n\n.show-decor > .nav-decor {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  z-index: 0;\n  display: block;\n  background: #000;\n  pointer-events: none;\n}\n\nion-route,\nion-route-controller,\nion-animation-controller,\nion-nav-controller,\nion-menu-controller,\nion-action-sheet-controller,\nion-alert-controller,\nion-loading-controller,\nion-modal-controller,\nion-picker-controller,\nion-toast-controller,\n[app-viewport],\n[overlay-portal],\n[nav-viewport],\n[tab-portal] {\n  display: none;\n}\n\n[text-center] {\n  text-align: center !important;\n}\n\n[text-justify] {\n  text-align: justify !important;\n}\n\n[text-start] {\n  text-align: left;\n  text-align: start !important;\n}\n\n[text-end] {\n  text-align: right;\n  text-align: end !important;\n}\n\n[text-left] {\n  text-align: left !important;\n}\n\n[text-right] {\n  text-align: right !important;\n}\n\n[text-nowrap] {\n  white-space: nowrap !important;\n}\n\n[text-wrap] {\n  white-space: normal !important;\n}\n\n\@media (min-width: 576px) {\n  [text-sm-center] {\n    text-align: center !important;\n  }\n  [text-sm-justify] {\n    text-align: justify !important;\n  }\n  [text-sm-start] {\n    text-align: left;\n    text-align: start !important;\n  }\n  [text-sm-end] {\n    text-align: right;\n    text-align: end !important;\n  }\n  [text-sm-left] {\n    text-align: left !important;\n  }\n  [text-sm-right] {\n    text-align: right !important;\n  }\n  [text-sm-nowrap] {\n    white-space: nowrap !important;\n  }\n  [text-sm-wrap] {\n    white-space: normal !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  [text-md-center] {\n    text-align: center !important;\n  }\n  [text-md-justify] {\n    text-align: justify !important;\n  }\n  [text-md-start] {\n    text-align: left;\n    text-align: start !important;\n  }\n  [text-md-end] {\n    text-align: right;\n    text-align: end !important;\n  }\n  [text-md-left] {\n    text-align: left !important;\n  }\n  [text-md-right] {\n    text-align: right !important;\n  }\n  [text-md-nowrap] {\n    white-space: nowrap !important;\n  }\n  [text-md-wrap] {\n    white-space: normal !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  [text-lg-center] {\n    text-align: center !important;\n  }\n  [text-lg-justify] {\n    text-align: justify !important;\n  }\n  [text-lg-start] {\n    text-align: left;\n    text-align: start !important;\n  }\n  [text-lg-end] {\n    text-align: right;\n    text-align: end !important;\n  }\n  [text-lg-left] {\n    text-align: left !important;\n  }\n  [text-lg-right] {\n    text-align: right !important;\n  }\n  [text-lg-nowrap] {\n    white-space: nowrap !important;\n  }\n  [text-lg-wrap] {\n    white-space: normal !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  [text-xl-center] {\n    text-align: center !important;\n  }\n  [text-xl-justify] {\n    text-align: justify !important;\n  }\n  [text-xl-start] {\n    text-align: left;\n    text-align: start !important;\n  }\n  [text-xl-end] {\n    text-align: right;\n    text-align: end !important;\n  }\n  [text-xl-left] {\n    text-align: left !important;\n  }\n  [text-xl-right] {\n    text-align: right !important;\n  }\n  [text-xl-nowrap] {\n    white-space: nowrap !important;\n  }\n  [text-xl-wrap] {\n    white-space: normal !important;\n  }\n}\n\n[text-uppercase] {\n  text-transform: uppercase !important;\n}\n\n[text-lowercase] {\n  text-transform: lowercase !important;\n}\n\n[text-capitalize] {\n  text-transform: capitalize !important;\n}\n\n\@media (min-width: 576px) {\n  [text-sm-uppercase] {\n    text-transform: uppercase !important;\n  }\n  [text-sm-lowercase] {\n    text-transform: lowercase !important;\n  }\n  [text-sm-capitalize] {\n    text-transform: capitalize !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  [text-md-uppercase] {\n    text-transform: uppercase !important;\n  }\n  [text-md-lowercase] {\n    text-transform: lowercase !important;\n  }\n  [text-md-capitalize] {\n    text-transform: capitalize !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  [text-lg-uppercase] {\n    text-transform: uppercase !important;\n  }\n  [text-lg-lowercase] {\n    text-transform: lowercase !important;\n  }\n  [text-lg-capitalize] {\n    text-transform: capitalize !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  [text-xl-uppercase] {\n    text-transform: uppercase !important;\n  }\n  [text-xl-lowercase] {\n    text-transform: lowercase !important;\n  }\n  [text-xl-capitalize] {\n    text-transform: capitalize !important;\n  }\n}\n\n[float-left] {\n  float: left !important;\n}\n\n[float-right] {\n  float: right !important;\n}\n\n[float-start] {\n  float: left !important;\n}\n\n[float-end] {\n  float: right !important;\n}\n\n\@media (min-width: 576px) {\n  [float-sm-left] {\n    float: left !important;\n  }\n  [float-sm-right] {\n    float: right !important;\n  }\n  [float-sm-start] {\n    float: left !important;\n  }\n  [float-sm-end] {\n    float: right !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  [float-md-left] {\n    float: left !important;\n  }\n  [float-md-right] {\n    float: right !important;\n  }\n  [float-md-start] {\n    float: left !important;\n  }\n  [float-md-end] {\n    float: right !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  [float-lg-left] {\n    float: left !important;\n  }\n  [float-lg-right] {\n    float: right !important;\n  }\n  [float-lg-start] {\n    float: left !important;\n  }\n  [float-lg-end] {\n    float: right !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  [float-xl-left] {\n    float: left !important;\n  }\n  [float-xl-right] {\n    float: right !important;\n  }\n  [float-xl-start] {\n    float: left !important;\n  }\n  [float-xl-end] {\n    float: right !important;\n  }\n}\n\nion-app [no-padding],\nion-app [no-padding] .scroll-inner {\n  padding: 0;\n}\n\nion-app [no-margin],\nion-app [no-margin] ion-scroll {\n  margin: 0;\n}\n\n.app-md {\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  background-color: var(--ion-background-md-color, var(--ion-background-color, #fff));\n}\n\n.app-md ion-tabs ion-tabbar:not(.placement-top) {\n  padding-bottom: calc(constant(safe-area-inset-bottom) + 0);\n  padding-bottom: calc(env(safe-area-inset-bottom) + 0);\n  height: calc(56px + constant(safe-area-inset-bottom));\n  height: calc(56px + env(safe-area-inset-bottom));\n}\n\n.app-md ion-footer .toolbar:last-child {\n  padding-bottom: calc(constant(safe-area-inset-bottom) + 4px);\n  padding-bottom: calc(env(safe-area-inset-bottom) + 4px);\n  min-height: calc(56px + constant(safe-area-inset-bottom));\n  min-height: calc(56px + env(safe-area-inset-bottom));\n}\n\n.app-md .ion-page > .toolbar.statusbar-padding:first-child,\n.app-md .ion-page > ion-header > .toolbar.statusbar-padding:first-child,\n.app-md ion-tab ion-nav .ion-page > ion-header > .toolbar.statusbar-padding:first-child,\n.app-md ion-menu > .menu-inner > .toolbar.statusbar-padding:first-child,\n.app-md ion-menu > .menu-inner > ion-header > .toolbar.statusbar-padding:first-child {\n  padding-top: calc(20px + 4px);\n  padding-top: calc(constant(safe-area-inset-top) + 4px);\n  padding-top: calc(env(safe-area-inset-top) + 4px);\n  min-height: calc(56px + 20px);\n  min-height: calc(56px + constant(safe-area-inset-top));\n  min-height: calc(56px + env(safe-area-inset-top));\n}\n\n.app-md .ion-page > ion-content.statusbar-padding:first-child .scroll-content,\n.app-md .ion-page > ion-header > ion-content.statusbar-padding:first-child .scroll-content,\n.app-md ion-tab ion-nav .ion-page > ion-header > ion-content.statusbar-padding:first-child .scroll-content,\n.app-md ion-menu > .menu-inner > ion-content.statusbar-padding:first-child .scroll-content,\n.app-md ion-menu > .menu-inner > ion-header > ion-content.statusbar-padding:first-child .scroll-content {\n  padding-top: 20px;\n  padding-top: calc(constant(safe-area-inset-top) + 0px);\n  padding-top: calc(env(safe-area-inset-top) + 0px);\n}\n\n.app-md .ion-page > ion-content.statusbar-padding:first-child[padding] .scroll-content,\n.app-md .ion-page > ion-content.statusbar-padding:first-child[padding-top] .scroll-content,\n.app-md .ion-page > ion-header > ion-content.statusbar-padding:first-child[padding] .scroll-content,\n.app-md .ion-page > ion-header > ion-content.statusbar-padding:first-child[padding-top] .scroll-content,\n.app-md ion-tab ion-nav .ion-page > ion-header > ion-content.statusbar-padding:first-child[padding] .scroll-content,\n.app-md ion-tab ion-nav .ion-page > ion-header > ion-content.statusbar-padding:first-child[padding-top] .scroll-content,\n.app-md ion-menu > .menu-inner > ion-content.statusbar-padding:first-child[padding] .scroll-content,\n.app-md ion-menu > .menu-inner > ion-content.statusbar-padding:first-child[padding-top] .scroll-content,\n.app-md ion-menu > .menu-inner > ion-header > ion-content.statusbar-padding:first-child[padding] .scroll-content,\n.app-md ion-menu > .menu-inner > ion-header > ion-content.statusbar-padding:first-child[padding-top] .scroll-content {\n  padding-top: calc(16px + 20px);\n  padding-top: calc(constant(safe-area-inset-top) + 0px);\n  padding-top: calc(env(safe-area-inset-top) + 0px);\n}\n\na {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.app-md [padding],\n.app-md [padding] .scroll-inner {\n  padding: 16px;\n}\n\n.app-md [padding-top],\n.app-md [padding-top] .scroll-inner {\n  padding-top: 16px;\n}\n\n.app-md [padding-left],\n.app-md [padding-left] .scroll-inner {\n  padding-left: 16px;\n}\n\n.app-md [padding-right],\n.app-md [padding-right] .scroll-inner {\n  padding-right: 16px;\n}\n\n.app-md [padding-bottom],\n.app-md [padding-bottom] .scroll-inner {\n  padding-bottom: 16px;\n}\n\n.app-md [padding-vertical],\n.app-md [padding-vertical] .scroll-inner {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n\n.app-md [padding-horizontal],\n.app-md [padding-horizontal] .scroll-inner {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.app-md [margin],\n.app-md [margin] .scroll-inner {\n  margin: 16px;\n}\n\n.app-md [margin-top],\n.app-md [margin-top] .scroll-inner {\n  margin-top: 16px;\n}\n\n.app-md [margin-left],\n.app-md [margin-left] .scroll-inner {\n  margin-left: 16px;\n}\n\n.app-md [margin-start],\n.app-md [margin-start] .scroll-inner {\n  margin-left: 16px;\n}\n\n.app-md [margin-right],\n.app-md [margin-right] .scroll-inner {\n  margin-right: 16px;\n}\n\n.app-md [margin-end],\n.app-md [margin-end] .scroll-inner {\n  margin-right: 16px;\n}\n\n.app-md [margin-bottom],\n.app-md [margin-bottom] .scroll-inner {\n  margin-bottom: 16px;\n}\n\n.app-md [margin-vertical],\n.app-md [margin-vertical] .scroll-inner {\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n\n.app-md [margin-horizontal],\n.app-md [margin-horizontal] .scroll-inner {\n  margin-left: 16px;\n  margin-right: 16px;\n}"; }
    static get styleMode() { return "md"; }
}

const RELOCATED_KEY = '$ionRelocated';
function relocateInput(componentEl, inputEl, shouldRelocate, inputRelativeY = 0) {
    if (componentEl[RELOCATED_KEY] === shouldRelocate) {
        return;
    }
    console.debug(`native-input, hideCaret, shouldHideCaret: ${shouldRelocate}, input value: ${inputEl.value}`);
    if (shouldRelocate) {
        // this allows for the actual input to receive the focus from
        // the user's touch event, but before it receives focus, it
        // moves the actual input to a location that will not screw
        // up the app's layout, and does not allow the native browser
        // to attempt to scroll the input into place (messing up headers/footers)
        // the cloned input fills the area of where native input should be
        // while the native input fakes out the browser by relocating itself
        // before it receives the actual focus event
        // We hide the focused input (with the visible caret) invisiable by making it scale(0),
        cloneInputComponent(componentEl, inputEl);
        const tx = document.dir === 'rtl' ? 9999 : -9999;
        inputEl.style.transform = `translate3d(${tx}px,${inputRelativeY}px,0)`;
        // TODO
        // inputEle.style.opacity = '0';
    }
    else {
        removeClone(componentEl, inputEl);
    }
    componentEl[RELOCATED_KEY] = shouldRelocate;
}
function isFocused(input) {
    return input === document.activeElement;
}
function removeClone(componentEl, inputEl) {
    if (componentEl && componentEl.parentElement) {
        const clonedInputEles = componentEl.parentElement.querySelectorAll('.cloned-input');
        for (let i = 0; i < clonedInputEles.length; i++) {
            clonedInputEles[i].remove();
        }
        componentEl.style.pointerEvents = '';
    }
    inputEl.style['transform'] = '';
    inputEl.style.opacity = '';
}
function cloneInputComponent(componentEl, inputEl) {
    // Make sure we kill all the clones before creating new ones
    // It is a defensive, removeClone() should do nothing
    // removeClone(plt, srcComponentEle, srcNativeInputEle);
    // given a native <input> or <textarea> element
    // find its parent wrapping component like <ion-input> or <ion-textarea>
    // then clone the entire component
    const parentElement = componentEl.parentElement;
    if (componentEl && parentElement) {
        // DOM READ
        const srcTop = componentEl.offsetTop;
        const srcLeft = componentEl.offsetLeft;
        const srcWidth = componentEl.offsetWidth;
        const srcHeight = componentEl.offsetHeight;
        // DOM WRITE
        // not using deep clone so we don't pull in unnecessary nodes
        const clonedComponentEle = document.createElement('div');
        const clonedStyle = clonedComponentEle.style;
        clonedComponentEle.classList.add(...Array.from(componentEl.classList));
        clonedComponentEle.classList.add('cloned-input');
        clonedComponentEle.setAttribute('aria-hidden', 'true');
        clonedStyle.pointerEvents = 'none';
        clonedStyle.position = 'absolute';
        clonedStyle.top = srcTop + 'px';
        clonedStyle.left = srcLeft + 'px';
        clonedStyle.width = srcWidth + 'px';
        clonedStyle.height = srcHeight + 'px';
        const clonedInputEl = document.createElement('input');
        clonedInputEl.classList.add(...Array.from(inputEl.classList));
        clonedInputEl.value = inputEl.value;
        clonedInputEl.type = inputEl.type;
        clonedInputEl.placeholder = inputEl.placeholder;
        clonedInputEl.tabIndex = -1;
        clonedComponentEle.appendChild(clonedInputEl);
        parentElement.appendChild(clonedComponentEle);
        componentEl.style.pointerEvents = 'none';
    }
    inputEl.style.transform = 'scale(0)';
}

function enableHideCaretOnScroll(componentEl, inputEl, scrollEl) {
    if (!scrollEl || !inputEl) {
        return () => { return; };
    }
    console.debug('Input: enableHideCaretOnScroll');
    const scrollHideCaret = (shouldHideCaret) => {
        // console.log('scrollHideCaret', shouldHideCaret)
        if (isFocused(inputEl)) {
            relocateInput(componentEl, inputEl, shouldHideCaret);
        }
    };
    const onBlur = () => relocateInput(componentEl, inputEl, false);
    const hideCaret = () => scrollHideCaret(true);
    const showCaret = () => scrollHideCaret(false);
    scrollEl && scrollEl.addEventListener('ionScrollStart', hideCaret);
    scrollEl && scrollEl.addEventListener('ionScrollEnd', showCaret);
    inputEl.addEventListener('blur', onBlur);
    return () => {
        scrollEl.removeEventListener('ionScrollStart', hideCaret);
        scrollEl.removeEventListener('ionScrollEnd', showCaret);
        inputEl.addEventListener('ionBlur', onBlur);
    };
}

const SKIP_BLURRING = ['INPUT', 'TEXTAREA', 'ION-INPUT', 'ION-TEXTAREA'];
function enableInputBlurring() {
    console.debug('Input: enableInputBlurring');
    let focused = true;
    let didScroll = false;
    function onScroll() {
        didScroll = true;
    }
    function onFocusin() {
        focused = true;
    }
    function onTouchend(ev) {
        // if app did scroll return early
        if (didScroll) {
            didScroll = false;
            return;
        }
        const active = document.activeElement;
        if (!active) {
            return;
        }
        // only blur if the active element is a text-input or a textarea
        if (SKIP_BLURRING.indexOf(active.tagName) === -1) {
            return;
        }
        // if the selected target is the active element, do not blur
        const tapped = ev.target;
        if (tapped === active) {
            return;
        }
        if (SKIP_BLURRING.indexOf(tapped.tagName) >= 0) {
            return;
        }
        // skip if div is a cover
        if (tapped.classList.contains('input-cover')) {
            return;
        }
        focused = false;
        // TODO: find a better way, why 50ms?
        setTimeout(() => {
            if (!focused) {
                active.blur();
            }
        }, 50);
    }
    document.addEventListener('ionScrollStart', onScroll);
    document.addEventListener('focusin', onFocusin, true);
    document.addEventListener('touchend', onTouchend, false);
    return () => {
        document.removeEventListener('ionScrollStart', onScroll, true);
        document.removeEventListener('focusin', onFocusin, true);
        document.removeEventListener('touchend', onTouchend, false);
    };
}

const SCROLL_ASSIST_SPEED = 0.3;
function getScrollData(componentEl, contentEl, keyboardHeight) {
    if (!contentEl) {
        return {
            scrollAmount: 0,
            scrollPadding: 0,
            scrollDuration: 0,
            inputSafeY: 0,
        };
    }
    // const scrollData = (componentEl as any)[SCROLL_DATA_KEY];
    // if (scrollData) {
    //   return scrollData;
    // }
    const itemEl = componentEl.closest('ion-item,[ion-item]') || componentEl;
    const newScrollData = calcScrollData(itemEl.getBoundingClientRect(), contentEl.getBoundingClientRect(), keyboardHeight, window.innerHeight);
    // (componentEl as any)[SCROLL_DATA_KEY] = newScrollData;
    return newScrollData;
}
function calcScrollData(inputRect, contentRect, keyboardHeight, plaformHeight) {
    // compute input's Y values relative to the body
    const inputTop = inputRect.top;
    const inputBottom = inputRect.bottom;
    // compute visible area
    const visibleAreaTop = contentRect.top;
    const visibleAreaBottom = Math.min(contentRect.bottom, plaformHeight - keyboardHeight);
    // compute safe area
    const safeAreaTop = visibleAreaTop + 10;
    const safeAreaBottom = visibleAreaBottom / 2.0;
    // figure out if each edge of teh input is within the safe area
    const distanceToBottom = safeAreaBottom - inputBottom;
    const distanceToTop = safeAreaTop - inputTop;
    // The scrollAmount is the negated distance to the safe area.
    const scrollAmount = Math.round((distanceToBottom < 0)
        ? -distanceToBottom
        : (distanceToTop > 0)
            ? -distanceToTop
            : 0);
    const distance = Math.abs(scrollAmount);
    const duration = distance / SCROLL_ASSIST_SPEED;
    const scrollDuration = Math.min(400, Math.max(150, duration));
    return {
        scrollAmount,
        scrollDuration,
        scrollPadding: keyboardHeight,
        inputSafeY: -(inputTop - safeAreaTop) + 4
    };
}

function enableScrollAssist(componentEl, inputEl, contentEl, keyboardHeight) {
    let coord;
    const touchStart = (ev) => {
        coord = pointerCoord(ev);
        console.debug(`input-base, pointerStart, type: ${ev.type}`);
    };
    const touchEnd = (ev) => {
        // input cover touchend/mouseup
        console.debug(`input-base, pointerEnd, type: ${ev.type}`);
        if (!coord) {
            return;
        }
        // get where the touchend/mouseup ended
        const endCoord = pointerCoord(ev);
        // focus this input if the pointer hasn't moved XX pixels
        // and the input doesn't already have focus
        if (!hasPointerMoved(6, coord, endCoord) && !isFocused(inputEl)) {
            ev.preventDefault();
            ev.stopPropagation();
            // begin the input focus process
            jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight);
        }
    };
    componentEl.addEventListener('touchstart', touchStart, true);
    componentEl.addEventListener('touchend', touchEnd, true);
    return () => {
        componentEl.removeEventListener('touchstart', touchStart, true);
        componentEl.removeEventListener('touchend', touchEnd, true);
    };
}
function jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight) {
    const scrollData = getScrollData(componentEl, contentEl, keyboardHeight);
    if (Math.abs(scrollData.scrollAmount) < 4) {
        // the text input is in a safe position that doesn't
        // require it to be scrolled into view, just set focus now
        inputEl.focus();
        return;
    }
    // temporarily move the focus to the focus holder so the browser
    // doesn't freak out while it's trying to get the input in place
    // at this point the native text input still does not have focus
    relocateInput(componentEl, inputEl, true, scrollData.inputSafeY);
    inputEl.focus();
    // scroll the input into place
    contentEl.scrollByPoint(0, scrollData.scrollAmount, scrollData.scrollDuration, () => {
        // the scroll view is in the correct position now
        // give the native text input focus
        relocateInput(componentEl, inputEl, false, scrollData.inputSafeY);
        // ensure this is the focused input
        inputEl.focus();
    });
}
function hasPointerMoved(threshold, startCoord, endCoord) {
    if (startCoord && endCoord) {
        const deltaX = (startCoord.x - endCoord.x);
        const deltaY = (startCoord.y - endCoord.y);
        const distance = deltaX * deltaX + deltaY * deltaY;
        return distance > (threshold * threshold);
    }
    return false;
}

const PADDING_TIMER_KEY = '$ionPaddingTimer';
function enableScrollPadding(keyboardHeight) {
    console.debug('Input: enableScrollPadding');
    function onFocusin(ev) {
        setScrollPadding(ev.target, keyboardHeight);
    }
    function onFocusout(ev) {
        setScrollPadding(ev.target, 0);
    }
    document.addEventListener('focusin', onFocusin);
    document.addEventListener('focusout', onFocusout);
    return () => {
        document.removeEventListener('focusin', onFocusin);
        document.removeEventListener('focusout', onFocusout);
    };
}
function setScrollPadding(input, keyboardHeight) {
    if (input.tagName !== 'INPUT') {
        return;
    }
    if (input.parentElement.tagName === 'ION-INPUT') {
        return;
    }
    const el = input.closest('.scroll-inner');
    if (!el) {
        return;
    }
    const timer = el[PADDING_TIMER_KEY];
    if (timer) {
        clearTimeout(timer);
    }
    if (keyboardHeight > 0) {
        el.style.paddingBottom = keyboardHeight + 'px';
    }
    else {
        el[PADDING_TIMER_KEY] = setTimeout(() => {
            el.style.paddingBottom = '';
        }, 120);
    }
}

const INPUT_BLURRING = true;
const SCROLL_ASSIST = true;
const SCROLL_PADDING = true;
const HIDE_CARET = true;
class InputShims {
    constructor() {
        this.didLoad = false;
        this.hideCaret = false;
        this.scrollAssist = false;
        this.keyboardHeight = 0;
        this.hideCaretMap = new WeakMap();
        this.scrollAssistMap = new WeakMap();
    }
    componentDidLoad() {
        this.keyboardHeight = this.config.getNumber('keyboardHeight', 290);
        this.scrollAssist = this.config.getBoolean('scrollAssist', true);
        this.hideCaret = this.config.getBoolean('hideCaretOnScroll', true);
        const inputBlurring = this.config.getBoolean('inputBlurring', true);
        if (inputBlurring && INPUT_BLURRING) {
            enableInputBlurring();
        }
        const scrollPadding = this.config.getBoolean('scrollPadding', true);
        if (scrollPadding && SCROLL_PADDING) {
            enableScrollPadding(this.keyboardHeight);
        }
        // Input might be already loaded in the DOM before ion-device-hacks did.
        // At this point we need to look for all the ion-inputs not registered yet
        // and register them.
        const inputs = Array.from(document.querySelectorAll('ion-input'));
        for (const input of inputs) {
            this.registerInput(input);
        }
        this.didLoad = true;
    }
    onInputDidLoad(event) {
        if (this.didLoad) {
            this.registerInput(event.detail);
        }
    }
    onInputDidUnload(event) {
        if (this.didLoad) {
            this.unregisterInput(event.detail);
        }
    }
    registerInput(componentEl) {
        const inputEl = componentEl.querySelector('input');
        const scrollEl = componentEl.closest('ion-scroll');
        const contentEl = componentEl.closest('ion-content');
        if (HIDE_CARET && this.hideCaret && !this.hideCaretMap.has(componentEl)) {
            const rmFn = enableHideCaretOnScroll(componentEl, inputEl, scrollEl);
            this.hideCaretMap.set(componentEl, rmFn);
        }
        if (SCROLL_ASSIST && this.scrollAssist && !this.scrollAssistMap.has(componentEl)) {
            const rmFn = enableScrollAssist(componentEl, inputEl, contentEl, this.keyboardHeight);
            this.scrollAssistMap.set(componentEl, rmFn);
        }
    }
    unregisterInput(componentEl) {
        if (HIDE_CARET && this.hideCaret) {
            const fn = this.hideCaretMap.get(componentEl);
            fn && fn();
            this.hideCaretMap.delete(componentEl);
        }
        if (SCROLL_ASSIST && this.scrollAssist) {
            const fn = this.scrollAssistMap.get(componentEl);
            fn && fn();
            this.scrollAssistMap.delete(componentEl);
        }
    }
    static get is() { return "ion-input-shims"; }
    static get properties() { return { "config": { "context": "config" } }; }
}

function attachComponent(delegate, container, component, cssClasses, componentProps) {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? document.createElement(component)
        : component;
    cssClasses && cssClasses.forEach(c => el.classList.add(c));
    componentProps && Object.assign(el, componentProps);
    container.appendChild(el);
    if (el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve(el);
}

class ViewController {
    constructor(component, params) {
        this.component = component;
        this.params = params;
        this.state = 1 /* New */;
    }
    /**
     * @hidden
     */
    async init(container) {
        this.state = 2 /* Attached */;
        if (!this.element) {
            const component = this.component;
            this.element = await attachComponent(this.delegate, container, component, ['ion-page', 'hide-page'], this.params);
        }
    }
    /**
     * @hidden
     * DOM WRITE
     */
    _destroy() {
        assert(this.state !== 3 /* Destroyed */, 'view state must be ATTACHED');
        const element = this.element;
        if (element) {
            if (this.delegate) {
                this.delegate.removeViewFromDom(element.parentElement, element);
            }
            else {
                element.remove();
            }
        }
        this.nav = null;
        this.state = 3 /* Destroyed */;
    }
}
function matches(view, id, params) {
    if (!view) {
        return false;
    }
    if (view.component !== id) {
        return false;
    }
    const currentParams = view.params;
    const null1 = (currentParams == null);
    const null2 = (params == null);
    if (null1 !== null2) {
        return false;
    }
    if (null1 && null2) {
        return true;
    }
    const keysA = Object.keys(currentParams);
    const keysB = Object.keys(params);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (currentParams[key] !== params[key]) {
            return false;
        }
    }
    return true;
}

function convertToView(page, params) {
    if (!page) {
        return null;
    }
    if (page instanceof ViewController) {
        return page;
    }
    return new ViewController(page, params);
}
function convertToViews(pages) {
    return pages.map(page => {
        if (page instanceof ViewController) {
            return page;
        }
        if ('page' in page) {
            return convertToView(page.page, page.params);
        }
        return convertToView(page, undefined);
    }).filter(v => v !== null);
}

let MyCustomEvent = CustomEvent;
function transition(opts) {
    beforeTransition(opts);
    return (opts.enteringEl && opts.leavingEl && (opts.animationBuilder || opts.animation))
        ? animation(opts)
        : noAnimation(opts); // fast path for no animation
}
function beforeTransition(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (enteringEl) {
        if (opts.showGoBack) {
            enteringEl.classList.add('can-go-back');
        }
        else {
            enteringEl.classList.remove('can-go-back');
        }
        enteringEl.hidden = false;
    }
    if (leavingEl) {
        leavingEl.hidden = false;
    }
}
async function animation(opts) {
    await waitDeepReady(opts);
    const transition = await createTransition(opts);
    fireWillEvents(opts.enteringEl, opts.leavingEl);
    await playTransition(transition, opts);
    if (transition.hasCompleted) {
        fireDidEvents(opts.enteringEl, opts.leavingEl);
    }
    return transition;
}
async function noAnimation(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    enteringEl && enteringEl.classList.remove('hide-page');
    leavingEl && leavingEl.classList.remove('hide-page');
    await waitShallowReady(opts);
    fireWillEvents(enteringEl, leavingEl);
    fireDidEvents(enteringEl, leavingEl);
    return undefined;
}
async function waitDeepReady(opts) {
    await Promise.all([
        deepReady(opts.enteringEl),
        deepReady(opts.leavingEl)
    ]);
    await notifyViewReady(opts.viewIsReady, opts.enteringEl);
}
async function waitShallowReady(opts) {
    await Promise.all([
        shallowReady(opts.enteringEl),
        shallowReady(opts.leavingEl)
    ]);
    await notifyViewReady(opts.viewIsReady, opts.enteringEl);
}
async function notifyViewReady(viewIsReady, enteringEl) {
    if (viewIsReady) {
        await viewIsReady(enteringEl);
    }
}
function createTransition(opts) {
    if (opts.animation) {
        return opts.animation;
    }
    return opts.animationCtrl.create(opts.animationBuilder, opts.baseEl, opts);
}
function playTransition(transition, opts) {
    const progressAnimation = opts.progressAnimation;
    const promise = new Promise(resolve => transition.onFinish(resolve));
    // cool, let's do this, start the transition
    if (progressAnimation) {
        // this is a swipe to go back, just get the transition progress ready
        // kick off the swipe animation start
        transition.progressStart();
        progressAnimation(transition);
    }
    else {
        // only the top level transition should actually start "play"
        // kick it off and let it play through
        // ******** DOM WRITE ****************
        transition.play();
    }
    // create a callback for when the animation is done
    return promise;
}
function fireWillEvents(enteringEl, leavingEl) {
    lifecycle(leavingEl, "ionViewWillLeave" /* WillLeave */);
    lifecycle(enteringEl, "ionViewWillEnter" /* WillEnter */);
}
function fireDidEvents(enteringEl, leavingEl) {
    lifecycle(enteringEl, "ionViewDidEnter" /* DidEnter */);
    lifecycle(leavingEl, "ionViewDidLeave" /* DidLeave */);
}
function lifecycle(el, lifecycle) {
    if (el) {
        const event = new MyCustomEvent(lifecycle, {
            bubbles: false,
            cancelable: false
        });
        el.dispatchEvent(event);
    }
}
function shallowReady(el) {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
}
function deepReady(el) {
    if (!el) {
        return Promise.resolve();
    }
    if (el.componentOnReady) {
        return el.componentOnReady();
    }
    else {
        return Promise.all(Array.from(el.children).map(deepReady));
    }
}
function setZIndex(enteringEl, leavingEl, direction) {
    if (enteringEl) {
        enteringEl.style.zIndex = (direction === "back" /* Back */)
            ? '99'
            : '101';
    }
    if (leavingEl) {
        leavingEl.style.zIndex = '100';
    }
}

const DURATION = 500;
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
const OPACITY = 'opacity';
const TRANSFORM = 'transform';
const TRANSLATEX = 'translateX';
const CENTER = '0%';
const OFF_OPACITY = 0.8;
function iosTransitionAnimation(Animation, navEl, opts) {
    const isRTL = document.dir === 'rtl';
    const OFF_RIGHT = isRTL ? '-99.5%' : '99.5%';
    const OFF_LEFT = isRTL ? '33%' : '-33%';
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    const rootTransition = new Animation();
    rootTransition
        .addElement(enteringEl)
        .duration(opts.duration || DURATION)
        .easing(opts.easing || EASING)
        .beforeRemoveClass('hide-page');
    if (leavingEl && navEl) {
        const navDecor = new Animation();
        navDecor
            .addElement(navEl)
            .duringAddClass('show-decor');
        rootTransition.add(navDecor);
    }
    const backDirection = (opts.direction === 'back');
    // setting up enter view
    if (enteringEl) {
        const contentEl = enteringEl.querySelector(':scope > ion-content');
        const headerEls = enteringEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *');
        const enteringToolBarEle = enteringEl.querySelector(':scope > ion-header > ion-toolbar');
        const enteringContent = new Animation();
        if (!contentEl && !enteringToolBarEle && headerEls.length === 0) {
            enteringContent.addElement(enteringEl.querySelector(':scope > ion-page, :scope > ion-nav, :scope > ion-tabs'));
        }
        else {
            enteringContent.addElement(contentEl);
            enteringContent.addElement(headerEls);
        }
        rootTransition.add(enteringContent);
        if (backDirection) {
            enteringContent
                .beforeClearStyles([OPACITY])
                .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
                .fromTo(OPACITY, OFF_OPACITY, 1, true);
        }
        else {
            // entering content, forward direction
            enteringContent
                .beforeClearStyles([OPACITY])
                .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
        }
        if (enteringToolBarEle) {
            const enteringToolBar = new Animation();
            enteringToolBar.addElement(enteringToolBarEle);
            rootTransition.add(enteringToolBar);
            const enteringTitle = new Animation();
            enteringTitle.addElement(enteringToolBarEle.querySelector('ion-title'));
            const enteringToolBarItems = new Animation();
            enteringToolBarItems.addElement(enteringToolBarEle.querySelectorAll('ion-buttons,[menuToggle]'));
            const enteringToolBarBg = new Animation();
            enteringToolBarBg.addElement(enteringToolBarEle.querySelector('.toolbar-background'));
            const enteringBackButton = new Animation();
            enteringBackButton.addElement(enteringToolBarEle.querySelector('ion-back-button'));
            enteringToolBar
                .add(enteringTitle)
                .add(enteringToolBarItems)
                .add(enteringToolBarBg)
                .add(enteringBackButton);
            enteringTitle.fromTo(OPACITY, 0.01, 1, true);
            enteringToolBarItems.fromTo(OPACITY, 0.01, 1, true);
            if (backDirection) {
                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true);
                // back direction, entering page has a back button
                enteringBackButton.fromTo(OPACITY, 0.01, 1, true);
            }
            else {
                // entering toolbar, forward direction
                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                enteringToolBarBg
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, 0.01, 1, true);
                // forward direction, entering page has a back button
                enteringBackButton.fromTo(OPACITY, 0.01, 1, true);
                const enteringBackBtnText = new Animation();
                enteringBackBtnText
                    .addElement(enteringToolBarEle.querySelector('ion-back-button .button-text'))
                    .fromTo(TRANSLATEX, (isRTL ? '-100px' : '100px'), '0px');
                enteringToolBar.add(enteringBackBtnText);
            }
        }
    }
    // setup leaving view
    if (leavingEl) {
        const leavingContent = new Animation();
        leavingContent.addElement(leavingEl.querySelector(':scope > ion-content'));
        leavingContent.addElement(leavingEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *'));
        rootTransition.add(leavingContent);
        if (backDirection) {
            // leaving content, back direction
            leavingContent
                .beforeClearStyles([OPACITY])
                .fromTo(TRANSLATEX, CENTER, (isRTL ? '-100%' : '100%'));
        }
        else {
            // leaving content, forward direction
            leavingContent
                .fromTo(TRANSLATEX, CENTER, OFF_LEFT, true)
                .fromTo(OPACITY, 1, OFF_OPACITY, true);
        }
        const leavingToolBarEle = leavingEl.querySelector(':scope > ion-header > ion-toolbar');
        if (leavingToolBarEle) {
            const leavingToolBar = new Animation();
            leavingToolBar.addElement(leavingToolBarEle);
            const leavingTitle = new Animation();
            leavingTitle.addElement(leavingToolBarEle.querySelector('ion-title'));
            const leavingToolBarItems = new Animation();
            leavingToolBarItems.addElement(leavingToolBarEle.querySelectorAll('ion-buttons,[menuToggle]'));
            const leavingToolBarBg = new Animation();
            leavingToolBarBg.addElement(leavingToolBarEle.querySelector('.toolbar-background'));
            const leavingBackButton = new Animation();
            leavingBackButton.addElement(leavingToolBarEle.querySelector('ion-back-button'));
            leavingToolBar
                .add(leavingTitle)
                .add(leavingToolBarItems)
                .add(leavingBackButton)
                .add(leavingToolBarBg);
            rootTransition.add(leavingToolBar);
            // fade out leaving toolbar items
            leavingBackButton.fromTo(OPACITY, 0.99, 0, true);
            leavingTitle.fromTo(OPACITY, 0.99, 0, true);
            leavingToolBarItems.fromTo(OPACITY, 0.99, 0, true);
            if (backDirection) {
                // leaving toolbar, back direction
                leavingTitle.fromTo(TRANSLATEX, CENTER, (isRTL ? '-100%' : '100%'));
                // leaving toolbar, back direction, and there's no entering toolbar
                // should just slide out, no fading out
                leavingToolBarBg
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, 1, 0.01, true);
                const leavingBackBtnText = new Animation();
                leavingBackBtnText.addElement(leavingToolBarEle.querySelector('ion-back-button .button-text'));
                leavingBackBtnText.fromTo(TRANSLATEX, CENTER, (isRTL ? -124 : 124) + 'px');
                leavingToolBar.add(leavingBackBtnText);
            }
            else {
                // leaving toolbar, forward direction
                leavingTitle
                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                    .afterClearStyles([TRANSFORM]);
                leavingBackButton.afterClearStyles([OPACITY]);
                leavingTitle.afterClearStyles([OPACITY]);
                leavingToolBarItems.afterClearStyles([OPACITY]);
            }
        }
    }
    // Return the rootTransition promise
    return Promise.resolve(rootTransition);
}

const TRANSLATEY = 'translateY';
const OFF_BOTTOM = '40px';
const CENTER$1 = '0px';
function mdTransitionAnimation(Animation, _, opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    const ionPageElement = getIonPageElement(enteringEl);
    const rootTransition = new Animation();
    rootTransition
        .addElement(ionPageElement)
        .beforeRemoveClass('hide-page');
    const backDirection = (opts.direction === 'back');
    if (enteringEl) {
        // animate the component itself
        if (backDirection) {
            rootTransition
                .duration(opts.duration || 200)
                .easing('cubic-bezier(0.47,0,0.745,0.715)');
        }
        else {
            rootTransition
                .duration(opts.duration || 280)
                .easing('cubic-bezier(0.36,0.66,0.04,1)')
                .fromTo(TRANSLATEY, OFF_BOTTOM, CENTER$1, true)
                .fromTo('opacity', 0.01, 1, true);
        }
        // Animate toolbar if it's there
        const enteringToolbarEle = ionPageElement.querySelector('ion-toolbar');
        if (enteringToolbarEle) {
            const enteringToolBar = new Animation();
            enteringToolBar.addElement(enteringToolbarEle);
            rootTransition.add(enteringToolBar);
        }
    }
    // setup leaving view
    if (leavingEl && backDirection) {
        // leaving content
        rootTransition
            .duration(opts.duration || 200)
            .easing('cubic-bezier(0.47,0,0.745,0.715)');
        const leavingPage = new Animation();
        leavingPage
            .addElement(getIonPageElement(leavingEl))
            .fromTo(TRANSLATEY, CENTER$1, OFF_BOTTOM)
            .fromTo('opacity', 1, 0);
        rootTransition.add(leavingPage);
    }
    return Promise.resolve(rootTransition);
}
function getIonPageElement(element) {
    if (element.classList.contains('ion-page')) {
        return element;
    }
    const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
    if (ionPage) {
        return ionPage;
    }
    // idk, return the original element so at least something animates and we don't have a null pointer
    return element;
}

class Nav {
    constructor() {
        this.init = false;
        this.queue = [];
        this.useRouter = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
    }
    rootChanged() {
        if (this.root) {
            if (!this.useRouter) {
                this.setRoot(this.root, this.rootParams);
            }
            else {}
        }
    }
    componentWillLoad() {
        this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
        if (this.swipeBackEnabled === undefined) {
            this.swipeBackEnabled = this.config.getBoolean('swipeBackEnabled', this.mode === 'ios');
        }
        if (this.animated === undefined) {
            this.animated = this.config.getBoolean('animate', true);
        }
    }
    componentDidLoad() {
        this.rootChanged();
    }
    componentDidUnload() {
        for (const view of this.views) {
            lifecycle(view.element, "ionViewWillUnload" /* WillUnload */);
            view._destroy();
        }
        // release swipe back gesture and transition
        this.sbTrns && this.sbTrns.destroy();
        this.queue = this.views = this.sbTrns = null;
        this.destroyed = true;
    }
    push(component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: -1,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts,
        }, done);
    }
    insert(insertIndex, component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts,
        }, done);
    }
    insertPages(insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: insertComponents,
            opts: opts,
        }, done);
    }
    pop(opts, done) {
        return this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, done);
    }
    popTo(indexOrViewCtrl, opts, done) {
        const config = {
            removeStart: -1,
            removeCount: -1,
            opts: opts
        };
        if (indexOrViewCtrl instanceof ViewController) {
            config.removeView = indexOrViewCtrl;
            config.removeStart = 1;
        }
        else if (typeof indexOrViewCtrl === 'number') {
            config.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(config, done);
    }
    popToRoot(opts, done) {
        return this.queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts: opts,
        }, done);
    }
    removeIndex(startIndex, removeCount = 1, opts, done) {
        return this.queueTrns({
            removeStart: startIndex,
            removeCount: removeCount,
            opts: opts,
        }, done);
    }
    setRoot(component, componentProps, opts, done) {
        return this.setPages([{ page: component, params: componentProps }], opts, done);
    }
    setPages(views, opts, done) {
        if (!opts) {
            opts = {};
        }
        // if animation wasn't set to true then default it to NOT animate
        if (opts.animate !== true) {
            opts.animate = false;
        }
        return this.queueTrns({
            insertStart: 0,
            insertViews: views,
            removeStart: 0,
            removeCount: -1,
            opts: opts
        }, done);
    }
    setRouteId(id, params, direction) {
        const active = this.getActive();
        if (matches(active, id, params)) {
            return Promise.resolve({ changed: false, element: active.element });
        }
        const viewController = this.views.find(v => matches(v, id, params));
        let resolve;
        const promise = new Promise((r) => resolve = r);
        let finish;
        const commonOpts = {
            updateURL: false,
            viewIsReady: (enteringEl) => {
                let mark;
                const p = new Promise(r => mark = r);
                resolve({
                    changed: true,
                    element: enteringEl,
                    markVisible: async () => {
                        mark();
                        await finish;
                    }
                });
                return p;
            }
        };
        if (viewController) {
            finish = this.popTo(viewController, Object.assign({}, commonOpts, { direction: "back" /* Back */ }));
        }
        else if (direction === 1) {
            finish = this.push(id, params, commonOpts);
        }
        else if (direction === -1) {
            finish = this.setRoot(id, params, Object.assign({}, commonOpts, { direction: "back" /* Back */, animate: true }));
        }
        else {
            finish = this.setRoot(id, params, commonOpts);
        }
        return promise;
    }
    getRouteId() {
        const active = this.getActive();
        return active ? {
            id: active.element.tagName,
            params: active.params,
            element: active.element
        } : undefined;
    }
    canGoBack(view = this.getActive()) {
        return !!(view && this.getPrevious(view));
    }
    getActive() {
        return this.views[this.views.length - 1];
    }
    getByIndex(index) {
        return this.views[index];
    }
    getPrevious(view = this.getActive()) {
        const views = this.views;
        const index = views.indexOf(view);
        return (index > 0) ? views[index - 1] : undefined;
    }
    length() {
        return this.views.length;
    }
    // _queueTrns() adds a navigation stack change to the queue and schedules it to run:
    // 1. _nextTrns(): consumes the next transition in the queue
    // 2. _viewInit(): initializes enteringView if required
    // 3. _viewTest(): ensures canLeave/canEnter returns true, so the operation can continue
    // 4. _postViewInit(): add/remove the views from the navigation stack
    // 5. _transitionInit(): initializes the visual transition if required and schedules it to run
    // 6. _viewAttachToDOM(): attaches the enteringView to the DOM
    // 7. _transitionStart(): called once the transition actually starts, it initializes the Animation underneath.
    // 8. _transitionFinish(): called once the transition finishes
    // 9. _cleanup(): syncs the navigation internal state with the DOM. For example it removes the pages from the DOM or hides/show them.
    queueTrns(ti, done) {
        const promise = new Promise((resolve, reject) => {
            ti.resolve = resolve;
            ti.reject = reject;
        });
        ti.done = done;
        // Normalize empty
        if (ti.insertViews && ti.insertViews.length === 0) {
            ti.insertViews = undefined;
        }
        // Enqueue transition instruction
        this.queue.push(ti);
        // if there isn't a transition already happening
        // then this will kick off this transition
        this.nextTrns();
        return promise;
    }
    success(result, ti) {
        if (this.queue === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        this.init = true;
        if (ti.done) {
            ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
        if (ti.opts.updateURL !== false && this.useRouter) {
            const router = document.querySelector('ion-router');
            if (router) {
                const direction = (result.direction === "back" /* Back */)
                    ? -1 /* Back */
                    : 1 /* Forward */;
                router && router.navChanged(direction);
            }
        }
    }
    failed(rejectReason, ti) {
        if (this.queue === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        this.queue.length = 0;
        this.fireError(rejectReason, ti);
    }
    fireError(rejectReason, ti) {
        if (ti.done) {
            ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
            ti.reject(rejectReason);
        }
        else {
            ti.resolve(false);
        }
    }
    nextTrns() {
        // this is the framework's bread 'n butta function
        // only one transition is allowed at any given time
        if (this.isTransitioning) {
            return false;
        }
        // there is no transition happening right now
        // get the next instruction
        const ti = this.queue.shift();
        if (!ti) {
            return false;
        }
        this.runTransition(ti);
        return true;
    }
    async runTransition(ti) {
        try {
            // set that this nav is actively transitioning
            this.ionNavWillChange.emit();
            this.isTransitioning = true;
            this.prepareTI(ti);
            const leavingView = this.getActive();
            const enteringView = this.getEnteringView(ti, leavingView);
            if (!leavingView && !enteringView) {
                throw new Error('no views in the stack to be removed');
            }
            // Needs transition?
            ti.requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
            if (enteringView && enteringView.state === 1 /* New */) {
                await enteringView.init(this.el);
            }
            this.postViewInit(enteringView, leavingView, ti);
            const result = await this.transition(enteringView, leavingView, ti);
            this.success(result, ti);
            this.ionNavDidChange.emit();
        }
        catch (rejectReason) {
            this.failed(rejectReason, ti);
        }
        this.isTransitioning = false;
        this.nextTrns();
    }
    prepareTI(ti) {
        const viewsLength = this.views.length;
        ti.opts = ti.opts || {};
        if (ti.opts.delegate === undefined) {
            ti.opts.delegate = this.delegate;
        }
        if (ti.removeView != null) {
            assert(ti.removeStart != null, 'removeView needs removeStart');
            assert(ti.removeCount != null, 'removeView needs removeCount');
            const index = this.views.indexOf(ti.removeView);
            if (index < 0) {
                throw new Error('removeView was not found');
            }
            ti.removeStart += index;
        }
        if (ti.removeStart != null) {
            if (ti.removeStart < 0) {
                ti.removeStart = (viewsLength - 1);
            }
            if (ti.removeCount < 0) {
                ti.removeCount = (viewsLength - ti.removeStart);
            }
            ti.leavingRequiresTransition = (ti.removeCount > 0) && ((ti.removeStart + ti.removeCount) === viewsLength);
        }
        if (ti.insertViews) {
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = (ti.insertStart === viewsLength);
        }
        const insertViews = ti.insertViews;
        if (!insertViews) {
            return;
        }
        assert(insertViews.length > 0, 'length can not be zero');
        const viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
            throw new Error('invalid views to insert');
        }
        // Check all the inserted view are correct
        for (const view of viewControllers) {
            view.delegate = ti.opts.delegate;
            const nav = view.nav;
            if (nav && nav !== this) {
                throw new Error('inserted view was already inserted');
            }
            if (view.state === 3 /* Destroyed */) {
                throw new Error('inserted view was already destroyed');
            }
        }
        ti.insertViews = viewControllers;
    }
    getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews) {
            // grab the very last view of the views to be inserted
            // and initialize it as the new entering view
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (removeStart != null) {
            const views = this.views;
            const removeEnd = removeStart + ti.removeCount;
            for (let i = views.length - 1; i >= 0; i--) {
                const view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return undefined;
    }
    postViewInit(enteringView, leavingView, ti) {
        assert(leavingView || enteringView, 'Both leavingView and enteringView are null');
        assert(ti.resolve, 'resolve must be valid');
        assert(ti.reject, 'reject must be valid');
        const opts = ti.opts;
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        const removeCount = ti.removeCount;
        let destroyQueue = undefined;
        // there are views to remove
        if (removeStart != null) {
            assert(removeStart >= 0, 'removeStart can not be negative');
            assert(removeCount >= 0, 'removeCount can not be negative');
            destroyQueue = [];
            for (let i = 0; i < removeCount; i++) {
                const view = this.views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            // default the direction to "back"
            opts.direction = opts.direction || "back" /* Back */;
        }
        const finalBalance = this.views.length + (insertViews ? insertViews.length : 0) - (removeCount ? removeCount : 0);
        assert(finalBalance >= 0, 'final balance can not be negative');
        if (finalBalance === 0) {
            console.warn(`You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.el);
            throw new Error('navigation stack needs at least one root page');
        }
        // At this point the transition can not be rejected, any throw should be an error
        // there are views to insert
        if (insertViews) {
            // add the views to the
            let insertIndex = ti.insertStart;
            for (const view of insertViews) {
                this.insertViewAt(view, insertIndex);
                insertIndex++;
            }
            if (ti.enteringRequiresTransition) {
                // default to forward if not already set
                opts.direction = opts.direction || "forward" /* Forward */;
            }
        }
        // if the views to be removed are in the beginning or middle
        // and there is not a view that needs to visually transition out
        // then just destroy them and don't transition anything
        // batch all of lifecycles together
        // let's make sure, callbacks are zoned
        if (destroyQueue && destroyQueue.length > 0) {
            for (const view of destroyQueue) {
                lifecycle(view.element, "ionViewWillLeave" /* WillLeave */);
                lifecycle(view.element, "ionViewDidLeave" /* DidLeave */);
                lifecycle(view.element, "ionViewWillUnload" /* WillUnload */);
            }
            // once all lifecycle events has been delivered, we can safely detroy the views
            for (const view of destroyQueue) {
                this.destroyView(view);
            }
        }
    }
    async transition(enteringView, leavingView, ti) {
        if (!ti.requiresTransition) {
            // transition is not required, so we are already done!
            // they're inserting/removing the views somewhere in the middle or
            // beginning, so visually nothing needs to animate/transition
            // resolve immediately because there's no animation that's happening
            return Promise.resolve({
                hasCompleted: true,
                requiresTransition: false
            });
        }
        if (this.sbTrns) {
            this.sbTrns.destroy();
            this.sbTrns = null;
        }
        // we should animate (duration > 0) if the pushed page is not the first one (startup)
        // or if it is a portal (modal, actionsheet, etc.)
        const animationBuilder = this.getAnimationBuilder(ti.opts);
        const progressAnimation = ti.opts.progressAnimation
            ? (animation) => this.sbTrns = animation
            : undefined;
        const opts = ti.opts;
        const enteringEl = enteringView && enteringView.element;
        const leavingEl = leavingView && leavingView.element;
        const animationOpts = {
            animationCtrl: this.animationCtrl,
            animationBuilder: animationBuilder,
            animation: undefined,
            direction: opts.direction,
            duration: opts.duration,
            easing: opts.easing,
            viewIsReady: opts.viewIsReady,
            showGoBack: this.canGoBack(enteringView),
            progressAnimation,
            baseEl: this.el,
            enteringEl,
            leavingEl
        };
        const trns = await transition(animationOpts);
        return this.transitionFinish(trns, enteringView, leavingView, ti.opts);
    }
    transitionFinish(transition$$1, enteringView, leavingView, opts) {
        const hasCompleted = transition$$1 ? transition$$1.hasCompleted : true;
        const cleanupView = hasCompleted ? enteringView : leavingView;
        this.cleanup(cleanupView);
        // this is the root transition
        // it's safe to destroy this transition
        transition$$1 && transition$$1.destroy();
        return {
            hasCompleted: hasCompleted,
            requiresTransition: true,
            enteringView,
            leavingView,
            direction: opts.direction
        };
    }
    getAnimationBuilder(opts) {
        if (opts.duration === 0 || opts.animate === false || !this.init || this.animated === false || this.views.length <= 1) {
            return undefined;
        }
        const mode = opts.animation || this.config.get('pageTransition', this.mode);
        return mode === 'ios' ? iosTransitionAnimation : mdTransitionAnimation;
    }
    insertViewAt(view, index) {
        const views = this.views;
        const existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
            // this view is already in the stack!!
            // move it to its new location
            assert(view.nav === this, 'view is not part of the nav');
            views.splice(index, 0, views.splice(existingIndex, 1)[0]);
        }
        else {
            assert(!view.nav, 'nav is used');
            // this is a new view to add to the stack
            // create the new entering view
            view.nav = this;
            // insert the entering view into the correct index in the stack
            views.splice(index, 0, view);
        }
    }
    removeView(view) {
        assert(view.state === 2 /* Attached */ || view.state === 3 /* Destroyed */, 'view state should be loaded or destroyed');
        const views = this.views;
        const index = views.indexOf(view);
        assert(index > -1, 'view must be part of the stack');
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    destroyView(view) {
        view._destroy();
        this.removeView(view);
    }
    /**
     * DOM WRITE
     */
    cleanup(activeView) {
        // ok, cleanup time!! Destroy all of the views that are
        // INACTIVE and come after the active view
        // only do this if the views exist, though
        if (this.destroyed) {
            return;
        }
        const views = this.views;
        const activeViewIndex = views.indexOf(activeView);
        for (let i = views.length - 1; i >= 0; i--) {
            const view = views[i];
            if (i > activeViewIndex) {
                // this view comes after the active view
                // let's unload it
                lifecycle(view.element, "ionViewWillUnload" /* WillUnload */);
                this.destroyView(view);
            }
            else if (i < activeViewIndex) {
                // this view comes before the active view
                // and it is not a portal then ensure it is hidden
                view.element.hidden = true;
            }
        }
    }
    swipeBackStart() {
        if (this.isTransitioning || this.queue.length > 0) {
            return;
        }
        // default the direction to "back";
        const opts = {
            direction: "back" /* Back */,
            progressAnimation: true
        };
        this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, undefined);
    }
    swipeBackProgress(detail) {
        if (this.sbTrns) {
            // continue to disable the app while actively dragging
            this.isTransitioning = true;
            // set the transition animation's progress
            const delta = detail.deltaX;
            const stepValue = delta / window.innerWidth;
            // set the transition animation's progress
            this.sbTrns.progressStep(stepValue);
        }
    }
    swipeBackEnd(detail) {
        if (this.sbTrns) {
            // the swipe back gesture has ended
            const delta = detail.deltaX;
            const width = window.innerWidth;
            const stepValue = delta / width;
            const velocity = detail.velocityX;
            const z = width / 2.0;
            const shouldComplete = (velocity >= 0)
                && (velocity > 0.2 || detail.deltaX > z);
            const missing = shouldComplete ? 1 - stepValue : stepValue;
            const missingDistance = missing * width;
            let realDur = 0;
            if (missingDistance > 5) {
                const dur = missingDistance / Math.abs(velocity);
                realDur = Math.min(dur, 300);
            }
            this.sbTrns.progressEnd(shouldComplete, stepValue, realDur);
        }
    }
    canSwipeBack() {
        return (this.swipeBackEnabled &&
            !this.isTransitioning &&
            this.canGoBack());
    }
    render() {
        return [
            this.swipeBackEnabled &&
                h("ion-gesture", { canStart: this.canSwipeBack.bind(this), onStart: this.swipeBackStart.bind(this), onMove: this.swipeBackProgress.bind(this), onEnd: this.swipeBackEnd.bind(this), gestureName: 'goback-swipe', gesturePriority: 10, type: 'pan', direction: 'x', threshold: 10, attachTo: 'body' }),
            this.mode === 'ios' && h("div", { class: 'nav-decor' }),
            h("slot", null)
        ];
    }
    static get is() { return "ion-nav"; }
    static get properties() { return { "animated": { "type": Boolean, "attr": "animated", "mutable": true }, "animationCtrl": { "connect": "ion-animation-controller" }, "canGoBack": { "method": true }, "config": { "context": "config" }, "delegate": { "type": "Any", "attr": "delegate" }, "dom": { "context": "dom" }, "el": { "elementRef": true }, "getActive": { "method": true }, "getByIndex": { "method": true }, "getPrevious": { "method": true }, "getRouteId": { "method": true }, "insert": { "method": true }, "insertPages": { "method": true }, "length": { "method": true }, "pop": { "method": true }, "popTo": { "method": true }, "popToRoot": { "method": true }, "push": { "method": true }, "removeIndex": { "method": true }, "root": { "type": "Any", "attr": "root", "watchCallbacks": ["rootChanged"] }, "rootParams": { "type": "Any", "attr": "root-params" }, "setPages": { "method": true }, "setRoot": { "method": true }, "setRouteId": { "method": true }, "swipeBackEnabled": { "type": Boolean, "attr": "swipe-back-enabled", "mutable": true } }; }
    static get events() { return [{ "name": "ionNavWillChange", "method": "ionNavWillChange", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionNavDidChange", "method": "ionNavDidChange", "bubbles": true, "cancelable": true, "composed": true }]; }
}

class Route {
    constructor() {
        /**
         * Relative path that needs to match in order for this route to apply.
         */
        this.url = '';
    }
    onUpdate(newValue) {
        this.ionRouteDataChanged.emit(newValue);
    }
    onComponentProps(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        const keys1 = newValue ? Object.keys(newValue) : [];
        const keys2 = oldValue ? Object.keys(oldValue) : [];
        if (keys1.length !== keys2.length) {
            this.onUpdate(newValue);
            return;
        }
        for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i];
            if (newValue[key] !== oldValue[key]) {
                this.onUpdate(newValue);
                return;
            }
        }
    }
    componentDidLoad() {
        this.ionRouteDataChanged.emit();
    }
    componentDidUnload() {
        this.ionRouteDataChanged.emit();
    }
    static get is() { return "ion-route"; }
    static get properties() { return { "component": { "type": String, "attr": "component", "watchCallbacks": ["onUpdate"] }, "componentProps": { "type": "Any", "attr": "component-props", "watchCallbacks": ["onComponentProps"] }, "url": { "type": String, "attr": "url", "watchCallbacks": ["onUpdate"] } }; }
    static get events() { return [{ "name": "ionRouteDataChanged", "method": "ionRouteDataChanged", "bubbles": true, "cancelable": true, "composed": true }]; }
}

function generatePath(segments) {
    const path = segments
        .filter(s => s.length > 0)
        .join('/');
    return '/' + path;
}
function chainToPath(chain) {
    const path = [];
    for (const route of chain) {
        for (const segment of route.path) {
            if (segment[0] === ':') {
                const param = route.params && route.params[segment.slice(1)];
                if (!param) {
                    return null;
                }
                path.push(param);
            }
            else if (segment !== '') {
                path.push(segment);
            }
        }
    }
    return path;
}
function writePath(history, base, usePath, path, direction, state) {
    path = [base, ...path];
    let url = generatePath(path);
    if (usePath) {
        url = '#' + url;
    }
    if (direction === 1 /* Forward */) {
        history.pushState(state, '', url);
    }
    else {
        history.replaceState(state, '', url);
    }
}
function readPath(loc, base, useHash) {
    const path = useHash
        ? loc.hash.substr(1)
        : loc.pathname;
    if (path.startsWith(base)) {
        return parsePath(path.slice(base.length));
    }
    return null;
}
function parsePath(path) {
    if (path == null) {
        return [''];
    }
    const segments = path.split('/')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    if (segments.length === 0) {
        return [''];
    }
    else {
        return segments;
    }
}

function readRedirects(root) {
    return Array.from(root.children)
        .filter(el => el.tagName === 'ION-ROUTE-REDIRECT')
        .map(el => {
        const to = readProp(el, 'to');
        return {
            from: parsePath(readProp(el, 'from')),
            to: to == null ? undefined : parsePath(to),
        };
    });
}
function readRoutes(root, node = root) {
    return Array.from(node.children)
        .filter(el => el.tagName === 'ION-ROUTE' && el.component)
        .map(el => {
        return {
            path: parsePath(readProp(el, 'url')),
            id: readProp(el, 'component').toLowerCase(),
            params: el.componentProps,
            children: readRoutes(root, el)
        };
    });
}
function readProp(el, prop) {
    if (prop in el) {
        return el[prop];
    }
    if (el.hasAttribute(prop)) {
        return el.getAttribute(prop);
    }
    return undefined;
}
function flattenRouterTree(nodes) {
    const routes = [];
    for (const node of nodes) {
        flattenNode([], routes, node);
    }
    return routes;
}
function flattenNode(chain, routes, node) {
    const s = chain.slice();
    s.push({
        id: node.id,
        path: node.path,
        params: node.params
    });
    if (node.children.length === 0) {
        routes.push(s);
        return;
    }
    for (const sub of node.children) {
        flattenNode(s, routes, sub);
    }
}

async function writeNavState(root, chain, direction, index, changed = false) {
    try {
        // find next navigation outlet in the DOM
        const outlet = searchNavNode(root);
        // make sure we can continue interating the DOM, otherwise abort
        if (!chain || index >= chain.length || !outlet) {
            return changed;
        }
        await outlet.componentOnReady();
        const route = chain[index];
        const result = await outlet.setRouteId(route.id, route.params, direction);
        // if the outlet changed the page, reset navigation to neutral (no direction)
        // this means nested outlets will not animate
        if (result.changed) {
            direction = 0 /* None */;
            changed = true;
        }
        // recursivelly set nested outlets
        changed = await writeNavState(result.element, chain, direction, index + 1, changed);
        // once all nested outlets are visible let's make the parent visible too,
        // using markVisible prevents flickering
        if (result.markVisible) {
            await result.markVisible();
        }
        return changed;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
function readNavState(root) {
    const ids = [];
    let outlet;
    let node = root;
    while (true) {
        outlet = searchNavNode(node);
        if (outlet) {
            const id = outlet.getRouteId();
            if (id) {
                node = id.element;
                id.element = undefined;
                ids.push(id);
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }
    return { ids, outlet };
}
const QUERY = ':not([no-router]) ion-nav,:not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';
function searchNavNode(root) {
    if (!root) {
        return null;
    }
    if (root.matches(QUERY)) {
        return root;
    }
    return root.querySelector(QUERY);
}

function matchesRedirect(input, route) {
    const { from, to } = route;
    if (to === undefined) {
        return false;
    }
    if (from.length > input.length) {
        return false;
    }
    for (let i = 0; i < from.length; i++) {
        const expected = from[i];
        if (expected === '*') {
            return true;
        }
        if (expected !== input[i]) {
            return false;
        }
    }
    return from.length === input.length;
}
function routeRedirect(path, routes) {
    for (const route of routes) {
        if (matchesRedirect(path, route)) {
            return route;
        }
    }
    return null;
}
function matchesIDs(ids, chain) {
    const len = Math.min(ids.length, chain.length);
    let i = 0;
    for (; i < len; i++) {
        if (ids[i].toLowerCase() !== chain[i].id) {
            break;
        }
    }
    return i;
}
function matchesPath(path, chain) {
    const segments = new RouterSegments(path);
    let matchesDefault = false;
    let allparams = undefined;
    for (let i = 0; i < chain.length; i++) {
        const path = chain[i].path;
        if (path[0] === '') {
            matchesDefault = true;
        }
        else {
            for (const segment of path) {
                const data = segments.next();
                // data param
                if (segment[0] === ':') {
                    if (data === '') {
                        return null;
                    }
                    allparams = allparams || [];
                    const params = allparams[i] || (allparams[i] = {});
                    params[segment.slice(1)] = data;
                }
                else if (data !== segment) {
                    return null;
                }
            }
            matchesDefault = false;
        }
    }
    const matches = (matchesDefault)
        ? matchesDefault === (segments.next() === '')
        : true;
    if (!matches) {
        return null;
    }
    if (allparams) {
        return chain.map((route, i) => ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, allparams[i])
        }));
    }
    return chain;
}
function mergeParams(a, b) {
    if (!a && b) {
        return b;
    }
    else if (a && !b) {
        return a;
    }
    else if (a && b) {
        return Object.assign({}, a, b);
    }
    return undefined;
}
function routerIDsToChain(ids, chains) {
    let match = null;
    let maxMatches = 0;
    const plainIDs = ids.map(i => i.id);
    for (const chain of chains) {
        const score = matchesIDs(plainIDs, chain);
        if (score > maxMatches) {
            match = chain;
            maxMatches = score;
        }
    }
    if (match) {
        return match.map((route, i) => ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, ids[i] && ids[i].params)
        }));
    }
    return null;
}
function routerPathToChain(path, chains) {
    let match = null;
    let matches = 0;
    for (const chain of chains) {
        const matchedChain = matchesPath(path, chain);
        if (matchedChain !== null) {
            const score = computePriority(matchedChain);
            if (score > matches) {
                matches = score;
                match = matchedChain;
            }
        }
    }
    return match;
}
function computePriority(chain) {
    let score = 1;
    let level = 1;
    for (const route of chain) {
        for (const path of route.path) {
            if (path[0] === ':') {
                score += Math.pow(1, level);
            }
            else if (path !== '') {
                score += Math.pow(2, level);
            }
            level++;
        }
    }
    return score;
}
class RouterSegments {
    constructor(path) {
        this.path = path.slice();
    }
    next() {
        if (this.path.length > 0) {
            return this.path.shift();
        }
        return '';
    }
}

class Router {
    constructor() {
        this.previousPath = null;
        this.busy = false;
        this.init = false;
        this.state = 0;
        this.lastState = 0;
        this.base = '';
        this.useHash = true;
    }
    componentDidLoad() {
        this.init = true;
        console.debug('[ion-router] router did load');
        const tree = readRoutes(this.el);
        this.routes = flattenRouterTree(tree);
        this.redirects = readRedirects(this.el);
        // TODO: use something else
        requestAnimationFrame(() => {
            this.historyDirection();
            this.writeNavStateRoot(this.getPath(), 0 /* None */);
        });
    }
    onRedirectChanged(ev) {
        if (!this.init) {
            return;
        }
        console.debug('[ion-router] redirect data changed', ev.target);
        this.redirects = readRedirects(this.el);
    }
    onRoutesChanged(ev) {
        if (!this.init) {
            return;
        }
        console.debug('[ion-router] route data changed', ev.target, ev.detail);
        // schedule write
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        this.timer = setTimeout(() => {
            console.debug('[ion-router] data changed -> update nav');
            const tree = readRoutes(this.el);
            this.routes = flattenRouterTree(tree);
            this.writeNavStateRoot(this.getPath(), 0 /* None */);
            this.timer = undefined;
        }, 100);
    }
    onPopState() {
        const direction = this.historyDirection();
        const path = this.getPath();
        console.debug('[ion-router] URL changed -> update nav', path, direction);
        return this.writeNavStateRoot(path, direction);
    }
    historyDirection() {
        if (window.history.state === null) {
            this.state++;
            window.history.replaceState(this.state, document.title, document.location.href);
        }
        const state = window.history.state;
        const lastState = this.lastState;
        this.lastState = state;
        if (state > lastState) {
            return 1 /* Forward */;
        }
        else if (state < lastState) {
            return -1 /* Back */;
        }
        else {
            return 0 /* None */;
        }
    }
    async navChanged(direction) {
        if (this.busy) {
            return false;
        }
        const { ids, outlet } = readNavState(document.body);
        const chain = routerIDsToChain(ids, this.routes);
        if (!chain) {
            console.warn('[ion-router] no matching URL for ', ids.map(i => i.id));
            return false;
        }
        const path = chainToPath(chain);
        if (!path) {
            console.warn('[ion-router] router could not match path because some required param is missing');
            return false;
        }
        console.debug('[ion-router] nav changed -> update URL', ids, path);
        this.setPath(path, direction);
        if (outlet) {
            console.debug('[ion-router] updating nested outlet', outlet);
            await this.writeNavState(outlet, chain, 0 /* None */, ids.length);
        }
        this.emitRouteChange(path, null);
        return true;
    }
    push(url, direction = 1 /* Forward */) {
        const path = parsePath(url);
        this.setPath(path, direction);
        console.debug('[ion-router] URL pushed -> updating nav', url, direction);
        return this.writeNavStateRoot(path, direction);
    }
    async writeNavStateRoot(path, direction) {
        if (this.busy) {
            return false;
        }
        const redirect = routeRedirect(path, this.redirects);
        let redirectFrom = null;
        if (redirect) {
            this.setPath(redirect.to, direction);
            redirectFrom = redirect.from;
            path = redirect.to;
        }
        const chain = routerPathToChain(path, this.routes);
        const changed = await this.writeNavState(document.body, chain, direction);
        if (changed) {
            this.emitRouteChange(path, redirectFrom);
        }
        return changed;
    }
    async writeNavState(node, chain, direction, index = 0) {
        if (this.busy) {
            return false;
        }
        this.busy = true;
        const changed = await writeNavState(node, chain, direction, index);
        this.busy = false;
        return changed;
    }
    setPath(path, direction) {
        this.state++;
        writePath(window.history, this.base, this.useHash, path, direction, this.state);
    }
    getPath() {
        return readPath(window.location, this.base, this.useHash);
    }
    emitRouteChange(path, redirectPath) {
        console.debug('[ion-router] route changed', path);
        const from = this.previousPath;
        const redirectedFrom = redirectPath ? generatePath(redirectPath) : null;
        const to = generatePath(path);
        this.previousPath = to;
        this.ionRouteChanged.emit({
            from,
            redirectedFrom,
            to: to
        });
    }
    static get is() { return "ion-router"; }
    static get properties() { return { "base": { "type": String, "attr": "base" }, "config": { "context": "config" }, "dom": { "context": "dom" }, "el": { "elementRef": true }, "navChanged": { "method": true }, "push": { "method": true }, "useHash": { "type": Boolean, "attr": "use-hash" } }; }
    static get events() { return [{ "name": "ionRouteChanged", "method": "ionRouteChanged", "bubbles": true, "cancelable": true, "composed": true }]; }
}

class StatusTap {
    constructor() {
        this.duration = 300;
    }
    onStatusTap() {
        this.dom.read(() => {
            const width = window.innerWidth;
            const height = window.innerWidth;
            const el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return null;
            }
            const scrollEl = el.closest('ion-scroll');
            if (scrollEl) {
                scrollEl.componentOnReady().then(() => {
                    this.dom.write(() => {
                        scrollEl.scrollToTop(this.duration);
                    });
                });
            }
        });
    }
    static get is() { return "ion-status-tap"; }
    static get properties() { return { "dom": { "context": "dom" }, "duration": { "type": Number, "attr": "duration" } }; }
}

class TapClick {
    constructor() {
        this.lastTouch = -MOUSE_WAIT * 10;
        this.lastActivated = 0;
        this.cancelled = false;
        this.clearDefers = new WeakMap();
    }
    onBodyClick(ev) {
        if (this.cancelled) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    // Touch Events
    onTouchStart(ev) {
        this.lastTouch = now(ev);
        this.pointerDown(ev);
    }
    onTouchEnd(ev) {
        this.lastTouch = now(ev);
        this.pointerUp(ev);
    }
    onMouseDown(ev) {
        const t = now(ev) - MOUSE_WAIT;
        if (this.lastTouch < t) {
            this.pointerDown(ev);
        }
    }
    onMouseUp(ev) {
        const t = now(ev) - MOUSE_WAIT;
        if (this.lastTouch < t) {
            this.pointerUp(ev);
        }
    }
    cancelActive() {
        clearTimeout(this.activeDefer);
        if (this.activatableEle) {
            this.removeActivated(false);
            this.activatableEle = null;
        }
        this.cancelled = true;
    }
    pointerDown(ev) {
        if (this.activatableEle) {
            return;
        }
        this.cancelled = false;
        this.setActivatedElement(getActivatableTarget(ev.target), ev);
    }
    pointerUp(ev) {
        this.setActivatedElement(null, ev);
        if (this.cancelled && ev.cancelable) {
            ev.preventDefault();
        }
    }
    setActivatedElement(el, ev) {
        // do nothing
        const activatableEle = this.activatableEle;
        if (el && el === activatableEle) {
            return;
        }
        clearTimeout(this.activeDefer);
        this.activeDefer = null;
        const { x, y } = pointerCoord(ev);
        // unactivate selected
        if (activatableEle) {
            if (this.clearDefers.has(activatableEle)) {
                throw new Error('internal error');
            }
            if (!activatableEle.classList.contains(ACTIVATED)) {
                this.addActivated(activatableEle, x, y);
            }
            this.removeActivated(true);
        }
        // activate
        if (el) {
            const deferId = this.clearDefers.get(el);
            if (deferId) {
                clearTimeout(deferId);
                this.clearDefers.delete(el);
            }
            el.classList.remove(ACTIVATED);
            this.activeDefer = setTimeout(() => {
                this.addActivated(el, x, y);
                this.activeDefer = null;
            }, ADD_ACTIVATED_DEFERS);
        }
        this.activatableEle = el;
    }
    addActivated(el, x, y) {
        this.lastActivated = Date.now();
        el.classList.add(ACTIVATED);
        const event = new CustomEvent('ionActivated', {
            bubbles: false,
            detail: { x, y }
        });
        el.dispatchEvent(event);
    }
    removeActivated(smooth) {
        const activatableEle = this.activatableEle;
        if (!activatableEle) {
            return;
        }
        const time = CLEAR_STATE_DEFERS - Date.now() + this.lastActivated;
        if (smooth && time > 0) {
            const deferId = setTimeout(() => {
                activatableEle.classList.remove(ACTIVATED);
                this.clearDefers.delete(activatableEle);
            }, CLEAR_STATE_DEFERS);
            this.clearDefers.set(activatableEle, deferId);
        }
        else {
            activatableEle.classList.remove(ACTIVATED);
        }
    }
    static get is() { return "ion-tap-click"; }
    static get properties() { return { "el": { "elementRef": true }, "enableListener": { "context": "enableListener" }, "isServer": { "context": "isServer" } }; }
}
function getActivatableTarget(el) {
    return el.closest('a,button,[tappable]');
}
const ACTIVATED = 'activated';
const ADD_ACTIVATED_DEFERS = 200;
const CLEAR_STATE_DEFERS = 200;
const MOUSE_WAIT = 2500;

export { MyApp, App as IonApp, InputShims as IonInputShims, Nav as IonNav, Route as IonRoute, Router as IonRouter, StatusTap as IonStatusTap, TapClick as IonTapClick };
