var xh5_define;
var KKE = KKE || {};
~function(x) {
  /**
   * @param {string} pluginUrl eg:"plugins.sinaTKChart.get"
   * @param {Object} symbolObj eg:{symbol: "hf_SI", dom_id: "box-flash-wrap"}
   * @param {?} done
   * @return {?}
   */
  function api(pluginUrl, symbolObj, done) {
    if (!$.isStr(pluginUrl)) {
      return void $.err(done, [config.CMD_UNEXIST, pluginUrl].join(":"));
    }
    symbolObj = symbolObj || {};
    var vals = pluginUrl.split(".");
    var action = vals.splice(vals.length - 1, vals.length).join("");
    var pluginName = vals.splice(vals.length - 1, vals.length).join("");
    var namespaces = vals.splice(0, vals.length);
    var ret = namespaces.join(".");
    /** @type {string} */
    var core_rnotwhite = [ret, pluginName].join(".");
    // 获取依赖
    options.relyCall(core_rnotwhite, function() {
      var old = options.modsTree;
      var parent = void 0;
      do {
        var name = namespaces.shift();
        if (parent = parent ? parent[name] : old[name], !parent) {
          return void $.err(done, [config.MOD_ERR, pluginName].join(":"));
        }
      } while (namespaces.length);
      var row = parent[pluginName] || {};
      var args = row.entity || {};
      var test = args[action];
      if ("undefined" == typeof test) {
        $.err(done, [config.CMD_UNEXIST, pluginUrl].join(":"));
      } else {
        if ($.isFunc(test)) {
          test(symbolObj, done);
        } else {
          if ($.isFunc(done)) {
            done(test);
          }
        }
      }
    }, symbolObj.modUrl || null);
  }
  var node;
  var accept;
  var config = {
    SDK_REG : new RegExp("sdk.js", i),
    isLocal : false,
    isDebug : false,
    isSSL : false,
    custom_mod_url : void 0,
    MOD_URL : "js/$moduleName.js",
    MOD_URL_PROD : "./sinafinancesdk/js/$moduleName.js",//http://finance.sina.com.cn
    MOD_URL_PROD_S : "./sinafinancesdk/js/$moduleName.js",//https://ssl-finance.sina.com.cn/sinafinancesdk/js
    /**
     * @return {?}
     */
    getModUrl : function() {
      var url = this.custom_mod_url ? this.custom_mod_url + "/$moduleName.js" : this.isLocal;
        url = url ? this.MOD_URL : this.isSSL;
        url = url ? this.MOD_URL_PROD_S : this.MOD_URL_PROD;
      return  url;
    },
    CMD_404 : "error occured while loading",
    CMD_UNEXIST : "calling nonexistent API",
    MOD_ERR : "erroneous module",
    MOD_DEF_ERR : "illegal module",
    DEP_ERR : "error def module"
  };
  /** @type {NodeList} */
  var scripts = document.getElementsByTagName("script");
  /** @type {number} */
  var i = scripts.length;
  for (;i--;) {
    if (node = scripts[i], accept = node.src || "", config.SDK_REG.test(accept)) {
      var option;
      var idx = node.attributes.length;
      for (;idx--;) {
        option = node.attributes[idx];
        if ("ssl" == option.name) {
          /** @type {boolean} */
          config.isSSL = "true" == option.value;
        }
        if ("debug" == option.name) {
          /** @type {boolean} */
          config.isDebug = "true" == option.value;
        }
        if ("local" == option.name) {
          /** @type {boolean} */
          config.isLocal = "true" == option.value;
        }
        if ("murl" == option.name) {
          config.custom_mod_url = option.value;
        }
      }
      break;
    }
  }
  if (0 == location.protocol.indexOf("https:")) {
    /** @type {boolean} */
    config.isSSL = true;
  }
  var $ = new function() {
    /**
     * @param {string} path
     * @param {Array} opt_callback
     * @param {?} cb
     * @param {string} charset
     * @return {undefined}
     */
    function load(path, opt_callback, cb, charset) {
      /** @type {boolean} */
      var i = false;
      /** @type {Element} */
      var el = document.createElement("script");
      var insertAt = document.getElementsByTagName("script")[0];
      var head = document.head || (document.getElementsByTagName("head")[0] || document.documentElement);
      var insertBeforeEl = head.getElementsByTagName("base")[0];
      el.charset = charset || "UTF-8";
      /** @type {string} */
      el.src = path;
      /** @type {boolean} */
      el.async = true;
      /** @type {function (): undefined} */
      el.onload = el.onreadystatechange = function() {
        if (!i) {
          if (!(el.readyState && !/loaded|complete/.test(String(el.readyState)))) {
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
        if ("function" == typeof cb) {
          cb();
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
     * @param {Function} fn
     * @param {?} opt_context
     * @return {?}
     */
    this.fBind = function(fn, opt_context) {
      /** @type {Array.<?>} */
      var args = Array.prototype.slice.call(arguments, 2);
      return function() {
        return fn.apply(opt_context, args.concat(Array.prototype.slice.call(arguments)));
      };
    };
    /**
     * @param {string} type
     * @return {?}
     */
    var isType = function(type) {
      return function(next_scope) {
        return{}.toString.call(next_scope) == "[object " + type + "]";
      };
    };
    this.isStr = isType("String");
    this.isFunc = isType("Function");
    this.isArr = isType("Array");
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
     * @param {?} cb
     * @param {string} msg
     * @return {undefined}
     */
    this.err = function(cb, msg) {
      if (this.isFunc(cb)) {
        cb({
          msg : msg,
          data : null
        });
      }
      this.trace.error(msg);
    };
    /** @type {function (string, Array, ?, string): undefined} */
    this.load = load;
  };
  /** @type {Array} */
  var tags = ["datas.hq", "datas.k", "datas.t", "utils.util"];
  var options = new function() {
    /**
     * @param {string} path
     * @param {Array} tokens
     * @param {?} file
     * @return {?}
     */
    function build(path, tokens, file) {
      if (3 != arguments.length) {
        return void $.trace.error(config.MOD_DEF_ERR, path);
      }
      var result = process(path);
      var old = result[0];
      var name = result[1];
      var value = old[name];
      if (value) {
        /** @type {boolean} */
        value.init = true;
      } else {
        value = old[name] = {
          init : true,
          name : path,
          funcQ : [],
          entity : void 0
        };
      }
      if ($.isStr(tokens)) {
        /** @type {Array} */
        tokens = [tokens];
      }
      var token;
      var i = tokens.length;
      for (;i--;) {
        if (token = tokens[i], token.indexOf("*") > -1) {
          tokens.splice(i, 1);
          var vals = token.split(".");
          vals.splice(vals.length - 1, vals.length);
          var element = vals.join(".");
          tokens = tokens.concat(flatten(element, path));
          break;
        }
      }
      expect(tokens, tokens.slice(0), value, file);
    }
    var results = {};
    /**
     * @param {string} arg
     * @return {?}
     */
    var process = function(arg) {
      var tmp;
      var vals = arg.split(".");
      var segs = vals.splice(vals.length - 1, vals.length).join("");
      var namespaces = vals.splice(0, vals.length);
      var a = namespaces.join(".");
      var fn = void 0;
      for (;namespaces.length;) {
        var context = namespaces.shift();
        if (fn) {
          tmp = fn[context];
          if (!tmp) {
            tmp = fn[context] = {};
          }
        } else {
          tmp = results[context];
          if (!tmp) {
            tmp = results[context] = {};
          }
        }
        fn = tmp;
      }
      return[fn, segs, a];
    };
    /**
     * @param {?} stream
     * @return {undefined}
     */
    var flush = function(stream) {
      for (;stream.funcQ.length;) {
        var i = stream.funcQ.shift();
        if ($.isFunc(i)) {
          i();
        }
      }
    };
    /**
     * @param {Array} errors
     * @return {?}
     */
    var error = function(errors) {
      if (!errors) {
        return null;
      }
      /** @type {Array} */
      var count = [];
      /** @type {Array} */
      var _results = [];
      /** @type {number} */
      var i = 0;
      var l = errors.length;
      for (;l > i;i++) {
        var a;
        var sorted = errors[i].split(".");
        var b = void 0;
        for (;sorted.length;) {
          if (a = sorted.shift(), b = b ? b[a] : results[a], !b) {
            $.trace.error(config.DEP_ERR, sorted.toString());
            break;
          }
        }
        _results.push(b.entity);
        count.push(a);
      }
      return{
        n : count,
        e : _results
      };
    };
    /**
     * @param {?} data
     * @param {Function} callback
     * @param {Array} errors
     * @return {undefined}
     */
    var done = function(data, callback, errors) {
      var types = callback.toString();
      /** @type {boolean} */
      var l = 0 == types.indexOf("function");
      if (l) {
        var s = error(errors);
        var points = callback.apply(null, s.e.concat(results));
        data.entity = $.isFunc(points) ? new points : points;
      } else {
        /** @type {Function} */
        data.entity = callback;
      }
      flush(data);
    };
    /**
     * @param {Array} obj
     * @param {Array} parameters
     * @param {?} actual
     * @param {?} length
     * @return {undefined}
     */
    var expect = function(obj, parameters, actual, length) {
      if (parameters.length) {
        ready(parameters.shift(), $.fBind(expect, this, obj, parameters, actual, length));
      } else {
        done(actual, length, obj);
      }
    };
    /**
     * @param {Function} opts
     * @param {string} data
     * @param {string} nativeEvent
     * @return {undefined}
     */
    var initialize = function(opts, data, nativeEvent) {
      data = data.replace(/\./g, "/");
      if (nativeEvent) {
        nativeEvent += "$moduleName.js";
      }
      var handle = nativeEvent || config.getModUrl();
      $.load(handle.replace("$moduleName", data), null, $.fBind($.trace.error, this, config.CMD_404, opts.name));
    };
    /**
     * @param {string} pluginName
     * @param {string} event
     * @return {?}
     */
    var start = function(pluginName, event) {
      if ($.isArr(pluginName)) {
        pluginName = pluginName.join(".");
      }
      var items = process(pluginName);
      var values = items[0];
      var name = items[1];
      var value = values[name];
      return value || (value = {
        init : false,
        name : pluginName,
        funcQ : [],
        entity : void 0
      }, values[name] = value, initialize(value, pluginName, event)), value;
    };
    /**
     * @param {?} target
     * @param {string} src
     * @return {?}
     */
    var flatten = function(target, src) {
      var tag;
      /** @type {Array} */
      var result = [];
      /** @type {number} */
      var index = tags.length;
      for (;index--;) {
        tag = tags[index];
        if (0 == tag.indexOf(target)) {
          if (-1 == tag.indexOf(src)) {
            result[result.length] = tag;
          }
        }
      }
      return result;
    };
    /**
     * @param {string} socket
     * @param {Function} callback
     * @param {string} key
     * @return {undefined}
     */
    var ready = function(socket, callback, key) {
      var index = start(socket, key);
      if ($.isFunc(callback)) {
        if (index.init) {
          callback();
        } else {
          index.funcQ.push(callback);
        }
      }
    };
    this.modsTree = results;
    /** @type {function (string, Function, string): undefined} */
    this.relyCall = ready;
    /** @type {function (string, Array, ?): ?} */
    xh5_define = build;
  };
  /** @type {function (string, Object, ?): ?} */
  x.api = api;
  x.cls = {};
  /** @type {string} */
  x.istLL = "KKE|1.0.3|WANGXuan|SinaFinance|wangxuan2@staff.sina.com.cn";
}(KKE);
