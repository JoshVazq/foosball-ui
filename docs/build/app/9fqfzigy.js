/*! Built with http://stenciljs.com */
const{h:t}=window.App;import{PLAYER_POSITION as e}from"./chunk1.js";import{createThemedClasses as s}from"./chunk2.js";import{debounceEvent as i}from"./chunk4.js";class a{constructor(){this.playersPositions=[e.DEF,e.ATK,e.ATK,e.DEF],this.loading=!0,this.players=[null,null,null,null]}componentWillLoad(){db.collection("users").get().then(t=>{const e=[];t.forEach(t=>{const s=Object.assign({},t.data(),{id:t.id});s.displayName=s.nickname?s.nickname:`${s.name} ${s.surname}`,e.push(s)}),this.users=e,this.search(""),this.loading=!1})}search(t){const e=t.value,s=new RegExp(e,"i");this.filteredPersons=e?this.users.filter(t=>-1!==t.name.search(s)||-1!==t.surname.search(s)||-1!==t.nickname.search(s)):this.users}getPositionStyle(t,e){const s=this.players[t];return s&&s.id===e?"solid":"clear"}selectPlayer(t,e){const s=this.players[t];s&&s.id===e.id||(this.players=this.players.map((s,i)=>t===i?e:s&&s.id===e.id?null:s))}selectNextPlayer(t){const e=this.players.findIndex(t=>null===t);-1!==e&&this.selectPlayer(e,t)}getSlicedPlayer({id:t,displayName:e,imageURL:s}){return{id:t,displayName:e,imageURL:s}}startMatch(t){t.preventDefault(),db.collection("matches").add({startTime:new Date,locals:{[e.DEF]:this.getSlicedPlayer(this.players[0]),[e.ATK]:this.getSlicedPlayer(this.players[1])},visitors:{[e.ATK]:this.getSlicedPlayer(this.players[2]),[e.DEF]:this.getSlicedPlayer(this.players[3])}}).then(function(t){const e=t.id;window.location.href=`/match/${e}`}).catch(function(t){console.error("Error adding document: ",t)})}dragAvatar(t,e){console.log("startDrag",t),t.dataTransfer.setData("player",e)}onDrop(t,e){const s=t.dataTransfer.getData("player");console.log("drop player"),this.selectPlayer(e,this.filteredPersons[s])}renderUserList(){return t("ion-list",{class:"users"},this.filteredPersons.map(e=>t("ion-item",null,t("ion-avatar",null,t("img",{src:e.imageURL})),e.displayName,t("div",{class:"positions"},this.playersPositions.map((s,i)=>t("ion-button",{round:!0,onClick:()=>this.selectPlayer(i,e),fill:this.getPositionStyle(i,e.id)},s))))))}renderUsers(){return t("div",{class:"user-list"},this.filteredPersons.map((e,s)=>t("ion-avatar",{draggable:!0,onClick:()=>this.selectNextPlayer(e),onDragStart:t=>this.dragAvatar(t,s)},t("img",{src:e.imageURL}))))}getSummaryPlayer(e){const s=this.players[e];return t("div",{class:"player"},t("ion-avatar",{onDrop:t=>this.onDrop(t,e),onDragOver:t=>t.preventDefault()},t("img",{src:s?s.imageURL:"/assets/images/default_avatar.jpg"})),s?t("span",null,s.displayName):null)}renderSummary(){return t("div",{class:"players"},t("div",{class:"team"},this.getSummaryPlayer(2),this.getSummaryPlayer(3)),t("span",{class:"versus"},"VS"),t("div",{class:"team"},this.getSummaryPlayer(0),this.getSummaryPlayer(1)))}renderFooter(){return t("form",{onSubmit:t=>this.startMatch(t),class:"footer"},t("ion-button",{expand:"full",type:"submit",disabled:this.players.some(t=>!t)},"Start Match"))}render(){return t("ion-page",null,t("ion-header",null,t("ion-toolbar",{color:"primary"},t("ion-title",null,"New Match"))),this.loading?t("ion-content",null,"Loading Users"):this.users.length?[t("ion-searchbar",{onIonInput:t=>this.search(t.target)}),t("ion-content",null,this.renderUsers()),this.renderSummary(),t("ion-footer",null,this.renderFooter())]:t("ion-content",null,"Not users yet"))}static get is(){return"app-play"}static get properties(){return{filteredPersons:{state:!0},loading:{state:!0},players:{state:!0},toastCtrl:{connect:"ion-toast-controller"},users:{state:!0}}}static get style(){return"app-play ion-scroll{padding:15px}app-play .user-list{display:flex;flex-wrap:wrap;justify-content:center}app-play .user-list ion-avatar{margin:10px;width:100px;height:100px;-webkit-user-drag:element}app-play ion-list.users ion-avatar{margin-right:10px}app-play ion-list.users .positions{margin-left:auto}app-play ion-list.users .positions ion-button:nth-child(n+3){--ion-color-primary:#e03131;--ion-color-primary-shade:#ff3838}app-play .players{display:flex;flex-direction:column;align-items:center;justify-content:space-around;background-image:url(/assets/images/foosball-table.svg);width:100%;height:40%;background-size:100% 100%;background-repeat:no-repeat;background-position:center}\@media only screen and (min-width:455px){app-play .players{height:50%}}app-play .players .team{display:flex;width:60%;justify-content:space-between}\@media only screen and (min-width:455px){app-play .players .team{max-width:325px}app-play .players .team:first-child{margin-left:56px}app-play .players .team:last-child{margin-left:-56px}app-play .players .team .player ion-avatar{width:100px;height:100px}}app-play .players .team ion-avatar{border:3px solid}app-play .players .team:first-child .player ion-avatar{border-color:#e03131}app-play .players .team:last-child .player ion-avatar{border-color:#3171e0}app-play .players .team .player{display:flex;flex-direction:column;align-items:center}app-play .players .team .player span{text-align:center;min-height:20px;background:#fff;margin-top:6px;padding:5px;border:1px solid #5f5f5f}app-play .players .versus{font-size:40px;font-weight:700;background:#fff;border-radius:50%}app-play .footer{padding:10px}"}}class n{constructor(){this.translucent=!1}hostData(){const t=this.translucent?s(this.mode,this.color,"header-translucent"):{};return{class:Object.assign({},t)}}static get is(){return"ion-footer"}static get host(){return{theme:"footer"}}static get properties(){return{translucent:{type:Boolean,attr:"translucent"}}}static get style(){return"ion-footer{position:relative;z-index:10;display:block;order:1;width:100%}"}static get styleMode(){return"md"}}class r{getOpenItem(){return this.openItem}setOpenItem(t){this.openItem=t}closeSlidingItems(){return!!this.openItem&&(this.openItem.close(),this.openItem=null,!0)}static get is(){return"ion-list"}static get host(){return{theme:"list"}}static get properties(){return{closeSlidingItems:{method:!0},getOpenItem:{method:!0},setOpenItem:{method:!0}}}static get style(){return"ion-list{margin:0;padding:0;display:block;contain:content;list-style-type:none}ion-list[inset]{overflow:hidden;transform:translateZ(0)}.list-md{margin:-1px 0 16px}.list-md+.list ion-list-header{margin-top:-16px}.list-md>.input:last-child::after{left:0}.list-md[inset]{margin:16px;border-radius:2px}.list-md[inset] ion-item:first-child .item-md{border-top-left-radius:2px;border-top-right-radius:2px;border-top-width:0}.list-md[inset] ion-item:last-child .item-md{border-bottom-right-radius:2px;border-bottom-left-radius:2px;border-bottom-width:0}.list-md[inset] .item-input{padding-left:0;padding-right:0}.list-md[inset]+ion-list[inset]{margin-top:0}.list-md[inset] ion-list-header{background-color:var(--ion-item-md-background-color,var(--ion-item-background-color,var(--ion-background-color,#fff)))}.list-md[no-lines] .item-md,.list-md[no-lines] .item-md .item-inner{border-width:0}"}static get styleMode(){return"md"}}class o{constructor(){this.isCancelVisible=!1,this.shouldBlur=!0,this.shouldAlignLeft=!0,this.activated=!1,this.focused=!1,this.animated=!1,this.autocomplete="off",this.autocorrect="off",this.cancelButtonText="Cancel",this.debounce=250,this.placeholder="Search",this.showCancelButton=!1,this.spellcheck=!1,this.type="search"}debounceChanged(){this.ionInput=i(this.ionInput,this.debounce)}componentDidLoad(){this.positionElements(),this.debounceChanged()}clearInput(t){this.ionClear.emit({event:t}),setTimeout(()=>{const e=this.value;void 0!==e&&""!==e&&(this.value="",this.ionInput.emit({event:t}))},64),this.shouldBlur=!1}cancelSearchbar(t){this.ionCancel.emit({event:t}),this.clearInput(t),this.shouldBlur=!0,this.activated=!1}inputChanged(t){this.value=t.target&&t.target.value,this.ionInput.emit(t)}inputUpdated(){this.positionElements()}inputBlurred(){const t=this.el.querySelector(".searchbar-input");if(!1===this.shouldBlur)return t.focus(),this.shouldBlur=!0,this.ionBlur.emit({this:this}),void this.inputUpdated();this.focused=!1,this.positionElements()}inputFocused(){this.activated=!0,this.focused=!0,this.ionFocus.emit({this:this}),this.inputUpdated(),this.positionElements()}positionElements(){const t=this.shouldAlignLeft,e=!this.animated||this.value&&""!==this.value.toString().trim()||!0===this.focused;this.shouldAlignLeft=e,"ios"===this.mode&&(t!==e&&this.positionPlaceholder(),this.animated&&this.positionCancelButton())}positionPlaceholder(){const t="rtl"===document.dir,e=this.el.querySelector(".searchbar-input"),s=this.el.querySelector(".searchbar-search-icon");if(this.shouldAlignLeft)e.removeAttribute("style"),s.removeAttribute("style");else{const i=document.createElement("span");i.innerHTML=this.placeholder,document.body.appendChild(i);const a=i.offsetWidth;document.body.removeChild(i);const n="calc(50% - "+a/2+"px)",r="calc(50% - "+(a/2+30)+"px)";t?(e.style.paddingRight=n,s.style.marginRight=r):(e.style.paddingLeft=n,s.style.marginLeft=r)}}positionCancelButton(){const t="rtl"===document.dir,e=this.el.querySelector(".searchbar-cancel-button-ios"),s=this.focused;if(s!==this.isCancelVisible){const i=e.style;if(this.isCancelVisible=s,s)t?i.marginLeft="0":i.marginRight="0";else{const s=e.offsetWidth;s>0&&(t?i.marginLeft=-s+"px":i.marginRight=-s+"px")}}}hostData(){return{class:{"searchbar-active":this.activated,"searchbar-animated":this.animated,"searchbar-has-value":void 0!==this.value&&""!==this.value,"searchbar-show-cancel":this.showCancelButton,"searchbar-left-aligned":this.shouldAlignLeft,"searchbar-has-focus":this.focused}}}render(){const e=s(this.mode,this.color,"searchbar-cancel-button"),i=s(this.mode,this.color,"searchbar-search-icon"),a=this.showCancelButton?t("button",{type:"button",tabindex:"ios"!==this.mode||this.activated?void 0:-1,onClick:this.cancelSearchbar.bind(this),onMouseDown:this.cancelSearchbar.bind(this),class:e},"md"===this.mode?t("ion-icon",{name:"md-arrow-back"}):this.cancelButtonText):null,n=[t("div",{class:"searchbar-input-container"},"md"===this.mode?a:null,t("div",{class:i}),t("input",{class:"searchbar-input",onInput:this.inputChanged.bind(this),onBlur:this.inputBlurred.bind(this),onFocus:this.inputFocused.bind(this),placeholder:this.placeholder,type:this.type,value:this.value,autoComplete:this.autocomplete,autoCorrect:this.autocorrect,spellCheck:this.spellcheck}),t("button",{type:"button",class:"searchbar-clear-icon",onClick:this.clearInput.bind(this),onMouseDown:this.clearInput.bind(this)}))];return a&&"ios"===this.mode&&n.push(a),n}static get is(){return"ion-searchbar"}static get host(){return{theme:"searchbar"}}static get properties(){return{activated:{state:!0},animated:{type:Boolean,attr:"animated"},autocomplete:{type:String,attr:"autocomplete"},autocorrect:{type:String,attr:"autocorrect"},cancelButtonText:{type:String,attr:"cancel-button-text"},color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},el:{elementRef:!0},focused:{state:!0},mode:{type:"Any",attr:"mode"},placeholder:{type:String,attr:"placeholder"},showCancelButton:{type:Boolean,attr:"show-cancel-button"},spellcheck:{type:Boolean,attr:"spellcheck"},type:{type:String,attr:"type"},value:{type:String,attr:"value",mutable:!0}}}static get events(){return[{name:"ionInput",method:"ionInput",bubbles:!0,cancelable:!0,composed:!0},{name:"ionCancel",method:"ionCancel",bubbles:!0,cancelable:!0,composed:!0},{name:"ionClear",method:"ionClear",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-searchbar{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box;position:relative;display:flex;align-items:center;width:100%}.searchbar-icon{pointer-events:none}.searchbar-input-container{position:relative;display:block;flex-shrink:1;width:100%}.searchbar-input{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;box-sizing:border-box;display:block;width:100%;border:0;font-family:inherit}.searchbar-input:active,.searchbar-input:focus{outline:0}.searchbar-input::-webkit-search-cancel-button{display:none}.searchbar-clear-icon{margin:0;padding:0;display:none;min-height:0}.searchbar-has-value.searchbar-has-focus .searchbar-clear-icon{display:block}.searchbar-md{padding:8px;font-family:Roboto,\"Helvetica Neue\",sans-serif;background:inherit}.searchbar-search-icon-md{left:16px;top:11px;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M337.509,305.372h-17.501l-6.571-5.486c20.791-25.232,33.922-57.054,33.922-93.257C347.358,127.632,283.896,64,205.135,64C127.452,64,64,127.632,64,206.629s63.452,142.628,142.225,142.628c35.011,0,67.831-13.167,92.991-34.008l6.561,5.487v17.551L415.18,448L448,415.086L337.509,305.372z%20M206.225,305.372c-54.702,0-98.463-43.887-98.463-98.743c0-54.858,43.761-98.742,98.463-98.742c54.7,0,98.462,43.884,98.462,98.742C304.687,261.485,260.925,305.372,206.225,305.372z'/></svg>\");width:21px;height:21px}.searchbar-cancel-button-md{left:10px;top:0;margin:0;display:none;height:100%;border:0;font-size:1.8em;color:var(--ion-text-md-color-step-100,var(--ion-text-color-step-100,#1a1a1a));background-color:transparent}.searchbar-cancel-button-md,.searchbar-search-icon-md{position:absolute;background-repeat:no-repeat;background-size:20px}.searchbar-cancel-button-md.activated,.searchbar-search-icon-md.activated{background-color:transparent}.searchbar-md .searchbar-input{padding:6px 55px;border-radius:2px;background-position:left 8px center;height:auto;font-size:16px;font-weight:400;line-height:30px;color:var(--ion-text-md-color-step-150,var(--ion-text-color-step-150,#262626));background-color:var(--ion-background-md-color,var(--ion-background-color,#fff));box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}.searchbar-md .searchbar-input::-moz-placeholder{color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-input:-ms-input-placeholder{color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-clear-icon{right:13px;top:0;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><polygon%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20points='405,136.798%20375.202,107%20256,226.202%20136.798,107%20107,136.798%20226.202,256%20107,375.202%20136.798,405%20256,285.798%20375.202,405%20405,375.202%20285.798,256'/></svg>\");padding:0;background-position:center;position:absolute;width:22px;height:100%;border:0;background-color:transparent;background-repeat:no-repeat;background-size:22px}.searchbar-md .searchbar-clear-icon.activated{background-color:transparent}.searchbar-has-focus.searchbar-show-cancel .searchbar-search-icon-md{display:none}.searchbar-has-focus.searchbar-show-cancel .searchbar-cancel-button-md{display:inline-flex}.toolbar .searchbar-md{padding:3px}"}static get styleMode(){return"md"}}export{a as AppPlay,n as IonFooter,r as IonList,o as IonSearchbar};