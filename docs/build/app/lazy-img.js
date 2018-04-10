/*! Built with http://stenciljs.com */
const { h } = window.App;

/*
  You can use this component to lazy load below the fold images to improve load time.
  Below the fold images are images that are not seen by the user until they have started to scroll.
  Instead of loading all these images up front before the user even sees them, which will eat up
  network bandwith, we can use this component to put off loading these images until the user has
  scrolled to where that image is in your PWA.
  To use this component use the following markup: <lazy-img src={/path/to/img} alt={alt text for img}></lazy-img>
*/
class LazyImg {
    componentDidLoad() {
        this.addIntersectionObserver();
    }
    componentDidUnload() {
        this.removeIntersectionObserver();
    }
    componentWillUpdate() {
        if (this.src !== this.oldSrc) {
            this.addIntersectionObserver();
        }
        this.oldSrc = this.src;
    }
    handleImage() {
        const image = this.image;
        image.setAttribute('src', image.getAttribute('data-src') || '');
        image.onload = () => {
            image.removeAttribute('data-src');
            this.lazyImgloaded.emit(image);
        };
    }
    addIntersectionObserver() {
        if (!this.src) {
            return;
        }
        if ('IntersectionObserver' in window) {
            this.io = new IntersectionObserver((data) => {
                // because there will only ever be one instance
                // of the element we are observing
                // we can just use data[0]
                if (data[0].isIntersecting) {
                    this.handleImage();
                    this.removeIntersectionObserver();
                }
            });
            this.io.observe(this.image);
        }
        else {
            // fall back to just loading the image for Safari and IE
            this.handleImage();
        }
    }
    removeIntersectionObserver() {
        if (this.io) {
            this.io.disconnect();
            this.io = null;
        }
    }
    render() {
        return (h("img", { ref: (el) => this.image = el, "data-src": this.src, alt: this.alt, width: this.width }));
    }
    static get is() { return "lazy-img"; }
    static get properties() { return { "alt": { "type": String, "attr": "alt" }, "el": { "elementRef": true }, "oldSrc": { "state": true }, "src": { "type": String, "attr": "src" }, "width": { "type": Number, "attr": "width" } }; }
    static get events() { return [{ "name": "lazyImgloaded", "method": "lazyImgloaded", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return ":host {\n  display: block;\n}\n\nimg {\n  max-width: 100%;\n}"; }
}

export { LazyImg };