/*! Built with http://stenciljs.com */
App.loadBundle("./chunk4.js", ["exports"], function (n) { function e(n, e) { var t = n._original || n; return { _original: n, emit: function (n, e) {
        if (e === void 0) { e = 0; }
        var t;
        return function () {
            var o = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                o[_i] = arguments[_i];
            }
            clearTimeout(t), t = setTimeout.apply(void 0, [n, e].concat(o));
        };
    }(t.emit.bind(t), e) }; } window.App.h, n.now = function (n) { return n.timeStamp || Date.now(); }, n.pointerCoord = function (n) { if (n) {
    var e_1 = n.changedTouches;
    if (e_1 && e_1.length > 0) {
        var n_1 = e_1[0];
        return { x: n_1.clientX, y: n_1.clientY };
    }
    if (void 0 !== n.pageX)
        return { x: n.pageX, y: n.pageY };
} return { x: 0, y: 0 }; }, n.assert = function (n, e) { if (!n) {
    var n_2 = "ASSERT: " + e;
    throw console.error(n_2), new Error(n_2);
} }, n.deferEvent = function (n) { return e(n, 0); }, n.debounceEvent = e; });
