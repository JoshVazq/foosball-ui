/*! Built with http://stenciljs.com */
App.loadBundle("s0zdbck3",["exports","./chunk1.js","./chunk2.js","./chunk4.js"],function(e,t,n,r){var o=window.App.h,i=function(){function e(){this.playersPositions=[t.PLAYER_POSITION.DEF,t.PLAYER_POSITION.ATK,t.PLAYER_POSITION.ATK,t.PLAYER_POSITION.DEF],this.loading=!0,this.players=[null,null,null,null]}return e.prototype.componentWillLoad=function(){var e=this;db.collection("users").get().then(function(t){var n=[];t.forEach(function(e){var t=Object.assign({},e.data(),{id:e.id});t.displayName=t.nickname?t.nickname:t.name+" "+t.surname,n.push(t)}),e.users=n,e.search(""),e.loading=!1})},e.prototype.search=function(e){var t=e.value,n=new RegExp(t,"i");this.filteredPersons=t?this.users.filter(function(e){return-1!==e.name.search(n)||-1!==e.surname.search(n)||-1!==e.nickname.search(n)}):this.users},e.prototype.getPositionStyle=function(e,t){var n=this.players[e];return n&&n.id===t?"solid":"clear"},e.prototype.selectPlayer=function(e,t){var n=this.players[e];n&&n.id===t.id||(this.players=this.players.map(function(n,r){return e===r?t:n&&n.id===t.id?null:n}))},e.prototype.selectNextPlayer=function(e){var t=this.players.findIndex(function(e){return null===e});-1!==t&&this.selectPlayer(t,e)},e.prototype.getSlicedPlayer=function(e){return{id:e.id,displayName:e.displayName,imageURL:e.imageURL}},e.prototype.startMatch=function(e){var n,r;e.preventDefault(),db.collection("matches").add({startTime:new Date,locals:(n={},n[t.PLAYER_POSITION.DEF]=this.getSlicedPlayer(this.players[0]),n[t.PLAYER_POSITION.ATK]=this.getSlicedPlayer(this.players[1]),n),visitors:(r={},r[t.PLAYER_POSITION.ATK]=this.getSlicedPlayer(this.players[2]),r[t.PLAYER_POSITION.DEF]=this.getSlicedPlayer(this.players[3]),r)}).then(function(e){var t=e.id;window.location.href="/match/"+t}).catch(function(e){console.error("Error adding document: ",e)})},e.prototype.dragAvatar=function(e,t){console.log("startDrag",e),e.dataTransfer.setData("player",t)},e.prototype.onDrop=function(e,t){var n=e.dataTransfer.getData("player");console.log("drop player"),this.selectPlayer(t,this.filteredPersons[n])},e.prototype.renderUserList=function(){var e=this;return o("ion-list",{class:"users"},this.filteredPersons.map(function(t){return o("ion-item",null,o("ion-avatar",null,o("img",{src:t.imageURL})),t.displayName,o("div",{class:"positions"},e.playersPositions.map(function(n,r){return o("ion-button",{round:!0,onClick:function(){return e.selectPlayer(r,t)},fill:e.getPositionStyle(r,t.id)},n)})))}))},e.prototype.renderUsers=function(){var e=this;return o("div",{class:"user-list"},this.filteredPersons.map(function(t,n){return o("ion-avatar",{draggable:!0,onClick:function(){return e.selectNextPlayer(t)},onDragStart:function(t){return e.dragAvatar(t,n)}},o("img",{src:t.imageURL}))}))},e.prototype.getSummaryPlayer=function(e){var t=this,n=this.players[e];return o("div",{class:"player"},o("ion-avatar",{onDrop:function(n){return t.onDrop(n,e)},onDragOver:function(e){return e.preventDefault()}},o("img",{src:n?n.imageURL:"/assets/images/default_avatar.jpg"})),n?o("span",null,n.displayName):null)},e.prototype.renderSummary=function(){return o("div",{class:"players"},o("div",{class:"team"},this.getSummaryPlayer(2),this.getSummaryPlayer(3)),o("span",{class:"versus"},"VS"),o("div",{class:"team"},this.getSummaryPlayer(0),this.getSummaryPlayer(1)))},e.prototype.renderFooter=function(){var e=this;return o("form",{onSubmit:function(t){return e.startMatch(t)},class:"footer"},o("ion-button",{expand:"full",type:"submit",disabled:this.players.some(function(e){return!e})},"Start Match"))},e.prototype.render=function(){var e=this;return o("ion-page",null,o("ion-header",null,o("ion-toolbar",{color:"primary"},o("ion-title",null,"New Match"))),this.loading?o("ion-content",null,"Loading Users"):this.users.length?[o("ion-searchbar",{onIonInput:function(t){return e.search(t.target)}}),o("ion-content",null,this.renderUsers()),this.renderSummary(),o("ion-footer",null,this.renderFooter())]:o("ion-content",null,"Not users yet"))},Object.defineProperty(e,"is",{get:function(){return"app-play"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{filteredPersons:{state:!0},loading:{state:!0},players:{state:!0},toastCtrl:{connect:"ion-toast-controller"},users:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"app-play ion-scroll{padding:15px}app-play .user-list{display:flex;flex-wrap:wrap;justify-content:center}app-play .user-list ion-avatar{margin:10px;width:100px;height:100px;-webkit-user-drag:element}app-play ion-list.users ion-avatar{margin-right:10px}app-play ion-list.users .positions{margin-left:auto}app-play ion-list.users .positions ion-button:nth-child(n+3){--ion-color-primary:#e03131;--ion-color-primary-shade:#ff3838}app-play .players{display:flex;flex-direction:column;align-items:center;justify-content:space-around;background-image:url(/assets/images/foosball-table.svg);width:100%;height:40%;background-size:100% 100%;background-repeat:no-repeat;background-position:center}\@media only screen and (min-width:455px){app-play .players{height:50%}}app-play .players .team{display:flex;width:60%;justify-content:space-between}\@media only screen and (min-width:455px){app-play .players .team{max-width:325px}app-play .players .team:first-child{margin-left:56px}app-play .players .team:last-child{margin-left:-56px}app-play .players .team .player ion-avatar{width:100px;height:100px}}app-play .players .team ion-avatar{border:3px solid}app-play .players .team:first-child .player ion-avatar{border-color:#e03131}app-play .players .team:last-child .player ion-avatar{border-color:#3171e0}app-play .players .team .player{display:flex;flex-direction:column;align-items:center}app-play .players .team .player span{text-align:center;min-height:20px;background:#fff;margin-top:6px;padding:5px;border:1px solid #5f5f5f}app-play .players .versus{font-size:40px;font-weight:700;background:#fff;border-radius:50%}app-play .footer{padding:10px}"},enumerable:!0,configurable:!0}),e}(),a=function(){function e(){this.translucent=!1}return e.prototype.hostData=function(){var e=this.translucent?n.createThemedClasses(this.mode,this.color,"header-translucent"):{};return{class:Object.assign({},e)}},Object.defineProperty(e,"is",{get:function(){return"ion-footer"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"footer"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-footer{position:relative;z-index:10;display:block;order:1;width:100%}.footer-translucent-ios{backdrop-filter:saturate(180%) blur(20px)}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),s=function(){function e(){}return e.prototype.getOpenItem=function(){return this.openItem},e.prototype.setOpenItem=function(e){this.openItem=e},e.prototype.closeSlidingItems=function(){return!!this.openItem&&(this.openItem.close(),this.openItem=null,!0)},Object.defineProperty(e,"is",{get:function(){return"ion-list"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"list"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{closeSlidingItems:{method:!0},getOpenItem:{method:!0},setOpenItem:{method:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-list{margin:0;padding:0;display:block;contain:content;list-style-type:none}ion-list[inset]{overflow:hidden;transform:translateZ(0)}.list-ios{margin:-1px 0 32px}.list-ios .item[no-lines],.list-ios .item[no-lines] .item-inner{border-width:0}.list-ios:not([inset])+.list-ios:not([inset]) ion-list-header{margin-top:-10px;padding-top:0}.list-ios[inset]{margin:16px;border-radius:4px}.list-ios[inset] ion-list-header{background-color:var(--ion-item-ios-background-color,var(--ion-background-ios-color,var(--ion-background-color,#fff)))}.list-ios[inset] .item{border-bottom:1px solid var(--ion-item-ios-border-color,var(--ion-item-border-color,#c8c7cc))}.list-ios[inset] .item-inner{border-bottom:0}.list-ios[inset]>ion-item-sliding:first-child .item,.list-ios[inset]>ion-item:first-child .item{border-top:0}.list-ios[inset]>ion-item-sliding:last-child .item,.list-ios[inset]>ion-item:last-child .item{border-bottom:0}.list-ios[inset]+ion-list[inset]{margin-top:0}.list-ios[no-lines] .item,.list-ios[no-lines] .item-inner,.list-ios[no-lines] ion-list-header{border-width:0}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),l=function(){function e(){this.isCancelVisible=!1,this.shouldBlur=!0,this.shouldAlignLeft=!0,this.activated=!1,this.focused=!1,this.animated=!1,this.autocomplete="off",this.autocorrect="off",this.cancelButtonText="Cancel",this.debounce=250,this.placeholder="Search",this.showCancelButton=!1,this.spellcheck=!1,this.type="search"}return e.prototype.debounceChanged=function(){this.ionInput=r.debounceEvent(this.ionInput,this.debounce)},e.prototype.componentDidLoad=function(){this.positionElements(),this.debounceChanged()},e.prototype.clearInput=function(e){var t=this;this.ionClear.emit({event:e}),setTimeout(function(){var n=t.value;void 0!==n&&""!==n&&(t.value="",t.ionInput.emit({event:e}))},64),this.shouldBlur=!1},e.prototype.cancelSearchbar=function(e){this.ionCancel.emit({event:e}),this.clearInput(e),this.shouldBlur=!0,this.activated=!1},e.prototype.inputChanged=function(e){this.value=e.target&&e.target.value,this.ionInput.emit(e)},e.prototype.inputUpdated=function(){this.positionElements()},e.prototype.inputBlurred=function(){var e=this.el.querySelector(".searchbar-input");if(!1===this.shouldBlur)return e.focus(),this.shouldBlur=!0,this.ionBlur.emit({this:this}),void this.inputUpdated();this.focused=!1,this.positionElements()},e.prototype.inputFocused=function(){this.activated=!0,this.focused=!0,this.ionFocus.emit({this:this}),this.inputUpdated(),this.positionElements()},e.prototype.positionElements=function(){var e=this.shouldAlignLeft,t=!this.animated||this.value&&""!==this.value.toString().trim()||!0===this.focused;this.shouldAlignLeft=t,"ios"===this.mode&&(e!==t&&this.positionPlaceholder(),this.animated&&this.positionCancelButton())},e.prototype.positionPlaceholder=function(){var e="rtl"===document.dir,t=this.el.querySelector(".searchbar-input"),n=this.el.querySelector(".searchbar-search-icon");if(this.shouldAlignLeft)t.removeAttribute("style"),n.removeAttribute("style");else{var r=document.createElement("span");r.innerHTML=this.placeholder,document.body.appendChild(r);var o=r.offsetWidth;document.body.removeChild(r);var i="calc(50% - "+o/2+"px)",a="calc(50% - "+(o/2+30)+"px)";e?(t.style.paddingRight=i,n.style.marginRight=a):(t.style.paddingLeft=i,n.style.marginLeft=a)}},e.prototype.positionCancelButton=function(){var e="rtl"===document.dir,t=this.el.querySelector(".searchbar-cancel-button-ios"),n=this.focused;if(n!==this.isCancelVisible){var r=t.style;if(this.isCancelVisible=n,n)e?r.marginLeft="0":r.marginRight="0";else{var o=t.offsetWidth;o>0&&(e?r.marginLeft=-o+"px":r.marginRight=-o+"px")}}},e.prototype.hostData=function(){return{class:{"searchbar-active":this.activated,"searchbar-animated":this.animated,"searchbar-has-value":void 0!==this.value&&""!==this.value,"searchbar-show-cancel":this.showCancelButton,"searchbar-left-aligned":this.shouldAlignLeft,"searchbar-has-focus":this.focused}}},e.prototype.render=function(){var e=n.createThemedClasses(this.mode,this.color,"searchbar-cancel-button"),t=n.createThemedClasses(this.mode,this.color,"searchbar-search-icon"),r=this.showCancelButton?o("button",{type:"button",tabindex:"ios"!==this.mode||this.activated?void 0:-1,onClick:this.cancelSearchbar.bind(this),onMouseDown:this.cancelSearchbar.bind(this),class:e},"md"===this.mode?o("ion-icon",{name:"md-arrow-back"}):this.cancelButtonText):null,i=[o("div",{class:"searchbar-input-container"},"md"===this.mode?r:null,o("div",{class:t}),o("input",{class:"searchbar-input",onInput:this.inputChanged.bind(this),onBlur:this.inputBlurred.bind(this),onFocus:this.inputFocused.bind(this),placeholder:this.placeholder,type:this.type,value:this.value,autoComplete:this.autocomplete,autoCorrect:this.autocorrect,spellCheck:this.spellcheck}),o("button",{type:"button",class:"searchbar-clear-icon",onClick:this.clearInput.bind(this),onMouseDown:this.clearInput.bind(this)}))];return r&&"ios"===this.mode&&i.push(r),i},Object.defineProperty(e,"is",{get:function(){return"ion-searchbar"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"searchbar"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activated:{state:!0},animated:{type:Boolean,attr:"animated"},autocomplete:{type:String,attr:"autocomplete"},autocorrect:{type:String,attr:"autocorrect"},cancelButtonText:{type:String,attr:"cancel-button-text"},color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},el:{elementRef:!0},focused:{state:!0},mode:{type:"Any",attr:"mode"},placeholder:{type:String,attr:"placeholder"},showCancelButton:{type:Boolean,attr:"show-cancel-button"},spellcheck:{type:Boolean,attr:"spellcheck"},type:{type:String,attr:"type"},value:{type:String,attr:"value",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionInput",method:"ionInput",bubbles:!0,cancelable:!0,composed:!0},{name:"ionCancel",method:"ionCancel",bubbles:!0,cancelable:!0,composed:!0},{name:"ionClear",method:"ionClear",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-searchbar{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box;position:relative;display:flex;align-items:center;width:100%}.searchbar-icon{pointer-events:none}.searchbar-input-container{position:relative;display:block;flex-shrink:1;width:100%}.searchbar-input{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;box-sizing:border-box;display:block;width:100%;border:0;font-family:inherit}.searchbar-input:active,.searchbar-input:focus{outline:0}.searchbar-input::-webkit-search-cancel-button{display:none}.searchbar-clear-icon{margin:0;padding:0;display:none;min-height:0}.searchbar-has-value.searchbar-has-focus .searchbar-clear-icon{display:block}.searchbar-ios{padding:12px;height:60px;font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif;contain:strict}.searchbar-ios .searchbar-input-container{height:36px;contain:strict}.searchbar-search-icon-ios{background-position:center;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");margin-left:calc(50% - 60px);left:9px;top:0;position:absolute;width:14px;height:100%;background-repeat:no-repeat;background-size:13px;contain:strict}.searchbar-ios .searchbar-input{padding:0 28px;border-radius:10px;height:100%;font-size:14px;font-weight:400;color:var(--ion-text-ios-color,var(--ion-text-color,#000));background-color:rgba(var(--ion-text-ios-color-rgb,var(--ion-text-color-rgb,0,0,0)),.07);contain:strict}.searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-text-ios-color-step-400,var(--ion-text-color-step-400,#666))}.searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-text-ios-color-step-400,var(--ion-text-color-step-400,#666))}.searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-text-ios-color-step-400,var(--ion-text-color-step-400,#666))}.searchbar-ios .searchbar-clear-icon{right:0;top:0;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");background-position:center;position:absolute;width:30px;height:100%;border:0;background-color:transparent;background-repeat:no-repeat;background-size:18px}.searchbar-cancel-button-ios{padding:0 0 0 8px;display:none;flex-shrink:0;border:0;font-size:16px;color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));background-color:transparent;cursor:pointer}.searchbar-left-aligned .searchbar-search-icon-ios{margin-left:0}.searchbar-ios.searchbar-left-aligned .searchbar-input{padding-left:30px}.searchbar-show-cancel.searchbar-animated .searchbar-cancel-button-ios,.searchbar-show-cancel.searchbar-has-focus .searchbar-cancel-button-ios{display:block}.searchbar-animated .searchbar-search-icon-ios,.searchbar-ios.searchbar-animated .searchbar-input{transition:all .3s ease}.searchbar-animated.searchbar-has-focus .searchbar-cancel-button-ios{opacity:1;pointer-events:auto}.searchbar-animated .searchbar-cancel-button-ios{margin-right:-100%;transform:translate3d(0,0,0);opacity:0;transition:all .3s ease;pointer-events:none}.searchbar-ios-primary .searchbar-cancel-button-ios{color:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.enable-hover .searchbar-ios-primary .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-primary-tint,var(--ion-color-primary-tint,#4c8dff))}.toolbar-ios-primary .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-primary .searchbar-ios .searchbar-input{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));background:rgba(var(--ion-color-ios-primary-contrast-rgb,var(--ion-color-primary-contrast-rgb,255,255,255)),.07)}.toolbar-ios-primary .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));opacity:.5}.toolbar-ios-primary .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));opacity:.5}.toolbar-ios-primary .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff));opacity:.5}.toolbar-ios-primary .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-primary .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-primary-contrast,var(--ion-color-primary-contrast,#fff))}.searchbar-ios-secondary .searchbar-cancel-button-ios{color:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.enable-hover .searchbar-ios-secondary .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-secondary-tint,var(--ion-color-secondary-tint,#24d6ea))}.toolbar-ios-secondary .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-secondary .searchbar-ios .searchbar-input{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));background:rgba(var(--ion-color-ios-secondary-contrast-rgb,var(--ion-color-secondary-contrast-rgb,255,255,255)),.07)}.toolbar-ios-secondary .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));opacity:.5}.toolbar-ios-secondary .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));opacity:.5}.toolbar-ios-secondary .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff));opacity:.5}.toolbar-ios-secondary .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-secondary .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-secondary-contrast,var(--ion-color-secondary-contrast,#fff))}.searchbar-ios-tertiary .searchbar-cancel-button-ios{color:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#7044ff))}.enable-hover .searchbar-ios-tertiary .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-tertiary-tint,var(--ion-color-tertiary-tint,#7e57ff))}.toolbar-ios-tertiary .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-tertiary .searchbar-ios .searchbar-input{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));background:rgba(var(--ion-color-ios-tertiary-contrast-rgb,var(--ion-color-tertiary-contrast-rgb,255,255,255)),.07)}.toolbar-ios-tertiary .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));opacity:.5}.toolbar-ios-tertiary .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));opacity:.5}.toolbar-ios-tertiary .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff));opacity:.5}.toolbar-ios-tertiary .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-tertiary .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-tertiary-contrast,var(--ion-color-tertiary-contrast,#fff))}.searchbar-ios-success .searchbar-cancel-button-ios{color:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.enable-hover .searchbar-ios-success .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-success-tint,var(--ion-color-success-tint,#28e070))}.toolbar-ios-success .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-success .searchbar-ios .searchbar-input{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));background:rgba(var(--ion-color-ios-success-contrast-rgb,var(--ion-color-success-contrast-rgb,255,255,255)),.07)}.toolbar-ios-success .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));opacity:.5}.toolbar-ios-success .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));opacity:.5}.toolbar-ios-success .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff));opacity:.5}.toolbar-ios-success .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-success .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-success-contrast,var(--ion-color-success-contrast,#fff))}.searchbar-ios-warning .searchbar-cancel-button-ios{color:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.enable-hover .searchbar-ios-warning .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-warning-tint,var(--ion-color-warning-tint,#ffd31a))}.toolbar-ios-warning .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-warning .searchbar-ios .searchbar-input{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));background:rgba(var(--ion-color-ios-warning-contrast-rgb,var(--ion-color-warning-contrast-rgb,0,0,0)),.07)}.toolbar-ios-warning .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));opacity:.5}.toolbar-ios-warning .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));opacity:.5}.toolbar-ios-warning .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000));opacity:.5}.toolbar-ios-warning .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-warning .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-warning-contrast,var(--ion-color-warning-contrast,#000))}.searchbar-ios-danger .searchbar-cancel-button-ios{color:var(--ion-color-ios-danger,var(--ion-color-danger,#f04141))}.enable-hover .searchbar-ios-danger .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-danger-tint,var(--ion-color-danger-tint,#f25454))}.toolbar-ios-danger .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-danger .searchbar-ios .searchbar-input{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));background:rgba(var(--ion-color-ios-danger-contrast-rgb,var(--ion-color-danger-contrast-rgb,255,255,255)),.07)}.toolbar-ios-danger .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));opacity:.5}.toolbar-ios-danger .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));opacity:.5}.toolbar-ios-danger .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff));opacity:.5}.toolbar-ios-danger .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-danger .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-danger-contrast,var(--ion-color-danger-contrast,#fff))}.searchbar-ios-light .searchbar-cancel-button-ios{color:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.enable-hover .searchbar-ios-light .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-light-tint,var(--ion-color-light-tint,#f5f6f9))}.toolbar-ios-light .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-light .searchbar-ios .searchbar-input{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));background:rgba(var(--ion-color-ios-light-contrast-rgb,var(--ion-color-light-contrast-rgb,0,0,0)),.07)}.toolbar-ios-light .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));opacity:.5}.toolbar-ios-light .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));opacity:.5}.toolbar-ios-light .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000));opacity:.5}.toolbar-ios-light .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-light .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-light-contrast,var(--ion-color-light-contrast,#000))}.searchbar-ios-medium .searchbar-cancel-button-ios{color:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.enable-hover .searchbar-ios-medium .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-medium-tint,var(--ion-color-medium-tint,#a2a4ab))}.toolbar-ios-medium .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-medium .searchbar-ios .searchbar-input{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));background:rgba(var(--ion-color-ios-medium-contrast-rgb,var(--ion-color-medium-contrast-rgb,0,0,0)),.07)}.toolbar-ios-medium .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));opacity:.5}.toolbar-ios-medium .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));opacity:.5}.toolbar-ios-medium .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000));opacity:.5}.toolbar-ios-medium .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-medium .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-medium-contrast,var(--ion-color-medium-contrast,#000))}.searchbar-ios-dark .searchbar-cancel-button-ios{color:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.enable-hover .searchbar-ios-dark .searchbar-cancel-button-ios:hover{color:var(--ion-color-ios-dark-tint,var(--ion-color-dark-tint,#383a3e))}.toolbar-ios-dark .searchbar-search-icon-ios{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");opacity:.5}.toolbar-ios-dark .searchbar-ios .searchbar-input{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));background:rgba(var(--ion-color-ios-dark-contrast-rgb,var(--ion-color-dark-contrast-rgb,255,255,255)),.07)}.toolbar-ios-dark .searchbar-ios .searchbar-input::-moz-placeholder{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));opacity:.5}.toolbar-ios-dark .searchbar-ios .searchbar-input:-ms-input-placeholder{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));opacity:.5}.toolbar-ios-dark .searchbar-ios .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff));opacity:.5}.toolbar-ios-dark .searchbar-ios .searchbar-clear-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");opacity:.5}.toolbar-ios-dark .searchbar-ios .searchbar-cancel-button-ios{color:var(--ion-color-ios-dark-contrast,var(--ion-color-dark-contrast,#fff))}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}();e.AppPlay=i,e.IonFooter=a,e.IonList=s,e.IonSearchbar=l,Object.defineProperty(e,"__esModule",{value:!0})});