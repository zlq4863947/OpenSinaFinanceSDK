xh5_define("plugins.rangeselector", ["utils.util", "utils.painter", "cfgs.settinger"], function(util, dataAndEvents, Node) {
  /**
   * @param {Text} scope
   * @return {undefined}
   */
  function initRangeSelector(scope) {
    /** @type {string} */
    this.VER = "2.0.9";
    scope = merge({
      stockData : null,
      setting : null,
      /**
       * @return {undefined}
       */
      rc : function() {
      },
      usrCfg : null,
      witht5 : 0
    }, scope);
    var input;
    var options = scope.setting;
    var child = scope.stockData;
    var self = child.viewState;
    var success = options.PARAM.isFlash;
    var length = options.PARAM.minCandleNum;
    /** @type {number} */
    var zindex = 30;
    var defaults = {
      theme : {
        BLOCK : "#494949",
        BLOCK_TOP : "#fff",
        BLOCK_BOTTOM : "#494949",
        BAR : "#eee",
        BAR_BORDER : "#9fa4b0",
        TOP_BORDER : "#494949",
        R_BORDER : "#ddd",
        L_BORDER : "#ddd",
        B_BORDER : "#ddd",
        TRENDLINE : "#aaa",
        TIMELINE : "#ddd",
        TIMETXT : "#555"
      },
      thumb : {
        width : 6
      },
      border : {
        value : 1,
        top : 2,
        /**
         * @return {?}
         */
        v : function() {
          return this.value + this.top;
        }
      },
      body : {
        fontsize : 12
      },
      domid : ""
    };
    var data = merge(defaults, scope.usrCfg);
    var color = data.theme;
    var value = new function() {
      /**
       * @param {number} global
       * @return {?}
       */
      function getTime(global) {
        /** @type {number} */
        var root = global;
        if (0 >= root) {
          return 0;
        }
        if (root > size) {
          root = size;
        }
        /** @type {number} */
        var val = 10;
        /** @type {number} */
        var half = size / val;
        /** @type {number} */
        var num = 0;
        /** @type {number} */
        var scale = 1;
        for (;val >= scale;scale++) {
          if (half * scale >= root) {
            /** @type {number} */
            num = scale / 2;
            break;
          }
        }
        return Math.floor(num);
      }
      /**
       * @param {?} destination
       * @return {undefined}
       */
      function copy(destination) {
        scope.rc(text, end, false, true, destination);
      }
      /**
       * @param {?} data
       * @return {undefined}
       */
      function update(data) {
        if (input) {
          var i = input.length;
          if (!(1 > i)) {
            /** @type {number} */
            perLine = size / i;
            /** @type {number} */
            var start = cursor.getX() < 0 ? 0 : Math.ceil(cursor.getX() / perLine);
            /** @type {number} */
            var t = Math.ceil((context.getX() >= size ? size : context.getX()) / perLine);
            if (options.datas.isT) {
              start = getTime(cursor.getX());
              t = getTime(context.getX());
              if (start == t) {
                if (cursor.isDown) {
                  start -= 1;
                } else {
                  if (context.isDown) {
                    t += 1;
                  }
                }
              }
              if (0 > start) {
                /** @type {number} */
                start = 0;
                /** @type {number} */
                t = 1;
              } else {
                if (t > 5) {
                  t--;
                  start--;
                }
              }
              self.start = start;
              self.end = t;
            } else {
              if (t > i && (t = i), length > t - start) {
                /** @type {number} */
                var v = length + start - t;
                if (cursor.isDown) {
                  if (start >= v) {
                    start -= v;
                  } else {
                    /** @type {number} */
                    start = 0;
                    /** @type {number} */
                    t = Math.min(length, i);
                  }
                } else {
                  if (context.isDown) {
                    if (i > t + v) {
                      t += v;
                    } else {
                      t = i;
                      /** @type {number} */
                      start = i - length;
                      if (0 > start) {
                        /** @type {number} */
                        start = 0;
                      }
                    }
                  }
                }
              }
              /** @type {number} */
              text = start;
              end = t;
              copy(data);
            }
          }
        }
      }
      /**
       * @return {undefined}
       */
      function touchMove() {
        /** @type {number} */
        var duration = 0 == options.PARAM.withT5 ? 1 : 5;
        /** @type {number} */
        var scale = size / duration;
        cursor.setX(self.start * scale);
        context.setX(self.end * scale);
        text = self.start;
        end = self.end;
        start();
        copy();
      }
      /**
       * @param {Object} event
       * @return {undefined}
       */
      function onTouchStart(event) {
        event = xh5EvtUtil.getEvent(event);
        if (node.getX() > c.getX()) {
          cursor = c;
          context = node;
        } else {
          cursor = node;
          context = c;
        }
        var x;
        var width = size;
        var y = (fixHook.istd ? event.touches[0] : event).clientX;
        if (that.isDown) {
          x = y - that.downMx + that.downOx;
          var offset = that.distance;
          if (0 > x) {
            /** @type {number} */
            x = 0;
          } else {
            if (x + offset > width) {
              /** @type {number} */
              x = width - offset;
            }
          }
          node.setX(x);
          c.setX(x + offset);
        } else {
          var pos = node.isDown ? node : c;
          x = y - pos.downMx + pos.downOx;
          if (0 > x) {
            /** @type {number} */
            x = 0;
          } else {
            if (x > width) {
              x = width;
            }
          }
          pos.setX(x);
        }
        start();
        update();
      }
      /**
       * @return {undefined}
       */
      function init() {
        /**
         * @return {undefined}
         */
        function _init() {
          /** @type {string} */
          canvas.style.width = data.thumb.width + "px";
          /** @type {string} */
          canvas.style.height = options.DIMENSION.H_RS - data.border.v() + "px";
          canvas.style.backgroundColor = color.BAR;
          /** @type {string} */
          canvas.style.border = "1px solid " + color.BAR_BORDER;
        }
        var that = this;
        var canvas = createElement("div");
        /** @type {string} */
        canvas.style.position = "absolute";
        /** @type {string} */
        canvas.style.cursor = "col-resize";
        /** @type {number} */
        canvas.style.top = 0;
        /** @type {number} */
        canvas.style.zIndex = zindex + 1;
        /** @type {function (): ?} */
        canvas.onselectstart = canvas.onmousedown = function() {
          return false;
        };
        _init();
        /** @type {boolean} */
        this.isDown = false;
        /** @type {number} */
        this.downMx = 0;
        /** @type {number} */
        this.downOx = 0;
        var b = {
          /**
           * @param {Object} event
           * @return {undefined}
           */
          iInit : function(event) {
            /** @type {boolean} */
            that.isDown = true;
            event = xh5EvtUtil.getEvent(event);
            that.downMx = (fixHook.istd ? event.touches[0] : event).clientX;
            that.downOx = that.getX();
          },
          /**
           * @return {undefined}
           */
          iEnd : function() {
            /** @type {boolean} */
            that.isDown = false;
            if (options.datas.isT) {
              touchMove();
            }
          },
          /**
           * @param {Object} api
           * @return {undefined}
           */
          mD : function(api) {
            this.iInit(api);
            if (success) {
              xh5EvtUtil.addHandler(document, "mouseup", element.onmouseup || function() {
              });
              xh5EvtUtil.addHandler(document, "mousemove", onTouchStart);
            } else {
              xh5EvtUtil.addHandler(window, "mouseup", b);
              xh5EvtUtil.addHandler(window, "mousemove", onTouchStart);
            }
          },
          /**
           * @return {undefined}
           */
          mU : function() {
            this.iEnd();
            if (success) {
              xh5EvtUtil.removeHandler(document, "mousemove", onTouchStart);
              xh5EvtUtil.removeHandler(document, "mouseup", element.onmouseup || function() {
              });
            } else {
              xh5EvtUtil.removeHandler(window, "mousemove", onTouchStart);
              xh5EvtUtil.removeHandler(window, "mouseup", b);
            }
          },
          /**
           * @return {undefined}
           */
          tE : function() {
            this.iEnd();
            xh5EvtUtil.removeHandler(window, "touchmove", onTouchStart);
            xh5EvtUtil.removeHandler(window, "touchend", b);
          },
          /**
           * @param {Object} event
           * @return {undefined}
           */
          tS : function(event) {
            xh5EvtUtil.preventDefault(event);
            this.iInit(event);
            xh5EvtUtil.addHandler(window, "touchend", b);
            xh5EvtUtil.addHandler(window, "touchmove", onTouchStart);
          },
          /**
           * @param {Object} event
           * @return {undefined}
           */
          handleEvent : function(event) {
            switch(event.type) {
              case "mousedown":
                this.mD(event);
                break;
              case "mouseup":
                this.mU();
                break;
              case "touchend":
                this.tE();
                break;
              case "touchstart":
                this.tS(event);
            }
          }
        };
        var element = new function() {
          /**
           * @return {undefined}
           */
          this.onmouseup = function() {
            b.mU();
          };
          /**
           * @param {Object} event
           * @return {undefined}
           */
          this.onmousedown = function(event) {
            b.mD(event);
          };
          /**
           * @param {Object} event
           * @return {undefined}
           */
          this.onmousemove = function(event) {
            onTouchStart(event);
          };
        };
        /** @type {Array} */
        var names = fixHook.istd ? ["touchstart"] : ["mousedown"];
        /** @type {number} */
        var n = 0;
        /** @type {number} */
        var len = names.length;
        for (;len > n;n++) {
          if (success) {
            xh5EvtUtil.addHandler(canvas, names[n], element["on" + names[n]] || function() {
            });
          } else {
            xh5EvtUtil.addHandler(canvas, names[n], b);
          }
        }
        this.body = canvas;
        /**
         * @return {?}
         */
        this.getX = function() {
          return 1 * (canvas.style.left.split("px")[0] || 0);
        };
        /**
         * @param {number} x
         * @return {undefined}
         */
        this.setX = function(x) {
          /** @type {string} */
          canvas.style.left = x + "px";
        };
        /** @type {function (): undefined} */
        this.resize = _init;
      }
      /**
       * @return {undefined}
       */
      function Grid() {
        /**
         * @return {undefined}
         */
        function init() {
          /** @type {string} */
          el.style.height = options.DIMENSION.H_RS - data.border.v() + "px";
          el.style.backgroundColor = success ? color.BLOCK : util.hex2dec(color.BLOCK, 0.5);
          /** @type {string} */
          el.style.borderTop = "1px solid " + color.BLOCK_TOP;
          /** @type {string} */
          el.style.borderBottom = "1px solid " + color.BLOCK_BOTTOM;
        }
        var that = this;
        var el = createElement("div");
        /** @type {string} */
        el.style.position = "absolute";
        /** @type {string} */
        el.style.cursor = "move";
        /** @type {number} */
        el.style.top = 0;
        /** @type {number} */
        el.style.zIndex = zindex;
        init();
        /** @type {boolean} */
        this.isDown = false;
        /** @type {number} */
        this.downMx = 0;
        /** @type {number} */
        this.downOx = 0;
        /** @type {number} */
        this.distance = 0;
        var b = {
          /**
           * @param {Object} event
           * @return {undefined}
           */
          iInit : function(event) {
            /** @type {boolean} */
            that.isDown = true;
            /** @type {boolean} */
            node.isDown = c.isDown = true;
            /** @type {number} */
            that.distance = Math.abs(node.getX() - c.getX());
            event = xh5EvtUtil.getEvent(event);
            that.downMx = (fixHook.istd ? event.touches[0] : event).clientX;
            that.downOx = that.getX();
          },
          /**
           * @return {undefined}
           */
          iEnd : function() {
            /** @type {boolean} */
            that.isDown = false;
            /** @type {boolean} */
            node.isDown = c.isDown = false;
            if (options.datas.isT) {
              touchMove();
            }
          },
          /**
           * @return {undefined}
           */
          tE : function() {
            this.iEnd();
            xh5EvtUtil.removeHandler(window, "touchmove", onTouchStart);
            xh5EvtUtil.removeHandler(window, "touchend", b);
          },
          /**
           * @param {Object} event
           * @return {undefined}
           */
          tS : function(event) {
            xh5EvtUtil.preventDefault(event);
            this.iInit(event);
            xh5EvtUtil.addHandler(window, "touchend", b);
            xh5EvtUtil.addHandler(window, "touchmove", onTouchStart);
          },
          /**
           * @param {Object} api
           * @return {undefined}
           */
          mD : function(api) {
            this.iInit(api);
            if (success) {
              xh5EvtUtil.addHandler(document, "mouseup", element.onmouseup || function() {
              });
              xh5EvtUtil.addHandler(document, "mousemove", onTouchStart);
            } else {
              xh5EvtUtil.addHandler(window, "mouseup", b);
              xh5EvtUtil.addHandler(window, "mousemove", onTouchStart);
            }
          },
          /**
           * @return {undefined}
           */
          mU : function() {
            this.iEnd();
            if (success) {
              xh5EvtUtil.removeHandler(document, "mousemove", onTouchStart);
              xh5EvtUtil.removeHandler(document, "mouseup", element.onmouseup || function() {
              });
            } else {
              xh5EvtUtil.removeHandler(window, "mousemove", onTouchStart);
              xh5EvtUtil.removeHandler(window, "mouseup", b);
            }
          },
          /**
           * @param {Object} event
           * @return {undefined}
           */
          handleEvent : function(event) {
            switch(event.type) {
              case "mousedown":
                this.mD(event);
                break;
              case "mouseup":
                this.mU();
                break;
              case "touchend":
                this.tE();
                break;
              case "touchstart":
                this.tS(event);
            }
          }
        };
        var element = new function() {
          /**
           * @return {undefined}
           */
          this.onmouseup = function() {
            b.mU();
          };
          /**
           * @param {Object} event
           * @return {undefined}
           */
          this.onmousedown = function(event) {
            b.mD(event);
          };
        };
        /** @type {Array} */
        var names = fixHook.istd ? ["touchstart"] : ["mousedown"];
        /** @type {number} */
        var n = 0;
        /** @type {number} */
        var len = names.length;
        for (;len > n;n++) {
          if (success) {
            xh5EvtUtil.addHandler(el, names[n], element["on" + names[n]] || function() {
            });
          } else {
            xh5EvtUtil.addHandler(el, names[n], b);
          }
        }
        this.body = el;
        /**
         * @return {?}
         */
        this.getX = function() {
          return 1 * (el.style.left.split("px")[0] || 0);
        };
        /**
         * @param {number} x
         * @return {undefined}
         */
        this.setX = function(x) {
          /** @type {string} */
          el.style.left = x + "px";
        };
        /** @type {function (): undefined} */
        this.resize = init;
      }
      /**
       * @return {undefined}
       */
      function start() {
        var _x = cursor.getX();
        /** @type {number} */
        var w = context.getX() - _x;
        if (0 > w) {
          /** @type {number} */
          w = 0;
        }
        /** @type {string} */
        that.body.style.left = _x + "px";
        /** @type {string} */
        that.body.style.width = w + "px";
      }
      var el = createElement("div");
      xh5EvtUtil.addHandler(el, "touchstart", function(e) {
        if (options.custom.touch_prevent) {
          xh5EvtUtil.preventDefault(e);
        }
      });
      this.ctn = el;
      var div;
      var me;
      var dom;
      var ctx;
      var node;
      var c;
      var cursor;
      var context;
      var that;
      var size;
      var perLine;
      var text;
      var end;
      var spaces;
      var y;
      /**
       * @return {undefined}
       */
      var initialize = function() {
        div = createElement("div");
        /** @type {string} */
        div.style.position = "relative";
        /** @type {function (): ?} */
        div.onselectstart = div.onmousedown = function() {
          return false;
        };
        me = new User;
        ctx = me.g;
        dom = me.canvas;
        /** @type {string} */
        dom.style.borderWidth = data.border.value + "px";
        /** @type {string} */
        dom.style.borderTopWidth = data.border.top + "px";
        /** @type {string} */
        dom.style.borderStyle = "solid";
        /** @type {number} */
        dom.style.zIndex = 0;
        div.appendChild(dom);
        node = new init;
        c = new init;
        cursor = node;
        context = c;
        div.appendChild(node.body);
        div.appendChild(c.body);
        that = new Grid;
        div.appendChild(that.body);
        /** @type {string} */
        el.style.clear = "both";
        el.appendChild(div);
      };
      /**
       * @param {?} a
       * @param {?} b
       * @param {?} obj
       * @return {undefined}
       */
      var add = function(a, b, obj) {
        if (input && (util.isDate(a) && util.isDate(b))) {
          if (a > b) {
            var temp = a;
            a = b;
            b = temp;
          }
          var i;
          var x;
          var len = input.length;
          if (a <= input[0].date) {
            /** @type {number} */
            i = 0;
          }
          if (b >= input[len - 1].date) {
            x = len;
          }
          /** @type {number} */
          var j = 0;
          for (;len > j;j++) {
            if (isNaN(i) && (input[j].date >= a && (i = j)), isNaN(x) && (input[j].date >= b && (x = j)), !isNaN(i) && !isNaN(x)) {
              if (length > x - i) {
                /** @type {number} */
                i = 0 > i - length ? 0 : i - length;
              }
              break;
            }
          }
          if (isNaN(i)) {
            /** @type {number} */
            i = 0;
          }
          if (isNaN(x)) {
            x = len;
          }
          /** @type {number} */
          var scale = size / len;
          node.setX(i * scale);
          c.setX(x * scale);
          start();
          update(obj);
        }
      };
      /** @type {Array} */
      var vectors = [];
      /** @type {number} */
      var type = -1;
      /** @type {number} */
      var queueHooks = 50;
      /**
       * @return {undefined}
       */
      var processData = function() {
        /** @type {number} */
        spaces = Number.MAX_VALUE;
        /** @type {number} */
        y = -Number.MAX_VALUE;
        var j;
        var il = input.length;
        /** @type {number} */
        var index = 0;
        for (;il > index;index++) {
          j = input[index].close || input[index].price;
          if (!(1E-4 > j)) {
            if (j > y) {
              y = j;
            }
            if (spaces > j) {
              spaces = j;
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      var expand = function() {
        for (;vectors.length;) {
          vectors.length--;
        }
        var p;
        var reversed;
        /** @type {number} */
        var j = 0;
        var i = input.length;
        for (;i > j;j++) {
          p = input[j];
          reversed = p.close || p.price;
          vectors.push({
            y : _.pp(reversed, spaces, y, options.DIMENSION.H_RS),
            d : p.date
          });
        }
      };
      /**
       * @param {number} end
       * @param {?} text
       * @return {undefined}
       */
      var callback = function(end, text) {
        var originalWidth_ = ctx.measureText(text).width;
        /** @type {number} */
        var start = originalWidth_ >> 1;
        /** @type {number} */
        var diff = end - start;
        ctx.fillText(text, diff, options.DIMENSION.H_RS - data.body.fontsize - 5);
        /** @type {number} */
        type = end;
      };
      /**
       * @param {number} end
       * @param {?} text
       * @return {undefined}
       */
      var Set = function(end, text) {
        if (!(10 > end || (type > 0 && type + queueHooks >= end || end > size - queueHooks / 2))) {
          var originalWidth_ = ctx.measureText(text).width;
          /** @type {number} */
          var start = originalWidth_ >> 1;
          /** @type {number} */
          var diff = end - start;
          ctx.fillText(text, diff, options.DIMENSION.H_RS - data.body.fontsize - 5);
          /** @type {number} */
          type = end;
        }
      };
      /**
       * @return {undefined}
       */
      var updateBug = function() {
        /** @type {number} */
        type = -1;
        me.resize({
          width : size,
          height : options.DIMENSION.H_RS - data.border.v()
        });
      };
      /**
       * @return {undefined}
       */
      var drawMap = function() {
        ctx.beginPath();
        ctx.strokeStyle = color.TRENDLINE;
        var t;
        if (options.datas.isT) {
          if (child.date == child.hq.today) {
            /** @type {boolean} */
            t = true;
          }
        }
        var ty;
        /** @type {number} */
        var vlen = vectors.length;
        /** @type {number} */
        var s = size / vlen;
        /** @type {number} */
        var position = 0;
        /** @type {number} */
        var i = 0;
        for (;vlen > i;i++) {
          ty = vectors[i].y;
          if (!(t && (child.realLen < 0 && (child.realLen = options.datas.tDataLen), options.datas.isT && (i > 4 * options.datas.tDataLen && child.realLen <= i - 4 * options.datas.tDataLen)))) {
            if (0 == i) {
              ctx.moveTo(position, ty);
            } else {
              ctx.lineTo(position, ty);
            }
            position += s;
          }
        }
        ctx.stroke();
      };
      /**
       * @return {undefined}
       */
      var drawBubble = function() {
        ctx.beginPath();
        /** @type {string} */
        ctx.textBaseline = "top";
        /** @type {string} */
        ctx.textAlign = "left";
        /** @type {string} */
        ctx.font = data.body.fontsize + "px Helvetica,Arial,sans-serif";
        ctx.fillStyle = color.TIMETXT;
        ctx.strokeStyle = color.TIMELINE;
        var j;
        var time;
        var position;
        if (options.datas.isT) {
          /** @type {number} */
          var duration = 0 == scope.witht5 ? 1 : 5;
          /** @type {number} */
          j = 0;
          /** @type {number} */
          time = size / duration;
          /** @type {number} */
          position = 0;
          /** @type {number} */
          var i = 0;
          /** @type {number} */
          var total = time / 2;
          for (;duration > j;j++, i += options.datas.tDataLen) {
            var d = vectors[i].d;
            var ex = 1 + d.getMonth() + "/" + d.getDate();
            /** @type {number} */
            position = ~~(position + 0.5);
            position -= 0.5;
            ctx.moveTo(position, 0);
            ctx.lineTo(position, options.DIMENSION.H_RS);
            callback(total, ex);
            position += time;
            total += time;
          }
        } else {
          var startEvent = $.URLHASH.gt(self.viewId);
          /** @type {boolean} */
          var forward = "mink" == startEvent.type;
          /** @type {string} */
          var e = forward ? "getHours" : "getFullYear";
          /** @type {number} */
          var spaces = vectors.length;
          /** @type {number} */
          j = 0;
          /** @type {number} */
          time = size / spaces;
          /** @type {number} */
          position = 0;
          var expr;
          var s;
          /** @type {number} */
          var bytesRead = 90;
          var old = void 0;
          /** @type {number} */
          var offset = -1;
          for (;spaces > j;j++) {
            s = vectors[j].d;
            expr = s[e]();
            if (expr != old) {
              old = expr;
              if (position > offset + bytesRead) {
                /** @type {number} */
                position = ~~(position + 0.5);
                position -= 0.5;
                /** @type {number} */
                offset = position;
                ctx.moveTo(position, 0);
                ctx.lineTo(position, options.DIMENSION.H_RS);
                if (forward) {
                  expr += ":00";
                }
                Set(position, expr);
              }
            }
            position += time;
          }
        }
        ctx.stroke();
      };
      /**
       * @param {Object} node
       * @return {undefined}
       */
      this.setV = function(node) {
        /** @type {string} */
        el.style.display = node.display ? "" : "none";
      };
      /**
       * @return {?}
       */
      this.getV = function() {
        return "none" != el.style.display;
      };
      /** @type {function (?, ?, ?): undefined} */
      this.fromInputDates = add;
      /** @type {number} */
      var Z = 3;
      /**
       * @param {?} deepDataAndEvents
       * @return {undefined}
       */
      this.drawBgLine = function(deepDataAndEvents) {
        if (input) {
          if (deepDataAndEvents) {
            if (Z-- > 0) {
              return;
            }
            /** @type {number} */
            Z = 9;
          }
          processData();
          expand();
          updateBug();
          drawMap();
          drawBubble();
        }
      };
      /**
       * @return {undefined}
       */
      this.locBarPos = function() {
        if (input) {
          /** @type {number} */
          var scale = size / (options.datas.isT ? 0 == scope.witht5 ? 1 : 5 : input.length);
          node.setX(self.start * scale);
          c.setX(self.end * scale);
          cursor = node;
          context = c;
          start();
        }
      };
      /**
       * @return {undefined}
       */
      this.resize = function() {
        var posX = options.DIMENSION.posX;
        /** @type {number} */
        size = options.datas.isT ? options.DIMENSION.getStageW() - posX - 2 * data.border.value - data.thumb.width - options.DIMENSION.RIGHT_W : options.DIMENSION.getStageW() - posX - 2 * data.border.value - data.thumb.width - options.DIMENSION.K_RIGHT_W;
        /** @type {string} */
        div.style.marginLeft = posX + "px";
        me.resize({
          width : size,
          height : options.DIMENSION.H_RS - data.border.v()
        });
        node.resize();
        c.resize();
        that.resize();
        dom.style.borderTopColor = color.TOP_BORDER;
        dom.style.borderRightColor = color.R_BORDER;
        dom.style.borderBottomColor = color.B_BORDER;
        dom.style.borderLeftColor = color.L_BORDER;
      };
      initialize();
      this.resize();
    };
    /**
     * @return {undefined}
     */
    this.onResize = function() {
      value.resize();
      value.locBarPos();
      value.drawBgLine();
    };
    var sel;
    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    this.setDataRange = function(dataAndEvents) {
      if (!dataAndEvents) {
        if (sel) {
          if (input) {
            value.locBarPos();
            value.fromInputDates(sel.start, sel.end, sel.disableCb);
            /** @type {null} */
            sel = null;
          }
        }
        if (value.getV()) {
          value.locBarPos();
        }
      }
    };
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    this.linkData = function(deepDataAndEvents) {
      if (value) {
        if (options.datas.isT) {
          if (child.tDb) {
            var codeSegments = child.tDb.get();
            if (codeSegments) {
              /** @type {Array} */
              input = [];
              /** @type {number} */
              var i = 0;
              for (;i < codeSegments.length;i++) {
                /** @type {Array} */
                input = input.concat(codeSegments[i]);
              }
            }
          }
        } else {
          if (child.kDb) {
            input = child.kDb.get();
          }
        }
        if (value.getV()) {
          value.drawBgLine(deepDataAndEvents);
        }
      }
    };
    /**
     * @return {?}
     */
    this.getBody = function() {
      return value.ctn;
    };
    /**
     * @param {Object} key
     * @return {undefined}
     */
    this.sh = function(key) {
      value.setV(key);
      if (key.display) {
        this.linkData();
        this.setDataRange();
      }
    };
    /**
     * @return {undefined}
     */
    this.clear = function() {
      /** @type {null} */
      input = null;
      util.domGc(value.ctn);
      /** @type {null} */
      value = null;
    };
    /**
     * @param {number} event
     * @param {number} i
     * @param {?} walkers
     * @return {undefined}
     */
    this.dateFromTo = function(event, i, walkers) {
      if (input) {
        value.fromInputDates(event, i, walkers);
      } else {
        sel = {
          start : event,
          end : i,
          disableCb : walkers
        };
      }
    };
    /**
     * @param {Object} obj
     * @return {?}
     */
    this.setTheme = function(obj) {
      /** @type {boolean} */
      var err = false;
      var i;
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (util.isColorRGB(obj[i])) {
            if (color.hasOwnProperty(i)) {
              if (color[i] !== obj[i]) {
                color[i] = obj[i];
                /** @type {boolean} */
                err = true;
              }
            }
          }
        }
      }
      return err;
    };
  }
  var createElement = util.$C;
  var merge = util.oc;
  var xh5EvtUtil = util.xh5_EvtUtil;
  var fixHook = util.xh5_deviceUtil;
  var User = dataAndEvents.xh5_Canvas;
  var _ = util.xh5_PosUtil;
  var $ = Node.globalCfg;
  return new function() {
    /**
     * @param {?} opt_default
     * @param {?} expect
     * @return {undefined}
     */
    this.get = function(opt_default, expect) {
      if (util.isFunc(expect)) {
        expect(initRangeSelector);
      }
    };
  };
});
