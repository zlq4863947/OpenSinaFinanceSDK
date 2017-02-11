xh5_define("plugins.techcharts", ["utils.util", "utils.painter"], function(t, i) {
    "use strict";
    function r(t, i, r) {
        this.cfg = t,
        this.isSC = !0,
        this.proxyCfg = Z({
            iTo: function() {},
            ctn: null ,
            titleCtn: null ,
            iMgr: void 0,
            titleW: 0 / 0,
            titleGap: 0 / 0,
            withHBg: !0,
            h: 0 / 0,
            mh: 0 / 0,
            eh: 0 / 0,
            lz: 0 / 0,
            fixIdctW: !1,
            onClkMain: void 0,
            stock: void 0,
            usrObj: void 0,
            initMgr: void 0
        }, i),
        this.selfCfg = Z({
            nu: !1,
            h: this.proxyCfg.h,
            mh: this.proxyCfg.mh,
            eh: this.proxyCfg.eh,
            titleW: 0 / 0,
            isBlank: !1,
            ctnId: void 0,
            allowrfs: !0
        }, r),
        this.isBlank = this.selfCfg.isBlank,
        this.proxyCfg.titleW = this.selfCfg.titleW,
        this.symbol = this.proxyCfg.stock.symbol,
        this.aliasymbol = void 0,
        this.name = void 0,
        this.sname = void 0,
        this.alias = void 0,
        this.nu = this.selfCfg.nu,
        this.separate = 0,
        this.urlData = void 0,
        this.cb = void 0,
        this.toReCalc = !1,
        this.selfDataUrl = void 0,
        this.selfDataUrlUpdate = void 0,
        this.df = void 0,
        this.viewState = this.proxyCfg.stock.viewState,
        this.datas = null ,
        this.wrap = void 0,
        this.titleCtn = void 0,
        this.titleO = void 0,
        this.indicatorArr = void 0,
        this.line = void 0,
        this.h = this.selfCfg.h,
        this.mh = this.selfCfg.mh,
        this.eh = this.selfCfg.eh,
        this.labelMaxP = 0 / 0,
        this.labelMinP = 0 / 0,
        this.maxPrice = 0 / 0,
        this.minPrice = 0 / 0,
        this.pricePosArr = void 0,
        this.labelPriceCount = 2,
        this.isMain = !0,
        this.oriArr = void 0,
        this.selfArr = [],
        this.disMod = 1,
        this.tkProp = {
            close: "close"
        },
        this.customArr = void 0,
        this.DEFAULT_ARR,
        this.updateId = void 0,
        this.updateCount = 0,
        this.UPDATE_THRESHOLD = 0,
        this.__iOffsetX = 0,
        this.asPChart = !1,
        this.vaObj = void 0,
        this.param = void 0,
        this.lw = 1.3,
        this.ic({
            h: this.h
        })
    }
    function s(t, i) {
        var s = {
            isBlank: !0,
            ctnId: "blankctn_" + t.uid,
            allowrfs: !1,
            h: t.DIMENSION.H_BLK
        };
        r.call(this, t, i, s),
        this.name = "BLANKCTN",
        this.newParam = function() {}
    }
    function a(i, s) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#007cc8",
            prop: "adl",
            idct: "ADL"
        }],
        r.call(this, i, s),
        this.name = "ADL",
        this.sname = "T_ADL",
        this.disMod = i.datas.tDataLen;
        var a = "#b82c0c"
          , e = "#2ec196";
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var s, a, e = 0, h = r.length; h > e; e++) {
                s = r[e],
                a = s.price - (s.avg_price || 0);
                var o = {
                    adl: a
                };
                o[nt + "price"] = s.price,
                this.selfArr.push(o)
            }
        }
        ,
        this.draw = function() {
            if (this.datas) {
                var t = this.line;
                t.clear(!0, i.PARAM.getHd());
                for (var r, s, h, o = this.datas.length, l = i.DIMENSION.w_t / o, n = l * dt, c = .5 * this.h, f = 0; 2 > f; f++) {
                    s = l * dt,
                    t.beginPath();
                    for (var d = 0; o > d && (r = this.datas[d],
                    !(r.ignore_price < 0)); d++)
                        h = r.adly,
                        0 == f ? r.adl > 0 && t.drawVStickC(s, h, n, c - h, a) : r.adl < 0 && t.drawVStickC(s, h, n, c - h, e),
                        s += l;
                    t.stroke()
                }
                t.drawBg()
            }
        }
    }
    function e(i, s) {
        this.DEFAULT_ARR = [{
            v: 26,
            color: "#75B2A3",
            prop: "asi",
            idct: "ASI"
        }, {
            v: 10,
            color: "#68A3FF",
            prop: "asit",
            idct: "ASIT"
        }],
        r.call(this, i, s),
        this.name = "ASI";
        var a = ut.calcREF
          , e = ut.calcABS
          , h = ut.calcMAX
          , o = ut.calcSUM
          , l = ut.calcMA
          , n = ut.getArr
          , c = ut.operateArr;
        this.initAndCalcAll = function(i) {
            for (var r = this.customArr, s = r[0].v, f = r[1].v, d = n(i, "close"), u = n(i, "high"), v = n(i, "low"), p = n(i, "open"), A = a(d, 1), m = e(c(u, A, "-")), g = e(c(v, A, "-")), y = e(c(u, a(v, 1), "-")), b = e(c(A, a(p, 1), "-")), w = [], D = 0, _ = m.length; _ > D; D++)
                w.push(m[D] > g[D] && m[D] > y[D] ? m[D] + g[D] / 2 + b[D] / 4 : g[D] > y[D] && g[D] > m[D] ? g[D] + m[D] / 2 + b[D] / 4 : y[D] + b[D] / 4);
            var M = c(c(c(c(d, A, "-"), c(c(d, p, "-"), 2, "/"), "+"), A, "+"), a(p, 1), "-")
              , O = c(c(c(M, 16, "*"), w, "/"), h(m, g), "*")
              , T = o(O, s)
              , S = l(T, f);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var I = 0, C = i.length; C > I; I++)
                this.selfArr[I] = {
                    asi: T[I],
                    asit: S[I]
                }
        }
    }
    function h(i, s) {
        this.DEFAULT_ARR = [{
            v: 11,
            color: "#999999",
            prop: "bbiboll",
            idct: "BBIBOLL"
        }, {
            v: 6,
            color: "#ffac03",
            prop: "upr",
            idct: "UPR"
        }, {
            v: 0 / 0,
            color: "#9922aa",
            prop: "dwn",
            idct: "DWN"
        }],
        r.call(this, i, s),
        this.name = "BBIBOLL",
        "k" != s.type && (this.sname = "T_" + this.name);
        var a = ut.calcMA
          , e = ut.calcSTD
          , h = ut.getArr
          , o = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , l = this.customArr[1].v
              , n = h(r, this.tkProp.close)
              , c = o(o(o(o(a(n, 3), a(n, 6), "+"), a(n, 12), "+"), a(n, 24), "+"), 4, "/")
              , f = o(c, o(e(c, s), l, "*"), "+")
              , d = o(c, o(e(c, s), l, "*"), "-");
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var u = 0, v = r.length; v > u; u++)
                this.selfArr[u] = {
                    bbiboll: c[u],
                    upr: f[u],
                    dwn: d[u]
                },
                this.selfArr[u][ct] = r[u].volume < 0
        }
    }
    function o(i, s) {
        this.DEFAULT_ARR = [{
            v: 22,
            color: "#fa6d6d",
            prop: "m",
            idct: "M"
        }, {
            color: "#2b55ff"
        }],
        r.call(this, i, s),
        this.name = "BF";
        var a = ut.calcMA
          , e = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , h = e(i, "high")
              , o = a(h, s);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var l = 0, n = i.length; n > l; l++)
                this.selfArr[l] = {
                    m: o[l]
                }
        }
        ,
        this.draw = function(r, s) {
            function a(t, i, r) {
                for (var s = t.length, a = t[s - 1][i], e = s - 1, h = t.length; h--; ) {
                    var o = t[h][i];
                    r ? o > a && (a = o,
                    e = h) : a > o && (a = o,
                    e = h)
                }
                return e
            }
            if (this.__iOffsetX = isNaN(s) ? this.__iOffsetX : s,
            this.datas) {
                var e = this.line;
                e.clear(!0, i.PARAM.getHd());
                for (var h, o, l, n = ut.calcREF, c = ut.getArr, f = c(this.selfArr, "m"), d = n(f, 1), u = this.viewState.start, v = this.viewState.end, p = t.hex2dec(this.customArr[0].color, .5), A = t.hex2dec(this.customArr[1].color, .5), m = u; v > m; m++) {
                    if ("undefined" == typeof h && (h = f[m] - d[m] >= 0 ? 1 : -1,
                    o = h,
                    l = m),
                    h = f[m] - d[m] >= 0 ? 1 : -1,
                    m == v - 1 && (h = -o),
                    h != o) {
                        e.beginPath(),
                        e.moveTo(this.oriArr[m].ix, this.datas[m - u].my),
                        e.lineTo(this.oriArr[l].ix, this.datas[l - u].my);
                        var g;
                        -1 == h ? (g = a(this.oriArr.slice(l, m + 1), "high", !0) + l,
                        e.lineTo(this.oriArr[g].ix, this.oriArr[g].hy),
                        e.newFillStyle([p])) : (g = a(this.oriArr.slice(l, m + 1), "low", !1) + l,
                        e.lineTo(this.oriArr[g].ix, this.oriArr[g].ly),
                        e.newFillStyle([A])),
                        e.fill(),
                        l = m
                    }
                    o = h
                }
                r && e.drawBg(this.__iOffsetX)
            }
        }
    }
    function l(i, s) {
        this.DEFAULT_ARR = [{
            v: 6,
            color: "#FD9C35",
            prop: "bias1",
            idct: "BIAS1"
        }, {
            v: 12,
            color: "#00c1eb",
            prop: "bias2",
            idct: "BIAS2"
        }, {
            v: 24,
            color: "#DD4444",
            prop: "bias3",
            idct: "BIAS3"
        }],
        r.call(this, i, s),
        this.name = "BIAS",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            min: 0 / 0,
            max: 0 / 0,
            glv: 0
        };
        var a = ut.calcMA
          , e = ut.getArr
          , h = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , o = this.customArr[1].v
              , l = this.customArr[2].v
              , n = e(r, this.tkProp.close)
              , c = h(h(h(n, a(n, s), "-"), a(n, s), "/"), 100, "*")
              , f = h(h(h(n, a(n, o), "-"), a(n, o), "/"), 100, "*")
              , d = h(h(h(n, a(n, l), "-"), a(n, l), "/"), 100, "*");
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var u = 0, v = r.length; v > u; u++)
                this.selfArr[u] = {
                    bias1: c[u],
                    bias2: f[u],
                    bias3: d[u]
                },
                this.selfArr[u][ct] = r[u].volume < 0
        }
    }
    function n(i, s) {
        this.DEFAULT_ARR = [{
            v: 20,
            color: "#999999",
            prop: "boll",
            idct: "BOLL"
        }, {
            v: 2,
            color: "#ffac03",
            prop: "upper",
            idct: "UPPER"
        }, {
            v: 0 / 0,
            color: "#cc22ba",
            prop: "lower",
            idct: "LOWER"
        }],
        r.call(this, i, s),
        this.name = "BOLL",
        "k" != s.type && (this.sname = "T_" + this.name);
        var a = ut.getArr
          , e = ut.calcMA
          , h = ut.calcSTD
          , o = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , l = this.customArr[1].v
              , n = a(r, this.tkProp.close)
              , c = e(n, s)
              , f = o(h(n, s), l, "*")
              , d = o(c, f, "+")
              , u = o(c, f, "-");
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var v = 0, p = r.length; p > v; v++)
                this.selfArr[v] = {
                    boll: c[v],
                    upper: d[v],
                    lower: u[v]
                },
                this.selfArr[v][ct] = r[v].volume < 0
        }
    }
    function c(i, s) {
        this.DEFAULT_ARR = [{
            v: 26,
            color: "#E297FF",
            prop: "br",
            idct: "BR"
        }, {
            color: "#666666",
            prop: "ar",
            idct: "AR"
        }],
        r.call(this, i, s),
        this.name = "BRAR",
        this.vaObj = {
            glv: 150
        };
        var a = ut.calcSUM
          , e = ut.calcMAX
          , h = ut.calcREF
          , o = ut.getArr
          , l = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , n = o(i, "high")
              , c = o(i, "close")
              , f = o(i, "open")
              , d = o(i, "low")
              , u = h(c, 1)
              , v = l(l(a(e(0, l(n, u, "-")), s), a(e(0, l(u, d, "-")), s), "/"), 100, "*")
              , p = l(l(a(l(n, f, "-"), s), a(l(f, d, "-"), s), "/"), 100, "*");
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var A = 0, m = i.length; m > A; A++)
                this.selfArr[A] = {
                    br: v[A],
                    ar: p[A]
                }
        }
    }
    function f(i, s) {
        this.DEFAULT_ARR = [{
            v: 14,
            color: "#FFAC03",
            prop: "cci",
            idct: "CCI"
        }],
        r.call(this, i, s),
        this.name = "CCI",
        this.vaObj = {
            upper: 100,
            lower: -100,
            glv: 0
        };
        var a = ut.calcAVEDEV
          , e = ut.calcMA
          , h = ut.operateArr
          , o = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , l = o(i, "close")
              , n = o(i, "high")
              , c = o(i, "low")
              , f = h(h(h(n, c, "+"), l, "+"), 3, "/")
              , d = h(h(f, e(f, s), "-"), h(a(f, s), .015, "*"), "/");
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var u = 0, v = i.length; v > u; u++)
                this.selfArr[u] = {
                    cci: d[u]
                }
        }
    }
    function d(i, s, a) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#ff8400",
            prop: "value",
            idct: "\u7b79\u7801\u6210\u672c"
        }],
        r.call(this, i, s),
        this.name = "CHIPCOST",
        this.lw = 2,
        this.cb = a,
        this.selfDataUrl = "http://finance.sina.com.cn/perspective/chip/$symbol.js?_=$rn";
        var e = "chip_";
        this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + e + "$symbol",
        this.toReCalc = !0,
        this.loadedFlag = {},
        this.loadedFromTo = void 0,
        this.loadUrlData = function() {
            var i = this.getFromToM.get(this);
            if (i) {
                var r = this
                  , s = this.symbol
                  , a = "_touzi_chip_" + s
                  , e = this.selfDataUrl.replace("$symbol", s).replace("$rn", String((new Date).getDate()));
                this.proxyCfg.usrObj.ssl && (e = t.getSUrl(e)),
                t.load(e, function() {
                    var t = window[a];
                    r.urlData || (r.urlData = {
                        day: []
                    });
                    var i = r.df(t)
                      , s = r.urlData.day;
                    s.splice.apply(s, [0, 0].concat(i)),
                    s.sort(function(t, i) {
                        return t.date - i.date
                    }),
                    r.toReCalc = !0,
                    r.cb(r)
                })
            }
        }
        ,
        this.df = function(t) {
            var i = [];
            if (t) {
                var r = t;
                for (var s in r)
                    r.hasOwnProperty(s) && i.push({
                        value: r[s],
                        date: at.sd(s)
                    })
            }
            return i
        }
        ;
        var h = !0;
        this.UPDATE_THRESHOLD = 3,
        this.update = function() {
            if (h)
                h = !1;
            else {
                if (++this.updateCount < this.UPDATE_THRESHOLD)
                    return;
                this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0)
            }
            var i = this
              , r = this.symbol
              , s = "hq_str_" + e + r
              , a = this.selfDataUrlUpdate.replace("$symbol", r);
            this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
            t.load(a, function() {
                var t = window[s]
                  , r = i.udf(t);
                r && i.doUpdate(r)
            })
        }
        ,
        this.udf = function(t) {
            if (t) {
                var i, r = t.split(",");
                return r && r.length > 1 && (i = [{
                    date: at.sd(r[0]),
                    value: r[1]
                }]),
                i
            }
        }
        ,
        this.updateData = function(t, i, r) {
            if (t && i && !(i.length < 1)) {
                var s = i[i.length - 1];
                if (t = t[0])
                    if (at.stbd(t.date, s.date))
                        for (var a in t)
                            t.hasOwnProperty(a) && "undefined" != typeof s[a] && (s[a] = t[a]);
                    else
                        t.date > s.date && this.newData(i, t, r)
            }
        }
        ,
        this.setPricePos = function(t) {
            t && (this.labelMaxP = t[0],
            this.labelMinP = t[1],
            this.pricePosArr = t),
            this.createPlayingData()
        }
        ,
        this.initAndCalcAll = function(i) {
            if (this.oriArr = i,
            this.urlData && this.toReCalc) {
                this.toReCalc = !1,
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                for (var r, s = this.urlData.day, a = t.kUtil.adbd(s, i, !1, !1), e = 0, h = i.length; h > e; e++)
                    r = a[e],
                    this.selfArr.push({
                        value: Number(r.value)
                    })
            }
        }
        ,
        this.loadUrlData()
    }
    function u(i, s, a) {
        function e() {
            (d > i.DIMENSION.w_t || 0 > d) && (d = i.DIMENSION.w_t),
            h.titleO.canvas.style.display = "none",
            h.line.getCanvas().style.zIndex -= 2
        }
        var h = this;
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#007cc8",
            prop: "ditc",
            idct: "DITC"
        }],
        r.call(this, i, s),
        this.name = "DITC",
        this.cb = a;
        var o, l, n = "#c2c2c2", c = !0, f = "https://stock.sina.com.cn/stock/api/openapi.php/StockLevel2Service.getSummarize?symbol=$symbol&type=0&callback=$cb&dpc=1&retcode=0", d = i.DIMENSION.w_t / 2;
        this.loadUrlData = function(i) {
            if (i) {
                var r = h.symbol
                  , s = "_" + r + at.ddt(new Date).getFullYear();
                h.selfDataUrl = f,
                t.load(h.selfDataUrl.replace("$symbol", r).replace("$cb", "var%20" + s + "="), function() {
                    var t = window[s];
                    t && (h.urlData = h.oriArr = t.result.data,
                    h.toReCalc = !0,
                    c = !1,
                    h.cb(h))
                }, function() {})
            }
        }
        ,
        this.initAndCalcAll = function() {
            if (!c && (this.datas || (e(),
            this.datas = []),
            t.ca(this.selfArr),
            h.urlData)) {
                var i, r, s, a = 0, o = h.urlData.length;
                for (i = 0; o > i; i++)
                    a = Math.max(h.urlData[i].volume, a);
                for (i = 0; o > i; i++)
                    s = h.urlData[i],
                    r = s.volume * (d / a),
                    h.selfArr.push({
                        ditc: r,
                        trade: Number(s.trade)
                    })
            }
        }
        ,
        this.setRange = function() {
            if (!c && this.datas) {
                for (var t = h.selfArr.length; this.datas.length > t; )
                    this.datas.length--;
                for (; this.datas.length < t; )
                    this.datas.push({})
            }
        }
        ,
        this.setPricePos = function(t) {
            !t || this.separate > 0 ? (this.labelMinP = l || this.minPrice,
            this.labelMaxP = o || this.maxPrice) : (this.labelMaxP = o = t[0],
            this.labelMinP = l = t[1]),
            this.createPlayingData()
        }
        ,
        this.draw = function() {
            if (this.datas) {
                var t = this.line;
                t.clear(!0, i.PARAM.getHd());
                var r = this.viewState.start
                  , s = this.viewState.end;
                if (4 == r || 5 == s) {
                    var a, e = h.selfArr.length, o = i.DIMENSION.h_t / e, l = Math.min(.6 * o, 2);
                    for (t.newStyle(n, !0, l),
                    a = 0; e > a; a++) {
                        var c = h.selfArr[a]
                          , f = i.DIMENSION.h_t * (h.labelMaxP - c.trade) / (h.labelMaxP - h.labelMinP);
                        t.moveTo(0, f),
                        t.lineTo(c.ditc, f)
                    }
                    t.stroke()
                }
            }
        }
        ,
        h.loadUrlData(!0)
    }
    function v(i, s) {
        this.DEFAULT_ARR = [{
            v: 10,
            desc: "\u5feb\u7ebf\u79fb\u52a8\u5e73\u5747"
        }, {
            v: 50,
            color: "#777777",
            prop: "dif",
            idct: "DIF"
        }, {
            v: 10,
            color: "#FFAC03",
            prop: "difma",
            idct: "DIFMA"
        }],
        r.call(this, i, s),
        this.name = "DMA",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            glv: 0
        };
        var a = ut.calcMA
          , e = ut.operateArr
          , h = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = h(r, this.tkProp.close)
              , o = a(s, this.customArr[0].v)
              , l = a(s, this.customArr[1].v)
              , n = e(o, l, "-")
              , c = a(n, this.customArr[2].v);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var f = 0, d = r.length; d > f; f++)
                this.selfArr[f] = {
                    dif: n[f],
                    difma: c[f]
                },
                this.selfArr[f][ct] = r[f].volume < 0
        }
    }
    function p(i, s) {
        this.DEFAULT_ARR = [{
            v: 14,
            color: "#999999",
            prop: "pdi",
            idct: "PDI",
            desc: "DMI"
        }, {
            v: 6,
            color: "#ffac03",
            prop: "mdi",
            idct: "MDI",
            desc: "\u79fb\u52a8\u5e73\u5747"
        }, {
            color: "#cc22ba",
            prop: "adx",
            idct: "ADX"
        }, {
            color: "#2ec196",
            prop: "adxr",
            idct: "ADXR"
        }],
        r.call(this, i, s),
        this.name = "DMI";
        var a = ut.calcEMA
          , e = ut.calcMAX
          , h = ut.calcABS
          , o = ut.calcREF
          , l = ut.getArr
          , n = ut.operateArr;
        this.initAndCalcAll = function(i) {
            for (var r, s, c = this.customArr[0].v, f = this.customArr[1].v, d = l(i, "close"), u = l(i, "high"), v = l(i, "low"), p = a(e(e(n(u, v, "-"), h(n(u, o(d, 1), "-"))), h(n(v, o(d, 1), "-"))), c), A = n(u, o(u, 1), "-"), m = n(o(v, 1), v, "-"), g = [], y = [], b = 0, w = A.length; w > b; b++)
                r = A[b],
                s = m[b],
                g.push(r > 0 && r > s ? r : 0),
                y.push(s > 0 && s > r ? s : 0);
            g = a(g, c),
            y = a(y, c);
            var D = n(n(g, 100, "*"), p, "/")
              , _ = n(n(y, 100, "*"), p, "/")
              , M = a(n(n(h(n(_, D, "-")), n(_, D, "+"), "/"), 100, "*"), f)
              , O = a(M, f);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var T = 0, S = i.length; S > T; T++)
                this.selfArr[T] = {
                    pdi: D[T],
                    mdi: _[T],
                    adx: M[T],
                    adxr: O[T]
                }
        }
    }
    function A(i, s) {
        var a = "pct"
          , e = "oripct"
          , h = "mn";
        this.DEFAULT_ARR = [{
            color: "#fa6d6d",
            prop: a,
            idct: "\u7ea2\u7ebf\uff08\u591a\u7a7a\u4fe1\u53f7\u6536\u76ca\uff09"
        }, {
            color: "#2b55ff",
            prop: e,
            idct: "\u84dd\u7ebf\uff08\u80a1\u4ef7\u81ea\u7136\u6da8\u5e45\uff09"
        }, {
            v: 0 / 0,
            prop: h,
            idct: h,
            color: "#66ccff",
            hidecfg: !0
        }],
        r.call(this, i, s),
        this.name = "DPDK",
        this.alias = "\u5927\u76d8\u591a\u7a7a";
        var o = ut.getArr
          , l = ut.calcSUM
          , n = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = 48
              , s = o(i, "close")
              , a = o(i, "high")
              , e = o(i, "low")
              , c = o(i, "volume")
              , f = n(n(n(n(s, e, "+"), a, "+"), 3, "/"), c, "*")
              , d = n(l(f, r), l(c, r), "/")
              , u = function() {
                for (var t = [], i = 0, r = s.length; r > i; i++)
                    t.push(s[i] >= d[i] ? 1 : 0);
                return t
            }();
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var v = 0, p = i.length; p > v; v++)
                this.selfArr[v] = {
                    flag: u[v]
                },
                this.selfArr[v][h] = d[v]
        }
        ,
        this.setRange = function() {
            if (this.datas) {
                for (var t = this.viewState.start, i = this.viewState.end, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                for (var s = Number.MAX_VALUE, h = -Number.MAX_VALUE, o = 0, l = 0, n = this.selfArr[t].flag, c = ut.calcA, f = ut.getArr, d = 10, u = t; i > u; u++) {
                    var v = this.datas[u - t];
                    v.date = this.oriArr[u].date;
                    var p = this.selfArr[u].flag
                      , A = this.oriArr[u]
                      , m = c(f(this.oriArr.slice(0 > u - d + 1 ? 0 : u - d + 1, u + 1), "close"));
                    u != t ? p == n ? 1 == p && (o = (1 + A.percent) * (1 + o) - 1) : o = 0 == p ? A.open < m ? ((A.open - this.oriArr[u - 1].close) / this.oriArr[u - 1].close + 1) * (1 + o) - 1 : ((m - this.oriArr[u - 1].close) / this.oriArr[u - 1].close + 1) * (1 + o) - 1 : A.open > m ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1 : ((A.close - m) / m + 1) * (1 + o) - 1 : 1 == p && (o = A.open > m ? ((A.close - A.open) / A.open + 1) * (1 + o) - 1 : ((m - A.open) / A.open + 1) * (1 + o) - 1),
                    n = p,
                    u != t && (l = (1 + A.percent) * (1 + l) - 1),
                    v[a] = 100 * o,
                    v[e] = 100 * l;
                    for (var g in this.selfArr[u])
                        if (this.selfArr[u].hasOwnProperty(g)) {
                            if (v[g] = this.selfArr[u][g],
                            "flag" == g)
                                continue;v[g] > h && (h = v[g]),
                            v[g] < s && (s = v[g])
                        }
                }
                this.minPrice = s,
                this.maxPrice = h,
                this.syncI()
            }
        }
        ,
        this.draw = function(r, s) {
            if (this.__iOffsetX = isNaN(s) ? this.__iOffsetX : s,
            this.datas) {
                var a = i.DIMENSION.w_k / Math.max(this.datas.length, i.PARAM.minCandleNum)
                  , e = this.line;
                e.clear(!0, i.PARAM.getHd());
                for (var h, o, l, n, c, f = this.viewState.start, d = this.viewState.end, u = t.hex2dec(this.customArr[0].color), v = t.hex2dec(this.customArr[1].color), p = 0; 2 > p; p++) {
                    for (o = this.datas[0].flag ? 0 : 1,
                    e.newStyle([p ? u : v], !0, a / 2 > 3 ? 3 : a / 2),
                    l = f; d > l; l++)
                        h = this.datas[l - f].flag,
                        h == p && e[h == o ? "lineTo" : "moveTo"](this.oriArr[l].ix, this.datas[l - f].mny),
                        o = h;
                    for (e.stroke(),
                    o = this.datas[0].flag ? 0 : 1,
                    e.newStyle([p ? u : v], !0, 1),
                    l = f; d > l; l++)
                        if (c = this.oriArr[l],
                        h = this.datas[l - f].flag,
                        h == p) {
                            n = ~~(c.ix + .5),
                            n -= .5;
                            var A = (c.hy - c.ly) / 2;
                            e.moveTo(n, this.datas[l - f].mny + A),
                            e.lineTo(n, this.datas[l - f].mny - A)
                        }
                    e.stroke(),
                    o = this.datas[0].flag ? 0 : 1;
                    var m = p ? u : v;
                    for (m = m.match(/\d+/g),
                    m.push(.4),
                    m = "rgba(" + m + ")",
                    e.newFillStyle([m], !0, 1),
                    l = f; d > l; l++) {
                        c = this.oriArr[l],
                        h = this.datas[l - f].flag;
                        var g = c.ix;
                        n = ~~(c.ix + .5),
                        n -= .5;
                        var y = (c.hy - c.ly) / 2;
                        if (h == p && l != d - 1)
                            h != o ? (e.beginPath(),
                            e.moveTo(g, this.datas[l - f].mny + y)) : e.lineTo(g, this.datas[l - f].mny + y);
                        else if (l != f && h != o && l != d - 1 || l == d - 1 && (h == o && h == p || h != o && h != p)) {
                            var b;
                            for (l == d - 1 && h == o ? (b = l,
                            e.lineTo(g, this.datas[l - f].mny + y)) : b = l - 1; b >= f; ) {
                                var w = this.datas[b - f].flag;
                                if (w != p)
                                    break;
                                var D = this.oriArr[b]
                                  , _ = D.ix
                                  , M = (D.hy - D.ly) / 2;
                                e.lineTo(_, this.datas[b - f].mny - M),
                                b--
                            }
                            e.closePath(),
                            e.fill()
                        }
                        o = h
                    }
                }
                r && e.drawBg(this.__iOffsetX)
            }
        }
    }
    function m(t, i, r) {
        A.call(this, t, i),
        this.name = "DPDKS",
        this.alias = "\u5927\u76d8\u591a\u7a7a",
        this.cb = r;
        var s = "mn";
        this.drawCalc = function() {
            if (this.datas) {
                this.setRange();
                var t, i, r, a, e = this.datas.length, h = Number.MAX_VALUE, o = -Number.MAX_VALUE;
                for (i = 0; e > i; i++)
                    for (t = this.datas[i],
                    r = this.customArr.length; r--; )
                        a = this.customArr[r].prop,
                        a && a != s && (t[a] > o && (o = t[a]),
                        t[a] < h && (h = t[a]));
                this.labelMaxP = this.maxPrice = o,
                this.labelMinP = this.minPrice = h;
                var l = o - h;
                for (i = 0; e > i; i++)
                    for (t = this.datas[i],
                    r = this.customArr.length; r--; )
                        a = this.customArr[r].prop,
                        a && a != s && (t[a + "y"] = this.h * (o - t[a]) / l)
            }
        }
        ,
        this.draw = function(t, i) {
            if (this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i,
            this.datas) {
                this.line.clear(!0, this.cfg.PARAM.getHd());
                var r = this.h * this.maxPrice / (this.maxPrice - this.minPrice) - .5;
                this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
                this.line.moveTo(0, r),
                this.line.lineTo(this.cfg.DIMENSION.w_k, r),
                this.line.stroke();
                for (var s, a = this.datas.length, e = this.cfg.DIMENSION.w_k / Math.max(a, this.cfg.PARAM.minCandleNum), h = this.customArr.length; h--; ) {
                    var o = this.customArr[h].prop + "y";
                    s = this.__iOffsetX - e * ft,
                    this.line.newStyle(this.customArr[h].color, !0, 1.5);
                    for (var l, n = 0; a > n && (l = this.datas[n][o],
                    !isNaN(l)); n++)
                        0 == n ? this.line.moveTo(s, l) : this.line.lineTo(s, l),
                        s += e;
                    this.line.stroke()
                }
                t && this.line.drawBg(this.__iOffsetX)
            }
        }
    }
    function g(i, s) {
        this.DEFAULT_ARR = [{
            v: 14,
            color: "#D96FF0",
            prop: "emv",
            idct: "EMV"
        }, {
            v: 9,
            color: "#F76D6D",
            prop: "maemv",
            idct: "MAEMV"
        }],
        r.call(this, i, s),
        this.name = "EMV",
        this.vaObj = {
            glv: 0
        };
        var a = ut.calcMA
          , e = ut.calcREF
          , h = ut.getArr
          , o = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , l = r[1].v
              , n = h(i, "high")
              , c = h(i, "low")
              , f = h(i, "volume")
              , d = o(a(f, s), f, "/")
              , u = o(n, c, "+")
              , v = o(n, c, "-")
              , p = o(o(o(u, e(u, 1), "-"), u, "/"), 100, "*")
              , A = a(o(o(o(p, d, "*"), v, "*"), a(v, s), "/"), s)
              , m = a(A, l);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var g = 0, y = i.length; y > g; g++)
                this.selfArr[g] = {
                    emv: A[g],
                    maemv: m[g]
                }
        }
    }
    function y(i, s, a) {
        var e = "ewi";
        this.DEFAULT_ARR = [{
            color: "#F6C257",
            prop: e,
            idct: "\u7b49\u6743\u91cd"
        }],
        r.call(this, i, s);
        var h = "icn_calc_"
          , o = this;
        this.name = "EWI",
        this.sname = "T_EWI",
        this.alias = "\u7b49\u6743\u91cd",
        this.selfDataUrl = "http://finance.sina.com.cn/finance/touzieql/$symbol.js?" + Math.random(),
        this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + h + "$symbol",
        this.cb = a,
        this.df = function(t) {
            var i = [];
            if (t)
                for (var r in t)
                    t.hasOwnProperty(r) && i.push({
                        ewi: Number(t[r]),
                        time: r
                    });
            return i
        }
        ;
        var l, n = !1;
        this.loadUrlData = function() {
            var i = this.aliasymbol || this.symbol
              , r = "_touziequallyweight_" + i
              , a = this.selfDataUrl.replace("$symbol", i).replace("$cb", "var%20" + r + "=").replace("$rn", String((new Date).getDate()));
            this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
            n || (l = t.tUtil.gata(s.usrObj.market),
            t.load(a, function() {
                var t = window[r];
                window[r] = null ,
                o.urlData = {
                    time: []
                };
                var i = o.df(t)
                  , s = o.urlData.time;
                s.splice.apply(s, [0, 0].concat(i)),
                n = !0,
                o.update()
            }))
        }
        ,
        this.udf = function(t) {
            if (t) {
                var i, r = t.split(",");
                return r && r.length > 1 && (i = [{
                    time: r[6].substring(0, 5),
                    ewi: r[2]
                }]),
                i
            }
        }
        ,
        this.update = function() {
            var i = this.symbol
              , r = "hq_str_" + h + i
              , s = this.selfDataUrlUpdate.replace("$symbol", i);
            this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
            t.load(s, function() {
                var t = window[r];
                window[r] = null ;
                var i = o.udf(t);
                i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time)
            })
        }
        ,
        this.updateData = function(i, r) {
            if (i && r && !(r.length < 1)) {
                var a = r[r.length - 1];
                if (i = i[0]) {
                    if (a.time <= i.time)
                        for (var e = t.arrIndexOf(l, i.time), h = t.arrIndexOf(l, a.time), n = h; e >= n; n++)
                            e - n > 0 ? r[r.length] = r[r.length - 1] : r[r.length - 1] = i;
                    o.cb(o),
                    4 == o.viewState.start && 5 == o.viewState.end && s.cbInDC()
                }
            }
        }
        ,
        this.setPricePos = function(t) {
            t && (o.labelMaxP = t[0],
            o.labelMinP = t[1],
            o.pricePosArr = t),
            this.createPlayingData()
        }
        ,
        this.initAndCalcAll = function(i) {
            if (this.urlData) {
                this.oriArr = this.gdsd(i),
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                var r, a = this.urlData.time, e = s.stock.realLen;
                0 > e && (e = o.disMod);
                var h = 0;
                for (r = 0; r <= o.disMod && !(r > e); r++)
                    a[r] ? (i[4][r].ewi = a[r].ewi,
                    h = r) : i[4][r].ewi = a[h].ewi;
                for (var l, n = 0, c = this.oriArr.length; c > n; n++)
                    l = this.oriArr[n],
                    this.selfArr.push({
                        ewi: l ? Number(l.ewi) : 1
                    })
            }
        }
        ,
        this.loadUrlData()
    }
    function b(i, s) {
        this.storageVer = "v2",
        r.call(this, i, s);
        var a = this;
        this.name = "EXPMA",
        "k" != s.type && (this.sname = "T_" + this.name);
        var e = ["#2d0674", "#84a8de", "#e80f01", "#f1926f", "#2c0eed"]
          , h = "EMA"
          , o = "ema";
        this.generateSettings = function() {
            if (a.param && a.param.length > 0) {
                a.customArr = [];
                for (var i = 0, r = a.param.length; r > i; i++) {
                    var s = a.param[i].v;
                    !isNaN(s) && s > 0 && a.customArr.push({
                        v: s,
                        color: a.param[i].color || e[i] || "#" + t.randomColor(),
                        prop: o + s,
                        idct: h + s,
                        desc: h
                    })
                }
            }
            (!a.customArr || a.customArr.length < 1) && (a.customArr = [{
                v: 12,
                color: e[0],
                prop: o + "12",
                idct: h + "12",
                desc: h
            }, {
                v: 50,
                color: e[1],
                prop: o + "50",
                idct: h + "50",
                desc: h
            }])
        }
        ;
        var l = ut.getArr
          , n = ut.calcEMA;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var s = l(r, this.tkProp.close), a = [], e = 0, h = this.customArr.length; h > e; e++)
                a.push(n(s, this.customArr[e].v));
            for (var c = r.length, f = 0, d = a.length; d > f; f++)
                for (var u = this.customArr[f].v, v = 0; c > v; v++) {
                    var p = this.selfArr[v] = this.selfArr[v] || {};
                    r[v].volume < 0 ? p[ct] = !0 : p[o + u] = a[f][v]
                }
        }
    }
    function w(i, s, a) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#990000",
            prop: "mb",
            idct: "\u51c0\u8d85\u5927\u5355"
        }, {
            v: 0 / 0,
            color: "#009900",
            prop: "ms",
            idct: "\u51c0\u5927\u5355"
        }, {
            v: 0 / 0,
            color: "#000099",
            prop: "sb",
            idct: "\u51c0\u4e2d\u5355"
        }, {
            v: 0 / 0,
            color: "#ff0099",
            prop: "ss",
            idct: "\u51c0\u5c0f\u5355"
        }],
        r.call(this, i, s),
        this.name = "TECHFLOW",
        this.separate = 1,
        this.selfDataUrl = "http://stock.finance.sina.com.cn/stock/api/jsonp_v2.php/$cb/StockMixService.getNewRateInfo?symbol=$symbol&___qn=3&from=$from&to=$to",
        this.selfDataUrlUpdate = "http://hq.sinajs.cn/list=$symbol",
        this.cb = a,
        this.toReCalc = !0,
        this.initAndCalcAll = function(i, r) {
            if (!r && (this.oriArr = i,
            this.urlData)) {
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                var s;
                switch (this.viewState.viewId) {
                case 24:
                    s = this.urlData.day;
                    break;
                case 168:
                    s = this.urlData.week;
                    break;
                case 720:
                    s = this.urlData.month
                }
                for (var a, e = t.kUtil.adbd(s, i, !1, !0), h = 0, o = i.length; o > h; h++)
                    a = e[h],
                    this.selfArr.push({
                        mb: a ? Number(a.mb) : 0 / 0,
                        ms: a ? Number(a.ms) : 0 / 0,
                        sb: a ? Number(a.sb) : 0 / 0,
                        ss: a ? Number(a.ss) : 0 / 0
                    })
            }
        }
        ,
        this.setRange = function() {
            if (this.datas) {
                for (var t = this.viewState.start, i = this.viewState.end, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                for (var s = Number.MAX_VALUE, a = -Number.MAX_VALUE, e = t; i > e; e++) {
                    var h = this.datas[e - t];
                    h.date = this.oriArr[e].date;
                    var o = 0
                      , l = 0;
                    for (var n in this.selfArr[e])
                        this.selfArr[e].hasOwnProperty(n) && (h[n] = this.selfArr[e][n],
                        h[n] > 0 ? o += h[n] : l += h[n]);
                    a = Math.max(o, l, a),
                    s = Math.min(o, l, s)
                }
                a = Math.max(Math.abs(a), Math.abs(s)),
                s = -a,
                this.minPrice = s,
                this.maxPrice = a
            }
        }
        ,
        this.draw = function(t, r) {
            if (this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r,
            this.datas) {
                var s = this.line;
                s.clear(!0, i.PARAM.getHd());
                for (var a, e, h, o, l = this.datas.length, n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum), c = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h, f = [], d = [], u = this.customArr.length; u--; ) {
                    var v = this.customArr[u].prop + "y";
                    o = this.__iOffsetX - n * dt,
                    s.newStyle(this.customArr[u].color, !0, o);
                    for (var p = 0; l > p; p++)
                        h = this.datas[p][v],
                        a = h > c ? d[p] || 0 : f[p] || 0,
                        e = c - a,
                        h -= a,
                        s.moveTo(o, e),
                        s.lineTo(o, h),
                        h > c ? (f[p] = f[p] || 0,
                        d[p] = c - h) : (f[p] = c - h,
                        d[p] = d[p] || 0),
                        o += n;
                    s.stroke()
                }
            }
        }
        ,
        this.udf = function(t) {
            if (!t)
                return null ;
            var i = t.split(",");
            return {
                mb: Number(i[0]),
                ms: Number(i[1]),
                sb: Number(i[2]),
                ss: Number(i[3]),
                date: at.sd(i[4])
            }
        }
        ,
        this.df = function(t) {
            for (var i = [], r = 0, s = t.length; s > r; r++) {
                var a = at.sd(t[r].d)
                  , e = a.getDate();
                i.push({
                    mb: e,
                    sb: e,
                    ms: e,
                    ss: e,
                    date: a
                })
            }
            return i
        }
        ,
        this.loadUrlData()
    }
    function D(i, s) {
        this.DEFAULT_ARR = [{
            v: 9,
            color: "#888888",
            prop: "k",
            idct: "K"
        }, {
            v: 3,
            color: "#FFAC03",
            prop: "d",
            idct: "D"
        }, {
            v: 3,
            color: "#cc22ba",
            prop: "j",
            idct: "J"
        }],
        r.call(this, i, s),
        this.name = "KDJ",
        this.vaObj = {
            glv: 50,
            upper: 80,
            lower: 20
        };
        var a = ut.calcSMA
          , e = ut.calcLLV
          , h = ut.calcHHV
          , o = ut.operateArr
          , l = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , n = r[1].v
              , c = r[2].v
              , f = l(i, "close")
              , d = l(i, "low")
              , u = l(i, "high")
              , v = o(o(o(f, e(d, s), "-"), o(h(u, s), e(d, s), "-"), "/"), 100, "*")
              , p = a(v, n, 1)
              , A = a(p, c, 1)
              , m = o(o(p, 3, "*"), o(A, 2, "*"), "-");
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var g = 0, y = i.length; y > g; g++)
                this.selfArr[g] = {
                    k: p[g],
                    d: A[g],
                    j: m[g]
                }
        }
    }
    function _(i, s, a) {
        var e = "bar";
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#888887",
            prop: e,
            idct: "\u5927\u5355\u91d1\u989d",
            desc: "\u6587\u5b57\u989c\u8272"
        }],
        r.call(this, i, s, {
            nu: !0
        }),
        this.name = "KFLOW",
        this.alias = "\u4e3b\u529b\u52a8\u5411",
        "sh000001" === this.symbol && (this.aliasymbol = "sh999999"),
        this.vaObj = {
            glv: 0
        },
        this.UPDATE_THRESHOLD = 5,
        this.selfDataUrl = "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getHistoryMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to",
        this.selfDataUrlUpdate = "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getLastMoneyFlow?callback=$cb&symbol=$symbol",
        this.cb = a,
        this.toReCalc = !0,
        this.loadedFlag = {},
        this.df = function(t) {
            if (t && t.result && t.result.data) {
                for (var i, r, s = [], a = t.result.data, h = 0, o = a.length; o > h; h++) {
                    i = a[h],
                    r = i.split(",");
                    var l = {
                        date: at.sd(r[0])
                    };
                    l[e] = Number(r[1]),
                    s.push(l)
                }
                return s
            }
        }
        ;
        var h;
        this.udf = function(t) {
            if (t && t.result && t.result.data) {
                var i = t.result.data;
                if (i && !(i.length < 9)) {
                    i = i.split(",");
                    var r = Number(i[1])
                      , s = {
                        date: at.sd(i[0])
                    };
                    return s[e] = r,
                    h ? s[e + "update"] = r - h[e] || 0 : (h = {},
                    s[e + "update"] = 0),
                    h[e] = r,
                    s
                }
            }
        }
        ;
        var o;
        this.initAndCalcAll = function(i) {
            if (this.oriArr = i,
            this.urlData) {
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                var r;
                switch (this.viewState.viewId) {
                case 364:
                case 365:
                case 366:
                case 23:
                case 24:
                case 25:
                    r = this.urlData.day;
                    break;
                case 167:
                case 168:
                case 169:
                    r = this.urlData.week;
                    break;
                case 719:
                case 720:
                case 721:
                    r = this.urlData.month;
                    break;
                default:
                    r = [{
                        bar: 0,
                        date: i[i.length - 1].date
                    }]
                }
                o = t.kUtil.adbd(r, i, !1, !0);
                for (var s, a = 0, h = i.length; h > a; a++) {
                    s = o[a];
                    var l = {};
                    l[e] = s ? Number(s[e]) : 0 / 0,
                    this.selfArr.push(l)
                }
            }
        }
        ,
        this.drawCalc = function() {
            if (this.datas) {
                for (var t = this.viewState.start, i = this.viewState.end, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                var s, a, e = Number.MAX_VALUE, h = -Number.MAX_VALUE;
                for (s = t; i > s; s++) {
                    a = this.datas[s - t],
                    a.date = this.oriArr[s].date;
                    for (var o in this.selfArr[s])
                        this.selfArr[s].hasOwnProperty(o) && (a[o] = this.selfArr[s][o],
                        a[o] > h && (h = a[o]),
                        a[o] < e && (e = a[o]))
                }
                e == h ? e = h = 0 : (h = Math.max(Math.abs(h), Math.abs(e)),
                e = -h),
                this.vaObj.min = e,
                this.vaObj.max = h,
                this.labelMaxP = h,
                this.labelMinP = e;
                var l = h - e;
                for (s = 0; r > s; s++) {
                    a = this.datas[s];
                    for (var n = this.customArr.length; n--; ) {
                        var c = this.customArr[n].prop;
                        a[c + "y"] = 0 == l ? this.h >> 1 : this.h * (h - a[c]) / l
                    }
                }
                this.syncI()
            }
        }
        ,
        this.draw = function(t, r) {
            if (this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r,
            this.datas) {
                var s = this.line;
                s.clear(!0, i.PARAM.getHd());
                for (var a, e, h, o, l, n = this.datas.length, c = i.DIMENSION.w_k / Math.max(n, i.PARAM.minCandleNum), f = "hollow" == i.datas.candle, d = .6 * c, u = .5 * this.h, v = 0; 2 > v; v++) {
                    for (l = 0 == v ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                    e = this.__iOffsetX - c,
                    s.beginPath(),
                    a = 0; n > a; a++)
                        o = this.datas[a],
                        h = o.bary,
                        0 == v ? h > u && s.drawVStickRect(e, h, d, u - h, i.COLOR.K_FALL, !0) : u >= h && s.drawVStickRect(e, h, d, u - h, i.COLOR.K_RISE, !f),
                        e += c;
                    s.stroke()
                }
                s.drawBg(this.__iOffsetX),
                this.vaObj && this.drawValueRange()
            }
        }
        ,
        this.loadUrlData()
    }
    function M(i, s) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#007cc8",
            prop: "lb",
            idct: "LB",
            desc: "\u91cf\u6bd4"
        }],
        r.call(this, i, s),
        this.name = "LB",
        this.sname = "T_LB",
        this.alias = "\u91cf\u6bd4",
        this.initAndCalcAll = function(i) {
            this.oriArr = this.gdsd(i),
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var r, s, a = 0, e = i.length, h = 0; e > a; a++) {
                s = 5e4,
                r = 0,
                !isNaN(i[a][0].lastfive) && i[a][0].lastfive > 0 && (s = i[a][0].lastfive);
                for (var o = 0, l = 0; o < this.disMod; o++) {
                    var n = Number(i[a][o].volume) < 0 ? 0 : Number(i[a][o].volume);
                    r += Number(i[a][o].volume),
                    0 >= n ? (h = 0 == o ? 0 : this.selfArr[this.selfArr.length - 1].lb,
                    l++) : h = r / s / (o - l + 1),
                    0 > h && (h = 0),
                    this.selfArr.push({
                        ignore_price: i[a][o].price,
                        lb: h
                    })
                }
            }
        }
        ,
        this.draw = function(t) {
            if (this.datas) {
                this.line.clear(!0, this.cfg.PARAM.getHd());
                for (var i, r = this.datas.length, s = this.cfg.DIMENSION.w_t / r, a = this.customArr.length; a--; ) {
                    var e = this.customArr[a].prop + "y";
                    i = s * dt,
                    this.line.newStyle(this.customArr[a].color, !0, 1.3);
                    for (var h = 0; r > h && !(this.datas[h].ignore_price < 0); h++)
                        0 == h || h % this.disMod == 0 ? this.line.moveTo(i, this.datas[h][e]) : this.line.lineTo(i, this.datas[h][e]),
                        i += s;
                    this.line.stroke()
                }
                t && this.line.drawBg()
            }
        }
    }
    function O(i, s) {
        r.call(this, i, s);
        var a = this;
        this.name = "MA",
        "k" != s.type && (this.sname = "T_" + this.name);
        var e = ["#FC9CB8", "#12BDD9", "#EE2F72", "#8CBB0D", "#0DC168", "#978d52"]
          , h = "MA"
          , o = "ma";
        this.generateSettings = function() {
            if (a.param && a.param.length > 0) {
                a.customArr = [];
                for (var i = 0, r = a.param.length; r > i; i++) {
                    var s = a.param[i].v;
                    !isNaN(s) && s > 0 && a.customArr.push({
                        v: s,
                        color: a.param[i].color || e[i] || "#" + t.randomColor(),
                        prop: o + s,
                        idct: h + s,
                        desc: h
                    })
                }
            }
            (!a.customArr || a.customArr.length < 1) && (a.customArr = [{
                v: 5,
                color: e[0],
                prop: o + "5",
                idct: h + "5",
                desc: h
            }, {
                v: 10,
                color: e[1],
                prop: o + "10",
                idct: h + "10",
                desc: h
            }, {
                v: 20,
                color: e[2],
                prop: o + "20",
                idct: h + "20",
                desc: h
            }, {
                v: 30,
                color: e[3],
                prop: o + "30",
                idct: h + "30",
                desc: h
            }])
        }
        ,
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var s = this.tkProp.close, a = r.length, e = 0, h = this.customArr.length; h > e; e++)
                for (var l, n = 0, c = this.customArr[e].v, f = 0; a > f; f++) {
                    var d = r[f];
                    if (n += Number(d[s]),
                    f >= c - 1) {
                        l = n / c;
                        var u = r[f - c + 1];
                        n -= Number(u[s])
                    } else
                        l = n / (f + 1);
                    var v = this.selfArr[f] = this.selfArr[f] || {};
                    r[f].volume < 0 ? v[ct] = !0 : v[o + c] = l
                }
        }
    }
    function T(i, s) {
        this.DEFAULT_ARR = [{
            v: 12,
            color: "#00c1eb",
            prop: "dif",
            idct: "DIF"
        }, {
            v: 26,
            color: "#cc22ba",
            prop: "dea",
            idct: "DEA"
        }, {
            v: 9,
            color: "#c00000",
            prop: "bar",
            idct: "MACD"
        }],
        r.call(this, i, s),
        this.name = "MACD",
        "k" != s.type && (this.sname = "T_" + this.name);
        var a = "#b82c0c"
          , e = "#2ec196"
          , h = ut.calcEMA
          , o = ut.operateArr
          , l = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , a = this.customArr[1].v
              , e = this.customArr[2].v
              , n = l(r, this.tkProp.close)
              , c = o(h(n, s), h(n, a), "-")
              , f = h(c, e)
              , d = o(o(c, f, "-"), 2, "*");
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var u = 0, v = r.length; v > u; u++)
                this.selfArr[u] = {
                    dif: c[u],
                    dea: f[u],
                    bar: d[u]
                },
                this.selfArr[u][ct] = r[u].volume < 0
        }
        ,
        this.draw = function(t, r) {
            if (this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r,
            this.datas) {
                var h = this.line;
                h.clear(!0, i.PARAM.getHd());
                var o, l;
                "k" == s.type ? (o = i.DIMENSION.w_k,
                l = i.PARAM.minCandleNum) : (o = i.DIMENSION.w_t,
                l = 1);
                for (var n, c, f = this.datas.length, d = o / Math.max(f, l), u = "k" == s.type ? this.__iOffsetX - d * ft : d * dt, v = 0; 2 > v; v++) {
                    var p = this.customArr[v].prop + "y";
                    for (c = u,
                    this.line.newStyle(this.customArr[v].color, !0, 1.3),
                    n = 0; f > n; n++)
                        0 == n ? this.line.moveTo(c, this.datas[n][p]) : this.line.lineTo(c, this.datas[n][p]),
                        c += d;
                    this.line.stroke()
                }
                var A, m = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h;
                c = u;
                var g, y = 1;
                for (h.newStyle(a, !0, y),
                n = 0; f > n; n++)
                    A = this.datas[n].bary,
                    m >= A && (g = ~~(c + .5),
                    g -= .5,
                    h.moveTo(g, m),
                    h.lineTo(g, A)),
                    c += d;
                for (h.stroke(),
                c = u,
                h.newStyle(e, !0, y),
                n = 0; f > n; n++)
                    A = this.datas[n].bary,
                    A > m && (g = ~~(c + .5),
                    g -= .5,
                    h.moveTo(g, m),
                    h.lineTo(g, A)),
                    c += d;
                h.stroke();
                var b = this.h / 2 - .5;
                h.newStyle(this.cfg.COLOR.GRID, !0, 1),
                h.moveTo(0, b),
                h.lineTo(this.cfg.DIMENSION.w_k, b),
                h.stroke(),
                h.drawBg(this.__iOffsetX)
            }
        }
    }
    function S(i, s) {
        this.DEFAULT_ARR = [{
            v: 30,
            color: "#99cf17",
            prop: "obv",
            idct: "OBV"
        }, {
            v: 0 / 0,
            color: "#00c1eb",
            prop: "obvma",
            idct: "OBVMA"
        }];
        var a = {
            nu: !0
        };
        r.call(this, i, s, a),
        this.name = "OBV",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.initAndCalcAll = function(i) {
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            var r, s, a, e = this.customArr[0].v, h = i[0];
            a = isNaN(h.prevclose) || h.close > h.prevclose ? h.volume : -h.volume,
            r = h.close == h.prevclose ? 0 : a,
            s = r,
            this.selfArr.push({
                obv: r,
                obvma: r
            });
            for (var o = 1, l = i.length; l > o; o++) {
                h = i[o];
                var n = {};
                this.selfArr.push(n),
                a = h.close > i[o - 1].close ? Number(h.volume) : h.close == i[o - 1].close ? 0 : -Number(h.volume),
                r = a + this.selfArr[o - 1].obv,
                n.obv = r,
                s += r,
                o >= e ? (s -= this.selfArr[o - e].obv,
                n.obvma = s / e) : n.obvma = s / (o + 1)
            }
        }
    }
    function I(t, i, r) {
        _.call(this, t, i, {
            nu: !0
        }),
        this.selfDataUrl = "https://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getAllMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to",
        this.selfDataUrlUpdate = "http://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getLastMoneyFlow?callback=$cb&symbol=$symbol",
        this.cb = r,
        this.loadUrlData()
    }
    function C(i, s) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#12BDD9",
            prop: "iy",
            idct: "Position"
        }],
        r.call(this, i, s, {
            nu: !0
        }),
        this.name = "POSITION",
        this.sname = "T_POSITION",
        this.alias = "\u6301\u4ed3\u91cf",
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i);
            this.oriArr = r,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var s = 0, a = r.length; a > s; s++)
                this.selfArr.push({
                    iy: r[s].inventory
                })
        }
    }
    function N(t, i, s) {
        this.DEFAULT_ARR = [{
            v: 0 / 0,
            color: "#ff0099",
            prop: "ss",
            idct: "\u51c0\u5c0f\u5355"
        }],
        r.call(this, t, i);
        var a = this;
        this.name = "Press",
        this.separate = 1,
        this.cb = s,
        this.initAndCalcAll = function(t, i) {
            i || (this.oriArr = t,
            this.urlData && !this.datas && (this.datas = []))
        }
        ,
        this.setRange = function() {
            if (l && this.datas) {
                for (; this.datas.length > 3; )
                    this.datas.length--;
                for (; this.datas.length < 3; )
                    this.datas.push({});
                var t, i, r = this.oriArr[this.oriArr.length - 1].close;
                for (t = l.length; t-- && (i = l[t],
                !(i.p >= r)); )
                    ;
                i.p == r ? (console.log(l[t - 1].p, l[t - 1].v),
                console.log(r, i.v),
                console.log(l[t + 1].p, l[t + 1].v)) : (console.log(l[t].p, l[t].v),
                console.log(r, i.v),
                console.log(l[t + 1].p, l[t + 1].v)),
                console.log("-----------------------");
                for (var s = 0; 3 > s; s++)
                    this.datas[s].v = l[t - s - 1].v,
                    this.datas[s].p = l[t - s - 1].p;
                console.log(this.datas)
            }
        }
        ,
        this.draw = function() {
            if (this.datas) {
                var i = this.line;
                i.clear(!0, t.PARAM.getHd());
                for (var r, s, a, e, h = this.datas.length, o = t.DIMENSION.w_k / Math.max(h, t.PARAM.minCandleNum), l = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h, n = [], c = [], f = this.customArr.length; f--; ) {
                    var d = this.customArr[f].prop + "y";
                    e = o * dt,
                    i.newStyle(this.customArr[f].color, !0, e);
                    for (var u = 0; h > u; u++)
                        a = this.datas[u][d],
                        r = a > l ? c[u] || 0 : n[u] || 0,
                        s = l - r,
                        a -= r,
                        i.moveTo(e, s),
                        i.lineTo(e, a),
                        a > l ? (n[u] = n[u] || 0,
                        c[u] = l - a) : (n[u] = l - a,
                        c[u] = c[u] || 0),
                        e += o;
                    i.stroke()
                }
            }
        }
        ;
        var e, h = "ff.sinajs.cn", o = {
            ssl: !0,
            authtype: "A_hq"
        }, l = [], n = function(t) {
            var i, r, s = t["2cn_" + a.symbol].split(","), e = 65;
            for (i = 0; 10 > i; i++)
                r = l[i] || {},
                l[i] = r,
                r.v = s[e - i],
                r.p = s[e - i - 10];
            for (e = 26,
            i = 10; 20 > i; i++)
                r = l[i] || {},
                l[i] = r,
                r.v = s[e + i],
                r.p = s[e + i - 10]
        }
        ;
        this.loadUrlData = function() {
            if (IO.WebPush4 && this.symbol && !e) {
                var t = ["2cn", this.symbol].join("_");
                e = new IO.WebPush4(h,t,n,o)
            }
        }
        ,
        this.loadUrlData()
    }
    function R(i, s) {
        this.DEFAULT_ARR = [{
            v: 12,
            color: "#EE2F72",
            prop: "psy",
            idct: "PSY"
        }, {
            v: 6,
            color: "#00c1eb",
            prop: "psyma",
            idct: "PSYMA"
        }],
        r.call(this, i, s),
        this.name = "PSY",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            min: 0,
            max: 100,
            upper: 75,
            lower: 25
        },
        this.initAndCalcAll = function(i) {
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            var r = this.customArr[0].v
              , s = this.customArr[1].v
              , a = i[0]
              , e = isNaN(a.prevclose) || a.prevclose < a.close ? 1 : 0
              , h = e
              , o = e / r * 100
              , l = o;
            this.selfArr.push({
                psy: o,
                psyma: o
            });
            for (var n = [e], c = 1, f = i.length; f > c; c++) {
                a = i[c];
                var d = {};
                this.selfArr.push(d),
                e = a.close > i[c - 1].close ? 1 : 0,
                n.push(e),
                h += e,
                c >= r && (h -= n[c - r]),
                o = h / r * 100,
                d.psy = o,
                l += o,
                c >= s ? (l -= this.selfArr[c - s].psy,
                d.psyma = l / s) : d.psyma = l / (c + 1)
            }
        }
    }
    function x(i, s, a) {
        var e = "rgl";
        this.DEFAULT_ARR = [{
            color: "#2D0674",
            prop: e,
            idct: "\u7ea2\u7eff\u89d2\u7ebf"
        }],
        r.call(this, i, s),
        this.name = "RGL",
        this.sname = "T_RGL",
        this.alias = "\u7ea2\u7eff\u89d2\u7ebf",
        this.separate = 1;
        var h = "icn_calc_"
          , o = this;
        this.selfDataUrl = "http://finance.sina.com.cn/finance/touziline/$symbol.js?" + Math.random(),
        this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + h + "$symbol",
        this.cb = a,
        this.df = function(t) {
            var i = [];
            if (t)
                for (var r in t)
                    t.hasOwnProperty(r) && i.push({
                        rgl: Number(t[r]),
                        time: r
                    });
            return i
        }
        ;
        var l, n = !1;
        this.loadUrlData = function() {
            var i = this.aliasymbol || this.symbol
              , r = "_touziredgreenline_" + i
              , a = this.selfDataUrl.replace("$symbol", i).replace("$cb", "var%20" + r + "=").replace("$rn", String((new Date).getDate()));
            this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
            n || (l = t.tUtil.gata(s.usrObj.market),
            t.load(a, function() {
                var t = window[r];
                o.urlData = {
                    time: []
                };
                var i = o.df(t)
                  , s = o.urlData.time;
                s.splice.apply(s, [0, 0].concat(i)),
                n = !0,
                o.update()
            }))
        }
        ,
        this.udf = function(t) {
            if (t) {
                var i, r = t.split(",");
                return r && r.length > 1 && (i = [{
                    time: r[6].substring(0, 5),
                    rgl: r[3] - r[4]
                }]),
                i
            }
        }
        ,
        this.update = function() {
            var i = this.symbol
              , r = "hq_str_" + h + i
              , s = this.selfDataUrlUpdate.replace("$symbol", i);
            this.proxyCfg.usrObj.ssl && (s = t.getSUrl(s)),
            t.load(s, function() {
                var t = window[r];
                window[r] = null ;
                var i = o.udf(t);
                i && o.urlData && o.urlData.time && o.updateData(i, o.urlData.time)
            })
        }
        ,
        this.updateData = function(i, r) {
            if (i && r && !(r.length < 1)) {
                var a = r[r.length - 1];
                if (i = i[0]) {
                    if (a.time < i.time)
                        for (var e = t.arrIndexOf(l, i.time), h = t.arrIndexOf(l, a.time), n = h; e >= n; n++)
                            e - n > 0 ? (r[r.length] = r[r.length - 1],
                            console.log(e, n, s.stock.realLen)) : r[r.length - 1] = i;
                    else
                        r[r.length - 1].rgl += i.rgl;
                    o.cb(o),
                    4 == o.viewState.start && 5 == o.viewState.end && s.cbInDC(),
                    this.syncI()
                }
            }
        }
        ,
        this.initAndCalcAll = function(i) {
            if (this.urlData) {
                this.oriArr = this.gdsd(i),
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                var r, a = this.urlData.time, e = s.stock.realLen;
                for (0 > e && (e = o.disMod),
                r = 0; r < o.disMod && !(r > e); r++)
                    a[r] && (i[4][r].rgl = a[r].rgl);
                for (var h, l = 0, n = this.oriArr.length; n > l; l++)
                    h = this.oriArr[l],
                    this.selfArr.push({
                        rgl: h ? Number(h.rgl) : 1
                    })
            }
        }
        ,
        this.createPlayingData = function() {
            if (this.datas) {
                var t = this.h % 2 == 0 ? this.h : this.h + 1;
                this.labelMaxP = Math.abs(Math.abs(this.labelMaxP) > Math.abs(this.labelMinP) ? this.labelMaxP : this.labelMinP),
                this.labelMinP = -this.labelMaxP;
                for (var i, r = this.labelMaxP - this.labelMinP, s = 0, a = this.datas.length; a > s; s++) {
                    i = this.datas[s];
                    for (var e = this.customArr.length; e--; ) {
                        var h = this.customArr[e].prop;
                        i[h + "y"] = t / 2 * (this.labelMaxP - i[h]) / r
                    }
                }
            }
        }
        ,
        this.draw = function() {
            if (this.datas) {
                var t = this.line;
                t.clear(!0, i.PARAM.getHd());
                var r = this.datas.length
                  , s = i.DIMENSION.w_t / r
                  , a = i.DIMENSION.h_t
                  , e = s * dt;
                a = a % 2 == 0 ? a : a + 1;
                for (var h, o, l, n, c = a / 2, f = 0; 2 > f; f++) {
                    n = 1 == f ? i.COLOR.T_FALL : i.COLOR.T_RISE,
                    h = 0,
                    t.beginPath();
                    for (var d = 0; r > d; d++)
                        l = this.datas[d],
                        o = l.rgly + a / 4,
                        0 == f ? l.rgl > 0 && t.drawVStickC(h, o, e, c - o, n) : l.rgl < 0 && t.drawVStickC(h, o, e, c - o, n),
                        h += s;
                    t.stroke()
                }
                t.drawBg()
            }
        }
        ,
        this.loadUrlData()
    }
    function P(i, s) {
        this.DEFAULT_ARR = [{
            v: 12,
            color: "#F17147",
            prop: "roc",
            idct: "ROC"
        }, {
            v: 6,
            color: "#406BEA",
            prop: "maroc",
            idct: "MAROC"
        }],
        r.call(this, i, s),
        this.name = "ROC",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            glv: 0
        };
        var a = ut.calcMA
          , e = ut.calcREF
          , h = ut.getArr
          , o = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , l = this.customArr[1].v
              , n = h(r, this.tkProp.close)
              , c = o(o(o(n, e(n, s), "-"), 100, "*"), e(n, s), "/")
              , f = a(c, l);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var d = 0, u = r.length; u > d; d++)
                this.selfArr[d] = {
                    roc: c[d],
                    maroc: f[d]
                },
                this.selfArr[d][ct] = r[d].volume < 0
        }
    }
    function k(i, s) {
        this.DEFAULT_ARR = [{
            v: 6,
            color: "#999999",
            prop: "rsi1",
            idct: "RSI1"
        }, {
            v: 12,
            color: "#ffac03",
            prop: "rsi2",
            idct: "RSI2"
        }, {
            v: 24,
            color: "#9A2574",
            prop: "rsi3",
            idct: "RSI3"
        }],
        r.call(this, i, s),
        this.name = "RSI",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            min: 0,
            max: 100,
            upper: 70,
            lower: 30
        };
        var a = ut.calcREF
          , e = ut.calcMAX
          , h = ut.calcSMA
          , o = ut.calcABS
          , l = ut.operateArr
          , n = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , c = this.customArr[1].v
              , f = this.customArr[2].v
              , d = n(r, this.tkProp.close)
              , u = a(d, 1)
              , v = l(d, u, "-")
              , p = e(v, 0)
              , A = o(v)
              , m = l(l(h(p, s, 1), h(A, s, 1), "/"), 100, "*")
              , g = l(l(h(p, c, 1), h(A, c, 1), "/"), 100, "*")
              , y = l(l(h(p, f, 1), h(A, f, 1), "/"), 100, "*");
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var b = 0, w = r.length; w > b; b++)
                this.selfArr[b] = {
                    rsi1: m[b],
                    rsi2: g[b],
                    rsi3: y[b]
                },
                this.selfArr[b][ct] = r[b].volume < 0
        }
    }
    function E(i, s) {
        var a = "ignore_pct"
          , e = "ignore_oripct";
        this.DEFAULT_ARR = [{
            v: 4,
            color: "#777777",
            prop: "sar",
            idct: "SAR",
            desc: "\u5929\u6570"
        }, {
            v: 2,
            color: "#b82c0c",
            desc: "\u53c2\u6570"
        }, {
            v: 20,
            color: "#008040",
            desc: "\u53cd\u5411\u4e34\u754c"
        }, {
            color: "#777777",
            idct: "SAR\u64cd\u4f5c\u6536\u76ca",
            prop: a
        }, {
            color: "#777777",
            idct: "\u533a\u95f4\u80a1\u4ef7\u6536\u76ca",
            prop: e
        }],
        r.call(this, i, s),
        this.name = "SAR";
        var h = ut.calcSAR;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = h(i, r[0].v, r[1].v, r[2].v);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var a = 0, e = i.length; e > a; a++)
                this.selfArr[a] = {
                    ignore_minmax: s.direction[a],
                    sar: s.data[a]
                }
        }
        ,
        this.setRange = function() {
            if (this.datas) {
                for (var t = this.viewState.start, i = this.viewState.end, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                for (var s = Number.MAX_VALUE, h = -Number.MAX_VALUE, o = 0, l = 0, n = this.selfArr[t].ignore_minmax, c = t; i > c; c++) {
                    var f = this.oriArr[c]
                      , d = this.selfArr[c].ignore_minmax
                      , u = this.datas[c - t];
                    u.date = f.date,
                    c != t ? d == n ? 1 == d && (o = (1 + f.percent) * (1 + o) - 1) : o = 0 == d ? ((f.close - this.oriArr[c - 1].close) / this.oriArr[c - 1].close + 1) * (1 + o) - 1 : ((f.close - f.close) / f.close + 1) * (1 + o) - 1 : 1 == d && (o = ((f.close - f.close) / f.close + 1) * (1 + o) - 1),
                    n = d,
                    c != t && (l = (1 + f.percent) * (1 + l) - 1),
                    u[a] = 100 * o,
                    u[e] = 100 * l;
                    for (var v in this.selfArr[c])
                        if (this.selfArr[c].hasOwnProperty(v)) {
                            if (u[v] = this.selfArr[c][v],
                            0 == v.indexOf(nt))
                                continue;u[v] > h && (h = u[v]),
                            u[v] < s && (s = u[v])
                        }
                }
                this.minPrice = s,
                this.maxPrice = h,
                this.syncI()
            }
        }
        ,
        this.draw = function(t, r) {
            if (this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r,
            this.datas) {
                var s = this.line;
                s.clear(!0, i.PARAM.getHd());
                var a = this.datas.length
                  , e = i.DIMENSION.w_k / Math.max(a, i.PARAM.minCandleNum)
                  , h = Math.max(.1 * e, .1);
                h > 2 && (h = 2);
                for (var o, l = this.__iOffsetX - e * ft, n = this.customArr[0].prop + "y", c = this.customArr, f = 0; 2 > f; f++) {
                    o = l,
                    this.line.newStyle(0 == f ? c[2].color : c[1].color, !0, 2);
                    for (var d = 0; a > d; d++)
                        this.datas[d].ignore_minmax == f && this.line.drawDot(o, this.datas[d][n], h, !0),
                        o += e;
                    this.line.stroke()
                }
                t && s.drawBg(this.__iOffsetX)
            }
        }
    }
    function L(i, s, a) {
        var e = this
          , h = 2e4;
        r.call(this, i, s, {
            nu: !0
        }),
        this.name = "TFLOW",
        this.sname = "T_TFLOW",
        this.alias = "\u51c0\u4e70\u5165",
        this.urls = {
            oned: "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShuminline?random=$rn",
            onec: "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2Adayminline?symbol=$symbol&___qn=3&random=$rn",
            c: "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2A5dayminline?symbol=$symbol&random=$rn",
            d: "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShu5dayminline?random=$rn"
        };
        var o, l = !0;
        this.cb = a;
        var n = 0
          , c = [{
            v: 0 / 0,
            color: "#ff1111",
            prop: "mb",
            idct: "\u7279\u5927"
        }, {
            v: 0 / 0,
            color: "#ff9f07",
            prop: "ms",
            idct: "\u5927"
        }, {
            v: 0 / 0,
            color: "#00b5f8",
            prop: "sb",
            idct: "\u4e2d"
        }, {
            v: 0 / 0,
            color: "#5b0497",
            prop: "ss",
            idct: "\u5c0f"
        }]
          , f = null ;
        this.generateSettings = function() {
            for (var i in e.urls)
                e.urls.hasOwnProperty(i) && (e.urls[i] = t.getSUrl(e.urls[i]));
            if (e.param && e.param.length > 0) {
                e.customArr = [];
                for (var r = 0, s = e.param.length; s > r; r++)
                    e.customArr.push({
                        v: 0 / 0,
                        color: e.param[r].color || c[r].color || "#" + t.randomColor(),
                        prop: c[r].prop,
                        idct: c[r].idct
                    })
            }
            (!e.customArr || e.customArr.length < 1) && (e.customArr = c)
        }
        ;
        var d = function(t) {
            var i, r = String(t).split("|"), s = [];
            i = r.slice(1, r.length);
            for (var a = 0, e = {}, h = []; a < i.length; a++)
                h = i[a].split(","),
                h[0] > "11:30" && h[0] < "13:00" || (e = {
                    time: h[0],
                    mb: Number(h[1]),
                    ms: Number(h[2]),
                    sb: Number(h[3]),
                    ss: Number(h[4])
                },
                s.push(e));
            return s
        }
        ;
        this.df = function(t) {
            for (var i, r = String(t).split("R"), s = [], a = 0, e = r.length, h = []; e > a; a++) {
                i = String(r[a]).split("|");
                var o = [];
                h = i.slice(1, i.length);
                for (var l = 0, n = {}, c = []; l < h.length; l++)
                    c = h[l].split(","),
                    c[0] > "11:30" && c[0] < "13:00" || (n = {
                        time: c[0],
                        mb: Number(c[1]),
                        ms: Number(c[2]),
                        sb: Number(c[3]),
                        ss: Number(c[4])
                    },
                    0 == l && (n.date = i.slice(0, 1)[0]),
                    o.push(n));
                s.push(o)
            }
            return s
        }
        ,
        this.loadUrlData = function(i) {
            if (i && s.stock.hq) {
                var r = e.symbol
                  , a = "_" + r + at.ddt(new Date).getFullYear();
                e.selfDataUrl = o ? s.stock.dp ? e.urls.oned : e.urls.onec : s.stock.dp ? e.urls.d : e.urls.c,
                s.stock.hq.isUpdateTime || (clearInterval(this.updateId),
                this.updateId = null ),
                t.load(e.selfDataUrl.replace("$symbol", r).replace("$cb", "var%20" + a + "="), function() {
                    var t = window[a];
                    return t && t.__ERROR ? (e.urlData[4] = f,
                    void (n = 1)) : void (t && (o ? e.urlData[4] = d(t) : e.urlData = e.df(t),
                    f = e.urlData[4],
                    e.toReCalc = !0,
                    e.cb(e),
                    e.tFlowLen = e.urlData.length,
                    o = !0))
                }, function() {
                    n = 1
                })
            }
        }
        ,
        this.initAndCalcAll = function(i) {
            if (s.stock.hq && l && (e.loadUrlData(!0),
            l = !1),
            this.oriArr = this.gdsd(i),
            1 != n && this.urlData) {
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                var r, a, h = i.length, o = [], c = this.urlData.length, f = 0;
                for (r = 0; h > r; r++)
                    for (a = f; c > a; a++)
                        i[r][0] && i[r][0].date && this.urlData[r][0] && t.dateUtil.ds(i[r][0].date, "-") == this.urlData[r][0].date ? (f++,
                        o.push(this.urlData[a])) : a >= c - 1 && o.push([]);
                for (r = 0; h > r; r++)
                    for (var d, u, v = r >= h - 1 ? 1e-7 : 1e-6, p = 0; p < this.disMod; p++) {
                        u = i[r][p],
                        this.urlData[r][p] && (d = this.urlData[r][p]),
                        r >= h - 1 && p > s.stock.hq.index && (d = null );
                        var A = {
                            mb: this.urlData[r][p] ? Number(this.urlData[r][p].mb) : d ? d.mb : v,
                            ms: this.urlData[r][p] ? Number(this.urlData[r][p].ms) : d ? d.ms : v,
                            sb: this.urlData[r][p] ? Number(this.urlData[r][p].sb) : d ? d.sb : v,
                            ss: this.urlData[r][p] ? Number(this.urlData[r][p].ss) : d ? d.ss : v
                        };
                        r == h - 1 && p == this.disMod - 1 && s.stock.hq.time > "15:00" && (A = this.urlData[r][p - 1]),
                        this.selfArr.push(A)
                    }
            }
        }
        ,
        this.drawCalc = function() {
            if (this.datas) {
                for (var t = this.viewState.start * this.disMod, i = this.viewState.end * this.disMod, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                var s, a, e = Number.MAX_VALUE, h = -Number.MAX_VALUE;
                for (s = t; i > s; s++) {
                    a = this.datas[s - t],
                    a.date = this.oriArr[s].date;
                    for (var o in this.selfArr[s])
                        this.selfArr[s].hasOwnProperty(o) && (a[o] = this.selfArr[s][o],
                        a[o] > h && (h = a[o]),
                        a[o] < e && (e = a[o]))
                }
                this.labelMaxP = h,
                this.labelMinP = e;
                var l = h - e;
                for (s = 0; r > s; s++) {
                    a = this.datas[s];
                    for (var n = this.customArr.length; n--; ) {
                        var c = this.customArr[n].prop;
                        a[c + "y"] = this.h * (h - a[c]) / l
                    }
                }
            }
        }
        ,
        this.draw = function(t) {
            if (this.datas) {
                s.stock.hq && s.stock.hq.isUpdateTime && !this.updateId && (this.updateId = setInterval(e.loadUrlData, h, !0)),
                this.line.clear(!0, this.cfg.PARAM.getHd());
                var i = 1.5;
                this.h > 90 ? i = 2 : this.h < 50 && (i = 1.3);
                for (var r, a = this.datas.length, o = this.cfg.DIMENSION.w_t / a, l = this.customArr.length; l--; ) {
                    var n = this.customArr[l].prop + "y";
                    r = o * dt,
                    this.line.newStyle(this.customArr[l].color, !0, i);
                    for (var c = 0; a > c; c++)
                        1e-7 != this.datas[c][this.customArr[l].prop] && (0 == c || c % this.disMod == 0 ? this.line.moveTo(r, this.datas[c][n]) : this.line.lineTo(r, this.datas[c][n]),
                        r += o);
                    this.line.stroke()
                }
                t && this.line.drawBg()
            }
        }
        ,
        this.updateId = setInterval(e.loadUrlData, h, !0),
        s.stock.hq || this.loadUrlData(!0)
    }
    function U(i, s) {
        this.DEFAULT_ARR = [{
            color: "#007cc8",
            prop: "tor",
            idct: "TOR"
        }],
        r.call(this, i, s),
        this.name = "TOR",
        this.alias = "\u6362\u624b\u7387";
        var a = !1
          , e = s.stock.extraDataObj.rsAmount;
        this.initAndCalcAll = function(i) {
            if (e) {
                this.oriArr = i,
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                for (var r, h, o = 0, l = i.length; l > o; o++) {
                    r = i[o];
                    for (var n = 0, c = e.length; c > n; n++)
                        if (r.date >= e[n].date) {
                            h = e[n].amount;
                            break
                        }
                    this.selfArr[o] = {
                        tor: r.volume / h
                    }
                }
            } else if (!a) {
                a = !0;
                var f = this;
                setTimeout(function() {
                    e = s.stock.extraDataObj.rsAmount,
                    f.initAndCalcAll(i),
                    a = !1
                }, 3e3)
            }
        }
    }
    function F(i, s) {
        this.DEFAULT_ARR = [{
            v: 12,
            color: "#d6c84b",
            prop: "trix",
            idct: "TRIX"
        }, {
            v: 9,
            color: "#26bcd5",
            prop: "matrix",
            idct: "MATRIX"
        }],
        r.call(this, i, s),
        this.name = "TRIX",
        "k" != s.type && (this.sname = "T_" + this.name);
        var a = ut.calcMA
          , e = ut.calcEMA
          , h = ut.getArr
          , o = ut.operateArr
          , l = ut.calcREF;
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i)
              , s = this.customArr[0].v
              , n = this.customArr[1].v
              , c = h(r, this.tkProp.close)
              , f = e(e(e(c, s), s), s)
              , d = l(f, 1)
              , u = o(o(o(f, d, "-"), d, "/"), 100, "*")
              , v = a(u, n);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var p = 0, A = r.length; A > p; p++)
                this.selfArr[p] = {
                    trix: u[p],
                    matrix: v[p]
                },
                this.selfArr[p][ct] = r[p].volume < 0
        }
    }
    function H(t, i, r) {
        L.call(this, t, i, {
            nu: !0
        }),
        this.urls = {
            oned: "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getMinuteFlow?random=$rn",
            onec: "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockMinuteFlow?symbol=$symbol&random=$rn",
            c: "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockHistoryMinuteFlow?symbol=$symbol&random=$rn",
            d: "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getHistoryMinuteFlow?symbol=$symbol&random=$rn"
        },
        this.cb = r,
        i.stock.hq || this.loadUrlData(!0)
    }
    function X(i, s, a) {
        var e = "pct"
          , h = "oripct";
        this.DEFAULT_ARR = [{
            color: "#fa6d6d",
            prop: e,
            idct: "\u7ea2\u7ebf\uff08\u591a\u7a7a\u4fe1\u53f7\u6536\u76ca\uff09"
        }, {
            color: "#2b55ff",
            prop: h,
            idct: "\u84dd\u7ebf\uff08\u80a1\u4ef7\u81ea\u7136\u6da8\u5e45\uff09"
        }],
        r.call(this, i, s),
        this.name = "TZY",
        this.separate = 1,
        this.selfDataUrl = "http://finance.sina.com.cn/finance/hq/$symbol.js?_=$rn";
        var o = "dkfz_";
        this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + o + "$symbol",
        this.cb = a,
        this.toReCalc = !0,
        this.loadedFlag = {},
        this.loadedFromTo = void 0,
        this.df = function(t) {
            var i = [];
            if (t) {
                var r = t;
                for (var s in r)
                    r.hasOwnProperty(s) && i.push({
                        flag: r[s],
                        date: at.sd(s)
                    })
            }
            return i
        }
        ,
        this.loadUrlData = function() {
            var i = this.getFromToM.get(this);
            if (i) {
                var r = i[0]
                  , s = i[1]
                  , a = this
                  , e = this.symbol
                  , h = "_touzibullbear_" + e
                  , o = this.selfDataUrl.replace("$symbol", e).replace("$cb", "var%20" + h + "=").replace("$from", r).replace("$to", s).replace("$rn", String((new Date).getDate()));
                this.proxyCfg.usrObj.ssl && (o = t.getSUrl(o)),
                t.load(o, function() {
                    var t = window[h];
                    a.urlData || (a.urlData = {
                        day: []
                    });
                    var i = a.df(t)
                      , r = a.urlData.day;
                    r.splice.apply(r, [0, 0].concat(i)),
                    r.sort(function(t, i) {
                        return t.date - i.date
                    }),
                    a.toReCalc = !0,
                    a.cb(a)
                })
            }
        }
        ,
        this.udf = function(t) {
            if (t) {
                var i, r = t.split(",");
                return r && r.length > 1 && (i = [{
                    date: at.sd(r[0]),
                    flag: r[1]
                }]),
                i
            }
        }
        ;
        var l = !0;
        this.UPDATE_THRESHOLD = 3,
        this.update = function() {
            if (l)
                l = !1;
            else {
                if (++this.updateCount < this.UPDATE_THRESHOLD)
                    return;
                this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0)
            }
            var i = this
              , r = this.symbol
              , s = "hq_str_" + o + r
              , a = this.selfDataUrlUpdate.replace("$symbol", r);
            this.proxyCfg.usrObj.ssl && (a = t.getSUrl(a)),
            t.load(a, function() {
                var t = window[s]
                  , r = i.udf(t);
                r && i.doUpdate(r)
            })
        }
        ,
        this.updateData = function(t, i, r) {
            if (t && i && !(i.length < 1)) {
                var s = i[i.length - 1];
                if (t = t[0])
                    if (at.stbd(t.date, s.date))
                        for (var a in t)
                            t.hasOwnProperty(a) && ("undefined" != typeof s[a] && (s[a] = t[a]),
                            s.isFake = !1);
                    else
                        t.date > s.date && this.newData(i, t, r)
            }
        }
        ,
        this.initAndCalcAll = function(i) {
            if (this.oriArr = i,
            this.urlData && this.toReCalc) {
                this.toReCalc = !1,
                !this.datas && (this.datas = []),
                t.ca(this.selfArr);
                for (var r, s = this.urlData.day, a = t.kUtil.adbd(s, i, !1, !1), e = 0, h = i.length; h > e; e++)
                    r = a[e],
                    this.selfArr.push({
                        flag: r ? Number(r.flag) : 1,
                        isFake: r ? !!r.isFake : !0
                    })
            }
        }
        ,
        this.setRange = function() {
            if (this.datas) {
                for (var t = this.viewState.start, i = this.viewState.end, r = i - t; this.datas.length > r; )
                    this.datas.length--;
                for (; this.datas.length < r; )
                    this.datas.push({});
                for (var s = 0, a = 0, o = this.selfArr[t].flag, l = ut.calcA, n = ut.getArr, c = 10, f = t; i > f; f++) {
                    var d = this.datas[f - t];
                    d.date = this.oriArr[f].date;
                    var u = this.selfArr[f].flag
                      , v = this.oriArr[f]
                      , p = l(n(this.oriArr.slice(0 > f - c + 1 ? 0 : f - c + 1, f + 1), "close", function(t) {
                        return +t.toFixed(2)
                    }))
                      , A = v.close.toFixed(2)
                      , m = v.open.toFixed(2);
                    if (f != t) {
                        var g = this.oriArr[f - 1].close.toFixed(2);
                        u == o ? 1 == u && (s = (1 + (A - g) / g) * (1 + s) - 1) : s = 0 == u ? p > m ? ((m - g) / g + 1) * (1 + s) - 1 : ((p - g) / g + 1) * (1 + s) - 1 : m > p ? ((A - m) / m + 1) * (1 + s) - 1 : ((A - p) / p + 1) * (1 + s) - 1
                    } else
                        1 == u && (s = m > p ? ((A - m) / m + 1) * (1 + s) - 1 : ((A - p) / p + 1) * (1 + s) - 1);
                    o = u,
                    f != t && (a = (1 + v.percent) * (1 + a) - 1),
                    d[e] = 100 * s,
                    d[h] = 100 * a;
                    for (var y in this.selfArr[f])
                        this.selfArr[f].hasOwnProperty(y) && (d[y] = this.selfArr[f][y])
                }
                this.syncI()
            }
        }
        ,
        this.draw = function(r, s) {
            function a(t, i, r) {
                for (var s = t.length, a = t[s - 1][i], e = s - 1, h = t.length; h--; ) {
                    var o = t[h][i];
                    r ? o > a && (a = o,
                    e = h) : a > o && (a = o,
                    e = h)
                }
                return e
            }
            function e(t, i, r, s, a) {
                t.moveTo(i, r + a),
                t.lineTo(i - s, r + Math.sqrt(3) * s + a),
                t.lineTo(i + s, r + Math.sqrt(3) * s + a),
                t.lineTo(i, r + a)
            }
            function h(t, i, r, s, a) {
                t.moveTo(i, r - a),
                t.lineTo(i - s, r - Math.sqrt(3) * s - a),
                t.lineTo(i + s, r - Math.sqrt(3) * s - a),
                t.lineTo(i, r - a)
            }
            if (this.__iOffsetX = isNaN(s) ? this.__iOffsetX : s,
            this.datas) {
                var o = this.line;
                o.clear(!0, i.PARAM.getHd());
                var l, n, c, f = this.viewState.start, d = this.viewState.end, u = t.hex2dec(this.customArr[0].color, .5), v = t.hex2dec(this.customArr[1].color, .5);
                c = f,
                n = this.datas[0].flag;
                for (var p = f; d > p; p++)
                    if (this.datas[p - f].isFake && p != d - 1)
                        c = p;
                    else {
                        if (l = this.datas[p - f].flag,
                        l != n) {
                            o.beginPath();
                            var A = (this.oriArr[p].ix + this.oriArr[p - 1].ix) / 2
                              , m = (this.oriArr[p].cy + this.oriArr[p - 1].cy) / 2;
                            if (c != f)
                                var g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2
                                  , y = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2;
                            else
                                g = this.oriArr[c].ix,
                                y = this.oriArr[c].cy;
                            if (o.moveTo(A, m),
                            o.lineTo(g, y),
                            1 == n) {
                                var b = a(this.oriArr.slice(c, p), "high", !0) + c;
                                o.lineTo(this.oriArr[b].ix, this.oriArr[b].hy);
                                var w = this.oriArr[p].cy == this.oriArr[b].hy;
                                w ? o.newStyle([u]) : o.newFillStyle([u])
                            } else
                                b = a(this.oriArr.slice(c, p), "low", !1) + c,
                                o.lineTo(this.oriArr[b].ix, this.oriArr[b].ly),
                                w = this.oriArr[p].cy == this.oriArr[b].ly,
                                w ? o.newStyle([v]) : o.newFillStyle([v]);
                            w ? o.stroke() : o.fill(),
                            c = p
                        }
                        (p == d - 1 && !this.datas[p - f].isFake || p == d - 2 && this.datas[p - f + 1].isFake) && (o.beginPath(),
                        A = this.oriArr[p].ix,
                        m = this.oriArr[p].cy,
                        l != n ? (g = (this.oriArr[p].ix + this.oriArr[p - 1].ix) / 2,
                        y = (this.oriArr[p].cy + this.oriArr[p - 1].cy) / 2,
                        o.moveTo(A, m),
                        o.lineTo(g, y),
                        1 == l ? (o.lineTo(this.oriArr[p].ix, this.oriArr[p].hy),
                        w = this.oriArr[p].cy == this.oriArr[p].hy,
                        w ? o.newStyle([u]) : o.newFillStyle([u])) : (o.lineTo(this.oriArr[p].ix, this.oriArr[p].ly),
                        w = this.oriArr[p].cy == this.oriArr[p].ly,
                        w ? o.newStyle([v]) : o.newFillStyle([v]))) : (f == c ? (g = this.oriArr[c].ix,
                        y = this.oriArr[c].cy) : (g = (this.oriArr[c].ix + this.oriArr[c - 1].ix) / 2,
                        y = (this.oriArr[c].cy + this.oriArr[c - 1].cy) / 2),
                        o.moveTo(A, m),
                        o.lineTo(g, y),
                        1 == l ? (b = a(this.oriArr.slice(c, p + 1), "high", !0) + c,
                        o.lineTo(this.oriArr[b].ix, this.oriArr[b].hy),
                        w = this.oriArr[p].cy == this.oriArr[b].hy,
                        w ? o.newStyle([u]) : o.newFillStyle([u])) : (b = a(this.oriArr.slice(c, p + 1), "low", !1) + c,
                        o.lineTo(this.oriArr[b].ix, this.oriArr[b].ly),
                        w = this.oriArr[p].cy == this.oriArr[b].ly,
                        w ? o.newStyle([v]) : o.newFillStyle([v]))),
                        w ? o.stroke() : o.fill()),
                        n = l
                    }
                var D = i.DIMENSION.w_k / Math.max(this.datas.length, i.PARAM.minCandleNum);
                D = D > 5 ? 5 : D,
                D = 2 > D ? 2 : D;
                var _ = 3
                  , M = this.customArr[0].color
                  , O = this.customArr[1].color;
                for (n = this.datas[0].flag,
                o.beginPath(),
                p = f; d > p; p++)
                    l = this.datas[p - f].flag,
                    l != n && 1 == l && e(o, this.oriArr[p].ix, this.oriArr[p].ly, D, _),
                    n = l;
                for (o.newFillStyle([M]),
                o.fill(),
                n = this.datas[0].flag,
                o.beginPath(),
                p = f; d > p; p++)
                    l = this.datas[p - f].flag,
                    l != n && 0 == l && h(o, this.oriArr[p].ix, this.oriArr[p].hy, D, _),
                    n = l;
                o.newFillStyle([O]),
                o.fill();
                var T = "\u8f6c\u591a\uff0c\u5efa\u8bae\u5173\u6ce8"
                  , S = "\u8f6c\u7a7a\uff0c\u98ce\u9669\u8f83\u9ad8"
                  , I = o.getG();
                I.font = i.STYLE.FONT_SIZE + "px " + i.STYLE.FONT_FAMILY;
                var C = I.measureText(T).width
                  , N = 10 / Math.sqrt(3)
                  , R = 10
                  , x = 5
                  , P = N * x;
                I.beginPath(),
                I.fillStyle = "#000",
                I.fillText(T, P, R),
                P += C + N * (x - 2),
                I.fillText(S, P, R),
                P = N * (x - 1.5),
                o.beginPath(),
                o.newFillStyle([M]),
                e(o, P, 1, N, 0),
                o.fill(),
                P += C + N * (x - 2),
                o.beginPath(),
                o.newFillStyle([O]),
                h(o, P, R + 1, N, 0),
                o.fill(),
                r && o.drawBg(this.__iOffsetX)
            }
        }
        ,
        this.loadUrlData()
    }
    function B(t, i, r) {
        X.call(this, t, i),
        this.name = "TZYS",
        this.alias = "\u591a\u7a7a\u53cd\u8f6c",
        this.cb = r,
        this.drawCalc = function() {
            if (this.datas) {
                this.setRange();
                var t, i, r, s, a = this.datas.length, e = Number.MAX_VALUE, h = -Number.MAX_VALUE;
                for (i = 0; a > i; i++)
                    for (t = this.datas[i],
                    r = this.customArr.length; r--; )
                        s = this.customArr[r].prop,
                        s && (t[s] > h && (h = t[s]),
                        t[s] < e && (e = t[s]));
                this.labelMaxP = this.maxPrice = h,
                this.labelMinP = this.minPrice = e;
                var o = h - e;
                for (i = 0; a > i; i++)
                    for (t = this.datas[i],
                    r = this.customArr.length; r--; )
                        s = this.customArr[r].prop,
                        s && (t[s + "y"] = this.h * (h - t[s]) / o)
            }
        }
        ,
        this.draw = function(t, i) {
            if (this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i,
            this.datas) {
                this.line.clear(!0, this.cfg.PARAM.getHd());
                var r = this.h * this.maxPrice / (this.maxPrice - this.minPrice) - .5;
                this.line.newStyle(this.cfg.COLOR.GRID, !0, 2),
                this.line.moveTo(0, r),
                this.line.lineTo(this.cfg.DIMENSION.w_k, r),
                this.line.stroke();
                for (var s, a = this.datas.length, e = this.cfg.DIMENSION.w_k / Math.max(a, this.cfg.PARAM.minCandleNum), h = this.customArr.length; h--; ) {
                    var o = this.customArr[h].prop + "y";
                    s = this.__iOffsetX - e * ft,
                    this.line.newStyle(this.customArr[h].color, !0, 1.5);
                    for (var l = 0; a > l; l++)
                        0 == l ? this.line.moveTo(s, this.datas[l][o]) : this.line.lineTo(s, this.datas[l][o]),
                        s += e;
                    this.line.stroke()
                }
                t && this.line.drawBg(this.__iOffsetX)
            }
        }
    }
    function V(i, s) {
        this.DEFAULT_ARR = [{
            v: 26,
            color: "#75B2A3",
            prop: "vr",
            idct: "VR"
        }, {
            v: 6,
            color: "#F8B82E",
            prop: "mavr",
            idct: "MAVR"
        }],
        r.call(this, i, s),
        this.name = "VR",
        "k" != s.type && (this.sname = "T_" + this.name),
        this.vaObj = {
            upper: 200,
            lower: 70,
            glv: 350
        };
        var a = ut.calcMA
          , e = ut.calcSUM
          , h = ut.calcREF
          , o = ut.getArr
          , l = ut.operateArr;
        this.initAndCalcAll = function(i) {
            for (var r = this.gdsd(i), s = this.customArr[0].v, n = this.customArr[1].v, c = o(r, this.tkProp.close), f = o(r, "volume"), d = h(c, 1), u = [], v = [], p = [], A = 0, m = c.length; m > A; A++)
                u.push(c[A] > d[A] ? f[A] : 0),
                v.push(c[A] < d[A] ? f[A] : 0),
                p.push(c[A] == d[A] ? f[A] : 0);
            u = e(u, s),
            v = e(v, s),
            p = e(p, s);
            var g = l(l(l(l(u, 2, "*"), p, "+"), 100, "*"), l(l(v, 2, "*"), p, "+"), "/")
              , y = a(g, n);
            this.oriArr = r,
            this.datas ? t.ca(this.datas) : this.datas = [],
            t.ca(this.selfArr);
            for (var b = 0, w = r.length; w > b; b++)
                this.selfArr[b] = {
                    vr: g[b],
                    mavr: y[b]
                },
                this.selfArr[b][ct] = r[b].volume < 0
        }
    }
    function j(i, s) {
        this.DEFAULT_ARR = [{
            v: 10,
            color: "#3D85C6",
            prop: "wr1",
            idct: "WR1"
        }, {
            v: 6,
            color: "#84C84B",
            prop: "wr2",
            idct: "WR2"
        }],
        r.call(this, i, s),
        this.name = "WR",
        this.vaObj = {
            min: 0,
            max: 100,
            upper: 80,
            lower: 20
        };
        var a = ut.calcHHV
          , e = ut.calcLLV
          , h = ut.getArr
          , o = ut.operateArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , l = r[1].v
              , n = h(i, "close")
              , c = h(i, "high")
              , f = h(i, "low")
              , d = o(o(o(a(c, s), n, "-"), 100, "*"), o(a(c, s), e(f, s), "-"), "/")
              , u = o(o(o(a(c, l), n, "-"), 100, "*"), o(a(c, l), e(f, l), "-"), "/");
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var v = 0, p = i.length; p > v; v++)
                this.selfArr[v] = {
                    wr1: d[v],
                    wr2: u[v]
                }
        }
    }
    function $(i, s) {
        this.DEFAULT_ARR = [{
            v: 24,
            color: "#fe6623",
            prop: "wvad",
            idct: "WVAD"
        }, {
            v: 6,
            color: "#00c1eb",
            prop: "wvadma",
            idct: "WVADMA"
        }],
        r.call(this, i, s),
        this.name = "WVAD",
        this.vaObj = {
            glv: 0
        };
        var a = ut.calcSUM
          , e = ut.calcMA
          , h = ut.operateArr
          , o = ut.getArr;
        this.initAndCalcAll = function(i) {
            var r = this.customArr
              , s = r[0].v
              , l = r[1].v
              , n = o(i, "close")
              , c = o(i, "open")
              , f = o(i, "high")
              , d = o(i, "low")
              , u = o(i, "volume")
              , v = h(a(h(h(h(n, c, "-"), h(f, d, "-"), "/"), u, "*"), s), 1e4, "/")
              , p = e(v, l);
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var A = 0, m = i.length; m > A; A++)
                this.selfArr[A] = {
                    wvad: v[A],
                    wvadma: p[A]
                }
        }
    }
    function W(i, s) {
        this.storageVer = "v2",
        r.call(this, i, s, {
            nu: !0
        }),
        this.name = "VOLUME",
        this.alias = "\u6210\u4ea4";
        var a = this
          , e = "volume"
          , h = "MA"
          , o = "#888887";
        !function() {
            var t = function() {
                var t = [{
                    color: o
                }, {
                    v: 5,
                    color: "#FC9CB8"
                }, {
                    v: 10,
                    color: "#12BDD9"
                }];
                et.save({
                    uid: [a.cfg.uid, (new Date).getTime()].join("|"),
                    key: a.STORAGE_PREFIX + (a.sname || a.name) + "_" + a.storageVer,
                    value: t
                })
            }
            ;
            et.load({
                uid: [a.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                key: a.STORAGE_PREFIX + (a.sname || a.name) + "_" + a.storageVer
            }, function(i) {
                i || t()
            }, !0)
        }(),
        this.generateSettings = function() {
            var i = a.name.toLowerCase()
              , r = "MA"
              , s = o;
            if (a.customArr = [],
            a.param && a.param.length > 0) {
                s = a.param[0].color || o;
                for (var l = 0, n = a.param.length; n > l; l++) {
                    var c = a.param[l].v;
                    !isNaN(c) && c > 0 && a.customArr.push({
                        v: c,
                        color: a.param[l].color || "#" + t.randomColor(),
                        prop: i + c,
                        idct: r + c,
                        desc: h
                    })
                }
            }
            a.customArr.reverse(),
            a.customArr.push({
                v: 0 / 0,
                color: s,
                prop: e,
                idct: "VOL"
            }),
            a.customArr.reverse()
        }
        ,
        this.initAndCalcAll = function(i) {
            this.oriArr = i,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var r = a.name.toLowerCase(), s = i.length, h = 0, o = this.customArr.length; o > h; h++)
                for (var l, n = 0, c = this.customArr[h].v, f = 0; c && s > f; f++) {
                    var d = i[f];
                    if (n += Number(d[e]),
                    f >= c - 1) {
                        l = n / c;
                        var u = i[f - c + 1];
                        n -= Number(u[e])
                    } else
                        l = n / (f + 1);
                    var v = this.selfArr[f] = this.selfArr[f] || {};
                    v[r + c] = l
                }
        }
        ,
        this.drawCalc = function() {
            if (this.datas) {
                for (var i = this.viewState.start, r = this.viewState.end, s = r - i; this.datas.length > s; )
                    this.datas.length--;
                for (; this.datas.length < s; )
                    this.datas.push({});
                var a, e, h = -Number.MAX_VALUE, o = 0;
                for (a = i; r > a; a++) {
                    e = this.datas[a - i],
                    e.volume = this.oriArr[a].volume,
                    e.volume > h && (h = e.volume);
                    for (var l in this.selfArr[a])
                        this.selfArr[a].hasOwnProperty(l) && (e[l] = this.selfArr[a][l],
                        e[l] > h && (h = e[l]))
                }
                0 > h && (h = 0);
                var n = t.xh5_ADJUST_HIGH_LOW.c(h, o, 0, !0);
                h = n[0];
                var c = h - o;
                for (a = i; r > a; a++) {
                    e = this.datas[a - i];
                    var f = this.oriArr[a];
                    e.date = f.date,
                    e.kke_cs = f.kke_cs,
                    e.voly = st.vp(f.volume, h, this.h);
                    for (var d = this.customArr.length; d--; ) {
                        var u = this.customArr[d].prop;
                        e[u + "y"] = this.h * (h - e[u]) / c
                    }
                }
                this.labelMaxP = h,
                this.labelMinP = o,
                this.syncI()
            }
        }
        ,
        this.draw = function(t, r) {
            if (this.__iOffsetX = isNaN(r) ? this.__iOffsetX : r,
            this.datas) {
                var s = this.line;
                s.clear(!0, i.PARAM.getHd());
                for (var a, e, h, o, l = this.datas.length, n = i.DIMENSION.w_k / Math.max(l, i.PARAM.minCandleNum), c = this.h, f = .6 * n, d = "hollow" == i.datas.candle, u = 0; 2 > u; u++) {
                    o = 0 == u ? i.COLOR.K_FALL : i.COLOR.K_RISE,
                    a = this.__iOffsetX - n,
                    s.beginPath();
                    for (var v = 0; l > v; v++)
                        h = this.datas[v],
                        e = h.voly,
                        0 == u ? -1 == h.kke_cs && s.drawVStickRect(a, e, f, c - e, o, !0) : h.kke_cs >= 0 && s.drawVStickRect(a, e, f, c - e, o, !d),
                        a += n;
                    s.stroke()
                }
                for (var p = 1, A = this.customArr.length; A > p; p++) {
                    var m = this.customArr[p].prop + "y";
                    a = this.__iOffsetX - n * ft,
                    s.newStyle(this.customArr[p].color, !0, 1.3);
                    for (var g = 0; l > g; g++)
                        0 == g ? s.moveTo(a, this.datas[g][m]) : s.lineTo(a, this.datas[g][m]),
                        a += n;
                    s.stroke()
                }
                s.drawBg(this.__iOffsetX)
            }
        }
    }
    function z(i, s) {
        this.storageVer = "v2",
        r.call(this, i, s, {
            nu: !0
        }),
        this.name = "TVOL",
        this.sname = "T_TVOL",
        this.alias = "\u6210\u4ea4";
        var a = this
          , e = "volume"
          , h = "MA"
          , o = "#888887";
        !function() {
            var t = function() {
                var t = [{
                    color: o
                }, {
                    v: 10,
                    color: "#12BDD9"
                }];
                et.save({
                    uid: [a.cfg.uid, (new Date).getTime()].join("|"),
                    key: a.STORAGE_PREFIX + (a.sname || a.name) + "_" + a.storageVer,
                    value: t
                })
            }
            ;
            et.load({
                uid: [a.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                key: a.STORAGE_PREFIX + (a.sname || a.name) + "_" + a.storageVer
            }, function(i) {
                i || t()
            }, !0)
        }(),
        this.generateSettings = function() {
            var i = a.name.toLowerCase()
              , r = "MA"
              , s = o;
            if (a.customArr = [],
            a.param && a.param.length > 0) {
                s = a.param[0].color || o;
                for (var l = 0, n = a.param.length; n > l; l++) {
                    var c = a.param[l].v;
                    !isNaN(c) && c > 0 && a.customArr.push({
                        v: c,
                        color: a.param[l].color || "#" + t.randomColor(),
                        prop: i + c,
                        idct: r + c,
                        desc: h
                    })
                }
            }
            a.customArr.reverse(),
            a.customArr.push({
                v: 0 / 0,
                color: s,
                prop: e,
                idct: "VOL"
            }),
            a.customArr.reverse()
        }
        ,
        this.initAndCalcAll = function(i) {
            var r = this.gdsd(i);
            this.oriArr = r,
            !this.datas && (this.datas = []),
            t.ca(this.selfArr);
            for (var s = a.name.toLowerCase(), h = r.length, o = 0, l = this.customArr.length; l > o; o++)
                for (var n, c = 0, f = this.customArr[o].v, d = 0; f && h > d; d++) {
                    var u = r[d];
                    if (c += Number(u[e]),
                    d >= f - 1) {
                        n = c / f;
                        var v = r[d - f + 1];
                        c -= Number(v[e])
                    } else
                        n = c / (d + 1);
                    var p = this.selfArr[d] = this.selfArr[d] || {};
                    p[s + f] = n
                }
        }
        ,
        this.drawCalc = function() {
            if (this.datas) {
                for (var i = this.viewState.start * this.disMod, r = this.viewState.end * this.disMod, s = r - i; this.datas.length > s; )
                    this.datas.length--;
                for (; this.datas.length < s; )
                    this.datas.push({});
                var a, e, h = -Number.MAX_VALUE;
                for (a = i; r > a; a++) {
                    e = this.datas[a - i],
                    e.volume = this.oriArr[a].volume,
                    e.volume > h && (h = e.volume);
                    for (var o in this.selfArr[a])
                        this.selfArr[a].hasOwnProperty(o) && (e[o] = this.selfArr[a][o],
                        e[o] > h && (h = e[o]))
                }
                0 > h && (h = 0);
                var l = t.xh5_ADJUST_HIGH_LOW.c(h, 0, 0, !0);
                h = l[0];
                var n;
                for (a = i; r > a; a++) {
                    e = this.datas[a - i];
                    var c = this.oriArr[a];
                    n = 0 == a ? c.prevclose || c.price : this.oriArr[a - 1].price,
                    e.kke_cs = c.price > n ? 1 : c.price < n ? -1 : 0,
                    e.price = c.price,
                    e.voly = st.vp(c.volume, h, this.h),
                    this.h - e.voly < .5 && c.volume > 0 && (e.voly = Math.floor(e.voly),
                    e.voly -= 1);
                    for (var f = this.customArr.length; f--; ) {
                        var d = this.customArr[f].prop;
                        e[d + "y"] = this.h * (h - e[d]) / h
                    }
                }
                this.labelMaxP = h,
                this.labelMinP = 0,
                this.syncI()
            }
        }
        ,
        this.draw = function() {
            if (this.datas) {
                var t = this.line;
                t.clear(!0, i.PARAM.getHd());
                for (var r, s, a, e, h = this.datas.length, o = i.DIMENSION.w_t / h, l = this.h, n = o * dt, c = -1, f = 0; 3 > f; f++) {
                    switch (c) {
                    case -1:
                        e = i.COLOR.T_FALL;
                        break;
                    case 0:
                        e = i.COLOR.T_N;
                        break;
                    case 1:
                        e = i.COLOR.T_RISE
                    }
                    r = 0,
                    t.beginPath();
                    for (var d = 0; h > d; d++)
                        a = this.datas[d],
                        a.volume >= 0 && (s = a.voly,
                        a.kke_cs == c && t.drawVStickC(r, s, n, l - s, e)),
                        r += o;
                    t.stroke(),
                    c++
                }
                for (var u = 1, v = this.customArr.length; v > u; u++) {
                    var p = this.customArr[u].prop + "y";
                    r = n,
                    t.newStyle(this.customArr[u].color, !0, 1.3);
                    for (var A = 0; h > A; A++)
                        a = this.datas[A],
                        a.volume >= 0 && (0 == A ? t.moveTo(r, a[p]) : t.lineTo(r, a[p])),
                        r += o;
                    t.stroke()
                }
                t.drawBg()
            }
        }
    }
    function G(i) {
        function r() {
            var i = {
                BBIBOLL: h,
                BOLL: n,
                CHIPCOST: d,
                DITC: u,
                EXPMA: b,
                MA: O,
                PRESS: N,
                SAR: E,
                TZY: X,
                DPDK: A,
                EWI: y,
                RGL: x,
                TECHFLOW: w
            };
            vt.auth(i);
            var r = []
              , s = !0
              , e = function() {
                for (; m.length; )
                    m.length--;
                for (var t = r.length; t--; ) {
                    var i = r[t];
                    m.push({
                        name: i.name,
                        param: i.param
                    })
                }
            }
              , o = function(t) {
                if (s) {
                    var i = f.datas.isT ? a.tDb.get() : a.kDb.get();
                    i && (t.initAndCalcAll(i, !1),
                    t.setRange(),
                    t.setPricePos(null ),
                    t.draw())
                }
            }
              , l = function(s) {
                if (s) {
                    var a = s.name;
                    if (a) {
                        a = a.toUpperCase();
                        for (var h, l = r.length; l--; )
                            if (r[l].name == a) {
                                h = r[l];
                                break
                            }
                        if (!h) {
                            if (!t.isFunc(i[a]))
                                return;
                            h = new i[a](f,_,o),
                            h.asPChart = !0,
                            r.push(h)
                        }
                        h.newParam(s.param),
                        e(),
                        vt.doStc(s)
                    }
                }
            }
              , v = function(t, i) {
                if (t) {
                    var s = t.name;
                    if (s) {
                        s = s.toUpperCase();
                        for (var a = r.length; a--; )
                            if (r[a].name == s) {
                                var h = r.splice(a, 1)[0];
                                return h.rfs(),
                                h.getFromToM.reset(h),
                                !i && e(),
                                void vt.doStc(t, !0)
                            }
                    }
                }
            }
              , p = function() {
                for (var t, i = r.length; i--; )
                    t = r[i],
                    t.clearDraw()
            }
            ;
            this.linkData = function(t) {
                if (s) {
                    var i = f.datas.isT ? a.tDb.get() : a.kDb.get();
                    if (i)
                        for (var e, h = r.length; h--; )
                            e = r[h],
                            e.initAndCalcAll(i, t),
                            t && e.update();
                }
            }
            ,
            this.setDataRange = function() {
                if (s)
                    for (var t, i = r.length; i--; )
                        t = r[i],
                        t.setRange(),
                        t.selfDataUrl && t.loadUrlData()
            }
            ,
            this.getMaxMin = function() {
                var t = Number.MAX_VALUE
                  , i = -Number.MAX_VALUE
                  , a = !1;
                if (s)
                    for (var e, h = r.length; h--; )
                        e = r[h],
                        e.separate > 0 || isNaN(e.minPrice) || isNaN(e.maxPrice) || (t = Math.min(e.minPrice, t),
                        i = Math.max(e.maxPrice, i),
                        a = !0);
                return a ? [i, t] : !1
            }
            ,
            this.setPricePos = function(t) {
                if (s)
                    for (var i, a = r.length; a--; )
                        i = r[a],
                        i.setPricePos(t)
            }
            ,
            this.allDraw = function(t) {
                if (s)
                    for (var i, a = r.length; a--; )
                        i = r[a],
                        i.draw(!1, t)
            }
            ,
            this.onResize = function() {
                for (var t, i = r.length; i--; )
                    t = r[i],
                    t.resize({
                        h: f.DIMENSION.h_k,
                        mh: f.DIMENSION.H_MA4K
                    }),
                    s && (t.createPlayingData(),
                    t.draw())
            }
            ,
            this.indirectI = function(t, i, a) {
                s || (t = 0 / 0);
                for (var e, h = [], o = r.length; o--; )
                    e = r[o],
                    h.push(e.interact(t, i, a));
                return h
            }
            ,
            this.getLog = function() {
                return m.reverse() || null
            }
            ,
            this.getExistingCharts = function() {
                return r
            }
            ,
            this.clear = function() {
                for (var t = r.length; t--; )
                    v(r[t], !0)
            }
            ,
            this.createChart = function(i, r) {
                !t.isArr(i) && (i = [i]);
                for (var s = 0, a = i.length; a > s; s++)
                    l(i[s]);
                c(!0, r)
            }
            ,
            this.removeChart = function(i) {
                if (!i) {
                    i = [];
                    for (var s = r.length; s--; )
                        i.push({
                            name: r[s].name
                        })
                }
                !t.isArr(i) && (i = [i]);
                for (var a = 0, e = i.length; e > a; a++)
                    v(i[a]);
                c()
            }
            ,
            this.showHide = function(t) {
                var i = t.v;
                s !== i && (s = i,
                s || p())
            }
        }
        var s, a = i.stockData, e = i.iMgr, o = i.titleArea, l = i.chartArea, c = i.cb, f = i.cfg, v = i.type, p = i.usrObj, m = [], g = {
            edit: function(t) {
                s.createChart(t)
            },
            remove: function(t) {
                s.removeChart(t)
            }
        }, D = function(i, r) {
            if (f.custom.allow_indicator_edit)
                if (q)
                    q.sendOriginalData({
                        name: i.name,
                        data: i.customArr,
                        defaultData: i.DEFAULT_ARR
                    }, g),
                    q.show(r);
                else {
                    var s = f.custom.indicatorpanel_url;
                    p.ssl && (s = t.getSUrl(s, !0)),
                    q = new Y({
                        url: s,
                        z: 10001
                    },Q(D, null , i, r))
                }
        }
        , _ = {
            stock: a,
            cbInDC: c,
            onClkTT: D,
            ctn: l,
            titleCtn: o,
            titleW: 0 / 0,
            titleGap: 5,
            style: {
                position: "absolute",
                top: 0
            },
            iMgr: e,
            withHBg: !1,
            mh: f.DIMENSION.H_MA4K,
            lz: f.PARAM.G_Z_INDEX + 1,
            usrObj: p,
            type: v
        };
        return s = new r
    }
    function K(i) {
        function r() {
            var i = {
                ASI: e,
                BBIBOLL: h,
                BIAS: l,
                BOLL: n,
                BRAR: c,
                CCI: f,
                DMA: v,
                DMI: p,
                DPDK: A,
                DPDKS: m,
                EMV: g,
                EXPMA: b,
                KDJ: D,
                KFLOW: _,
                MA: O,
                MACD: T,
                OBV: S,
                PKFLOW: I,
                PSY: R,
                ROC: P,
                RSI: k,
                SAR: E,
                TRIX: F,
                TZY: X,
                TZYS: B,
                VR: V,
                VOLUME: W,
                WR: j,
                WVAD: $,
                TOR: U,
                ADL: a,
                LB: M,
                POSITION: C,
                TFLOW: L,
                TTFLOW: H,
                TVOL: z,
                BLANKCTN: s
            };
            vt.auth(i);
            var r;
            at = [];
            var o = function() {
                for (; J.length; )
                    J.length--;
                for (var t = at.length; t--; ) {
                    var i = at[t];
                    J.push({
                        name: i.name,
                        param: i.param
                    })
                }
            }
              , d = function(t) {
                var i = G.datas.isT ? u.tDb.get() : u.kDb.get();
                i && (t.initAndCalcAll(i),
                t.drawCalc(),
                t.draw(!0))
            }
              , y = function(t) {
                for (var i, r = at.length; r--; )
                    if (at[r].name == t) {
                        i = at[r];
                        break
                    }
                return i
            }
              , x = function(a) {
                if (a) {
                    var e = a.name;
                    if (e) {
                        e = e.toUpperCase(),
                        "BLANKCTN" != e && (st = e);
                        var h = y(e);
                        if (!h) {
                            var l = i[e];
                            if (!t.isFunc(l))
                                return;
                            l === s && r ? (h = r,
                            h.wrap.style.display = "") : (h = new l(G,ft,d),
                            l === s && (r = h)),
                            at.push(h),
                            w.appendChild(h.wrap)
                        }
                        h.newParam(a.param),
                        o(),
                        vt.doStc(a)
                    }
                }
            }
              , K = function(t, i) {
                if (t) {
                    var r = t.name;
                    if (r) {
                        r = r.toUpperCase();
                        for (var s = at.length; s--; )
                            if (at[s].name == r) {
                                var a = at.splice(s, 1)[0];
                                return a.rfs(),
                                a.getFromToM.reset(a),
                                !i && o(),
                                void vt.doStc(t, !0)
                            }
                    }
                }
            }
            ;
            this.linkData = function(t) {
                var i = G.datas.isT ? u.tDb.get() : u.kDb.get();
                if (i)
                    for (var r, s = at.length; s--; )
                        r = at[s],
                        r.initAndCalcAll(i),
                        t && r.update()
            }
            ,
            this.setDataRange = function() {
                for (var t, i = at.length; i--; )
                    t = at[i],
                    t.drawCalc(),
                    t.selfDataUrl && t.loadUrlData()
            }
            ,
            this.allDraw = function(t) {
                for (var i, r = at.length; r--; )
                    i = at[r],
                    i.draw(!0, t)
            }
            ,
            this.onResize = function(t) {
                for (var i, r, s = at.length; s--; )
                    r = at[s],
                    i = t ? G.DIMENSION.H_T_G : r.h,
                    r.resize({
                        h: i,
                        eh: G.DIMENSION.H_T_B
                    }),
                    r.drawCalc(),
                    r.draw(!0)
            }
            ,
            this.indirectI = function(t, i, r) {
                for (var s, a = at.length; a--; )
                    s = at[a],
                    s.interact(t, i, r)
            }
            ,
            this.getLog = function() {
                return J.reverse() || null
            }
            ,
            this.getExistingCharts = function() {
                return at
            }
            ,
            this.clear = function() {
                for (var t = at.length; t--; )
                    K(at[t], !0)
            }
            ,
            this.createChart = function(i, r) {
                !t.isArr(i) && (i = [i]);
                for (var s = 0, a = i.length; a > s; s++)
                    x(i[s]);
                N(!0, r)
            }
            ,
            this.removeChart = function(i) {
                if (!i) {
                    i = [];
                    for (var r = at.length; r--; )
                        i.push({
                            name: at[r].name
                        })
                }
                !t.isArr(i) && (i = [i]);
                for (var s = 0, a = i.length; a > s; s++)
                    K(i[s]);
                N(!0)
            }
        }
        var o, d, u = i.stockData, y = i.iMgr, w = i.subArea, N = i.cb, x = i.type, G = i.cfg, K = i.usrObj, Z = i.initMgr, J = [], tt = function(i, r, s, a, e) {
            if (!t.$CONTAINS(r, y.iHLineO.body) && r.appendChild(y.iHLineO.body),
            i.datas) {
                var h = i.labelMaxP - a / i.h * (i.labelMaxP - i.labelMinP);
                if (i.nu) {
                    var o = t.strUtil.nu(i.labelMaxP);
                    h /= o[0]
                }
                y.iToD({
                    mark: h,
                    x: s,
                    y: a,
                    ox: G.DIMENSION.posX,
                    oy: G.DIMENSION.H_T_T,
                    e: e
                })
            }
        }
        ;
        switch (x) {
        case "t":
            var it = K.tchartobject.t;
            d = it || ["LB", "TVOL", "MACD"];
            break;
        case "p":
            d = ["LB", "POSITION", "TVOL", "MACD"];
            break;
        default:
            var rt = K.tchartobject.k;
            d = rt || ot
        }
        var st, at, et, ht = "BLANKCTN", lt = function() {
            if (G.custom.tchart_tap && at && st) {
                var t = at.length;
                if (!(t > 2)) {
                    for (var i = t; i--; )
                        if (ht == String(at[i].name)) {
                            et = i;
                            break
                        }
                    if ("undefined" != typeof et || 2 != t) {
                        var r = d.length;
                        for (i = r; i--; )
                            if (st == d[i]) {
                                o.removeChart(),
                                ++i >= r && (i = 0);
                                var s = d[i];
                                o.createChart(1 == t ? {
                                    name: s
                                } : 0 == et ? [{
                                    name: ht
                                }, {
                                    name: s
                                }] : [{
                                    name: s
                                }, {
                                    name: ht
                                }]);
                                break
                            }
                    }
                }
            }
        }
        , nt = {
            edit: function(t) {
                o.createChart(t)
            },
            remove: function(t) {
                o.removeChart(t)
            }
        }, ct = function(i, r) {
            if (G.custom.allow_indicator_edit)
                if (q)
                    q.sendOriginalData({
                        name: i.name,
                        data: i.customArr,
                        defaultData: i.DEFAULT_ARR
                    }, nt),
                    q.show(r);
                else {
                    var s = G.custom.indicatorpanel_url;
                    K.ssl && (s = t.getSUrl(s, !0)),
                    q = new Y({
                        url: s,
                        z: 10001
                    },Q(ct, null , i, r))
                }
        }
        , ft = {
            fixIdctW: !0,
            stock: u,
            iTo: tt,
            iMgr: y,
            onClkTT: ct,
            h: G.DIMENSION.H_T_G,
            eh: G.DIMENSION.H_T_B,
            withHBg: !0,
            onClkMain: lt,
            usrObj: K,
            type: x,
            initMgr: Z
        };
        return o = new r
    }
    function Y(i, r) {
        function s(t, i) {
            for (var r in t)
                t.hasOwnProperty(r) && (t[r] = i + t[r])
        }
        var a = "sinafinancehtml5indicatorscfgpanel"
          , e = "sinatkchart_indicatorscfgpanel~"
          , h = {
            LOADED: "loaded",
            HIDE: "hide",
            REMOVE: "remove",
            EDIT: "edit",
            DRAGSTART: "dragstart",
            DRAGGING: "dragging",
            PICKCOLOR: "pickcolor",
            COLORPICKED: "colorpicked",
            OPEN: "open"
        };
        s(h, e);
        var o, l, n, c, f = 250, d = 0, u = 80, v = 35, p = 25;
        ht && (ht.onok = function(t, i) {
            o && o.contentWindow && o.contentWindow.postMessage(JSON.stringify({
                cmd: h.COLORPICKED,
                data: {
                    color: t.hex,
                    target: i
                }
            }), "*")
        }
        );
        var A = function(t) {
            var i;
            try {
                i = JSON.parse(t.data)
            } catch (t) {}
            if (i && i.cmd)
                switch (i.cmd) {
                case h.LOADED:
                    r && r();
                    break;
                case h.HIDE:
                    o.style.display = "none",
                    ht && ht.hide();
                    break;
                case h.REMOVE:
                case h.EDIT:
                    var s = i.cmd.split("~")[1];
                    l[s](i.data),
                    ht && ht.hide();
                    break;
                case h.DRAGSTART:
                    n = +o.style.left.replace(/[^0-9.]/g, ""),
                    c = +o.style.top.replace(/[^0-9.]/g, "");
                    break;
                case h.DRAGGING:
                    var a = i.data;
                    o.style.left = n + a.movedX + "px",
                    o.style.top = c + a.movedY + "px";
                    break;
                case h.PICKCOLOR:
                    a = i.data,
                    ht && ht.show(+a.x + +o.style.left.replace(/[^0-9.]/g, ""), +a.y + +o.style.top.replace(/[^0-9.]/g, ""), a.target, a.color)
                }
        }
          , m = function() {
            o || (o = t.iframer({
                attribute: {
                    id: a,
                    src: i.url
                },
                style: {
                    margin: "0 auto",
                    width: f + "px",
                    border: "1px solid #aaa",
                    position: "absolute",
                    zIndex: i.z
                }
            }),
            tt.addHandler(window, "message", A))
        }
        ;
        this.sendOriginalData = function(i, r) {
            if (o) {
                l = r;
                var s = Math.min(i.data.length || 1, 5);
                switch (d = u + v * s,
                i.name) {
                case "MA":
                case "VOLUME":
                case "TVOL":
                case "EXPMA":
                    d += p
                }
                o.style.height = d + "px",
                o.contentWindow && o.contentWindow.postMessage(JSON.stringify({
                    cmd: h.OPEN,
                    data: i
                }), "*"),
                t.stc(["inc", i.name].join("_"))
            }
        }
        ,
        this.show = function(i) {
            if (o) {
                var r, s;
                i.changedTouches ? (r = i.changedTouches[0].clientX,
                s = i.changedTouches[0].clientY) : (r = i.clientX,
                s = i.clientY);
                var a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                  , e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                s + d + 30 > a && (s = Math.max(a - d - 30, 1)),
                r + f + 3 > e && (r = 28),
                o.style.left = r + "px",
                o.style.top = (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) + s + "px",
                o.style.display = "",
                t.suda("show_indicator_param")
            }
        }
        ,
        m()
    }
    var q, Z = t.oc, J = t.$C, Q = t.fBind, tt = t.xh5_EvtUtil, it = i.xh5_ibPainter, rt = i.xh5_Canvas, st = t.xh5_PosUtil, at = t.dateUtil, et = t.bridge, ht = t.colorPicker, ot = ["VOLUME", "MACD", "KDJ", "RSI", "BOLL", "WR", "BBIBOLL", "SAR", "DMI", "EMV", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI", "VR", "BRAR"], lt = {}, nt = "ignore_", ct = nt + "istpre", ft = .4, dt = .5;
    r.prototype = {
        storageVer: "v1",
        STORAGE_PREFIX: "sinatkchart_indicators~",
        loadGlobalSetting: function() {
            var t = this;
            et.load({
                uid: [this.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                key: this.STORAGE_PREFIX + (this.sname || this.name) + "_" + this.storageVer
            }, function(i) {
                if (i) {
                    var r;
                    try {
                        r = JSON.parse(i)
                    } catch (s) {}
                    r && t.newParam(r, !0)
                }
            }, !0)
        },
        saveGlobalSetting: function(t) {
            et.save({
                uid: [this.cfg.uid, (new Date).getTime()].join("|"),
                key: this.STORAGE_PREFIX + (this.sname || this.name) + "_" + this.storageVer,
                value: t
            })
        },
        gdsd: function(t) {
            var i;
            if ("k" === this.proxyCfg.type)
                this.disMod = 1,
                this.tkProp.close = "close",
                i = t;
            else {
                this.disMod = this.cfg.datas.tDataLen,
                this.tkProp.close = "price",
                i = [];
                for (var r = 0, s = t.length; s > r; r++)
                    i = i.concat(t[r])
            }
            return i
        }
    },
    r.prototype.mr = function() {
        function i(t) {
            var i = a.h - t;
            if (i >= 0) {
                var r = "t" === a.proxyCfg.type ? a.cfg.DIMENSION.h_t : a.cfg.DIMENSION.h_k;
                if (1 > r + t)
                    return;
                a.h = i,
                e(t)
            }
        }
        function r() {
            var t = J("span");
            return t.style.display = "none",
            t.style.cursor = "row-resize",
            t.style.borderTop = "2px dotted #000",
            t.style.borderBottom = "2px dotted #000",
            t.style.width = "77px",
            t.style.height = "2px",
            t
        }
        var s, a = this, e = this.proxyCfg.initMgr.innerResize, h = .1, o = 40, l = void 0, n = function(t) {
            tt.preventDefault(t);
            var r = t.changedTouches ? t.changedTouches[0].pageY : t.pageY;
            isNaN(r) && (r = t.offsetY);
            var a = r - s;
            s = r,
            a && i(a)
        }
        , c = function() {
            tt.removeHandler(window, "mousemove", n),
            tt.removeHandler(window, "mouseup", c),
            tt.removeHandler(l, "touchmove", n),
            tt.removeHandler(l, "touchend", c),
            t.suda("indicator_reheight")
        }
        , f = function(i) {
            s = isNaN(i.pageY) ? i.offsetY : i.pageY,
            t.xh5_deviceUtil.istd ? (tt.addHandler(l, "touchend", c),
            tt.addHandler(l, "touchmove", n)) : (tt.addHandler(window, "mouseup", c),
            tt.addHandler(window, "mousemove", n),
            t.xh5_deviceUtil.allowt && (tt.addHandler(l, "touchend", c),
            tt.addHandler(l, "touchmove", n)))
        }
        , d = function() {
            l = J("div"),
            l.style.position = "absolute",
            l.style.right = a.cfg.DIMENSION.K_RIGHT_W + o + "px",
            l.style.color = "#000",
            l.style.opacity = h,
            l.style.zIndex = a.cfg.PARAM.I_Z_INDEX + 2,
            l.style.paddingTop = "3px",
            t.xh5_deviceUtil.istd ? tt.addHandler(l, "touchstart", f) : (tt.addHandler(l, "mousedown", f),
            t.xh5_deviceUtil.allowt && tt.addHandler(l, "touchstart", f),
            tt.addHandler(l, "mouseover", function() {
                l.style.opacity = 1
            }),
            tt.addHandler(l, "mouseout", function() {
                l.style.opacity = h
            }))
        }
        , u = function() {
            var t = new r;
            l.appendChild(t)
        }
        ;
        return d(),
        u(),
        l
    }
    ,
    r.prototype.rab = function() {
        function i(t) {
            var i = s.wrap
              , r = s.wrap.parentNode
              , a = n(i, t);
            a && ("-1" == t ? r.insertBefore(i, a) : r.insertBefore(a, i))
        }
        function r(t) {
            var i = J("span");
            return i.style.marginLeft = s.cfg.DIMENSION.K_RIGHT_W + "px",
            i.style.cursor = "pointer",
            i.innerHTML = t ? "\u25b2" : "\u25bc",
            i.setAttribute("data-dir", t ? "-1" : "1"),
            i
        }
        var s = this
          , a = .1
          , e = void 0
          , h = function(t) {
            tt.preventDefault(t);
            var r = t.target;
            if (r) {
                var s = r.getAttribute("data-dir");
                null !== s && i(s)
            }
        }
          , o = function() {
            e = J("div"),
            e.style.position = "absolute",
            e.style.right = s.cfg.DIMENSION.K_RIGHT_W + "px",
            e.style.color = "#000",
            e.style.opacity = a,
            e.style.zIndex = s.cfg.PARAM.I_Z_INDEX + 2,
            t.xh5_deviceUtil.istd ? tt.addHandler(e, "touchend", h) : (tt.addHandler(e, "click", h),
            t.xh5_deviceUtil.allowt && tt.addHandler(e, "touchend", h),
            tt.addHandler(e, "mouseover", function() {
                e.style.opacity = 1
            }),
            tt.addHandler(e, "mouseout", function() {
                e.style.opacity = a
            }))
        }
          , l = function() {
            var t = new r(!0)
              , i = new r;
            e.appendChild(t),
            e.appendChild(i)
        }
          , n = function(t, i) {
            var r;
            return r = -1 == i ? t.previousSibling : t.nextSibling,
            r && 0 == r.id.indexOf("blankctn_") && (r = null ),
            r
        }
        ;
        return o(),
        l(),
        e
    }
    ,
    r.prototype.ic = function(i) {
        var r = this.proxyCfg.iTo;
        this.h = isNaN(i.h) ? this.cfg.DIMENSION.h_k : i.h,
        this.customArr = t.clone(this.DEFAULT_ARR, null ),
        this.wrap = J("div"),
        this.selfCfg.ctnId && (this.wrap.id = this.selfCfg.ctnId),
        this.wrap.style.fontSize = this.wrap.style.lineHeight = this.cfg.STYLE.FONT_SIZE + "px";
        for (var s in this.proxyCfg.style)
            this.proxyCfg.style.hasOwnProperty(s) && (this.wrap.style[s] = this.proxyCfg.style[s]);
        if (this.proxyCfg.titleCtn)
            this.titleCtn = this.proxyCfg.titleCtn;
        else if (!this.isBlank) {
            this.titleCtn = J("div"),
            this.titleCtn.style.position = "absolute",
            this.titleCtn.style.zIndex = this.cfg.PARAM.I_Z_INDEX + 1;
            var a = this;
            if (tt.addHandler(this.titleCtn, "touchstart", function(t) {
                a.cfg.custom.touch_prevent && tt.preventDefault(t)
            }),
            this.titleCtn.style.width = "100%",
            !this.cfg.PARAM.isFlash) {
                if (this.cfg.custom.indicator_reorder) {
                    var e = this.rab();
                    this.titleCtn.appendChild(e)
                }
                if (this.cfg.custom.indicator_reheight) {
                    var h = this.mr();
                    this.titleCtn.appendChild(h)
                }
            }
            this.wrap.appendChild(this.titleCtn)
        }
        this.isBlank ? this.wrap.style.height = this.h + "px" : (this.line = new it({
            setting: this.cfg,
            sd: this,
            withHBg: this.proxyCfg.withHBg,
            reO: {
                h: this.h,
                mh: this.mh,
                eh: this.eh
            },
            nu: this.nu,
            dt: !1,
            iMgr: this.proxyCfg.iMgr,
            iTo: Q(r, null , this),
            iClk: this.proxyCfg.onClkMain
        }),
        !isNaN(this.proxyCfg.lz) && (this.line.getCanvas().style.zIndex = this.proxyCfg.lz),
        this.wrap.appendChild(this.line.getWrap())),
        this.proxyCfg.ctn && this.proxyCfg.ctn.appendChild(this.wrap)
    }
    ,
    r.prototype.initAndCalcAll = function() {}
    ,
    r.prototype.resize = function(t) {
        this.h = t.h,
        this.mh = t.mh,
        this.eh = t.eh,
        this.line && this.line.resize({
            h: this.h,
            mh: this.mh,
            eh: this.eh
        })
    }
    ,
    r.prototype.getFromToM = new function() {
        this.reset = function(t) {
            var i = t.loadedFlag;
            if (i)
                for (var r in i)
                    i.hasOwnProperty(r) && (i[r] = null ,
                    delete i[r]);
            t.loadedFromTo = void 0
        }
        ,
        this.get = function(t) {
            if (!t.viewState.startDate || !t.viewState.endDate)
                return !1;
            var i = t.loadedFlag
              , r = t.loadedFromTo
              , s = 1989
              , a = 2099;
            if (r) {
                if (s >= r[0])
                    return;
                a = r[0]
            }
            t.loadedFromTo = [s, a];
            var e = i["_" + s]
              , h = i["_" + a];
            if (e && h)
                return !1;
            for (h ? a -= 1 : e && (s += 1),
            e = [s, "01", "01"].join("-"),
            h = [a, "12", "31"].join("-"); a >= s; )
                i["_" + s++] = !0;
            return [e, h]
        }
    }
    ,
    r.prototype.loadUrlData = function() {
        var i = this.getFromToM.get(this);
        if (i) {
            var r = i[0]
              , s = i[1]
              , a = this.aliasymbol || this.symbol
              , e = "_" + a + "_" + (new Date).getDate()
              , h = this.selfDataUrl.replace("$symbol", a).replace("$cb", "var%20" + e + "=").replace("$from", r).replace("$to", s);
            this.proxyCfg.usrObj.ssl && (h = t.getSUrl(h, !0));
            var o = this;
            t.load(h, function() {
                var i = window[e];
                window[e] = null ,
                o.urlData || (o.urlData = {
                    day: [],
                    week: [],
                    month: []
                });
                var r = o.df(i)
                  , s = o.urlData.day;
                if (s.length > 1) {
                    for (var a = s[0].date, h = r.length; h-- && !(r[h].date.getFullYear() == a.getFullYear() && r[h].date.getMonth() == a.getMonth() && r[h].date.getDate() < a.getDate()); )
                        ;
                    r.splice(h + 1, r.length - h - 1)
                }
                s.splice.apply(s, [0, 0].concat(r));
                var l, n, c = [], f = [], d = s.length, u = s[0], v = {}, p = {}, A = {};
                for (l = o.customArr.length; l--; )
                    A[o.customArr[l].prop] = void 0;
                A.date = void 0;
                for (n in A)
                    A.hasOwnProperty(n) && (t.isDate(u[n]) ? (v[n] = u[n],
                    p[n] = u[n]) : (v[n] = 1 * u[n],
                    p[n] = 1 * u[n]));
                if (1 == d)
                    c.push(v),
                    f.push(p);
                else {
                    for (l = 1; d > l; l++) {
                        u = s[l],
                        at.gw(s[l - 1].date, u.date) || (c.push(v),
                        v = {});
                        for (n in A)
                            A.hasOwnProperty(n) && (v[n] = t.isDate(u[n]) ? u[n] : (1 * v[n] || 0) + 1 * u[n]);
                        at.gm(s[l - 1].date, u.date) || (f.push(p),
                        p = {});
                        for (n in A)
                            A.hasOwnProperty(n) && (p[n] = t.isDate(u[n]) ? u[n] : (1 * p[n] || 0) + 1 * u[n])
                    }
                    c.push(v),
                    f.push(p)
                }
                o.urlData.week = c,
                o.urlData.month = f,
                o.toReCalc = !0,
                o.cb(o)
            })
        }
    }
    ,
    r.prototype.newData = function(t, i, r) {
        if (t && !(t.length < 1)) {
            var s = t[t.length - 1];
            if (168 == r && at.gw(s.date, i.date) || 720 == r && at.gm(s.date, i.date))
                return void (s.date = i.date);
            for (var a, e = {}, h = this.customArr.length; h--; )
                a = this.customArr[h].prop,
                e[a] = i[a] || 0;
            e.date = i.date,
            t.push(e)
        }
    }
    ,
    r.prototype.updateData = function(i, r, s, a) {
        if (r && !(r.length < 1)) {
            var e = r[r.length - 1];
            if (a) {
                if (!at.stbd(e.date, i.date))
                    return i.date > e.date ? void this.newData(r, i, s) : void 0;
                if (!t.kUtil.spk(e.time, i.time, "00:00", s))
                    return void this.newData(r, i, s)
            } else if (!at.stbd(i.date, e.date))
                return i.date > e.date ? void this.newData(r, i, s) : void 0;
            e = r[r.length - 1];
            for (var h, o = this.customArr.length; o--; ) {
                h = this.customArr[o].prop;
                var l = Number(i[h]);
                if (t.isNum(i[h]))
                    switch (s) {
                    case 167:
                    case 168:
                    case 169:
                    case 719:
                    case 720:
                    case 721:
                        e[h] += i[h + "update"] || 0;
                        break;
                    default:
                        e[h] = l
                    }
            }
        }
    }
    ,
    r.prototype.doUpdate = function(t) {
        t && this.urlData && (this.urlData.day && this.updateData(t, this.urlData.day, 24),
        this.urlData.week && this.updateData(t, this.urlData.week, 168),
        this.urlData.month && this.updateData(t, this.urlData.month, 720),
        this.toReCalc = !0,
        this.cb(this))
    }
    ,
    r.prototype.udf = function(t) {
        return t
    }
    ,
    r.prototype.update = function() {
        if (this.selfDataUrlUpdate && !(++this.updateCount < this.UPDATE_THRESHOLD)) {
            this.updateCount >= this.UPDATE_THRESHOLD && (this.updateCount = 0);
            var i = at.ddt(this.viewState.startDate).getFullYear()
              , r = at.ddt(this.viewState.endDate).getFullYear()
              , s = [i, 1, 1].join("-")
              , a = [r, 12, 31].join("-")
              , e = this.aliasymbol || this.symbol
              , h = "_" + e + (new Date).getTime()
              , o = this.selfDataUrlUpdate.replace("$symbol", e).replace("$cb", "var%20" + h + "=").replace("$from", s).replace("$to", a);
            this.proxyCfg.usrObj.ssl && (o = t.getSUrl(o, !0));
            var l = this;
            t.load(o, function() {
                var t = window[h];
                window[h] = null ;
                var i = l.udf(t);
                i && l.doUpdate(i)
            })
        }
    }
    ,
    r.prototype.createPlayingData = function() {
        if (this.datas)
            for (var t, i = this.labelMaxP - this.labelMinP, r = 0, s = this.datas.length; s > r; r++) {
                t = this.datas[r];
                for (var a = this.customArr.length; a--; ) {
                    var e = this.customArr[a].prop;
                    t[e + "y"] = this.h * (this.labelMaxP - t[e]) / i
                }
            }
    }
    ,
    r.prototype.setPricePos = function(t) {
        !t || this.separate > 0 ? (this.labelMinP = this.minPrice,
        this.labelMaxP = this.maxPrice) : (this.labelMaxP = t[0],
        this.labelMinP = t[1],
        this.pricePosArr = t),
        this.createPlayingData()
    }
    ,
    r.prototype.generateSettings = function() {
        if (this.param && this.param.length > 0)
            for (var i = 0, r = Math.min(this.param.length, this.DEFAULT_ARR.length); r > i; i++) {
                var s = this.param[i]
                  , a = Number(s.v);
                this.customArr[i].v = a > 0 ? a : this.DEFAULT_ARR[i].v,
                this.customArr[i].color = t.isColor(s.color) ? s.color : this.DEFAULT_ARR[i].color
            }
    }
    ,
    r.prototype.newParam = function(i, r) {
        var s = this.sname || this.name
          , a = !1;
        if (i ? (lt[s] = i,
        t.stc("np_" + s, i)) : (a = !0,
        i = lt[s]),
        this.param = i,
        this.generateSettings(),
        this.genIndicator(this.customArr, this.asPChart ? "" : this.alias || this.name),
        r) {
            var e = this.cfg.datas.isT ? this.proxyCfg.stock.tDb.get() : this.proxyCfg.stock.kDb.get();
            return void (e && (this.initAndCalcAll(e),
            this.asPChart ? this.setPricePos(this.pricePosArr) : this.drawCalc(),
            this.draw(!0)))
        }
        if (this.cfg.custom.storage_lv > 0)
            if (i) {
                if (a)
                    return;
                this.cfg.custom.storage_lv > 1 && this.saveGlobalSetting(i)
            } else
                this.loadGlobalSetting()
    }
    ,
    r.prototype.syncI = function() {
        if (this.datas && this.proxyCfg.iMgr)
            if (this.proxyCfg.iMgr.isIng())
                this.proxyCfg.iMgr.isMoving() && this.indicatorI(this.datas[this.datas.length - 1]);
            else if ("t" != this.proxyCfg.type)
                this.indicatorI(this.datas[this.datas.length - 1]);
            else if (this.proxyCfg.stock)
                if (5 == this.proxyCfg.stock.viewState.end) {
                    var t;
                    t = this.proxyCfg.stock.realLen >= 0 ? this.proxyCfg.stock.realLen >= this.disMod ? 0 == this.proxyCfg.stock.realLen ? 0 : this.proxyCfg.stock.realLen - 1 : this.proxyCfg.stock.realLen : this.disMod - 1,
                    4 != this.proxyCfg.stock.viewState.start && (t = (this.proxyCfg.stock.viewState.end - this.proxyCfg.stock.viewState.start - 1) * this.disMod + t),
                    this.indicatorI(this.datas[t])
                } else
                    this.indicatorI(this.datas[this.datas.length - 1])
    }
    ,
    r.prototype.setRange = function() {
        if (this.datas) {
            for (var t = this.viewState.start * this.disMod, i = this.viewState.end * this.disMod, r = i - t; this.datas.length > r; )
                this.datas.length--;
            for (; this.datas.length < r; )
                this.datas.push({});
            for (var s = Number.MAX_VALUE, a = -Number.MAX_VALUE, e = t; i > e; e++) {
                var h = this.datas[e - t];
                if (h.date = this.oriArr[e].date,
                !this.selfArr[e] || !this.selfArr[e][ct])
                    for (var o in this.selfArr[e])
                        if (this.selfArr[e].hasOwnProperty(o)) {
                            if (h[o] = this.selfArr[e][o],
                            0 == o.indexOf(nt))
                                continue;h[o] > a && (a = h[o]),
                            h[o] < s && (s = h[o])
                        }
            }
            this.minPrice = s,
            this.maxPrice = a,
            this.syncI()
        }
    }
    ,
    r.prototype.drawCalc = function() {
        if (this.datas) {
            for (var t = this.viewState.start * this.disMod, i = this.viewState.end * this.disMod, r = i - t; this.datas.length > r; )
                this.datas.length--;
            for (; this.datas.length < r; )
                this.datas.push({});
            var s, a, e = Number.MAX_VALUE, h = -Number.MAX_VALUE;
            for (s = t; i > s; s++)
                if (a = this.datas[s - t],
                a.date = this.oriArr[s].date,
                !this.selfArr[s] || !this.selfArr[s][ct])
                    for (var o in this.selfArr[s])
                        if (this.selfArr[s].hasOwnProperty(o)) {
                            if (a[o] = this.selfArr[s][o],
                            0 == o.indexOf(nt))
                                continue;a[o] > h && (h = a[o]),
                            a[o] < e && (e = a[o])
                        }
            switch (this.name) {
            case "ADL":
            case "MACD":
                h = Math.max(Math.abs(h), Math.abs(e)),
                e = -h;
                break;
            case "BIAS":
            case "BRAR":
            case "DMA":
            case "EMV":
            case "KDJ":
            case "ROC":
            case "VR":
            case "WVAD":
                this.vaObj.min = e,
                this.vaObj.max = h;
                break;
            case "CCI":
                e > 0 && (e = 0),
                0 > h && (h = 0),
                this.vaObj.min = e,
                this.vaObj.max = h;
                break;
            case "TOR":
                e = 0;
                break;
            default:
                this.vaObj && (h = this.vaObj.max,
                e = this.vaObj.min)
            }
            this.labelMaxP = h,
            this.labelMinP = e;
            var l = h - e;
            for (s = 0; r > s; s++) {
                a = this.datas[s];
                for (var n = this.customArr.length; n--; ) {
                    var c = this.customArr[n].prop;
                    a[c + "y"] = this.h * (h - a[c]) / l
                }
            }
            this.syncI()
        }
    }
    ,
    r.prototype.clearDraw = function() {
        this.line.clear(!1),
        this.interact(0 / 0)
    }
    ,
    r.prototype.draw = function(t, i) {
        if (this.__iOffsetX = isNaN(i) ? this.__iOffsetX : i,
        this.datas) {
            this.line.clear(!0, this.cfg.PARAM.getHd());
            var r, s, a = this.datas.length;
            this.cfg.datas.isT ? (r = this.cfg.DIMENSION.w_t / a,
            s = r * dt) : (r = this.cfg.DIMENSION.w_k / Math.max(a, this.cfg.PARAM.minCandleNum),
            s = this.__iOffsetX - r * ft);
            for (var e, h = this.customArr.length; h--; ) {
                var o = this.customArr[h].prop + "y";
                e = s,
                this.line.newStyle(this.customArr[h].color, !0, this.lw);
                for (var l = 0; a > l; l++)
                    0 == l ? this.line.moveTo(e, this.datas[l][o]) : this.line.lineTo(e, this.datas[l][o]),
                    e += r;
                this.line.stroke()
            }
            t && this.line.drawBg(this.__iOffsetX),
            this.vaObj && this.drawValueRange()
        }
    }
    ,
    r.prototype.drawValueRange = function() {
        var i = this.line.getG();
        i.globalCompositeOperation = "destination-over";
        var r = this.vaObj.min
          , s = this.vaObj.max
          , a = s - r;
        if (!isNaN(this.vaObj.upper) && !isNaN(this.vaObj.lower)) {
            var e = this.vaObj.upper
              , h = this.vaObj.lower
              , o = this.h * (s - e) / a
              , l = this.h * (s - h) / a
              , n = l - o;
            i.fillStyle = t.hex2dec(this.customArr[0].color, .2),
            i.fillRect(0, o, this.cfg.DIMENSION.w_k, n)
        }
        var c = this.h * (isNaN(this.vaObj.glv) ? s / 2 : s - this.vaObj.glv) / a;
        c += .5,
        this.line.newStyle(this.cfg.COLOR.GRID, !0, 1),
        this.line.moveTo(0, c),
        this.line.lineTo(this.cfg.DIMENSION.w_k, c),
        i.stroke()
    }
    ,
    r.prototype.genIdctParam = function(t) {
        t = t || {};
        var i = isNaN(t.width) ? this.proxyCfg.titleW || this.cfg.DIMENSION.getStageW() : t.width
          , r = isNaN(t.height) ? this.cfg.DIMENSION.H_T_T || 14 : t.height;
        return {
            hd: this.cfg.PARAM.getHd(),
            width: i,
            height: r
        }
    }
    ,
    r.prototype.genTitleCanvas = function(i) {
        function r() {
            var r = new rt
              , s = r.g
              , o = a.cfg.datas.isT;
            if (this.canvas = r.canvas,
            t.isFunc(a.proxyCfg.onClkTT)) {
                var l = t.xh5_deviceUtil.istd ? "touchend" : "click";
                tt.addHandler(this.canvas, l, Q(a.proxyCfg.onClkTT, null , a));
                var n = this.canvas.style;
                n.cursor = "pointer",
                n.position = "relative",
                n.zIndex = a.cfg.PARAM.I_Z_INDEX + 1
            }
            var c = function(t, i) {
                r.resize(a.genIdctParam({
                    width: t,
                    height: i
                })),
                s.font = a.cfg.STYLE.FONT_SIZE + "px " + a.cfg.STYLE.FONT_FAMILY,
                s.textBaseline = "top"
            }
              , f = 9
              , d = 13
              , u = 2;
            this.setTxt = function(r) {
                var l = a.cfg.DIMENSION.posX
                  , n = o ? a.cfg.DIMENSION.w_t : a.cfg.DIMENSION.w_k
                  , v = a.cfg.DIMENSION.extend_draw
                  , p = s.measureText(i).width
                  , A = a.cfg.DIMENSION.getStageW()
                  , m = .35 * A
                  , g = "TFLOW" == a.name && 400 > n ? 55 : 80
                  , y = a.cfg.DIMENSION.H_T_T;
                u > y && (y = 14);
                var b = 1;
                if (r) {
                    for (var w, D, _, M = l + (p > 0 ? f : 0), O = [], T = r.length, S = 0; T > S; S++)
                        if (w = r[S],
                        w.t || !isNaN(w.n)) {
                            switch (D = (w.t ? w.t + ": " : "") + (isNaN(w.n) ? "--" : t.strUtil.ps(w.n, h.nfloat)),
                            a.name) {
                            case "TFLOW":
                                S == r.length - 1 && (D += "\u5143");
                                break;
                            case "TZY":
                            case "TZYS":
                                D += "%"
                            }
                            _ = e ? Math.max(g, s.measureText(D).width || 0) : s.measureText(D).width || 0,
                            O.push({
                                str: D,
                                w: _,
                                color: w.c
                            }),
                            M += _ + d
                        }
                    M -= d;
                    var I = Math.ceil(M / n);
                    I > T && (I = T),
                    I > 1 ? (y *= I,
                    M = A) : M = Math.floor(Math.max(M, m)),
                    M = Math.min(A, M);
                    var C;
                    v ? (C = l,
                    a.cfg.DIMENSION.H_T_T < u && (C += a.cfg.DIMENSION.W_T_L),
                    c(M, y)) : (c(M, y),
                    a.cfg.DIMENSION.H_T_T > u - 1 && (s.textAlign = "right",
                    s.fillStyle = a.cfg.COLOR.T_T,
                    s.fillText(i, l, b)),
                    C = l + (p > 0 ? f : 0)),
                    s.textAlign = "left";
                    for (var N = C, R = 0, x = O.length; x > R && (w = O[R],
                    s.fillStyle = w.color,
                    s.fillText(w.str, C, b),
                    C += w.w + d,
                    !(R >= x - 1)); R++)
                        C - l + O[R + 1].w > n && (b += a.cfg.STYLE.FONT_SIZE,
                        C = N)
                } else
                    a.cfg.DIMENSION.H_T_T < u && (l += a.cfg.DIMENSION.W_T_L),
                    c(l, y),
                    s.fillStyle = a.cfg.COLOR.T_T,
                    s.textAlign = v ? "left" : "right",
                    s.fillText(i, l, b)
            }
            ,
            this.setTxt()
        }
        function s() {
            var r = J("div");
            this.canvas = r;
            var s = J("div");
            s.style.cssFloat = "left",
            s.style.textAlign = "right",
            s.style.marginRight = "9px",
            s.style.overflow = "hidden";
            var e = J("div");
            r.appendChild(s),
            r.appendChild(e);
            var o = r.style;
            t.isFunc(a.proxyCfg.onClkTT) && (t.xh5_deviceUtil.istd ? tt.addHandler(r, "click", Q(a.proxyCfg.onClkTT, null , a)) : (tt.addHandler(r, "click", Q(a.proxyCfg.onClkTT, null , a)),
            t.xh5_deviceUtil.allowt && tt.addHandler(r, "touchend", Q(a.proxyCfg.onClkTT, null , a))),
            o.cursor = "pointer",
            o.position = "relative",
            o.zIndex = a.cfg.PARAM.I_Z_INDEX + 1);
            var l = a.cfg.datas.isT;
            this.setTxt = function(r) {
                var n = l ? a.cfg.DIMENSION.w_t : a.cfg.DIMENSION.w_k
                  , c = "TFLOW" == a.name ? 400 : 350
                  , f = c > n ? 55 : 80
                  , d = a.cfg.DIMENSION.extend_draw;
                s.style.width = e.style.marginLeft = a.cfg.DIMENSION.posX + "px",
                o.color = a.cfg.COLOR.T_T,
                o.fontSize = a.cfg.STYLE.FONT_SIZE + "px",
                o.fontFamily = a.cfg.STYLE.FONT_FAMILY;
                var u = i || "";
                if (r) {
                    d ? (s.innerHTML = "",
                    a.cfg.DIMENSION.H_T_T < 2 && (e.style.marginLeft = "50px")) : s.innerHTML = a.cfg.DIMENSION.H_T_T > 1 ? u : "",
                    e.innerHTML = "";
                    for (var v, p, A, m = 0, g = r.length; g > m; m++)
                        if (p = r[m],
                        p.t || !isNaN(p.n)) {
                            switch (a.name) {
                            case "DPDK":
                            case "TZY":
                                return;
                            case "TZYS":
                            case "DPDKS":
                            case "SAR":
                                if ("SAR" == a.name) {
                                    if (!a.asPChart && "SAR" != p.t)
                                        continue
                                } else if ("DPDKS" == a.name && "mn" == p.t)
                                    continue;var y = "<span style='color:#000;'>--";
                                switch (p.t) {
                                case "SAR":
                                    y += "</span>";
                                    break;
                                default:
                                    y += "%</span>"
                                }
                                if (A = (p.t ? p.t + ": " : "") + y,
                                !isNaN(p.n)) {
                                    A = A.replace("--", t.strUtil.ps(p.n, h.nfloat));
                                    var b;
                                    b = "DPDK" == a.name || "SAR" == p.t ? p.c : p.n > 0 ? a.cfg.COLOR.K_RISE : p.n < 0 ? a.cfg.COLOR.K_FALL : a.cfg.COLOR.K_N,
                                    A = A.replace("#000", b)
                                }
                                break;
                            case "VOLUME":
                            case "TVOL":
                            case "MA":
                                A = (p.t ? p.t + ": " : "") + (isNaN(p.n) ? 0 : p.n.toFixed(h.nfloat));
                                break;
                            default:
                                A = (p.t ? p.t + ": " : "") + (isNaN(p.n) ? "--" : t.strUtil.ps(p.n, h.nfloat)),
                                "TFLOW" == a.name && m == r.length - 1 && (A += "\u5143")
                            }
                            v = 11,
                            e.innerHTML += "<span style='float:left;min-width:" + f + "px;margin-right:" + v + "px;color:" + p.c + "'>" + A + "</span>"
                        }
                } else
                    s.innerHTML = d ? "" : u,
                    e.innerHTML = ""
            }
            ,
            this.setTxt()
        }
        var a = this
          , e = this.proxyCfg.fixIdctW
          , h = this.proxyCfg.usrObj;
        return a.cfg.custom.indicator_cvs_title ? new r : new s
    }
    ,
    r.prototype.genIndicator = function(t, i) {
        if (t) {
            this.indicatorArr = [];
            for (var r = 0, s = t.length; s > r; r++)
                this.indicatorArr.push(t[r]);
            this.titleO || (this.titleO = this.genTitleCanvas(i),
            this.titleCtn.appendChild(this.titleO.canvas))
        }
    }
    ,
    r.prototype.indicatorI = function(t) {
        if (this.indicatorArr) {
            for (var i, r, s = [], a = 0, e = this.indicatorArr.length; e > a; a++)
                i = this.indicatorArr[a],
                r = t[i.prop],
                "t" == this.proxyCfg.type && ("volume" == i.prop || /^tvol\w+$/.test(i.prop)) && t[i.prop] < 0 && (r = 0),
                s.push({
                    n: r,
                    c: i.color,
                    t: i.idct
                });
            return this.titleO && this.titleO.setTxt(s),
            s
        }
    }
    ,
    r.prototype.interact = function(t) {
        return !isNaN(t) && this.datas && this.datas.length ? (t >= this.datas.length && (t = this.datas.length - 1),
        this.indicatorI(this.datas[t])) : (this.titleO && this.titleO.setTxt(null ),
        null )
    }
    ,
    r.prototype.rfs = function() {
        this.selfCfg.allowrfs ? (this.titleO && t.domGc(this.titleO.canvas),
        t.domGc(this.wrap),
        clearInterval(this.updateId)) : this.wrap.style.display = "none"
    }
    ;
    var ut = function() {
        function t(t) {
            return null === t ? "Null" : void 0 === t ? "Undefined" : r.call(t).slice(8, -1)
        }
        function i(t, i, r) {
            switch (t) {
            case "+":
                return i + r;
            case "-":
                return i - r;
            case "*":
                return i * r;
            case "/":
                return r ? i / r : null
            }
        }
        var r = Object.prototype.toString
          , s = Math.min
          , a = Math.max
          , e = Math.abs
          , h = function(t, i, r) {
            if (i) {
                for (var s = [], a = 0, e = t.length; e > a; a++)
                    s.push(r ? r(t[a][i]) : t[a][i]);
                return s
            }
            return t
        }
          , o = function(t) {
            for (var i = 0, r = t.length; r--; )
                i += t[r];
            return i
        }
          , l = function(t, i) {
            for (var r, s = [], a = 0, e = 0, h = t.length; h > a; a++)
                t[a] && (e += t[a]),
                a >= i - 1 ? (r = e / i,
                t[a - i + 1] && (e -= t[a - i + 1])) : r = e / (a + 1),
                s.push(r);
            return s
        }
          , n = function(t, i) {
            for (var r = [t[0]], s = 1, a = t.length; a > s; s++)
                r.push((2 * t[s] + (i - 1) * r[s - 1]) / (i + 1));
            return r
        }
          , c = function(t, i, r) {
            for (var s = [t[0]], a = 1, e = t.length; e > a; a++)
                s.push((r * t[a] + (i - r) * s[a - 1]) / i);
            return s
        }
          , f = function(t, i) {
            for (var r = [], s = 0; i > s; s++)
                r.push(null );
            for (var a = t.length; a > s; s++)
                r.push(t[s - i]);
            return r
        }
          , d = function(t, i, r, s) {
            function a(t) {
                if (!(t >= n))
                    if (c[t] = Math.min.apply(null , l.slice(t - i, t)),
                    u[t] = 1,
                    c[t] > l[t])
                        e(t + 1);
                    else
                        for (d[t] = Math.max.apply(null , o.slice(t - i + 1, t + 1)),
                        f[t] = r; n - 1 > t; ) {
                            if (c[t + 1] = c[t] + f[t] * (d[t] - c[t]) / 100,
                            u[t + 1] = 1,
                            c[t + 1] > l[t + 1])
                                return void e(t + 2);
                            d[t + 1] = Math.max.apply(null , o.slice(t - i + 2, t + 2)),
                            o[t + 1] > d[t] ? (f[t + 1] = f[t] + r,
                            f[t + 1] > s && (f[t + 1] = s)) : f[t + 1] = f[t],
                            t++
                        }
            }
            function e(t) {
                if (!(t >= n)) {
                    if (c[t] = Math.max.apply(null , o.slice(t - i, t)),
                    u[t] = 0,
                    c[t] < o[t])
                        return void a(t + 1);
                    for (d[t] = Math.min.apply(null , l.slice(t - i + 1, t + 1)),
                    f[t] = r; n - 1 > t; ) {
                        if (c[t + 1] = c[t] + f[t] * (d[t] - c[t]) / 100,
                        u[t + 1] = 0,
                        c[t + 1] < o[t + 1])
                            return void a(t + 2);
                        d[t + 1] = Math.min.apply(null , l.slice(t - i + 2, t + 2)),
                        l[t + 1] < d[t] ? (f[t + 1] = f[t] + r,
                        f[t + 1] > s && (f[t + 1] = s)) : f[t + 1] = f[t],
                        t++
                    }
                }
            }
            var o = h(t, "high")
              , l = h(t, "low")
              , n = t.length
              , c = []
              , f = []
              , d = []
              , u = [];
            return o[i] > o[0] || l[i] > l[0] ? a(i) : e(i),
            {
                data: c,
                direction: u
            }
        }
          , u = function(t) {
            for (var i = 0, r = t.length, s = r; s--; )
                i += t[s];
            return i / r
        }
          , v = function(t, i) {
            for (var r = u(t), s = t.length, a = 0, e = s; e--; )
                a += Math.pow(t[e] - r, 2);
            return Math.sqrt(a / (i ? s - i : s))
        }
          , p = function(t, i) {
            for (var r = [], s = 0, a = t.length; a > s; s++)
                r.push(i > s ? v(t.slice(0, s + 1), 1) : v(t.slice(s - i + 1, s + 1), 1));
            return r
        }
          , A = function(t) {
            for (var i = u(t), r = 0, s = t.length, a = s; a--; )
                r += e(t[a] - i);
            return r / s
        }
          , m = function(t, i) {
            for (var r = [], s = 0, a = t.length; a > s; s++)
                r.push(i > s ? A(t.slice(0, s + 1)) : A(t.slice(s - i + 1, s + 1)));
            return r
        }
          , g = function(t, i) {
            for (var r = [], s = t.length, e = a.apply(null , t), h = 0; s > h; h++)
                r.push(i ? a.apply(null , i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)) : e);
            return r
        }
          , y = function(t, i) {
            for (var r = [], a = t.length, e = s.apply(null , t), h = 0; a > h; h++)
                r.push(i ? s.apply(null , i > h ? t.slice(0, h + 1) : t.slice(h - i + 1, h + 1)) : e);
            return r
        }
          , b = function(i) {
            switch (t(i)) {
            case "Number":
                return e(i);
            case "Array":
                for (var r = [], s = 0, a = i.length; a > s; s++)
                    r.push(e(i[s]));
                return r;
            default:
                throw new Error("argument of Function calcABS was error!")
            }
        }
          , w = function(i, r) {
            var s, e, h;
            switch (t(i)) {
            case "Array":
                switch (t(r)) {
                case "Array":
                    for (s = [],
                    e = 0,
                    h = i.length; h > e; e++)
                        s.push(a(i[e], r[e]));
                    return s;
                case "Number":
                    for (s = [],
                    e = 0,
                    h = i.length; h > e; e++)
                        s.push(a(i[e], r));
                    return s;
                default:
                    throw new Error("argument of Function calcMAX was error!")
                }
                break;
            case "Number":
                switch (t(r)) {
                case "Array":
                    for (s = [],
                    e = 0,
                    h = r.length; h > e; e++)
                        s.push(a(i, r[e]));
                    return s;
                case "Number":
                    return a(i, r);
                default:
                    throw new Error("argument of Function calcMAX was error!")
                }
                break;
            default:
                throw new Error("argument of Function calcMAX was error!")
            }
        }
          , D = function(t, i) {
            var r = [];
            if (i)
                for (var s = 0, a = t.length; a > s; s++)
                    r.push(o(i > s ? t.slice(0, s + 1) : t.slice(s - i + 1, s + 1)));
            else {
                var e = 0;
                for (s = 0,
                a = t.length; a > s; s++)
                    e += t[s],
                    r.push(e)
            }
            return r
        }
          , _ = function(r, s, a) {
            var e, h, o = [], l = r.length;
            switch (t(s)) {
            case "Array":
                for (h = s.length,
                e = 0; l > e; e++)
                    o.push("Number" == t(r[e]) && "Number" == t(s[e]) ? i(a, r[e], s[e]) : null );
                for (; o.length < h; )
                    o.push(null );
                break;
            case "Number":
                for (e = 0; l > e; e++)
                    o.push("Number" == t(r[e]) ? i(a, r[e], s) : null );
                break;
            default:
                throw Error("the Second argument of Function operateArr is wrong!")
            }
            return o
        }
        ;
        return {
            getArr: h,
            calcMA: l,
            calcEMA: n,
            calcSMA: c,
            calcREF: f,
            calcSAR: d,
            calcA: u,
            calcSD: v,
            calcSTD: p,
            calcAVEDEV: m,
            calcHHV: g,
            calcLLV: y,
            calcABS: b,
            calcMAX: w,
            calcSUM: D,
            operateArr: _
        }
    }();
    t.fInherit(s, r),
    t.fInherit(a, r),
    t.fInherit(e, r),
    t.fInherit(h, r),
    t.fInherit(o, r),
    t.fInherit(l, r),
    t.fInherit(n, r),
    t.fInherit(c, r),
    t.fInherit(f, r),
    t.fInherit(d, r),
    t.fInherit(u, r),
    t.fInherit(v, r),
    t.fInherit(p, r),
    t.fInherit(A, r),
    t.fInherit(m, A),
    t.fInherit(g, r),
    t.fInherit(y, r),
    t.fInherit(b, r),
    t.fInherit(w, r),
    t.fInherit(D, r),
    t.fInherit(_, r),
    t.fInherit(M, r),
    t.fInherit(O, r),
    t.fInherit(T, r),
    t.fInherit(S, r),
    t.fInherit(I, _),
    t.fInherit(C, r),
    t.fInherit(N, r),
    t.fInherit(R, r),
    t.fInherit(x, r),
    t.fInherit(P, r),
    t.fInherit(k, r),
    t.fInherit(E, r),
    t.fInherit(L, r),
    t.fInherit(U, r),
    t.fInherit(F, r),
    t.fInherit(H, L),
    t.fInherit(X, r),
    t.fInherit(B, X),
    t.fInherit(V, r),
    t.fInherit(j, r),
    t.fInherit($, r),
    t.fInherit(W, r),
    t.fInherit(z, r);
    var vt = function() {
        var i = function(t) {
            var i = function() {
                for (var t, i, r = {
                    BF: o
                }, s = [{
                    h: "http://127.0.0.1",
                    a: r
                }, {
                    h: "http://localhost",
                    a: r
                }, {
                    h: "http://xuan.sina.com.cn",
                    a: r
                }, {
                    h: "http://tmp.sina.com.cn",
                    a: r
                }, {
                    h: "https://touzi.sina.cn/",
                    a: r
                }, {
                    h: "http://touzi.sina.cn/",
                    a: r
                }, {
                    h: "https://touzi.sina.com.cn/",
                    a: r
                }, {
                    h: "http://touzi.sina.com.cn/",
                    a: r
                }], a = document.location.href, e = s.length; e--; )
                    if (i = s[e],
                    0 === a.indexOf(i.h)) {
                        t = i.a;
                        break
                    }
                return t
            }
              , r = i();
            if (r && t)
                for (var s in r)
                    r.hasOwnProperty(s) && (t[s] = r[s])
        }
          , r = function(i, r) {
            var s = i.name
              , a = i.param
              , e = r ? "r_" : "s_";
            t.stc(e + s, a)
        }
        ;
        return {
            doStc: r,
            auth: i
        }
    }();
    return new function() {
        this.VER = "6.5.1",
        this.get = function(i, r) {
            t.isFunc(r) && r({
                tChart: K,
                pChart: G
            })
        }
    }
});
