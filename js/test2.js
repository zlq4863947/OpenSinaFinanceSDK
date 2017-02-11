xh5_define("chart.h5t", ["cfgs.settinger", "utils.util", "utils.painter"],
function(e, t, a) {
    "use strict";
    function i(i) {
        function n(e, a) {
            function n(e) {
                U.setDataRange(e),
                D && (D.linkData(e), D.setDataRange()),
                w && (w.linkData(e), w.setDataRange()),
                I && (I.linkData(e), I.setDataRange())
            }
            function h() {
                a && (X = P),
                le.update(null, !0),
                "CN" === f && !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(e.symbol)
            }
            e = v({
                symbol: void 0,
                datas: {
                    t1: {
                        url: void 0,
                        dataformatter: void 0
                    },
                    t5: {
                        url: void 0,
                        dataformatter: void 0
                    }
                },
                linecolor: void 0,
                linetype: void 0
            },
            e || {});
            var m, p = this,
            f = t.market(e.symbol),
            N = function(e) {
                switch (e) {
                case "CN":
                    return 1;
                case "HK":
                    return 2;
                case "US":
                    return 3
                }
                return 1
            },
            _ = !0;
            this.dp = e.dp,
            this.marketNum = N,
            this.isErr = !1,
            this.witht5 = !0,
            this.symbol = e.symbol,
            this.isMain = a,
            this.isCompare = !1,
            this.dAdd = 0,
            this.uid = e.symbol + Math.random(),
            this.datas = null,
            this.dataLen = 0,
            this.dataLenOffset = 0,
            this.prevclose = void 0,
            this.labelMaxP = 0,
            this.maxPrice = 0,
            this.labelMinP = Number.MAX_VALUE,
            this.minPrice = Number.MAX_VALUE,
            this.labelMaxVol = 0,
            this.maxVolume = 0,
            this.minPercent = Number.MAX_VALUE,
            this.maxPercent = -Number.MAX_VALUE,
            this.labelPriceCount = void 0,
            this.isTotalRedraw = !0,
            this.realLen = 0,
            this.market = f,
            this.date = null,
            this.hq = null,
            this.futureTime = d || c,
            this.preData = {
                data: 0,
                vPos: null
            },
            this.needMarket = f,
            this.changeMarket = function(e) {
                var a, i = [],
                n = e;
                if (H = C.tcd(S), N(p.needMarket) != N(S)) {
                    a = P.get(),
                    m = t.tUtil.gata(S);
                    for (var r = 0; r < a.length; r++) N(p.needMarket) < N(S) ? (i.push(C.aduk(a[r], p.market, S, L, a[r][0].date)), p.realLen = t.arrIndexOf(m, L.getHours() + ":" + t.strUtil.zp(L.getMinutes())), p.realLen < 0 && (p.realLen = H)) : (i.push(C.rmuk(a[r], S, n)), p.realLen = t.arrIndexOf(m, L.getHours() + ":" + t.strUtil.zp(L.getMinutes())));
                    p.needMarket = S,
                    P.initTState(i),
                    p.datas = i[4],
                    U.setDataRange(),
                    U.createPlayingData()
                }
            };
            var D, w, I, O, L, F = new M(this, e);
            this.getName = function() {
                return O || ""
            },
            this.getStockType = function() {
                var e;
                return p.hq && (e = p.hq.type),
                e || ""
            },
            this.viewState = Q;
            var P = new
            function() {
                var a = {},
                n = {
                    rsAmount: void 0
                },
                r = function(e) {
                    if (e) {
                        var n, r = e.length,
                        o = [];
                        if (t.clone(e, o), o.length > 5) {
                            if (i.date) {
                                for (var s, l = Number(i.date.split("-")[2]), c = 0, d = 0, h = 0, m = o.length; m > h; h++) s = o[h][0].date.getDate(),
                                0 == h ? c = Math.abs(s - l) : c > Math.abs(s - l) && (c = Math.abs(s - l), d = h);
                                d >= 5 ? (n = o.splice(d - 4, 5), Q.start = 4, Q.end = 5) : (n = o.splice(0, 5), Q.start = d, Q.end = d + 1),
                                a.tv = Q.start,
                                a.tb = Q.end
                            }
                        } else n = o,
                        a.tv = i.date ? 0 : 4,
                        a.tb = r;
                        a.t = n
                    }
                };
                this.get = function(e) {
                    return e ? a[e] : a.t
                },
                this.set = function(e, t) {
                    "undefined" != typeof a[e] && (a[e] = t)
                },
                this.initState = r,
                this.initTState = function(e) {
                    r(e)
                },
                this.extraDataObj = n,
                this.initExtraData = function() {
                    var a = i.ssl ? "https": "http",
                    r = a + "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol",
                    o = "KKE_ShareAmount_" + e.symbol;
                    t.load(r.replace("$symbol", e.symbol).replace("$rn", String((new Date).getDate())).replace("$cb", "var%20" + o + "="),
                    function() {
                        var e = window[o];
                        if (e) {
                            for (var t, a = [], i = e.length; i--;) t = e[i],
                            a.push({
                                amount: Number(t.amount),
                                date: g.sd(t.date)
                            });
                            a.length && (n.rsAmount = a)
                        }
                    })
                },
                this.gc = function() {
                    a = null,
                    n = null
                }
            },
            U = new
            function() {
                var e, t, a;
                e = function() {
                    p.minPrice = Number.MAX_VALUE,
                    p.maxPrice = 0,
                    p.minPercent = Number.MAX_VALUE,
                    p.maxPercent = -Number.MAX_VALUE,
                    p.minavgPrice = Number.MAX_VALUE,
                    p.maxavgPrice = 0,
                    p.maxVolume = 0
                },
                t = function() {
                    function e(e) {
                        var t = Math.max(Math.abs(e - p.maxPrice), Math.abs(e - p.minPrice)),
                        a = Math.max(Math.abs(e - p.maxavgPrice), Math.abs(e - p.minavgPrice));
                        switch (t / e > .45 && (R.datas.scaleType = "price"), t / e > .1 && "newstock" == R.datas.scaleType && (R.datas.scaleType = "price"), R.datas.scaleType) {
                        case "newstock":
                            p.minPrice = Number(e) - .45 * e,
                            p.maxPrice = Number(e) + .45 * e;
                            break;
                        case "tpct":
                            p.minPrice = p.minPrice < Number(e) - .1 * e ? p.minPrice: Number(e) - .1 * e,
                            p.maxPrice = p.maxPrice > Number(e) + .1 * e ? p.maxPrice: Number(e) + .1 * e;
                            break;
                        case "pct":
                            var i = p.maxPrice - p.minPrice;
                            p.minPrice -= .05 * i,
                            p.maxPrice += .05 * i;
                            break;
                        case "price":
                        default:
                            p.minPrice = Number(e) - Number(t),
                            p.maxPrice = Number(e) + Number(t),
                            p.minavgPrice = Number(e) - Number(a),
                            p.maxavgPrice = Number(e) + Number(a)
                        }
                        p.maxPercent = Math.max((p.maxPrice - e) / e, 0),
                        p.minPercent = Math.min((p.minPrice - e) / e, 0),
                        p.maxavgPercent = Math.max((p.maxavgPrice - e) / e, 0),
                        p.minavgPercent = Math.min((p.minavgPrice - e) / e, 0)
                    }
                    p.isCompare = W.getAllStock().length > 1,
                    p.dAdd = W.dAdd,
                    p.preData.data = p.hq.preopen ? p.hq.preopen: p.preData.data;
                    for (var t = 0,
                    a = p.datas.length; a > t; t++) {
                        for (var n, r = Number(p.datas[0][0].prevclose), o = 0, s = p.dataLen; s > o; o++) n = p.datas[t][o],
                        n.price <= 0 || n.avg_price <= 0 || ("HK" == p.market && p.hq && "indx" == p.hq.type ? (p.maxPrice = Math.max(p.maxPrice, n.price, r), p.minPrice = Math.min(p.minPrice, n.price, r)) : b(p.datas[t][0].date, p.hq.date) && "CN" == p.market ? (p.maxPrice = Math.max(p.maxPrice, n.price, n.avg_price, r, p.preData.data), p.minPrice = Math.min(p.minPrice, n.price, n.avg_price, r, p.preData.data)) : (p.maxPrice = Math.max(p.maxPrice, n.price, n.avg_price, r), p.minPrice = Math.min(p.minPrice, n.price, n.avg_price, r)), b(p.datas[t][0].date, p.hq.date) && "CN" == p.market ? (p.maxavgPrice = Math.max(p.maxavgPrice, n.price, r, p.preData.data), p.minavgPrice = Math.min(p.minavgPrice, n.price, r, p.preData.data)) : (p.maxavgPrice = Math.max(p.maxavgPrice, n.price, r), p.minavgPrice = Math.min(p.minavgPrice, n.price, r)), p.labelMaxVol = p.maxVolume = Math.max(p.maxVolume, 0, n.volume));
                        e(r)
                    } (p.minPrice < -1e8 || p.maxPrice - p.minPrice < 1e-6) && (g.stbd(p.datas[0][0].date, p.hq.date) && (p.datas[0][0].price = p.hq.price, p.datas[0][0].avg_price = p.hq.price, p.datas[0][0].prevclose = p.hq.prevclose, p.datas[0][0].volume = p.hq.totalVolume), p.minPrice = r - .01 * r, p.maxPrice = r + .01 * r, p.maxPercent = .01, p.minPercent = -.01, p.hq.totalVolume > 0 && g.stbd(p.datas[0][0].date, p.hq.date) && !isNaN(p.hq.totalAmount) && (p.datas[0][0].volume = p.hq.totalAmount / p.hq.totalVolume));
                    var l = y(p.maxVolume, 0, 0, !0);
                    p.labelMaxVol = l[0];
                    var c, d = .005;
                    /^s[hz]51\d{4}$/.test(i.symbol) && (c = "fund"),
                    c && "fund" === c && "pct" !== R.datas.scaleType && d > Math.abs(p.minPercent) && (d = Math.abs(p.minPercent), i.nfloat = p.nfloat = 3),
                    p.maxPercent < d && "US" !== p.market && "pct" !== R.datas.scaleType && (p.minPrice = p.maxavgPrice = r - r * d, p.maxPrice = p.minavgPrice = r + r * d, p.maxPercent = p.maxavgPercent = d, p.minPercent = p.minavgPercent = -d),
                    ("gb_brk$a" === p.symbol || "usr_brk$a" === p.symbol) && (i.nfloat = p.nfloat = 1)
                },
                a = function() {
                    var e, t, a, i = R.DIMENSION.h_t,
                    n = i * R.DIMENSION.P_HV,
                    r = i * (1 - R.DIMENSION.P_HV);
                    t = p.labelMinP,
                    a = p.labelMaxP;
                    var o, s = p.labelMaxVol;
                    if (p.datas) {
                        var l = p.datas.length;
                        for (e = 0; l > e; e++) {
                            o = p.datas[0][0].prevclose;
                            for (var c, d = R.custom.show_underlay_vol,
                            h = p.isCompare ? "ppp": "pp", m = p.dataLen, f = 0; m > f; f++) {
                                if (c = p.datas[e][f], !c) return;
                                c.price <= 0 && p.realLen >= f && f > 0 && (c.price = p.hq.price, c.avg_price = p.datas[e][f - 1].avg_price, c.volume = 0),
                                c.change = c.price - o,
                                c.percent = c.change / o,
                                c.py = u[h](c.price, t, a, i, o),
                                c.ay = u[h](c.avg_price, t, a, i, o),
                                d && (c.vy = u.vp(c.volume, s, n) + r)
                            }
                        }
                        p.preData.vPos = "CN" == p.market && 1 == l && b(p.hq.date, p.datas[0][0].date) ? u[h](p.preData.data, t, a, i, o) : null
                    }
                },
                this.createPlayingData = a,
                this.extValues = function() {
                    e(),
                    t()
                },
                this.setDataRange = function(a) {
                    var i = P.get();
                    if (i) {
                        Q.dataLength = i.length;
                        var n = Q.start,
                        r = Q.end;
                        isNaN(n) || isNaN(r) ? (r = P.get("tb") || 5, n = P.get("tv") || 4, Q.start = n, Q.end = r) : (a && r + 1 > i.length && (Q.end = r = i.length), P.set("tv", n), P.set("tb", r));
                        var o = [],
                        s = [];
                        if (i.length < 2) s = i,
                        o.push(i);
                        else for (var l = n; r > l; l++) s = s.concat(i[l]),
                        o.push(i[l]);
                        p.datas = o,
                        p.lineDatas = s,
                        p.dataLen = o[0].length,
                        e(),
                        t()
                    }
                }
            },
            $ = {},
            G = !1,
            ee = !1,
            ae = {},
            ne = (new Date).getTime(),
            re = function() {
                var e;
                L = new Date,
                e = 60 * L.getTimezoneOffset() * 1e3,
                L.setTime(L.getTime() + e),
                L.setHours(L.getHours() + 8)
            },
            oe = function(e) {
                if (re(), !m) switch (S) {
                case "HF":
                    m = t.tUtil.gata(S, c.time);
                    break;
                case "NF":
                    m = t.tUtil.gata(S, d.time);
                default:
                    m = t.tUtil.gata(S)
                }
                e.index = t.arrIndexOf(m, e.time);
                var a = e.index;
                switch (p.market) {
                case "CN":
                case "option_cn":
                case "fund":
                case "OTC":
                case "NF":
                    e.index < 0 && (e.time >= "11:30" && e.time < "13:00" && (a = t.arrIndexOf(m, "11:29")), "NF" == p.market && ("21:00" == d.time[0][0] ? e.time < "09:00" && e.time > "02:30" && (a = t.arrIndexOf(m, "09:00")) : e.time <= d.time[0][0] && (a = t.arrIndexOf(m, d.time[0][0]))));
                    break;
                case "HK":
                    e.time > "12:00" && e.time < "13:00" && (a = 150);
                    break;
                case "HF":
                    "hf_CHA50CFD" == p.symbol && e.time > "16:00" && e.time < "17:00" && (a = 420)
                }
                if (p.realLen = a, p.hq.open == p.hq.prevclose && p.hq.high == p.hq.prevclose && p.hq.low == p.hq.prevclose && 0 > a || p.hq.time < "09:30") switch (p.market) {
                case "CN":
                    p.realLen = p.hq.time >= "15:00" ? H - 1 : 0;
                    break;
                case "NF":
                case "HF":
                    break;
                default:
                    p.realLen = 0
                }
            },
            se = function(e, t) {
                var a = e.getTime(),
                i = t.getTime();
                return Math.floor((a - i) / 864e5) > 5
            },
            le = new
            function() {
                var a, r = !0,
                o = function(e) {
                    var a;
                    switch (S) {
                    case "HF":
                        a = c.time;
                        break;
                    case "NF":
                        a = d.time;
                        break;
                    default:
                        a = []
                    }
                    var i = t.tUtil.gltbt(1, e.price, !0, p.needMarket, [e.date], a);
                    "NF" == S && e.time >= "21:00" ? (i[0].date = g.dd(e.date), i[0].date.setDate(e.date.getDate() + 1)) : i[0].date = g.dd(e.date),
                    i[0].prevclose = e.price,
                    i[0].price = e.price,
                    i[0].volume = 0;
                    for (var n = 0,
                    r = 0,
                    o = P.get(), s = 0, l = o.length; l > s; s++) o[s][0].totalVolume && (r += Number(o[s][0].totalVolume), n++);
                    i[0].lastfive = r / n / 390 || 0,
                    b(o[4][0].date, e.date) ? "NF" == S && e.time >= "21:00" ? (o.shift(), o.push(i)) : o[4] = i: (o.shift(), o.push(i)),
                    P.initTState(o),
                    p.datas = [o[4]],
                    p.date = g.ds(e.date),
                    p.realLen = 0
                },
                s = 0,
                l = function(e, a) {
                    function l() {
                        switch (o(p.hq), n(), U.createPlayingData(), p.market) {
                        case "US":
                            U.extValues();
                            break;
                        case "NF":
                            d.inited = 1
                        }
                        t.isFunc(a) && a()
                    }
                    function h() {
                        var e = (new Date).getTime() - ne;
                        return ! isNaN(J) && J > 0 && e >= 1e3 * Number(J) && 0 != p.realLen && p.hq.isUpdateTime ? (ne = (new Date).getTime(), y(f, p.hq, a), !0) : !1
                    }
                    function u() {
                        function e() {
                            b(p.hq.date, N[4][0].date) && p.hq.time > "16:00" && r.price < 0 && (r.price = p.hq.price, r.avg_price = N[4][N[4].length - 2].avg_price, r.volume = 0)
                        }
                        function i() {
                            b(p.hq.date, N[4][0].date) && p.hq.time > "16:00" && (r.price = p.hq.price, r.avg_price = N[4][N[4].length - 2].avg_price, r.volume = 0, r.time = p.hq.time, r.avg_price < 0 && (r.avg_price = p.hq.price))
                        }
                        if (!p.hq.isUpdateTime) {
                            var r = N[4][N[4].length - 1];
                            switch (p.market) {
                            case "US":
                                e();
                                break;
                            case "HK":
                                i()
                            }
                            return oe(p.hq),
                            n(!0),
                            U.createPlayingData(),
                            t.isFunc(a) && a(),
                            !0
                        }
                        return p.date = "NF" == p.market && p.hq.time >= "21:00" ? g.ds(N[4][0].date) : p.hq.today,
                        !1
                    }
                    var f, N = P.get();
                    switch (p.needMarket) {
                    case "HF":
                        m = t.tUtil.gata(p.needMarket, c.time);
                        break;
                    case "NF":
                        m = t.tUtil.gata(p.needMarket, d.time);
                        break;
                    default:
                        m = t.tUtil.gata(p.needMarket)
                    }
                    if (e && e.date && p.datas && !i.date) {
                        if (r = !1, f = N[4], p.hq.isDateChange) {
                            if ("NF" == p.market && d && d.time[0][0] < "21:00" || "NF" != p.market) return void l()
                        } else if ("CN" == p.market && !b(p.hq.date, N[4][0].date) && p.hq.time < "09:05" || "NF" == p.market && b(p.hq.date, N[4][0].date) && d && "21:00" == d.time[0][0] && p.hq.time >= d.time[0][0] || "HF" == p.market && !b(p.hq.date, N[4][0].date) && 0 != p.hq.date.getDay() && 6 != p.hq.date.getDay() && p.hq.time >= c.time[0][0]) return void l();
                        if (!h() && !u()) {
                            if (p.datas && ($ = N[4][0]), se(e.date, N[4][0].date)) return void(p.realLen = H);
                            O = e.name || "",
                            p.hq = e;
                            var _ = e.date.getHours() < 10 ? "0" + e.date.getHours() : e.date.getHours();
                            if (p.time = _ + ":" + t.strUtil.zp(e.date.getMinutes()), 0 == e.index && v(f, e), t.arrIndexOf(m, p.time) && e.index > 0 && (t.arrIndexOf(m, p.time) - p.realLen <= 1 ? v(f, e) : y(f, e, a), 1 == e.index && 0 == s)) return s = 1,
                            void y(f, e, a);
                            "HF" != p.market && "NF" != p.market && (p.hq.open == p.hq.prevclose && p.hq.high == p.hq.prevclose && p.hq.low == p.hq.prevclose && p.hq.index < 0 || e.time < "09:30") && ("CN" == p.market ? (f[0].avg_price = e.price, f[0].volume = e.totalVolume) : "option_cn" == p.market || "NF" == p.market ? f[0].inventory = e.position || e.holdingAmount: "HK" == p.market && (f[0].avg_price = e.totalAmount / e.totalVolume || e.price)),
                            5 == Q.end && (n(!0), U.createPlayingData()),
                            t.isFunc(a) && a()
                        }
                    }
                },
                h = -1,
                u = -1,
                f = -1,
                v = function(e, t) {
                    var i = e;
                    oe(t);
                    var n = i[p.realLen];
                    n && ($ && !a ? (G ? (t.volume = h = t.totalVolume - ($.totalVolume || 0), t.amount = u = t.volume * t.price, t.totalAmount = t.amount + $.totalAmount, t.avg_price = f = t.totalAmount / t.totalVolume || t.price) : (t.volume = 0, t.avg_price = f = $.totalAmount / $.totalVolume || t.price, t.totalAmount = t.totalVolume * t.avg_price, G = !0), $.totalVolume = t.totalVolume, $.totalAmount = t.totalAmount) : (ee ? t.volume = t.totalVolume - ae.totalVolume || 0 : (t.volume = 0, ee = !0), ae.totalVolume = t.totalVolume), ("option_cn" == p.market || "NF" == p.market) && (n.inventory = t.position || t.holdingAmount), "CN" == p.market ? n.avg_price = t.avg_price || n.price: (t.index > 1 ? n.avg_price = (i[t.index - 1].avg_price * t.index + t.price) / (t.index + 1) || n.price: "fund" == p.market || (n.avg_price = n.price || t.price), 0 == t.index && (n.avg_price = t.totalAmount / t.totalVolume || t.price), n.volume = 0), "HK" != p.market && "NF" != p.market && (n.volume += t.volume), n.price = t.price, n.volume <= 0 && (n.volume = 0))
                },
                y = function(a, r, o) {
                    var s = {
                        symbol: r.symbol,
                        date: r.today,
                        withT5: 0,
                        withI: !1,
                        faker: "",
                        dataformatter: e.datas.t1.dataformatter,
                        ssl: i.ssl
                    };
                    G = ee = !1,
                    KKE.api("datas.t.get", s,
                    function(e) {
                        a = e.data.td1,
                        oe(p.hq);
                        var i = P.get();
                        if ("NF" != p.market || ("21:00" == d.time[0][0] && p.hq.time >= d.time[0][0] && 0 != p.hq.date.getDay() && 6 != p.hq.date.getDay() && (a[0].date = i[4][0].date), "09:30" != d.time[0][0] && "09:15" != d.time[0][0] || !b(i[4][0].date, p.hq.date) || !(p.hq.time <= d.time[0][0]))) {
                            if ("HF" == p.market && p.hq.time > c.time[0][0]) {
                                if (a[0].today < p.hq.today) return;
                                0 != p.hq.date.getDay() && 6 != p.hq.date.getDay() && (a[0].date = p.hq.date)
                            }
                            i[4] = a,
                            P.initTState(i),
                            "CN" == p.market && "HK" == p.needMarket && (p.needMarket = "CN", W.changeData(p)),
                            5 == Q.end && (n(!0), U.createPlayingData()),
                            t.isFunc(o) && o()
                        }
                    })
                },
                N = function(a, n, r) {
                    var o = {
                        symbol: n.symbol,
                        date: n.today,
                        withT5: 1,
                        dist5: 1,
                        withI: !1,
                        faker: "",
                        dataformatter: e.datas.t1.dataformatter,
                        ssl: i.ssl
                    };
                    G = ee = !1,
                    KKE.api("datas.t.get", o,
                    function(e) {
                        a = e.data.td1,
                        P.initTState(e.data.td5),
                        oe(p.hq),
                        t.isFunc(r) && r(),
                        W.moving(Q.start, Q.end, "T5"),
                        Z.hide()
                    })
                };
                this.updateT5Data = N,
                this.update = function(a, n, o, s) {
                    var c, d, h, m = "";
                    h = s ? s: t.market(e.symbol),
                    "US" == h && (m = ",gb_ixic"),
                    o ? (c = "datas.hq.parse", d = {
                        symbol: e.symbol + m,
                        hqStr: o,
                        market: h,
                        ssl: i.ssl
                    }) : (c = "datas.hq.get", d = {
                        symbol: e.symbol + m,
                        delay: !0,
                        cancelEtag: r,
                        ssl: i.ssl
                    }),
                    KKE.api(c, d,
                    function(t) {
                        l(t.dataObj[e.symbol], a)
                    })
                }
            },
            ce = new
            function() {
                var n = void 0,
                o = 1,
                s = function(e) {
                    o > 2 || (A.re(k.e.T_DATA_LOADED), t.isFunc(e) && e(), o++)
                },
                l = function(e) {
                    var t = e,
                    a = !1;
                    return a = t.hq.open == t.hq.prevclose && t.hq.high == t.hq.prevclose && t.hq.low == t.hq.prevclose && t.hq.index < 0 ? !0 : t.hq.time < "09:30"
                },
                h = function(a, i) {
                    var n, r, o = a;
                    switch (S) {
                    case "HF":
                        r = c.time;
                        break;
                    case "NF":
                        r = d.time;
                        break;
                    default:
                        r = []
                    }
                    var s = t.tUtil.gltbt(1, o.hq.price, !0, p.market, [o.hq.date], r);
                    return s[0].name = o.hq.name,
                    s[0].symbol = e.symbol,
                    s[0].today = t.dateUtil.ds(o.hq.date, "-"),
                    n = i,
                    n[4] = s,
                    p.realLen = 0,
                    n
                };
                this.init = function(o) {
                    var u = Q.viewId;
                    if (n != u) {
                        n = u,
                        null != p.datas && P.initTState(u, p.tDb.get());
                        var f = {
                            ssl: i.ssl,
                            symbol: e.symbol,
                            date: i.date,
                            withT5: 1,
                            dist5: i.dist5,
                            withI: !0,
                            faker: p.needMarket,
                            dataformatter: e.datas.t1.dataformatter
                        };
                        switch (p.needMarket) {
                        case "HF":
                            m = t.tUtil.gata(p.needMarket, c.time);
                            break;
                        case "NF":
                            m = t.tUtil.gata(p.needMarket, d.time);
                            break;
                        default:
                            m = t.tUtil.gata(p.needMarket)
                        }
                        Z.show(),
                        KKE.api("datas.t.get", f,
                        function(e) {
                            W.hasHistory && "history" == e.msg && W.hasHistory(T);
                            var c = e.data.hq.status,
                            m = "",
                            u = Number(e.data.hq.state);
                            if ("error" == e.msg || "nohistory" == e.msg) {
                                if (a && "nohistory" == e.msg && (T = 0, W.hasHistory && W.hasHistory(T), E.showTip({
                                    txt: k.nohistoryt,
                                    parent: q,
                                    noBtn: !0
                                })), p.isErr = !0, a && e.data && e.data.hq) {
                                    if (c) switch (p.market) {
                                    case "CN":
                                        switch (c) {
                                        case 2:
                                            m = k.notlisted;
                                            break;
                                        case 3:
                                            m = k.delisted;
                                            break;
                                        case 0:
                                            m = k.norecord
                                        }
                                        break;
                                    case "HK":
                                        switch (c) {
                                        case 5:
                                            m = k.notlisted;
                                            break;
                                        case 0:
                                            m = k.delisted
                                        }
                                    } else m = k.norecord;
                                    if (m && 0 != u) {
                                        var v, g = {
                                            txt: m,
                                            parent: q,
                                            noBtn: !0
                                        };
                                        R.DIMENSION.getStageW() < 200 ? (g.bgStyle = {
                                            padding: 0,
                                            top: "0px"
                                        },
                                        v || (v = new t.TipM(R.COLOR), v.genTip(g))) : E.showTip({
                                            txt: m,
                                            parent: q,
                                            noBtn: !0
                                        })
                                    }
                                }
                                if (0 != u && 7 != u) {
                                    if (W.onResize(), 1 != c) return void W.removeCompare([f.symbol]);
                                    p.isErr = !1
                                } else p.isErr = !1
                            }
                            p.hq = e.data.hq,
                            n = void 0,
                            f.td1 = e.data.td1;
                            var y;
                            L = new Date;
                            var N = 60 * L.getTimezoneOffset() * 1e3;
                            L.setTime(L.getTime() + N),
                            L.setHours(L.getHours() + 8),
                            O = p.hq.name || "",
                            oe(p.hq),
                            l(p, e.data.td5) && "HF" != p.market && "NF" != p.market ? "history" == e.msg ? (y = e.data.td5, y[4][0].date || (y[4][0].date = p.hq.date)) : y = h(p, e.data.td5) : (y = e.data.td5, "NF" != p.market || !d || "09:30" != d.time[0][0] && "09:15" != d.time[0][0] || b(y[4][0].date, p.hq.date) && p.hq.time <= d.time[0][0] && (y = h(p, e.data.td5)), y && !y[4][0].date && (y[4][0].date = p.hq.date)),
                            W.historyData = y,
                            p.date = e.data.td1 && e.data.td1[0].today || p.hq.date,
                            P.initTState(y),
                            s(o),
                            1 == x && (r.dateTo(i.historytime, i.historycb), x = 0),
                            Z.hide()
                        })
                    }
                }
            };
            this.tDb = P,
            this.initData = ce.init,
            this.initT5Data = le.updateT5Data,
            this.doUpdate = le.update,
            this.onViewChange = n,
            this.setPricePos = function(e, t) {
                p.labelMaxP = e[0],
                p.labelMinP = e[1],
                p.labelPriceCount = e[2],
                p.isCompare = t,
                U.createPlayingData(),
                w && w.setPricePos(e)
            },
            this.setRange = function() {
                U.setDataRange(),
                D && D.setDataRange(),
                w && w.setDataRange(),
                I && I.setDataRange()
            },
            this.draw = function() {
                F.draw(),
                D && D.allDraw(),
                w && w.allDraw()
            },
            this.resize = function(e) {
                U.createPlayingData(),
                F.resize(),
                D && D.onResize(e),
                w && w.onResize(),
                I && I.onResize()
            },
            this.clear = function() {
                F.clear(),
                D && (D.clear(), D = null),
                w && (w.clear(), w = null),
                I && (I.clear(), I = null),
                a && (Y = null)
            },
            this.getPriceTech = function() {
                return w || null
            },
            this.removePt = function(e) {
                if (e) { ! t.isArr(e) && (e = [e]);
                    for (var a = e.length; a--;) if (e[a].name && "VOLUME" === e[a].name.toUpperCase()) {
                        e.splice(a, 1),
                        R.custom.show_underlay_vol = !1;
                        break
                    }
                } else R.custom.show_underlay_vol = !1;
                w && w.removeChart(e)
            },
            this.togglePt = function(e) {
                w && (_ = w.showHide(e))
            };
            var de = function(e, a) {
                e && te.resizeAll(!0),
                W.onChangeView(),
                a && t.isFunc(a.callback) && a.callback()
            };
            this.initPt = function(e, n) {
                if (e) { ! t.isArr(e) && (e = [e]);
                    for (var r = e.length; r--;) if (e[r].name && "VOLUME" === e[r].name.toUpperCase()) {
                        e.splice(r, 1),
                        R.custom.show_underlay_vol = !0;
                        break
                    }
                    w || (w = new s({
                        stockData: p,
                        chartArea: V,
                        titleArea: K,
                        cb: de,
                        type: "t",
                        cfg: R,
                        usrObj: i
                    }), a && (j = w)),
                    w.createChart(e, n)
                }
            },
            this.initTc = function(e, t) {
                D || (D = new l({
                    stockData: p,
                    iMgr: ie,
                    subArea: z,
                    cb: de,
                    cfg: R,
                    type: "option_cn" == S ? "p": "t",
                    usrObj: i,
                    initMgr: te
                }), a && (B = D)),
                D.createChart(e, t)
            },
            this.removeTc = function(e) {
                D && D.removeChart(e)
            },
            this.initRs = function() {
                I || (I = new o({
                    stockData: p,
                    setting: R,
                    state: Q,
                    rc: W.moving,
                    witht5: 1
                }), Y = I),
                I.linkData()
            },
            this.setTLineStyle = F.setTLineStyle,
            h()
        }
        function M(e, n) {
            function r() {
                var n = e.isMain;
                if (e.nfloat = i.nfloat || 2, n) l = R.COLOR.T_P,
                c = R.COLOR.T_AVG;
                else {
                    2 != W.dAdd || o.linecolor || (o.linecolor = i.overlaycolor);
                    var r = o.linecolor || "#cccccc";
                    l = r.K_N || r.T_N || "#" + t.randomColor()
                }
                s = new a.xh5_ibPainter({
                    setting: R,
                    sd: e,
                    withHBg: n,
                    ctn: $,
                    iMgr: ie,
                    reO: {
                        mh: R.DIMENSION.H_MA4K
                    },
                    iTo: function(t, a, i, n) {
                        if (!p(t, ie.iHLineO.body) && t.appendChild(ie.iHLineO.body), e && e.datas) {
                            var r, o, s = e.datas[0][0].prevclose;
                            2 == e.dAdd ? r = e.labelMaxP * s + s - i / R.DIMENSION.h_t * (e.labelMaxP * s + s - (e.labelMinP * s + s)) : (r = e.labelMaxP - i / R.DIMENSION.h_t * (e.labelMaxP - e.labelMinP), o = Number(100 * (r - s) / s).toFixed(2) + "%"),
                            ie.iToD({
                                mark: r,
                                rmark: o,
                                x: a,
                                y: i,
                                oy: R.DIMENSION.H_MA4K,
                                ox: R.DIMENSION.posX,
                                e: n
                            },
                            !0, !1)
                        }
                    }
                })
            }
            var o, s, l, c, d, h = {},
            m = 1,
            f = function(e) {
                o = v({
                    linetype: "line_" + m,
                    linecolor: o ? o.linecolor || {}: {}
                },
                e || {});
                var t = [];
                e && e.linetype && (t = e.linetype.split("_"), t.length > 1 && "line" == t[0] && (m = Number(t[1]) || 1)),
                h = o.linecolor || {},
                l = h.K_N || h.T_N || R.COLOR.T_P,
                c = h.T_AVG || R.COLOR.T_AVG,
                d = h.T_PREV || R.COLOR.T_PREV
            },
            g = function() {
                function t() {
                    if (e.isMain && R.custom.show_underlay_vol) {
                        for (var t, a = R.COLOR.V_SD,
                        i = y; v > i; i++) b = p[i],
                        t = b.vy,
                        s.drawVStickC(w, t, k, R.DIMENSION.h_t, a),
                        w += D;
                        s.stroke(),
                        s.getG().lineWidth = 1
                    }
                }
                function a() {
                    if ((!e.isCompare || 2 == e.dAdd && e.isMain) && !("HK" == e.market && e.hq && "indx" == e.hq.type || "US" == e.market)) {
                        for (w = D * (.5 + y), s.newStyle(c, !0, m), g = y; v > g && (b = p[g], !(b.price <= 0)); g++) {
                            if (5 == Q.end && "CN" == e.market && j) for (var t = j.getLog(), a = 0; a < t.length; a++) if ("EWI" == t[a].name && g > (v / H - 1) * H) return void s.stroke();
                            g == y || g % H == 0 ? s.moveTo(w, p[g].ay) : s.lineTo(w, p[g].ay),
                            w += D
                        }
                        s.stroke()
                    }
                }
                function i() {
                    s.newStyle(l, !0, m),
                    w = D * (.5 + y),
                    "CN" == e.market && e.preData.vPos && (0 == e.realLen && e.hq ? e.hq.time > "09:29" ? (s.moveTo(0, e.preData.vPos), p[0].py || (p[0].py = e.preData.vPos), s.lineTo(w, p[0].py)) : s.drawDot(w, e.preData.vPos, 1) : (s.moveTo(0, e.preData.vPos), p[0].py || (p[0].py = e.preData.vPos), s.lineTo(w, p[0].py)), s.stroke())
                }
                function n() {
                    var e;
                    for (g = y; v > g && (b = p[g], !(b.price <= 0)); g++) e = b.py,
                    g == y || g % H == 0 ? s.moveTo(w, e) : s.lineTo(w, e),
                    b.ix = w,
                    w += D;
                    s.stroke()
                }
                function r() {
                    N && !e.isCompare && e.datas.length < 2 && (w -= D, s.lineTo(w, R.DIMENSION.h_t), s.lineTo(.5 * D, R.DIMENSION.h_t), s.newFillStyle_rgba(R.COLOR.M_ARR, R.DIMENSION.h_t, .5), s.fill())
                }
                function h() {
                    d = R.COLOR.T_PREV,
                    s.newStyle(d, !0, 1);
                    var t, a = 0,
                    i = 5;
                    for (t = e.isCompare && e.isMain && "pct" === R.datas.scaleType ? u.pp(0, e.labelMinP, e.labelMaxP, R.DIMENSION.h_t) : u.pp(e.datas[0][0].prevclose, e.minPrice, e.maxPrice, R.DIMENSION.h_t), t = ~~ (t + .5), t -= .5; a < R.DIMENSION.w_t;) s.moveTo(a, t),
                    a += i,
                    s.lineTo(a, t),
                    a += i;
                    e.isMain && s.stroke()
                }
                if (! (R.DIMENSION.getStageH() < 0)) {
                    e.isMain && s.drawBg("T");
                    var p = [];
                    if (e.datas) {
                        for (var f = 0; f < e.datas.length; f++) p = p.concat(e.datas[f]);
                        var v = p.length;
                        if (p) {
                            var g, b, y, N = o.linetype && 0 == o.linetype.indexOf("mountain"),
                            _ = e.datas.length * H,
                            D = R.DIMENSION.w_t / Math.max(_, R.PARAM.minCandleNum),
                            k = .5 * D,
                            w = 0;
                            e.isTotalRedraw ? (y = 0, s.clear(!0, R.PARAM.getHd())) : (y = _ - 2, 0 > y && (y = 0), w += D * y, s.clearLimit(w + k, D + k)),
                            t(),
                            a(),
                            i(),
                            n(),
                            r(),
                            h()
                        }
                    }
                }
            };
            this.draw = g,
            this.clear = function() {
                s.remove(),
                s = null
            },
            this.resize = function() {
                s.resize({
                    mh: R.DIMENSION.H_MA4K
                }),
                g()
            },
            this.setTLineStyle = f,
            f(n),
            r()
        }
        function I() {
            var e, a = this,
            r = [];
            this.getAllStock = function() {
                return r
            },
            this.getMainStock = function() {
                return e
            },
            this.getAllSymbols = function() {
                for (var e = [], t = 0, a = r.length; a > t; t++) e.push(r[t].symbol);
                return e
            };
            var c = function() {
                for (var e, t, a, i = Number.MAX_VALUE,
                n = -Number.MAX_VALUE,
                o = r.length,
                s = o > 1,
                l = s ? "avgPercent": "Price", c = o; c--;) e = r[c],
                a = e.getPriceTech(),
                a && !s && a.getMaxMin()[0] && (n = a.getMaxMin()[0], i = a.getMaxMin()[1]),
                t = [n, i],
                i = Math.min(i, e["min" + l], t[1]),
                n = Math.max(n, e["max" + l], t[0]);
                if (j) {
                    var d = j.getLog(),
                    h = d.length;
                    for (c = 0; h > c; c++) if ("EWI" == d[c].name || "MA" == d[c].name) {
                        var m = r[0].datas[0][0].prevclose,
                        p = Math.max(Math.abs(m - n), Math.abs(m - i));
                        n = m + p,
                        i = m - p
                    }
                }
                var u, f = R.DIMENSION.h_t;
                u = 100 > f ? 2 : 180 > f ? 4 : 300 > f ? 6 : 8;
                for (var v = o; v--;) e = r[v],
                e.setPricePos([n, i, u], s)
            },
            d = function(e) {
                if (e) e.draw();
                else for (var t = r.length; t--;) r[t].draw()
            },
            h = function(t) {
                1 == Q.viewId || 0 == Q.viewId ? i.date ? a.moving(Q.start, Q.end) : a.moving(4, 5, !1) : a.moving(Q.start, Q.end, !1),
                t || ae.onRange(e)
            },
            m = function(e) {
                return e.isErr ? (t.trace.error("err symbol data"), a.removeCompare([e.symbol]), !0) : e.tDb.get() ? !0 : (e.initData(g), !1)
            },
            p = [],
            u = function(e) {
                if (e && t.isFunc(e.callback)) {
                    for (var a = !1,
                    i = p.length; i--;) if (e.callback === p[i]) {
                        a = !0;
                        break
                    } ! a && p.push(e.callback)
                }
            },
            g = function(a, i) {
                if (u(i), m(e)) {
                    if (e.isErr) return t.trace.error("err main symbol"),
                    void(e.isErr = !1);
                    ie.patcher.switchFloater();
                    for (var n, o = !0,
                    s = r.length; s--;) n = r[s],
                    n == e || m(n) || (o = !1);
                    if (o) {
                        for (s = r.length; s--;) r[s].marketNum(r[s].needMarket) > r[s].marketNum(S) && (S = r[s].needMarket);
                        for (s = r.length; s--;) x(r[s]);
                        for (h(a); p.length;) {
                            var l = p.shift();
                            l()
                        }
                    }
                    if (ae.onViewChanged(), a) return;
                    ae.onViewPrice(),
                    ae.onDataUpdate()
                }
            },
            b = function() {
                ae.onRange(e)
            };
            this.getExtraData = function(a) {
                if (a = v({
                    symbol: e.symbol,
                    name: null,
                    clone: !0
                },
                a || {}), !a.name) return null;
                for (var i, n, o = r.length; o--;) if (r[o].symbol === a.symbol) {
                    i = r[o];
                    break
                }
                if (i) {
                    var s;
                    "t1" == a.name || "t5" == a.name ? (s = i.tDb.get(), n = a.clone ? t.clone(s) : s) : n = null
                }
                return n
            },
            this.shareTo = function(e) {
                e = v({
                    type: "weibo",
                    url: window.location.href,
                    wbtext: "",
                    qrwidth: 100,
                    qrheight: 100,
                    extra: void 0
                },
                e);
                var a = String(e.type).toLowerCase();
                switch (a) {
                case "qrcode":
                    KKE.api("utils.qrcode.createcanvas", {
                        text: e.url,
                        width: e.qrwidth,
                        height: e.qrheight
                    },
                    function(e) {
                        E.showTip({
                            content: e,
                            txt: '<p style="margin:0 0 9px 0;">\u626b\u63cf\u4e8c\u7ef4\u7801</p>',
                            parent: q,
                            btnLb: "\u5173\u95ed"
                        })
                    });
                    break;
                default:
                    t.grabM.shareTo({
                        ctn:
                        q,
                        w: R.DIMENSION.getStageW(),
                        h: R.DIMENSION.getStageH() - (G.clientHeight || 0),
                        ignoreZIdxArr: [R.PARAM.I_Z_INDEX],
                        ignoreIdArr: [R.PARAM.LOGO_ID],
                        priorZIdx: R.PARAM.G_Z_INDEX,
                        nologo: !1,
                        top: R.DIMENSION.posY + R.DIMENSION.H_MA4K + 17,
                        right: R.DIMENSION.RIGHT_W + R.DIMENSION.K_RIGHT_W,
                        LOGO_W: R.DIMENSION.LOGO_W,
                        LOGO_H: R.DIMENSION.LOGO_H,
                        color: R.COLOR.LOGO,
                        bgColor: R.COLOR.BG,
                        txt: e.wbtext,
                        url: e.url,
                        extra: e.extra
                    })
                }
            };
            var y, N, D = function() {
                ie.update(),
                c(),
                d(),
                b(),
                ie.isIng() || ae.onViewPrice()
            },
            k = function() {
                clearTimeout(N),
                !ee && q.parentNode && "none" != q.style.display && (N = setTimeout(D, 200))
            },
            w = function() {
                if (clearInterval(y), !isNaN(i.rate)) {
                    var e = 1e3 * i.rate;
                    e > 0 && (y = setTimeout(w, e))
                }
                for (var t, a = r.length; a--;) t = r[a],
                t.doUpdate(k)
            },
            M = function() {
                Q.viewId = 2;
                for (var e, t = r.length; t--;) e = r[t],
                e.initT5Data(e.datas, e.hq, g)
            };
            this.updateDataAll = w,
            this.update5Data = M;
            var I = function(t, a) {
                var i = new n(t, a);
                a && (e = i),
                r[r.length] = i,
                O(),
                g()
            },
            T = function(e) {
                for (var t, a, i = e,
                n = 0,
                o = 0; n < r.length; n++) a = r[n],
                a.marketNum(a.market) == a.marketNum(i) ? o++:t = t ? a.marketNum(a.market) > a.marketNum(t) ? a.market: t: a.market,
                n == r.length - 1 && 0 == o && (S = t);
                for (n = r.length; n--;) x(r[n], i)
            },
            x = function(e, t) {
                e.changeMarket(t)
            };
            this.changeData = x;
            var O = function() {
                if (r.length > 1) a.mM.togglePt({
                    v: !1
                });
                else {
                    if (r.length <= 0) return;
                    a.mM.togglePt({
                        v: !0
                    })
                }
            },
            C = function(e) {
                var t = Q.start,
                a = Q.end;
                return t = Math.max(t + e, 0),
                0 == t && 5 >= a && 0 == Q.start && a++,
                t >= a && (t = a - 1),
                a > 5 && (a = 5),
                [t, a]
            };
            this.onWheel = function(e) {
                var t = -1 * e.detail || e.wheelDelta;
                if (0 != t) {
                    t = t > 0 ? -1 : 1;
                    var i = C(t);
                    a.moving(i[0], i[1], "wheel")
                }
            },
            this.onKb = function(e) {
                var t = e.keyCode;
                switch (t) {
                case 38:
                case 40:
                    var i = C(38 == t ? 1 : -1);
                    a.moving(i[0], i[1], "Key");
                    break;
                case 37:
                case 39:
                    ie.iToKb(37 == t ? -1 : 1);
                    break;
                default:
                    return
                }
                f.preventDefault(e)
            },
            this.zoomApi = function(e) {
                var t = C(e ? 1 : -1);
                a.moving(t[0], t[1], "zoom")
            },
            this.moveApi = function(e) {
                var t = Q.start,
                i = Q.end;
                t += e,
                i += e,
                i > 5 && (t = 4, i = 5),
                0 > t && (t = 0, i = 1),
                a.moving(t, i, "move")
            },
            this.setViewData = h,
            this.onChangeView = g,
            this.moving = function(t, a, i) {
                Q.start = t,
                Q.end = a,
                (4 != t && 5 != a || 0 != t && 5 != a) && (Q.viewId = 0),
                "HF" == S && 0 == L && i && (Z.show(), M("t5"), L = 1);
                for (var n, o = r.length; o--;) n = r[o],
                n.setRange(),
                n.onViewChange();
                c(),
                d(),
                ae.onRange(e)
            },
            this.dAdd = 0,
            this.compare = function(e) {
                for (var t = r.length; t--;) if (r[t].symbol == e.symbol) return;
                I(e, !1)
            },
            this.removeCompare = function(e) {
                for (var t, a, i = "CN",
                n = e.length; n--;) {
                    a = e[n];
                    for (var o = r.length; o--;) if (a == r[o].symbol) {
                        t = r.splice(o, 1)[0],
                        i = t.market,
                        t.clear(),
                        t = null;
                        break
                    }
                }
                T(i),
                O(),
                c(),
                d(),
                ae.onRange(r[0])
            },
            this.onResize = function(e) {
                for (var t = r.length; t--;) r[t].resize(e)
            },
            this.dcReset = function() {
                for (var e, t = r.length; t--;) e = r.splice(t, 1)[0],
                e.clear(),
                e = null
            },
            this.setScale = function(e) {
                R.datas.scaleType = e
            },
            this.setTLineStyle = function(a) {
                if (a) { ! t.isArr(a) && (a = [a]);
                    for (var i = a.length; i--;) {
                        var n = a[i];
                        if (n.hasOwnProperty("symbol")) {
                            for (var o = n.symbol,
                            s = r.length; s--;) if (r[s].symbol == o) {
                                r[s].setTLineStyle(n),
                                r[s].draw();
                                break
                            }
                        } else e.setTLineStyle(n),
                        e.draw()
                    }
                } else e.setTLineStyle(),
                e.draw()
            };
            var A, F = function(e) {
                e ? D() : ie.update()
            },
            H = !1,
            P = 0,
            U = function() {
                clearTimeout(A),
                H = !1,
                P = 0
            },
            $ = function() {
                A = setTimeout(function() {
                    P > 0 && D(),
                    U()
                },
                500)
            };
            this.pushData = function(e, t) {
                var a = !1;
                switch (Number(t)) {
                case 1:
                    U(),
                    a = !0;
                    break;
                case 2:
                    H || (H = !0, $());
                    break;
                case 0:
                    U()
                }
                for (var i = e.length; i--;) for (var n = r.length; n--;) if (r[n].symbol == e[i].symbol && e[i].data) {
                    P++,
                    r[n].doUpdate(_(F, null, a), !1, e[i].data, e[i].market);
                    break
                }
            },
            this.dcInit = function(e) {
                I(e, !0),
                w()
            },
            this.mM = new
            function() {
                var t = function(a, i, n) {
                    var r, o;
                    switch (i) {
                    case "price":
                        r = s,
                        o = "initPt";
                        break;
                    case "tech":
                        r = l,
                        o = "initTc"
                    }
                    o && (r ? e[o](a, n) : KKE.api("plugins.techcharts.get", {
                        type: i
                    },
                    function(e) {
                        l = e.tChart,
                        s = e.pChart,
                        t(a, i, n)
                    }))
                },
                a = function(t, a) {
                    var i;
                    switch (a) {
                    case "price":
                        i = "removePt";
                        break;
                    case "tech":
                        i = "removeTc"
                    }
                    i && e && (e[i](t), g())
                },
                i = function(t) {
                    return o ? (Y ? Y.sh(t) : (e.initRs(), i(t), G.appendChild(Y.getBody())), void te.resizeAll(!0)) : void KKE.api("plugins.rangeselector.get", null,
                    function(e) {
                        o = e,
                        i(t)
                    })
                };
                this.showRs = i,
                this.newAC = t,
                this.removeAC = a,
                this.togglePt = function(t) {
                    e && (e.togglePt(t), g())
                }
            }
        }
        var S = "CN",
        T = 1,
        x = 0,
        O = "\u624b",
        L = 0,
        C = {
            tcd: function(e) {
                var a;
                switch (e) {
                case "HF":
                    a = t.tUtil.gtAll(c.time).length;
                    break;
                case "CN":
                    a = 241,
                    t.isRepos(i.symbol) && (O = "");
                    break;
                case "option_cn":
                    a = 241,
                    O = "";
                    break;
                case "HK":
                    a = 331,
                    O = "";
                    break;
                case "US":
                    a = 391,
                    O = "";
                    break;
                case "NF":
                    a = t.tUtil.gtAll(d.time).length,
                    O = "";
                    break;
                default:
                    a = 241
                }
                return a
            },
            rmuk: function(e, t, a) {
                var i, n, r = e;
                return "HK" == a ? (i = r.splice(0, 120), n = i.concat(r.splice(30, 121))) : "US" == a || (n = e),
                n
            },
            aduk: function(e, a, i, n, r) {
                var o, s, l, c, d, h = e,
                m = a,
                p = i,
                u = [],
                f = [],
                v = n.getHours() + ":" + t.strUtil.zp(n.getMinutes()),
                b = t.tUtil.gata(i),
                y = g.stbd(n, r) ? t.arrIndexOf(b, v) : 0;
                "HK" == m && "US" == i && (s = [["12:01", "12:59"]], u = [1], l = h[150], c = h[h.length - 1]),
                ("CN" == m || "option_cn" == m) && ("HK" == p ? (s = [["11:30", "11:59"], ["15:01", "16:00"]], u = [0, 2], l = h[119], c = h[h.length - 1]) : (s = [["11:30", "11:59"], ["12:00", "12:59"], ["15:01", "16:00"]], u = [0, 1, 2], l = h[119], c = h[h.length - 1]));
                for (var N = 0,
                _ = u.length; _ > N; N++) {
                    for (var D, k, w, M = t.tUtil.gtr([s[N]]), I = [], S = 0, T = M.length; T > S; S++) u[N] < 2 ? (("CN" == m || "option_cn" == m) && (y > 120 && 150 > y ? (k = y - 120, w = k > S ? l.price: -.01) : w = l.price), "HK" == m && y > 150 && 180 > y && (k = y - 150), D = {
                        time: M[S],
                        price: w,
                        avg_price: w,
                        volume: 0,
                        fake: u[N]
                    }) : (("CN" == m || "option_cn" == m) && (y > 272 ? (k = y - 272, w = k > S ? c.price: -.01) : w = c.price), D = {
                        time: M[S],
                        price: w,
                        avg_price: w,
                        volume: 0,
                        fake: u[N]
                    }),
                    I.push(D);
                    f.push(I)
                }
                return "HK" == a && (d = h.splice(0, 151), o = d.concat(f[0], h)),
                ("CN" == a || "option_cn" == m) && ("US" == p ? (d = h.splice(0, 120), o = d.concat(f[0], f[1], h, f[2])) : "HK" == p && (d = h.splice(0, 120), o = d.concat(f[0], h, f[1]))),
                o
            }
        };
        t.xh5_EvtDispatcher.call(this);
        var A = this;
        i = v({
            symbol: "sh000001",
            ssl: !1,
            datas: {
                t1: {
                    url: void 0,
                    dataformatter: void 0
                },
                t5: {
                    url: void 0,
                    dataformatter: void 0
                }
            },
            dim: null,
            theme: null,
            view: "ts",
            rate: 3,
            t_rate: 0 / 0,
            fh5: !1,
            noh5: null,
            reorder: !0,
            reheight: !0,
            dist5: 0,
            w: void 0,
            h: void 0,
            mh: 0,
            date: null,
            dp: !1,
            onrange: void 0,
            onviewprice: void 0,
            ondataupdate: void 0,
            onviewchanged: void 0,
            nfloat: 2,
            trace: void 0,
            overlaycolor: void 0,
            nohtml5info: void 0,
            tchartobject: {
                t: void 0,
                k: void 0
            }
        },
        i || {
            YANGWEN: "yangwen@staff.sina.com.cn",
            VER: "2.5.6"
        }),
        !i.symbol && (i.symbol = "sh000001"),
        i.symbol = String(i.symbol),
        0 == location.protocol.indexOf("https:") && (i.ssl = !0);
        var F = "_" + i.symbol + "_" + Math.floor(1234567890 * Math.random() + 1) + Math.floor(9876543210 * Math.random() + 1),
        R = e.getSetting(F);
        R.datas.isT = !0,
        i.reorder || (R.custom.indicator_reorder = !1),
        i.reheight || (R.custom.indicator_reheight = !1),
        S = t.market(i.symbol),
        R.datas.tDataLen = C.tcd(S);
        var H = R.datas.tDataLen,
        E = new
        function() {
            var e;
            this.showTip = function(a) {
                e || (e = new t.TipM(R.COLOR)),
                e.genTip(a)
            },
            this.hideTip = function() {
                e && e.hide()
            }
        };
        if (N.noH5) {
            if ("undefined" == typeof FlashCanvas || i.fh5) return void(t.isFunc(i.noh5) && i.noh5(i));
            R.PARAM.isFlash = !0
        }
        if (R.PARAM.isFlash && (R.COLOR.K_EXT_BG = "#fff", R.COLOR.F_BG = "#fff"), i.dim) for (var P in i.dim) i.dim.hasOwnProperty(P) && t.isNum(R.DIMENSION[P]) && (R.DIMENSION[P] = i.dim[P]);
        var U, q, $, V, K, z, G, W, X, B, j, Y, Z, Q = {
            viewId: k.URLHASH.vi(i.view || "ts"),
            dataLength: void 0,
            start: void 0,
            end: void 0,
            startDate: void 0,
            endDate: void 0
        },
        J = isNaN(i.t_rate) ? R.PARAM.T_RATE: i.t_rate,
        ee = !1,
        te = new
        function() {
            var e, a = function(e, t, a) {
                var n = !1;
                isNaN(e) && (e = i.w || U.offsetWidth),
                isNaN(t) && (t = i.h || U.offsetHeight - i.mh);
                var r = G.clientHeight || 0,
                o = z.clientHeight || 0;
                if (!isNaN(a) && (o -= a), o / (t - r) > 1) {
                    for (var s, l = 0,
                    c = z.childNodes.length; c--;) s = z.childNodes[c],
                    l += s.id.indexOf("blankctn") >= 0 ? s.offsetHeight: R.DIMENSION.getOneWholeTH();
                    o = l,
                    n = !0
                }
                return R.DIMENSION.setStageW(e),
                R.DIMENSION.setStageH(t, o + r),
                0 > t && (R.DIMENSION.H_T_G = R.DIMENSION.H_T_G - R.DIMENSION.H_T_T, R.DIMENSION.H_T_B = R.DIMENSION.H_TIME_PART),
                n
            },
            n = function() {
                Z.setPosition()
            },
            r = function() {
                e && (e.style.display = R.custom.show_logo ? "": "none")
            },
            o = function(e, i, o) {
                var s = a(i, o, 0 / 0);
                if (e || i && o) {
                    if (!W) return;
                    W.onResize(s),
                    ie.onResize()
                }
                n(),
                r(),
                t.stc("t_wh", [R.DIMENSION.getStageW(), R.DIMENSION.getStageH()])
            },
            s = function() {
                U = h(i.domid) || i.dom,
                U || (U = m("div"), document.body.appendChild(U), t.trace.error("missing of dom id")),
                q = m("div"),
                q.style.position = "relative",
                q.style.outlineStyle = "none",
                q.style.webkitUserSelect = q.style.userSelect = q.style.MozUserSelect = "none",
                $ = m("div", "mainarea_" + R.uid),
                V = m("div"),
                $.appendChild(V),
                K = m("div"),
                K.style.position = "absolute",
                K.style.fontSize = R.STYLE.FONT_SIZE + "px",
                $.appendChild(K),
                q.appendChild($),
                z = m("div"),
                q.appendChild(z),
                G = m("div"),
                q.appendChild(G),
                U.appendChild(q),
                Z = new t.LoadingSign,
                Z.appendto($)
            },
            l = function(a) {
                var i = !1;
                if (a) {
                    Y && (i = Y.setTheme(a));
                    for (var n in a) a.hasOwnProperty(n) && R.COLOR.hasOwnProperty(n) && R.COLOR[n] !== a[n] && (R.COLOR[n] = a[n], i = !0);
                    t.stc("t_thm", a)
                }
                return i && w.styleLogo({
                    logo: e,
                    color: R.COLOR.LOGO
                }),
                i
            },
            c = function(e) { ! R.custom.mousewheel_zoom || document.activeElement !== q && document.activeElement.parentNode !== q || (W && W.onWheel(e), f.preventDefault(e), f.stopPropagation(e))
            },
            d = function(e) {
                R.custom.keyboard && W && W.onKb(e)
            },
            p = function() {
                t.xh5_deviceUtil.istd || (N.info.name.match(/firefox/i) ? f.addHandler(q, "DOMMouseScroll", c) : f.addHandler(q, "mousewheel", c), q.tabIndex = 0, f.addHandler(q, "keydown", d))
            },
            u = function(t) {
                e = t,
                q.appendChild(t)
            },
            v = function() {
                s(),
                l(i.theme),
                o(),
                p(),
                R.DIMENSION.h_t < 0 && ($.style.display = "none", R.custom.indicator_reorder = !1, R.custom.indicator_reheight = !1),
                w.getLogo({
                    cb: u,
                    id: R.PARAM.LOGO_ID,
                    isShare: !1,
                    top: R.DIMENSION.posY + R.DIMENSION.H_MA4K + 17,
                    right: R.DIMENSION.RIGHT_W + R.DIMENSION.K_RIGHT_W,
                    LOGO_W: R.DIMENSION.LOGO_W,
                    LOGO_H: R.DIMENSION.LOGO_H,
                    color: R.COLOR.LOGO
                }),
                N.noH5 && (E.showTip({
                    txt: i.nohtml5info || k.nohtml5info,
                    parent: q
                }), t.stc("t_nh5"))
            };
            v(),
            this.resizeAll = o,
            this.innerResize = function(e) {
                W && (a(0 / 0, 0 / 0, e), W.onResize(), ie.onResize(), n(), ae.onInnerResize({
                    height: R.DIMENSION.h_t
                }))
            },
            this.initTheme = l
        },
        ae = new
        function() {
            var e = 0,
            a = function(a, i) {
                var n = H - 1,
                r = W.getAllStock()[0];
                if (r && r.datas && (i = b(r.datas[r.datas.length - 1][0].date, r.hq.date) ? r.realLen < 0 || r.realLen > n ? n: n = r.realLen: "NF" == S && d && "21:00" == d.time[0][0] ? n = r.realLen: r.realLen < 0 || r.realLen > n ? n: n, a = r.datas[r.datas.length - 1][n], a && a.time)) {
                    var o, s;
                    return "HF" == S ? (o = c.time[0][0], o > a.time ? (o = r.datas[r.datas.length - 1][0].date, s = new Date(o), s.setDate(s.getDate() + 1)) : s = r.datas[r.datas.length - 1][0].date) : "NF" == S ? (o = d.time[0][0], o < a.time && "21:00" == o ? (o = r.datas[r.datas.length - 1][0].date, s = new Date(o), s.setDate(s.getDate() - 1)) : s = r.datas[r.datas.length - 1][0].date) : s = r.datas[r.datas.length - 1][0].date,
                    a.day = t.dateUtil.ds(s, "/", !1) + "/" + t.dateUtil.nw(s.getDay()) + (a.time || ""),
                    e = i,
                    t.clone(a)
                }
            };
            this.currentData = a,
            this.onDataUpdate = function() {
                if (t.isFunc(i.ondataupdate)) {
                    var e = a();
                    e && i.ondataupdate({
                        data: t.clone(e),
                        idx: Q.currentLength - 1,
                        left: R.DIMENSION.posX,
                        top: R.DIMENSION.H_MA4K
                    })
                }
            },
            this.onInnerResize = function(e) {
                t.isFunc(i.oninnerresize) && i.oninnerresize(e)
            },
            this.onRange = function(e) { ! ee && t.isFunc(i.onrange) && e && i.onrange({
                    isCompare: e.isCompare,
                    data: t.clone(e.datas),
                    width: R.DIMENSION.w_t,
                    height: R.DIMENSION.h_t,
                    viewRangeState: t.clone(Q),
                    range: [e.labelMinP, e.labelMaxP, e.labelMaxVol],
                    left: R.DIMENSION.posX,
                    top: R.DIMENSION.H_MA4K
                })
            },
            this.onViewChanged = function() {
                t.isFunc(i.onviewchanged) && i.onviewchanged({
                    viewRangeState: t.clone(Q)
                })
            },
            this.onViewPrice = function(n, r, o, s) {
                if (!ee && t.isFunc(i.onviewprice)) {
                    if (n || (n = a(n, r)), !n) return;
                    o || (o = W.getMainStock().getName());
                    var l = t.clone(n),
                    c = i.symbol.length;
                    "HK" == S && i.symbol.substring(c - 1, c) >= "A" && (l.avg_price = 0 / 0),
                    l.volume && l.volume < 0 && (l.volume = 0),
                    i.onviewprice({
                        curname: o || "",
                        data_array: W.getAllStock(),
                        data: l,
                        idx: e,
                        left: R.DIMENSION.posX,
                        top: R.DIMENSION.H_MA4K,
                        interacting: !!s
                    })
                }
            }
        },
        ie = new
        function() {
            var e, a, n, r, o, s = isNaN(i.nfloat) ? 2 : i.nfloat,
            l = 137,
            h = new
            function() {
                var t = function(t) {
                    var a = e.body.style;
                    t && R.custom.show_floater ? (a.backgroundColor = R.COLOR.F_BG, a.color = R.COLOR.F_T, a.border = "1px solid " + R.COLOR.F_BR, a.display = "") : a.display = "none"
                };
                this.pv = function(a) {
                    s = isNaN(i.nfloat) ? 2 : i.nfloat;
                    var n = e.body.style,
                    r = Math.max(R.DIMENSION.posX, 55) + 9,
                    o = R.DIMENSION.posX < 55 ? 9 : 0,
                    c = R.DIMENSION.getStageW() - l - 9 - R.DIMENSION.RIGHT_W - o;
                    n.left = (a.x > R.DIMENSION.getStageW() - R.DIMENSION.RIGHT_W >> 1 ? r: c) + "px",
                    n.top = (a.y || 0) + "px",
                    t(!0)
                },
                this.showFloater = t
            },
            u = function() {
                function t() {
                    var e = W.getAllStock()[0];
                    return ! ("HK" != e.market || "indx" != e.hq.type)
                }
                function i() {
                    var e, a, i, n = "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;",
                    r = "font-weight:normal;border:0;height:16px;text-align:center;",
                    o = "text-align:left;font-weight:normal;border:0;height:16px;",
                    c = "text-align:right;border:0;height:16px;",
                    d = m("div");
                    d.style.position = "absolute",
                    d.style.zIndex = R.PARAM.I_Z_INDEX + 2,
                    d.style.padding = "2px",
                    d.style.width = l + "px",
                    d.style.lineHeight = "16px",
                    d.style.display = "none",
                    d.style.fontSize = "12px";
                    var h, p, u, f, v = m("table"),
                    g = m("thead"),
                    b = m("tbody");
                    v.style.cssText = n,
                    h = m("tr"),
                    p = m("th"),
                    p.setAttribute("colspan", "2"),
                    p.style.cssText = r;
                    var y = m("span");
                    p.appendChild(y),
                    h.appendChild(p),
                    g.appendChild(h),
                    h = m("tr"),
                    h.style.textAlign = "center",
                    p = m("th"),
                    p.setAttribute("colspan", "2"),
                    p.style.cssText = r;
                    var N = m("span");
                    p.appendChild(N),
                    h.appendChild(p),
                    b.appendChild(h),
                    h = m("tr"),
                    p = m("th"),
                    p.style.cssText = o,
                    u = m("td"),
                    p.style.fontWeight = "normal",
                    f = m("span"),
                    f.innerHTML = "\u4ef7\u683c";
                    var _ = m("span");
                    u.style.cssText = c,
                    p.appendChild(f),
                    u.appendChild(_),
                    p.style.fontWeight = "normal",
                    h.appendChild(p),
                    h.appendChild(u),
                    b.appendChild(h),
                    h = m("tr"),
                    p = m("th"),
                    p.style.cssText = o,
                    p.style.fontWeight = "normal",
                    u = m("td"),
                    f = m("span"),
                    f.innerHTML = "\u5747\u4ef7";
                    var k = m("span");
                    u.style.cssText = c,
                    p.appendChild(f),
                    p.style.fontWeight = "normal",
                    u.appendChild(k),
                    h.appendChild(p),
                    h.appendChild(u),
                    b.appendChild(h),
                    h = m("tr"),
                    p = m("th"),
                    p.style.cssText = o,
                    u = m("td"),
                    p.style.fontWeight = "normal",
                    f = m("span"),
                    f.innerHTML = "\u6da8\u8dcc";
                    var w = m("span");
                    u.style.cssText = c,
                    p.appendChild(f),
                    u.appendChild(w),
                    h.appendChild(p),
                    h.appendChild(u),
                    b.appendChild(h),
                    h = m("tr"),
                    p = m("th"),
                    p.style.cssText = o,
                    u = m("td"),
                    p.style.fontWeight = "normal",
                    f = m("span"),
                    f.innerHTML = "\u6210\u4ea4";
                    var M = m("span");
                    u.style.cssText = c,
                    "HF" != S && (p.appendChild(f), u.appendChild(M), h.appendChild(p), h.appendChild(u), b.appendChild(h)),
                    v.appendChild(g),
                    v.appendChild(b),
                    v.style.width = "100%",
                    d.appendChild(v);
                    var I = function(e, t) {
                        var a = R.COLOR.F_N;
                        return e > t ? a = R.COLOR.F_RISE: t > e && (a = R.COLOR.F_FALL),
                        a
                    };
                    this.setFloaterData = function(n) {
                        if (e = n.name || e || "", y.innerHTML = e, i = n.time || i, a = n.data || a) {
                            N.innerHTML = i;
                            var r = a,
                            o = Number(r.percent),
                            l = Number(r.price),
                            c = Number(r.prevclose),
                            d = Number(r.avg_price),
                            h = r.change,
                            m = 1 > l || 1 > d ? 4 : s;
                            "HF" == S && (3 > l || 3 > d ? m = 4 : (99 > l || 99 > d) && (m = 3)),
                            o = isNaN(o) ? "--": (100 * o).toFixed(2),
                            _.innerHTML = l.toFixed(m),
                            k.innerHTML = t() ? "--": d.toFixed(m),
                            w.innerHTML = h.toFixed(m) + "(" + o + "%)",
                            M.innerHTML = D(r.volume < 0 ? 0 : r.volume, 2) + O,
                            w.style.color = I(o, 0),
                            k.style.color = I(d - c, 0),
                            _.style.color = I(o, 0)
                        }
                    },
                    this.body = d
                }
                a = new i,
                e = a
            },
            f = function() {
                function e(e) {
                    var t = m("div"),
                    a = m("div"),
                    i = m("span"),
                    n = m("span"),
                    r = e.isH,
                    o = 12,
                    s = function() {
                        if (a.style.borderStyle = "dashed", a.style.borderColor = R.COLOR.IVH_LINE, i.style.backgroundColor = n.style.backgroundColor = R.COLOR[e.txtBgCN], i.style.color = n.style.color = R.COLOR[e.txtCN], r) a.style.borderWidth = "1px 0 0 0",
                        t.style.width = a.style.width = R.DIMENSION.getStageW() - R.DIMENSION.RIGHT_W + "px",
                        i.style.top = -(.6 * R.STYLE.FONT_SIZE) + "px",
                        n.style.top = -(.6 * R.STYLE.FONT_SIZE) + "px",
                        i.style.left = 0,
                        n.style.left = R.DIMENSION.extend_draw ? R.DIMENSION.getStageW() - 55 + 2 * R.DIMENSION.RIGHT_W + "px": R.DIMENSION.getStageW() - R.DIMENSION.RIGHT_W + "px",
                        i.style.width = n.style.width = R.DIMENSION.extend_draw ? "": R.DIMENSION.posX + "px",
                        i.style.padding = "1px 0",
                        n.style.padding = "1px 0";
                        else {
                            a.style.borderWidth = "0 1px 0 0";
                            var o, s, l = R.DIMENSION.H_MA4K + R.DIMENSION.H_T_B;
                            R.DIMENSION.getStageH() < 0 ? (o = z.clientHeight, s = o - l) : (o = R.DIMENSION.getStageH() - G.clientHeight || 0, s = R.DIMENSION.h_t),
                            o -= l,
                            o += R.DIMENSION.I_V_O,
                            t.style.height = a.style.height = o + "px",
                            i.style.top = s + "px",
                            i.style.padding = "2px 2px 1px"
                        }
                    };
                    t.style.position = "absolute",
                    t.style.zIndex = R.PARAM.I_Z_INDEX - 2,
                    i.style.position = n.style.position = a.style.position = "absolute",
                    a.style.zIndex = 0,
                    i.style.zIndex = n.style.zIndex = 1,
                    i.style.font = n.style.font = R.STYLE.FONT_SIZE + "px " + R.STYLE.FONT_FAMILY,
                    i.style.whiteSpace = n.style.whiteSpace = "nowrap",
                    i.style.lineHeight = o + "px",
                    n.style.lineHeight = o + "px",
                    e.txtA && (i.style.textAlign = e.txtA) && (n.style.textAlign = "left"),
                    e.txtBgCN && (i.style.backgroundColor = R.COLOR[e.txtBgCN]) && (n.style.backgroundColor = R.COLOR[e.txtBgCN]),
                    s(),
                    t.appendChild(i),
                    r && t.appendChild(n),
                    t.appendChild(a);
                    var l = function(e) {
                        e ? "" != t.style.display && (t.style.display = "") : "none" != t.style.display && (t.style.display = "none")
                    };
                    this.pv = function(e) {
                        if (!isNaN(e.y) && (t.style.top = e.y + (e.oy || 0) + "px"), i.innerHTML = e.v || "", e.p ? (n.innerHTML = isNaN(Number(e.p.replace("%", ""))) ? "0.00%": e.p, n.style.display = "") : n.style.display = "none", !isNaN(e.x)) {
                            var a = e.x + (e.ox || 0),
                            r = R.DIMENSION.getStageW();
                            t.style.left = a + "px";
                            var o = i.offsetWidth;
                            if (0 >= o && (o = 112), o > 0) {
                                var s = o >> 1;
                                e.x < s ? s = e.x: a + s > r - R.DIMENSION.posX && (s = a + o - r + R.DIMENSION.posX),
                                i.style.left = -s + "px"
                            }
                        }
                        l(!0)
                    },
                    this.display = l,
                    this.body = t,
                    this.resize = s,
                    l(!1)
                }
                n = new e({
                    isH: !0,
                    txtCN: "P_TC",
                    txtBgCN: "P_BG",
                    txtA: "right"
                }),
                r = new e({
                    isH: !1,
                    txtCN: "T_TC",
                    txtBgCN: "T_BG",
                    txtA: "center"
                }),
                q.appendChild(r.body)
            },
            v = function() {
                n.display(!1),
                r.display(!1),
                h.showFloater(!1)
            },
            y = function() {
                var e = W.getAllStock(),
                t = e[0].datas.length,
                a = 0;
                return e[0].realLen >= 0 && (a = 5 == Q.end ? e[0].realLen + R.datas.tDataLen * (t - 1) : R.datas.tDataLen * (t - 1)),
                a
            },
            N = function(e) {
                e > 2e3 && (e = y()),
                0 > e || (B && B.indirectI(e), j && j.indirectI(e))
            },
            _ = function() {
                N(y()),
                B && B.allDraw()
            },
            w = !0,
            M = 0,
            I = 0,
            T = 0 / 0,
            x = 0 / 0;
            this.iToD = function(a, i, o) {
                var l = a.x,
                m = a.ox || 0,
                p = a.y,
                u = a.oy || 0,
                f = a.mark,
                y = a.rmark,
                _ = a.e ? a.e.target: null;
                if (!o) {
                    if (T == l && x == p) return;
                    T = l,
                    x = p
                }
                if (_) {
                    var D = _.style.height.split("px")[0]; (0 > p || p > Number(D)) && (l = 0 / 0, p = 0 / 0)
                }
                var O, L = W.getAllStock(),
                C = L.length,
                F = H,
                E = C > 1,
                P = L[0].datas.length,
                U = F * P,
                q = Math.floor(l * U / R.DIMENSION.w_t);
                if (isNaN(l) && isNaN(p)) {
                    if (w = !0, v(), b(L[0].datas[P - 1][0].date, L[0].hq.date)) {
                        var $;
                        $ = L[0].realLen >= 0 ? (F - 1) * (P - 1) + L[0].realLen: Number.MAX_VALUE,
                        N($)
                    } else N(Number.MAX_VALUE);
                    return void ae.onViewPrice()
                }
                w = !1,
                I = q;
                for (var V, K, z, G, X, B, j, Y, Z = [], J = Number.MAX_VALUE, ee = C; ee--;) if (B = L[ee].datas, Z = Z.concat(B), B) {
                    var te = Math.floor(q / F),
                    ie = q % F;
                    if (!B[te]) return;
                    if (j = B[te][ie], j.date = B[te][0].date, E && L[ee].dAdd <= 1) Y = Math.abs(j.py - p),
                    J > Y && (K = ee, J = Y, O = j, z = L[ee], G = L[ee].getName(), X = L[ee].getStockType()),
                    y = V = i ? (100 * f).toFixed(2) + "%": f.toFixed(s);
                    else {
                        switch (K = ee, z = L[ee], G = L[ee].getName(), X = L[ee].getStockType(), S) {
                        case "HK":
                            V = f.toFixed(1 > f && f > 0 || f > -1 && 0 > f ? 3 : s);
                            break;
                        case "HF":
                            V = f.toFixed(3 > f ? 4 : 99 > f ? 3 : s);
                            break;
                        default:
                            V = f.toFixed(1 > f && f > 0 || f > -1 && 0 > f ? 4 : s)
                        }
                        V = f > 99999 ? Math.floor(f) : f > 9999 ? f.toFixed(1) : V,
                        O = j
                    }
                }
                var ne = j && j.date;
                M = 0 == L[0].realLen ? 0 : L[0].realLen - 1;
                var re = "string" != typeof L[0].date ? g.ds(L[0].date) : L[0].date;
                if (P > 1) {
                    z.realLen < 0 && (z.realLen = H);
                    var oe = U - F + z.realLen;
                    5 == Q.end && q >= oe && (q = oe, O = Z[te][q % H])
                } else {
                    if (g.stbd(ne, g.sd(re))) - 1 == z.realLen && (z.realLen = H),
                    q >= z.realLen && (q = z.realLen);
                    else switch (S) {
                    case "HF":
                    case "NF":
                        q >= z.realLen && 4 == Q.start && (q = z.realLen);
                        break;
                    default:
                        M = H - 1
                    }
                    "HF" != S && "NF" != S && g.stbd(ne, g.sd(re)) && z.hq && z.hq.time >= "09:00" && z.hq.time < "09:30" ? O = {
                        price: z.hq.preopen,
                        avg_price: z.hq.preopen,
                        prevclose: z.hq.prevclose,
                        percent: (z.hq.open - z.hq.prevclose) / z.hq.prevclose,
                        change: z.hq.preopen - z.hq.price,
                        volume: z.hq.totalVolume,
                        ix: .1,
                        time: z.hq.time
                    }: (O = z.datas[0][q], O.prevclose = z.datas[0][0].prevclose)
                }
                if (O && (O.date || (O.date = ne), !O || O.date)) {
                    var se = l;
                    R.custom.stick && (l = O.ix || l);
                    var le, ce;
                    "HF" == S ? (le = c.time[0][0], le > O.time ? (le = O.date, ce = new Date(le), ce.setDate(ce.getDate() + 1)) : ce = O.date) : "NF" == S ? (le = d.time[0][0], le <= O.time && "21:00" == le ? (le = O.date, ce = new Date(le), ce.setDate(ce.getDate() - 1), 0 == ce.getDay() && ce.setDate(ce.getDate() - 2)) : O.time < "03:00" && 1 == O.date.getDay() ? (ce = new Date(O.date), ce.setDate(ce.getDate() - 2)) : ce = O.date) : ce = O.date;
                    var de = t.dateUtil.ds(ce, "/", !1) + "/" + t.dateUtil.nw(ce.getDay()) + (O.time || "");
                    O.day = de,
                    e && (e.setFloaterData({
                        stocktype: X,
                        name: G,
                        time: de,
                        data: O
                    }), h.pv({
                        x: se,
                        y: R.DIMENSION.T_F_T
                    })),
                    n.pv({
                        y: p,
                        oy: u,
                        v: V,
                        p: y
                    }),
                    r.pv({
                        v: de,
                        x: l,
                        ox: m,
                        y: R.DIMENSION.H_MA4K
                    }),
                    N(q),
                    ae.onViewPrice(O, q, G, !w),
                    A.re(k.e.I_EVT, a.e)
                }
            },
            this.globalDragHandler = function(e, t, a, i, n) {
                isNaN(e) && isNaN(t) && A.re(k.e.I_EVT, n)
            },
            this.zoomView = function() {},
            u(),
            f(),
            this.onResize = function() {
                n.resize(),
                r.resize()
            },
            this.iHLineO = n,
            this.hideIUis = v,
            this.iToKb = function(e) {
                I += e,
                M = I;
                var t = W.getAllStock(),
                a = t[0].datas.length,
                i = t[0].datas[0][I],
                n = t.length,
                r = t[0].realLen,
                o = "string" != typeof t[0].date ? g.ds(t[0].date) : t[0].date;
                1 >= a ? g.stbd(t[0].datas[0][0].date, g.sd(o)) ? 0 > r && (r = H) : r = H: g.stbd(t[0].datas[a - 1][0].date, g.sd(o)) || (r = H);
                var s = H > r ? r + 1 : r;
                if (0 > I) {
                    var l = H > r ? r: r - 1;
                    M = I = (a - 1) * H + l,
                    i = t[0].datas[a - 1][l]
                } else if (I >= s + (a - 1) * H) if (g.stbd(t[0].datas[a - 1][0].date, g.sd(o)) && 0 > e) {
                    var c = 0;
                    c = a > 1 ? r - 1 + H * (a - 1) : r - 1,
                    M = I = c,
                    i = t[0].datas[0][M]
                } else M = I = 0,
                i = t[0].datas[0][0]; ! p($, ie.iHLineO.body) && $.appendChild(ie.iHLineO.body);
                var d = Math.floor(M / H);
                I >= H && (i = t[0].datas[d][M - d * H]),
                i.date = t[0].datas[d][0].date;
                var h = n > 1 ? i.percent: i.price,
                m = {
                    idx: I,
                    name: t[0].getName(),
                    mark: h,
                    datas: t[0].datas,
                    data: i,
                    x: i.ix,
                    y: i.py,
                    oy: R.DIMENSION.H_MA4K,
                    ox: R.DIMENSION.posX
                };
                this.iToD(m, !0, !0)
            },
            this.isIng = function() {
                return ! w
            },
            this.isMoving = function() {
                return ! 1
            },
            this.iReset = function() {},
            this.patcher = new
            function() {
                var i, n = {},
                r = function() {
                    if (i) {
                        e.body.parentNode && e.body.parentNode.removeChild(e.body);
                        var t = "vid_" + Q.viewId;
                        if (i[t]) {
                            var r;
                            r = n[t] ? n[t] : n[t] = new i[t],
                            e = r
                        } else e = a
                    } else e = a; ! p(q, e.body) && q.appendChild(e.body)
                };
                this.customFloater = function(e) {
                    i = e,
                    r(),
                    t.stc("t_fl", e)
                },
                this.switchFloater = r
            },
            this.update = function() {
                var a = W.getAllStock();
                if (a) {
                    var i, n = a[0],
                    r = n.datas.length,
                    s = 0;
                    if (n) {
                        if (I > r * (H - 1) && (I = 0), i = Math.floor(I / (H - 1)), r == i && (i -= 1), I > H - 1) {
                            var l = I - H * i;
                            s = b(n.datas[i][0].date, n.hq.date) && l > M ? n.realLen: l
                        } else s = 1 == r && 0 == i && I > M ? n.realLen: I;
                        if (i = 0 > i ? 0 : i, s = 0 > s ? 0 : s, o = n.datas[i][s]) if (o.day = t.dateUtil.ds(n.datas[i][0].date, "/", !1) + "/" + t.dateUtil.nw(n.datas[i][0].date.getDay()) + (o.time || ""), e && e.setFloaterData({}), w) if (b(n.datas[r - 1][0].date, n.hq.date)) s = n.realLen >= 0 ? n.realLen: H - 1,
                        s += (r - 1) * H,
                        s = 0 > s ? Number.MAX_VALUE: s,
                        N(s);
                        else {
                            if ("NF" == S && n.hq.time >= "21:00") return n.realLen >= 0 && (s = n.realLen),
                            void(4 == Q.start && 5 == Q.end && ae.onViewPrice(o, s, void 0, !w));
                            _()
                        } else if ("HF" == S) 4 == Q.start && 5 == Q.end && ae.onViewPrice(o, s, void 0, !w);
                        else if ("NF" == S) {
                            var c = new Date(o.date);
                            o.date && o.time >= "21:00" && (c.setDate(1 == o.date.getDay() ? c.getDate() - 3 : c.getDate() - 1), o.day = t.dateUtil.ds(c, "/", !1) + "/" + t.dateUtil.nw(c.getDay()) + (o.time || "")),
                            ae.onViewPrice(o, s, void 0, !w)
                        } else ae.onViewPrice(o, s, void 0, !w)
                    }
                }
            }
        };
        return r = new
        function() {
            var e = this,
            a = function(a, i) {
                if (R.hasOwnProperty(a)) {
                    for (var n in i) if (i.hasOwnProperty(n) && t.isFunc(i[n])) return void t.trace.error("illegal operation:", n);
                    v(R[a], i),
                    t.stc(a, i),
                    e.resize()
                } else t.trace.error("not exist param:", a)
            },
            n = function(e, a) {
                var i;
                if (R.hasOwnProperty(e)) {
                    i = t.clone(R[e]);
                    for (var n in i) if (i.hasOwnProperty(n) && t.isFunc(i[n])) i[n] = null,
                    delete i[n];
                    else if (a) for (var r = a.length; r--;) typeof i[n] === a[r] && (i[n] = null, delete i[n])
                }
                return i
            },
            r = function(e, t, a) {
                a = v({
                    toremove: !1,
                    isexclusive: !1,
                    callback: void 0
                },
                a),
                a.toremove ? W.mM.removeAC(t, e) : a.isexclusive ? (W.mM.removeAC(null, e), W.mM.newAC(t, e, a)) : W.mM.newAC(t, e, a)
            },
            o = function(e) {
                Q.viewId = e,
                Q.start = 1 == e ? 4 : 0,
                Q.end = 5
            };
            this.pushData = function(e, a) { ! t.isArr(e) && (e = [e]),
                W.pushData(e, a)
            };
            var s;
            this.pushTr = function(e) {
                e && e.data && (clearTimeout(s), s = setTimeout(function() {
                    var t = e.data.split(","),
                    a = e.symbol,
                    i = e.market,
                    n = {
                        symbol: a,
                        data: t[t.length - 1],
                        market: i
                    };
                    W.pushData([n], 1)
                },
                20))
            },
            this.setScale = function(e) {
                W.setScale(e),
                t.stc("t_scale", e)
            };
            var l = !0;
            this.showView = function(e, a) {
                ie.hideIUis(),
                l ? l = !1 : Z.hide();
                var n = k.URLHASH.vi(e);
                if (i.date) return i.date = "",
                o(n),
                void this.newSymbol(i);
                var r = W.getAllStock()[0];
                if (ae.onRange(r), t.stc("t_v", e), t.suda("vw", e), Q.viewId != n) {
                    if (o(n), "HF" == S && "t5" == e && 0 == L) return Z.show(),
                    L = 1,
                    void W.update5Data(e);
                    W.onChangeView(!1, a),
                    ae && ae.onViewPrice()
                }
            };
            var c = function(e) {
                var a;
                return a = t.isStr(e.symbol) ? e.symbol.split(",") : [e.symbol]
            },
            d = [];
            this.overlay = function(e, t) {
                if (W && 1 != W.dAdd) if (t) {
                    W.removeCompare(c(e));
                    for (var a = 0; a < d.length; a++) e.symbol == d[a] && d.splice(a, 1);
                    W.getAllStock().length <= 1 && (W.dAdd = 0)
                } else i.overlaycolor = e.linecolor || {
                    K_N: "#cccccc"
                },
                W.dAdd = 2,
                W.compare(e),
                d.push(e.symbol)
            },
            this.compare = function(e, a) {
                if (W) {
                    var i, n = 0;
                    if (a) {
                        if (i = t.isStr(e) ? e.split(",") : [e.symbol], 1 == W.dAdd && W.removeCompare(i), W.getAllStock().length <= 1) {
                            for (n = 0; n < d.length; n++) W.dAdd = 2,
                            W.compare({
                                symbol: d[n]
                            });
                            d.length < 1 && (W.dAdd = 0)
                        }
                    } else 2 == W.dAdd && W.removeCompare(d),
                    W.dAdd = 1,
                    W.compare(e),
                    t.suda("t_comp");
                    t.stc("t_comp", {
                        rm: a,
                        o: e
                    })
                }
            },
            this.tCharts = function(e, t) {
                r("tech", e, t)
            },
            this.pCharts = function(e, t) {
                r("price", e, t)
            },
            this.showPCharts = function(e) {
                e && (W.mM.togglePt(e), t.stc("t_sp", e))
            },
            this.getIndicators = function() {
                var e = B ? B.getLog() : null,
                t = j ? j.getLog() : null;
                return {
                    tCharts: e,
                    pCharts: t
                }
            };
            var m;
            this.showRangeSelector = function(e) {
                m = v({
                    dispaly: !0,
                    from: void 0,
                    to: void 0
                },
                e),
                W.mM.showRs(m),
                t.stc("t_rs", e)
            },
            this.setLineStyle = function(e) {
                W && W.setTLineStyle(e),
                t.stc("t_style", e)
            },
            this.setCustom = _(a, this, "custom"),
            this.setDimension = _(a, this, "DIMENSION"),
            this.getDimension = _(n, null, "DIMENSION", ["boolean"]),
            this.setTheme = function(e) {
                var t = te.initTheme(e);
                t && (this.setLineStyle({
                    linecolor: e
                }), this.resize())
            },
            this.newSymbol = function(e) {
                if (i.symbol = e.symbol, i.date = e.date, ie.hideIUis(), ie.iReset(), W.dcReset(), W.dcInit(i), E.hideTip(), B) {
                    var a = B.getLog();
                    B = null,
                    a && this.tCharts(a)
                }
                if (j) {
                    var n = j.getLog();
                    j = null,
                    n && this.pCharts(n)
                }
                m && (m.from = void 0, m.to = void 0, W.mM.showRs(m)),
                t.stc("t_ns", e)
            },
            this.resize = function(e, t) {
                te.resizeAll(!0, e, t)
            },
            this.hide = function(e) {
                ee = !0,
                ie.hideIUis(),
                t.$CONTAINS(U, q) && U.removeChild(q),
                e && W.dcReset()
            },
            this.show = function(e) {
                ee = !1,
                e && (t.isStr(e) && (e = h(e)), U = e),
                t.$CONTAINS(U, q) || (U.appendChild(q), te.resizeAll(!0)),
                ae && ae.onViewPrice()
            },
            this.shareTo = function(e) {
                W.shareTo(e),
                t.stc("t_share", e);
                var a = e && e.type ? e.type: "weibo";
                t.suda("share", a)
            },
            this.getChartId = function() {
                return R.uid
            },
            this.dateTo = function(e, a) {
                i.historytime = e,
                i.historycb = a;
                var n = e;
                "object" == typeof e ? n = g.ds(e, "-") : e = g.sd(e);
                var r = X.get();
                if (null == r) return void(x = 1);
                for (var o = r.length,
                s = 0; o > s; s++) if (g.stbd(e, r[s][0].date)) return void W.moving(s, s + 1, "dateTo");
                i.date = n,
                W.hasHistory = a,
                t.stc("t_ft", n),
                this.newSymbol(i)
            },
            this.showScale = function(e) {
                W && W.setScale(e)
            },
            this.resize = function(e, t) {
                te.resizeAll(!0, e, t)
            },
            this.showCompatibleTip = function(e) {
                te.showCompatibleTip(e)
            },
            this.toggleExtend = function() {
                var e = R.DIMENSION.extend_draw,
                t = R.DIMENSION.posX;
                a.call(this, "DIMENSION", {
                    extend_draw: !e,
                    posX: t > 9 ? 7 : 55,
                    RIGHT_W: t > 9 ? 7 : 55
                }),
                this.resize()
            },
            this.historyData = function() {
                return W.historyData
            },
            this.getExtraData = function(e) {
                return W.getExtraData(e)
            },
            this.patcher = {
                iMgr: ie.patcher
            },
            this.zoom = function(e) {
                W.zoomApi(e),
                t.stc("t_zoom", e, 9e3)
            },
            this.move = function(e) {
                e = parseInt(e),
                isNaN(e) || (W.moveApi(e), t.stc("t_move", e, 9e3))
            },
            this.getSymbols = function() {
                return W.getAllSymbols()
            },
            this.update = function() {
                W.updateDataAll(),
                t.stc("t_up", "update", 9e3)
            },
            this.getCurrentData = function() {
                return ae.currentData()
            },
            this.viewState = Q,
            this.me = A,
            this.type = "h5t"
        },
        W = new I,
        W.dcInit(i),
        r
    }
    function n() {
        function e(e, a) {
            var n = new i(e),
            r = function(e) {
                n.me.rl(e, r)
            };
            n.me.al(k.e.T_DATA_LOADED, r),
            t.isFunc(a) && a(n)
        }
        this.get = function(a, i) {
            t.stc("h5t_get"),
            t.suda("h5t_" + t.market(a.symbol));
            var n;
            0 == location.protocol.indexOf("https:") && (n = !0);
            var r = t.market(a.symbol),
            o = "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol";
            switch (n && (o = t.getSUrl(o)), r) {
            case "HF":
                c = "kke_future_" + a.symbol,
                t.load(o.replace("$symbol", a.symbol.replace("hf_", "")).replace("$market", "hf").replace("$cb", "var " + c),
                function() {
                    c = window[c] || {
                        time: [["06:00", "23:59"], ["00:00", "05:00"]]
                    },
                    e(a, i)
                });
                break;
            case "NF":
                d = "kke_future_" + a.symbol;
                var s = a.symbol.replace("nf_", "").replace(/[\d]+$/, "");
                t.load(o.replace("$symbol", s).replace("$market", "nf").replace("$cb", "var " + d),
                function() {
                    d = window[d] || {
                        time: [["09:30", "11:29"], ["13:00", "02:59"]]
                    },
                    d.inited = 0,
                    e(a, i)
                });
                break;
            default:
                e(a, i)
            }
        }
    }
    var r, o, s, l, c, d, h = t.$DOM,
    m = t.$C,
    p = t.$CONTAINS,
    u = t.xh5_PosUtil,
    f = t.xh5_EvtUtil,
    v = t.oc,
    g = t.dateUtil,
    b = t.dateUtil.stbd,
    y = t.xh5_ADJUST_HIGH_LOW.c,
    N = t.xh5_BrowserUtil,
    _ = t.fBind,
    D = t.strUtil.ps,
    k = e.globalCfg,
    w = t.logoM;
    return t.fInherit(i, t.xh5_EvtDispatcher),
    n
});;
