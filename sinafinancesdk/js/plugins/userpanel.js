xh5_define("plugins.userpanel", ["utils.util"], function(self) {
  /**
   * @param {string} selector
   * @param {Element} target
   * @param {Object} options
   * @return {?}
   */
  function createElement(selector, target, options) {
    options = options || {};
    var elem = createEl(selector);
    var style = elem.style;
    return options.left && (style.left = options.left), options.right && (style.right = options.right), options.top && (style.top = options.top), options.bottom && (style.bottom = options.bottom), options.width && (style.width = options.width), options.height && (style.height = options.height), target.appendChild(elem), elem;
  }
  /**
   * @param {?} e
   * @return {undefined}
   */
  function onPaste(e) {
    event.preventDefault(e);
    event.stopPropagation(e);
  }
  /**
   * @param {boolean} contentHTML
   * @return {undefined}
   */
  function initUserPanel(contentHTML) {
    /**
     * @param {(number|string)} id
     * @return {undefined}
     */
    function remove(id) {
      res.save({
        options : {
          mode : "cookie",
          path : "/",
          expires : 71996400
        },
        uid : [contentHTML.userObj.EXTEND_PERFIX, (new Date).getTime()].join("|"),
        key : contentHTML.userObj.EXTEND_PERFIX,
        value : id
      });
    }
    /**
     * @return {?}
     */
    function next() {
      /** @type {boolean} */
      var text = false;
      return res.load({
        options : "cookie",
        uid : [contentHTML.userObj.EXTEND_PERFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
        key : contentHTML.userObj.EXTEND_PERFIX
      }, function(textAlt) {
        if (textAlt) {
          /** @type {boolean} */
          text = textAlt;
        }
      }, true), text;
    }
    /**
     * @return {?}
     */
    function callback() {
      var t;
      return t = window.sinaTKChartV1 ? window.sinaTKChartV1.tChart.getDimension()._h : text(item.dom_id).offsetHeight - contentHTML.userObj.uParam;
    }
    /**
     * @param {Object} attribute
     * @return {?}
     */
    function initI(attribute) {
      if (next()) {
        return void(codeSegments = []);
      }
      var i = createEl("span");
      o.cont = i;
      fn(attribute, i);
      text(contentHTML.userObj.dom_id).appendChild(i);
      success();
    }
    /**
     * @return {undefined}
     */
    function success() {
      var el = createEl("span");
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        codeSegments[i].child = el;
        /** @type {string} */
        el.style.display = "none";
        fn(codeSegments[i], el);
        text(contentHTML.userObj.dom_id).appendChild(el);
      }
    }
    /**
     * @param {?} show
     * @return {undefined}
     */
    function render(show) {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        /** @type {string} */
        codeSegments[i].child.style.display = show ? "none" : 0 == codeSegments[i].value ? "block" : "none";
      }
    }
    /**
     * @param {Function} c
     * @return {undefined}
     */
    function clear(c) {
      if (!(codeSegments.length <= 0)) {
        /** @type {number} */
        var pos = 0;
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          if (c.name == codeSegments[i].name) {
            /** @type {number} */
            codeSegments[i].value = 1;
            /** @type {string} */
            codeSegments[i].child.style.display = "none";
          }
          if (1 == codeSegments[i].value) {
            pos++;
          }
        }
        if (pos == codeSegments.length) {
          o.value = codeSegments.length;
          /** @type {string} */
          o.cont.style.display = "none";
          remove("trade");
        }
      }
    }
    /**
     * @param {Object} node
     * @param {Element} div
     * @return {undefined}
     */
    function fn(node, div) {
      var y = node.h + callback();
      div.innerHTML = node.text;
      /** @type {string} */
      div.style.color = "#fff";
      /** @type {string} */
      div.style.fontFamily = "黑体";
      /** @type {string} */
      div.style.background = "#f00";
      div.style.display = node.display;
      /** @type {string} */
      div.style.width = div.style.height = div.style.lineHeight = node.radius + "px";
      /** @type {string} */
      div.style.WebkitBorderRadius = div.style.BorderRadius = div.style.MorBorderRadius = node.radius / 2 + "px";
      /** @type {string} */
      div.style.position = "relative";
      /** @type {string} */
      div.style.styleFloat = div.style.cssFloat = "right";
      /** @type {number} */
      div.style.zIndex = 302;
      /** @type {string} */
      div.style.textAlign = "center";
      div.style.right = node.right || "-3px";
      /** @type {string} */
      div.style.top = -y + "px";
    }
    /** @type {Array} */
    var codeSegments = [{
      h : -35,
      right : "-10px",
      name : "trade",
      value : 0,
      child : null,
      display : "none",
      text : "",
      radius : 6
    }];
    if (contentHTML && "cntouzi2" == contentHTML.userObj.mt) {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        /** @type {number} */
        codeSegments[0].h = -25;
      }
    }
    var o = {
      value : 0,
      cont : null
    };
    /** @type {function (Object): ?} */
    this.mainCircle = initI;
    /** @type {function (Function): undefined} */
    this.visibleChild = clear;
    /** @type {function (?): undefined} */
    this.childDisplay = render;
  }
  /**
   * @param {Object} settings
   * @param {?} attr
   * @return {undefined}
   */
  function postLink(settings, attr) {
    /**
     * @param {Object} obj
     * @param {?} axisSize
     * @return {undefined}
     */
    function isUndefined(obj, axisSize) {
      var i;
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          obj[i] = axisSize + obj[i];
        }
      }
    }
    /** @type {string} */
    var pageId = "sinafinancehtml5settingcfgpanel";
    var suiteView = {
      LOADED : "loaded",
      HIDE : "hide",
      EDIT : "edit",
      OPEN : "open",
      DRAGSTART : "dragstart",
      DRAGGING : "dragging"
    };
    isUndefined(suiteView, item.CFGSETTING_IFRAME_PREFIX);
    var el;
    var self;
    var m;
    var w;
    /** @type {number} */
    var sf_width = 350;
    /** @type {number} */
    var height = 344;
    var poster = this;
    /**
     * @param {MessageEvent} evt
     * @return {undefined}
     */
    var reset = function(evt) {
      var data = evt.data;
      if (data) {
        switch(data = JSON.parse(data), data.cmd) {
          case suiteView.LOADED:
            if (attr) {
              attr();
            }
            break;
          case suiteView.HIDE:
            poster.hide();
            break;
          case suiteView.EDIT:
            var rAction = data.cmd.split("~")[1];
            self[rAction](data.data);
            break;
          case suiteView.DRAGSTART:
            /** @type {number} */
            m = +el.style.left.replace(/[^0-9.]/g, "");
            /** @type {number} */
            w = +el.style.top.replace(/[^0-9.]/g, "");
            break;
          case suiteView.DRAGGING:
            var d = data.data;
            /** @type {string} */
            el.style.left = m + d.movedX + "px";
            /** @type {string} */
            el.style.top = w + d.movedY + "px";
        }
      }
    };
    /**
     * @return {undefined}
     */
    var init = function() {
      if (!el) {
        /** @type {string} */
        var border = self.xh5_BrowserUtil.noH5 ? "1px solid #000" : "6px solid rgba(200,200,200,0.6)";
        el = self.iframer({
          attribute : {
            id : pageId,
            src : settings.url
          },
          style : {
            margin : "0 auto",
            height : height + "px",
            width : sf_width + "px",
            border : border,
            position : "absolute",
            zIndex : settings.z
          }
        });
        event.addHandler(window, "message", reset);
        /**
         * @param {?} e
         * @return {undefined}
         */
        var onPaste = function(e) {
          event.preventDefault(e);
          event.stopPropagation(e);
        };
        /** @type {string} */
        var WHEEL_EV = self.xh5_BrowserUtil.info.name.match(/firefox/i) ? "DOMMouseScroll" : "mousewheel";
        event.addHandler(el, WHEEL_EV, onPaste);
      }
    };
    /**
     * @param {Object} task
     * @param {?} value
     * @return {undefined}
     */
    this.sendOriginalData = function(task, value) {
      if (el) {
        self = value;
        el.contentWindow.postMessage(JSON.stringify({
          cmd : suiteView.OPEN,
          data : task
        }), "*");
      }
    };
    /** @type {boolean} */
    this.isShow = false;
    /**
     * @param {Object} e
     * @return {undefined}
     */
    this.show = function(e) {
      if (el) {
        var a;
        var y;
        if (e.changedTouches) {
          a = e.changedTouches[0].clientX;
          y = e.changedTouches[0].clientY;
        } else {
          a = e.clientX;
          y = e.clientY;
        }
        /** @type {number} */
        var edgeY = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);
        var b = text(item.dom_id).offsetWidth;
        if (y + height + 30 > edgeY) {
          /** @type {number} */
          y = Math.max(edgeY - height - 30, 1);
        }
        /** @type {number} */
        a = a > b ? a - b + (b - sf_width) / 2 : (b - sf_width) / 2;
        /** @type {string} */
        el.style.left = a + "px";
        /** @type {string} */
        el.style.top = (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) + y + "px";
        /** @type {string} */
        el.style.display = "";
        /** @type {boolean} */
        this.isShow = true;
      }
    };
    /**
     * @return {undefined}
     */
    this.hide = function() {
      /** @type {string} */
      el.style.display = "none";
      /** @type {boolean} */
      this.isShow = false;
    };
    init();
  }
  /**
   * @param {Text} tpOpt
   * @return {undefined}
   */
  function init(tpOpt) {
    /**
     * @return {undefined}
     */
    function init() {
      /**
       * @param {?} m
       * @return {?}
       */
      function error(m) {
        return["US", "HK", "forex"].indexOf(m) > -1;
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function initUserPanel(e) {
        /** @type {boolean} */
        F = true;
        /** @type {number} */
        x = +s.left.replace(/[^0-9.]/g, "");
        /** @type {number} */
        now = +s.top.replace(/[^0-9.]/g, "");
        if (e.targetTouches) {
          clientX = e.targetTouches[0].clientX;
          initialY = e.targetTouches[0].clientY;
        } else {
          clientX = e.clientX;
          initialY = e.clientY;
        }
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onTouchMove(e) {
        /** @type {string} */
        style.cursor = "move";
        if (F) {
          if (e.targetTouches) {
            /** @type {number} */
            y = e.targetTouches[0].clientX - clientX;
            /** @type {number} */
            milliSeconds = e.targetTouches[0].clientY - initialY;
          } else {
            /** @type {number} */
            y = e.clientX - clientX;
            /** @type {number} */
            milliSeconds = e.clientY - initialY;
          }
          /** @type {string} */
          s.left = +x + +y + "px";
          /** @type {string} */
          s.top = +now + +milliSeconds + "px";
          event.stopPropagation(e);
        }
        event.preventDefault(e);
      }
      /**
       * @return {undefined}
       */
      function fn() {
        /** @type {boolean} */
        F = false;
        /** @type {string} */
        style.cursor = "";
      }
      /**
       * @param {?} id
       * @return {?}
       */
      function get(id) {
        /** @type {number} */
        var count = items.length;
        for (;count--;) {
          if (items[count].value == id) {
            return count;
          }
        }
      }
      /**
       * @param {(number|string)} title
       * @param {Array} params
       * @param {Array} values
       * @param {Function} fn
       * @return {?}
       */
      function init(title, params, values, fn) {
        var el = createEl("div");
        var style = el.style;
        /** @type {(number|string)} */
        el.title = title;
        /** @type {string} */
        style["float"] = "left";
        /** @type {string} */
        style.width = "26px";
        /** @type {string} */
        style.height = "26px";
        /** @type {string} */
        style.margin = "2px";
        /** @type {string} */
        style.border = "1px solid #D7DDEB";
        /** @type {string} */
        style.overflow = "hidden";
        t.appendChild(el);
        var node = createEl("select");
        var s = node.style;
        /** @type {string} */
        s.width = "45px";
        /** @type {string} */
        s.height = "26px";
        /** @type {string} */
        s.lineHeight = "26px";
        /** @type {number} */
        s.margin = 0;
        /** @type {string} */
        s.outline = "none";
        /** @type {string} */
        s.border = "none";
        /** @type {string} */
        s.cursor = "pointer";
        /** @type {string} */
        s.textAlign = "start";
        /** @type {string} */
        s.font = "18px 微软雅黑";
        /** @type {string} */
        s.color = "#747574";
        /** @type {string} */
        s.background = "white";
        /** @type {number} */
        var i = 0;
        var l = params.length;
        for (;l > i;i++) {
          var input = createEl("option");
          input.value = params[i];
          input.innerHTML = values[i];
          fn(params[i], input);
          node.appendChild(input);
        }
        return el.appendChild(node), node;
      }
      /**
       * @param {Element} target
       * @param {Attr} desc
       * @return {undefined}
       */
      function render(target, desc) {
        event.addHandler(target, "click", onPaste);
        /** @type {string} */
        target.style.cursor = "not-allowed";
        target.style.backgroundPosition = desc.normalPos;
        if (desc.value == canvas.param.paintTool) {
          canvas.setPaintTool("Close");
        }
      }
      /**
       * @param {Element} el
       * @return {undefined}
       */
      function close(el) {
        event.removeHandler(el, "click", onPaste);
        /** @type {string} */
        el.style.cursor = "pointer";
      }
      /**
       * @param {boolean} allBindingsAccessor
       * @return {undefined}
       */
      function update(allBindingsAccessor) {
        var children = t.querySelectorAll("li");
        var l = children.length;
        for (;l--;) {
          /** @type {number} */
          var i = items.length;
          for (;i--;) {
            if (items[i].value == children[l].getAttribute("value")) {
              if (items[i].konly) {
                if (allBindingsAccessor) {
                  render(children[l], items[i]);
                } else {
                  close(children[l]);
                }
              }
              break;
            }
          }
        }
      }
      var error1 = error(item.market);
      /** @type {string} */
      var k = "//n.sinaimg.cn/finance/chartimg/painttool_icons.png";
      var key = encodeURI_enabled ? self.getSUrl(k) : k;
      /** @type {string} */
      var fullKey = key + "?20160713";
      /** @type {Array} */
      var items = [{
        name : "线段",
        value : "Segment",
        normalPos : "-37px -35px",
        lightPos : "-173px -35px"
      }, {
        name : "直线",
        value : "Line",
        normalPos : "-68px -35px",
        lightPos : "-204px -35px"
      }, {
        name : "水平线",
        value : "Level",
        normalPos : "-6px -97px",
        lightPos : "-142px -97px"
      }, {
        name : "平行线",
        value : "ParallelLine",
        normalPos : "-6px -66px",
        lightPos : "-142px -66px"
      }, {
        name : "平行线段",
        value : "ParallelSegment",
        normalPos : "-6px -190px",
        lightPos : "-142px -190px"
      }, {
        name : "波浪线",
        value : "Wave",
        normalPos : "-6px -252px",
        lightPos : "-142px -252px"
      }, {
        name : "矩形",
        value : "Rect",
        normalPos : "-68px -66px",
        lightPos : "-204px -66px"
      }, {
        name : "平行四边形",
        value : "Parallelogram",
        normalPos : "-37px -190px",
        lightPos : "-173px -190px"
      }, {
        name : "三角形",
        value : "Triangle",
        normalPos : "-37px -252px",
        lightPos : "-173px -252px"
      }, {
        name : "周期线",
        value : "CycleLine",
        normalPos : "-37px -66px",
        lightPos : "-173px -66px"
      }, {
        name : "斐波那契周期线",
        value : "Fibonacci",
        normalPos : "-68px -190px",
        lightPos : "-204px -190px"
      }, {
        name : "线性回归带(K线)",
        value : "LinearRegressionBand",
        normalPos : "-6px -221px",
        lightPos : "-142px -221px",
        konly : true
      }, {
        name : "黄金线",
        value : "GoldenSection",
        normalPos : "-37px -221px",
        lightPos : "-173px -221px"
      }, {
        name : "百分比线",
        value : "PercentLine",
        normalPos : "-68px -221px",
        lightPos : "-204px -221px"
      }, {
        name : "测量尺",
        value : "Ruler",
        normalPos : "-6px -159px",
        lightPos : "-142px -159px"
      }, {
        name : "上箭头",
        value : error1 ? "GreenUpArrow" : "RedUpArrow",
        normalPos : "-68px -128px",
        lightPos : "-204px -128px"
      }, {
        name : "下箭头",
        value : error1 ? "RedDownArrow" : "GreenDownArrow",
        normalPos : "-37px -128px",
        lightPos : "-173px -128px"
      }, {
        name : "自由箭头",
        value : "FreeArrow",
        normalPos : "-68px -252px",
        lightPos : "-204px -252px"
      }, {
        name : "停止画图",
        value : "Close",
        normalPos : "-6px -35px",
        lightPos : "-142px -35px",
        once : true
      }, {
        name : "编辑图形",
        value : "Edit",
        normalPos : "-37px -97px",
        lightPos : "-173px -97px"
      }, {
        name : "文本",
        value : "Write",
        normalPos : "-68px -97px",
        lightPos : "-204px -97px"
      }, {
        name : "撤销",
        value : "Revoke",
        normalPos : "-6px -128px",
        lightPos : "-6px -128px",
        once : true
      }, {
        name : "删除选中",
        value : "Delete",
        normalPos : "-37px -159px",
        lightPos : "-173px -159px"
      }, {
        name : "清空",
        value : "Empty",
        normalPos : "-68px -159px",
        lightPos : "-204px -159px",
        once : true
      }];
      var that = this;
      var canvas = item.paintTool;
      var f = createEl("div");
      var s = f.style;
      /** @type {string} */
      s.position = "absolute";
      /** @type {string} */
      s.width = "102px";
      /** @type {string} */
      s.left = "100px";
      /** @type {string} */
      s.top = "100px";
      /** @type {number} */
      s.zIndex = 8890;
      var p = createEl("div");
      var style = p.style;
      /** @type {string} */
      style["float"] = "left";
      /** @type {string} */
      style.width = "100%";
      /** @type {string} */
      style.height = "30px";
      /** @type {string} */
      style.lineHeight = "30px";
      /** @type {string} */
      style.border = "1px solid #A7BEE4";
      /** @type {string} */
      style.boxSizing = "border-box";
      /** @type {string} */
      style.mozBoxSizing = "border-box";
      /** @type {string} */
      style.webkitBoxSizing = "border-box";
      /** @type {string} */
      style.fontSize = "14px";
      /** @type {string} */
      style.textIndent = "5px";
      /** @type {string} */
      style.backgroundColor = "#CFDEF6";
      /** @type {string} */
      style.color = "#3D5E96";
      /** @type {string} */
      style.webkitUserSelect = "none";
      /** @type {string} */
      style.mozUserSelect = "none";
      /** @type {string} */
      style.userSelect = "none";
      /** @type {string} */
      p.innerHTML = "画图工具";
      var test = createEl("span");
      var properties = test.style;
      /** @type {string} */
      properties.position = "absolute";
      /** @type {string} */
      properties.height = "16px";
      /** @type {string} */
      properties.width = "16px";
      /** @type {string} */
      properties.right = "4px";
      /** @type {string} */
      properties.top = "7px";
      /** @type {string} */
      properties.background = "url(" + fullKey + ") -81px -7px no-repeat";
      /** @type {string} */
      properties.color = "#759ADC";
      /** @type {string} */
      test.title = "关闭";
      test.setAttribute("value", "Close");
      event.addHandler(test, "mousemove", function(e) {
        /** @type {string} */
        e.target.style.cursor = "pointer";
        event.stopPropagation(e);
      });
      event.addHandler(test, "click", function(e) {
        that.hide();
        event.stopPropagation(e);
      });
      p.appendChild(test);
      var x;
      var now;
      var clientX;
      var initialY;
      var y;
      var milliSeconds;
      /** @type {boolean} */
      var F = false;
      if ("ontouchend" in window) {
        event.addHandler(p, "touchstart", initUserPanel);
        event.addHandler(p, "touchmove", onTouchMove);
        event.addHandler(p, "touchend", fn);
      }
      event.addHandler(p, "mousedown", initUserPanel);
      event.addHandler(p, "mousemove", onTouchMove);
      event.addHandler(p, "mouseup", fn);
      event.addHandler(p, "mouseout", fn);
      f.appendChild(p);
      var t = createEl("ul");
      var css = t.style;
      /** @type {string} */
      css["float"] = "left";
      /** @type {string} */
      css.top = "30px";
      /** @type {string} */
      css.width = "100%";
      /** @type {string} */
      css.border = "1px solid #D7DCEB";
      /** @type {string} */
      css.padding = "4px 2px 4px 2px";
      /** @type {string} */
      css.backgroundColor = "#EEF3FD";
      /** @type {string} */
      css.boxSizing = "border-box";
      /** @type {string} */
      css.mozBoxSizing = "border-box";
      /** @type {string} */
      css.webkitBoxSizing = "border-box";
      /** @type {string} */
      css.listStyle = "none";
      /** @type {string} */
      css.overflow = "hidden";
      /** @type {number} */
      css.margin = 0;
      /** @type {null} */
      var elem = null;
      event.addHandler(t, "click", function(e) {
        if ("LI" == e.target.tagName) {
          var y;
          var obj;
          var row;
          var el = e.target;
          var style = el.style;
          var id = el.getAttribute("value");
          var name = get(id);
          if ("undefined" != typeof name) {
            return elem && (y = get(elem.getAttribute("value")), "undefined" != typeof y && (row = items[y])), obj = items[name], id ? void(elem ? el == elem ? obj.once ? canvas.setPaintTool(id) : (style.backgroundPosition = obj.normalPos, canvas.setPaintTool("Close"), elem = null) : (row && (elem.style.backgroundPosition = row.normalPos), canvas.setPaintTool(id), obj.once ? (canvas.setPaintTool("Close"), elem = null) : (style.backgroundPosition = obj.lightPos, elem = el)) : (canvas.setPaintTool(id),
            obj.once ? canvas.setPaintTool("Close") : (style.backgroundPosition = obj.lightPos, elem = el))) : (row && (elem.style.backgroundPosition = row.normalPos), elem = null, void canvas.setPaintTool("Close"));
          }
        }
      });
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var ilen = items.length;
      for (;ilen > i;i++) {
        var el = createEl("li");
        var _sty = el.style;
        /** @type {string} */
        _sty["float"] = "left";
        /** @type {string} */
        _sty.width = "28px";
        /** @type {string} */
        _sty.height = "28px";
        /** @type {string} */
        _sty.margin = "2px";
        /** @type {string} */
        _sty.backgroundImage = "url(" + fullKey + ")";
        /** @type {string} */
        _sty.backgroundRepeat = "no-repeat";
        _sty.backgroundPosition = items[i].normalPos;
        if (items[i].value) {
          el.title = items[i].name;
          el.setAttribute("value", items[i].value);
          el.setAttribute("selected", "false");
          event.addHandler(el, "mouseover", function(ev) {
            /** @type {string} */
            css.cursor = "pointer";
            /** @type {string} */
            ev.target.style.boxShadow = "2px 2px 2px #AEC7E3";
          });
          event.addHandler(el, "mouseout", function(ev) {
            /** @type {string} */
            css.cursor = "";
            /** @type {string} */
            ev.target.style.boxShadow = "";
          });
        }
        t.appendChild(el);
      }
      var element = createEl("div");
      var styles = element.style;
      /** @type {string} */
      element.title = "颜色";
      /** @type {string} */
      styles["float"] = "left";
      /** @type {string} */
      styles.border = "2px solid #D7DDEB";
      /** @type {string} */
      styles.width = "24px";
      /** @type {string} */
      styles.height = "24px";
      /** @type {string} */
      styles.margin = "2px";
      styles.backgroundColor = canvas.param.style.strokeStyle;
      event.addHandler(element, "click", function(event) {
        self.colorPicker.show(event.pageX - self.colorPicker.param.width / 2, event.pageY, this, styles.backgroundColor);
      });
      event.addHandler(element, "mouseover", function() {
        /** @type {string} */
        styles.cursor = "pointer";
      });
      self.colorPicker.al("ok", function() {
        if (element == arguments[1][1]) {
          styles.backgroundColor = arguments[1][0].rgb;
          canvas.setStyle({
            strokeStyle : arguments[1][0].rgb
          });
        }
      });
      t.appendChild(element);
      var handler = init("字号", ["12px", "18px", "24px"], ["小", "中", "大"], function(rnotwhite, item) {
        var value = canvas.param.style.font;
        if (value.match(rnotwhite)) {
          item.setAttribute("selected", "true");
        }
      });
      event.addHandler(handler, "change", function() {
        canvas.setStyle({
          font : canvas.param.style.font.replace(/[\s\S]+px/, handler.value)
        });
      });
      var d = init("线宽", [1, 2, 4], ["细", "中", "粗"], function(wanted, item) {
        var type = canvas.param.style.lineWidth;
        if (type == wanted) {
          item.setAttribute("selected", "true");
        }
      });
      event.addHandler(d, "change", function() {
        canvas.setStyle({
          lineWidth : d.value
        });
      });
      f.appendChild(t);
      /** @type {string} */
      s.display = "none";
      document.body.appendChild(f);
      tpOpt.menu.al("KKE_MENU_CLICK_TAB", function() {
        if (that.isShow) {
          update("T" == tpOpt.menu.chooseTab.tye);
        }
      });
      /** @type {boolean} */
      this.isShow = false;
      /**
       * @param {number} x
       * @param {number} y
       * @return {undefined}
       */
      this.show = function(x, y) {
        if (!this.isShow) {
          if ("undefined" != typeof x) {
            /** @type {string} */
            s.left = x + "px";
          }
          if ("undefined" != typeof y) {
            /** @type {string} */
            s.top = y + "px";
          }
          /** @type {string} */
          s.display = "";
          /** @type {boolean} */
          this.isShow = true;
          update("T" == tpOpt.menu.chooseTab.tye);
        }
      };
      /**
       * @return {undefined}
       */
      this.hide = function() {
        /** @type {string} */
        s.display = "none";
        canvas.setPaintTool("Close");
        var m;
        if (elem) {
          m = get(elem.getAttribute("value"));
        }
        if (self.isNum(m)) {
          elem.style.backgroundPosition = items[m].normalPos;
          /** @type {null} */
          elem = null;
        }
        /** @type {boolean} */
        this.isShow = false;
      };
    }
    /**
     * @return {undefined}
     */
    function initF() {
      /**
       * @return {?}
       */
      function trigger() {
        return tpOpt.chart.tChart.getSymbols()[0];
      }
      /**
       * @return {?}
       */
      function get() {
        var conf = context.load(data);
        return conf ? JSON.parse(conf) : void 0;
      }
      /**
       * @return {?}
       */
      function clear() {
        return tpOpt.chart.tChart.getCurrentData() && tpOpt.chart.tChart.getCurrentData().price;
      }
      /**
       * @return {undefined}
       */
      function reset() {
        var max = clear();
        /** @type {number} */
        var remain = 0;
        /** @type {number} */
        var distance = 0;
        /** @type {number} */
        var alpha = 0;
        /** @type {number} */
        var delta = 0;
        /** @type {number} */
        var sec = 0;
        /** @type {number} */
        var a = 0;
        var nodes = element.childNodes;
        /** @type {number} */
        var i = 1;
        var len = nodes.length;
        for (;len > i;i++) {
          var ch = nodes[i].childNodes;
          /** @type {number} */
          var m = Number(ch[4].innerHTML);
          if (m) {
            if ("buy" == ch[1].childNodes[0].value) {
              remain += m;
              distance += +ch[3].childNodes[0].value;
            } else {
              remain -= m;
              distance -= +ch[3].childNodes[0].value;
            }
          }
        }
        if (distance) {
          /** @type {number} */
          alpha = max * distance - remain;
          /** @type {number} */
          delta = max - alpha / Math.abs(distance);
          /** @type {number} */
          sec = delta > 0 ? (max - delta) / delta * 100 : 0;
          /** @type {number} */
          a = max * distance;
        } else {
          /** @type {number} */
          alpha = -remain;
        }
        /** @type {number} */
        cell.childNodes[0].innerHTML = distance;
        /** @type {string} */
        cell.childNodes[1].innerHTML = delta.toFixed(3);
        cell.childNodes[2].innerHTML = max;
        /** @type {string} */
        cell.childNodes[3].innerHTML = sec.toFixed(2);
        /** @type {string} */
        cell.childNodes[4].innerHTML = alpha.toFixed(2);
        /** @type {string} */
        cell.childNodes[5].innerHTML = a.toFixed(2);
        render();
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function initS(e) {
        /** @type {boolean} */
        ee = true;
        /** @type {number} */
        now = +cs.left.replace(/[^0-9.]/g, "");
        /** @type {number} */
        x = +cs.top.replace(/[^0-9.]/g, "");
        if (e.targetTouches) {
          clientX = e.targetTouches[0].clientX;
          initialY = e.targetTouches[0].clientY;
        } else {
          clientX = e.clientX;
          initialY = e.clientY;
        }
      }
      /**
       * @param {Event} e
       * @return {undefined}
       */
      function onTouchMove(e) {
        /** @type {string} */
        containerStyle.cursor = "move";
        if (ee) {
          if (e.targetTouches) {
            /** @type {number} */
            milliSeconds = e.targetTouches[0].clientX - clientX;
            /** @type {number} */
            y = e.targetTouches[0].clientY - initialY;
          } else {
            /** @type {number} */
            milliSeconds = e.clientX - clientX;
            /** @type {number} */
            y = e.clientY - initialY;
          }
          /** @type {string} */
          cs.left = +now + +milliSeconds + "px";
          /** @type {string} */
          cs.top = +x + +y + "px";
          event.stopPropagation(e);
        }
        event.preventDefault(e);
      }
      /**
       * @return {undefined}
       */
      function b() {
        /** @type {boolean} */
        ee = false;
        /** @type {string} */
        containerStyle.cursor = "";
      }
      /**
       * @param {(number|string)} node
       * @return {?}
       */
      function update(node) {
        var el = createEl("span");
        var style = el.style;
        return style.width = "42px", style.height = "24px", style.textAlign = "center", style.font = font, style.lineHeight = "24px", style.cursor = "pointer", style.margin = "8px 10px 0 0", style.textIndent = 0, style["float"] = "right", style.color = "#494949", style.backgroundColor = "#E4E4E4", style.borderRadius = "2px", el.innerHTML = node, event.addHandler(el, "mouseover", function() {
          /** @type {string} */
          style.color = "#fff";
          /** @type {string} */
          style.backgroundColor = "#628BD2";
        }), event.addHandler(el, "mouseout", function() {
          /** @type {string} */
          style.color = "#494949";
          /** @type {string} */
          style.backgroundColor = "#E4E4E4";
        }), el;
      }
      /**
       * @return {?}
       */
      function parse() {
        /** @type {Array} */
        var out = [];
        var nodes = element.childNodes;
        /** @type {boolean} */
        var count = false;
        /** @type {number} */
        var j = 1;
        var len = nodes.length;
        for (;len > j;j++) {
          var ch = nodes[j].childNodes;
          /** @type {number} */
          var b = Number(ch[4].innerHTML);
          if (b) {
            /** @type {Array} */
            var copies = [];
            /** @type {number} */
            var i = 0;
            for (;4 > i;i++) {
              copies.push(ch[i].childNodes[0].value);
            }
            out.push(copies);
            /** @type {boolean} */
            count = true;
          }
        }
        return count ? {
          ifShow : el.checked,
          data : out,
          count : {
            allVolume : cell.childNodes[0].innerHTML,
            costPrice : cell.childNodes[1].innerHTML,
            nowPrice : cell.childNodes[2].innerHTML,
            profitPercent : cell.childNodes[3].innerHTML,
            profit : cell.childNodes[4].innerHTML,
            marketValue : cell.childNodes[5].innerHTML
          },
          date : +new Date
        } : void 0;
      }
      /**
       * @param {?} view
       * @param {Date} date
       * @return {?}
       */
      function show(view, date) {
        return view.toDateString() == date.toDateString();
      }
      /**
       * @param {Array} nodeList
       * @return {?}
       */
      function expand(nodeList) {
        var clone = tpOpt.chart.kChart;
        if (clone) {
          var tokenized = clone.getExtraData({
            name : "currentK",
            clone : false
          });
          /** @type {Array} */
          var eventPath = [];
          /** @type {Array} */
          var oSpace = [];
          /** @type {number} */
          var b = 0;
          var i = nodeList.length;
          for (;i > b;b++) {
            /** @type {Date} */
            var now = new Date(+new Date(nodeList[b][0]) + 576E5 - 1);
            var index = tokenized.length;
            for (;index--;) {
              if (show(tokenized[index].date, now)) {
                if ("buy" == nodeList[b][1]) {
                  eventPath.push([[index, nodeList[b][2]]]);
                } else {
                  oSpace.push([[index, nodeList[b][2]]]);
                }
                break;
              }
              if (tokenized[index].date < now) {
                break;
              }
            }
          }
          return{
            buy : eventPath,
            sell : oSpace
          };
        }
      }
      /**
       * @param {string} name
       * @return {undefined}
       */
      function load(name) {
        if (!name) {
          /** @type {string} */
          name = trigger() + "|23";
        }
        item.paintTool.empty(name, "buyandsell");
      }
      /**
       * @return {undefined}
       */
      function render() {
        if (item.paintTool) {
          /** @type {string} */
          var success = trigger() + "|23";
          /** @type {string} */
          var failure = trigger() + "|t";
          load(success);
          load(failure);
          var event = item.paintTool.param.shapeListName;
          if (event == success || event == failure) {
            if (that.isShow && el.checked || !that.isShow) {
              var settings = that.isShow ? parse() : get();
              if (settings && settings.ifShow) {
                if (event == success) {
                  var building = expand(settings.data);
                  if (building) {
                    item.paintTool.addShapeList(success, "buyandsell", "UpArrow", building.buy, {
                      fillStyle : "red"
                    });
                    item.paintTool.addShapeList(success, "buyandsell", "DownArrow", building.sell, {
                      fillStyle : "green"
                    });
                    item.paintTool.addShapeList(success, "buyandsell", "Level", [[[0, +settings.count.costPrice]]], {
                      strokeStyle : "black"
                    });
                  }
                } else {
                  item.paintTool.addShapeList(failure, "buyandsell", "Level", [[[0, +settings.count.costPrice]]], {
                    strokeStyle : "black"
                  });
                }
              }
            }
            item.paintTool.paint();
          }
        }
      }
      /**
       * @return {?}
       */
      function ready() {
        var item = createEl("table");
        var style = item.style;
        return style.width = "100%", style.textAlign = "center", style.borderCollapse = "collapse", item.border = "0", item.cellpadding = "0", item.cellspacing = "0", item;
      }
      /**
       * @param {(number|string)} content
       * @return {?}
       */
      function text(content) {
        var el = createEl("td");
        var style = el.style;
        if (style.border = "solid 1px #e5e5e5", style.textAlign = "center", style.font = font, content && content.length) {
          /** @type {number} */
          var p = 0;
          var li = content.length;
          for (;li > p;p++) {
            el.appendChild(content[p]);
          }
        }
        return el;
      }
      /**
       * @param {Array} data
       * @return {?}
       */
      function draw(data) {
        var tr = createEl("tr");
        var dummy = tr.style;
        /** @type {string} */
        dummy.height = "30px";
        /** @type {string} */
        dummy.background = "#eef1f8";
        /** @type {number} */
        var i = 0;
        var l = data.length;
        for (;l > i;i++) {
          var row = createEl("th");
          var s = row.style;
          /** @type {string} */
          s.font = t;
          /** @type {string} */
          s.border = "solid 1px #e5e5e5";
          /** @type {string} */
          s.textAlign = "center";
          row.innerHTML = data[i];
          tr.appendChild(row);
        }
        return tr;
      }
      /**
       * @return {?}
       */
      function success() {
        /** @type {Date} */
        var tempDate = new Date;
        /** @type {number} */
        var g = tempDate.getMonth() + 1;
        /** @type {number} */
        var time = tempDate.getDate();
        return 10 > g && (g = "0" + g), 10 > time && (time = "0" + time), [tempDate.getFullYear(), g, time].join("-");
      }
      /**
       * @param {Object} style
       * @return {undefined}
       */
      function create(style) {
        /** @type {string} */
        style.font = font;
        /** @type {string} */
        style.textAlign = "center";
        /** @type {string} */
        style.border = "none";
        /** @type {string} */
        style.outline = "none";
      }
      /**
       * @param {Element} selector
       * @param {Array} events
       * @param {?} vec0
       * @param {string} font
       * @return {undefined}
       */
      function add(selector, events, vec0, font) {
        /** @type {number} */
        var i = 0;
        var l = events.length;
        for (;l > i;i++) {
          var elem = createEl("option");
          elem.value = events[i][0];
          if (vec0 == events[i][0]) {
            /** @type {boolean} */
            elem.selected = true;
          }
          elem.innerHTML = events[i][1];
          /** @type {string} */
          elem.style.font = font;
          selector.appendChild(elem);
        }
      }
      /**
       * @return {?}
       */
      function fn() {
        var el = createEl("span");
        var style = el.style;
        return style.display = "inline-block", style.width = "16px", style.height = "16px", style.lineHeight = "16px", style.margin = "2px", style.borderRadius = "2px", style.color = "#fff", style.backgroundColor = "#628BD2", style.cursor = "pointer", style.userSelect = "none", style.webkitUserSelect = "none", style.msUserSelect = "none", style.mosUserSelect = "none", el;
      }
      /**
       * @param {?} e
       * @return {undefined}
       */
      function callback(e) {
        var wrapper = event.getEvent(e).target.parentNode.parentNode;
        if (wrapper.nextSibling) {
          element.insertBefore(init(), wrapper.nextSibling);
        } else {
          element.appendChild(init());
        }
      }
      /**
       * @return {undefined}
       */
      function set() {
        var div = element.childNodes[1];
        if (div) {
          var inputs = div.querySelectorAll("input");
          var i = inputs.length;
          for (;i--;) {
            inputs[i].value = 0 == i ? success() : "";
          }
          /** @type {string} */
          div.childNodes[4].innerHTML = "";
        } else {
          element.appendChild(init());
        }
      }
      /**
       * @param {?} e
       * @return {undefined}
       */
      function close(e) {
        var tbody = event.getEvent(e).target.parentNode.parentNode;
        if (element.childNodes.length > 2) {
          element.removeChild(tbody);
        } else {
          set();
        }
        reset();
      }
      /**
       * @param {?} data
       * @return {?}
       */
      function init(data) {
        /**
         * @return {undefined}
         */
        function run() {
          /** @type {string} */
          title.innerHTML = (el.value * input.value).toFixed(2);
        }
        /**
         * @return {undefined}
         */
        function onclick() {
          run();
          reset();
        }
        var head = createEl("tr");
        var bodyStyle = head.style;
        /** @type {string} */
        bodyStyle.height = "24px";
        var element = createEl("input");
        var style = element.style;
        create(style);
        element.setAttribute("type", "date");
        element.setAttribute("value", data ? data[0] : success());
        /** @type {string} */
        style.width = "120px";
        event.addHandler(element, "input", function(e) {
          var control = event.getEvent(e).target;
          control.value = control.value.replace(/[^\d-]/g, "").split(/-+/).slice(0, 3).join("-");
          render();
        });
        head.appendChild(text([element]));
        var option = createEl("select");
        var e = option.style;
        create(e);
        add(option, [["buy", "买入"], ["sell", "卖出"]], data ? data[1] : "", font);
        event.addHandler(option, "change", reset);
        head.appendChild(text([option]));
        var el = createEl("input");
        var s = el.style;
        create(s);
        el.setAttribute("step", "0.01");
        el.setAttribute("min", "0");
        el.setAttribute("max", "99999");
        /** @type {string} */
        s.width = "60px";
        if (data) {
          el.value = data[2];
        }
        event.addHandler(el, "input", function(e) {
          var elm = event.getEvent(e).target;
          elm.value = elm.value.replace(/[^\d\.]/g, "").split(/\.+/).slice(0, 2).join(".");
          if (elm.value > 99999) {
            /** @type {number} */
            elm.value = 99999;
          }
        });
        head.appendChild(text([el]));
        var input = createEl("input");
        var i = input.style;
        create(i);
        input.setAttribute("step", "1");
        input.setAttribute("min", "0");
        input.setAttribute("max", "9999999999999");
        /** @type {string} */
        i.width = "100px";
        if (data) {
          input.value = data[3];
        }
        event.addHandler(input, "input", function(e) {
          var current = event.getEvent(e).target;
          current.value = current.value.replace(/[^\d]/g, "");
          if (current.value > 9999999999999) {
            /** @type {number} */
            current.value = 9999999999999;
          }
        });
        head.appendChild(text([input]));
        var title = text();
        /** @type {string} */
        title.style.font = font;
        head.appendChild(title);
        if (data) {
          run();
        }
        event.addHandler(el, "input", onclick);
        event.addHandler(input, "input", onclick);
        var f = fn();
        /** @type {string} */
        f.innerHTML = "+";
        event.addHandler(f, "click", callback);
        var p = fn();
        return p.innerHTML = "-", event.addHandler(p, "click", close), head.appendChild(text([f, p])), head;
      }
      /**
       * @return {undefined}
       */
      function remove() {
        var data = get();
        if (data) {
          next();
          successCallback(data);
          el.checked = data.ifShow;
        } else {
          set();
        }
        reset();
      }
      /**
       * @param {Node} n
       * @return {undefined}
       */
      function f(n) {
        event.removeHandler(n.childNodes[5].childNodes[0], "click", callback);
        event.removeHandler(n.childNodes[5].childNodes[1], "click", close);
      }
      /**
       * @return {undefined}
       */
      function next() {
        var childElements = element.childNodes;
        /** @type {number} */
        var i = childElements.length - 1;
        for (;i > 0;i--) {
          f(childElements[i]);
          element.removeChild(childElements[i]);
        }
      }
      /**
       * @param {MessageEvent} response
       * @return {undefined}
       */
      function successCallback(response) {
        var data = response.data;
        /** @type {number} */
        var i = 0;
        var l = data.length;
        for (;l > i;i++) {
          element.appendChild(init(data[i]));
        }
      }
      /**
       * @return {undefined}
       */
      function tick() {
        var mat = clear();
        if (mat != dest) {
          reset();
          dest = mat;
        }
      }
      /** @type {string} */
      var data = "sinatkchart_tradehistory_" + trigger();
      var that = this;
      /** @type {string} */
      var font = "12px Arial";
      /** @type {string} */
      var t = "14px Arial";
      /** @type {number} */
      var frequency = 1E3;
      var c = createEl("div");
      var cs = c.style;
      /** @type {string} */
      cs.position = "absolute";
      /** @type {string} */
      cs.width = "580px";
      /** @type {string} */
      cs.maxHeight = "400px";
      /** @type {string} */
      cs.overflow = "hidden";
      /** @type {string} */
      cs.left = "100px";
      /** @type {string} */
      cs.top = "100px";
      /** @type {number} */
      cs.zIndex = 8891;
      /** @type {string} */
      cs.background = "#fff";
      /** @type {string} */
      cs.border = "6px solid rgba(200, 200, 200, 0.6)";
      var container = createEl("div");
      var containerStyle = container.style;
      /** @type {string} */
      containerStyle.height = "40px";
      /** @type {string} */
      containerStyle.width = "100%";
      /** @type {string} */
      containerStyle.backgroundColor = "#fff";
      /** @type {string} */
      containerStyle.fontSize = "16px";
      /** @type {string} */
      containerStyle.fontWeight = "bold";
      /** @type {string} */
      containerStyle.textIndent = "10px";
      /** @type {string} */
      containerStyle.lineHeight = "44px";
      /** @type {string} */
      container.innerHTML = "交易日志";
      c.appendChild(container);
      /** @type {Element} */
      var e = document.createElement("span");
      /** @type {(CSSStyleDeclaration|null)} */
      var options = e.style;
      /** @type {string} */
      options.display = "inline-block";
      /** @type {string} */
      options.lineHeight = "12px";
      /** @type {string} */
      options.width = "12px";
      /** @type {string} */
      options.height = "12px";
      /** @type {string} */
      options.border = "1px solid #628BD2";
      /** @type {string} */
      options.color = "#628BD2";
      /** @type {string} */
      options.borderRadius = "12px";
      /** @type {string} */
      options.fontSize = "12px";
      /** @type {string} */
      options.cursor = "help";
      /** @type {string} */
      options.textAlign = "left";
      /** @type {string} */
      options.marginLeft = "5px";
      /** @type {string} */
      options.textIndent = "3px";
      /** @type {string} */
      e.innerHTML = "?";
      container.appendChild(e);
      /** @type {Element} */
      var layer = document.createElement("div");
      /** @type {(CSSStyleDeclaration|null)} */
      var style = layer.style;
      /** @type {string} */
      style.display = "none";
      /** @type {string} */
      style.position = "absolute";
      /** @type {string} */
      style.width = "240px";
      /** @type {string} */
      style.left = "5px";
      /** @type {string} */
      style.top = "35px";
      /** @type {string} */
      style.padding = "5px";
      /** @type {string} */
      style.border = "1px solid #AEC7E3";
      /** @type {string} */
      style.zIndex = "99999";
      /** @type {string} */
      style.fontSize = "12px";
      /** @type {string} */
      style.fontWeight = "normal";
      /** @type {string} */
      style.lineHeight = "14px";
      /** @type {string} */
      style.backgroundColor = "#fff";
      /** @type {string} */
      style.boxShadow = "2px 2px 2px #AEC7E3";
      container.appendChild(layer);
      event.addHandler(e, "mouseover", function(event) {
        var eventType = event ? event.target || event.srcElement : null;
        if (eventType) {
          /** @type {string} */
          layer.style.display = "";
          /** @type {string} */
          layer.innerHTML = "“交易日志”功能使您在日K线图中可视化的查看持仓成本线与最新股价的距离。同时，您也可以通过增加一笔“买入/卖出”操作，在图表下方的汇总栏中快速看到此操作后成本价、盈亏比等的变化情况（未计算佣金和税率），为您做出交易决策提供便利。";
        }
      });
      event.addHandler(e, "mouseout", function() {
        /** @type {string} */
        layer.style.display = "none";
      });
      var now;
      var x;
      var clientX;
      var initialY;
      var milliSeconds;
      var y;
      /** @type {boolean} */
      var ee = false;
      if ("ontouchend" in window) {
        event.addHandler(container, "touchstart", initUserPanel);
        event.addHandler(container, "touchmove", onTouchMove);
        event.addHandler(container, "touchend", b);
      }
      event.addHandler(container, "mousedown", initUserPanel);
      event.addHandler(container, "mousemove", onTouchMove);
      event.addHandler(container, "mouseup", b);
      event.addHandler(container, "mouseout", b);
      var p = update("确定");
      event.addHandler(p, "click", function() {
        that.hide();
        var url = parse();
        if (url) {
          context.save(data, url);
          SUDA.uaTrack("chart_tradelog", item.symbol + "$$$$" + JSON.stringify(url));
          self.suda("tradelog");
        } else {
          context.remove(data);
        }
        render();
      });
      container.appendChild(p);
      var a = update("取消");
      event.addHandler(a, "click", function() {
        that.hide();
        render();
      });
      container.appendChild(a);
      var info = update("清空");
      event.addHandler(info, "click", function() {
        next();
        set();
        reset();
      });
      container.appendChild(info);
      var node = createEl("label");
      var s = node.style;
      /** @type {string} */
      s["float"] = "right";
      /** @type {string} */
      s.font = font;
      /** @type {string} */
      s.margin = "12px 10px 0 0";
      /** @type {string} */
      s.textIndent = "0";
      /** @type {string} */
      s.cursor = "pointer";
      /** @type {string} */
      node.innerHTML = "绘制交易点";
      var el = createEl("input");
      var css = el.style;
      /** @type {string} */
      el.type = "checkbox";
      /** @type {string} */
      css.margin = "1px";
      /** @type {string} */
      css.verticalAlign = "bottom";
      /** @type {string} */
      css["float"] = "left";
      /** @type {boolean} */
      el.checked = true;
      event.addHandler(el, "change", render);
      node.appendChild(el);
      container.appendChild(node);
      var head = createEl("div");
      var ns = head.style;
      /** @type {string} */
      ns.width = "100%";
      /** @type {string} */
      ns.maxHeight = "305px";
      /** @type {string} */
      ns.overflow = "auto";
      c.appendChild(head);
      var element = ready();
      head.appendChild(element);
      element.appendChild(draw(["日期", "类型", "成交价", "成交量", "成交额", "操作"]));
      var g = ready();
      /** @type {Array} */
      var line = ["持仓量", "成本价", "市价", "盈亏比(%)", "盈亏", "市值"];
      var cell = createEl("tr");
      /** @type {string} */
      cell.style.height = "24px";
      /** @type {number} */
      var lineLength = line.length;
      for (;lineLength--;) {
        cell.appendChild(text());
      }
      g.appendChild(draw(line));
      g.appendChild(cell);
      c.appendChild(g);
      remove();
      /** @type {string} */
      cs.display = "none";
      document.body.appendChild(c);
      var timer;
      var dest = clear();
      /** @type {boolean} */
      this.isShow = false;
      /**
       * @param {number} x
       * @param {number} y
       * @return {undefined}
       */
      this.show = function(x, y) {
        if (!this.isShow) {
          remove();
          if ("undefined" != typeof x) {
            /** @type {string} */
            cs.left = x + "px";
          }
          if ("undefined" != typeof y) {
            /** @type {string} */
            cs.top = y + "px";
          }
          /** @type {string} */
          cs.display = "";
          /** @type {boolean} */
          this.isShow = true;
          /** @type {number} */
          timer = setInterval(tick, frequency);
        }
      };
      /**
       * @return {undefined}
       */
      this.hide = function() {
        /** @type {string} */
        cs.display = "none";
        /** @type {boolean} */
        this.isShow = false;
        clearInterval(timer);
      };
      /** @type {function (): undefined} */
      this.repaint = render;
    }
    /**
     * @param {?} store
     * @param {string} submit
     * @return {undefined}
     */
    function reDraw(store, submit) {
      if (23 == submit || "t" == submit) {
        if (!api) {
          api = new initF;
        }
        api.repaint();
      }
    }
    /**
     * @return {undefined}
     */
    function animate() {
      tpOpt = extend({
        className : OPTIONS.className,
        css : OPTIONS.classStyle
      }, tpOpt || null);
    }
    /**
     * @return {undefined}
     */
    function setup() {
      /** @type {string} */
      var prefix = "." + tpOpt.className.ctn + tpOpt.css.ctn;
      /** @type {string} */
      var s = "." + tpOpt.className.fullscreen + tpOpt.css.fullscreen;
      /** @type {string} */
      var inner = "." + tpOpt.className.fullscreen + ":hover" + tpOpt.css.hover;
      /** @type {string} */
      var t = "." + tpOpt.className.more + tpOpt.css.more;
      /** @type {string} */
      var name = "." + tpOpt.className.more + ":hover" + tpOpt.css.hover;
      /** @type {string} */
      var resource = prefix + t + name + s + inner;
      image.inject(resource);
    }
    /**
     * @return {undefined}
     */
    function callback() {
      var div = createEl("div");
      div.className = tpOpt.className.ctn;
      text(tpOpt.userObj.dom_id).appendChild(div);
      var i;
      /** @type {Array} */
      var types = ["click", "touchend"];
      span = createEl("div");
      /** @type {string} */
      span.title = "全屏查看";
      span.className = tpOpt.className.fullscreen;
      /** @type {number} */
      i = types.length;
      for (;i--;) {
        event.addHandler(span, types[i], render);
      }
      if (!self.xh5_BrowserUtil.noH5) {
        var nodeHref;
        try {
          /** @type {string} */
          nodeHref = document.location.href;
        } catch (s) {
        }
        if (nodeHref) {
          div.appendChild(span);
        }
      }
      var test = createEl("div");
      /** @type {string} */
      test.title = "更多";
      test.className = tpOpt.className.more;
      var notification = new Timepicker(text(tpOpt.userObj.dom_id), tpOpt);
      /** @type {number} */
      i = types.length;
      for (;i--;) {
        event.addHandler(test, types[i], function(e) {
          event.preventDefault(e);
          if (notification.isshow) {
            notification.hide();
          } else {
            notification.show();
          }
        });
      }
      div.appendChild(test);
      p = createEl("div");
      /** @type {string} */
      p.style.width = "100%";
      /** @type {string} */
      p.style.height = "100%";
      /** @type {string} */
      p.style.backgroundColor = self.xh5_BrowserUtil.noH5 ? "#000" : "rgba(0,0,0, 0.7)";
      /** @type {string} */
      p.style.position = "fixed";
      /** @type {number} */
      p.style.zIndex = 8888;
      /** @type {string} */
      p.style.display = "none";
      /** @type {number} */
      p.style.top = 0;
      /** @type {number} */
      p.style.left = 0;
      event.addHandler(p, "mousewheel", onPaste);
      event.addHandler(p, "DOMMouseScroll", onPaste);
      f = createEl("div");
      /** @type {string} */
      f.style.backgroundColor = "#fff";
      /** @type {string} */
      f.style.width = "96%";
      /** @type {string} */
      f.style.height = "98%";
      /** @type {string} */
      f.style.top = "1%";
      /** @type {string} */
      f.style.left = "2%";
      /** @type {number} */
      f.style.zIndex = 8889;
      /** @type {string} */
      f.style.position = "fixed";
      /** @type {string} */
      f.style.textAlign = "left";
      event.addHandler(f, "mousewheel", onPaste);
      event.addHandler(f, "DOMMouseScroll", onPaste);
    }
    /**
     * @return {undefined}
     */
    function end() {
      if (tpOpt.userObj.mt) {
        if ("cntouzi2" == tpOpt.userObj.mt) {
          self.suda("touzi_pc_v2_market_today_16", null, "touzi_pc_v2_market_today");
        }
      }
    }
    /**
     * @param {?} e
     * @return {undefined}
     */
    function render(e) {
      event.preventDefault(e);
      if (!Y) {
        /** @type {boolean} */
        Y = true;
        document.body.appendChild(p);
        document.body.appendChild(f);
      }
      if (perm) {
        /** @type {string} */
        span.title = "全屏查看";
        /** @type {string} */
        span.style.background = 'url("' + key + '") no-repeat 0px -24px';
        /** @type {string} */
        p.style.display = f.style.display = "none";
        cell.insertBefore(text(tpOpt.userObj.dom_id), cell.firstChild);
      } else {
        /** @type {string} */
        span.title = "退出全屏";
        /** @type {string} */
        span.style.background = 'url("' + key + '") no-repeat -1px 0px';
        /** @type {string} */
        p.style.display = f.style.display = "";
        f.appendChild(text(tpOpt.userObj.dom_id));
        self.suda("tool_fullscreen");
        end();
      }
      if (tpOpt.chart) {
        tpOpt.chart.onresize();
      }
      /** @type {boolean} */
      perm = !perm;
    }
    /**
     * @param {?} pattern
     * @return {?}
     */
    function match(pattern) {
      return/^sh020\d{3}$/.test(pattern) ? "bond" : /^sz108\d{3}$/.test(pattern) ? "bond" : /^sh(009|010)\d{3}$/.test(pattern) ? "bond" : /^sz10\d{4}$/.test(pattern) ? "bond" : /^sh(100|110|112|113)\d{3}$/.test(pattern) ? "bond" : /^sz12\d{4}$/.test(pattern) ? "bond" : /^sh(105|120|129|139)\d{3}$/.test(pattern) ? "bond" : /^sz11\d{4}$/.test(pattern) ? "bond" : "CN";
    }
    /**
     * @return {undefined}
     */
    function formatNumber() {
      var expires;
      /** @type {string} */
      var post = "";
      switch(tpOpt.menu.chooseTab.tab) {
        case "t1":
        ;
        case "ts":
          /** @type {string} */
          expires = "1日";
          break;
        case "t5":
          /** @type {string} */
          expires = "5日";
          break;
        case "kd":
          /** @type {string} */
          expires = "日K";
          break;
        case "kw":
          /** @type {string} */
          expires = "周K";
          break;
        case "km":
          /** @type {string} */
          expires = "月K";
          break;
        case "k5":
          /** @type {string} */
          expires = "5分钟K";
          break;
        case "k15":
          /** @type {string} */
          expires = "15分钟K";
          break;
        case "k30":
          /** @type {string} */
          expires = "30分钟K";
          break;
        case "k60":
          /** @type {string} */
          expires = "60分钟K";
          break;
        case "kdd":
          /** @type {string} */
          expires = "多空日K";
          break;
        case "YTD":
          /** @type {string} */
          expires = "今年以来年";
          break;
        case "km1":
          /** @type {string} */
          expires = "一月年";
          break;
        case "km3":
          /** @type {string} */
          expires = "三月年";
          break;
        case "km12":
          /** @type {string} */
          expires = "一年年";
          break;
        case "kcl":
          /** @type {string} */
          expires = "年";
          break;
        default:
          /** @type {string} */
          expires = "";
      }
      var appFrontendUrl;
      var path;
      var key = tpOpt.userObj.symbol;
      var camelKey = self.market(key);
      switch(camelKey) {
        case "CN":
          path = key;
          /** @type {string} */
          appFrontendUrl = "bond" == match(key) ? "//money.finance.sina.com.cn/bond/quotes/" + key + ".html" : "//finance.sina.com.cn/realstock/company/" + key + "/nc.shtml";
          break;
        case "US":
          path = key.replace("gb_", "");
          path = path.replace("$", "");
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/usstock/quotes/" + path + ".html";
          break;
        case "OTC":
          path = key.replace("sb", "");
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/thirdmarket/quotes/" + key + ".html";
          break;
        case "HK":
          path = key.replace("rt_hk", "");
          path = key.replace("hk", "");
          /** @type {string} */
          appFrontendUrl = "//stock.finance.sina.com.cn/hkstock/quotes/" + path + ".html";
          break;
        default:
          /** @type {string} */
          appFrontendUrl = "//finance.sina.com.cn";
          path = key;
      }
      /** @type {string} */
      var base = "#新浪财经行情图#";
      switch(tpOpt.menu.chooseTab.tye) {
        case "T":
          tpOpt.chart.tChart.shareTo({
            url : appFrontendUrl,
            wbtext : base + post + "(#" + path + "#)行情走势_" + expires + "分时"
          });
          break;
        case "K":
          tpOpt.chart.kChart.shareTo({
            url : appFrontendUrl,
            wbtext : base + post + "(#" + path + "#)行情走势_" + expires + "线"
          });
          break;
        default:
          tpOpt.chart.tChart.shareTo({
            url : appFrontendUrl,
            wbtext : base + post + "(#" + path + "#)行情走势"
          });
      }
    }
    /**
     * @param {string} other
     * @return {undefined}
     */
    function toggle(other) {
      userPanel = new initUserPanel(other);
      /** @type {number} */
      var H = 55;
      if (other) {
        if ("cntouzi2" == other.userObj.mt) {
          /** @type {number} */
          H = 65;
        }
      }
      userPanel.mainCircle({
        h : H,
        display : "block",
        text : 1,
        radius : 15
      });
    }
    /**
     * @return {undefined}
     */
    function start() {
      animate();
      if (tpOpt.userObj.dom_id) {
        setup();
        callback();
        toggle(tpOpt);
      }
    }
    var that;
    var loading;
    var api;
    /** @type {boolean} */
    var D = false;
    var udataCur = {
      /**
       * @param {?} next
       * @return {undefined}
       */
      edit : function(next) {
        /** @type {boolean} */
        D = false;
        tpOpt.chart.setTKChart(next);
      }
    };
    /**
     * @param {number} e
     * @return {undefined}
     */
    var run = function(e) {
      if (that) {
        that.sendOriginalData(item.settingCfg, udataCur);
        if (that.isShow) {
          that.hide();
        } else {
          self.suda("tool_setting");
          that.show(e);
        }
      } else {
        that = new postLink({
          url : appFrontendUrl,
          z : 9999
        }, fn(run, null, e));
      }
      /** @type {boolean} */
      D = true;
    };
    /**
     * @param {Touch} event
     * @return {undefined}
     */
    var update = function(event) {
      if (!loading) {
        loading = new init;
        if (tpOpt.chart) {
          if (item.paintTool) {
            tpOpt.chart.paintTool = item.paintTool;
          }
        }
      }
      if (loading.isShow) {
        loading.hide();
      } else {
        self.suda("tool_painter");
        loading.show(event.pageX + 102 < document.body.offsetWidth ? event.pageX + 20 : event.pageX - 122, event.pageY - 65);
      }
    };
    tpOpt.chart.al("PAINTTOOL_VIEW_CHANGEED", reDraw);
    /**
     * @return {undefined}
     */
    var show = function() {
      if (!api) {
        api = new initF;
      }
      if (api.isShow) {
        api.hide();
      } else {
        self.suda("tool_trade");
        api.show(window.innerWidth / 2 - 290, window.scrollY + window.innerHeight / 2 - 120);
      }
    };
    /**
     * @return {undefined}
     */
    var onClick = function() {
      /** @type {string} */
      var endpoint = navigator.userAgent || "";
      var a = self.urlUtil.getMainUrl();
      /** @type {string} */
      var y = "wangxuan2@staff.sina.com.cn?cc=yangwen@staff.sina.com.cn";
      /** @type {string} */
      var content = encodeURIComponent("行情图意见反馈");
      /** @type {string} */
      var str = encodeURIComponent("【附加信息，便于调试：“访问页面地址：" + a + " 浏览器信息：" + endpoint + "”】如您有任何疑问、意见和建议，可通过电子邮件的方式与我们建立联系：");
      /** @type {string} */
      var url = ["mailto:", y, "&subject=", content, "&body=", str].join("");
      window.open(url, "_blank");
    };
    var global = {
      /** @type {function (): undefined} */
      weibo : formatNumber,
      /**
       * @param {?} typeNumber
       * @param {Object} opts
       * @return {undefined}
       */
      qrcode : function(typeNumber, opts) {
        switch(opts.menu.chooseTab.tye) {
          case "K":
            tpOpt.chart.kChart.shareTo({
              type : "qrcode"
            });
            break;
          default:
          ;
          case "T":
            tpOpt.chart.tChart.shareTo({
              type : "qrcode"
            });
        }
      },
      /** @type {function (Touch): undefined} */
      painter : update,
      /** @type {function (): undefined} */
      trade : show,
      /** @type {function (number): undefined} */
      setting : run,
      /** @type {function (): undefined} */
      contact : onClick
    };
    /** @type {boolean} */
    var encodeURI_enabled = 0 == location.protocol.indexOf("https:") ? true : false;
    /** @type {Array} */
    var l = [{
      title : "偏好设置",
      p : "setting"
    }];
    if (!self.xh5_BrowserUtil.noH5) {
      /** @type {Array} */
      l = l.concat([{
        title : "画图工具",
        p : "painter"
      }, {
        title : "交易日志",
        p : "trade"
      }, {
        title : "分享到微博",
        p : "weibo"
      }, {
        title : "扫描二维码",
        p : "qrcode"
      }]);
    }
    /** @type {string} */
    var k = "//n.sinaimg.cn/finance/chartimg/chart_setting_icons.png?2017";
    var key = encodeURI_enabled ? self.getSUrl(k) : k;
    var defaults = {
      show : false,
      zIndex : 301,
      backgroundColor : "#fff",
      toolList : l,
      toolBox : {
        right : "1px",
        top : "31px"
      },
      toolItem : {
        width : "30px",
        height : "29px"
      },
      toolListBG : {
        setting : 'url("' + key + '") no-repeat 4px -115px',
        painter : 'url("' + key + '") no-repeat 3px -167px',
        trade : 'url("' + key + '") no-repeat 4px -195px',
        weibo : 'url("' + key + '") no-repeat 3px -44px',
        qrcode : 'url("' + key + '") no-repeat 3px -92px',
        contact : 'url("' + key + '") no-repeat 3px -44px'
      }
    };
    /**
     * @param {DirectoryEntry} parent
     * @param {string} options
     * @return {undefined}
     */
    var Timepicker = function(parent, options) {
      /** @type {DirectoryEntry} */
      this.parent = parent;
      this.param = extend(defaults, options || null);
      this._init();
    };
    Timepicker.prototype = {
      /** @type {function (DirectoryEntry, string): undefined} */
      constructor : Timepicker,
      /**
       * @return {undefined}
       */
      _init : function() {
        var poster = this;
        var tpOpt = this.param;
        var o = this.parent;
        var el = createElement("div", o, tpOpt.toolBox);
        var style = el.style;
        var context = tpOpt.toolList;
        /** @type {string} */
        style.cursor = "pointer";
        /** @type {string} */
        style.position = "absolute";
        style.zIndex = tpOpt.zIndex;
        style.backgroundColor = tpOpt.backgroundColor;
        /** @type {string} */
        style.display = tpOpt.show ? "" : "none";
        this.isshow = tpOpt.show;
        this.wrap = el;
        /** @type {number} */
        var i = 0;
        var j = context.length;
        for (;j > i;i++) {
          var entry = context[i];
          var type = entry.p;
          if (type in global) {
            var item = createElement("div", el, tpOpt.toolItem);
            item.title = entry.title;
            var layout = item.style;
            if (0 == i) {
              /** @type {string} */
              layout.borderTop = "1px solid #dde4f4";
            }
            /** @type {string} */
            layout.borderRight = layout.borderBottom = layout.borderLeft = "1px solid #dde4f4";
            layout.background = tpOpt.toolListBG[type];
            /** @type {string} */
            layout.backgroundColor = "#f7f7f7";
            item.setAttribute("tool-type", type);
          }
        }
        event.addHandler(el, "click", function(resp) {
          var collection = global;
          var method = event.getTarget(resp).getAttribute("tool-type");
          if ("weibo" == method || "qrcode" == method) {
            self.suda("tool_" + method);
          }
          userPanel.visibleChild({
            name : method
          });
          if (collection[method]) {
            collection[method](resp, options);
          }
          poster.hide();
        });
        event.addHandler(el, "mouseover", function(e) {
          /** @type {string} */
          event.getTarget(e).style.filter = "Alpha(Opacity=70)";
          /** @type {number} */
          event.getTarget(e).style.opacity = 0.7;
        });
        event.addHandler(el, "mouseout", function(e) {
          /** @type {string} */
          event.getTarget(e).style.filter = "";
          /** @type {number} */
          event.getTarget(e).style.opacity = 1;
        });
      },
      /**
       * @param {number} x
       * @param {number} y
       * @return {undefined}
       */
      show : function(x, y) {
        var wrap = this.wrap;
        var cs = wrap.style;
        if (!this.isshow) {
          if ("undefined" != typeof x) {
            /** @type {string} */
            cs.left = x + "px";
          }
          if ("undefined" != typeof y) {
            /** @type {string} */
            cs.top = y + "px";
          }
          /** @type {string} */
          cs.display = "";
          /** @type {boolean} */
          this.isshow = true;
          userPanel.childDisplay();
          self.suda("tool_more");
          if (tpOpt.userObj.mt) {
            if ("cntouzi2" == tpOpt.userObj.mt) {
              self.suda("touzi_pc_v2_market_today_17", null, "touzi_pc_v2_market_today");
            }
          }
        }
      },
      /**
       * @return {undefined}
       */
      hide : function() {
        /** @type {string} */
        this.wrap.style.display = "none";
        /** @type {boolean} */
        this.isshow = false;
        userPanel.childDisplay(1);
      }
    };
    var f;
    var p;
    var span;
    var OPTIONS = {
      classStyle : {
        ctn : "{position:absolute;right:0;top:4px;z-index:301;}\n",
        hover : "{filter:Alpha(Opacity=70);opacity:0.7;}\n",
        fullscreen : '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' + key + '") no-repeat 0px -24px;}\n',
        more : '{float:left;width:22px;height:22px;cursor:pointer;margin-right:5px;background: url("' + key + '") no-repeat 7px -72px;}\n'
      },
      className : {
        ctn : "kke_cfg_ctn",
        fullscreen : "kke_cfg_fullscreen",
        more : "kke_cfg_share"
      }
    };
    var cell = text(tpOpt.userObj.dom_id).parentNode;
    /** @type {boolean} */
    var perm = false;
    /** @type {boolean} */
    var Y = false;
    window.charttest = {
      /** @type {function (?): undefined} */
      fs : render
    };
    var userPanel;
    start();
    if (tpOpt.chart) {
      /** @type {function (): undefined} */
      tpOpt.chart.showTradeBox = show;
    }
  }
  var item;
  var createEl = self.$C;
  var extend = self.oc;
  var text = self.$DOM;
  var fn = self.fBind;
  var res = self.bridge;
  var image = self.cssUtil;
  var event = self.xh5_EvtUtil;
  var context = self.localSL;
  var expr = self.isFunc;
  /** @type {string} */
  var appFrontendUrl = "https://current.sina.com.cn/sinatkchart/settingpanel.html?20161230a";
  return new function() {
    /** @type {string} */
    this.VER = "1.2.6";
    /**
     * @param {?} options
     * @param {?} errback
     * @return {undefined}
     */
    this.get = function(tpOpt, errback) {
      item = tpOpt.userObj;
      var p = new init(tpOpt);
      if (expr(errback)) {
        errback(p);
      }
    };
  };
});
