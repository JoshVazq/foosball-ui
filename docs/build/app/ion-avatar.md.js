/*! Built with http://stenciljs.com */
const { h } = window.App;

class Avatar {
    static get is() { return "ion-avatar"; }
    static get host() { return { "theme": "avatar" }; }
    static get style() { return "ion-avatar {\n  display: block;\n}\n\nion-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.avatar-md {\n  border-radius: 50%;\n  width: 64px;\n  height: 64px;\n}\n\n.avatar-md ion-img,\n.avatar-md img {\n  border-radius: 50%;\n  overflow: hidden;\n}"; }
    static get styleMode() { return "md"; }
}

export { Avatar as IonAvatar };
