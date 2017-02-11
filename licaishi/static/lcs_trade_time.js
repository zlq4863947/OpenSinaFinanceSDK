var LCS_TRADE_TIME = LCS_TRADE_TIME || {};
!function(t) {
    function i(i, n) {
        if (this.target = t("string" == typeof i ? "#" + i : i),
        this.target.length) {
            var a = n || this.target.data();
            a.type || (a = e(this.target)),
            this.options = t.extend({}, s, a),
            this._create(),
            this._addEvents()
        }
    }
    function e(t) {
        for (var i, e, n = {}, a = 0; a < c.length; ++a)
            i = c[a],
            (e = t.attr("data-" + i)) && (n[i] = t.attr("data-" + i));
        return n
    }
    function n(t) {
        var i, e, n = d, a = [];
        t = t || {};
        for (i in t)
            t.hasOwnProperty(i) && (e = t[i],
            a.push(i + "=" + e));
        return n + (/\?/g.test(n) ? "&" : "?") + a.join("&")
    }
    var a = t.fn || {};
    a.on = a.on || a.delegate;
    var r = ["", {
        width: "100%",
        height: "278"
    }, {
        width: "100%",
        height: "60"
    }, {
        width: "100%",
        height: "600"
    }, {
        width: "100%",
        height: "420"
    }]
      , o = ["", "right-side-content", "hq-top-content", "hq-dk-content", "stock-right-content"]
      , h = {
        1: "8888",
        3: "8892",
        4: "8889",
        6: "8890",
        7: "8891"
    }
      , s = {
        type: 1,
        indid: 1
    }
      , d = "http://finance.sina.com.cn/licaishi/iframe/lcs_trade_time.html";
    i.prototype = {
        _create: function() {
            var i = this.options
              , e = 1 * i.type
              , a = r[e] || {};
            i.ifrId = this.ifrId = "ifr_" + Math.random().toString(36).substring(2),
            this.iframe = t('<iframe id="' + this.ifrId + '" class="sina-lcs-iframe ' + o[e] + '" frameborder="0" height="' + a.height + '" width="' + a.width + '" marginheight="0" marginwidth="0" scrolling="no" src="' + n(i) + '"></iframe>'),
            this.target.append(this.iframe)
        },
        _addEvents: function() {
            var i = this.options
              , e = 1 * i.type
              , n = 1 * i.indid;
            1 * e === 1 && t("body").on("click.lcs_trade_time", '#sinaTextPageComment a[comment-type="submit"], #J_Comment_Form_B .J_Comment_Submit', function() {
                var i = t(this)
                  , e = t('#sinaTextPageComment textarea[comment-type="cont"]');
                return e.length < 1 && (e = t('#J_Comment_Form_B textarea[name="content"]')),
                i.is(".btn-disabled") || i.is(".post_inline_comment_disbled") ? !1 : void t.ajax({
                    url: "http://licaishi.sina.com.cn/api/balaComment",
                    dataType: "jsonp",
                    data: {
                        grp: "finance",
                        url: encodeURIComponent(window.location.href),
                        cmn_type: "51",
                        relation_id: h[n] || "8888",
                        content: t.trim(e.val()),
                        debug: 1
                    },
                    success: function() {}
                })
            })
        }
    };
    var c = ["type", "indid"]
      , m = LCS_TRADE_TIME.execute = function(t, e) {
        return new i(t,e)
    }
    ;
    t('[node-type="lcsTradeTimeContent"]').each(function() {
        m(this)
    })
}(window.jQuery);
