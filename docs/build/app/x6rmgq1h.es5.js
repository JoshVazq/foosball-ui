/*! Built with http://stenciljs.com */
var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(i,s){function a(e){try{l(n.next(e))}catch(e){s(e)}}function r(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){e.done?i(e.value):new o(function(t){t(e.value)}).then(a,r)}l((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var o,n,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:r(0),throw:r(1),return:r(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function r(s){return function(r){return function(s){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,n&&(i=n[2&s[0]?"return":s[0]?"throw":"next"])&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[0,i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,n=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===s[0]||2===s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],n=0}finally{o=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,r])}}};App.loadBundle("x6rmgq1h",["exports","./chunk2.js","./chunk3.js"],function(e,t,o){var n=window.App.h;function i(e,t,o){var n=new e,i=new e,s=t.querySelector(".toast-wrapper");switch(i.addElement(s),o){case"top":i.fromTo("translateY","-100%","10px");break;case"middle":var a=Math.floor(t.clientHeight/2-s.clientHeight/2);s.style.top=a+"px",i.fromTo("opacity",.01,1);break;default:i.fromTo("translateY","100%","-10px")}return Promise.resolve(n.addElement(t).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).add(i))}function s(e,t,o){var n=new e,i=new e,s=t.querySelector(".toast-wrapper");switch(i.addElement(s),o){case"top":i.fromTo("translateY","10px","-100%");break;case"middle":i.fromTo("opacity",.99,0);break;default:i.fromTo("translateY","-10px","100%")}return Promise.resolve(n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(i))}function a(e,t,o){var n=new e,i=new e,s=t.querySelector(".toast-wrapper");switch(i.addElement(s),o){case"top":i.fromTo("translateY","-100%","0%");break;case"middle":var a=Math.floor(t.clientHeight/2-s.clientHeight/2);s.style.top=a+"px",i.fromTo("opacity",.01,1);break;default:i.fromTo("translateY","100%","0%")}return Promise.resolve(n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(i))}function r(e,t,o){var n=new e,i=new e,s=t.querySelector(".toast-wrapper");switch(i.addElement(s),o){case"top":i.fromTo("translateY","0px","-100%");break;case"middle":i.fromTo("opacity",.99,0);break;default:i.fromTo("translateY","0px","100%")}return Promise.resolve(n.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(i))}var l=function(){function e(){this.presented=!1,this.keyboardClose=!1,this.showCloseButton=!1,this.translucent=!1,this.willAnimate=!0}return e.prototype.componentDidLoad=function(){this.ionToastDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionToastDidUnload.emit()},e.prototype.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),this.dismiss()},e.prototype.present=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:return[4,o.present(this,"toastEnter",i,a,this.position)];case 1:return t.sent(),this.duration>0&&(this.durationTimeout=setTimeout(function(){return e.dismiss()},this.duration)),[2]}})})},e.prototype.dismiss=function(e,t){return this.durationTimeout&&clearTimeout(this.durationTimeout),o.dismiss(this,e,t,"toastLeave",s,r,this.position)},e.prototype.onDidDismiss=function(e){return o.eventMethod(this.el,"ionToastDidDismiss",e)},e.prototype.onWillDismiss=function(e){return o.eventMethod(this.el,"ionToastWillDismiss",e)},e.prototype.hostData=function(){var e=this.translucent?t.createThemedClasses(this.mode,this.color,"toast-translucent"):{};return{class:Object.assign({},e,t.getClassMap(this.cssClass))}},e.prototype.render=function(){var e,t=this,o=((e={"toast-wrapper":!0})["toast-"+(this.position?this.position:"bottom")]=!0,e);return n("div",{class:o},n("div",{class:"toast-container"},this.message?n("div",{class:"toast-message"},this.message):null,this.showCloseButton?n("ion-button",{fill:"clear",color:"light",class:"toast-button",onClick:function(){return t.dismiss()}},this.closeButtonText||"Close"):null))},Object.defineProperty(e,"is",{get:function(){return"ion-toast"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"toast"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{animationCtrl:{connect:"ion-animation-controller"},closeButtonText:{type:String,attr:"close-button-text"},config:{context:"config"},cssClass:{type:"Any",attr:"css-class"},dismiss:{method:!0},dismissOnPageChange:{type:Boolean,attr:"dismiss-on-page-change"},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayId:{type:Number,attr:"overlay-id"},position:{type:String,attr:"position"},present:{method:!0},showCloseButton:{type:Boolean,attr:"show-close-button"},translucent:{type:Boolean,attr:"translucent"},willAnimate:{type:Boolean,attr:"will-animate"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionToastDidLoad",method:"ionToastDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidUnload",method:"ionToastDidUnload",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-toast{left:0;top:0;position:absolute;z-index:1000;display:block;width:100%;height:100%;pointer-events:none;contain:strict}.toast-container{display:flex;align-items:center;pointer-events:auto;contain:content}.toast-button{font-size:15px}.toast-message{flex:1}.toast-ios{font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif}.toast-ios .toast-wrapper{left:10px;right:10px;margin:auto;border-radius:14px;position:absolute;z-index:10;display:block;max-width:700px;background:var(--ion-background-ios-color-step-50,var(--ion-background-color-step-50,#f2f2f2))}.toast-translucent-ios .toast-wrapper{background:rgba(var(--ion-background-ios-color-rgb,var(--ion-background-color-rgb,255,255,255)),.8);backdrop-filter:saturate(180%) blur(20px)}.toast-ios .toast-wrapper.toast-top{transform:translate3d(0,-100%,0);top:0}.toast-ios .toast-wrapper.toast-bottom{transform:translate3d(0,100%,0);bottom:0}.toast-ios .toast-wrapper.toast-middle{opacity:.01}.toast-ios .toast-message{padding:15px;font-size:14px;color:var(--ion-text-ios-color-step-150,var(--ion-text-color-step-150,#262626))}.toast-ios .toast-button{color:var(--ion-text-ios-color-step-400,var(--ion-text-color-step-400,#666))}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}();e.IonToast=l,Object.defineProperty(e,"__esModule",{value:!0})});