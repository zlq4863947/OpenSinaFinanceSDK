xh5_define("utils.painter", ["utils.util", "cfgs.settinger"], function(self, a) {
  /**
   * @return {undefined}
   */
  function Player() {
    /**
     * @param {Object} fn
     * @return {undefined}
     */
    function init(fn) {
      /**
       * @param {Object} options
       * @return {undefined}
       */
      function resize(options) {
        data = options.hd || data;
        var newWidth = options.width || (canvas.width || 0);
        var canvasHeight = options.height || (canvas.height || 0);
        var sx = data;
        switch(canvas.style.width = newWidth + "px", canvas.style.height = canvasHeight + "px", sx) {
          case 0:
            break;
          case 1:
            sx = t.hdpr;
            newWidth *= sx;
            canvasHeight *= sx;
            break;
          default:
            newWidth *= sx;
            canvasHeight *= sx;
        }
        /** @type {number} */
        canvas.height = canvas.width = 0;
        canvas.height = canvasHeight;
        canvas.width = newWidth;
        if (sx) {
          if (1 != sx) {
            ctx.scale(sx, sx);
          }
        }
      }
      /** @type {string} */
      this.VER = "2.0.1";
      var canvas = $("canvas");
      if ("undefined" != typeof FlashCanvas) {
        FlashCanvas.initElement(canvas);
      }
      var ctx = canvas.getContext("2d");
      /** @type {number} */
      var data = 1;
      if (fn) {
        resize(fn);
      }
      this.canvas = canvas;
      this.g = ctx;
      /** @type {function (Object): undefined} */
      this.resize = resize;
    }
    /**
     * @param {Object} target
     * @return {undefined}
     */
    function create(target) {
      var me;
      var canvas;
      var context;
      var gx;
      var fromIndex;
      var RIGHT_W;
      var tsWidth;
      var height;
      var actual;
      var item = target.parentObj;
      var node = target.ctn;
      var value = item.sd;
      var options = item.setting;
      /** @type {number} */
      var px = 0;
      var width = options.DIMENSION.H_TIME_PART;
      var name = item.nu;
      var inner = item.fixScale;
      /** @type {number} */
      var b = 99999;
      /**
       * @return {undefined}
       */
      var _init = function() {
        me = new init;
        canvas = me.canvas;
        context = me.g;
        /** @type {string} */
        canvas.style.position = "absolute";
        /** @type {number} */
        canvas.style.zIndex = 0;
        event.addHandler(canvas, "touchstart", function(e) {
          if (options.custom.touch_prevent) {
            event.preventDefault(e);
          }
        });
        node.appendChild(canvas);
      };
      /**
       * @param {Object} data
       * @return {undefined}
       */
      var draw = function(data) {
        data = data || {};
        gx = options.DIMENSION.getStageW();
        px = isNaN(data.mh) ? px : data.mh;
        fromIndex = options.DIMENSION.posX;
        RIGHT_W = options.DIMENSION.RIGHT_W;
        tsWidth = options.DIMENSION.K_RIGHT_W;
        height = isNaN(data.h) ? height : data.h;
        width = isNaN(data.eh) ? width : data.eh;
        me.resize({
          width : gx,
          height : height + width + px,
          hd : options.PARAM.getHd()
        });
        /** @type {string} */
        context.font = options.STYLE.FONT_SIZE + "px " + options.STYLE.FONT_FAMILY;
      };
      /**
       * @param {number} x
       * @param {number} d
       * @param {number} y
       * @param {boolean} recurring
       * @return {undefined}
       */
      var rect = function(x, d, y, recurring) {
        /** @type {number} */
        x = ~~(x + 0.5);
        x -= 0.5;
        /** @type {number} */
        d = ~~(d + 0.5);
        d -= 0.5;
        /** @type {number} */
        y = ~~(y + 0.5);
        y -= 0.5;
        context.beginPath();
        if (recurring) {
          context.moveTo(x, y);
          context.lineTo(d, y);
        } else {
          context.moveTo(y, x);
          context.lineTo(y, d);
        }
        context.stroke();
      };
      /**
       * @param {number} number
       * @param {number} value
       * @return {?}
       */
      var parse = function(number, value) {
        var a;
        return inner ? a = isNaN(value) ? 0 > number ? Math.floor(number) : Math.ceil(number) : number.toFixed(value) : (number = (1E4 * number).toFixed(0), a = number / 1E4, a > b && (a = Math.floor(a))), a;
      };
      var scheduler = new function() {
        var arg;
        var tags;
        var list;
        var out;
        var r;
        /** @type {number} */
        var i = 4;
        var replayInfo = value.futureTime || window["kke_future_" + value.symbol];
        /**
         * @return {undefined}
         */
        var drawText = function() {
          if (isNaN(options.custom.mini_threshold.height) || !(height < options.custom.mini_threshold.height)) {
            var extend_draw = options.DIMENSION.extend_draw;
            var ll = fromIndex;
            if (extend_draw) {
              /** @type {string} */
              context.textAlign = "left";
              /** @type {string} */
              context.textBaseline = "top";
            } else {
              /** @type {string} */
              context.textAlign = "right";
            }
            context.fillStyle = options.COLOR.T_N;
            context.strokeStyle = options.COLOR.GRID;
            if (options.DIMENSION.getStageH() < 0) {
              if ("TFLOW" == value.name) {
                /** @type {number} */
                value.labelPriceCount = 4;
              }
            }
            if (!value.isSC) {
              if (options.DIMENSION.h_t < 150) {
                /** @type {number} */
                value.labelPriceCount = 2;
              }
            }
            var pct;
            var minValueString;
            var val;
            var str;
            var y;
            var code = value.labelMaxP;
            var index = name ? self.strUtil.nu(code) : null;
            var ctor = value.labelMinP;
            var len = value.labelPriceCount;
            var x = options.DIMENSION.posX;
            /** @type {number} */
            var spacing = code - ctor;
            /** @type {number} */
            var editorHeight = height / len;
            /** @type {number} */
            var i = 0;
            for (;len >= i;i++) {
              y = i * editorHeight + px;
              context.fillStyle = options.COLOR.T_N;
              /** @type {number} */
              val = code - i * spacing / len;
              if (val > 0) {
                context.fillStyle = options.COLOR.T_RISE;
              } else {
                if (0 > val) {
                  context.fillStyle = options.COLOR.T_FALL;
                }
              }
              if (extend_draw) {
                if (i == len) {
                  /** @type {string} */
                  context.textBaseline = "bottom";
                }
              } else {
                /** @type {string} */
                context.textBaseline = 0 == i ? "top" : i == len ? "bottom" : "middle";
              }
              var amount;
              if (value.isCompare) {
                if (value.dAdd <= 1) {
                  val *= 100;
                  /** @type {string} */
                  str = val.toFixed(2);
                  str += "%";
                  context.fillText(str, x, y);
                  context.fillText(str, x + options.DIMENSION.w_t + context.measureText(str).width, y);
                } else {
                  amount = value.datas[0][0].prevclose;
                  var maxValueString;
                  /** @type {number} */
                  var input = val;
                  input *= 100;
                  /** @type {string} */
                  maxValueString = input.toFixed(2);
                  maxValueString += "%";
                  if (extend_draw) {
                    context.fillText(maxValueString, options.DIMENSION.w_t - context.measureText(maxValueString).width, y);
                  } else {
                    context.fillText(maxValueString, x + options.DIMENSION.w_t + context.measureText(maxValueString).width, y);
                  }
                  val = val * amount + amount;
                  str = val.toFixed(2);
                  context.fillText(str, x, y);
                }
                rect(ll, gx - RIGHT_W, y, true);
              } else {
                if (value.isSC) {
                  if (context.fillStyle = options.COLOR.K_P, name) {
                    /** @type {number} */
                    var udataCur = value.name && "TFLOW" == value.name ? 2 : 0;
                    val /= index[0];
                    if (0 == i || i == len) {
                      str = i >= len ? index[1] : parse(val, udataCur);
                      if ("NaN" == str || "" == str) {
                        /** @type {number} */
                        str = 0;
                      }
                    } else {
                      /** @type {string} */
                      str = "";
                    }
                  } else {
                    /** @type {(number|string)} */
                    str = 0 == i || i == len ? val.toFixed(1 > ctor ? 4 : 2) : 0;
                    if (0 == str) {
                      if (0 != i) {
                        if (i != len) {
                          /** @type {string} */
                          str = "";
                        }
                      }
                    }
                  }
                } else {
                  if (options.DIMENSION.h_t < 0) {
                    return;
                  }
                  amount = value.datas[0][0].prevclose;
                  /** @type {number} */
                  var M = "HK" == value.market ? 3 : 4;
                  var decimal = 1 > ctor ? M : value.nfloat || 2;
                  if ("HF" == self.market(value.symbol)) {
                    if (3 > ctor) {
                      /** @type {number} */
                      decimal = 4;
                    } else {
                      if (99 > ctor) {
                        /** @type {number} */
                        decimal = 3;
                      }
                    }
                  }
                  /** @type {(number|string)} */
                  str = Math.abs(val) > b ? Math.floor(val) : val.toFixed(decimal);
                  /** @type {number} */
                  pct = 100 * (val - amount) / amount;
                  context.fillStyle = pct > 0 ? options.COLOR.T_RISE : 0 > pct ? options.COLOR.T_FALL : options.COLOR.T_N;
                  /** @type {string} */
                  minValueString = isNaN(pct) ? "--%" : pct.toFixed(2) + "%";
                  if (extend_draw) {
                    context.fillText(minValueString, x + options.DIMENSION.w_t - context.measureText(minValueString).width, y);
                  } else {
                    context.fillText(minValueString, x + options.DIMENSION.w_t + context.measureText(minValueString).width, y);
                  }
                }
                context.fillText(str, x, y);
                rect(ll, gx - RIGHT_W, y, true);
              }
            }
          }
        };
        /**
         * @param {number} message
         * @param {number} n
         * @return {undefined}
         */
        var f = function(message, n) {
          var attrNames = value && self.market(value.symbol);
          var w_t = options.DIMENSION.w_t;
          if (!("HK" == attrNames && (415 > w_t && !n))) {
            rect(px, height + px, message, false);
          }
        };
        /**
         * @param {number} x
         * @param {?} text
         * @param {number} keepData
         * @param {number} opt_offset
         * @param {number} callback
         * @return {undefined}
         */
        var draw = function(x, text, keepData, opt_offset, callback) {
          if (arg = x, item.dt) {
            var originalWidth_ = context.measureText(text).width;
            /** @type {number} */
            var nodeRadius = 0;
            /** @type {number} */
            nodeRadius = 0 == keepData ? 0 : keepData == opt_offset - 1 ? -originalWidth_ : -originalWidth_ / 2;
            if (0 == opt_offset) {
              /** @type {number} */
              nodeRadius = callback / 2 - originalWidth_ / 2;
            }
            context.fillText(text, x + nodeRadius, px + height + options.STYLE.FONT_SIZE + 2);
          }
        };
        /**
         * @param {string} s
         * @return {?}
         */
        var quote = function(s) {
          var x = s.replace("nf_", "").replace(/[\d]+$/, "");
          return "TF" == x || "T" == x ? "CFF" : "NF";
        };
        /** @type {number} */
        var domLn = 30;
        /** @type {string} */
        var copies = "ignore";
        /** @type {string} */
        var el = "ignoreT";
        /**
         * @return {undefined}
         */
        var insert = function() {
          var j;
          var attrNames = value && self.market(value.symbol);
          switch(attrNames) {
            case "US":
              /** @type {number} */
              i = 7;
              break;
            case "HK":
              /** @type {number} */
              i = 5;
              break;
            case "NF":
            ;
            case "HF":
              /** @type {number} */
              i = 0;
              break;
            default:
              /** @type {number} */
              i = 4;
          }
          if (!tags) {
            switch(attrNames) {
              case "HF":
                tags = self.tUtil.gata(attrNames, replayInfo && replayInfo.time || [["06:00", "23:59"], ["00:00", "05:00"]]);
                break;
              case "NF":
                tags = self.tUtil.gata(attrNames, replayInfo && replayInfo.time || [["09:00", "23:29"], ["13:00", "02:59"]]);
                break;
              default:
                tags = self.tUtil.gata(attrNames);
            }
            if ("CFF" == quote(value.symbol)) {
              /** @type {number} */
              domLn = 15;
            }
            /** @type {Array} */
            list = [];
            /** @type {number} */
            j = 0;
            for (;j < tags.length;j += domLn) {
              list.push(tags[j]);
            }
            var s = tags[tags.length - 1].split(":")[1];
            if ("00" != s) {
              if ("30" != s) {
                list.push(tags[tags.length - 1]);
              }
            }
          }
          /** @type {Array} */
          out = [];
          /** @type {Array} */
          r = [];
          var count = options.DIMENSION.w_t;
          /** @type {number} */
          var thumbsCount = 370;
          /** @type {number} */
          var listIndex = 70;
          /** @type {number} */
          var M_HALF_PI = 35;
          /** @type {number} */
          var step = count / list.length;
          /** @type {number} */
          var start = 0;
          /** @type {number} */
          var min = 0;
          if (item.dt && "HK" == attrNames) {
            var add = value.hq.time;
            if (item.dt) {
              if (add > "15:59") {
                if (add > "16:09") {
                  /** @type {string} */
                  add = "16:09";
                }
                list[list.length - 1] = add;
              }
            }
            /** @type {number} */
            thumbsCount = 415;
          }
          /** @type {number} */
          j = 0;
          for (;j < list.length;j++) {
            if (0 == j || j == list.length - 1) {
              out.push(list[j]);
              r.push(el);
            } else {
              if (j == i) {
                out.push(list[j]);
                r.push(list[j]);
              } else {
                if (thumbsCount > count) {
                  out.push(copies);
                } else {
                  if (j > 0 && i > j) {
                    if (step * (j - start) > listIndex && step * (i - j) > listIndex) {
                      out.push(list[j]);
                      /** @type {number} */
                      start = j;
                    } else {
                      out.push(copies);
                    }
                  } else {
                    if (i > start) {
                      /** @type {number} */
                      start = i;
                    }
                    if (step * (j - start) > listIndex && step * (list.length - 1 - j) > listIndex) {
                      out.push(list[j]);
                      /** @type {number} */
                      start = j;
                    } else {
                      out.push(copies);
                    }
                  }
                }
              }
            }
            if (0 != j) {
              if (j != i) {
                if (j != list.length - 1) {
                  if (j > 0 && i > j) {
                    if (step * (j - min) > M_HALF_PI && step * (i - j) > M_HALF_PI) {
                      r.push(list[j]);
                      /** @type {number} */
                      min = j;
                    } else {
                      r.push(el);
                    }
                  } else {
                    if (i > min) {
                      /** @type {number} */
                      min = i;
                    }
                    if (step * (j - min) > M_HALF_PI && step * (list.length - 1 - j) > M_HALF_PI) {
                      r.push(list[j]);
                      /** @type {number} */
                      min = j;
                    } else {
                      r.push(el);
                    }
                  }
                }
              }
            }
          }
          switch(attrNames) {
            case "NF":
              if (replayInfo) {
                if ("21:00" != replayInfo.time[0][0]) {
                  /** @type {number} */
                  i = 15 == domLn ? options.DIMENSION._w <= 550 ? 9 : 0 : 5;
                } else {
                  if (thumbsCount > count) {
                    /** @type {number} */
                    i = Math.floor(r.length / 2);
                  }
                }
              }
              /** @type {string} */
              out[out.length - 1] = 30 == domLn ? "15:00" : "15:15";
              var regExpResultArray = list[i].split(":");
              if (59 == regExpResultArray[1]) {
                /** @type {string} */
                list[i] = Number(regExpResultArray[0]) + 1 + ":00";
              }
              out[i] = list[i];
              break;
            case "HF":
              if (thumbsCount > count) {
                /** @type {number} */
                i = Math.floor(r.length / 2);
              }
              out[i] = list[i];
          }
        };
        /**
         * @return {undefined}
         */
        var drawBubble = function() {
          var left = options.DIMENSION.w_t;
          if (isNaN(options.custom.mini_threshold.width) || !(left < options.custom.mini_threshold.width)) {
            /** @type {string} */
            context.textBaseline = "bottom";
            /** @type {string} */
            context.textAlign = "left";
            context.strokeStyle = options.COLOR.TIME_L;
            context.fillStyle = options.COLOR.TIME_S;
            arg = fromIndex;
            var special = value.datas;
            var right = special.length;
            var attrNames = value && self.market(value.symbol);
            var j = list.length;
            /** @type {number} */
            var n = 1;
            if ("NF" == attrNames) {
              if ("CFF" == quote(value.symbol)) {
                /** @type {number} */
                n = 2;
              }
            }
            /** @type {number} */
            var restoreScript = left / Math.max(j - n, 5);
            var message = fromIndex;
            /** @type {number} */
            var _w = 550;
            if (options.DIMENSION.getStageH() < 0 && (item.dt = true), item.dt) {
              var type;
              if (1 == right || right > 6) {
                /** @type {number} */
                type = 0;
                for (;j > type;type++) {
                  if (out[type] !== copies) {
                    draw(message, out[type], type, j);
                  }
                  if ("HF" == attrNames || "NF" == attrNames) {
                    if (out[type] !== copies) {
                      if (type == i) {
                        f(message, i);
                      } else {
                        f(message);
                      }
                    }
                  } else {
                    if (r[type] !== el) {
                      if (type == i) {
                        f(message, i);
                      } else {
                        f(message);
                      }
                    }
                  }
                  message += restoreScript;
                }
              } else {
                if (6 > right) {
                  /** @type {number} */
                  restoreScript = left / right;
                  /** @type {number} */
                  type = 0;
                  for (;right > type;type++) {
                    if (options.DIMENSION._w < _w) {
                      draw(message, dateUtil.ds(special[type][0].date, "/", false, true, false, false), type, 0, restoreScript);
                    } else {
                      draw(message, dateUtil.ds(special[type][0].date, "/") + "/" + dateUtil.nw(special[type][0].date.getDay()), type, 0, restoreScript);
                    }
                    if (0 != type) {
                      f(message);
                    }
                    message += restoreScript;
                  }
                }
              }
            }
          }
        };
        /**
         * @return {undefined}
         */
        this.drawFrames = function() {
          draw();
          insert();
          drawBubble();
          drawText();
        };
      };
      var content = new function() {
        /** @type {number} */
        this.iOffsetX = 0;
        var length;
        var ln;
        var date;
        var wDate;
        var expected;
        var arr = this;
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var f2 = 22;
        /** @type {number} */
        var offset = 99;
        /**
         * @param {number} x
         * @param {string} text
         * @param {number} indent
         * @return {undefined}
         */
        var draw = function(x, text, indent) {
          if (isNaN(indent)) {
            if (i + offset >= x || x >= gx - offset) {
              return;
            }
            rect(px + 1, height + px, x, false);
          }
          if (i = x, item.dt) {
            var width;
            var y = height + px + options.STYLE.FONT_SIZE + 3;
            switch(indent) {
              case 1:
                context.fillText(text, x, y);
                break;
              case 2:
                width = context.measureText(text).width;
                context.fillText(text, x - width, y);
                break;
              case 3:
                break;
              default:
                width = context.measureText(text).width;
                context.fillText(text, x - (width >> 1), y);
            }
          }
        };
        /**
         * @return {undefined}
         */
        var process = function() {
          var width = options.DIMENSION.w_k;
          if (isNaN(options.custom.mini_threshold.width) || !(width < options.custom.mini_threshold.width)) {
            /** @type {string} */
            context.textBaseline = "bottom";
            /** @type {string} */
            context.textAlign = "left";
            context.strokeStyle = options.COLOR.TIME_L;
            context.fillStyle = options.COLOR.TIME_S;
            i = fromIndex;
            var strInterval;
            var target = value.datas;
            var h = target.length;
            switch(actual) {
              case al.URLHASH.KMS:
                /** @type {string} */
                strInterval = "sec";
                break;
              case al.URLHASH.K1:
                /** @type {string} */
                strInterval = "h";
                break;
              case al.URLHASH.K5:
              ;
              case al.URLHASH.K15:
              ;
              case al.URLHASH.K30:
              ;
              case al.URLHASH.K60:
              ;
              case al.URLHASH.K240:
                /** @type {string} */
                strInterval = 60 / actual * 24 > h ? "h" : "d";
                break;
              case al.URLHASH.KD:
              ;
              case al.URLHASH.KDF:
              ;
              case al.URLHASH.KDB:
              ;
              case al.URLHASH.KCL:
              ;
              case al.URLHASH.KCLF:
              ;
              case al.URLHASH.KCLB:
                /** @type {string} */
                strInterval = h > 300 ? "y" : 28 > h ? "w" : "m";
                break;
              default:
                /** @type {string} */
                strInterval = h > 300 ? "y" : "m";
            }
            var expr;
            var index;
            var mat;
            var expected;
            var date;
            var data;
            /** @type {number} */
            var w = width / Math.max(h, options.PARAM.minCandleNum);
            var x = arr.iOffsetX + fromIndex + 0.6 * w;
            /** @type {number} */
            var step = width / offset;
            /** @type {number} */
            var distance = width / (w * f2);
            /** @type {number} */
            var targetTicks = Math.ceil(distance / step);
            /** @type {number} */
            var currentTag = 0;
            /** @type {number} */
            var old = 0;
            /** @type {number} */
            var max = -1;
            /** @type {number} */
            var dest = -1;
            /** @type {number} */
            var result = -1;
            /** @type {number} */
            var t = -1;
            /** @type {number} */
            var bulk = -1;
            /** @type {number} */
            var y = 0;
            for (;h > y;y++) {
              if (data = target[y], date = data.date, index = date.getMonth(), expr = date.getFullYear(), 0 != y) {
                if (y >= h - 1) {
                  draw(x + w / 2, expr + "/" + (index + 1) + "/" + date.getDate(), h >= options.PARAM.minCandleNum ? 2 : 3);
                } else {
                  switch(strInterval) {
                    case "sec":
                      var a = date.getSeconds();
                      if (a != t) {
                        a = self.strUtil.zp(a);
                        expected = self.strUtil.zp(date.getMinutes());
                        mat = self.strUtil.zp(date.getHours());
                        draw(x, mat + ":" + expected + ":" + a);
                      }
                      /** @type {number} */
                      t = Number(a);
                      break;
                    case "min":
                      expected = date.getMinutes();
                      if (expected != result) {
                        expected = self.strUtil.zp(expected);
                        mat = self.strUtil.zp(date.getHours());
                        draw(x, mat + ":" + expected);
                      }
                      /** @type {number} */
                      result = Number(expected);
                      break;
                    case "h":
                      mat = date.getHours();
                      if (mat != dest) {
                        expected = self.strUtil.zp(date.getMinutes());
                        draw(x, mat + ":" + expected);
                      }
                      dest = mat;
                      break;
                    case "d":
                      var tag = date.getDate();
                      if (tag != currentTag) {
                        draw(x, expr + "/" + (index + 1) + "/" + tag);
                      }
                      currentTag = tag;
                      break;
                    case "w":
                      var fn = date.getDay();
                      if (bulk > fn) {
                        draw(x, index + 1 + "/" + date.getDate());
                      }
                      bulk = fn;
                      break;
                    default:
                    ;
                    case "m":
                      if (!(index == max)) {
                        if (!(index % targetTicks)) {
                          draw(x, expr + "/" + (index + 1));
                        }
                      }
                      max = index;
                      break;
                    case "y":
                      if (expr != old) {
                        draw(x, expr);
                      }
                      old = expr;
                  }
                  x += w;
                }
              } else {
                draw(fromIndex, expr + "/" + (index + 1) + "/" + date.getDate(), 1);
              }
            }
          }
        };
        /** @type {number} */
        var ms = 37;
        /**
         * @return {undefined}
         */
        var drawText = function() {
          context.fillStyle = options.COLOR.K_PCT;
          /** @type {string} */
          context.textBaseline = "top";
          /** @type {string} */
          context.textAlign = "right";
          var a;
          var y;
          var NUMBER_OF_DECIMALS = value.nfloat || 2;
          var b = value.prevclose;
          var d = value.labelPriceCount;
          /** @type {number} */
          var c = 0;
          /** @type {number} */
          var h = height / d;
          var length = value.labelMaxP;
          var j = value.labelMinP;
          /** @type {number} */
          var t = length - j;
          for (;d >= c;c++) {
            if (!(ms > h && 1 & c)) {
              y = c * h + px;
              if (0 == c) {
                y++;
              }
              /** @type {number} */
              a = length - c * t / d;
              if (c == d) {
                /** @type {string} */
                context.textBaseline = "bottom";
              }
              var title;
              if (actual === al.URLHASH.KMS || actual === al.URLHASH.K1) {
                /** @type {string} */
                title = ((a - b) / b * 100).toFixed(NUMBER_OF_DECIMALS) + "%";
                context.fillStyle = a > b ? options.COLOR.K_MS_RISE : b > a ? options.COLOR.K_MS_FALL : options.COLOR.K_MS_N;
              } else {
                /** @type {string} */
                title = Math.round((a - b) / b * 100) + "%";
              }
              context.fillText(title, gx - tsWidth, y);
            }
          }
        };
        /**
         * @return {undefined}
         */
        var drawBubble = function() {
          if (isNaN(options.custom.mini_threshold.height) || !(height < options.custom.mini_threshold.height)) {
            var extend_draw = options.DIMENSION.extend_draw;
            context.fillStyle = options.COLOR.K_P;
            context.strokeStyle = options.COLOR.GRID;
            var ll = fromIndex;
            if (extend_draw) {
              /** @type {string} */
              context.textAlign = "left";
              /** @type {string} */
              context.textBaseline = "top";
            } else {
              /** @type {string} */
              context.textAlign = "right";
            }
            var val;
            var y;
            var t;
            var b = value.labelPriceCount;
            /** @type {number} */
            var a = 0;
            var posX = options.DIMENSION.posX;
            /** @type {number} */
            var h = height / b;
            var offset = value.labelMaxP;
            var len = value.labelMinP;
            /** @type {number} */
            var left = offset - len;
            var i = value.prevclose;
            var index = name ? self.strUtil.nu(offset) : null;
            for (;b >= a;a++) {
              if (!(ms > h && 1 & a)) {
                y = a * h + px;
                if (0 == a) {
                  y++;
                }
                /** @type {number} */
                val = offset - a * left / b;
                if (value.isCompare) {
                  val *= 100;
                }
                if (name) {
                  val /= index[0];
                  t = a >= b ? index[1] : parse(val);
                } else {
                  t = parse(val);
                }
                if (value.isCompare) {
                  t += "%";
                }
                if (extend_draw) {
                  if (a == b) {
                    /** @type {string} */
                    context.textBaseline = "bottom";
                  }
                } else {
                  /** @type {string} */
                  context.textBaseline = 0 == a ? "top" : a == b ? "bottom" : "middle";
                }
                if (actual === al.URLHASH.KMS) {
                  if (i) {
                    context.fillStyle = val > i ? options.COLOR.K_MS_RISE : i > val ? options.COLOR.K_MS_FALL : options.COLOR.K_MS_N;
                  }
                }
                context.fillText(t, posX, y);
                rect(ll, gx - tsWidth, y, true);
              }
            }
            if (i) {
              if (!value.isCompare) {
                if (options.custom.show_k_rangepercent) {
                  drawText();
                }
              }
            }
          }
        };
        /**
         * @param {boolean} recurring
         * @return {undefined}
         */
        this.drawFrames = function(recurring) {
          if (recurring || (value.datas[0].date != date || (value.datas[value.datas.length - 1].date != wDate || (value.labelMaxP != length || (value.labelMinP != ln || actual != expected))))) {
            draw();
            drawBubble();
            process();
          }
          expected = value.viewState.viewId;
          date = value.datas[0].date;
          wDate = value.datas[value.datas.length - 1].date;
          length = value.labelMaxP;
          ln = value.labelMinP;
        };
      };
      /**
       * @param {boolean} recurring
       * @param {boolean} val2
       * @return {undefined}
       */
      this.drawBg = function(recurring, val2) {
        if (value.datas) {
          actual = value.viewState.viewId;
          if (options.datas.isT) {
            scheduler.drawFrames(recurring);
          } else {
            if (!isNaN(val2)) {
              /** @type {boolean} */
              content.iOffsetX = val2;
              /** @type {boolean} */
              recurring = true;
            }
            content.drawFrames(recurring);
          }
        }
      };
      /**
       * @param {Object} data
       * @return {undefined}
       */
      this.respos = function(data) {
        draw(data);
        /** @type {number} */
        canvas.style.left = 0;
        /** @type {string} */
        canvas.style.top = options.DIMENSION.posY + "px";
        this.drawBg(true);
      };
      /**
       * @return {undefined}
       */
      this.gc = function() {
        self.domGc(canvas);
      };
      _init();
    }
    /**
     * @param {Object} element
     * @return {undefined}
     */
    function build(element) {
      var img;
      var c = element.parentObj;
      var map = element.ctn;
      var context = c.iMgr;
      var fire = cb(c.iTo, null, map);
      var cl = c.iClk;
      var group = context.globalDragHandler;
      var j = context.zoomView;
      var options = c.setting;
      var tripleQuoted = options.PARAM.isFlash;
      /** @type {boolean} */
      var end = !tripleQuoted;
      /** @type {boolean} */
      var isTch = false;
      /** @type {number} */
      var backoff = 300;
      var b = {
        isM : false,
        isTch : false,
        isP : false,
        tCount : void 0,
        tXOff : -1,
        isPv : false,
        lastIy : null,
        mDx : 0 / 0,
        mDy : 0 / 0,
        isClk : 0,
        isTMin : false,
        mvOx : 0,
        /**
         * @param {Event} evt
         * @return {undefined}
         */
        vP : function(evt) {
          var x;
          var y;
          if (evt.changedTouches) {
            event.preventDefault(evt);
            event.stopPropagation(evt);
            var target = event.getTarget(evt);
            var e = evt.changedTouches[0];
            var offset = target.getBoundingClientRect();
            var offsetX = offset.left;
            var diff = offset.top;
            /** @type {number} */
            x = e.clientX - offsetX;
            /** @type {number} */
            y = e.clientY - diff;
          } else {
            x = evt.offsetX;
            if (isNaN(x)) {
              x = evt.layerX;
            }
            y = evt.offsetY;
            if (isNaN(y)) {
              y = evt.layerY;
            }
          }
          fire(x, y, evt);
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        vH : function(e) {
          if (!(this.isClk > 0) && options.custom.allow_move) {
            event.preventDefault(e);
            event.stopPropagation(e);
            var value = e.changedTouches ? e.changedTouches[0].pageX : e.layerX;
            if (isNaN(value)) {
              value = e.offsetX;
            }
            var y = e.changedTouches ? e.changedTouches[0].pageY : e.layerY;
            if (isNaN(y)) {
              y = e.offsetY;
            }
            group(this.mDx, value, this.mDy, y);
          }
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        mD : function(e) {
          this.mDx = isNaN(e.layerX) ? e.offsetX : e.layerX;
          this.mDy = isNaN(e.layerY) ? e.offsetY : e.layerY;
          /** @type {boolean} */
          this.isM = this.isP = true;
          /** @type {number} */
          this.isClk = 2;
          onTouchMove(true);
        },
        /**
         * @param {Event} evt
         * @return {undefined}
         */
        mM : function(evt) {
          if (!this.isTch) {
            /** @type {boolean} */
            isTch = true;
            this.isClk--;
            if (this.isP) {
              this.vH(evt);
            } else {
              this.vP(evt);
            }
          }
        },
        /**
         * @param {Event} types
         * @return {undefined}
         */
        mU : function(types) {
          /** @type {number} */
          this.mDx = 0 / 0;
          /** @type {number} */
          this.mDy = 0 / 0;
          /** @type {boolean} */
          this.isM = this.isP = false;
          group(0 / 0, 0 / 0, 0 / 0, 0 / 0, types);
          if (this.isClk > 0) {
            if (cl) {
              /** @type {number} */
              this.isClk = 0;
              cl();
            }
          }
          onTouchMove(false);
        },
        /**
         * @return {undefined}
         */
        mO : function() {
          /** @type {number} */
          this.isClk = 0;
          /** @type {boolean} */
          this.isM = this.isP = isTch = false;
          fire(0 / 0, 0 / 0);
          onTouchMove(false);
        },
        /**
         * @return {undefined}
         */
        tR : function() {
          clearTimeout(this.tCount);
          /** @type {boolean} */
          this.isPv = this.isTMin = false;
        },
        /**
         * @return {undefined}
         */
        gR : function() {
          this.tR();
          /** @type {number} */
          this.tXOff = -1;
        },
        /**
         * @param {Event} event
         * @return {undefined}
         */
        tCheck : function(event) {
          this.mvOx = event.touches[0].pageX;
          var fixHook = this;
          /** @type {number} */
          fixHook.isClk = 2;
          /** @type {number} */
          this.tCount = setTimeout(function() {
            /** @type {boolean} */
            fixHook.isPv = true;
            fixHook.vP(event);
            /** @type {number} */
            fixHook.isClk = 0;
          }, backoff);
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        tE : function(e) {
          event.preventDefault(e);
          this.tR();
          /** @type {boolean} */
          this.isTch = isTch = false;
          /** @type {number} */
          this.mDx = 0 / 0;
          /** @type {number} */
          this.mDy = 0 / 0;
          fire(0 / 0, 0 / 0);
          group(0 / 0, 0 / 0, 0 / 0, 0 / 0, e);
          if (this.isClk > 0) {
            if (cl) {
              /** @type {number} */
              this.isClk = 0;
              cl();
            }
          }
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        tM : function(e) {
          if (this.isClk--, 1 == e.touches.length) {
            if (!this.isPv && (!this.isTMin && Math.abs(this.mvOx - e.touches[0].pageX) < 5)) {
              return;
            }
            /** @type {boolean} */
            this.isTMin = true;
            clearTimeout(this.tCount);
            if (this.isPv) {
              this.vP(e);
            } else {
              this.vH(e);
            }
          } else {
            if (2 == e.touches.length) {
              event.preventDefault(e);
              var touch = e.touches[0];
              var target = e.touches[1];
              if (this.tXOff >= 0) {
                /** @type {number} */
                var tXOff = Math.abs(touch.pageX - target.pageX);
                if (tXOff != this.tXOff) {
                  var cur = event.getTarget(e);
                  var x = pos.pageX(cur);
                  /** @type {number} */
                  var xd = touch.pageX - x;
                  /** @type {number} */
                  var dx0 = target.pageX - x;
                  j(tXOff < this.tXOff, [xd, dx0]);
                }
              }
              /** @type {number} */
              this.tXOff = Math.abs(touch.pageX - target.pageX);
            }
          }
        },
        /**
         * @param {Event} e
         * @return {undefined}
         */
        tS : function(e) {
          switch(this.tR(), options.custom.touch_prevent && event.preventDefault(e), this.isTch = isTch = true, this.lastIy = e.touches[0].pageY, this.mDx = e.changedTouches[0].pageX, this.mDy = e.changedTouches[0].pageY, e.touches.length) {
            case 1:
              this.tCheck(e);
              break;
            case 2:
              this.gR();
          }
        },
        /**
         * @param {Event} event
         * @return {undefined}
         */
        handleEvent : function(event) {
          if (options.custom.mouse_and_touch) {
            switch(event.type) {
              case "mouseup":
                this.mU(event);
                break;
              case "mousedown":
                this.mD(event);
                break;
              case "mouseout":
                this.mO();
                break;
              case "mousemove":
                this.mM(event);
                break;
              case "touchend":
                this.tE(event);
                break;
              case "touchmove":
                this.tM(event);
                break;
              case "touchstart":
                this.tS(event);
            }
          }
        }
      };
      var el = new function() {
        /**
         * @param {Event} event
         * @return {undefined}
         */
        this.onmouseup = function(event) {
          if (options.custom.mouse_and_touch) {
            b.mU(event);
          }
        };
        /**
         * @param {Event} e
         * @return {undefined}
         */
        this.onmousedown = function(e) {
          if (options.custom.mouse_and_touch) {
            b.mD(e);
          }
        };
        /**
         * @return {undefined}
         */
        this.onmouseout = function() {
          if (options.custom.mouse_and_touch) {
            b.mO();
          }
        };
        /**
         * @param {Event} ev
         * @return {undefined}
         */
        this.onmousemove = function(ev) {
          if (options.custom.mouse_and_touch) {
            b.mM(ev);
          }
        };
      };
      /**
       * @return {undefined}
       */
      var add = function() {
        if (end) {
          img = $("canvas");
        } else {
          img = $("div");
          /** @type {string} */
          img.style.backgroundColor = "#eee";
          /** @type {number} */
          img.style.opacity = 0;
          /** @type {string} */
          img.style.filter = "alpha(opacity=0)";
        }
        /** @type {string} */
        img.style.position = "absolute";
        img.style.zIndex = options.PARAM.I_Z_INDEX;
        var e;
        if (len.istd) {
          /** @type {Array} */
          e = ["touchend", "touchmove", "touchstart"];
        } else {
          /** @type {Array} */
          e = ["mousedown", "mouseup", "mousemove", "mouseout"];
          if (len.allowt) {
            /** @type {Array} */
            e = e.concat(["touchend", "touchmove", "touchstart"]);
          }
        }
        var n = e.length;
        for (;n--;) {
          if (end) {
            event.addHandler(img, e[n], b);
          } else {
            event.addHandler(img, e[n], el["on" + e[n]] || function() {
            });
          }
        }
        map.appendChild(img);
      };
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      var onTouchMove = function(recurring) {
        if (recurring) {
          /** @type {string} */
          img.style.cursor = "grabbing";
          /** @type {string} */
          img.style.cursor = "-webkit-grabbing";
        } else {
          /** @type {string} */
          img.style.cursor = "default";
        }
      };
      /**
       * @param {Object} settings
       * @return {undefined}
       */
      this.respos = function(settings) {
        /** @type {string} */
        img.style.top = options.DIMENSION.posY + settings.mh + "px";
        /** @type {string} */
        img.style.left = options.DIMENSION.posX + "px";
        var w;
        w = options.datas.isT ? options.DIMENSION.w_t : options.DIMENSION.w_k;
        /** @type {string} */
        img.style.width = w + "px";
        /** @type {string} */
        img.style.height = settings.h + "px";
      };
      /**
       * @return {undefined}
       */
      this.gc = function() {
        self.domGc(img);
      };
      add();
    }
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function initCanvas2DAPI(e) {
      /** @type {string} */
      this.VER = "2.2.4";
      e = str({
        setting : void 0,
        sd : void 0,
        ctn : void 0,
        reO : void 0,
        withHBg : false,
        nu : false,
        dt : true,
        fixScale : true,
        /**
         * @return {undefined}
         */
        iTo : function() {
        },
        iMgr : void 0,
        iClk : void 0
      }, e || {});
      var elt;
      var canvas;
      var ctx;
      var rbrace;
      var rsingleTag;
      var options = e.setting;
      /**
       * @return {undefined}
       */
      var addLayer = function() {
        if (e.ctn) {
          elt = e.ctn;
        } else {
          elt = $("div");
          /** @type {string} */
          elt.style.position = "relative";
        }
      };
      /**
       * @return {undefined}
       */
      var init = function() {
        canvas = $("canvas");
        if ("undefined" != typeof FlashCanvas) {
          FlashCanvas.initElement(canvas);
        }
        /** @type {string} */
        canvas.style.position = "absolute";
        canvas.style.zIndex = options.PARAM.G_Z_INDEX;
        ctx = canvas.getContext("2d");
        elt.appendChild(canvas);
      };
      /**
       * @return {undefined}
       */
      var cloneObject = function() {
        rsingleTag = new build({
          parentObj : e,
          ctn : elt
        });
      };
      /**
       * @return {undefined}
       */
      var createImageData = function() {
        rbrace = new create({
          parentObj : e,
          ctn : elt
        });
      };
      /**
       * @param {Object} data
       * @return {undefined}
       */
      var draw = function(data) {
        data = data || {};
        var newWidth;
        var h;
        var height = isNaN(data.mh) ? options.DIMENSION.H_T_T : data.mh;
        var m = isNaN(data.eh) ? options.DIMENSION.H_TIME_PART : data.eh;
        var startY = options.PARAM.getHd();
        switch(newWidth = options.datas.isT ? options.DIMENSION.w_t : options.DIMENSION.w_k, h = isNaN(data.h) ? options.DIMENSION.h_k : data.h, data.h = h, data.mh = height, data.eh = m, elt.style.height = h + height + m + "px", canvas.style.top = options.DIMENSION.posY + height + "px", canvas.style.left = options.DIMENSION.posX + "px", canvas.style.width = newWidth + "px", canvas.style.height = h + "px", startY) {
          case 0:
            break;
          case 1:
            startY = t.hdpr;
            newWidth *= startY;
            h *= startY;
            break;
          default:
            newWidth *= startY;
            h *= startY;
        }
        canvas.width = newWidth;
        canvas.height = h;
        if (rsingleTag) {
          rsingleTag.respos(data);
        }
        if (rbrace) {
          rbrace.respos(data);
        }
      };
      /** @type {function (Object): undefined} */
      this.resize = draw;
      /**
       * @return {?}
       */
      this.getCanvas = function() {
        return canvas;
      };
      /**
       * @return {?}
       */
      this.getG = function() {
        return ctx;
      };
      /**
       * @return {?}
       */
      this.getWrap = function() {
        return elt;
      };
      var strc;
      /**
       * @param {Object} sx
       * @return {undefined}
       */
      this.scale = function(sx) {
        switch(sx) {
          case 0:
            return;
          case 1:
            sx = t.hdpr;
        }
        if (sx) {
          ctx.scale(sx, sx);
        }
      };
      /**
       * @param {Object} changes
       * @return {undefined}
       */
      this.newGStyle = function(changes) {
        var key;
        for (key in changes) {
          if (changes.hasOwnProperty(key)) {
            ctx[key] = changes[key];
          }
        }
      };
      /**
       * @param {?} grad
       * @param {?} dataAndEvents
       * @param {number} lw
       * @return {undefined}
       */
      this.newStyle = function(grad, dataAndEvents, lw) {
        strc = ctx.strokeStyle = grad;
        if (dataAndEvents) {
          ctx.beginPath();
        }
        if (lw) {
          /** @type {number} */
          ctx.lineWidth = lw;
        }
      };
      /**
       * @param {(Array|string)} colors
       * @param {?} y2
       * @return {undefined}
       */
      this.newFillStyle = function(colors, y2) {
        if (colors && !(colors.length < 1)) {
          var l = colors.length;
          if (1 == l) {
            ctx.fillStyle = colors[0];
          } else {
            if (l > 1) {
              var gradient = ctx.createLinearGradient(0, 0, 0, y2);
              /** @type {number} */
              var i = 0;
              for (;l > i;i++) {
                gradient.addColorStop(1 / (l - 1) * i, colors[i]);
              }
              ctx.fillStyle = gradient;
            }
          }
        }
      };
      /**
       * @param {Array} r
       * @param {?} y2
       * @param {?} funcToCall
       * @return {undefined}
       */
      this.newFillStyle_rgba = function(r, y2, funcToCall) {
        var grd = ctx.createLinearGradient(0, 0, 0, y2);
        /** @type {number} */
        var i = 0;
        var l = r.length;
        for (;l > i;i++) {
          grd.addColorStop(1 / (l - 1) * i, self.hex2dec(r[i], funcToCall));
        }
        ctx.fillStyle = grd;
      };
      /**
       * @param {?} arr
       * @param {Object} y
       * @return {undefined}
       */
      this.clear = function(arr, y) {
        canvas.width = canvas.width;
        if (arr) {
          if (strc) {
            if (ctx.strokeStyle != strc) {
              ctx.strokeStyle = strc;
            }
          }
          ctx.beginPath();
        }
        this.scale(y);
      };
      /**
       * @param {?} cl
       * @param {?} w
       * @return {undefined}
       */
      this.clearLimit = function(cl, w) {
        ctx.clearRect(cl, 0, w, canvas.height);
        ctx.beginPath();
      };
      /**
       * @return {undefined}
       */
      this.beginPath = function() {
        ctx.beginPath();
      };
      /**
       * @return {undefined}
       */
      this.closePath = function() {
        ctx.closePath();
      };
      /**
       * @return {undefined}
       */
      this.fill = function() {
        ctx.fill();
      };
      /**
       * @return {undefined}
       */
      this.stroke = function() {
        ctx.stroke();
      };
      /**
       * @return {undefined}
       */
      this.save = function() {
        ctx.save();
      };
      /**
       * @param {?} tx
       * @param {?} ty
       * @return {undefined}
       */
      this.translate = function(tx, ty) {
        ctx.translate(tx, ty);
      };
      /**
       * @return {undefined}
       */
      this.restore = function() {
        ctx.restore();
      };
      /**
       * @param {number} v00
       * @param {number} pos
       * @return {undefined}
       */
      this.moveTo = function(v00, pos) {
        ctx.moveTo(v00, pos);
      };
      /**
       * @param {number} x
       * @param {number} y
       * @return {undefined}
       */
      this.lineTo = function(x, y) {
        ctx.lineTo(x, y);
      };
      /**
       * @param {number} x
       * @param {number} y
       * @param {?} radius
       * @param {?} cy
       * @return {undefined}
       */
      this.drawDot = function(x, y, radius, cy) {
        if (cy) {
          ctx.moveTo(x, y);
        }
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
      };
      /**
       * @param {number} x
       * @param {number} y
       * @param {?} radius
       * @param {number} startAngle
       * @param {number} endAngle
       * @param {?} anticlockwise
       * @return {undefined}
       */
      this.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      };
      /**
       * @param {number} x
       * @param {number} y
       * @param {number} height
       * @param {number} w
       * @param {?} col
       * @param {?} dataAndEvents
       * @return {undefined}
       */
      this.drawCandleRect = function(x, y, height, w, col, dataAndEvents) {
        if (y != height && !(2 > w)) {
          /** @type {number} */
          var h = height - y;
          x += 0.5 * w;
          /** @type {number} */
          w = ~~(w + 0.5);
          /** @type {number} */
          x = ~~(x + 0.5);
          /** @type {number} */
          y = ~~(y + 0.5);
          /** @type {number} */
          h = ~~(h + 0.5);
          /** @type {number} */
          ctx.lineWidth = 1;
          if (dataAndEvents) {
            x -= 0.5;
            y -= 0.5;
            ctx.strokeStyle = col;
            ctx.strokeRect(x, y, w, h);
          } else {
            if (1 > h) {
              /** @type {number} */
              h = 1;
            }
            ctx.fillStyle = col;
            ctx.fillRect(x, y, w, h);
            x -= 0.5;
            y -= 0.5;
            ctx.strokeStyle = col;
            ctx.strokeRect(x, y, w, h);
          }
        }
      };
      /**
       * @param {number} x
       * @param {number} y
       * @param {number} height
       * @param {number} w
       * @param {?} col
       * @return {undefined}
       */
      this.drawCandleRect_solid = function(x, y, height, w, col) {
        if (y != height && !(2 > w)) {
          /** @type {number} */
          var h = height - y;
          x += 0.5 * w;
          /** @type {number} */
          w = ~~(w + 0.5);
          /** @type {number} */
          x = ~~(x + 0.5);
          /** @type {number} */
          y = ~~(y + 0.5);
          /** @type {number} */
          h = ~~(h + 0.5);
          /** @type {number} */
          ctx.lineWidth = 1;
          ctx.fillStyle = col;
          ctx.fillRect(x, y, w, h);
          x -= 0.5;
          y -= 0.5;
          ctx.strokeStyle = col;
          ctx.strokeRect(x, y, w, h);
        }
      };
      /**
       * @param {number} x
       * @param {number} i
       * @param {number} bottom
       * @param {number} column
       * @param {number} y
       * @param {number} pixelSize
       * @param {?} grad
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      this.drawCandleLineRect = function(x, i, bottom, column, y, pixelSize, grad, dataAndEvents) {
        if (x += pixelSize, x = ~~(x + 0.5), ctx.strokeStyle = grad, ctx.lineWidth = 1, bottom == column) {
          /** @type {number} */
          var halfWidth = 0.5 * pixelSize;
          /** @type {number} */
          halfWidth = ~~(halfWidth + 0.5);
          if (0.5 > halfWidth) {
            /** @type {number} */
            halfWidth = 0.5;
          }
          /** @type {number} */
          bottom = ~~(bottom + 0.5);
          bottom -= 0.5;
          ctx.moveTo(x - halfWidth, bottom);
          ctx.lineTo(x + halfWidth, bottom);
        }
        if (i != y) {
          if (x -= 0.5, ctx.moveTo(x, i), dataAndEvents && pixelSize >= 2) {
            /** @type {number} */
            var cy = Math.min(bottom, column);
            /** @type {number} */
            var position = Math.max(bottom, column);
            ctx.lineTo(x, cy);
            ctx.moveTo(x, position);
          }
          ctx.lineTo(x, y);
        }
      };
      /**
       * @param {number} x
       * @param {number} position
       * @param {number} pos
       * @param {number} y3
       * @param {number} y
       * @param {number} scale
       * @param {?} grad
       * @return {undefined}
       */
      this.drawOhlc = function(x, position, pos, y3, y, scale, grad) {
        ctx.strokeStyle = grad;
        /** @type {number} */
        ctx.lineWidth = 1;
        /** @type {number} */
        var size = 0.5 * scale;
        /** @type {number} */
        size = ~~(size + 0.5);
        if (0.5 > size) {
          /** @type {number} */
          size = 0.5;
        }
        x += scale;
        /** @type {number} */
        x = ~~(x + 0.5);
        /** @type {number} */
        position = ~~(position + 0.5);
        position -= 0.5;
        ctx.moveTo(x - size, position);
        ctx.lineTo(x, position);
        /** @type {number} */
        y = ~~(y + 0.5);
        y -= 0.5;
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        x -= 0.5;
        ctx.moveTo(x, pos);
        ctx.lineTo(x, y3);
      };
      /**
       * @param {number} x
       * @param {number} pos
       * @param {number} width
       * @param {number} size
       * @param {?} grad
       * @return {undefined}
       */
      this.drawVStickC = function(x, pos, width, size, grad) {
        x += width;
        /** @type {number} */
        width = ~~(width + 0.5);
        if (1 > width) {
          /** @type {number} */
          width = 1;
        }
        /** @type {number} */
        x = ~~(x + 0.5);
        if (1 & width) {
          x -= 0.5;
        }
        /** @type {number} */
        pos = ~~(pos + 0.5);
        /** @type {number} */
        size = ~~(size - 0.5);
        ctx.strokeStyle = grad;
        /** @type {number} */
        ctx.lineWidth = width;
        ctx.moveTo(x, pos);
        ctx.lineTo(x, pos + size);
      };
      /**
       * @param {number} x
       * @param {number} y
       * @param {number} scale
       * @param {number} h
       * @param {?} col
       * @param {?} dataAndEvents
       * @return {undefined}
       */
      this.drawVStickRect = function(x, y, scale, h, col, dataAndEvents) {
        x += 0.5 * scale;
        /** @type {number} */
        var w = scale;
        /** @type {number} */
        x = ~~(x + 0.5);
        /** @type {number} */
        w = ~~(w + 0.5);
        /** @type {number} */
        y = ~~(y + 0.5);
        /** @type {number} */
        h = ~~(h + 0.5);
        if (0 == h) {
          /** @type {number} */
          h = 1;
        }
        if (dataAndEvents) {
          if (0.5 > w) {
            /** @type {number} */
            w = 0.5;
          }
          ctx.fillStyle = col;
          ctx.fillRect(x, y, w, h);
        } else {
          x -= 0.5;
          y -= 0.5;
          ctx.strokeStyle = col;
          ctx.strokeRect(x, y, w, h);
        }
      };
      /**
       * @param {boolean} recurring
       * @return {undefined}
       */
      this.drawBg = function(recurring) {
        if (rbrace) {
          rbrace.drawBg(false, recurring);
        }
      };
      /**
       * @return {undefined}
       */
      this.remove = function() {
        self.domGc(canvas);
        if (rsingleTag) {
          rsingleTag.gc();
        }
        if (rbrace) {
          rbrace.gc();
        }
      };
      addLayer();
      init();
      if (e.withHBg) {
        cloneObject();
        createImageData();
      }
      draw(e.reO);
    }
    /** @type {function (Object): undefined} */
    this.xh5_ibPainter = initCanvas2DAPI;
    /** @type {function (Object): undefined} */
    this.xh5_Canvas = init;
  }
  var $ = self.$C;
  var t = self.xh5_BrowserUtil;
  var event = self.xh5_EvtUtil;
  var len = self.xh5_deviceUtil;
  var pos = self.xh5_HtmlPosUtil;
  var cb = self.fBind;
  var dateUtil = self.dateUtil;
  var str = self.oc;
  var al = a.globalCfg;
  return Player;
});
