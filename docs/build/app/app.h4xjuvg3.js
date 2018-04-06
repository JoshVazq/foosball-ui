/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='app']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(resourcesUrl){
    /** @ionic/core global **/

    function isCordova() {
        const win = window;
        return !!(win[CORDOVA] || win[PHONEGAP_CAMELCASE] || win[PHONEGAP] || win[CAPACITOR]);
    }
    function isElectron() {
        return testUserAgent(getUserAgent(), ELECTRON);
    }
    function getUserAgent() {
        return window.navigator.userAgent;
    }
    function testUserAgent(userAgent, expression) {
        return userAgent ? userAgent.indexOf(expression) >= 0 : false;
    }
    const ANDROID = 'android';
    const CORDOVA = 'cordova';
    const CORE = 'core';
    const ELECTRON = 'electron';
    const IOS = 'ios';
    const IPAD = 'ipad';
    const IPHONE = 'iphone';
    const MOBILE = 'mobile';
    const PHABLET = 'phablet';
    const TABLET = 'tablet';
    const WINDOWS_PHONE = ['windows phone'];
    const PHONEGAP = 'phonegap';
    const PHONEGAP_CAMELCASE = 'PhoneGap';
    const CAPACITOR = 'Capacitor';

    const width = window.innerWidth;
    const height = window.innerHeight;
    // order from most specifc to least specific
    const PLATFORM_CONFIGS = [
        {
            name: IPAD,
            settings: {
                keyboardHeight: 500,
            },
            isMatch: (url, userAgent) => isPlatformMatch(url, userAgent, IPAD, [IPAD], WINDOWS_PHONE)
        },
        {
            name: IPHONE,
            isMatch: (url, userAgent) => isPlatformMatch(url, userAgent, IPHONE, [IPHONE], WINDOWS_PHONE)
        },
        {
            name: IOS,
            settings: {
                mode: 'ios',
                tabsHighlight: false,
                statusbarPadding: isCordova(),
                keyboardHeight: 250,
                isDevice: true,
                deviceHacks: true,
            },
            isMatch: (url, userAgent) => isPlatformMatch(url, userAgent, IOS, [IPHONE, IPAD, 'ipod'], WINDOWS_PHONE)
        },
        {
            name: ANDROID,
            settings: {
                mode: 'md',
                isDevice: true,
                keyboardHeight: 300,
            },
            isMatch: (url, userAgent) => isPlatformMatch(url, userAgent, ANDROID, [ANDROID, 'silk'], WINDOWS_PHONE)
        },
        {
            name: CORE,
            settings: {
                mode: 'md'
            }
        },
        {
            name: PHABLET,
            isMatch: () => {
                const smallest = Math.min(width, height);
                const largest = Math.max(width, height);
                return (smallest > 390 && smallest < 520) &&
                    (largest > 620 && largest < 800);
            }
        },
        {
            name: MOBILE
        },
        {
            name: TABLET,
            isMatch: () => {
                const smallest = Math.min(width, height);
                const largest = Math.max(width, height);
                return (smallest > 460 && smallest < 820) &&
                    (largest > 780 && largest < 1400);
            }
        },
        {
            name: CORDOVA,
            isMatch: () => {
                return isCordova();
            }
        },
        {
            name: ELECTRON,
            isMatch: () => {
                return isElectron();
            }
        }
    ];
    function detectPlatforms(url, userAgent, platforms, defaultPlatform) {
        // bracket notation to ensure they're not property renamed
        let validPlatforms = platforms.filter(p => p.isMatch && p.isMatch(url, userAgent));
        if (!validPlatforms.length) {
            validPlatforms = platforms.filter(p => p.name === defaultPlatform);
        }
        return validPlatforms;
    }
    function isPlatformMatch(url, userAgent, platformName, userAgentAtLeastHas, userAgentMustNotHave) {
        const queryValue = readQueryParam(url, 'ionicplatform');
        if (queryValue) {
            return queryValue === platformName;
        }
        if (userAgent) {
            userAgent = userAgent.toLowerCase();
            for (let i = 0; i < userAgentAtLeastHas.length; i++) {
                if (userAgent.indexOf(userAgentAtLeastHas[i]) > -1) {
                    for (let j = 0; j < userAgentMustNotHave.length; j++) {
                        if (userAgent.indexOf(userAgentMustNotHave[j]) > -1) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }
    function readQueryParam(url, key) {
        key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
        const results = regex.exec(url);
        return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
    }

    function isDef(v) { return v !== undefined && v !== null; }

    function createConfigController(configObj, platforms) {
        configObj = configObj || {};
        function get(key, fallback) {
            const queryValue = readQueryParam(window.location.href, `ionic${key}`);
            if (isDef(queryValue)) {
                return configObj[key] = (queryValue === 'true' ? true : queryValue === 'false' ? false : queryValue);
            }
            if (isDef(configObj[key])) {
                return configObj[key];
            }
            let settings = null;
            for (let i = 0; i < platforms.length; i++) {
                settings = platforms[i]['settings'];
                if (settings && isDef(settings[key])) {
                    return settings[key];
                }
            }
            return fallback !== undefined ? fallback : null;
        }
        function getBoolean(key, fallback) {
            const val = get(key);
            if (val === null) {
                return fallback !== undefined ? fallback : false;
            }
            if (typeof val === 'string') {
                return val === 'true';
            }
            return !!val;
        }
        function getNumber(key, fallback) {
            const val = parseFloat(get(key));
            return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
        }
        function set(key, value) {
            configObj[key] = value;
        }
        return {
            get,
            getBoolean,
            getNumber,
            set
        };
    }

    function createDomControllerClient(win, now, rafPending) {
        const readCBs = [];
        const writeCBs = [];
        const raf = (cb) => win.requestAnimationFrame(cb);
        function rafFlush(timeStamp, startTime, cb, err) {
            try {
                startTime = now();
                // ******** DOM READS ****************
                while (cb = readCBs.shift()) {
                    cb(timeStamp);
                }
                // ******** DOM WRITES ****************
                while (cb = writeCBs.shift()) {
                    cb(timeStamp);
                    if ((now() - startTime) > 8) {
                        break;
                    }
                }
            }
            catch (e) {
                err = e;
            }
            if (rafPending = (readCBs.length > 0 || writeCBs.length > 0)) {
                raf(rafFlush);
            }
            if (err) {
                console.error(err);
            }
        }
        return {
            read: (cb) => {
                readCBs.push(cb);
                if (!rafPending) {
                    rafPending = true;
                    raf(rafFlush);
                }
            },
            write: (cb) => {
                writeCBs.push(cb);
                if (!rafPending) {
                    rafPending = true;
                    raf(rafFlush);
                }
            },
            raf: raf
        };
    }

    const Ionic = window.Ionic = window.Ionic || {};
    // add dom controller, used to coordinate DOM reads and write in order to avoid
    // layout thrashing
    if (!Context.dom) {
        const now = () => window.performance.now();
        Context.dom = createDomControllerClient(window, now);
    }
    if (!Context.platforms) {
        Context.platforms = detectPlatforms(window.location.href, window.navigator.userAgent, PLATFORM_CONFIGS, 'core');
    }
    if (!Context.readQueryParam) {
        Context.readQueryParam = readQueryParam;
    }
    // create the Ionic.config from raw config object (if it exists)
    // and convert Ionic.config into a ConfigApi that has a get() fn
    Ionic.config = Context.config = createConfigController(Ionic.config, Context.platforms);
    // first see if the mode was set as an attribute on <html>
    // which could have been set by the user, or by prerendering
    // otherwise get the mode via config settings, and fallback to md
    Ionic.mode = Context.mode = document.documentElement.getAttribute('mode') || Context.config.get('mode', 'md');
    // ensure we've got the mode attribute set on <html>
    document.documentElement.setAttribute('mode', Ionic.mode);
})(resourcesUrl);
(function(n,t,e,o){"use strict";function i(n,t,e,o,i,c,l){let f=e.n+(o||g),r=e[f];if(r||(r=e[f=e.n+g]),r){let o=t.t;if(t.e)if(1===e.encapsulation)o=i.shadowRoot;else for(;i=t.o(i);)if(i.host&&i.host.shadowRoot){o=i.host.shadowRoot;break}const c=n.i.get(o)||{};if(!c[f]){l=r.content.cloneNode(!0);const e=o.querySelectorAll("[data-styles]");t.c(o,l,e.length&&e[e.length-1].nextSibling||o.l),c[f]=!0,n.i.set(o,c)}}}function c(n){return{f:n[0],r:n[1],s:!!n[2],u:!!n[3],a:!!n[4]}}function l(n,t){if(j(t)){if(n===Boolean||3===n)return"false"!==t&&(""===t||!!t);if(n===Number||4===n)return parseFloat(t)}return t}function f(n,t,e,o){const i=n.p.get(t);i&&((o=i.$activeLoading)&&((e=o.indexOf(t))>-1&&o.splice(e,1),!o.length&&i.$initLoad()),n.p.delete(t))}function r(n,t,e){let o=null,i=!1,c=!1;for(var l=arguments.length;l-- >2;)S.push(arguments[l]);for(;S.length;)if((e=S.pop())&&void 0!==e.pop)for(l=e.length;l--;)S.push(e[l]);else"boolean"==typeof e&&(e=null),(c="function"!=typeof n)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(c=!1)),c&&i?o[o.length-1].d+=e:null===o?o=[c?{d:e}:e]:o.push(c?{d:e}:e),i=c;if(t&&(t.className&&(t.class=t.className),"object"==typeof t.class)){for(l in t.class)t.class[l]&&S.push(l);t.class=S.join(" "),S.length=0}return"function"==typeof n?n(Object.assign({},t,{m:o})):{v:n,y:o,d:null,b:t,w:t&&t.M,k:null,g:!1}}function s(n,t){n.C.has(t)||(n.C.set(t,!0),n.W.add(()=>{(function n(t,e,o,i,c){if(t.C.delete(e),!t.j.has(e)){let l;if(i=t.x.get(e),o=!i){if((c=t.p.get(e))&&!c.$rendered)return void(c.$onRender=c.$onRender||[]).push(()=>{n(t,e)});i=function l(n,t,e,o,i,c){try{(function l(n,t,e,o,i,c){for(c in n.N.set(o,e),n.O.has(e)||n.O.set(e,{}),(i=Object.assign({color:{type:String}},t.properties)).mode={type:String},i)a(n,i[c],e,o,c)})(n,o=n.A(t).S,t,e=new o),function f(n,t,e){if(t){const o=n.N.get(e);t.forEach(t=>{e[t.method]={emit:e=>{n.T(o,t.name,{bubbles:t.bubbles,composed:t.composed,cancelable:t.cancelable,detail:e})}}})}}(n,o.events,e);try{if(i=n.L.get(t)){for(c=0;c<i.length;c+=2)e[i[c]](i[c+1]);n.L.delete(t)}}catch(e){n.P(e,2,t)}}catch(o){e={},n.P(o,7,t,!0)}return n.x.set(t,e),e}(t,e);try{i.componentWillLoad&&(l=i.componentWillLoad())}catch(n){t.P(n,3,e)}}else try{i.componentWillUpdate&&(l=i.componentWillUpdate())}catch(n){t.P(n,5,e)}l&&l.then?l.then(()=>u(t,e,i,o)):u(t,e,i,o)}})(n,t)},n.R?1:3))}function u(n,t,e,o){(function i(n,t,e,o,c){try{const i=t.S.host;let l;if(o.render||o.hostData||i||l){n.q=!0;const l=o.render&&o.render();let f;f=o.hostData&&o.hostData(),n.q=!1,i&&(f=Object.keys(i).reduce((n,t)=>{switch(t){case"theme":n.class=n.class||{},n.class=Object.assign(n.class,function e(n,t,o){return o.split(" ").reduce((e,o)=>(e[o]=!0,n&&(e[`${o}-${n}`]=!0,t&&(e[`${o}-${t}`]=!0,e[`${o}-${n}-${t}`]=!0)),e),{})}(o.mode,o.color,i.theme))}return n},f||{}));const s=n.B.get(e)||{};s.k=e;const u=r(null,f,l),a=n.render(s,u,c,n.D.get(e),n.H.get(e),t.S.encapsulation);n.B.set(e,a)}n.F(n,n.U,t,o.mode,e),e.$rendered=!0,e.$onRender&&(e.$onRender.forEach(n=>n()),e.$onRender=null)}catch(t){n.q=!1,n.P(t,8,e,!0)}})(n,n.A(t),t,e,!o);try{o?t.$initLoad():b(n.B.get(t))}catch(e){n.P(e,6,t,!0)}}function a(n,t,e,o,i){if(t.type||t.state){const c=n.O.get(e);if(!t.state){if(t.attr&&(void 0===c[i]||""===c[i])){const o=n.U.z(e,t.attr);null!=o&&(c[i]=l(t.type,o))}e.hasOwnProperty(i)&&(void 0===c[i]&&(c[i]=e[i]),delete e[i])}o.hasOwnProperty(i)&&void 0===c[i]&&(c[i]=o[i]),t.watchCallbacks&&(c[A+i]=t.watchCallbacks.slice()),m(o,i,function c(t){return(t=n.O.get(n.N.get(this)))&&t[i]},function f(e,o){(o=n.N.get(this))&&(t.state||t.mutable)&&p(n,o,i,e)})}else if(t.elementRef)d(o,i,e);else if(t.method)d(e,i,o[i].bind(o));else if(t.context){const c=n.I(t.context);void 0!==c&&d(o,i,c.Q&&c.Q(e)||c)}else t.connect&&d(o,i,n.Z(t.connect))}function p(n,t,e,o,i,c,l){(i=n.O.get(t))||n.O.set(t,i={});const f=i[e];if(o!==f&&(i[e]=o,c=n.x.get(t))){if(l=i[A+e])for(let n=0;n<l.length;n++)try{c[l[n]].call(c,o,f,e)}catch(n){}!n.q&&t.$rendered&&s(n,t)}}function d(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e})}function m(n,t,e,o){Object.defineProperty(n,t,{configurable:!0,get:e,set:o})}function h(n,t,e,o,i,c,l,f,r){if("class"!==e||c)if("style"===e){for(f in o=o||C,i=i||C,o)i[f]||(t.style[f]="");for(f in i)i[f]!==o[f]&&(t.style[f]=i[f])}else if("o"!==e[0]||"n"!==e[1]||!/[A-Z]/.test(e[2])||e in t)if("list"!==e&&"type"!==e&&!c&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=n.A(t);o&&o.G&&o.G[e]?v(t,e,i):"ref"!==e&&(v(t,e,null==i?"":i),null!=i&&!1!==i||t.removeAttribute(e))}else null!=i&&function s(n,t,e){const o=t!==(t=t.replace(/^xlink\:?/,"")),i=T[t];!i||e&&"false"!==e?"function"!=typeof e&&(i&&(e=""),o?n.setAttributeNS(L,N(t),e):n.setAttribute(t,e)):o?n.removeAttributeNS(L,N(t)):n.removeAttribute(t)}(t,e,i);else e=N(e)in t?N(e.substring(2)):N(e[2])+e.substring(3),i?i!==o&&n.U.J(t,e,i):n.U.K(t,e);else if(o!==i){const n=null==o||""===o?W:o.trim().split(/\s+/),e=null==i||""===i?W:i.trim().split(/\s+/);let c=null==t.className||""===t.className?W:t.className.trim().split(/\s+/);for(f=0,r=n.length;f<r;f++)-1===e.indexOf(n[f])&&(c=c.filter(t=>t!==n[f]));for(f=0,r=e.length;f<r;f++)-1===n.indexOf(e[f])&&(c=[...c,e[f]]);t.className=c.join(" ")}}function v(n,t,e){try{n[t]=e}catch(n){}}function y(n,t,e,o,i){const c=11===e.k.nodeType&&e.k.host?e.k.host:e.k,l=t&&t.b||C,f=e.b||C;for(i in l)f&&null!=f[i]||null==l[i]||h(n,c,i,l[i],void 0,o,e.g);for(i in f)i in l&&f[i]===("value"===i||"checked"===i?c[i]:l[i])||h(n,c,i,l[i],f[i],o,e.g)}function b(n,t){n&&(n.b&&n.b.ref&&n.b.ref(t?null:n.k),n.y&&n.y.forEach(n=>{b(n,t)}))}function $(n,t,e,o,i){const c=n.V(t);let l,f,r,s;if(i&&1===c){(f=n.z(t,k))&&(r=f.split("."))[0]===o&&((s={}).v=n.X(s.k=t),e.y||(e.y=[]),e.y[r[1]]=s,e=s,i=""!==r[2]);for(let c=0;c<t.childNodes.length;c++)$(n,t.childNodes[c],e,o,i)}else 3===c&&(l=t.previousSibling)&&8===n.V(l)&&"s"===(r=n.Y(l).split("."))[0]&&r[1]===o&&((s={d:n.Y(t)}).k=t,e.y||(e.y=[]),e.y[r[2]]=s)}function w(n,t,e,o){return function(){const i=arguments;return function c(n,t,e){return new Promise(o=>{let i=t[e];i||(i=n._.querySelector(e)),i||(i=t[e]=n.nn(e),n.tn(n._,i)),i.componentOnReady(o)})}(n,t,e).then(n=>n[o].apply(n,i))}}const M="data-ssrv",k="data-ssrc",g="$",C={},W=[],E={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},j=n=>void 0!==n&&null!==n,x=n=>void 0===n||null===n,N=n=>n.toLowerCase(),O=()=>{},S=[],A="wc-",T={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},L="http://www.w3.org/1999/xlink";let P=!1;(function R(t,e,o,u,a,h){const v={html:{}},k={},C=o[t]=o[t]||{},W=function S(n,t,e){n.en||(n.en=((n,t,e,o)=>n.addEventListener(t,e,o)),n.on=((n,t,e,o)=>n.removeEventListener(t,e,o)));const o=new WeakMap,i={in:e.documentElement,t:e.head,_:e.body,cn:!1,V:n=>n.nodeType,nn:n=>e.createElement(n),ln:(n,t)=>e.createElementNS(n,t),fn:n=>e.createTextNode(n),rn:n=>e.createComment(n),c:(n,t,e)=>n.insertBefore(t,e),sn:n=>n.remove(),tn:(n,t)=>n.appendChild(t),un:n=>n.childNodes,o:n=>n.parentNode,an:n=>n.nextSibling,X:n=>N(n.tagName),Y:n=>n.textContent,pn:(n,t)=>n.textContent=t,z:(n,t)=>n.getAttribute(t),dn:(n,t,e)=>n.setAttribute(t,e),mn:(n,t,e,o)=>n.setAttributeNS(t,e,o),hn:(n,t)=>n.removeAttribute(t),vn:(n,o)=>"child"===o?n.firstElementChild:"parent"===o?i.yn(n):"body"===o?i._:"document"===o?e:"window"===o?t:n,J:(t,e,c,l,f,r,s,u)=>{const a=e;let p=t,d=o.get(t);if(d&&d[a]&&d[a](),"string"==typeof r?p=i.vn(t,r):"object"==typeof r?p=r:(u=e.split(":")).length>1&&(p=i.vn(t,u[0]),e=u[1]),!p)return;let m=c;(u=e.split(".")).length>1&&(e=u[0],m=(n=>{n.keyCode===E[u[1]]&&c(n)})),s=i.cn?{capture:!!l,passive:!!f}:!!l,n.en(p,e,m,s),d||o.set(t,d={}),d[a]=(()=>{p&&n.on(p,e,m,s),d[a]=null})},K:(n,t)=>{const e=o.get(n);e&&(t?e[t]&&e[t]():Object.keys(e).forEach(n=>{e[n]&&e[n]()}))},bn:(n,e,o)=>n&&n.dispatchEvent(new t.CustomEvent(e,o))};try{t.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>i.cn=!0}))}catch(n){}return i.yn=((n,t)=>(t=i.o(n))&&11===i.V(t)?t.host:t),i}(C,o,u);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=o,e.location=o.location,e.document=u,e.resourcesUrl=e.publicPath=a,e.enableListener=((n,t,e,o,i)=>(function c(n,t,e,o,i,l){if(t){const c=n.N.get(t),f=n.A(c);if(f&&f.$n)if(o){const o=f.$n.find(n=>n.f===e);o&&n.U.J(c,e,n=>t[o.r](n),o.a,void 0===l?o.u:!!l,i)}else n.U.K(c,e)}})(T,n,t,e,o,i)),e.emit=((n,t,o)=>W.bn(n,e.eventNameFn?e.eventNameFn(t):t,o)),C.h=r,C.Context=e;const A=o.$definedCmps=o.$definedCmps||{},T={wn:function L(n,t){t.mode||(t.mode=W.z(t,"mode")||e.mode),W.z(t,M)||function o(n,t){return n&&1===t.encapsulation}(W.e,n)||function i(n,t,e,o,c,l,f,r,s){for(e.$defaultHolder||t.c(e,e.$defaultHolder=t.rn(""),o[0]),s=0;s<o.length;s++)c=o[s],1===t.V(c)&&null!=(l=t.z(c,"slot"))?(r=r||{})[l]?r[l].push(c):r[l]=[c]:f?f.push(c):f=[c];n.D.set(e,f),n.H.set(e,r)}(T,W,t,t.childNodes),W.e||1!==n.encapsulation||(t.shadowRoot=t)},U:W,Mn:function R(n,t){if(!A[n.n]){A[n.n]=!0,function e(n,t,o,i){o.connectedCallback=function(){(function e(n,t,o){n.kn.has(o)||(n.kn.set(o,!0),function i(n,t){const e=n.A(t);e.$n&&e.$n.forEach(e=>{e.s||n.U.J(t,e.f,function o(n,t,e,i){return o=>{(i=n.x.get(t))?i[e](o):((i=n.L.get(t)||[]).push(e,o),n.L.set(t,i))}}(n,t,e.r),e.a,e.u)})}(n,o)),n.j.delete(o),n.gn.has(o)||(n.gn.set(o,!0),function c(n,t,e){for(e=t;e=n.U.yn(e);)if(n.Cn(e)){n.Wn.has(t)||(n.p.set(t,e),(e.$activeLoading=e.$activeLoading||[]).push(t));break}}(n,o),n.W.add(()=>{n.wn(t,o),n.loadBundle(t,o.mode,()=>s(n,o))},3))})(n,t,this)},o.attributeChangedCallback=function(n,e,o){(function i(n,t,e,o,c,f,r){if(n&&o!==c)for(f in n)if((r=n[f]).En&&N(r.En)===N(e)){t[f]=l(r.jn,c);break}})(t.G,this,n,e,o)},o.disconnectedCallback=function(){(function t(n,e,o){!n.xn&&function i(n,t){for(;t;){if(!n.o(t))return 9!==n.V(t);t=n.o(t)}}(n.U,e)&&(n.j.set(e,!0),f(n,e),b(n.B.get(e),!0),n.U.K(e),n.kn.delete(e),(o=n.x.get(e))&&o.componentDidUnload&&o.componentDidUnload())})(n,this)},o.componentOnReady=function(t,e){return t||(e=new Promise(n=>t=n)),function o(n,t,e,i){n.j.has(t)||(n.Wn.has(t)?e(t):((i=n.Nn.get(t)||[]).push(e),n.Nn.set(t,i)))}(n,this,t),e},o.$initLoad=function(){(function t(n,e,o,i,c){if(!n.Wn.has(e)&&(i=n.x.get(e))&&!n.j.has(e)&&(!e.$activeLoading||!e.$activeLoading.length)){delete e.$activeLoading,n.Wn.set(e,!0);try{b(n.B.get(e)),(c=n.Nn.get(e))&&(c.forEach(n=>n(e)),n.Nn.delete(e)),i.componentDidLoad&&i.componentDidLoad()}catch(t){n.P(t,4,e)}e.classList.add(o),f(n,e)}})(n,this,i)},o.forceUpdate=function(){s(n,this)},function c(n,t,e){t&&Object.keys(t).forEach(o=>{const i=t[o].On;1===i||2===i?m(e,o,function t(){return(n.O.get(this)||{})[o]},function t(e){p(n,this,o,e)}):6===i&&d(e,o,O)})}(n,t.G,o)}(T,n,t.prototype,h);{const e=[];for(const t in n.G)n.G[t].En&&e.push(n.G[t].En);t.observedAttributes=e}o.customElements.define(n.n,t)}},T:e.emit,A:n=>v[W.X(n)],I:n=>e[n],isClient:!0,Cn:n=>!(!A[W.X(n)]&&!T.A(n)),loadBundle:function q(n,t,e){if(n.S)e();else{const o="string"==typeof n.Sn?n.Sn:n.Sn[t],i=a+o+(function o(n,t){return 2===t.encapsulation||1===t.encapsulation&&!n}(W.e,n)?".sc":"")+".js";import(i).then(t=>{try{n.S=t[(n=>N(n).split("-").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(""))(n.n)],function o(n,t,e){const o=e.style;if(o){const i=e.is+(e.styleMode||g);if(!t[i]){const e=n.nn("template");t[i]=e,e.innerHTML=`<style>${o}</style>`,n.tn(n.t,e)}}}(W,n,n.S)}catch(t){n.S=class{}}e()}).catch(n=>void 0)}},P:(n,t,e)=>void 0,Z:n=>(function t(n,e,o){return{create:w(n,e,o,"create"),componentOnReady:w(n,e,o,"componentOnReady")}})(W,k,n),W:function B(t,e,o,i){function c(){for(;u.length>0;)u.shift()();o=!1}function l(n){for(n=r(),c();a.length>0&&r()-n<40;)a.shift()();(i=a.length>0)&&t.raf(f)}function f(n){for(c(),n=4+r();a.length>0&&r()<n;)a.shift()();(i=a.length>0)&&t.raf(l)}const r=()=>e.performance.now(),s=Promise.resolve(),u=[],a=[];return t.raf||(t.raf=n.requestAnimationFrame.bind(n)),{add:(n,e)=>{3===e?(u.push(n),o||(o=!0,s.then(c))):(a.push(n),i||(i=!0,t.raf(l)))}}}(C,o),p:new WeakMap,i:new WeakMap,D:new WeakMap,gn:new WeakMap,kn:new WeakMap,Wn:new WeakMap,N:new WeakMap,x:new WeakMap,j:new WeakMap,C:new WeakMap,H:new WeakMap,Nn:new WeakMap,L:new WeakMap,B:new WeakMap,O:new WeakMap};T.render=function D(n,t){function e(o,i,l,f,r,s,m,h,v){if(!p&&"slot"===o.v){if((u||a)&&(d&&t.dn(i,d+"-slot",""),m=o.b&&o.b.name,h=j(m)?a&&a[m]:u,j(h))){for(n.xn=!0,f=0;f<h.length;f++)s=h[f],t.sn(s),t.tn(i,s),8!==s.nodeType&&(v=!0);!v&&o.y&&c(i,[],o.y),n.xn=!1}return null}if(j(o.d))o.k=t.fn(o.d);else{r=o.k=t.nn(o.v),y(n,null,o,P),null!==d&&r.An!==d&&t.dn(r,r.An=d,"");const i=o.y;if(i)for(f=0;f<i.length;++f)(s=e(i[f],r))&&t.tn(r,s)}return o.k}function o(n,o,i,c,l,f,r){const s=n.$defaultHolder&&t.o(n.$defaultHolder)||n;for(;c<=l;++c)r=i[c],j(r)&&(f=j(r.d)?t.fn(r.d):e(r,n),j(f)&&(r.k=f,t.c(s,f,o)))}function i(n,e,o){for(;e<=o;++e)j(n[e])&&t.sn(n[e].k)}function c(n,c,s){let u,a,p,d,m=0,h=0,v=c.length-1,y=c[0],b=c[v],$=s.length-1,w=s[0],M=s[$];for(;m<=v&&h<=$;)null==y?y=c[++m]:null==b?b=c[--v]:null==w?w=s[++h]:null==M?M=s[--$]:l(y,w)?(r(y,w),y=c[++m],w=s[++h]):l(b,M)?(r(b,M),b=c[--v],M=s[--$]):l(y,M)?(r(y,M),t.c(n,y.k,t.an(b.k)),y=c[++m],M=s[--$]):l(b,w)?(r(b,w),t.c(n,b.k,y.k),b=c[--v],w=s[++h]):(x(u)&&(u=f(c,m,v)),a=u[w.w],x(a)?(d=e(w,n),w=s[++h]):((p=c[a]).v!==w.v?d=e(w,n):(r(p,w),c[a]=void 0,d=p.k),w=s[++h]),d&&t.c(y.k&&y.k.parentNode||n,d,y.k));m>v?o(n,null==s[$+1]?null:s[$+1].k,s,h,$):h>$&&i(c,m,v)}function l(n,t){return n.v===t.v&&n.w===t.w}function f(n,t,e){const o={};let i,c,l;for(i=t;i<=e;++i)null!=(l=n[i])&&void 0!==(c=l.w)&&(o.Tn=i);return o}function r(e,l){const f=l.k=e.k,r=e.y,s=l.y;let u;if(x(l.d))"slot"!==l.v&&y(n,e,l,P),j(r)&&j(s)?c(f,r,s):j(s)?(j(e.d)&&t.pn(f,""),o(f,null,s,0,s.length-1)):j(r)&&i(r,0,r.length-1);else if(u=n.D.get(f)){const e=u[0].parentElement;t.pn(e,l.d),n.D.set(f,[e.childNodes[0]])}else e.d!==l.d&&t.pn(f,l.d)}let s,u,a,p,d;return function n(e,o,i,c,l,f,p){return s=i,u=c,a=l,d="scoped"===f||"shadow"===f&&!t.e?"data-"+t.X(e.k):null,s||d&&t.dn(e.k,d+"-host",""),r(e,o),o}}(T,W);const H=W.in;H.$rendered=!0,H.$activeLoading=[],H.$initLoad=(()=>{T.Wn.set(H,C.loaded=T.R=!0),W.bn(o,"appload",{detail:{namespace:t}})}),function F(n,t,e){const o=e.querySelectorAll(`[${M}]`),i=o.length;let c,l,f,r,s,u;if(i>0)for(n.Wn.set(e,!0),r=0;r<i;r++)for(c=o[r],l=t.z(c,M),(f={}).v=t.X(f.k=c),n.B.set(c,f),s=0,u=c.childNodes.length;s<u;s++)$(t,c.childNodes[s],f,l,!0)}(T,W,H),T.F=i,(C.components||[]).map(n=>(function t(n,e,o,i){const l={n:n[0],G:{color:{En:"color"}}};l.Sn=n[1];const f=n[3];if(f)for(o=0;o<f.length;o++)i=f[o],l.G[i[0]]={On:i[1],Ln:!!i[2],En:"string"==typeof i[3]?i[3]:i[3]?i[0]:0,jn:i[4]};return l.encapsulation=n[4],n[5]&&(l.$n=n[5].map(c)),e[l.n]=l})(n,v)).forEach(n=>T.Mn(n,class extends HTMLElement{})),C.initialized=!0,W.bn(n,"appinit",{detail:{namespace:t}})})(o,e,n,t,resourcesUrl,hydratedCssClass)})(window,document,Context,namespace);
})({},"App","hydrated");