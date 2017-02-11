xh5_define("datas.hq", ["utils.util"], function(self) {
  var cb = self.load;
  var fn = self.fBind;
  var _ = self.market;
  var data_priv = self.cookieUtil;
  var test = self.dateUtil;
  var event = self.tUtil;
  /** @type {boolean} */
  var secure = 0 == location.protocol.indexOf("https:");
  var isETag = new function() {
    var isETag;
    /** @type {string} */
    var elem = "sinaH5EtagStatus";
    var options = {
      domain : "",
      path : "/",
      expires : 3600
    };
    /** @type {string} */
    var pdataOld = "n";
    /** @type {string} */
    var pdataCur = "y";
    /** @type {number} */
    var node = 0;
    /** @type {string} */
    var er = (secure ? "https" : "http") + "://hq.sinajs.cn/list=sys_hqEtagMode";
    /**
     * @return {undefined}
     */
    var onComplete = function() {
      cb(er, function() {
        var parent = window.hq_str_sys_hqEtagMode;
        if (0 == node) {
          node = parent;
        } else {
          if (node == parent) {
            /** @type {boolean} */
            isETag = false;
            data_priv.set(elem, pdataOld, options);
          } else {
            /** @type {boolean} */
            isETag = true;
            data_priv.set(elem, pdataCur, options);
          }
          /** @type {number} */
          node = 0;
        }
      });
    };
    /**
     * @return {undefined}
     */
    var finish = function() {
      var hasBody = data_priv.get(elem);
      switch(hasBody) {
        case pdataOld:
          /** @type {boolean} */
          isETag = false;
          break;
        case pdataCur:
          /** @type {boolean} */
          isETag = true;
          break;
        default:
          /** @type {boolean} */
          isETag = false;
          onComplete();
      }
    };
    finish();
    setInterval(finish, 2E3);
    /**
     * @return {?}
     */
    this.isETag = function() {
      return isETag;
    };
  };
  /**
   * @return {undefined}
   */
  var create = function() {
    /**
     * @param {string} d
     * @param {Array} callback
     * @param {?} content
     * @return {?}
     */
    function isValid(d, callback, content) {
      var scope = {};
      var data = results[d];
      if (!data) {
        data = {
          symbol : d
        };
        results[d] = data;
      }
      var rendered = handle.trHandler(content, data);
      if (rendered) {
        data.trstr = content;
      }
      scope[d] = data;
      var error = {
        msg : "",
        dataObj : scope
      };
      return self.isFunc(callback) && callback(error), error;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function func(name) {
      return/^nf_(IF|IC|IH|TF)\w+$/.test(name) ? "CFF" : /^nf_T(\d{4}|0)$/.test(name) ? "CFF" : "NF";
    }
    /**
     * @param {string} status
     * @param {Array} onComplete
     * @param {Node} d
     * @param {Object} args
     * @return {?}
     */
    function start(status, onComplete, d, args) {
      if (args && --args.count > 0) {
        return null;
      }
      var name;
      var message;
      var result;
      var current;
      var obj;
      var temp;
      var configList = status.split(",");
      /** @type {Array} */
      var results = [];
      var dst = {};
      /** @type {number} */
      var i = 0;
      var l = configList.length;
      for (;l > i;i++) {
        if (name = configList[i], result = cache[name], result || (result = {
          symbol : name
        }, cache[name] = result), message = _(name), d) {
          /** @type {Node} */
          current = d;
        } else {
          switch(current = window["hq_str_" + name], message) {
            case "HK":
              obj = window["hq_str_" + name.replace("rt_", "") + "_i"];
              break;
            default:
              obj = window["hq_str_" + name + "_i"];
          }
          if ("US" == message) {
            var value = window.hq_str_gb_$ixic || (window.hq_str_gb_ixic || (window.hq_str_gb_$dji || window.hq_str_gb_dji))
          }
        }
        temp = current && current.length > 0 ? current.split(",") : void 0;
        var $;
        switch(message) {
          case "CN":
            $ = handle;
            break;
          case "CNI":
            $ = handle;
            break;
          case "US":
            $ = T;
            break;
          case "HK":
            $ = S;
            break;
          case "OTC":
            $ = E;
            break;
          case "HF":
            $ = P;
            break;
          case "NF":
            $ = "CFF" == func(name) ? jQuery : CFF;
            break;
          case "fund":
            $ = D;
            break;
          case "option_cn":
            $ = k;
            break;
          case "forex":
          ;
          case "forex_yt":
            $ = v;
            break;
          case "CFF":
            $ = jQuery;
            break;
          default:
            $ = void 0;
        }
        /** @type {boolean} */
        var data = true;
        if ($) {
          data = $.update(temp, result, obj, value);
        }
        if (data) {
          result.hqstr = current;
        }
        results.push(result);
        dst[name] = result;
      }
      var info = {
        msg : "",
        data : results,
        dataObj : dst
      };
      return self.isFunc(onComplete) && onComplete(info), info;
    }
    /**
     * @param {string} event
     * @return {?}
     */
    function next(event) {
      /** @type {number} */
      var size = 40;
      var vals = event.split(",");
      /** @type {Array} */
      var arrays = [];
      vals = self.uae(vals);
      for (;vals.length > size;) {
        arrays.push(vals.splice(0, size));
      }
      return arrays.push(vals.splice(0, vals.length)), arrays;
    }
    /** @type {string} */
    this.VER = "2.6.9";
    var tref;
    var clt = {
      "00" : "",
      "01" : "\u505c\u724c\u4e00\u5c0f\u65f6",
      "02" : "\u505c\u724c\u4e00\u5929",
      "03" : "\u8fde\u7eed\u505c\u724c",
      "04" : "\u76d8\u4e2d\u505c\u724c",
      "05" : "\u505c\u724c\u534a\u5929",
      "06" : "\u505c\u724c\u534a\u5c0f\u65f6",
      "07" : "\u6682\u505c",
      "08" : "\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad",
      "09" : "\u4e0d\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad"
    };
    /** @type {number} */
    var f = (new Date).getTime();
    var cache = {};
    var results = {};
    var callback = new function() {
      /** @type {string} */
      var e = "hq.sinajs.cn";
      /** @type {string} */
      var string = "://" + e + "/?_=$rn&list=$symbol";
      /** @type {string} */
      var a = "://" + e + "/etag.php?_=" + f + "&list=$symbol";
      /**
       * @param {Object} options
       * @return {?}
       */
      var generate = function(options) {
        var t;
        /** @type {string} */
        var connection = secure ? "https" : options.ssl ? "https" : "http";
        return t = options.cancelEtag ? connection + string.replace("$rn", String(Math.random())) : connection + (isETag.isETag() ? a : string.replace("$rn", String(Math.random())));
      };
      return function(err, srcFiles, tag) {
        tag = tag || {};
        cb(generate(tag).replace("$symbol", err), srcFiles);
      };
    };
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    var parse = function(opt_attributes) {
      var oldClasses = opt_attributes.timeStr || "";
      var f = opt_attributes.dateStr || "";
      var collection = opt_attributes.tArr || void 0;
      var data = opt_attributes.hqObj || {};
      var slashSplit = opt_attributes.dateDiv || "-";
      var regExpResultArray = oldClasses.split(":");
      /** @type {number} */
      var hours = Number(regExpResultArray[0]) || 0;
      /** @type {number} */
      var minutes = Number(regExpResultArray[1]) || 0;
      /** @type {number} */
      var seconds = Number(regExpResultArray[2]) || 0;
      /** @type {string} */
      var elt = [event.s0(hours), event.s0(minutes)].join(":");
      /** @type {number} */
      var idx = 0 / 0;
      if (collection) {
        if (collection.indexOf) {
          idx = collection.indexOf(elt);
        } else {
          var i = collection.length;
          for (;i--;) {
            if (collection[i] == elt) {
              idx = i;
              break;
            }
          }
        }
      }
      var logMessage = {
        time : elt,
        isUpdateTime : isNaN(idx) ? true : Boolean(idx >= 0),
        index : idx
      };
      var code = f.split(slashSplit);
      /** @type {number} */
      var value = ~~Number(code[0]);
      /** @type {number} */
      var month = ~~(Number(code[1]) - 1);
      /** @type {number} */
      var day = ~~Number(code[2]);
      var item = {
        isErrData : false,
        isDateChange : false,
        date : data.date,
        today : [value, month + 1, day].join("-")
      };
      if (data.date) {
        /** @type {Date} */
        var date = new Date(value, month, day, hours, minutes, seconds);
        var selectedDate = test.stbd(data.date, date);
        if (selectedDate) {
          if (date >= data.date) {
            item.date.setHours(hours, minutes, seconds);
          } else {
            /** @type {boolean} */
            item.isErrData = true;
          }
        } else {
          /** @type {boolean} */
          item.isDateChange = Boolean(date > data.date);
          if (item.isDateChange) {
            /** @type {Date} */
            item.date = date;
          } else {
            /** @type {boolean} */
            item.isErrData = true;
          }
        }
      } else {
        if (f) {
          /** @type {Date} */
          item.date = new Date(value, month, day, hours, minutes, seconds);
        } else {
          /** @type {boolean} */
          item.isErrData = true;
        }
      }
      return{
        datePart : item,
        timePart : logMessage
      };
    };
    var evt = {
      /**
       * @param {string} options
       * @return {?}
       */
      swap : function(options) {
        var codeSegments;
        var compilerWords = options.split(",");
        /** @type {string} */
        var querystring = "";
        /** @type {string} */
        compilerWords[8] = "TP" == compilerWords[8] ? "03" : "00";
        /** @type {Array} */
        codeSegments = [0, 4, 3, 7, 5, 6, 26, 46, 10, 11, 36, 26, 37, 27, 38, 28, 39, 29, 40, 30, 56, 46, 57, 47, 58, 48, 59, 49, 60, 50, 2, 1, 8];
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          querystring += compilerWords[codeSegments[i]] + ",";
        }
        return querystring = querystring.slice(0, querystring.length - 1);
      },
      /**
       * @param {(number|string)} currentIndex
       * @param {?} dataAndEvents
       * @return {?}
       */
      kak : function(currentIndex, dataAndEvents) {
        var text;
        switch(dataAndEvents) {
          case "CN_2":
            text = this.swap(currentIndex);
            break;
          default:
            /** @type {(number|string)} */
            text = currentIndex;
        }
        return text;
      }
    };
    var v = new function() {
      var queuePos;
      var expr;
      /**
       * @param {Array} bytes
       * @param {Object} params
       * @return {?}
       */
      this.update = function(bytes, params) {
        if (!bytes) {
          return false;
        }
        if (!queuePos) {
          queuePos = event.gtr([["7:00", "23:59"], ["0:00", "6:59"]]);
        }
        var old = queuePos;
        /** @type {string} */
        var minIdx = "07:00";
        /** @type {number} */
        var i = 17;
        var l = params.symbol;
        if (0 !== l.indexOf("fx_")) {
          /** @type {number} */
          i = 10;
          if ("DINIW" == l) {
            if (!expr) {
              expr = event.gtr([["6:00", "23:59"], ["0:00", "5:59"]]);
            }
            old = expr;
            /** @type {string} */
            minIdx = "06:00";
          }
        }
        var c2 = bytes[i];
        var c3 = bytes[0];
        var result = parse({
          dateStr : c2,
          timeStr : c3,
          hqObj : params,
          tArr : old,
          start : minIdx
        });
        if (result.datePart.isErrData) {
          return false;
        }
        params.date = result.datePart.date;
        params.today = result.datePart.today;
        params.time = result.timePart.time;
        params.index = result.timePart.index;
        params.isUpdateTime = result.timePart.isUpdateTime;
        /** @type {string} */
        params.name = String(bytes[9]);
        /** @type {number} */
        var arg = Number(bytes[3]) || 0;
        return params.prevclose = arg, params.open = Number(bytes[5]) || arg, params.high = Number(bytes[6]) || arg, params.low = Number(bytes[7]) || arg, params.price = Number(bytes[8]) || arg, params.totalVolume = 0, true;
      };
    };
    var handle = new function() {
      var tArr;
      var r;
      /**
       * @param {Array} values
       * @param {Object} options
       * @return {?}
       */
      var parse = function(values, options) {
        if (!values) {
          return false;
        }
        if (!tArr) {
          tArr = event.gta();
        }
        /** @type {number} */
        var framesNum = 100;
        if (/[gz]/.test(options.type)) {
          /** @type {number} */
          framesNum = 10;
        } else {
          if (self.isRepos(options.symbol)) {
            /** @type {number} */
            framesNum = 10;
          } else {
            if (/^(sh000|sh580)\d+/.test(options.symbol)) {
              /** @type {number} */
              framesNum = 1;
            }
          }
        }
        var remind_in = values[30];
        var timeStr = values[31];
        var result = parse({
          dateStr : remind_in,
          timeStr : timeStr,
          hqObj : options,
          tArr : tArr,
          start : "09:30"
        });
        if (result.datePart.isErrData) {
          return false;
        }
        if (options.date = result.datePart.date, options.isDateChange = result.datePart.isDateChange, options.today = result.datePart.today, options.time = result.timePart.time, options.index = result.timePart.index, options.isUpdateTime = result.timePart.isUpdateTime, !result.timePart.isUpdateTime) {
          var regExpResultArray = options.time.split(":");
          /** @type {number} */
          var b = Number(regExpResultArray[0]);
          /** @type {number} */
          var g = Number(regExpResultArray[1]);
          switch(b) {
            case 11:
              if (36 > g) {
                /** @type {boolean} */
                options.isUpdateTime = true;
                /** @type {number} */
                options.index = 119;
              }
              break;
            case 15:
              if (10 > g) {
                /** @type {boolean} */
                options.isUpdateTime = true;
                /** @type {number} */
                options.index = 240;
              }
            ;
          }
        }
        /** @type {string} */
        options.name = String(values[0]);
        /** @type {boolean} */
        options.isNewListed = Boolean(0 == options.name.indexOf("N"));
        /** @type {number} */
        var POST = Number(values[2]) || 0;
        /** @type {number} */
        options.prevclose = POST;
        /** @type {number} */
        options.preopen = Number(values[1]) || (Number(values[6]) || (Number(values[7]) || POST));
        /** @type {number} */
        options.open = Number(values[1]) || POST;
        /** @type {number} */
        options.price = Number(values[3]) || POST;
        /** @type {number} */
        options.high = Number(values[4]) || POST;
        /** @type {number} */
        options.low = Number(values[5]) || POST;
        /** @type {number} */
        options.buy = Number(values[6]);
        /** @type {number} */
        options.sell = Number(values[7]);
        /** @type {number} */
        var index = Number(values[8]) || 0;
        index /= framesNum;
        /** @type {number} */
        options.totalVolume = index;
        /** @type {number} */
        options.totalAmount = Number(values[9]) || 0;
        var value = values[32];
        return options.state = value, options.isStopDay = "02" == value || "03" == value, options.statusStr = clt[value] || "", true;
      };
      /**
       * @param {string} query
       * @param {Object} scope
       * @return {undefined}
       */
      var init = function(query, scope) {
        var values = query.split(",");
        if (!!values) {
          if (!(values.length < 16)) {
            /** @type {string} */
            scope.type = String(values[0]).toLowerCase();
            /** @type {number} */
            scope.lastfive = Number(values[6]);
            /** @type {number} */
            scope.fc = Number(values[8]);
            /** @type {number} */
            scope.issueprice = Number(values[14]);
            /** @type {number} */
            scope.status = Number(values[15]);
          }
        }
      };
      /**
       * @param {string} last
       * @param {Object} options
       * @return {?}
       */
      var process = function(last, options) {
        if (!r) {
          r = event.gtr([["9:15", "11:30"], ["13:00", "15:01"]]);
        }
        var e = cache[options.symbol] || {};
        var date = e.date;
        if (!self.isDate(date)) {
          /** @type {Date} */
          date = new Date;
        }
        var vals = last.split("|");
        var dateStr = test.ds(date);
        var val = vals[1];
        var result = parse({
          dateStr : dateStr,
          timeStr : val,
          hqObj : options,
          tArr : r,
          start : "09:15"
        });
        return result.datePart.isErrData ? false : result.datePart.date.getHours() - date.getHours() > 2 ? false : (options.date = result.datePart.date, options.isDateChange = result.datePart.isDateChange, options.today = result.datePart.today, options.time = result.timePart.time, options.index = result.timePart.index, options.isUpdateTime = result.timePart.isUpdateTime, options.name = e.name || "", options.isNewListed = Boolean(0 == options.name.indexOf("N")), options.price = Number(vals[2]), options.trvolume =
        0.01 * (Number(vals[3]) || 0), options.tramount = Number(vals[4]) || 0, options.trbs = Number(vals[7]) || 0, true);
      };
      /**
       * @param {string} last
       * @param {Object} parameters
       * @return {?}
       */
      this.trHandler = function(last, parameters) {
        return process(last, parameters);
      };
      /**
       * @param {Array} val
       * @param {Object} options
       * @param {Object} cb
       * @return {?}
       */
      this.update = function(val, options, cb) {
        /** @type {boolean} */
        var json = true;
        return cb && init(cb, options), val && (json = parse(val, options)), json;
      };
    };
    var jQuery = new function() {
      var start;
      /**
       * @param {Array} bytes
       * @param {Object} result
       * @return {?}
       */
      this.update = function(bytes, result) {
        if (!bytes) {
          return false;
        }
        if (!start) {
          start = event.gata(_(result.symbol), window["kke_future_" + result.symbol] && window["kke_future_" + result.symbol].time || [["09:30", "11:29"], ["13:00", "02:59"]]);
        }
        var c3 = bytes[36];
        var c1 = bytes[37];
        var $ = parse({
          dateStr : c3,
          timeStr : c1,
          hqObj : result,
          tArr : start,
          start : start[0]
        });
        if ($.datePart.isErrData) {
          return false;
        }
        result.name = bytes[49] || result.symbol.replace("CFF_RE_", "");
        result.date = $.datePart.date;
        result.isDateChange = $.datePart.isDateChange;
        result.today = $.datePart.today;
        result.time = $.timePart.time;
        result.index = $.timePart.index;
        result.isUpdateTime = $.timePart.isUpdateTime;
        /** @type {number} */
        var text = Number(bytes[14]) || (Number(bytes[13]) || 0);
        return result.settlement = result.prevclose = text, result.open = Number(bytes[0]) || text, result.price = Number(bytes[3]) || text, result.high = Number(bytes[1]) || text, result.low = Number(bytes[2]) || text, result.preopen = result.open, result.totalVolume = Number(bytes[4]) || 0, result.totalAmount = Number(bytes[5]) || 0, result.holdingAmount = Number(bytes[6]) || 0, result.preHoldingAmount = Number(bytes[15]) || 0, result.iscff = 1, true;
      };
    };
    var T = new function() {
      var tArr;
      /**
       * @param {string} formatString
       * @return {?}
       */
      var formatDate = function(formatString) {
        if (!formatString || formatString.length < 9) {
          return null;
        }
        var month;
        /** @type {Array} */
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var values = formatString.split(" ");
        /** @type {Date} */
        var tempDate = new Date;
        /** @type {number} */
        var v = tempDate.getFullYear();
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var ilen = months.length;
        for (;ilen > i;i++) {
          if (String(values[0]).toUpperCase() == String(months[i]).toUpperCase()) {
            /** @type {number} */
            month = i;
            break;
          }
        }
        /** @type {number} */
        var day = parseInt(Number(values[1]));
        /** @type {string} */
        var part = String(values[2]);
        /** @type {boolean} */
        var l = part.toUpperCase().indexOf("PM") > 0;
        /** @type {Array.<string>} */
        var vals = part.split(":");
        /** @type {number} */
        var num2 = parseInt(Number(vals[0]));
        if (l) {
          if (12 != num2) {
            num2 += 12;
          }
        }
        /** @type {string} */
        var val = vals[1];
        /** @type {string} */
        var r20 = val.slice(0, -2);
        /** @type {string} */
        var _ = [self.strUtil.zp(num2), self.strUtil.zp(r20), "00"].join(":");
        /** @type {Date} */
        var d = new Date(v, month, day);
        if (+d > +tempDate) {
          if (!(0 == tempDate.getMonth() && tempDate.getDate() < 7)) {
            return null;
          }
          v--;
          /** @type {Date} */
          d = new Date(v, month, day);
        }
        /** @type {string} */
        var buf = [d.getFullYear(), self.strUtil.zp(d.getMonth() + 1), self.strUtil.zp(d.getDate())].join("-");
        return[_, buf];
      };
      /**
       * @param {string} label
       * @param {boolean} val
       * @return {undefined}
       */
      var item = function(label, val) {
        if (label && val) {
          var _ref9 = label.split(",");
          if (!!_ref9) {
            if (!(_ref9.length < 3)) {
              val.exchange = _ref9[0];
              val.industry = _ref9[1];
              val.issueprice = _ref9[2];
            }
          }
        }
      };
      /**
       * @param {Array} match
       * @param {Object} params
       * @param {string} data
       * @return {?}
       */
      var process = function(match, params, data) {
        /**
         * @param {Array} name
         * @return {?}
         */
        function func(name) {
          return 0 === parseInt(name[2]) && (0 === parseInt(name[4]) && (0 === parseInt(name[5]) && (0 === parseInt(name[6]) && (0 === parseInt(name[7]) && 0 === parseInt(name[10])))));
        }
        if (!match || match.length < 28) {
          return false;
        }
        if (!tArr) {
          tArr = event.gtus();
        }
        var elem;
        /** @type {boolean} */
        var ret = false;
        if (data) {
          elem = data.split(",");
          ret = func(elem);
        } else {
          ret = func(match);
        }
        var dateSince;
        if (params.prevclose = Number(match[26]) || 0, ret) {
          /** @type {number} */
          params.high = params.prevclose;
          /** @type {number} */
          params.open = params.prevclose;
          /** @type {number} */
          params.low = params.prevclose;
          /** @type {Date} */
          var tempDate = new Date((window.hq_str_sys_time ? new Date(1E3 * window.hq_str_sys_time) : new Date) - 432E5);
          /** @type {Array} */
          dateSince = ["09:10", tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate()];
        } else {
          /** @type {number} */
          params.open = Number(match[5]) || params.prevclose;
          /** @type {number} */
          params.high = Number(match[6]) || params.prevclose;
          /** @type {number} */
          params.low = Number(match[7]) || params.prevclose;
          dateSince = formatDate(String(elem ? elem[25] : match[25]));
        }
        if (params.name = match[0], params.price = Number(match[1]) || params.open, params.preopen = params.open, params.totalVolume = Number(match[10]) || 0, params.prevclose <= 0 && (params.prevclose = params.price), params.isUnlisted = 0 == params.price && (0 == Number(match[8]) && 0 == Number(match[9])), dateSince) {
          var result = parse({
            dateStr : dateSince[1],
            timeStr : dateSince[0],
            hqObj : params,
            tArr : tArr
          });
          params.date = result.datePart.date;
          params.isDateChange = result.datePart.isDateChange;
          params.today = result.datePart.today;
          params.time = result.timePart.time;
          params.index = result.timePart.index;
          params.isUpdateTime = result.timePart.isUpdateTime;
          /** @type {boolean} */
          n = true;
        }
        return true;
      };
      /** @type {boolean} */
      var n = false;
      /**
       * @param {Array} d
       * @param {Object} next
       * @param {Object} value
       * @param {string} x
       * @return {?}
       */
      this.update = function(d, next, value, x) {
        var result;
        return value && item(value, next), d && (result = process(d, next, x)), result;
      };
    };
    var D = new function() {
      var tArr;
      /**
       * @param {Array} bytes
       * @param {Object} data
       * @return {?}
       */
      this.update = function(bytes, data) {
        if (!bytes) {
          return false;
        }
        if (!tArr) {
          tArr = event.gthk();
        }
        var c3 = bytes[7];
        var c1 = bytes[1];
        var result = parse({
          dateStr : c3,
          dateDiv : "-",
          timeStr : c1,
          hqObj : data,
          tArr : tArr,
          start : "09:30"
        });
        return data.date = result.datePart.date, data.isDateChange = result.datePart.isDateChange, data.today = result.datePart.today, data.time = result.timePart.time, data.index = result.timePart.index, data.isUpdateTime = result.timePart.isUpdateTime, data.name = String(bytes[0]), data.volume = 0, data.price = Number(bytes[2]), data.prevprice = data.prevclose = Number(bytes[3]), true;
      };
    };
    var CFF = new function() {
      var start;
      /**
       * @param {Array} match
       * @param {Object} item
       * @return {?}
       */
      this.update = function(match, item) {
        if (!match) {
          return false;
        }
        if (!start) {
          start = event.gata(_(item.symbol), window["kke_future_" + item.symbol] && window["kke_future_" + item.symbol].time || [["09:30", "11:29"], ["13:00", "02:59"]]);
        }
        var eventName = match[1];
        var selector = match[17];
        var timeStr = eventName.slice(0, 2) + ":" + eventName.slice(2, 4);
        var result = parse({
          dateStr : selector,
          dateDiv : "-",
          timeStr : timeStr,
          hqObj : item,
          tArr : start,
          start : start[0]
        });
        item.date = result.datePart.date;
        item.isDateChange = result.datePart.isDateChange;
        item.today = result.datePart.today;
        item.time = result.timePart.time;
        item.index = result.timePart.index;
        item.isUpdateTime = result.timePart.isUpdateTime;
        /** @type {string} */
        item.name = String(match[0]);
        /** @type {number} */
        var now = Number(match[10]) || 0;
        return item.prevclose = now, item.open = Number(match[2]) || now, item.preopen = item.open || item.price, item.high = Number(match[3]) || now, item.low = Number(match[4]) || now, item.close = Number(match[5]) || now, item.buy = Number(match[6]), item.sell = Number(match[7]), item.price = Number(match[8]) || now, item.activeprevclose = Number(match[9]), item.buyAmount = Number(match[11]), item.sellAmount = Number(match[12]), item.holdingAmount = Number(match[13]), item.totalVolume = Number(match[14]) ||
        0, item.exchange = match[15], item.futuresType = match[16], item.isHot = Number(match[18]), item.day5Highest = Number(match[19]), item.day5Lowest = Number(match[20]), item.day10Highest = Number(match[21]), item.day10Lowest = Number(match[22]), item.day20Highest = Number(match[23]), item.day20Lowest = Number(match[24]), item.day55Highest = Number(match[25]), item.day55Lowest = Number(match[26]), item.weighted = Number(match[27]), true;
      };
    };
    var S = new function() {
      var tArr;
      /**
       * @param {Array} b
       * @param {Object} options
       * @return {?}
       */
      var parse = function(b, options) {
        if (!b) {
          return false;
        }
        if (!tArr) {
          tArr = event.gthk();
        }
        var b20 = b[17];
        var b11 = b[18];
        var b21 = b[24];
        var result = parse({
          dateStr : b20,
          dateDiv : "/",
          timeStr : b11,
          hqObj : options,
          tArr : tArr,
          start : "09:30"
        });
        options.date = result.datePart.date || new Date;
        options.isDateChange = result.datePart.isDateChange;
        options.today = result.datePart.today;
        /** @type {boolean} */
        var u = false;
        if (!options.time || result.timePart.time > "09:29" && options.time < result.timePart.time) {
          /** @type {boolean} */
          u = true;
        }
        options.time = result.timePart.time;
        options.index = result.timePart.index;
        options.isUpdateTime = result.timePart.isUpdateTime;
        if (u) {
          /** @type {boolean} */
          options.isUpdateTime = true;
        }
        /** @type {string} */
        options.name = String(b[1]);
        /** @type {number} */
        var linear = Number(b[3]) || 0;
        return options.prevclose = linear, options.open = "Y" == b21 ? Number(b[2]) || linear : linear, options.preopen = Number(b[2]) || (Number(b[9]) || (Number(b[10]) || linear)), options.price = Number(b[6]) || linear, options.high = Number(b[4]) || linear, options.low = Number(b[5]) || linear, options.totalVolume = Number(b[12]) || (1E3 * Number(b[11]) || 0), options.totalAmount = Number(b[11]) || 0, true;
      };
      /**
       * @param {string} query
       * @param {Object} scope
       * @return {undefined}
       */
      var init = function(query, scope) {
        var values = query.split(",");
        if (!!values) {
          if (!(values.length < 15)) {
            /** @type {string} */
            scope.type = String(values[0]).toLowerCase();
            /** @type {number} */
            scope.lastfive = 0;
            /** @type {number} */
            scope.status = Number(values[14]);
            /** @type {number} */
            scope.issueprice = Number(values[16]);
          }
        }
      };
      /**
       * @param {Array} bytes
       * @param {Object} options
       * @param {Object} cb
       * @return {?}
       */
      this.update = function(bytes, options, cb) {
        /** @type {boolean} */
        var data = true;
        return cb && init(cb, options), bytes && (data = parse(bytes, options)), data;
      };
    };
    var P = new function() {
      var path;
      /**
       * @param {Array} bytes
       * @param {Object} result
       * @return {?}
       */
      this.update = function(bytes, result) {
        if (!bytes) {
          return false;
        }
        if (!path) {
          path = event.gata(_(result.symbol), window["kke_future_" + result.symbol] && window["kke_future_" + result.symbol].time || [["06:00", "23:59"], ["00:00", "05:00"]]);
        }
        var orig = path;
        var piece = path[0];
        /** @type {number} */
        var i = 12;
        var c2 = bytes[i];
        var c3 = bytes[6];
        var $ = parse({
          dateStr : c2,
          timeStr : c3,
          tArr : orig,
          start : piece,
          hqObj : result
        });
        if ($.datePart.isErrData) {
          return false;
        }
        result.date = $.datePart.date;
        result.today = $.datePart.today;
        result.time = $.timePart.time;
        result.index = $.timePart.index;
        result.isUpdateTime = $.timePart.isUpdateTime;
        /** @type {string} */
        result.name = String(bytes[13]);
        /** @type {number} */
        var text = Number(bytes[7]) || 0;
        return result.prevclose = text, result.open = Number(bytes[8]) || text, result.price = Number(bytes[0]) || text, result.high = Number(bytes[4]) || text, result.low = Number(bytes[5]) || text, result.buy = Number(bytes[2]), result.sell = Number(bytes[3]), result.buyAmount = Number(bytes[10]), result.sellAmount = Number(bytes[11]), result.holdingAmount = Number(bytes[9]), true;
      };
    };
    var k = new function() {
      var tArr;
      /**
       * @param {Array} bytes
       * @param {Object} result
       * @return {?}
       */
      this.update = function(bytes, result) {
        if (!bytes) {
          return false;
        }
        if (!tArr) {
          tArr = event.gta();
        }
        var bits = bytes[32];
        var bv_open = bits.split(" ");
        var dateStr = bv_open[0];
        var timeStr = bv_open[1];
        var $ = parse({
          dateStr : dateStr,
          timeStr : timeStr,
          hqObj : result,
          tArr : tArr,
          start : "09:30"
        });
        if ($.datePart.isErrData) {
          return false;
        }
        result.date = $.datePart.date;
        result.isDateChange = $.datePart.isDateChange;
        result.today = $.datePart.today;
        result.time = $.timePart.time;
        result.index = $.timePart.index;
        result.isUpdateTime = $.timePart.isUpdateTime;
        /** @type {string} */
        result.name = String(bytes[37]);
        /** @type {boolean} */
        result.isNewListed = Boolean(0 == result.name.indexOf("N"));
        /** @type {number} */
        var text = Number(bytes[8]) || 0;
        return result.prevclose = text, result.preopen = Number(bytes[9]) || text, result.open = Number(bytes[9]) || text, result.price = Number(bytes[2]) || text, result.high = Number(bytes[39]) || text, result.low = Number(bytes[40]) || text, result.position = Number(bytes[5]) || 0, result.totalVolume = Number(bytes[41]) || 0, result.totalAmount = Number(bytes[42]) || 0, true;
      };
    };
    var E = new function() {
      var tArr;
      /**
       * @param {Array} args
       * @param {Object} result
       * @return {?}
       */
      this.update = function(args, result) {
        if (!args) {
          return false;
        }
        if (!tArr) {
          tArr = event.gta();
        }
        var pageX = args[30];
        var pageY = args[31];
        var $ = parse({
          dateStr : pageX,
          timeStr : pageY,
          hqObj : result,
          tArr : tArr,
          start : "09:30"
        });
        if ($.datePart.isErrData) {
          return false;
        }
        if (result.date = $.datePart.date, result.isDateChange = $.datePart.isDateChange, result.today = $.datePart.today, result.time = $.timePart.time, result.index = $.timePart.index, result.isUpdateTime = $.timePart.isUpdateTime, !$.timePart.isUpdateTime) {
          var regExpResultArray = result.time.split(":");
          /** @type {number} */
          var b = Number(regExpResultArray[0]);
          /** @type {number} */
          var g = Number(regExpResultArray[1]);
          switch(b) {
            case 11:
              if (59 > g) {
                /** @type {boolean} */
                result.isUpdateTime = true;
              }
              break;
            case 15:
              if (31 > g) {
                /** @type {boolean} */
                result.isUpdateTime = true;
              }
            ;
          }
        }
        /** @type {string} */
        result.name = String(args[0]);
        /** @type {boolean} */
        result.isNewListed = Boolean(0 == result.name.indexOf("N"));
        /** @type {number} */
        var text = Number(args[2]) || 0;
        /** @type {number} */
        result.prevclose = text;
        /** @type {number} */
        result.preopen = Number(args[1]) || (Number(args[6]) || (Number(args[7]) || text));
        /** @type {number} */
        result.open = Number(args[1]) || text;
        /** @type {number} */
        result.price = Number(args[3]) || text;
        /** @type {number} */
        result.high = Number(args[4]) || text;
        /** @type {number} */
        result.low = Number(args[5]) || text;
        /** @type {number} */
        result.buy = Number(args[6]);
        /** @type {number} */
        result.sell = Number(args[7]);
        /** @type {number} */
        result.totalVolume = Number(args[8]) / 1E3 || 0;
        /** @type {number} */
        result.totalAmount = Number(args[9]) || 0;
        var value = args[32];
        return result.state = value, result.isStopDay = "02" == value || "03" == value, result.statusStr = clt[value] || "", true;
      };
    };
    /** @type {Array} */
    var params = [];
    /** @type {string} */
    var parent = "";
    /** @type {string} */
    var arg = "";
    /**
     * @param {?} text
     * @return {undefined}
     */
    var template = function(text) {
      /** @type {number} */
      var len = params.length;
      for (;len--;) {
        params[len](text);
        /** @type {null} */
        params[len] = null;
        params.length--;
      }
    };
    /**
     * @param {(Object|string)} obj
     * @param {?} param
     * @return {undefined}
     */
    this.get = function(obj, param) {
      var result;
      var options = obj.symbol;
      var terse = obj.withI;
      var results = options;
      /** @type {number} */
      var i = 0;
      if (terse) {
        var part;
        var parts = options.split(",");
        var l = parts.length;
        for (;l > i;i++) {
          part = parts[i];
          var tag;
          tag = "HK" == _(part) ? part.replace("rt_", "") + "_i" : part + "_i";
          results += "," + tag;
        }
      }
      var renderSection;
      var value;
      if (obj.delay) {
        parent += options + ",";
        arg += results + ",";
        params.push(param);
        clearTimeout(tref);
        /** @type {number} */
        tref = setTimeout(function() {
          arg = arg.substring(0, arg.length - 1);
          parent = parent.substring(0, parent.length - 1);
          result = next(arg);
          value = result.length;
          renderSection = {
            count : value
          };
          /** @type {number} */
          i = 0;
          for (;value > i;i++) {
            callback(result[i].join(","), fn(start, null, parent, template, null, renderSection), obj);
          }
          /** @type {string} */
          parent = "";
          /** @type {string} */
          arg = "";
        }, 100);
      } else {
        result = next(results);
        value = result.length;
        renderSection = {
          count : value
        };
        /** @type {number} */
        i = 0;
        for (;value > i;i++) {
          callback(result[i].join(","), fn(start, null, options, param, null, renderSection), obj);
        }
      }
    };
    /**
     * @param {?} e
     * @param {?} test
     * @return {undefined}
     */
    this.parse = function(e, test) {
      var result;
      var resp = e.symbol;
      switch(e.market) {
        case "CN_TR":
          result = isValid(resp, null, e.hqStr);
          break;
        default:
          var opts = evt.kak(e.hqStr, e.market);
          result = start(resp, null, opts, null);
      }
      if (self.isFunc(test)) {
        test(result);
      }
    };
  };
  return create;
});
