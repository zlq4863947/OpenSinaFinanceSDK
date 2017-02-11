xh5_define("utils.util", [], function() {
  return function() {
    /**
     * @param {Object} child
     * @param {Function} parent
     * @return {undefined}
     */
    function inheritPrototype(child, parent) {
      var p = createObject(parent.prototype);
      /** @type {Object} */
      p.constructor = child;
      child.prototype = p;
    }
    /**
     * @return {undefined}
     */
    function State() {
      this.evtObj = {};
    }
    /**
     * @param {Function} partial
     * @param {?} context
     * @return {?}
     */
    function partial(partial, context) {
      /** @type {Array.<?>} */
      var args = Array.prototype.slice.call(arguments, 2);
      return function() {
        return partial.apply(context, args.concat(Array.prototype.slice.call(arguments)));
      };
    }
    /**
     * @return {?}
     */
    function now() {
      return Date.now ? Date.now() : (new Date).getTime();
    }
    /**
     * @param {string} to
     * @param {?} last
     * @return {?}
     */
    function process(to, last) {
      if (!last) {
        to = to.toLowerCase();
      }
      var ch;
      /** @type {number} */
      var hash = 1315423911;
      var j = to.length;
      for (;j--;) {
        ch = to.charCodeAt(j);
        hash ^= (hash << 5) + ch + (hash >> 2);
      }
      return 2147483647 & hash;
    }
    /**
     * @param {string} path
     * @param {Function} opt_callback
     * @param {Function} fn
     * @param {string} deepDataAndEvents
     * @return {undefined}
     */
    function loadScript(path, opt_callback, fn, deepDataAndEvents) {
      /** @type {boolean} */
      var i = false;
      /** @type {Element} */
      var el = document.createElement("script");
      var insertAt = document.getElementsByTagName("script")[0];
      var head = document.head || (document.getElementsByTagName("head")[0] || document.documentElement);
      var insertBeforeEl = head.getElementsByTagName("base")[0];
      el.charset = deepDataAndEvents || "UTF-8";
      /** @type {string} */
      el.src = path;
      /** @type {boolean} */
      el.async = true;
      /** @type {function (): undefined} */
      el.onload = el.onreadystatechange = function() {
        if (!i) {
          if (!(el.readyState && !/loaded|complete/.test(el.readyState))) {
            /** @type {boolean} */
            i = true;
            /** @type {null} */
            el.onload = el.onreadystatechange = el.onerror = null;
            el.parentNode.removeChild(el);
            /** @type {null} */
            el = null;
            if ("function" == typeof opt_callback) {
              opt_callback();
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      el.onerror = function() {
        /** @type {null} */
        el.onload = el.onreadystatechange = el.onerror = null;
        el.parentNode.removeChild(el);
        /** @type {null} */
        el = null;
        if ("function" == typeof fn) {
          fn();
        }
      };
      if (insertAt.parentNode) {
        insertAt.parentNode.insertBefore(el, insertAt);
      } else {
        if (insertBeforeEl) {
          head.insertBefore(el, insertBeforeEl);
        } else {
          head.appendChild(el);
        }
      }
    }
    /**
     * @return {undefined}
     */
    function init() {
      /**
       * @param {?} arg
       * @return {undefined}
       */
      function append(arg) {
        var modified = arg.style;
        var field;
        for (field in modified) {
          if (modified.hasOwnProperty(field)) {
            arg.dom.style[field] = modified[field];
          }
        }
      }
      /**
       * @return {undefined}
       */
      function parent() {
        /** @type {Array} */
        var endpoints = ["@keyframes KKELoading", "@-webkit-keyframes KKELoading", "@-moz-keyframes KKELoading"];
        /** @type {number} */
        var endpoint = 0;
        /** @type {number} */
        var endpointsLength = endpoints.length;
        for (;endpointsLength > endpoint;endpoint++) {
          self.cssUtil.inject(endpoints[endpoint] + options.scaleY);
        }
      }
      /**
       * @return {undefined}
       */
      function initialize() {
        if (parent(), !el) {
          el = self.$C("div");
          append({
            dom : el,
            style : options.ctn
          });
          /** @type {number} */
          var innerDivWidth = 0.1;
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var l = options.color.length;
          for (;l > i;i++) {
            var dom = self.$C("span");
            append({
              dom : dom,
              style : options.item
            });
            var data = self.clone(options.delay, data);
            /** @type {string} */
            var prop = -1 + innerDivWidth * i + "s";
            var name;
            for (name in data) {
              if (data.hasOwnProperty(name)) {
                /** @type {string} */
                data[name] = prop;
              }
            }
            append({
              dom : dom,
              style : data
            });
            dom.style.background = options.color[i];
            el.appendChild(dom);
          }
        }
      }
      /**
       * @return {undefined}
       */
      function toggle() {
        clearTimeout(tref);
        /** @type {number} */
        tref = setTimeout(function() {
          if ("none" != el.style.display) {
            /** @type {string} */
            el.style.display = "none";
          }
        }, 9E3);
      }
      var el;
      var text;
      var tref;
      var options = {
        ctn : {
          width : "40px",
          height : "30px",
          margin : 0,
          display : "none",
          position : "absolute",
          zIndex : 1
        },
        item : {
          display : "inline-block",
          width : "4px",
          height : "30px",
          margin : "0px 2px",
          borderRadius : "5px",
          animation : "KKELoading 1.2s infinite",
          webkitAnimation : "KKELoading 1.2s infinite",
          MozAnimation : "KKELoading 1.2s infinite"
        },
        color : ["#FF5472", "#FF706E", "#FF8762", "#FFAF4C", "#FFD53E"],
        delay : {
          animationDelay : -1,
          webkitAnimationDelay : -1,
          MozAnimationDelay : -1
        },
        scaleY : "{0%,40%,100%{-moz-transform:scaleY(0.2);-webkit-transform:scaleY(0.2);transform:scaleY(0.2);}20%,60%{-moz-transform:scaleY(1);-webkit-transform:scaleY(1);transform:scaleY(1);}}"
      };
      initialize();
      /**
       * @param {boolean} textAlt
       * @return {undefined}
       */
      this.appendto = function(textAlt) {
        /** @type {boolean} */
        text = textAlt;
        text.appendChild(el);
      };
      /**
       * @return {undefined}
       */
      this.setPosition = function() {
        if (text) {
          if (text.offsetHeight > 0) {
            /** @type {string} */
            el.style.top = (text.offsetHeight - px(options.ctn.height)) / 2 + "px";
            /** @type {string} */
            el.style.left = (text.offsetWidth - px(options.ctn.width)) / 2 + "px";
          }
        }
      };
      /**
       * @return {undefined}
       */
      this.show = function() {
        toggle();
        /** @type {string} */
        el.style.display = "";
      };
      /**
       * @return {undefined}
       */
      this.hide = function() {
        clearTimeout(tref);
        /** @type {string} */
        el.style.display = "none";
      };
    }
    /**
     * @param {Object} value
     * @return {undefined}
     */
    function access(value) {
      value = value || {};
      var module;
      var c;
      var f;
      var d;
      var div;
      var to;
      var el = self.$C("div");
      /** @type {number} */
      var zindex = 70;
      /**
       * @return {undefined}
       */
      var clear = function() {
        clearTimeout(to);
        if (c) {
          /** @type {string} */
          c.style.display = "none";
          /** @type {string} */
          el.innerHTML = "";
        }
        if (module) {
          if (fn(module.closeCb)) {
            module.closeCb();
          }
        }
      };
      /**
       * @param {Object} options
       * @return {?}
       */
      var fn = function(options) {
        if (module = options, clearTimeout(to), !c) {
          c = self.$C("div");
          /** @type {string} */
          c.style.width = "100%";
          /** @type {string} */
          c.style.height = "100%";
          /** @type {string} */
          c.style.position = "absolute";
          /** @type {number} */
          c.style.zIndex = zindex;
          /** @type {number} */
          c.style.top = 0;
          /** @type {string} */
          c.style.textAlign = "center";
          f = self.$C("div");
          d = self.$C("div");
          div = self.$C("span");
          /** @type {string} */
          el.style.fontSize = "12px";
          /** @type {string} */
          el.style.margin = "9px auto";
          /** @type {string} */
          f.style.position = "absolute";
          /** @type {number} */
          f.style.top = 0;
          /** @type {number} */
          f.style.left = 0;
          /** @type {string} */
          f.style.width = "100%";
          /** @type {string} */
          f.style.height = "100%";
          f.style.backgroundColor = value.TIP_ARR ? value.TIP_ARR[2] || "#fff" : "#fff";
          /** @type {number} */
          f.style.opacity = 0.5;
          /** @type {string} */
          f.style.filter = "alpha(opacity=50)";
          /** @type {string} */
          d.style.padding = "1px 3px 10px";
          d.style.top = value.TIP_ARR ? value.TIP_ARR[4] || "26%" : "26%";
          /** @type {string} */
          d.style.position = "relative";
          /** @type {string} */
          d.style.margin = "0 auto";
          /** @type {string} */
          d.style.width = "100%";
          /** @type {string} */
          div.style.cursor = "pointer";
          /** @type {string} */
          div.style.display = "block";
          /** @type {string} */
          div.style.margin = "0 auto";
          /** @type {string} */
          div.style.lineHeight = div.style.height = "28px";
          /** @type {string} */
          div.style.width = "60px";
          /** @type {string} */
          div.style.fontSize = "14px";
          /** @type {string} */
          div.style.borderRadius = "3px";
          self.xh5_EvtUtil.addHandler(div, "click", clear);
          d.appendChild(el);
          /** @type {boolean} */
          var h = !(!value.TIP_ARR || !value.TIP_ARR[3]);
          if (!h) {
            c.appendChild(f);
          }
          c.appendChild(d);
        }
        /** @type {string} */
        c.style.display = "";
        el.style.color = "undefined" != typeof options.fontColor ? options.fontColor : value.TIP_ARR ? value.TIP_ARR[1] || "#fff" : "#fff";
        var expectationResult = value.TIP_ARR ? value.TIP_ARR[0] || "#000" : "#000";
        if (d.style.backgroundColor = self.xh5_BrowserUtil.noH5 ? expectationResult : self.hex2dec(expectationResult, 0.8), options.bgStyle) {
          var p;
          for (p in options.bgStyle) {
            if (options.bgStyle.hasOwnProperty(p)) {
              d.style[p] = options.bgStyle[p];
            }
          }
        }
        if (el.innerHTML = options.txt || "", options.content && el.appendChild(options.content), !isNaN(options.autoHide) && (options.autoHide > 0 && setTimeout(clear, 1E3 * options.autoHide)), options.noBtn ? self.$CONTAINS(d, div) && d.removeChild(div) : (div.innerHTML = options.btnLb || "\u786e\u5b9a", div.style.background = value.BTN_ARR ? value.BTN_ARR[0] || "#2b9dfc" : "#2b9dfc", div.style.color = value.BTN_ARR ? value.BTN_ARR[1] || "#fff" : "#fff", !self.$CONTAINS(d, div) && d.appendChild(div)),
        options.extraBtn) {
          /** @type {number} */
          var l = 0;
          var params = options.extraBtn;
          var len = params.length;
          for (;len > l;l++) {
            var param = params[l];
            var element = self.$C("input");
            /** @type {string} */
            element.type = "button";
            element.value = param.value;
            /** @type {string} */
            element.style.marginTop = "20px";
            /** @type {string} */
            element.style.cursor = "pointer";
            self.xh5_EvtUtil.addHandler(element, "click", param.onClk);
            d.appendChild(element);
          }
        }
        return options.parent.appendChild(c), c;
      };
      /** @type {function (Object): ?} */
      this.genTip = fn;
      /** @type {function (): undefined} */
      this.hide = clear;
    }
    /** @type {string} */
    this.VER = "2.2.30";
    var self = this;
    /**
     * @param {string} type
     * @return {?}
     */
    var isType = function(type) {
      return function(next_scope) {
        return{}.toString.call(next_scope) == "[object " + type + "]";
      };
    };
    var makeStructured = isType("Object");
    var isObject = isType("String");
    var fn = isType("Function");
    var isFunction = isType("Array");
    var func = isType("Number");
    var makesPair = isType("Date");
    this.isObj = makeStructured;
    this.isStr = isObject;
    this.isFunc = fn;
    this.isArr = isFunction;
    this.isNum = func;
    this.isDate = makesPair;
    /**
     * @param {?} m1
     * @return {?}
     */
    var px = function(m1) {
      return parseInt(m1, 10);
    };
    /**
     * @param {Array} classNames
     * @return {?}
     */
    this.uae = function(classNames) {
      var className;
      /** @type {Array} */
      var ret = [];
      var classMap = {};
      /** @type {number} */
      var j = 0;
      var len = classNames.length;
      for (;len > j;j++) {
        className = classNames[j];
        if (1 !== classMap[className]) {
          /** @type {number} */
          classMap[className] = 1;
          ret[ret.length] = className;
        }
      }
      return ret;
    };
    var res = new function() {
      var req;
      if (XMLHttpRequest) {
        /** @type {XMLHttpRequest} */
        req = new XMLHttpRequest;
      } else {
        if (ActiveXObject) {
          try {
            req = new ActiveXObject("MSXML2.XMLHTTP");
          } catch (e) {
            try {
              req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (n) {
            }
          }
        }
      }
      /**
       * @param {string} url
       * @param {Object} parameters
       * @param {Function} errorCallback
       * @param {string} method
       * @return {?}
       */
      this.send = function(url, parameters, errorCallback, method) {
        if (!req || !url) {
          return void(errorCallback && errorCallback("error while sending"));
        }
        if (url += url.indexOf("?") < 0 ? "?" : "&", url += "_=" + (new Date).getTime(), method = method || "POST", req.onreadystatechange = function() {
          if (4 == req.readyState) {
            var error;
            if (200 == req.status) {
              error = req.responseText;
            }
            if (errorCallback) {
              errorCallback(error);
            }
          }
        }, req.open(method, url, true), "POST" == method) {
          req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
          /** @type {string} */
          var content = "";
          var key;
          for (key in parameters) {
            if (parameters.hasOwnProperty(key)) {
              content += [encodeURIComponent(key), encodeURIComponent(parameters[key])].join("=") + "&";
            }
          }
          req.send(content);
        } else {
          req.send(null);
        }
      };
    };
    this.POST = "undefined" != typeof jQuery && jQuery.post ? jQuery.post : res.send;
    this.trace = function(task) {
      return{
        /**
         * @return {undefined}
         */
        log : function() {
          if (task) {
            if (task.log) {
              task.log.apply(task, arguments);
            }
          }
        },
        /**
         * @return {undefined}
         */
        error : function() {
          if (task) {
            if (task.error) {
              task.error.apply(task, arguments);
            }
          }
        }
      };
    }(null);
    /**
     * @param {string} arr
     * @param {?} item
     * @return {?}
     */
    var contains = function(arr, item) {
      /** @type {number} */
      var found = -1;
      if (arr.indexOf) {
        found = arr.indexOf(item);
      } else {
        var i = arr.length;
        for (;i--;) {
          if (arr[i] === item) {
            found = i;
            break;
          }
        }
      }
      return found;
    };
    /** @type {function (string, ?): ?} */
    this.arrIndexOf = contains;
    /**
     * @param {Object} obj
     * @param {Object} target
     * @return {?}
     */
    var clone = function(obj, target) {
      if (null == obj || "object" != typeof obj) {
        return obj;
      }
      if (obj.constructor == Date || (obj.constructor == RegExp || (fn(obj) || (isObject(obj) || (obj.constructor == Number || obj.constructor == Boolean))))) {
        return new obj.constructor(obj);
      }
      target = target || new obj.constructor;
      var k;
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          target[k] = "undefined" == typeof target[k] ? clone(obj[k], null) : target[k];
        }
      }
      return target;
    };
    /** @type {function (Object, Object): ?} */
    this.clone = clone;
    /**
     * @param {Object} obj
     * @return {?}
     */
    var iterator = function(obj) {
      if (!obj) {
        return obj;
      }
      var old = {};
      var name;
      for (name in obj) {
        if (obj.hasOwnProperty(name)) {
          old[name] = obj[name];
        }
      }
      return old;
    };
    /** @type {function (Object): ?} */
    this.co = iterator;
    /**
     * @param {Object} obj
     * @param {Object} spec
     * @return {?}
     */
    this.oc = function(obj, spec) {
      if (!obj) {
        return spec;
      }
      var i;
      for (i in spec) {
        if (spec.hasOwnProperty(i)) {
          obj[i] = makeStructured(obj[i]) && makeStructured(spec[i]) ? arguments.callee(obj[i], spec[i]) : spec[i];
        }
      }
      return obj;
    };
    /**
     * @param {Function} parent
     * @return {?}
     */
    var createObject = function(parent) {
      /**
       * @return {undefined}
       */
      function F() {
      }
      return F.prototype = parent, new F;
    };
    /** @type {function (Object, Function): undefined} */
    this.fInherit = inheritPrototype;
    this.urlUtil = new function() {
      /**
       * @return {?}
       */
      this.getUrlParam = function() {
        var uHostName;
        var benchmarks = {};
        try {
          /** @type {string} */
          uHostName = location.search.substring(1);
        } catch (n) {
        }
        if (uHostName) {
          var name;
          var ref;
          var indexOfEquals;
          /** @type {Array.<string>} */
          var matches = uHostName.split("&");
          /** @type {number} */
          var i = matches.length;
          /** @type {number} */
          var idx = 0;
          for (;i > idx;idx++) {
            /** @type {number} */
            indexOfEquals = matches[idx].indexOf("=");
            if (-1 != indexOfEquals) {
              /** @type {string} */
              name = matches[idx].substring(0, indexOfEquals);
              /** @type {string} */
              ref = matches[idx].substring(indexOfEquals + 1);
              /** @type {string} */
              benchmarks[name] = ref;
            }
          }
        }
        return benchmarks;
      };
      /**
       * @return {?}
       */
      this.getMainUrl = function() {
        return window.location != window.parent.location ? document.referrer : document.location.href;
      };
    };
    this.xh5_BrowserUtil = new function() {
      this.info = function() {
        var result;
        /** @type {string} */
        var ua = navigator.userAgent;
        /** @type {Array} */
        var stack = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        return/trident/i.test(stack[1]) ? (result = /\brv[ :]+(\d+)/g.exec(ua) || [], {
          name : "IE ",
          version : result[1] || ""
        }) : "Chrome" === stack[1] && (result = ua.match(/\bOPR\/(\d+)/), null != result) ? {
          name : "Opera",
          version : result[1]
        } : (stack = stack[2] ? [stack[1], stack[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (result = ua.match(/version\/(\d+)/i)) && stack.splice(1, 1, result[1]), {
          name : stack[0],
          version : stack[1]
        });
      }();
      /** @type {boolean} */
      this.noH5 = false;
      this.hdpr = function(dataAndEvents) {
        /** @type {Element} */
        var test_canvas = document.createElement("canvas");
        if (test_canvas.getContext && test_canvas.getContext("2d")) {
          /** @type {number} */
          var a = Math.ceil(window.devicePixelRatio || 1);
          var b = test_canvas.getContext("2d").webkitBackingStorePixelRatio || 1;
          return a / b;
        }
        return dataAndEvents.noH5 = true, 1;
      }(this);
    };
    this.xh5_deviceUtil = function() {
      return{
        istd : function() {
          if ("ontouchend" in window) {
            var agent;
            try {
              /** @type {string} */
              agent = navigator.userAgent;
            } catch (e) {
            }
            return agent && agent.indexOf("Windows NT") > 0 ? false : true;
          }
          return false;
        }(),
        allowt : "ontouchend" in window
      };
    }();
    var that = function() {
      /**
       * @param {string} path
       * @return {?}
       */
      function encode(path) {
        return path = JSON.stringify(path), path || (path = ""), path = encodeURIComponent(path);
      }
      /**
       * @param {?} value
       * @return {?}
       */
      function decode(value) {
        try {
          /** @type {*} */
          value = JSON.parse(value);
        } catch (e) {
          /** @type {string} */
          value = decodeURIComponent(value);
        }
        return value;
      }
      /**
       * @param {Node} key
       * @param {string} value
       * @param {Object} options
       * @return {undefined}
       */
      function setCookie(key, value, options) {
        if (options = options || {}, void 0 != key && void 0 != value) {
          var args;
          var newline;
          var domain;
          var secure;
          /** @type {string} */
          newline = options.path ? "; path=" + options.path : "";
          /** @type {string} */
          domain = options.domain ? "; domain=" + options.domain : "";
          /** @type {string} */
          secure = options.secure ? "; secure" : "";
          var expires;
          var i = options.expires;
          switch(add(i)) {
            case "Number":
              /** @type {Date} */
              expires = new Date;
              expires.setTime(expires.getTime() + 1E3 * i);
              break;
            case "String":
              /** @type {Date} */
              expires = new Date(i);
              if ("Invalid Date" == expires) {
                /** @type {string} */
                expires = "";
              }
              break;
            case "Date":
              expires = i;
          }
          /** @type {string} */
          args = expires ? "; expires=" + expires.toUTCString() : "";
          /** @type {string} */
          document.cookie = [encodeURIComponent(key), "=", encode(value), args, newline, domain, secure].join("");
        }
      }
      /**
       * @param {string} key
       * @return {?}
       */
      function cookie(key) {
        /** @type {(Array.<string>|null)} */
        var param = document.cookie.match("(?:^|;)\\s*" + encodeURIComponent(key) + "=([^;]*)");
        return param ? decode(param[1]) || "" : null;
      }
      /**
       * @param {(Node|string)} key
       * @return {undefined}
       */
      function cookieFun(key) {
        /** @type {string} */
        document.cookie = encodeURIComponent(key) + "=;expires=" + (new Date(0)).toUTCString();
      }
      /**
       * @param {Node} key
       * @param {string} value
       * @return {undefined}
       */
      function store(key, value) {
        if (void 0 != key) {
          if (void 0 != value) {
            localStorage.setItem(encodeURIComponent(key), encode(value));
          }
        }
      }
      /**
       * @param {string} key
       * @return {?}
       */
      function has(key) {
        var udataCur = localStorage.getItem(encodeURIComponent(key));
        return decode(udataCur);
      }
      /**
       * @param {(Node|string)} key
       * @return {undefined}
       */
      function set(key) {
        localStorage.removeItem(encodeURIComponent(key));
      }
      /** @type {function (this:*): string} */
      var _toString = Object.prototype.toString;
      /**
       * @param {?} val
       * @return {?}
       */
      var add = function(val) {
        return null === val ? "Null" : void 0 === val ? "Undefined" : _toString.call(val).slice(8, -1);
      };
      var hasls = function() {
        if ("object" == typeof localStorage && (localStorage && localStorage.setItem)) {
          /** @type {string} */
          var test_val = "KKE_LOCALSTORAGE_TESTing";
          try {
            return localStorage.removeItem(test_val), localStorage.setItem(test_val, test_val), localStorage.removeItem(test_val), true;
          } catch (e) {
            return false;
          }
        }
        return false;
      }();
      return{
        hasls : hasls,
        /**
         * @param {Node} key
         * @param {string} value
         * @param {Object} target
         * @return {undefined}
         */
        save : function(key, value, target) {
          target = target || {};
          var data = target.mode;
          if (data) {
            switch(data) {
              case "localStorage":
                if (!hasls) {
                  return;
                }
                store(key, value);
                break;
              case "cookie":
                setCookie(key, value, target);
            }
          } else {
            if (hasls) {
              try {
                set(key);
                store(key, value);
              } catch (o) {
              }
            } else {
              setCookie(key, value, target);
            }
          }
        },
        /**
         * @param {string} key
         * @param {Object} arg
         * @return {?}
         */
        load : function(key, arg) {
          var result;
          if ("Object" == add(arg) && (arg = arg.mode), arg) {
            switch(arg) {
              case "localStorage":
                if (!hasls) {
                  return;
                }
                result = has(key);
                break;
              case "cookie":
                result = cookie(key);
            }
          } else {
            if (hasls) {
              result = has(key);
            }
            if (!result) {
              result = cookie(key);
            }
          }
          return result;
        },
        /**
         * @param {Node} key
         * @param {Object} arg
         * @return {undefined}
         */
        remove : function(key, arg) {
          if ("Object" == add(arg) && (arg = arg.mode), arg) {
            switch(arg) {
              case "localStorage":
                if (!hasls) {
                  return;
                }
                set(key);
                break;
              case "cookie":
                cookieFun(key);
            }
          } else {
            if (hasls) {
              set(key);
            }
            cookieFun(key);
          }
        },
        /**
         * @param {Node} arr
         * @return {undefined}
         */
        clear : function(arr) {
          if (hasls) {
            set(arr);
          }
        }
      };
    }();
    this.localSL = that;
    this.xh5_EvtUtil = {
      /**
       * @param {Object} element
       * @param {string} type
       * @param {Function} handler
       * @return {undefined}
       */
      addHandler : function(element, type, handler) {
        if (element) {
          if (element.addEventListener) {
            element.addEventListener(type, handler, false);
          } else {
            if (element.attachEvent) {
              element.attachEvent("on" + type, handler);
            } else {
              /** @type {Function} */
              element["on" + type] = handler;
            }
          }
        }
      },
      /**
       * @param {Object} el
       * @param {string} sType
       * @param {?} handler
       * @return {undefined}
       */
      removeHandler : function(el, sType, handler) {
        if (el) {
          if (el.removeEventListener) {
            el.removeEventListener(sType, handler, false);
          } else {
            if (el.detachEvent) {
              el.detachEvent("on" + sType, handler);
            } else {
              /** @type {null} */
              el["on" + sType] = null;
            }
          }
        }
      },
      /**
       * @param {HTMLElement} e
       * @return {?}
       */
      getEvent : function(e) {
        return e ? e : window.event;
      },
      /**
       * @param {Object} event
       * @return {?}
       */
      getTarget : function(event) {
        return!event && (event = this.getEvent()), event ? event.target || event.srcElement : null;
      },
      /**
       * @param {Event} event
       * @return {undefined}
       */
      preventDefault : function(event) {
        if (!event) {
          event = this.getEvent();
        }
        if (event) {
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            /** @type {boolean} */
            event.returnValue = false;
          }
        }
      },
      /**
       * @param {UIEvent} event
       * @return {undefined}
       */
      stopPropagation : function(event) {
        if (!event) {
          event = this.getEvent();
        }
        if (event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else {
            /** @type {boolean} */
            event.cancelBubble = true;
          }
        }
      },
      /**
       * @param {Object} ev
       * @return {?}
       */
      getRelatedTarget : function(ev) {
        return!ev && (ev = this.getEvent()), ev.relatedTarget ? ev.relatedTarget : ev.toElement ? ev.toElement : ev.fromElement ? ev.fromElement : null;
      },
      /**
       * @param {Function} event
       * @return {?}
       */
      getWheelDelta : function(event) {
        return!event && (event = this.getEvent()), event ? event.wheelDelta ? client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta : 40 * -event.detail : 0;
      }
    };
    /**
     * @param {?} name
     * @param {?} spaceName
     * @param {(Node|string)} style
     * @return {undefined}
     */
    State.prototype.al = function(name, spaceName, style) {
      if (!(style && this.evtObj[name])) {
        if (!this.evtObj[name]) {
          /** @type {Array} */
          this.evtObj[name] = [];
        }
        this.evtObj[name].push(spaceName);
      }
    };
    /**
     * @param {?} paramIndex
     * @param {?} source
     * @return {undefined}
     */
    State.prototype.rl = function(paramIndex, source) {
      var params = this.evtObj[paramIndex];
      if (isFunction(params)) {
        var i = params.length;
        for (;i--;) {
          if (params[i] == source) {
            params.splice(i, 1);
          }
        }
      }
    };
    /**
     * @param {string} result
     * @param {Array} re
     * @return {undefined}
     */
    State.prototype.re = function(result, re) {
      var a1 = this.evtObj[result];
      if (isFunction(a1)) {
        /** @type {number} */
        var p = 0;
        var len = a1.length;
        for (;len > p;p++) {
          if ("function" == typeof a1[p]) {
            a1[p](result, re);
          }
        }
      }
    };
    /** @type {function (): undefined} */
    this.xh5_EvtDispatcher = State;
    /**
     * @param {?} elem
     * @param {Object} context
     * @return {?}
     */
    this.$DOM = function(elem, context) {
      return context = context || document, context.getElementById(elem);
    };
    /**
     * @param {string} element
     * @param {string} i
     * @return {?}
     */
    this.$C = function(element, i) {
      /** @type {Element} */
      var first = document.createElement(element);
      return i && (first.id = i), first;
    };
    /**
     * @param {?} tail
     * @return {?}
     */
    this.$T = function(tail) {
      return document.createTextNode(tail);
    };
    /**
     * @param {?} container
     * @param {?} element
     * @return {?}
     */
    this.$CONTAINS = function(container, element) {
      if (container.compareDocumentPosition) {
        return container === element || !!(16 & container.compareDocumentPosition(element));
      }
      if (container.contains && 1 === element.nodeType) {
        return container.contains(element) && container !== element;
      }
      for (;element = element.parentNode;) {
        if (element === container) {
          return true;
        }
      }
      return false;
    };
    /**
     * @param {(Array|Element)} node
     * @return {?}
     */
    this.getTextNodes = function(node) {
      /** @type {Array} */
      var nodes = [];
      node = node.firstChild;
      for (;node;node = node.nextSibling) {
        if (3 == node.nodeType) {
          nodes.push(node);
        } else {
          /** @type {Array} */
          nodes = nodes.concat(arguments.callee(node));
        }
      }
      return nodes;
    };
    /**
     * @param {Element} elem
     * @return {?}
     */
    this.getCSS = function(elem) {
      /** @type {null} */
      var e = null;
      return e = window.getComputedStyle ? window.getComputedStyle(elem) : elem.currentStyle;
    };
    /** @type {function (Function, ?): ?} */
    this.fBind = partial;
    /**
     * @param {?} qualifier
     * @return {?}
     */
    this.isColor = function(qualifier) {
      return/^#[0-9a-fA-F]{3,6}$/.test(qualifier);
    };
    /**
     * @param {?} qualifier
     * @return {?}
     */
    this.isColorRGB = function(qualifier) {
      return/(^#[0-9a-fA-F]{3,6}$)|(^rgba?\(.{5,16}\)$)/.test(qualifier);
    };
    /**
     * @return {?}
     */
    this.randomColor = function() {
      /** @type {string} */
      var codeSegments = Math.floor(16777215 * Math.random()).toString(16);
      for (;codeSegments.length < 6;) {
        codeSegments += "0";
      }
      return codeSegments;
    };
    /**
     * @param {string} result
     * @param {number} s
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    this.hex2dec = function(result, s, dataAndEvents) {
      if (0 == result.indexOf("rgb")) {
        return result;
      }
      result = result.replace(/#|0x/i, "");
      var line;
      var string;
      var size;
      result.replace(/(\w{6})|(\w{3})/, function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
        if (deepDataAndEvents) {
          line = result.slice(0, 2);
          string = result.slice(2, 4);
          size = result.slice(4);
        } else {
          if (!ignoreMethodDoesntExist) {
            return[0, 0, 0];
          }
          var parts = result.split("");
          line = parts[0];
          line += String(line);
          string = parts[1];
          string += String(string);
          size = parts[2];
          size += String(size);
        }
      });
      var e;
      return isNaN(s) ? (e = [parseInt(line, 16), parseInt(string, 16), parseInt(size, 16)], dataAndEvents ? e : "rgb($color)".replace("$color", e.join(","))) : (e = [parseInt(line, 16), parseInt(string, 16), parseInt(size, 16), s], dataAndEvents ? e : "rgba($color)".replace("$color", e.join(",")));
    };
    /** @type {function (): ?} */
    this.getTimestamp = now;
    this.cssUtil = {
      /**
       * @param {?} css
       * @return {undefined}
       */
      inject : function(css) {
        /** @type {Element} */
        var s = document.createElement("style");
        var svg = document.head || (document.getElementsByTagName("head")[0] || document.documentElement);
        /** @type {string} */
        s.type = "text/css";
        if (s.styleSheet) {
          s.styleSheet.cssText = css;
        } else {
          s.appendChild(document.createTextNode(css));
        }
        svg.appendChild(s);
      },
      /**
       * @param {Element} element
       * @param {string} className
       * @return {undefined}
       */
      adCls : function(element, className) {
        if (element.className != className) {
          var classes = element.className.split(" ");
          var i;
          for (i in classes) {
            if (classes.hasOwnProperty(i) && classes[i] == className) {
              return;
            }
          }
          if ("" == element.className) {
            /** @type {string} */
            element.className = className;
          } else {
            element.className += " " + className;
          }
        }
      },
      /**
       * @param {Element} elem
       * @param {?} elt
       * @return {undefined}
       */
      rmCls : function(elem, elt) {
        if (-1 != elem.className.indexOf(elt)) {
          if (elem.className == elt) {
            /** @type {string} */
            elem.className = "";
          } else {
            var af = elem.className.split(" ");
            /** @type {string} */
            var val = "";
            var i;
            for (i in af) {
              if (af.hasOwnProperty(i)) {
                if (af[i] == elt) {
                  continue;
                }
                if ("" != val) {
                  val += " ";
                }
                val += af[i];
              }
            }
            elem.className = val;
          }
        }
      }
    };
    /** @type {function (string, Function, Function, string): undefined} */
    this.load = loadScript;
    var doneResults;
    var relyLoader = new function() {
      var data = doneResults || {};
      doneResults = data;
      /**
       * @param {?} table
       * @param {boolean} title
       * @return {undefined}
       */
      var context = function(table, title) {
        var tokenized = data[table][title ? "errCbArr" : "cbArr"];
        var index = tokenized.length;
        for (;index--;) {
          var view = tokenized[index];
          if (fn(view)) {
            view();
          }
        }
        /** @type {null} */
        data[table] = null;
        delete data[table];
      };
      /**
       * @param {string} filename
       * @param {Function} callback
       * @param {Function} stream
       * @param {string} deepDataAndEvents
       * @return {?}
       */
      this.load = function(filename, callback, stream, deepDataAndEvents) {
        /** @type {string} */
        var key = "urlhash_" + process(filename);
        var dataItem;
        for (dataItem in data) {
          if (data.hasOwnProperty(dataItem) && dataItem == key) {
            return data[dataItem].cbArr.push(callback), void data[dataItem].errCbArr.push(stream);
          }
        }
        data[key] = {
          url : filename,
          cbArr : [callback],
          errCbArr : [stream]
        };
        loadScript(filename, partial(context, this, key), partial(context, this, key, true), deepDataAndEvents);
      };
    };
    this.relyLoader = relyLoader;
    /**
     * @param {Object} e
     * @param {Function} test
     * @return {?}
     */
    this.iframer = function(e, test) {
      /**
       * @return {undefined}
       */
      function run() {
        if (document && document.body) {
          clearInterval(interval);
          /** @type {number} */
          o = 0;
          /** @type {HTMLElement} */
          var body = document.body;
          body.insertBefore(iframe, body.firstChild);
          iframe.setAttribute("data-ready", "1");
        } else {
          if (o++ > 9) {
            clearInterval(interval);
            if (fn(test)) {
              test();
            }
          }
        }
      }
      var iframe;
      var interval;
      var iframeId = e.attribute ? e.attribute.id || "_kkeiframe" + (new Date).getTime() : "_kkeiframe" + (new Date).getTime();
      /** @type {number} */
      var o = 0;
      if (!(iframe = document.getElementById(iframeId))) {
        if (iframe = document.createElement("iframe"), iframe.setAttribute("data-ready", "0"), e.attribute) {
          var key;
          for (key in e.attribute) {
            if (e.attribute.hasOwnProperty(key)) {
              iframe[key] = e.attribute[key];
            }
          }
        }
        if (iframe.style.height = iframe.style.width = 0, iframe.style.borderStyle = "none", iframe.style.position = "absolute", iframe.style.zIndex = -9, iframe.style.display = "none", e.style) {
          var prop;
          for (prop in e.style) {
            if (e.style.hasOwnProperty(prop)) {
              iframe.style[prop] = e.style[prop];
            }
          }
        }
        /** @type {number} */
        interval = setInterval(run, 500);
        run();
      }
      return iframe;
    };
    /**
     * @param {Array} i
     * @return {undefined}
     */
    this.ca = function(i) {
      if (i) {
        for (;i.length > 0;) {
          i.length--;
        }
      }
    };
    /**
     * @param {?} qualifier
     * @return {?}
     */
    this.isRepos = function(qualifier) {
      return/^(sh204\d{3}|sz1318\d{2})$/.test(qualifier);
    };
    /**
     * @param {?} line
     * @return {?}
     */
    this.market = function(line) {
      return/^s[hz]\d{6}$/.test(line) ? "CN" : /^s[hz]\d{6}_i$/.test(line) ? "CNI" : /^sb[48]\d{5}$/.test(line) ? "OTC" : /^[48]\d{5}$/.test(line) ? "OTC" : /^otc_\d{6}$/.test(line) ? "OTC" : /^gb_.+$/.test(line) ? "US" : /^(hk|rt_hk)\w+/.test(line) ? "HK" : /^hf_\w+/.test(line) ? "HF" : /^nf_\w+/.test(line) ? "NF" : /^f_\d{6}$/.test(line) || (/^fu_\d{6}$/.test(line) || (/^pwbfbyd_\d{6}$/.test(line) || (/^pwbfbjd_\d{6}$/.test(line) || (/^pwbfbnd_\d{6}$/.test(line) || (/^ljjz_\d{6}$/.test(line) ||
      (/^dwjz_\d{6}$/.test(line) || /^lshb_\d{6}$/.test(line))))))) ? "fund" : /^CON_OP_\w+/.test(line) ? "option_cn" : /^fx_.+$/.test(line) ? "forex" : /^(DINIW|USDCNY)$/.test(line) ? "forex_yt" : /^CFF_RE_.+$/.test(line) ? "CFF" : /\d+$/.test(line) ? "NF" : void 0;
    };
    this.cookieUtil = {
      /**
       * @param {string} str
       * @return {?}
       */
      escape : function(str) {
        return str.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
      },
      /**
       * @param {string} key
       * @return {?}
       */
      get : function(key) {
        /** @type {(Array.<string>|null)} */
        var _urlSegmentsMatch = document.cookie.match("(?:^|;)\\s*" + this.escape(key) + "=([^;]*)");
        return _urlSegmentsMatch ? _urlSegmentsMatch[1] || "" : "";
      },
      /**
       * @param {?} x
       * @param {string} date
       * @param {Object} obj
       * @return {undefined}
       */
      set : function(x, date, obj) {
        if (!obj) {
          obj = {};
        }
        if (!date) {
          /** @type {string} */
          date = "";
          /** @type {number} */
          obj.expires = -1;
        }
        /** @type {string} */
        var expiresOutput = "";
        if (obj.expires && (Number(obj.expires) || obj.expires.toUTCString)) {
          var f;
          if (Number(obj.expires)) {
            /** @type {Date} */
            f = new Date;
            f.setTime(f.getTime() + 1E3 * obj.expires);
          } else {
            f = obj.expires;
          }
          expiresOutput = "; expires=" + f.toUTCString();
        }
        /** @type {string} */
        var path = obj.path ? "; path=" + obj.path : "";
        /** @type {string} */
        var domain = obj.domain ? "; domain=" + obj.domain : "";
        /** @type {string} */
        var secure = obj.secure ? "; secure" : "";
        /** @type {string} */
        document.cookie = [x, "=", date, expiresOutput, path, domain, secure].join("");
      }
    };
    var ctx = new function() {
      /**
       * @return {undefined}
       */
      function fetch() {
        loadScript(filename, function() {
          for (;thens.length;) {
            var applyArgs = thens.pop();
            SUDA.uaTrack.apply(null, applyArgs);
          }
        }, function() {
          c--;
          if (c) {
            fetch();
          }
          if (!c) {
            /** @type {Array} */
            thens = [];
          }
        });
      }
      /** @type {string} */
      var filename = "https://wwws.sinaimg.cn/unipro/pub/suda_s_v851c.js";
      /** @type {string} */
      var data = navigator.userAgent || "unknownUa";
      /** @type {string} */
      data = encodeURIComponent("_UA_" + data);
      var animationTimer;
      var error;
      /** @type {string} */
      var resolved = "chart_finance";
      /** @type {string} */
      var chr = "";
      /** @type {string} */
      var str = ",";
      /** @type {Array} */
      var list = [];
      /** @type {number} */
      var c = 5;
      /** @type {Array} */
      var thens = [];
      if ("undefined" == typeof SUDA) {
        fetch();
      }
      /**
       * @return {undefined}
       */
      var next = function() {
        var token;
        /** @type {string} */
        var err = "";
        /** @type {number} */
        var _j = 0;
        /** @type {number} */
        var listLength = list.length;
        for (;listLength > _j;_j++) {
          token = list[_j];
          err += [token.k, token.v].join(chr) + str;
        }
        for (;list.length;) {
          list.length--;
        }
        if (err !== error) {
          /** @type {string} */
          error = err;
          err += data;
          try {
            SUDA.uaTrack(resolved, err);
          } catch (h) {
            if (c) {
              thens.push([resolved, err]);
            }
          }
        }
      };
      /**
       * @param {string} key
       * @param {string} value
       * @param {number} d
       * @return {undefined}
       */
      this.s = function(key, value, d) {
        if (key) {
          if (isNaN(d) || 0 > d) {
            /** @type {number} */
            d = 3E3;
          }
          /** @type {string} */
          value = JSON.stringify(value);
          if (!value) {
            /** @type {string} */
            value = "";
          }
          /** @type {string} */
          value = encodeURIComponent(value);
          /** @type {number} */
          var i = list.length;
          for (;i--;) {
            if (list[i].k == key) {
              list.splice(i, 1);
              break;
            }
          }
          list.push({
            k : key,
            v : value
          });
          clearTimeout(animationTimer);
          /** @type {number} */
          animationTimer = setTimeout(next, d);
        }
      };
      var dict;
      var max;
      /**
       * @param {Function} b
       * @param {Function} a
       * @param {string} arg
       * @return {undefined}
       */
      this.s2 = function(b, a, arg) {
        if (arg = arg || "chart_detail", max != b || dict != arg) {
          /** @type {string} */
          dict = arg;
          /** @type {Function} */
          max = b;
          setTimeout(function() {
            dict = void 0;
            max = void 0;
          }, 99);
          try {
            SUDA.uaTrack(arg, a || b);
          } catch (r) {
            if (c) {
              thens.push([arg, a || b]);
            }
          }
        }
      };
    };
    this.stc = ctx.s;
    this.suda = ctx.s2;
    this.xh5_PosUtil = {
      /**
       * @param {number} width
       * @param {number} i
       * @param {number} value
       * @param {number} deepDataAndEvents
       * @return {?}
       */
      pp : function(width, i, value, deepDataAndEvents) {
        return isNaN(width) || i >= width ? deepDataAndEvents : width >= value ? 1 : Math.max(deepDataAndEvents * (1 - (width - i) / (value - i)), 1);
      },
      /**
       * @param {number} a
       * @param {number} dataName
       * @param {number} isXML
       * @param {number} deepDataAndEvents
       * @param {number} b
       * @return {?}
       */
      ppp : function(a, dataName, isXML, deepDataAndEvents, b) {
        return a = (a - b) / b, this.pp(a, dataName, isXML, deepDataAndEvents);
      },
      /**
       * @param {number} val
       * @param {number} step
       * @param {number} dataAndEvents
       * @return {?}
       */
      vp : function(val, step, dataAndEvents) {
        return isNaN(val) || 0 >= val ? dataAndEvents - 1 : dataAndEvents * (1 - val / step);
      }
    };
    this.xh5_HtmlPosUtil = {
      /**
       * @param {Element} e
       * @return {?}
       */
      pageX : function(e) {
        return e.offsetParent ? e.offsetLeft + this.pageX(e.offsetParent) : e.offsetLeft;
      },
      /**
       * @param {Element} e
       * @return {?}
       */
      pageY : function(e) {
        return e.offsetParent ? e.offsetTop + this.pageY(e.offsetParent) : e.offsetTop;
      },
      /**
       * @param {Element} elem
       * @return {?}
       */
      parentX : function(elem) {
        return elem.parentNode == elem.offsetParent ? elem.offsetLeft : this.pageX(elem) - this.pageX(elem.parentNode);
      },
      /**
       * @param {Element} elem
       * @return {?}
       */
      parentY : function(elem) {
        return elem.parentNode == elem.offsetParent ? elem.offsetTop : this.pageY(elem) - this.pageY(elem.parentNode);
      }
    };
    this.xh5_ADJUST_HIGH_LOW = new function() {
      /**
       * @param {number} num
       * @return {?}
       */
      var parseIntS = function(num) {
        /** @type {number} */
        var charCodeToReplace = parseInt(Math.round(100 * num));
        if(charCodeToReplace % 100 != 0 && charCodeToReplace % 5 != 0 && charCodeToReplace % 2 != 0) {
          if(charCodeToReplace % 10 == 0) {
            charCodeToReplace *= 0.1
          }
          return true;
        }
        return false;
      };
      /**
       * @param {number} object
       * @param {Object} deepDataAndEvents
       * @return {?}
       */
      var clone = function(object, deepDataAndEvents) {
        if (deepDataAndEvents) {
          for (;object > 5;) {
            if (object % 2 == 0) {
              object *= 0.5;
            } else {
              if (object % 3 != 0) {
                break;
              }
              object /= 3;
            }
          }
        } else {
          if (object > 9) {
            if (object % 3 == 0) {
              object /= 3;
            } else {
              if (object % 4 == 0) {
                object *= 0.25;
              } else {
                if (object % 2 == 0) {
                  object *= 0.5;
                }
              }
            }
          }
        }
        return object;
      };
      /**
       * @param {number} x
       * @param {number} offset
       * @param {number} value
       * @param {Object} deepDataAndEvents
       * @param {?} m3
       * @param {number} scale
       * @return {?}
       */
      this.c = function(x, offset, value, deepDataAndEvents, m3, scale) {
        if (isNaN(x) || (isNaN(offset) || offset > x)) {
          return[0, 0, 0];
        }
        if (!isNaN(scale)) {
          /** @type {number} */
          scale = (x - offset) * scale;
          x += scale;
          offset -= scale;
        }
        var w;
        var start;
        var r;
        var b;
        var ce;
        var z;
        var index;
        var v;
        var howMany;
        var pos2;
        var time;
        var arg;
        var child;
        var n;
        /** @type {number} */
        var length = -1E-6;
        /** @type {number} */
        var a = 0.5 * (offset + x);
        /** @type {Array} */
        var children = deepDataAndEvents ? [4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20] : [4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20];
        /** @type {Array} */
        var props = [1, 2, 3, 4, 5, 6, 8];
        /** @type {boolean} */
        var k = false;
        /** @type {number} */
        var len = props.length;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = children.length;
        for (;l > i;i++) {
          /** @type {boolean} */
          k = false;
          child = children[i];
          /** @type {number} */
          r = (x - offset) / child;
          /** @type {number} */
          v = Math.pow(10, 0 - value);
          for (;!k;) {
            /** @type {number} */
            n = 0;
            for (;len > n;n++) {
              if (b = v * props[n], b - r > length && (1 & child ? (ce = Math.round((a + 0.5 * b) / b) * b, time = (ce + 0.5 * (child - 1) * b).toFixed(5), arg = (ce - 0.5 * (child + 1) * b).toFixed(5)) : (ce = Math.round(a / b) * b, time = (ce + 0.5 * child * b).toFixed(5), arg = (ce - 0.5 * child * b).toFixed(5)), z = Number(time), index = Number(arg), z - x > length && length > index - offset)) {
                if (k = true, 0 > index && (!m3 && (z -= index, index = 0)), !howMany) {
                  /** @type {number} */
                  howMany = z - index;
                  /** @type {(number|undefined)} */
                  w = z;
                  /** @type {(number|undefined)} */
                  start = index;
                  pos2 = child;
                  break;
                }
                /** @type {number} */
                var cDigit = (z - index) / clone(child);
                if (1 != Math.round(100 * cDigit) && (1 != Math.round(10 * cDigit) && parseIntS(cDigit))) {
                  break;
                }
                if (z - index > howMany) {
                  break;
                }
                if (z - index == howMany) {
                  /** @type {number} */
                  var val1 = w - x;
                  /** @type {number} */
                  var val2 = offset - start;
                  /** @type {number} */
                  var yDelta = Math.abs(val1 - val2);
                  /** @type {number} */
                  val1 = z - x;
                  /** @type {number} */
                  val2 = offset - index;
                  /** @type {number} */
                  var xDelta = Math.abs(val1 - val2);
                  if (xDelta >= yDelta) {
                    break;
                  }
                }
                if (parseInt(z)) {
                  break;
                }
                if (parseInt(index)) {
                  break;
                }
                /** @type {number} */
                howMany = z - index;
                /** @type {(number|undefined)} */
                w = z;
                /** @type {(number|undefined)} */
                start = index;
                pos2 = child;
                break;
              }
            }
            v *= 10;
          }
        }
        return pos2 = clone(pos2, deepDataAndEvents), [w, start, pos2];
      };
    };
    /**
     * @param {string} baseName
     * @return {?}
     */
    this.xh5_S_KLC_D = function(baseName) {
      var lastIndex;
      var names;
      var index;
      var item;
      var a;
      var y;
      var da;
      /** @type {number} */
      var t = 864E5;
      /** @type {number} */
      var total = 7657;
      /** @type {Array} */
      var ret = [];
      /** @type {Array} */
      var safe = [];
      /** @type {number} */
      var b = ~(3 << 30);
      /** @type {number} */
      var f = 1 << 30;
      /** @type {Array} */
      var radpower = [0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30];
      var p = Math;
      /**
       * @return {?}
       */
      var next = function() {
        var i;
        var result;
        /** @type {number} */
        i = 0;
        for (;64 > i;i++) {
          /** @type {number} */
          safe[i] = p.pow(2, i);
          if (26 > i) {
            /** @type {string} */
            ret[i] = fromCharCode(i + 65);
            /** @type {string} */
            ret[i + 26] = fromCharCode(i + 97);
            if (10 > i) {
              /** @type {string} */
              ret[i + 52] = fromCharCode(i + 48);
            }
          }
        }
        ret.push("+", "/");
        ret = ret.join("");
        names = baseName.split("");
        index = names.length;
        /** @type {number} */
        i = 0;
        for (;index > i;i++) {
          names[i] = ret.indexOf(names[i]);
        }
        return item = {}, lastIndex = y = 0, a = {}, result = test([12, 6]), da = 63 ^ result[1], {
          /** @type {function (): ?} */
          _1479 : $,
          /** @type {function (): ?} */
          _136 : write,
          /** @type {function (): ?} */
          _200 : go,
          /** @type {function (): ?} */
          _139 : normalize,
          /** @type {function (): ?} */
          _197 : add
        }["_" + result[0]] || function() {
          return[];
        };
      };
      /** @type {function (...[number]): string} */
      var fromCharCode = String.fromCharCode;
      /**
       * @param {?} _
       * @return {?}
       */
      var callback = function(_) {
        return _ === {}._;
      };
      /**
       * @return {?}
       */
      var slice = function() {
        var length;
        var e;
        length = max();
        /** @type {number} */
        e = 1;
        for (;;) {
          if (!max()) {
            return e * (2 * length - 1);
          }
          e++;
        }
      };
      /**
       * @return {?}
       */
      var max = function() {
        var el;
        return lastIndex >= index ? 0 : (el = names[lastIndex] & 1 << y, y++, y >= 6 && (y -= 6, lastIndex++), !!el);
      };
      /**
       * @param {Array} opt_attributes
       * @param {Array} recurring
       * @param {Array} cmp
       * @return {?}
       */
      var test = function(opt_attributes, recurring, cmp) {
        var i;
        var ret;
        var result;
        var min;
        var value;
        /** @type {Array} */
        ret = [];
        /** @type {number} */
        result = 0;
        if (!recurring) {
          /** @type {Array} */
          recurring = [];
        }
        if (!cmp) {
          /** @type {Array} */
          cmp = [];
        }
        /** @type {number} */
        i = 0;
        for (;i < opt_attributes.length;i++) {
          if (min = opt_attributes[i], result = 0, min) {
            if (lastIndex >= index) {
              return ret;
            }
            if (opt_attributes[i] <= 0) {
              /** @type {number} */
              result = 0;
            } else {
              if (opt_attributes[i] <= 30) {
                for (;value = 6 - y, value = min > value ? value : min, result |= (names[lastIndex] >> y & (1 << value) - 1) << opt_attributes[i] - min, y += value, y >= 6 && (y -= 6, lastIndex++), min -= value, !(0 >= min);) {
                }
                if (recurring[i]) {
                  if (result >= safe[opt_attributes[i] - 1]) {
                    result -= safe[opt_attributes[i]];
                  }
                }
              } else {
                result = test([30, opt_attributes[i] - 30], [0, recurring[i]]);
                if (!cmp[i]) {
                  result = result[0] + result[1] * safe[30];
                }
              }
            }
            ret[i] = result;
          } else {
            /** @type {number} */
            ret[i] = 0;
          }
        }
        return ret;
      };
      /**
       * @param {number} dataAndEvents
       * @return {?}
       */
      var apply = function(dataAndEvents) {
        var e;
        var d;
        var zeroQuoted;
        var b;
        if (dataAndEvents > 1) {
          /** @type {number} */
          e = 0;
        }
        /** @type {number} */
        e = 0;
        for (;dataAndEvents > e;e++) {
          item.d++;
          /** @type {number} */
          zeroQuoted = item.d % 7;
          if (3 == zeroQuoted || 4 == zeroQuoted) {
            item.d += 5 - zeroQuoted;
          }
        }
        return d = new Date, b = 60 * d.getTimezoneOffset() * 1E3, d.setTime((total + item.d) * t + b), d.setHours(d.getHours() + 8), d;
      };
      /**
       * @return {?}
       */
      var go = function() {
        var t;
        var assigns;
        var v;
        var data;
        var vvar;
        if (da >= 1) {
          return[];
        }
        /** @type {number} */
        item.d = test([18], [1])[0] - 1;
        v = test([3, 3, 30, 6]);
        item.p = v[0];
        item.ld = v[1];
        item.cd = v[2];
        item.c = v[3];
        /** @type {number} */
        item.m = p.pow(10, item.p);
        /** @type {number} */
        item.pc = item.cd / item.m;
        /** @type {Array} */
        assigns = [];
        /** @type {number} */
        t = 0;
        for (;data = {
          d : 1
        }, max() && (v = test([3])[0], 0 == v ? data.d = test([6])[0] : 1 == v ? (item.d = test([18])[0], data.d = 0) : data.d = v), vvar = {
          date : apply(data.d)
        }, max() && (item.ld += slice()), v = test([3 * item.ld], [1]), item.cd += v[0], vvar.close = item.cd / item.m, assigns.push(vvar), !(lastIndex >= index) && (lastIndex != index - 1 || 63 & (item.c ^ t + 1));t++) {
        }
        return assigns[0].prevclose = item.pc, assigns;
      };
      /**
       * @return {?}
       */
      var write = function() {
        var i;
        var mod;
        var list;
        var msg;
        var copies;
        var h;
        var out;
        var data;
        var obj;
        var arr;
        var y;
        if (da >= 2) {
          return[];
        }
        /** @type {Array} */
        out = [];
        obj = {
          v : "volume",
          p : "price",
          a : "avg_price"
        };
        /** @type {number} */
        item.d = test([18], [1])[0] - 1;
        data = {
          date : apply(1)
        };
        list = test(1 > da ? [3, 3, 4, 1, 1, 1, 5] : [4, 4, 4, 1, 1, 1, 3]);
        /** @type {number} */
        i = 0;
        for (;7 > i;i++) {
          item[["la", "lp", "lv", "tv", "rv", "zv", "pp"][i]] = list[i];
        }
        /** @type {number} */
        item.m = p.pow(10, item.pp);
        if (da >= 1) {
          list = test([3, 3]);
          item.c = list[0];
          list = list[1];
        } else {
          /** @type {number} */
          list = 5;
          /** @type {number} */
          item.c = 2;
        }
        item.pc = test([6 * list])[0];
        /** @type {number} */
        data.pc = item.pc / item.m;
        item.cp = item.pc;
        /** @type {number} */
        item.da = 0;
        /** @type {number} */
        item.sa = item.sv = 0;
        /** @type {number} */
        i = 0;
        for (;!(lastIndex >= index) && (lastIndex != index - 1 || 7 & (item.c ^ i));i++) {
          copies = {};
          msg = {};
          arr = item.tv ? max() : 1;
          /** @type {number} */
          mod = 0;
          for (;3 > mod;mod++) {
            if (y = ["v", "p", "a"][mod], (arr ? max() : 0) && (list = slice(), item["l" + y] += list), h = "v" == y && item.rv ? max() : 1, list = test([3 * item["l" + y] + ("v" == y ? 7 * h : 0)], [!!mod])[0] * (h ? 1 : 100), msg[y] = list, "v" == y) {
              if (!(copies[obj[y]] = list) && (241 > i && (item.zv ? !max() : 1))) {
                /** @type {number} */
                msg.p = 0;
                break;
              }
            } else {
              if ("a" == y) {
                item.da = (1 > da ? 0 : item.da) + msg.a;
              }
            }
          }
          item.sv += msg.v;
          /** @type {number} */
          copies[obj.p] = (item.cp += msg.p) / item.m;
          item.sa += msg.v * item.cp;
          copies[obj.a] = callback(msg.a) ? i ? out[i - 1][obj.a] : copies[obj.p] : item.sv ? ((p.floor((item.sa * (2E3 / item.m) + item.sv) / item.sv) >> 1) + item.da) / 1E3 : copies[obj.p] + item.da / 1E3;
          out.push(copies);
        }
        return out[0].date = data.date, out[0].prevclose = data.pc, out;
      };
      /**
       * @return {?}
       */
      var $ = function() {
        var ret;
        var local;
        var obj;
        var v;
        var groups;
        var i;
        var a;
        if (da >= 1) {
          return[];
        }
        /** @type {number} */
        item.lv = 0;
        /** @type {number} */
        item.ld = 0;
        /** @type {number} */
        item.cd = 0;
        /** @type {Array} */
        item.cv = [0, 0];
        item.p = test([6])[0];
        /** @type {number} */
        item.d = test([18], [1])[0] - 1;
        /** @type {number} */
        item.m = p.pow(10, item.p);
        groups = test([3, 3]);
        item.md = groups[0];
        item.mv = groups[1];
        /** @type {Array} */
        ret = [];
        for (;groups = test([6]), groups.length;) {
          if (obj = {
            c : groups[0]
          }, v = {}, obj.d = 1, 32 & obj.c) {
            for (;;) {
              if (groups = test([6])[0], 63 == (16 | groups)) {
                /** @type {string} */
                a = 16 & groups ? "x" : "u";
                groups = test([3, 3]);
                obj[a + "_d"] = groups[0] + item.md;
                obj[a + "_v"] = groups[1] + item.mv;
                break;
              }
              if (32 & groups) {
                /** @type {string} */
                i = 8 & groups ? "d" : "v";
                /** @type {string} */
                a = 16 & groups ? "x" : "u";
                obj[a + "_" + i] = (7 & groups) + item["m" + i];
                break;
              }
              if (i = 15 & groups, 0 == i ? obj.d = test([6])[0] : 1 == i ? (item.d = i = test([18])[0], obj.d = 0) : obj.d = i, !(16 & groups)) {
                break;
              }
            }
          }
          v.date = apply(obj.d);
          for (i in{
            v : 0,
            d : 0
          }) {
            if (!callback(obj["x_" + i])) {
              item["l" + i] = obj["x_" + i];
            }
            if (callback(obj["u_" + i])) {
              obj["u_" + i] = item["l" + i];
            }
          }
          /** @type {Array} */
          obj.l_l = [obj.u_d, obj.u_d, obj.u_d, obj.u_d, obj.u_v];
          a = radpower[15 & obj.c];
          if (1 & obj.u_v) {
            /** @type {number} */
            a = 31 - a;
          }
          if (16 & obj.c) {
            obj.l_l[4] += 2;
          }
          /** @type {number} */
          local = 0;
          for (;5 > local;local++) {
            if (a & 1 << 4 - local) {
              obj.l_l[local]++;
            }
            obj.l_l[local] *= 3;
          }
          obj.d_v = test(obj.l_l, [1, 0, 0, 1, 1], [0, 0, 0, 0, 1]);
          i = item.cd + obj.d_v[0];
          /** @type {number} */
          v.open = i / item.m;
          /** @type {number} */
          v.high = (i + obj.d_v[1]) / item.m;
          /** @type {number} */
          v.low = (i - obj.d_v[2]) / item.m;
          /** @type {number} */
          v.close = (i + obj.d_v[3]) / item.m;
          groups = obj.d_v[4];
          if ("number" == typeof groups) {
            /** @type {Array} */
            groups = [groups, groups >= 0 ? 0 : -1];
          }
          item.cd = i + obj.d_v[3];
          a = item.cv[0] + groups[0];
          /** @type {Array} */
          item.cv = [a & b, item.cv[1] + groups[1] + !!((item.cv[0] & b) + (groups[0] & b) & f)];
          /** @type {number} */
          v.volume = (item.cv[0] & f - 1) + item.cv[1] * f;
          ret.push(v);
        }
        return ret;
      };
      /**
       * @return {?}
       */
      var normalize = function() {
        var out;
        var copies;
        var tick;
        var r;
        if (da > 1) {
          return[];
        }
        /** @type {number} */
        item.l = 0;
        /** @type {number} */
        r = -1;
        /** @type {number} */
        item.d = test([18])[0] - 1;
        tick = test([18])[0];
        for (;item.d < tick;) {
          copies = apply(1);
          if (0 >= r) {
            if (max()) {
              item.l += slice();
            }
            r = test([3 * item.l], [0])[0] + 1;
            if (!out) {
              /** @type {Array} */
              out = [copies];
              r--;
            }
          } else {
            out.push(copies);
          }
          r--;
        }
        return out;
      };
      /**
       * @return {?}
       */
      var add = function() {
        var i;
        var name;
        var r;
        var old;
        if (da >= 1) {
          return[];
        }
        item.f = test([6])[0];
        item.c = test([6])[0];
        /** @type {Array} */
        r = [];
        /** @type {Array} */
        item.dv = [];
        /** @type {Array} */
        item.dl = [];
        /** @type {number} */
        i = 0;
        for (;i < item.f;i++) {
          /** @type {number} */
          item.dv[i] = 0;
          /** @type {number} */
          item.dl[i] = 0;
        }
        /** @type {number} */
        i = 0;
        for (;!(lastIndex >= index) && (lastIndex != index - 1 || 7 & (item.c ^ i));i++) {
          /** @type {Array} */
          old = [];
          /** @type {number} */
          name = 0;
          for (;name < item.f;name++) {
            if (max()) {
              item.dl[name] += slice();
            }
            item.dv[name] += test([3 * item.dl[name]], [1])[0];
            old[name] = item.dv[name];
          }
          r.push(old);
        }
        return r;
      };
      return next()();
    };
    var date = {
      /**
       * @param {?} date
       * @return {?}
       */
      dd : function(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      },
      /**
       * @param {?} date1
       * @return {?}
       */
      ddt : function(date1) {
        return new Date(date1.getTime());
      },
      /**
       * @param {Object} date
       * @param {Object} oDate
       * @return {?}
       */
      stbd : function(date, oDate) {
        return date && (oDate && (date.getFullYear() == oDate.getFullYear() && date.getMonth() == oDate.getMonth())) ? date.getDate() == oDate.getDate() : false;
      },
      /**
       * @param {Object} date
       * @param {Object} oDate
       * @return {?}
       */
      stbdt : function(date, oDate) {
        return date && oDate ? date.getTime() == oDate.getTime() : false;
      },
      /**
       * @param {?} date
       * @param {number} dataAndEvents
       * @param {number} deepDataAndEvents
       * @param {number} ignoreMethodDoesntExist
       * @return {?}
       */
      stbs : function(date, dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
        return date.getFullYear() == dataAndEvents && date.getMonth() == deepDataAndEvents ? date.getDate() == ignoreMethodDoesntExist : false;
      },
      /**
       * @param {?} fullYear
       * @param {string} buf
       * @param {string} prefix
       * @return {?}
       */
      stbds : function(fullYear, buf, prefix) {
        if (!prefix) {
          /** @type {string} */
          prefix = "-";
        }
        var message = buf.split(prefix);
        return this.stbs(fullYear, Number(message[0]), Number(message[1]) - 1, Number(message[2]));
      },
      /**
       * @param {Object} v23
       * @param {string} sep
       * @param {boolean} useUTC
       * @param {number} dataAndEvents
       * @param {?} str
       * @param {?} deepDataAndEvents
       * @return {?}
       */
      ds : function(v23, sep, useUTC, dataAndEvents, str, deepDataAndEvents) {
        if ("undefined" == typeof sep) {
          /** @type {string} */
          sep = "-";
        }
        /** @type {Array} */
        var qs = [];
        if (dataAndEvents || qs.push(v23[useUTC ? "getUTCFullYear" : "getFullYear"]()), !str) {
          var l = v23[useUTC ? "getUTCMonth" : "getMonth"]() + 1;
          qs.push(10 > l ? "0" + l : l);
        }
        if (!deepDataAndEvents) {
          var index = v23[useUTC ? "getUTCDate" : "getDate"]();
          qs.push(10 > index ? "0" + index : index);
        }
        return qs.join(sep);
      },
      /**
       * @param {Object} d
       * @param {string} sep
       * @param {boolean} useUTC
       * @return {?}
       */
      dss : function(d, sep, useUTC) {
        var key = this.ds(d, sep, useUTC);
        /** @type {Array} */
        var index = [d["get" + (useUTC ? "UTC" : "") + "Hours"]()];
        /** @type {Array} */
        var l = [d["get" + (useUTC ? "UTC" : "") + "Minutes"]()];
        /** @type {Array} */
        var i = [d["get" + (useUTC ? "UTC" : "") + "Seconds"]()];
        /** @type {string} */
        var y = [10 > index ? "0" + index : index, 10 > l ? "0" + l : l, 10 > i ? "0" + i : i].join(":");
        return[key, y].join(" ");
      },
      /**
       * @param {Object} d
       * @param {?} dataAndEvents
       * @param {boolean} useUTC
       * @return {?}
       */
      dst : function(d, dataAndEvents, useUTC) {
        /** @type {Array} */
        var index = [d["get" + (useUTC ? "UTC" : "") + "Hours"]()];
        /** @type {Array} */
        var l = [d["get" + (useUTC ? "UTC" : "") + "Minutes"]()];
        /** @type {Array} */
        var a = [10 > index ? "0" + index : index, 10 > l ? "0" + l : l];
        if (dataAndEvents) {
          /** @type {Array} */
          var r = [d["get" + (useUTC ? "UTC" : "") + "Seconds"]()];
          a.push(10 > r ? "0" + r : r);
        }
        return a.join(":");
      },
      /**
       * @param {string} key
       * @param {(Error|string)} file
       * @return {?}
       */
      sd : function(key, file) {
        var vals = key.split("-");
        var val = vals[0];
        /** @type {number} */
        var month = vals[1] - 1 || 0;
        var gg = vals[2] || 1;
        /** @type {number} */
        var hour = 0;
        /** @type {number} */
        var mins = 0;
        /** @type {number} */
        var secs = 0;
        return file && (vals = file.split(":"), hour = vals[0] || 0, mins = vals[1] || 0, secs = vals[2] || 0), new Date(val, month, gg, hour, mins, secs);
      },
      /**
       * @param {string} pair
       * @return {?}
       */
      ssd : function(pair) {
        var files = pair.split(" ");
        var camelKey = files[0];
        var curFile = files[1];
        return this.sd(camelKey, curFile);
      },
      /**
       * @param {Date} date1
       * @param {Date} expected
       * @return {?}
       */
      gw : function(date1, expected) {
        /** @type {number} */
        var multiplier = 6048E5;
        /** @type {number} */
        var prevX = 2592E5;
        /** @type {number} */
        var num = (date1.getTime() - prevX) / multiplier;
        /** @type {number} */
        var startAt = (expected.getTime() - prevX) / multiplier;
        return Math.floor(num) == Math.floor(startAt);
      },
      /**
       * @param {Date} oDate
       * @param {Date} date1
       * @return {?}
       */
      gm : function(oDate, date1) {
        return oDate.getFullYear() == date1.getFullYear() ? oDate.getMonth() == date1.getMonth() : false;
      },
      weekname : ["日", "一", "二", "三", "四", "五", "六", "日"],
      /**
       * @param {?} num
       * @return {?}
       */
      nw : function(num) {
        return this.weekname[num] || "";
      }
    };
    this.dateUtil = date;
    /** @type {function (): undefined} */
    this.LoadingSign = init;
    var zp = {
      /**
       * @param {string} stuff
       * @return {?}
       */
      trim : function(stuff) {
        return stuff.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
      },
      /**
       * @param {number} val
       * @param {?} nDecimalDigits
       * @return {?}
       */
      ps : function(val, nDecimalDigits) {
        if (val = Number(val), isNaN(val)) {
          return "-";
        }
        /** @type {number} */
        var exec = Math.abs(val);
        return 1E5 > exec ? val.toFixed(nDecimalDigits) : 1E7 > exec ? (val / 1E4).toFixed(nDecimalDigits) + "\u4e07" : 1E8 > exec ? (val / 1E7).toFixed(nDecimalDigits) + "\u5343\u4e07" : (val / 1E8).toFixed(nDecimalDigits) + "\u4ebf";
      },
      /**
       * @param {number} g
       * @return {?}
       */
      nu : function(g) {
        return g = Number(g), g = Math.abs(g), 1E5 > g || isNaN(g) ? [1, ""] : 1E7 > g ? [1E4, "\u4e07"] : 1E8 > g ? [1E7, "\u5343\u4e07"] : [1E8, "\u4ebf"];
      },
      /**
       * @param {number} number
       * @param {boolean} secret
       * @return {?}
       */
      vs : function(number, secret) {
        var data;
        /** @type {string} */
        var b = "";
        return number > 1E12 ? (data = (number / 1E12).toFixed(0), b = "万亿") : number > 1E8 ? (data = (number / 1E8).toFixed(2), b = "\u4ebf") : number > 1E5 ? (data = (number / 1E4).toFixed(2), b = "\u4e07") : data = number >= 1 ? number.toFixed(0) : "-", secret ? data + b : data;
      },
      /**
       * @param {string} substr
       * @return {?}
       */
      zp : function(substr) {
        return substr = String(substr), substr.length < 2 ? "0" + substr : substr;
      }
    };
    this.strUtil = zp;
    this.tUtil = {
      /**
       * @param {number} arg
       * @return {?}
       */
      s0 : function(arg) {
        return arg = parseInt(Number(arg)), 0 > arg ? "" : 10 > arg ? "0" + String(arg) : String(arg);
      },
      /**
       * @param {number} obj
       * @param {number} value
       * @return {?}
       */
      tIWS : function(obj, value) {
        /** @type {Array} */
        var eventPath = [];
        /** @type {number} */
        var result = obj;
        for (;value >= result;result++) {
          eventPath.push(this.s0(result / 60) + ":" + this.s0(result % 60));
        }
        return eventPath;
      },
      /**
       * @param {Array} opt_attributes
       * @return {?}
       */
      gtr : function(opt_attributes) {
        var uHostName;
        var oldClasses;
        var suiteView;
        var udataCur;
        var elems;
        /** @type {Array} */
        var ret = [];
        /** @type {number} */
        var unlock = 0;
        var cnl = opt_attributes.length;
        for (;cnl > unlock;unlock++) {
          uHostName = opt_attributes[unlock][0];
          oldClasses = opt_attributes[unlock][1];
          /** @type {number} */
          suiteView = 60 * Number(uHostName.split(":")[0]) + Number(uHostName.split(":")[1]);
          /** @type {number} */
          udataCur = 60 * Number(oldClasses.split(":")[0]) + Number(oldClasses.split(":")[1]);
          elems = this.tIWS(suiteView, udataCur);
          /** @type {Array} */
          ret = ret.concat(elems);
        }
        return ret;
      },
      tradingA : [],
      /**
       * @return {?}
       */
      gta : function() {
        return this.tradingA.length || (this.tradingA = this.gtr([["9:30", "11:29"], ["13:00", "15:00"]])), this.tradingA;
      },
      tradingUs : [],
      /**
       * @return {?}
       */
      gtus : function() {
        return this.tradingUs.length || (this.tradingUs = this.gtr([["9:30", "16:00"]])), this.tradingUs;
      },
      tradingHk : [],
      /**
       * @return {?}
       */
      gthk : function() {
        return this.tradingHk.length || (this.tradingHk = this.gtr([["09:30", "11:59"], ["13:00", "16:00"]])), this.tradingHk;
      },
      trading : [],
      /**
       * @param {(Array|number)} millis
       * @return {?}
       */
      gtAll : function(millis) {
        if(this.trading.length) {
          if(this.trading[0] != millis[0][0] || this.trading[this.trading.length - 1] != millis[millis.length - 1][1]) {
            this.trading = this.gtr(millis);
          }
        } else {
          this.trading = this.gtr(millis);
        }
        return this.trading;
      },
      /**
       * @param {?} dataAndEvents
       * @param {?} opt_attributes
       * @return {?}
       */
      gata : function(dataAndEvents, opt_attributes) {
        var gta;
        switch(dataAndEvents) {
          case "US":
            gta = this.gtus();
            break;
          case "HK":
            gta = this.gthk();
            break;
          case "NF":
            gta = this.gtAll(opt_attributes);
            break;
          case "HF":
            gta = this.gtAll(opt_attributes);
            break;
          default:
          ;
          case "CN":
            gta = this.gta();
        }
        return gta;
      },
      /**
       * @param {(RegExp|string)} dataAndEvents
       * @param {?} needle
       * @return {?}
       */
      ist : function(dataAndEvents, needle) {
        return dataAndEvents = dataAndEvents.toUpperCase(), contains(this.gata(dataAndEvents), needle) >= 0;
      },
      /**
       * @param {?} y
       * @param {number} dataAndEvents
       * @param {?} deepDataAndEvents
       * @param {?} node
       * @param {Array} result
       * @param {?} opt_attributes
       * @return {?}
       */
      gltbt : function(y, dataAndEvents, deepDataAndEvents, node, result, opt_attributes) {
        var author;
        /** @type {Array} */
        var oSpace = [];
        var data = this.gata(node, opt_attributes);
        var width = data.length;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var date = 0;
        /** @type {number} */
        var l = y * width;
        for (;l > i;i++) {
          author = {
            time : data[i % width],
            price : 0,
            percent : 0,
            avg_price : 0,
            volume : -0.01,
            inventory : 0
          };
          if (i % width == 0) {
            if (result) {
              author.date = result[date];
              date++;
            }
          }
          oSpace.push(author);
          if (!deepDataAndEvents) {
            oSpace[i].price = oSpace[i].avg_price = dataAndEvents;
          }
        }
        return oSpace[0].price = oSpace[0].avg_price = oSpace[0].prevclose = dataAndEvents, oSpace[0].volume = oSpace[0].totalVolume = oSpace[0].totalAmount = 0, oSpace[0].inventory = 0, oSpace;
      },
      /**
       * @param {Array} events
       * @param {?} dataAndEvents
       * @return {?}
       */
      azft : function(events, dataAndEvents) {
        if (!events) {
          return events;
        }
        var prevSources = this.gata(dataAndEvents);
        /** @type {number} */
        var i = 0;
        var l = events.length;
        for (;l > i;i++) {
          events[i].time = prevSources[i];
        }
        return events[0].date.setHours(0), events;
      }
    };
    this.kUtil = {
      /**
       * @param {Array} data
       * @param {Object} options
       * @param {number} dataAndEvents
       * @param {number} expiration
       * @param {number} val2
       * @return {?}
       */
      mw : function(data, options, dataAndEvents, expiration, val2) {
        if ("number" != typeof expiration) {
          /** @type {number} */
          expiration = 0;
        }
        var end = data.length;
        var o = data[0];
        if (expiration > 1) {
          o.volume /= expiration;
        }
        var val1;
        /** @type {Array} */
        var volume = [];
        /** @type {Array} */
        var worker = [];
        if (1 == end) {
          volume[0] = {
            open : options.open,
            high : options.high,
            low : options.low,
            close : options.price,
            volume : options.totalVolume,
            date : date.dd(options.date)
          };
          worker[0] = {
            open : options.open,
            high : options.high,
            low : options.low,
            close : options.price,
            volume : options.totalVolume,
            date : date.dd(options.date)
          };
        } else {
          var offset;
          var open = o.open;
          var high = o.high;
          var low = o.low;
          var close = o.close;
          var s = o.volume;
          var d = o.date;
          var _open = o.open;
          var r = o.high;
          var id = o.low;
          var l = o.close;
          var left = o.volume;
          var value = o.date;
          /** @type {number} */
          var i = 1;
          for (;end > i;i++) {
            o = data[i];
            if (expiration > 1) {
              o.volume /= expiration;
            }
            if (date.gw(data[i - 1].date, o.date)) {
              if (o.high > high) {
                high = o.high;
              }
              if (o.low < low) {
                low = o.low;
              }
              close = o.close;
              s += o.volume;
              d = o.date;
            } else {
              if (!isNaN(val2)) {
                val1 = d.getDay();
                if (0 == val1) {
                  /** @type {number} */
                  val1 = 7;
                }
                /** @type {number} */
                offset = val1 - val2;
                if (offset > 0) {
                  d = date.ddt(d);
                  d.setDate(d.getDate() - offset);
                }
              }
              volume.push({
                open : open,
                high : high,
                low : low,
                close : close,
                volume : s,
                date : d
              });
              open = o.open;
              high = o.high;
              low = o.low;
              close = o.close;
              s = o.volume;
              d = o.date;
            }
            if (date.gm(data[i - 1].date, o.date)) {
              if (o.high > r) {
                r = o.high;
              }
              if (o.low < id) {
                id = o.low;
              }
              l = o.close;
              left += o.volume;
              value = o.date;
            } else {
              if (!isNaN(val2)) {
                val1 = value.getDay();
                if (0 == val1) {
                  /** @type {number} */
                  val1 = 7;
                }
                /** @type {number} */
                offset = val1 - val2;
                if (offset > 0) {
                  value = date.ddt(value);
                  value.setDate(value.getDate() - offset);
                }
              }
              worker.push({
                open : _open,
                high : r,
                low : id,
                close : l,
                volume : left,
                date : value
              });
              _open = o.open;
              r = o.high;
              id = o.low;
              l = o.close;
              left = o.volume;
              value = o.date;
            }
            if (i == end - 1) {
              volume.push({
                open : open,
                high : high,
                low : low,
                close : close,
                volume : s,
                date : d
              });
              worker.push({
                open : _open,
                high : r,
                low : id,
                close : l,
                volume : left,
                date : value
              });
            }
          }
        }
        return volume[0].prevclose = dataAndEvents, worker[0].prevclose = dataAndEvents, [volume, worker];
      },
      /**
       * @param {Array} diff
       * @param {Object} options
       * @param {number} queryObj
       * @param {Object} data
       * @return {?}
       */
      nc : function(diff, options, queryObj, data) {
        if (diff && !(diff.length < 1)) {
          data = data || {};
          var d = diff[diff.length - 1];
          if (168 == queryObj && date.gw(d.date, options.date) || 720 == queryObj && date.gm(d.date, options.date)) {
            return d.day = String(options.today).split("-").join("/"), void(d.date = date.dd(options.date));
          }
          d = diff[diff.length - 1];
          var b = d.close;
          /** @type {number} */
          var a = options.price - b;
          /** @type {number} */
          var percent = a / b;
          diff.push({
            open : isNaN(data.price) ? b : data.price,
            high : isNaN(data.price) ? options.high : data.price,
            low : isNaN(data.price) ? options.low : data.price,
            close : isNaN(data.price) ? options.price : data.price,
            volume : isNaN(data.volume) ? options.totalVolume : data.volume,
            percent : percent,
            day : String(options.today).split("-").join("/"),
            date : date.ddt(options.date),
            time : options.time,
            ampP : 0,
            amplitude : 0,
            change : a,
            kke_cs : 0
          });
        }
      },
      /**
       * @param {Array} args
       * @param {?} e
       * @return {undefined}
       */
      pd : function(args, e) {
        var len = args.length;
        var options = args[0];
        var width = options.prevclose;
        if (isNaN(width) || 0 >= width) {
          width = options.open;
        }
        /** @type {number} */
        var i = 0;
        for (;len > i;i++) {
          if (options = args[i], e && (e.usePc && (width = options.prevclose)), options.amplitude = options.high - options.low, options.ampP = options.amplitude / width, options.change = options.close - width, options.percent = options.change / width, width = options.close, options.day) {
            var parts = options.day.split(" ");
            options.day = parts[0];
            options.time = parts[1].slice(0, 5);
            options.date = date.sd(options.day, options.time);
            options.day = options.day.split("-").join("/");
          } else {
            var d = options.date;
            var y = zp.zp(d.getMonth() + 1);
            var querystring = zp.zp(d.getDate());
            /** @type {string} */
            options.day = [d.getFullYear(), y, querystring].join("/");
          }
          /** @type {number} */
          options.kke_cs = options.close > options.open ? 1 : options.open > options.close ? -1 : 0;
        }
      },
      /**
       * @param {number} end
       * @param {number} n
       * @param {number} start
       * @param {number} inverted
       * @param {number} deepDataAndEvents
       * @return {?}
       */
      ms : function(end, n, start, inverted, deepDataAndEvents) {
        return start > end && (end += 24), Math.max(1, Math.ceil((60 * (end - start) + n - inverted) / deepDataAndEvents));
      },
      /**
       * @param {string} key
       * @param {string} ok
       * @param {string} pair
       * @param {number} deepDataAndEvents
       * @param {boolean} src
       * @return {?}
       */
      spk : function(key, ok, pair, deepDataAndEvents, src) {
        if (key == ok) {
          return true;
        }
        var regExpResultArray = key.split(":");
        /** @type {number} */
        var x = Number(regExpResultArray[0]);
        /** @type {number} */
        var i = Number(regExpResultArray[1]);
        regExpResultArray = ok.split(":");
        /** @type {number} */
        var y = Number(regExpResultArray[0]);
        /** @type {number} */
        var length = Number(regExpResultArray[1]);
        if (x > y && 3 > x - y || x == y && i >= length) {
          return true;
        }
        if (60 != deepDataAndEvents || src && /^forex/.test(src)) {
          regExpResultArray = pair.split(":");
          /** @type {number} */
          var b = Number(regExpResultArray[0]);
          /** @type {number} */
          var inverted = Number(regExpResultArray[1]);
          var index = this.ms(x, i, b, inverted, deepDataAndEvents);
          var max = this.ms(y, length, b, inverted, deepDataAndEvents);
          return index == max;
        }
        return "10:30" != key && ("11:30" != key && ("14:00" != key && "15:00" != key)) || length == i ? true : false;
      },
      /**
       * @param {(Array|number)} data
       * @return {?}
       */
      yd : function(data) {
        var e = data[data.length - 1].date.getFullYear();
        /** @type {Array} */
        var r = [];
        var n = data.length;
        for (;n-- && data[n].date.getFullYear() == e;) {
          r[r.length] = data[n];
        }
        return r.reverse(), r[0].prevclose = data[n] ? data[n].prevclose || data[n].close : r[0].prevclose || r[0].close, r;
      },
      /**
       * @param {Array} tokenized
       * @param {?} from
       * @return {?}
       */
      rd : function(tokenized, from) {
        /** @type {Array} */
        var current = [];
        var now = date.dd(from);
        now.setFullYear(now.getFullYear() - 5);
        var index = tokenized.length;
        for (;index-- && !(tokenized[index].date < now);) {
          current[current.length] = tokenized[index];
        }
        return current.reverse(), current[0].prevclose = tokenized[index] ? tokenized[index].close : current[0].close, current;
      },
      /**
       * @param {Array} arr
       * @param {Array} result
       * @param {boolean} dataAndEvents
       * @param {?} deepDataAndEvents
       * @return {?}
       */
      adbd : function(arr, result, dataAndEvents, deepDataAndEvents) {
        var prop;
        var item;
        var value;
        var oDate;
        /** @type {function (Object, Object): ?} */
        var lookupIterator = dataAndEvents ? date.stbdt : date.stbd;
        var size = arr.length;
        var index = result.length;
        for (;index--;) {
          if (value = result[index].date, 1 > size) {
            /** @type {number} */
            index = result.length - arr.length;
            /** @type {Array} */
            var beginswith = [];
            var suiteView = arr[0];
            for (;index-- > 0;) {
              if (item = iterator(suiteView) || {}, item.isFake = true, item.kke_cs = 0, deepDataAndEvents) {
                for (prop in item) {
                  if (item.hasOwnProperty(prop)) {
                    if (func(item[prop])) {
                      /** @type {number} */
                      item[prop] = 0;
                    }
                  }
                }
              }
              beginswith.push(item);
            }
            /** @type {Array} */
            arr = beginswith.concat(arr);
            break;
          }
          /** @type {number} */
          var i = size--;
          for (;i-- && (oDate = arr[i].date, !lookupIterator(value, oDate));) {
            if (value > oDate) {
              if (item = iterator(arr[i]), item.isFake = true, item.date = value, item.kke_cs = 0, deepDataAndEvents) {
                for (prop in item) {
                  if (item.hasOwnProperty(prop)) {
                    if (func(item[prop])) {
                      /** @type {number} */
                      item[prop] = 0;
                    }
                  }
                }
              }
              arr.splice(++i, 0, item);
              size++;
              break;
            }
            arr.splice(i, 1);
            size--;
          }
        }
        return size > 0 && arr.splice(0, size), arr;
      },
      /**
       * @param {Array} arr
       * @param {Array} tokenized
       * @param {?} dataAndEvents
       * @param {undefined} oDate
       * @param {number} first
       * @return {?}
       */
      ayd : function(arr, tokenized, dataAndEvents, oDate, first) {
        var j;
        var c;
        var start;
        var aDate;
        /** @type {function (Object, Object): ?} */
        var getMilliseconds = date.stbd;
        var size = arr.length;
        var index = tokenized.length;
        for (;index--;) {
          if (start = tokenized[index], !(start > first)) {
            if (oDate > start && !date.stbd(start, oDate)) {
              break;
            }
            /** @type {number} */
            var i = size--;
            for (;i-- && (aDate = arr[i].date, !getMilliseconds(start, aDate));) {
              if (start > aDate) {
                c = iterator(arr[i]);
                var d = c.close;
                for (j in c) {
                  if (c.hasOwnProperty(j)) {
                    if (func(c[j])) {
                      /** @type {number} */
                      c[j] = 0;
                    }
                  }
                }
                c.open = c.high = c.low = c.close = d;
                c.date = start;
                arr.splice(++i, 0, c);
                size++;
                break;
              }
              arr.splice(i, 1);
              size--;
            }
          }
        }
        return size > 0 && arr.splice(0, size), arr;
      }
    };
    this.domGc = new function() {
      var el = self.$C("div");
      return el.style.display = "none", function(node, dataAndEvents) {
        if (node) {
          if (node.hasChildNodes()) {
            for (;node.childNodes.length > 0;) {
              node.removeChild(node.firstChild);
            }
          }
          if (dataAndEvents) {
            return void(node.innerHTML = "");
          }
          el.appendChild(node);
          /** @type {string} */
          el.innerHTML = "";
        }
      };
    };
    /**
     * @param {string} value
     * @param {boolean} raw
     * @return {?}
     */
    this.getSUrl = function(value, raw) {
      if (!value) {
        return null;
      }
      var a;
      var n;
      /** @type {Array} */
      var tokenized = [{
        h : "finance.sina.com.cn",
        s : "ssl-finance.sina.com.cn"
      }, {
        h : "money.finance.sina.com.cn",
        s : "ex.sina.com.cn"
      }, {
        h : "vip.stock.finance.sina.com.cn",
        s : "ex.sina.com.cn"
      }, {
        h : "stock.finance.sina.com.cn",
        s : "stock.sina.com.cn"
      }, {
        h : "stock2.finance.sina.com.cn",
        s : "stock.sina.com.cn"
      }, {
        h : "www.sinaimg.cn",
        s : "wwws.sinaimg.cn"
      }, {
        h : "n.sinaimg.cn",
        s : "ns.sinaimg.cn"
      }, {
        h : "i0.sinaimg.cn",
        s : "i0s.sinaimg.cn"
      }, {
        h : "i1.sinaimg.cn",
        s : "i1s.sinaimg.cn"
      }, {
        h : "i2.sinaimg.cn",
        s : "i2s.sinaimg.cn"
      }, {
        h : "i3.sinaimg.cn",
        s : "i3s.sinaimg.cn"
      }, {
        h : "data.finance.sina.com.cn",
        s : "ssl-data.sina.com.cn"
      }, {
        h : "biz.finance.sina.com.cn",
        s : "biz.sina.com.cn"
      }, {
        h : "i.sso.sina.com.cn",
        s : "sso-ssl.sina.com.cn"
      }, {
        h : "touzi.sina.com.cn",
        s : "touzi.sina.com.cn"
      }];
      var ca = value.match(/(\w*:\/\/)?([^\/]+)(\/+.*)?/i);
      var h = ca[2];
      var c = ca[3];
      /** @type {number} */
      var index = tokenized.length;
      for (;index--;) {
        if (tokenized[index].h == h) {
          n = tokenized[index].s;
          break;
        }
      }
      return a = n ? ["https://", n, c].join("") : raw ? value : ["https://", h, c].join("");
    };
    /** @type {function (Object): undefined} */
    this.TipM = access;
    this.logoM = new function() {
      /** @type {string} */
      var new_image_url = "data:image/png;base64,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";
      var img = self.$C("img");
      /** @type {boolean} */
      var n = false;
      /** @type {Array} */
      var items = [];
      /** @type {Array} */
      var canvases = [];
      /**
       * @return {undefined}
       */
      var load = function() {
        self.xh5_EvtUtil.addHandler(img, "load", function() {
          /** @type {boolean} */
          n = true;
          for (;items.length;) {
            var pdataCur = items.shift();
            init(pdataCur);
          }
        });
        /** @type {string} */
        img.src = new_image_url;
      };
      /**
       * @param {?} item
       * @return {undefined}
       */
      var draw = function(item) {
        if (item.logo && !self.xh5_BrowserUtil.noH5) {
          var canvas = item.logo;
          if (!item.color) {
            /** @type {string} */
            item.color = "#ccc";
          }
          var resultItems = self.hex2dec(item.color, 0 / 0, true);
          if (!resultItems || resultItems.length < 3) {
            /** @type {Array} */
            resultItems = [200, 200, 200];
          }
          var context = canvas.getContext("2d");
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var v0 = resultItems[0];
          var o = resultItems[1];
          var result = resultItems[2];
          /** @type {number} */
          var i = 0;
          var l = imageData.data.length;
          for (;l > i;i += 4) {
            if (0 != imageData.data[i + 3]) {
              imageData.data[i] = v0;
              imageData.data[i + 1] = o;
              imageData.data[i + 2] = result;
            }
          }
          context.putImageData(imageData, 0, 0);
        }
      };
      /**
       * @param {Object} data
       * @return {?}
       */
      var init = function(data) {
        if (self.xh5_BrowserUtil.noH5) {
          return null;
        }
        if (!n) {
          /** @type {number} */
          var count = items.length;
          for (;count--;) {
            if (items[count].id == data.id) {
              return null;
            }
          }
          return items.push(data), null;
        }
        var canvas;
        canvas = self.$C("canvas", data.id);
        /** @type {number} */
        canvas.style.zIndex = 0;
        canvases.push(canvas);
        /** @type {string} */
        canvas.style.position = "absolute";
        /** @type {string} */
        canvas.style.top = data.top + "px";
        /** @type {string} */
        canvas.style.right = data.right + "px";
        canvas.width = img.width;
        canvas.height = img.height;
        /** @type {string} */
        canvas.style.width = data.LOGO_W + "px";
        /** @type {string} */
        canvas.style.height = data.LOGO_H + "px";
        var ctx = canvas.getContext("2d");
        if (data.isShare) {
          var dpr = self.xh5_BrowserUtil.hdpr;
          if (2 > dpr) {
            /** @type {number} */
            var ratio = dpr / 2;
            ctx.scale(ratio, ratio);
          }
        }
        return ctx.drawImage(img, 0, 0), draw({
          logo : canvas,
          color : data.color
        }), fn(data.cb) && data.cb(canvas), canvas;
      };
      /** @type {function (Object): ?} */
      this.getLogo = init;
      /** @type {function (?): undefined} */
      this.styleLogo = draw;
      load();
    };
    this.grabM = new function() {
      /**
       * @param {Object} el
       * @return {?}
       */
      var init = function(el) {
        var e = el.dom;
        var t = el.child;
        if (!e || !t) {
          return null;
        }
        if (isObject(e)) {
          e = self.$DOM(e);
        }
        var opt_nodes = e.getElementsByTagName(t);
        if (!opt_nodes || opt_nodes.length < 1) {
          return null;
        }
        var ratio = self.xh5_BrowserUtil.hdpr;
        var w = e.offsetWidth;
        var oldHeight = e.offsetHeight;
        var canvas = self.$C("canvas");
        var ctx = canvas.getContext("2d");
        /** @type {string} */
        canvas.style.width = w + "px";
        /** @type {string} */
        canvas.style.height = oldHeight + "px";
        /** @type {number} */
        canvas.width = w * ratio;
        /** @type {number} */
        canvas.height = oldHeight * ratio;
        if (1 != ratio) {
          ctx.scale(ratio, ratio);
        }
        var offset = self.xh5_HtmlPosUtil.pageX(e);
        var clientTop = self.xh5_HtmlPosUtil.pageY(e);
        var endY = self.xh5_HtmlPosUtil.parentY(e);
        /** @type {string} */
        ctx.textBaseline = "top";
        var node;
        var style;
        /** @type {number} */
        var i = 0;
        var len = opt_nodes.length;
        for (;len > i;i++) {
          node = opt_nodes[i];
          style = self.getCSS(node);
          /** @type {number} */
          var x = self.xh5_HtmlPosUtil.pageX(node) - offset;
          /** @type {number} */
          var top = self.xh5_HtmlPosUtil.pageY(node) - clientTop;
          /** @type {number} */
          var y = Number(style.paddingLeft.split("px")[0]);
          /** @type {number} */
          var labelHeight = 0.5 * (Number(style.lineHeight.split("px")[0]) - Number(style.fontSize.split("px")[0]));
          ctx.fillStyle = style.backgroundColor;
          ctx.fillRect(x, top, node.offsetWidth, node.offsetHeight);
          /** @type {string} */
          ctx.font = [style.fontSize, style.fontFamily].join(" ");
          ctx.fillStyle = style.color;
          ctx.fillText(node.innerHTML, x + y, top + labelHeight);
        }
        return{
          canvas : canvas,
          x : offset,
          y : endY
        };
      };
      /**
       * @param {?} xdomain
       * @param {Object} data
       * @return {undefined}
       */
      var request = function(xdomain, data) {
        if (self.POST) {
          var PNSDK = data.txt || "";
          var headers = data.url || "";
          /** @type {string} */
          var name = "_" + Math.floor(1E3 * Math.random());
          window.open("about:blank", name);
          var url = self.getSUrl("http://stock.finance.sina.com.cn/misc/userapi/Pic4Weibo.php");
          self.POST(url, {
            imgData : xdomain,
            symbol : "imgData"
          }, function(link) {
            if (link) {
              if (link.match(/^http.+/)) {
                /** @type {string} */
                link = encodeURIComponent(link);
                /** @type {string} */
                link = "http://service.weibo.com/share/share.php?source=bookmark&title=" + encodeURIComponent(PNSDK) + "&url=" + encodeURIComponent(headers) + "&pic=" + link;
                window.open(link, name);
              }
            }
          });
        }
      };
      /**
       * @param {Object} options
       * @return {undefined}
       */
      var render = function(options) {
        if (!self.xh5_BrowserUtil.noH5) {
          var img = options.ctn;
          if (img) {
            var zIndex;
            var e;
            var els = img.getElementsByTagName("canvas");
            var width = options.w || img.offsetWidth;
            var height = options.h || img.offsetHeight;
            var scale = self.xh5_BrowserUtil.hdpr;
            /** @type {Array} */
            var paths = [];
            var x = self.xh5_HtmlPosUtil.pageX(img);
            var startY = self.xh5_HtmlPosUtil.pageY(img);
            var i = els.length;
            for (;i--;) {
              e = els[i];
              zIndex = e.style.zIndex;
              var j;
              /** @type {boolean} */
              var v = false;
              j = options.ignoreZIdxArr.length;
              for (;j--;) {
                if (zIndex == options.ignoreZIdxArr[j]) {
                  /** @type {boolean} */
                  v = true;
                  break;
                }
              }
              if (!v) {
                j = options.ignoreIdArr.length;
                for (;j--;) {
                  if (e.id == options.ignoreIdArr[j]) {
                    /** @type {boolean} */
                    v = true;
                    break;
                  }
                }
                if (!v) {
                  var p = {
                    canvas : e,
                    x : self.xh5_HtmlPosUtil.pageX(e) - x,
                    y : self.xh5_HtmlPosUtil.pageY(e) - startY
                  };
                  paths.push(p);
                }
              }
            }
            if (!options.nologo) {
              var elem = self.logoM.getLogo({
                cb : null,
                id : "share_logo",
                isShare : true,
                top : options.top,
                right : options.right,
                LOGO_W : options.LOGO_W,
                LOGO_H : options.LOGO_H,
                color : options.color
              });
              if (elem) {
                paths.push({
                  canvas : elem,
                  x : width - Number(elem.style.right.split("px")[0]) - options.LOGO_W,
                  y : Number(elem.style.top.split("px")[0])
                });
              }
            }
            if (options.extra) {
              if (!isFunction(options.extra)) {
                /** @type {Array} */
                options.extra = [options.extra];
              }
              /** @type {number} */
              var name = 0;
              var cnl = options.extra.length;
              for (;cnl > name;name++) {
                var path = init(options.extra[name]);
                if (path) {
                  /** @type {Array} */
                  paths = paths.concat(path);
                }
              }
            }
            var canvas = self.$C("canvas");
            var ctx = canvas.getContext("2d");
            /** @type {string} */
            canvas.style.width = width + "px";
            /** @type {string} */
            canvas.style.height = height + "px";
            /** @type {number} */
            canvas.width = width * scale;
            /** @type {number} */
            canvas.height = height * scale;
            ctx.fillStyle = options.bgColor;
            ctx.fillRect(0, 0, width, height);
            /** @type {number} */
            var b = 0;
            /** @type {number} */
            var queue = paths.length;
            for (;queue > b;b++) {
              var c = paths[b];
              ctx.drawImage(c.canvas, c.x * scale, c.y * scale);
            }
            request(canvas.toDataURL("image/png").substring(22), options);
          }
        }
      };
      /** @type {function (Object): undefined} */
      this.shareTo = render;
    };
    this.bridge = new function() {
      /**
       * @param {Object} states
       * @param {string} prefix
       * @return {undefined}
       */
      function appendModelPrefix(states, prefix) {
        var i;
        for (i in states) {
          if (states.hasOwnProperty(i)) {
            states[i] = prefix + states[i];
          }
        }
      }
      var el;
      var parent;
      /** @type {boolean} */
      var url = false;
      /** @type {string} */
      var prefix = "sinatkchart_SLBridge~";
      var states = {
        SAVE : "save",
        LOAD : "load",
        REMOVE : "remove",
        DATA : "data",
        READY : "ready"
      };
      appendModelPrefix(states, prefix);
      /** @type {Array} */
      var messageQueue = [];
      var callbacks = {};
      /** @type {Array} */
      var tokens = [];
      /**
       * @param {Object} v
       * @return {undefined}
       */
      var callback = function(v) {
        /** @type {Object} */
        var r = v;
        var p = r.key;
        var results = r.options;
        var data = r.value;
        that.save(p, data, results);
      };
      /**
       * @param {Object} text
       * @return {?}
       */
      var log = function(text) {
        return url ? void 0 : parent ? void parent.postMessage(JSON.stringify({
          type : states.SAVE,
          content : text
        }), "*") : void tokens.push([text]);
      };
      /**
       * @param {Object} arg
       * @return {?}
       */
      var match = function(arg) {
        /** @type {Object} */
        var params = arg;
        var p = params.key;
        var callback = params.options;
        return that.load(p, callback);
      };
      /**
       * @param {Object} message
       * @param {Function} callback
       * @return {?}
       */
      var send = function(message, callback) {
        if (!url) {
          if (!parent) {
            return void messageQueue.push([message, callback]);
          }
          /** @type {Function} */
          callbacks[message.uid] = callback;
          /** @type {string} */
          var paramType = message.type ? prefix + message.type : states.LOAD;
          parent.postMessage(JSON.stringify({
            type : paramType,
            content : message
          }), "*");
        }
      };
      /**
       * @param {string} path
       * @param {Function} c
       * @param {Function} opt_behavior
       * @return {undefined}
       */
      var getFile = function(path, c, opt_behavior) {
        var m = match(path);
        c(m);
        if (!opt_behavior) {
          send(path, c);
        }
      };
      /**
       * @param {Object} s
       * @param {?} value
       * @return {undefined}
       */
      var ok = function(s, value) {
        if (s) {
          callback(s);
          if (!value) {
            log(s);
          }
        }
      };
      var c = new function() {
        /**
         * @param {string} c
         * @return {?}
         */
        var getRequest = function(c) {
          if (c && c.type) {
            var cl = c.type;
            if (-1 != cl.indexOf(prefix)) {
              return cl;
            }
          }
          return void 0;
        };
        /**
         * @return {undefined}
         */
        var init = function() {
          var data;
          for (;messageQueue.length;) {
            data = messageQueue.shift();
            getFile(data[0], data[1]);
          }
          for (;tokens.length;) {
            data = tokens.shift();
            ok(data[0]);
          }
        };
        /**
         * @param {MessageEvent} msg
         * @return {undefined}
         */
        this.onMsg = function(msg) {
          var data;
          try {
            /** @type {*} */
            data = JSON.parse(msg.data);
          } catch (u) {
          }
          var request = getRequest(data);
          if (request) {
            switch(request) {
              case states.READY:
                parent = el.contentWindow;
                init();
                break;
              case states.DATA:
                if (!self.isFunc(callbacks[data.uid])) {
                  return;
                }
                callbacks[data.uid](data.result);
                /** @type {null} */
                callbacks[data.uid] = null;
                delete callbacks[data.uid];
            }
          }
        };
      };
      /**
       * @return {undefined}
       */
      var foo = function() {
        /** @type {boolean} */
        url = true;
        var id;
        for (id in callbacks) {
          if (callbacks.hasOwnProperty(id)) {
            /** @type {null} */
            callbacks[id] = null;
            delete callbacks[id];
          }
        }
        for (;messageQueue.length;) {
          messageQueue.length--;
        }
        for (;tokens.length;) {
          tokens.length--;
        }
      };
      /** @type {string} */
      var pageId = "SINA_CHART_BRIDGE";
      self.xh5_EvtUtil.addHandler(window, "message", c.onMsg);
      el = self.iframer({
        attribute : {
          id : pageId,
          src : "https://current.sina.com.cn/sinatkchart/SLBridge.html?20160704"
        }
      }, foo);
      setTimeout(function() {
        /** @type {string} */
        el.style.display = "none";
      }, 999);
      /** @type {function (string, Function, Function): undefined} */
      this.load = getFile;
      /** @type {function (Object, ?): undefined} */
      this.save = ok;
      /**
       * @return {?}
       */
      this.getStatus = function() {
        return parent && (!url && "1" == el.getAttribute("data-ready"));
      };
    };
    this.colorPicker = function() {
      /**
       * @param {Object} method
       * @param {Function} element
       * @return {undefined}
       */
      function compile(method, element) {
        /**
         * @return {undefined}
         */
        var Node = function() {
        };
        var modified = method.prototype;
        Node.prototype = element.prototype;
        method.prototype = new Node;
        var field;
        for (field in modified) {
          if (modified.hasOwnProperty(field)) {
            method.prototype[field] = modified[field];
          }
        }
        /** @type {Object} */
        method.prototype.constructor = method;
      }
      /**
       * @param {Object} self
       * @param {?} config
       * @param {?} noOverwrite
       * @return {?}
       */
      function apply(self, config, noOverwrite) {
        if (!config) {
          return self;
        }
        if (!self) {
          self = {};
        }
        var i;
        for (i in config) {
          if (config.hasOwnProperty(i)) {
            if ("Object" === isString(config[i])) {
              if (!self[i]) {
                self[i] = {};
              }
              apply(self[i], config[i], noOverwrite);
            } else {
              if (!(!noOverwrite && i in self)) {
                self[i] = config[i];
              }
            }
          }
        }
        return self;
      }
      /**
       * @param {Element} element
       * @return {?}
       */
      function $(element) {
        var metrics = "undefined" == typeof getComputedStyle ? element.currentStyle : getComputedStyle(element);
        return metrics ? (element.clientWidth || (px(metrics.width) || px(element.style.width))) - (px(metrics.paddingLeft) || 0) - (px(metrics.paddingRight) || 0) | 0 : 0;
      }
      /**
       * @param {Element} element
       * @return {?}
       */
      function add(element) {
        var size = "undefined" == typeof getComputedStyle ? element.currentStyle : getComputedStyle(element);
        return size ? (element.clientHeight || (px(size.height) || px(element.style.height))) - (px(size.paddingTop) || 0) - (px(size.paddingBottom) || 0) | 0 : 0;
      }
      /**
       * @param {Element} c
       * @return {?}
       */
      function getBounds(c) {
        return c.getBoundingClientRect ? c.getBoundingClientRect() : {
          left : 0,
          top : 0
        };
      }
      /**
       * @param {HTMLCanvasElement} canvas
       * @return {undefined}
       */
      function clear_canvas(canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      /**
       * @param {Element} element
       * @param {?} options
       * @return {?}
       */
      function fn(element, options) {
        /** @type {Element} */
        var el = document.createElement("canvas");
        /** @type {(CSSStyleDeclaration|null)} */
        var cs = el.style;
        var i = $(element);
        var index = add(element);
        /** @type {number} */
        var x = i * options.width;
        /** @type {number} */
        var y = index * options.height;
        return el.width = x, el.height = y, cs.position = "absolute", cs.width = x + "px", cs.height = y + "px", cs.left = i * options.left + "px", cs.top = index * options.top + "px", element.appendChild(el), el;
      }
      /**
       * @param {Element} element
       * @param {Object} options
       * @return {?}
       */
      function animate(element, options) {
        /** @type {Element} */
        var value = document.createElement("ul");
        /** @type {(CSSStyleDeclaration|null)} */
        var style = value.style;
        var label = options.label;
        var s = $(element);
        var index = add(element);
        /** @type {string} */
        style.listStyle = "none";
        /** @type {number} */
        style.padding = 0;
        /** @type {number} */
        style.margin = 0;
        style.font = options.font;
        /** @type {string} */
        style.position = "absolute";
        /** @type {string} */
        style.left = s * options.left + "px";
        /** @type {string} */
        style.top = index * options.top + "px";
        /** @type {number} */
        var camelKey = 0;
        var i_max = label.length;
        for (;i_max > camelKey;camelKey++) {
          update(value, camelKey, options);
        }
        return element.appendChild(value), value;
      }
      /**
       * @param {Element} element
       * @param {number} key
       * @param {Object} options
       * @return {?}
       */
      function update(element, key, options) {
        /** @type {Element} */
        var button = document.createElement("li");
        /** @type {Element} */
        var label = document.createElement("label");
        /** @type {Element} */
        var el = document.createElement("input");
        /** @type {(CSSStyleDeclaration|null)} */
        var style = label.style;
        /** @type {(CSSStyleDeclaration|null)} */
        var styles = button.style;
        /** @type {(CSSStyleDeclaration|null)} */
        var ol = el.style;
        return label.innerHTML = options.label[key], style.textAlign = "right", style.display = "inline-block", style.width = options.labelWidth + "px", style.color = options.color, "number" == options.type && (el.type = "number"), ol.width = options.inputWidth + "px", styles.marginBottom = options.gap + "px", bind(el, "mousemove", function(outErr) {
          cb(outErr);
        }), button.appendChild(label), button.appendChild(el), element.appendChild(button), button;
      }
      /**
       * @param {Element} element
       * @param {Object} options
       * @return {?}
       */
      function start(element, options) {
        /** @type {Element} */
        var div = document.createElement("div");
        /** @type {(CSSStyleDeclaration|null)} */
        var divStyle = div.style;
        var value = $(element);
        var index = add(element);
        return divStyle.position = "absolute", divStyle.left = value * options.left + "px", divStyle.top = index * options.top + "px", divStyle.width = value * options.width + "px", divStyle.height = index * options.height + "px", element.appendChild(div), div;
      }
      /**
       * @param {?} self
       * @param {Element} element
       * @return {undefined}
       */
      function initialize(self, element) {
        /**
         * @param {?} v
         * @return {undefined}
         */
        function handler(v) {
          v = f(element, v);
          self._onmousemove(v.NyanX, v.NyanY);
          if (self.onmousemove) {
            self.onmousemove(self);
          }
        }
        /**
         * @param {?} event
         * @return {undefined}
         */
        function wrapHandler(event) {
          /** @type {boolean} */
          o = true;
          handler(event);
        }
        /**
         * @param {?} e
         * @return {undefined}
         */
        function reset(e) {
          if (o) {
            handler(e);
          }
          cb(e);
          objectToString(e);
        }
        /**
         * @return {undefined}
         */
        function get() {
          if (o) {
            /** @type {boolean} */
            o = false;
          }
        }
        /** @type {boolean} */
        var o = false;
        if ("ontouchend" in window) {
          bind(element, "touchstart", wrapHandler);
          bind(element, "touchmove", reset);
          bind(element, "touchend", get);
        } else {
          bind(element, "mousedown", wrapHandler);
          bind(element, "mousemove", reset);
          bind(element, "mouseup", get);
          bind(element, "mouseout", get);
        }
      }
      /**
       * @param {number} position
       * @param {number} mayParseLabeledStatementInstead
       * @param {number} opt_attributes
       * @return {?}
       */
      function value(position, mayParseLabeledStatementInstead, opt_attributes) {
        return position = Math.round(position), mayParseLabeledStatementInstead > position ? mayParseLabeledStatementInstead : position > opt_attributes ? opt_attributes : position;
      }
      /**
       * @param {number} max
       * @param {number} mayParseLabeledStatementInstead
       * @param {number} min
       * @return {?}
       */
      function clamp(max, mayParseLabeledStatementInstead, min) {
        return mayParseLabeledStatementInstead > max ? mayParseLabeledStatementInstead : max > min ? min : max;
      }
      /**
       * @param {string} arg
       * @return {?}
       */
      function change(arg) {
        return arg.length && "%" === arg.charAt(arg.length - 1) ? value(parseFloat(arg) / 100 * 255, 0, 255) : value(parseInt(arg, 10), 0, 255);
      }
      /**
       * @param {string} s
       * @return {?}
       */
      function trim(s) {
        return s.length && "%" === s.charAt(s.length - 1) ? clamp(parseFloat(s) / 100, 0, 1) : clamp(parseFloat(s), 0, 1);
      }
      /**
       * @param {number} a
       * @param {number} s
       * @param {number} b
       * @return {?}
       */
      function extend(a, s, b) {
        return 0 > b ? b += 1 : b > 1 && (b -= 1), 1 > 6 * b ? a + (s - a) * b * 6 : 1 > 2 * b ? s : 2 > 3 * b ? a + (s - a) * (2 / 3 - b) * 6 : a;
      }
      /**
       * @param {Array} value
       * @return {?}
       */
      function parseFloat(value) {
        /** @type {number} */
        var oldconfig = (parseFloat(value[0]) % 360 + 360) % 360 / 360;
        var s = trim(value[1]);
        var l = trim(value[2]);
        /** @type {number} */
        var settings = 0.5 >= l ? l * (s + 1) : l + s - l * s;
        /** @type {number} */
        var QUnit = 2 * l - settings;
        return[clamp(255 * extend(QUnit, settings, oldconfig + 1 / 3), 0, 255), clamp(255 * extend(QUnit, settings, oldconfig), 0, 255), clamp(255 * extend(QUnit, settings, oldconfig - 1 / 3), 0, 255)];
      }
      /**
       * @param {Array} a
       * @return {?}
       */
      function slice(a) {
        if (a) {
          var diff;
          var n;
          /** @type {number} */
          var r = a[0] / 255;
          /** @type {number} */
          var g = a[1] / 255;
          /** @type {number} */
          var b = a[2] / 255;
          /** @type {number} */
          var min = Math.min(r, g, b);
          /** @type {number} */
          var max = Math.max(r, g, b);
          /** @type {number} */
          var d = max - min;
          /** @type {number} */
          var u = (max + min) / 2;
          if (0 === d) {
            /** @type {number} */
            diff = 0;
            /** @type {number} */
            n = 0;
          } else {
            /** @type {number} */
            n = 0.5 > u ? d / (max + min) : d / (2 - max - min);
            /** @type {number} */
            var start = ((max - r) / 6 + d / 2) / d;
            /** @type {number} */
            var offset = ((max - g) / 6 + d / 2) / d;
            /** @type {number} */
            var end = ((max - b) / 6 + d / 2) / d;
            if (r === max) {
              /** @type {number} */
              diff = end - offset;
            } else {
              if (g === max) {
                /** @type {number} */
                diff = 1 / 3 + start - end;
              } else {
                if (b === max) {
                  /** @type {number} */
                  diff = 2 / 3 + offset - start;
                }
              }
            }
            if (0 > diff) {
              diff += 1;
            }
            if (diff > 1) {
              diff -= 1;
            }
          }
          return[360 * diff, n, u];
        }
      }
      /**
       * @param {string} path
       * @return {?}
       */
      function init(path) {
        if (path) {
          path += "";
          /** @type {string} */
          var text = path.replace(/ /g, "").toLowerCase();
          if ("#" !== text.charAt(0)) {
            /** @type {number} */
            var pos = text.indexOf("(");
            /** @type {number} */
            var offset = text.indexOf(")");
            if (-1 !== pos && offset + 1 === text.length) {
              /** @type {string} */
              var header = text.substr(0, pos);
              /** @type {Array.<string>} */
              var initial = text.substr(pos + 1, offset - (pos + 1)).split(",");
              switch(header) {
                case "rgb":
                  if (3 !== initial.length) {
                    return;
                  }
                  return[change(initial[0]), change(initial[1]), change(initial[2])];
                case "hsl":
                  if (3 !== initial.length) {
                    return;
                  }
                  return parseFloat(initial);
                default:
                  return;
              }
            }
          } else {
            if (4 === text.length) {
              /** @type {number} */
              var weeks = parseInt(text.substr(1), 16);
              if (!(weeks >= 0 && 4095 >= weeks)) {
                return;
              }
              return[(3840 & weeks) >> 4 | (3840 & weeks) >> 8, 240 & weeks | (240 & weeks) >> 4, 15 & weeks | (15 & weeks) << 4];
            }
            if (7 === text.length) {
              if (weeks = parseInt(text.substr(1), 16), !(weeks >= 0 && 16777215 >= weeks)) {
                return;
              }
              return[(16711680 & weeks) >> 16, (65280 & weeks) >> 8, 255 & weeks];
            }
          }
        }
      }
      /**
       * @param {Array} object
       * @return {?}
       */
      function serialize(object) {
        /** @type {Array} */
        var e = [(+object[0]).toFixed(0), (+object[1]).toFixed(0), (+object[2]).toFixed(0)];
        return((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1);
      }
      /**
       * @param {Array} failing_message
       * @return {?}
       */
      function report(failing_message) {
        /** @type {Array} */
        var dig = [failing_message[0].toFixed(0), (100 * failing_message[1]).toFixed(0) + "%", (100 * failing_message[2]).toFixed(0) + "%"];
        return "hsl(" + dig.join(",") + ")";
      }
      /**
       * @param {string} data
       * @param {string} format
       * @return {?}
       */
      function format(data, format) {
        if (data) {
          var value = "Array" == isString(data) ? data : init(data);
          switch(format) {
            case "rgb":
              return format + "(" + value.join(",") + ")";
            case "hex":
              return "#" + serialize(value);
            case "hsl":
              return report(slice(value));
          }
        }
      }
      if ("undefined" != typeof getComputedStyle) {
        var bind = function() {
          return window.addEventListener ? function(o, evtName, evtHandler) {
            o.addEventListener(evtName, evtHandler);
          } : function(object, sEvent, fpNotify) {
            object.attachEvent("on" + sEvent, fpNotify);
          };
        }();
        var cb = function() {
          return window.addEventListener ? function(event) {
            event.stopPropagation();
          } : function(evt) {
            /** @type {boolean} */
            evt.cancelBubble = true;
          };
        }();
        var objectToString = function() {
          return window.addEventListener ? function(types) {
            types.preventDefault();
          } : function(ev) {
            /** @type {boolean} */
            ev.returnValue = false;
          };
        }();
        /** @type {function (this:*): string} */
        var ostring = Object.prototype.toString;
        /**
         * @param {string} o
         * @return {?}
         */
        var isString = function(o) {
          return null === o ? "Null" : void 0 === o ? "Undefined" : ostring.call(o).slice(8, -1);
        };
        /**
         * @param {string} arr
         * @param {string} obj
         * @return {?}
         */
        var indexOf = function(arr, obj) {
          if (!arr) {
            return-1;
          }
          if (arr.indexOf) {
            return arr.indexOf(obj);
          }
          var i = arr.length;
          for (;i--;) {
            if (arr[i] === obj) {
              return i;
            }
          }
        };
        /**
         * @param {Element} element
         * @param {Object} e
         * @return {?}
         */
        var f = function(element, e) {
          if (e = e || window.event, null != e.NyanX) {
            return e;
          }
          var result = e.type;
          var remaining = result && indexOf(result, "touch") >= 0;
          if (remaining) {
            var touch = "touchend" != result ? e.targetTouches[0] : e.changedTouches[0];
            if (touch) {
              var bounds = getBounds(element);
              /** @type {number} */
              e.NyanX = touch.clientX - bounds.left;
              /** @type {number} */
              e.NyanY = touch.clientY - bounds.top;
            }
          } else {
            var o = getBounds(element);
            /** @type {number} */
            e.NyanX = e.clientX - o.left;
            /** @type {number} */
            e.NyanY = e.clientY - o.top;
            /** @type {number} */
            e.NyanDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
          }
          return e;
        };
        var defaults = {
          width : 320,
          height : 200,
          zIndex : 10002,
          backgroundColor : "#444",
          wrapShadow : "3px 3px 4px rgba(0, 0, 0, 0.4)",
          color : "#66ccff",
          picker : {
            left : 0.05,
            top : 0.15,
            width : 0.4,
            height : 0.65,
            size : 10,
            color : "#000",
            lineWidth : 1
          },
          slider : {
            left : 0.5,
            top : 0.15,
            width : 0.05,
            height : 0.65
          },
          rgbBox : {
            label : ["R:", "G:", "B:"],
            font : "12px Microsoft YaHei",
            color : "#FFFEFA",
            gap : 8,
            type : "number",
            labelWidth : 15,
            inputWidth : 36,
            left : 0.6,
            top : 0.15
          },
          hslBox : {
            label : ["H:", "S:", "L:"],
            font : "12px Microsoft YaHei",
            color : "#FFFEFA",
            gap : 8,
            type : "number",
            labelWidth : 15,
            inputWidth : 36,
            left : 0.78,
            top : 0.15
          },
          hexBox : {
            label : ["#"],
            font : "12px Microsoft YaHei",
            color : "#FFFEFA",
            labelWidth : 15,
            inputWidth : 60,
            left : 0.03,
            top : 0.85
          },
          colorBox : {
            left : 0.63,
            top : 0.6,
            width : 0.32,
            height : 0.2
          },
          okBtn : {
            text : "确定",
            backgroundColor : "#6C6C6C",
            color : "#FFFEFA",
            font : "12px Microsoft YaHei",
            left : 0.65,
            top : 0.87,
            width : 0.12,
            height : 0.1
          },
          cancelBtn : {
            text : "取消",
            backgroundColor : "#6C6C6C",
            color : "#FFFEFA",
            font : "12px Microsoft YaHei",
            left : 0.83,
            top : 0.87,
            width : 0.12,
            height : 0.1
          }
        };
        /**
         * @param {Element} layer
         * @param {?} name
         * @return {undefined}
         */
        var Sprite = function(layer, name) {
          apply(this, name);
          this.background = fn(layer, name);
          this.layer = fn(layer, name);
          /** @type {number} */
          this.H = 0;
          /** @type {number} */
          this.S = 0;
          initialize(this, this.layer);
          this.paintBG();
        };
        Sprite.prototype = {
          /** @type {function (Element, ?): undefined} */
          constructor : Sprite,
          /**
           * @return {undefined}
           */
          paintBG : function() {
            var canvas = this.background;
            var _context = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;
            var value = _context.createLinearGradient(0, 0, width, 0);
            /** @type {number} */
            var core_rnotwhite = 0;
            for (;1 > core_rnotwhite;core_rnotwhite += 1 / 6) {
              value.addColorStop(core_rnotwhite, "hsl(" + 360 * core_rnotwhite + " , 100%, 50%)");
            }
            _context.fillStyle = value;
            _context.fillRect(0, 0, width, height);
            value = _context.createLinearGradient(0, 0, 0, height);
            value.addColorStop(0, "hsla(0, 0%, 50%, 0)");
            value.addColorStop(1, "hsla(0, 0%, 50%, 1)");
            _context.fillStyle = value;
            _context.fillRect(0, 0, width, height);
          },
          /**
           * @param {?} e
           * @param {?} end
           * @return {undefined}
           */
          _onmousemove : function(e, end) {
            var target = this.layer;
            var targets = $(target);
            var size = add(target);
            /** @type {number} */
            this.H = e / targets * 360;
            /** @type {number} */
            this.S = (size - end) / size;
          },
          /**
           * @return {undefined}
           */
          updatePoint : function() {
            var canvas = this.layer;
            var c = canvas.getContext("2d");
            var half = this.size;
            var cvs = $(canvas);
            var height = add(canvas);
            /** @type {number} */
            var x = this.H * cvs / 360;
            /** @type {number} */
            var y = height - this.S * height;
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.beginPath();
            c.moveTo(x - half, y);
            c.lineTo(x + half, y);
            c.moveTo(x, y - half);
            c.lineTo(x, y + half);
            /** @type {string} */
            c.strokeStyle = "black";
            /** @type {number} */
            c.lineWidth = 2;
            c.stroke();
          },
          /**
           * @param {Array} easing
           * @return {undefined}
           */
          update : function(easing) {
            this.H = easing[0];
            this.S = easing[1];
            this.updatePoint();
          }
        };
        /**
         * @param {Element} el
         * @param {?} name
         * @return {undefined}
         */
        var Timer = function(el, name) {
          apply(this, name);
          this.background = fn(el, name);
          this.layer = fn(el, name);
          /** @type {number} */
          this.L = 0.5;
          initialize(this, this.layer);
        };
        Timer.prototype = {
          /** @type {function (Element, ?): undefined} */
          constructor : Timer,
          /**
           * @param {Array} checkElement
           * @return {undefined}
           */
          paintBG : function(checkElement) {
            var canvas = this.background;
            var glowContext = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;
            var gradient = glowContext.createLinearGradient(0, 0, 0, height);
            clear_canvas(canvas);
            gradient.addColorStop(0, "#fff");
            gradient.addColorStop(0.5, "hsl(" + (+checkElement[0]).toFixed(0) + ", " + (100 * checkElement[1]).toFixed(0) + "%, 50%)");
            gradient.addColorStop(1, "#000");
            glowContext.fillStyle = gradient;
            glowContext.fillRect(0, 0, width, height);
          },
          /**
           * @param {?} e
           * @param {?} min
           * @return {undefined}
           */
          _onmousemove : function(e, min) {
            var label = this.layer;
            var max = add(label);
            /** @type {number} */
            this.L = (max - min) / max;
          },
          /**
           * @param {?} n
           * @return {undefined}
           */
          updatePoint : function(n) {
            var canvas = this.layer;
            var ctx = canvas.getContext("2d");
            var test_canvas = add(canvas);
            /** @type {number} */
            var top = test_canvas - this.L * test_canvas;
            var c = parseFloat(n);
            var i = c.length;
            for (;i--;) {
              /** @type {string} */
              c[i] = (255 - c[i]).toFixed(0);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, top + 0.5);
            ctx.lineTo(canvas.width, top + 0.5);
            ctx.strokeStyle = format(c, "hex");
            /** @type {number} */
            ctx.lineWidth = 3;
            ctx.stroke();
          },
          /**
           * @param {Array} element
           * @return {undefined}
           */
          update : function(element) {
            this.L = element[2];
            this.paintBG(element);
            this.updatePoint(element);
          }
        };
        /**
         * @param {Element} element
         * @param {Object} options
         * @return {undefined}
         */
        var Tooltip = function(element, options) {
          var el = this;
          this.box = animate(element, options);
          bind(this.box, "input", function(ev) {
            ev.target.value = value(ev.target.value, 0, 255);
            if (el.oninput) {
              el.oninput(ev);
            }
          });
        };
        Tooltip.prototype = {
          /** @type {function (Element, Object): undefined} */
          constructor : Tooltip,
          /**
           * @return {?}
           */
          getRGB : function() {
            var nodes = this.box.childNodes;
            return "rgb(" + nodes[0].childNodes[1].value + ", " + nodes[1].childNodes[1].value + ", " + nodes[2].childNodes[1].value + ")";
          },
          /**
           * @return {?}
           */
          getRGBArr : function() {
            var nodes = this.box.childNodes;
            return[nodes[0].childNodes[1].value, nodes[1].childNodes[1].value, nodes[2].childNodes[1].value];
          },
          /**
           * @param {Array} easing
           * @return {undefined}
           */
          update : function(easing) {
            var nodes = this.box.childNodes;
            var number = parseFloat(easing);
            /** @type {number} */
            var i = 0;
            var n = number.length;
            for (;n > i;i++) {
              /** @type {string} */
              nodes[i].childNodes[1].value = (+number[i]).toFixed(0);
            }
          }
        };
        /**
         * @param {Element} element
         * @param {Object} options
         * @return {undefined}
         */
        var Node = function(element, options) {
          var el = this;
          this.box = animate(element, options);
          var nodes = this.box.childNodes;
          bind(nodes[0].childNodes[1], "input", function(ev) {
            ev.target.value = value(ev.target.value, 0, 360);
            if (el.oninput) {
              el.oninput(ev);
            }
          });
          bind(nodes[1].childNodes[1], "input", function(ev) {
            ev.target.value = value(ev.target.value, 0, 100);
            if (el.oninput) {
              el.oninput(ev);
            }
          });
          bind(nodes[2].childNodes[1], "input", function(ev) {
            ev.target.value = value(ev.target.value, 0, 100);
            if (el.oninput) {
              el.oninput(ev);
            }
          });
        };
        Node.prototype = {
          /** @type {function (Element, Object): undefined} */
          constructor : Node,
          /**
           * @return {?}
           */
          getHSL : function() {
            var nodes = this.box.childNodes;
            return "hsl(" + nodes[0].childNodes[1].value + ", " + nodes[1].childNodes[1].value + "%, " + nodes[2].childNodes[1].value + "% )";
          },
          /**
           * @return {?}
           */
          getHSLArr : function() {
            var nodes = this.box.childNodes;
            return[nodes[0].childNodes[1].value, nodes[1].childNodes[1].value / 100, nodes[2].childNodes[1].value / 100];
          },
          /**
           * @param {Array} easing
           * @return {undefined}
           */
          update : function(easing) {
            var nodes = this.box.childNodes;
            /** @type {number} */
            var x = 0;
            var cnl = easing.length;
            for (;cnl > x;x++) {
              /** @type {string} */
              nodes[x].childNodes[1].value = (x > 0 ? 100 * easing[x] : +easing[x]).toFixed(0);
            }
          }
        };
        /**
         * @param {Element} element
         * @param {Object} options
         * @return {undefined}
         */
        var Plugin = function(element, options) {
          var el = this;
          this.box = animate(element, options);
          var nodes = this.box.childNodes;
          bind(nodes[0].childNodes[1], "input", function(ev) {
            ev.target.value = ev.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
            var cnl = ev.target.value.length;
            if (6 == cnl) {
              if (el.oninput) {
                el.oninput(ev);
              }
            }
          });
        };
        Plugin.prototype = {
          /** @type {function (Element, Object): undefined} */
          constructor : Plugin,
          /**
           * @return {?}
           */
          getHEX : function() {
            return "#" + this.box.childNodes[0].childNodes[1].value;
          },
          /**
           * @param {Array} easing
           * @return {undefined}
           */
          update : function(easing) {
            var nodes = this.box.childNodes;
            nodes[0].childNodes[1].value = serialize(parseFloat(easing));
          }
        };
        /**
         * @param {Element} ctxt
         * @param {Object} options
         * @return {undefined}
         */
        var render = function(ctxt, options) {
          this.btn = start(ctxt, options);
          var style = this.btn.style;
          this.btn.innerHTML = options.text;
          style.font = options.font;
          /** @type {string} */
          style.lineHeight = add(ctxt) * options.height + "px";
          /** @type {string} */
          style.textAlign = "center";
          style.backgroundColor = options.backgroundColor;
          style.color = options.color;
          /** @type {string} */
          style.cursor = "pointer";
        };
        /**
         * @param {Element} id
         * @param {Object} conf
         * @return {undefined}
         */
        var Test = function(id, conf) {
          this.box = start(id, conf);
          /** @type {string} */
          this.box.style.backgroundColor = "#000";
        };
        Test.prototype = {
          /** @type {function (Element, Object): undefined} */
          constructor : Test,
          /**
           * @param {Array} easing
           * @return {undefined}
           */
          update : function(easing) {
            var tokenized = parseFloat(easing);
            var index = tokenized.length;
            for (;index--;) {
              /** @type {string} */
              tokenized[index] = (+tokenized[index]).toFixed(0);
            }
            /** @type {string} */
            this.box.style.backgroundColor = "rgb(" + tokenized[0] + ", " + tokenized[1] + ", " + tokenized[2] + ")";
          }
        };
        /**
         * @param {Object} value
         * @return {undefined}
         */
        var module = function(value) {
          value = value || {};
          this.param = apply(value, defaults);
          /** @type {boolean} */
          this.inited = false;
          self.xh5_EvtDispatcher.call(this);
        };
        return module.prototype = {
          /** @type {function (Object): undefined} */
          constructor : module,
          /**
           * @return {undefined}
           */
          init : function() {
            if (!this.inited) {
              var opts = this.param;
              var callback = slice(init(opts.color));
              this._initDoms(opts);
              this._initEvent();
              this.update(callback);
              document.body.appendChild(this.wrap);
              /** @type {boolean} */
              this.inited = true;
            }
          },
          /**
           * @param {Object} options
           * @return {undefined}
           */
          _initDoms : function(options) {
            /** @type {Element} */
            var name = document.createElement("div");
            /** @type {(CSSStyleDeclaration|null)} */
            var style = name.style;
            /** @type {string} */
            style.position = "absolute";
            /** @type {string} */
            style.width = options.width + "px";
            /** @type {string} */
            style.height = options.height + "px";
            style.zIndex = options.zIndex;
            style.backgroundColor = options.backgroundColor;
            style.boxShadow = options.wrapShadow;
            /** @type {string} */
            style.transition = "opacity 0.2s ease-in-out 0s";
            /** @type {number} */
            style.opacity = 0;
            /** @type {string} */
            style.visibility = "hidden";
            /** @type {string} */
            style.userSelect = "none";
            /** @type {string} */
            style.webkitUserSelect = "none";
            /** @type {string} */
            style.msUserSelect = "none";
            /** @type {string} */
            style.mosUserSelect = "none";
            /** @type {Element} */
            this.wrap = name;
            this.picker = new Sprite(name, options.picker);
            this.slider = new Timer(name, options.slider);
            this.rgbBox = new Tooltip(name, options.rgbBox);
            this.hslBox = new Node(name, options.hslBox);
            this.hexBox = new Plugin(name, options.hexBox);
            this.colorBox = new Test(name, options.colorBox);
            this.okBtn = new render(name, options.okBtn);
            this.cancelBtn = new render(name, options.cancelBtn);
          },
          /**
           * @return {undefined}
           */
          _initEvent : function() {
            /**
             * @param {Event} e
             * @return {undefined}
             */
            function mouseup(e) {
              /** @type {boolean} */
              N = true;
              /** @type {number} */
              r = +s.left.replace(/[^0-9.]/g, "");
              /** @type {number} */
              now = +s.top.replace(/[^0-9.]/g, "");
              if (e.targetTouches) {
                startX = e.targetTouches[0].clientX;
                initialY = e.targetTouches[0].clientY;
              } else {
                startX = e.clientX;
                initialY = e.clientY;
              }
            }
            /**
             * @param {Event} e
             * @return {undefined}
             */
            function onTouchMove(e) {
              if (N) {
                if (e.targetTouches) {
                  /** @type {number} */
                  deltaX = e.targetTouches[0].clientX - startX;
                  /** @type {number} */
                  milliSeconds = e.targetTouches[0].clientY - initialY;
                } else {
                  /** @type {number} */
                  deltaX = e.clientX - startX;
                  /** @type {number} */
                  milliSeconds = e.clientY - initialY;
                }
                /** @type {string} */
                s.left = +r + +deltaX + "px";
                /** @type {string} */
                s.top = +now + +milliSeconds + "px";
                cb(e);
              }
              objectToString(e);
            }
            /**
             * @return {undefined}
             */
            function preventClick() {
              /** @type {boolean} */
              N = false;
            }
            var r;
            var now;
            var startX;
            var initialY;
            var deltaX;
            var milliSeconds;
            var self = this;
            var wrap = this.wrap;
            var e = this.picker;
            var slider = this.slider;
            var addBox = this.rgbBox;
            var input = this.hslBox;
            var source = this.hexBox;
            var d = this.okBtn;
            var childMethod = this.cancelBtn;
            var s = wrap.style;
            /** @type {boolean} */
            var N = false;
            if ("ontouchend" in window) {
              bind(wrap, "touchstart", mouseup);
              bind(wrap, "touchmove", onTouchMove);
              bind(wrap, "touchend", preventClick);
            } else {
              bind(wrap, "mousedown", mouseup);
              bind(wrap, "mousemove", onTouchMove);
              bind(wrap, "mouseup", preventClick);
              bind(wrap, "mouseout", preventClick);
            }
            /**
             * @return {undefined}
             */
            e.onmousemove = function() {
              self.update([e.H, e.S, slider.L]);
            };
            /**
             * @return {undefined}
             */
            slider.onmousemove = function() {
              self.update([e.H, e.S, slider.L]);
            };
            /**
             * @return {undefined}
             */
            input.oninput = function() {
              self.update(input.getHSLArr());
            };
            /**
             * @return {undefined}
             */
            addBox.oninput = function() {
              self.update(slice(addBox.getRGBArr()));
            };
            /**
             * @return {undefined}
             */
            source.oninput = function() {
              self.update(source.getHEX());
            };
            bind(d.btn, "click", function() {
              self.hide();
              self.re("ok", [{
                rgb : addBox.getRGB(),
                hsl : input.getHSL(),
                hex : format(input.getHSL(), "hex")
              }, self.target]);
              if (self.onok) {
                self.onok({
                  rgb : addBox.getRGB(),
                  hsl : input.getHSL(),
                  hex : format(input.getHSL(), "hex")
                }, self.target);
              }
            });
            bind(childMethod.btn, "click", function() {
              self.hide();
            });
          },
          /**
           * @param {number} y
           * @param {number} height
           * @param {Object} target
           * @param {Array} callback
           * @return {undefined}
           */
          show : function(y, height, target, callback) {
            if (!this.inited) {
              this.init();
            }
            var wrap = this.wrap;
            var s = wrap.style;
            /** @type {string} */
            s.left = (y ? y : 0) + "px";
            /** @type {string} */
            s.top = (height ? height : 0) + "px";
            /** @type {string} */
            s.visibility = "visible";
            /** @type {number} */
            s.opacity = 1;
            if (callback) {
              this.update(callback);
            }
            /** @type {Object} */
            this.target = target;
          },
          /**
           * @return {undefined}
           */
          hide : function() {
            if (this.inited) {
              var wrap = this.wrap;
              var css = wrap.style;
              /** @type {string} */
              css.visibility = "hidden";
              /** @type {number} */
              css.opacity = 0;
            }
          },
          /**
           * @param {(Array|string)} cb
           * @return {undefined}
           */
          update : function(cb) {
            var callback = "Array" == isString(cb) ? cb : slice(init(cb));
            this.picker.update(callback);
            this.slider.update(callback);
            this.rgbBox.update(callback);
            this.hslBox.update(callback);
            this.hexBox.update(callback);
            this.colorBox.update(callback);
          }
        }, compile(module, self.xh5_EvtDispatcher), new module;
      }
    }();
  };
});
