/*! Built with http://stenciljs.com */
const { h } = window.App;

import { openURL, createThemedClasses, getElementClassMap } from './chunk2.js';
import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from './chunk3.js';
import { deferEvent } from './chunk1.js';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

class AppProfile {
    constructor() {
        // demo key from https://web-push-codelab.glitch.me/
        // replace with your key in production
        this.publicServerKey = urlB64ToUint8Array('BBsb4au59pTKF4IKi-aJkEAGPXxtzs-lbtL58QxolsT2T-3dVQIXTUCCE1TSY8hyUvXLhJFEUmH7b5SJfSTcT-E');
    }
    componentWillLoad() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            this.swSupport = true;
        }
        else {
            this.swSupport = false;
        }
    }
    subscribeToNotify($event) {
        console.log($event.detail.checked);
        if ($event.detail.checked === true) {
            this.handleSub();
        }
    }
    handleSub() {
        // get our service worker registration
        navigator.serviceWorker.getRegistration().then((reg) => {
            // check if service worker is registered
            if (reg) {
                // get push subscription
                reg.pushManager.getSubscription().then((sub) => {
                    // if there is no subscription that means
                    // the user has not subscribed before
                    if (sub === null) {
                        // user is not subscribed
                        reg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: this.publicServerKey
                        })
                            .then((sub) => {
                            // our user is now subscribed
                            // lets reflect this in our UI
                            console.log('web push subscription: ', sub);
                            this.notify = true;
                        });
                    }
                });
            }
        });
    }
    render() {
        return (h("ion-page", null,
            h("ion-header", null,
                h("ion-toolbar", { color: 'primary' },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: '/' })),
                    h("ion-title", null, "Ionic PWA Toolkit"))),
            h("ion-content", null,
                h("p", null,
                    "Hello! My name is ",
                    this.name,
                    ". My name was passed in through a route param!"),
                this.swSupport ? h("ion-item", null,
                    h("ion-label", null, "Notifications"),
                    h("ion-toggle", { checked: this.notify, disabled: this.notify })) : null)));
    }
    static get is() { return "app-profile"; }
    static get properties() { return { "name": { "type": String, "attr": "name" }, "notify": { "state": true }, "swSupport": { "state": true }, "toastCtrl": { "connect": "ion-toast-controller" } }; }
    static get style() { return "app-profile ion-scroll {\n  padding: 15px;\n}\n\napp-profile ion-toggle input {\n  display: none;\n}"; }
}

class BackButton {
    onClick(ev) {
        const nav = this.el.closest('ion-nav');
        if (nav && nav.canGoBack()) {
            ev.preventDefault();
            nav.pop();
        }
        else if (this.defaultHref) {
            openURL(this.defaultHref, ev, true);
        }
    }
    hostData() {
        return {
            class: {
                'show-back-button': !!this.defaultHref
            }
        };
    }
    render() {
        const backButtonIcon = this.icon || this.config.get('backButtonIcon', 'arrow-back');
        const backButtonText = this.text != null ? this.text : this.config.get('backButtonText', this.mode === 'ios' ? 'Back' : '');
        return (h("button", { class: 'back-button-inner', onClick: (ev) => this.onClick(ev) },
            backButtonIcon && h("ion-icon", { name: backButtonIcon }),
            backButtonText && h("span", { class: 'button-text' }, backButtonText),
            this.mode === 'md' && h("ion-ripple-effect", { useTapClick: true })));
    }
    static get is() { return "ion-back-button"; }
    static get host() { return { "theme": "back-button" }; }
    static get properties() { return { "config": { "context": "config" }, "defaultHref": { "type": String, "attr": "default-href" }, "el": { "elementRef": true }, "icon": { "type": String, "attr": "icon" }, "mode": { "type": "Any", "attr": "mode" }, "text": { "type": "Any", "attr": "text" } }; }
    static get style() { return ".back-button {\n  display: none;\n}\n\n.can-go-back > ion-header .back-button,\n.back-button.show-back-button {\n  display: inline-block;\n}\n\n.back-button button {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  text-align: center;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  position: relative;\n  z-index: 0;\n  display: flex;\n  flex-flow: row nowrap;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  outline: none;\n  line-height: 1;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  cursor: pointer;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  transition: background-color, opacity 100ms linear;\n  user-select: none;\n  font-kerning: none;\n}\n\n.back-button .button-inner {\n  display: flex;\n  flex-flow: row nowrap;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n\n.back-button-text {\n  display: flex;\n  align-items: center;\n}\n\n.back-button-md .back-button-inner {\n  margin: 2px 6px 0 0;\n  padding: 0 5px;\n  min-width: 44px;\n  height: 32px;\n  border: 0;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: var(--ion-toolbar-md-text-color, var(--ion-toolbar-text-color, #424242));\n  background-color: transparent;\n  box-shadow: none;\n}\n\n.back-button-md .back-button-inner.activated {\n  opacity: .4;\n}\n\n.back-button-md ion-icon {\n  padding-right: 0.3em;\n  margin: 0;\n  padding: 0 6px;\n  text-align: left;\n  text-align: start;\n  font-size: 24px;\n  font-weight: normal;\n  line-height: .67;\n  pointer-events: none;\n}"; }
    static get styleMode() { return "md"; }
}

