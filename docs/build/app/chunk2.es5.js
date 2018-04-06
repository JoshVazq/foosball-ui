/*! Built with http://stenciljs.com */
App.loadBundle("./chunk2.js", ["exports"], function (n) { window.App.h, n.getButtonClassMap = function (n, e) { return n ? (_a = {}, _a[n] = !0, _a[n + "-" + e] = !0, _a) : {}; var _a; }, n.getElementClassMap = function (n) { var e = {}; for (var t = 0; t < n.length; t++)
    e[n[t]] = !0; return e; }, n.openURL = function (n, e, t) {
    if (t === void 0) { t = !1; }
    if (n && "#" !== n[0] && -1 === n.indexOf("://")) {
        var r_1 = document.querySelector("ion-router");
        if (r_1)
            return e && e.preventDefault(), r_1.componentOnReady().then(function () { return r_1.push(n, t ? -1 : 1); });
    }
    return Promise.resolve();
}, n.createThemedClasses = function (n, e, t) { var r = {}; return t.split(" ").forEach(function (t) { return r[t] = !0, n && (r[t + "-" + n] = !0, e && (r[t + "-" + e] = !0, r[t + "-" + n + "-" + e] = !0)), r; }), r; }, n.getClassMap = function (n) { var e = {}; return function (n) { return n ? Array.isArray(n) ? n : n.split(" ").filter(function (n) { return "" !== n.trim(); }) : []; }(n).forEach(function (n) { return e[n] = !0; }), e; }; });
