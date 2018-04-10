/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppHome {
    render() {
        return (h("ion-page", null,
            h("ion-header", null,
                h("ion-toolbar", { color: 'primary' },
                    h("ion-title", null, "Ionic PWA Toolkit"))),
            h("ion-content", null,
                h("p", null,
                    "Welcome to the Ionic PWA Toolkit. You can use this starter to build entire PWAs all with web components using Stencil and ionic/core! Check out the readme for everything that comes in this starter out of the box and Check out our docs on ",
                    h("a", { href: 'https://stenciljs.com' }, "stenciljs.com"),
                    " to get started."),
                h("ion-button", { href: '/profile/stencil' }, "Profile page"))));
    }
    static get is() { return "app-home"; }
    static get style() { return "app-home ion-scroll {\n  padding: 15px;\n}"; }
}

export { AppHome };