class Buttons {
    static get is() { return "ion-buttons"; }
    static get host() { return { "theme": "bar-buttons" }; }
}

class Item {
    constructor() {
        this.itemStyles = {};
        /**
         * If true, the user cannot interact with the item. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * Whether or not this item should be tappable.
         * If true, a button tag will be rendered. Defaults to `false`.
         */
        this.button = false;
        this.goBack = false;
    }
    itemStyle(ev) {
        ev.stopPropagation();
        let hasChildStyleChange = false;
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        for (const key in updatedStyles) {
            if (('item-' + key) !== key) {
                Object.defineProperty(updatedStyles, 'item-' + key, Object.getOwnPropertyDescriptor(updatedStyles, key));
                delete updatedStyles[key];
                hasChildStyleChange = true;
            }
        }
        this.itemStyles[tagName] = updatedStyles;
        if (hasChildStyleChange) {
            this.hasStyleChange = true;
        }
    }
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        const buttons = this.el.querySelectorAll('ion-button');
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].size) {
                buttons[i].size = 'small';
            }
        }
    }
    render() {
        let childStyles = {};
        for (const key in this.itemStyles) {
            childStyles = Object.assign(childStyles, this.itemStyles[key]);
        }
        const clickable = !!(this.href || this.el.onclick || this.button);
        const TagType = clickable
            ? this.href ? 'a' : 'button'
            : 'div';
        const attrs = (TagType === 'button')
            ? { type: 'button' }
            : { href: this.href };
        const showDetail = this.detail != null ? this.detail : (this.mode === 'ios' && clickable);
        const themedClasses = Object.assign({}, childStyles, createThemedClasses(this.mode, this.color, 'item'), getElementClassMap(this.el.classList), { 'item-disabled': this.disabled, 'item-detail-push': showDetail });
        this.hasStyleChange = false;
        return (h(TagType, Object.assign({}, attrs, { class: themedClasses, onClick: (ev) => openURL(this.href, ev, this.goBack) }),
            h("slot", { name: 'start' }),
            h("div", { class: 'item-inner' },
                h("div", { class: 'input-wrapper' },
                    h("slot", null)),
                h("slot", { name: 'end' })),
            clickable && this.mode === 'md' && h("ion-ripple-effect", { useTapClick: true })));
    }
    static get is() { return "ion-item"; }
    static get properties() { return { "button": { "type": Boolean, "attr": "button" }, "color": { "type": String, "attr": "color" }, "detail": { "type": Boolean, "attr": "detail" }, "disabled": { "type": Boolean, "attr": "disabled" }, "el": { "elementRef": true }, "goBack": { "type": Boolean, "attr": "go-back" }, "hasStyleChange": { "state": true }, "href": { "type": String, "attr": "href" }, "mode": { "type": "Any", "attr": "mode" } }; }
    static get style() { return "ion-item {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n}\n\n.item {\n  border-radius: 0;\n  margin: 0;\n  padding: 0;\n  text-align: initial;\n  display: flex;\n  overflow: hidden;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 44px;\n  border: 0;\n  outline: none;\n  font-weight: normal;\n  line-height: normal;\n  text-decoration: none;\n  color: inherit;\n}\n\n.item-inner {\n  margin: 0;\n  padding: 0;\n  display: flex;\n  overflow: hidden;\n  flex: 1;\n  flex-direction: inherit;\n  align-items: inherit;\n  align-self: stretch;\n  min-height: inherit;\n  border: 0;\n}\n\n.input-wrapper {\n  display: flex;\n  overflow: hidden;\n  flex: 1;\n  flex-direction: inherit;\n  align-items: inherit;\n  align-self: stretch;\n  text-overflow: ellipsis;\n}\n\n.item[no-lines],\n.item.item[no-lines] .item-inner {\n  border: 0;\n}\n\nion-item-group {\n  display: block;\n}\n\n[vertical-align-top],\n.input.item {\n  align-items: flex-start;\n}\n\n.item-cover {\n  left: 0;\n  top: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  cursor: pointer;\n}\n\n.item > ion-icon,\n.item-inner > ion-icon {\n  font-size: 1.6em;\n}\n\n.item .button {\n  margin: 0;\n}\n\n.item-disabled {\n  cursor: default;\n  opacity: .4;\n  pointer-events: none;\n}\n\n.item-md {\n  padding-left: 16px;\n  padding-right: 0;\n  position: relative;\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  font-weight: normal;\n  text-transform: none;\n  color: var(--ion-item-md-text-color, var(--ion-item-text-color, var(--ion-text-color, #000)));\n  background-color: var(--ion-item-md-background-color, var(--ion-item-background-color, var(--ion-background-color, #fff)));\n  box-shadow: none;\n  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.item-md.activated {\n  background-color: var(--ion-item-md-background-color-active, var(--ion-item-background-color-active, #f1f1f1));\n}\n\n.item-md[no-lines] {\n  border-width: 0;\n}\n\n.item-md h1 {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal;\n}\n\n.item-md h2 {\n  margin: 2px 0;\n  font-size: 16px;\n  font-weight: normal;\n}\n\n.item-md h3,\n.item-md h4,\n.item-md h5,\n.item-md h6 {\n  margin: 2px 0;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal;\n}\n\n.item-md p {\n  margin: 0 0 2px;\n  overflow: inherit;\n  font-size: 14px;\n  line-height: normal;\n  text-overflow: inherit;\n  color: var(--ion-text-md-color-step-400, var(--ion-text-color-step-400, #666666));\n}\n\n.item-md .item-inner {\n  padding-right: 8px;\n  border-bottom: 1px solid rgba(var(--ion-item-md-border-color-rgb, var(--ion-item-border-color-rgb, 0, 0, 0)), 0.13);\n}\n\nion-list > ion-item:first-child .item-md,\nion-list > ion-item-sliding:first-child .item-md,\nion-reorder-group > ion-gesture > ion-item:first-child .item-md,\nion-reorder-group > ion-gesture > ion-item-sliding:first-child .item-md {\n  border-top: 1px solid rgba(var(--ion-item-md-border-color-rgb, var(--ion-item-border-color-rgb, 0, 0, 0)), 0.13);\n}\n\nion-list > ion-item:last-child .item-md,\nion-list > ion-item-sliding:last-child .item-md,\nion-reorder-group > ion-gesture > ion-item:last-child .item-md,\nion-reorder-group > ion-gesture > ion-item-sliding:last-child .item-md {\n  border-bottom: 1px solid rgba(var(--ion-item-md-border-color-rgb, var(--ion-item-border-color-rgb, 0, 0, 0)), 0.13);\n}\n\nion-list > ion-item:last-child .item-md .item-inner,\nion-list > ion-item-sliding:last-child .item-md .item-inner,\nion-reorder-group > ion-gesture > ion-item:last-child .item-md .item-inner,\nion-reorder-group > ion-gesture > ion-item-sliding:last-child .item-md .item-inner {\n  border-bottom: 0;\n}\n\nion-item[no-lines],\nion-item[no-lines] .item-inner {\n  border-width: 0;\n}\n\n.item-md.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='rgba(var(--ion-item-md-border-color-rgb,%20var(--ion-item-border-color-rgb,%200,%200,%200)),%200.13)'/></svg>\");\n  padding-right: 32px;\n  background-position: right 14px center;\n  background-repeat: no-repeat;\n  background-size: 14px 14px;\n}\n\n.item-md [slot=\"start\"],\n.item-md [slot=\"end\"] {\n  margin: 0 8px 0 0;\n}\n\n.item-md > ion-icon[slot=\"start\"],\n.item-md > ion-icon[slot=\"end\"] {\n  margin-left: 0;\n  margin-top: 11px;\n  margin-bottom: 10px;\n}\n\n.item-md > ion-icon[slot=\"start\"] + .item-inner,\n.item-md > ion-icon[slot=\"start\"] + .item-input {\n  margin-left: 24px;\n}\n\n.item-md ion-avatar[slot=\"start\"],\n.item-md ion-thumbnail[slot=\"start\"] {\n  margin: 8px 16px 8px 0;\n}\n\n.item-md ion-avatar[slot=\"end\"],\n.item-md ion-thumbnail[slot=\"end\"] {\n  margin: 8px;\n}\n\n.item-md.item-label-stacked [slot=\"end\"],\n.item-md.item-label-floating [slot=\"end\"] {\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n\n.item-md .button-small-md {\n  padding: 0 0.6em;\n  height: 25px;\n  font-size: 12px;\n}\n\n.item-md .button-small-md ion-icon[slot=\"icon-only\"] {\n  padding: 0;\n}\n\n.item-md ion-avatar {\n  width: 40px;\n  height: 40px;\n}\n\n.item-md ion-thumbnail {\n  width: 80px;\n  height: 80px;\n}\n\n.item-md-primary {\n  color: var(--ion-color-md-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.item-md-primary .item-inner {\n  border-bottom-color: var(--ion-color-md-primary-shade, var(--ion-color-primary-shade, #3171e0));\n}\n\n.item-md-primary p {\n  color: var(--ion-color-md-primary-contrast, var(--ion-color-primary-contrast, #fff));\n}\n\n.item-md-primary.activated {\n  background-color: var(--ion-color-md-primary-tint, var(--ion-color-primary-tint, #4c8dff));\n}\n\n.item-md-primary.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-primary-shade,%20var(--ion-color-primary-shade,%20%233171e0))'/></svg>\");\n}\n\n.item-md-secondary {\n  color: var(--ion-color-md-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background-color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.item-md-secondary .item-inner {\n  border-bottom-color: var(--ion-color-md-secondary-shade, var(--ion-color-secondary-shade, #0bb8cc));\n}\n\n.item-md-secondary p {\n  color: var(--ion-color-md-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n}\n\n.item-md-secondary.activated {\n  background-color: var(--ion-color-md-secondary-tint, var(--ion-color-secondary-tint, #24d6ea));\n}\n\n.item-md-secondary.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-secondary-shade,%20var(--ion-color-secondary-shade,%20%230bb8cc))'/></svg>\");\n}\n\n.item-md-tertiary {\n  color: var(--ion-color-md-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background-color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.item-md-tertiary .item-inner {\n  border-bottom-color: var(--ion-color-md-tertiary-shade, var(--ion-color-tertiary-shade, #633ce0));\n}\n\n.item-md-tertiary p {\n  color: var(--ion-color-md-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n}\n\n.item-md-tertiary.activated {\n  background-color: var(--ion-color-md-tertiary-tint, var(--ion-color-tertiary-tint, #7e57ff));\n}\n\n.item-md-tertiary.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-tertiary-shade,%20var(--ion-color-tertiary-shade,%20%23633ce0))'/></svg>\");\n}\n\n.item-md-success {\n  color: var(--ion-color-md-success-contrast, var(--ion-color-success-contrast, #fff));\n  background-color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.item-md-success .item-inner {\n  border-bottom-color: var(--ion-color-md-success-shade, var(--ion-color-success-shade, #0ec254));\n}\n\n.item-md-success p {\n  color: var(--ion-color-md-success-contrast, var(--ion-color-success-contrast, #fff));\n}\n\n.item-md-success.activated {\n  background-color: var(--ion-color-md-success-tint, var(--ion-color-success-tint, #28e070));\n}\n\n.item-md-success.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-success-shade,%20var(--ion-color-success-shade,%20%230ec254))'/></svg>\");\n}\n\n.item-md-warning {\n  color: var(--ion-color-md-warning-contrast, var(--ion-color-warning-contrast, #000));\n  background-color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.item-md-warning .item-inner {\n  border-bottom-color: var(--ion-color-md-warning-shade, var(--ion-color-warning-shade, #e0b500));\n}\n\n.item-md-warning p {\n  color: var(--ion-color-md-warning-contrast, var(--ion-color-warning-contrast, #000));\n}\n\n.item-md-warning.activated {\n  background-color: var(--ion-color-md-warning-tint, var(--ion-color-warning-tint, #ffd31a));\n}\n\n.item-md-warning.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-warning-shade,%20var(--ion-color-warning-shade,%20%23e0b500))'/></svg>\");\n}\n\n.item-md-danger {\n  color: var(--ion-color-md-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background-color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.item-md-danger .item-inner {\n  border-bottom-color: var(--ion-color-md-danger-shade, var(--ion-color-danger-shade, #d33939));\n}\n\n.item-md-danger p {\n  color: var(--ion-color-md-danger-contrast, var(--ion-color-danger-contrast, #fff));\n}\n\n.item-md-danger.activated {\n  background-color: var(--ion-color-md-danger-tint, var(--ion-color-danger-tint, #f25454));\n}\n\n.item-md-danger.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-danger-shade,%20var(--ion-color-danger-shade,%20%23d33939))'/></svg>\");\n}\n\n.item-md-light {\n  color: var(--ion-color-md-light-contrast, var(--ion-color-light-contrast, #000));\n  background-color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.item-md-light .item-inner {\n  border-bottom-color: var(--ion-color-md-light-shade, var(--ion-color-light-shade, #d7d8da));\n}\n\n.item-md-light p {\n  color: var(--ion-color-md-light-contrast, var(--ion-color-light-contrast, #000));\n}\n\n.item-md-light.activated {\n  background-color: var(--ion-color-md-light-tint, var(--ion-color-light-tint, #f5f6f9));\n}\n\n.item-md-light.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-light-shade,%20var(--ion-color-light-shade,%20%23d7d8da))'/></svg>\");\n}\n\n.item-md-medium {\n  color: var(--ion-color-md-medium-contrast, var(--ion-color-medium-contrast, #000));\n  background-color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.item-md-medium .item-inner {\n  border-bottom-color: var(--ion-color-md-medium-shade, var(--ion-color-medium-shade, #86888f));\n}\n\n.item-md-medium p {\n  color: var(--ion-color-md-medium-contrast, var(--ion-color-medium-contrast, #000));\n}\n\n.item-md-medium.activated {\n  background-color: var(--ion-color-md-medium-tint, var(--ion-color-medium-tint, #a2a4ab));\n}\n\n.item-md-medium.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-medium-shade,%20var(--ion-color-medium-shade,%20%2386888f))'/></svg>\");\n}\n\n.item-md-dark {\n  color: var(--ion-color-md-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background-color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.item-md-dark .item-inner {\n  border-bottom-color: var(--ion-color-md-dark-shade, var(--ion-color-dark-shade, #1e2023));\n}\n\n.item-md-dark p {\n  color: var(--ion-color-md-dark-contrast, var(--ion-color-dark-contrast, #fff));\n}\n\n.item-md-dark.activated {\n  background-color: var(--ion-color-md-dark-tint, var(--ion-color-dark-tint, #383a3e));\n}\n\n.item-md-dark.item-detail-push .item-inner {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2012%2020'><path%20d='M2,20l-2-2l8-8L0,2l2-2l10,10L2,20z'%20fill='var(--ion-color-md-dark-shade,%20var(--ion-color-dark-shade,%20%231e2023))'/></svg>\");\n}"; }
    static get styleMode() { return "md"; }
}

