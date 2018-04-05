/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='app']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(resourcesUrl){
    /** @stencil/router global **/

    Context.activeRouter = (function () {
        let state = {};
        let groups = {};
        let activeGroupId = 0;
        const nextListeners = [];
        function getDefaultState() {
            return {
                location: {
                    pathname: Context.window.location.pathname,
                    search: Context.window.location.search
                }
            };
        }
        function set(value) {
            state = Object.assign({}, state, value);
            dispatch();
        }
        function get(attrName) {
            if (Object.keys(state).length === 0) {
                return getDefaultState();
            }
            if (!attrName) {
                return state;
            }
            return state[attrName];
        }
        function dispatch() {
            const listeners = nextListeners;
            for (let i = 0; i < listeners.length; i++) {
                const listener = listeners[i];
                listener();
            }
        }
        function createGroup(startLength) {
            activeGroupId += 1;
            groups[activeGroupId] = {};
            groups[activeGroupId].startLength = startLength;
            groups[activeGroupId].listenerList = [];
            groups[activeGroupId].groupedListener = () => {
                let switchMatched = false;
                groups[activeGroupId].listenerList.forEach((listener) => {
                    if (switchMatched) {
                        listener(true);
                    }
                    else {
                        switchMatched = listener(false) !== null;
                    }
                });
            };
            nextListeners.push(groups[activeGroupId].groupedListener);
            return activeGroupId;
        }
        function addGroupListener(listener, groupName, groupIndex) {
            groups[groupName].listenerList[groupIndex] = listener;
            if (groups[groupName].listenerList.length === groups[activeGroupId].startLength) {
                groups[groupName].groupedListener();
            }
        }
        function removeGroupListener(groupId, groupIndex) {
            groups[groupId].listenerList.splice(groupIndex, 1);
            if (groups[groupId].listenerList.length === 0) {
                const index = nextListeners.indexOf(groups[groupId].groupedListener);
                nextListeners.splice(index, 1);
                delete groups[groupId];
            }
        }
        function subscribe(listener, groupName, groupIndex) {
            if (typeof listener !== 'function') {
                throw new Error('Expected listener to be a function.');
            }
            if (groupName) {
                addGroupListener(listener, groupName, groupIndex);
            }
            else {
                nextListeners.push(listener);
            }
            let isSubscribed = true;
            return function unsubscribe() {
                if (!isSubscribed) {
                    return;
                }
                if (groupName) {
                    removeGroupListener(groupName, groupIndex);
                }
                else {
                    const index = nextListeners.indexOf(listener);
                    nextListeners.splice(index, 1);
                }
                isSubscribed = false;
            };
        }
        return {
            set,
            get,
            subscribe,
            createGroup,
        };
    })();
})(resourcesUrl);
(function(n,t,e,o){"use strict";function i(n,t,e,o,i,c,l){let f=e.n+(o||g),r=e[f];if(r||(r=e[f=e.n+g]),r){let o=t.t;if(t.e)if(1===e.encapsulation)o=i.shadowRoot;else for(;i=t.o(i);)if(i.host&&i.host.shadowRoot){o=i.host.shadowRoot;break}const c=n.i.get(o)||{};if(!c[f]){l=r.content.cloneNode(!0);const e=o.querySelectorAll("[data-styles]");t.c(o,l,e.length&&e[e.length-1].nextSibling||o.l),c[f]=!0,n.i.set(o,c)}}}function c(n){return{f:n[0],r:n[1],u:!!n[2],s:!!n[3],a:!!n[4]}}function l(n,t){if(x(t)){if(n===Boolean||3===n)return"false"!==t&&(""===t||!!t);if(n===Number||4===n)return parseFloat(t)}return t}function f(n,t,e,o){const i=n.p.get(t);i&&((o=i.$activeLoading)&&((e=o.indexOf(t))>-1&&o.splice(e,1),!o.length&&i.$initLoad()),n.p.delete(t))}function r(n,t,e){let o=null,i=!1,c=!1;for(var l=arguments.length;l-- >2;)S.push(arguments[l]);for(;S.length;)if((e=S.pop())&&void 0!==e.pop)for(l=e.length;l--;)S.push(e[l]);else"boolean"==typeof e&&(e=null),(c="function"!=typeof n)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(c=!1)),c&&i?o[o.length-1].d+=e:null===o?o=[c?{d:e}:e]:o.push(c?{d:e}:e),i=c;if(t&&(t.className&&(t.class=t.className),"object"==typeof t.class)){for(l in t.class)t.class[l]&&S.push(l);t.class=S.join(" "),S.length=0}return"function"==typeof n?n(Object.assign({},t,{m:o})):{v:n,y:o,d:null,b:t,M:t&&t.w,k:null,g:!1}}function u(n,t){n.C.has(t)||(n.C.set(t,!0),n.W.add(()=>{(function n(t,e,o,i,c){if(t.C.delete(e),!t.x.has(e)){let l;if(i=t.N.get(e),o=!i){if((c=t.p.get(e))&&!c.$rendered)return void(c.$onRender=c.$onRender||[]).push(()=>{n(t,e)});i=function l(n,t,e,o,i,c){try{(function l(n,t,e,o,i,c){for(c in n.j.set(o,e),n.O.has(e)||n.O.set(e,{}),(i=Object.assign({color:{type:String}},t.properties)).mode={type:String},i)a(n,i[c],e,o,c)})(n,o=n.A(t).S,t,e=new o)}catch(o){e={},n.T(o,7,t,!0)}return n.N.set(t,e),e}(t,e);try{i.componentWillLoad&&(l=i.componentWillLoad())}catch(n){t.T(n,3,e)}}l&&l.then?l.then(()=>s(t,e,i,o)):s(t,e,i,o)}})(n,t)},n.L?1:3))}function s(n,t,e,o){(function i(n,t,e,o,c){try{const i=t.S.host;let l;if(o.render||o.hostData||i||l){n.P=!0;const i=o.render&&o.render();let l;n.P=!1;const f=n.R.get(e)||{};f.k=e;const u=r(null,l,i),s=n.render(f,u,c,n.q.get(e),n.B.get(e),t.S.encapsulation);n.R.set(e,s)}n.D(n,n.H,t,o.mode,e),e.$rendered=!0,e.$onRender&&(e.$onRender.forEach(n=>n()),e.$onRender=null)}catch(t){n.P=!1,n.T(t,8,e,!0)}})(n,n.A(t),t,e,!o);try{o?t.$initLoad():b(n.R.get(t))}catch(e){n.T(e,6,t,!0)}}function a(n,t,e,o,i){if(t.type||t.state){const c=n.O.get(e);if(!t.state){if(t.attr&&(void 0===c[i]||""===c[i])){const o=n.H.F(e,t.attr);null!=o&&(c[i]=l(t.type,o))}e.hasOwnProperty(i)&&(void 0===c[i]&&(c[i]=e[i]),delete e[i])}o.hasOwnProperty(i)&&void 0===c[i]&&(c[i]=o[i]),t.watchCallbacks&&(c[A+i]=t.watchCallbacks.slice()),m(o,i,function c(t){return(t=n.O.get(n.j.get(this)))&&t[i]},function f(e,o){(o=n.j.get(this))&&(t.state||t.mutable)&&p(n,o,i,e)})}else if(t.context){const c=n.U(t.context);void 0!==c&&d(o,i,c.z&&c.z(e)||c)}}function p(n,t,e,o,i,c,l){(i=n.O.get(t))||n.O.set(t,i={}),o!==i[e]&&(i[e]=o,n.N.get(t)&&(i[A+e],!n.P&&t.$rendered&&u(n,t)))}function d(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e})}function m(n,t,e,o){Object.defineProperty(n,t,{configurable:!0,get:e,set:o})}function v(n,t,e,o,i,c,l,f,r){if("class"!==e||c)if("style"===e){for(f in o=o||C,i=i||C,o)i[f]||(t.style[f]="");for(f in i)i[f]!==o[f]&&(t.style[f]=i[f])}else if("o"!==e[0]||"n"!==e[1]||!/[A-Z]/.test(e[2])||e in t)if("list"!==e&&"type"!==e&&!c&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=n.A(t);o&&o.I&&o.I[e]?h(t,e,i):"ref"!==e&&(h(t,e,null==i?"":i),null!=i&&!1!==i||t.removeAttribute(e))}else null!=i&&function u(n,t,e){const o=t!==(t=t.replace(/^xlink\:?/,"")),i=T[t];!i||e&&"false"!==e?"function"!=typeof e&&(i&&(e=""),o?n.setAttributeNS(L,j(t),e):n.setAttribute(t,e)):o?n.removeAttributeNS(L,j(t)):n.removeAttribute(t)}(t,e,i);else e=j(e)in t?j(e.substring(2)):j(e[2])+e.substring(3),i?i!==o&&n.H.Q(t,e,i):n.H.Z(t,e);else if(o!==i){const n=null==o||""===o?W:o.trim().split(/\s+/),e=null==i||""===i?W:i.trim().split(/\s+/);let c=null==t.className||""===t.className?W:t.className.trim().split(/\s+/);for(f=0,r=n.length;f<r;f++)-1===e.indexOf(n[f])&&(c=c.filter(t=>t!==n[f]));for(f=0,r=e.length;f<r;f++)-1===n.indexOf(e[f])&&(c=[...c,e[f]]);t.className=c.join(" ")}}function h(n,t,e){try{n[t]=e}catch(n){}}function y(n,t,e,o,i){const c=11===e.k.nodeType&&e.k.host?e.k.host:e.k,l=t&&t.b||C,f=e.b||C;for(i in l)f&&null!=f[i]||null==l[i]||v(n,c,i,l[i],void 0,o,e.g);for(i in f)i in l&&f[i]===("value"===i||"checked"===i?c[i]:l[i])||v(n,c,i,l[i],f[i],o,e.g)}function b(n,t){n&&(n.b&&n.b.ref&&n.b.ref(t?null:n.k),n.y&&n.y.forEach(n=>{b(n,t)}))}function M(n,t,e,o,i){const c=n.G(t);let l,f,r,u;if(i&&1===c){(f=n.F(t,k))&&(r=f.split("."))[0]===o&&((u={}).v=n.J(u.k=t),e.y||(e.y=[]),e.y[r[1]]=u,e=u,i=""!==r[2]);for(let c=0;c<t.childNodes.length;c++)M(n,t.childNodes[c],e,o,i)}else 3===c&&(l=t.previousSibling)&&8===n.G(l)&&"s"===(r=n.K(l).split("."))[0]&&r[1]===o&&((u={d:n.K(t)}).k=t,e.y||(e.y=[]),e.y[r[2]]=u)}function w(n,t,e,o){return function(){const i=arguments;return function c(n,t,e){return new Promise(o=>{let i=t[e];i||(i=n.V.querySelector(e)),i||(i=t[e]=n.X(e),n.Y(n.V,i)),i.componentOnReady(o)})}(n,t,e).then(n=>n[o].apply(n,i))}}const $="data-ssrv",k="data-ssrc",g="$",C={},W=[],E={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},x=n=>void 0!==n&&null!==n,N=n=>void 0===n||null===n,j=n=>n.toLowerCase(),O=()=>{},S=[],A="wc-",T={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},L="http://www.w3.org/1999/xlink";let P=!1;(function R(t,e,o,s,a,v){const h={html:{}},k={},C=o[t]=o[t]||{},W=function S(n,t,e){n._||(n._=((n,t,e,o)=>n.addEventListener(t,e,o)),n.nn=((n,t,e,o)=>n.removeEventListener(t,e,o)));const o=new WeakMap,i={tn:e.documentElement,t:e.head,V:e.body,en:!1,G:n=>n.nodeType,X:n=>e.createElement(n),on:(n,t)=>e.createElementNS(n,t),in:n=>e.createTextNode(n),cn:n=>e.createComment(n),c:(n,t,e)=>n.insertBefore(t,e),ln:n=>n.remove(),Y:(n,t)=>n.appendChild(t),fn:n=>n.childNodes,o:n=>n.parentNode,rn:n=>n.nextSibling,J:n=>j(n.tagName),K:n=>n.textContent,un:(n,t)=>n.textContent=t,F:(n,t)=>n.getAttribute(t),sn:(n,t,e)=>n.setAttribute(t,e),an:(n,t,e,o)=>n.setAttributeNS(t,e,o),pn:(n,t)=>n.removeAttribute(t),dn:(n,o)=>"child"===o?n.firstElementChild:"parent"===o?i.mn(n):"body"===o?i.V:"document"===o?e:"window"===o?t:n,Q:(t,e,c,l,f,r,u,s)=>{const a=e;let p=t,d=o.get(t);if(d&&d[a]&&d[a](),"string"==typeof r?p=i.dn(t,r):"object"==typeof r?p=r:(s=e.split(":")).length>1&&(p=i.dn(t,s[0]),e=s[1]),!p)return;let m=c;(s=e.split(".")).length>1&&(e=s[0],m=(n=>{n.keyCode===E[s[1]]&&c(n)})),u=i.en?{capture:!!l,passive:!!f}:!!l,n._(p,e,m,u),d||o.set(t,d={}),d[a]=(()=>{p&&n.nn(p,e,m,u),d[a]=null})},Z:(n,t)=>{const e=o.get(n);e&&(t?e[t]&&e[t]():Object.keys(e).forEach(n=>{e[n]&&e[n]()}))},vn:(n,e,o)=>n&&n.dispatchEvent(new t.CustomEvent(e,o)),mn:(n,t)=>(t=i.o(n))&&11===i.G(t)?t.host:t};return i}(C,o,s);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=o,e.location=o.location,e.document=s,e.resourcesUrl=e.publicPath=a,C.h=r,C.Context=e;const A=o.$definedCmps=o.$definedCmps||{},T={hn:function L(n,t){t.mode||(t.mode=W.F(t,"mode")||e.mode),W.F(t,$)||function o(n,t){return n&&1===t.encapsulation}(W.e,n)||function i(n,t,e,o,c,l,f,r,u){for(e.$defaultHolder||t.c(e,e.$defaultHolder=t.cn(""),o[0]),u=0;u<o.length;u++)c=o[u],1===t.G(c)&&null!=(l=t.F(c,"slot"))?(r=r||{})[l]?r[l].push(c):r[l]=[c]:f?f.push(c):f=[c];n.q.set(e,f),n.B.set(e,r)}(T,W,t,t.childNodes),W.e||1!==n.encapsulation||(t.shadowRoot=t)},H:W,yn:function R(n,t){if(!A[n.n]){A[n.n]=!0,function e(n,t,o,i){o.connectedCallback=function(){(function e(n,t,o){n.x.delete(o),n.bn.has(o)||(n.bn.set(o,!0),function i(n,t,e){for(e=t;e=n.H.mn(e);)if(n.Mn(e)){n.wn.has(t)||(n.p.set(t,e),(e.$activeLoading=e.$activeLoading||[]).push(t));break}}(n,o),n.W.add(()=>{n.hn(t,o),n.loadBundle(t,o.mode,()=>u(n,o))},3))})(n,t,this)},o.attributeChangedCallback=function(n,e,o){(function i(n,t,e,o,c,f,r){if(n&&o!==c)for(f in n)if((r=n[f]).$n&&j(r.$n)===j(e)){t[f]=l(r.kn,c);break}})(t.I,this,n,e,o)},o.disconnectedCallback=function(){(function t(n,e,o){!n.gn&&function i(n,t){for(;t;){if(!n.o(t))return 9!==n.G(t);t=n.o(t)}}(n.H,e)&&(n.x.set(e,!0),f(n,e),b(n.R.get(e),!0),n.H.Z(e),n.Cn.delete(e),(o=n.N.get(e))&&o.componentDidUnload&&o.componentDidUnload())})(n,this)},o.componentOnReady=function(t,e){return t||(e=new Promise(n=>t=n)),function o(n,t,e,i){n.x.has(t)||(n.wn.has(t)?e(t):((i=n.Wn.get(t)||[]).push(e),n.Wn.set(t,i)))}(n,this,t),e},o.$initLoad=function(){(function t(n,e,o,i,c){if(!n.wn.has(e)&&n.N.get(e)&&!n.x.has(e)&&(!e.$activeLoading||!e.$activeLoading.length)){delete e.$activeLoading,n.wn.set(e,!0);try{b(n.R.get(e)),(c=n.Wn.get(e))&&(c.forEach(n=>n(e)),n.Wn.delete(e))}catch(t){n.T(t,4,e)}e.classList.add(o),f(n,e)}})(n,this,i)},o.forceUpdate=function(){u(n,this)},function c(n,t,e){t&&Object.keys(t).forEach(o=>{const i=t[o].En;1===i||2===i?m(e,o,function t(){return(n.O.get(this)||{})[o]},function t(e){p(n,this,o,e)}):6===i&&d(e,o,O)})}(n,t.I,o)}(T,n,t.prototype,v);{const e=[];for(const t in n.I)n.I[t].$n&&e.push(n.I[t].$n);t.observedAttributes=e}o.customElements.define(n.n,t)}},xn:e.emit,A:n=>h[W.J(n)],U:n=>e[n],isClient:!0,Mn:n=>!(!A[W.J(n)]&&!T.A(n)),loadBundle:function q(n,t,e){if(n.S)e();else{const o="string"==typeof n.Nn?n.Nn:n.Nn[t],i=a+o+(function o(n,t){return 2===t.encapsulation||1===t.encapsulation&&!n}(W.e,n)?".sc":"")+".js";import(i).then(t=>{try{n.S=t[(n=>j(n).split("-").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(""))(n.n)],function o(n,t,e){const o=e.style;if(o){const i=e.is+(e.styleMode||g);if(!t[i]){const e=n.X("template");t[i]=e,e.innerHTML=`<style>${o}</style>`,n.Y(n.t,e)}}}(W,n,n.S)}catch(t){n.S=class{}}e()}).catch(n=>void 0)}},T:(n,t,e)=>void 0,jn:n=>(function t(n,e,o){return{create:w(n,e,o,"create"),componentOnReady:w(n,e,o,"componentOnReady")}})(W,k,n),W:function B(t,e,o,i){function c(){for(;s.length>0;)s.shift()();o=!1}function l(n){for(n=r(),c();a.length>0&&r()-n<40;)a.shift()();(i=a.length>0)&&t.raf(f)}function f(n){for(c(),n=4+r();a.length>0&&r()<n;)a.shift()();(i=a.length>0)&&t.raf(l)}const r=()=>e.performance.now(),u=Promise.resolve(),s=[],a=[];return t.raf||(t.raf=n.requestAnimationFrame.bind(n)),{add:(n,e)=>{3===e?(s.push(n),o||(o=!0,u.then(c))):(a.push(n),i||(i=!0,t.raf(l)))}}}(C,o),p:new WeakMap,i:new WeakMap,q:new WeakMap,bn:new WeakMap,Cn:new WeakMap,wn:new WeakMap,j:new WeakMap,N:new WeakMap,x:new WeakMap,C:new WeakMap,B:new WeakMap,Wn:new WeakMap,On:new WeakMap,R:new WeakMap,O:new WeakMap};T.render=function D(n,t){function e(o,i,l,f,r,u,m,v,h){if(!p&&"slot"===o.v){if((s||a)&&(d&&t.sn(i,d+"-slot",""),m=o.b&&o.b.name,v=x(m)?a&&a[m]:s,x(v))){for(n.gn=!0,f=0;f<v.length;f++)u=v[f],t.ln(u),t.Y(i,u),8!==u.nodeType&&(h=!0);!h&&o.y&&c(i,[],o.y),n.gn=!1}return null}if(x(o.d))o.k=t.in(o.d);else{r=o.k=t.X(o.v),y(n,null,o,P),null!==d&&r.Sn!==d&&t.sn(r,r.Sn=d,"");const i=o.y;if(i)for(f=0;f<i.length;++f)(u=e(i[f],r))&&t.Y(r,u)}return o.k}function o(n,o,i,c,l,f,r){const u=n.$defaultHolder&&t.o(n.$defaultHolder)||n;for(;c<=l;++c)r=i[c],x(r)&&(f=x(r.d)?t.in(r.d):e(r,n),x(f)&&(r.k=f,t.c(u,f,o)))}function i(n,e,o){for(;e<=o;++e)x(n[e])&&t.ln(n[e].k)}function c(n,c,u){let s,a,p,d,m=0,v=0,h=c.length-1,y=c[0],b=c[h],M=u.length-1,w=u[0],$=u[M];for(;m<=h&&v<=M;)null==y?y=c[++m]:null==b?b=c[--h]:null==w?w=u[++v]:null==$?$=u[--M]:l(y,w)?(r(y,w),y=c[++m],w=u[++v]):l(b,$)?(r(b,$),b=c[--h],$=u[--M]):l(y,$)?(r(y,$),t.c(n,y.k,t.rn(b.k)),y=c[++m],$=u[--M]):l(b,w)?(r(b,w),t.c(n,b.k,y.k),b=c[--h],w=u[++v]):(N(s)&&(s=f(c,m,h)),a=s[w.M],N(a)?(d=e(w,n),w=u[++v]):((p=c[a]).v!==w.v?d=e(w,n):(r(p,w),c[a]=void 0,d=p.k),w=u[++v]),d&&t.c(y.k&&y.k.parentNode||n,d,y.k));m>h?o(n,null==u[M+1]?null:u[M+1].k,u,v,M):v>M&&i(c,m,h)}function l(n,t){return n.v===t.v&&n.M===t.M}function f(n,t,e){const o={};let i,c,l;for(i=t;i<=e;++i)null!=(l=n[i])&&void 0!==(c=l.M)&&(o.An=i);return o}function r(e,l){const f=l.k=e.k,r=e.y,u=l.y;let s;if(N(l.d))"slot"!==l.v&&y(n,e,l,P),x(r)&&x(u)?c(f,r,u):x(u)?(x(e.d)&&t.un(f,""),o(f,null,u,0,u.length-1)):x(r)&&i(r,0,r.length-1);else if(s=n.q.get(f)){const e=s[0].parentElement;t.un(e,l.d),n.q.set(f,[e.childNodes[0]])}else e.d!==l.d&&t.un(f,l.d)}let u,s,a,p,d;return function n(e,o,i,c,l,f,p){return u=i,s=c,a=l,d="scoped"===f||"shadow"===f&&!t.e?"data-"+t.J(e.k):null,u||d&&t.sn(e.k,d+"-host",""),r(e,o),o}}(T,W);const H=W.tn;H.$rendered=!0,H.$activeLoading=[],H.$initLoad=(()=>{T.wn.set(H,C.loaded=T.L=!0),W.vn(o,"appload",{detail:{namespace:t}})}),function F(n,t,e){const o=e.querySelectorAll(`[${$}]`),i=o.length;let c,l,f,r,u,s;if(i>0)for(n.wn.set(e,!0),r=0;r<i;r++)for(c=o[r],l=t.F(c,$),(f={}).v=t.J(f.k=c),n.R.set(c,f),u=0,s=c.childNodes.length;u<s;u++)M(t,c.childNodes[u],f,l,!0)}(T,W,H),T.D=i,(C.components||[]).map(n=>(function t(n,e,o,i){const l={n:n[0],I:{color:{$n:"color"}}};l.Nn=n[1];const f=n[3];if(f)for(o=0;o<f.length;o++)i=f[o],l.I[i[0]]={En:i[1],Tn:!!i[2],$n:"string"==typeof i[3]?i[3]:i[3]?i[0]:0,kn:i[4]};return l.encapsulation=n[4],n[5]&&(l.Ln=n[5].map(c)),e[l.n]=l})(n,h)).forEach(n=>T.yn(n,class extends HTMLElement{})),C.initialized=!0,W.vn(n,"appinit",{detail:{namespace:t}})})(o,e,n,t,resourcesUrl,hydratedCssClass)})(window,document,Context,namespace);
})({},"App","hydrated");