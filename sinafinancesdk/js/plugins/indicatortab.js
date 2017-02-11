xh5_define("plugins.indicatortab", ["utils.util"], function($) {
  /**
   * @param {Object} initOpt
   * @return {undefined}
   */
  function init(initOpt) {
    /**
     * @param {(Array|string)} values
     * @return {?}
     */
    function fn(values) {
      if (!values) {
        return void 0;
      }
      if (!$.isArr(values)) {
        /** @type {Array} */
        values = [values];
      }
      var copies;
      /** @type {Array} */
      var out = [];
      /** @type {number} */
      var i = 0;
      var vlen = values.length;
      for (;vlen > i;i++) {
        copies = {
          name : values[i]
        };
        out.push(copies);
      }
      return out;
    }
    /**
     * @return {?}
     */
    function setup() {
      /**
       * @param {string} keepData
       * @return {undefined}
       */
      function remove(keepData) {
        that.save({
          options : {
            mode : "cookie",
            path : "/",
            expires : 71996400
          },
          uid : ["kke_indicator_news", (new Date).getTime()].join("|"),
          key : "kke_indicator_news",
          value : keepData
        });
      }
      /**
       * @return {?}
       */
      function start() {
        /** @type {boolean} */
        var event = false;
        return that.load({
          options : "cookie",
          uid : ["kke_indicator_news", (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
          key : "kke_indicator_news"
        }, function(message) {
          return'"BRAR"' == message ? (event = message, true) : event = false;
        }, true), event;
      }
      /**
       * @param {Object} view
       * @return {undefined}
       */
      function add(view) {
        if (!start()) {
          if ("k" == initOpt.type) {
            o.main.ctn = delegate("span");
            docFrag.appendChild(o.main.ctn);
            fn(view, o.main.ctn);
            init();
          }
        }
      }
      /**
       * @return {undefined}
       */
      function init() {
        var i;
        var nodes = el.childNodes;
        var len = nodes.length;
        if (!start()) {
          /** @type {number} */
          i = 0;
          for (;len > i;i++) {
            if (nodes[i].getAttribute("data-indicator") == o.child.name[0]) {
              o.child.ctn = delegate("span");
              nodes[i].appendChild(o.child.ctn);
              fn(o.child, o.child.ctn);
            }
          }
        }
      }
      /**
       * @return {undefined}
       */
      function refresh() {
        if (!start()) {
          /** @type {string} */
          o.main.ctn.style.display = o.child.ctn.style.display = "none";
          remove(o.child.name[0]);
        }
      }
      /**
       * @param {Object} options
       * @param {Element} div
       * @return {undefined}
       */
      function fn(options, div) {
        div.innerHTML = options.text;
        /** @type {string} */
        div.style.color = "#fff";
        /** @type {string} */
        div.style.fontFamily = "黑体";
        /** @type {string} */
        div.style.background = "#f00";
        /** @type {string} */
        div.style.width = div.style.height = div.style.lineHeight = options.radius + "px";
        /** @type {string} */
        div.style.WebkitBorderRadius = div.style.BorderRadius = div.style.MorBorderRadius = options.radius / 2 + "px";
        div.style.position = options.position || "absolute";
        /** @type {string} */
        div.style.styleFloat = div.style.cssFloat = "right";
        /** @type {string} */
        div.style.textAlign = "center";
        div.style.left = options.left || initOpt.posX + 2 * initOpt.tabheight + "px";
      }
      /**
       * @param {?} checkElement
       * @return {undefined}
       */
      function matches(checkElement) {
        docFrag = checkElement;
      }
      /**
       * @param {?} obj
       * @return {undefined}
       */
      function trigger(obj) {
        el = obj;
      }
      var docFrag;
      var el;
      var o = {
        main : {
          ctn : void 0,
          position : "absolute",
          display : "block",
          text : "",
          radius : 15
        },
        child : {
          ctn : void 0,
          num : 0,
          left : "0px",
          position : "relative",
          display : "none",
          name : ["BRAR"],
          text : "",
          radius : 7
        }
      };
      return{
        cfg : o,
        /** @type {function (): undefined} */
        displayAllCircle : refresh,
        /** @type {function (): undefined} */
        initChildCircle : init,
        /** @type {function (Object): undefined} */
        initCircle : add,
        /** @type {function (?): undefined} */
        getChildParentCtn : trigger,
        /** @type {function (?): undefined} */
        getMainParentCtn : matches
      };
    }
    /**
     * @return {undefined}
     */
    function init() {
      var el;
      var p;
      var element;
      /** @type {string} */
      var attribute = "data-indicator";
      /** @type {number} */
      var x = 50;
      var _super = new function() {
        /**
         * @return {undefined}
         */
        var flush = function() {
          var itemWithLeastDistance;
          var j = p.childNodes.length;
          for (;j--;) {
            itemWithLeastDistance = p.childNodes[j];
            $.cssUtil.rmCls(itemWithLeastDistance, initOpt.cssclass.active);
          }
        };
        /**
         * @param {?} e
         * @return {undefined}
         */
        var add = function(e) {
          me.preventDefault(e);
          var el = me.getTarget(e);
          activeElement = el;
          var name = el.getAttribute(attribute);
          if (key = name, name) {
            flush();
            $.cssUtil.adCls(el, initOpt.cssclass.active);
            /** @type {Array} */
            var isArray = [].concat(r).concat({
              name : name
            }).concat(elems);
            var ii = markers.length;
            for (;ii--;) {
              markers[ii].tCharts(isArray, {
                isexclusive : true
              });
            }
            if ("无" == name) {
              /** @type {string} */
              name = "none_indicator";
            }
            if (name == that.cfg.child.name) {
              that.displayAllCircle();
            }
            $.suda(initOpt.type + "_" + name);
          }
        };
        /**
         * @param {?} element
         * @return {undefined}
         */
        var init = function(element) {
          me.preventDefault(element);
          var child = me.getTarget(element);
          var arg = child.getAttribute("data-dir");
          self.drawTabs(arg);
          that.initChildCircle();
        };
        /**
         * @return {undefined}
         */
        this.init = function() {
          element = $.$C("div");
          el = $.$C("div");
          p = $.$C("ul");
          me.addHandler(element, "click", init);
          if ($.xh5_deviceUtil.allowt) {
            me.addHandler(element, "touchend", init);
          }
          me.addHandler(p, "click", add);
          if ($.xh5_deviceUtil.allowt) {
            me.addHandler(p, "touchend", add);
          }
          if (initOpt.arrowleft) {
            /** @type {string} */
            element.style.styleFloat = element.style.cssFloat = "left";
            /** @type {string} */
            element.style.margin = [0, 9, 0, initOpt.posX, ""].join("px ");
            /** @type {string} */
            el.style.margin = [0, initOpt.rightW, 0, initOpt.posX + x, ""].join("px ");
          } else {
            /** @type {string} */
            element.style.styleFloat = element.style.cssFloat = "right";
            /** @type {string} */
            element.style.margin = [0, initOpt.rightW, 0, 0, ""].join("px ");
            /** @type {string} */
            el.style.margin = [0, x + initOpt.rightW, 0, initOpt.posX, ""].join("px ");
          }
          var s = p.style;
          /** @type {string} */
          s.listStyle = "none";
          /** @type {number} */
          s.padding = 0;
          /** @type {number} */
          s.margin = 0;
          el.appendChild(p);
          if (head) {
            head.appendChild(element);
          }
          if (head) {
            head.appendChild(el);
          }
          that.getChildParentCtn(p);
          that.getMainParentCtn(element);
        };
      };
      var proto = new function() {
        /**
         * @param {boolean} value
         * @return {?}
         */
        function initialize(value) {
          var elem = $.$C("span");
          return elem.className = initOpt.cssclass.arrow, elem.innerHTML = value ? "▲" : "▼", elem.setAttribute("data-dir", value ? "-1" : "1"), elem;
        }
        var i;
        var p;
        /**
         * @return {undefined}
         */
        this.init = function() {
          i = new initialize(true);
          p = new initialize;
          element.appendChild(i);
          element.appendChild(p);
        };
        /**
         * @param {boolean} color
         * @return {undefined}
         */
        this.changeColor = function(color) {
          /** @type {string} */
          i.style.color = p.style.color = color ? "#000" : "#ccc";
        };
      };
      var self = new function() {
        /** @type {number} */
        var from = 0;
        /**
         * @return {undefined}
         */
        this.activeTab = function() {
          var el = p.childNodes[initOpt.active];
          if (el) {
            $.cssUtil.adCls(el, initOpt.cssclass.active);
            activeElement = el;
            key = el.getAttribute(attribute);
          }
        };
        /**
         * @param {number} t
         * @return {undefined}
         */
        this.drawTabs = function(t) {
          var width = el.offsetWidth;
          /** @type {number} */
          var delta = Math.min(7, Math.floor(width / (w + 2)));
          var length = array.length;
          proto.changeColor(length > delta);
          if (isNaN(t)) {
            /** @type {number} */
            t = 0;
          }
          var i = from + t * delta;
          if (0 > i) {
            /** @type {number} */
            i = 0;
          } else {
            if (i >= length) {
              i = from;
            }
          }
          from = i;
          var li;
          /** @type {number} */
          var l = Math.min(length, i + delta);
          /** @type {number} */
          var pos = l - i;
          for (;p.childNodes.length < pos;) {
            li = $.$C("li");
            p.appendChild(li);
          }
          for (;p.childNodes.length > pos;) {
            p.removeChild(p.lastChild);
          }
          for (;l > i;i++) {
            var value = array[i];
            var html = promote(value) || value;
            li = p.childNodes[i - from];
            li.innerHTML = html;
            li.setAttribute(attribute, value);
            li.className = initOpt.cssclass.normal;
            if (key === value) {
              $.cssUtil.adCls(li, initOpt.cssclass.active);
            }
            /** @type {string} */
            li.style.width = w + "px";
          }
        };
      };
      _super.init();
      proto.init();
      self.drawTabs();
      self.activeTab();
    }
    /**
     * @return {undefined}
     */
    function Class() {
      /** @type {Array} */
      var x = ["list-style:none", "float:left", "background:#efefef", "border:1px solid #d5d5d5", "color:#888", "margin-left:-1px", "line-height:" + initOpt.tabheight + "px", "text-align:center", "font-size:12px", "cursor:pointer"];
      /** @type {string} */
      x = "." + data.normal + "{" + x.join(";") + "}";
      /** @type {Array} */
      var col = ["background:#494949; color:#fff; border-color:#999;"];
      /** @type {string} */
      col = "." + data.active + "{" + col.join(";") + "}";
      /** @type {Array} */
      var y = ["float:left; width:20px; cursor:pointer; text-align:center; margin:0 1px; border:1px solid #eee;", "line-height:" + initOpt.tabheight + "px"];
      /** @type {string} */
      y = "." + data.arrow + "{" + y.join(";") + "}";
      /** @type {string} */
      var millis = "." + data.arrow + ":hover {filter:Alpha(Opacity=60);opacity:0.6;}";
      /** @type {string} */
      var newMillis = x + col + y + millis;
      $.cssUtil.inject(newMillis);
    }
    /** @type {Array} */
    var url = ["VOLUME", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI"];
    /** @type {Array} */
    var v = ["TVOL", "LB"];
    /** @type {Array} */
    var tokenized = [{
      name : "TFLOW",
      alias : "净买入"
    }, {
      name : "LB",
      alias : "量比"
    }, {
      name : "POSITION",
      alias : "持仓量"
    }, {
      name : "TZYS",
      alias : "收益对比"
    }, {
      name : "DPDKS",
      alias : "多空收益"
    }];
    /**
     * @param {string} key
     * @return {?}
     */
    var promote = function(key) {
      var t;
      var c;
      /** @type {number} */
      var index = tokenized.length;
      for (;index--;) {
        if (c = tokenized[index], c.name.toUpperCase() == key.toUpperCase()) {
          t = c.alias;
          break;
        }
      }
      return t;
    };
    var data = {
      normal : "kke_indicators_tab_normal",
      active : "kke_indicators_tab_active",
      arrow : "kke_indicators_tab_arrow"
    };
    initOpt = inject({
      posX : 54,
      rightW : 1,
      tabwidth : 61,
      tabheight : 20,
      type : "k",
      domid : void 0,
      charts : void 0,
      tabs : void 0,
      fix : {
        firsts : void 0,
        lasts : void 0
      },
      cssclass : {
        normal : data.normal,
        active : data.active,
        arrow : data.arrow
      },
      arrowleft : true,
      active : 0
    }, initOpt || {});
    var head = $.$DOM(initOpt.domid);
    var array = initOpt.tabs || ("k" == initOpt.type ? url : v);
    var r = fn(initOpt.fix.firsts);
    var elems = fn(initOpt.fix.lasts);
    var markers = initOpt.charts;
    if (!$.isArr(markers)) {
      /** @type {Array} */
      markers = [markers];
    }
    var activeElement;
    var key;
    var w = initOpt.tabwidth;
    var that = new setup;
    Class();
    init();
    if ("hf_" != initOpt.domid.split("__")[1].substring(0, 3)) {
      that.initCircle({
        display : "block",
        text : 1,
        radius : 15
      });
    }
    /**
     * @return {?}
     */
    this.getCurrentTab = function() {
      return activeElement;
    };
    /**
     * @return {?}
     */
    this.getCurrentIndicatorName = function() {
      return key;
    };
  }
  var inject = $.oc;
  var delegate = $.$C;
  var that = $.bridge;
  var me = $.xh5_EvtUtil;
  return new function() {
    /** @type {string} */
    this.VER = "1.2.4";
    /** @type {function (Object): undefined} */
    KKE.cls.IndicatorTab = init;
    /**
     * @param {?} name
     * @param {?} errback
     * @return {undefined}
     */
    this.get = function(name, errback) {
      var err = new init(name);
      if ($.isFunc(errback)) {
        errback(err);
      }
    };
  };
});
