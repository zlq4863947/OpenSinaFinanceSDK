xh5_define("plugins.paintSth", [], function() {
  /**
   * @param {Function} child
   * @param {Function} ctor
   * @return {undefined}
   */
  function inherits(child, ctor) {
    /**
     * @return {undefined}
     */
    var F = function() {
    };
    var exp = child.prototype;
    F.prototype = ctor.prototype;
    child.prototype = new F;
    var p;
    for (p in exp) {
      if (exp.hasOwnProperty(p)) {
        child.prototype[p] = exp[p];
      }
    }
    /** @type {Function} */
    child.prototype.constructor = child;
  }
  /**
   * @param {Object} b
   * @param {Object} data
   * @return {?}
   */
  function fn(b, data) {
    var out = clone(b);
    var key;
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        if ("Object" === isArray(data[key])) {
          if (!out[key]) {
            out[key] = {};
          }
          out[key] = fn(out[key], data[key]);
        } else {
          out[key] = data[key];
        }
      }
    }
    return out;
  }
  /**
   * @param {number} val
   * @return {?}
   */
  function isArray(val) {
    return null === val ? "Null" : void 0 === val ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
  }
  /**
   * @param {Event} event
   * @param {Element} n
   * @return {?}
   */
  function f(event, n) {
    var tx = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
    var y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
    var pos = n.getBoundingClientRect();
    return[tx - pos.left, y - pos.top];
  }
  /**
   * @param {Object} obj
   * @param {boolean} deepDataAndEvents
   * @return {?}
   */
  function clone(obj, deepDataAndEvents) {
    var group;
    var keys = isArray(obj);
    if ("Object" === keys) {
      group = {};
    } else {
      if ("Array" !== keys) {
        return obj;
      }
      /** @type {Array} */
      group = [];
    }
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        group[key] = deepDataAndEvents && ("Object" === isArray(val) || "Array" === isArray(val)) ? clone(val, deepDataAndEvents) : val;
      }
    }
    return group;
  }
  /**
   * @return {?}
   */
  function init() {
    var context = document.createElement("canvas").getContext("2d");
    if (context) {
      /** @type {number} */
      var a = Math.ceil(window.devicePixelRatio || 1);
      var b = context.webkitBackingStorePixelRatio || 1;
      return a / b;
    }
    return 1;
  }
  /**
   * @return {?}
   */
  function makeCanvas() {
    if (!c) {
      /** @type {Element} */
      var test_canvas = document.createElement("canvas");
      c = test_canvas.getContext("2d");
    }
    return c;
  }
  /**
   * @param {Array} el
   * @param {Function} fn
   * @return {?}
   */
  function on(el, fn) {
    var max;
    var t;
    var idx;
    /** @type {number} */
    var i = -1;
    var len = el.length;
    if (1 === arguments.length) {
      for (;++i < len;) {
        if (null != (t = el[i]) && t >= t) {
          max = t;
          /** @type {number} */
          idx = i;
          break;
        }
      }
      for (;++i < len;) {
        if (null != (t = el[i])) {
          if (t > max) {
            max = t;
            /** @type {number} */
            idx = i;
          }
        }
      }
    } else {
      for (;++i < len;) {
        if (null != (t = fn ? fn.call(el, el[i], i) : el[i]) && t >= t) {
          max = t;
          /** @type {number} */
          idx = i;
          break;
        }
      }
      for (;++i < len;) {
        if (null != (t = fn ? fn.call(el, el[i], i) : el[i])) {
          if (t > max) {
            max = t;
            /** @type {number} */
            idx = i;
          }
        }
      }
    }
    return{
      index : idx,
      value : max
    };
  }
  /**
   * @param {Object} self
   * @return {?}
   */
  function loop(self) {
    if (!self) {
      return false;
    }
    var tmp = self.fillStyle;
    return null != tmp && "none" !== tmp;
  }
  /**
   * @param {CanvasRenderingContext2D} context
   * @return {?}
   */
  function run(context) {
    if (!context) {
      return false;
    }
    var color = context.strokeStyle;
    return null != color && ("none" !== color && context.lineWidth > 0);
  }
  /**
   * @return {undefined}
   */
  function Storage() {
    /** @type {string} */
    this.VERSION = "1.0.12";
    /**
     * @param {?} opt_default
     * @param {?} errback
     * @return {undefined}
     */
    this.get = function(opt_default, errback) {
      var e = new Game;
      errback(e);
    };
  }
  var c;
  var s = init();
  /** @type {number} */
  var x = 10;
  var p = function() {
    /** @type {Function} */
    var Entity = "undefined" == typeof Float32Array ? Array : Float32Array;
    var vec2 = {
      /**
       * @param {number} var_args
       * @param {number} minutes
       * @return {?}
       */
      create : function(var_args, minutes) {
        var ent = new Entity(2);
        return ent[0] = var_args || 0, ent[1] = minutes || 0, ent;
      },
      /**
       * @param {Array} to
       * @param {Array} from
       * @return {?}
       */
      copy : function(to, from) {
        return to[0] = from[0], to[1] = from[1], to;
      },
      /**
       * @param {Array} dataAndEvents
       * @return {?}
       */
      clone : function(dataAndEvents) {
        var ent = new Entity(2);
        return ent[0] = dataAndEvents[0], ent[1] = dataAndEvents[1], ent;
      },
      /**
       * @param {Array} res
       * @param {?} key
       * @param {?} value
       * @return {?}
       */
      set : function(res, key, value) {
        return res[0] = key, res[1] = value, res;
      },
      /**
       * @param {Array} vec0
       * @param {Array} v1
       * @param {Array} v2
       * @return {?}
       */
      add : function(vec0, v1, v2) {
        return vec0[0] = v1[0] + v2[0], vec0[1] = v1[1] + v2[1], vec0;
      },
      /**
       * @param {Array} dataAndEvents
       * @param {Array} deepDataAndEvents
       * @param {Array} mat0
       * @param {?} scalar
       * @return {?}
       */
      scaleAndAdd : function(dataAndEvents, deepDataAndEvents, mat0, scalar) {
        return dataAndEvents[0] = deepDataAndEvents[0] + mat0[0] * scalar, dataAndEvents[1] = deepDataAndEvents[1] + mat0[1] * scalar, dataAndEvents;
      },
      /**
       * @param {Array} subscript
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      sub : function(subscript, a, b) {
        return subscript[0] = a[0] - b[0], subscript[1] = a[1] - b[1], subscript;
      },
      /**
       * @param {Object} v
       * @return {?}
       */
      len : function(v) {
        return Math.sqrt(this.lenSquare(v));
      },
      /**
       * @param {Array} direction
       * @return {?}
       */
      lenSquare : function(direction) {
        return direction[0] * direction[0] + direction[1] * direction[1];
      },
      /**
       * @param {Array} lhs
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      mul : function(lhs, a, b) {
        return lhs[0] = a[0] * b[0], lhs[1] = a[1] * b[1], lhs;
      },
      /**
       * @param {Array} n
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      div : function(n, a, b) {
        return n[0] = a[0] / b[0], n[1] = a[1] / b[1], n;
      },
      /**
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      dot : function(a, b) {
        return a[0] * b[0] + a[1] * b[1];
      },
      /**
       * @param {Array} out
       * @param {Array} v
       * @param {number} s
       * @return {?}
       */
      scale : function(out, v, s) {
        return out[0] = v[0] * s, out[1] = v[1] * s, out;
      },
      /**
       * @param {Array} style
       * @param {Arguments} v
       * @return {?}
       */
      normalize : function(style, v) {
        var len = vec2.len(v);
        return 0 === len ? (style[0] = 0, style[1] = 0) : (style[0] = v[0] / len, style[1] = v[1] / len), style;
      },
      /**
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      distance : function(a, b) {
        return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
      },
      /**
       * @param {Array} a
       * @param {Array} b
       * @return {?}
       */
      distanceSquare : function(a, b) {
        return(a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
      },
      /**
       * @param {Array} vec0
       * @param {Array} vec
       * @return {?}
       */
      negate : function(vec0, vec) {
        return vec0[0] = -vec[0], vec0[1] = -vec[1], vec0;
      },
      /**
       * @param {Array} x
       * @param {Array} vec
       * @param {Array} vec2
       * @param {number} lerp
       * @return {?}
       */
      lerp : function(x, vec, vec2, lerp) {
        return x[0] = vec[0] + lerp * (vec2[0] - vec[0]), x[1] = vec[1] + lerp * (vec2[1] - vec[1]), x;
      },
      /**
       * @param {Array} node
       * @param {Array} chunk
       * @param {Array} deepDataAndEvents
       * @return {?}
       */
      applyTransform : function(node, chunk, deepDataAndEvents) {
        var c = chunk[0];
        var s = chunk[1];
        return node[0] = deepDataAndEvents[0] * c + deepDataAndEvents[2] * s + deepDataAndEvents[4], node[1] = deepDataAndEvents[1] * c + deepDataAndEvents[3] * s + deepDataAndEvents[5], node;
      },
      /**
       * @param {number} obj
       * @param {number} dataAndEvents
       * @param {Array} val
       * @return {?}
       */
      min : function(obj, dataAndEvents, val) {
        return obj[0] = Math.min(dataAndEvents[0], val[0]), obj[1] = Math.min(dataAndEvents[1], val[1]), obj;
      },
      /**
       * @param {number} obj
       * @param {number} dataAndEvents
       * @param {Array} val
       * @return {?}
       */
      max : function(obj, dataAndEvents, val) {
        return obj[0] = Math.max(dataAndEvents[0], val[0]), obj[1] = Math.max(dataAndEvents[1], val[1]), obj;
      },
      /**
       * @param {Array} mat1
       * @param {Array} mat0
       * @param {Array} dataAndEvents
       * @return {?}
       */
      pointProjToLine : function(mat1, mat0, dataAndEvents) {
        var v = vec2.create(dataAndEvents[0] - mat1[0], dataAndEvents[1] - mat1[1]);
        var normal = vec2.create(mat0[0] - mat1[0], mat0[1] - mat1[1]);
        var length = vec2.lenSquare(normal);
        var n = vec2.dot(normal, v);
        /** @type {number} */
        var d = n / length;
        var p = vec2.scale(vec2.create(), normal, d);
        return[mat1[0] + p[0], mat1[1] + p[1]];
      }
    };
    return vec2.length = vec2.len, vec2.lengthSquare = vec2.lenSquare, vec2.dist = vec2.distance, vec2.distSquare = vec2.distanceSquare, vec2;
  }();
  var console = function() {
    /**
     * @param {number} a
     * @return {?}
     */
    function isArray(a) {
      return a > -y && y > a;
    }
    /**
     * @param {number} x
     * @return {?}
     */
    function shift(x) {
      return x > y || -y > x;
    }
    /**
     * @param {number} obj
     * @param {number} deepDataAndEvents
     * @param {number} data
     * @param {number} object
     * @param {number} dataAndEvents
     * @return {?}
     */
    function clone(obj, deepDataAndEvents, data, object, dataAndEvents) {
      /** @type {number} */
      var dz = 1 - dataAndEvents;
      return dz * dz * (dz * obj + 3 * dataAndEvents * deepDataAndEvents) + dataAndEvents * dataAndEvents * (dataAndEvents * object + 3 * dz * data);
    }
    /**
     * @param {number} b
     * @param {number} a
     * @param {number} p
     * @param {number} x
     * @param {number} s
     * @return {?}
     */
    function text(b, a, p, x, s) {
      /** @type {number} */
      var c = 1 - s;
      return 3 * (((a - b) * c + 2 * (p - a) * s) * c + (x - p) * s * s);
    }
    /**
     * @param {number} ctx
     * @param {number} deepDataAndEvents
     * @param {number} body
     * @param {number} property
     * @param {number} thisObj
     * @param {Array} context
     * @return {?}
     */
    function render(ctx, deepDataAndEvents, body, property, thisObj, context) {
      /** @type {number} */
      var c2 = property + 3 * (deepDataAndEvents - body) - ctx;
      /** @type {number} */
      var c1 = 3 * (body - 2 * deepDataAndEvents + ctx);
      /** @type {number} */
      var c3 = 3 * (deepDataAndEvents - ctx);
      /** @type {number} */
      var s3 = ctx - thisObj;
      /** @type {number} */
      var r = c1 * c1 - 3 * c2 * c3;
      /** @type {number} */
      var g = c1 * c3 - 9 * c2 * s3;
      /** @type {number} */
      var len = c3 * c3 - 3 * c1 * s3;
      /** @type {number} */
      var ee = 0;
      if (isArray(r) && isArray(g)) {
        if (isArray(c1)) {
          /** @type {number} */
          context[0] = 0;
        } else {
          /** @type {number} */
          var bufferView = -c3 / c1;
          if (bufferView >= 0) {
            if (1 >= bufferView) {
              /** @type {number} */
              context[ee++] = bufferView;
            }
          }
        }
      } else {
        /** @type {number} */
        var target = g * g - 4 * r * len;
        if (isArray(target)) {
          /** @type {number} */
          var normG = g / r;
          /** @type {number} */
          bufferView = -c1 / c2 + normG;
          /** @type {number} */
          var old = -normG / 2;
          if (bufferView >= 0) {
            if (1 >= bufferView) {
              /** @type {number} */
              context[ee++] = bufferView;
            }
          }
          if (old >= 0) {
            if (1 >= old) {
              /** @type {number} */
              context[ee++] = old;
            }
          }
        } else {
          if (target > 0) {
            /** @type {number} */
            var targets = $(target);
            /** @type {number} */
            var a = r * c1 + 1.5 * c2 * (-g + targets);
            /** @type {number} */
            var b = r * c1 + 1.5 * c2 * (-g - targets);
            /** @type {number} */
            a = 0 > a ? -pow(-a, power) : pow(a, power);
            /** @type {number} */
            b = 0 > b ? -pow(-b, power) : pow(b, power);
            /** @type {number} */
            bufferView = (-c1 - (a + b)) / (3 * c2);
            if (bufferView >= 0) {
              if (1 >= bufferView) {
                /** @type {number} */
                context[ee++] = bufferView;
              }
            }
          } else {
            /** @type {number} */
            var cosHalfAngle = (2 * r * c1 - 3 * c2 * g) / (2 * $(r * r * r));
            /** @type {number} */
            var theta2 = Math.acos(cosHalfAngle) / 3;
            /** @type {number} */
            var min = $(r);
            /** @type {number} */
            var obj = Math.cos(theta2);
            /** @type {number} */
            bufferView = (-c1 - 2 * min * obj) / (3 * c2);
            /** @type {number} */
            old = (-c1 + min * (obj + range * Math.sin(theta2))) / (3 * c2);
            /** @type {number} */
            var session = (-c1 + min * (obj - range * Math.sin(theta2))) / (3 * c2);
            if (bufferView >= 0) {
              if (1 >= bufferView) {
                /** @type {number} */
                context[ee++] = bufferView;
              }
            }
            if (old >= 0) {
              if (1 >= old) {
                /** @type {number} */
                context[ee++] = old;
              }
            }
            if (session >= 0) {
              if (1 >= session) {
                /** @type {number} */
                context[ee++] = session;
              }
            }
          }
        }
      }
      return ee;
    }
    /**
     * @param {number} obj
     * @param {number} deepDataAndEvents
     * @param {number} data
     * @param {number} var_args
     * @param {Array} object
     * @return {?}
     */
    function extend(obj, deepDataAndEvents, data, var_args, object) {
      /** @type {number} */
      var z2 = 6 * data - 12 * deepDataAndEvents + 6 * obj;
      /** @type {number} */
      var old = 9 * deepDataAndEvents + 3 * var_args - 3 * obj - 9 * data;
      /** @type {number} */
      var z1 = 3 * deepDataAndEvents - 3 * obj;
      /** @type {number} */
      var result = 0;
      if (isArray(old)) {
        if (shift(z2)) {
          /** @type {number} */
          var original = -z1 / z2;
          if (original >= 0) {
            if (1 >= original) {
              /** @type {number} */
              object[result++] = original;
            }
          }
        }
      } else {
        /** @type {number} */
        var tail = z2 * z2 - 4 * old * z1;
        if (isArray(tail)) {
          /** @type {number} */
          object[0] = -z2 / (2 * old);
        } else {
          if (tail > 0) {
            /** @type {number} */
            var fields = $(tail);
            /** @type {number} */
            original = (-z2 + fields) / (2 * old);
            /** @type {number} */
            var val = (-z2 - fields) / (2 * old);
            if (original >= 0) {
              if (1 >= original) {
                /** @type {number} */
                object[result++] = original;
              }
            }
            if (val >= 0) {
              if (1 >= val) {
                /** @type {number} */
                object[result++] = val;
              }
            }
          }
        }
      }
      return result;
    }
    /**
     * @param {number} arr
     * @param {number} min
     * @param {number} max
     * @param {number} x
     * @param {number} pos
     * @param {Array} result
     * @return {undefined}
     */
    function insert(arr, min, max, x, pos, result) {
      var from = (min - arr) * pos + arr;
      var to = (max - min) * pos + min;
      var value = (x - max) * pos + max;
      var start = (to - from) * pos + from;
      var end = (value - to) * pos + to;
      var i = (end - start) * pos + start;
      /** @type {number} */
      result[0] = arr;
      result[1] = from;
      result[2] = start;
      result[3] = i;
      result[4] = i;
      result[5] = end;
      result[6] = value;
      /** @type {number} */
      result[7] = x;
    }
    /**
     * @param {number} context
     * @param {number} value
     * @param {number} args
     * @param {number} key
     * @param {number} i
     * @param {number} index
     * @param {number} object
     * @param {number} array
     * @param {string} obj
     * @param {string} v11
     * @param {Object} results
     * @return {?}
     */
    function add(context, value, args, key, i, index, object, array, obj, v11, results) {
      var far;
      var node;
      var stackB;
      var name;
      var p;
      /** @type {number} */
      var near = 0.005;
      /** @type {number} */
      var r = 1 / 0;
      /** @type {string} */
      _[0] = obj;
      /** @type {string} */
      _[1] = v11;
      /** @type {number} */
      var dataAndEvents = 0;
      for (;1 > dataAndEvents;dataAndEvents += 0.05) {
        ret[0] = clone(context, args, i, object, dataAndEvents);
        ret[1] = clone(value, key, index, array, dataAndEvents);
        name = join(_, ret);
        if (r > name) {
          /** @type {number} */
          far = dataAndEvents;
          r = name;
        }
      }
      /** @type {number} */
      r = 1 / 0;
      /** @type {number} */
      var b = 0;
      for (;32 > b && !(a > near);b++) {
        /** @type {number} */
        node = far - near;
        /** @type {number} */
        stackB = far + near;
        ret[0] = clone(context, args, i, object, node);
        ret[1] = clone(value, key, index, array, node);
        name = join(ret, _);
        if (node >= 0 && r > name) {
          /** @type {number} */
          far = node;
          r = name;
        } else {
          result[0] = clone(context, args, i, object, stackB);
          result[1] = clone(value, key, index, array, stackB);
          p = join(result, _);
          if (1 >= stackB && r > p) {
            /** @type {number} */
            far = stackB;
            r = p;
          } else {
            near *= 0.5;
          }
        }
      }
      return results && (results[0] = clone(context, args, i, object, far), results[1] = clone(value, key, index, array, far)), $(r);
    }
    /**
     * @param {number} var_args
     * @param {number} o
     * @param {number} dataAndEvents
     * @param {number} value
     * @return {?}
     */
    function callback(var_args, o, dataAndEvents, value) {
      /** @type {number} */
      var remainingProgress = 1 - value;
      return remainingProgress * (remainingProgress * var_args + 2 * value * o) + value * value * dataAndEvents;
    }
    /**
     * @param {number} obj
     * @param {number} methodName
     * @param {number} dataAndEvents
     * @param {number} ignoreMethodDoesntExist
     * @return {?}
     */
    function spyOn(obj, methodName, dataAndEvents, ignoreMethodDoesntExist) {
      return 2 * ((1 - ignoreMethodDoesntExist) * (methodName - obj) + ignoreMethodDoesntExist * (dataAndEvents - methodName));
    }
    /**
     * @param {number} y
     * @param {number} x
     * @param {number} height
     * @param {number} r
     * @param {Array} data
     * @return {?}
     */
    function init(y, x, height, r, data) {
      var tail = y - 2 * x + height;
      /** @type {number} */
      var z2 = 2 * (x - y);
      /** @type {number} */
      var z1 = y - r;
      /** @type {number} */
      var j = 0;
      if (isArray(tail)) {
        if (shift(z2)) {
          /** @type {number} */
          var oid = -z1 / z2;
          if (oid >= 0) {
            if (1 >= oid) {
              /** @type {number} */
              data[j++] = oid;
            }
          }
        }
      } else {
        /** @type {number} */
        var target = z2 * z2 - 4 * tail * z1;
        if (isArray(target)) {
          /** @type {number} */
          oid = -z2 / (2 * tail);
          if (oid >= 0) {
            if (1 >= oid) {
              /** @type {number} */
              data[j++] = oid;
            }
          }
        } else {
          if (target > 0) {
            /** @type {number} */
            var targets = $(target);
            /** @type {number} */
            oid = (-z2 + targets) / (2 * tail);
            /** @type {number} */
            var element = (-z2 - targets) / (2 * tail);
            if (oid >= 0) {
              if (1 >= oid) {
                /** @type {number} */
                data[j++] = oid;
              }
            }
            if (element >= 0) {
              if (1 >= element) {
                /** @type {number} */
                data[j++] = element;
              }
            }
          }
        }
      }
      return j;
    }
    /**
     * @param {number} obj
     * @param {number} expected
     * @param {number} dataAndEvents
     * @return {?}
     */
    function Assertion(obj, expected, dataAndEvents) {
      /** @type {number} */
      var sDivisor = obj + dataAndEvents - 2 * expected;
      return 0 === sDivisor ? 0.5 : (obj - expected) / sDivisor;
    }
    /**
     * @param {number} from
     * @param {number} to
     * @param {number} value
     * @param {number} percent
     * @param {Array} cache
     * @return {undefined}
     */
    function set(from, to, value, percent, cache) {
      var r = (to - from) * percent + from;
      var b = (value - to) * percent + to;
      var v = (b - r) * percent + r;
      /** @type {number} */
      cache[0] = from;
      cache[1] = r;
      cache[2] = v;
      cache[3] = v;
      cache[4] = b;
      /** @type {number} */
      cache[5] = value;
    }
    /**
     * @param {number} value
     * @param {number} val
     * @param {number} name
     * @param {number} key
     * @param {number} array
     * @param {number} obj
     * @param {string} ms
     * @param {number} var_args
     * @param {Object} output
     * @return {?}
     */
    function format(value, val, name, key, array, obj, ms, var_args, output) {
      var i;
      /** @type {number} */
      var b = 0.005;
      /** @type {number} */
      var param = 1 / 0;
      /** @type {string} */
      _[0] = ms;
      /** @type {number} */
      _[1] = var_args;
      /** @type {number} */
      var udataCur = 0;
      for (;1 > udataCur;udataCur += 0.05) {
        ret[0] = callback(value, name, array, udataCur);
        ret[1] = callback(val, key, obj, udataCur);
        var path = join(_, ret);
        if (param > path) {
          /** @type {number} */
          i = udataCur;
          param = path;
        }
      }
      /** @type {number} */
      param = 1 / 0;
      /** @type {number} */
      var v = 0;
      for (;32 > v && !(a > b);v++) {
        /** @type {number} */
        var c = i - b;
        /** @type {number} */
        var next = i + b;
        ret[0] = callback(value, name, array, c);
        ret[1] = callback(val, key, obj, c);
        path = join(ret, _);
        if (c >= 0 && param > path) {
          /** @type {number} */
          i = c;
          param = path;
        } else {
          result[0] = callback(value, name, array, next);
          result[1] = callback(val, key, obj, next);
          var filename = join(result, _);
          if (1 >= next && param > filename) {
            /** @type {number} */
            i = next;
            param = filename;
          } else {
            b *= 0.5;
          }
        }
      }
      return output && (output[0] = callback(value, name, array, i), output[1] = callback(val, key, obj, i)), $(param);
    }
    var pl = p.create;
    var join = p.distSquare;
    /** @type {function (*, *): number} */
    var pow = Math.pow;
    /** @type {function (*): number} */
    var $ = Math.sqrt;
    /** @type {number} */
    var y = 1E-8;
    /** @type {number} */
    var a = 1E-4;
    /** @type {number} */
    var range = $(3);
    /** @type {number} */
    var power = 1 / 3;
    var _ = pl();
    var ret = pl();
    var result = pl();
    return{
      /** @type {function (number, number, number, number, number): ?} */
      cubicAt : clone,
      /** @type {function (number, number, number, number, number): ?} */
      cubicDerivativeAt : text,
      /** @type {function (number, number, number, number, number, Array): ?} */
      cubicRootAt : render,
      /** @type {function (number, number, number, number, Array): ?} */
      cubicExtrema : extend,
      /** @type {function (number, number, number, number, number, Array): undefined} */
      cubicSubdivide : insert,
      /** @type {function (number, number, number, number, number, number, number, number, string, string, Object): ?} */
      cubicProjectPoint : add,
      /** @type {function (number, number, number, number): ?} */
      quadraticAt : callback,
      /** @type {function (number, number, number, number): ?} */
      quadraticDerivativeAt : spyOn,
      /** @type {function (number, number, number, number, Array): ?} */
      quadraticRootAt : init,
      /** @type {function (number, number, number): ?} */
      quadraticExtremum : Assertion,
      /** @type {function (number, number, number, number, Array): undefined} */
      quadraticSubdivide : set,
      /** @type {function (number, number, number, number, number, number, string, number, Object): ?} */
      quadraticProjectPoint : format
    };
  }();
  var self = function() {
    var BoundingBox = {};
    /** @type {function (...[*]): number} */
    var $ = Math.min;
    /** @type {function (...[*]): number} */
    var expect = Math.max;
    /** @type {function (*): number} */
    var abs = Math.sin;
    /** @type {function (*): number} */
    var min = Math.cos;
    var dataAndEvents = p.create();
    var ar = p.create();
    var node = p.create();
    /** @type {number} */
    var pl = 2 * Math.PI;
    /**
     * @param {Array} parts
     * @param {Array} res
     * @param {Array} elem
     * @return {undefined}
     */
    BoundingBox.fromPoints = function(parts, res, elem) {
      if (0 !== parts.length) {
        var i;
        var part = parts[0];
        var val = part[0];
        var tmp = part[0];
        var key = part[1];
        var value = part[1];
        /** @type {number} */
        i = 1;
        for (;i < parts.length;i++) {
          part = parts[i];
          /** @type {number} */
          val = $(val, part[0]);
          /** @type {number} */
          tmp = expect(tmp, part[0]);
          /** @type {number} */
          key = $(key, part[1]);
          /** @type {number} */
          value = expect(value, part[1]);
        }
        res[0] = val;
        res[1] = key;
        elem[0] = tmp;
        elem[1] = value;
      }
    };
    /**
     * @param {number} value
     * @param {number} obj
     * @param {number} dataAndEvents
     * @param {number} node
     * @param {Array} args
     * @param {Array} result
     * @return {undefined}
     */
    BoundingBox.fromLine = function(value, obj, dataAndEvents, node, args, result) {
      /** @type {number} */
      args[0] = $(value, dataAndEvents);
      /** @type {number} */
      args[1] = $(obj, node);
      /** @type {number} */
      result[0] = expect(value, dataAndEvents);
      /** @type {number} */
      result[1] = expect(obj, node);
    };
    /** @type {Array} */
    var which = [];
    /** @type {Array} */
    var qs = [];
    return BoundingBox.fromCubic = function(elems, obj, deepDataAndEvents, dataAndEvents, inplace, msgs, val, content, args, props) {
      var i;
      var isArraylike = console.cubicExtrema;
      var parse = console.cubicAt;
      var isArray = isArraylike(elems, deepDataAndEvents, inplace, val, which);
      /** @type {number} */
      args[0] = 1 / 0;
      /** @type {number} */
      args[1] = 1 / 0;
      /** @type {number} */
      props[0] = -(1 / 0);
      /** @type {number} */
      props[1] = -(1 / 0);
      /** @type {number} */
      i = 0;
      for (;isArray > i;i++) {
        var ret = parse(elems, deepDataAndEvents, inplace, val, which[i]);
        /** @type {number} */
        args[0] = $(ret, args[0]);
        /** @type {number} */
        props[0] = expect(ret, props[0]);
      }
      isArray = isArraylike(obj, dataAndEvents, msgs, content, qs);
      /** @type {number} */
      i = 0;
      for (;isArray > i;i++) {
        var value = parse(obj, dataAndEvents, msgs, content, qs[i]);
        /** @type {number} */
        args[1] = $(value, args[1]);
        /** @type {number} */
        props[1] = expect(value, props[1]);
      }
      /** @type {number} */
      args[0] = $(elems, args[0]);
      /** @type {number} */
      props[0] = expect(elems, props[0]);
      /** @type {number} */
      args[0] = $(val, args[0]);
      /** @type {number} */
      props[0] = expect(val, props[0]);
      /** @type {number} */
      args[1] = $(obj, args[1]);
      /** @type {number} */
      props[1] = expect(obj, props[1]);
      /** @type {number} */
      args[1] = $(content, args[1]);
      /** @type {number} */
      props[1] = expect(content, props[1]);
    }, BoundingBox.fromQuadratic = function(value, obj, n, index, dataAndEvents, node, args, result) {
      var fn = console.quadraticExtremum;
      var callback = console.quadraticAt;
      /** @type {number} */
      var udataCur = expect($(fn(value, n, dataAndEvents), 1), 0);
      /** @type {number} */
      var pdataOld = expect($(fn(obj, index, node), 1), 0);
      var prop = callback(value, n, dataAndEvents, udataCur);
      var current = callback(obj, index, node, pdataOld);
      /** @type {number} */
      args[0] = $(value, dataAndEvents, prop);
      /** @type {number} */
      args[1] = $(obj, node, current);
      /** @type {number} */
      result[0] = expect(value, dataAndEvents, prop);
      /** @type {number} */
      result[1] = expect(obj, node, current);
    }, BoundingBox.fromArc = function(a, startAngle, b, endAngle, x1, x2, value, key, el) {
      var f = p.min;
      var fn = p.max;
      /** @type {number} */
      var m = Math.abs(x1 - x2);
      if (1E-4 > m % pl && m > 1E-4) {
        return key[0] = a - b, key[1] = startAngle - endAngle, el[0] = a + b, void(el[1] = startAngle + endAngle);
      }
      if (dataAndEvents[0] = min(x1) * b + a, dataAndEvents[1] = abs(x1) * endAngle + startAngle, ar[0] = min(x2) * b + a, ar[1] = abs(x2) * endAngle + startAngle, f(key, dataAndEvents, ar), fn(el, dataAndEvents, ar), x1 %= pl, 0 > x1 && (x1 += pl), x2 %= pl, 0 > x2 && (x2 += pl), x1 > x2 && !value ? x2 += pl : x2 > x1 && (value && (x1 += pl)), value) {
        /** @type {number} */
        var temp = x2;
        /** @type {number} */
        x2 = x1;
        x1 = temp;
      }
      /** @type {number} */
      var x = 0;
      for (;x2 > x;x += Math.PI / 2) {
        if (x > x1) {
          node[0] = min(x) * b + a;
          node[1] = abs(x) * endAngle + startAngle;
          f(key, node, key);
          fn(el, node, el);
        }
      }
    }, BoundingBox;
  }();
  var Node = function() {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    function Rectangle(x, y, width, height) {
      /** @type {number} */
      this.x = x;
      /** @type {number} */
      this.y = y;
      /** @type {number} */
      this.width = width;
      /** @type {number} */
      this.height = height;
    }
    var canHasNodeAsChild = p.applyTransform;
    /** @type {function (...[*]): number} */
    var min = Math.min;
    /** @type {function (*): number} */
    var mathRound = Math.abs;
    /** @type {function (...[*]): number} */
    var max = Math.max;
    return Rectangle.prototype = {
      /** @type {function (number, number, number, number): undefined} */
      constructor : Rectangle,
      /**
       * @param {Object} rect
       * @return {undefined}
       */
      union : function(rect) {
        /** @type {number} */
        var x = min(rect.x, this.x);
        /** @type {number} */
        var y = min(rect.y, this.y);
        /** @type {number} */
        this.width = max(rect.x + rect.width, this.x + this.width) - x;
        /** @type {number} */
        this.height = max(rect.y + rect.height, this.y + this.height) - y;
        /** @type {number} */
        this.x = x;
        /** @type {number} */
        this.y = y;
      },
      applyTransform : function() {
        /** @type {Array} */
        var holder = [];
        /** @type {Array} */
        var c = [];
        return function(deepDataAndEvents) {
          if (deepDataAndEvents) {
            holder[0] = this.x;
            holder[1] = this.y;
            c[0] = this.x + this.width;
            c[1] = this.y + this.height;
            canHasNodeAsChild(holder, holder, deepDataAndEvents);
            canHasNodeAsChild(c, c, deepDataAndEvents);
            /** @type {number} */
            this.x = min(holder[0], c[0]);
            /** @type {number} */
            this.y = min(holder[1], c[1]);
            /** @type {number} */
            this.width = mathRound(c[0] - holder[0]);
            /** @type {number} */
            this.height = mathRound(c[1] - holder[1]);
          }
        };
      }(),
      /**
       * @param {number} obj
       * @param {number} deepDataAndEvents
       * @return {?}
       */
      contain : function(obj, deepDataAndEvents) {
        var child = this;
        return obj >= child.x && (obj <= child.x + child.width && (deepDataAndEvents >= child.y && deepDataAndEvents <= child.y + child.height));
      },
      /**
       * @return {?}
       */
      clone : function() {
        return new Rectangle(this.x, this.y, this.width, this.height);
      },
      /**
       * @param {Object} box
       * @return {undefined}
       */
      copy : function(box) {
        this.x = box.x;
        this.y = box.y;
        this.width = box.width;
        this.height = box.height;
      }
    }, Rectangle;
  }();
  var path = function() {
    var node = {
      M : 1,
      L : 2,
      C : 3,
      Q : 4,
      A : 5,
      Z : 6,
      R : 7
    };
    /** @type {Array} */
    var b = [];
    /** @type {Array} */
    var a = [];
    /** @type {Array} */
    var ast = [];
    /** @type {Array} */
    var event = [];
    /** @type {function (...[*]): number} */
    var nativeMin = Math.min;
    /** @type {function (...[*]): number} */
    var nativeMax = Math.max;
    /** @type {function (*): number} */
    var cos = Math.cos;
    /** @type {function (*): number} */
    var sin = Math.sin;
    /** @type {function (*): number} */
    var sqrt = Math.sqrt;
    /** @type {function (*): number} */
    var abs = Math.abs;
    /** @type {boolean} */
    var c = "undefined" != typeof Float32Array;
    /**
     * @return {undefined}
     */
    var Query = function() {
      /** @type {Array} */
      this.data = [];
      /** @type {number} */
      this._len = 0;
      /** @type {null} */
      this._ctx = null;
      /** @type {number} */
      this._xi = 0;
      /** @type {number} */
      this._yi = 0;
      /** @type {number} */
      this._x0 = 0;
      /** @type {number} */
      this._y0 = 0;
      /** @type {number} */
      this._ux = 0;
      /** @type {number} */
      this._uy = 0;
    };
    return Query.prototype = {
      /** @type {function (): undefined} */
      constructor : Query,
      _lineDash : null,
      _dashOffset : 0,
      _dashIdx : 0,
      _dashSum : 0,
      /**
       * @param {number} scale
       * @param {number} opt_y
       * @return {undefined}
       */
      setScale : function(scale, opt_y) {
        /** @type {number} */
        this._ux = abs(1 / s / scale) || 0;
        /** @type {number} */
        this._uy = abs(1 / s / opt_y) || 0;
      },
      /**
       * @return {?}
       */
      getContext : function() {
        return this._ctx;
      },
      /**
       * @param {Object} ctx
       * @return {?}
       */
      beginPath : function(ctx) {
        return this._ctx = ctx, ctx && ctx.beginPath(), this._len = 0, this._lineDash && (this._lineDash = null, this._dashOffset = 0), this;
      },
      /**
       * @param {number} x
       * @param {number} y
       * @return {?}
       */
      moveTo : function(x, y) {
        return this.addData(node.M, x, y), this._ctx && this._ctx.moveTo(x, y), this._x0 = x, this._y0 = y, this._xi = x, this._yi = y, this;
      },
      /**
       * @param {number} x
       * @param {number} y
       * @return {?}
       */
      lineTo : function(x, y) {
        /** @type {boolean} */
        var a = abs(x - this._xi) > this._ux || (abs(y - this._yi) > this._uy || 0 === this._len);
        return this.addData(node.L, x, y), this._ctx && (a && (this._needsDash() ? this._dashedLineTo(x, y) : this._ctx.lineTo(x, y))), a && (this._xi = x, this._yi = y), this;
      },
      /**
       * @param {number} deepDataAndEvents
       * @param {number} y
       * @param {number} aX
       * @param {number} inplace
       * @param {number} x
       * @param {number} y1
       * @return {?}
       */
      bezierCurveTo : function(deepDataAndEvents, y, aX, inplace, x, y1) {
        return this.addData(node.C, deepDataAndEvents, y, aX, inplace, x, y1), this._ctx && (this._needsDash() ? this._dashedBezierTo(deepDataAndEvents, y, aX, inplace, x, y1) : this._ctx.bezierCurveTo(deepDataAndEvents, y, aX, inplace, x, y1)), this._xi = x, this._yi = y1, this;
      },
      /**
       * @param {number} deepDataAndEvents
       * @param {number} y
       * @param {number} x
       * @param {number} v11
       * @return {?}
       */
      quadraticCurveTo : function(deepDataAndEvents, y, x, v11) {
        return this.addData(node.Q, deepDataAndEvents, y, x, v11), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(deepDataAndEvents, y, x, v11) : this._ctx.quadraticCurveTo(deepDataAndEvents, y, x, v11)), this._xi = x, this._yi = v11, this;
      },
      /**
       * @param {number} x
       * @param {?} y
       * @param {number} radius
       * @param {number} startAngle
       * @param {number} endAngle
       * @param {boolean} counterClockwise
       * @return {?}
       */
      arc : function(x, y, radius, startAngle, endAngle, counterClockwise) {
        return this.addData(node.A, x, y, radius, radius, startAngle, endAngle - startAngle, 0, counterClockwise ? 0 : 1), this._ctx && this._ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise), this._xi = cos(endAngle) * radius + x, this._xi = sin(endAngle) * radius + x, this;
      },
      /**
       * @param {?} x
       * @param {?} y
       * @param {?} rx
       * @param {?} extent
       * @param {?} deepDataAndEvents
       * @return {?}
       */
      arcTo : function(x, y, rx, extent, deepDataAndEvents) {
        return this._ctx && this._ctx.arcTo(x, y, rx, extent, deepDataAndEvents), this;
      },
      /**
       * @param {?} x
       * @param {?} y
       * @param {number} w
       * @param {number} h
       * @return {?}
       */
      rect : function(x, y, w, h) {
        return this._ctx && this._ctx.rect(x, y, w, h), this.addData(node.R, x, y, w, h), this;
      },
      /**
       * @return {?}
       */
      closePath : function() {
        this.addData(node.Z);
        var context = this._ctx;
        var followingChild = this._x0;
        var dataAndEvents = this._y0;
        return context && (this._needsDash() && this._dashedLineTo(followingChild, dataAndEvents), context.closePath()), this._xi = followingChild, this._yi = dataAndEvents, this;
      },
      /**
       * @param {Object} inContext
       * @return {undefined}
       */
      fill : function(inContext) {
        if (inContext) {
          inContext.fill();
        }
        this.toStatic();
      },
      /**
       * @param {Object} ctx
       * @return {undefined}
       */
      stroke : function(ctx) {
        if (ctx) {
          ctx.stroke();
        }
        this.toStatic();
      },
      /**
       * @param {Array} values
       * @return {?}
       */
      setLineDash : function(values) {
        if (values instanceof Array) {
          /** @type {Array} */
          this._lineDash = values;
          /** @type {number} */
          this._dashIdx = 0;
          /** @type {number} */
          var sum = 0;
          /** @type {number} */
          var i = 0;
          for (;i < values.length;i++) {
            sum += values[i];
          }
          this._dashSum = sum;
        }
        return this;
      },
      /**
       * @param {number} len
       * @return {?}
       */
      setLineDashOffset : function(len) {
        return this._dashOffset = len, this;
      },
      /**
       * @return {?}
       */
      len : function() {
        return this._len;
      },
      /**
       * @param {Array} data
       * @return {undefined}
       */
      setData : function(data) {
        var length = data.length;
        if (!(this.data && this.data.length == length)) {
          if (!!c) {
            /** @type {Float32Array} */
            this.data = new Float32Array(length);
          }
        }
        /** @type {number} */
        var i = 0;
        for (;length > i;i++) {
          this.data[i] = data[i];
        }
        this._len = length;
      },
      /**
       * @param {(Array|string)} values
       * @return {undefined}
       */
      appendPath : function(values) {
        if (!(values instanceof Array)) {
          /** @type {Array} */
          values = [values];
        }
        var valuesLen = values.length;
        /** @type {number} */
        var from = 0;
        var length = this._len;
        /** @type {number} */
        var index = 0;
        for (;valuesLen > index;index++) {
          from += values[index].len();
        }
        if (c) {
          if (this.data instanceof Float32Array) {
            /** @type {Float32Array} */
            this.data = new Float32Array(length + from);
          }
        }
        /** @type {number} */
        index = 0;
        for (;valuesLen > index;index++) {
          var codeSegments = values[index].data;
          /** @type {number} */
          var i = 0;
          for (;i < codeSegments.length;i++) {
            this.data[length++] = codeSegments[i];
          }
        }
        this._len = length;
      },
      /**
       * @param {number} data
       * @return {undefined}
       */
      addData : function(data) {
        var result = this.data;
        if (this._len + arguments.length > result.length) {
          this._expandData();
          result = this.data;
        }
        /** @type {number} */
        var i = 0;
        for (;i < arguments.length;i++) {
          result[this._len++] = arguments[i];
        }
        /** @type {number} */
        this._prevCmd = data;
      },
      /**
       * @return {undefined}
       */
      _expandData : function() {
        if (!(this.data instanceof Array)) {
          /** @type {Array} */
          var data = [];
          /** @type {number} */
          var n = 0;
          for (;n < this._len;n++) {
            data[n] = this.data[n];
          }
          /** @type {Array} */
          this.data = data;
        }
      },
      /**
       * @return {undefined}
       */
      afterPathBuild : function() {
        if (this.data.length != this._len) {
          this._expandData();
        }
      },
      /**
       * @return {?}
       */
      _needsDash : function() {
        return this._lineDash;
      },
      /**
       * @param {number} node
       * @param {number} dataAndEvents
       * @return {undefined}
       */
      _dashedLineTo : function(node, dataAndEvents) {
        var world;
        var i;
        var padding = this._dashSum;
        var result = this._dashOffset;
        var worlds = this._lineDash;
        var context = this._ctx;
        var formatString = this._xi;
        var toIndex = this._yi;
        /** @type {number} */
        var a = node - formatString;
        /** @type {number} */
        var b = dataAndEvents - toIndex;
        /** @type {number} */
        var l = sqrt(a * a + b * b);
        var rest = formatString;
        var fromIndex = toIndex;
        var num_points = worlds.length;
        a /= l;
        b /= l;
        if (0 > result) {
          result = padding + result;
        }
        result %= padding;
        rest -= result * a;
        fromIndex -= result * b;
        for (;a > 0 && node >= rest || (0 > a && rest >= node || 0 == a && (b > 0 && dataAndEvents >= fromIndex || 0 > b && fromIndex >= dataAndEvents));) {
          i = this._dashIdx;
          world = worlds[i];
          rest += a * world;
          fromIndex += b * world;
          /** @type {number} */
          this._dashIdx = (i + 1) % num_points;
          if (!(a > 0 && formatString > rest)) {
            if (!(0 > a && rest > formatString)) {
              if (!(b > 0 && toIndex > fromIndex)) {
                if (!(0 > b && fromIndex > toIndex)) {
                  context[i % 2 ? "moveTo" : "lineTo"](a >= 0 ? nativeMin(rest, node) : nativeMax(rest, node), b >= 0 ? nativeMin(fromIndex, dataAndEvents) : nativeMax(fromIndex, dataAndEvents));
                }
              }
            }
          }
        }
        /** @type {number} */
        a = rest - node;
        /** @type {number} */
        b = fromIndex - dataAndEvents;
        /** @type {number} */
        this._dashOffset = -sqrt(a * a + b * b);
      },
      /**
       * @param {number} deepDataAndEvents
       * @param {number} b
       * @param {number} x
       * @param {number} inplace
       * @param {number} left
       * @param {number} c
       * @return {undefined}
       */
      _dashedBezierTo : function(deepDataAndEvents, b, x, inplace, left, c) {
        var dataAndEvents;
        var z0;
        var z1;
        var offset;
        var d;
        var thisSize = this._dashSum;
        var start = this._dashOffset;
        var employees = this._lineDash;
        var me = this._ctx;
        var suiteView = this._xi;
        var a = this._yi;
        var md5_gg = console.cubicAt;
        /** @type {number} */
        var n = 0;
        var i = this._dashIdx;
        var l = employees.length;
        /** @type {number} */
        var end = 0;
        if (0 > start) {
          start = thisSize + start;
        }
        start %= thisSize;
        /** @type {number} */
        dataAndEvents = 0;
        for (;1 > dataAndEvents;dataAndEvents += 0.1) {
          /** @type {number} */
          z0 = md5_gg(suiteView, deepDataAndEvents, x, left, dataAndEvents + 0.1) - md5_gg(suiteView, deepDataAndEvents, x, left, dataAndEvents);
          /** @type {number} */
          z1 = md5_gg(a, b, inplace, c, dataAndEvents + 0.1) - md5_gg(a, b, inplace, c, dataAndEvents);
          n += sqrt(z0 * z0 + z1 * z1);
        }
        for (;l > i && (end += employees[i], !(end > start));i++) {
        }
        /** @type {number} */
        dataAndEvents = (end - start) / n;
        for (;1 >= dataAndEvents;) {
          offset = md5_gg(suiteView, deepDataAndEvents, x, left, dataAndEvents);
          d = md5_gg(a, b, inplace, c, dataAndEvents);
          if (i % 2) {
            me.moveTo(offset, d);
          } else {
            me.lineTo(offset, d);
          }
          dataAndEvents += employees[i] / n;
          /** @type {number} */
          i = (i + 1) % l;
        }
        if (i % 2 !== 0) {
          me.lineTo(left, c);
        }
        /** @type {number} */
        z0 = left - offset;
        /** @type {number} */
        z1 = c - d;
        /** @type {number} */
        this._dashOffset = -sqrt(z0 * z0 + z1 * z1);
      },
      /**
       * @param {number} deepDataAndEvents
       * @param {number} v1
       * @param {number} event
       * @param {number} v11
       * @return {undefined}
       */
      _dashedQuadraticTo : function(deepDataAndEvents, v1, event, v11) {
        /** @type {number} */
        var originalEvent = event;
        /** @type {number} */
        var applyArgs = v11;
        /** @type {number} */
        event = (event + 2 * deepDataAndEvents) / 3;
        /** @type {number} */
        v11 = (v11 + 2 * v1) / 3;
        /** @type {number} */
        deepDataAndEvents = (this._xi + 2 * deepDataAndEvents) / 3;
        /** @type {number} */
        v1 = (this._yi + 2 * v1) / 3;
        this._dashedBezierTo(deepDataAndEvents, v1, event, v11, originalEvent, applyArgs);
      },
      /**
       * @return {undefined}
       */
      toStatic : function() {
        var data = this.data;
        if (data instanceof Array) {
          data.length = this._len;
          if (c) {
            /** @type {Float32Array} */
            this.data = new Float32Array(data);
          }
        }
      },
      /**
       * @return {?}
       */
      getBoundingRect : function() {
        /** @type {number} */
        b[0] = b[1] = ast[0] = ast[1] = Number.MAX_VALUE;
        /** @type {number} */
        a[0] = a[1] = event[0] = event[1] = -Number.MAX_VALUE;
        var data = this.data;
        /** @type {number} */
        var tmp = 0;
        /** @type {number} */
        var result = 0;
        /** @type {number} */
        var cur = 0;
        /** @type {number} */
        var value = 0;
        /** @type {number} */
        var i = 0;
        for (;i < data.length;) {
          var opcode = data[i++];
          switch(1 == i && (tmp = data[i], result = data[i + 1], cur = tmp, value = result), opcode) {
            case node.M:
              cur = data[i++];
              value = data[i++];
              tmp = cur;
              result = value;
              ast[0] = cur;
              ast[1] = value;
              event[0] = cur;
              event[1] = value;
              break;
            case node.L:
              self.fromLine(tmp, result, data[i], data[i + 1], ast, event);
              tmp = data[i++];
              result = data[i++];
              break;
            case node.C:
              self.fromCubic(tmp, result, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], ast, event);
              tmp = data[i++];
              result = data[i++];
              break;
            case node.Q:
              self.fromQuadratic(tmp, result, data[i++], data[i++], data[i], data[i + 1], ast, event);
              tmp = data[i++];
              result = data[i++];
              break;
            case node.A:
              var min = data[i++];
              var y = data[i++];
              var r = data[i++];
              var radius = data[i++];
              var endAngle = data[i++];
              var startAngle = data[i++] + endAngle;
              /** @type {number} */
              var udataCur = (data[i++], 1 - data[i++]);
              if (1 == i) {
                cur = cos(endAngle) * r + min;
                value = sin(endAngle) * radius + y;
              }
              self.fromArc(min, y, r, radius, endAngle, startAngle, udataCur, ast, event);
              tmp = cos(startAngle) * r + min;
              result = sin(startAngle) * radius + y;
              break;
            case node.R:
              cur = tmp = data[i++];
              value = result = data[i++];
              var type = data[i++];
              var c = data[i++];
              self.fromLine(cur, value, cur + type, value + c, ast, event);
              break;
            case node.Z:
              tmp = cur;
              result = value;
          }
          p.min(b, b, ast);
          p.max(a, a, event);
        }
        return 0 === i && (b[0] = b[1] = a[0] = a[1] = 0), new Node(b[0], b[1], a[0] - b[0], a[1] - b[1]);
      }
    }, Query.CMD = node, Query;
  }();
  var jQuery = function() {
    /**
     * @param {number} a
     * @param {number} b
     * @return {?}
     */
    function equal(a, b) {
      return Math.abs(a - b) < y;
    }
    /**
     * @return {undefined}
     */
    function failure() {
      var file = list[0];
      list[0] = list[1];
      list[1] = file;
    }
    /**
     * @param {number} actual
     * @param {number} a
     * @param {number} chunk
     * @param {number} deepDataAndEvents
     * @param {number} f
     * @param {number} i
     * @param {number} response
     * @param {number} index
     * @param {number} positionError
     * @param {number} b
     * @return {?}
     */
    function fail(actual, a, chunk, deepDataAndEvents, f, i, response, index, positionError, b) {
      if (b > a && (b > deepDataAndEvents && (b > i && b > index)) || a > b && (deepDataAndEvents > b && (i > b && index > b))) {
        return 0;
      }
      var val = console.cubicRootAt(a, deepDataAndEvents, i, index, b, d);
      if (0 === val) {
        return 0;
      }
      var out;
      var rval;
      /** @type {number} */
      var fail = 0;
      /** @type {number} */
      var memo = -1;
      /** @type {number} */
      var k = 0;
      for (;val > k;k++) {
        var z = d[k];
        var to = console.cubicAt(actual, chunk, f, response, z);
        if (!(positionError > to)) {
          if (0 > memo) {
            memo = console.cubicExtrema(a, deepDataAndEvents, i, index, list);
            if (list[1] < list[0]) {
              if (memo > 1) {
                failure();
              }
            }
            out = console.cubicAt(a, deepDataAndEvents, i, index, list[0]);
            if (memo > 1) {
              rval = console.cubicAt(a, deepDataAndEvents, i, index, list[1]);
            }
          }
          fail += 2 == memo ? z < list[0] ? a > out ? 1 : -1 : z < list[1] ? out > rval ? 1 : -1 : rval > index ? 1 : -1 : z < list[0] ? a > out ? 1 : -1 : out > index ? 1 : -1;
        }
      }
      return fail;
    }
    /**
     * @param {number} x
     * @param {number} b
     * @param {number} name
     * @param {number} e
     * @param {number} y
     * @param {number} node
     * @param {number} deepDataAndEvents
     * @param {number} r
     * @return {?}
     */
    function fn(x, b, name, e, y, node, deepDataAndEvents, r) {
      if (r > b && (r > e && r > node) || b > r && (e > r && node > r)) {
        return 0;
      }
      var pos = console.quadraticRootAt(b, e, node, r, d);
      if (0 === pos) {
        return 0;
      }
      var result = console.quadraticExtremum(b, e, node);
      if (result >= 0 && 1 >= result) {
        /** @type {number} */
        var out = 0;
        var res = console.quadraticAt(b, e, node, result);
        /** @type {number} */
        var i = 0;
        for (;pos > i;i++) {
          var path = console.quadraticAt(x, name, y, d[i]);
          if (!(deepDataAndEvents > path)) {
            out += d[i] < result ? b > res ? 1 : -1 : res > node ? 1 : -1;
          }
        }
        return out;
      }
      path = console.quadraticAt(x, name, y, d[0]);
      return deepDataAndEvents > path ? 0 : b > node ? 1 : -1;
    }
    /**
     * @param {?} _
     * @param {number} obj
     * @param {number} a
     * @param {number} x
     * @param {number} y
     * @param {boolean} dataAndEvents
     * @param {?} val
     * @param {number} b
     * @return {?}
     */
    function update(_, obj, a, x, y, dataAndEvents, val, b) {
      if (b -= obj, b > a || -a > b) {
        return 0;
      }
      /** @type {number} */
      var value = Math.sqrt(a * a - b * b);
      /** @type {number} */
      d[0] = -value;
      /** @type {number} */
      d[1] = value;
      /** @type {number} */
      var ii = Math.abs(x - y);
      if (1E-4 > ii) {
        return 0;
      }
      if (1E-4 > ii % offset) {
        /** @type {number} */
        x = 0;
        /** @type {number} */
        y = offset;
        /** @type {number} */
        var data = dataAndEvents ? 1 : -1;
        return val >= d[0] + _ && val <= d[1] + _ ? data : 0;
      }
      if (dataAndEvents) {
        /** @type {number} */
        value = x;
        x = round(y);
        y = round(value);
      } else {
        x = round(x);
        y = round(y);
      }
      if (x > y) {
        y += offset;
      }
      /** @type {number} */
      var buffer = 0;
      /** @type {number} */
      var p = 0;
      for (;2 > p;p++) {
        var f = d[p];
        if (f + _ > val) {
          /** @type {number} */
          var i = Math.atan2(b, f);
          /** @type {number} */
          data = dataAndEvents ? 1 : -1;
          if (0 > i) {
            /** @type {number} */
            i = offset + i;
          }
          if (i >= x && y >= i || i + offset >= x && y >= i + offset) {
            if (i > Math.PI / 2) {
              if (i < 1.5 * Math.PI) {
                /** @type {number} */
                data = -data;
              }
            }
            buffer += data;
          }
        }
      }
      return buffer;
    }
    /**
     * @param {(Array|Int8Array|Uint8Array)} args
     * @param {number} x
     * @param {boolean} recurring
     * @param {number} deepDataAndEvents
     * @param {number} c
     * @return {?}
     */
    function f(args, x, recurring, deepDataAndEvents, c) {
      /** @type {number} */
      var xml = 0;
      /** @type {number} */
      var actual = 0;
      /** @type {number} */
      var o = 0;
      /** @type {number} */
      var value = 0;
      /** @type {number} */
      var a = 0;
      /** @type {number} */
      var i = 0;
      for (;i < args.length;) {
        var src = args[i++];
        if (src === node.M && (i > 1 && (recurring || (xml += callback(actual, o, value, a, deepDataAndEvents, c)), 0 !== xml))) {
          return true;
        }
        switch(1 == i && (actual = args[i], o = args[i + 1], value = actual, a = o), src) {
          case node.M:
            value = args[i++];
            a = args[i++];
            actual = value;
            o = a;
            break;
          case node.L:
            if (recurring) {
              if (assertEquals(actual, o, args[i], args[i + 1], x, deepDataAndEvents, c)) {
                return true;
              }
            } else {
              xml += callback(actual, o, args[i], args[i + 1], deepDataAndEvents, c) || 0;
            }
            actual = args[i++];
            o = args[i++];
            break;
          case node.C:
            if (recurring) {
              if (_Function_call_.containStroke(actual, o, args[i++], args[i++], args[i++], args[i++], args[i], args[i + 1], x, deepDataAndEvents, c)) {
                return true;
              }
            } else {
              xml += fail(actual, o, args[i++], args[i++], args[i++], args[i++], args[i], args[i + 1], deepDataAndEvents, c) || 0;
            }
            actual = args[i++];
            o = args[i++];
            break;
          case node.Q:
            if (recurring) {
              if (func.containStroke(actual, o, args[i++], args[i++], args[i], args[i + 1], x, deepDataAndEvents, c)) {
                return true;
              }
            } else {
              xml += fn(actual, o, args[i++], args[i++], args[i], args[i + 1], deepDataAndEvents, c) || 0;
            }
            actual = args[i++];
            o = args[i++];
            break;
          case node.A:
            var key = args[i++];
            var suiteView = args[i++];
            var pageY = args[i++];
            var width = args[i++];
            var r = args[i++];
            var angle = args[i++];
            /** @type {number} */
            var dataAndEvents = (args[i++], 1 - args[i++]);
            var name = Math.cos(r) * pageY + key;
            var b = Math.sin(r) * width + suiteView;
            if (i > 1) {
              xml += callback(actual, o, name, b, deepDataAndEvents, c);
            } else {
              value = name;
              a = b;
            }
            var message = (deepDataAndEvents - key) * width / pageY + key;
            if (recurring) {
              if (ctx.containStroke(key, suiteView, width, r, r + angle, dataAndEvents, x, message, c)) {
                return true;
              }
            } else {
              xml += update(key, suiteView, width, r, r + angle, dataAndEvents, message, c);
            }
            actual = Math.cos(r + angle) * pageY + key;
            o = Math.sin(r + angle) * width + suiteView;
            break;
          case node.R:
            value = actual = args[i++];
            a = o = args[i++];
            var arg = args[i++];
            var f = args[i++];
            name = value + arg;
            b = a + f;
            if (recurring) {
              if (assertEquals(value, a, name, a, x, deepDataAndEvents, c) || (assertEquals(name, a, name, b, x, deepDataAndEvents, c) || (assertEquals(name, b, value, b, x, deepDataAndEvents, c) || assertEquals(value, b, value, a, x, deepDataAndEvents, c)))) {
                return true;
              }
            } else {
              xml += callback(name, a, name, b, deepDataAndEvents, c);
              xml += callback(value, b, value, a, deepDataAndEvents, c);
            }
            break;
          case node.Z:
            if (recurring) {
              if (assertEquals(actual, o, value, a, x, deepDataAndEvents, c)) {
                return true;
              }
            } else {
              if (xml += callback(actual, o, value, a, deepDataAndEvents, c), 0 !== xml) {
                return true;
              }
            }
            actual = value;
            o = a;
        }
      }
      return recurring || (equal(o, a) || (xml += callback(actual, o, value, a, deepDataAndEvents, c) || 0)), 0 !== xml;
    }
    /** @type {number} */
    var offset = 2 * Math.PI;
    /**
     * @param {number} x
     * @return {?}
     */
    var round = function(x) {
      return x %= offset, 0 > x && (x += offset), x;
    };
    var containStroke = {
      /**
       * @param {number} x
       * @param {number} obj
       * @param {number} y
       * @param {number} t
       * @param {number} v00
       * @param {number} deepDataAndEvents
       * @param {number} i
       * @return {?}
       */
      containStroke : function(x, obj, y, t, v00, deepDataAndEvents, i) {
        if (0 === v00) {
          return false;
        }
        /** @type {number} */
        var delta = v00;
        /** @type {number} */
        var h = 0;
        /** @type {number} */
        var count = x;
        if (i > obj + delta && i > t + delta || (obj - delta > i && t - delta > i || (deepDataAndEvents > x + delta && deepDataAndEvents > y + delta || x - delta > deepDataAndEvents && y - delta > deepDataAndEvents))) {
          return false;
        }
        if (x === y) {
          return Math.abs(deepDataAndEvents - x) <= delta / 2;
        }
        /** @type {number} */
        h = (obj - t) / (x - y);
        /** @type {number} */
        count = (x * t - y * obj) / (x - y);
        /** @type {number} */
        var pos = h * deepDataAndEvents - i + count;
        /** @type {number} */
        var c = pos * pos / (h * h + 1);
        return delta / 2 * delta / 2 >= c;
      }
    };
    var _Function_call_ = {
      /**
       * @param {number} x
       * @param {number} obj
       * @param {number} val
       * @param {number} p
       * @param {number} i
       * @param {number} deepDataAndEvents
       * @param {number} value
       * @param {number} y
       * @param {number} v00
       * @param {(number|string)} walkers
       * @param {(number|string)} v11
       * @return {?}
       */
      containStroke : function(x, obj, val, p, i, deepDataAndEvents, value, y, v00, walkers, v11) {
        if (0 === v00) {
          return false;
        }
        /** @type {number} */
        var delta = v00;
        if (v11 > obj + delta && (v11 > p + delta && (v11 > deepDataAndEvents + delta && v11 > y + delta)) || (obj - delta > v11 && (p - delta > v11 && (deepDataAndEvents - delta > v11 && y - delta > v11)) || (walkers > x + delta && (walkers > val + delta && (walkers > i + delta && walkers > value + delta)) || x - delta > walkers && (val - delta > walkers && (i - delta > walkers && value - delta > walkers))))) {
          return false;
        }
        var path = console.cubicProjectPoint(x, obj, val, p, i, deepDataAndEvents, value, y, walkers, v11, null);
        return delta / 2 >= path;
      }
    };
    var func = {
      /**
       * @param {number} now
       * @param {number} obj
       * @param {number} value
       * @param {number} x
       * @param {number} y
       * @param {number} deepDataAndEvents
       * @param {number} v00
       * @param {(number|string)} ms
       * @param {number} i
       * @return {?}
       */
      containStroke : function(now, obj, value, x, y, deepDataAndEvents, v00, ms, i) {
        if (0 === v00) {
          return false;
        }
        /** @type {number} */
        var delta = v00;
        if (i > obj + delta && (i > x + delta && i > deepDataAndEvents + delta) || (obj - delta > i && (x - delta > i && deepDataAndEvents - delta > i) || (ms > now + delta && (ms > value + delta && ms > y + delta) || now - delta > ms && (value - delta > ms && y - delta > ms)))) {
          return false;
        }
        var r = console.quadraticProjectPoint(now, obj, value, x, y, deepDataAndEvents, ms, i, null);
        return delta / 2 >= r;
      }
    };
    var ctx = {
      /**
       * @param {number} now
       * @param {number} obj
       * @param {number} value
       * @param {number} x
       * @param {number} y
       * @param {number} deepDataAndEvents
       * @param {number} v00
       * @param {number} x0
       * @param {number} x1
       * @return {?}
       */
      containStroke : function(now, obj, value, x, y, deepDataAndEvents, v00, x0, x1) {
        if (0 === v00) {
          return false;
        }
        /** @type {number} */
        var b = v00;
        x0 -= now;
        x1 -= obj;
        /** @type {number} */
        var a = Math.sqrt(x0 * x0 + x1 * x1);
        if (a - b > value || value > a + b) {
          return false;
        }
        if (Math.abs(x - y) % offset < 1E-4) {
          return true;
        }
        if (deepDataAndEvents) {
          /** @type {number} */
          var i = x;
          x = round(y);
          y = round(i);
        } else {
          x = round(x);
          y = round(y);
        }
        if (x > y) {
          y += offset;
        }
        /** @type {number} */
        var start = Math.atan2(x1, x0);
        return 0 > start && (start += offset), start >= x && y >= start || start + offset >= x && y >= start + offset;
      }
    };
    /**
     * @param {number} value
     * @param {number} from
     * @param {number} target
     * @param {number} i
     * @param {number} deepDataAndEvents
     * @param {number} to
     * @return {?}
     */
    var callback = function(value, from, target, i, deepDataAndEvents, to) {
      if (to > from && to > i || from > to && i > to) {
        return 0;
      }
      if (i === from) {
        return 0;
      }
      /** @type {number} */
      var o = from > i ? 1 : -1;
      /** @type {number} */
      var attack = (to - from) / (i - from);
      var tval = attack * (target - value) + value;
      return tval > deepDataAndEvents ? o : 0;
    };
    var node = path.CMD;
    /** @type {function (number, number, number, number, number, number, number): ?} */
    var assertEquals = containStroke.containStroke;
    /** @type {number} */
    var y = 1E-4;
    /** @type {Array} */
    var d = [-1, -1, -1];
    /** @type {Array} */
    var list = [-1, -1];
    return{
      /**
       * @param {number} prop
       * @param {number} deepDataAndEvents
       * @param {number} obj
       * @return {?}
       */
      contain : function(prop, deepDataAndEvents, obj) {
        return f(prop, 0, false, deepDataAndEvents, obj);
      },
      /**
       * @param {number} value
       * @param {number} obj
       * @param {number} name
       * @param {number} c
       * @return {?}
       */
      containStroke : function(value, obj, name, c) {
        return f(value, obj, true, name, c);
      }
    };
  }();
  var $ = function() {
    /**
     * @param {string} string
     * @param {string} text
     * @return {?}
     */
    function exec(string, text) {
      /** @type {string} */
      var i = string + ":" + text;
      if (qs[i]) {
        return qs[i];
      }
      /** @type {Array.<string>} */
      var lineArr = (string + "").split("\n");
      /** @type {number} */
      var val = 0;
      /** @type {number} */
      var lineIndex = 0;
      /** @type {number} */
      var cnl = lineArr.length;
      for (;cnl > lineIndex;lineIndex++) {
        /** @type {number} */
        val = Math.max(ctx.measureText(lineArr[lineIndex], text).width, val);
      }
      return a > b && (a = 0, qs = {}), a++, qs[i] = val, val;
    }
    /**
     * @param {string} message
     * @param {string} text
     * @param {?} x
     * @param {string} y
     * @return {?}
     */
    function drawText(message, text, x, y) {
      /** @type {number} */
      var m = ((message || "") + "").split("\n").length;
      var result = exec(message, text);
      var height = exec("\u56fd", text);
      /** @type {number} */
      var h = m * height;
      var p = new Node(0, 0, result, h);
      switch(p.lineHeight = height, y) {
        case "bottom":
        ;
        case "alphabetic":
          p.y -= height;
          break;
        case "middle":
          p.y -= height / 2;
      }
      switch(x) {
        case "end":
        ;
        case "right":
          p.x -= p.width;
          break;
        case "center":
          p.x -= p.width / 2;
      }
      return p;
    }
    var qs = {};
    /** @type {number} */
    var a = 0;
    /** @type {number} */
    var b = 5E3;
    var ctx = {
      /** @type {function (string, string): ?} */
      getWidth : exec,
      /** @type {function (string, string, ?, string): ?} */
      getBoundingRect : drawText,
      /**
       * @param {string} textString
       * @param {?} font
       * @return {?}
       */
      measureText : function(textString, font) {
        var ctx = makeCanvas();
        return ctx.font = font, ctx.measureText(textString);
      }
    };
    return ctx;
  }();
  var EventEmitter = function() {
    /**
     * @return {undefined}
     */
    var MicroEvent = function() {
      this.eventList = {};
    };
    return MicroEvent.prototype = {
      /**
       * @param {Function} name
       * @param {Function} handler
       * @param {Object} context
       * @param {?} obj
       * @return {?}
       */
      bind : function(name, handler, context, obj) {
        var normalized = this.eventList;
        return handler && name ? (normalized[name] || (normalized[name] = []), normalized[name].push({
          /** @type {Function} */
          handler : handler,
          one : obj,
          ctx : context || this
        }), this) : this;
      },
      /**
       * @param {?} i
       * @param {?} callback
       * @return {?}
       */
      unbind : function(i, callback) {
        var codeSegments = this.eventList;
        if (!i) {
          return this.eventList = {}, this;
        }
        if (callback) {
          if (codeSegments[i]) {
            /** @type {Array} */
            var elements = [];
            /** @type {number} */
            var j = 0;
            var spaces = codeSegments[i].length;
            for (;spaces > j;j++) {
              if (codeSegments[i][j].handler != callback) {
                elements.push(codeSegments[i][j]);
              }
            }
            /** @type {Array} */
            codeSegments[i] = elements;
          }
          if (codeSegments[i]) {
            if (0 === codeSegments[i].length) {
              delete codeSegments[i];
            }
          }
        } else {
          delete codeSegments[i];
        }
      },
      /**
       * @param {string} name
       * @return {?}
       */
      dispatch : function(name) {
        if (this.eventList[name]) {
          /** @type {Arguments} */
          var a = arguments;
          /** @type {number} */
          var al = a.length;
          if (al > 3) {
            a = util.slice.call(a, 1);
          }
          var map = this.eventList[name];
          var len = map.length;
          /** @type {number} */
          var i = 0;
          for (;len > i;) {
            switch(al) {
              case 1:
                map[i].handler.call(map[i].ctx);
                break;
              case 2:
                map[i].handler.call(map[i].ctx, a[1]);
                break;
              case 3:
                map[i].handler.call(map[i].ctx, a[1], a[2]);
                break;
              default:
                map[i].handler.apply(map[i].ctx, a);
            }
            if (map[i].one) {
              map.splice(i, 1);
              len--;
            } else {
              i++;
            }
          }
        }
        return this;
      }
    }, MicroEvent;
  }();
  var schema = function() {
    /**
     * @param {Array} context
     * @param {Object} canvas
     * @param {?} rows
     * @return {undefined}
     */
    function render(context, canvas, rows) {
      var h;
      var j = context.length;
      var original_layout = this.layout;
      var points = this.points;
      var b = points[0][1];
      var a = points[1][1];
      var x1 = original_layout[0][0];
      var x = original_layout[1][0];
      var req = this.paintTool;
      var param = req.param;
      var left = param.width;
      /** @type {number} */
      var c = a - b;
      /** @type {number} */
      var i = 0;
      for (;j > i;i++) {
        h = req._value2Y(c * context[i] + b);
        if (x > x1) {
          canvas.moveTo(x1, h);
          canvas.lineTo(left, h);
        } else {
          canvas.moveTo(x1, h);
          canvas.lineTo(0, h);
        }
      }
      if (!rows) {
        var ctx = canvas.getContext();
        /** @type {number} */
        var yMargin = (this.style.lineWidth || 1) / 2;
        ctx.save();
        ctx.fillStyle = this.style.strokeStyle || this.style.fillStyle;
        /** @type {string} */
        ctx.textAlign = "center";
        /** @type {number} */
        i = 0;
        for (;j > i;i++) {
          h = req._value2Y(c * context[i] + b);
          ctx.fillText((100 * context[i]).toFixed(1) + "% " + (b + c * context[i]).toFixed(1), x, h - yMargin);
        }
        ctx.restore();
      }
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    var cb = function(options) {
      options = options || {};
      if (options.paintTool) {
        this.paintTool = options.paintTool;
      }
      if (options.style) {
        this.style = options.style;
      }
      /** @type {number} */
      this.style.layoutPointRadius = 2 * (this.style.lineWidth || 1) + 3;
      this.path = new path;
      /** @type {Array} */
      this.layout = [];
      /** @type {Array} */
      this.points = [];
    };
    cb.prototype = {
      /** @type {function (Object): undefined} */
      constructor : cb,
      ignore : false,
      display : true,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      beforeDraw : function(ctx) {
        ctx.save();
        var lw = this.style.lineWidth;
        if (lw) {
          if (lw % 2 == 0) {
            ctx.translate(0.5, 0.5);
          }
        }
      },
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      afterDraw : function(ctx) {
        ctx.restore();
      },
      /**
       * @return {?}
       */
      getStyle : function() {
        return this.style;
      },
      /**
       * @param {Object} ctx
       * @param {Object} style
       * @return {undefined}
       */
      setStyle : function(ctx, style) {
        var s;
        for (s in style) {
          if (style.hasOwnProperty(s)) {
            ctx[s] = style[s];
          }
        }
      },
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      setShowLayoutPoint : function(recurring) {
        /** @type {boolean} */
        this.style.showLayoutPoint = recurring;
      },
      /**
       * @param {Object} ctx
       * @return {undefined}
       */
      draw : function(ctx) {
        var tempCtx = this.path;
        var style = this.getStyle();
        this.setStyle(ctx, style);
        this.beforeDraw(ctx);
        tempCtx.beginPath(ctx);
        /** @type {boolean} */
        var a = !!ctx.setLineDash;
        var lineDash = style.lineDash;
        var width = style.lineDashOffset;
        if (lineDash) {
          if (!a) {
            tempCtx.setLineDash(lineDash);
            if (width) {
              tempCtx.setLineDashOffset(width);
            }
          }
        }
        this.drawPath(tempCtx);
        tempCtx.afterPathBuild();
        if (style.fillStyle) {
          tempCtx.fill(ctx);
        }
        if (lineDash) {
          if (a) {
            ctx.setLineDash(lineDash);
            ctx.lineDashOffset = width;
          }
        }
        if (style.strokeStyle) {
          tempCtx.stroke(ctx);
        }
        this.afterDraw(ctx);
        if (this.style.showLayoutPoint) {
          this.drawLayoutPoint(ctx);
        }
      },
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawLayoutPoint : function(ctx) {
        ctx.beginPath();
        var tokenized = this.layout;
        var radius = this.style.layoutPointRadius;
        ctx.fillStyle = this.style.layoutPointColor;
        var index = tokenized.length;
        for (;index--;) {
          ctx.moveTo(tokenized[index][0] + radius, tokenized[index][1]);
          ctx.arc(tokenized[index][0], tokenized[index][1], radius, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
      },
      /**
       * @return {?}
       */
      drawPath : function() {
        throw new Error("drawPath not implemented in " + this.type);
      },
      /**
       * @return {?}
       */
      updateBoundingRect : function() {
        var c = this.style;
        var tempCtx = this.path;
        tempCtx.beginPath(this.paintTool.interactCtx);
        this.drawPath(tempCtx, true);
        var bbox = tempCtx.getBoundingRect();
        if (run(c)) {
          var maxStrokeWidth = c.lineWidth < x ? x : c.lineWidth;
          bbox.width += maxStrokeWidth;
          bbox.height += maxStrokeWidth;
          bbox.x -= maxStrokeWidth / 2;
          bbox.y -= maxStrokeWidth / 2;
        }
        return this._rect = bbox, bbox;
      },
      /**
       * @return {?}
       */
      getBoundingRect : function() {
        return!this._rect && this.updateBoundingRect(), this._rect;
      },
      /**
       * @param {number} value
       * @param {number} deepDataAndEvents
       * @return {?}
       */
      contain : function(value, deepDataAndEvents) {
        var self = this.style;
        var rchecked = this.getBoundingRect();
        if (rchecked.contain(value, deepDataAndEvents)) {
          var prop = this.path.data;
          if (run(self)) {
            var y = self.lineWidth;
            if (jQuery.containStroke(prop, x > y ? x : y, value, deepDataAndEvents)) {
              return true;
            }
          }
          if (loop(self)) {
            return jQuery.contain(prop, value, deepDataAndEvents);
          }
        }
        return false;
      }
    };
    /**
     * @param {?} r
     * @return {undefined}
     */
    var s = function(r) {
      cb.call(this, r);
    };
    s.prototype = {
      type : "DownTringle",
      pointsNum : 1,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout) {
          var original_layout = this.layout;
          var x = original_layout[0][0];
          var y = original_layout[0][1];
          /** @type {number} */
          var symbolSize = 5;
          ctx.moveTo(x, y);
          ctx.lineTo(x - symbolSize, y - symbolSize);
          ctx.lineTo(x + symbolSize, y - symbolSize);
          ctx.lineTo(x, y);
        }
      },
      /**
       * @return {?}
       */
      init : function() {
        return this.style.fillStyle = "gray", this;
      }
    };
    inherits(s, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Class = function(x) {
      cb.call(this, x);
    };
    Class.prototype = {
      type : "FreeArrow",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          /** @type {number} */
          var angle = Math.PI / 3;
          /** @type {number} */
          var s = 10 * (+(this.style.lineWidth || 1) + 2);
          var original_layout = this.layout;
          var x1 = original_layout[0][0];
          var y1 = original_layout[0][1];
          var x = original_layout[1][0];
          var y = original_layout[1][1];
          /** @type {number} */
          var r = Math.atan2(y - y1, x - x1);
          /** @type {number} */
          var delta = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
          if (delta < Math.cos(angle / 2) * s) {
            /** @type {number} */
            s = delta / Math.cos(angle / 2);
          }
          s /= 2;
          angle /= 2;
          /** @type {Array} */
          var p = [];
          p[0] = x1;
          p[1] = y1;
          p[6] = x;
          p[7] = y;
          /** @type {number} */
          p[8] = x - s * Math.cos(r + angle);
          /** @type {number} */
          p[9] = y - s * Math.sin(r + angle);
          /** @type {number} */
          p[4] = x - s * Math.cos(r - angle);
          /** @type {number} */
          p[5] = y - s * Math.sin(r - angle);
          /** @type {number} */
          var node = (p[4] + p[8]) / 2;
          /** @type {number} */
          var Y = (p[5] + p[9]) / 2;
          /** @type {number} */
          p[2] = (p[4] + node) / 2;
          /** @type {number} */
          p[3] = (p[5] + Y) / 2;
          /** @type {number} */
          p[10] = (p[8] + node) / 2;
          /** @type {number} */
          p[11] = (p[9] + Y) / 2;
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(p[2], p[3]);
          ctx.lineTo(p[4], p[5]);
          ctx.lineTo(p[6], p[7]);
          ctx.lineTo(p[8], p[9]);
          ctx.lineTo(p[10], p[11]);
          ctx.closePath();
        }
      },
      /**
       * @return {?}
       */
      init : function() {
        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle), this.style.strokeStyle = void 0), this;
      }
    };
    inherits(Class, cb);
    /**
     * @param {?} id
     * @return {undefined}
     */
    var Container = function(id) {
      cb.call(this, id);
    };
    Container.prototype = {
      type : "UpArrow",
      pointsNum : 1,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout) {
          var original_layout = this.layout;
          var cx = original_layout[0][0];
          var y = original_layout[0][1];
          /** @type {number} */
          var rx = +(this.style.lineWidth || 1) + 1;
          ctx.moveTo(cx, y);
          ctx.lineTo(cx - 3 * rx, y + 3 * rx);
          ctx.lineTo(cx - rx, y + 3 * rx);
          ctx.lineTo(cx - rx, y + 6 * rx);
          ctx.lineTo(cx + rx, y + 6 * rx);
          ctx.lineTo(cx + rx, y + 3 * rx);
          ctx.lineTo(cx + 3 * rx, y + 3 * rx);
          ctx.lineTo(cx, y);
        }
      },
      /**
       * @return {?}
       */
      init : function() {
        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle), this.style.strokeStyle = void 0), this;
      }
    };
    inherits(Container, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Shape = function(x) {
      cb.call(this, x);
    };
    Shape.prototype = {
      type : "DownArrow",
      pointsNum : 1,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout) {
          var original_layout = this.layout;
          var cx = original_layout[0][0];
          var y = original_layout[0][1];
          /** @type {number} */
          var rx = +(this.style.lineWidth || 1) + 1;
          ctx.moveTo(cx, y);
          ctx.lineTo(cx - 3 * rx, y - 3 * rx);
          ctx.lineTo(cx - rx, y - 3 * rx);
          ctx.lineTo(cx - rx, y - 6 * rx);
          ctx.lineTo(cx + rx, y - 6 * rx);
          ctx.lineTo(cx + rx, y - 3 * rx);
          ctx.lineTo(cx + 3 * rx, y - 3 * rx);
          ctx.lineTo(cx, y);
        }
      },
      /**
       * @return {?}
       */
      init : function() {
        return this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle), this.style.strokeStyle = void 0), this;
      }
    };
    inherits(Shape, cb);
    /**
     * @param {?} options
     * @return {undefined}
     */
    var Plugin = function(options) {
      Container.call(this, options);
    };
    Plugin.prototype = {
      type : "RedUpArrow",
      /**
       * @return {?}
       */
      init : function() {
        return this.style.fillStyle = "red", this.style.strokeStyle = void 0, this;
      }
    };
    inherits(Plugin, Container);
    /**
     * @param {?} options
     * @return {undefined}
     */
    var Editor = function(options) {
      Container.call(this, options);
    };
    Editor.prototype = {
      type : "GreenUpArrow",
      /**
       * @return {?}
       */
      init : function() {
        return this.style.fillStyle = "green", this.style.strokeStyle = void 0, this;
      }
    };
    inherits(Editor, Container);
    /**
     * @param {?} options
     * @return {undefined}
     */
    var List = function(options) {
      Shape.call(this, options);
    };
    List.prototype = {
      type : "GreenDownArrow",
      /**
       * @return {?}
       */
      init : function() {
        return this.style.fillStyle = "green", this.style.strokeStyle = void 0, this;
      }
    };
    inherits(List, Shape);
    /**
     * @param {?} options
     * @return {undefined}
     */
    var Agent = function(options) {
      Shape.call(this, options);
    };
    Agent.prototype = {
      type : "RedDownArrow",
      /**
       * @return {?}
       */
      init : function() {
        return this.style.fillStyle = "red", this.style.strokeStyle = void 0, this;
      }
    };
    inherits(Agent, Shape);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Text = function(x) {
      cb.call(this, x);
    };
    Text.prototype = {
      type : "Text",
      pointsNum : "Text",
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        var original_layout = this.layout;
        var style = this.style;
        var centreX = original_layout[0][0] || 0;
        var tY = original_layout[0][1] || 0;
        var str = style.text;
        var styleLength = style.fillStyle;
        var s = style.strokeStyle;
        if (null != str && (str += ""), str) {
          if (style.textVerticalAlign) {
            var json = $.getBoundingRect(str, ctx.font, style.textAlign, "top");
            switch(ctx.textBaseline = "middle", style.textVerticalAlign) {
              case "middle":
                tY -= json.height / 2 - json.lineHeight / 2;
                break;
              case "bottom":
                tY -= json.height - json.lineHeight / 2;
                break;
              default:
                tY += json.lineHeight / 2;
            }
          } else {
            ctx.textBaseline = style.textBaseline;
          }
          var originalWidth_ = $.measureText("\u56fd", ctx.font).width;
          var lineArr = str.split("\n");
          /** @type {number} */
          var i = 0;
          for (;i < lineArr.length;i++) {
            if (styleLength) {
              ctx.fillText(lineArr[i], centreX, tY);
            }
            if (s) {
              ctx.strokeText(lineArr[i], centreX, tY);
            }
            tY += originalWidth_;
          }
        }
      },
      /**
       * @return {?}
       */
      updateBoundingRect : function() {
        var params = this.style;
        var segment = this.layout[0];
        var i = params.textVerticalAlign;
        var cycle = $.getBoundingRect(params.text + "", params.font, params.textAlign, i ? "top" : params.textBaseline);
        switch(i) {
          case "middle":
            cycle.y -= cycle.height / 2;
            break;
          case "bottom":
            cycle.y -= cycle.height;
        }
        return cycle.x += segment[0] || 0, cycle.y += segment[1] || 0, this._rect = cycle, cycle;
      },
      /**
       * @param {number} obj
       * @param {number} deepDataAndEvents
       * @return {?}
       */
      contain : function(obj, deepDataAndEvents) {
        var r = this.getBoundingRect();
        return r.contain(obj, deepDataAndEvents);
      },
      /**
       * @param {CanvasRenderingContext2D} tempCtx
       * @return {undefined}
       */
      draw : function(tempCtx) {
        this.beforeDraw(tempCtx);
        var style = this.getStyle();
        this.setStyle(tempCtx, style);
        tempCtx.beginPath();
        this.drawPath(tempCtx);
        tempCtx.closePath();
        this.afterDraw(tempCtx);
        if (this.style.showLayoutPoint) {
          this.drawLayoutPoint(tempCtx);
        }
      },
      /**
       * @param {string} source
       * @return {?}
       */
      init : function(source) {
        return source ? (this.style.strokeStyle && (this.style.fillStyle || (this.style.fillStyle = this.style.strokeStyle), this.style.strokeStyle = void 0), this.style.text = source, this.style.textBaseline = "top", this) : false;
      }
    };
    inherits(Text, cb);
    /**
     * @param {?} data
     * @return {undefined}
     */
    var Line = function(data) {
      cb.call(this, data);
    };
    Line.prototype = {
      type : "Line",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var position;
          var radius;
          var tmp;
          var y;
          var original_layout = this.layout;
          var i = original_layout[0][0];
          var current = original_layout[0][1];
          var cur = original_layout[1][0];
          var opt_arg2 = original_layout[1][1];
          /** @type {number} */
          var rowHeight = (opt_arg2 - current) / (cur - i);
          /** @type {number} */
          var distance = current - rowHeight * i;
          var height = this.paintTool.showCanvas.height;
          var pageWidth = this.paintTool.showCanvas.width;
          switch(true) {
            case rowHeight == -(1 / 0):
            ;
            case rowHeight == 1 / 0:
              position = i;
              /** @type {number} */
              radius = 0;
              tmp = cur;
              y = height;
              break;
            case 0 > rowHeight:
              /** @type {number} */
              position = 0;
              /** @type {number} */
              radius = distance;
              /** @type {number} */
              tmp = -distance / rowHeight;
              /** @type {number} */
              y = 0;
              break;
            case 0 == rowHeight:
              /** @type {number} */
              position = 0;
              radius = current;
              tmp = pageWidth;
              y = opt_arg2;
              break;
            case rowHeight > 0:
              /** @type {number} */
              position = 0;
              /** @type {number} */
              radius = distance;
              /** @type {number} */
              tmp = (height - distance) / rowHeight;
              y = height;
          }
          ctx.moveTo(position, radius);
          ctx.lineTo(tmp, y);
        }
      }
    };
    inherits(Line, cb);
    /**
     * @param {?} value
     * @return {undefined}
     */
    var Level = function(value) {
      cb.call(this, value);
    };
    Level.prototype = {
      type : "Level",
      pointsNum : 1,
      /**
       * @param {Object} ctx
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      drawPath : function(ctx, dataAndEvents) {
        if (this.layout) {
          var marginDiv = this.paintTool;
          var xpos = marginDiv.showCanvas.width;
          var original_layout = this.layout;
          if (ctx.moveTo(0, original_layout[0][1]), ctx.lineTo(xpos, original_layout[0][1]), !dataAndEvents) {
            var context = ctx.getContext();
            /** @type {number} */
            var nodeRadius = (this.style.lineWidth || 1) / 2;
            context.save();
            context.fillStyle = this.style.strokeStyle || this.style.fillStyle;
            var title = this.points[0][1].toFixed(2);
            context.fillText(title, 0, original_layout[0][1] - nodeRadius);
            context.restore();
          }
        }
      }
    };
    inherits(Level, cb);
    /**
     * @param {?} param
     * @return {undefined}
     */
    var string = function(param) {
      cb.call(this, param);
    };
    string.prototype = {
      type : "Segment",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var original_layout = this.layout;
          ctx.moveTo(original_layout[0][0], original_layout[0][1]);
          ctx.lineTo(original_layout[1][0], original_layout[1][1]);
        }
      }
    };
    inherits(string, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var child = function(x) {
      cb.call(this, x);
    };
    child.prototype = {
      type : "Rect",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var original_layout = this.layout;
          var x = original_layout[0][0];
          var y = original_layout[0][1];
          var x2 = original_layout[1][0];
          var height = original_layout[1][1];
          ctx.rect(x, y, x2 - x, height - y);
        }
      }
    };
    inherits(child, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Bullet = function(x) {
      cb.call(this, x);
    };
    Bullet.prototype = {
      type : "Triangle",
      pointsNum : 3,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var xr;
          var hh;
          var original_layout = this.layout;
          var x = original_layout[0][0];
          var y = original_layout[0][1];
          var xPos = original_layout[1][0];
          var y3 = original_layout[1][1];
          if (original_layout[2]) {
            xr = original_layout[2][0];
            hh = original_layout[2][1];
          }
          ctx.moveTo(x, y);
          ctx.lineTo(xPos, y3);
          if (xr) {
            ctx.lineTo(xr, hh);
            ctx.lineTo(x, y);
          }
        }
      }
    };
    inherits(Bullet, cb);
    /**
     * @param {?} r
     * @return {undefined}
     */
    var e = function(r) {
      cb.call(this, r);
    };
    e.prototype = {
      type : "QuadraticCurve",
      pointsNum : 3,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var cp_x;
          var cy;
          var original_layout = this.layout;
          var ox = original_layout[0][0];
          var y0 = original_layout[0][1];
          var x3 = original_layout[1][0];
          var y = original_layout[1][1];
          if (original_layout[2]) {
            cp_x = original_layout[2][0];
            cy = original_layout[2][1];
            ctx.moveTo(ox, y0);
            ctx.quadraticCurveTo(cp_x, cy, x3, y);
          } else {
            ctx.moveTo(ox, y0);
            ctx.lineTo(x3, y);
          }
        }
      }
    };
    inherits(e, cb);
    /**
     * @param {?} i
     * @return {undefined}
     */
    var res = function(i) {
      cb.call(this, i);
    };
    res.prototype = {
      type : "Parallelogram",
      pointsNum : 3,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var xr;
          var hh;
          var xPos;
          var y3;
          var original_layout = this.layout;
          var x = original_layout[0][0];
          var y = original_layout[0][1];
          var ex = original_layout[1][0];
          var ty = original_layout[1][1];
          if (original_layout[2]) {
            xr = original_layout[2][0];
            hh = original_layout[2][1];
            xPos = original_layout[2][0] - original_layout[1][0] + original_layout[0][0];
            y3 = original_layout[2][1] - original_layout[1][1] + original_layout[0][1];
          }
          ctx.moveTo(x, y);
          ctx.lineTo(ex, ty);
          if (xr) {
            ctx.lineTo(xr, hh);
            ctx.lineTo(xPos, y3);
            ctx.lineTo(x, y);
          }
        }
      }
    };
    inherits(res, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Point = function(x) {
      cb.call(this, x);
    };
    Point.prototype = {
      type : "ParallelSegment",
      pointsNum : 3,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var left;
          var y;
          var original_layout = this.layout;
          var ox = original_layout[0][0];
          var py = original_layout[0][1];
          var x = original_layout[1][0];
          var height = original_layout[1][1];
          if (original_layout[2]) {
            left = original_layout[2][0] - original_layout[1][0] + original_layout[0][0];
            y = original_layout[2][1] - original_layout[1][1] + original_layout[0][1];
          }
          ctx.moveTo(ox, py);
          ctx.lineTo(x, height);
          if (original_layout[2]) {
            ctx.moveTo(left + (x - ox), y + (height - py));
            ctx.lineTo(left, y);
          }
        }
      }
    };
    inherits(Point, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var Anchor = function(x) {
      cb.call(this, x);
    };
    Anchor.prototype = {
      type : "ParallelLine",
      pointsNum : 3,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var pdataCur;
          var reversed;
          var dataAndEvents;
          var camelKey;
          var tf1;
          var bf3;
          var original_layout = this.layout;
          var node = original_layout[0][0];
          var udataCur = original_layout[0][1];
          var pdataOld = original_layout[1][0];
          var suiteView = original_layout[1][1];
          /** @type {number} */
          var classNames = (suiteView - udataCur) / (pdataOld - node);
          /** @type {number} */
          var oldconfig = udataCur - classNames * node;
          var sh = this.paintTool.showCanvas.height;
          var failuresLink = this.paintTool.showCanvas.width;
          if (original_layout[2]) {
            pdataCur = original_layout[2][0];
            reversed = original_layout[2][1];
            dataAndEvents = original_layout[2][0] - original_layout[1][0] + original_layout[0][0];
            camelKey = original_layout[2][1] - original_layout[1][1] + original_layout[0][1];
          }
          tf1 = this.getBoundryXY(failuresLink, sh, node, udataCur, pdataOld, suiteView, classNames, oldconfig);
          ctx.moveTo(tf1.xF, tf1.yF);
          ctx.lineTo(tf1.xT, tf1.yT);
          if (original_layout[2]) {
            /** @type {number} */
            oldconfig = camelKey - classNames * dataAndEvents;
            bf3 = this.getBoundryXY(failuresLink, sh, dataAndEvents, camelKey, pdataCur, reversed, classNames, oldconfig);
            ctx.moveTo(bf3.xF, bf3.yF);
            ctx.lineTo(bf3.xT, bf3.yT);
          }
        }
      },
      /**
       * @param {number} el
       * @param {number} a
       * @param {number} dataAndEvents
       * @param {number} value
       * @param {number} data
       * @param {number} obj
       * @param {number} i
       * @param {number} b
       * @return {?}
       */
      getBoundryXY : function(el, a, dataAndEvents, value, data, obj, i, b) {
        var xF;
        var left;
        var result;
        var _ref;
        switch(true) {
          case i == -(1 / 0):
          ;
          case i == 1 / 0:
            /** @type {number} */
            xF = dataAndEvents;
            /** @type {number} */
            left = 0;
            /** @type {number} */
            result = data;
            /** @type {number} */
            _ref = a;
            break;
          case 0 > i:
            /** @type {number} */
            xF = 0;
            /** @type {number} */
            left = b;
            /** @type {number} */
            result = -b / i;
            /** @type {number} */
            _ref = 0;
            break;
          case 0 == i:
            /** @type {number} */
            xF = 0;
            /** @type {number} */
            left = value;
            /** @type {number} */
            result = el;
            /** @type {number} */
            _ref = obj;
            break;
          case i > 0:
            /** @type {number} */
            xF = 0;
            /** @type {number} */
            left = b;
            /** @type {number} */
            result = (a - b) / i;
            /** @type {number} */
            _ref = a;
        }
        return{
          xF : xF,
          yF : left,
          xT : result,
          yT : _ref
        };
      }
    };
    inherits(Anchor, cb);
    /**
     * @param {?} value
     * @return {undefined}
     */
    var val = function(value) {
      cb.call(this, value);
    };
    val.prototype = {
      type : "Pen",
      pointsNum : "Pen",
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var employees = this.layout;
          ctx.moveTo(employees[0][0], employees[0][1]);
          /** @type {number} */
          var i = 1;
          var l = employees.length;
          for (;l > i;i++) {
            ctx.lineTo(employees[i][0], employees[i][1]);
          }
        }
      }
    };
    inherits(val, cb);
    /**
     * @param {?} r
     * @return {undefined}
     */
    var ScheduledObserver = function(r) {
      cb.call(this, r);
    };
    ScheduledObserver.prototype = {
      type : "BezierCurve",
      pointsNum : 4,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var deepDataAndEvents;
          var cy;
          var aX;
          var uy;
          var original_layout = this.layout;
          var ox = original_layout[0][0];
          var y0 = original_layout[0][1];
          var x = original_layout[1][0];
          var y = original_layout[1][1];
          if (original_layout[3]) {
            deepDataAndEvents = original_layout[2][0];
            cy = original_layout[2][1];
            aX = original_layout[3][0];
            uy = original_layout[3][1];
            ctx.moveTo(ox, y0);
            ctx.bezierCurveTo(deepDataAndEvents, cy, aX, uy, x, y);
          } else {
            if (original_layout[2]) {
              deepDataAndEvents = original_layout[2][0];
              cy = original_layout[2][1];
              ctx.moveTo(ox, y0);
              ctx.quadraticCurveTo(deepDataAndEvents, cy, x, y);
            } else {
              ctx.moveTo(ox, y0);
              ctx.lineTo(x, y);
            }
          }
        }
      }
    };
    inherits(ScheduledObserver, cb);
    /**
     * @param {?} x
     * @return {undefined}
     */
    var f = function(x) {
      cb.call(this, x);
    };
    f.prototype = {
      type : "Fibonacci",
      pointsNum : 2,
      /**
       * @param {Object} ctx
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      drawPath : function(ctx, dataAndEvents) {
        if (this.layout && !(this.layout.length < 2)) {
          /** @type {number} */
          var i = this.points[1][0] - this.points[0][0];
          if (0 != i) {
            var padding;
            var original_layout = this.layout;
            var initX = original_layout[0][0];
            var chunk = this.paintTool;
            var q = this.paintTool.param;
            var l = q.width;
            var y = q.height;
            var offset = this.points[0][0];
            /** @type {number} */
            var result = 1;
            /** @type {number} */
            var value = 0;
            var x = initX;
            for (;i > 0 && l > x || 0 > i && x > 0;) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, y);
              /** @type {number} */
              padding = value;
              /** @type {number} */
              value = result;
              /** @type {number} */
              result = padding + result;
              x = chunk._index2X(offset + result * i);
            }
            if (!dataAndEvents) {
              var context = ctx.getContext();
              /** @type {number} */
              var nodeRadius = (this.style.lineWidth || 1) / 2;
              context.save();
              context.fillStyle = this.style.strokeStyle || this.style.fillStyle;
              /** @type {string} */
              context.textBaseline = "top";
              /** @type {number} */
              result = 1;
              /** @type {number} */
              value = 0;
              x = initX;
              for (;i > 0 && l > x || 0 > i && x > 0;) {
                /** @type {number} */
                padding = value;
                /** @type {number} */
                value = result;
                /** @type {number} */
                result = padding + result;
                x = chunk._index2X(offset + result * i);
                context.fillText(result.toFixed(0), x + nodeRadius, 0);
              }
              context.restore();
            }
          }
        }
      }
    };
    inherits(f, cb);
    /**
     * @param {?} r
     * @return {undefined}
     */
    var AutoDetachObserver = function(r) {
      cb.call(this, r);
    };
    AutoDetachObserver.prototype = {
      type : "CycleLine",
      pointsNum : 2,
      /**
       * @param {Object} ctx
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      drawPath : function(ctx, dataAndEvents) {
        if (this.layout && !(this.layout.length < 2)) {
          var x;
          var points = this.points;
          var reserved = this.paintTool;
          var params = this.paintTool.param;
          var len = params.width;
          var y = params.height;
          var startIndex = points[0][0];
          /** @type {number} */
          var end = points[1][0] - points[0][0];
          var i = startIndex;
          do {
            x = reserved._index2X(i);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, y);
            i += end;
          } while (0 > end && x > 0 || end > 0 && len > x);
          if (!dataAndEvents) {
            var context = ctx.getContext();
            /** @type {number} */
            var nodeRadius = (this.style.lineWidth || 1) / 2;
            context.save();
            context.fillStyle = this.style.strokeStyle || this.style.fillStyle;
            /** @type {string} */
            context.textBaseline = "top";
            i = startIndex;
            do {
              x = reserved._index2X(i);
              ctx.moveTo(x, 0);
              ctx.lineTo(x, y);
              context.fillText((i - startIndex).toFixed(0), x + nodeRadius, 0);
              i += end;
            } while (0 > end && x > 0 || end > 0 && len > x);
            context.restore();
          }
        }
      }
    };
    inherits(AutoDetachObserver, cb);
    /**
     * @param {?} fn
     * @return {undefined}
     */
    var proxy = function(fn) {
      cb.call(this, fn);
    };
    proxy.prototype = {
      type : "GoldenSection",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @param {boolean} stroke
       * @return {undefined}
       */
      drawPath : function(ctx, stroke) {
        if (this.layout && !(this.layout.length < 2)) {
          /** @type {Array} */
          var data = [0, 0.236, 0.382, 0.5, 0.618, 0.809, 1, 1.382, 1.5, 1.618, 2, 2.382, 2.618, 4.236, 6.854];
          render.call(this, data, ctx, stroke);
        }
      }
    };
    inherits(proxy, cb);
    /**
     * @param {?} id
     * @return {undefined}
     */
    var Client = function(id) {
      cb.call(this, id);
    };
    Client.prototype = {
      type : "PercentLine",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @param {boolean} stroke
       * @return {undefined}
       */
      drawPath : function(ctx, stroke) {
        if (this.layout && !(this.layout.length < 2)) {
          /** @type {Array} */
          var data = [0, 0.125, 0.25, 0.333, 0.375, 0.5, 0.625, 0.667, 0.75, 0.875, 1];
          render.call(this, data, ctx, stroke);
        }
      }
    };
    inherits(Client, cb);
    /**
     * @param {?} handler
     * @return {undefined}
     */
    var CatchScheduler = function(handler) {
      cb.call(this, handler);
    };
    CatchScheduler.prototype = {
      type : "LinearRegressionBand",
      pointsNum : 2,
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var chunk;
          var original_layout = this.layout;
          var px = original_layout[0][0];
          var rx = original_layout[1][0];
          var buf = this.paintTool;
          var self = this.paintTool.param;
          var y = self.height;
          var buffer = self.data;
          var width = self.xScale;
          var i = self.zoom[0];
          /** @type {number} */
          var b = Math.floor(px / width);
          /** @type {number} */
          var a = Math.floor(rx / width);
          /** @type {number} */
          var d = Math.abs(a - b) + 1;
          if (!(2 > d)) {
            if (a + i > buffer.length - 1) {
              /** @type {number} */
              a = buffer.length - i - 1;
              /** @type {number} */
              b = a - d + 1;
            }
            if (0 > b + i) {
              /** @type {number} */
              b = 0;
              /** @type {number} */
              a = b + d - 1;
            }
            px = buf._index2X(b + i);
            rx = buf._index2X(a + i);
            /** @type {number} */
            chunk = (rx - px) / (d - 1);
            var x = px;
            /** @type {Array} */
            var series = [];
            /** @type {number} */
            var s = 0;
            for (;d > s;s++) {
              series.push([x, buf._value2Y(buffer[i + b + (a > b ? s : -s)].close)]);
              x += chunk;
            }
            var x1;
            var KAPPA;
            /** @type {number} */
            var t = 0;
            /** @type {number} */
            var cx = 0;
            /** @type {number} */
            var val = 0;
            /** @type {number} */
            var max = 0;
            /** @type {number} */
            s = 0;
            for (;d > s;s++) {
              t += series[s][0];
              cx += series[s][1];
            }
            t /= d;
            cx /= d;
            /** @type {number} */
            s = 0;
            for (;d > s;s++) {
              val += series[s][0] * series[s][1];
              max += series[s][0] * series[s][0];
            }
            /** @type {number} */
            KAPPA = (val - d * t * cx) / (max - d * t * t);
            /** @type {number} */
            x1 = cx - KAPPA * t;
            /** @type {number} */
            var y0 = x1 + KAPPA * px;
            /** @type {number} */
            var hh = x1 + KAPPA * rx;
            ctx.moveTo(px, y0);
            ctx.lineTo(rx, hh);
            this.layout[0][0] = px;
            /** @type {number} */
            this.layout[0][1] = y0;
            this.layout[1][0] = rx;
            /** @type {number} */
            this.layout[1][1] = hh;
            var offset;
            var index;
            if (a > b) {
              offset = b + i;
              index = a + i;
            } else {
              offset = a + i;
              index = b + i;
            }
            var failuresLink = buffer.slice(offset, index + 1);
            var match = on(failuresLink, function(val, i) {
              return x1 + KAPPA * buf._index2X(offset + i) - buf._value2Y(val.high);
            });
            /** @type {number} */
            var cy = buf._value2Y(buffer[offset + match.index].high) - buf._index2X(offset + match.index) * KAPPA;
            /** @type {number} */
            var startY = cy + KAPPA * px;
            /** @type {number} */
            var y3 = cy + KAPPA * rx;
            ctx.moveTo(px, startY);
            ctx.lineTo(rx, y3);
            var before = on(failuresLink, function(rc, i) {
              return buf._value2Y(rc.low) - (x1 + KAPPA * buf._index2X(offset + i));
            });
            /** @type {number} */
            var oy = buf._value2Y(buffer[offset + before.index].low) - buf._index2X(offset + before.index) * KAPPA;
            /** @type {number} */
            var ty = oy + KAPPA * px;
            /** @type {number} */
            var posY = oy + KAPPA * rx;
            ctx.moveTo(px, ty);
            ctx.lineTo(rx, posY);
            ctx.moveTo(px, 0);
            ctx.lineTo(px, y);
            ctx.moveTo(rx, 0);
            ctx.lineTo(rx, y);
          }
        }
      },
      /**
       * @return {?}
       */
      init : function() {
        return this.paintTool.param.data ? this : false;
      }
    };
    inherits(CatchScheduler, cb);
    /**
     * @param {?} r
     * @return {undefined}
     */
    var Screen = function(r) {
      cb.call(this, r);
    };
    Screen.prototype = {
      type : "Ruler",
      pointsNum : 2,
      /**
       * @param {Object} context
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      drawPath : function(context, dataAndEvents) {
        if (this.layout && !(this.layout.length < 2)) {
          var original_layout = this.layout;
          var y = original_layout[0][1];
          var h = original_layout[1][1];
          var x = original_layout[0][0];
          var x1 = original_layout[1][0];
          if (context.moveTo(x, y), context.lineTo(x1, y), context.lineTo(x1, h), context.lineTo(x, y), !dataAndEvents) {
            var startAngle;
            var angle;
            var bisection;
            var size;
            var width;
            var ctx = context.getContext();
            /** @type {number} */
            var _ref2 = (this.style.lineWidth || 1) / 2;
            var bottom = this.points[0][1];
            var top = this.points[1][1];
            var left = this.points[0][0];
            var right = this.points[1][0];
            /** @type {number} */
            var theta = Math.atan2(h - y, x1 - x);
            /** @type {number} */
            var a = Math.abs(theta / Math.PI * 180);
            /** @type {number} */
            var radius = Math.min(Math.abs(x1 - x), Math.abs(h - y), 15);
            if (a > 90) {
              /** @type {number} */
              a = 180 - a;
            }
            /** @type {number} */
            size = top > bottom ? _ref2 : -_ref2;
            /** @type {number} */
            width = right > left ? _ref2 : -_ref2;
            ctx.save();
            ctx.moveTo(x, y);
            ctx.fillStyle = this.style.strokeStyle || this.style.fillStyle;
            /** @type {string} */
            ctx.textBaseline = top > bottom ? "bottom" : "top";
            /** @type {string} */
            ctx.textAlign = "center";
            ctx.fillText((right - left).toFixed(0), (x + x1) / 2, y + size);
            /** @type {string} */
            ctx.textAlign = right > left ? "right" : "left";
            ctx.fillText(bottom.toFixed(2), x1 + width, y);
            /** @type {string} */
            ctx.textBaseline = top > bottom ? "top" : "bottom";
            ctx.fillText(top.toFixed(2), x1 + width, h);
            /** @type {string} */
            ctx.textBaseline = "middle";
            ctx.fillText((top - bottom).toFixed(2) + "(" + ((top - bottom) / bottom * 100).toFixed(2) + "%)", x1 + width, (y + h) / 2);
            if (right > left) {
              /** @type {string} */
              ctx.textAlign = "left";
              if (top > bottom) {
                /** @type {number} */
                startAngle = theta;
                /** @type {number} */
                angle = 0;
              } else {
                /** @type {number} */
                startAngle = 0;
                /** @type {number} */
                angle = theta;
              }
              /** @type {number} */
              bisection = theta / 2;
            } else {
              /** @type {string} */
              ctx.textAlign = "right";
              if (top > bottom) {
                /** @type {number} */
                startAngle = -Math.PI;
                /** @type {number} */
                angle = theta;
                /** @type {number} */
                bisection = (theta - Math.PI) / 2;
              } else {
                /** @type {number} */
                startAngle = theta;
                /** @type {number} */
                angle = Math.PI;
                /** @type {number} */
                bisection = (theta + Math.PI) / 2;
              }
            }
            ctx.arc(x, y, radius, startAngle, angle);
            radius += 3;
            ctx.fillText(a.toFixed(0) + "\u00b0", x + Math.cos(bisection) * radius + width, y + Math.sin(bisection) * radius);
            ctx.restore();
          }
        }
      }
    };
    inherits(Screen, cb);
    /**
     * @param {?} r
     * @return {undefined}
     */
    var AnonymousObserver = function(r) {
      cb.call(this, r);
    };
    return AnonymousObserver.prototype = {
      type : "Wave",
      pointsNum : "Wave",
      /**
       * @param {CanvasRenderingContext2D} ctx
       * @return {undefined}
       */
      drawPath : function(ctx) {
        if (this.layout && !(this.layout.length < 2)) {
          var employees = this.layout;
          ctx.moveTo(employees[0][0], employees[0][1]);
          /** @type {number} */
          var i = 0;
          var l = employees.length;
          for (;l > i;i++) {
            ctx.lineTo(employees[i][0], employees[i][1]);
          }
        }
      }
    }, inherits(AnonymousObserver, cb), {
      /** @type {function (Object): undefined} */
      Base : cb,
      /** @type {function (?): undefined} */
      DownTringle : s,
      /** @type {function (?): undefined} */
      FreeArrow : Class,
      /** @type {function (?): undefined} */
      UpArrow : Container,
      /** @type {function (?): undefined} */
      DownArrow : Shape,
      /** @type {function (?): undefined} */
      RedUpArrow : Plugin,
      /** @type {function (?): undefined} */
      GreenUpArrow : Editor,
      /** @type {function (?): undefined} */
      GreenDownArrow : List,
      /** @type {function (?): undefined} */
      RedDownArrow : Agent,
      /** @type {function (?): undefined} */
      Text : Text,
      /** @type {function (?): undefined} */
      Segment : string,
      /** @type {function (?): undefined} */
      Line : Line,
      /** @type {function (?): undefined} */
      Level : Level,
      /** @type {function (?): undefined} */
      Rect : child,
      /** @type {function (?): undefined} */
      QuadraticCurve : e,
      /** @type {function (?): undefined} */
      BezierCurve : ScheduledObserver,
      /** @type {function (?): undefined} */
      Triangle : Bullet,
      /** @type {function (?): undefined} */
      Parallelogram : res,
      /** @type {function (?): undefined} */
      ParallelLine : Anchor,
      /** @type {function (?): undefined} */
      ParallelSegment : Point,
      /** @type {function (?): undefined} */
      Pen : val,
      /** @type {function (?): undefined} */
      CycleLine : AutoDetachObserver,
      /** @type {function (?): undefined} */
      Fibonacci : f,
      /** @type {function (?): undefined} */
      GoldenSection : proxy,
      /** @type {function (?): undefined} */
      PercentLine : Client,
      /** @type {function (?): undefined} */
      LinearRegressionBand : CatchScheduler,
      /** @type {function (?): undefined} */
      Ruler : Screen,
      /** @type {function (?): undefined} */
      Wave : AnonymousObserver
    };
  }();
  /**
   * @return {undefined}
   */
  var Game = function() {
    EventEmitter.call(this);
  };
  var b = {
    localStorage : false,
    parentDiv : void 0,
    width : void 0,
    height : void 0,
    top : 0,
    left : 0,
    showZIndex : 35,
    interactZIndex : 55,
    zoom : void 0,
    domain : void 0,
    style : {
      layoutPointRadius : 5,
      layoutPointColor : "rgba(0, 0, 0, 0.5)",
      showLayoutPoint : false,
      lineWidth : 1,
      font : "12px arial"
    },
    paintTool : "Close",
    shapeListName : "default",
    shapeListType : "paintTool",
    paintOnEachCenter : false,
    rangeData : void 0,
    data : void 0,
    saveKeyPreName : void 0,
    checkIfNotSave : void 0
  };
  return Game.prototype = {
    Shapes : schema,
    /**
     * @param {Object} time
     * @return {undefined}
     */
    init : function(time) {
      if (!this.parentDiv) {
        var res = fn(b, time);
        this.param = res;
        this._initWH();
        this._initZoom();
        this._initDomain();
        var r20 = res.parentDiv;
        this.dpr = s;
        this.showCanvas = this._createCanvas(r20, res.showZIndex);
        this.interactCanvas = this._createCanvas(r20, res.interactZIndex);
        /** @type {number} */
        this.interactCanvas.tabIndex = 0;
        /** @type {string} */
        this.interactCanvas.style.outline = "none";
        this.showCtx = this.showCanvas.getContext("2d");
        this.interactCtx = this.interactCanvas.getContext("2d");
        this.hdContext();
        this._setParentDiv(r20);
        /** @type {string} */
        this.interactCanvas.style.display = "Close" === res.paintTool ? "none" : "";
        this._setScale();
        this.shapeList = {};
        this.shapeList[res.shapeListName] = {};
        /** @type {Array} */
        this.shapeList[res.shapeListName][res.shapeListType] = [];
        this._addPaintEvent();
        if (res.localStorage) {
          this._restoreLocalStorage();
        }
        this.refresh();
      }
    },
    /**
     * @return {undefined}
     */
    hdContext : function() {
      var temp = this.dpr;
      if (1 != temp) {
        this.showCtx.scale(temp, temp);
        this.interactCtx.scale(temp, temp);
      }
    },
    /**
     * @return {undefined}
     */
    _initWH : function() {
      var b = this.param;
      var next = b.parentDiv;
      if (!b.width) {
        b.width = next.offsetWidth;
      }
      if (!b.height) {
        b.height = next.offsetHeight;
      }
    },
    /**
     * @return {undefined}
     */
    _initZoom : function() {
      var values = this.param;
      if (!values.zoom) {
        /** @type {Array} */
        values.zoom = [0, values.width];
      }
    },
    /**
     * @return {undefined}
     */
    _initDomain : function() {
      var radius = this.param;
      if (!radius.domain) {
        /** @type {Array} */
        radius.domain = [0, radius.height];
      }
    },
    /**
     * @return {undefined}
     */
    _addPaintEvent : function() {
      /**
       * @param {Object} obj
       * @return {undefined}
       */
      function empty(obj) {
        obj.layout.pop();
        obj.points.pop();
      }
      /**
       * @param {Object} item
       * @param {?} arg
       * @param {?} param
       * @return {undefined}
       */
      function fn(item, arg, param) {
        item.layout.push(arg);
        item.points.push(param);
      }
      /**
       * @param {Event} event
       * @return {?}
       */
      function reset(event) {
        if (0 == event.which || 1 == event.which) {
          var view = self._curPaintTool;
          var len = self._painting;
          var node = self._draggedShape;
          if (x = f(event, element), y = self._getIndexAndValue(x), obj.paintOnEachCenter && (x = self._getXAndY(y)), j = x[0], min = x[1], nodes = self.getCurrentShapeList(), item = self._getPointIndexByXY(x), i = self._getShapeIndexByXY(x), void 0 === item || len) {
            if ("Number" != isArray(i) || len) {
              if (schema.hasOwnProperty(obj.paintTool)) {
                if (len = true, !view) {
                  if (view = new schema[obj.paintTool]({
                    paintTool : self,
                    style : clone(obj.style, true)
                  }), view.init && view.init() === false) {
                    return len = false, void(view = null);
                  }
                  view.setShowLayoutPoint(true);
                }
                if ("Number" === isArray(view.pointsNum)) {
                  if (view.layout.length > 2) {
                    empty(view);
                  }
                  fn(view, x, y);
                  self.clear(element);
                  view.draw(text);
                } else {
                  switch(view.pointsNum) {
                    case "Pen":
                      view.setShowLayoutPoint(false);
                      break;
                    case "Wave":
                      if (1 != event.which) {
                        return len = false, void(view = null);
                      }
                      empty(view);
                  }
                  fn(view, x, y);
                }
              }
              switch(obj.paintTool) {
                case "Select":
                  /** @type {boolean} */
                  D = true;
              }
            } else {
              node = nodes[i];
              if ("Pen" != node.type) {
                node.setShowLayoutPoint(true);
              }
              cache = clone(node.layout, true);
              /** @type {boolean} */
              node.display = false;
              node.draw(text);
              self.clear();
              self.paint();
            }
          } else {
            node = item.shape;
            start = item.index;
            cache = clone(node.layout, true);
            /** @type {boolean} */
            node.display = false;
            node.draw(text);
            self.clear();
            self.paint();
          }
          /** @type {null} */
          self._selectedShape = null;
          self._painting = len;
          self._curPaintTool = view;
          self._draggedShape = node;
          event.preventDefault();
          event.stopPropagation();
        }
      }
      /**
       * @param {Event} event
       * @return {undefined}
       */
      function render(event) {
        var container = self._curPaintTool;
        var len = self._painting;
        var data = self._draggedShape;
        if (x = f(event, element), y = self._getIndexAndValue(x), obj.paintOnEachCenter && (x = self._getXAndY(y)), len || (data ? item ? element.style.cursor = "pointer" : "Number" == isArray(i) && (element.style.cursor = "move") : element.style.cursor = void 0 !== self._getPointIndexByXY(x) ? "pointer" : void 0 !== self._getShapeIndexByXY(x) ? "move" : "Write" == obj.paintTool ? "text" : ""), data) {
          if (data.updateBoundingRect(), distanceBackward = x[0] - j, range = x[1] - min, item) {
            data.layout[start][0] = cache[start][0] + distanceBackward;
            data.layout[start][1] = cache[start][1] + range;
          } else {
            if ("Number" == isArray(i)) {
              var k = data.layout.length;
              for (;k--;) {
                data.layout[k][0] = cache[k][0] + distanceBackward;
                data.layout[k][1] = cache[k][1] + range;
              }
            }
          }
          data.points = self._layout2Points(data.layout);
          self.clear(element);
          data.draw(text);
        } else {
          if (len) {
            if (self.clear(element), "Number" === isArray(container.pointsNum)) {
              if (1 === container.pointsNum) {
                container.layout[0] = x;
                container.points[0] = y;
              } else {
                if (container.pointsNum > 1) {
                  if (container.layout.length > 1) {
                    empty(container);
                  }
                  fn(container, x, y);
                }
              }
              container.draw(text);
            } else {
              switch(container.pointsNum) {
                case "Wave":
                  if (!child) {
                    child = new schema.Text({
                      style : {
                        text : "\u53f3\u952e\n\u7ed3\u675f",
                        fillStyle : "#000"
                      }
                    });
                  }
                  /** @type {Array} */
                  child.layout = [[x[0] + 10, x[1]]];
                  child.draw(text);
                  if (container.layout.length > 1) {
                    empty(container);
                  }
                ;
              }
              fn(container, x, y);
              container.draw(text);
            }
          }
          switch(obj.paintTool) {
            case "Delete":
              /** @type {string} */
              element.style.cursor = void 0 !== self._getShapeIndexByXY(x) ? "pointer" : "";
              break;
            case "Select":
              if (D) {
                if (!that) {
                  that = new schema.Rect({
                    style : {
                      strokeStyle : "#000",
                      fillStyle : "rgba(0, 0, 0, 0.1)"
                    }
                  });
                }
                self.clear(element);
                /** @type {Array} */
                that.layout = [[j, min], x];
                that.draw(text);
              }
              break;
            case "Hover":
              var idx = self._getShapeIndexByXY(x);
              if (void 0 !== idx) {
                self.dispatch("hover", {
                  x : x[0],
                  y : x[1],
                  index : idx,
                  target : nodes[idx],
                  shapeListType : self.param.shapeListType
                });
              } else {
                self.dispatch("unhover", {
                  x : x[0],
                  y : x[1]
                });
              }
            ;
          }
        }
        self._painting = len;
        self._curPaintTool = container;
        self._draggedShape = data;
        event.preventDefault();
        event.stopPropagation();
      }
      /**
       * @param {Event} event
       * @return {undefined}
       */
      function init(event) {
        /**
         * @return {undefined}
         */
        function draw() {
          var part;
          var messages = field.value.split(/\s/);
          var font = obj.style.font;
          var max = $.measureText("\u56fd", font).width;
          /** @type {number} */
          var left = 0;
          var i = messages.length;
          for (;i--;) {
            var ow = $.measureText(messages[i], font).width;
            if (ow > left) {
              part = messages[i];
              left = ow;
            }
          }
          /** @type {string} */
          field.style.width = left + width + "px";
          /** @type {string} */
          field.style.height = max * messages.length + "px";
        }
        if (0 == event.which || (1 == event.which || 3 == event.which)) {
          var parent;
          var data = self._curPaintTool;
          var len = self._painting;
          var editor = self._draggedShape;
          if (x = f(event, element), y = self._getIndexAndValue(x), editor) {
            /** @type {boolean} */
            editor.display = true;
            self.clear(element);
            self.paint();
            /** @type {null} */
            item = null;
            start = void 0;
            parent = editor;
            /** @type {null} */
            editor = null;
          } else {
            if (len) {
              if (self.clear(element), "Number" === isArray(data.pointsNum)) {
                if (y = self._getIndexAndValue(x), fn(data, x, y), data.draw(text), 2 == data.pointsNum && data.layout.length == data.pointsNum) {
                  self.clear(element);
                  /** @type {boolean} */
                  len = false;
                  /** @type {null} */
                  data = null;
                } else {
                  if (data.layout.length > data.pointsNum) {
                    /** @type {boolean} */
                    len = false;
                    for (;data.layout.length > data.pointsNum;) {
                      empty(data);
                    }
                    self.clear(element);
                    data.draw(v);
                    nodes.push(data);
                    parent = data;
                    /** @type {null} */
                    data = null;
                  }
                }
              } else {
                switch(data.pointsNum) {
                  case "Pen":
                    data.draw(v);
                    /** @type {boolean} */
                    len = false;
                    nodes.push(data);
                    parent = data;
                    /** @type {null} */
                    data = null;
                    break;
                  case "Wave":
                    if (1 == event.which) {
                      fn(data, x, y);
                      data.draw(text);
                    } else {
                      data.draw(v);
                      /** @type {boolean} */
                      len = false;
                      nodes.push(data);
                      parent = data;
                      /** @type {null} */
                      data = null;
                    }
                  ;
                }
              }
            }
            switch(obj.paintTool) {
              case "Select":
                if (D) {
                  self.clear(element);
                  self.select([[j, min], x]);
                  /** @type {boolean} */
                  D = false;
                }
                break;
              case "Write":
                if (field || (field = document.createElement("textArea"), style = field.style, style.position = "absolute", style.left = event.pageX + "px", style.top = event.pageY + "px", style.border = 0, style.outline = "none", style.padding = "1px 0", style.zIndex = 9999, style.overflow = "hidden", style.resize = "none", style.wrap = "off", field.addEventListener("blur", function() {
                  if (self._writingText) {
                    if (field.value.length) {
                      container.init(field.value);
                      container.draw(v);
                      nodes.push(container);
                    }
                    /** @type {null} */
                    self._writingText = null;
                    /** @type {string} */
                    field.value = "";
                    /** @type {string} */
                    style.display = "none";
                  }
                }), field.addEventListener("input", draw), document.body.appendChild(field)), self._writingText) {
                  field.blur();
                } else {
                  /** @type {string} */
                  style.left = event.pageX + "px";
                  /** @type {string} */
                  style.top = event.pageY + "px";
                  /** @type {string} */
                  style.display = "";
                  field.focus();
                  container = new schema.Text({
                    paintTool : self,
                    style : clone(obj.style, true)
                  });
                  var font = container.style.font;
                  var width = $.measureText("\u56fd", font).width;
                  style.font = font;
                  style.color = obj.style.strokeStyle;
                  /** @type {string} */
                  style.lineHeight = width + "px";
                  /** @type {string} */
                  style.height = width + "px";
                  /** @type {string} */
                  style.width = width + "px";
                  container.layout[0] = x;
                  container.points[0] = y;
                  self._writingText = container;
                }
              ;
            }
          }
          self._selectedShape = parent;
          self._painting = len;
          self._curPaintTool = data;
          self._draggedShape = editor;
          event.preventDefault();
          event.stopPropagation();
        }
      }
      var j;
      var min;
      var distanceBackward;
      var range;
      var cache;
      var i;
      var item;
      var start;
      var y;
      var x;
      var field;
      var style;
      var container;
      var child;
      var that;
      var self = this;
      var obj = this.param;
      var element = this.interactCanvas;
      var text = this.interactCtx;
      var v = this.showCtx;
      /** @type {boolean} */
      var D = false;
      var nodes = self.getCurrentShapeList();
      /** @type {null} */
      this._curPaintTool = null;
      /** @type {boolean} */
      this._painting = false;
      /** @type {null} */
      this._selectedShape = null;
      /** @type {null} */
      this._draggedShape = null;
      element.addEventListener("mousedown", reset);
      element.addEventListener("mousemove", render);
      element.addEventListener("mouseup", init);
      /**
       * @return {?}
       */
      element.oncontextmenu = function() {
        return false;
      };
      if (self.param.onHover) {
        self.bind("hover", self.param.onHover);
      }
      if (self.param.unHover) {
        self.bind("unhover", self.param.unHover);
      }
      if (self.param.onClick) {
        self.bind("click", self.param.onClick);
      }
      element.addEventListener("mouseout", function() {
        self.dispatch("unhover");
      });
      if ("ontouchstart" in window) {
        element.addEventListener("touchstart", reset);
        element.addEventListener("touchmove", render);
        element.addEventListener("touchend", init);
      }
      element.addEventListener("click", function(event) {
        switch(self._writingText || this.focus(), x = f(event, element), y = self._getIndexAndValue(x), obj.paintTool) {
          case "Delete":
            self.remove(x);
            break;
          case "Hover":
            var idx = self._getShapeIndexByXY(x);
            if (void 0 !== idx) {
              self.dispatch("click", {
                x : x[0],
                y : x[1],
                index : idx,
                target : nodes[idx],
                shapeListType : self.param.shapeListType
              });
            }
          ;
        }
        event.preventDefault();
        event.stopPropagation();
      });
      element.addEventListener("keydown", function(event) {
        switch(event.which) {
          case 8:
          ;
          case 46:
            if (self._selectedShape) {
              var body = self.getCurrentShapeList();
              var rvar = body.indexOf(self._selectedShape);
              if (rvar > -1) {
                body.splice(rvar, 1);
                self.paint();
                /** @type {null} */
                self._selectedShape = null;
              }
            } else {
              if ("Close" != self.param.paintTool) {
                self.revoke();
              }
            }
          ;
        }
      });
      if (obj.localStorage) {
        if (self.param.onSave) {
          self.bind("save", self.param.onSave);
        }
        window.addEventListener("unload", function() {
          self._showLayoutPoint(false);
          self.save2LocalStorage();
        });
        window.addEventListener("beforeunload", function() {
          self._showLayoutPoint(false);
          self.save2LocalStorage();
        });
      }
    },
    /**
     * @return {?}
     */
    getCurrentShapeList : function() {
      return this.shapeList[this.param.shapeListName][this.param.shapeListType];
    },
    /**
     * @param {Array} a
     * @return {?}
     */
    _getPointIndexByXY : function(a) {
      var CLICKBUSTER_THRESHOLD;
      var tokenized;
      var elements = this.getCurrentShapeList();
      var i = elements.length;
      for (;i--;) {
        tokenized = elements[i].layout;
        CLICKBUSTER_THRESHOLD = elements[i].style.layoutPointRadius;
        var index = tokenized.length;
        for (;index-- && (!elements[i].ignore && elements[i].style.showLayoutPoint);) {
          var b = tokenized[index];
          if (Math.abs(a[0] - b[0]) < CLICKBUSTER_THRESHOLD && Math.abs(a[1] - b[1]) < CLICKBUSTER_THRESHOLD) {
            return{
              index : index,
              shape : elements[i]
            };
          }
        }
      }
    },
    /**
     * @param {Array} v00
     * @return {?}
     */
    _getShapeIndexByXY : function(v00) {
      var tokenized = this.getCurrentShapeList();
      /** @type {boolean} */
      var contain = false;
      var index = tokenized.length;
      for (;index--;) {
        if (!tokenized[index].ignore && (tokenized[index].contain && (contain = tokenized[index].contain(v00[0], v00[1]))), contain) {
          return index;
        }
      }
    },
    /**
     * @param {Array} tokenized
     * @return {?}
     */
    _layout2Points : function(tokenized) {
      /** @type {Array} */
      var viewItems = [];
      var index = tokenized.length;
      for (;index--;) {
        viewItems[index] = this._getIndexAndValue(tokenized[index]);
      }
      return viewItems;
    },
    /**
     * @param {Array} tokenized
     * @return {?}
     */
    _points2Layout : function(tokenized) {
      /** @type {Array} */
      var viewItems = [];
      var index = tokenized.length;
      for (;index--;) {
        viewItems[index] = this._getXAndY(tokenized[index]);
      }
      return viewItems;
    },
    /**
     * @param {Object} b
     * @return {?}
     */
    intersectRect : function(b) {
      var a = this.param;
      return!(0 > b.x + b.width || (a.width < b.x || (0 > b.y + b.height || a.height < b.y)));
    },
    /**
     * @return {undefined}
     */
    paint : function() {
      var inputIndex = this.param.shapeListName;
      var input = this.shapeList;
      var tempCtx = this.showCtx;
      if (input[inputIndex]) {
        this.clear();
        var key;
        for (key in input[inputIndex]) {
          if (input[inputIndex].hasOwnProperty(key)) {
            var results = input[inputIndex][key];
            /** @type {number} */
            var i = 0;
            var l = results.length;
            for (;l > i;i++) {
              if (!results[i].ignore) {
                if (results[i].display) {
                  if (this.intersectRect(results[i].getBoundingRect())) {
                    results[i].draw(tempCtx);
                  }
                }
              }
            }
          }
        }
      }
    },
    /**
     * @return {undefined}
     */
    refresh : function() {
      var inputIndex = this.param.shapeListName;
      var input = this.shapeList;
      var key;
      for (key in input[inputIndex]) {
        if (input[inputIndex].hasOwnProperty(key)) {
          var results = input[inputIndex][key];
          /** @type {number} */
          var i = 0;
          var l = results.length;
          for (;l > i;i++) {
            if (!results[i].ignore) {
              if (results[i].display) {
                results[i].layout = this._points2Layout(results[i].points);
                results[i].updateBoundingRect();
              }
            }
          }
        }
      }
      this.paint();
    },
    /**
     * @param {Object} options
     * @return {undefined}
     */
    update : function(options) {
      var item = this.param;
      if (this.checkIfNeedUpdate(options)) {
        if (options.zoom) {
          item.zoom = options.zoom;
        }
        if (options.domain) {
          item.domain = options.domain;
        }
        if (options.parentDiv) {
          if (options.parentDiv != this.parentDiv) {
            this._setParentDiv(options.parentDiv);
          }
        }
        if (options.shapeListName) {
          if (options.shapeListName != item.shapeListName) {
            this._setShapeList(options.shapeListName);
          }
        }
        item.rangeData = options.rangeData ? options.rangeData : void 0;
        item.data = options.data ? options.data : void 0;
        this._setWHLT(options);
        this._setScale();
        this.refresh();
      }
    },
    /**
     * @param {Object} value
     * @return {?}
     */
    checkIfNeedUpdate : function(value) {
      var expected = this.param;
      /** @type {boolean} */
      var checkIfNeedUpdate = false;
      var key;
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          switch(isArray(value[key])) {
            case "Number":
            ;
            case "String":
            ;
            case "Object":
              if (value[key] != expected[key]) {
                /** @type {boolean} */
                checkIfNeedUpdate = true;
              }
              break;
            case "Array":
              if (expected[key]) {
                var i = value[key].length;
                for (;i--;) {
                  if (value[key][i] != expected[key][i]) {
                    /** @type {boolean} */
                    checkIfNeedUpdate = true;
                  }
                }
              }
            ;
          }
        }
      }
      return checkIfNeedUpdate;
    },
    /**
     * @param {?} i
     * @return {undefined}
     */
    _setShapeList : function(i) {
      var prevSources = this.shapeList;
      var self = this.param;
      if (self.localStorage) {
        this._showLayoutPoint(false);
        this.save2LocalStorage();
      }
      if (!prevSources[i]) {
        prevSources[i] = {};
      }
      if (!prevSources[i][self.shapeListType]) {
        /** @type {Array} */
        prevSources[i][self.shapeListType] = [];
      }
      self.shapeListName = i;
      if (self.localStorage) {
        this._restoreLocalStorage();
      }
    },
    /**
     * @param {?} elem
     * @param {string} condition
     * @return {undefined}
     */
    empty : function(elem, condition) {
      var eventName = condition || "paintTool";
      var uid = elem || this.param.shapeListName;
      var confirmMessage = this.param.emptyConfirmText;
      if (!confirmMessage || confirm(confirmMessage)) {
        if (this.shapeList[uid]) {
          if (this.shapeList[uid][eventName]) {
            /** @type {number} */
            this.shapeList[uid][eventName].length = 0;
          }
        }
        this.clear();
        if ("paintTool" == eventName) {
          this.clearPaintState();
        }
      }
    },
    /**
     * @param {Element} arr
     * @return {undefined}
     */
    clear : function(arr) {
      var that = arr || this.showCanvas;
      that.getContext("2d").clearRect(0, 0, that.width, that.height);
    },
    /**
     * @param {string} opt_index
     * @return {undefined}
     */
    revoke : function(opt_index) {
      var index = opt_index || "paintTool";
      this.shapeList[this.param.shapeListName][index].pop();
      this.paint();
    },
    /**
     * @param {Object} x
     * @return {undefined}
     */
    remove : function(x) {
      var val = this._getShapeIndexByXY(x);
      if ("Number" == isArray(val)) {
        this.getCurrentShapeList().splice(val, 1);
        this.paint();
      }
    },
    /**
     * @param {Array} target
     * @return {?}
     */
    select : function(target) {
      var targets = this._layout2Points(target);
      return console.log([targets[0][0], targets[1][0]]), [targets[0][0], targets[1][0]];
    },
    /**
     * @param {Object} walkers
     * @return {undefined}
     */
    resize : function(walkers) {
      if (this.param) {
        this._setWHLT(walkers);
        this._setScale();
        this.refresh();
      }
    },
    /**
     * @param {Object} ctx
     * @return {undefined}
     */
    setStyle : function(ctx) {
      var elementStyle = this.param.style;
      var i;
      for (i in ctx) {
        if (ctx.hasOwnProperty(i)) {
          elementStyle[i] = ctx[i];
        }
      }
    },
    /**
     * @return {undefined}
     */
    _setScale : function() {
      var opts = this.param;
      var z = opts.zoom;
      /** @type {number} */
      opts.xScale = opts.width / (z[1] - z[0]);
      /** @type {number} */
      opts.yScale = opts.height / (opts.domain[1] - opts.domain[0]);
    },
    /**
     * @param {?} elapsedTime
     * @return {?}
     */
    _x2Index : function(elapsedTime) {
      var self = this.param;
      return Math.floor(elapsedTime / self.xScale) + self.zoom[0];
    },
    /**
     * @param {?} timePassed
     * @return {?}
     */
    _y2Value : function(timePassed) {
      var opts = this.param;
      return opts.domain[1] - timePassed / opts.yScale;
    },
    /**
     * @param {Array} v00
     * @return {?}
     */
    _getIndexAndValue : function(v00) {
      return[this._x2Index(v00[0]), this._y2Value(v00[1])];
    },
    /**
     * @param {?} clone
     * @return {?}
     */
    _index2X : function(clone) {
      var self = this.param;
      return Math.round((clone - self.zoom[0] + 0.5) * self.xScale - 0.5) + 0.5;
    },
    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    _value2Y : function(dataAndEvents) {
      var opts = this.param;
      return Math.round((opts.domain[1] - dataAndEvents) * opts.yScale - 0.5) + 0.5;
    },
    /**
     * @param {Array} v11
     * @return {?}
     */
    _getXAndY : function(v11) {
      return[this._index2X(v11[0]), this._value2Y(v11[1])];
    },
    /**
     * @param {?} regex
     * @param {number} index
     * @return {?}
     */
    _createCanvas : function(regex, index) {
      var box = this.param;
      var xScale = this.dpr;
      /** @type {Element} */
      var map = document.createElement("canvas");
      return map.style.position = "absolute", map.width = box.width * xScale, map.height = box.height * xScale, map.style.top = box.top + "px", map.style.left = box.left + "px", map.style.width = box.width + "px", map.style.height = box.height + "px", map.style.zIndex = index, map;
    },
    /**
     * @param {?} regex
     * @return {undefined}
     */
    _setParentDiv : function(regex) {
      if (this.parentDiv != regex) {
        this.parentDiv = regex;
        if (this.parentDiv.firstChild) {
          this.parentDiv.insertBefore(this.interactCanvas, this.parentDiv.firstChild);
          this.parentDiv.insertBefore(this.showCanvas, this.parentDiv.firstChild);
        } else {
          this.parentDiv.appendChild(this.interactCanvas);
          this.parentDiv.appendChild(this.showCanvas);
        }
      }
    },
    /**
     * @param {Object} obj
     * @return {undefined}
     */
    _setWHLT : function(obj) {
      var ui = this.showCanvas;
      var slide = this.interactCanvas;
      var box = this.param;
      var xScale = this.dpr;
      var x = obj.left;
      var y = obj.top;
      var width = obj.width;
      var height = obj.height;
      if (x) {
        box.left = x;
      }
      if (y) {
        box.top = y;
      }
      if (width) {
        box.width = width;
      }
      if (height) {
        box.height = height;
      }
      /** @type {string} */
      ui.style.left = box.left + "px";
      /** @type {string} */
      ui.style.top = box.top + "px";
      /** @type {string} */
      ui.style.width = box.width + "px";
      /** @type {string} */
      ui.style.height = box.height + "px";
      /** @type {number} */
      ui.width = box.width * xScale;
      /** @type {number} */
      ui.height = box.height * xScale;
      /** @type {string} */
      slide.style.left = box.left + "px";
      /** @type {string} */
      slide.style.top = box.top + "px";
      /** @type {string} */
      slide.style.width = box.width + "px";
      /** @type {string} */
      slide.style.height = box.height + "px";
      /** @type {number} */
      slide.width = box.width * xScale;
      /** @type {number} */
      slide.height = box.height * xScale;
      this.hdContext();
    },
    /**
     * @param {boolean} recurring
     * @return {undefined}
     */
    _showLayoutPoint : function(recurring) {
      var tokenized = this.getCurrentShapeList();
      if (tokenized) {
        var index = tokenized.length;
        for (;index--;) {
          tokenized[index].setShowLayoutPoint(recurring);
        }
        this.clear();
        this.paint();
      }
    },
    /**
     * @param {?} id
     * @return {undefined}
     */
    save2LocalStorage : function(id) {
      var storageKey;
      /** @type {(Storage|null)} */
      var storage = window.localStorage;
      var args = this.param;
      if (id = id || args.shapeListName, storageKey = (args.saveKeyPreName ? args.saveKeyPreName : "") + id, "Function" !== isArray(args.checkIfNotSave) || !args.checkIfNotSave(storageKey)) {
        var vals = this.shapeList[id];
        var obj = {};
        /** @type {boolean} */
        var s = false;
        if (vals) {
          var i;
          for (i in vals) {
            if (vals.hasOwnProperty(i)) {
              /** @type {Array} */
              obj[i] = [];
              /** @type {number} */
              var j = 0;
              var spaces = vals[i].length;
              for (;spaces > j;j++) {
                /** @type {boolean} */
                s = true;
                obj[i][j] = {};
                obj[i][j].type = vals[i][j].type;
                obj[i][j].points = vals[i][j].points;
                obj[i][j].style = vals[i][j].style;
              }
            }
          }
          if (s) {
            if (storage) {
              /** @type {string} */
              var str = JSON.stringify(obj);
              if (storage.getItem(storageKey) != str) {
                storage.setItem(storageKey, str);
                this.dispatch("save", storageKey, str);
              }
            }
          } else {
            storage.removeItem(storageKey);
          }
        }
      }
    },
    /**
     * @return {undefined}
     */
    _restoreLocalStorage : function() {
      /** @type {(Storage|null)} */
      var storage = window.localStorage;
      var elem = this.param;
      var key = elem.shapeListName;
      var storageKey = (elem.saveKeyPreName ? elem.saveKeyPreName : "") + key;
      /** @type {(null|string)} */
      var dstUri = storage && storage.getItem(storageKey);
      if (dstUri) {
        this.shapeList[key] = this._restoreShapeList(JSON.parse(dstUri.toString()));
      }
    },
    /**
     * @param {Object} af
     * @return {?}
     */
    _restoreShapeList : function(af) {
      var codeSegments = {};
      var i;
      for (i in af) {
        if (af.hasOwnProperty(i)) {
          var data = af[i];
          /** @type {Array} */
          codeSegments[i] = [];
          var j = data.length;
          for (;j--;) {
            codeSegments[i][j] = new schema[data[j].type]({
              paintTool : this,
              style : data[j].style
            });
            codeSegments[i][j].points = data[j].points;
          }
        }
      }
      return codeSegments;
    },
    /**
     * @param {?} start
     * @param {string} key
     * @param {?} table
     * @param {Array} shapes
     * @param {Object} type
     * @return {undefined}
     */
    addShapeList : function(start, key, table, shapes, type) {
      var node;
      var method;
      var proto;
      var opt_nodes = this.shapeList;
      var i = start || this.param.shapeListName;
      if (!opt_nodes[i]) {
        opt_nodes[i] = {};
      }
      node = opt_nodes[i];
      if (!node[key]) {
        /** @type {Array} */
        node[key] = [];
      }
      method = node[key];
      /** @type {number} */
      var iter_sha = 0;
      var slen = shapes.length;
      for (;slen > iter_sha;iter_sha++) {
        proto = new schema[table]({
          paintTool : this,
          style : fn(b.style, type)
        });
        if (!proto.init || proto.init()) {
          proto.points = shapes[iter_sha];
          proto.layout = this._points2Layout(shapes[iter_sha]);
          method.push(proto);
        }
      }
      this.paint();
    },
    /**
     * @return {undefined}
     */
    clearPaintState : function() {
      /** @type {null} */
      this._curPaintTool = null;
      /** @type {boolean} */
      this._painting = false;
      /** @type {null} */
      this._selectedShape = null;
      if (this._draggedShape) {
        /** @type {boolean} */
        this._draggedShape.display = true;
        /** @type {null} */
        this._draggedShape = null;
        this.clear();
        this.paint();
      }
      this.clear(this.interactCanvas);
    },
    /**
     * @param {Object} dataAndEvents
     * @return {undefined}
     */
    setPaintTool : function(dataAndEvents) {
      switch(this.param.paintTool = dataAndEvents, dataAndEvents) {
        case "Empty":
          this.empty();
          break;
        case "Revoke":
          this.revoke();
          break;
        default:
          /** @type {string} */
          this.interactCanvas.style.cursor = "";
      }
      this._showLayoutPoint(false);
      if ("Close" == dataAndEvents) {
        /** @type {string} */
        this.interactCanvas.style.display = "none";
      } else {
        /** @type {string} */
        this.interactCanvas.style.display = "";
        this.interactCanvas.focus();
      }
      this.clearPaintState();
    },
    /**
     * @param {Function} object
     * @return {undefined}
     */
    addCustomShape : function(object) {
      var type = object.type;
      /**
       * @param {?} mapper
       * @return {undefined}
       */
      schema[type] = function(mapper) {
        schema.Base.call(this, mapper);
      };
      schema[type].type = object.type;
      /** @type {Function} */
      schema[type].prototype = object;
      inherits(schema[type], schema.Base);
    },
    /**
     * @return {?}
     */
    getImageData : function() {
      var size = this.showCanvas;
      var ctx = this.showCanvas.getContext("2d");
      return ctx.getImageData(0, 0, size.width, size.height);
    }
  }, inherits(Game, EventEmitter), Storage;
});
