/*! Built with http://stenciljs.com */
App.loadBundle("5rpfm2bn",["exports","./chunk1.js"],function(e,t){window.App.h;var i=function(){function e(){this.lastClick=-1e4,this.useTapClick=!1}return e.prototype.tapClickChanged=function(e){this.enableListener(this,"parent:ionActivated",e),this.enableListener(this,"touchstart",!e),this.enableListener(this,"mousedown",!e)},e.prototype.ionActivated=function(e){this.addRipple(e.detail.x,e.detail.y)},e.prototype.touchStart=function(e){this.lastClick=t.now(e);var i=e.touches[0];this.addRipple(i.clientX,i.clientY)},e.prototype.mouseDown=function(e){var i=t.now(e);this.lastClick<i-1e3&&this.addRipple(e.pageX,e.pageY)},e.prototype.componentDidLoad=function(){this.tapClickChanged(this.useTapClick)},e.prototype.addRipple=function(e,t){var i,n,o,a=this;this.dom.read(function(){var p=a.el.getBoundingClientRect(),l=p.width,r=p.height;o=Math.min(2*Math.sqrt(l*l+r*r),600),i=e-p.left-o/2,n=t-p.top-o/2}),this.dom.write(function(){var e=document.createElement("div");e.classList.add("ripple-effect");var t=e.style,p=Math.max(800*Math.sqrt(o/350)+.5,260);t.top=n+"px",t.left=i+"px",t.width=o+"px",t.height=o+"px",t.animationDuration=p+"ms",a.el.appendChild(e),setTimeout(function(){return e.remove()},p+50)})},Object.defineProperty(e,"is",{get:function(){return"ion-ripple-effect"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{addRipple:{method:!0},dom:{context:"dom"},el:{elementRef:!0},enableListener:{context:"enableListener"},useTapClick:{type:Boolean,attr:"use-tap-click",watchCallbacks:["tapClickChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-ripple-effect{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict}.ripple-effect{border-radius:50%;position:absolute;background-color:var(--ion-ripple-background-color,#000);opacity:0;will-change:transform,opacity;pointer-events:none;animation-name:rippleAnimation;animation-duration:.2s;animation-timing-function:ease-out;contain:strict}\@keyframes rippleAnimation{0%{opacity:.2;transform:scale(.05)}100%{opacity:0;transform:scale(1)}}"},enumerable:!0,configurable:!0}),e}();e.IonRippleEffect=i,Object.defineProperty(e,"__esModule",{value:!0})});