class Label {
    constructor() {
        /**
         * If true, the label will sit alongside an input. Defaults to `false`.
         */
        this.fixed = false;
        /**
         * If true, the label will float above an input when the value is empty or the input is focused. Defaults to `false`.
         */
        this.floating = false;
        /**
         * If true, the label will be stacked above an input. Defaults to `false`.
         */
        this.stacked = false;
    }
    getText() {
        return this.el.textContent || '';
    }
    componentDidLoad() {
        this.emitStyle();
    }
    emitStyle() {
        clearTimeout(this.styleTmr);
        const styles = {
            'label-fixed': this.fixed,
            'label-floating': this.floating,
            'label-stacked': this.stacked
        };
        this.styleTmr = setTimeout(() => {
            this.ionStyle.emit(styles);
        });
    }
    static get is() { return "ion-label"; }
    static get host() { return { "theme": "label" }; }
    static get properties() { return { "color": { "type": String, "attr": "color" }, "el": { "elementRef": true }, "fixed": { "type": Boolean, "attr": "fixed" }, "floating": { "type": Boolean, "attr": "floating" }, "getText": { "method": true }, "mode": { "type": "Any", "attr": "mode" }, "stacked": { "type": Boolean, "attr": "stacked" } }; }
    static get events() { return [{ "name": "ionStyle", "method": "ionStyle", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "ion-label {\n  margin: 0;\n  display: block;\n  overflow: hidden;\n  flex: 1;\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.item-input ion-label {\n  flex: initial;\n  max-width: 200px;\n  pointer-events: none;\n}\n\n[text-wrap] ion-label {\n  white-space: normal;\n}\n\nion-label[fixed] {\n  flex: 0 0 100px;\n  width: 100px;\n  min-width: 100px;\n  max-width: 200px;\n}\n\n.item-label-stacked ion-label,\n.item-label-floating ion-label {\n  align-self: stretch;\n  width: auto;\n  max-width: 100%;\n}\n\nion-label[stacked],\nion-label[floating] {\n  margin-bottom: 0;\n}\n\n.item-label-stacked .input-wrapper,\n.item-label-floating .input-wrapper {\n  flex: 1;\n  flex-direction: column;\n}\n\n.item-label-stacked ion-select,\n.item-label-floating ion-select {\n  align-self: stretch;\n  max-width: 100%;\n}\n\n.label-md {\n  margin: 13px 8px 13px 0;\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n}\n\n[text-wrap] .label-md {\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.item-input .label-md,\n.item-select .label-md,\n.item-datetime .label-md {\n  color: var(--ion-text-md-color-step-600, var(--ion-text-color-step-600, #999999));\n}\n\n.label-md[stacked] {\n  font-size: 12px;\n}\n\n.label-md[floating] {\n  transform: translate3d(0,  27px,  0);\n  transform-origin: left top;\n  transition: transform 150ms ease-in-out;\n}\n\n.label-md[stacked],\n.label-md[floating] {\n  margin-left: 0;\n  margin-bottom: 0;\n}\n\n.item-input-has-focus .label-md[stacked],\n.item-input-has-focus .label-md[floating] {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.item-input-has-focus .label-md[floating],\n.item-input-has-value .label-md[floating] {\n  transform: translate3d(0,  0,  0) scale(0.8);\n}\n\n.label-md-primary,\n.item-input .label-md-primary,\n.item-select .label-md-primary,\n.item-datetime .label-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.label-md-secondary,\n.item-input .label-md-secondary,\n.item-select .label-md-secondary,\n.item-datetime .label-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.label-md-tertiary,\n.item-input .label-md-tertiary,\n.item-select .label-md-tertiary,\n.item-datetime .label-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.label-md-success,\n.item-input .label-md-success,\n.item-select .label-md-success,\n.item-datetime .label-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.label-md-warning,\n.item-input .label-md-warning,\n.item-select .label-md-warning,\n.item-datetime .label-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.label-md-danger,\n.item-input .label-md-danger,\n.item-select .label-md-danger,\n.item-datetime .label-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.label-md-light,\n.item-input .label-md-light,\n.item-select .label-md-light,\n.item-datetime .label-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.label-md-medium,\n.item-input .label-md-medium,\n.item-select .label-md-medium,\n.item-datetime .label-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.label-md-dark,\n.item-input .label-md-dark,\n.item-select .label-md-dark,\n.item-datetime .label-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}"; }
    static get styleMode() { return "md"; }
}

class ToastController {
    constructor() {
        this.toasts = new Map();
    }
    toastWillPresent(ev) {
        this.toasts.set(ev.target.overlayId, ev.target);
    }
    toastWillDismiss(ev) {
        this.toasts.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.toasts);
    }
    /*
     * Create a toast overlay with toast options.
     */
    create(opts) {
        return createOverlay(document.createElement('ion-toast'), opts);
    }
    /*
     * Dismiss the open toast overlay.
     */
    dismiss(data, role, toastId = -1) {
        return dismissOverlay(data, role, this.toasts, toastId);
    }
    /*
     * Get the most recently opened toast overlay.
     */
    getTop() {
        return getTopOverlay(this.toasts);
    }
    static get is() { return "ion-toast-controller"; }
    static get properties() { return { "create": { "method": true }, "dismiss": { "method": true }, "getTop": { "method": true } }; }
}

const engine = window.TapticEngine;
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
function hapticSelection() {
    engine && engine.selection();
}

class Toggle {
    constructor() {
        this.activated = false;
        /**
         * If true, the toggle is selected. Defaults to `false`.
         */
        this.checked = false;
        /*
         * If true, the user cannot interact with the toggle. Default false.
         */
        this.disabled = false;
        /**
         * the value of the toggle.
         */
        this.value = 'on';
        this.gestureConfig = {
            'onStart': this.onDragStart.bind(this),
            'onMove': this.onDragMove.bind(this),
            'onEnd': this.onDragEnd.bind(this),
            'gestureName': 'toggle',
            'passive': false,
            'gesturePriority': 30,
            'type': 'pan',
            'direction': 'x',
            'threshold': 0,
            'attachTo': 'parent'
        };
    }
    componentWillLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
        this.inputId = `ion-tg-${toggleIds++}`;
        if (this.name === undefined) {
            this.name = this.inputId;
        }
        this.emitStyle();
    }
    componentDidLoad() {
        this.didLoad = true;
        const parentItem = this.nativeInput.closest('ion-item');
        if (parentItem) {
            const itemLabel = parentItem.querySelector('ion-label');
            if (itemLabel) {
                itemLabel.id = this.inputId + '-lbl';
                this.nativeInput.setAttribute('aria-labelledby', itemLabel.id);
            }
        }
    }
    checkedChanged(isChecked) {
        if (this.didLoad) {
            this.ionChange.emit({
                checked: isChecked,
                value: this.value
            });
        }
        this.emitStyle();
    }
    emitStyle() {
        this.ionStyle.emit({
            'toggle-disabled': this.disabled,
            'toggle-checked': this.checked,
            'toggle-activated': this.activated
        });
    }
    onDragStart(detail) {
        this.pivotX = detail.currentX;
        this.activated = true;
        // touch-action does not work in iOS
        detail.event.preventDefault();
        return true;
    }
    onDragMove(detail) {
        const currentX = detail.currentX;
        if (shouldToggle(this.checked, currentX - this.pivotX, -15)) {
            this.checked = !this.checked;
            this.pivotX = currentX;
            hapticSelection();
        }
    }
    onDragEnd(detail) {
        const delta = detail.currentX - this.pivotX;
        if (shouldToggle(this.checked, delta, 4)) {
            this.checked = !this.checked;
            hapticSelection();
        }
        this.activated = false;
        this.nativeInput.focus();
    }
    onChange() {
        this.checked = !this.checked;
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onFocus() {
        this.ionFocus.emit();
    }
    onBlur() {
        this.keyFocus = false;
        this.ionBlur.emit();
    }
    hostData() {
        return {
            class: {
                'toggle-activated': this.activated,
                'toggle-checked': this.checked,
                'toggle-disabled': this.disabled,
                'toggle-key': this.keyFocus
            }
        };
    }
    render() {
        return [
            h("ion-gesture", Object.assign({}, this.gestureConfig, { disabled: this.disabled, tabIndex: -1 }),
                h("div", { class: 'toggle-icon' },
                    h("div", { class: 'toggle-inner' })),
                h("div", { class: 'toggle-cover' })),
            h("input", { type: 'checkbox', onChange: this.onChange.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onKeyUp: this.onKeyUp.bind(this), checked: this.checked, id: this.inputId, name: this.name, value: this.value, disabled: this.disabled, ref: r => this.nativeInput = r })
        ];
    }
    static get is() { return "ion-toggle"; }
    static get host() { return { "theme": "toggle" }; }
    static get properties() { return { "activated": { "state": true }, "checked": { "type": Boolean, "attr": "checked", "mutable": true, "watchCallbacks": ["checkedChanged"] }, "color": { "type": String, "attr": "color" }, "disabled": { "type": Boolean, "attr": "disabled", "mutable": true, "watchCallbacks": ["emitStyle"] }, "keyFocus": { "state": true }, "mode": { "type": "Any", "attr": "mode" }, "name": { "type": String, "attr": "name", "mutable": true }, "value": { "type": String, "attr": "value" } }; }
    static get events() { return [{ "name": "ionChange", "method": "ionChange", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionFocus", "method": "ionFocus", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionBlur", "method": "ionBlur", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionStyle", "method": "ionStyle", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "ion-toggle {\n  display: inline-block;\n  contain: content;\n  touch-action: none;\n  user-select: none;\n}\n\nion-toggle ion-gesture {\n  display: block;\n  width: 100%;\n  height: 100%;\n  visibility: inherit;\n}\n\n.toggle-cover {\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  outline: none;\n  font-family: inherit;\n  font-style: inherit;\n  font-variant: inherit;\n  line-height: 1;\n  text-transform: none;\n  background: transparent;\n  cursor: pointer;\n}\n\nion-toggle input {\n  left: 0;\n  top: 0;\n  margin: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  pointer-events: none;\n  appearance: none;\n}\n\nion-toggle :focus {\n  outline: none;\n}\n\n.toggle-key input {\n  border: 2px solid #5e9ed6;\n}\n\n.toggle-md {\n  padding: 12px;\n  box-sizing: content-box;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  contain: strict;\n}\n\n.toggle-md .toggle-icon {\n  border-radius: 14px;\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(var(--ion-item-md-border-color-rgb, var(--ion-item-border-color-rgb, 0, 0, 0)), 0.13);\n  transition: background-color 300ms;\n  pointer-events: none;\n}\n\n.toggle-md .toggle-inner {\n  left: 0;\n  top: -3px;\n  border-radius: 50%;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  background-color: var(--ion-background-md-color, var(--ion-background-color, #fff));\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  transition-duration: 300ms;\n  transition-property: transform, background-color;\n  will-change: transform, background-color;\n  contain: strict;\n}\n\n.toggle-md.toggle-checked .toggle-icon {\n  background-color: rgba(var(--ion-color-md-primary-rgb, var(--ion-color-primary-rgb, 56, 128, 255)), 0.5);\n}\n\n.toggle-md.toggle-checked .toggle-inner {\n  transform: translate3d(16px,  0,  0);\n  background-color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.toggle-md.toggle-disabled,\n.item-md.item-toggle-disabled ion-label {\n  opacity: 0.3;\n  pointer-events: none;\n}\n\n.toggle-md.toggle-disabled ion-radio {\n  opacity: 0.3;\n}\n\n.item-md .toggle-md[slot] {\n  margin: 0;\n  padding: 12px 8px 12px 16px;\n  cursor: pointer;\n}\n\n.item-md .toggle-md[slot=\"start\"] {\n  padding: 12px 18px 12px 2px;\n}\n\n.item-md.item-toggle ion-label {\n  margin-left: 0;\n}\n\n.toggle-md-primary.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-primary-tint, var(--ion-color-primary-tint, #4c8dff));\n}\n\n.toggle-md-primary.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.toggle-md-secondary.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-secondary-tint, var(--ion-color-secondary-tint, #24d6ea));\n}\n\n.toggle-md-secondary.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.toggle-md-tertiary.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-tertiary-tint, var(--ion-color-tertiary-tint, #7e57ff));\n}\n\n.toggle-md-tertiary.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.toggle-md-success.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-success-tint, var(--ion-color-success-tint, #28e070));\n}\n\n.toggle-md-success.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.toggle-md-warning.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-warning-tint, var(--ion-color-warning-tint, #ffd31a));\n}\n\n.toggle-md-warning.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.toggle-md-danger.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-danger-tint, var(--ion-color-danger-tint, #f25454));\n}\n\n.toggle-md-danger.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.toggle-md-light.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-light-tint, var(--ion-color-light-tint, #f5f6f9));\n}\n\n.toggle-md-light.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.toggle-md-medium.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-medium-tint, var(--ion-color-medium-tint, #a2a4ab));\n}\n\n.toggle-md-medium.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.toggle-md-dark.toggle-checked .toggle-icon {\n  background-color: var(--ion-color-md-dark-tint, var(--ion-color-dark-tint, #383a3e));\n}\n\n.toggle-md-dark.toggle-checked .toggle-inner {\n  background-color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}"; }
    static get styleMode() { return "md"; }
}
function shouldToggle(checked, deltaX, margin) {
    const isRTL = document.dir === 'rtl';
    if (checked) {
        return (!isRTL && (margin > deltaX)) ||
            (isRTL && (-margin < deltaX));
    }
    else {
        return (!isRTL && (-margin < deltaX)) ||
            (isRTL && (margin > deltaX));
    }
}
let toggleIds = 0;

export { AppProfile, BackButton as IonBackButton, Buttons as IonButtons, Item as IonItem, Label as IonLabel, ToastController as IonToastController, Toggle as IonToggle };
