var wrUrl = "//sina.wrating.com/";
var wrDomain = "sina.com.cn";
var wratingDefaultAcc = "860010-0323010000";
var wratingAccArray = {
    "history.sina.com.cn": "860010-0334010000",
    "health.sina.com.cn": "860010-0330010000",
    "fashion.sina.com.cn": "860010-0311010000",
    "collection.sina.com.cn": "860010-0331010000",
    "2014.sina.com.cn": "860010-0308160000",
    "2012.sina.com.cn": "860010-0308150000",
    "torch.2008.sina.com.cn": "860010-0308070000",
    "video.sina.com.cn": "860010-0309010000",
    "ent.sina.com.cn": "860010-0312010000",
    "tech.sina.com.cn": "860010-0313010000",
    "mobile.sina.com.cn": "860010-0313020000",
    "house.sina.com.cn": "860010-0315010000",
    "bj.house.sina.com.cn": "860010-0315020000",
    "auto.sina.com.cn": "860010-0316010000",
    "eladies.sina.com.cn": "860010-0317010000",
    "woman.sina.com.cn": "860010-0317010000",
    "games.sina.com.cn": "860010-0318010000",
    "edu.sina.com.cn": "860010-0307010000",
    "baby.sina.com.cn": "860010-0320010000",
    "astro.sina.com.cn": "860010-0321020000",
    "news.sina.com.cn": "860010-0310010000",
    "weather.news.sina.com.cn": "860010-0310020000",
    "mil.news.sina.com.cn": "860010-0310030000",
    "www.sina.com.cn": "860010-0322010000",
    "home.sina.com.cn": "860010-0322010000",
    "sports.sina.com.cn": "860010-0308010000",
    "shidefc.sina.com.cn": "860010-0308020000",
    "weiqi.sina.com.cn": "860010-0308030000",
    "f1.sina.com.cn": "860010-0308040000",
    "golf.sina.com.cn": "860010-0308050000",
    "2002.sina.com.cn": "860010-0308060000",
    "2004.sina.com.cn": "860010-0308060000",
    "2006.sina.com.cn": "860010-0308060000",
    "2008.sina.com.cn": "860010-0308070000",
    "yayun2002.sina.com.cn": "860010-0308060000",
    "yayun2006.sina.com.cn": "860010-0308060000",
    "book.sina.com.cn": "860010-0319010000",
    "cul.book.sina.com.cn": "860010-0319020000",
    "comic.book.sina.com.cn": "860010-0319030000",
    "finance.sina.com.cn": "860010-0314010000",
    "money.sina.com.cn": "860010-0314020000",
    "yue.sina.com.cn": "860010-0324010000",
    "www.sina.com": "860010-0322010000"
};
function vjTrack() {
    var U = 1800;
    var T = false;
    var S = false;
    var R = "";
    var Q = "0";
    var P = "";
    var N;
    var L;
    var K;
    var J;
    var I;
    var H = "expires=Fri, 1 Jan 2038 00:00:00 GMT;";
    var G = 0;
    if (document.location.protocol == "file:") {
        return
    }
    T = navigator.cookieEnabled ? "1": "0";
    S = navigator.javaEnabled() ? "1": "0";
    var F = "0";
    var E;
    var C = -1;
    var D = document.cookie;
    if (T == "1") {
        C = D.indexOf("vjuids=");
        if (C < 0) {
            E = vjVisitorID();
            document.cookie = "vjuids=" + escape(E) + ";" + H + ";domain=" + wrDomain + ";path=/;";
            if (document.cookie.indexOf("vjuids=") < 0) {
                T = "0"
            } else {
                Q = "1"
            }
        } else {
            E = vjGetCookie("vjuids")
        }
    }
    L = document.referrer;
    if (!L || L == "") {
        L = ""
    }
    R = vjFlash();
    if (self.screen) {
        N = screen.width + "x" + screen.height + "x" + screen.colorDepth
    } else {
        if (self.java) {
            var M = java.awt.Toolkit.getDefaultToolkit();
            var O = M.getScreenSize();
            N = O.width + "x" + O.height + "x0"
        }
    }
    if (navigator.language) {
        K = navigator.language.toLowerCase()
    } else {
        if (navigator.browserLanguage) {
            K = navigator.browserLanguage.toLowerCase()
        } else {
            K = "-"
        }
    }
    I = "";
    var B;
    var X;
    X = new Date();
    J = X.getTimezoneOffset() / -60;
    J = X.getTimezoneOffset() / -60;
    B = "&s=" + N + "&l=" + K + "&z=" + J + "&j=" + S + "&f=" + R;
    if (T == "1") {
        C = document.cookie.indexOf("vjlast=");
        if (C < 0) {
            G = 0
        } else {
            G = parseInt(vjGetCookie("vjlast"))
        }
    }
    if ((X.getTime() / 1000) - G > U) {
        F = "1";
        document.cookie = "vjlast=" + Math.round(X.getTime() / 1000) + ";" + H + ";domain=" + wrDomain + ";path=/;"
    }
    if (L != "") {
        B = B + "&r=" + escape(L)
    }
    if (F != "0") {
        B = B + "&n=" + G
    }
    if (Q != "0") {
        B = B + "&u=" + Q
    }
    var V;
    var A = vjGetAcc();
    var W = vjGetDomain();
    V = wrUrl + "a.gif?a=" + X.getTime().toString(16) + "&t=" + escape(I) + "&i=" + escape(E) + "&b=" + escape(document.location) + "&c=" + A + B + "&ck=" + W;
    document.write('<img src="' + V + '" width="1" height="1" style="visibility:hidden;position:absolute;left:0px;top:0px;z-index:-1" />')
}
function vjGetAcc() {
    var B = document.location.toString().toLowerCase();
    var C = (B.split("/"))[2];
    var A = wratingAccArray[C];
    if (typeof(A) == "undefined") {
        A = wratingDefaultAcc
    }
    return A
}
function vjFlash() {
    var _wr_f = "-",
    _wr_n = navigator;
    if (_wr_n.plugins && _wr_n.plugins.length) {
        for (var ii = 0; ii < _wr_n.plugins.length; ii++) {
            if (_wr_n.plugins[ii].name.indexOf("Shockwave Flash") != -1) {
                _wr_f = _wr_n.plugins[ii].description.split("Shockwave Flash ")[1];
                break
            }
        }
    } else {
        if (window.ActiveXObject) {
            for (var ii = 10; ii >= 2; ii--) {
                try {
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
                    if (fl) {
                        _wr_f = ii + ".0";
                        break
                    }
                } catch(e) {}
            }
        }
    }
    return _wr_f
}
function vjHash(B) {
    if (!B || B == "") {
        return 0
    }
    var D = 0;
    for (var C = B.length - 1; C >= 0; C--) {
        var A = parseInt(B.charCodeAt(C));
        D = (D << 5) + D + A
    }
    return D
}
function vjVisitorID() {
    var B = vjHash(document.location + document.cookie + document.referrer).toString(16);
    var A;
    A = new Date();
    return B + "." + A.getTime().toString(16) + "." + Math.random().toString(16)
}
function vjGetCookieVal(B) {
    var A = document.cookie.indexOf(";", B);
    if (A == -1) {
        A = document.cookie.length
    }
    return unescape(document.cookie.substring(B, A))
}
function vjGetCookie(C) {
    var B = C + "=";
    var F = B.length;
    var A = document.cookie.length;
    var E = 0;
    while (E < A) {
        var D = E + F;
        if (document.cookie.substring(E, D) == B) {
            return vjGetCookieVal(D)
        }
        E = document.cookie.indexOf(" ", E) + 1;
        if (E == 0) {
            break
        }
    }
    return null
}
function vjGetDomain() {
    var A = 0;
    try {
        if (window.self.parent != self) {
            var D = /sina.com/i;
            var C = document.location.toString().toLowerCase();
            var B = parent.location.toString().toLowerCase();
            if (D.test(C) && D.test(B)) {
                A = 1
            }
        }
    } catch(e) {
        A = 1
    }
    return A
}
vjTrack();