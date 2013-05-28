
window.GS = window.GS || {};

GS.Views = GS.Views || {}, GS.Views.Pages = GS.Views.Pages || {};


(function(win, doc) {
    var loc = win.location,
    p = loc.href.substring(loc.href.indexOf(loc.host) + loc.host.length);
    win.GS.loadHash = p.substr(1);
    if (p.length > 1 && p.indexOf('/#') !== 0) {
    if (doc && doc.referrer && doc.referrer != '') {
    var r = doc.referrer,
    t = new Date();
    t.setTime(t.getTime() + 60000);
    r = encodeURIComponent(r);
    doc.cookie = "referrerURL=" + r + "; expires=" + t.toUTCString() + "; path=/; domain=." + loc.host;
    }
    win.location = loc.protocol + '//' + loc.host + '/#!' + p;
    }
})(window, document);




if (!window.console) {
    window.console = {log: function() {}, error: function() {}, warn: function() {}, info: function() {}};
} else if (typeof window.console.time === 'undefined') {
    (function() {
    var timers = {};
    window.console.time = function(name) {
    timers[name] = (new Date).getTime();
    };
    window.console.timeEnd = function(name) {
    console.log('%s: %sms', name, (new Date).getTime() - timers[name]);
    };
    })();
}

window.setupBridge = function(){};

