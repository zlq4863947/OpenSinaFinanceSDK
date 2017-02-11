xh5_define("plugins.techcharts", ["utils.util", "utils.painter"], function(util, a) {
  /**
   * @param {Object} cfg
   * @param {?} err
   * @param {?} exp
   * @return {undefined}
   */
  function self(cfg, err, exp) {
    /** @type {Object} */
    this.cfg = cfg;
    /** @type {boolean} */
    this.isSC = true;
    this.proxyCfg = clear({
      /**
       * @return {undefined}
       */
      iTo : function() {
      },
      ctn : null,
      titleCtn : null,
      iMgr : void 0,
      titleW : 0 / 0,
      titleGap : 0 / 0,
      withHBg : true,
      h : 0 / 0,
      mh : 0 / 0,
      eh : 0 / 0,
      lz : 0 / 0,
      fixIdctW : false,
      onClkMain : void 0,
      stock : void 0,
      usrObj : void 0,
      initMgr : void 0
    }, err);
    this.selfCfg = clear({
      nu : false,
      h : this.proxyCfg.h,
      mh : this.proxyCfg.mh,
      eh : this.proxyCfg.eh,
      titleW : 0 / 0,
      isBlank : false,
      ctnId : void 0,
      allowrfs : true
    }, exp);
    this.isBlank = this.selfCfg.isBlank;
    this.proxyCfg.titleW = this.selfCfg.titleW;
    this.symbol = this.proxyCfg.stock.symbol;
    this.aliasymbol = void 0;
    this.name = void 0;
    this.sname = void 0;
    this.alias = void 0;
    this.nu = this.selfCfg.nu;
    /** @type {number} */
    this.separate = 0;
    this.urlData = void 0;
    this.cb = void 0;
    /** @type {boolean} */
    this.toReCalc = false;
    this.selfDataUrl = void 0;
    this.selfDataUrlUpdate = void 0;
    this.df = void 0;
    this.viewState = this.proxyCfg.stock.viewState;
    /** @type {null} */
    this.datas = null;
    this.wrap = void 0;
    this.titleCtn = void 0;
    this.titleO = void 0;
    this.indicatorArr = void 0;
    this.line = void 0;
    this.h = this.selfCfg.h;
    this.mh = this.selfCfg.mh;
    this.eh = this.selfCfg.eh;
    /** @type {number} */
    this.labelMaxP = 0 / 0;
    /** @type {number} */
    this.labelMinP = 0 / 0;
    /** @type {number} */
    this.maxPrice = 0 / 0;
    /** @type {number} */
    this.minPrice = 0 / 0;
    this.pricePosArr = void 0;
    /** @type {number} */
    this.labelPriceCount = 2;
    /** @type {boolean} */
    this.isMain = true;
    this.oriArr = void 0;
    /** @type {Array} */
    this.selfArr = [];
    /** @type {number} */
    this.disMod = 1;
    this.tkProp = {
      close : "close"
    };
    this.customArr = void 0;
    this.DEFAULT_ARR;
    this.updateId = void 0;
    /** @type {number} */
    this.updateCount = 0;
    /** @type {number} */
    this.UPDATE_THRESHOLD = 0;
    /** @type {number} */
    this.__iOffsetX = 0;
    /** @type {boolean} */
    this.asPChart = false;
    this.vaObj = void 0;
    this.param = void 0;
    /** @type {number} */
    this.lw = 1.3;
    this.ic({
      h : this.h
    });
  }
  /**
   * @param {Object} p
   * @param {?} data
   * @return {undefined}
   */
  function win(p, data) {
    var out = {
      isBlank : true,
      ctnId : "blankctn_" + p.uid,
      allowrfs : false,
      h : p.DIMENSION.H_BLK
    };
    self.call(this, p, data, out);
    /** @type {string} */
    this.name = "BLANKCTN";
    /**
     * @return {undefined}
     */
    this.newParam = function() {
    };
  }
  /**
   * @param {?} param
   * @param {?} arg
   * @return {undefined}
   */
  function Path(param, arg) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#007cc8",
      prop : "adl",
      idct : "ADL"
    }];
    self.call(this, param, arg);
    /** @type {string} */
    this.name = "ADL";
    /** @type {string} */
    this.sname = "T_ADL";
    this.disMod = param.datas.tDataLen;
    /** @type {string} */
    var PI2 = "#b82c0c";
    /** @type {string} */
    var itemRootID = "#2ec196";
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var values = this.gdsd(key);
      this.oriArr = values;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var item;
      var adl;
      /** @type {number} */
      var _i = 0;
      var valuesLen = values.length;
      for (;valuesLen > _i;_i++) {
        item = values[_i];
        /** @type {number} */
        adl = item.price - (item.avg_price || 0);
        var seg = {
          adl : adl
        };
        seg[x + "price"] = item.price;
        this.selfArr.push(seg);
      }
    };
    /**
     * @return {undefined}
     */
    this.draw = function() {
      if (this.datas) {
        var context = this.line;
        context.clear(true, param.PARAM.getHd());
        var data;
        var index;
        var y;
        var cnl = this.datas.length;
        /** @type {number} */
        var i = param.DIMENSION.w_t / cnl;
        /** @type {number} */
        var chunkStart = i * chunkSize;
        /** @type {number} */
        var h = 0.5 * this.h;
        /** @type {number} */
        var f = 0;
        for (;2 > f;f++) {
          /** @type {number} */
          index = i * chunkSize;
          context.beginPath();
          /** @type {number} */
          var k = 0;
          for (;cnl > k && (data = this.datas[k], !(data.ignore_price < 0));k++) {
            y = data.adly;
            if (0 == f) {
              if (data.adl > 0) {
                context.drawVStickC(index, y, chunkStart, h - y, PI2);
              }
            } else {
              if (data.adl < 0) {
                context.drawVStickC(index, y, chunkStart, h - y, itemRootID);
              }
            }
            index += i;
          }
          context.stroke();
        }
        context.drawBg();
      }
    };
  }
  /**
   * @param {?} cont
   * @param {?} eventName
   * @return {undefined}
   */
  function ret(cont, eventName) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 26,
      color : "#75B2A3",
      prop : "asi",
      idct : "ASI"
    }, {
      v : 10,
      color : "#68A3FF",
      prop : "asit",
      idct : "ASIT"
    }];
    self.call(this, cont, eventName);
    /** @type {string} */
    this.name = "ASI";
    var fn = config.calcREF;
    var require = config.calcABS;
    var callback = config.calcMAX;
    var template = config.calcSUM;
    var create = config.calcMA;
    var unescape = config.getArr;
    var debug = config.operateArr;
    /**
     * @param {Array} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var udataCur = current[0].v;
      var value = current[1].v;
      var url = unescape(key, "close");
      var camelKey = unescape(key, "high");
      var path = unescape(key, "low");
      var val = unescape(key, "open");
      var file = fn(url, 1);
      var a = require(debug(camelKey, file, "-"));
      var nodes = require(debug(path, file, "-"));
      var b = require(debug(camelKey, fn(path, 1), "-"));
      var qs = require(debug(file, fn(val, 1), "-"));
      /** @type {Array} */
      var scrubbed = [];
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        scrubbed.push(a[i] > nodes[i] && a[i] > b[i] ? a[i] + nodes[i] / 2 + qs[i] / 4 : nodes[i] > b[i] && nodes[i] > a[i] ? nodes[i] + a[i] / 2 + qs[i] / 4 : b[i] + qs[i] / 4);
      }
      var pdataCur = debug(debug(debug(debug(url, file, "-"), debug(debug(url, val, "-"), 2, "/"), "+"), file, "+"), fn(val, 1), "-");
      var info = debug(debug(debug(pdataCur, 16, "*"), scrubbed, "/"), callback(a, nodes), "*");
      var html = template(info, udataCur);
      var m = create(html, value);
      /** @type {Array} */
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var x = 0;
      var ll = key.length;
      for (;ll > x;x++) {
        this.selfArr[x] = {
          asi : html[x],
          asit : m[x]
        };
      }
    };
  }
  /**
   * @param {?} conf
   * @param {Event} description
   * @return {undefined}
   */
  function Test(conf, description) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 11,
      color : "#999999",
      prop : "bbiboll",
      idct : "BBIBOLL"
    }, {
      v : 6,
      color : "#ffac03",
      prop : "upr",
      idct : "UPR"
    }, {
      v : 0 / 0,
      color : "#9922aa",
      prop : "dwn",
      idct : "DWN"
    }];
    self.call(this, conf, description);
    /** @type {string} */
    this.name = "BBIBOLL";
    if ("k" != description.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    var format = config.calcMA;
    var group = config.calcSTD;
    var color = config.getArr;
    var $ = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var a = this.gdsd(key);
      var value = this.customArr[0].v;
      var suiteView = this.customArr[1].v;
      var r = color(a, this.tkProp.close);
      var obj = $($($($(format(r, 3), format(r, 6), "+"), format(r, 12), "+"), format(r, 24), "+"), 4, "/");
      var orig = $(obj, $(group(obj, value), suiteView, "*"), "+");
      var $obj = $(obj, $(group(obj, value), suiteView, "*"), "-");
      this.oriArr = a;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          bbiboll : obj[i],
          upr : orig[i],
          dwn : $obj[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = a[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} items
   * @param {?} version
   * @return {undefined}
   */
  function format(items, version) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 22,
      color : "#fa6d6d",
      prop : "m",
      idct : "M"
    }, {
      color : "#2b55ff"
    }];
    self.call(this, items, version);
    /** @type {string} */
    this.name = "BF";
    var margin = config.calcMA;
    var i = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var udataCur = current[0].v;
      var child = i(key, "high");
      var m = margin(child, udataCur);
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var method = 0;
      var ll = key.length;
      for (;ll > method;method++) {
        this.selfArr[method] = {
          m : m[method]
        };
      }
    };
    /**
     * @param {boolean} recurring
     * @param {?} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      /**
       * @param {(Array|number)} data
       * @param {string} n
       * @param {boolean} recurring
       * @return {?}
       */
      function after(data, n, recurring) {
        var l = data.length;
        var last = data[l - 1][n];
        /** @type {number} */
        var e = l - 1;
        var r = data.length;
        for (;r--;) {
          var current = data[r][n];
          if (recurring) {
            if (current > last) {
              last = current;
              e = r;
            }
          } else {
            if (last > current) {
              last = current;
              e = r;
            }
          }
        }
        return e;
      }
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var context = this.line;
        context.clear(true, items.PARAM.getHd());
        var mat;
        var dest;
        var match;
        var color = config.calcREF;
        var callback = config.getArr;
        var a = callback(this.selfArr, "m");
        var b = color(a, 1);
        var x = this.viewState.start;
        var end = this.viewState.end;
        var id = util.hex2dec(this.customArr[0].color, 0.5);
        var blocks = util.hex2dec(this.customArr[1].color, 0.5);
        var key = x;
        for (;end > key;key++) {
          if ("undefined" == typeof mat && (mat = a[key] - b[key] >= 0 ? 1 : -1, dest = mat, match = key), mat = a[key] - b[key] >= 0 ? 1 : -1, key == end - 1 && (mat = -dest), mat != dest) {
            context.beginPath();
            context.moveTo(this.oriArr[key].ix, this.datas[key - x].my);
            context.lineTo(this.oriArr[match].ix, this.datas[match - x].my);
            var i;
            if (-1 == mat) {
              i = after(this.oriArr.slice(match, key + 1), "high", true) + match;
              context.lineTo(this.oriArr[i].ix, this.oriArr[i].hy);
              context.newFillStyle([id]);
            } else {
              i = after(this.oriArr.slice(match, key + 1), "low", false) + match;
              context.lineTo(this.oriArr[i].ix, this.oriArr[i].ly);
              context.newFillStyle([blocks]);
            }
            context.fill();
            match = key;
          }
          /** @type {number} */
          dest = mat;
        }
        if (recurring) {
          context.drawBg(this.__iOffsetX);
        }
      }
    };
  }
  /**
   * @param {?} e
   * @param {Event} oldValue
   * @return {undefined}
   */
  function listener(e, oldValue) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 6,
      color : "#FD9C35",
      prop : "bias1",
      idct : "BIAS1"
    }, {
      v : 12,
      color : "#00c1eb",
      prop : "bias2",
      idct : "BIAS2"
    }, {
      v : 24,
      color : "#DD4444",
      prop : "bias3",
      idct : "BIAS3"
    }];
    self.call(this, e, oldValue);
    /** @type {string} */
    this.name = "BIAS";
    if ("k" != oldValue.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      min : 0 / 0,
      max : 0 / 0,
      glv : 0
    };
    var callback = config.calcMA;
    var branch = config.getArr;
    var safe_add = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var parts = this.gdsd(key);
      var udataCur = this.customArr[0].v;
      var value = this.customArr[1].v;
      var pdataOld = this.customArr[2].v;
      var a = branch(parts, this.tkProp.close);
      var groupedSelectors = safe_add(safe_add(safe_add(a, callback(a, udataCur), "-"), callback(a, udataCur), "/"), 100, "*");
      var prevSources = safe_add(safe_add(safe_add(a, callback(a, value), "-"), callback(a, value), "/"), 100, "*");
      var safe = safe_add(safe_add(safe_add(a, callback(a, pdataOld), "-"), callback(a, pdataOld), "/"), 100, "*");
      this.oriArr = parts;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = parts.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          bias1 : groupedSelectors[i],
          bias2 : prevSources[i],
          bias3 : safe[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = parts[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} reporter
   * @param {Event} success
   * @return {undefined}
   */
  function init(reporter, success) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 20,
      color : "#999999",
      prop : "boll",
      idct : "BOLL"
    }, {
      v : 2,
      color : "#ffac03",
      prop : "upper",
      idct : "UPPER"
    }, {
      v : 0 / 0,
      color : "#cc22ba",
      prop : "lower",
      idct : "LOWER"
    }];
    self.call(this, reporter, success);
    /** @type {string} */
    this.name = "BOLL";
    if ("k" != success.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    var color = config.getArr;
    var fn = config.calcMA;
    var size = config.calcSTD;
    var debug = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var a = this.gdsd(key);
      var camelKey = this.customArr[0].v;
      var event = this.customArr[1].v;
      var obj = color(a, this.tkProp.close);
      var data = fn(obj, camelKey);
      var e = debug(size(obj, camelKey), event, "*");
      var info = debug(data, e, "+");
      var results = debug(data, e, "-");
      this.oriArr = a;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          boll : data[i],
          upper : info[i],
          lower : results[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = a[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} reason
   * @param {?} encoding
   * @return {undefined}
   */
  function end(reason, encoding) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 26,
      color : "#E297FF",
      prop : "br",
      idct : "BR"
    }, {
      color : "#666666",
      prop : "ar",
      idct : "AR"
    }];
    self.call(this, reason, encoding);
    /** @type {string} */
    this.name = "BRAR";
    this.vaObj = {
      glv : 150
    };
    var expect = config.calcSUM;
    var max = config.calcMAX;
    var format = config.calcREF;
    var template = config.getArr;
    var callback = config.operateArr;
    /**
     * @param {?} data
     * @return {undefined}
     */
    this.initAndCalcAll = function(data) {
      var current = this.customArr;
      var val = current[0].v;
      var result = template(data, "high");
      var html = template(data, "close");
      var str = template(data, "open");
      var b = template(data, "low");
      var value = format(html, 1);
      var prop = callback(callback(expect(max(0, callback(result, value, "-")), val), expect(max(0, callback(value, b, "-")), val), "/"), 100, "*");
      var allEls = callback(callback(expect(callback(result, str, "-"), val), expect(callback(str, b, "-"), val), "/"), 100, "*");
      this.oriArr = data;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var j = 0;
      var spaces = data.length;
      for (;spaces > j;j++) {
        this.selfArr[j] = {
          br : prop[j],
          ar : allEls[j]
        };
      }
    };
  }
  /**
   * @param {?} n
   * @param {?} a2
   * @return {undefined}
   */
  function f(n, a2) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 14,
      color : "#FFAC03",
      prop : "cci",
      idct : "CCI"
    }];
    self.call(this, n, a2);
    /** @type {string} */
    this.name = "CCI";
    this.vaObj = {
      upper : 100,
      lower : -100,
      glv : 0
    };
    var successFn = config.calcAVEDEV;
    var cb = config.calcMA;
    var callback = config.operateArr;
    var fn = config.getArr;
    /**
     * @param {Array} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var data = current[0].v;
      var val = fn(key, "close");
      var value = fn(key, "high");
      var actual = fn(key, "low");
      var result = callback(callback(callback(value, actual, "+"), val, "+"), 3, "/");
      var error = callback(callback(result, cb(result, data), "-"), callback(successFn(result, data), 0.015, "*"), "/");
      /** @type {Array} */
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var denied = 0;
      var ll = key.length;
      for (;ll > denied;denied++) {
        this.selfArr[denied] = {
          cci : error[denied]
        };
      }
    };
  }
  /**
   * @param {?} event
   * @param {?} time
   * @param {?} callback
   * @return {undefined}
   */
  function onComplete(event, time, callback) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#ff8400",
      prop : "value",
      idct : "筹码成本"
    }];
    self.call(this, event, time);
    /** @type {string} */
    this.name = "CHIPCOST";
    /** @type {number} */
    this.lw = 2;
    this.cb = callback;
    /** @type {string} */
    this.selfDataUrl = "http://finance.sina.com.cn/perspective/chip/$symbol.js?_=$rn";
    /** @type {string} */
    var name = "chip_";
    /** @type {string} */
    this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + name + "$symbol";
    /** @type {boolean} */
    this.toReCalc = true;
    this.loadedFlag = {};
    this.loadedFromTo = void 0;
    /**
     * @return {undefined}
     */
    this.loadUrlData = function() {
      var i = this.getFromToM.get(this);
      if (i) {
        var req = this;
        var guess = this.symbol;
        /** @type {string} */
        var jsonp = "_touzi_chip_" + guess;
        var ids = this.selfDataUrl.replace("$symbol", guess).replace("$rn", String((new Date).getDate()));
        if (this.proxyCfg.usrObj.ssl) {
          ids = util.getSUrl(ids);
        }
        util.load(ids, function() {
          var pdataCur = window[jsonp];
          if (!req.urlData) {
            req.urlData = {
              day : []
            };
          }
          var otherArgs = req.df(pdataCur);
          /** @type {Array} */
          var names = req.urlData.day;
          names.splice.apply(names, [0, 0].concat(otherArgs));
          names.sort(function(b, a) {
            return b.date - a.date;
          });
          /** @type {boolean} */
          req.toReCalc = true;
          req.cb(req);
        });
      }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    this.df = function(value) {
      /** @type {Array} */
      var output = [];
      if (value) {
        var modified = value;
        var field;
        for (field in modified) {
          if (modified.hasOwnProperty(field)) {
            output.push({
              value : modified[field],
              date : _.sd(field)
            });
          }
        }
      }
      return output;
    };
    /** @type {boolean} */
    var h = true;
    /** @type {number} */
    this.UPDATE_THRESHOLD = 3;
    /**
     * @return {undefined}
     */
    this.update = function() {
      if (h) {
        /** @type {boolean} */
        h = false;
      } else {
        if (++this.updateCount < this.UPDATE_THRESHOLD) {
          return;
        }
        if (this.updateCount >= this.UPDATE_THRESHOLD) {
          /** @type {number} */
          this.updateCount = 0;
        }
      }
      var helper = this;
      var end = this.symbol;
      /** @type {string} */
      var n = "hq_str_" + name + end;
      var source = this.selfDataUrlUpdate.replace("$symbol", end);
      if (this.proxyCfg.usrObj.ssl) {
        source = util.getSUrl(source);
      }
      util.load(source, function() {
        var source = window[n];
        var e = helper.udf(source);
        if (e) {
          helper.doUpdate(e);
        }
      });
    };
    /**
     * @param {?} string
     * @return {?}
     */
    this.udf = function(string) {
      if (string) {
        var i;
        var mixin = string.split(",");
        return mixin && (mixin.length > 1 && (i = [{
          date : _.sd(mixin[0]),
          value : mixin[1]
        }])), i;
      }
    };
    /**
     * @param {Object} data
     * @param {Object} newData
     * @param {number} opt_attributes
     * @return {undefined}
     */
    this.updateData = function(data, newData, opt_attributes) {
      if (data && (newData && !(newData.length < 1))) {
        var cache = newData[newData.length - 1];
        if (data = data[0]) {
          if (_.stbd(data.date, cache.date)) {
            var prop;
            for (prop in data) {
              if (data.hasOwnProperty(prop)) {
                if ("undefined" != typeof cache[prop]) {
                  cache[prop] = data[prop];
                }
              }
            }
          } else {
            if (data.date > cache.date) {
              this.newData(newData, data, opt_attributes);
            }
          }
        }
      }
    };
    /**
     * @param {Array} recurring
     * @return {undefined}
     */
    this.setPricePos = function(recurring) {
      if (recurring) {
        this.labelMaxP = recurring[0];
        this.labelMinP = recurring[1];
        /** @type {Array} */
        this.pricePosArr = recurring;
      }
      this.createPlayingData();
    };
    /**
     * @param {?} value
     * @return {undefined}
     */
    this.initAndCalcAll = function(value) {
      if (this.oriArr = value, this.urlData && this.toReCalc) {
        /** @type {boolean} */
        this.toReCalc = false;
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var elem;
        var day = this.urlData.day;
        var elems = util.kUtil.adbd(day, value, false, false);
        /** @type {number} */
        var i = 0;
        var len = value.length;
        for (;len > i;i++) {
          elem = elems[i];
          this.selfArr.push({
            value : Number(elem.value)
          });
        }
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} client
   * @param {?} opts
   * @param {?} cb
   * @return {undefined}
   */
  function Player(client, opts, cb) {
    /**
     * @return {undefined}
     */
    function init() {
      if (area > client.DIMENSION.w_t || 0 > area) {
        area = client.DIMENSION.w_t;
      }
      /** @type {string} */
      me.titleO.canvas.style.display = "none";
      me.line.getCanvas().style.zIndex -= 2;
    }
    var me = this;
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#007cc8",
      prop : "ditc",
      idct : "DITC"
    }];
    self.call(this, client, opts);
    /** @type {string} */
    this.name = "DITC";
    this.cb = cb;
    var labelMaxP;
    var labelMinP;
    /** @type {string} */
    var deps = "#c2c2c2";
    /** @type {boolean} */
    var datas = true;
    /** @type {string} */
    var html = "https://stock.sina.com.cn/stock/api/openapi.php/StockLevel2Service.getSummarize?symbol=$symbol&type=0&callback=$cb&dpc=1&retcode=0";
    /** @type {number} */
    var area = client.DIMENSION.w_t / 2;
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    this.loadUrlData = function(dataAndEvents) {
      if (dataAndEvents) {
        var s = me.symbol;
        var uid = "_" + s + _.ddt(new Date).getFullYear();
        /** @type {string} */
        me.selfDataUrl = html;
        util.load(me.selfDataUrl.replace("$symbol", s).replace("$cb", "var%20" + uid + "="), function() {
          var tmp = window[uid];
          if (tmp) {
            me.urlData = me.oriArr = tmp.result.data;
            /** @type {boolean} */
            me.toReCalc = true;
            /** @type {boolean} */
            datas = false;
            me.cb(me);
          }
        }, function() {
        });
      }
    };
    /**
     * @return {undefined}
     */
    this.initAndCalcAll = function() {
      if (!datas && (this.datas || (init(), this.datas = []), util.ca(this.selfArr), me.urlData)) {
        var index;
        var ditc;
        var info;
        /** @type {number} */
        var bottom = 0;
        var startOffset = me.urlData.length;
        /** @type {number} */
        index = 0;
        for (;startOffset > index;index++) {
          /** @type {number} */
          bottom = Math.max(me.urlData[index].volume, bottom);
        }
        /** @type {number} */
        index = 0;
        for (;startOffset > index;index++) {
          info = me.urlData[index];
          /** @type {number} */
          ditc = info.volume * (area / bottom);
          me.selfArr.push({
            ditc : ditc,
            trade : Number(info.trade)
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (!datas && this.datas) {
        var max = me.selfArr.length;
        for (;this.datas.length > max;) {
          this.datas.length--;
        }
        for (;this.datas.length < max;) {
          this.datas.push({});
        }
      }
    };
    /**
     * @param {Object} recurring
     * @return {undefined}
     */
    this.setPricePos = function(recurring) {
      if (!recurring || this.separate > 0) {
        this.labelMinP = labelMinP || this.minPrice;
        this.labelMaxP = labelMaxP || this.maxPrice;
      } else {
        this.labelMaxP = labelMaxP = recurring[0];
        this.labelMinP = labelMinP = recurring[1];
      }
      this.createPlayingData();
    };
    /**
     * @return {undefined}
     */
    this.draw = function() {
      if (this.datas) {
        var context = this.line;
        context.clear(true, client.PARAM.getHd());
        var min = this.viewState.start;
        var max = this.viewState.end;
        if (4 == min || 5 == max) {
          var g;
          var cnl = me.selfArr.length;
          /** @type {number} */
          var n_players = client.DIMENSION.h_t / cnl;
          /** @type {number} */
          var er = Math.min(0.6 * n_players, 2);
          context.newStyle(deps, true, er);
          /** @type {number} */
          g = 0;
          for (;cnl > g;g++) {
            var item = me.selfArr[g];
            /** @type {number} */
            var hly = client.DIMENSION.h_t * (me.labelMaxP - item.trade) / (me.labelMaxP - me.labelMinP);
            context.moveTo(0, hly);
            context.lineTo(item.ditc, hly);
          }
          context.stroke();
        }
      }
    };
    me.loadUrlData(true);
  }
  /**
   * @param {?} v
   * @param {Event} oldValue
   * @return {undefined}
   */
  function set(v, oldValue) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 10,
      desc : "快线移动平均"
    }, {
      v : 50,
      color : "#777777",
      prop : "dif",
      idct : "DIF"
    }, {
      v : 10,
      color : "#FFAC03",
      prop : "difma",
      idct : "DIFMA"
    }];
    self.call(this, v, oldValue);
    /** @type {string} */
    this.name = "DMA";
    if ("k" != oldValue.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      glv : 0
    };
    var callback = config.calcMA;
    var debug = config.operateArr;
    var color = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var a = this.gdsd(key);
      var obj = color(a, this.tkProp.close);
      var data = callback(obj, this.customArr[0].v);
      var type = callback(obj, this.customArr[1].v);
      var info = debug(data, type, "-");
      var match = callback(info, this.customArr[2].v);
      this.oriArr = a;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          dif : info[i],
          difma : match[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = a[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} map
   * @param {?} data
   * @return {undefined}
   */
  function Module(map, data) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 14,
      color : "#999999",
      prop : "pdi",
      idct : "PDI",
      desc : "DMI"
    }, {
      v : 6,
      color : "#ffac03",
      prop : "mdi",
      idct : "MDI",
      desc : "移动平均"
    }, {
      color : "#cc22ba",
      prop : "adx",
      idct : "ADX"
    }, {
      color : "#2ec196",
      prop : "adxr",
      idct : "ADXR"
    }];
    self.call(this, map, data);
    /** @type {string} */
    this.name = "DMI";
    var callback = config.calcEMA;
    var renderer = config.calcMAX;
    var expect = config.calcABS;
    var layer = config.calcREF;
    var fn = config.getArr;
    var debug = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var l;
      var i;
      var value = this.customArr[0].v;
      var index = this.customArr[1].v;
      var camelKey = fn(key, "close");
      var str = fn(key, "high");
      var err = fn(key, "low");
      var args = callback(renderer(renderer(debug(str, err, "-"), expect(debug(str, layer(camelKey, 1), "-"))), expect(debug(err, layer(camelKey, 1), "-"))), value);
      var lines = debug(str, layer(str, 1), "-");
      var valid = debug(layer(err, 1), err, "-");
      /** @type {Array} */
      var accumulator = [];
      /** @type {Array} */
      var ret = [];
      /** @type {number} */
      var _j = 0;
      var e = lines.length;
      for (;e > _j;_j++) {
        l = lines[_j];
        i = valid[_j];
        accumulator.push(l > 0 && l > i ? l : 0);
        ret.push(i > 0 && i > l ? i : 0);
      }
      accumulator = callback(accumulator, value);
      ret = callback(ret, value);
      var file = debug(debug(accumulator, 100, "*"), args, "/");
      var result = debug(debug(ret, 100, "*"), args, "/");
      var obj = callback(debug(debug(expect(debug(result, file, "-")), debug(result, file, "+"), "/"), 100, "*"), index);
      var current = callback(obj, index);
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var prop = 0;
      var ll = key.length;
      for (;ll > prop;prop++) {
        this.selfArr[prop] = {
          pdi : file[prop],
          mdi : result[prop],
          adx : obj[prop],
          adxr : current[prop]
        };
      }
    };
  }
  /**
   * @param {?} data
   * @param {?} next
   * @return {undefined}
   */
  function table(data, next) {
    /** @type {string} */
    var i = "pct";
    /** @type {string} */
    var propName = "oripct";
    /** @type {string} */
    var k = "mn";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      color : "#fa6d6d",
      prop : i,
      idct : "红线（多空信号收益）"
    }, {
      color : "#2b55ff",
      prop : propName,
      idct : "蓝线（股价自然涨幅）"
    }, {
      v : 0 / 0,
      prop : k,
      idct : k,
      color : "#66ccff",
      hidecfg : true
    }];
    self.call(this, data, next);
    /** @type {string} */
    this.name = "DPDK";
    /** @type {string} */
    this.alias = "大盘多空";
    var fn = config.getArr;
    var renderer = config.calcSUM;
    var callback = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      /** @type {number} */
      var options = 48;
      var values = fn(key, "close");
      var val = fn(key, "high");
      var result = fn(key, "low");
      var data = fn(key, "volume");
      var value = callback(callback(callback(callback(values, result, "+"), val, "+"), 3, "/"), data, "*");
      var allEls = callback(renderer(value, options), renderer(data, options), "/");
      var duplicates = function() {
        /** @type {Array} */
        var eventPath = [];
        /** @type {number} */
        var j = 0;
        var jlen = values.length;
        for (;jlen > j;j++) {
          eventPath.push(values[j] >= allEls[j] ? 1 : 0);
        }
        return eventPath;
      }();
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var j = 0;
      var spaces = key.length;
      for (;spaces > j;j++) {
        this.selfArr[j] = {
          flag : duplicates[j]
        };
        this.selfArr[j][k] = allEls[j];
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (this.datas) {
        var start = this.viewState.start;
        var end = this.viewState.end;
        /** @type {number} */
        var length = end - start;
        for (;this.datas.length > length;) {
          this.datas.length--;
        }
        for (;this.datas.length < length;) {
          this.datas.push({});
        }
        /** @type {number} */
        var min = Number.MAX_VALUE;
        /** @type {number} */
        var value = -Number.MAX_VALUE;
        /** @type {number} */
        var a = 0;
        /** @type {number} */
        var scaleRatio = 0;
        var dest = this.selfArr[start].flag;
        var position = config.calcA;
        var max = config.getArr;
        /** @type {number} */
        var remainder = 10;
        var index = start;
        for (;end > index;index++) {
          var data = this.datas[index - start];
          data.date = this.oriArr[index].date;
          var vec = this.selfArr[index].flag;
          var self = this.oriArr[index];
          var offset = position(max(this.oriArr.slice(0 > index - remainder + 1 ? 0 : index - remainder + 1, index + 1), "close"));
          if (index != start) {
            if (vec == dest) {
              if (1 == vec) {
                /** @type {number} */
                a = (1 + self.percent) * (1 + a) - 1;
              }
            } else {
              /** @type {number} */
              a = 0 == vec ? self.open < offset ? ((self.open - this.oriArr[index - 1].close) / this.oriArr[index - 1].close + 1) * (1 + a) - 1 : ((offset - this.oriArr[index - 1].close) / this.oriArr[index - 1].close + 1) * (1 + a) - 1 : self.open > offset ? ((self.close - self.open) / self.open + 1) * (1 + a) - 1 : ((self.close - offset) / offset + 1) * (1 + a) - 1;
            }
          } else {
            if (1 == vec) {
              /** @type {number} */
              a = self.open > offset ? ((self.close - self.open) / self.open + 1) * (1 + a) - 1 : ((offset - self.open) / self.open + 1) * (1 + a) - 1;
            }
          }
          dest = vec;
          if (index != start) {
            /** @type {number} */
            scaleRatio = (1 + self.percent) * (1 + scaleRatio) - 1;
          }
          /** @type {number} */
          data[i] = 100 * a;
          /** @type {number} */
          data[propName] = 100 * scaleRatio;
          var key;
          for (key in this.selfArr[index]) {
            if (this.selfArr[index].hasOwnProperty(key)) {
              if (data[key] = this.selfArr[index][key], "flag" == key) {
                continue;
              }
              if (data[key] > value) {
                value = data[key];
              }
              if (data[key] < min) {
                min = data[key];
              }
            }
          }
        }
        this.minPrice = min;
        this.maxPrice = value;
        this.syncI();
      }
    };
    /**
     * @param {boolean} recurring
     * @param {boolean} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        /** @type {number} */
        var a = data.DIMENSION.w_k / Math.max(this.datas.length, data.PARAM.minCandleNum);
        var context = this.line;
        context.clear(true, data.PARAM.getHd());
        var type;
        var object;
        var i;
        var vLine2;
        var pointer;
        var start = this.viewState.start;
        var end = this.viewState.end;
        var partialBlock = util.hex2dec(this.customArr[0].color);
        var res = util.hex2dec(this.customArr[1].color);
        /** @type {number} */
        var f = 0;
        for (;2 > f;f++) {
          /** @type {number} */
          object = this.datas[0].flag ? 0 : 1;
          context.newStyle([f ? partialBlock : res], true, a / 2 > 3 ? 3 : a / 2);
          i = start;
          for (;end > i;i++) {
            type = this.datas[i - start].flag;
            if (type == f) {
              context[type == object ? "lineTo" : "moveTo"](this.oriArr[i].ix, this.datas[i - start].mny);
            }
            object = type;
          }
          context.stroke();
          /** @type {number} */
          object = this.datas[0].flag ? 0 : 1;
          context.newStyle([f ? partialBlock : res], true, 1);
          i = start;
          for (;end > i;i++) {
            if (pointer = this.oriArr[i], type = this.datas[i - start].flag, type == f) {
              /** @type {number} */
              vLine2 = ~~(pointer.ix + 0.5);
              vLine2 -= 0.5;
              /** @type {number} */
              var size = (pointer.hy - pointer.ly) / 2;
              context.moveTo(vLine2, this.datas[i - start].mny + size);
              context.lineTo(vLine2, this.datas[i - start].mny - size);
            }
          }
          context.stroke();
          /** @type {number} */
          object = this.datas[0].flag ? 0 : 1;
          var block = f ? partialBlock : res;
          block = block.match(/\d+/g);
          block.push(0.4);
          /** @type {string} */
          block = "rgba(" + block + ")";
          context.newFillStyle([block], true, 1);
          i = start;
          for (;end > i;i++) {
            pointer = this.oriArr[i];
            type = this.datas[i - start].flag;
            var x = pointer.ix;
            /** @type {number} */
            vLine2 = ~~(pointer.ix + 0.5);
            vLine2 -= 0.5;
            /** @type {number} */
            var yCoordinate = (pointer.hy - pointer.ly) / 2;
            if (type == f && i != end - 1) {
              if (type != object) {
                context.beginPath();
                context.moveTo(x, this.datas[i - start].mny + yCoordinate);
              } else {
                context.lineTo(x, this.datas[i - start].mny + yCoordinate);
              }
            } else {
              if (i != start && (type != object && i != end - 1) || i == end - 1 && (type == object && type == f || type != object && type != f)) {
                var idx;
                if (i == end - 1 && type == object) {
                  idx = i;
                  context.lineTo(x, this.datas[i - start].mny + yCoordinate);
                } else {
                  /** @type {number} */
                  idx = i - 1;
                }
                for (;idx >= start;) {
                  var flag = this.datas[idx - start].flag;
                  if (flag != f) {
                    break;
                  }
                  var bounds = this.oriArr[idx];
                  var x1 = bounds.ix;
                  /** @type {number} */
                  var length = (bounds.hy - bounds.ly) / 2;
                  context.lineTo(x1, this.datas[idx - start].mny - length);
                  idx--;
                }
                context.closePath();
                context.fill();
              }
            }
            object = type;
          }
        }
        if (recurring) {
          context.drawBg(this.__iOffsetX);
        }
      }
    };
  }
  /**
   * @param {?} type
   * @param {?} details
   * @param {?} cb
   * @return {undefined}
   */
  function on(type, details, cb) {
    table.call(this, type, details);
    /** @type {string} */
    this.name = "DPDKS";
    /** @type {string} */
    this.alias = "大盘多空";
    this.cb = cb;
    /** @type {string} */
    var cols = "mn";
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        this.setRange();
        var keys;
        var local;
        var i;
        var j;
        var cnl = this.datas.length;
        /** @type {number} */
        var t = Number.MAX_VALUE;
        /** @type {number} */
        var key = -Number.MAX_VALUE;
        /** @type {number} */
        local = 0;
        for (;cnl > local;local++) {
          keys = this.datas[local];
          i = this.customArr.length;
          for (;i--;) {
            j = this.customArr[i].prop;
            if (j) {
              if (j != cols) {
                if (keys[j] > key) {
                  key = keys[j];
                }
                if (keys[j] < t) {
                  t = keys[j];
                }
              }
            }
          }
        }
        this.labelMaxP = this.maxPrice = key;
        this.labelMinP = this.minPrice = t;
        /** @type {number} */
        var k = key - t;
        /** @type {number} */
        local = 0;
        for (;cnl > local;local++) {
          keys = this.datas[local];
          i = this.customArr.length;
          for (;i--;) {
            j = this.customArr[i].prop;
            if (j) {
              if (j != cols) {
                /** @type {number} */
                keys[j + "y"] = this.h * (key - keys[j]) / k;
              }
            }
          }
        }
      }
    };
    /**
     * @param {boolean} recurring
     * @param {boolean} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        this.line.clear(true, this.cfg.PARAM.getHd());
        /** @type {number} */
        var hly = this.h * this.maxPrice / (this.maxPrice - this.minPrice) - 0.5;
        this.line.newStyle(this.cfg.COLOR.GRID, true, 2);
        this.line.moveTo(0, hly);
        this.line.lineTo(this.cfg.DIMENSION.w_k, hly);
        this.line.stroke();
        var d;
        var l1 = this.datas.length;
        /** @type {number} */
        var chunk = this.cfg.DIMENSION.w_k / Math.max(l1, this.cfg.PARAM.minCandleNum);
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var b = this.customArr[i].prop + "y";
          /** @type {number} */
          d = this.__iOffsetX - chunk * dt;
          this.line.newStyle(this.customArr[i].color, true, 1.5);
          var y;
          /** @type {number} */
          var l2 = 0;
          for (;l1 > l2 && (y = this.datas[l2][b], !isNaN(y));l2++) {
            if (0 == l2) {
              this.line.moveTo(d, y);
            } else {
              this.line.lineTo(d, y);
            }
            d += chunk;
          }
          this.line.stroke();
        }
        if (recurring) {
          this.line.drawBg(this.__iOffsetX);
        }
      }
    };
  }
  /**
   * @param {?} a
   * @param {?} fn
   * @return {undefined}
   */
  function param(a, fn) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 14,
      color : "#D96FF0",
      prop : "emv",
      idct : "EMV"
    }, {
      v : 9,
      color : "#F76D6D",
      prop : "maemv",
      idct : "MAEMV"
    }];
    self.call(this, a, fn);
    /** @type {string} */
    this.name = "EMV";
    this.vaObj = {
      glv : 0
    };
    var callback = config.calcMA;
    var cb = config.calcREF;
    var i = config.getArr;
    var debug = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var val = current[0].v;
      var value = current[1].v;
      var camelKey = i(key, "high");
      var file = i(key, "low");
      var e = i(key, "volume");
      var result = debug(callback(e, val), e, "/");
      var err = debug(camelKey, file, "+");
      var path = debug(camelKey, file, "-");
      var pdataCur = debug(debug(debug(err, cb(err, 1), "-"), err, "/"), 100, "*");
      var ret = callback(debug(debug(debug(pdataCur, result, "*"), path, "*"), callback(path, val), "/"), val);
      var new_value = callback(ret, value);
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var tail = 0;
      var ll = key.length;
      for (;ll > tail;tail++) {
        this.selfArr[tail] = {
          emv : ret[tail],
          maemv : new_value[tail]
        };
      }
    };
  }
  /**
   * @param {?} ctx
   * @param {?} stdout
   * @param {?} cb
   * @return {undefined}
   */
  function exports(ctx, stdout, cb) {
    /** @type {string} */
    var supportsProp = "ewi";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      color : "#F6C257",
      prop : supportsProp,
      idct : "等权重"
    }];
    self.call(this, ctx, stdout);
    /** @type {string} */
    var g = "icn_calc_";
    var data = this;
    /** @type {string} */
    this.name = "EWI";
    /** @type {string} */
    this.sname = "T_EWI";
    /** @type {string} */
    this.alias = "等权重";
    /** @type {string} */
    this.selfDataUrl = "http://finance.sina.com.cn/finance/touzieql/$symbol.js?" + Math.random();
    /** @type {string} */
    this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + g + "$symbol";
    this.cb = cb;
    /**
     * @param {?} data
     * @return {?}
     */
    this.df = function(data) {
      /** @type {Array} */
      var eventPath = [];
      if (data) {
        var dataItem;
        for (dataItem in data) {
          if (data.hasOwnProperty(dataItem)) {
            eventPath.push({
              ewi : Number(data[dataItem]),
              time : dataItem
            });
          }
        }
      }
      return eventPath;
    };
    var env;
    /** @type {boolean} */
    var n = false;
    /**
     * @return {undefined}
     */
    this.loadUrlData = function() {
      var guess = this.aliasymbol || this.symbol;
      /** @type {string} */
      var jsonp = "_touziequallyweight_" + guess;
      var ids = this.selfDataUrl.replace("$symbol", guess).replace("$cb", "var%20" + jsonp + "=").replace("$rn", String((new Date).getDate()));
      if (this.proxyCfg.usrObj.ssl) {
        ids = util.getSUrl(ids);
      }
      if (!n) {
        env = util.tUtil.gata(stdout.usrObj.market);
        util.load(ids, function() {
          var pdataCur = window[jsonp];
          /** @type {null} */
          window[jsonp] = null;
          data.urlData = {
            time : []
          };
          var otherArgs = data.df(pdataCur);
          /** @type {Array} */
          var self = data.urlData.time;
          self.splice.apply(self, [0, 0].concat(otherArgs));
          /** @type {boolean} */
          n = true;
          data.update();
        });
      }
    };
    /**
     * @param {?} string
     * @return {?}
     */
    this.udf = function(string) {
      if (string) {
        var i;
        var parms = string.split(",");
        return parms && (parms.length > 1 && (i = [{
          time : parms[6].substring(0, 5),
          ewi : parms[2]
        }])), i;
      }
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      var b = this.symbol;
      /** @type {string} */
      var i = "hq_str_" + g + b;
      var p = this.selfDataUrlUpdate.replace("$symbol", b);
      if (this.proxyCfg.usrObj.ssl) {
        p = util.getSUrl(p);
      }
      util.load(p, function() {
        var environment = window[i];
        /** @type {null} */
        window[i] = null;
        var camelKey = data.udf(environment);
        if (camelKey) {
          if (data.urlData) {
            if (data.urlData.time) {
              data.updateData(camelKey, data.urlData.time);
            }
          }
        }
      });
    };
    /**
     * @param {Object} key
     * @param {string} keys
     * @return {undefined}
     */
    this.updateData = function(key, keys) {
      if (key && (keys && !(keys.length < 1))) {
        var value = keys[keys.length - 1];
        if (key = key[0]) {
          if (value.time <= key.time) {
            var a = util.arrIndexOf(env, key.time);
            var v = util.arrIndexOf(env, value.time);
            var b = v;
            for (;a >= b;b++) {
              if (a - b > 0) {
                keys[keys.length] = keys[keys.length - 1];
              } else {
                /** @type {Object} */
                keys[keys.length - 1] = key;
              }
            }
          }
          data.cb(data);
          if (4 == data.viewState.start) {
            if (5 == data.viewState.end) {
              stdout.cbInDC();
            }
          }
        }
      }
    };
    /**
     * @param {Array} recurring
     * @return {undefined}
     */
    this.setPricePos = function(recurring) {
      if (recurring) {
        data.labelMaxP = recurring[0];
        data.labelMinP = recurring[1];
        /** @type {Array} */
        data.pricePosArr = recurring;
      }
      this.createPlayingData();
    };
    /**
     * @param {Float32Array} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      if (this.urlData) {
        this.oriArr = this.gdsd(key);
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var i;
        var oSpace = this.urlData.time;
        var count = stdout.stock.realLen;
        if (0 > count) {
          count = data.disMod;
        }
        /** @type {number} */
        var n = 0;
        /** @type {number} */
        i = 0;
        for (;i <= data.disMod && !(i > count);i++) {
          if (oSpace[i]) {
            key[4][i].ewi = oSpace[i].ewi;
            /** @type {number} */
            n = i;
          } else {
            key[4][i].ewi = oSpace[n].ewi;
          }
        }
        var v;
        /** @type {number} */
        var b = 0;
        var a = this.oriArr.length;
        for (;a > b;b++) {
          v = this.oriArr[b];
          this.selfArr.push({
            ewi : v ? Number(v.ewi) : 1
          });
        }
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} handler
   * @param {Event} socket
   * @return {undefined}
   */
  function ready(handler, socket) {
    /** @type {string} */
    this.storageVer = "v2";
    self.call(this, handler, socket);
    var jQuery = this;
    /** @type {string} */
    this.name = "EXPMA";
    if ("k" != socket.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    /** @type {Array} */
    var fillColors = ["#2d0674", "#84a8de", "#e80f01", "#f1926f", "#2c0eed"];
    /** @type {string} */
    var newValue = "EMA";
    /** @type {string} */
    var sum = "ema";
    /**
     * @return {undefined}
     */
    this.generateSettings = function() {
      if (jQuery.param && jQuery.param.length > 0) {
        /** @type {Array} */
        jQuery.customArr = [];
        /** @type {number} */
        var i = 0;
        var l = jQuery.param.length;
        for (;l > i;i++) {
          var value = jQuery.param[i].v;
          if (!isNaN(value)) {
            if (value > 0) {
              jQuery.customArr.push({
                v : value,
                color : jQuery.param[i].color || (fillColors[i] || "#" + util.randomColor()),
                prop : sum + value,
                idct : newValue + value,
                desc : newValue
              });
            }
          }
        }
      }
      if (!jQuery.customArr || jQuery.customArr.length < 1) {
        /** @type {Array} */
        jQuery.customArr = [{
          v : 12,
          color : fillColors[0],
          prop : sum + "12",
          idct : newValue + "12",
          desc : newValue
        }, {
          v : 50,
          color : fillColors[1],
          prop : sum + "50",
          idct : newValue + "50",
          desc : newValue
        }];
      }
    };
    var color = config.getArr;
    var map = config.calcEMA;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var a = this.gdsd(key);
      this.oriArr = a;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var x = color(a, this.tkProp.close);
      /** @type {Array} */
      var results = [];
      /** @type {number} */
      var lastIndex = 0;
      var cnl = this.customArr.length;
      for (;cnl > lastIndex;lastIndex++) {
        results.push(map(x, this.customArr[lastIndex].v));
      }
      var al = a.length;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var l = results.length;
      for (;l > i;i++) {
        var value = this.customArr[i].v;
        /** @type {number} */
        var j = 0;
        for (;al > j;j++) {
          var first = this.selfArr[j] = this.selfArr[j] || {};
          if (a[j].volume < 0) {
            /** @type {boolean} */
            first[attr] = true;
          } else {
            first[sum + value] = results[i][j];
          }
        }
      }
    };
  }
  /**
   * @param {?} plugins
   * @param {?} a2
   * @param {?} cb
   * @return {undefined}
   */
  function Plot(plugins, a2, cb) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#990000",
      prop : "mb",
      idct : "净超大单"
    }, {
      v : 0 / 0,
      color : "#009900",
      prop : "ms",
      idct : "净大单"
    }, {
      v : 0 / 0,
      color : "#000099",
      prop : "sb",
      idct : "净中单"
    }, {
      v : 0 / 0,
      color : "#ff0099",
      prop : "ss",
      idct : "净小单"
    }];
    self.call(this, plugins, a2);
    /** @type {string} */
    this.name = "TECHFLOW";
    /** @type {number} */
    this.separate = 1;
    /** @type {string} */
    this.selfDataUrl = "http://stock.finance.sina.com.cn/stock/api/jsonp_v2.php/$cb/StockMixService.getNewRateInfo?symbol=$symbol&___qn=3&from=$from&to=$to";
    /** @type {string} */
    this.selfDataUrlUpdate = "http://hq.sinajs.cn/list=$symbol";
    this.cb = cb;
    /** @type {boolean} */
    this.toReCalc = true;
    /**
     * @param {Array} key
     * @param {boolean} recurring
     * @return {undefined}
     */
    this.initAndCalcAll = function(key, recurring) {
      if (!recurring && (this.oriArr = key, this.urlData)) {
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var interval_major;
        switch(this.viewState.viewId) {
          case 24:
            interval_major = this.urlData.day;
            break;
          case 168:
            interval_major = this.urlData.week;
            break;
          case 720:
            interval_major = this.urlData.month;
        }
        var b;
        var pair = util.kUtil.adbd(interval_major, key, false, true);
        /** @type {number} */
        var p = 0;
        var i = key.length;
        for (;i > p;p++) {
          b = pair[p];
          this.selfArr.push({
            mb : b ? Number(b.mb) : 0 / 0,
            ms : b ? Number(b.ms) : 0 / 0,
            sb : b ? Number(b.sb) : 0 / 0,
            ss : b ? Number(b.ss) : 0 / 0
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (this.datas) {
        var start = this.viewState.start;
        var end = this.viewState.end;
        /** @type {number} */
        var length = end - start;
        for (;this.datas.length > length;) {
          this.datas.length--;
        }
        for (;this.datas.length < length;) {
          this.datas.push({});
        }
        /** @type {number} */
        var left = Number.MAX_VALUE;
        /** @type {number} */
        var b = -Number.MAX_VALUE;
        var i = start;
        for (;end > i;i++) {
          var data = this.datas[i - start];
          data.date = this.oriArr[i].date;
          /** @type {number} */
          var a = 0;
          /** @type {number} */
          var c = 0;
          var option;
          for (option in this.selfArr[i]) {
            if (this.selfArr[i].hasOwnProperty(option)) {
              data[option] = this.selfArr[i][option];
              if (data[option] > 0) {
                a += data[option];
              } else {
                c += data[option];
              }
            }
          }
          /** @type {number} */
          b = Math.max(a, c, b);
          /** @type {number} */
          left = Math.min(a, c, left);
        }
        /** @type {number} */
        b = Math.max(Math.abs(b), Math.abs(left));
        /** @type {number} */
        left = -b;
        /** @type {number} */
        this.minPrice = left;
        /** @type {number} */
        this.maxPrice = b;
      }
    };
    /**
     * @param {boolean} recurring
     * @param {boolean} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var context = this.line;
        context.clear(true, plugins.PARAM.getHd());
        var y;
        var py;
        var height;
        var x;
        var max = this.datas.length;
        /** @type {number} */
        var chunk = plugins.DIMENSION.w_k / Math.max(max, plugins.PARAM.minCandleNum);
        /** @type {number} */
        var h = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h;
        /** @type {Array} */
        var $cookies = [];
        /** @type {Array} */
        var internalValues = [];
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var index = this.customArr[i].prop + "y";
          /** @type {number} */
          x = this.__iOffsetX - chunk * chunkSize;
          context.newStyle(this.customArr[i].color, true, x);
          /** @type {number} */
          var key = 0;
          for (;max > key;key++) {
            height = this.datas[key][index];
            y = height > h ? internalValues[key] || 0 : $cookies[key] || 0;
            /** @type {number} */
            py = h - y;
            height -= y;
            context.moveTo(x, py);
            context.lineTo(x, height);
            if (height > h) {
              $cookies[key] = $cookies[key] || 0;
              /** @type {number} */
              internalValues[key] = h - height;
            } else {
              /** @type {number} */
              $cookies[key] = h - height;
              internalValues[key] = internalValues[key] || 0;
            }
            x += chunk;
          }
          context.stroke();
        }
      }
    };
    /**
     * @param {?} string
     * @return {?}
     */
    this.udf = function(string) {
      if (!string) {
        return null;
      }
      var object = string.split(",");
      return{
        mb : Number(object[0]),
        ms : Number(object[1]),
        sb : Number(object[2]),
        ss : Number(object[3]),
        date : _.sd(object[4])
      };
    };
    /**
     * @param {?} data
     * @return {?}
     */
    this.df = function(data) {
      /** @type {Array} */
      var ss = [];
      /** @type {number} */
      var i = 0;
      var l = data.length;
      for (;l > i;i++) {
        var date = _.sd(data[i].d);
        var ms = date.getDate();
        ss.push({
          mb : ms,
          sb : ms,
          ms : ms,
          ss : ms,
          date : date
        });
      }
      return ss;
    };
    this.loadUrlData();
  }
  /**
   * @param {?} body
   * @param {?} start
   * @return {undefined}
   */
  function chunk(body, start) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 9,
      color : "#888888",
      prop : "k",
      idct : "K"
    }, {
      v : 3,
      color : "#FFAC03",
      prop : "d",
      idct : "D"
    }, {
      v : 3,
      color : "#cc22ba",
      prop : "j",
      idct : "J"
    }];
    self.call(this, body, start);
    /** @type {string} */
    this.name = "KDJ";
    this.vaObj = {
      glv : 50,
      upper : 80,
      lower : 20
    };
    var format = config.calcSMA;
    var debug = config.calcLLV;
    var renderer = config.calcHHV;
    var callback = config.operateArr;
    var fn = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var val = current[0].v;
      var oldconfig = current[1].v;
      var params = current[2].v;
      var camelKey = fn(key, "close");
      var data = fn(key, "low");
      var value = fn(key, "high");
      var r20 = callback(callback(callback(camelKey, debug(data, val), "-"), callback(renderer(value, val), debug(data, val), "-"), "/"), 100, "*");
      var text = format(r20, oldconfig, 1);
      var result = format(text, params, 1);
      var allEls = callback(callback(text, 3, "*"), callback(result, 2, "*"), "-");
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var j = 0;
      var spaces = key.length;
      for (;spaces > j;j++) {
        this.selfArr[j] = {
          k : text[j],
          d : result[j],
          j : allEls[j]
        };
      }
    };
  }
  /**
   * @param {?} args
   * @param {?} count
   * @param {?} cb
   * @return {undefined}
   */
  function fn(args, count, cb) {
    /** @type {string} */
    var name = "bar";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#888887",
      prop : name,
      idct : "大单金额",
      desc : "文字颜色"
    }];
    self.call(this, args, count, {
      nu : true
    });
    /** @type {string} */
    this.name = "KFLOW";
    /** @type {string} */
    this.alias = "主力动向";
    if ("sh000001" === this.symbol) {
      /** @type {string} */
      this.aliasymbol = "sh999999";
    }
    this.vaObj = {
      glv : 0
    };
    /** @type {number} */
    this.UPDATE_THRESHOLD = 5;
    /** @type {string} */
    this.selfDataUrl = "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getHistoryMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to";
    /** @type {string} */
    this.selfDataUrlUpdate = "http://touzi.sina.com.cn/api/openapi.php/MoneyFlowService.getLastMoneyFlow?callback=$cb&symbol=$symbol";
    this.cb = cb;
    /** @type {boolean} */
    this.toReCalc = true;
    this.loadedFlag = {};
    /**
     * @param {undefined} data
     * @return {?}
     */
    this.df = function(data) {
      if (data && (data.result && data.result.data)) {
        var child;
        var object;
        /** @type {Array} */
        var readyList = [];
        var children = data.result.data;
        /** @type {number} */
        var i = 0;
        var l = children.length;
        for (;l > i;i++) {
          child = children[i];
          object = child.split(",");
          var obj = {
            date : _.sd(object[0])
          };
          /** @type {number} */
          obj[name] = Number(object[1]);
          readyList.push(obj);
        }
        return readyList;
      }
    };
    var attrs;
    /**
     * @param {undefined} string
     * @return {?}
     */
    this.udf = function(string) {
      if (string && (string.result && string.result.data)) {
        var parameters = string.result.data;
        if (parameters && !(parameters.length < 9)) {
          parameters = parameters.split(",");
          /** @type {number} */
          var value = Number(parameters[1]);
          var obj = {
            date : _.sd(parameters[0])
          };
          return obj[name] = value, attrs ? obj[name + "update"] = value - attrs[name] || 0 : (attrs = {}, obj[name + "update"] = 0), attrs[name] = value, obj;
        }
      }
    };
    var config;
    /**
     * @param {?} data
     * @return {undefined}
     */
    this.initAndCalcAll = function(data) {
      if (this.oriArr = data, this.urlData) {
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var interval_major;
        switch(this.viewState.viewId) {
          case 364:
          ;
          case 365:
          ;
          case 366:
          ;
          case 23:
          ;
          case 24:
          ;
          case 25:
            interval_major = this.urlData.day;
            break;
          case 167:
          ;
          case 168:
          ;
          case 169:
            interval_major = this.urlData.week;
            break;
          case 719:
          ;
          case 720:
          ;
          case 721:
            interval_major = this.urlData.month;
            break;
          default:
            /** @type {Array} */
            interval_major = [{
              bar : 0,
              date : data[data.length - 1].date
            }];
        }
        config = util.kUtil.adbd(interval_major, data, false, true);
        var value;
        /** @type {number} */
        var target = 0;
        var i_max = data.length;
        for (;i_max > target;target++) {
          value = config[target];
          var old = {};
          /** @type {number} */
          old[name] = value ? Number(value[name]) : 0 / 0;
          this.selfArr.push(old);
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        var start = this.viewState.start;
        var end = this.viewState.end;
        /** @type {number} */
        var len = end - start;
        for (;this.datas.length > len;) {
          this.datas.length--;
        }
        for (;this.datas.length < len;) {
          this.datas.push({});
        }
        var i;
        var data;
        /** @type {number} */
        var min = Number.MAX_VALUE;
        /** @type {number} */
        var max = -Number.MAX_VALUE;
        i = start;
        for (;end > i;i++) {
          data = this.datas[i - start];
          data.date = this.oriArr[i].date;
          var label;
          for (label in this.selfArr[i]) {
            if (this.selfArr[i].hasOwnProperty(label)) {
              data[label] = this.selfArr[i][label];
              if (data[label] > max) {
                max = data[label];
              }
              if (data[label] < min) {
                min = data[label];
              }
            }
          }
        }
        if (min == max) {
          /** @type {number} */
          min = max = 0;
        } else {
          /** @type {number} */
          max = Math.max(Math.abs(max), Math.abs(min));
          /** @type {number} */
          min = -max;
        }
        this.vaObj.min = min;
        this.vaObj.max = max;
        this.labelMaxP = max;
        this.labelMinP = min;
        /** @type {number} */
        var range = max - min;
        /** @type {number} */
        i = 0;
        for (;len > i;i++) {
          data = this.datas[i];
          var j = this.customArr.length;
          for (;j--;) {
            var p = this.customArr[j].prop;
            /** @type {number} */
            data[p + "y"] = 0 == range ? this.h >> 1 : this.h * (max - data[p]) / range;
          }
        }
        this.syncI();
      }
    };
    /**
     * @param {boolean} recurring
     * @param {?} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var ctx = this.line;
        ctx.clear(true, args.PARAM.getHd());
        var key;
        var sel;
        var y1;
        var control;
        var l;
        var max = this.datas.length;
        /** @type {number} */
        var i = args.DIMENSION.w_k / Math.max(max, args.PARAM.minCandleNum);
        /** @type {boolean} */
        var hollow = "hollow" == args.datas.candle;
        /** @type {number} */
        var angle = 0.6 * i;
        /** @type {number} */
        var y2 = 0.5 * this.h;
        /** @type {number} */
        var K_FALL = 0;
        for (;2 > K_FALL;K_FALL++) {
          l = 0 == K_FALL ? args.COLOR.K_FALL : args.COLOR.K_RISE;
          /** @type {number} */
          sel = this.__iOffsetX - i;
          ctx.beginPath();
          /** @type {number} */
          key = 0;
          for (;max > key;key++) {
            control = this.datas[key];
            y1 = control.bary;
            if (0 == K_FALL) {
              if (y1 > y2) {
                ctx.drawVStickRect(sel, y1, angle, y2 - y1, args.COLOR.K_FALL, true);
              }
            } else {
              if (y2 >= y1) {
                ctx.drawVStickRect(sel, y1, angle, y2 - y1, args.COLOR.K_RISE, !hollow);
              }
            }
            sel += i;
          }
          ctx.stroke();
        }
        ctx.drawBg(this.__iOffsetX);
        if (this.vaObj) {
          this.drawValueRange();
        }
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} opacity
   * @param {?} z
   * @return {undefined}
   */
  function Particle(opacity, z) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#007cc8",
      prop : "lb",
      idct : "LB",
      desc : "量比"
    }];
    self.call(this, opacity, z);
    /** @type {string} */
    this.name = "LB";
    /** @type {string} */
    this.sname = "T_LB";
    /** @type {string} */
    this.alias = "量比";
    /**
     * @param {Array} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      this.oriArr = this.gdsd(key);
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var num;
      var den;
      /** @type {number} */
      var p = 0;
      var li = key.length;
      /** @type {number} */
      var parse_lb = 0;
      for (;li > p;p++) {
        /** @type {number} */
        den = 5E4;
        /** @type {number} */
        num = 0;
        if (!isNaN(key[p][0].lastfive)) {
          if (key[p][0].lastfive > 0) {
            den = key[p][0].lastfive;
          }
        }
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var startIndex = 0;
        for (;i < this.disMod;i++) {
          /** @type {number} */
          var n = Number(key[p][i].volume) < 0 ? 0 : Number(key[p][i].volume);
          num += Number(key[p][i].volume);
          if (0 >= n) {
            parse_lb = 0 == i ? 0 : this.selfArr[this.selfArr.length - 1].lb;
            startIndex++;
          } else {
            /** @type {number} */
            parse_lb = num / den / (i - startIndex + 1);
          }
          if (0 > parse_lb) {
            /** @type {number} */
            parse_lb = 0;
          }
          this.selfArr.push({
            ignore_price : key[p][i].price,
            lb : parse_lb
          });
        }
      }
    };
    /**
     * @param {boolean} recurring
     * @return {undefined}
     */
    this.draw = function(recurring) {
      if (this.datas) {
        this.line.clear(true, this.cfg.PARAM.getHd());
        var d;
        var len = this.datas.length;
        /** @type {number} */
        var chunk = this.cfg.DIMENSION.w_t / len;
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var cy = this.customArr[i].prop + "y";
          /** @type {number} */
          d = chunk * chunkSize;
          this.line.newStyle(this.customArr[i].color, true, 1.3);
          /** @type {number} */
          var cx = 0;
          for (;len > cx && !(this.datas[cx].ignore_price < 0);cx++) {
            if (0 == cx || cx % this.disMod == 0) {
              this.line.moveTo(d, this.datas[cx][cy]);
            } else {
              this.line.lineTo(d, this.datas[cx][cy]);
            }
            d += chunk;
          }
          this.line.stroke();
        }
        if (recurring) {
          this.line.drawBg();
        }
      }
    };
  }
  /**
   * @param {?} id
   * @param {Event} item
   * @return {undefined}
   */
  function text(id, item) {
    self.call(this, id, item);
    var jQuery = this;
    /** @type {string} */
    this.name = "MA";
    if ("k" != item.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    /** @type {Array} */
    var fillColors = ["#FC9CB8", "#12BDD9", "#EE2F72", "#8CBB0D", "#0DC168", "#978d52"];
    /** @type {string} */
    var average = "MA";
    /** @type {string} */
    var space = "ma";
    /**
     * @return {undefined}
     */
    this.generateSettings = function() {
      if (jQuery.param && jQuery.param.length > 0) {
        /** @type {Array} */
        jQuery.customArr = [];
        /** @type {number} */
        var i = 0;
        var l = jQuery.param.length;
        for (;l > i;i++) {
          var v = jQuery.param[i].v;
          if (!isNaN(v)) {
            if (v > 0) {
              jQuery.customArr.push({
                v : v,
                color : jQuery.param[i].color || (fillColors[i] || "#" + util.randomColor()),
                prop : space + v,
                idct : average + v,
                desc : average
              });
            }
          }
        }
      }
      if (!jQuery.customArr || jQuery.customArr.length < 1) {
        /** @type {Array} */
        jQuery.customArr = [{
          v : 5,
          color : fillColors[0],
          prop : space + "5",
          idct : average + "5",
          desc : average
        }, {
          v : 10,
          color : fillColors[1],
          prop : space + "10",
          idct : average + "10",
          desc : average
        }, {
          v : 20,
          color : fillColors[2],
          prop : space + "20",
          idct : average + "20",
          desc : average
        }, {
          v : 30,
          color : fillColors[3],
          prop : space + "30",
          idct : average + "30",
          desc : average
        }];
      }
    };
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var parts = this.gdsd(key);
      this.oriArr = parts;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var i = this.tkProp.close;
      var numParts = parts.length;
      /** @type {number} */
      var j = 0;
      var spaces = this.customArr.length;
      for (;spaces > j;j++) {
        var s;
        /** @type {number} */
        var delta = 0;
        var max = this.customArr[j].v;
        /** @type {number} */
        var idx = 0;
        for (;numParts > idx;idx++) {
          var p = parts[idx];
          if (delta += Number(p[i]), idx >= max - 1) {
            /** @type {number} */
            s = delta / max;
            var version = parts[idx - max + 1];
            delta -= Number(version[i]);
          } else {
            /** @type {number} */
            s = delta / (idx + 1);
          }
          var target = this.selfArr[idx] = this.selfArr[idx] || {};
          if (parts[idx].volume < 0) {
            /** @type {boolean} */
            target[attr] = true;
          } else {
            /** @type {number} */
            target[space + max] = s;
          }
        }
      }
    };
  }
  /**
   * @param {?} listener
   * @param {Event} options
   * @return {undefined}
   */
  function setup(listener, options) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 12,
      color : "#00c1eb",
      prop : "dif",
      idct : "DIF"
    }, {
      v : 26,
      color : "#cc22ba",
      prop : "dea",
      idct : "DEA"
    }, {
      v : 9,
      color : "#c00000",
      prop : "bar",
      idct : "MACD"
    }];
    self.call(this, listener, options);
    /** @type {string} */
    this.name = "MACD";
    if ("k" != options.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    /** @type {string} */
    var deps = "#b82c0c";
    /** @type {string} */
    var pluginMap = "#2ec196";
    var fn = config.calcEMA;
    var debug = config.operateArr;
    var color = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var a = this.gdsd(key);
      var pdataOld = this.customArr[0].v;
      var udataCur = this.customArr[1].v;
      var value = this.customArr[2].v;
      var e = color(a, this.tkProp.close);
      var obj = debug(fn(e, pdataOld), fn(e, udataCur), "-");
      var val = fn(obj, value);
      var prevSources = debug(debug(obj, val, "-"), 2, "*");
      this.oriArr = a;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = a.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          dif : obj[i],
          dea : val[i],
          bar : prevSources[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = a[i].volume < 0;
      }
    };
    /**
     * @param {boolean} recurring
     * @param {?} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var context = this.line;
        context.clear(true, listener.PARAM.getHd());
        var movingSpace;
        var rh;
        if ("k" == options.type) {
          movingSpace = listener.DIMENSION.w_k;
          rh = listener.PARAM.minCandleNum;
        } else {
          movingSpace = listener.DIMENSION.w_t;
          /** @type {number} */
          rh = 1;
        }
        var k;
        var tmp;
        var l1 = this.datas.length;
        /** @type {number} */
        var speed = movingSpace / Math.max(l1, rh);
        /** @type {number} */
        var cur = "k" == options.type ? this.__iOffsetX - speed * dt : speed * chunkSize;
        /** @type {number} */
        var key = 0;
        for (;2 > key;key++) {
          /** @type {string} */
          var i = this.customArr[key].prop + "y";
          /** @type {number} */
          tmp = cur;
          this.line.newStyle(this.customArr[key].color, true, 1.3);
          /** @type {number} */
          k = 0;
          for (;l1 > k;k++) {
            if (0 == k) {
              this.line.moveTo(tmp, this.datas[k][i]);
            } else {
              this.line.lineTo(tmp, this.datas[k][i]);
            }
            tmp += speed;
          }
          this.line.stroke();
        }
        var y3;
        /** @type {number} */
        var y = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h;
        /** @type {number} */
        tmp = cur;
        var vLine2;
        /** @type {number} */
        var er = 1;
        context.newStyle(deps, true, er);
        /** @type {number} */
        k = 0;
        for (;l1 > k;k++) {
          y3 = this.datas[k].bary;
          if (y >= y3) {
            /** @type {number} */
            vLine2 = ~~(tmp + 0.5);
            vLine2 -= 0.5;
            context.moveTo(vLine2, y);
            context.lineTo(vLine2, y3);
          }
          tmp += speed;
        }
        context.stroke();
        /** @type {number} */
        tmp = cur;
        context.newStyle(pluginMap, true, er);
        /** @type {number} */
        k = 0;
        for (;l1 > k;k++) {
          y3 = this.datas[k].bary;
          if (y3 > y) {
            /** @type {number} */
            vLine2 = ~~(tmp + 0.5);
            vLine2 -= 0.5;
            context.moveTo(vLine2, y);
            context.lineTo(vLine2, y3);
          }
          tmp += speed;
        }
        context.stroke();
        /** @type {number} */
        var hly = this.h / 2 - 0.5;
        context.newStyle(this.cfg.COLOR.GRID, true, 1);
        context.moveTo(0, hly);
        context.lineTo(this.cfg.DIMENSION.w_k, hly);
        context.stroke();
        context.drawBg(this.__iOffsetX);
      }
    };
  }
  /**
   * @param {?} err
   * @param {Event} event
   * @return {undefined}
   */
  function next(err, event) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 30,
      color : "#99cf17",
      prop : "obv",
      idct : "OBV"
    }, {
      v : 0 / 0,
      color : "#00c1eb",
      prop : "obvma",
      idct : "OBVMA"
    }];
    var a3 = {
      nu : true
    };
    self.call(this, err, event, a3);
    /** @type {string} */
    this.name = "OBV";
    if ("k" != event.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    /**
     * @param {Array} data
     * @return {undefined}
     */
    this.initAndCalcAll = function(data) {
      /** @type {Array} */
      this.oriArr = data;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var index;
      var result;
      var offset;
      var startIndex = this.customArr[0].v;
      var obj = data[0];
      offset = isNaN(obj.prevclose) || obj.close > obj.prevclose ? obj.volume : -obj.volume;
      index = obj.close == obj.prevclose ? 0 : offset;
      result = index;
      this.selfArr.push({
        obv : index,
        obvma : index
      });
      /** @type {number} */
      var i = 1;
      var l = data.length;
      for (;l > i;i++) {
        obj = data[i];
        var copies = {};
        this.selfArr.push(copies);
        /** @type {number} */
        offset = obj.close > data[i - 1].close ? Number(obj.volume) : obj.close == data[i - 1].close ? 0 : -Number(obj.volume);
        index = offset + this.selfArr[i - 1].obv;
        copies.obv = index;
        result += index;
        if (i >= startIndex) {
          result -= this.selfArr[i - startIndex].obv;
          /** @type {number} */
          copies.obvma = result / startIndex;
        } else {
          /** @type {number} */
          copies.obvma = result / (i + 1);
        }
      }
    };
  }
  /**
   * @param {?} val
   * @param {?} key
   * @param {?} cb
   * @return {undefined}
   */
  function where(val, key, cb) {
    fn.call(this, val, key, {
      nu : true
    });
    /** @type {string} */
    this.selfDataUrl = "https://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getAllMoneyFlow?symbol=$symbol&callback=$cb&from=$from&to=$to";
    /** @type {string} */
    this.selfDataUrlUpdate = "http://touzi.sina.com.cn/api/openapi.php/TouziFreeService.getLastMoneyFlow?callback=$cb&symbol=$symbol";
    this.cb = cb;
    this.loadUrlData();
  }
  /**
   * @param {?} g
   * @param {?} success
   * @return {undefined}
   */
  function callback(g, success) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#12BDD9",
      prop : "iy",
      idct : "Position"
    }];
    self.call(this, g, success, {
      nu : true
    });
    /** @type {string} */
    this.name = "POSITION";
    /** @type {string} */
    this.sname = "T_POSITION";
    /** @type {string} */
    this.alias = "持仓量";
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var values = this.gdsd(key);
      this.oriArr = values;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var vlen = values.length;
      for (;vlen > i;i++) {
        this.selfArr.push({
          iy : values[i].inventory
        });
      }
    };
  }
  /**
   * @param {?} routes
   * @param {?} model
   * @param {?} cb
   * @return {undefined}
   */
  function World(routes, model, cb) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 0 / 0,
      color : "#ff0099",
      prop : "ss",
      idct : "净小单"
    }];
    self.call(this, routes, model);
    var pointMarker = this;
    /** @type {string} */
    this.name = "Press";
    /** @type {number} */
    this.separate = 1;
    this.cb = cb;
    /**
     * @param {?} key
     * @param {boolean} recurring
     * @return {undefined}
     */
    this.initAndCalcAll = function(key, recurring) {
      if (!recurring) {
        this.oriArr = key;
        if (this.urlData) {
          if (!this.datas) {
            /** @type {Array} */
            this.datas = [];
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (data && this.datas) {
        for (;this.datas.length > 3;) {
          this.datas.length--;
        }
        for (;this.datas.length < 3;) {
          this.datas.push({});
        }
        var i;
        var item;
        var fmt = this.oriArr[this.oriArr.length - 1].close;
        /** @type {number} */
        i = data.length;
        for (;i-- && (item = data[i], !(item.p >= fmt));) {
        }
        if (item.p == fmt) {
          console.log(data[i - 1].p, data[i - 1].v);
          console.log(fmt, item.v);
          console.log(data[i + 1].p, data[i + 1].v);
        } else {
          console.log(data[i].p, data[i].v);
          console.log(fmt, item.v);
          console.log(data[i + 1].p, data[i + 1].v);
        }
        console.log("-----------------------");
        /** @type {number} */
        var k = 0;
        for (;3 > k;k++) {
          this.datas[k].v = data[i - k - 1].v;
          this.datas[k].p = data[i - k - 1].p;
        }
        console.log(this.datas);
      }
    };
    /**
     * @return {undefined}
     */
    this.draw = function() {
      if (this.datas) {
        var context = this.line;
        context.clear(true, routes.PARAM.getHd());
        var y;
        var py;
        var height;
        var left;
        var max = this.datas.length;
        /** @type {number} */
        var w = routes.DIMENSION.w_k / Math.max(max, routes.PARAM.minCandleNum);
        /** @type {number} */
        var h = this.labelMaxP / (this.labelMaxP - this.labelMinP) * this.h;
        /** @type {Array} */
        var $cookies = [];
        /** @type {Array} */
        var internalValues = [];
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var index = this.customArr[i].prop + "y";
          /** @type {number} */
          left = w * chunkSize;
          context.newStyle(this.customArr[i].color, true, left);
          /** @type {number} */
          var key = 0;
          for (;max > key;key++) {
            height = this.datas[key][index];
            y = height > h ? internalValues[key] || 0 : $cookies[key] || 0;
            /** @type {number} */
            py = h - y;
            height -= y;
            context.moveTo(left, py);
            context.lineTo(left, height);
            if (height > h) {
              $cookies[key] = $cookies[key] || 0;
              /** @type {number} */
              internalValues[key] = h - height;
            } else {
              /** @type {number} */
              $cookies[key] = h - height;
              internalValues[key] = internalValues[key] || 0;
            }
            left += w;
          }
          context.stroke();
        }
      }
    };
    var dragEvent;
    /** @type {string} */
    var e = "ff.sinajs.cn";
    var setup = {
      ssl : true,
      authtype : "A_hq"
    };
    /** @type {Array} */
    var data = [];
    /**
     * @param {Object} attrs
     * @return {undefined}
     */
    var start = function(attrs) {
      var i;
      var r;
      var args = attrs["2cn_" + pointMarker.symbol].split(",");
      /** @type {number} */
      var len = 65;
      /** @type {number} */
      i = 0;
      for (;10 > i;i++) {
        r = data[i] || {};
        data[i] = r;
        r.v = args[len - i];
        r.p = args[len - i - 10];
      }
      /** @type {number} */
      len = 26;
      /** @type {number} */
      i = 10;
      for (;20 > i;i++) {
        r = data[i] || {};
        data[i] = r;
        r.v = args[len + i];
        r.p = args[len + i - 10];
      }
    };
    /**
     * @return {undefined}
     */
    this.loadUrlData = function() {
      if (IO.WebPush4 && (this.symbol && !dragEvent)) {
        /** @type {string} */
        var buf = ["2cn", this.symbol].join("_");
        dragEvent = new IO.WebPush4(e, buf, start, setup);
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} g
   * @param {Event} scope
   * @return {undefined}
   */
  function c(g, scope) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 12,
      color : "#EE2F72",
      prop : "psy",
      idct : "PSY"
    }, {
      v : 6,
      color : "#00c1eb",
      prop : "psyma",
      idct : "PSYMA"
    }];
    self.call(this, g, scope);
    /** @type {string} */
    this.name = "PSY";
    if ("k" != scope.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      min : 0,
      max : 100,
      upper : 75,
      lower : 25
    };
    /**
     * @param {Array} data
     * @return {undefined}
     */
    this.initAndCalcAll = function(data) {
      /** @type {Array} */
      this.oriArr = data;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var count = this.customArr[0].v;
      var startIndex = this.customArr[1].v;
      var point = data[0];
      /** @type {number} */
      var v = isNaN(point.prevclose) || point.prevclose < point.close ? 1 : 0;
      /** @type {number} */
      var t = v;
      /** @type {number} */
      var source = v / count * 100;
      /** @type {number} */
      var result = source;
      this.selfArr.push({
        psy : source,
        psyma : source
      });
      /** @type {Array} */
      var args = [v];
      /** @type {number} */
      var i = 1;
      var l = data.length;
      for (;l > i;i++) {
        point = data[i];
        var details = {};
        this.selfArr.push(details);
        /** @type {number} */
        v = point.close > data[i - 1].close ? 1 : 0;
        args.push(v);
        t += v;
        if (i >= count) {
          t -= args[i - count];
        }
        /** @type {number} */
        source = t / count * 100;
        /** @type {number} */
        details.psy = source;
        result += source;
        if (i >= startIndex) {
          result -= this.selfArr[i - startIndex].psy;
          /** @type {number} */
          details.psyma = result / startIndex;
        } else {
          /** @type {number} */
          details.psyma = result / (i + 1);
        }
      }
    };
  }
  /**
   * @param {?} last
   * @param {?} request
   * @param {?} cb
   * @return {undefined}
   */
  function process(last, request, cb) {
    /** @type {string} */
    var supportsProp = "rgl";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      color : "#2D0674",
      prop : supportsProp,
      idct : "红绿角线"
    }];
    self.call(this, last, request);
    /** @type {string} */
    this.name = "RGL";
    /** @type {string} */
    this.sname = "T_RGL";
    /** @type {string} */
    this.alias = "红绿角线";
    /** @type {number} */
    this.separate = 1;
    /** @type {string} */
    var g = "icn_calc_";
    var data = this;
    /** @type {string} */
    this.selfDataUrl = "http://finance.sina.com.cn/finance/touziline/$symbol.js?" + Math.random();
    /** @type {string} */
    this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + g + "$symbol";
    this.cb = cb;
    /**
     * @param {?} data
     * @return {?}
     */
    this.df = function(data) {
      /** @type {Array} */
      var eventPath = [];
      if (data) {
        var dataItem;
        for (dataItem in data) {
          if (data.hasOwnProperty(dataItem)) {
            eventPath.push({
              rgl : Number(data[dataItem]),
              time : dataItem
            });
          }
        }
      }
      return eventPath;
    };
    var env;
    /** @type {boolean} */
    var n = false;
    /**
     * @return {undefined}
     */
    this.loadUrlData = function() {
      var guess = this.aliasymbol || this.symbol;
      /** @type {string} */
      var jsonp = "_touziredgreenline_" + guess;
      var ids = this.selfDataUrl.replace("$symbol", guess).replace("$cb", "var%20" + jsonp + "=").replace("$rn", String((new Date).getDate()));
      if (this.proxyCfg.usrObj.ssl) {
        ids = util.getSUrl(ids);
      }
      if (!n) {
        env = util.tUtil.gata(request.usrObj.market);
        util.load(ids, function() {
          var pdataCur = window[jsonp];
          data.urlData = {
            time : []
          };
          var otherArgs = data.df(pdataCur);
          /** @type {Array} */
          var self = data.urlData.time;
          self.splice.apply(self, [0, 0].concat(otherArgs));
          /** @type {boolean} */
          n = true;
          data.update();
        });
      }
    };
    /**
     * @param {?} string
     * @return {?}
     */
    this.udf = function(string) {
      if (string) {
        var i;
        var current = string.split(",");
        return current && (current.length > 1 && (i = [{
          time : current[6].substring(0, 5),
          rgl : current[3] - current[4]
        }])), i;
      }
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      var b = this.symbol;
      /** @type {string} */
      var i = "hq_str_" + g + b;
      var p = this.selfDataUrlUpdate.replace("$symbol", b);
      if (this.proxyCfg.usrObj.ssl) {
        p = util.getSUrl(p);
      }
      util.load(p, function() {
        var environment = window[i];
        /** @type {null} */
        window[i] = null;
        var camelKey = data.udf(environment);
        if (camelKey) {
          if (data.urlData) {
            if (data.urlData.time) {
              data.updateData(camelKey, data.urlData.time);
            }
          }
        }
      });
    };
    /**
     * @param {Object} key
     * @param {string} keys
     * @return {undefined}
     */
    this.updateData = function(key, keys) {
      if (key && (keys && !(keys.length < 1))) {
        var time = keys[keys.length - 1];
        if (key = key[0]) {
          if (time.time < key.time) {
            var a = util.arrIndexOf(env, key.time);
            var v = util.arrIndexOf(env, time.time);
            var b = v;
            for (;a >= b;b++) {
              if (a - b > 0) {
                keys[keys.length] = keys[keys.length - 1];
                console.log(a, b, request.stock.realLen);
              } else {
                /** @type {Object} */
                keys[keys.length - 1] = key;
              }
            }
          } else {
            keys[keys.length - 1].rgl += key.rgl;
          }
          data.cb(data);
          if (4 == data.viewState.start) {
            if (5 == data.viewState.end) {
              request.cbInDC();
            }
          }
          this.syncI();
        }
      }
    };
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      if (this.urlData) {
        this.oriArr = this.gdsd(key);
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var i;
        var prevSources = this.urlData.time;
        var count = request.stock.realLen;
        if (0 > count) {
          count = data.disMod;
        }
        /** @type {number} */
        i = 0;
        for (;i < data.disMod && !(i > count);i++) {
          if (prevSources[i]) {
            key[4][i].rgl = prevSources[i].rgl;
          }
        }
        var v;
        /** @type {number} */
        var b = 0;
        var a = this.oriArr.length;
        for (;a > b;b++) {
          v = this.oriArr[b];
          this.selfArr.push({
            rgl : v ? Number(v.rgl) : 1
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.createPlayingData = function() {
      if (this.datas) {
        var ySize = this.h % 2 == 0 ? this.h : this.h + 1;
        /** @type {number} */
        this.labelMaxP = Math.abs(Math.abs(this.labelMaxP) > Math.abs(this.labelMinP) ? this.labelMaxP : this.labelMinP);
        /** @type {number} */
        this.labelMinP = -this.labelMaxP;
        var mat;
        /** @type {number} */
        var dz = this.labelMaxP - this.labelMinP;
        /** @type {number} */
        var lb = 0;
        var la = this.datas.length;
        for (;la > lb;lb++) {
          mat = this.datas[lb];
          var j = this.customArr.length;
          for (;j--;) {
            var row = this.customArr[j].prop;
            /** @type {number} */
            mat[row + "y"] = ySize / 2 * (this.labelMaxP - mat[row]) / dz;
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.draw = function() {
      if (this.datas) {
        var context = this.line;
        context.clear(true, last.PARAM.getHd());
        var cnl = this.datas.length;
        /** @type {number} */
        var i = last.DIMENSION.w_t / cnl;
        var part = last.DIMENSION.h_t;
        /** @type {number} */
        var chunkStart = i * chunkSize;
        part = part % 2 == 0 ? part : part + 1;
        var sel;
        var position2;
        var data;
        var PI2;
        /** @type {number} */
        var position1 = part / 2;
        /** @type {number} */
        var T_FALL = 0;
        for (;2 > T_FALL;T_FALL++) {
          PI2 = 1 == T_FALL ? last.COLOR.T_FALL : last.COLOR.T_RISE;
          /** @type {number} */
          sel = 0;
          context.beginPath();
          /** @type {number} */
          var k = 0;
          for (;cnl > k;k++) {
            data = this.datas[k];
            position2 = data.rgly + part / 4;
            if (0 == T_FALL) {
              if (data.rgl > 0) {
                context.drawVStickC(sel, position2, chunkStart, position1 - position2, PI2);
              }
            } else {
              if (data.rgl < 0) {
                context.drawVStickC(sel, position2, chunkStart, position1 - position2, PI2);
              }
            }
            sel += i;
          }
          context.stroke();
        }
        context.drawBg();
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} p
   * @param {Event} success
   * @return {undefined}
   */
  function require(p, success) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 12,
      color : "#F17147",
      prop : "roc",
      idct : "ROC"
    }, {
      v : 6,
      color : "#406BEA",
      prop : "maroc",
      idct : "MAROC"
    }];
    self.call(this, p, success);
    /** @type {string} */
    this.name = "ROC";
    if ("k" != success.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      glv : 0
    };
    var image = config.calcMA;
    var renderer = config.calcREF;
    var item = config.getArr;
    var callback = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var values = this.gdsd(key);
      var node = this.customArr[0].v;
      var udataCur = this.customArr[1].v;
      var data = item(values, this.tkProp.close);
      var ok = callback(callback(callback(data, renderer(data, node), "-"), 100, "*"), renderer(data, node), "/");
      var prevSources = image(ok, udataCur);
      this.oriArr = values;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var vlen = values.length;
      for (;vlen > i;i++) {
        this.selfArr[i] = {
          roc : ok[i],
          maroc : prevSources[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = values[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} err
   * @param {Event} start
   * @return {undefined}
   */
  function walk(err, start) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 6,
      color : "#999999",
      prop : "rsi1",
      idct : "RSI1"
    }, {
      v : 12,
      color : "#ffac03",
      prop : "rsi2",
      idct : "RSI2"
    }, {
      v : 24,
      color : "#9A2574",
      prop : "rsi3",
      idct : "RSI3"
    }];
    self.call(this, err, start);
    /** @type {string} */
    this.name = "RSI";
    if ("k" != start.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      min : 0,
      max : 100,
      upper : 70,
      lower : 30
    };
    var color = config.calcREF;
    var div = config.calcMAX;
    var extend = config.calcSMA;
    var layer = config.calcABS;
    var callback = config.operateArr;
    var observable = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var newValue = this.gdsd(key);
      var oldconfig = this.customArr[0].v;
      var params = this.customArr[1].v;
      var options = this.customArr[2].v;
      var value = observable(newValue, this.tkProp.close);
      var r = color(value, 1);
      var v = callback(value, r, "-");
      var el = div(v, 0);
      var t = layer(v);
      var hosts = callback(callback(extend(el, oldconfig, 1), extend(t, oldconfig, 1), "/"), 100, "*");
      var current = callback(callback(extend(el, params, 1), extend(t, params, 1), "/"), 100, "*");
      var prevSources = callback(callback(extend(el, options, 1), extend(t, options, 1), "/"), 100, "*");
      this.oriArr = newValue;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var n = newValue.length;
      for (;n > i;i++) {
        this.selfArr[i] = {
          rsi1 : hosts[i],
          rsi2 : current[i],
          rsi3 : prevSources[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = newValue[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} interval
   * @param {?} w
   * @return {undefined}
   */
  function Scene(interval, w) {
    /** @type {string} */
    var propName = "ignore_pct";
    /** @type {string} */
    var i = "ignore_oripct";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 4,
      color : "#777777",
      prop : "sar",
      idct : "SAR",
      desc : "天数"
    }, {
      v : 2,
      color : "#b82c0c",
      desc : "参数"
    }, {
      v : 20,
      color : "#008040",
      desc : "反向临界"
    }, {
      color : "#777777",
      idct : "SAR操作收益",
      prop : propName
    }, {
      color : "#777777",
      idct : "区间股价收益",
      prop : i
    }];
    self.call(this, interval, w);
    /** @type {string} */
    this.name = "SAR";
    var callback = config.calcSAR;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var value = callback(key, current[0].v, current[1].v, current[2].v);
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = key.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          ignore_minmax : value.direction[i],
          sar : value.data[i]
        };
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (this.datas) {
        var start = this.viewState.start;
        var end = this.viewState.end;
        /** @type {number} */
        var length = end - start;
        for (;this.datas.length > length;) {
          this.datas.length--;
        }
        for (;this.datas.length < length;) {
          this.datas.push({});
        }
        /** @type {number} */
        var min = Number.MAX_VALUE;
        /** @type {number} */
        var max = -Number.MAX_VALUE;
        /** @type {number} */
        var scaleRatio = 0;
        /** @type {number} */
        var a = 0;
        var dest = this.selfArr[start].ignore_minmax;
        var index = start;
        for (;end > index;index++) {
          var file = this.oriArr[index];
          var vec = this.selfArr[index].ignore_minmax;
          var data = this.datas[index - start];
          data.date = file.date;
          if (index != start) {
            if (vec == dest) {
              if (1 == vec) {
                /** @type {number} */
                scaleRatio = (1 + file.percent) * (1 + scaleRatio) - 1;
              }
            } else {
              /** @type {number} */
              scaleRatio = 0 == vec ? ((file.close - this.oriArr[index - 1].close) / this.oriArr[index - 1].close + 1) * (1 + scaleRatio) - 1 : ((file.close - file.close) / file.close + 1) * (1 + scaleRatio) - 1;
            }
          } else {
            if (1 == vec) {
              /** @type {number} */
              scaleRatio = ((file.close - file.close) / file.close + 1) * (1 + scaleRatio) - 1;
            }
          }
          dest = vec;
          if (index != start) {
            /** @type {number} */
            a = (1 + file.percent) * (1 + a) - 1;
          }
          /** @type {number} */
          data[propName] = 100 * scaleRatio;
          /** @type {number} */
          data[i] = 100 * a;
          var key;
          for (key in this.selfArr[index]) {
            if (this.selfArr[index].hasOwnProperty(key)) {
              if (data[key] = this.selfArr[index][key], 0 == key.indexOf(x)) {
                continue;
              }
              if (data[key] > max) {
                max = data[key];
              }
              if (data[key] < min) {
                min = data[key];
              }
            }
          }
        }
        this.minPrice = min;
        this.maxPrice = max;
        this.syncI();
      }
    };
    /**
     * @param {boolean} recurring
     * @param {?} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var line = this.line;
        line.clear(true, interval.PARAM.getHd());
        var l1 = this.datas.length;
        /** @type {number} */
        var rate = interval.DIMENSION.w_k / Math.max(l1, interval.PARAM.minCandleNum);
        /** @type {number} */
        var r20 = Math.max(0.1 * rate, 0.1);
        if (r20 > 2) {
          /** @type {number} */
          r20 = 2;
        }
        var deep;
        /** @type {number} */
        var target = this.__iOffsetX - rate * dt;
        /** @type {string} */
        var key = this.customArr[0].prop + "y";
        var data = this.customArr;
        /** @type {number} */
        var color = 0;
        for (;2 > color;color++) {
          /** @type {number} */
          deep = target;
          this.line.newStyle(0 == color ? data[2].color : data[1].color, true, 2);
          /** @type {number} */
          var inputIndex = 0;
          for (;l1 > inputIndex;inputIndex++) {
            if (this.datas[inputIndex].ignore_minmax == color) {
              this.line.drawDot(deep, this.datas[inputIndex][key], r20, true);
            }
            deep += rate;
          }
          this.line.stroke();
        }
        if (recurring) {
          line.drawBg(this.__iOffsetX);
        }
      }
    };
  }
  /**
   * @param {?} ctx
   * @param {?} idx
   * @param {?} cb
   * @return {undefined}
   */
  function draw(ctx, idx, cb) {
    var data = this;
    /** @type {number} */
    var frequency = 2E4;
    self.call(this, ctx, idx, {
      nu : true
    });
    /** @type {string} */
    this.name = "TFLOW";
    /** @type {string} */
    this.sname = "T_TFLOW";
    /** @type {string} */
    this.alias = "净买入";
    this.urls = {
      oned : "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShuminline?random=$rn",
      onec : "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2Adayminline?symbol=$symbol&___qn=3&random=$rn",
      c : "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2A5dayminline?symbol=$symbol&random=$rn",
      d : "http://stock.finance.sina.com.cn/stock/api/jsonp.php/$cb/StockLevel2Service.getLv2ZhiShu5dayminline?random=$rn"
    };
    var config;
    /** @type {boolean} */
    var hq = true;
    this.cb = cb;
    /** @type {number} */
    var n = 0;
    /** @type {Array} */
    var info = [{
      v : 0 / 0,
      color : "#ff1111",
      prop : "mb",
      idct : "特大"
    }, {
      v : 0 / 0,
      color : "#ff9f07",
      prop : "ms",
      idct : "大"
    }, {
      v : 0 / 0,
      color : "#00b5f8",
      prop : "sb",
      idct : "中"
    }, {
      v : 0 / 0,
      color : "#5b0497",
      prop : "ss",
      idct : "小"
    }];
    /** @type {null} */
    var f = null;
    /**
     * @return {undefined}
     */
    this.generateSettings = function() {
      var i;
      for (i in data.urls) {
        if (data.urls.hasOwnProperty(i)) {
          data.urls[i] = util.getSUrl(data.urls[i]);
        }
      }
      if (data.param && data.param.length > 0) {
        /** @type {Array} */
        data.customArr = [];
        /** @type {number} */
        var name = 0;
        var cnl = data.param.length;
        for (;cnl > name;name++) {
          data.customArr.push({
            v : 0 / 0,
            color : data.param[name].color || (info[name].color || "#" + util.randomColor()),
            prop : info[name].prop,
            idct : info[name].idct
          });
        }
      }
      if (!data.customArr || data.customArr.length < 1) {
        /** @type {Array} */
        data.customArr = info;
      }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    var set = function(value) {
      var codeSegments;
      /** @type {Array.<string>} */
      var words = String(value).split("|");
      /** @type {Array} */
      var out = [];
      /** @type {Array.<string>} */
      codeSegments = words.slice(1, words.length);
      /** @type {number} */
      var i = 0;
      var copies = {};
      /** @type {Array} */
      var match = [];
      for (;i < codeSegments.length;i++) {
        /** @type {Array.<string>} */
        match = codeSegments[i].split(",");
        if (!(match[0] > "11:30" && match[0] < "13:00")) {
          copies = {
            time : match[0],
            mb : Number(match[1]),
            ms : Number(match[2]),
            sb : Number(match[3]),
            ss : Number(match[4])
          };
          out.push(copies);
        }
      }
      return out;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    this.df = function(value) {
      var words;
      /** @type {Array.<string>} */
      var values = String(value).split("R");
      /** @type {Array} */
      var out = [];
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var vlen = values.length;
      /** @type {Array} */
      var parameters = [];
      for (;vlen > i;i++) {
        /** @type {Array.<string>} */
        words = String(values[i]).split("|");
        /** @type {Array} */
        var copies = [];
        /** @type {Array.<string>} */
        parameters = words.slice(1, words.length);
        /** @type {number} */
        var p = 0;
        var ret = {};
        /** @type {Array} */
        var match = [];
        for (;p < parameters.length;p++) {
          /** @type {Array.<string>} */
          match = parameters[p].split(",");
          if (!(match[0] > "11:30" && match[0] < "13:00")) {
            ret = {
              time : match[0],
              mb : Number(match[1]),
              ms : Number(match[2]),
              sb : Number(match[3]),
              ss : Number(match[4])
            };
            if (0 == p) {
              /** @type {string} */
              ret.date = words.slice(0, 1)[0];
            }
            copies.push(ret);
          }
        }
        out.push(copies);
      }
      return out;
    };
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    this.loadUrlData = function(dataAndEvents) {
      if (dataAndEvents && idx.stock.hq) {
        var s = data.symbol;
        var jsonp = "_" + s + _.ddt(new Date).getFullYear();
        data.selfDataUrl = config ? idx.stock.dp ? data.urls.oned : data.urls.onec : idx.stock.dp ? data.urls.d : data.urls.c;
        if (!idx.stock.hq.isUpdateTime) {
          clearInterval(this.updateId);
          /** @type {null} */
          this.updateId = null;
        }
        util.load(data.selfDataUrl.replace("$symbol", s).replace("$cb", "var%20" + jsonp + "="), function() {
          var pdataCur = window[jsonp];
          return pdataCur && pdataCur.__ERROR ? (data.urlData[4] = f, void(n = 1)) : void(pdataCur && (config ? data.urlData[4] = set(pdataCur) : data.urlData = data.df(pdataCur), f = data.urlData[4], data.toReCalc = true, data.cb(data), data.tFlowLen = data.urlData.length, config = true));
        }, function() {
          /** @type {number} */
          n = 1;
        });
      }
    };
    /**
     * @param {Array} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      if (idx.stock.hq && (hq && (data.loadUrlData(true), hq = false)), this.oriArr = this.gdsd(key), 1 != n && this.urlData) {
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var j;
        var value;
        var i = key.length;
        /** @type {Array} */
        var byteout = [];
        var cnl = this.urlData.length;
        /** @type {number} */
        var config = 0;
        /** @type {number} */
        j = 0;
        for (;i > j;j++) {
          /** @type {number} */
          value = config;
          for (;cnl > value;value++) {
            if (key[j][0] && (key[j][0].date && (this.urlData[j][0] && util.dateUtil.ds(key[j][0].date, "-") == this.urlData[j][0].date))) {
              config++;
              byteout.push(this.urlData[value]);
            } else {
              if (value >= cnl - 1) {
                byteout.push([]);
              }
            }
          }
        }
        /** @type {number} */
        j = 0;
        for (;i > j;j++) {
          var e;
          var test;
          /** @type {number} */
          var Exception = j >= i - 1 ? 1E-7 : 1E-6;
          /** @type {number} */
          var index = 0;
          for (;index < this.disMod;index++) {
            test = key[j][index];
            if (this.urlData[j][index]) {
              e = this.urlData[j][index];
            }
            if (j >= i - 1) {
              if (index > idx.stock.hq.index) {
                /** @type {null} */
                e = null;
              }
            }
            var copies = {
              mb : this.urlData[j][index] ? Number(this.urlData[j][index].mb) : e ? e.mb : Exception,
              ms : this.urlData[j][index] ? Number(this.urlData[j][index].ms) : e ? e.ms : Exception,
              sb : this.urlData[j][index] ? Number(this.urlData[j][index].sb) : e ? e.sb : Exception,
              ss : this.urlData[j][index] ? Number(this.urlData[j][index].ss) : e ? e.ss : Exception
            };
            if (j == i - 1) {
              if (index == this.disMod - 1) {
                if (idx.stock.hq.time > "15:00") {
                  copies = this.urlData[j][index - 1];
                }
              }
            }
            this.selfArr.push(copies);
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        /** @type {number} */
        var min = this.viewState.start * this.disMod;
        /** @type {number} */
        var max = this.viewState.end * this.disMod;
        /** @type {number} */
        var size = max - min;
        for (;this.datas.length > size;) {
          this.datas.length--;
        }
        for (;this.datas.length < size;) {
          this.datas.push({});
        }
        var key;
        var data;
        /** @type {number} */
        var d = Number.MAX_VALUE;
        /** @type {number} */
        var x = -Number.MAX_VALUE;
        /** @type {number} */
        key = min;
        for (;max > key;key++) {
          data = this.datas[key - min];
          data.date = this.oriArr[key].date;
          var k;
          for (k in this.selfArr[key]) {
            if (this.selfArr[key].hasOwnProperty(k)) {
              data[k] = this.selfArr[key][k];
              if (data[k] > x) {
                x = data[k];
              }
              if (data[k] < d) {
                d = data[k];
              }
            }
          }
        }
        this.labelMaxP = x;
        this.labelMinP = d;
        /** @type {number} */
        var a = x - d;
        /** @type {number} */
        key = 0;
        for (;size > key;key++) {
          data = this.datas[key];
          var j = this.customArr.length;
          for (;j--;) {
            var i = this.customArr[j].prop;
            /** @type {number} */
            data[i + "y"] = this.h * (x - data[i]) / a;
          }
        }
      }
    };
    /**
     * @param {boolean} recurring
     * @return {undefined}
     */
    this.draw = function(recurring) {
      if (this.datas) {
        if (idx.stock.hq) {
          if (idx.stock.hq.isUpdateTime) {
            if (!this.updateId) {
              /** @type {number} */
              this.updateId = setInterval(data.loadUrlData, frequency, true);
            }
          }
        }
        this.line.clear(true, this.cfg.PARAM.getHd());
        /** @type {number} */
        var r20 = 1.5;
        if (this.h > 90) {
          /** @type {number} */
          r20 = 2;
        } else {
          if (this.h < 50) {
            /** @type {number} */
            r20 = 1.3;
          }
        }
        var d;
        var len = this.datas.length;
        /** @type {number} */
        var chunk = this.cfg.DIMENSION.w_t / len;
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var cy = this.customArr[i].prop + "y";
          /** @type {number} */
          d = chunk * chunkSize;
          this.line.newStyle(this.customArr[i].color, true, r20);
          /** @type {number} */
          var cx = 0;
          for (;len > cx;cx++) {
            if (1E-7 != this.datas[cx][this.customArr[i].prop]) {
              if (0 == cx || cx % this.disMod == 0) {
                this.line.moveTo(d, this.datas[cx][cy]);
              } else {
                this.line.lineTo(d, this.datas[cx][cy]);
              }
              d += chunk;
            }
          }
          this.line.stroke();
        }
        if (recurring) {
          this.line.drawBg();
        }
      }
    };
    /** @type {number} */
    this.updateId = setInterval(data.loadUrlData, frequency, true);
    if (!idx.stock.hq) {
      this.loadUrlData(true);
    }
  }
  /**
   * @param {?} it
   * @param {?} arg
   * @return {undefined}
   */
  function isObject(it, arg) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      color : "#007cc8",
      prop : "tor",
      idct : "TOR"
    }];
    self.call(this, it, arg);
    /** @type {string} */
    this.name = "TOR";
    /** @type {string} */
    this.alias = "换手率";
    /** @type {boolean} */
    var a = false;
    var data = arg.stock.extraDataObj.rsAmount;
    /**
     * @param {?} camelKey
     * @return {undefined}
     */
    this.initAndCalcAll = function(camelKey) {
      if (data) {
        this.oriArr = camelKey;
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var other;
        var amount;
        /** @type {number} */
        var j = 0;
        var spaces = camelKey.length;
        for (;spaces > j;j++) {
          other = camelKey[j];
          /** @type {number} */
          var i = 0;
          var l = data.length;
          for (;l > i;i++) {
            if (other.date >= data[i].date) {
              amount = data[i].amount;
              break;
            }
          }
          this.selfArr[j] = {
            tor : other.volume / amount
          };
        }
      } else {
        if (!a) {
          /** @type {boolean} */
          a = true;
          var initAndCalcAll = this;
          setTimeout(function() {
            data = arg.stock.extraDataObj.rsAmount;
            initAndCalcAll.initAndCalcAll(camelKey);
            /** @type {boolean} */
            a = false;
          }, 3E3);
        }
      }
    };
  }
  /**
   * @param {?} err
   * @param {Event} v
   * @return {undefined}
   */
  function scale(err, v) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 12,
      color : "#d6c84b",
      prop : "trix",
      idct : "TRIX"
    }, {
      v : 9,
      color : "#26bcd5",
      prop : "matrix",
      idct : "MATRIX"
    }];
    self.call(this, err, v);
    /** @type {string} */
    this.name = "TRIX";
    if ("k" != v.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    var template = config.calcMA;
    var safe_add = config.calcEMA;
    var branch = config.getArr;
    var debug = config.operateArr;
    var fire = config.calcREF;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var parts = this.gdsd(key);
      var q = this.customArr[0].v;
      var camelKey = this.customArr[1].v;
      var a = branch(parts, this.tkProp.close);
      var memory = safe_add(safe_add(safe_add(a, q), q), q);
      var val = fire(memory, 1);
      var info = debug(debug(debug(memory, val, "-"), val, "/"), 100, "*");
      var data = template(info, camelKey);
      this.oriArr = parts;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = parts.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          trix : info[i],
          matrix : data[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = parts[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} er
   * @param {?} i
   * @param {?} cb
   * @return {undefined}
   */
  function handle(er, i, cb) {
    draw.call(this, er, i, {
      nu : true
    });
    this.urls = {
      oned : "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getMinuteFlow?random=$rn",
      onec : "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockMinuteFlow?symbol=$symbol&random=$rn",
      c : "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getStockHistoryMinuteFlow?symbol=$symbol&random=$rn",
      d : "http://stock.sina.com.cn/stock/api/jsonp.php/$cb/TouziService.getHistoryMinuteFlow?symbol=$symbol&random=$rn"
    };
    this.cb = cb;
    if (!i.stock.hq) {
      this.loadUrlData(true);
    }
  }
  /**
   * @param {?} r
   * @param {?} oldValue
   * @param {?} cb
   * @return {undefined}
   */
  function update(r, oldValue, cb) {
    /** @type {string} */
    var i = "pct";
    /** @type {string} */
    var propName = "oripct";
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      color : "#fa6d6d",
      prop : i,
      idct : "红线（多空信号收益）"
    }, {
      color : "#2b55ff",
      prop : propName,
      idct : "蓝线（股价自然涨幅）"
    }];
    self.call(this, r, oldValue);
    /** @type {string} */
    this.name = "TZY";
    /** @type {number} */
    this.separate = 1;
    /** @type {string} */
    this.selfDataUrl = "http://finance.sina.com.cn/finance/hq/$symbol.js?_=$rn";
    /** @type {string} */
    var name = "dkfz_";
    /** @type {string} */
    this.selfDataUrlUpdate = "http://hq.sinajs.cn/etag.php?_=" + (new Date).getTime() + "&list=" + name + "$symbol";
    this.cb = cb;
    /** @type {boolean} */
    this.toReCalc = true;
    this.loadedFlag = {};
    this.loadedFromTo = void 0;
    /**
     * @param {?} value
     * @return {?}
     */
    this.df = function(value) {
      /** @type {Array} */
      var customErrors = [];
      if (value) {
        var modified = value;
        var field;
        for (field in modified) {
          if (modified.hasOwnProperty(field)) {
            customErrors.push({
              flag : modified[field],
              date : _.sd(field)
            });
          }
        }
      }
      return customErrors;
    };
    /**
     * @return {undefined}
     */
    this.loadUrlData = function() {
      var str = this.getFromToM.get(this);
      if (str) {
        var pathimportesc = str[0];
        var label = str[1];
        var req = this;
        var guess = this.symbol;
        /** @type {string} */
        var jsonp = "_touzibullbear_" + guess;
        var ids = this.selfDataUrl.replace("$symbol", guess).replace("$cb", "var%20" + jsonp + "=").replace("$from", pathimportesc).replace("$to", label).replace("$rn", String((new Date).getDate()));
        if (this.proxyCfg.usrObj.ssl) {
          ids = util.getSUrl(ids);
        }
        util.load(ids, function() {
          var pdataCur = window[jsonp];
          if (!req.urlData) {
            req.urlData = {
              day : []
            };
          }
          var otherArgs = req.df(pdataCur);
          /** @type {Array} */
          var names = req.urlData.day;
          names.splice.apply(names, [0, 0].concat(otherArgs));
          names.sort(function(b, a) {
            return b.date - a.date;
          });
          /** @type {boolean} */
          req.toReCalc = true;
          req.cb(req);
        });
      }
    };
    /**
     * @param {?} string
     * @return {?}
     */
    this.udf = function(string) {
      if (string) {
        var i;
        var keys = string.split(",");
        return keys && (keys.length > 1 && (i = [{
          date : _.sd(keys[0]),
          flag : keys[1]
        }])), i;
      }
    };
    /** @type {boolean} */
    var l = true;
    /** @type {number} */
    this.UPDATE_THRESHOLD = 3;
    /**
     * @return {undefined}
     */
    this.update = function() {
      if (l) {
        /** @type {boolean} */
        l = false;
      } else {
        if (++this.updateCount < this.UPDATE_THRESHOLD) {
          return;
        }
        if (this.updateCount >= this.UPDATE_THRESHOLD) {
          /** @type {number} */
          this.updateCount = 0;
        }
      }
      var helper = this;
      var end = this.symbol;
      /** @type {string} */
      var n = "hq_str_" + name + end;
      var source = this.selfDataUrlUpdate.replace("$symbol", end);
      if (this.proxyCfg.usrObj.ssl) {
        source = util.getSUrl(source);
      }
      util.load(source, function() {
        var source = window[n];
        var e = helper.udf(source);
        if (e) {
          helper.doUpdate(e);
        }
      });
    };
    /**
     * @param {Object} data
     * @param {Object} newData
     * @param {number} opt_attributes
     * @return {undefined}
     */
    this.updateData = function(data, newData, opt_attributes) {
      if (data && (newData && !(newData.length < 1))) {
        var cache = newData[newData.length - 1];
        if (data = data[0]) {
          if (_.stbd(data.date, cache.date)) {
            var prop;
            for (prop in data) {
              if (data.hasOwnProperty(prop)) {
                if ("undefined" != typeof cache[prop]) {
                  cache[prop] = data[prop];
                }
                /** @type {boolean} */
                cache.isFake = false;
              }
            }
          } else {
            if (data.date > cache.date) {
              this.newData(newData, data, opt_attributes);
            }
          }
        }
      }
    };
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      if (this.oriArr = key, this.urlData && this.toReCalc) {
        /** @type {boolean} */
        this.toReCalc = false;
        if (!this.datas) {
          /** @type {Array} */
          this.datas = [];
        }
        util.ca(this.selfArr);
        var v;
        var angle = this.urlData.day;
        var c = util.kUtil.adbd(angle, key, false, false);
        /** @type {number} */
        var b = 0;
        var i = key.length;
        for (;i > b;b++) {
          v = c[b];
          this.selfArr.push({
            flag : v ? Number(v.flag) : 1,
            isFake : v ? !!v.isFake : true
          });
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.setRange = function() {
      if (this.datas) {
        var start = this.viewState.start;
        var end = this.viewState.end;
        /** @type {number} */
        var length = end - start;
        for (;this.datas.length > length;) {
          this.datas.length--;
        }
        for (;this.datas.length < length;) {
          this.datas.push({});
        }
        /** @type {number} */
        var a = 0;
        /** @type {number} */
        var scaleRatio = 0;
        var dest = this.selfArr[start].flag;
        var max = config.calcA;
        var min = config.getArr;
        /** @type {number} */
        var remainder = 10;
        var index = start;
        for (;end > index;index++) {
          var data = this.datas[index - start];
          data.date = this.oriArr[index].date;
          var vec = this.selfArr[index].flag;
          var c = this.oriArr[index];
          var n = max(min(this.oriArr.slice(0 > index - remainder + 1 ? 0 : index - remainder + 1, index + 1), "close", function(a) {
            return+a.toFixed(2);
          }));
          var timeNodeHtmlParser = c.close.toFixed(2);
          var len = c.open.toFixed(2);
          if (index != start) {
            var timeLibXmlJs = this.oriArr[index - 1].close.toFixed(2);
            if (vec == dest) {
              if (1 == vec) {
                /** @type {number} */
                a = (1 + (timeNodeHtmlParser - timeLibXmlJs) / timeLibXmlJs) * (1 + a) - 1;
              }
            } else {
              /** @type {number} */
              a = 0 == vec ? n > len ? ((len - timeLibXmlJs) / timeLibXmlJs + 1) * (1 + a) - 1 : ((n - timeLibXmlJs) / timeLibXmlJs + 1) * (1 + a) - 1 : len > n ? ((timeNodeHtmlParser - len) / len + 1) * (1 + a) - 1 : ((timeNodeHtmlParser - n) / n + 1) * (1 + a) - 1;
            }
          } else {
            if (1 == vec) {
              /** @type {number} */
              a = len > n ? ((timeNodeHtmlParser - len) / len + 1) * (1 + a) - 1 : ((timeNodeHtmlParser - n) / n + 1) * (1 + a) - 1;
            }
          }
          dest = vec;
          if (index != start) {
            /** @type {number} */
            scaleRatio = (1 + c.percent) * (1 + scaleRatio) - 1;
          }
          /** @type {number} */
          data[i] = 100 * a;
          /** @type {number} */
          data[propName] = 100 * scaleRatio;
          var key;
          for (key in this.selfArr[index]) {
            if (this.selfArr[index].hasOwnProperty(key)) {
              data[key] = this.selfArr[index][key];
            }
          }
        }
        this.syncI();
      }
    };
    /**
     * @param {boolean} recurring
     * @param {boolean} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      /**
       * @param {(Array|number)} data
       * @param {string} n
       * @param {boolean} recurring
       * @return {?}
       */
      function after(data, n, recurring) {
        var l = data.length;
        var close = data[l - 1][n];
        /** @type {number} */
        var e = l - 1;
        var r = data.length;
        for (;r--;) {
          var open = data[r][n];
          if (recurring) {
            if (open > close) {
              close = open;
              e = r;
            }
          } else {
            if (close > open) {
              close = open;
              e = r;
            }
          }
        }
        return e;
      }
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @param {number} x
       * @param {number} i
       * @param {number} width
       * @param {number} size
       * @return {undefined}
       */
      function draw(ctx, x, i, width, size) {
        ctx.moveTo(x, i + size);
        ctx.lineTo(x - width, i + Math.sqrt(3) * width + size);
        ctx.lineTo(x + width, i + Math.sqrt(3) * width + size);
        ctx.lineTo(x, i + size);
      }
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @param {number} x
       * @param {number} height
       * @param {number} width
       * @param {number} y
       * @return {undefined}
       */
      function update(ctx, x, height, width, y) {
        ctx.moveTo(x, height - y);
        ctx.lineTo(x - width, height - Math.sqrt(3) * width - y);
        ctx.lineTo(x + width, height - Math.sqrt(3) * width - y);
        ctx.lineTo(x, height - y);
      }
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var context = this.line;
        context.clear(true, r.PARAM.getHd());
        var mat;
        var dest;
        var max;
        var min = this.viewState.start;
        var end = this.viewState.end;
        var id = util.hex2dec(this.customArr[0].color, 0.5);
        var blocks = util.hex2dec(this.customArr[1].color, 0.5);
        max = min;
        dest = this.datas[0].flag;
        var n = min;
        for (;end > n;n++) {
          if (this.datas[n - min].isFake && n != end - 1) {
            max = n;
          } else {
            if (mat = this.datas[n - min].flag, mat != dest) {
              context.beginPath();
              /** @type {number} */
              var vLine2 = (this.oriArr[n].ix + this.oriArr[n - 1].ix) / 2;
              /** @type {number} */
              var y0 = (this.oriArr[n].cy + this.oriArr[n - 1].cy) / 2;
              if (max != min) {
                /** @type {number} */
                var ex = (this.oriArr[max].ix + this.oriArr[max - 1].ix) / 2;
                /** @type {number} */
                var hly = (this.oriArr[max].cy + this.oriArr[max - 1].cy) / 2;
              } else {
                ex = this.oriArr[max].ix;
                hly = this.oriArr[max].cy;
              }
              if (context.moveTo(vLine2, y0), context.lineTo(ex, hly), 1 == dest) {
                var i = after(this.oriArr.slice(max, n), "high", true) + max;
                context.lineTo(this.oriArr[i].ix, this.oriArr[i].hy);
                /** @type {boolean} */
                var w = this.oriArr[n].cy == this.oriArr[i].hy;
                if (w) {
                  context.newStyle([id]);
                } else {
                  context.newFillStyle([id]);
                }
              } else {
                i = after(this.oriArr.slice(max, n), "low", false) + max;
                context.lineTo(this.oriArr[i].ix, this.oriArr[i].ly);
                /** @type {boolean} */
                w = this.oriArr[n].cy == this.oriArr[i].ly;
                if (w) {
                  context.newStyle([blocks]);
                } else {
                  context.newFillStyle([blocks]);
                }
              }
              if (w) {
                context.stroke();
              } else {
                context.fill();
              }
              max = n;
            }
            if (n == end - 1 && !this.datas[n - min].isFake || n == end - 2 && this.datas[n - min + 1].isFake) {
              context.beginPath();
              vLine2 = this.oriArr[n].ix;
              y0 = this.oriArr[n].cy;
              if (mat != dest) {
                /** @type {number} */
                ex = (this.oriArr[n].ix + this.oriArr[n - 1].ix) / 2;
                /** @type {number} */
                hly = (this.oriArr[n].cy + this.oriArr[n - 1].cy) / 2;
                context.moveTo(vLine2, y0);
                context.lineTo(ex, hly);
                if (1 == mat) {
                  context.lineTo(this.oriArr[n].ix, this.oriArr[n].hy);
                  /** @type {boolean} */
                  w = this.oriArr[n].cy == this.oriArr[n].hy;
                  if (w) {
                    context.newStyle([id]);
                  } else {
                    context.newFillStyle([id]);
                  }
                } else {
                  context.lineTo(this.oriArr[n].ix, this.oriArr[n].ly);
                  /** @type {boolean} */
                  w = this.oriArr[n].cy == this.oriArr[n].ly;
                  if (w) {
                    context.newStyle([blocks]);
                  } else {
                    context.newFillStyle([blocks]);
                  }
                }
              } else {
                if (min == max) {
                  ex = this.oriArr[max].ix;
                  hly = this.oriArr[max].cy;
                } else {
                  /** @type {number} */
                  ex = (this.oriArr[max].ix + this.oriArr[max - 1].ix) / 2;
                  /** @type {number} */
                  hly = (this.oriArr[max].cy + this.oriArr[max - 1].cy) / 2;
                }
                context.moveTo(vLine2, y0);
                context.lineTo(ex, hly);
                if (1 == mat) {
                  i = after(this.oriArr.slice(max, n + 1), "high", true) + max;
                  context.lineTo(this.oriArr[i].ix, this.oriArr[i].hy);
                  /** @type {boolean} */
                  w = this.oriArr[n].cy == this.oriArr[i].hy;
                  if (w) {
                    context.newStyle([id]);
                  } else {
                    context.newFillStyle([id]);
                  }
                } else {
                  i = after(this.oriArr.slice(max, n + 1), "low", false) + max;
                  context.lineTo(this.oriArr[i].ix, this.oriArr[i].ly);
                  /** @type {boolean} */
                  w = this.oriArr[n].cy == this.oriArr[i].ly;
                  if (w) {
                    context.newStyle([blocks]);
                  } else {
                    context.newFillStyle([blocks]);
                  }
                }
              }
              if (w) {
                context.stroke();
              } else {
                context.fill();
              }
            }
            dest = mat;
          }
        }
        /** @type {number} */
        var g = r.DIMENSION.w_k / Math.max(this.datas.length, r.PARAM.minCandleNum);
        /** @type {number} */
        g = g > 5 ? 5 : g;
        /** @type {number} */
        g = 2 > g ? 2 : g;
        /** @type {number} */
        var maxSize = 3;
        var lowest = this.customArr[0].color;
        var highest = this.customArr[1].color;
        dest = this.datas[0].flag;
        context.beginPath();
        n = min;
        for (;end > n;n++) {
          mat = this.datas[n - min].flag;
          if (mat != dest) {
            if (1 == mat) {
              draw(context, this.oriArr[n].ix, this.oriArr[n].ly, g, maxSize);
            }
          }
          dest = mat;
        }
        context.newFillStyle([lowest]);
        context.fill();
        dest = this.datas[0].flag;
        context.beginPath();
        n = min;
        for (;end > n;n++) {
          mat = this.datas[n - min].flag;
          if (mat != dest) {
            if (0 == mat) {
              update(context, this.oriArr[n].ix, this.oriArr[n].hy, g, maxSize);
            }
          }
          dest = mat;
        }
        context.newFillStyle([highest]);
        context.fill();
        /** @type {string} */
        var text = "转多，建议关注";
        /** @type {string} */
        var columnTitle = "转空，风险较高";
        var ctx = context.getG();
        /** @type {string} */
        ctx.font = r.STYLE.FONT_SIZE + "px " + r.STYLE.FONT_FAMILY;
        var width = ctx.measureText(text).width;
        /** @type {number} */
        var d = 10 / Math.sqrt(3);
        /** @type {number} */
        var annotation_y = 10;
        /** @type {number} */
        var base = 5;
        /** @type {number} */
        var left = d * base;
        ctx.beginPath();
        /** @type {string} */
        ctx.fillStyle = "#000";
        ctx.fillText(text, left, annotation_y);
        left += width + d * (base - 2);
        ctx.fillText(columnTitle, left, annotation_y);
        /** @type {number} */
        left = d * (base - 1.5);
        context.beginPath();
        context.newFillStyle([lowest]);
        draw(context, left, 1, d, 0);
        context.fill();
        left += width + d * (base - 2);
        context.beginPath();
        context.newFillStyle([highest]);
        update(context, left, annotation_y + 1, d, 0);
        context.fill();
        if (recurring) {
          context.drawBg(this.__iOffsetX);
        }
      }
    };
    this.loadUrlData();
  }
  /**
   * @param {?} e
   * @param {?} key
   * @param {?} callback
   * @return {undefined}
   */
  function post(e, key, callback) {
    update.call(this, e, key);
    /** @type {string} */
    this.name = "TZYS";
    /** @type {string} */
    this.alias = "多空反转";
    this.cb = callback;
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        this.setRange();
        var keys;
        var lb;
        var i;
        var j;
        var la = this.datas.length;
        /** @type {number} */
        var t = Number.MAX_VALUE;
        /** @type {number} */
        var key = -Number.MAX_VALUE;
        /** @type {number} */
        lb = 0;
        for (;la > lb;lb++) {
          keys = this.datas[lb];
          i = this.customArr.length;
          for (;i--;) {
            j = this.customArr[i].prop;
            if (j) {
              if (keys[j] > key) {
                key = keys[j];
              }
              if (keys[j] < t) {
                t = keys[j];
              }
            }
          }
        }
        this.labelMaxP = this.maxPrice = key;
        this.labelMinP = this.minPrice = t;
        /** @type {number} */
        var k = key - t;
        /** @type {number} */
        lb = 0;
        for (;la > lb;lb++) {
          keys = this.datas[lb];
          i = this.customArr.length;
          for (;i--;) {
            j = this.customArr[i].prop;
            if (j) {
              /** @type {number} */
              keys[j + "y"] = this.h * (key - keys[j]) / k;
            }
          }
        }
      }
    };
    /**
     * @param {boolean} recurring
     * @param {boolean} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        this.line.clear(true, this.cfg.PARAM.getHd());
        /** @type {number} */
        var hly = this.h * this.maxPrice / (this.maxPrice - this.minPrice) - 0.5;
        this.line.newStyle(this.cfg.COLOR.GRID, true, 2);
        this.line.moveTo(0, hly);
        this.line.lineTo(this.cfg.DIMENSION.w_k, hly);
        this.line.stroke();
        var d;
        var l1 = this.datas.length;
        /** @type {number} */
        var chunk = this.cfg.DIMENSION.w_k / Math.max(l1, this.cfg.PARAM.minCandleNum);
        var i = this.customArr.length;
        for (;i--;) {
          /** @type {string} */
          var key = this.customArr[i].prop + "y";
          /** @type {number} */
          d = this.__iOffsetX - chunk * dt;
          this.line.newStyle(this.customArr[i].color, true, 1.5);
          /** @type {number} */
          var inputIndex = 0;
          for (;l1 > inputIndex;inputIndex++) {
            if (0 == inputIndex) {
              this.line.moveTo(d, this.datas[inputIndex][key]);
            } else {
              this.line.lineTo(d, this.datas[inputIndex][key]);
            }
            d += chunk;
          }
          this.line.stroke();
        }
        if (recurring) {
          this.line.drawBg(this.__iOffsetX);
        }
      }
    };
  }
  /**
   * @param {?} event
   * @param {Event} oldValue
   * @return {undefined}
   */
  function change(event, oldValue) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 26,
      color : "#75B2A3",
      prop : "vr",
      idct : "VR"
    }, {
      v : 6,
      color : "#F8B82E",
      prop : "mavr",
      idct : "MAVR"
    }];
    self.call(this, event, oldValue);
    /** @type {string} */
    this.name = "VR";
    if ("k" != oldValue.type) {
      /** @type {string} */
      this.sname = "T_" + this.name;
    }
    this.vaObj = {
      upper : 200,
      lower : 70,
      glv : 350
    };
    var filter = config.calcMA;
    var fn = config.calcSUM;
    var color = config.calcREF;
    var decodeURIComponent = config.getArr;
    var callback = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var path = this.gdsd(key);
      var value = this.customArr[0].v;
      var udataCur = this.customArr[1].v;
      var a = decodeURIComponent(path, this.tkProp.close);
      var json = decodeURIComponent(path, "volume");
      var b = color(a, 1);
      /** @type {Array} */
      var res = [];
      /** @type {Array} */
      var result = [];
      /** @type {Array} */
      var val = [];
      /** @type {number} */
      var prop = 0;
      var al = a.length;
      for (;al > prop;prop++) {
        res.push(a[prop] > b[prop] ? json[prop] : 0);
        result.push(a[prop] < b[prop] ? json[prop] : 0);
        val.push(a[prop] == b[prop] ? json[prop] : 0);
      }
      res = fn(res, value);
      result = fn(result, value);
      val = fn(val, value);
      var ok = callback(callback(callback(callback(res, 2, "*"), val, "+"), 100, "*"), callback(callback(result, 2, "*"), val, "+"), "/");
      var matched = filter(ok, udataCur);
      this.oriArr = path;
      if (this.datas) {
        util.ca(this.datas);
      } else {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = path.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          vr : ok[i],
          mavr : matched[i]
        };
        /** @type {boolean} */
        this.selfArr[i][attr] = path[i].volume < 0;
      }
    };
  }
  /**
   * @param {?} mapper
   * @param {?} callback
   * @return {undefined}
   */
  function map(mapper, callback) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 10,
      color : "#3D85C6",
      prop : "wr1",
      idct : "WR1"
    }, {
      v : 6,
      color : "#84C84B",
      prop : "wr2",
      idct : "WR2"
    }];
    self.call(this, mapper, callback);
    /** @type {string} */
    this.name = "WR";
    this.vaObj = {
      min : 0,
      max : 100,
      upper : 80,
      lower : 20
    };
    var fn = config.calcHHV;
    var channel = config.calcLLV;
    var check = config.getArr;
    var debug = config.operateArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var restoreScript = current[0].v;
      var which = current[1].v;
      var val = check(key, "close");
      var err = check(key, "high");
      var camelKey = check(key, "low");
      var result = debug(debug(debug(fn(err, restoreScript), val, "-"), 100, "*"), debug(fn(err, restoreScript), channel(camelKey, restoreScript), "-"), "/");
      var c = debug(debug(debug(fn(err, which), val, "-"), 100, "*"), debug(fn(err, which), channel(camelKey, which), "-"), "/");
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var eventName = 0;
      var ll = key.length;
      for (;ll > eventName;eventName++) {
        this.selfArr[eventName] = {
          wr1 : result[eventName],
          wr2 : c[eventName]
        };
      }
    };
  }
  /**
   * @param {?} a
   * @param {?} n
   * @return {undefined}
   */
  function e(a, n) {
    /** @type {Array} */
    this.DEFAULT_ARR = [{
      v : 24,
      color : "#fe6623",
      prop : "wvad",
      idct : "WVAD"
    }, {
      v : 6,
      color : "#00c1eb",
      prop : "wvadma",
      idct : "WVADMA"
    }];
    self.call(this, a, n);
    /** @type {string} */
    this.name = "WVAD";
    this.vaObj = {
      glv : 0
    };
    var callback = config.calcSUM;
    var filter = config.calcMA;
    var debug = config.operateArr;
    var fn = config.getArr;
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var current = this.customArr;
      var value = current[0].v;
      var udataCur = current[1].v;
      var camelKey = fn(key, "close");
      var val = fn(key, "open");
      var str = fn(key, "high");
      var file = fn(key, "low");
      var result = fn(key, "volume");
      var ok = debug(callback(debug(debug(debug(camelKey, val, "-"), debug(str, file, "-"), "/"), result, "*"), value), 1E4, "/");
      var matched = filter(ok, udataCur);
      this.oriArr = key;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      /** @type {number} */
      var i = 0;
      var l = key.length;
      for (;l > i;i++) {
        this.selfArr[i] = {
          wvad : ok[i],
          wvadma : matched[i]
        };
      }
    };
  }
  /**
   * @param {?} args
   * @param {?} params
   * @return {undefined}
   */
  function getData(args, params) {
    /** @type {string} */
    this.storageVer = "v2";
    self.call(this, args, params, {
      nu : true
    });
    /** @type {string} */
    this.name = "VOLUME";
    /** @type {string} */
    this.alias = "成交";
    var item = this;
    /** @type {string} */
    var value = "volume";
    /** @type {string} */
    var desc = "MA";
    /** @type {string} */
    var path = "#888887";
    !function() {
      /**
       * @return {undefined}
       */
      var init = function() {
        /** @type {Array} */
        var origValue = [{
          color : path
        }, {
          v : 5,
          color : "#FC9CB8"
        }, {
          v : 10,
          color : "#12BDD9"
        }];
        client.save({
          uid : [item.cfg.uid, (new Date).getTime()].join("|"),
          key : item.STORAGE_PREFIX + (item.sname || item.name) + "_" + item.storageVer,
          value : origValue
        });
      };
      client.load({
        uid : [item.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
        key : item.STORAGE_PREFIX + (item.sname || item.name) + "_" + item.storageVer
      }, function(dataAndEvents) {
        if (!dataAndEvents) {
          init();
        }
      }, true);
    }();
    /**
     * @return {undefined}
     */
    this.generateSettings = function() {
      var average = item.name.toLowerCase();
      /** @type {string} */
      var space = "MA";
      /** @type {string} */
      var orig = path;
      if (item.customArr = [], item.param && item.param.length > 0) {
        orig = item.param[0].color || path;
        /** @type {number} */
        var i = 0;
        var l = item.param.length;
        for (;l > i;i++) {
          var v = item.param[i].v;
          if (!isNaN(v)) {
            if (v > 0) {
              item.customArr.push({
                v : v,
                color : item.param[i].color || "#" + util.randomColor(),
                prop : average + v,
                idct : space + v,
                desc : desc
              });
            }
          }
        }
      }
      item.customArr.reverse();
      item.customArr.push({
        v : 0 / 0,
        color : orig,
        prop : value,
        idct : "VOL"
      });
      item.customArr.reverse();
    };
    /**
     * @param {Array} data
     * @return {undefined}
     */
    this.initAndCalcAll = function(data) {
      /** @type {Array} */
      this.oriArr = data;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var x = item.name.toLowerCase();
      var min = data.length;
      /** @type {number} */
      var lastIndex = 0;
      var cnl = this.customArr.length;
      for (;cnl > lastIndex;lastIndex++) {
        var saturation;
        /** @type {number} */
        var delta = 0;
        var max = this.customArr[lastIndex].v;
        /** @type {number} */
        var i = 0;
        for (;max && min > i;i++) {
          var result = data[i];
          if (delta += Number(result[value]), i >= max - 1) {
            /** @type {number} */
            saturation = delta / max;
            var state = data[i - max + 1];
            delta -= Number(state[value]);
          } else {
            /** @type {number} */
            saturation = delta / (i + 1);
          }
          var text = this.selfArr[i] = this.selfArr[i] || {};
          /** @type {number} */
          text[x + max] = saturation;
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        var j = this.viewState.start;
        var index = this.viewState.end;
        /** @type {number} */
        var col = index - j;
        for (;this.datas.length > col;) {
          this.datas.length--;
        }
        for (;this.datas.length < col;) {
          this.datas.push({});
        }
        var type;
        var data;
        /** @type {number} */
        var e = -Number.MAX_VALUE;
        /** @type {number} */
        var e0 = 0;
        type = j;
        for (;index > type;type++) {
          data = this.datas[type - j];
          data.volume = this.oriArr[type].volume;
          if (data.volume > e) {
            e = data.volume;
          }
          var key;
          for (key in this.selfArr[type]) {
            if (this.selfArr[type].hasOwnProperty(key)) {
              data[key] = this.selfArr[type][key];
              if (data[key] > e) {
                e = data[key];
              }
            }
          }
        }
        if (0 > e) {
          /** @type {number} */
          e = 0;
        }
        var cell = util.xh5_ADJUST_HIGH_LOW.c(e, e0, 0, true);
        e = cell[0];
        /** @type {number} */
        var n1 = e - e0;
        type = j;
        for (;index > type;type++) {
          data = this.datas[type - j];
          var event = this.oriArr[type];
          data.date = event.date;
          data.kke_cs = event.kke_cs;
          data.voly = $.vp(event.volume, e, this.h);
          var i = this.customArr.length;
          for (;i--;) {
            var p = this.customArr[i].prop;
            /** @type {number} */
            data[p + "y"] = this.h * (e - data[p]) / n1;
          }
        }
        this.labelMaxP = e;
        /** @type {number} */
        this.labelMinP = e0;
        this.syncI();
      }
    };
    /**
     * @param {boolean} recurring
     * @param {?} state
     * @return {undefined}
     */
    this.draw = function(recurring, state) {
      if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
        var context = this.line;
        context.clear(true, args.PARAM.getHd());
        var d;
        var y;
        var data;
        var PI2;
        var a = this.datas.length;
        /** @type {number} */
        var chunk = args.DIMENSION.w_k / Math.max(a, args.PARAM.minCandleNum);
        var h = this.h;
        /** @type {number} */
        var er = 0.6 * chunk;
        /** @type {boolean} */
        var hollow = "hollow" == args.datas.candle;
        /** @type {number} */
        var K_FALL = 0;
        for (;2 > K_FALL;K_FALL++) {
          PI2 = 0 == K_FALL ? args.COLOR.K_FALL : args.COLOR.K_RISE;
          /** @type {number} */
          d = this.__iOffsetX - chunk;
          context.beginPath();
          /** @type {number} */
          var k = 0;
          for (;a > k;k++) {
            data = this.datas[k];
            y = data.voly;
            if (0 == K_FALL) {
              if (-1 == data.kke_cs) {
                context.drawVStickRect(d, y, er, h - y, PI2, true);
              }
            } else {
              if (data.kke_cs >= 0) {
                context.drawVStickRect(d, y, er, h - y, PI2, !hollow);
              }
            }
            d += chunk;
          }
          context.stroke();
        }
        /** @type {number} */
        var key = 1;
        var cnl = this.customArr.length;
        for (;cnl > key;key++) {
          /** @type {string} */
          var i = this.customArr[key].prop + "y";
          /** @type {number} */
          d = this.__iOffsetX - chunk * dt;
          context.newStyle(this.customArr[key].color, true, 1.3);
          /** @type {number} */
          var b = 0;
          for (;a > b;b++) {
            if (0 == b) {
              context.moveTo(d, this.datas[b][i]);
            } else {
              context.lineTo(d, this.datas[b][i]);
            }
            d += chunk;
          }
          context.stroke();
        }
        context.drawBg(this.__iOffsetX);
      }
    };
  }
  /**
   * @param {?} tx
   * @param {?} success
   * @return {undefined}
   */
  function load(tx, success) {
    /** @type {string} */
    this.storageVer = "v2";
    self.call(this, tx, success, {
      nu : true
    });
    /** @type {string} */
    this.name = "TVOL";
    /** @type {string} */
    this.sname = "T_TVOL";
    /** @type {string} */
    this.alias = "成交";
    var item = this;
    /** @type {string} */
    var value = "volume";
    /** @type {string} */
    var desc = "MA";
    /** @type {string} */
    var path = "#888887";
    !function() {
      /**
       * @return {undefined}
       */
      var success = function() {
        /** @type {Array} */
        var origValue = [{
          color : path
        }, {
          v : 10,
          color : "#12BDD9"
        }];
        client.save({
          uid : [item.cfg.uid, (new Date).getTime()].join("|"),
          key : item.STORAGE_PREFIX + (item.sname || item.name) + "_" + item.storageVer,
          value : origValue
        });
      };
      client.load({
        uid : [item.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
        key : item.STORAGE_PREFIX + (item.sname || item.name) + "_" + item.storageVer
      }, function(dataAndEvents) {
        if (!dataAndEvents) {
          success();
        }
      }, true);
    }();
    /**
     * @return {undefined}
     */
    this.generateSettings = function() {
      var average = item.name.toLowerCase();
      /** @type {string} */
      var space = "MA";
      /** @type {string} */
      var orig = path;
      if (item.customArr = [], item.param && item.param.length > 0) {
        orig = item.param[0].color || path;
        /** @type {number} */
        var i = 0;
        var l = item.param.length;
        for (;l > i;i++) {
          var v = item.param[i].v;
          if (!isNaN(v)) {
            if (v > 0) {
              item.customArr.push({
                v : v,
                color : item.param[i].color || "#" + util.randomColor(),
                prop : average + v,
                idct : space + v,
                desc : desc
              });
            }
          }
        }
      }
      item.customArr.reverse();
      item.customArr.push({
        v : 0 / 0,
        color : orig,
        prop : value,
        idct : "VOL"
      });
      item.customArr.reverse();
    };
    /**
     * @param {?} key
     * @return {undefined}
     */
    this.initAndCalcAll = function(key) {
      var resultItems = this.gdsd(key);
      this.oriArr = resultItems;
      if (!this.datas) {
        /** @type {Array} */
        this.datas = [];
      }
      util.ca(this.selfArr);
      var prefix = item.name.toLowerCase();
      var l = resultItems.length;
      /** @type {number} */
      var lastIndex = 0;
      var cnl = this.customArr.length;
      for (;cnl > lastIndex;lastIndex++) {
        var s;
        /** @type {number} */
        var delta = 0;
        var add = this.customArr[lastIndex].v;
        /** @type {number} */
        var i = 0;
        for (;add && l > i;i++) {
          var result = resultItems[i];
          if (delta += Number(result[value]), i >= add - 1) {
            /** @type {number} */
            s = delta / add;
            var keys = resultItems[i - add + 1];
            delta -= Number(keys[value]);
          } else {
            /** @type {number} */
            s = delta / (i + 1);
          }
          var div = this.selfArr[i] = this.selfArr[i] || {};
          /** @type {number} */
          div[prefix + add] = s;
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.drawCalc = function() {
      if (this.datas) {
        /** @type {number} */
        var from = this.viewState.start * this.disMod;
        /** @type {number} */
        var to = this.viewState.end * this.disMod;
        /** @type {number} */
        var offset = to - from;
        for (;this.datas.length > offset;) {
          this.datas.length--;
        }
        for (;this.datas.length < offset;) {
          this.datas.push({});
        }
        var i;
        var p;
        /** @type {number} */
        var x = -Number.MAX_VALUE;
        /** @type {number} */
        i = from;
        for (;to > i;i++) {
          p = this.datas[i - from];
          p.volume = this.oriArr[i].volume;
          if (p.volume > x) {
            x = p.volume;
          }
          var k;
          for (k in this.selfArr[i]) {
            if (this.selfArr[i].hasOwnProperty(k)) {
              p[k] = this.selfArr[i][k];
              if (p[k] > x) {
                x = p[k];
              }
            }
          }
        }
        if (0 > x) {
          /** @type {number} */
          x = 0;
        }
        var xs = util.xh5_ADJUST_HIGH_LOW.c(x, 0, 0, true);
        x = xs[0];
        var n;
        /** @type {number} */
        i = from;
        for (;to > i;i++) {
          p = this.datas[i - from];
          var s = this.oriArr[i];
          n = 0 == i ? s.prevclose || s.price : this.oriArr[i - 1].price;
          /** @type {number} */
          p.kke_cs = s.price > n ? 1 : s.price < n ? -1 : 0;
          p.price = s.price;
          p.voly = $.vp(s.volume, x, this.h);
          if (this.h - p.voly < 0.5) {
            if (s.volume > 0) {
              /** @type {number} */
              p.voly = Math.floor(p.voly);
              p.voly -= 1;
            }
          }
          var j = this.customArr.length;
          for (;j--;) {
            var A = this.customArr[j].prop;
            /** @type {number} */
            p[A + "y"] = this.h * (x - p[A]) / x;
          }
        }
        this.labelMaxP = x;
        /** @type {number} */
        this.labelMinP = 0;
        this.syncI();
      }
    };
    /**
     * @return {undefined}
     */
    this.draw = function() {
      if (this.datas) {
        var context = this.line;
        context.clear(true, tx.PARAM.getHd());
        var d;
        var y;
        var args;
        var PI2;
        var cnl = this.datas.length;
        /** @type {number} */
        var chunk = tx.DIMENSION.w_t / cnl;
        var h = this.h;
        /** @type {number} */
        var top = chunk * chunkSize;
        /** @type {number} */
        var expectedNumberOfNonCommentArgs = -1;
        /** @type {number} */
        var f = 0;
        for (;3 > f;f++) {
          switch(expectedNumberOfNonCommentArgs) {
            case -1:
              PI2 = tx.COLOR.T_FALL;
              break;
            case 0:
              PI2 = tx.COLOR.T_N;
              break;
            case 1:
              PI2 = tx.COLOR.T_RISE;
          }
          /** @type {number} */
          d = 0;
          context.beginPath();
          /** @type {number} */
          var k = 0;
          for (;cnl > k;k++) {
            args = this.datas[k];
            if (args.volume >= 0) {
              y = args.voly;
              if (args.kke_cs == expectedNumberOfNonCommentArgs) {
                context.drawVStickC(d, y, top, h - y, PI2);
              }
            }
            d += chunk;
          }
          context.stroke();
          expectedNumberOfNonCommentArgs++;
        }
        /** @type {number} */
        var j = 1;
        var spaces = this.customArr.length;
        for (;spaces > j;j++) {
          /** @type {string} */
          var i = this.customArr[j].prop + "y";
          /** @type {number} */
          d = top;
          context.newStyle(this.customArr[j].color, true, 1.3);
          /** @type {number} */
          var key = 0;
          for (;cnl > key;key++) {
            args = this.datas[key];
            if (args.volume >= 0) {
              if (0 == key) {
                context.moveTo(d, args[i]);
              } else {
                context.lineTo(d, args[i]);
              }
            }
            d += chunk;
          }
          context.stroke();
        }
        context.drawBg();
      }
    };
  }
  /**
   * @param {Object} self
   * @return {?}
   */
  function create(self) {
    /**
     * @return {undefined}
     */
    function load() {
      var params = {
        /** @type {function (?, Event): undefined} */
        BBIBOLL : Test,
        /** @type {function (?, Event): undefined} */
        BOLL : init,
        /** @type {function (?, ?, ?): undefined} */
        CHIPCOST : onComplete,
        /** @type {function (?, ?, ?): undefined} */
        DITC : Player,
        /** @type {function (?, Event): undefined} */
        EXPMA : ready,
        /** @type {function (?, Event): undefined} */
        MA : text,
        /** @type {function (?, ?, ?): undefined} */
        PRESS : World,
        /** @type {function (?, ?): undefined} */
        SAR : Scene,
        /** @type {function (?, ?, ?): undefined} */
        TZY : update,
        /** @type {function (?, ?): undefined} */
        DPDK : table,
        /** @type {function (?, ?, ?): undefined} */
        EWI : exports,
        /** @type {function (?, ?, ?): undefined} */
        RGL : process,
        /** @type {function (?, ?, ?): undefined} */
        TECHFLOW : Plot
      };
      jQuery.auth(params);
      /** @type {Array} */
      var res = [];
      /** @type {boolean} */
      var newVal = true;
      /**
       * @return {undefined}
       */
      var flush = function() {
        for (;matched.length;) {
          matched.length--;
        }
        /** @type {number} */
        var i = res.length;
        for (;i--;) {
          var m = res[i];
          matched.push({
            name : m.name,
            param : m.param
          });
        }
      };
      /**
       * @param {Object} p
       * @return {undefined}
       */
      var require = function(p) {
        if (newVal) {
          var camelKey = cfg.datas.isT ? a.tDb.get() : a.kDb.get();
          if (camelKey) {
            p.initAndCalcAll(camelKey, false);
            p.setRange();
            p.setPricePos(null);
            p.draw();
          }
        }
      };
      /**
       * @param {Object} data
       * @return {undefined}
       */
      var fail = function(data) {
        if (data) {
          var name = data.name;
          if (name) {
            name = name.toUpperCase();
            var editor;
            /** @type {number} */
            var i = res.length;
            for (;i--;) {
              if (res[i].name == name) {
                editor = res[i];
                break;
              }
            }
            if (!editor) {
              if (!util.isFunc(params[name])) {
                return;
              }
              editor = new params[name](cfg, doc, require);
              /** @type {boolean} */
              editor.asPChart = true;
              res.push(editor);
            }
            editor.newParam(data.param);
            flush();
            jQuery.doStc(data);
          }
        }
      };
      /**
       * @param {Object} doc
       * @param {boolean} dataAndEvents
       * @return {?}
       */
      var fn = function(doc, dataAndEvents) {
        if (doc) {
          var name = doc.name;
          if (name) {
            name = name.toUpperCase();
            /** @type {number} */
            var j = res.length;
            for (;j--;) {
              if (res[j].name == name) {
                var model = res.splice(j, 1)[0];
                return model.rfs(), model.getFromToM.reset(model), !dataAndEvents && flush(), void jQuery.doStc(doc, true);
              }
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      var checkDone = function() {
        var apn;
        /** @type {number} */
        var i = res.length;
        for (;i--;) {
          apn = res[i];
          apn.clearDraw();
        }
      };
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      this.linkData = function(recurring) {
        if (newVal) {
          var camelKey = cfg.datas.isT ? a.tDb.get() : a.kDb.get();
          if (camelKey) {
            var c;
            /** @type {number} */
            var i = res.length;
            for (;i--;) {
              c = res[i];
              c.initAndCalcAll(camelKey, recurring);
              if (recurring) {
                c.update();
              }
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.setDataRange = function() {
        if (newVal) {
          var p;
          /** @type {number} */
          var i = res.length;
          for (;i--;) {
            p = res[i];
            p.setRange();
            if (p.selfDataUrl) {
              p.loadUrlData();
            }
          }
        }
      };
      /**
       * @return {?}
       */
      this.getMaxMin = function() {
        /** @type {number} */
        var dedent = Number.MAX_VALUE;
        /** @type {number} */
        var min = -Number.MAX_VALUE;
        /** @type {boolean} */
        var applyMin = false;
        if (newVal) {
          var result;
          /** @type {number} */
          var i = res.length;
          for (;i--;) {
            result = res[i];
            if (!(result.separate > 0)) {
              if (!isNaN(result.minPrice)) {
                if (!isNaN(result.maxPrice)) {
                  /** @type {number} */
                  dedent = Math.min(result.minPrice, dedent);
                  /** @type {number} */
                  min = Math.max(result.maxPrice, min);
                  /** @type {boolean} */
                  applyMin = true;
                }
              }
            }
          }
        }
        return applyMin ? [min, dedent] : false;
      };
      /**
       * @param {Object} recurring
       * @return {undefined}
       */
      this.setPricePos = function(recurring) {
        if (newVal) {
          var apn;
          /** @type {number} */
          var i = res.length;
          for (;i--;) {
            apn = res[i];
            apn.setPricePos(recurring);
          }
        }
      };
      /**
       * @param {Object} doc
       * @return {undefined}
       */
      this.allDraw = function(doc) {
        if (newVal) {
          var self;
          /** @type {number} */
          var rl = res.length;
          for (;rl--;) {
            self = res[rl];
            self.draw(false, doc);
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.onResize = function() {
        var text;
        /** @type {number} */
        var rl = res.length;
        for (;rl--;) {
          text = res[rl];
          text.resize({
            h : cfg.DIMENSION.h_k,
            mh : cfg.DIMENSION.H_MA4K
          });
          if (newVal) {
            text.createPlayingData();
            text.draw();
          }
        }
      };
      /**
       * @param {number} self
       * @param {?} value
       * @param {?} a
       * @return {?}
       */
      this.indirectI = function(self, value, a) {
        if (!newVal) {
          /** @type {number} */
          self = 0 / 0;
        }
        var c;
        /** @type {Array} */
        var results = [];
        /** @type {number} */
        var i = res.length;
        for (;i--;) {
          c = res[i];
          results.push(c.interact(self, value, a));
        }
        return results;
      };
      /**
       * @return {?}
       */
      this.getLog = function() {
        return matched.reverse() || null;
      };
      /**
       * @return {?}
       */
      this.getExistingCharts = function() {
        return res;
      };
      /**
       * @return {undefined}
       */
      this.clear = function() {
        /** @type {number} */
        var i = res.length;
        for (;i--;) {
          fn(res[i], true);
        }
      };
      /**
       * @param {(Array|string)} arg
       * @param {?} srcFiles
       * @return {undefined}
       */
      this.createChart = function(arg, srcFiles) {
        if (!util.isArr(arg)) {
          /** @type {Array} */
          arg = [arg];
        }
        /** @type {number} */
        var i = 0;
        var a = arg.length;
        for (;a > i;i++) {
          fail(arg[i]);
        }
        cb(true, srcFiles);
      };
      /**
       * @param {Array} values
       * @return {undefined}
       */
      this.removeChart = function(values) {
        if (!values) {
          /** @type {Array} */
          values = [];
          /** @type {number} */
          var i = res.length;
          for (;i--;) {
            values.push({
              name : res[i].name
            });
          }
        }
        if (!util.isArr(values)) {
          /** @type {Array} */
          values = [values];
        }
        /** @type {number} */
        var id = 0;
        var valuesLen = values.length;
        for (;valuesLen > id;id++) {
          fn(values[id]);
        }
        cb();
      };
      /**
       * @param {?} tItem
       * @return {undefined}
       */
      this.showHide = function(tItem) {
        var oldVal = tItem.v;
        if (newVal !== oldVal) {
          newVal = oldVal;
          if (!newVal) {
            checkDone();
          }
        }
      };
    }
    var rchecked;
    var a = self.stockData;
    var len = self.iMgr;
    var cs = self.titleArea;
    var currentTarget = self.chartArea;
    var cb = self.cb;
    var cfg = self.cfg;
    var type = self.type;
    var c = self.usrObj;
    /** @type {Array} */
    var matched = [];
    var evt = {
      /**
       * @param {Object} value
       * @return {undefined}
       */
      edit : function(value) {
        rchecked.createChart(value);
      },
      /**
       * @param {Object} value
       * @return {undefined}
       */
      remove : function(value) {
        rchecked.removeChart(value);
      }
    };
    /**
     * @param {Function} e
     * @param {Object} req
     * @return {undefined}
     */
    var update = function(e, req) {
      if (cfg.custom.allow_indicator_edit) {
        if (events) {
          events.sendOriginalData({
            name : e.name,
            data : e.customArr,
            defaultData : e.DEFAULT_ARR
          }, evt);
          events.show(req);
        } else {
          var script = cfg.custom.indicatorpanel_url;
          if (c.ssl) {
            script = util.getSUrl(script, true);
          }
          events = new onSuccess({
            url : script,
            z : 10001
          }, debug(update, null, e, req));
        }
      }
    };
    var doc = {
      stock : a,
      cbInDC : cb,
      /** @type {function (Function, Object): undefined} */
      onClkTT : update,
      ctn : currentTarget,
      titleCtn : cs,
      titleW : 0 / 0,
      titleGap : 5,
      style : {
        position : "absolute",
        top : 0
      },
      iMgr : len,
      withHBg : false,
      mh : cfg.DIMENSION.H_MA4K,
      lz : cfg.PARAM.G_Z_INDEX + 1,
      usrObj : c,
      type : type
    };
    return rchecked = new load;
  }
  /**
   * @param {Object} t
   * @return {?}
   */
  function Node(t) {
    /**
     * @return {undefined}
     */
    function load() {
      var self = {
        /** @type {function (?, ?): undefined} */
        ASI : ret,
        /** @type {function (?, Event): undefined} */
        BBIBOLL : Test,
        /** @type {function (?, Event): undefined} */
        BIAS : listener,
        /** @type {function (?, Event): undefined} */
        BOLL : init,
        /** @type {function (?, ?): undefined} */
        BRAR : end,
        /** @type {function (?, ?): undefined} */
        CCI : f,
        /** @type {function (?, Event): undefined} */
        DMA : set,
        /** @type {function (?, ?): undefined} */
        DMI : Module,
        /** @type {function (?, ?): undefined} */
        DPDK : table,
        /** @type {function (?, ?, ?): undefined} */
        DPDKS : on,
        /** @type {function (?, ?): undefined} */
        EMV : param,
        /** @type {function (?, Event): undefined} */
        EXPMA : ready,
        /** @type {function (?, ?): undefined} */
        KDJ : chunk,
        /** @type {function (?, ?, ?): undefined} */
        KFLOW : fn,
        /** @type {function (?, Event): undefined} */
        MA : text,
        /** @type {function (?, Event): undefined} */
        MACD : setup,
        /** @type {function (?, Event): undefined} */
        OBV : next,
        /** @type {function (?, ?, ?): undefined} */
        PKFLOW : where,
        /** @type {function (?, Event): undefined} */
        PSY : c,
        /** @type {function (?, Event): undefined} */
        ROC : require,
        /** @type {function (?, Event): undefined} */
        RSI : walk,
        /** @type {function (?, ?): undefined} */
        SAR : Scene,
        /** @type {function (?, Event): undefined} */
        TRIX : scale,
        /** @type {function (?, ?, ?): undefined} */
        TZY : update,
        /** @type {function (?, ?, ?): undefined} */
        TZYS : post,
        /** @type {function (?, Event): undefined} */
        VR : change,
        /** @type {function (?, ?): undefined} */
        VOLUME : getData,
        /** @type {function (?, ?): undefined} */
        WR : map,
        /** @type {function (?, ?): undefined} */
        WVAD : e,
        /** @type {function (?, ?): undefined} */
        TOR : isObject,
        /** @type {function (?, ?): undefined} */
        ADL : Path,
        /** @type {function (?, ?): undefined} */
        LB : Particle,
        /** @type {function (?, ?): undefined} */
        POSITION : callback,
        /** @type {function (?, ?, ?): undefined} */
        TFLOW : draw,
        /** @type {function (?, ?, ?): undefined} */
        TTFLOW : handle,
        /** @type {function (?, ?): undefined} */
        TVOL : load,
        /** @type {function (Object, ?): undefined} */
        BLANKCTN : win
      };
      jQuery.auth(self);
      var source;
      /** @type {Array} */
      attrs = [];
      /**
       * @return {undefined}
       */
      var filter = function() {
        for (;matched.length;) {
          matched.length--;
        }
        var i = attrs.length;
        for (;i--;) {
          var val = attrs[i];
          matched.push({
            name : val.name,
            param : val.param
          });
        }
      };
      /**
       * @param {Object} e
       * @return {undefined}
       */
      var loaded = function(e) {
        var camelKey = cfg.datas.isT ? tag.tDb.get() : tag.kDb.get();
        if (camelKey) {
          e.initAndCalcAll(camelKey);
          e.drawCalc();
          e.draw(true);
        }
      };
      /**
       * @param {?} key
       * @return {?}
       */
      var promote = function(key) {
        var t;
        var i = attrs.length;
        for (;i--;) {
          if (attrs[i].name == key) {
            t = attrs[i];
            break;
          }
        }
        return t;
      };
      /**
       * @param {Object} doc
       * @return {undefined}
       */
      var initialize = function(doc) {
        if (doc) {
          var name = doc.name;
          if (name) {
            name = name.toUpperCase();
            if ("BLANKCTN" != name) {
              v = name;
            }
            var text = promote(name);
            if (!text) {
              var result = self[name];
              if (!util.isFunc(result)) {
                return;
              }
              if (result === win && source) {
                text = source;
                /** @type {string} */
                text.wrap.style.display = "";
              } else {
                text = new result(cfg, textMaterial, loaded);
                if (result === win) {
                  source = text;
                }
              }
              attrs.push(text);
              sibling.appendChild(text.wrap);
            }
            text.newParam(doc.param);
            filter();
            jQuery.doStc(doc);
          }
        }
      };
      /**
       * @param {Object} prop
       * @param {boolean} dataAndEvents
       * @return {?}
       */
      var clear = function(prop, dataAndEvents) {
        if (prop) {
          var name = prop.name;
          if (name) {
            name = name.toUpperCase();
            var i = attrs.length;
            for (;i--;) {
              if (attrs[i].name == name) {
                var model = attrs.splice(i, 1)[0];
                return model.rfs(), model.getFromToM.reset(model), !dataAndEvents && filter(), void jQuery.doStc(prop, true);
              }
            }
          }
        }
      };
      /**
       * @param {?} dataAndEvents
       * @return {undefined}
       */
      this.linkData = function(dataAndEvents) {
        var camelKey = cfg.datas.isT ? tag.tDb.get() : tag.kDb.get();
        if (camelKey) {
          var attr;
          var i = attrs.length;
          for (;i--;) {
            attr = attrs[i];
            attr.initAndCalcAll(camelKey);
            if (dataAndEvents) {
              attr.update();
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.setDataRange = function() {
        var attr;
        var i = attrs.length;
        for (;i--;) {
          attr = attrs[i];
          attr.drawCalc();
          if (attr.selfDataUrl) {
            attr.loadUrlData();
          }
        }
      };
      /**
       * @param {Object} doc
       * @return {undefined}
       */
      this.allDraw = function(doc) {
        var renderer;
        var i = attrs.length;
        for (;i--;) {
          renderer = attrs[i];
          renderer.draw(true, doc);
        }
      };
      /**
       * @param {?} h
       * @return {undefined}
       */
      this.onResize = function(h) {
        var H;
        var child;
        var i = attrs.length;
        for (;i--;) {
          child = attrs[i];
          H = h ? cfg.DIMENSION.H_T_G : child.h;
          child.resize({
            h : H,
            eh : cfg.DIMENSION.H_T_B
          });
          child.drawCalc();
          child.draw(true);
        }
      };
      /**
       * @param {number} i
       * @param {?} paras
       * @param {?} pid
       * @return {undefined}
       */
      this.indirectI = function(i, paras, pid) {
        var attr;
        var key = attrs.length;
        for (;key--;) {
          attr = attrs[key];
          attr.interact(i, paras, pid);
        }
      };
      /**
       * @return {?}
       */
      this.getLog = function() {
        return matched.reverse() || null;
      };
      /**
       * @return {?}
       */
      this.getExistingCharts = function() {
        return attrs;
      };
      /**
       * @return {undefined}
       */
      this.clear = function() {
        var i = attrs.length;
        for (;i--;) {
          clear(attrs[i], true);
        }
      };
      /**
       * @param {(Array|string)} arg
       * @param {?} srcFiles
       * @return {undefined}
       */
      this.createChart = function(arg, srcFiles) {
        if (!util.isArr(arg)) {
          /** @type {Array} */
          arg = [arg];
        }
        /** @type {number} */
        var p = 0;
        var a = arg.length;
        for (;a > p;p++) {
          initialize(arg[p]);
        }
        cb(true, srcFiles);
      };
      /**
       * @param {Array} values
       * @return {undefined}
       */
      this.removeChart = function(values) {
        if (!values) {
          /** @type {Array} */
          values = [];
          var i = attrs.length;
          for (;i--;) {
            values.push({
              name : attrs[i].name
            });
          }
        }
        if (!util.isArr(values)) {
          /** @type {Array} */
          values = [values];
        }
        /** @type {number} */
        var index = 0;
        var valuesLen = values.length;
        for (;valuesLen > index;index++) {
          clear(values[index]);
        }
        cb(true);
      };
    }
    var rchecked;
    var params;
    var tag = t.stockData;
    var res = t.iMgr;
    var sibling = t.subArea;
    var cb = t.cb;
    var type = t.type;
    var cfg = t.cfg;
    var self = t.usrObj;
    var html = t.initMgr;
    /** @type {Array} */
    var matched = [];
    /**
     * @param {Object} args
     * @param {Element} v
     * @param {number} moveX
     * @param {number} pY
     * @param {Event} fn
     * @return {undefined}
     */
    var draw = function(args, v, moveX, pY, fn) {
      if (!util.$CONTAINS(v, res.iHLineO.body) && v.appendChild(res.iHLineO.body), args.datas) {
        /** @type {number} */
        var mark = args.labelMaxP - pY / args.h * (args.labelMaxP - args.labelMinP);
        if (args.nu) {
          var o = util.strUtil.nu(args.labelMaxP);
          mark /= o[0];
        }
        res.iToD({
          mark : mark,
          x : moveX,
          y : pY,
          ox : cfg.DIMENSION.posX,
          oy : cfg.DIMENSION.H_T_T,
          e : fn
        });
      }
    };
    switch(type) {
      case "t":
        var t1 = self.tchartobject.t;
        params = t1 || ["LB", "TVOL", "MACD"];
        break;
      case "p":
        /** @type {Array} */
        params = ["LB", "POSITION", "TVOL", "MACD"];
        break;
      default:
        var k = self.tchartobject.k;
        params = k || defaultParams;
    }
    var v;
    var attrs;
    var offset;
    /** @type {string} */
    var errorName = "BLANKCTN";
    /**
     * @return {undefined}
     */
    var encode = function() {
      if (cfg.custom.tchart_tap && (attrs && v)) {
        var l = attrs.length;
        if (!(l > 2)) {
          var i = l;
          for (;i--;) {
            if (errorName == String(attrs[i].name)) {
              offset = i;
              break;
            }
          }
          if ("undefined" != typeof offset || 2 != l) {
            var length = params.length;
            i = length;
            for (;i--;) {
              if (v == params[i]) {
                rchecked.removeChart();
                if (++i >= length) {
                  /** @type {number} */
                  i = 0;
                }
                var param = params[i];
                rchecked.createChart(1 == l ? {
                  name : param
                } : 0 == offset ? [{
                  name : errorName
                }, {
                  name : param
                }] : [{
                  name : param
                }, {
                  name : errorName
                }]);
                break;
              }
            }
          }
        }
      }
    };
    var evt = {
      /**
       * @param {Object} value
       * @return {undefined}
       */
      edit : function(value) {
        rchecked.createChart(value);
      },
      /**
       * @param {Object} value
       * @return {undefined}
       */
      remove : function(value) {
        rchecked.removeChart(value);
      }
    };
    /**
     * @param {Function} options
     * @param {Object} req
     * @return {undefined}
     */
    var compile = function(options, req) {
      if (cfg.custom.allow_indicator_edit) {
        if (events) {
          events.sendOriginalData({
            name : options.name,
            data : options.customArr,
            defaultData : options.DEFAULT_ARR
          }, evt);
          events.show(req);
        } else {
          var script = cfg.custom.indicatorpanel_url;
          if (self.ssl) {
            script = util.getSUrl(script, true);
          }
          events = new onSuccess({
            url : script,
            z : 10001
          }, debug(compile, null, options, req));
        }
      }
    };
    var textMaterial = {
      fixIdctW : true,
      stock : tag,
      /** @type {function (Object, Element, number, number, Event): undefined} */
      iTo : draw,
      iMgr : res,
      /** @type {function (Function, Object): undefined} */
      onClkTT : compile,
      h : cfg.DIMENSION.H_T_G,
      eh : cfg.DIMENSION.H_T_B,
      withHBg : true,
      /** @type {function (): undefined} */
      onClkMain : encode,
      usrObj : self,
      type : type,
      initMgr : html
    };
    return rchecked = new load;
  }
  /**
   * @param {Object} obj
   * @param {?} callback
   * @return {undefined}
   */
  function onSuccess(obj, callback) {
    /**
     * @param {Object} obj
     * @param {string} value
     * @return {undefined}
     */
    function getter(obj, value) {
      var prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          obj[prop] = value + obj[prop];
        }
      }
    }
    /** @type {string} */
    var pageId = "sinafinancehtml5indicatorscfgpanel";
    /** @type {string} */
    var udataCur = "sinatkchart_indicatorscfgpanel~";
    var data = {
      LOADED : "loaded",
      HIDE : "hide",
      REMOVE : "remove",
      EDIT : "edit",
      DRAGSTART : "dragstart",
      DRAGGING : "dragging",
      PICKCOLOR : "pickcolor",
      COLORPICKED : "colorpicked",
      OPEN : "open"
    };
    getter(data, udataCur);
    var el;
    var error;
    var offsetLeft;
    var s;
    /** @type {number} */
    var sf_width = 250;
    /** @type {number} */
    var t = 0;
    /** @type {number} */
    var a = 80;
    /** @type {number} */
    var x = 35;
    /** @type {number} */
    var v = 25;
    if (ctx) {
      /**
       * @param {string} color
       * @param {Object} bench
       * @return {undefined}
       */
      ctx.onok = function(color, bench) {
        if (el) {
          if (el.contentWindow) {
            el.contentWindow.postMessage(JSON.stringify({
              cmd : data.COLORPICKED,
              data : {
                color : color.hex,
                target : bench
              }
            }), "*");
          }
        }
      };
    }
    /**
     * @param {MessageEvent} event
     * @return {undefined}
     */
    var show = function(event) {
      var current;
      try {
        /** @type {*} */
        current = JSON.parse(event.data);
      } catch (t) {
      }
      if (current && current.cmd) {
        switch(current.cmd) {
          case data.LOADED:
            if (callback) {
              callback();
            }
            break;
          case data.HIDE:
            /** @type {string} */
            el.style.display = "none";
            if (ctx) {
              ctx.hide();
            }
            break;
          case data.REMOVE:
          ;
          case data.EDIT:
            var key = current.cmd.split("~")[1];
            error[key](current.data);
            if (ctx) {
              ctx.hide();
            }
            break;
          case data.DRAGSTART:
            /** @type {number} */
            offsetLeft = +el.style.left.replace(/[^0-9.]/g, "");
            /** @type {number} */
            s = +el.style.top.replace(/[^0-9.]/g, "");
            break;
          case data.DRAGGING:
            var that = current.data;
            /** @type {string} */
            el.style.left = offsetLeft + that.movedX + "px";
            /** @type {string} */
            el.style.top = s + that.movedY + "px";
            break;
          case data.PICKCOLOR:
            that = current.data;
            if (ctx) {
              ctx.show(+that.x + +el.style.left.replace(/[^0-9.]/g, ""), +that.y + +el.style.top.replace(/[^0-9.]/g, ""), that.target, that.color);
            }
          ;
        }
      }
    };
    /**
     * @return {undefined}
     */
    var init = function() {
      if (!el) {
        el = util.iframer({
          attribute : {
            id : pageId,
            src : obj.url
          },
          style : {
            margin : "0 auto",
            width : sf_width + "px",
            border : "1px solid #aaa",
            position : "absolute",
            zIndex : obj.z
          }
        });
        event.addHandler(window, "message", show);
      }
    };
    /**
     * @param {Object} cmd
     * @param {?} err
     * @return {undefined}
     */
    this.sendOriginalData = function(cmd, err) {
      if (el) {
        error = err;
        /** @type {number} */
        var d = Math.min(cmd.data.length || 1, 5);
        switch(t = a + x * d, cmd.name) {
          case "MA":
          ;
          case "VOLUME":
          ;
          case "TVOL":
          ;
          case "EXPMA":
            t += v;
        }
        /** @type {string} */
        el.style.height = t + "px";
        if (el.contentWindow) {
          el.contentWindow.postMessage(JSON.stringify({
            cmd : data.OPEN,
            data : cmd
          }), "*");
        }
        util.stc(["inc", cmd.name].join("_"));
      }
    };
    /**
     * @param {Object} options
     * @return {undefined}
     */
    this.show = function(options) {
      if (el) {
        var numX;
        var y;
        if (options.changedTouches) {
          numX = options.changedTouches[0].clientX;
          y = options.changedTouches[0].clientY;
        } else {
          numX = options.clientX;
          y = options.clientY;
        }
        /** @type {number} */
        var right = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);
        /** @type {number} */
        var e = window.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth);
        if (y + t + 30 > right) {
          /** @type {number} */
          y = Math.max(right - t - 30, 1);
        }
        if (numX + sf_width + 3 > e) {
          /** @type {number} */
          numX = 28;
        }
        /** @type {string} */
        el.style.left = numX + "px";
        /** @type {string} */
        el.style.top = (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) + y + "px";
        /** @type {string} */
        el.style.display = "";
        util.suda("show_indicator_param");
      }
    };
    init();
  }
  var events;
  var clear = util.oc;
  var createElement = util.$C;
  var debug = util.fBind;
  var event = util.xh5_EvtUtil;
  var al = a.xh5_ibPainter;
  var t = a.xh5_Canvas;
  var $ = util.xh5_PosUtil;
  var _ = util.dateUtil;
  var client = util.bridge;
  var ctx = util.colorPicker;
  /** @type {Array} */
  var defaultParams = ["VOLUME", "MACD", "KDJ", "RSI", "BOLL", "WR", "BBIBOLL", "SAR", "DMI", "EMV", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI", "VR", "BRAR"];
  var values = {};
  /** @type {string} */
  var x = "ignore_";
  /** @type {string} */
  var attr = x + "istpre";
  /** @type {number} */
  var dt = 0.4;
  /** @type {number} */
  var chunkSize = 0.5;
  self.prototype = {
    storageVer : "v1",
    STORAGE_PREFIX : "sinatkchart_indicators~",
    /**
     * @return {undefined}
     */
    loadGlobalSetting : function() {
      var functions = this;
      client.load({
        uid : [this.cfg.uid, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
        key : this.STORAGE_PREFIX + (this.sname || this.name) + "_" + this.storageVer
      }, function(src) {
        if (src) {
          var pdataOld;
          try {
            /** @type {*} */
            pdataOld = JSON.parse(src);
          } catch (s) {
          }
          if (pdataOld) {
            functions.newParam(pdataOld, true);
          }
        }
      }, true);
    },
    /**
     * @param {string} x
     * @return {undefined}
     */
    saveGlobalSetting : function(x) {
      client.save({
        uid : [this.cfg.uid, (new Date).getTime()].join("|"),
        key : this.STORAGE_PREFIX + (this.sname || this.name) + "_" + this.storageVer,
        value : x
      });
    },
    /**
     * @param {Array} keepData
     * @return {?}
     */
    gdsd : function(keepData) {
      var l;
      if ("k" === this.proxyCfg.type) {
        /** @type {number} */
        this.disMod = 1;
        /** @type {string} */
        this.tkProp.close = "close";
        /** @type {Array} */
        l = keepData;
      } else {
        this.disMod = this.cfg.datas.tDataLen;
        /** @type {string} */
        this.tkProp.close = "price";
        /** @type {Array} */
        l = [];
        /** @type {number} */
        var r = 0;
        var ml = keepData.length;
        for (;ml > r;r++) {
          /** @type {Array} */
          l = l.concat(keepData[r]);
        }
      }
      return l;
    }
  };
  /**
   * @return {?}
   */
  self.prototype.mr = function() {
    /**
     * @param {number} y
     * @return {undefined}
     */
    function fn(y) {
      /** @type {number} */
      var h = that.h - y;
      if (h >= 0) {
        var x = "t" === that.proxyCfg.type ? that.cfg.DIMENSION.h_t : that.cfg.DIMENSION.h_k;
        if (1 > x + y) {
          return;
        }
        /** @type {number} */
        that.h = h;
        jQuery(y);
      }
    }
    /**
     * @return {?}
     */
    function create() {
      var el = createElement("span");
      return el.style.display = "none", el.style.cursor = "row-resize", el.style.borderTop = "2px dotted #000", el.style.borderBottom = "2px dotted #000", el.style.width = "77px", el.style.height = "2px", el;
    }
    var delta;
    var that = this;
    var jQuery = this.proxyCfg.initMgr.innerResize;
    /** @type {number} */
    var opacity = 0.1;
    /** @type {number} */
    var ud = 40;
    var element = void 0;
    /**
     * @param {Event} e
     * @return {undefined}
     */
    var onclick = function(e) {
      event.preventDefault(e);
      var y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
      if (isNaN(y)) {
        y = e.offsetY;
      }
      /** @type {number} */
      var cy = y - delta;
      delta = y;
      if (cy) {
        fn(cy);
      }
    };
    /**
     * @return {undefined}
     */
    var bindEvents = function() {
      event.removeHandler(window, "mousemove", onclick);
      event.removeHandler(window, "mouseup", bindEvents);
      event.removeHandler(element, "touchmove", onclick);
      event.removeHandler(element, "touchend", bindEvents);
      util.suda("indicator_reheight");
    };
    /**
     * @param {MouseEvent} options
     * @return {undefined}
     */
    var start = function(options) {
      delta = isNaN(options.pageY) ? options.offsetY : options.pageY;
      if (util.xh5_deviceUtil.istd) {
        event.addHandler(element, "touchend", bindEvents);
        event.addHandler(element, "touchmove", onclick);
      } else {
        event.addHandler(window, "mouseup", bindEvents);
        event.addHandler(window, "mousemove", onclick);
        if (util.xh5_deviceUtil.allowt) {
          event.addHandler(element, "touchend", bindEvents);
          event.addHandler(element, "touchmove", onclick);
        }
      }
    };
    /**
     * @return {undefined}
     */
    var overlay = function() {
      element = createElement("div");
      /** @type {string} */
      element.style.position = "absolute";
      /** @type {string} */
      element.style.right = that.cfg.DIMENSION.K_RIGHT_W + ud + "px";
      /** @type {string} */
      element.style.color = "#000";
      /** @type {number} */
      element.style.opacity = opacity;
      element.style.zIndex = that.cfg.PARAM.I_Z_INDEX + 2;
      /** @type {string} */
      element.style.paddingTop = "3px";
      if (util.xh5_deviceUtil.istd) {
        event.addHandler(element, "touchstart", start);
      } else {
        event.addHandler(element, "mousedown", start);
        if (util.xh5_deviceUtil.allowt) {
          event.addHandler(element, "touchstart", start);
        }
        event.addHandler(element, "mouseover", function() {
          /** @type {number} */
          element.style.opacity = 1;
        });
        event.addHandler(element, "mouseout", function() {
          /** @type {number} */
          element.style.opacity = opacity;
        });
      }
    };
    /**
     * @return {undefined}
     */
    var removeNode = function() {
      var clone = new create;
      element.appendChild(clone);
    };
    return overlay(), removeNode(), element;
  };
  /**
   * @return {?}
   */
  self.prototype.rab = function() {
    /**
     * @param {string} name
     * @return {undefined}
     */
    function find(name) {
      var wrapper = that.wrap;
      var pNode = that.wrap.parentNode;
      var node = compile(wrapper, name);
      if (node) {
        if ("-1" == name) {
          pNode.insertBefore(wrapper, node);
        } else {
          pNode.insertBefore(node, wrapper);
        }
      }
    }
    /**
     * @param {boolean} value
     * @return {?}
     */
    function initialize(value) {
      var elem = createElement("span");
      return elem.style.marginLeft = that.cfg.DIMENSION.K_RIGHT_W + "px", elem.style.cursor = "pointer", elem.innerHTML = value ? "▲" : "▼", elem.setAttribute("data-dir", value ? "-1" : "1"), elem;
    }
    var that = this;
    /** @type {number} */
    var opacity = 0.1;
    var p = void 0;
    /**
     * @param {Event} e
     * @return {undefined}
     */
    var onclick = function(e) {
      event.preventDefault(e);
      var form = e.target;
      if (form) {
        var rvar = form.getAttribute("data-dir");
        if (null !== rvar) {
          find(rvar);
        }
      }
    };
    /**
     * @return {undefined}
     */
    var init = function() {
      p = createElement("div");
      /** @type {string} */
      p.style.position = "absolute";
      /** @type {string} */
      p.style.right = that.cfg.DIMENSION.K_RIGHT_W + "px";
      /** @type {string} */
      p.style.color = "#000";
      /** @type {number} */
      p.style.opacity = opacity;
      p.style.zIndex = that.cfg.PARAM.I_Z_INDEX + 2;
      if (util.xh5_deviceUtil.istd) {
        event.addHandler(p, "touchend", onclick);
      } else {
        event.addHandler(p, "click", onclick);
        if (util.xh5_deviceUtil.allowt) {
          event.addHandler(p, "touchend", onclick);
        }
        event.addHandler(p, "mouseover", function() {
          /** @type {number} */
          p.style.opacity = 1;
        });
        event.addHandler(p, "mouseout", function() {
          /** @type {number} */
          p.style.opacity = opacity;
        });
      }
    };
    /**
     * @return {undefined}
     */
    var removeNode = function() {
      var tn = new initialize(true);
      var text2 = new initialize;
      p.appendChild(tn);
      p.appendChild(text2);
    };
    /**
     * @param {Node} o
     * @param {number} string
     * @return {?}
     */
    var compile = function(o, string) {
      var domElement;
      return domElement = -1 == string ? o.previousSibling : o.nextSibling, domElement && (0 == domElement.id.indexOf("blankctn_") && (domElement = null)), domElement;
    };
    return init(), removeNode(), p;
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  self.prototype.ic = function(data) {
    var isArray = this.proxyCfg.iTo;
    this.h = isNaN(data.h) ? this.cfg.DIMENSION.h_k : data.h;
    this.customArr = util.clone(this.DEFAULT_ARR, null);
    this.wrap = createElement("div");
    if (this.selfCfg.ctnId) {
      this.wrap.id = this.selfCfg.ctnId;
    }
    /** @type {string} */
    this.wrap.style.fontSize = this.wrap.style.lineHeight = this.cfg.STYLE.FONT_SIZE + "px";
    var style;
    for (style in this.proxyCfg.style) {
      if (this.proxyCfg.style.hasOwnProperty(style)) {
        this.wrap.style[style] = this.proxyCfg.style[style];
      }
    }
    if (this.proxyCfg.titleCtn) {
      this.titleCtn = this.proxyCfg.titleCtn;
    } else {
      if (!this.isBlank) {
        this.titleCtn = createElement("div");
        /** @type {string} */
        this.titleCtn.style.position = "absolute";
        this.titleCtn.style.zIndex = this.cfg.PARAM.I_Z_INDEX + 1;
        var scope = this;
        if (event.addHandler(this.titleCtn, "touchstart", function(e) {
          if (scope.cfg.custom.touch_prevent) {
            event.preventDefault(e);
          }
        }), this.titleCtn.style.width = "100%", !this.cfg.PARAM.isFlash) {
          if (this.cfg.custom.indicator_reorder) {
            var responseFrame = this.rab();
            this.titleCtn.appendChild(responseFrame);
          }
          if (this.cfg.custom.indicator_reheight) {
            var urlConfigCheckboxes = this.mr();
            this.titleCtn.appendChild(urlConfigCheckboxes);
          }
        }
        this.wrap.appendChild(this.titleCtn);
      }
    }
    if (this.isBlank) {
      /** @type {string} */
      this.wrap.style.height = this.h + "px";
    } else {
      this.line = new al({
        setting : this.cfg,
        sd : this,
        withHBg : this.proxyCfg.withHBg,
        reO : {
          h : this.h,
          mh : this.mh,
          eh : this.eh
        },
        nu : this.nu,
        dt : false,
        iMgr : this.proxyCfg.iMgr,
        iTo : debug(isArray, null, this),
        iClk : this.proxyCfg.onClkMain
      });
      if (!isNaN(this.proxyCfg.lz)) {
        this.line.getCanvas().style.zIndex = this.proxyCfg.lz;
      }
      this.wrap.appendChild(this.line.getWrap());
    }
    if (this.proxyCfg.ctn) {
      this.proxyCfg.ctn.appendChild(this.wrap);
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.initAndCalcAll = function() {
  };
  /**
   * @param {?} settings
   * @return {undefined}
   */
  self.prototype.resize = function(settings) {
    this.h = settings.h;
    this.mh = settings.mh;
    this.eh = settings.eh;
    if (this.line) {
      this.line.resize({
        h : this.h,
        mh : this.mh,
        eh : this.eh
      });
    }
  };
  self.prototype.getFromToM = new function() {
    /**
     * @param {?} models
     * @return {undefined}
     */
    this.reset = function(models) {
      var l = models.loadedFlag;
      if (l) {
        var n;
        for (n in l) {
          if (l.hasOwnProperty(n)) {
            /** @type {null} */
            l[n] = null;
            delete l[n];
          }
        }
      }
      models.loadedFromTo = void 0;
    };
    /**
     * @param {?} model
     * @return {?}
     */
    this.get = function(model) {
      if (!model.viewState.startDate || !model.viewState.endDate) {
        return false;
      }
      var props = model.loadedFlag;
      var className = model.loadedFromTo;
      /** @type {number} */
      var p = 1989;
      /** @type {number} */
      var name = 2099;
      if (className) {
        if (p >= className[0]) {
          return;
        }
        name = className[0];
      }
      /** @type {Array} */
      model.loadedFromTo = [p, name];
      var prop = props["_" + p];
      var value = props["_" + name];
      if (prop && value) {
        return false;
      }
      if (value) {
        name -= 1;
      } else {
        if (prop) {
          p += 1;
        }
      }
      /** @type {string} */
      prop = [p, "01", "01"].join("-");
      /** @type {string} */
      value = [name, "12", "31"].join("-");
      for (;name >= p;) {
        /** @type {boolean} */
        props["_" + p++] = true;
      }
      return[prop, value];
    };
  };
  /**
   * @return {undefined}
   */
  self.prototype.loadUrlData = function() {
    var args = this.getFromToM.get(this);
    if (args) {
      var next = args[0];
      var title = args[1];
      var version = this.aliasymbol || this.symbol;
      /** @type {string} */
      var jsonp = "_" + version + "_" + (new Date).getDate();
      var ids = this.selfDataUrl.replace("$symbol", version).replace("$cb", "var%20" + jsonp + "=").replace("$from", next).replace("$to", title);
      if (this.proxyCfg.usrObj.ssl) {
        ids = util.getSUrl(ids, true);
      }
      var req = this;
      util.load(ids, function() {
        var pdataCur = window[jsonp];
        /** @type {null} */
        window[jsonp] = null;
        if (!req.urlData) {
          req.urlData = {
            day : [],
            week : [],
            month : []
          };
        }
        var list = req.df(pdataCur);
        /** @type {Array} */
        var results = req.urlData.day;
        if (results.length > 1) {
          var date = results[0].date;
          var index = list.length;
          for (;index-- && !(list[index].date.getFullYear() == date.getFullYear() && (list[index].date.getMonth() == date.getMonth() && list[index].date.getDate() < date.getDate()));) {
          }
          list.splice(index + 1, list.length - index - 1);
        }
        results.splice.apply(results, [0, 0].concat(list));
        var i;
        var prop;
        /** @type {Array} */
        var matched = [];
        /** @type {Array} */
        var eventPath = [];
        /** @type {number} */
        var l = results.length;
        var data = results[0];
        var cache = {};
        var cur = {};
        var props = {};
        i = req.customArr.length;
        for (;i--;) {
          props[req.customArr[i].prop] = void 0;
        }
        props.date = void 0;
        for (prop in props) {
          if (props.hasOwnProperty(prop)) {
            if (util.isDate(data[prop])) {
              cache[prop] = data[prop];
              cur[prop] = data[prop];
            } else {
              /** @type {number} */
              cache[prop] = 1 * data[prop];
              /** @type {number} */
              cur[prop] = 1 * data[prop];
            }
          }
        }
        if (1 == l) {
          matched.push(cache);
          eventPath.push(cur);
        } else {
          /** @type {number} */
          i = 1;
          for (;l > i;i++) {
            data = results[i];
            if (!_.gw(results[i - 1].date, data.date)) {
              matched.push(cache);
              cache = {};
            }
            for (prop in props) {
              if (props.hasOwnProperty(prop)) {
                cache[prop] = util.isDate(data[prop]) ? data[prop] : (1 * cache[prop] || 0) + 1 * data[prop];
              }
            }
            if (!_.gm(results[i - 1].date, data.date)) {
              eventPath.push(cur);
              cur = {};
            }
            for (prop in props) {
              if (props.hasOwnProperty(prop)) {
                cur[prop] = util.isDate(data[prop]) ? data[prop] : (1 * cur[prop] || 0) + 1 * data[prop];
              }
            }
          }
          matched.push(cache);
          eventPath.push(cur);
        }
        /** @type {Array} */
        req.urlData.week = matched;
        /** @type {Array} */
        req.urlData.month = eventPath;
        /** @type {boolean} */
        req.toReCalc = true;
        req.cb(req);
      });
    }
  };
  /**
   * @param {Array} newData
   * @param {Object} data
   * @param {number} opt_attributes
   * @return {?}
   */
  self.prototype.newData = function(newData, data, opt_attributes) {
    if (newData && !(newData.length < 1)) {
      var self = newData[newData.length - 1];
      if (168 == opt_attributes && _.gw(self.date, data.date) || 720 == opt_attributes && _.gm(self.date, data.date)) {
        return void(self.date = data.date);
      }
      var prop;
      var a = {};
      var j = this.customArr.length;
      for (;j--;) {
        prop = this.customArr[j].prop;
        a[prop] = data[prop] || 0;
      }
      a.date = data.date;
      newData.push(a);
    }
  };
  /**
   * @param {Object} data
   * @param {Array} newData
   * @param {number} opt_attributes
   * @param {?} i
   * @return {?}
   */
  self.prototype.updateData = function(data, newData, opt_attributes, i) {
    if (newData && !(newData.length < 1)) {
      var obj = newData[newData.length - 1];
      if (i) {
        if (!_.stbd(obj.date, data.date)) {
          return data.date > obj.date ? void this.newData(newData, data, opt_attributes) : void 0;
        }
        if (!util.kUtil.spk(obj.time, data.time, "00:00", opt_attributes)) {
          return void this.newData(newData, data, opt_attributes);
        }
      } else {
        if (!_.stbd(data.date, obj.date)) {
          return data.date > obj.date ? void this.newData(newData, data, opt_attributes) : void 0;
        }
      }
      obj = newData[newData.length - 1];
      var name;
      var j = this.customArr.length;
      for (;j--;) {
        name = this.customArr[j].prop;
        /** @type {number} */
        var val = Number(data[name]);
        if (util.isNum(data[name])) {
          switch(opt_attributes) {
            case 167:
            ;
            case 168:
            ;
            case 169:
            ;
            case 719:
            ;
            case 720:
            ;
            case 721:
              obj[name] += data[name + "update"] || 0;
              break;
            default:
              /** @type {number} */
              obj[name] = val;
          }
        }
      }
    }
  };
  /**
   * @param {Object} k
   * @return {undefined}
   */
  self.prototype.doUpdate = function(k) {
    if (k) {
      if (this.urlData) {
        if (this.urlData.day) {
          this.updateData(k, this.urlData.day, 24);
        }
        if (this.urlData.week) {
          this.updateData(k, this.urlData.week, 168);
        }
        if (this.urlData.month) {
          this.updateData(k, this.urlData.month, 720);
        }
        /** @type {boolean} */
        this.toReCalc = true;
        this.cb(this);
      }
    }
  };
  /**
   * @param {?} string
   * @return {?}
   */
  self.prototype.udf = function(string) {
    return string;
  };
  /**
   * @return {undefined}
   */
  self.prototype.update = function() {
    if (this.selfDataUrlUpdate && !(++this.updateCount < this.UPDATE_THRESHOLD)) {
      if (this.updateCount >= this.UPDATE_THRESHOLD) {
        /** @type {number} */
        this.updateCount = 0;
      }
      var ret = _.ddt(this.viewState.startDate).getFullYear();
      var pre = _.ddt(this.viewState.endDate).getFullYear();
      /** @type {string} */
      var days = [ret, 1, 1].join("-");
      /** @type {string} */
      var id = [pre, 12, 31].join("-");
      var version = this.aliasymbol || this.symbol;
      /** @type {string} */
      var n = "_" + version + (new Date).getTime();
      var mod = this.selfDataUrlUpdate.replace("$symbol", version).replace("$cb", "var%20" + n + "=").replace("$from", days).replace("$to", id);
      if (this.proxyCfg.usrObj.ssl) {
        mod = util.getSUrl(mod, true);
      }
      var helper = this;
      util.load(mod, function() {
        var source = window[n];
        /** @type {null} */
        window[n] = null;
        var e = helper.udf(source);
        if (e) {
          helper.doUpdate(e);
        }
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.createPlayingData = function() {
    if (this.datas) {
      var mat;
      /** @type {number} */
      var dz = this.labelMaxP - this.labelMinP;
      /** @type {number} */
      var lb = 0;
      var la = this.datas.length;
      for (;la > lb;lb++) {
        mat = this.datas[lb];
        var j = this.customArr.length;
        for (;j--;) {
          var row = this.customArr[j].prop;
          /** @type {number} */
          mat[row + "y"] = this.h * (this.labelMaxP - mat[row]) / dz;
        }
      }
    }
  };
  /**
   * @param {Array} recurring
   * @return {undefined}
   */
  self.prototype.setPricePos = function(recurring) {
    if (!recurring || this.separate > 0) {
      this.labelMinP = this.minPrice;
      this.labelMaxP = this.maxPrice;
    } else {
      this.labelMaxP = recurring[0];
      this.labelMinP = recurring[1];
      /** @type {Array} */
      this.pricePosArr = recurring;
    }
    this.createPlayingData();
  };
  /**
   * @return {undefined}
   */
  self.prototype.generateSettings = function() {
    if (this.param && this.param.length > 0) {
      /** @type {number} */
      var m = 0;
      /** @type {number} */
      var ms = Math.min(this.param.length, this.DEFAULT_ARR.length);
      for (;ms > m;m++) {
        var value = this.param[m];
        /** @type {number} */
        var v = Number(value.v);
        this.customArr[m].v = v > 0 ? v : this.DEFAULT_ARR[m].v;
        this.customArr[m].color = util.isColor(value.color) ? value.color : this.DEFAULT_ARR[m].color;
      }
    }
  };
  /**
   * @param {(Object|string)} value
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  self.prototype.newParam = function(value, dataAndEvents) {
    var name = this.sname || this.name;
    /** @type {boolean} */
    var a = false;
    if (value ? (values[name] = value, util.stc("np_" + name, value)) : (a = true, value = values[name]), this.param = value, this.generateSettings(), this.genIndicator(this.customArr, this.asPChart ? "" : this.alias || this.name), dataAndEvents) {
      var camelKey = this.cfg.datas.isT ? this.proxyCfg.stock.tDb.get() : this.proxyCfg.stock.kDb.get();
      return void(camelKey && (this.initAndCalcAll(camelKey), this.asPChart ? this.setPricePos(this.pricePosArr) : this.drawCalc(), this.draw(true)));
    }
    if (this.cfg.custom.storage_lv > 0) {
      if (value) {
        if (a) {
          return;
        }
        if (this.cfg.custom.storage_lv > 1) {
          this.saveGlobalSetting(value);
        }
      } else {
        this.loadGlobalSetting();
      }
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.syncI = function() {
    if (this.datas && this.proxyCfg.iMgr) {
      if (this.proxyCfg.iMgr.isIng()) {
        if (this.proxyCfg.iMgr.isMoving()) {
          this.indicatorI(this.datas[this.datas.length - 1]);
        }
      } else {
        if ("t" != this.proxyCfg.type) {
          this.indicatorI(this.datas[this.datas.length - 1]);
        } else {
          if (this.proxyCfg.stock) {
            if (5 == this.proxyCfg.stock.viewState.end) {
              var k;
              k = this.proxyCfg.stock.realLen >= 0 ? this.proxyCfg.stock.realLen >= this.disMod ? 0 == this.proxyCfg.stock.realLen ? 0 : this.proxyCfg.stock.realLen - 1 : this.proxyCfg.stock.realLen : this.disMod - 1;
              if (4 != this.proxyCfg.stock.viewState.start) {
                k = (this.proxyCfg.stock.viewState.end - this.proxyCfg.stock.viewState.start - 1) * this.disMod + k;
              }
              this.indicatorI(this.datas[k]);
            } else {
              this.indicatorI(this.datas[this.datas.length - 1]);
            }
          }
        }
      }
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.setRange = function() {
    if (this.datas) {
      /** @type {number} */
      var b = this.viewState.start * this.disMod;
      /** @type {number} */
      var a = this.viewState.end * this.disMod;
      /** @type {number} */
      var c = a - b;
      for (;this.datas.length > c;) {
        this.datas.length--;
      }
      for (;this.datas.length < c;) {
        this.datas.push({});
      }
      /** @type {number} */
      var min = Number.MAX_VALUE;
      /** @type {number} */
      var max = -Number.MAX_VALUE;
      /** @type {number} */
      var i = b;
      for (;a > i;i++) {
        var data = this.datas[i - b];
        if (data.date = this.oriArr[i].date, !this.selfArr[i] || !this.selfArr[i][attr]) {
          var label;
          for (label in this.selfArr[i]) {
            if (this.selfArr[i].hasOwnProperty(label)) {
              if (data[label] = this.selfArr[i][label], 0 == label.indexOf(x)) {
                continue;
              }
              if (data[label] > max) {
                max = data[label];
              }
              if (data[label] < min) {
                min = data[label];
              }
            }
          }
        }
      }
      this.minPrice = min;
      this.maxPrice = max;
      this.syncI();
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.drawCalc = function() {
    if (this.datas) {
      /** @type {number} */
      var start = this.viewState.start * this.disMod;
      /** @type {number} */
      var end = this.viewState.end * this.disMod;
      /** @type {number} */
      var len = end - start;
      for (;this.datas.length > len;) {
        this.datas.length--;
      }
      for (;this.datas.length < len;) {
        this.datas.push({});
      }
      var i;
      var data;
      /** @type {number} */
      var min = Number.MAX_VALUE;
      /** @type {number} */
      var max = -Number.MAX_VALUE;
      /** @type {number} */
      i = start;
      for (;end > i;i++) {
        if (data = this.datas[i - start], data.date = this.oriArr[i].date, !this.selfArr[i] || !this.selfArr[i][attr]) {
          var label;
          for (label in this.selfArr[i]) {
            if (this.selfArr[i].hasOwnProperty(label)) {
              if (data[label] = this.selfArr[i][label], 0 == label.indexOf(x)) {
                continue;
              }
              if (data[label] > max) {
                max = data[label];
              }
              if (data[label] < min) {
                min = data[label];
              }
            }
          }
        }
      }
      switch(this.name) {
        case "ADL":
        ;
        case "MACD":
          /** @type {number} */
          max = Math.max(Math.abs(max), Math.abs(min));
          /** @type {number} */
          min = -max;
          break;
        case "BIAS":
        ;
        case "BRAR":
        ;
        case "DMA":
        ;
        case "EMV":
        ;
        case "KDJ":
        ;
        case "ROC":
        ;
        case "VR":
        ;
        case "WVAD":
          this.vaObj.min = min;
          this.vaObj.max = max;
          break;
        case "CCI":
          if (min > 0) {
            /** @type {number} */
            min = 0;
          }
          if (0 > max) {
            /** @type {number} */
            max = 0;
          }
          this.vaObj.min = min;
          this.vaObj.max = max;
          break;
        case "TOR":
          /** @type {number} */
          min = 0;
          break;
        default:
          if (this.vaObj) {
            max = this.vaObj.max;
            min = this.vaObj.min;
          }
        ;
      }
      this.labelMaxP = max;
      this.labelMinP = min;
      /** @type {number} */
      var range = max - min;
      /** @type {number} */
      i = 0;
      for (;len > i;i++) {
        data = this.datas[i];
        var j = this.customArr.length;
        for (;j--;) {
          var p = this.customArr[j].prop;
          /** @type {number} */
          data[p + "y"] = this.h * (max - data[p]) / range;
        }
      }
      this.syncI();
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.clearDraw = function() {
    this.line.clear(false);
    this.interact(0 / 0);
  };
  /**
   * @param {boolean} recurring
   * @param {?} state
   * @return {undefined}
   */
  self.prototype.draw = function(recurring, state) {
    if (this.__iOffsetX = isNaN(state) ? this.__iOffsetX : state, this.datas) {
      this.line.clear(true, this.cfg.PARAM.getHd());
      var chunk;
      var now;
      var l1 = this.datas.length;
      if (this.cfg.datas.isT) {
        /** @type {number} */
        chunk = this.cfg.DIMENSION.w_t / l1;
        /** @type {number} */
        now = chunk * chunkSize;
      } else {
        /** @type {number} */
        chunk = this.cfg.DIMENSION.w_k / Math.max(l1, this.cfg.PARAM.minCandleNum);
        /** @type {number} */
        now = this.__iOffsetX - chunk * dt;
      }
      var d;
      var i = this.customArr.length;
      for (;i--;) {
        /** @type {string} */
        var key = this.customArr[i].prop + "y";
        d = now;
        this.line.newStyle(this.customArr[i].color, true, this.lw);
        /** @type {number} */
        var inputIndex = 0;
        for (;l1 > inputIndex;inputIndex++) {
          if (0 == inputIndex) {
            this.line.moveTo(d, this.datas[inputIndex][key]);
          } else {
            this.line.lineTo(d, this.datas[inputIndex][key]);
          }
          d += chunk;
        }
        this.line.stroke();
      }
      if (recurring) {
        this.line.drawBg(this.__iOffsetX);
      }
      if (this.vaObj) {
        this.drawValueRange();
      }
    }
  };
  /**
   * @return {undefined}
   */
  self.prototype.drawValueRange = function() {
    var context = this.line.getG();
    /** @type {string} */
    context.globalCompositeOperation = "destination-over";
    var size = this.vaObj.min;
    var max = this.vaObj.max;
    /** @type {number} */
    var width = max - size;
    if (!isNaN(this.vaObj.upper) && !isNaN(this.vaObj.lower)) {
      var min = this.vaObj.upper;
      var aux = this.vaObj.lower;
      /** @type {number} */
      var y = this.h * (max - min) / width;
      /** @type {number} */
      var h = this.h * (max - aux) / width;
      /** @type {number} */
      var height = h - y;
      context.fillStyle = util.hex2dec(this.customArr[0].color, 0.2);
      context.fillRect(0, y, this.cfg.DIMENSION.w_k, height);
    }
    /** @type {number} */
    var hly = this.h * (isNaN(this.vaObj.glv) ? max / 2 : max - this.vaObj.glv) / width;
    hly += 0.5;
    this.line.newStyle(this.cfg.COLOR.GRID, true, 1);
    this.line.moveTo(0, hly);
    this.line.lineTo(this.cfg.DIMENSION.w_k, hly);
    context.stroke();
  };
  /**
   * @param {Object} options
   * @return {?}
   */
  self.prototype.genIdctParam = function(options) {
    options = options || {};
    var w = isNaN(options.width) ? this.proxyCfg.titleW || this.cfg.DIMENSION.getStageW() : options.width;
    var dialogHeight = isNaN(options.height) ? this.cfg.DIMENSION.H_T_T || 14 : options.height;
    return{
      hd : this.cfg.PARAM.getHd(),
      width : w,
      height : dialogHeight
    };
  };
  /**
   * @param {string} text
   * @return {?}
   */
  self.prototype.genTitleCanvas = function(text) {
    /**
     * @return {undefined}
     */
    function init() {
      var g = new t;
      var ctx = g.g;
      var forward = item.cfg.datas.isT;
      if (this.canvas = g.canvas, util.isFunc(item.proxyCfg.onClkTT)) {
        /** @type {string} */
        var eventType = util.xh5_deviceUtil.istd ? "touchend" : "click";
        event.addHandler(this.canvas, eventType, debug(item.proxyCfg.onClkTT, null, item));
        var style = this.canvas.style;
        /** @type {string} */
        style.cursor = "pointer";
        /** @type {string} */
        style.position = "relative";
        style.zIndex = item.cfg.PARAM.I_Z_INDEX + 1;
      }
      /**
       * @param {number} w
       * @param {number} n
       * @return {undefined}
       */
      var draw = function(w, n) {
        g.resize(item.genIdctParam({
          width : w,
          height : n
        }));
        /** @type {string} */
        ctx.font = item.cfg.STYLE.FONT_SIZE + "px " + item.cfg.STYLE.FONT_FAMILY;
        /** @type {string} */
        ctx.textBaseline = "top";
      };
      /** @type {number} */
      var containerWidth = 9;
      /** @type {number} */
      var _ = 13;
      /** @type {number} */
      var H_T_T = 2;
      /**
       * @param {(Array|string)} values
       * @return {undefined}
       */
      this.setTxt = function(values) {
        var left = item.cfg.DIMENSION.posX;
        var d = forward ? item.cfg.DIMENSION.w_t : item.cfg.DIMENSION.w_k;
        var isX = item.cfg.DIMENSION.extend_draw;
        var stageWidth = ctx.measureText(text).width;
        var time = item.cfg.DIMENSION.getStageW();
        /** @type {number} */
        var length = 0.35 * time;
        /** @type {number} */
        var minimumCellWidth = "TFLOW" == item.name && 400 > d ? 55 : 80;
        var x0 = item.cfg.DIMENSION.H_T_T;
        if (H_T_T > x0) {
          /** @type {number} */
          x0 = 14;
        }
        /** @type {number} */
        var annotation_y = 1;
        if (values) {
          var node;
          var str;
          var value;
          var t = left + (stageWidth > 0 ? containerWidth : 0);
          /** @type {Array} */
          var nodes = [];
          var valuesLen = values.length;
          /** @type {number} */
          var _i = 0;
          for (;valuesLen > _i;_i++) {
            if (node = values[_i], node.t || !isNaN(node.n)) {
              switch(str = (node.t ? node.t + ": " : "") + (isNaN(node.n) ? "--" : util.strUtil.ps(node.n, fix.nfloat)), item.name) {
                case "TFLOW":
                  if (_i == values.length - 1) {
                    str += "元";
                  }
                  break;
                case "TZY":
                ;
                case "TZYS":
                  str += "%";
              }
              value = ctrl ? Math.max(minimumCellWidth, ctx.measureText(str).width || 0) : ctx.measureText(str).width || 0;
              nodes.push({
                str : str,
                w : value,
                color : node.c
              });
              t += value + _;
            }
          }
          t -= _;
          /** @type {number} */
          var len = Math.ceil(t / d);
          if (len > valuesLen) {
            len = valuesLen;
          }
          if (len > 1) {
            x0 *= len;
            t = time;
          } else {
            /** @type {number} */
            t = Math.floor(Math.max(t, length));
          }
          /** @type {number} */
          t = Math.min(time, t);
          var right;
          if (isX) {
            right = left;
            if (item.cfg.DIMENSION.H_T_T < H_T_T) {
              right += item.cfg.DIMENSION.W_T_L;
            }
            draw(t, x0);
          } else {
            draw(t, x0);
            if (item.cfg.DIMENSION.H_T_T > H_T_T - 1) {
              /** @type {string} */
              ctx.textAlign = "right";
              ctx.fillStyle = item.cfg.COLOR.T_T;
              ctx.fillText(text, left, annotation_y);
            }
            right = left + (stageWidth > 0 ? containerWidth : 0);
          }
          /** @type {string} */
          ctx.textAlign = "left";
          var j = right;
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var l = nodes.length;
          for (;l > i && (node = nodes[i], ctx.fillStyle = node.color, ctx.fillText(node.str, right, annotation_y), right += node.w + _, !(i >= l - 1));i++) {
            if (right - left + nodes[i + 1].w > d) {
              annotation_y += item.cfg.STYLE.FONT_SIZE;
              right = j;
            }
          }
        } else {
          if (item.cfg.DIMENSION.H_T_T < H_T_T) {
            left += item.cfg.DIMENSION.W_T_L;
          }
          draw(left, x0);
          ctx.fillStyle = item.cfg.COLOR.T_T;
          /** @type {string} */
          ctx.textAlign = isX ? "left" : "right";
          ctx.fillText(text, left, annotation_y);
        }
      };
      this.setTxt();
    }
    /**
     * @return {undefined}
     */
    function start() {
      var span = createElement("div");
      this.canvas = span;
      var el = createElement("div");
      /** @type {string} */
      el.style.cssFloat = "left";
      /** @type {string} */
      el.style.textAlign = "right";
      /** @type {string} */
      el.style.marginRight = "9px";
      /** @type {string} */
      el.style.overflow = "hidden";
      var div = createElement("div");
      span.appendChild(el);
      span.appendChild(div);
      var style = span.style;
      if (util.isFunc(item.proxyCfg.onClkTT)) {
        if (util.xh5_deviceUtil.istd) {
          event.addHandler(span, "click", debug(item.proxyCfg.onClkTT, null, item));
        } else {
          event.addHandler(span, "click", debug(item.proxyCfg.onClkTT, null, item));
          if (util.xh5_deviceUtil.allowt) {
            event.addHandler(span, "touchend", debug(item.proxyCfg.onClkTT, null, item));
          }
        }
        /** @type {string} */
        style.cursor = "pointer";
        /** @type {string} */
        style.position = "relative";
        style.zIndex = item.cfg.PARAM.I_Z_INDEX + 1;
      }
      var selfIsAncestor = item.cfg.datas.isT;
      /**
       * @param {(Array|string)} values
       * @return {undefined}
       */
      this.setTxt = function(values) {
        var n = selfIsAncestor ? item.cfg.DIMENSION.w_t : item.cfg.DIMENSION.w_k;
        /** @type {number} */
        var order = "TFLOW" == item.name ? 400 : 350;
        /** @type {number} */
        var f = order > n ? 55 : 80;
        var p = item.cfg.DIMENSION.extend_draw;
        /** @type {string} */
        el.style.width = div.style.marginLeft = item.cfg.DIMENSION.posX + "px";
        style.color = item.cfg.COLOR.T_T;
        /** @type {string} */
        style.fontSize = item.cfg.STYLE.FONT_SIZE + "px";
        style.fontFamily = item.cfg.STYLE.FONT_FAMILY;
        var value = text || "";
        if (values) {
          if (p) {
            /** @type {string} */
            el.innerHTML = "";
            if (item.cfg.DIMENSION.H_T_T < 2) {
              /** @type {string} */
              div.style.marginLeft = "50px";
            }
          } else {
            el.innerHTML = item.cfg.DIMENSION.H_T_T > 1 ? value : "";
          }
          /** @type {string} */
          div.innerHTML = "";
          var v;
          var t;
          var html;
          /** @type {number} */
          var i = 0;
          var vlen = values.length;
          for (;vlen > i;i++) {
            if (t = values[i], t.t || !isNaN(t.n)) {
              switch(item.name) {
                case "DPDK":
                ;
                case "TZY":
                  return;
                case "TZYS":
                ;
                case "DPDKS":
                ;
                case "SAR":
                  if ("SAR" == item.name) {
                    if (!item.asPChart && "SAR" != t.t) {
                      continue;
                    }
                  } else {
                    if ("DPDKS" == item.name && "mn" == t.t) {
                      continue;
                    }
                  }
                  /** @type {string} */
                  var selector = "<span style='color:#000;'>--";
                  switch(t.t) {
                    case "SAR":
                      selector += "</span>";
                      break;
                    default:
                      selector += "%</span>";
                  }
                  if (html = (t.t ? t.t + ": " : "") + selector, !isNaN(t.n)) {
                    /** @type {string} */
                    html = html.replace("--", util.strUtil.ps(t.n, fix.nfloat));
                    var newline_flag;
                    newline_flag = "DPDK" == item.name || "SAR" == t.t ? t.c : t.n > 0 ? item.cfg.COLOR.K_RISE : t.n < 0 ? item.cfg.COLOR.K_FALL : item.cfg.COLOR.K_N;
                    /** @type {string} */
                    html = html.replace("#000", newline_flag);
                  }
                  break;
                case "VOLUME":
                ;
                case "TVOL":
                ;
                case "MA":
                  html = (t.t ? t.t + ": " : "") + (isNaN(t.n) ? 0 : t.n.toFixed(fix.nfloat));
                  break;
                default:
                  html = (t.t ? t.t + ": " : "") + (isNaN(t.n) ? "--" : util.strUtil.ps(t.n, fix.nfloat));
                  if ("TFLOW" == item.name) {
                    if (i == values.length - 1) {
                      html += "元";
                    }
                  }
                ;
              }
              /** @type {number} */
              v = 11;
              div.innerHTML += "<span style='float:left;min-width:" + f + "px;margin-right:" + v + "px;color:" + t.c + "'>" + html + "</span>";
            }
          }
        } else {
          el.innerHTML = p ? "" : value;
          /** @type {string} */
          div.innerHTML = "";
        }
      };
      this.setTxt();
    }
    var item = this;
    var ctrl = this.proxyCfg.fixIdctW;
    var fix = this.proxyCfg.usrObj;
    return item.cfg.custom.indicator_cvs_title ? new init : new start;
  };
  /**
   * @param {Array} values
   * @param {string} m1
   * @return {undefined}
   */
  self.prototype.genIndicator = function(values, m1) {
    if (values) {
      /** @type {Array} */
      this.indicatorArr = [];
      /** @type {number} */
      var dep = 0;
      var valuesLen = values.length;
      for (;valuesLen > dep;dep++) {
        this.indicatorArr.push(values[dep]);
      }
      if (!this.titleO) {
        this.titleO = this.genTitleCanvas(m1);
        this.titleCtn.appendChild(this.titleO.canvas);
      }
    }
  };
  /**
   * @param {Object} data
   * @return {?}
   */
  self.prototype.indicatorI = function(data) {
    if (this.indicatorArr) {
      var o;
      var selected;
      /** @type {Array} */
      var progressValues = [];
      /** @type {number} */
      var p = 0;
      var li = this.indicatorArr.length;
      for (;li > p;p++) {
        o = this.indicatorArr[p];
        selected = data[o.prop];
        if ("t" == this.proxyCfg.type) {
          if ("volume" == o.prop || /^tvol\w+$/.test(o.prop)) {
            if (data[o.prop] < 0) {
              /** @type {number} */
              selected = 0;
            }
          }
        }
        progressValues.push({
          n : selected,
          c : o.color,
          t : o.idct
        });
      }
      return this.titleO && this.titleO.setTxt(progressValues), progressValues;
    }
  };
  /**
   * @param {number} k
   * @return {?}
   */
  self.prototype.interact = function(k) {
    return!isNaN(k) && (this.datas && this.datas.length) ? (k >= this.datas.length && (k = this.datas.length - 1), this.indicatorI(this.datas[k])) : (this.titleO && this.titleO.setTxt(null), null);
  };
  /**
   * @return {undefined}
   */
  self.prototype.rfs = function() {
    if (this.selfCfg.allowrfs) {
      if (this.titleO) {
        util.domGc(this.titleO.canvas);
      }
      util.domGc(this.wrap);
      clearInterval(this.updateId);
    } else {
      /** @type {string} */
      this.wrap.style.display = "none";
    }
  };
  var config = function() {
    /**
     * @param {number} obj
     * @return {?}
     */
    function isArray(obj) {
      return null === obj ? "Null" : void 0 === obj ? "Undefined" : core_toString.call(obj).slice(8, -1);
    }
    /**
     * @param {string} text
     * @param {number} a
     * @param {number} b
     * @return {?}
     */
    function merge(text, a, b) {
      switch(text) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b ? a / b : null;
      }
    }
    /** @type {function (this:*): string} */
    var core_toString = Object.prototype.toString;
    /** @type {function (...[*]): number} */
    var handle = Math.min;
    /** @type {function (...[*]): number} */
    var fn = Math.max;
    /** @type {function (*): number} */
    var callback = Math.abs;
    /**
     * @param {?} str
     * @param {string} value
     * @param {Function} fn
     * @return {?}
     */
    var clean = function(str, value, fn) {
      if (value) {
        /** @type {Array} */
        var ret = [];
        /** @type {number} */
        var i = 0;
        var len = str.length;
        for (;len > i;i++) {
          ret.push(fn ? fn(str[i][value]) : str[i][value]);
        }
        return ret;
      }
      return str;
    };
    /**
     * @param {Array} array
     * @return {?}
     */
    var unique = function(array) {
      /** @type {number} */
      var result = 0;
      var l = array.length;
      for (;l--;) {
        result += array[l];
      }
      return result;
    };
    /**
     * @param {?} str
     * @param {number} value
     * @return {?}
     */
    var contains = function(str, value) {
      var copies;
      /** @type {Array} */
      var out = [];
      /** @type {number} */
      var max = 0;
      /** @type {number} */
      var d = 0;
      var len = str.length;
      for (;len > max;max++) {
        if (str[max]) {
          d += str[max];
        }
        if (max >= value - 1) {
          /** @type {number} */
          copies = d / value;
          if (str[max - value + 1]) {
            d -= str[max - value + 1];
          }
        } else {
          /** @type {number} */
          copies = d / (max + 1);
        }
        out.push(copies);
      }
      return out;
    };
    /**
     * @param {Array} x
     * @param {number} value
     * @return {?}
     */
    var token = function(x, value) {
      /** @type {Array} */
      var tokens = [x[0]];
      /** @type {number} */
      var i = 1;
      var l = x.length;
      for (;l > i;i++) {
        tokens.push((2 * x[i] + (value - 1) * tokens[i - 1]) / (value + 1));
      }
      return tokens;
    };
    /**
     * @param {Array} regex
     * @param {number} b
     * @param {number} dataAndEvents
     * @return {?}
     */
    var clone = function(regex, b, dataAndEvents) {
      /** @type {Array} */
      var buf = [regex[0]];
      /** @type {number} */
      var p = 1;
      var li = regex.length;
      for (;li > p;p++) {
        buf.push((dataAndEvents * regex[p] + (b - dataAndEvents) * buf[p - 1]) / b);
      }
      return buf;
    };
    /**
     * @param {?} data
     * @param {number} dataAndEvents
     * @return {?}
     */
    var queue = function(data, dataAndEvents) {
      /** @type {Array} */
      var q = [];
      /** @type {number} */
      var y = 0;
      for (;dataAndEvents > y;y++) {
        q.push(null);
      }
      var x = data.length;
      for (;x > y;y++) {
        q.push(data[y - dataAndEvents]);
      }
      return q;
    };
    /**
     * @param {Array} input
     * @param {number} start
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    var create = function(input, start, value, max) {
      /**
       * @param {number} index
       * @return {?}
       */
      function log(index) {
        if (!(index >= inputLength)) {
          if (data1[index] = Math.min.apply(null, data.slice(index - start, index)), siblings[index] = 1, data1[index] > data[index]) {
            check(index + 1);
          } else {
            /** @type {number} */
            map[index] = Math.max.apply(null, buffer.slice(index - start + 1, index + 1));
            result[index] = value;
            for (;inputLength - 1 > index;) {
              if (data1[index + 1] = data1[index] + result[index] * (map[index] - data1[index]) / 100, siblings[index + 1] = 1, data1[index + 1] > data[index + 1]) {
                return void check(index + 2);
              }
              /** @type {number} */
              map[index + 1] = Math.max.apply(null, buffer.slice(index - start + 2, index + 2));
              if (buffer[index + 1] > map[index]) {
                result[index + 1] = result[index] + value;
                if (result[index + 1] > max) {
                  result[index + 1] = max;
                }
              } else {
                result[index + 1] = result[index];
              }
              index++;
            }
          }
        }
      }
      /**
       * @param {number} index
       * @return {?}
       */
      function check(index) {
        if (!(index >= inputLength)) {
          if (data1[index] = Math.max.apply(null, buffer.slice(index - start, index)), siblings[index] = 0, data1[index] < buffer[index]) {
            return void log(index + 1);
          }
          /** @type {number} */
          map[index] = Math.min.apply(null, data.slice(index - start + 1, index + 1));
          result[index] = value;
          for (;inputLength - 1 > index;) {
            if (data1[index + 1] = data1[index] + result[index] * (map[index] - data1[index]) / 100, siblings[index + 1] = 0, data1[index + 1] < buffer[index + 1]) {
              return void log(index + 2);
            }
            /** @type {number} */
            map[index + 1] = Math.min.apply(null, data.slice(index - start + 2, index + 2));
            if (data[index + 1] < map[index]) {
              result[index + 1] = result[index] + value;
              if (result[index + 1] > max) {
                result[index + 1] = max;
              }
            } else {
              result[index + 1] = result[index];
            }
            index++;
          }
        }
      }
      var buffer = clean(input, "high");
      var data = clean(input, "low");
      var inputLength = input.length;
      /** @type {Array} */
      var data1 = [];
      /** @type {Array} */
      var result = [];
      /** @type {Array} */
      var map = [];
      /** @type {Array} */
      var siblings = [];
      return buffer[start] > buffer[0] || data[start] > data[0] ? log(start) : check(start), {
        data : data1,
        direction : siblings
      };
    };
    /**
     * @param {Array} parent
     * @return {?}
     */
    var promote = function(parent) {
      /** @type {number} */
      var containerWidth = 0;
      var width = parent.length;
      var c = width;
      for (;c--;) {
        containerWidth += parent[c];
      }
      return containerWidth / width;
    };
    /**
     * @param {Array} parent
     * @param {number} dataAndEvents
     * @return {?}
     */
    var parse = function(parent, dataAndEvents) {
      var t = promote(parent);
      var cnl = parent.length;
      /** @type {number} */
      var moments = 0;
      var singlePart = cnl;
      for (;singlePart--;) {
        moments += Math.pow(parent[singlePart] - t, 2);
      }
      return Math.sqrt(moments / (dataAndEvents ? cnl - dataAndEvents : cnl));
    };
    /**
     * @param {string} str
     * @param {number} value
     * @return {?}
     */
    var sync = function(str, value) {
      /** @type {Array} */
      var _results = [];
      /** @type {number} */
      var i = 0;
      var len = str.length;
      for (;len > i;i++) {
        _results.push(value > i ? parse(str.slice(0, i + 1), 1) : parse(str.slice(i - value + 1, i + 1), 1));
      }
      return _results;
    };
    /**
     * @param {Array} parent
     * @return {?}
     */
    var go = function(parent) {
      var parentClone = promote(parent);
      /** @type {number} */
      var containerWidth = 0;
      var width = parent.length;
      var c = width;
      for (;c--;) {
        containerWidth += callback(parent[c] - parentClone);
      }
      return containerWidth / width;
    };
    /**
     * @param {string} result
     * @param {number} d
     * @return {?}
     */
    var next = function(result, d) {
      /** @type {Array} */
      var rv = [];
      /** @type {number} */
      var b = 0;
      var a = result.length;
      for (;a > b;b++) {
        rv.push(d > b ? go(result.slice(0, b + 1)) : go(result.slice(b - d + 1, b + 1)));
      }
      return rv;
    };
    /**
     * @param {string} args
     * @param {number} callback
     * @return {?}
     */
    var each = function(args, callback) {
      /** @type {Array} */
      var ar = [];
      var len = args.length;
      /** @type {number} */
      var data = fn.apply(null, args);
      /** @type {number} */
      var i = 0;
      for (;len > i;i++) {
        ar.push(callback ? fn.apply(null, callback > i ? args.slice(0, i + 1) : args.slice(i - callback + 1, i + 1)) : data);
      }
      return ar;
    };
    /**
     * @param {string} data
     * @param {number} callback
     * @return {?}
     */
    var emit = function(data, callback) {
      /** @type {Array} */
      var result = [];
      var a = data.length;
      /** @type {number} */
      var value = handle.apply(null, data);
      /** @type {number} */
      var p = 0;
      for (;a > p;p++) {
        result.push(callback ? handle.apply(null, callback > p ? data.slice(0, p + 1) : data.slice(p - callback + 1, p + 1)) : value);
      }
      return result;
    };
    /**
     * @param {Array} val
     * @return {?}
     */
    var set = function(val) {
      switch(isArray(val)) {
        case "Number":
          return callback(val);
        case "Array":
          /** @type {Array} */
          var values = [];
          /** @type {number} */
          var index = 0;
          var length = val.length;
          for (;length > index;index++) {
            values.push(callback(val[index]));
          }
          return values;
        default:
          throw new Error("argument of Function calcABS was error!");;
      }
    };
    /**
     * @param {number} p
     * @param {(Array|number)} obj
     * @return {?}
     */
    var trigger = function(p, obj) {
      var ret;
      var i;
      var l;
      switch(isArray(p)) {
        case "Array":
          switch(isArray(obj)) {
            case "Array":
              /** @type {Array} */
              ret = [];
              /** @type {number} */
              i = 0;
              l = p.length;
              for (;l > i;i++) {
                ret.push(fn(p[i], obj[i]));
              }
              return ret;
            case "Number":
              /** @type {Array} */
              ret = [];
              /** @type {number} */
              i = 0;
              l = p.length;
              for (;l > i;i++) {
                ret.push(fn(p[i], obj));
              }
              return ret;
            default:
              throw new Error("argument of Function calcMAX was error!");;
          }
          break;
        case "Number":
          switch(isArray(obj)) {
            case "Array":
              /** @type {Array} */
              ret = [];
              /** @type {number} */
              i = 0;
              l = obj.length;
              for (;l > i;i++) {
                ret.push(fn(p, obj[i]));
              }
              return ret;
            case "Number":
              return fn(p, obj);
            default:
              throw new Error("argument of Function calcMAX was error!");;
          }
          break;
        default:
          throw new Error("argument of Function calcMAX was error!");;
      }
    };
    /**
     * @param {Array} obj
     * @param {number} value
     * @return {?}
     */
    var stringify = function(obj, value) {
      /** @type {Array} */
      var out = [];
      if (value) {
        /** @type {number} */
        var i = 0;
        var l = obj.length;
        for (;l > i;i++) {
          out.push(unique(value > i ? obj.slice(0, i + 1) : obj.slice(i - value + 1, i + 1)));
        }
      } else {
        /** @type {number} */
        var copies = 0;
        /** @type {number} */
        i = 0;
        l = obj.length;
        for (;l > i;i++) {
          copies += obj[i];
          out.push(copies);
        }
      }
      return out;
    };
    /**
     * @param {?} data
     * @param {number} obj
     * @param {string} input
     * @return {?}
     */
    var build = function(data, obj, input) {
      var name;
      var length;
      /** @type {Array} */
      var ret = [];
      var i_max = data.length;
      switch(isArray(obj)) {
        case "Array":
          length = obj.length;
          /** @type {number} */
          name = 0;
          for (;i_max > name;name++) {
            ret.push("Number" == isArray(data[name]) && "Number" == isArray(obj[name]) ? merge(input, data[name], obj[name]) : null);
          }
          for (;ret.length < length;) {
            ret.push(null);
          }
          break;
        case "Number":
          /** @type {number} */
          name = 0;
          for (;i_max > name;name++) {
            ret.push("Number" == isArray(data[name]) ? merge(input, data[name], obj) : null);
          }
          break;
        default:
          throw Error("the Second argument of Function operateArr is wrong!");;
      }
      return ret;
    };
    return{
      /** @type {function (?, string, Function): ?} */
      getArr : clean,
      /** @type {function (?, number): ?} */
      calcMA : contains,
      /** @type {function (Array, number): ?} */
      calcEMA : token,
      /** @type {function (Array, number, number): ?} */
      calcSMA : clone,
      /** @type {function (?, number): ?} */
      calcREF : queue,
      /** @type {function (Array, number, ?, ?): ?} */
      calcSAR : create,
      /** @type {function (Array): ?} */
      calcA : promote,
      /** @type {function (Array, number): ?} */
      calcSD : parse,
      /** @type {function (string, number): ?} */
      calcSTD : sync,
      /** @type {function (string, number): ?} */
      calcAVEDEV : next,
      /** @type {function (string, number): ?} */
      calcHHV : each,
      /** @type {function (string, number): ?} */
      calcLLV : emit,
      /** @type {function (Array): ?} */
      calcABS : set,
      /** @type {function (number, (Array|number)): ?} */
      calcMAX : trigger,
      /** @type {function (Array, number): ?} */
      calcSUM : stringify,
      /** @type {function (?, number, string): ?} */
      operateArr : build
    };
  }();
  util.fInherit(win, self);
  util.fInherit(Path, self);
  util.fInherit(ret, self);
  util.fInherit(Test, self);
  util.fInherit(format, self);
  util.fInherit(listener, self);
  util.fInherit(init, self);
  util.fInherit(end, self);
  util.fInherit(f, self);
  util.fInherit(onComplete, self);
  util.fInherit(Player, self);
  util.fInherit(set, self);
  util.fInherit(Module, self);
  util.fInherit(table, self);
  util.fInherit(on, table);
  util.fInherit(param, self);
  util.fInherit(exports, self);
  util.fInherit(ready, self);
  util.fInherit(Plot, self);
  util.fInherit(chunk, self);
  util.fInherit(fn, self);
  util.fInherit(Particle, self);
  util.fInherit(text, self);
  util.fInherit(setup, self);
  util.fInherit(next, self);
  util.fInherit(where, fn);
  util.fInherit(callback, self);
  util.fInherit(World, self);
  util.fInherit(c, self);
  util.fInherit(process, self);
  util.fInherit(require, self);
  util.fInherit(walk, self);
  util.fInherit(Scene, self);
  util.fInherit(draw, self);
  util.fInherit(isObject, self);
  util.fInherit(scale, self);
  util.fInherit(handle, draw);
  util.fInherit(update, self);
  util.fInherit(post, update);
  util.fInherit(change, self);
  util.fInherit(map, self);
  util.fInherit(e, self);
  util.fInherit(getData, self);
  util.fInherit(load, self);
  var jQuery = function() {
    /**
     * @param {Object} target
     * @return {undefined}
     */
    var register = function(target) {
      /**
       * @return {?}
       */
      var handler = function() {
        var source;
        var object;
        var actual = {
          /** @type {function (?, ?): undefined} */
          BF : format
        };
        /** @type {Array} */
        var tokenized = [{
          h : "http://127.0.0.1",
          a : actual
        }, {
          h : "http://localhost",
          a : actual
        }, {
          h : "http://xuan.sina.com.cn",
          a : actual
        }, {
          h : "http://tmp.sina.com.cn",
          a : actual
        }, {
          h : "https://touzi.sina.cn/",
          a : actual
        }, {
          h : "http://touzi.sina.cn/",
          a : actual
        }, {
          h : "https://touzi.sina.com.cn/",
          a : actual
        }, {
          h : "http://touzi.sina.com.cn/",
          a : actual
        }];
        /** @type {string} */
        var t = document.location.href;
        /** @type {number} */
        var index = tokenized.length;
        for (;index--;) {
          if (object = tokenized[index], 0 === t.indexOf(object.h)) {
            source = object.a;
            break;
          }
        }
        return source;
      };
      var source = handler();
      if (source && target) {
        var key;
        for (key in source) {
          if (source.hasOwnProperty(key)) {
            target[key] = source[key];
          }
        }
      }
    };
    /**
     * @param {Object} obj
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    var clone = function(obj, dataAndEvents) {
      var n = obj.name;
      var l = obj.param;
      /** @type {string} */
      var m = dataAndEvents ? "r_" : "s_";
      util.stc(m + n, l);
    };
    return{
      /** @type {function (Object, boolean): undefined} */
      doStc : clone,
      /** @type {function (Object): undefined} */
      auth : register
    };
  }();
  return new function() {
    /** @type {string} */
    this.VER = "6.5.1";
    /**
     * @param {?} num
     * @param {?} cb
     * @return {undefined}
     */
    this.get = function(num, cb) {
      if (util.isFunc(cb)) {
        cb({
          /** @type {function (Object): ?} */
          tChart : Node,
          /** @type {function (Object): ?} */
          pChart : create
        });
      }
    };
  };
});
