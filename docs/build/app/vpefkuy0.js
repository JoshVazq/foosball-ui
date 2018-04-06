/*! Built with http://stenciljs.com */
const{h:t}=window.App;import{getButtonClassMap as e,getElementClassMap as o,openURL as n}from"./chunk2.js";class s{constructor(){this.type="button",this.buttonType="button",this.disabled=!1,this.fill="default",this.round=!1,this.strong=!1,this.goBack=!1}componentWillLoad(){this.el.closest("ion-buttons")&&(this.buttonType="bar-button")}onFocus(){this.ionFocus.emit()}onKeyUp(){this.keyFocus=!0}onBlur(){this.keyFocus=!1,this.ionBlur.emit()}render(){const{buttonType:s,color:r,expand:l,fill:a,mode:u,round:c,size:d,strong:p}=this,b=this.href?"a":"button",h=Object.assign({},e(s,u),i(s,l,u),i(s,d,u),i(s,c?"round":null,u),i(s,p?"strong":null,u),function(t,e,o,n){let s=t;"bar-button"!==t&&"solid"===o&&(o="default"),o&&"default"!==o&&(s+=`-${o.toLowerCase()}`),"bar-button"===t&&"default"===o&&(s=t,e||(s+="-"+o.toLowerCase()));const i={[s]:!0,[`${s}-${n}`]:!0};return e&&(i[`${s}-${n}-${e}`]=!0),i}(s,r,a,u),o(this.el.classList),{focused:this.keyFocus}),y="button"===b?{type:this.type}:{href:this.href};return t(b,Object.assign({},y,{class:h,disabled:this.disabled,onFocus:this.onFocus.bind(this),onKeyUp:this.onKeyUp.bind(this),onClick:t=>n(this.href,t,this.goBack),onBlur:this.onBlur.bind(this)}),t("span",{class:"button-inner"},t("slot",{name:"icon-only"}),t("slot",{name:"start"}),t("span",{class:"button-text"},t("slot",null)),t("slot",{name:"end"})),"md"===this.mode&&t("ion-ripple-effect",{useTapClick:!0}))}static get is(){return"ion-button"}static get properties(){return{buttonType:{type:String,attr:"button-type",mutable:!0},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},expand:{type:"Any",attr:"expand"},fill:{type:"Any",attr:"fill"},goBack:{type:Boolean,attr:"go-back"},href:{type:String,attr:"href"},keyFocus:{state:!0},mode:{type:"Any",attr:"mode"},round:{type:Boolean,attr:"round"},size:{type:"Any",attr:"size"},strong:{type:Boolean,attr:"strong"},type:{type:String,attr:"type"}}}static get events(){return[{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-align:center;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;position:relative;z-index:0;display:inline-block;border:0;line-height:1;text-decoration:none;text-overflow:ellipsis;text-transform:none;white-space:nowrap;cursor:pointer;vertical-align:top;vertical-align:-webkit-baseline-middle;transition:background-color,opacity .1s linear;font-kerning:none;user-select:none;contain:content}.button:active,.button:focus{outline:0}.button-inner{display:flex;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%}.button[disabled],a[disabled],button[disabled]{cursor:default;pointer-events:none}.button-block{display:block;clear:both;width:100%;contain:strict}.button-block::after{clear:both}.button-full{display:block;width:100%;contain:strict}.button-full.button-outline{border-radius:0;border-right-width:0;border-left-width:0}.button ion-icon{font-size:1.4em;pointer-events:none}.button ion-icon[slot=start]{margin:0 .3em 0 -.3em}.button ion-icon[slot=end]{margin:0 -.2em 0 .3em}.button ion-icon[slot=icon-only]{font-size:1.8em}.button-ios{border-radius:8px;margin:4px 2px;padding:0 1em;height:2.8em;font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif;font-size:16px;font-weight:500;letter-spacing:-.03em;color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));background-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.button-ios.activated{background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0));opacity:1}.button-ios.focused{background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0))}.enable-hover .button-ios:hover{opacity:.8}.button[disabled],a[disabled],button[disabled]{opacity:.5}.button-large-ios{padding:0 1em;height:2.8em;font-size:20px}.button-small-ios{padding:0 .9em;height:2.1em;font-size:13px}.button-block-ios{margin-left:0;margin-right:0}.button-full-ios{margin-left:0;margin-right:0;border-radius:0;border-right-width:0;border-left-width:0}.button-outline-ios{border-radius:8px;border-width:1px;border-style:solid;border-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background-color:transparent}.button-outline-ios.activated{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));background-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));opacity:1}.button-outline-ios.focused{background-color:rgba(var(--ion-color-ios-primary-rgb,var(--ion-color-primary-rgb,56,128,255)),.25)}.button-outline-ios.activated.focused{border-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0));background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0))}.button-clear-ios{border-color:transparent;color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background-color:transparent}.button-clear-ios.activated{background-color:transparent;opacity:.4}.button-clear-ios.focused{background-color:rgba(var(--ion-color-ios-primary-rgb,var(--ion-color-primary-rgb,56,128,255)),.25)}.enable-hover .button-clear-ios:hover{color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));opacity:.6}.button-round-ios{border-radius:64px;padding:0 26px}.button-ios-primary{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));background-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.button-ios-primary.activated{background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0))}.button-ios-primary.focused{background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0))}.button-outline-ios-primary{border-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background-color:transparent}.button-outline-ios-primary.activated{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));background-color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.button-outline-ios-primary.focused{background-color:rgba(var(--ion-color-ios-primary-rgb,var(--ion-color-primary-rgb,56,128,255)),.25)}.button-outline-ios-primary.activated.focused{border-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0));background-color:var(--ion-color-ios-primary-shade,var(--ion-color-primary-shade,#3171e0))}.button-clear-ios-primary{border-color:transparent;color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background-color:transparent}.button-clear-ios-primary.activated{opacity:.4}.button-clear-ios-primary.focused{background-color:rgba(var(--ion-color-ios-primary-rgb,var(--ion-color-primary-rgb,56,128,255)),.25)}.enable-hover .button-clear-ios-primary:hover{color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.button-ios-secondary{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));background-color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.button-ios-secondary.activated{background-color:var(--ion-color-ios-secondary-shade,var(--ion-color-secondary-shade,#0bb8cc))}.button-ios-secondary.focused{background-color:var(--ion-color-ios-secondary-shade,var(--ion-color-secondary-shade,#0bb8cc))}.button-outline-ios-secondary{border-color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));background-color:transparent}.button-outline-ios-secondary.activated{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));background-color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.button-outline-ios-secondary.focused{background-color:rgba(var(--ion-color-ios-secondary-rgb,var(--ion-color-secondary-rgb,12,209,232)),.25)}.button-outline-ios-secondary.activated.focused{border-color:var(--ion-color-ios-secondary-shade,var(--ion-color-secondary-shade,#0bb8cc));background-color:var(--ion-color-ios-secondary-shade,var(--ion-color-secondary-shade,#0bb8cc))}.button-clear-ios-secondary{border-color:transparent;color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));background-color:transparent}.button-clear-ios-secondary.activated{opacity:.4}.button-clear-ios-secondary.focused{background-color:rgba(var(--ion-color-ios-secondary-rgb,var(--ion-color-secondary-rgb,12,209,232)),.25)}.enable-hover .button-clear-ios-secondary:hover{color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.button-ios-tertiary{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));background-color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff))}.button-ios-tertiary.activated{background-color:var(--ion-color-ios-tertiary-shade,var(--ion-color-tertiary-shade,#633ce0))}.button-ios-tertiary.focused{background-color:var(--ion-color-ios-tertiary-shade,var(--ion-color-tertiary-shade,#633ce0))}.button-outline-ios-tertiary{border-color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff));color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff));background-color:transparent}.button-outline-ios-tertiary.activated{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));background-color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff))}.button-outline-ios-tertiary.focused{background-color:rgba(var(--ion-color-ios-tertiary-rgb,var(--ion-color-tertiary-rgb,112,68,255)),.25)}.button-outline-ios-tertiary.activated.focused{border-color:var(--ion-color-ios-tertiary-shade,var(--ion-color-tertiary-shade,#633ce0));background-color:var(--ion-color-ios-tertiary-shade,var(--ion-color-tertiary-shade,#633ce0))}.button-clear-ios-tertiary{border-color:transparent;color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff));background-color:transparent}.button-clear-ios-tertiary.activated{opacity:.4}.button-clear-ios-tertiary.focused{background-color:rgba(var(--ion-color-ios-tertiary-rgb,var(--ion-color-tertiary-rgb,112,68,255)),.25)}.enable-hover .button-clear-ios-tertiary:hover{color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff))}.button-ios-success{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));background-color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.button-ios-success.activated{background-color:var(--ion-color-ios-success-shade,var(--ion-color-success-shade,#0ec254))}.button-ios-success.focused{background-color:var(--ion-color-ios-success-shade,var(--ion-color-success-shade,#0ec254))}.button-outline-ios-success{border-color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));background-color:transparent}.button-outline-ios-success.activated{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));background-color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.button-outline-ios-success.focused{background-color:rgba(var(--ion-color-ios-success-rgb,var(--ion-color-success-rgb,16,220,96)),.25)}.button-outline-ios-success.activated.focused{border-color:var(--ion-color-ios-success-shade,var(--ion-color-success-shade,#0ec254));background-color:var(--ion-color-ios-success-shade,var(--ion-color-success-shade,#0ec254))}.button-clear-ios-success{border-color:transparent;color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));background-color:transparent}.button-clear-ios-success.activated{opacity:.4}.button-clear-ios-success.focused{background-color:rgba(var(--ion-color-ios-success-rgb,var(--ion-color-success-rgb,16,220,96)),.25)}.enable-hover .button-clear-ios-success:hover{color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.button-ios-warning{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));background-color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.button-ios-warning.activated{background-color:var(--ion-color-ios-warning-shade,var(--ion-color-warning-shade,#e0b500))}.button-ios-warning.focused{background-color:var(--ion-color-ios-warning-shade,var(--ion-color-warning-shade,#e0b500))}.button-outline-ios-warning{border-color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));background-color:transparent}.button-outline-ios-warning.activated{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));background-color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.button-outline-ios-warning.focused{background-color:rgba(var(--ion-color-ios-warning-rgb,var(--ion-color-warning-rgb,255,206,0)),.25)}.button-outline-ios-warning.activated.focused{border-color:var(--ion-color-ios-warning-shade,var(--ion-color-warning-shade,#e0b500));background-color:var(--ion-color-ios-warning-shade,var(--ion-color-warning-shade,#e0b500))}.button-clear-ios-warning{border-color:transparent;color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));background-color:transparent}.button-clear-ios-warning.activated{opacity:.4}.button-clear-ios-warning.focused{background-color:rgba(var(--ion-color-ios-warning-rgb,var(--ion-color-warning-rgb,255,206,0)),.25)}.enable-hover .button-clear-ios-warning:hover{color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.button-ios-danger{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));background-color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.button-ios-danger.activated{background-color:var(--ion-color-ios-danger-shade,var(--ion-color-danger-shade,#d33939))}.button-ios-danger.focused{background-color:var(--ion-color-ios-danger-shade,var(--ion-color-danger-shade,#d33939))}.button-outline-ios-danger{border-color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141));color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141));background-color:transparent}.button-outline-ios-danger.activated{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));background-color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.button-outline-ios-danger.focused{background-color:rgba(var(--ion-color-ios-danger-rgb,var(--ion-color-danger-rgb,240,65,65)),.25)}.button-outline-ios-danger.activated.focused{border-color:var(--ion-color-ios-danger-shade,var(--ion-color-danger-shade,#d33939));background-color:var(--ion-color-ios-danger-shade,var(--ion-color-danger-shade,#d33939))}.button-clear-ios-danger{border-color:transparent;color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141));background-color:transparent}.button-clear-ios-danger.activated{opacity:.4}.button-clear-ios-danger.focused{background-color:rgba(var(--ion-color-ios-danger-rgb,var(--ion-color-danger-rgb,240,65,65)),.25)}.enable-hover .button-clear-ios-danger:hover{color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.button-ios-light{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));background-color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.button-ios-light.activated{background-color:var(--ion-color-ios-light-shade,var(--ion-color-light-shade,#d7d8da))}.button-ios-light.focused{background-color:var(--ion-color-ios-light-shade,var(--ion-color-light-shade,#d7d8da))}.button-outline-ios-light{border-color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));background-color:transparent}.button-outline-ios-light.activated{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));background-color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.button-outline-ios-light.focused{background-color:rgba(var(--ion-color-ios-light-rgb,var(--ion-color-light-rgb,244,245,248)),.25)}.button-outline-ios-light.activated.focused{border-color:var(--ion-color-ios-light-shade,var(--ion-color-light-shade,#d7d8da));background-color:var(--ion-color-ios-light-shade,var(--ion-color-light-shade,#d7d8da))}.button-clear-ios-light{border-color:transparent;color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));background-color:transparent}.button-clear-ios-light.activated{opacity:.4}.button-clear-ios-light.focused{background-color:rgba(var(--ion-color-ios-light-rgb,var(--ion-color-light-rgb,244,245,248)),.25)}.enable-hover .button-clear-ios-light:hover{color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.button-ios-medium{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));background-color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.button-ios-medium.activated{background-color:var(--ion-color-ios-medium-shade,var(--ion-color-medium-shade,#86888f))}.button-ios-medium.focused{background-color:var(--ion-color-ios-medium-shade,var(--ion-color-medium-shade,#86888f))}.button-outline-ios-medium{border-color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));background-color:transparent}.button-outline-ios-medium.activated{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));background-color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.button-outline-ios-medium.focused{background-color:rgba(var(--ion-color-ios-medium-rgb,var(--ion-color-medium-rgb,152,154,162)),.25)}.button-outline-ios-medium.activated.focused{border-color:var(--ion-color-ios-medium-shade,var(--ion-color-medium-shade,#86888f));background-color:var(--ion-color-ios-medium-shade,var(--ion-color-medium-shade,#86888f))}.button-clear-ios-medium{border-color:transparent;color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));background-color:transparent}.button-clear-ios-medium.activated{opacity:.4}.button-clear-ios-medium.focused{background-color:rgba(var(--ion-color-ios-medium-rgb,var(--ion-color-medium-rgb,152,154,162)),.25)}.enable-hover .button-clear-ios-medium:hover{color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.button-ios-dark{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));background-color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.button-ios-dark.activated{background-color:var(--ion-color-ios-dark-shade,var(--ion-color-dark-shade,#1e2023))}.button-ios-dark.focused{background-color:var(--ion-color-ios-dark-shade,var(--ion-color-dark-shade,#1e2023))}.button-outline-ios-dark{border-color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));background-color:transparent}.button-outline-ios-dark.activated{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));background-color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.button-outline-ios-dark.focused{background-color:rgba(var(--ion-color-ios-dark-rgb,var(--ion-color-dark-rgb,34,36,40)),.25)}.button-outline-ios-dark.activated.focused{border-color:var(--ion-color-ios-dark-shade,var(--ion-color-dark-shade,#1e2023));background-color:var(--ion-color-ios-dark-shade,var(--ion-color-dark-shade,#1e2023))}.button-clear-ios-dark{border-color:transparent;color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));background-color:transparent}.button-clear-ios-dark.activated{opacity:.4}.button-clear-ios-dark.focused{background-color:rgba(var(--ion-color-ios-dark-rgb,var(--ion-color-dark-rgb,34,36,40)),.25)}.enable-hover .button-clear-ios-dark:hover{color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.button-strong-ios{font-weight:600}"}static get styleMode(){return"ios"}}function i(t,e,o){return e?{[`${t}-${e=e.toLocaleLowerCase()}`]:!0,[`${t}-${e}-${o}`]:!0}:{}}export{s as IonButton};