/*! Built with http://stenciljs.com */
App.loadBundle("./chunk1.js", ["exports"], function (e) { var n; window.App.h, (n = e.PLAYER_POSITION || (e.PLAYER_POSITION = {})).DEF = "DEF", n.ATK = "ATK", e.urlB64ToUint8Array = function (e) { var n = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), t = new Uint8Array(r.length); for (var e_1 = 0; e_1 < r.length; ++e_1)
    t[e_1] = r.charCodeAt(e_1); return t; }; });
