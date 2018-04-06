/*! Built with http://stenciljs.com */
(function(namespace,resourcesUrl){"use strict";
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
})("App");