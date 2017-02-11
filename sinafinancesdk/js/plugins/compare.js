xh5_define("plugins.compare", ["utils.util"], function(element) {
  /**
   * @param {Element} options
   * @return {undefined}
   */
  function init(options) {
    /**
     * @param {string} path
     * @return {?}
     */
    function search(path) {
      return "string" == typeof path ? path.replace(/\./g, "$") : search(path + "").split(",");
    }
    /**
     * @param {string} val
     * @return {?}
     */
    function split(val) {
      return "string" == typeof val ? val.replace(/\$/g, ".") : split(val + "").split(",");
    }
    /**
     * @return {undefined}
     */
    function init() {
      /** @type {string} */
      var edage = $.clsName.edage;
      /** @type {string} */
      var label = $.clsName.label;
      /** @type {string} */
      var panel = $.clsName.panel;
      /** @type {string} */
      var dataValue = $.clsName.panel_popup;
      /** @type {string} */
      var list = $.clsName.list;
      /** @type {string} */
      var prefix = $.clsName.dellist;
      /** @type {string} */
      var item = $.clsName.item;
      /** @type {string} */
      var inner = $.clsName.alert;
      /** @type {string} */
      var button = $.clsName.button;
      /** @type {string} */
      var input = $.clsName.input;
      /** @type {string} */
      var increm = "\n";
      if (options.delistPos) {
        $.clsStyle = $.weiboclsStyle;
      }
      /** @type {string} */
      edage = "." + edage + $.clsStyle.edage + increm;
      /** @type {string} */
      label = "." + label + $.clsStyle.label + increm;
      /** @type {string} */
      list = "." + list + $.clsStyle.list + increm;
      /** @type {string} */
      prefix = "." + prefix + $.clsStyle.dellist + increm;
      /** @type {string} */
      item = "." + item + $.clsStyle.item + increm;
      /** @type {string} */
      panel = "." + panel + $.clsStyle.panel + increm;
      /** @type {string} */
      dataValue = "." + dataValue + $.clsStyle.popup + increm;
      /** @type {string} */
      input = "." + input + $.clsStyle.input + increm;
      /** @type {string} */
      inner = "." + inner + $.clsStyle.alert + increm;
      /** @type {string} */
      button = "." + button + $.clsStyle.button;
      /** @type {string} */
      var testLabel = "." + $.clsName.button + " a" + $.clsStyle.button_a + increm + "." + $.clsName.button + " a:hover" + $.clsStyle.button_a_hover + increm;
      /** @type {string} */
      var s_to_now = "." + $.clsName.more + $.clsStyle.more + increm;
      /** @type {string} */
      var s = "." + $.clsName.more + " a" + $.clsStyle.button_a + increm + "." + $.clsName.more + " a:hover" + $.clsStyle.button_a_hover + increm;
      /** @type {string} */
      var styleSheet = edage + label + panel + dataValue + button + testLabel + input + list + prefix + item + s_to_now + s + inner;
      css.inject(styleSheet);
    }
    /**
     * @return {undefined}
     */
    function parse() {
      var selectedItem;
      /** @type {string} */
      var s = selectedItem = '<div id="h5tk_compareLabel_' + options.id + '" class=' + $.clsName.list + "></div>";
      if (options.delistPos) {
        /** @type {string} */
        s = "";
      } else {
        /** @type {string} */
        selectedItem = "";
      }
      /** @type {string} */
      var suffix = '<div class="' + $.clsName.edage + '"><h4 class=' + $.clsName.label + '>对比：</h4><div class="' + $.clsName.panel + '" id="h5tk_compareIndex_" ' + options.id + '></div><input type="text" id="h5tk_compareTxt_' + options.id + '" class="' + $.clsName.input + '"><span class="' + $.clsName.button + '" id="h5tk_compareBtn_' + options.id + '"><a>对比</a></span><span class="' + $.clsName.more + '" id="h5tk_comparemoreBtn_' + options.id + '"><a>更多</a></span><div class="' +
      $.clsName.alert + '" id="h5tk_compareMsg_' + options.id + '"></div>' + selectedItem + "</div>";
      /** @type {string} */
      next(options.compare_dom_id).innerHTML = s + suffix;
    }
    /**
     * @return {undefined}
     */
    function show() {
      self = new load;
      self.bind({
        position : options.position,
        input : "h5tk_compareTxt_" + options.id,
        "default" : "输入证券代码或名称",
        width : 280,
        type : "11,12,13,14,15,31,41,71,73,81",
        head : ["选项", "类型", "代码", "中文名称"],
        body : [-1, -2, 2, 4],
        /** @type {function (string): ?} */
        callback : complete
      });
    }
    /**
     * @param {?} element
     * @param {string} format
     * @return {undefined}
     */
    function fn(element, format) {
      /** @type {string} */
      next(element).style.display = "block";
      /** @type {string} */
      next(element).innerHTML = format;
      clearTimeout(tref);
      /** @type {number} */
      tref = setTimeout(function() {
        /** @type {string} */
        next(element).style.display = "none";
      }, backoff);
    }
    /**
     * @param {Function} args
     * @param {Array} color
     * @return {?}
     */
    function start(args, color) {
      var p = createElement("div");
      var span = createElement("span");
      var element = createElement("span");
      return p.appendChild(span), p.appendChild(element), next("h5tk_compareLabel_" + options.id).appendChild(p), span.className = $.clsName.dellist, element.className = $.clsName.item, element.style.color = color, element.innerHTML = args.name, p.setAttribute("data-symbol", args.symbol), doc.addHandler(p, "click", function() {
        var i;
        var symbol = this.getAttribute("data-symbol");
        if (codeSegments) {
          /** @type {number} */
          i = 0;
          for (;i < codeSegments.length;i++) {
            codeSegments[i].compare({
              symbol : symbol
            }, true);
          }
        }
        /** @type {number} */
        i = contexts.length - 1;
        for (;i >= 0;i--) {
          if (contexts[i].symbol == symbol) {
            contexts.splice(i, 1);
            options.color.push(options.color[i]);
            options.color.splice(i, 1);
          }
        }
        next("h5tk_compareLabel_" + options.id).removeChild(this);
        if (contexts.length <= 0) {
          /** @type {string} */
          next("h5tk_compareLabel_" + options.id).style.display = "none";
          if (options.delistPos) {
            /** @type {string} */
            next("h5tk_compareTxt_" + options.id).style.width = "396px";
          }
        }
      }), p;
    }
    /**
     * @param {string} n
     * @return {undefined}
     */
    function test(n) {
      if (KKE) {
        KKE.api("datas.hq.get", {
          symbol : n
        }, function(messageEvent) {
          if (!messageEvent.data[0].name) {
            return void fn("h5tk_compareMsg_" + options.id, item.delist);
          }
          var errorName = messageEvent.data[0].name.length > 4 ? messageEvent.data[0].name.substring(0, 4) + ".." : messageEvent.data[0].name;
          var details = {
            symbol : n,
            name : errorName
          };
          if (contexts.push(details), start(details, options.color[contexts.length - 1]), codeSegments) {
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
              codeSegments[i].compare({
                symbol : n,
                linecolor : {
                  K_N : options.color[contexts.length - 1]
                }
              });
            }
          }
          /** @type {string} */
          next("h5tk_compareLabel_" + options.id).style.display = "block";
          if (options.delistPos) {
            /** @type {string} */
            next("h5tk_compareTxt_" + options.id).style.width = "126px";
          }
        });
      }
    }
    /**
     * @param {string} selector
     * @param {number} string
     * @return {?}
     */
    function clean(selector, string) {
      var value;
      var appFrontendUrl;
      var elem = element.market(selector);
      switch(elem) {
        case "HK":
          value = selector.replace("rt_hk", "");
          value = value.replace("hk", "");
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/hkstock/quotes/" + value + ".html";
          break;
        case "US":
          value = selector.replace("gb_", "");
          value = 1 == string ? search(value) : split(value);
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/usstock/quotes/" + value + ".html";
          break;
        case "OTC":
          /** @type {string} */
          value = selector;
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/thirdmarket/quotes/" + value + ".html";
          break;
        case "forex":
          if ("DINIW" != selector || "USDCNY" != selector) {
            value = selector.replace("fx_", "");
          }
          /** @type {string} */
          appFrontendUrl = "//finance.sina.com.cn/money/forex/hq/" + value + ".shtml";
          break;
        default:
          /** @type {string} */
          value = selector;
          /** @type {string} */
          appFrontendUrl = "//finance.sina.com.cn/realstock/company/" + value + "/nc.shtml";
      }
      return{
        symbol : value,
        url : appFrontendUrl
      };
    }
    /**
     * @param {string} val
     * @return {undefined}
     */
    function check(val) {
      var s = clean(val, 1).symbol;
      if (void 0 == s) {
        /** @type {string} */
        s = "";
      }
      next("h5tk_compareTxt_" + options.id).value = s;
      next("h5tk_compareTxt_" + options.id).setAttribute("data-symbol", val);
    }
    /**
     * @param {string} res
     * @return {?}
     */
    function complete(res) {
      if (check(res), res === codeSegments[0].chartUserobj.symbol) {
        return void fn("h5tk_compareMsg_" + options.id, item.added);
      }
      if (!res || "输入证券代码或名称" == res) {
        return void fn("h5tk_compareMsg_" + options.id, item.no);
      }
      if (contexts.length >= params) {
        return void fn("h5tk_compareMsg_" + options.id, item.more);
      }
      /** @type {number} */
      var i = 0;
      for (;i < contexts.length;i++) {
        if (contexts[i].symbol == res) {
          return void fn("h5tk_compareMsg_" + options.id, item.added);
        }
      }
      /** @type {string} */
      response = res;
      test(res);
    }
    /**
     * @return {undefined}
     */
    function success() {
      doc.addHandler(next("h5tk_compareBtn_" + options.id), "click", function() {
        var codeSegments = self.stockInfo();
        var g = next("h5tk_compareTxt_" + options.id).getAttribute("data-symbol");
        if ("" !== g) {
          /** @type {number} */
          var a = 0;
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            if (g == codeSegments[i].symbol) {
              complete(codeSegments[i].symbol);
              /** @type {number} */
              a = 1;
              break;
            }
          }
          if (0 == a) {
            complete(codeSegments[0].symbol);
          }
        }
      });
      var nType = element.urlUtil.getMainUrl();
      /** @type {number} */
      var a = 0;
      if (/.*(sina.com.cn|sina.cn).*/.test(nType)) {
        /** @type {number} */
        a = 1;
      }
      if (0 == a) {
        /** @type {string} */
        next("h5tk_comparemoreBtn_" + options.id).style.display = "block";
      }
      doc.addHandler(next("h5tk_comparemoreBtn_" + options.id), "click", function() {
        var url = clean(options.userObj.symbol).url;
        window.open(url);
      });
    }
    /**
     * @return {undefined}
     */
    function done() {
      init();
      parse();
      show();
      success();
    }
    /**
     * @return {undefined}
     */
    var load = function() {
      /** @type {string} */
      this._stringOriginalUrl = "//suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@";
      /** @type {string} */
      this._stringUrl = "";
      /** @type {null} */
      this._elementScriptLoader = null;
      /** @type {null} */
      this._elementContainer = null;
      /** @type {string} */
      this._stringOriginalValue = "";
      /** @type {string} */
      this._stringLastValue = "";
      /** @type {null} */
      this._functionCallback = null;
      /** @type {null} */
      this._elementLineCurrent = null;
      this._objectHtml = {};
      this._objectData = {};
      /** @type {boolean} */
      this._booleanHideDelay = false;
      /** @type {string} */
      this._stringBrowserType = "";
      this._objectType = {
        11 : "A 股",
        12 : "B 股",
        13 : "权证",
        14 : "期货",
        15 : "债券",
        21 : "开基",
        22 : "ETF",
        23 : "LOF",
        24 : "货基",
        25 : "QDII",
        26 : "封基",
        31 : "港股",
        32 : "窝轮",
        33 : "港指数",
        41 : "美股",
        42 : "外期",
        71 : "外汇",
        73 : "OTC",
        81 : "债券",
        82 : "债券"
      };
      this._objectConfig = {
        position : null,
        input : null,
        loader : null,
        value : null,
        "default" : null,
        type : 0,
        max : 10,
        width : 220,
        link : null,
        target : "_blank",
        head : ["选项", "代码", "名称"],
        body : [-1, 2, 4],
        fix : {
          firefox : [1, 1]
        },
        /**
         * @return {undefined}
         */
        onshow : function() {
        },
        /**
         * @return {undefined}
         */
        onhide : function() {
        },
        hideSelectForIE6 : false,
        callback : null
      };
      /**
       * @param {?} opt_id
       * @return {?}
       */
      this._getElement = function(opt_id) {
        return document.getElementById(opt_id);
      };
      /**
       * @return {?}
       */
      this._getRandom = function() {
        return(new Date).getTime();
      };
      /**
       * @param {?} func
       * @param {(Array|string)} newargs
       * @return {?}
       */
      this._bind = function(func, newargs) {
        var thisBinding = this;
        return function() {
          /** @type {null} */
          var args = null;
          if ("undefined" != typeof newargs) {
            /** @type {number} */
            var i = 0;
            for (;i < arguments.length;i++) {
              newargs.push(arguments[i]);
            }
            /** @type {(Array|string)} */
            args = newargs;
          } else {
            /** @type {Arguments} */
            args = arguments;
          }
          return func.apply(thisBinding, args);
        };
      };
      /**
       * @param {HTMLElement} elem
       * @param {string} event
       * @param {?} handle
       * @return {undefined}
       */
      this._aevent = function(elem, event, handle) {
        if (window.addEventListener) {
          elem.addEventListener(event, handle, false);
        } else {
          if (window.attachEvent) {
            elem.attachEvent("on" + event, handle);
          }
        }
      };
      /**
       * @return {undefined}
       */
      this._position = function() {
        /** @type {number} */
        var top = 0;
        /** @type {number} */
        var left = 0;
        var elm = this._elementInput;
        do {
          if (top += elm.offsetTop || 0, left += elm.offsetLeft || 0, "relative" != elm.style.position) {
            break;
          }
          elm = elm.offsetParent;
        } while (elm);
        /** @type {Array} */
        var center = [1 * this._elementInput.parentNode.style.borderTopWidth.replace("px", ""), 1 * this._elementInput.parentNode.style.borderLeftWidth.replace("px", "")];
        /** @type {Array} */
        __arrayPositionFix = [0, 0];
        if (this._elementContainer.style.top != top + "px") {
          /** @type {string} */
          this._elementContainer.style.top = top - center[0] + __arrayPositionFix[0] + "px";
        }
        if (this._elementContainer.style.left != left + "px") {
          /** @type {string} */
          this._elementContainer.style.left = left - center[1] + __arrayPositionFix[1] + "px";
        }
        var val = this._elementInput.style.borderTopWidth;
        var c = this._elementInput.style.borderBottomWidth;
        var barHeight = this._elementInput.clientHeight;
        barHeight += "" != val ? 1 * val.replace("px", "") : 2;
        barHeight += "" != c ? 1 * c.replace("px", "") : 2;
        if (this._elementContainer.style.marginTop != barHeight + "px") {
          /** @type {string} */
          this._elementContainer.style.marginTop = barHeight + "px";
        }
      };
      /**
       * @param {string} typeName
       * @return {?}
       */
      this._getType = function(typeName) {
        return{
          1 : "stock",
          2 : "fund",
          3 : "hk",
          4 : "us"
        }[typeName.substr(0, 1)];
      };
      /**
       * @return {undefined}
       */
      this._fill = function() {
        var key = this._elementInput.value;
        if ("key_" + key in this._objectData && "" != this._objectData["key_" + key]) {
          if (null == this._elementContainer) {
            /** @type {Element} */
            this._elementContainer = document.createElement("div");
            this._elementContainer.style.cssText += "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" + this._objectConfig.width + "px; z-index:999;";
            this._elementInput.parentNode.insertBefore(this._elementContainer, this._elementInput);
            this._elementContainer.suggest = this;
          }
          this._position();
          /** @type {string} */
          var optsData = "";
          if (optsData += '<table style="border-collapse:collapse; line-height:18px; border:2px solid #EEE; background-color:#FFF; font-size:12px; text-align:center; color:#999; width:' + (this._objectConfig.width - 2) + 'px;">', null != this._objectConfig.head) {
            optsData += '<tr style="background-color:#F3F3F3;">';
            var i;
            for (i in this._objectConfig.head) {
              if (this._objectConfig.head.hasOwnProperty(i)) {
                optsData += "<td>" + this._objectConfig.head[i] + "</td>";
              }
            }
            optsData += "</tr>";
          }
          var aHash = (this._objectData["key_" + key] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";");
          var l = aHash.length > this._objectConfig.max ? this._objectConfig.max : aHash.length;
          /** @type {string} */
          var o = "parentNode.parentNode.parentNode['suggest']";
          /** @type {number} */
          i = 0;
          for (;l > i;i++) {
            var m = aHash[i].split(",");
            if (m[-1] = m[0].replace(new RegExp(key.toLowerCase().replace(/(^\s*)|(\s*$)/g, "").replace(/\./g, function(dataAndEvents) {
              return "\\" + dataAndEvents;
            }), "gi"), function(dataAndEvents) {
              return'<span style="color:#F00;">' + dataAndEvents + "</span>";
            }), m[-2] = m[1] in this._objectType ? this._objectType[m[1]] : "——", null == this._objectConfig.link || "" == this._objectConfig.link) {
              /** @type {Array} */
              var paths = ['<td style="padding:0px;"><span style="display:block; padding:1px;">', "</span></td>"]
            } else {
              var t = this._objectConfig.link.replace(/@type@/g, this._getType(m[1]) || m[1]).replace(/@code@/g, this._getFullCode(m));
              var k;
              for (k in m) {
                if (m.hasOwnProperty(k)) {
                  t = t.replace(new RegExp("@" + k + "@", "g"), m[k]);
                }
              }
              /** @type {Array} */
              paths = ['<td style="padding:0px;"><a href="' + t + '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' + o + "['hidepause'](this);\" onclick=\"return this.parentNode.parentNode." + o + '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="' + this._objectConfig.target + '">', "</a></td>"];
            }
            optsData += '<tr id="' + aHash[i] + '" style="cursor:pointer;" onmouseover="this.' + o + "['mouseoverLine'](this);\" onmouseout=\"this." + o + "['mouseoutLine'](this);\" onmousedown=\"this." + o + "['setLineMouse'](this);\">";
            for (k in this._objectConfig.body) {
              if (this._objectConfig.body.hasOwnProperty(k)) {
                optsData += paths[0] + m[this._objectConfig.body[k]] + paths[1];
              }
            }
            optsData += "</tr>";
          }
          optsData += "</table>";
          /** @type {string} */
          this._objectHtml["key_" + key] = optsData;
          /** @type {null} */
          this._elementLineCurrent = null;
          document.createElement("div");
          this._elementContainer.innerHTML = this._objectHtml["key_" + key];
          this._show();
          this._filled();
        } else {
          this._hide();
        }
      };
      /**
       * @param {Element} obj
       * @return {undefined}
       */
      this._color = function(obj) {
        /** @type {string} */
        var color = "";
        if (obj._booleanArrow && obj._booleanMouse) {
          /** @type {string} */
          color = "#F8FBDF";
        } else {
          if (obj._booleanArrow) {
            /** @type {string} */
            color = "#F1F5FC";
          } else {
            if (obj._booleanMouse) {
              /** @type {string} */
              color = "#FCFEDF";
            }
          }
        }
        if (obj.style.backgroundColor != color) {
          /** @type {string} */
          obj.style.backgroundColor = color;
        }
      };
      /**
       * @param {Element} walkers
       * @return {undefined}
       */
      this.mouseoverLine = function(walkers) {
        /** @type {boolean} */
        walkers._booleanMouse = true;
        this._color(walkers);
      };
      /**
       * @param {Element} walkers
       * @return {undefined}
       */
      this.mouseoutLine = function(walkers) {
        /** @type {boolean} */
        walkers._booleanMouse = false;
        this._color(walkers);
      };
      /**
       * @param {Object} filter
       * @return {undefined}
       */
      this.setLineMouse = function(filter) {
        this.setLine(filter);
        if (null != this._functionCallback) {
          this._functionCallback(this._elementInput.value, filter.id.split(","));
        }
      };
      /**
       * @param {Array} b
       * @return {?}
       */
      this._getFullCode = function(b) {
        var sb;
        switch(b[1]) {
          case "11":
          ;
          case "12":
          ;
          case "13":
          ;
          case "14":
          ;
          case "15":
          ;
          case "21":
          ;
          case "22":
          ;
          case "23":
          ;
          case "24":
          ;
          case "25":
          ;
          case "26":
            return b[3];
          case "71":
            return sb = "DINIW" === b[2] || "USDCNY" === b[2] ? b[2] : "fx_s" + b[2];
          case "73":
            return sb = "sb" + b[2];
          case "31":
          ;
          case "32":
          ;
          case "33":
            return sb = "rt_hk" + b[2];
          case "41":
            return sb = "gb_" + b[2];
          default:
            return b[2];
        }
      };
      /**
       * @param {string} elem
       * @return {undefined}
       */
      this.setLine = function(elem) {
        var found = elem.id.split(",");
        var text = this._objectConfig.value;
        if (null != text && "" != text) {
          /** @type {number} */
          var k = 0;
          for (;k < found.length;k++) {
            text = text.replace(new RegExp("@" + k + "@", "g"), found[k]);
          }
          var result = text;
        } else {
          result = this._getFullCode(found);
        }
        var parent = elem.id;
        /** @type {number} */
        k = 2;
        for (;5 > k;k++) {
          /** @type {string} */
          this._objectData["key_" + found[k]] = parent + ";";
        }
        this._stringLastValue = result;
        this._elementInput.value = result;
        if (null != this._elementLineCurrent) {
          /** @type {boolean} */
          this._elementLineCurrent._booleanArrow = false;
          this._color(this._elementLineCurrent);
        }
        /** @type {boolean} */
        elem._booleanArrow = true;
        this._color(elem);
        /** @type {string} */
        this._elementLineCurrent = elem;
      };
      /**
       * @return {undefined}
       */
      this._show = function() {
        if (null != this._elementContainer) {
          if (this._elementContainer.style.display = "", this._objectConfig.onshow(), this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType) {
            /** @type {NodeList} */
            var codeSegments = document.getElementsByTagName("select");
            /** @type {number} */
            var i = 0;
            for (;i < codeSegments.length;i++) {
              /** @type {string} */
              codeSegments[i].style.visibility = "hidden";
            }
          }
          if (null != this._objectConfig.position) {
            /** @type {(number|string)} */
            var h = window.getComputedStyle(this._elementContainer).height;
            /** @type {number} */
            h = Number(h.replace("px", ""));
            if (h) {
              if ("auto" != h) {
                /** @type {string} */
                this._elementContainer.style.top = -(h + 26) + "px";
              }
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.hidepause = function() {
        /** @type {boolean} */
        this._booleanHideDelay = true;
      };
      /**
       * @return {undefined}
       */
      this.hideresume = function() {
        /** @type {boolean} */
        this._booleanHideDelay = false;
        this._hideNow();
      };
      /**
       * @return {undefined}
       */
      this._hide = function() {
        if (0 == this._booleanHideDelay) {
          this._hideNow();
        }
      };
      /**
       * @return {undefined}
       */
      this._hideNow = function() {
        if (null != this._elementContainer && (this._elementContainer.style.display = "none", this._objectConfig.onhide(), this._objectConfig.hideSelectForIE6 && "ie6" == this._stringBrowserType)) {
          /** @type {NodeList} */
          var codeSegments = document.getElementsByTagName("select");
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            /** @type {string} */
            codeSegments[i].style.visibility = "visible";
          }
        }
      };
      /**
       * @param {string} key
       * @param {?} url
       * @param {?} file
       * @return {undefined}
       */
      this._load = function(key, url, file) {
        if (null == this._elementScriptLoader) {
          /** @type {Element} */
          this._elementScriptLoader = document.createElement("div");
          /** @type {string} */
          this._elementScriptLoader.style.display = "none";
          this._elementInput.parentNode.insertBefore(this._elementScriptLoader, this._elementInput);
        }
        var code = "suggestdata_" + this._getRandom();
        /** @type {Element} */
        var script = document.createElement("script");
        /** @type {string} */
        script.type = "text/javascript";
        /** @type {string} */
        script.charset = "UTF-8";
        script.src = this._stringUrl.replace("@NAME@", code).replace("@KEY@", encodeURIComponent(key.toLowerCase()));
        script._object = this;
        if (url) {
          script._functionCallbackTrue = url;
        }
        if (file) {
          script._functionCallbackFalse = file;
        }
        /** @type {string} */
        script._stringValue = key;
        script._stringName = code;
        /**
         * @return {undefined}
         */
        script[document.all ? "onreadystatechange" : "onload"] = function() {
          if (!document.all || ("loaded" == this.readyState || "complete" == this.readyState)) {
            var y = window[this._stringName];
            if ("undefined" != typeof y) {
              this._object._objectData["key_" + this._stringValue] = y;
              this._functionCallbackTrue(y);
              /** @type {null} */
              window[this._stringName] = null;
            } else {
              if (this._functionCallbackFasle) {
                this._functionCallbackFasle("");
              }
            }
            /** @type {null} */
            this._object = null;
            /** @type {null} */
            this._stringValue = null;
            /** @type {null} */
            this._stringName = null;
            /** @type {null} */
            this[document.all ? "onreadystatechange" : "onload"] = null;
            this.parentNode.removeChild(this);
          }
        };
        this._elementScriptLoader.appendChild(script);
      };
      /**
       * @return {undefined}
       */
      this._check = function() {
        var key = this._elementInput.value;
        if (this._stringLastValue != key) {
          this._stringLastValue = key;
          if ("" != key) {
            if ("key_" + key in this._objectData) {
              this._fill();
            } else {
              this._load(key, this._bind(this._fill), this._bind(this._hide));
            }
          } else {
            if (null != this._elementContainer) {
              /** @type {null} */
              this._elementLineCurrent = null;
              /** @type {string} */
              this._elementContainer.innerHTML = "";
            }
            this._hide();
          }
        } else {
          this._show();
        }
      };
      /**
       * @return {undefined}
       */
      this._eventFocus = function() {
        if (this._elementInput.value == this._stringOriginalValue) {
          /** @type {string} */
          this._elementInput.value = "";
        }
        /** @type {string} */
        this._stringLastValue = "";
        this._check();
      };
      /**
       * @return {undefined}
       */
      this._eventBlur = function() {
        if ("" == this._elementInput.value) {
          this._elementInput.value = this._stringOriginalValue;
        }
        /** @type {string} */
        this._stringLastValue = "";
        this._hide();
      };
      /**
       * @return {undefined}
       */
      this._eventButtonUp = function() {
        /** @type {string} */
        this._allData = this._firstData = "undefined";
        var event = arguments[0] || window.event;
        /** @type {number} */
        var rowIndex = null == this._objectConfig.head ? 0 : 1;
        switch(event.keyCode) {
          case 38:
            if (null != this._elementContainer) {
              if (null != this._elementContainer.firstChild) {
                this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != rowIndex ? this._elementLineCurrent.rowIndex - 1 : this._elementContainer.firstChild.rows.length - 1]);
              }
            }
            break;
          case 40:
            if (null != this._elementContainer) {
              if (null != this._elementContainer.firstChild) {
                this.setLine(this._elementContainer.firstChild.rows[this._elementLineCurrent && this._elementLineCurrent.rowIndex != this._elementContainer.firstChild.rows.length - 1 ? this._elementLineCurrent.rowIndex + 1 : rowIndex]);
              }
            }
            break;
          case 13:
            if (null != this._elementContainer) {
              if (null != this._elementLineCurrent) {
                this.setLine(this._elementLineCurrent);
              }
              if (null != this._functionCallback) {
                this._functionCallback(this._elementInput.value, this._elementLineCurrent ? this._elementLineCurrent.id.split(",") : []);
              }
            }
            this._hide();
            break;
          default:
            this._check();
        }
        this._filled();
      };
      /** @type {string} */
      this._firstData = "undefined";
      /** @type {string} */
      this._allData = "undefined";
      /**
       * @return {undefined}
       */
      this._filled = function() {
        var uHostName = (null == this._objectConfig.head ? 0 : 1, this._objectData["key_" + this._elementInput.value]);
        if (uHostName) {
          var data;
          var options;
          var codeSegments = uHostName.split(";");
          /** @type {Array} */
          var params = [];
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            data = codeSegments[i].split(",");
            data[3] = this._getFullCode(data);
            options = {
              user : data[0],
              type : data[1],
              code : data[2],
              symbol : data[3],
              name : data[4],
              py : data[5]
            };
            if (0 == i) {
              this._firstData = options;
            }
            params.push(options);
          }
          /** @type {Array} */
          this._allData = params;
        }
      };
      /**
       * @return {?}
       */
      this.stockInfo = function() {
        return this._allData;
      };
      /**
       * @param {string} i
       * @return {?}
       */
      this.getCodeFromCache = function(i) {
        return "key_" + i in this._objectData ? this._objectData["key_" + i] : void 0;
      };
      /**
       * @param {string} key
       * @param {?} test
       * @return {undefined}
       */
      this.getCode = function(key, test) {
        if ("key_" + key in this._objectData) {
          test(this._objectData["key_" + key]);
        } else {
          this._load(key, test, test);
        }
      };
      /**
       * @param {string} type
       * @return {undefined}
       */
      this.changeType = function(type) {
        if (this._objectHtml = {}, this._objectData = {}, this._elementInput.value = this._stringOriginalValue, "undefined" != typeof type) {
          /** @type {string} */
          var msg = "";
          switch(type.toLowerCase()) {
            case "stock":
              /** @type {string} */
              msg = "11,12,13,14,15";
              break;
            case "fund":
              /** @type {string} */
              msg = "21,22,23,24,25,26";
              break;
            case "hkstock":
              /** @type {string} */
              msg = "31";
              break;
            case "hk":
              /** @type {string} */
              msg = "31,33,32";
              break;
            case "usstock":
              /** @type {string} */
              msg = "41";
              break;
            case "us":
              /** @type {string} */
              msg = "41,42";
              break;
            case "fx":
              /** @type {string} */
              msg = "71";
              break;
            default:
              /** @type {string} */
              msg = type;
          }
          this._stringUrl = this._stringOriginalUrl.replace("@TYPE@", msg);
        } else {
          this._stringUrl = this._stringOriginalUrl.replace("type=@TYPE@&", "");
        }
        /** @type {string} */
        this._objectConfig.type = type;
      };
      /**
       * @param {string} link
       * @return {undefined}
       */
      this.changeLink = function(link) {
        /** @type {string} */
        this._objectConfig.link = link;
        this._fill();
        this._hide();
      };
      /**
       * @return {undefined}
       */
      this.clear = function() {
        /** @type {null} */
        this._stringLastValue = null;
        /** @type {string} */
        this._elementInput.value = "";
        this._check();
        this._elementInput.value = this._stringOriginalValue;
      };
      /**
       * @param {Object} opts
       * @return {undefined}
       */
      this.bind = function(opts) {
        if ("undefined" != typeof opts) {
          var key;
          for (key in opts) {
            this._objectConfig[key] = opts[key];
          }
        }
        this._elementInput = "string" == typeof this._objectConfig.input ? document.getElementById(this._objectConfig.input) : this._objectConfig.input;
        if (null != this._objectConfig.loader) {
          /** @type {(HTMLElement|null)} */
          this._elementScriptLoader = "string" == typeof this._objectConfig.loader ? document.getElementById(this._objectConfig.loader) : this._objectConfig.loader;
        }
        if (this._elementInput) {
          this._stringOriginalValue = null == this._objectConfig["default"] || "" == this._objectConfig["default"] ? this._elementInput.value : this._objectConfig["default"];
          this.changeType(this._objectConfig.type);
          this._elementInput.value = this._stringOriginalValue;
          this._elementInput.setAttribute("autocomplete", "off");
          /** @type {string} */
          this._elementInput.autoComplete = "off";
          this._aevent(this._elementInput, "focus", this._bind(this._eventFocus));
          this._aevent(this._elementInput, "blur", this._bind(this._eventBlur));
          this._aevent(this._elementInput, "keyup", this._bind(this._eventButtonUp));
          this._aevent(this._elementInput, "mouseup", this._bind(this._eventButtonUp));
          this._functionCallback = this._objectConfig.callback;
        }
      };
    };
    var $ = {
      clsName : {
        edage : "kke_compare_edage",
        label : "kke_compare_label",
        alert : "kke_compare_alert",
        panel : "kke_compare_panel",
        panel_popup : "kke_compare_panel_popup",
        input : "kke_compare_input",
        list : "kke_compare_list",
        dellist : "kke_compare_dellist",
        item : "kke_compare_item",
        button : "kke_compare_button",
        more : "kke_compare_more"
      },
      clsStyle : {
        edage : "{width:100%;position:relative;float:left;margin-left:10px;}",
        label : "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
        alert : "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:60px;border:1px solid #ccc;background:#fff;}",
        panel : "{float:left;}",
        popup : "{float:left;display:none;}",
        input : "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
        list : "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;margin-left:55px; display:none;}",
        dellist : "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 2px -20px; float:left; cursor:pointer; margin:2px 5px 2px 0;width:18px;height:18px;border:1px solid #c4cbcf;}",
        item : "{ float:left;margin-right:30px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
        button : "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
        more : "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
        button_a : "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
        button_a_hover : "{background-color:#494949;color:#ffffff;}"
      },
      weiboclsStyle : {
        edage : "{width:100%;position:relative;float:left;margin-left:2px;}",
        label : "{float:left;color:#1a1a1a;font-family:Microsoft Yahei,Arial;font-weight:bold;padding:0;margin:0;}",
        alert : "{position:absolute;display:none;top:-30px; height:25px;line-height:25px;color:#ff0000; padding-left:5px; width:190px;left:36px;border:1px solid #ccc;background:#fff;}",
        panel : "{float:left;}",
        popup : "{float:left;display:none;}",
        input : "{float:left;width:396px;color:#969696;font-family:Microsoft Yahei,Arial;}",
        list : "{height:25px; background:#FFFFFF; line-height:24px; text-align:center;/*margin-left:55px;*/ display:none;}",
        dellist : "{background:url(//www.sinaimg.cn/cj/yw/img/bg_compare.png) #fff no-repeat 0px -22px; float:left; cursor:pointer; margin:4px 1px 2px 1px;width:14px;height:14px;border:1px solid #c4cbcf;}",
        item : "{ float:left;margin-right:10px;margin-bottom:3px;font-size:13px;line-height:24px;text-align:center;color:#f69931;cursor:pointer;}",
        button : "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;}",
        more : "{float:left;width:50px;text-align:center;background-color:#efefef;margin-right:2px;cursor:pointer;margin-left:1px;display:none;}",
        button_a : "{display:inline-block;width:50px;border:1px solid #d5d5d5;}",
        button_a_hover : "{background-color:#494949;color:#ffffff;}"
      }
    };
    /** @type {Array} */
    var codeSegments = [];
    options = _extend({
      clsName : {
        edage : $.clsName.edage,
        normal : $.clsName.label,
        alert : $.clsName.alert,
        list : $.clsName.list,
        dellist : $.clsName.dellist,
        panel : $.clsName.panel,
        button : $.clsName.button,
        more : $.clsName.more,
        panel_popup : $.clsName.panel_popup
      },
      flashDom : void 0,
      delistPos : void 0,
      compare_dom_id : void 0,
      position : null,
      userObj : {
        symbol : "sh000001"
      }
    }, options || null);
    options.id = options.compare_dom_id.split("_")[2];
    codeSegments.push(options.tkchart);
    var self;
    var tref;
    var response;
    /** @type {Array} */
    var contexts = [];
    /** @type {number} */
    var params = 4;
    var item = {
      no : "请选择要对比的证券代码名称拼音",
      added : "已经添加了该证券",
      delist : "此证券已退市",
      more : "最多可对比5只证券"
    };
    /** @type {number} */
    var backoff = 2E3;
    done();
  }
  var createElement = element.$C;
  var _extend = element.oc;
  var next = element.$DOM;
  var css = element.cssUtil;
  var doc = element.xh5_EvtUtil;
  var length = element.isFunc;
  return new function() {
    /** @type {string} */
    this.VER = "1.0.0";
    /**
     * @param {?} name
     * @param {?} errback
     * @return {undefined}
     */
    this.get = function(name, errback) {
      var err = new init(name);
      if (length(errback)) {
        errback(err);
      }
    };
  };
});
