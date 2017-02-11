xh5_define("chart.h5t", ["cfgs.settinger", "utils.util", "utils.painter"], function(goog, self, dataAndEvents) {
  /**
   * @param {Object} options
   * @return {?}
   */
  function init(options) {
    /**
     * @param {Object} symbolInfo
     * @param {?} allBindingsAccessor
     * @return {undefined}
     */
    function _init(symbolInfo, allBindingsAccessor) {
      /**
       * @param {boolean} symbolInfo
       * @return {undefined}
       */
      function clone(symbolInfo) {
        extValues.setDataRange(symbolInfo);
        if (_self) {
          _self.linkData(symbolInfo);
          _self.setDataRange();
        }
        if (config) {
          config.linkData(symbolInfo);
          config.setDataRange();
        }
        if (rangeSelector) {
          rangeSelector.linkData(symbolInfo);
          rangeSelector.setDataRange();
        }
      }
      /**
       * @return {undefined}
       */
      function init() {
        if (allBindingsAccessor) {
          text = source;
        }
        vec.update(null, true);
        if ("CN" === market) {
          !/^(sh0|sh1|sh5|sz1|sz399)\d+/i.test(symbolInfo.symbol);
        }
      }
      symbolInfo = callback({
        symbol : void 0,
        datas : {
          t1 : {
            url : void 0,
            dataformatter : void 0
          },
          t5 : {
            url : void 0,
            dataformatter : void 0
          }
        },
        linecolor : void 0,
        linetype : void 0
      }, symbolInfo || {});
      var data;
      var scope = this;
      var market = self.market(symbolInfo.symbol);
      /**
       * @param {?} fn
       * @return {?}
       */
      var setup = function(fn) {
        switch(fn) {
          case "CN":
            return 1;
          case "HK":
            return 2;
          case "US":
            return 3;
        }
        return 1;
      };
      /** @type {boolean} */
      var _ = true;
      this.dp = symbolInfo.dp;
      /** @type {function (?): ?} */
      this.marketNum = setup;
      /** @type {boolean} */
      this.isErr = false;
      /** @type {boolean} */
      this.witht5 = true;
      this.symbol = symbolInfo.symbol;
      this.isMain = allBindingsAccessor;
      /** @type {boolean} */
      this.isCompare = false;
      /** @type {number} */
      this.dAdd = 0;
      this.uid = symbolInfo.symbol + Math.random();
      /** @type {null} */
      this.datas = null;
      /** @type {number} */
      this.dataLen = 0;
      /** @type {number} */
      this.dataLenOffset = 0;
      this.prevclose = void 0;
      /** @type {number} */
      this.labelMaxP = 0;
      /** @type {number} */
      this.maxPrice = 0;
      /** @type {number} */
      this.labelMinP = Number.MAX_VALUE;
      /** @type {number} */
      this.minPrice = Number.MAX_VALUE;
      /** @type {number} */
      this.labelMaxVol = 0;
      /** @type {number} */
      this.maxVolume = 0;
      /** @type {number} */
      this.minPercent = Number.MAX_VALUE;
      /** @type {number} */
      this.maxPercent = -Number.MAX_VALUE;
      this.labelPriceCount = void 0;
      /** @type {boolean} */
      this.isTotalRedraw = true;
      /** @type {number} */
      this.realLen = 0;
      this.market = market;
      /** @type {null} */
      this.date = null;
      /** @type {null} */
      this.hq = null;
      this.futureTime = action || tradeInfo;
      this.preData = {
        data : 0,
        vPos : null
      };
      this.needMarket = market;
      /**
       * @param {?} keepData
       * @return {undefined}
       */
      this.changeMarket = function(keepData) {
        var codeSegments;
        /** @type {Array} */
        var header = [];
        var c = keepData;
        if (width = events.tcd(listener), setup(scope.needMarket) != setup(listener)) {
          codeSegments = source.get();
          data = self.tUtil.gata(listener);
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            if (setup(scope.needMarket) < setup(listener)) {
              header.push(events.aduk(codeSegments[i], scope.market, listener, t, codeSegments[i][0].date));
              scope.realLen = self.arrIndexOf(data, t.getHours() + ":" + self.strUtil.zp(t.getMinutes()));
              if (scope.realLen < 0) {
                scope.realLen = width;
              }
            } else {
              header.push(events.rmuk(codeSegments[i], listener, c));
              scope.realLen = self.arrIndexOf(data, t.getHours() + ":" + self.strUtil.zp(t.getMinutes()));
            }
          }
          scope.needMarket = listener;
          source.initTState(header);
          scope.datas = header[4];
          extValues.setDataRange();
          extValues.createPlayingData();
        }
      };
      var _self;
      var config;
      var rangeSelector;
      var classNames;
      var t;
      var instance = new draw(this, symbolInfo);
      /**
       * @return {?}
       */
      this.getName = function() {
        return classNames || "";
      };
      /**
       * @return {?}
       */
      this.getStockType = function() {
        var format;
        return scope.hq && (format = scope.hq.type), format || "";
      };
      this.viewState = params;
      var source = new function() {
        var el = {};
        var Type = {
          rsAmount : void 0
        };
        /**
         * @param {string} values
         * @return {undefined}
         */
        var add = function(values) {
          if (values) {
            var msg;
            var valuesLen = values.length;
            /** @type {Array} */
            var list = [];
            if (self.clone(values, list), list.length > 5) {
              if (options.date) {
                var a;
                /** @type {number} */
                var b = Number(options.date.split("-")[2]);
                /** @type {number} */
                var c = 0;
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var i$ = 0;
                /** @type {number} */
                var listLength = list.length;
                for (;listLength > i$;i$++) {
                  a = list[i$][0].date.getDate();
                  if (0 == i$) {
                    /** @type {number} */
                    c = Math.abs(a - b);
                  } else {
                    if (c > Math.abs(a - b)) {
                      /** @type {number} */
                      c = Math.abs(a - b);
                      /** @type {number} */
                      i = i$;
                    }
                  }
                }
                if (i >= 5) {
                  /** @type {Array.<?>} */
                  msg = list.splice(i - 4, 5);
                  /** @type {number} */
                  params.start = 4;
                  /** @type {number} */
                  params.end = 5;
                } else {
                  /** @type {Array.<?>} */
                  msg = list.splice(0, 5);
                  /** @type {number} */
                  params.start = i;
                  /** @type {number} */
                  params.end = i + 1;
                }
                /** @type {(number|undefined)} */
                el.tv = params.start;
                /** @type {(number|undefined)} */
                el.tb = params.end;
              }
            } else {
              /** @type {Array} */
              msg = list;
              /** @type {number} */
              el.tv = options.date ? 0 : 4;
              el.tb = valuesLen;
            }
            /** @type {(Array|undefined)} */
            el.t = msg;
          }
        };
        /**
         * @param {string} attr
         * @return {?}
         */
        this.get = function(attr) {
          return attr ? el[attr] : el.t;
        };
        /**
         * @param {string} dest
         * @param {number} value
         * @return {undefined}
         */
        this.set = function(dest, value) {
          if ("undefined" != typeof el[dest]) {
            /** @type {number} */
            el[dest] = value;
          }
        };
        /** @type {function (string): undefined} */
        this.initState = add;
        /**
         * @param {?} value
         * @return {undefined}
         */
        this.initTState = function(value) {
          add(value);
        };
        this.extraDataObj = Type;
        /**
         * @return {undefined}
         */
        this.initExtraData = function() {
          /** @type {string} */
          var protocol = options.ssl ? "https" : "http";
          /** @type {string} */
          var tmp = protocol + "://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockService.getAmountBySymbol?_=$rn&symbol=$symbol";
          /** @type {string} */
          var symbolInfoIndex = "KKE_ShareAmount_" + symbolInfo.symbol;
          self.load(tmp.replace("$symbol", symbolInfo.symbol).replace("$rn", String((new Date).getDate())).replace("$cb", "var%20" + symbolInfoIndex + "="), function() {
            var iteratee = window[symbolInfoIndex];
            if (iteratee) {
              var value;
              /** @type {Array} */
              var prototype = [];
              var length = iteratee.length;
              for (;length--;) {
                value = iteratee[length];
                prototype.push({
                  amount : Number(value.amount),
                  date : item.sd(value.date)
                });
              }
              if (prototype.length) {
                /** @type {Array} */
                Type.rsAmount = prototype;
              }
            }
          });
        };
        /**
         * @return {undefined}
         */
        this.gc = function() {
          /** @type {null} */
          el = null;
          /** @type {null} */
          Type = null;
        };
      };
      var extValues = new function() {
        var processData;
        var init;
        var tick;
        /**
         * @return {undefined}
         */
        processData = function() {
          /** @type {number} */
          scope.minPrice = Number.MAX_VALUE;
          /** @type {number} */
          scope.maxPrice = 0;
          /** @type {number} */
          scope.minPercent = Number.MAX_VALUE;
          /** @type {number} */
          scope.maxPercent = -Number.MAX_VALUE;
          /** @type {number} */
          scope.minavgPrice = Number.MAX_VALUE;
          /** @type {number} */
          scope.maxavgPrice = 0;
          /** @type {number} */
          scope.maxVolume = 0;
        };
        /**
         * @return {undefined}
         */
        init = function() {
          /**
           * @param {number} a
           * @return {undefined}
           */
          function cb(a) {
            /** @type {number} */
            var b = Math.max(Math.abs(a - scope.maxPrice), Math.abs(a - scope.minPrice));
            /** @type {number} */
            var time = Math.max(Math.abs(a - scope.maxavgPrice), Math.abs(a - scope.minavgPrice));
            switch(b / a > 0.45 && (symbolSetting.datas.scaleType = "price"), b / a > 0.1 && ("newstock" == symbolSetting.datas.scaleType && (symbolSetting.datas.scaleType = "price")), symbolSetting.datas.scaleType) {
              case "newstock":
                /** @type {number} */
                scope.minPrice = Number(a) - 0.45 * a;
                /** @type {number} */
                scope.maxPrice = Number(a) + 0.45 * a;
                break;
              case "tpct":
                scope.minPrice = scope.minPrice < Number(a) - 0.1 * a ? scope.minPrice : Number(a) - 0.1 * a;
                scope.maxPrice = scope.maxPrice > Number(a) + 0.1 * a ? scope.maxPrice : Number(a) + 0.1 * a;
                break;
              case "pct":
                /** @type {number} */
                var maxPrice = scope.maxPrice - scope.minPrice;
                scope.minPrice -= 0.05 * maxPrice;
                scope.maxPrice += 0.05 * maxPrice;
                break;
              case "price":
              ;
              default:
                /** @type {number} */
                scope.minPrice = Number(a) - Number(b);
                /** @type {number} */
                scope.maxPrice = Number(a) + Number(b);
                /** @type {number} */
                scope.minavgPrice = Number(a) - Number(time);
                /** @type {number} */
                scope.maxavgPrice = Number(a) + Number(time);
            }
            /** @type {number} */
            scope.maxPercent = Math.max((scope.maxPrice - a) / a, 0);
            /** @type {number} */
            scope.minPercent = Math.min((scope.minPrice - a) / a, 0);
            /** @type {number} */
            scope.maxavgPercent = Math.max((scope.maxavgPrice - a) / a, 0);
            /** @type {number} */
            scope.minavgPercent = Math.min((scope.minavgPrice - a) / a, 0);
          }
          /** @type {boolean} */
          scope.isCompare = el.getAllStock().length > 1;
          scope.dAdd = el.dAdd;
          scope.preData.data = scope.hq.preopen ? scope.hq.preopen : scope.preData.data;
          /** @type {number} */
          var i = 0;
          var l = scope.datas.length;
          for (;l > i;i++) {
            var params;
            /** @type {number} */
            var b = Number(scope.datas[0][0].prevclose);
            /** @type {number} */
            var key = 0;
            var id = scope.dataLen;
            for (;id > key;key++) {
              params = scope.datas[i][key];
              if (!(params.price <= 0)) {
                if (!(params.avg_price <= 0)) {
                  if ("HK" == scope.market && (scope.hq && "indx" == scope.hq.type)) {
                    /** @type {number} */
                    scope.maxPrice = Math.max(scope.maxPrice, params.price, b);
                    /** @type {number} */
                    scope.minPrice = Math.min(scope.minPrice, params.price, b);
                  } else {
                    if (filter(scope.datas[i][0].date, scope.hq.date) && "CN" == scope.market) {
                      /** @type {number} */
                      scope.maxPrice = Math.max(scope.maxPrice, params.price, params.avg_price, b, scope.preData.data);
                      /** @type {number} */
                      scope.minPrice = Math.min(scope.minPrice, params.price, params.avg_price, b, scope.preData.data);
                    } else {
                      /** @type {number} */
                      scope.maxPrice = Math.max(scope.maxPrice, params.price, params.avg_price, b);
                      /** @type {number} */
                      scope.minPrice = Math.min(scope.minPrice, params.price, params.avg_price, b);
                    }
                  }
                  if (filter(scope.datas[i][0].date, scope.hq.date) && "CN" == scope.market) {
                    /** @type {number} */
                    scope.maxavgPrice = Math.max(scope.maxavgPrice, params.price, b, scope.preData.data);
                    /** @type {number} */
                    scope.minavgPrice = Math.min(scope.minavgPrice, params.price, b, scope.preData.data);
                  } else {
                    /** @type {number} */
                    scope.maxavgPrice = Math.max(scope.maxavgPrice, params.price, b);
                    /** @type {number} */
                    scope.minavgPrice = Math.min(scope.minavgPrice, params.price, b);
                  }
                  /** @type {number} */
                  scope.labelMaxVol = scope.maxVolume = Math.max(scope.maxVolume, 0, params.volume);
                }
              }
            }
            cb(b);
          }
          if (scope.minPrice < -1E8 || scope.maxPrice - scope.minPrice < 1E-6) {
            if (item.stbd(scope.datas[0][0].date, scope.hq.date)) {
              scope.datas[0][0].price = scope.hq.price;
              scope.datas[0][0].avg_price = scope.hq.price;
              scope.datas[0][0].prevclose = scope.hq.prevclose;
              scope.datas[0][0].volume = scope.hq.totalVolume;
            }
            /** @type {number} */
            scope.minPrice = b - 0.01 * b;
            /** @type {number} */
            scope.maxPrice = b + 0.01 * b;
            /** @type {number} */
            scope.maxPercent = 0.01;
            /** @type {number} */
            scope.minPercent = -0.01;
            if (scope.hq.totalVolume > 0) {
              if (item.stbd(scope.datas[0][0].date, scope.hq.date)) {
                if (!isNaN(scope.hq.totalAmount)) {
                  /** @type {number} */
                  scope.datas[0][0].volume = scope.hq.totalAmount / scope.hq.totalVolume;
                }
              }
            }
          }
          var result = getter(scope.maxVolume, 0, 0, true);
          scope.labelMaxVol = result[0];
          var fund;
          /** @type {number} */
          var x = 0.005;
          if (/^s[hz]51\d{4}$/.test(options.symbol)) {
            /** @type {string} */
            fund = "fund";
          }
          if (fund) {
            if ("fund" === fund) {
              if ("pct" !== symbolSetting.datas.scaleType) {
                if (x > Math.abs(scope.minPercent)) {
                  /** @type {number} */
                  x = Math.abs(scope.minPercent);
                  /** @type {number} */
                  options.nfloat = scope.nfloat = 3;
                }
              }
            }
          }
          if (scope.maxPercent < x) {
            if ("US" !== scope.market) {
              if ("pct" !== symbolSetting.datas.scaleType) {
                /** @type {number} */
                scope.minPrice = scope.maxavgPrice = b - b * x;
                /** @type {number} */
                scope.maxPrice = scope.minavgPrice = b + b * x;
                /** @type {number} */
                scope.maxPercent = scope.maxavgPercent = x;
                /** @type {number} */
                scope.minPercent = scope.minavgPercent = -x;
              }
            }
          }
          if ("gb_brk$a" === scope.symbol || "usr_brk$a" === scope.symbol) {
            /** @type {number} */
            options.nfloat = scope.nfloat = 1;
          }
        };
        /**
         * @return {undefined}
         */
        tick = function() {
          var i;
          var option;
          var transform;
          var ay = symbolSetting.DIMENSION.h_t;
          /** @type {number} */
          var elemVars = ay * symbolSetting.DIMENSION.P_HV;
          /** @type {number} */
          var klass = ay * (1 - symbolSetting.DIMENSION.P_HV);
          option = scope.labelMinP;
          transform = scope.labelMaxP;
          var newvalue;
          var child = scope.labelMaxVol;
          if (scope.datas) {
            var l = scope.datas.length;
            /** @type {number} */
            i = 0;
            for (;l > i;i++) {
              newvalue = scope.datas[0][0].prevclose;
              var obj;
              var show_underlay_vol = symbolSetting.custom.show_underlay_vol;
              /** @type {string} */
              var method = scope.isCompare ? "ppp" : "pp";
              var jlen = scope.dataLen;
              /** @type {number} */
              var j = 0;
              for (;jlen > j;j++) {
                if (obj = scope.datas[i][j], !obj) {
                  return;
                }
                if (obj.price <= 0) {
                  if (scope.realLen >= j) {
                    if (j > 0) {
                      obj.price = scope.hq.price;
                      obj.avg_price = scope.datas[i][j - 1].avg_price;
                      /** @type {number} */
                      obj.volume = 0;
                    }
                  }
                }
                /** @type {number} */
                obj.change = obj.price - newvalue;
                /** @type {number} */
                obj.percent = obj.change / newvalue;
                obj.py = xh5PosUtil[method](obj.price, option, transform, ay, newvalue);
                obj.ay = xh5PosUtil[method](obj.avg_price, option, transform, ay, newvalue);
                if (show_underlay_vol) {
                  obj.vy = xh5PosUtil.vp(obj.volume, child, elemVars) + klass;
                }
              }
            }
            scope.preData.vPos = "CN" == scope.market && (1 == l && filter(scope.hq.date, scope.datas[0][0].date)) ? xh5PosUtil[method](scope.preData.data, options, transform, ay, newvalue) : null;
          }
        };
        /** @type {function (): undefined} */
        this.createPlayingData = tick;
        /**
         * @return {undefined}
         */
        this.extValues = function() {
          processData();
          init();
        };
        /**
         * @param {boolean} deepDataAndEvents
         * @return {undefined}
         */
        this.setDataRange = function(deepDataAndEvents) {
          var data = source.get();
          if (data) {
            params.dataLength = data.length;
            /** @type {(number|undefined)} */
            var start = params.start;
            /** @type {(number|undefined)} */
            var end = params.end;
            if (isNaN(start) || isNaN(end)) {
              end = source.get("tb") || 5;
              start = source.get("tv") || 4;
              params.start = start;
              params.end = end;
            } else {
              if (deepDataAndEvents) {
                if (end + 1 > data.length) {
                  params.end = end = data.length;
                }
              }
              source.set("tv", start);
              source.set("tb", end);
            }
            /** @type {Array} */
            var buffer = [];
            /** @type {Array} */
            var values = [];
            if (data.length < 2) {
              values = data;
              buffer.push(data);
            } else {
              /** @type {(number|undefined)} */
              var i = start;
              for (;end > i;i++) {
                /** @type {Array} */
                values = values.concat(data[i]);
                buffer.push(data[i]);
              }
            }
            /** @type {Array} */
            scope.datas = buffer;
            scope.lineDatas = values;
            scope.dataLen = buffer[0].length;
            processData();
            init();
          }
        };
      };
      var node = {};
      /** @type {boolean} */
      var stack = false;
      /** @type {boolean} */
      var memory = false;
      var json = {};
      /** @type {number} */
      var clientTop = (new Date).getTime();
      /**
       * @return {undefined}
       */
      var addMinutes = function() {
        var ms;
        /** @type {Date} */
        t = new Date;
        /** @type {number} */
        ms = 60 * t.getTimezoneOffset() * 1E3;
        t.setTime(t.getTime() + ms);
        t.setHours(t.getHours() + 8);
      };
      /**
       * @param {Object} o
       * @return {undefined}
       */
      var log = function(o) {
        if (addMinutes(), !data) {
          switch(listener) {
            case "HF":
              data = self.tUtil.gata(listener, tradeInfo.time);
              break;
            case "NF":
              data = self.tUtil.gata(listener, action.time);
            default:
              data = self.tUtil.gata(listener);
          }
        }
        o.index = self.arrIndexOf(data, o.time);
        var n = o.index;
        switch(scope.market) {
          case "CN":
          ;
          case "option_cn":
          ;
          case "fund":
          ;
          case "OTC":
          ;
          case "NF":
            if (o.index < 0) {
              if (o.time >= "11:30") {
                if (o.time < "13:00") {
                  n = self.arrIndexOf(data, "11:29");
                }
              }
              if ("NF" == scope.market) {
                if ("21:00" == action.time[0][0]) {
                  if (o.time < "09:00") {
                    if (o.time > "02:30") {
                      n = self.arrIndexOf(data, "09:00");
                    }
                  }
                } else {
                  if (o.time <= action.time[0][0]) {
                    n = self.arrIndexOf(data, action.time[0][0]);
                  }
                }
              }
            }
            break;
          case "HK":
            if (o.time > "12:00") {
              if (o.time < "13:00") {
                /** @type {number} */
                n = 150;
              }
            }
            break;
          case "HF":
            if ("hf_CHA50CFD" == scope.symbol) {
              if (o.time > "16:00") {
                if (o.time < "17:00") {
                  /** @type {number} */
                  n = 420;
                }
              }
            }
          ;
        }
        if (scope.realLen = n, scope.hq.open == scope.hq.prevclose && (scope.hq.high == scope.hq.prevclose && (scope.hq.low == scope.hq.prevclose && 0 > n)) || scope.hq.time < "09:30") {
          switch(scope.market) {
            case "CN":
              /** @type {number} */
              scope.realLen = scope.hq.time >= "15:00" ? width - 1 : 0;
              break;
            case "NF":
            ;
            case "HF":
              break;
            default:
              /** @type {number} */
              scope.realLen = 0;
          }
        }
      };
      /**
       * @param {Date} x
       * @param {Date} exp
       * @return {?}
       */
      var comparisonTime = function(x, exp) {
        var a = x.getTime();
        var b = exp.getTime();
        return Math.floor((a - b) / 864E5) > 5;
      };
      var vec = new function() {
        var opt_includeNode;
        /** @type {boolean} */
        var j = true;
        /**
         * @param {Object} data
         * @return {undefined}
         */
        var process = function(data) {
          var result;
          switch(listener) {
            case "HF":
              result = tradeInfo.time;
              break;
            case "NF":
              result = action.time;
              break;
            default:
              /** @type {Array} */
              result = [];
          }
          var key = self.tUtil.gltbt(1, data.price, true, scope.needMarket, [data.date], result);
          if ("NF" == listener && data.time >= "21:00") {
            key[0].date = item.dd(data.date);
            key[0].date.setDate(data.date.getDate() + 1);
          } else {
            key[0].date = item.dd(data.date);
          }
          key[0].prevclose = data.price;
          key[0].price = data.price;
          /** @type {number} */
          key[0].volume = 0;
          /** @type {number} */
          var den = 0;
          /** @type {number} */
          var num = 0;
          var keys = source.get();
          /** @type {number} */
          var i = 0;
          var len = keys.length;
          for (;len > i;i++) {
            if (keys[i][0].totalVolume) {
              num += Number(keys[i][0].totalVolume);
              den++;
            }
          }
          /** @type {number} */
          key[0].lastfive = num / den / 390 || 0;
          if (filter(keys[4][0].date, data.date)) {
            if ("NF" == listener && data.time >= "21:00") {
              keys.shift();
              keys.push(key);
            } else {
              keys[4] = key;
            }
          } else {
            keys.shift();
            keys.push(key);
          }
          source.initTState(keys);
          /** @type {Array} */
          scope.datas = [keys[4]];
          scope.date = item.ds(data.date);
          /** @type {number} */
          scope.realLen = 0;
        };
        /** @type {number} */
        var s = 0;
        /**
         * @param {string} o
         * @param {Function} done
         * @return {?}
         */
        var init = function(o, done) {
          /**
           * @return {undefined}
           */
          function start() {
            switch(process(scope.hq), clone(), extValues.createPlayingData(), scope.market) {
              case "US":
                extValues.extValues();
                break;
              case "NF":
                /** @type {number} */
                action.inited = 1;
            }
            if (self.isFunc(done)) {
              done();
            }
          }
          /**
           * @return {?}
           */
          function parse() {
            /** @type {number} */
            var top = (new Date).getTime() - clientTop;
            return!isNaN(val2) && (val2 > 0 && (top >= 1E3 * Number(val2) && (0 != scope.realLen && scope.hq.isUpdateTime))) ? (clientTop = (new Date).getTime(), load(x, scope.hq, done), true) : false;
          }
          /**
           * @return {?}
           */
          function render() {
            /**
             * @return {undefined}
             */
            function init() {
              if (filter(scope.hq.date, matches[4][0].date)) {
                if (scope.hq.time > "16:00") {
                  if ($scope.price < 0) {
                    $scope.price = scope.hq.price;
                    $scope.avg_price = matches[4][matches[4].length - 2].avg_price;
                    /** @type {number} */
                    $scope.volume = 0;
                  }
                }
              }
            }
            /**
             * @return {undefined}
             */
            function execute() {
              if (filter(scope.hq.date, matches[4][0].date)) {
                if (scope.hq.time > "16:00") {
                  $scope.price = scope.hq.price;
                  $scope.avg_price = matches[4][matches[4].length - 2].avg_price;
                  /** @type {number} */
                  $scope.volume = 0;
                  $scope.time = scope.hq.time;
                  if ($scope.avg_price < 0) {
                    $scope.avg_price = scope.hq.price;
                  }
                }
              }
            }
            if (!scope.hq.isUpdateTime) {
              var $scope = matches[4][matches[4].length - 1];
              switch(scope.market) {
                case "US":
                  init();
                  break;
                case "HK":
                  execute();
              }
              return log(scope.hq), clone(true), extValues.createPlayingData(), self.isFunc(done) && done(), true;
            }
            return scope.date = "NF" == scope.market && scope.hq.time >= "21:00" ? item.ds(matches[4][0].date) : scope.hq.today, false;
          }
          var x;
          var matches = source.get();
          switch(scope.needMarket) {
            case "HF":
              data = self.tUtil.gata(scope.needMarket, tradeInfo.time);
              break;
            case "NF":
              data = self.tUtil.gata(scope.needMarket, action.time);
              break;
            default:
              data = self.tUtil.gata(scope.needMarket);
          }
          if (o && (o.date && (scope.datas && !options.date))) {
            if (j = false, x = matches[4], scope.hq.isDateChange) {
              if ("NF" == scope.market && (action && action.time[0][0] < "21:00") || "NF" != scope.market) {
                return void start();
              }
            } else {
              if ("CN" == scope.market && (!filter(scope.hq.date, matches[4][0].date) && scope.hq.time < "09:05") || ("NF" == scope.market && (filter(scope.hq.date, matches[4][0].date) && (action && ("21:00" == action.time[0][0] && scope.hq.time >= action.time[0][0]))) || "HF" == scope.market && (!filter(scope.hq.date, matches[4][0].date) && (0 != scope.hq.date.getDay() && (6 != scope.hq.date.getDay() && scope.hq.time >= tradeInfo.time[0][0]))))) {
                return void start();
              }
            }
            if (!parse() && !render()) {
              if (scope.datas && (node = matches[4][0]), comparisonTime(o.date, matches[4][0].date)) {
                return void(scope.realLen = width);
              }
              classNames = o.name || "";
              /** @type {string} */
              scope.hq = o;
              var _ = o.date.getHours() < 10 ? "0" + o.date.getHours() : o.date.getHours();
              if (scope.time = _ + ":" + self.strUtil.zp(o.date.getMinutes()), 0 == o.index && fn(x, o), self.arrIndexOf(data, scope.time) && (o.index > 0 && (self.arrIndexOf(data, scope.time) - scope.realLen <= 1 ? fn(x, o) : load(x, o, done), 1 == o.index && 0 == s))) {
                return s = 1, void load(x, o, done);
              }
              if ("HF" != scope.market) {
                if ("NF" != scope.market) {
                  if (scope.hq.open == scope.hq.prevclose && (scope.hq.high == scope.hq.prevclose && (scope.hq.low == scope.hq.prevclose && scope.hq.index < 0)) || o.time < "09:30") {
                    if ("CN" == scope.market) {
                      x[0].avg_price = o.price;
                      x[0].volume = o.totalVolume;
                    } else {
                      if ("option_cn" == scope.market || "NF" == scope.market) {
                        x[0].inventory = o.position || o.holdingAmount;
                      } else {
                        if ("HK" == scope.market) {
                          x[0].avg_price = o.totalAmount / o.totalVolume || o.price;
                        }
                      }
                    }
                  }
                }
              }
              if (5 == params.end) {
                clone(true);
                extValues.createPlayingData();
              }
              if (self.isFunc(done)) {
                done();
              }
            }
          }
        };
        /** @type {number} */
        var parent = -1;
        /** @type {number} */
        var _startAngle = -1;
        /** @type {number} */
        var scancode = -1;
        /**
         * @param {(Array|number)} event
         * @param {Object} item
         * @return {undefined}
         */
        var fn = function(event, item) {
          /** @type {(Array|number)} */
          var originalEvent = event;
          log(item);
          var data = originalEvent[scope.realLen];
          if (data) {
            if (node && !opt_includeNode) {
              if (stack) {
                /** @type {number} */
                item.volume = parent = item.totalVolume - (node.totalVolume || 0);
                /** @type {number} */
                item.amount = _startAngle = item.volume * item.price;
                item.totalAmount = item.amount + node.totalAmount;
                item.avg_price = scancode = item.totalAmount / item.totalVolume || item.price;
              } else {
                /** @type {number} */
                item.volume = 0;
                item.avg_price = scancode = node.totalAmount / node.totalVolume || item.price;
                /** @type {number} */
                item.totalAmount = item.totalVolume * item.avg_price;
                /** @type {boolean} */
                stack = true;
              }
              node.totalVolume = item.totalVolume;
              node.totalAmount = item.totalAmount;
            } else {
              if (memory) {
                /** @type {number} */
                item.volume = item.totalVolume - json.totalVolume || 0;
              } else {
                /** @type {number} */
                item.volume = 0;
                /** @type {boolean} */
                memory = true;
              }
              json.totalVolume = item.totalVolume;
            }
            if ("option_cn" == scope.market || "NF" == scope.market) {
              data.inventory = item.position || item.holdingAmount;
            }
            if ("CN" == scope.market) {
              data.avg_price = item.avg_price || data.price;
            } else {
              if (item.index > 1) {
                data.avg_price = (originalEvent[item.index - 1].avg_price * item.index + item.price) / (item.index + 1) || data.price;
              } else {
                if (!("fund" == scope.market)) {
                  data.avg_price = data.price || item.price;
                }
              }
              if (0 == item.index) {
                data.avg_price = item.totalAmount / item.totalVolume || item.price;
              }
              /** @type {number} */
              data.volume = 0;
            }
            if ("HK" != scope.market) {
              if ("NF" != scope.market) {
                data.volume += item.volume;
              }
            }
            data.price = item.price;
            if (data.volume <= 0) {
              /** @type {number} */
              data.volume = 0;
            }
          }
        };
        /**
         * @param {string} data
         * @param {string} opts
         * @param {Function} onComplete
         * @return {undefined}
         */
        var load = function(data, opts, onComplete) {
          var params = {
            symbol : opts.symbol,
            date : opts.today,
            withT5 : 0,
            withI : false,
            faker : "",
            dataformatter : symbolInfo.datas.t1.dataformatter,
            ssl : options.ssl
          };
          /** @type {boolean} */
          stack = memory = false;
          KKE.api("datas.t.get", params, function(messageEvent) {
            data = messageEvent.data.td1;
            log(scope.hq);
            var object = source.get();
            if ("NF" != scope.market || ("21:00" == action.time[0][0] && (scope.hq.time >= action.time[0][0] && (0 != scope.hq.date.getDay() && (6 != scope.hq.date.getDay() && (data[0].date = object[4][0].date)))), "09:30" != action.time[0][0] && "09:15" != action.time[0][0] || (!filter(object[4][0].date, scope.hq.date) || !(scope.hq.time <= action.time[0][0])))) {
              if ("HF" == scope.market && scope.hq.time > tradeInfo.time[0][0]) {
                if (data[0].today < scope.hq.today) {
                  return;
                }
                if (0 != scope.hq.date.getDay()) {
                  if (6 != scope.hq.date.getDay()) {
                    data[0].date = scope.hq.date;
                  }
                }
              }
              /** @type {string} */
              object[4] = data;
              source.initTState(object);
              if ("CN" == scope.market) {
                if ("HK" == scope.needMarket) {
                  /** @type {string} */
                  scope.needMarket = "CN";
                  el.changeData(scope);
                }
              }
              if (5 == params.end) {
                clone(true);
                extValues.createPlayingData();
              }
              if (self.isFunc(onComplete)) {
                onComplete();
              }
            }
          });
        };
        /**
         * @param {(Function|string)} rows
         * @param {?} date
         * @param {Function} callback
         * @return {undefined}
         */
        var render = function(rows, date, callback) {
          var params = {
            symbol : date.symbol,
            date : date.today,
            withT5 : 1,
            dist5 : 1,
            withI : false,
            faker : "",
            dataformatter : symbolInfo.datas.t1.dataformatter,
            ssl : options.ssl
          };
          /** @type {boolean} */
          stack = memory = false;
          KKE.api("datas.t.get", params, function(messageEvent) {
            rows = messageEvent.data.td1;
            source.initTState(messageEvent.data.td5);
            log(scope.hq);
            if (self.isFunc(callback)) {
              callback();
            }
            el.moving(params.start, params.end, "T5");
            menu.hide();
          });
        };
        /** @type {function ((Function|string), ?, Function): undefined} */
        this.updateT5Data = render;
        /**
         * @param {Function} element
         * @param {boolean} recurring
         * @param {?} allBindingsAccessor
         * @param {string} e
         * @return {undefined}
         */
        this.update = function(element, recurring, allBindingsAccessor, e) {
          var comments;
          var namedArgs;
          var evt;
          /** @type {string} */
          var space = "";
          evt = e ? e : self.market(symbolInfo.symbol);
          if ("US" == evt) {
            /** @type {string} */
            space = ",gb_ixic";
          }
          if (allBindingsAccessor) {
            /** @type {string} */
            comments = "datas.hq.parse";
            namedArgs = {
              symbol : symbolInfo.symbol + space,
              hqStr : allBindingsAccessor,
              market : evt,
              ssl : options.ssl
            };
          } else {
            /** @type {string} */
            comments = "datas.hq.get";
            namedArgs = {
              symbol : symbolInfo.symbol + space,
              delay : true,
              cancelEtag : j,
              ssl : options.ssl
            };
          }
          KKE.api(comments, namedArgs, function(self) {
            init(self.dataObj[symbolInfo.symbol], element);
          });
        };
      };
      var proto = new function() {
        var index = void 0;
        /** @type {number} */
        var o = 1;
        /**
         * @param {Function} data
         * @return {undefined}
         */
        var done = function(data) {
          if (!(o > 2)) {
            test.re(global.e.T_DATA_LOADED);
            if (self.isFunc(data)) {
              data();
            }
            o++;
          }
        };
        /**
         * @param {?} res
         * @return {?}
         */
        var callback = function(res) {
          var o = res;
          /** @type {boolean} */
          var a = false;
          return a = o.hq.open == o.hq.prevclose && (o.hq.high == o.hq.prevclose && (o.hq.low == o.hq.prevclose && o.hq.index < 0)) ? true : o.hq.time < "09:30";
        };
        /**
         * @param {?} slide
         * @param {(number|string)} element
         * @return {?}
         */
        var update = function(slide, element) {
          var openElement;
          var result;
          var req = slide;
          switch(listener) {
            case "HF":
              result = tradeInfo.time;
              break;
            case "NF":
              result = action.time;
              break;
            default:
              /** @type {Array} */
              result = [];
          }
          var attrs = self.tUtil.gltbt(1, req.hq.price, true, scope.market, [req.hq.date], result);
          return attrs[0].name = req.hq.name, attrs[0].symbol = symbolInfo.symbol, attrs[0].today = self.dateUtil.ds(req.hq.date, "-"), openElement = element, openElement[4] = attrs, scope.realLen = 0, openElement;
        };
        /**
         * @param {Function} cb
         * @return {undefined}
         */
        this.init = function(cb) {
          var i = params.viewId;
          if (index != i) {
            index = i;
            if (null != scope.datas) {
              source.initTState(i, scope.tDb.get());
            }
            var entry = {
              ssl : options.ssl,
              symbol : symbolInfo.symbol,
              date : options.date,
              withT5 : 1,
              dist5 : options.dist5,
              withI : true,
              faker : scope.needMarket,
              dataformatter : symbolInfo.datas.t1.dataformatter
            };
            switch(scope.needMarket) {
              case "HF":
                data = self.tUtil.gata(scope.needMarket, tradeInfo.time);
                break;
              case "NF":
                data = self.tUtil.gata(scope.needMarket, action.time);
                break;
              default:
                data = self.tUtil.gata(scope.needMarket);
            }
            menu.show();
            KKE.api("datas.t.get", entry, function(e) {
              if (el.hasHistory) {
                if ("history" == e.msg) {
                  el.hasHistory(attribute);
                }
              }
              var status = e.data.hq.status;
              /** @type {string} */
              var logMessage = "";
              /** @type {number} */
              var n = Number(e.data.hq.state);
              if ("error" == e.msg || "nohistory" == e.msg) {
                if (allBindingsAccessor && ("nohistory" == e.msg && (attribute = 0, el.hasHistory && el.hasHistory(attribute), children.showTip({
                  txt : global.nohistoryt,
                  parent : div,
                  noBtn : true
                }))), scope.isErr = true, allBindingsAccessor && (e.data && e.data.hq)) {
                  if (status) {
                    switch(scope.market) {
                      case "CN":
                        switch(status) {
                          case 2:
                            logMessage = global.notlisted;
                            break;
                          case 3:
                            logMessage = global.delisted;
                            break;
                          case 0:
                            logMessage = global.norecord;
                        }
                        break;
                      case "HK":
                        switch(status) {
                          case 5:
                            logMessage = global.notlisted;
                            break;
                          case 0:
                            logMessage = global.delisted;
                        }
                      ;
                    }
                  } else {
                    logMessage = global.norecord;
                  }
                  if (logMessage && 0 != n) {
                    var __hasProp;
                    var opts = {
                      txt : logMessage,
                      parent : div,
                      noBtn : true
                    };
                    if (symbolSetting.DIMENSION.getStageW() < 200) {
                      opts.bgStyle = {
                        padding : 0,
                        top : "0px"
                      };
                      if (!__hasProp) {
                        __hasProp = new self.TipM(symbolSetting.COLOR);
                        __hasProp.genTip(opts);
                      }
                    } else {
                      children.showTip({
                        txt : logMessage,
                        parent : div,
                        noBtn : true
                      });
                    }
                  }
                }
                if (0 != n && 7 != n) {
                  if (el.onResize(), 1 != status) {
                    return void el.removeCompare([entry.symbol]);
                  }
                  /** @type {boolean} */
                  scope.isErr = false;
                } else {
                  /** @type {boolean} */
                  scope.isErr = false;
                }
              }
              scope.hq = e.data.hq;
              index = void 0;
              entry.td1 = e.data.td1;
              var start;
              /** @type {Date} */
              t = new Date;
              /** @type {number} */
              var ms = 60 * t.getTimezoneOffset() * 1E3;
              t.setTime(t.getTime() + ms);
              t.setHours(t.getHours() + 8);
              classNames = scope.hq.name || "";
              log(scope.hq);
              if (callback(scope, e.data.td5) && ("HF" != scope.market && "NF" != scope.market)) {
                if ("history" == e.msg) {
                  start = e.data.td5;
                  if (!start[4][0].date) {
                    start[4][0].date = scope.hq.date;
                  }
                } else {
                  start = update(scope, e.data.td5);
                }
              } else {
                start = e.data.td5;
                if (!("NF" != scope.market)) {
                  if (!!action) {
                    if (!("09:30" != action.time[0][0] && "09:15" != action.time[0][0])) {
                      if (filter(start[4][0].date, scope.hq.date)) {
                        if (scope.hq.time <= action.time[0][0]) {
                          start = update(scope, e.data.td5);
                        }
                      }
                    }
                  }
                }
                if (start) {
                  if (!start[4][0].date) {
                    start[4][0].date = scope.hq.date;
                  }
                }
              }
              el.historyData = start;
              scope.date = e.data.td1 && e.data.td1[0].today || scope.hq.date;
              source.initTState(start);
              done(cb);
              if (1 == x) {
                data.dateTo(options.historytime, options.historycb);
                /** @type {number} */
                x = 0;
              }
              menu.hide();
            });
          }
        };
      };
      this.tDb = source;
      this.initData = proto.init;
      this.initT5Data = vec.updateT5Data;
      this.doUpdate = vec.update;
      /** @type {function (boolean): undefined} */
      this.onViewChange = clone;
      /**
       * @param {Array} deepDataAndEvents
       * @param {?} value
       * @return {undefined}
       */
      this.setPricePos = function(deepDataAndEvents, value) {
        scope.labelMaxP = deepDataAndEvents[0];
        scope.labelMinP = deepDataAndEvents[1];
        scope.labelPriceCount = deepDataAndEvents[2];
        scope.isCompare = value;
        extValues.createPlayingData();
        if (config) {
          config.setPricePos(deepDataAndEvents);
        }
      };
      /**
       * @return {undefined}
       */
      this.setRange = function() {
        extValues.setDataRange();
        if (_self) {
          _self.setDataRange();
        }
        if (config) {
          config.setDataRange();
        }
        if (rangeSelector) {
          rangeSelector.setDataRange();
        }
      };
      /**
       * @return {undefined}
       */
      this.draw = function() {
        instance.draw();
        if (_self) {
          _self.allDraw();
        }
        if (config) {
          config.allDraw();
        }
      };
      /**
       * @param {string} event
       * @return {undefined}
       */
      this.resize = function(event) {
        extValues.createPlayingData();
        instance.resize();
        if (_self) {
          _self.onResize(event);
        }
        if (config) {
          config.onResize();
        }
        if (rangeSelector) {
          rangeSelector.onResize();
        }
      };
      /**
       * @return {undefined}
       */
      this.clear = function() {
        instance.clear();
        if (_self) {
          _self.clear();
          /** @type {null} */
          _self = null;
        }
        if (config) {
          config.clear();
          /** @type {null} */
          config = null;
        }
        if (rangeSelector) {
          rangeSelector.clear();
          /** @type {null} */
          rangeSelector = null;
        }
        if (allBindingsAccessor) {
          /** @type {null} */
          root = null;
        }
      };
      /**
       * @return {?}
       */
      this.getPriceTech = function() {
        return config || null;
      };
      /**
       * @param {Array} c
       * @return {undefined}
       */
      this.removePt = function(c) {
        if (c) {
          if (!self.isArr(c)) {
            /** @type {Array} */
            c = [c];
          }
          var i = c.length;
          for (;i--;) {
            if (c[i].name && "VOLUME" === c[i].name.toUpperCase()) {
              c.splice(i, 1);
              /** @type {boolean} */
              symbolSetting.custom.show_underlay_vol = false;
              break;
            }
          }
        } else {
          /** @type {boolean} */
          symbolSetting.custom.show_underlay_vol = false;
        }
        if (config) {
          config.removeChart(c);
        }
      };
      /**
       * @param {?} opt_attributes
       * @return {undefined}
       */
      this.togglePt = function(opt_attributes) {
        if (config) {
          _ = config.showHide(opt_attributes);
        }
      };
      /**
       * @param {?} stats
       * @param {?} msg
       * @return {undefined}
       */
      var cb = function(stats, msg) {
        if (stats) {
          me.resizeAll(true);
        }
        el.onChangeView();
        if (msg) {
          if (self.isFunc(msg.callback)) {
            msg.callback();
          }
        }
      };
      /**
       * @param {Array} c
       * @param {?} docs
       * @return {undefined}
       */
      this.initPt = function(c, docs) {
        if (c) {
          if (!self.isArr(c)) {
            /** @type {Array} */
            c = [c];
          }
          var i = c.length;
          for (;i--;) {
            if (c[i].name && "VOLUME" === c[i].name.toUpperCase()) {
              c.splice(i, 1);
              /** @type {boolean} */
              symbolSetting.custom.show_underlay_vol = true;
              break;
            }
          }
          if (!config) {
            config = new tmp({
              stockData : scope,
              chartArea : img,
              titleArea : container,
              /** @type {function (?, ?): undefined} */
              cb : cb,
              type : "t",
              cfg : symbolSetting,
              usrObj : options
            });
            if (allBindingsAccessor) {
              jObj = config;
            }
          }
          config.createChart(c, docs);
        }
      };
      /**
       * @param {?} subNode
       * @param {?} err
       * @return {undefined}
       */
      this.initTc = function(subNode, err) {
        if (!_self) {
          _self = new first({
            stockData : scope,
            iMgr : stockEL,
            subArea : html,
            /** @type {function (?, ?): undefined} */
            cb : cb,
            cfg : symbolSetting,
            type : "option_cn" == listener ? "p" : "t",
            usrObj : options,
            initMgr : me
          });
          if (allBindingsAccessor) {
            target = _self;
          }
        }
        _self.createChart(subNode, err);
      };
      /**
       * @param {?} subNode
       * @return {undefined}
       */
      this.removeTc = function(subNode) {
        if (_self) {
          _self.removeChart(subNode);
        }
      };
      /**
       * @return {undefined}
       */
      this.initRs = function() {
        if (!rangeSelector) {
          rangeSelector = new initRangeSelector({
            stockData : scope,
            setting : symbolSetting,
            state : params,
            rc : el.moving,
            witht5 : 1
          });
          root = rangeSelector;
        }
        rangeSelector.linkData();
      };
      this.setTLineStyle = instance.setTLineStyle;
      init();
    }
    /**
     * @param {Object} $scope
     * @param {(Array|string)} fn
     * @return {undefined}
     */
    function draw($scope, fn) {
      /**
       * @return {undefined}
       */
      function clear() {
        var file = $scope.isMain;
        if ($scope.nfloat = options.nfloat || 2, file) {
          simple = symbolSetting.COLOR.T_P;
          rotationDegree = symbolSetting.COLOR.T_AVG;
        } else {
          if (!(2 != el.dAdd)) {
            if (!_this.linecolor) {
              _this.linecolor = options.overlaycolor;
            }
          }
          var error = _this.linecolor || "#cccccc";
          simple = error.K_N || (error.T_N || "#" + self.randomColor());
        }
        ctx = new dataAndEvents.xh5_ibPainter({
          setting : symbolSetting,
          sd : $scope,
          withHBg : file,
          ctn : node,
          iMgr : stockEL,
          reO : {
            mh : symbolSetting.DIMENSION.H_MA4K
          },
          /**
           * @param {Element} el
           * @param {number} moveX
           * @param {(number|string)} moveY
           * @param {Function} e
           * @return {undefined}
           */
          iTo : function(el, moveX, moveY, e) {
            if (!$CONTAINS(el, stockEL.iHLineO.body) && el.appendChild(stockEL.iHLineO.body), $scope && $scope.datas) {
              var s;
              var rmark;
              var p = $scope.datas[0][0].prevclose;
              if (2 == $scope.dAdd) {
                /** @type {number} */
                s = $scope.labelMaxP * p + p - moveY / symbolSetting.DIMENSION.h_t * ($scope.labelMaxP * p + p - ($scope.labelMinP * p + p));
              } else {
                /** @type {number} */
                s = $scope.labelMaxP - moveY / symbolSetting.DIMENSION.h_t * ($scope.labelMaxP - $scope.labelMinP);
                /** @type {string} */
                rmark = Number(100 * (s - p) / p).toFixed(2) + "%";
              }
              stockEL.iToD({
                mark : s,
                rmark : rmark,
                x : moveX,
                y : moveY,
                oy : symbolSetting.DIMENSION.H_MA4K,
                ox : symbolSetting.DIMENSION.posX,
                /** @type {Function} */
                e : e
              }, true, false);
            }
          }
        });
      }
      var _this;
      var ctx;
      var simple;
      var rotationDegree;
      var xr;
      var T_AVG = {};
      /** @type {number} */
      var CanvasWidth = 1;
      /**
       * @param {Array} element
       * @return {undefined}
       */
      var func = function(element) {
        _this = callback({
          linetype : "line_" + CanvasWidth,
          linecolor : _this ? _this.linecolor || {} : {}
        }, element || {});
        /** @type {Array} */
        var range = [];
        if (element) {
          if (element.linetype) {
            range = element.linetype.split("_");
            if (range.length > 1) {
              if ("line" == range[0]) {
                /** @type {number} */
                CanvasWidth = Number(range[1]) || 1;
              }
            }
          }
        }
        T_AVG = _this.linecolor || {};
        simple = T_AVG.K_N || (T_AVG.T_N || symbolSetting.COLOR.T_P);
        rotationDegree = T_AVG.T_AVG || symbolSetting.COLOR.T_AVG;
        xr = T_AVG.T_PREV || symbolSetting.COLOR.T_PREV;
      };
      /**
       * @return {undefined}
       */
      var draw = function() {
        /**
         * @return {undefined}
         */
        function animate() {
          if ($scope.isMain && symbolSetting.custom.show_underlay_vol) {
            var repeat;
            var piBy2 = symbolSetting.COLOR.V_SD;
            var i = len;
            for (;l > i;i++) {
              config = nodes[i];
              repeat = config.vy;
              ctx.drawVStickC(x, repeat, y, symbolSetting.DIMENSION.h_t, piBy2);
              x += radius;
            }
            ctx.stroke();
            /** @type {number} */
            ctx.getG().lineWidth = 1;
          }
        }
        /**
         * @return {?}
         */
        function draw() {
          if ((!$scope.isCompare || 2 == $scope.dAdd && $scope.isMain) && !("HK" == $scope.market && ($scope.hq && "indx" == $scope.hq.type) || "US" == $scope.market)) {
            /** @type {number} */
            x = radius * (0.5 + len);
            ctx.newStyle(rotationDegree, true, CanvasWidth);
            i = len;
            for (;l > i && (config = nodes[i], !(config.price <= 0));i++) {
              if (5 == params.end && ("CN" == $scope.market && jObj)) {
                var folderList = jObj.getLog();
                /** @type {number} */
                var j = 0;
                for (;j < folderList.length;j++) {
                  if ("EWI" == folderList[j].name && i > (l / width - 1) * width) {
                    return void ctx.stroke();
                  }
                }
              }
              if (i == len || i % width == 0) {
                ctx.moveTo(x, nodes[i].ay);
              } else {
                ctx.lineTo(x, nodes[i].ay);
              }
              x += radius;
            }
            ctx.stroke();
          }
        }
        /**
         * @return {undefined}
         */
        function renderText() {
          ctx.newStyle(simple, true, CanvasWidth);
          /** @type {number} */
          x = radius * (0.5 + len);
          if ("CN" == $scope.market) {
            if ($scope.preData.vPos) {
              if (0 == $scope.realLen && $scope.hq) {
                if ($scope.hq.time > "09:29") {
                  ctx.moveTo(0, $scope.preData.vPos);
                  if (!nodes[0].py) {
                    nodes[0].py = $scope.preData.vPos;
                  }
                  ctx.lineTo(x, nodes[0].py);
                } else {
                  ctx.drawDot(x, $scope.preData.vPos, 1);
                }
              } else {
                ctx.moveTo(0, $scope.preData.vPos);
                if (!nodes[0].py) {
                  nodes[0].py = $scope.preData.vPos;
                }
                ctx.lineTo(x, nodes[0].py);
              }
              ctx.stroke();
            }
          }
        }
        /**
         * @return {undefined}
         */
        function drawEvent() {
          var dy;
          i = len;
          for (;l > i && (config = nodes[i], !(config.price <= 0));i++) {
            dy = config.py;
            if (i == len || i % width == 0) {
              ctx.moveTo(x, dy);
            } else {
              ctx.lineTo(x, dy);
            }
            config.ix = x;
            x += radius;
          }
          ctx.stroke();
        }
        /**
         * @return {undefined}
         */
        function drawShadow() {
          if (N) {
            if (!$scope.isCompare) {
              if ($scope.datas.length < 2) {
                x -= radius;
                ctx.lineTo(x, symbolSetting.DIMENSION.h_t);
                ctx.lineTo(0.5 * radius, symbolSetting.DIMENSION.h_t);
                ctx.newFillStyle_rgba(symbolSetting.COLOR.M_ARR, symbolSetting.DIMENSION.h_t, 0.5);
                ctx.fill();
              }
            }
          }
        }
        /**
         * @return {undefined}
         */
        function drawLabelNoHtmlText() {
          xr = symbolSetting.COLOR.T_PREV;
          ctx.newStyle(xr, true, 1);
          var position;
          /** @type {number} */
          var d = 0;
          /** @type {number} */
          var chunk = 5;
          position = $scope.isCompare && ($scope.isMain && "pct" === symbolSetting.datas.scaleType) ? xh5PosUtil.pp(0, $scope.labelMinP, $scope.labelMaxP, symbolSetting.DIMENSION.h_t) : xh5PosUtil.pp($scope.datas[0][0].prevclose, $scope.minPrice, $scope.maxPrice, symbolSetting.DIMENSION.h_t);
          /** @type {number} */
          position = ~~(position + 0.5);
          position -= 0.5;
          for (;d < symbolSetting.DIMENSION.w_t;) {
            ctx.moveTo(d, position);
            d += chunk;
            ctx.lineTo(d, position);
            d += chunk;
          }
          if ($scope.isMain) {
            ctx.stroke();
          }
        }
        if (!(symbolSetting.DIMENSION.getStageH() < 0)) {
          if ($scope.isMain) {
            ctx.drawBg("T");
          }
          /** @type {Array} */
          var nodes = [];
          if ($scope.datas) {
            /** @type {number} */
            var j = 0;
            for (;j < $scope.datas.length;j++) {
              /** @type {Array} */
              nodes = nodes.concat($scope.datas[j]);
            }
            /** @type {number} */
            var l = nodes.length;
            if (nodes) {
              var i;
              var config;
              var len;
              var N = _this.linetype && 0 == _this.linetype.indexOf("mountain");
              /** @type {number} */
              var minimumCellWidth = $scope.datas.length * width;
              /** @type {number} */
              var radius = symbolSetting.DIMENSION.w_t / Math.max(minimumCellWidth, symbolSetting.PARAM.minCandleNum);
              /** @type {number} */
              var y = 0.5 * radius;
              /** @type {number} */
              var x = 0;
              if ($scope.isTotalRedraw) {
                /** @type {number} */
                len = 0;
                ctx.clear(true, symbolSetting.PARAM.getHd());
              } else {
                /** @type {number} */
                len = minimumCellWidth - 2;
                if (0 > len) {
                  /** @type {number} */
                  len = 0;
                }
                x += radius * len;
                ctx.clearLimit(x + y, radius + y);
              }
              animate();
              draw();
              renderText();
              drawEvent();
              drawShadow();
              drawLabelNoHtmlText();
            }
          }
        }
      };
      /** @type {function (): undefined} */
      this.draw = draw;
      /**
       * @return {undefined}
       */
      this.clear = function() {
        ctx.remove();
        /** @type {null} */
        ctx = null;
      };
      /**
       * @return {undefined}
       */
      this.resize = function() {
        ctx.resize({
          mh : symbolSetting.DIMENSION.H_MA4K
        });
        draw();
      };
      /** @type {function (Array): undefined} */
      this.setTLineStyle = func;
      func(fn);
      clear();
    }
    /**
     * @return {undefined}
     */
    function Renderer() {
      var e;
      var that = this;
      /** @type {Array} */
      var arr = [];
      /**
       * @return {?}
       */
      this.getAllStock = function() {
        return arr;
      };
      /**
       * @return {?}
       */
      this.getMainStock = function() {
        return e;
      };
      /**
       * @return {?}
       */
      this.getAllSymbols = function() {
        /** @type {Array} */
        var xChildren = [];
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = arr.length;
        for (;l > i;i++) {
          xChildren.push(arr[i].symbol);
        }
        return xChildren;
      };
      /**
       * @return {undefined}
       */
      var update = function() {
        var c;
        var p3;
        var getMaxMin;
        /** @type {number} */
        var minX = Number.MAX_VALUE;
        /** @type {number} */
        var maxX = -Number.MAX_VALUE;
        /** @type {number} */
        var len = arr.length;
        /** @type {boolean} */
        var udataCur = len > 1;
        /** @type {string} */
        var diff = udataCur ? "avgPercent" : "Price";
        /** @type {number} */
        var i = len;
        for (;i--;) {
          c = arr[i];
          getMaxMin = c.getPriceTech();
          if (getMaxMin) {
            if (!udataCur) {
              if (getMaxMin.getMaxMin()[0]) {
                maxX = getMaxMin.getMaxMin()[0];
                minX = getMaxMin.getMaxMin()[1];
              }
            }
          }
          /** @type {Array} */
          p3 = [maxX, minX];
          /** @type {number} */
          minX = Math.min(minX, c["min" + diff], p3[1]);
          /** @type {number} */
          maxX = Math.max(maxX, c["max" + diff], p3[0]);
        }
        if (jObj) {
          var attrs = jObj.getLog();
          var l = attrs.length;
          /** @type {number} */
          i = 0;
          for (;l > i;i++) {
            if ("EWI" == attrs[i].name || "MA" == attrs[i].name) {
              var x = arr[0].datas[0][0].prevclose;
              /** @type {number} */
              var delta = Math.max(Math.abs(x - maxX), Math.abs(x - minX));
              maxX = x + delta;
              /** @type {number} */
              minX = x - delta;
            }
          }
        }
        var m1;
        var h_t = symbolSetting.DIMENSION.h_t;
        /** @type {number} */
        m1 = 100 > h_t ? 2 : 180 > h_t ? 4 : 300 > h_t ? 6 : 8;
        /** @type {number} */
        var idx = len;
        for (;idx--;) {
          c = arr[idx];
          c.setPricePos([maxX, minX, m1], udataCur);
        }
      };
      /**
       * @param {Object} x
       * @return {undefined}
       */
      var startGame = function(x) {
        if (x) {
          x.draw();
        } else {
          /** @type {number} */
          var e = arr.length;
          for (;e--;) {
            arr[e].draw();
          }
        }
      };
      /**
       * @param {boolean} isXML
       * @return {undefined}
       */
      var resolveWith = function(isXML) {
        if (1 == params.viewId || 0 == params.viewId) {
          if (options.date) {
            that.moving(params.start, params.end);
          } else {
            that.moving(4, 5, false);
          }
        } else {
          that.moving(params.start, params.end, false);
        }
        if (!isXML) {
          console.onRange(e);
        }
      };
      /**
       * @param {?} e
       * @return {?}
       */
      var error = function(e) {
        return e.isErr ? (self.trace.error("err symbol data"), that.removeCompare([e.symbol]), true) : e.tDb.get() ? true : (e.initData(resolve), false);
      };
      /** @type {Array} */
      var keys = [];
      /**
       * @param {Object} e
       * @return {undefined}
       */
      var notify = function(e) {
        if (e && self.isFunc(e.callback)) {
          /** @type {boolean} */
          var a = false;
          /** @type {number} */
          var i = keys.length;
          for (;i--;) {
            if (e.callback === keys[i]) {
              /** @type {boolean} */
              a = true;
              break;
            }
          }
          if (!a) {
            keys.push(e.callback);
          }
        }
      };
      /**
       * @param {boolean} isXML
       * @param {?} msg
       * @return {?}
       */
      var resolve = function(isXML, msg) {
        if (notify(msg), error(e)) {
          if (e.isErr) {
            return self.trace.error("err main symbol"), void(e.isErr = false);
          }
          stockEL.patcher.switchFloater();
          var uncaughtException;
          /** @type {boolean} */
          var o = true;
          /** @type {number} */
          var i = arr.length;
          for (;i--;) {
            uncaughtException = arr[i];
            if (!(uncaughtException == e)) {
              if (!error(uncaughtException)) {
                /** @type {boolean} */
                o = false;
              }
            }
          }
          if (o) {
            /** @type {number} */
            i = arr.length;
            for (;i--;) {
              if (arr[i].marketNum(arr[i].needMarket) > arr[i].marketNum(listener)) {
                listener = arr[i].needMarket;
              }
            }
            /** @type {number} */
            i = arr.length;
            for (;i--;) {
              fn(arr[i]);
            }
            resolveWith(isXML);
            for (;keys.length;) {
              var isPromiseAlike = keys.shift();
              isPromiseAlike();
            }
          }
          if (console.onViewChanged(), isXML) {
            return;
          }
          console.onViewPrice();
          console.onDataUpdate();
        }
      };
      /**
       * @return {undefined}
       */
      var renderMeshFilter = function() {
        console.onRange(e);
      };
      /**
       * @param {Object} value
       * @return {?}
       */
      this.getExtraData = function(value) {
        if (value = callback({
          symbol : e.symbol,
          name : null,
          clone : true
        }, value || {}), !value.name) {
          return null;
        }
        var item;
        var numAffected;
        /** @type {number} */
        var i = arr.length;
        for (;i--;) {
          if (arr[i].symbol === value.symbol) {
            item = arr[i];
            break;
          }
        }
        if (item) {
          var result;
          if ("t1" == value.name || "t5" == value.name) {
            result = item.tDb.get();
            numAffected = value.clone ? self.clone(result) : result;
          } else {
            /** @type {null} */
            numAffected = null;
          }
        }
        return numAffected;
      };
      /**
       * @param {Object} data
       * @return {undefined}
       */
      this.shareTo = function(data) {
        data = callback({
          type : "weibo",
          url : window.location.href,
          wbtext : "",
          qrwidth : 100,
          qrheight : 100,
          extra : void 0
        }, data);
        /** @type {string} */
        var qrcode = String(data.type).toLowerCase();
        switch(qrcode) {
          case "qrcode":
            KKE.api("utils.qrcode.createcanvas", {
              text : data.url,
              width : data.qrwidth,
              height : data.qrheight
            }, function(h) {
              children.showTip({
                content : h,
                txt : '<p style="margin:0 0 9px 0;">扫描二维码</p>',
                parent : div,
                btnLb : "关闭"
              });
            });
            break;
          default:
            self.grabM.shareTo({
              ctn : div,
              w : symbolSetting.DIMENSION.getStageW(),
              h : symbolSetting.DIMENSION.getStageH() - (parent.clientHeight || 0),
              ignoreZIdxArr : [symbolSetting.PARAM.I_Z_INDEX],
              ignoreIdArr : [symbolSetting.PARAM.LOGO_ID],
              priorZIdx : symbolSetting.PARAM.G_Z_INDEX,
              nologo : false,
              top : symbolSetting.DIMENSION.posY + symbolSetting.DIMENSION.H_MA4K + 17,
              right : symbolSetting.DIMENSION.RIGHT_W + symbolSetting.DIMENSION.K_RIGHT_W,
              LOGO_W : symbolSetting.DIMENSION.LOGO_W,
              LOGO_H : symbolSetting.DIMENSION.LOGO_H,
              color : symbolSetting.COLOR.LOGO,
              bgColor : symbolSetting.COLOR.BG,
              txt : data.wbtext,
              url : data.url,
              extra : data.extra
            });
        }
      };
      var timeout;
      var tref;
      /**
       * @return {undefined}
       */
      var render = function() {
        stockEL.update();
        update();
        startGame();
        renderMeshFilter();
        if (!stockEL.isIng()) {
          console.onViewPrice();
        }
      };
      /**
       * @return {undefined}
       */
      var remove = function() {
        clearTimeout(tref);
        if (!ee) {
          if (div.parentNode) {
            if ("none" != div.style.display) {
              /** @type {number} */
              tref = setTimeout(render, 200);
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      var onChange = function() {
        if (clearInterval(timeout), !isNaN(options.rate)) {
          /** @type {number} */
          var remaining = 1E3 * options.rate;
          if (remaining > 0) {
            /** @type {number} */
            timeout = setTimeout(onChange, remaining);
          }
        }
        var item;
        /** @type {number} */
        var arrCount = arr.length;
        for (;arrCount--;) {
          item = arr[arrCount];
          item.doUpdate(remove);
        }
      };
      /**
       * @return {undefined}
       */
      var parseUniformsAttributesCustom = function() {
        /** @type {number} */
        params.viewId = 2;
        var cell;
        /** @type {number} */
        var j = arr.length;
        for (;j--;) {
          cell = arr[j];
          cell.initT5Data(cell.datas, cell.hq, resolve);
        }
      };
      /** @type {function (): undefined} */
      this.updateDataAll = onChange;
      /** @type {function (): undefined} */
      this.update5Data = parseUniformsAttributesCustom;
      /**
       * @param {string} test
       * @param {boolean} recurring
       * @return {undefined}
       */
      var some = function(test, recurring) {
        var tmp = new _init(test, recurring);
        if (recurring) {
          e = tmp;
        }
        arr[arr.length] = tmp;
        forOwn();
        resolve();
      };
      /**
       * @param {string} id
       * @return {undefined}
       */
      var clear = function(id) {
        var value;
        var row;
        /** @type {string} */
        var url = id;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var o = 0;
        for (;i < arr.length;i++) {
          row = arr[i];
          if (row.marketNum(row.market) == row.marketNum(url)) {
            o++;
          } else {
            value = value ? row.marketNum(row.market) > row.marketNum(value) ? row.market : value : row.market;
          }
          if (i == arr.length - 1) {
            if (0 == o) {
              listener = value;
            }
          }
        }
        /** @type {number} */
        i = arr.length;
        for (;i--;) {
          fn(arr[i], url);
        }
      };
      /**
       * @param {?} res
       * @param {?} key
       * @return {undefined}
       */
      var fn = function(res, key) {
        res.changeMarket(key);
      };
      /** @type {function (?, ?): undefined} */
      this.changeData = fn;
      /**
       * @return {undefined}
       */
      var forOwn = function() {
        if (arr.length > 1) {
          that.mM.togglePt({
            v : false
          });
        } else {
          if (arr.length <= 0) {
            return;
          }
          that.mM.togglePt({
            v : true
          });
        }
      };
      /**
       * @param {number} num
       * @return {?}
       */
      var bound = function(num) {
        var start = params.start;
        var len = params.end;
        return start = Math.max(start + num, 0), 0 == start && (5 >= len && (0 == params.start && len++)), start >= len && (start = len - 1), len > 5 && (len = 5), [start, len];
      };
      /**
       * @param {Event} e
       * @return {undefined}
       */
      this.onWheel = function(e) {
        var cDigit = -1 * e.detail || e.wheelDelta;
        if (0 != cDigit) {
          /** @type {number} */
          cDigit = cDigit > 0 ? -1 : 1;
          var coord = bound(cDigit);
          that.moving(coord[0], coord[1], "wheel");
        }
      };
      /**
       * @param {Object} event
       * @return {undefined}
       */
      this.onKb = function(event) {
        var code = event.keyCode;
        switch(code) {
          case 38:
          ;
          case 40:
            var coord = bound(38 == code ? 1 : -1);
            that.moving(coord[0], coord[1], "Key");
            break;
          case 37:
          ;
          case 39:
            stockEL.iToKb(37 == code ? -1 : 1);
            break;
          default:
            return;
        }
        dom.preventDefault(event);
      };
      /**
       * @param {boolean} v00
       * @return {undefined}
       */
      this.zoomApi = function(v00) {
        var coord = bound(v00 ? 1 : -1);
        that.moving(coord[0], coord[1], "zoom");
      };
      /**
       * @param {string} val
       * @return {undefined}
       */
      this.moveApi = function(val) {
        var i = params.start;
        var to = params.end;
        i += val;
        to += val;
        if (to > 5) {
          /** @type {number} */
          i = 4;
          /** @type {number} */
          to = 5;
        }
        if (0 > i) {
          /** @type {number} */
          i = 0;
          /** @type {number} */
          to = 1;
        }
        that.moving(i, to, "move");
      };
      /** @type {function (boolean): undefined} */
      this.setViewData = resolveWith;
      /** @type {function (boolean, ?): ?} */
      this.onChangeView = resolve;
      /**
       * @param {number} n
       * @param {number} value
       * @param {string} name
       * @return {undefined}
       */
      this.moving = function(n, value, name) {
        /** @type {number} */
        params.start = n;
        /** @type {number} */
        params.end = value;
        if (4 != n && 5 != value || 0 != n && 5 != value) {
          /** @type {number} */
          params.viewId = 0;
        }
        if ("HF" == listener) {
          if (0 == handler) {
            if (name) {
              menu.show();
              parseUniformsAttributesCustom("t5");
              /** @type {number} */
              handler = 1;
            }
          }
        }
        var res;
        /** @type {number} */
        var j = arr.length;
        for (;j--;) {
          res = arr[j];
          res.setRange();
          res.onViewChange();
        }
        update();
        startGame();
        console.onRange(e);
      };
      /** @type {number} */
      this.dAdd = 0;
      /**
       * @param {string} obj
       * @return {undefined}
       */
      this.compare = function(obj) {
        /** @type {number} */
        var i = arr.length;
        for (;i--;) {
          if (arr[i].symbol == obj.symbol) {
            return;
          }
        }
        some(obj, false);
      };
      /**
       * @param {?} xs
       * @return {undefined}
       */
      this.removeCompare = function(xs) {
        var map;
        var x;
        /** @type {string} */
        var modId = "CN";
        var _i = xs.length;
        for (;_i--;) {
          x = xs[_i];
          /** @type {number} */
          var i = arr.length;
          for (;i--;) {
            if (x == arr[i].symbol) {
              map = arr.splice(i, 1)[0];
              modId = map.market;
              map.clear();
              /** @type {null} */
              map = null;
              break;
            }
          }
        }
        clear(modId);
        forOwn();
        update();
        startGame();
        console.onRange(arr[0]);
      };
      /**
       * @param {string} e
       * @return {undefined}
       */
      this.onResize = function(e) {
        /** @type {number} */
        var i = arr.length;
        for (;i--;) {
          arr[i].resize(e);
        }
      };
      /**
       * @return {undefined}
       */
      this.dcReset = function() {
        var two;
        /** @type {number} */
        var arrCount = arr.length;
        for (;arrCount--;) {
          two = arr.splice(arrCount, 1)[0];
          two.clear();
          /** @type {null} */
          two = null;
        }
      };
      /**
       * @param {string} v00
       * @return {undefined}
       */
      this.setScale = function(v00) {
        /** @type {string} */
        symbolSetting.datas.scaleType = v00;
      };
      /**
       * @param {Array} arg
       * @return {undefined}
       */
      this.setTLineStyle = function(arg) {
        if (arg) {
          if (!self.isArr(arg)) {
            /** @type {Array} */
            arg = [arg];
          }
          var n = arg.length;
          for (;n--;) {
            var a = arg[n];
            if (a.hasOwnProperty("symbol")) {
              var symbol = a.symbol;
              /** @type {number} */
              var i = arr.length;
              for (;i--;) {
                if (arr[i].symbol == symbol) {
                  arr[i].setTLineStyle(a);
                  arr[i].draw();
                  break;
                }
              }
            } else {
              e.setTLineStyle(a);
              e.draw();
            }
          }
        } else {
          e.setTLineStyle();
          e.draw();
        }
      };
      var going;
      /**
       * @param {?} allBindingsAccessor
       * @return {undefined}
       */
      var init = function(allBindingsAccessor) {
        if (allBindingsAccessor) {
          render();
        } else {
          stockEL.update();
        }
      };
      /** @type {boolean} */
      var H = false;
      /** @type {number} */
      var P = 0;
      /**
       * @return {undefined}
       */
      var drawImage = function() {
        clearTimeout(going);
        /** @type {boolean} */
        H = false;
        /** @type {number} */
        P = 0;
      };
      /**
       * @return {undefined}
       */
      var gameLoop = function() {
        /** @type {number} */
        going = setTimeout(function() {
          if (P > 0) {
            render();
          }
          drawImage();
        }, 500);
      };
      /**
       * @param {Array} c
       * @param {number} deepDataAndEvents
       * @return {undefined}
       */
      this.pushData = function(c, deepDataAndEvents) {
        /** @type {boolean} */
        var handler = false;
        switch(Number(deepDataAndEvents)) {
          case 1:
            drawImage();
            /** @type {boolean} */
            handler = true;
            break;
          case 2:
            if (!H) {
              /** @type {boolean} */
              H = true;
              gameLoop();
            }
            break;
          case 0:
            drawImage();
        }
        var i = c.length;
        for (;i--;) {
          /** @type {number} */
          var orgLen = arr.length;
          for (;orgLen--;) {
            if (arr[orgLen].symbol == c[i].symbol && c[i].data) {
              P++;
              arr[orgLen].doUpdate(utilPartial(init, null, handler), false, c[i].data, c[i].market);
              break;
            }
          }
        }
      };
      /**
       * @param {string} obj
       * @return {undefined}
       */
      this.dcInit = function(obj) {
        some(obj, true);
        onChange();
      };
      this.mM = new function() {
        /**
         * @param {?} a
         * @param {string} obj
         * @param {Array} property
         * @return {undefined}
         */
        var copy = function(a, obj, property) {
          var data;
          var method;
          switch(obj) {
            case "price":
              data = tmp;
              /** @type {string} */
              method = "initPt";
              break;
            case "tech":
              data = first;
              /** @type {string} */
              method = "initTc";
          }
          if (method) {
            if (data) {
              e[method](a, property);
            } else {
              KKE.api("plugins.techcharts.get", {
                type : obj
              }, function(fragment) {
                first = fragment.tChart;
                tmp = fragment.pChart;
                copy(a, obj, property);
              });
            }
          }
        };
        /**
         * @param {?} type
         * @param {string} obj
         * @return {undefined}
         */
        var promise = function(type, obj) {
          var has;
          switch(obj) {
            case "price":
              /** @type {string} */
              has = "removePt";
              break;
            case "tech":
              /** @type {string} */
              has = "removeTc";
          }
          if (has) {
            if (e) {
              e[has](type);
              resolve();
            }
          }
        };
        /**
         * @param {?} node
         * @return {?}
         */
        var hide = function(node) {
          return initRangeSelector ? (root ? root.sh(node) : (e.initRs(), hide(node), parent.appendChild(root.getBody())), void me.resizeAll(true)) : void KKE.api("plugins.rangeselector.get", null, function(rsAlt) {
            initRangeSelector = rsAlt;
            hide(node);
          });
        };
        /** @type {function (?): ?} */
        this.showRs = hide;
        /** @type {function (?, string, Array): undefined} */
        this.newAC = copy;
        /** @type {function (?, string): undefined} */
        this.removeAC = promise;
        /**
         * @param {?} opt_attributes
         * @return {undefined}
         */
        this.togglePt = function(opt_attributes) {
          if (e) {
            e.togglePt(opt_attributes);
            resolve();
          }
        };
      };
    }
    /** @type {string} */
    var listener = "CN";
    /** @type {number} */
    var attribute = 1;
    /** @type {number} */
    var x = 0;
    /** @type {string} */
    var suffix = "手";
    /** @type {number} */
    var handler = 0;
    var events = {
      /**
       * @param {?} trigger
       * @return {?}
       */
      tcd : function(trigger) {
        var valsLength;
        switch(trigger) {
          case "HF":
            valsLength = self.tUtil.gtAll(tradeInfo.time).length;
            break;
          case "CN":
            /** @type {number} */
            valsLength = 241;
            if (self.isRepos(options.symbol)) {
              /** @type {string} */
              suffix = "";
            }
            break;
          case "option_cn":
            /** @type {number} */
            valsLength = 241;
            /** @type {string} */
            suffix = "";
            break;
          case "HK":
            /** @type {number} */
            valsLength = 331;
            /** @type {string} */
            suffix = "";
            break;
          case "US":
            /** @type {number} */
            valsLength = 391;
            /** @type {string} */
            suffix = "";
            break;
          case "NF":
            valsLength = self.tUtil.gtAll(action.time).length;
            /** @type {string} */
            suffix = "";
            break;
          default:
            /** @type {number} */
            valsLength = 241;
        }
        return valsLength;
      },
      /**
       * @param {number} actualObject
       * @param {?} trigger
       * @param {string} v22
       * @return {?}
       */
      rmuk : function(actualObject, trigger, v22) {
        var l;
        var US;
        /** @type {number} */
        var object = actualObject;
        return "HK" == v22 ? (l = object.splice(0, 120), US = l.concat(object.splice(30, 121))) : "US" == v22 || (US = actualObject), US;
      },
      /**
       * @param {Array} givenArgs
       * @param {string} actualObject
       * @param {string} event
       * @param {Date} d
       * @param {?} deep
       * @return {?}
       */
      aduk : function(givenArgs, actualObject, event, d, deep) {
        var value;
        var prevSources;
        var config;
        var s;
        var callback;
        /** @type {Array} */
        var symbolInfo = givenArgs;
        /** @type {string} */
        var object = actualObject;
        /** @type {string} */
        var originalEvent = event;
        /** @type {Array} */
        var employees = [];
        /** @type {Array} */
        var obj = [];
        var listener = d.getHours() + ":" + self.strUtil.zp(d.getMinutes());
        var name = self.tUtil.gata(event);
        var length = item.stbd(d, deep) ? self.arrIndexOf(name, listener) : 0;
        if ("HK" == object) {
          if ("US" == event) {
            /** @type {Array} */
            prevSources = [["12:01", "12:59"]];
            /** @type {Array} */
            employees = [1];
            config = symbolInfo[150];
            s = symbolInfo[symbolInfo.length - 1];
          }
        }
        if ("CN" == object || "option_cn" == object) {
          if ("HK" == originalEvent) {
            /** @type {Array} */
            prevSources = [["11:30", "11:59"], ["15:01", "16:00"]];
            /** @type {Array} */
            employees = [0, 2];
            config = symbolInfo[119];
            s = symbolInfo[symbolInfo.length - 1];
          } else {
            /** @type {Array} */
            prevSources = [["11:30", "11:59"], ["12:00", "12:59"], ["15:01", "16:00"]];
            /** @type {Array} */
            employees = [0, 1, 2];
            config = symbolInfo[119];
            s = symbolInfo[symbolInfo.length - 1];
          }
        }
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = employees.length;
        for (;l > i;i++) {
          var copies;
          var padlen;
          var index;
          var values = self.tUtil.gtr([prevSources[i]]);
          /** @type {Array} */
          var unique = [];
          /** @type {number} */
          var id = 0;
          var valuesLen = values.length;
          for (;valuesLen > id;id++) {
            if (employees[i] < 2) {
              if ("CN" == object || "option_cn" == object) {
                if (length > 120 && 150 > length) {
                  /** @type {number} */
                  padlen = length - 120;
                  index = padlen > id ? config.price : -0.01;
                } else {
                  index = config.price;
                }
              }
              if ("HK" == object) {
                if (length > 150) {
                  if (180 > length) {
                    /** @type {number} */
                    padlen = length - 150;
                  }
                }
              }
              copies = {
                time : values[id],
                price : index,
                avg_price : index,
                volume : 0,
                fake : employees[i]
              };
            } else {
              if ("CN" == object || "option_cn" == object) {
                if (length > 272) {
                  /** @type {number} */
                  padlen = length - 272;
                  index = padlen > id ? s.price : -0.01;
                } else {
                  index = s.price;
                }
              }
              copies = {
                time : values[id],
                price : index,
                avg_price : index,
                volume : 0,
                fake : employees[i]
              };
            }
            unique.push(copies);
          }
          obj.push(unique);
        }
        return "HK" == actualObject && (callback = symbolInfo.splice(0, 151), value = callback.concat(obj[0], symbolInfo)), ("CN" == actualObject || "option_cn" == object) && ("US" == originalEvent ? (callback = symbolInfo.splice(0, 120), value = callback.concat(obj[0], obj[1], symbolInfo, obj[2])) : "HK" == originalEvent && (callback = symbolInfo.splice(0, 120), value = callback.concat(obj[0], symbolInfo, obj[1]))), value;
      }
    };
    self.xh5_EvtDispatcher.call(this);
    var test = this;
    options = callback({
      symbol : "sh000001",
      ssl : false,
      datas : {
        t1 : {
          url : void 0,
          dataformatter : void 0
        },
        t5 : {
          url : void 0,
          dataformatter : void 0
        }
      },
      dim : null,
      theme : null,
      view : "ts",
      rate : 3,
      t_rate : 0 / 0,
      fh5 : false,
      noh5 : null,
      reorder : true,
      reheight : true,
      dist5 : 0,
      w : void 0,
      h : void 0,
      mh : 0,
      date : null,
      dp : false,
      onrange : void 0,
      onviewprice : void 0,
      ondataupdate : void 0,
      onviewchanged : void 0,
      nfloat : 2,
      trace : void 0,
      overlaycolor : void 0,
      nohtml5info : void 0,
      tchartobject : {
        t : void 0,
        k : void 0
      }
    }, options || {
      YANGWEN : "yangwen@staff.sina.com.cn",
      VER : "2.5.6"
    });
    if (!options.symbol) {
      /** @type {string} */
      options.symbol = "sh000001";
    }
    /** @type {string} */
    options.symbol = String(options.symbol);
    if (0 == location.protocol.indexOf("https:")) {
      /** @type {boolean} */
      options.ssl = true;
    }
    /** @type {string} */
    var tokens = "_" + options.symbol + "_" + Math.floor(1234567890 * Math.random() + 1) + Math.floor(9876543210 * Math.random() + 1);
    var symbolSetting = goog.getSetting(tokens);
    /** @type {boolean} */
    symbolSetting.datas.isT = true;
    if (!options.reorder) {
      /** @type {boolean} */
      symbolSetting.custom.indicator_reorder = false;
    }
    if (!options.reheight) {
      /** @type {boolean} */
      symbolSetting.custom.indicator_reheight = false;
    }
    listener = self.market(options.symbol);
    symbolSetting.datas.tDataLen = events.tcd(listener);
    var width = symbolSetting.datas.tDataLen;
    var children = new function() {
      var poster;
      /**
       * @param {?} opt_attributes
       * @return {undefined}
       */
      this.showTip = function(opt_attributes) {
        if (!poster) {
          poster = new self.TipM(symbolSetting.COLOR);
        }
        poster.genTip(opt_attributes);
      };
      /**
       * @return {undefined}
       */
      this.hideTip = function() {
        if (poster) {
          poster.hide();
        }
      };
    };
    if (o.noH5) {
      if ("undefined" == typeof FlashCanvas || options.fh5) {
        return void(self.isFunc(options.noh5) && options.noh5(options));
      }
      /** @type {boolean} */
      symbolSetting.PARAM.isFlash = true;
    }
    if (symbolSetting.PARAM.isFlash && (symbolSetting.COLOR.K_EXT_BG = "#fff", symbolSetting.COLOR.F_BG = "#fff"), options.dim) {
      var n;
      for (n in options.dim) {
        if (options.dim.hasOwnProperty(n)) {
          if (self.isNum(symbolSetting.DIMENSION[n])) {
            symbolSetting.DIMENSION[n] = options.dim[n];
          }
        }
      }
    }
    var d;
    var div;
    var node;
    var img;
    var container;
    var html;
    var parent;
    var el;
    var text;
    var target;
    var jObj;
    var root;
    var menu;
    var params = {
      viewId : global.URLHASH.vi(options.view || "ts"),
      dataLength : void 0,
      start : void 0,
      end : void 0,
      startDate : void 0,
      endDate : void 0
    };
    var val2 = isNaN(options.t_rate) ? symbolSetting.PARAM.T_RATE : options.t_rate;
    /** @type {boolean} */
    var ee = false;
    var me = new function() {
      var testElement;
      /**
       * @param {number} state
       * @param {number} time
       * @param {number} arg
       * @return {?}
       */
      var init = function(state, time, arg) {
        /** @type {boolean} */
        var n = false;
        if (isNaN(state)) {
          state = options.w || d.offsetWidth;
        }
        if (isNaN(time)) {
          time = options.h || d.offsetHeight - options.mh;
        }
        var walks = parent.clientHeight || 0;
        var hits = html.clientHeight || 0;
        if (!isNaN(arg) && (hits -= arg), hits / (time - walks) > 1) {
          var option;
          /** @type {number} */
          var l = 0;
          var i = html.childNodes.length;
          for (;i--;) {
            option = html.childNodes[i];
            l += option.id.indexOf("blankctn") >= 0 ? option.offsetHeight : symbolSetting.DIMENSION.getOneWholeTH();
          }
          hits = l;
          /** @type {boolean} */
          n = true;
        }
        return symbolSetting.DIMENSION.setStageW(state), symbolSetting.DIMENSION.setStageH(time, hits + walks), 0 > time && (symbolSetting.DIMENSION.H_T_G = symbolSetting.DIMENSION.H_T_G - symbolSetting.DIMENSION.H_T_T, symbolSetting.DIMENSION.H_T_B = symbolSetting.DIMENSION.H_TIME_PART), n;
      };
      /**
       * @return {undefined}
       */
      var touchStart = function() {
        menu.setPosition();
      };
      /**
       * @return {undefined}
       */
      var update = function() {
        if (testElement) {
          /** @type {string} */
          testElement.style.display = symbolSetting.custom.show_logo ? "" : "none";
        }
      };
      /**
       * @param {boolean} dataAndEvents
       * @param {string} event
       * @param {boolean} callback
       * @return {undefined}
       */
      var clear = function(dataAndEvents, event, callback) {
        var result = init(event, callback, 0 / 0);
        if (dataAndEvents || event && callback) {
          if (!el) {
            return;
          }
          el.onResize(result);
          stockEL.onResize();
        }
        touchStart();
        update();
        self.stc("t_wh", [symbolSetting.DIMENSION.getStageW(), symbolSetting.DIMENSION.getStageH()]);
      };
      /**
       * @return {undefined}
       */
      var callback = function() {
        d = parseInt(options.domid) || options.dom;
        if (!d) {
          d = createElement("div");
          document.body.appendChild(d);
          self.trace.error("missing of dom id");
        }
        div = createElement("div");
        /** @type {string} */
        div.style.position = "relative";
        /** @type {string} */
        div.style.outlineStyle = "none";
        /** @type {string} */
        div.style.webkitUserSelect = div.style.userSelect = div.style.MozUserSelect = "none";
        node = createElement("div", "mainarea_" + symbolSetting.uid);
        img = createElement("div");
        node.appendChild(img);
        container = createElement("div");
        /** @type {string} */
        container.style.position = "absolute";
        /** @type {string} */
        container.style.fontSize = symbolSetting.STYLE.FONT_SIZE + "px";
        node.appendChild(container);
        div.appendChild(node);
        html = createElement("div");
        div.appendChild(html);
        parent = createElement("div");
        div.appendChild(parent);
        d.appendChild(div);
        menu = new self.LoadingSign;
        menu.appendto(node);
      };
      /**
       * @param {Object} errors
       * @return {?}
       */
      var done = function(errors) {
        /** @type {boolean} */
        var $prompt = false;
        if (errors) {
          if (root) {
            $prompt = root.setTheme(errors);
          }
          var k;
          for (k in errors) {
            if (errors.hasOwnProperty(k)) {
              if (symbolSetting.COLOR.hasOwnProperty(k)) {
                if (symbolSetting.COLOR[k] !== errors[k]) {
                  symbolSetting.COLOR[k] = errors[k];
                  /** @type {boolean} */
                  $prompt = true;
                }
              }
            }
          }
          self.stc("t_thm", errors);
        }
        return $prompt && view.styleLogo({
          logo : testElement,
          color : symbolSetting.COLOR.LOGO
        }), $prompt;
      };
      /**
       * @param {Event} e
       * @return {undefined}
       */
      var onTouchMove = function(e) {
        if (!!symbolSetting.custom.mousewheel_zoom) {
          if (!(document.activeElement !== div && document.activeElement.parentNode !== div)) {
            if (el) {
              el.onWheel(e);
            }
            dom.preventDefault(e);
            dom.stopPropagation(e);
          }
        }
      };
      /**
       * @param {Object} node
       * @return {undefined}
       */
      var r = function(node) {
        if (symbolSetting.custom.keyboard) {
          if (el) {
            el.onKb(node);
          }
        }
      };
      /**
       * @return {undefined}
       */
      var initialize = function() {
        if (!self.xh5_deviceUtil.istd) {
          if (o.info.name.match(/firefox/i)) {
            dom.addHandler(div, "DOMMouseScroll", onTouchMove);
          } else {
            dom.addHandler(div, "mousewheel", onTouchMove);
          }
          /** @type {number} */
          div.tabIndex = 0;
          dom.addHandler(div, "keydown", r);
        }
      };
      /**
       * @param {?} element
       * @return {undefined}
       */
      var scrollTo = function(element) {
        testElement = element;
        div.appendChild(element);
      };
      /**
       * @return {undefined}
       */
      var handler = function() {
        callback();
        done(options.theme);
        clear();
        initialize();
        if (symbolSetting.DIMENSION.h_t < 0) {
          /** @type {string} */
          node.style.display = "none";
          /** @type {boolean} */
          symbolSetting.custom.indicator_reorder = false;
          /** @type {boolean} */
          symbolSetting.custom.indicator_reheight = false;
        }
        view.getLogo({
          /** @type {function (?): undefined} */
          cb : scrollTo,
          id : symbolSetting.PARAM.LOGO_ID,
          isShare : false,
          top : symbolSetting.DIMENSION.posY + symbolSetting.DIMENSION.H_MA4K + 17,
          right : symbolSetting.DIMENSION.RIGHT_W + symbolSetting.DIMENSION.K_RIGHT_W,
          LOGO_W : symbolSetting.DIMENSION.LOGO_W,
          LOGO_H : symbolSetting.DIMENSION.LOGO_H,
          color : symbolSetting.COLOR.LOGO
        });
        if (o.noH5) {
          children.showTip({
            txt : options.nohtml5info || global.nohtml5info,
            parent : div
          });
          self.stc("t_nh5");
        }
      };
      handler();
      /** @type {function (boolean, string, boolean): undefined} */
      this.resizeAll = clear;
      /**
       * @param {number} until
       * @return {undefined}
       */
      this.innerResize = function(until) {
        if (el) {
          init(0 / 0, 0 / 0, until);
          el.onResize();
          stockEL.onResize();
          touchStart();
          console.onInnerResize({
            height : symbolSetting.DIMENSION.h_t
          });
        }
      };
      /** @type {function (Object): ?} */
      this.initTheme = done;
    };
    var console = new function() {
      /** @type {number} */
      var bulk = 0;
      /**
       * @param {Object} options
       * @param {number} fn
       * @return {?}
       */
      var init = function(options, fn) {
        /** @type {number} */
        var i = width - 1;
        var result = el.getAllStock()[0];
        if (result && (result.datas && (fn = filter(result.datas[result.datas.length - 1][0].date, result.hq.date) ? result.realLen < 0 || result.realLen > i ? i : i = result.realLen : "NF" == listener && (action && "21:00" == action.time[0][0]) ? i = result.realLen : result.realLen < 0 || result.realLen > i ? i : i, options = result.datas[result.datas.length - 1][i], options && options.time))) {
          var time;
          var date;
          return "HF" == listener ? (time = tradeInfo.time[0][0], time > options.time ? (time = result.datas[result.datas.length - 1][0].date, date = new Date(time), date.setDate(date.getDate() + 1)) : date = result.datas[result.datas.length - 1][0].date) : "NF" == listener ? (time = action.time[0][0], time < options.time && "21:00" == time ? (time = result.datas[result.datas.length - 1][0].date, date = new Date(time), date.setDate(date.getDate() - 1)) : date = result.datas[result.datas.length - 1][0].date) :
          date = result.datas[result.datas.length - 1][0].date, options.day = self.dateUtil.ds(date, "/", false) + "/" + self.dateUtil.nw(date.getDay()) + (options.time || ""), bulk = fn, self.clone(options);
        }
      };
      /** @type {function (Object, number): ?} */
      this.currentData = init;
      /**
       * @return {undefined}
       */
      this.onDataUpdate = function() {
        if (self.isFunc(options.ondataupdate)) {
          var property = init();
          if (property) {
            options.ondataupdate({
              data : self.clone(property),
              idx : params.currentLength - 1,
              left : symbolSetting.DIMENSION.posX,
              top : symbolSetting.DIMENSION.H_MA4K
            });
          }
        }
      };
      /**
       * @param {?} opt_attributes
       * @return {undefined}
       */
      this.onInnerResize = function(opt_attributes) {
        if (self.isFunc(options.oninnerresize)) {
          options.oninnerresize(opt_attributes);
        }
      };
      /**
       * @param {?} obj
       * @return {undefined}
       */
      this.onRange = function(obj) {
        if (!ee) {
          if (self.isFunc(options.onrange)) {
            if (obj) {
              options.onrange({
                isCompare : obj.isCompare,
                data : self.clone(obj.datas),
                width : symbolSetting.DIMENSION.w_t,
                height : symbolSetting.DIMENSION.h_t,
                viewRangeState : self.clone(params),
                range : [obj.labelMinP, obj.labelMaxP, obj.labelMaxVol],
                left : symbolSetting.DIMENSION.posX,
                top : symbolSetting.DIMENSION.H_MA4K
              });
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.onViewChanged = function() {
        if (self.isFunc(options.onviewchanged)) {
          options.onviewchanged({
            viewRangeState : self.clone(params)
          });
        }
      };
      /**
       * @param {Object} data
       * @param {number} key
       * @param {string} opt_attributes
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      this.onViewPrice = function(data, key, opt_attributes, dataAndEvents) {
        if (!ee && self.isFunc(options.onviewprice)) {
          if (data || (data = init(data, key)), !data) {
            return;
          }
          if (!opt_attributes) {
            opt_attributes = el.getMainStock().getName();
          }
          var json = self.clone(data);
          var text1_length = options.symbol.length;
          if ("HK" == listener) {
            if (options.symbol.substring(text1_length - 1, text1_length) >= "A") {
              /** @type {number} */
              json.avg_price = 0 / 0;
            }
          }
          if (json.volume) {
            if (json.volume < 0) {
              /** @type {number} */
              json.volume = 0;
            }
          }
          options.onviewprice({
            curname : opt_attributes || "",
            data_array : el.getAllStock(),
            data : json,
            idx : bulk,
            left : symbolSetting.DIMENSION.posX,
            top : symbolSetting.DIMENSION.H_MA4K,
            interacting : !!dataAndEvents
          });
        }
      };
    };
    var stockEL = new function() {
      var node;
      var fragment;
      var widget;
      var result;
      var e;
      var fixed = isNaN(options.nfloat) ? 2 : options.nfloat;
      /** @type {number} */
      var w = 137;
      var inTranslate = new function() {
        /**
         * @param {boolean} recurring
         * @return {undefined}
         */
        var create = function(recurring) {
          var s = node.body.style;
          if (recurring && symbolSetting.custom.show_floater) {
            s.backgroundColor = symbolSetting.COLOR.F_BG;
            s.color = symbolSetting.COLOR.F_T;
            /** @type {string} */
            s.border = "1px solid " + symbolSetting.COLOR.F_BR;
            /** @type {string} */
            s.display = "";
          } else {
            /** @type {string} */
            s.display = "none";
          }
        };
        /**
         * @param {x: 420, y: 13} opt_attributes
         * @return {undefined}
         */
        this.pv = function(opt_attributes) {
          fixed = isNaN(options.nfloat) ? 2 : options.nfloat;
          var elmStyle = node.body.style;
          /** @type {number} */
          var new_height = Math.max(symbolSetting.DIMENSION.posX, 55) + 9;
          /** @type {number} */
          var clientTop = symbolSetting.DIMENSION.posX < 55 ? 9 : 0;
          /** @type {number} */
          var top = symbolSetting.DIMENSION.getStageW() - w - 9 - symbolSetting.DIMENSION.RIGHT_W - clientTop;
          /** @type {string} */
          elmStyle.left = (opt_attributes.x > symbolSetting.DIMENSION.getStageW() - symbolSetting.DIMENSION.RIGHT_W >> 1 ? new_height : top) + "px";
          /** @type {string} */
          elmStyle.top = (opt_attributes.y || 0) + "px";
          create(true);
        };
        /** @type {function (boolean): undefined} */
        this.showFloater = create;
      };
      /**
       * @return {undefined}
       */
      var use = function() {
        /**
         * @return {?}
         */
        function handle() {
          var game = el.getAllStock()[0];
          return!("HK" != game.market || "indx" != game.hq.type);
        }
        /**
         * @return {undefined}
         */
        function fn() {
          var name;
          var out;
          var text;
          /** @type {string} */
          var stylesString = "border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0;border-collapse:collapse;border-spacing:0;text-align:center;";
          /** @type {string} */
          var oldCSS = "font-weight:normal;border:0;height:16px;text-align:center;";
          /** @type {string} */
          var transforms = "text-align:left;font-weight:normal;border:0;height:16px;";
          /** @type {string} */
          var css = "text-align:right;border:0;height:16px;";
          var e = createElement("div");
          /** @type {string} */
          e.style.position = "absolute";
          e.style.zIndex = symbolSetting.PARAM.I_Z_INDEX + 2;
          /** @type {string} */
          e.style.padding = "2px";
          /** @type {string} */
          e.style.width = w + "px";
          /** @type {string} */
          e.style.lineHeight = "16px";
          /** @type {string} */
          e.style.display = "none";
          /** @type {string} */
          e.style.fontSize = "12px";
          var td;
          var input;
          var html;
          var j;
          var el = createElement("table");
          var tr = createElement("thead");
          var body = createElement("tbody");
          /** @type {string} */
          el.style.cssText = stylesString;
          td = createElement("tr");
          input = createElement("th");
          input.setAttribute("colspan", "2");
          /** @type {string} */
          input.style.cssText = oldCSS;
          var n = createElement("span");
          input.appendChild(n);
          td.appendChild(input);
          tr.appendChild(td);
          td = createElement("tr");
          /** @type {string} */
          td.style.textAlign = "center";
          input = createElement("th");
          input.setAttribute("colspan", "2");
          /** @type {string} */
          input.style.cssText = oldCSS;
          var p = createElement("span");
          input.appendChild(p);
          td.appendChild(input);
          body.appendChild(td);
          td = createElement("tr");
          input = createElement("th");
          /** @type {string} */
          input.style.cssText = transforms;
          html = createElement("td");
          /** @type {string} */
          input.style.fontWeight = "normal";
          j = createElement("span");
          /** @type {string} */
          j.innerHTML = "价格";
          var s = createElement("span");
          /** @type {string} */
          html.style.cssText = css;
          input.appendChild(j);
          html.appendChild(s);
          /** @type {string} */
          input.style.fontWeight = "normal";
          td.appendChild(input);
          td.appendChild(html);
          body.appendChild(td);
          td = createElement("tr");
          input = createElement("th");
          /** @type {string} */
          input.style.cssText = transforms;
          /** @type {string} */
          input.style.fontWeight = "normal";
          html = createElement("td");
          j = createElement("span");
          /** @type {string} */
          j.innerHTML = "均价";
          var row = createElement("span");
          /** @type {string} */
          html.style.cssText = css;
          input.appendChild(j);
          /** @type {string} */
          input.style.fontWeight = "normal";
          html.appendChild(row);
          td.appendChild(input);
          td.appendChild(html);
          body.appendChild(td);
          td = createElement("tr");
          input = createElement("th");
          /** @type {string} */
          input.style.cssText = transforms;
          html = createElement("td");
          /** @type {string} */
          input.style.fontWeight = "normal";
          j = createElement("span");
          /** @type {string} */
          j.innerHTML = "涨跌";
          var span = createElement("span");
          /** @type {string} */
          html.style.cssText = css;
          input.appendChild(j);
          html.appendChild(span);
          td.appendChild(input);
          td.appendChild(html);
          body.appendChild(td);
          td = createElement("tr");
          input = createElement("th");
          /** @type {string} */
          input.style.cssText = transforms;
          html = createElement("td");
          /** @type {string} */
          input.style.fontWeight = "normal";
          j = createElement("span");
          /** @type {string} */
          j.innerHTML = "成交";
          var style = createElement("span");
          /** @type {string} */
          html.style.cssText = css;
          if ("HF" != listener) {
            input.appendChild(j);
            html.appendChild(style);
            td.appendChild(input);
            td.appendChild(html);
            body.appendChild(td);
          }
          el.appendChild(tr);
          el.appendChild(body);
          /** @type {string} */
          el.style.width = "100%";
          e.appendChild(el);
          /**
           * 通过涨跌百分比返回颜色
           * @param {(boolean|number|string)} x
           * @param {(boolean|number|string)} y
           * @return {涨跌颜色}
           * eg: x = "-0.29", y = 0
           */
          var fn = function(x, y) {
            var F_N = symbolSetting.COLOR.F_N;
            return x > y ? F_N = symbolSetting.COLOR.F_RISE : y > x && (F_N = symbolSetting.COLOR.F_FALL), F_N;
          };
          /**
           * 设置浮动实时数据
           * @param {Object} obj {stocktype: "", name: "COMEX白银", time: "2017/01/24/二18:47", data: Object}
           * @return {undefined}
           */
          this.setFloaterData = function(obj) {
            if (name = obj.name || (name || ""), n.innerHTML = name, text = obj.time || text, out = obj.data || out) {
              p.innerHTML = text;
              var options = out;
              /** 涨跌幅百分比 @type {number} */
              var percent = Number(options.percent);
              /** 价格 @type {number} */
              var price = Number(options.price);
              /** 昨日收盘 @type {number} */
              var prevclose = Number(options.prevclose);
              /** 平均价格 @type {number} */
              var avg_price = Number(options.avg_price);
              /** 变化 */
              var change = options.change;
              var pos = 1 > price || 1 > avg_price ? 4 : fixed;
              if ("HF" == listener) {
                if (3 > price || 3 > avg_price) {
                  /** @type {number} */
                  pos = 4;
                } else {
                  if (99 > price || 99 > avg_price) {
                    /** @type {number} */
                    pos = 3;
                  }
                }
              }
              /** @type {string} */
              percent = isNaN(percent) ? "--" : (100 * percent).toFixed(2);
              /** @type {string} */
              s.innerHTML = price.toFixed(pos);
              /** @type {string} */
              row.innerHTML = handle() ? "--" : avg_price.toFixed(pos);
              /** @type {string} */
              span.innerHTML = change.toFixed(pos) + "(" + percent + "%)";
              style.innerHTML = throttledUpdate(options.volume < 0 ? 0 : options.volume, 2) + suffix;
              span.style.color = fn(percent, 0);
              row.style.color = fn(avg_price - prevclose, 0);
              s.style.color = fn(percent, 0);
            }
          };
          this.body = e;
        }
        fragment = new fn;
        node = fragment;
      };
      /**
       * @return {undefined}
       */
      var init = function() {
        /**
         * @param {?} values
         * @return {undefined}
         */
        function init(values) {
          var wrapper = createElement("div");
          var el = createElement("div");
          var div = createElement("span");
          var container = createElement("span");
          var valuesLen = values.isH;
          /** @type {number} */
          var fLineHeight = 12;
          /**
           * @return {undefined}
           */
          var init = function() {
            if (el.style.borderStyle = "dashed", el.style.borderColor = symbolSetting.COLOR.IVH_LINE, div.style.backgroundColor = container.style.backgroundColor = symbolSetting.COLOR[values.txtBgCN], div.style.color = container.style.color = symbolSetting.COLOR[values.txtCN], valuesLen) {
              /** @type {string} */
              el.style.borderWidth = "1px 0 0 0";
              /** @type {string} */
              wrapper.style.width = el.style.width = symbolSetting.DIMENSION.getStageW() - symbolSetting.DIMENSION.RIGHT_W + "px";
              /** @type {string} */
              div.style.top = -(0.6 * symbolSetting.STYLE.FONT_SIZE) + "px";
              /** @type {string} */
              container.style.top = -(0.6 * symbolSetting.STYLE.FONT_SIZE) + "px";
              /** @type {number} */
              div.style.left = 0;
              /** @type {string} */
              container.style.left = symbolSetting.DIMENSION.extend_draw ? symbolSetting.DIMENSION.getStageW() - 55 + 2 * symbolSetting.DIMENSION.RIGHT_W + "px" : symbolSetting.DIMENSION.getStageW() - symbolSetting.DIMENSION.RIGHT_W + "px";
              /** @type {string} */
              div.style.width = container.style.width = symbolSetting.DIMENSION.extend_draw ? "" : symbolSetting.DIMENSION.posX + "px";
              /** @type {string} */
              div.style.padding = "1px 0";
              /** @type {string} */
              container.style.padding = "1px 0";
            } else {
              /** @type {string} */
              el.style.borderWidth = "0 1px 0 0";
              var h;
              var py;
              var y = symbolSetting.DIMENSION.H_MA4K + symbolSetting.DIMENSION.H_T_B;
              if (symbolSetting.DIMENSION.getStageH() < 0) {
                h = html.clientHeight;
                /** @type {number} */
                py = h - y;
              } else {
                /** @type {number} */
                h = symbolSetting.DIMENSION.getStageH() - parent.clientHeight || 0;
                py = symbolSetting.DIMENSION.h_t;
              }
              h -= y;
              h += symbolSetting.DIMENSION.I_V_O;
              /** @type {string} */
              wrapper.style.height = el.style.height = h + "px";
              /** @type {string} */
              div.style.top = py + "px";
              /** @type {string} */
              div.style.padding = "2px 2px 1px";
            }
          };
          /** @type {string} */
          wrapper.style.position = "absolute";
          /** @type {number} */
          wrapper.style.zIndex = symbolSetting.PARAM.I_Z_INDEX - 2;
          /** @type {string} */
          div.style.position = container.style.position = el.style.position = "absolute";
          /** @type {number} */
          el.style.zIndex = 0;
          /** @type {number} */
          div.style.zIndex = container.style.zIndex = 1;
          /** @type {string} */
          div.style.font = container.style.font = symbolSetting.STYLE.FONT_SIZE + "px " + symbolSetting.STYLE.FONT_FAMILY;
          /** @type {string} */
          div.style.whiteSpace = container.style.whiteSpace = "nowrap";
          /** @type {string} */
          div.style.lineHeight = fLineHeight + "px";
          /** @type {string} */
          container.style.lineHeight = fLineHeight + "px";
          if (values.txtA) {
            if (div.style.textAlign = values.txtA) {
              /** @type {string} */
              container.style.textAlign = "left";
            }
          }
          if (values.txtBgCN) {
            if (div.style.backgroundColor = symbolSetting.COLOR[values.txtBgCN]) {
              container.style.backgroundColor = symbolSetting.COLOR[values.txtBgCN];
            }
          }
          init();
          wrapper.appendChild(div);
          if (valuesLen) {
            wrapper.appendChild(container);
          }
          wrapper.appendChild(el);
          /**
           * @param {boolean} recurring
           * @return {undefined}
           */
          var loop = function(recurring) {
            if (recurring) {
              if ("" != wrapper.style.display) {
                /** @type {string} */
                wrapper.style.display = "";
              }
            } else {
              if ("none" != wrapper.style.display) {
                /** @type {string} */
                wrapper.style.display = "none";
              }
            }
          };
          /**
           * @param {Object} options
           * @return {undefined}
           */
          this.pv = function(options) {
            if (!isNaN(options.y) && (wrapper.style.top = options.y + (options.oy || 0) + "px"), div.innerHTML = options.v || "", options.p ? (container.innerHTML = isNaN(Number(options.p.replace("%", ""))) ? "0.00%" : options.p, container.style.display = "") : container.style.display = "none", !isNaN(options.x)) {
              var left = options.x + (options.ox || 0);
              var elemWidth = symbolSetting.DIMENSION.getStageW();
              /** @type {string} */
              wrapper.style.left = left + "px";
              var targetWidth = div.offsetWidth;
              if (0 >= targetWidth && (targetWidth = 112), targetWidth > 0) {
                /** @type {number} */
                var width = targetWidth >> 1;
                if (options.x < width) {
                  width = options.x;
                } else {
                  if (left + width > elemWidth - symbolSetting.DIMENSION.posX) {
                    width = left + targetWidth - elemWidth + symbolSetting.DIMENSION.posX;
                  }
                }
                /** @type {string} */
                div.style.left = -width + "px";
              }
            }
            loop(true);
          };
          /** @type {function (boolean): undefined} */
          this.display = loop;
          this.body = wrapper;
          /** @type {function (): undefined} */
          this.resize = init;
          loop(false);
        }
        widget = new init({
          isH : true,
          txtCN : "P_TC",
          txtBgCN : "P_BG",
          txtA : "right"
        });
        result = new init({
          isH : false,
          txtCN : "T_TC",
          txtBgCN : "T_BG",
          txtA : "center"
        });
        div.appendChild(result.body);
      };
      /**
       * @return {undefined}
       */
      var stop = function() {
        widget.display(false);
        result.display(false);
        inTranslate.showFloater(false);
      };
      /**
       * @return {?}
       */
      var done = function() {
        var datas = el.getAllStock();
        var cnl = datas[0].datas.length;
        /** @type {number} */
        var a = 0;
        return datas[0].realLen >= 0 && (a = 5 == params.end ? datas[0].realLen + symbolSetting.datas.tDataLen * (cnl - 1) : symbolSetting.datas.tDataLen * (cnl - 1)), a;
      };
      /**
       * @param {number} object
       * @return {undefined}
       */
      var callback = function(object) {
        if (object > 2E3) {
          object = done();
        }
        if (!(0 > object)) {
          if (target) {
            target.indirectI(object);
          }
          if (jObj) {
            jObj.indirectI(object);
          }
        }
      };
      /**
       * @return {undefined}
       */
      var _listener = function() {
        callback(done());
        if (target) {
          target.allDraw();
        }
      };
      /** @type {boolean} */
      var stopped = true;
      /** @type {number} */
      var max = 0;
      /** @type {number} */
      var idx = 0;
      /** @type {number} */
      var lastx = 0 / 0;
      /** @type {number} */
      var lasty = 0 / 0;
      /**
       * @param {Object} e
       * @param {boolean} dataAndEvents
       * @param {boolean} v33
       * @return {?}
       */
      this.iToD = function(e, dataAndEvents, v33) {
        var x = e.x;
        var offsetX = e.ox || 0;
        var y = e.y;
        var offsetY = e.oy || 0;
        var t = e.mark;
        var pos = e.rmark;
        var testElement = e.e ? e.e.target : null;
        if (!v33) {
          if (lastx == x && lasty == y) {
            return;
          }
          lastx = x;
          lasty = y;
        }
        if (testElement) {
          var fromIndex = testElement.style.height.split("px")[0];
          if (0 > y || y > Number(fromIndex)) {
            /** @type {number} */
            x = 0 / 0;
            /** @type {number} */
            y = 0 / 0;
          }
        }
        var options;
        var list = el.getAllStock();
        var size = list.length;
        var n = width;
        /** @type {boolean} */
        var copyByClone = size > 1;
        var scale = list[0].datas.length;
        /** @type {number} */
        var s = n * scale;
        /** @type {number} */
        var p = Math.floor(x * s / symbolSetting.DIMENSION.w_t);
        if (isNaN(x) && isNaN(y)) {
          if (stopped = true, stop(), filter(list[0].datas[scale - 1][0].date, list[0].hq.date)) {
            var which;
            which = list[0].realLen >= 0 ? (n - 1) * (scale - 1) + list[0].realLen : Number.MAX_VALUE;
            callback(which);
          } else {
            callback(Number.MAX_VALUE);
          }
          return void console.onViewPrice();
        }
        /** @type {boolean} */
        stopped = false;
        /** @type {number} */
        idx = p;
        var v;
        var a;
        var o;
        var errorName;
        var stocktype;
        var elems;
        var data;
        var thisDistance;
        /** @type {Array} */
        var ret = [];
        /** @type {number} */
        var distance = Number.MAX_VALUE;
        var i = size;
        for (;i--;) {
          if (elems = list[i].datas, ret = ret.concat(elems), elems) {
            /** @type {number} */
            var m = Math.floor(p / n);
            /** @type {number} */
            var prop = p % n;
            if (!elems[m]) {
              return;
            }
            if (data = elems[m][prop], data.date = elems[m][0].date, copyByClone && list[i].dAdd <= 1) {
              /** @type {number} */
              thisDistance = Math.abs(data.py - y);
              if (distance > thisDistance) {
                a = i;
                /** @type {number} */
                distance = thisDistance;
                options = data;
                o = list[i];
                errorName = list[i].getName();
                stocktype = list[i].getStockType();
              }
              pos = v = dataAndEvents ? (100 * t).toFixed(2) + "%" : t.toFixed(fixed);
            } else {
              switch(a = i, o = list[i], errorName = list[i].getName(), stocktype = list[i].getStockType(), listener) {
                case "HK":
                  v = t.toFixed(1 > t && t > 0 || t > -1 && 0 > t ? 3 : fixed);
                  break;
                case "HF":
                  v = t.toFixed(3 > t ? 4 : 99 > t ? 3 : fixed);
                  break;
                default:
                  v = t.toFixed(1 > t && t > 0 || t > -1 && 0 > t ? 4 : fixed);
              }
              v = t > 99999 ? Math.floor(t) : t > 9999 ? t.toFixed(1) : v;
              options = data;
            }
          }
        }
        var start = data && data.date;
        /** @type {number} */
        max = 0 == list[0].realLen ? 0 : list[0].realLen - 1;
        var recurring = "string" != typeof list[0].date ? item.ds(list[0].date) : list[0].date;
        if (scale > 1) {
          if (o.realLen < 0) {
            o.realLen = width;
          }
          var thepicture = s - n + o.realLen;
          if (5 == params.end) {
            if (p >= thepicture) {
              p = thepicture;
              options = ret[m][p % width];
            }
          }
        } else {
          if (item.stbd(start, item.sd(recurring))) {
            if (-1 == o.realLen) {
              o.realLen = width;
            }
            if (p >= o.realLen) {
              p = o.realLen;
            }
          } else {
            switch(listener) {
              case "HF":
              ;
              case "NF":
                if (p >= o.realLen) {
                  if (4 == params.start) {
                    p = o.realLen;
                  }
                }
                break;
              default:
                /** @type {number} */
                max = width - 1;
            }
          }
          if ("HF" != listener && ("NF" != listener && (item.stbd(start, item.sd(recurring)) && (o.hq && (o.hq.time >= "09:00" && o.hq.time < "09:30"))))) {
            options = {
              price : o.hq.preopen,
              avg_price : o.hq.preopen,
              prevclose : o.hq.prevclose,
              percent : (o.hq.open - o.hq.prevclose) / o.hq.prevclose,
              change : o.hq.preopen - o.hq.price,
              volume : o.hq.totalVolume,
              ix : 0.1,
              time : o.hq.time
            };
          } else {
            options = o.datas[0][p];
            options.prevclose = o.datas[0][0].prevclose;
          }
        }
        if (options && (options.date || (options.date = start), !options || options.date)) {
          var mouseX = x;
          if (symbolSetting.custom.stick) {
            x = options.ix || x;
          }
          var time;
          var date;
          if ("HF" == listener) {
            time = tradeInfo.time[0][0];
            if (time > options.time) {
              time = options.date;
              /** @type {Date} */
              date = new Date(time);
              date.setDate(date.getDate() + 1);
            } else {
              date = options.date;
            }
          } else {
            if ("NF" == listener) {
              time = action.time[0][0];
              if (time <= options.time && "21:00" == time) {
                time = options.date;
                /** @type {Date} */
                date = new Date(time);
                date.setDate(date.getDate() - 1);
                if (0 == date.getDay()) {
                  date.setDate(date.getDate() - 2);
                }
              } else {
                if (options.time < "03:00" && 1 == options.date.getDay()) {
                  /** @type {Date} */
                  date = new Date(options.date);
                  date.setDate(date.getDate() - 2);
                } else {
                  date = options.date;
                }
              }
            } else {
              date = options.date;
            }
          }
          var val = self.dateUtil.ds(date, "/", false) + "/" + self.dateUtil.nw(date.getDay()) + (options.time || "");
          options.day = val;
          if (node) {
            node.setFloaterData({
              stocktype : stocktype,
              name : errorName,
              time : val,
              data : options
            });
            inTranslate.pv({
              x : mouseX,
              y : symbolSetting.DIMENSION.T_F_T
            });
          }
          widget.pv({
            y : y,
            oy : offsetY,
            v : v,
            p : pos
          });
          result.pv({
            v : val,
            x : x,
            ox : offsetX,
            y : symbolSetting.DIMENSION.H_MA4K
          });
          callback(p);
          console.onViewPrice(options, p, errorName, !stopped);
          test.re(global.e.I_EVT, e.e);
        }
      };
      /**
       * @param {?} val2
       * @param {?} val1
       * @param {?} dataAndEvents
       * @param {?} deepDataAndEvents
       * @param {?} errmsg
       * @return {undefined}
       */
      this.globalDragHandler = function(val2, val1, dataAndEvents, deepDataAndEvents, errmsg) {
        if (isNaN(val2)) {
          if (isNaN(val1)) {
            test.re(global.e.I_EVT, errmsg);
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.zoomView = function() {
      };
      use();
      init();
      /**
       * @return {undefined}
       */
      this.onResize = function() {
        widget.resize();
        result.resize();
      };
      this.iHLineO = widget;
      /** @type {function (): undefined} */
      this.hideIUis = stop;
      /**
       * @param {number} stride
       * @return {undefined}
       */
      this.iToKb = function(stride) {
        idx += stride;
        max = idx;
        var list = el.getAllStock();
        var y = list[0].datas.length;
        var data = list[0].datas[0][idx];
        var listLength = list.length;
        var height = list[0].realLen;
        var recurring = "string" != typeof list[0].date ? item.ds(list[0].date) : list[0].date;
        if (1 >= y) {
          if (item.stbd(list[0].datas[0][0].date, item.sd(recurring))) {
            if (0 > height) {
              height = width;
            }
          } else {
            height = width;
          }
        } else {
          if (!item.stbd(list[0].datas[y - 1][0].date, item.sd(recurring))) {
            height = width;
          }
        }
        var heightOrWidth = width > height ? height + 1 : height;
        if (0 > idx) {
          var x = width > height ? height : height - 1;
          max = idx = (y - 1) * width + x;
          data = list[0].datas[y - 1][x];
        } else {
          if (idx >= heightOrWidth + (y - 1) * width) {
            if (item.stbd(list[0].datas[y - 1][0].date, item.sd(recurring)) && 0 > stride) {
              /** @type {number} */
              var startAt = 0;
              /** @type {number} */
              startAt = y > 1 ? height - 1 + width * (y - 1) : height - 1;
              /** @type {number} */
              max = idx = startAt;
              data = list[0].datas[0][max];
            } else {
              /** @type {number} */
              max = idx = 0;
              data = list[0].datas[0][0];
            }
          }
        }
        if (!fn(node, stockEL.iHLineO.body)) {
          node.appendChild(stockEL.iHLineO.body);
        }
        /** @type {number} */
        var i = Math.floor(max / width);
        if (idx >= width) {
          data = list[0].datas[i][max - i * width];
        }
        data.date = list[0].datas[i][0].date;
        var mark = listLength > 1 ? data.percent : data.price;
        var d = {
          idx : idx,
          name : list[0].getName(),
          mark : mark,
          datas : list[0].datas,
          data : data,
          x : data.ix,
          y : data.py,
          oy : symbolSetting.DIMENSION.H_MA4K,
          ox : symbolSetting.DIMENSION.posX
        };
        this.iToD(d, true, true);
      };
      /**
       * @return {?}
       */
      this.isIng = function() {
        return!stopped;
      };
      /**
       * @return {?}
       */
      this.isMoving = function() {
        return false;
      };
      /**
       * @return {undefined}
       */
      this.iReset = function() {
      };
      this.patcher = new function() {
        var prevSources;
        var pxs = {};
        /**
         * @return {undefined}
         */
        var success = function() {
          if (prevSources) {
            if (node.body.parentNode) {
              node.body.parentNode.removeChild(node.body);
            }
            /** @type {string} */
            var i = "vid_" + params.viewId;
            if (prevSources[i]) {
              var newNonElement;
              newNonElement = pxs[i] ? pxs[i] : pxs[i] = new prevSources[i];
              node = newNonElement;
            } else {
              node = fragment;
            }
          } else {
            node = fragment;
          }
          if (!$CONTAINS(div, node.body)) {
            div.appendChild(node.body);
          }
        };
        /**
         * @param {?} funcToCall
         * @return {undefined}
         */
        this.customFloater = function(funcToCall) {
          prevSources = funcToCall;
          success();
          self.stc("t_fl", funcToCall);
        };
        /** @type {function (): undefined} */
        this.switchFloater = success;
      };
      /**
       * @return {?}
       */
      this.update = function() {
        var a = el.getAllStock();
        if (a) {
          var i;
          var that = a[0];
          var length = that.datas.length;
          /** @type {number} */
          var index = 0;
          if (that) {
            if (idx > length * (width - 1) && (idx = 0), i = Math.floor(idx / (width - 1)), length == i && (i -= 1), idx > width - 1) {
              /** @type {number} */
              var offset = idx - width * i;
              index = filter(that.datas[i][0].date, that.hq.date) && offset > max ? that.realLen : offset;
            } else {
              index = 1 == length && (0 == i && idx > max) ? that.realLen : idx;
            }
            if (i = 0 > i ? 0 : i, index = 0 > index ? 0 : index, e = that.datas[i][index]) {
              if (e.day = self.dateUtil.ds(that.datas[i][0].date, "/", false) + "/" + self.dateUtil.nw(that.datas[i][0].date.getDay()) + (e.time || ""), node && node.setFloaterData({}), stopped) {
                if (filter(that.datas[length - 1][0].date, that.hq.date)) {
                  index = that.realLen >= 0 ? that.realLen : width - 1;
                  index += (length - 1) * width;
                  index = 0 > index ? Number.MAX_VALUE : index;
                  callback(index);
                } else {
                  if ("NF" == listener && that.hq.time >= "21:00") {
                    return that.realLen >= 0 && (index = that.realLen), void(4 == params.start && (5 == params.end && console.onViewPrice(e, index, void 0, !stopped)));
                  }
                  _listener();
                }
              } else {
                if ("HF" == listener) {
                  if (4 == params.start) {
                    if (5 == params.end) {
                      console.onViewPrice(e, index, void 0, !stopped);
                    }
                  }
                } else {
                  if ("NF" == listener) {
                    /** @type {Date} */
                    var d = new Date(e.date);
                    if (e.date) {
                      if (e.time >= "21:00") {
                        d.setDate(1 == e.date.getDay() ? d.getDate() - 3 : d.getDate() - 1);
                        e.day = self.dateUtil.ds(d, "/", false) + "/" + self.dateUtil.nw(d.getDay()) + (e.time || "");
                      }
                    }
                    console.onViewPrice(e, index, void 0, !stopped);
                  } else {
                    console.onViewPrice(e, index, void 0, !stopped);
                  }
                }
              }
            }
          }
        }
      };
    };
    return data = new function() {
      var _this = this;
      /**
       * @param {?} property
       * @param {Object} r
       * @return {?}
       */
      var init = function(property, r) {
        if (symbolSetting.hasOwnProperty(property)) {
          var i;
          for (i in r) {
            if (r.hasOwnProperty(i) && self.isFunc(r[i])) {
              return void self.trace.error("illegal operation:", i);
            }
          }
          callback(symbolSetting[property], r);
          self.stc(property, r);
          _this.resize();
        } else {
          self.trace.error("not exist param:", property);
        }
      };
      /**
       * @param {?} prop
       * @param {Arguments} tokenized
       * @return {?}
       */
      var extend = function(prop, tokenized) {
        var obj;
        if (symbolSetting.hasOwnProperty(prop)) {
          obj = self.clone(symbolSetting[prop]);
          var property;
          for (property in obj) {
            if (obj.hasOwnProperty(property) && self.isFunc(obj[property])) {
              /** @type {null} */
              obj[property] = null;
              delete obj[property];
            } else {
              if (tokenized) {
                var index = tokenized.length;
                for (;index--;) {
                  if (typeof obj[property] === tokenized[index]) {
                    /** @type {null} */
                    obj[property] = null;
                    delete obj[property];
                  }
                }
              }
            }
          }
        }
        return obj;
      };
      /**
       * @param {string} walkers
       * @param {?} defs
       * @param {Array} props
       * @return {undefined}
       */
      var animate = function(walkers, defs, props) {
        props = callback({
          toremove : false,
          isexclusive : false,
          callback : void 0
        }, props);
        if (props.toremove) {
          el.mM.removeAC(defs, walkers);
        } else {
          if (props.isexclusive) {
            el.mM.removeAC(null, walkers);
            el.mM.newAC(defs, walkers, props);
          } else {
            el.mM.newAC(defs, walkers, props);
          }
        }
      };
      /**
       * @param {Function} callback
       * @return {undefined}
       */
      var show = function(callback) {
        /** @type {Function} */
        params.viewId = callback;
        /** @type {number} */
        params.start = 1 == callback ? 4 : 0;
        /** @type {number} */
        params.end = 5;
      };
      /**
       * @param {(Array|string)} type
       * @param {number} deepDataAndEvents
       * @return {undefined}
       */
      this.pushData = function(type, deepDataAndEvents) {
        if (!self.isArr(type)) {
          /** @type {Array} */
          type = [type];
        }
        el.pushData(type, deepDataAndEvents);
      };
      var tref;
      /**
       * @param {MessageEvent} e
       * @return {undefined}
       */
      this.pushTr = function(e) {
        if (e) {
          if (e.data) {
            clearTimeout(tref);
            /** @type {number} */
            tref = setTimeout(function() {
              var pids = e.data.split(",");
              var symbol = e.symbol;
              var button = e.market;
              var packet = {
                symbol : symbol,
                data : pids[pids.length - 1],
                market : button
              };
              el.pushData([packet], 1);
            }, 20);
          }
        }
      };
      /**
       * @param {string} x
       * @return {undefined}
       */
      this.setScale = function(x) {
        el.setScale(x);
        self.stc("t_scale", x);
      };
      /** @type {boolean} */
      var l = true;
      /**
       * @param {string} selector
       * @param {?} view
       * @return {?}
       */
      this.showView = function(selector, view) {
        stockEL.hideIUis();
        if (l) {
          /** @type {boolean} */
          l = false;
        } else {
          menu.hide();
        }
        var restoreScript = global.URLHASH.vi(selector);
        if (options.date) {
          return options.date = "", show(restoreScript), void this.newSymbol(options);
        }
        var suiteView = el.getAllStock()[0];
        if (console.onRange(suiteView), self.stc("t_v", selector), self.suda("vw", selector), params.viewId != restoreScript) {
          if (show(restoreScript), "HF" == listener && ("t5" == selector && 0 == handler)) {
            return menu.show(), handler = 1, void el.update5Data(selector);
          }
          el.onChangeView(false, view);
          if (console) {
            console.onViewPrice();
          }
        }
      };
      /**
       * @param {string} e
       * @return {?}
       */
      var onLoad = function(e) {
        var a;
        return a = self.isStr(e.symbol) ? e.symbol.split(",") : [e.symbol];
      };
      /** @type {Array} */
      var list = [];
      /**
       * @param {string} value
       * @param {?} enable
       * @return {undefined}
       */
      this.overlay = function(value, enable) {
        if (el && 1 != el.dAdd) {
          if (enable) {
            el.removeCompare(onLoad(value));
            /** @type {number} */
            var it = 0;
            for (;it < list.length;it++) {
              if (value.symbol == list[it]) {
                list.splice(it, 1);
              }
            }
            if (el.getAllStock().length <= 1) {
              /** @type {number} */
              el.dAdd = 0;
            }
          } else {
            options.overlaycolor = value.linecolor || {
              K_N : "#cccccc"
            };
            /** @type {number} */
            el.dAdd = 2;
            el.compare(value);
            list.push(value.symbol);
          }
        }
      };
      /**
       * @param {string} b
       * @param {?} date1
       * @return {undefined}
       */
      this.compare = function(b, date1) {
        if (el) {
          var src;
          /** @type {number} */
          var p = 0;
          if (date1) {
            if (src = self.isStr(b) ? b.split(",") : [b.symbol], 1 == el.dAdd && el.removeCompare(src), el.getAllStock().length <= 1) {
              /** @type {number} */
              p = 0;
              for (;p < list.length;p++) {
                /** @type {number} */
                el.dAdd = 2;
                el.compare({
                  symbol : list[p]
                });
              }
              if (list.length < 1) {
                /** @type {number} */
                el.dAdd = 0;
              }
            }
          } else {
            if (2 == el.dAdd) {
              el.removeCompare(list);
            }
            /** @type {number} */
            el.dAdd = 1;
            el.compare(b);
            self.suda("t_comp");
          }
          self.stc("t_comp", {
            rm : date1,
            o : b
          });
        }
      };
      /**
       * @param {?} defs
       * @param {Array} animationCompleted
       * @return {undefined}
       */
      this.tCharts = function(defs, animationCompleted) {
        animate("tech", defs, animationCompleted);
      };
      /**
       * @param {?} nowMillis
       * @param {Array} animationCompleted
       * @return {undefined}
       */
      this.pCharts = function(nowMillis, animationCompleted) {
        animate("price", nowMillis, animationCompleted);
      };
      /**
       * @param {?} attributes
       * @return {undefined}
       */
      this.showPCharts = function(attributes) {
        if (attributes) {
          el.mM.togglePt(attributes);
          self.stc("t_sp", attributes);
        }
      };
      /**
       * @return {?}
       */
      this.getIndicators = function() {
        var targetHtml = target ? target.getLog() : null;
        var valueLen = jObj ? jObj.getLog() : null;
        return{
          tCharts : targetHtml,
          pCharts : valueLen
        };
      };
      var ret;
      /**
       * @param {?} value
       * @return {undefined}
       */
      this.showRangeSelector = function(value) {
        ret = callback({
          dispaly : true,
          from : void 0,
          to : void 0
        }, value);
        el.mM.showRs(ret);
        self.stc("t_rs", value);
      };
      /**
       * @param {(Array|string)} attribute
       * @return {undefined}
       */
      this.setLineStyle = function(attribute) {
        if (el) {
          el.setTLineStyle(attribute);
        }
        self.stc("t_style", attribute);
      };
      this.setCustom = utilPartial(init, this, "custom");
      this.setDimension = utilPartial(init, this, "DIMENSION");
      this.getDimension = utilPartial(extend, null, "DIMENSION", ["boolean"]);
      /**
       * @param {?} errors
       * @return {undefined}
       */
      this.setTheme = function(errors) {
        var items = me.initTheme(errors);
        if (items) {
          this.setLineStyle({
            linecolor : errors
          });
          this.resize();
        }
      };
      /**
       * @param {Object} symbolInfo
       * @return {undefined}
       */
      this.newSymbol = function(symbolInfo) {
        if (options.symbol = symbolInfo.symbol, options.date = symbolInfo.date, stockEL.hideIUis(), stockEL.iReset(), el.dcReset(), el.dcInit(options), children.hideTip(), target) {
          var defs = target.getLog();
          /** @type {null} */
          target = null;
          if (defs) {
            this.tCharts(defs);
          }
        }
        if (jObj) {
          var newMillis = jObj.getLog();
          /** @type {null} */
          jObj = null;
          if (newMillis) {
            this.pCharts(newMillis);
          }
        }
        if (ret) {
          ret.from = void 0;
          ret.to = void 0;
          el.mM.showRs(ret);
        }
        self.stc("t_ns", symbolInfo);
      };
      /**
       * @param {string} e
       * @param {boolean} size
       * @return {undefined}
       */
      this.resize = function(e, size) {
        me.resizeAll(true, e, size);
      };
      /**
       * @param {?} e
       * @return {undefined}
       */
      this.hide = function(e) {
        /** @type {boolean} */
        ee = true;
        stockEL.hideIUis();
        if (self.$CONTAINS(d, div)) {
          d.removeChild(div);
        }
        if (e) {
          el.dcReset();
        }
      };
      /**
       * @param {HTMLElement} mode
       * @return {undefined}
       */
      this.show = function(mode) {
        /** @type {boolean} */
        ee = false;
        if (mode) {
          if (self.isStr(mode)) {
            mode = parseInt(mode);
          }
          /** @type {HTMLElement} */
          d = mode;
        }
        if (!self.$CONTAINS(d, div)) {
          d.appendChild(div);
          me.resizeAll(true);
        }
        if (console) {
          console.onViewPrice();
        }
      };
      /**
       * @param {string} type
       * @return {undefined}
       */
      this.shareTo = function(type) {
        el.shareTo(type);
        self.stc("t_share", type);
        var funcToCall = type && type.type ? type.type : "weibo";
        self.suda("share", funcToCall);
      };
      /**
       * @return {?}
       */
      this.getChartId = function() {
        return symbolSetting.uid;
      };
      /**
       * @param {(Function|string)} arg
       * @param {?} path
       * @return {?}
       */
      this.dateTo = function(arg, path) {
        /** @type {(Function|string)} */
        options.historytime = arg;
        options.historycb = path;
        /** @type {(Function|string)} */
        var val = arg;
        if ("object" == typeof arg) {
          val = item.ds(arg, "-");
        } else {
          arg = item.sd(arg);
        }
        var employees = text.get();
        if (null == employees) {
          return void(x = 1);
        }
        var l = employees.length;
        /** @type {number} */
        var i = 0;
        for (;l > i;i++) {
          if (item.stbd(arg, employees[i][0].date)) {
            return void el.moving(i, i + 1, "dateTo");
          }
        }
        options.date = val;
        el.hasHistory = path;
        self.stc("t_ft", val);
        this.newSymbol(options);
      };
      /**
       * @param {string} x
       * @return {undefined}
       */
      this.showScale = function(x) {
        if (el) {
          el.setScale(x);
        }
      };
      /**
       * @param {string} e
       * @param {boolean} size
       * @return {undefined}
       */
      this.resize = function(e, size) {
        me.resizeAll(true, e, size);
      };
      /**
       * @param {?} er
       * @return {undefined}
       */
      this.showCompatibleTip = function(er) {
        me.showCompatibleTip(er);
      };
      /**
       * @return {undefined}
       */
      this.toggleExtend = function() {
        var extend_draw = symbolSetting.DIMENSION.extend_draw;
        var posX = symbolSetting.DIMENSION.posX;
        init.call(this, "DIMENSION", {
          extend_draw : !extend_draw,
          posX : posX > 9 ? 7 : 55,
          RIGHT_W : posX > 9 ? 7 : 55
        });
        this.resize();
      };
      /**
       * @return {?}
       */
      this.historyData = function() {
        return el.historyData;
      };
      /**
       * @param {Object} isXML
       * @return {?}
       */
      this.getExtraData = function(isXML) {
        return el.getExtraData(isXML);
      };
      this.patcher = {
        iMgr : stockEL.patcher
      };
      /**
       * @param {boolean} x
       * @return {undefined}
       */
      this.zoom = function(x) {
        el.zoomApi(x);
        self.stc("t_zoom", x, 9E3);
      };
      /**
       * @param {(number|string)} mode
       * @return {undefined}
       */
      this.move = function(mode) {
        /** @type {number} */
        mode = parseInt(mode);
        if (!isNaN(mode)) {
          el.moveApi(mode);
          self.stc("t_move", mode, 9E3);
        }
      };
      /**
       * @return {?}
       */
      this.getSymbols = function() {
        return el.getAllSymbols();
      };
      /**
       * @return {undefined}
       */
      this.update = function() {
        el.updateDataAll();
        self.stc("t_up", "update", 9E3);
      };
      /**
       * @return {?}
       */
      this.getCurrentData = function() {
        return console.currentData();
      };
      this.viewState = params;
      this.me = test;
      /** @type {string} */
      this.type = "h5t";
    }, el = new Renderer, el.dcInit(options), data;
  }
  /**
   * @return {undefined}
   */
  function get() {
    /**
     * @param {string} event
     * @param {?} next
     * @return {undefined}
     */
    function fn(event, next) {
      var users = new init(event);
      /**
       * @param {?} opt_obj2
       * @return {undefined}
       */
      var insertBefore = function(opt_obj2) {
        users.me.rl(opt_obj2, insertBefore);
      };
      users.me.al(global.e.T_DATA_LOADED, insertBefore);
      if (self.isFunc(next)) {
        next(users);
      }
    }
    /**
     * @param {string} t
     * @param {?} index
     * @return {undefined}
     */
    this.get = function(t, index) {
      self.stc("h5t_get");
      self.suda("h5t_" + self.market(t.symbol));
      var round;
      if (0 == location.protocol.indexOf("https:")) {
        /** @type {boolean} */
        round = true;
      }
      var num = self.market(t.symbol);
      /** @type {string} */
      var html = "http://stock.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InterfaceInfoService.getMarket?category=$market&symbol=$symbol";
      switch(round && (html = self.getSUrl(html)), num) {
        case "HF":
          /** @type {string} */
          tradeInfo = "kke_future_" + t.symbol;
          self.load(html.replace("$symbol", t.symbol.replace("hf_", "")).replace("$market", "hf").replace("$cb", "var " + tradeInfo), function() {
            tradeInfo = window[tradeInfo] || {
              time : [["06:00", "23:59"], ["00:00", "05:00"]]
            };
            fn(t, index);
          });
          break;
        case "NF":
          /** @type {string} */
          action = "kke_future_" + t.symbol;
          var style = t.symbol.replace("nf_", "").replace(/[\d]+$/, "");
          self.load(html.replace("$symbol", style).replace("$market", "nf").replace("$cb", "var " + action), function() {
            action = window[action] || {
              time : [["09:30", "11:29"], ["13:00", "02:59"]]
            };
            /** @type {number} */
            action.inited = 0;
            fn(t, index);
          });
          break;
        default:
          fn(t, index);
      }
    };
  }
  var data;
  var initRangeSelector;
  var tmp;
  var first;
  var tradeInfo;
  var action;
  var parseInt = self.$DOM;
  var createElement = self.$C;
  var $CONTAINS = self.$CONTAINS;
  var xh5PosUtil = self.xh5_PosUtil;
  var dom = self.xh5_EvtUtil;
  var callback = self.oc;
  var item = self.dateUtil;
  var filter = self.dateUtil.stbd;
  var getter = self.xh5_ADJUST_HIGH_LOW.c;
  var o = self.xh5_BrowserUtil;
  var utilPartial = self.fBind;
  var throttledUpdate = self.strUtil.ps;
  var global = goog.globalCfg;
  var view = self.logoM;
  return self.fInherit(init, self.xh5_EvtDispatcher), get;
});
