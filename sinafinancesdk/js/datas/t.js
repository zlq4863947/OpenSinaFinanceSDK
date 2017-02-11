xh5_define("datas.t", ["utils.util"], function(utils) {
  var info;
  var opts;
  var exports = utils;
  var $ = exports.load;
  var self = exports.tUtil;
  /** @type {boolean} */
  var a = 0 == location.protocol.indexOf("https:");
  var test = {
    /**
     * @param {string} got
     * @return {?}
     */
    isBond : function(got) {
      return/^(sh204\d{3}|sz1318\d{2})$/.test(got) ? "bond" : /^sh020\d{3}$/.test(got) ? "bond" : /^sz108\d{3}$/.test(got) ? "bond" : /^sh(009|010)\d{3}$/.test(got) ? "bond" : /^sz10\d{4}$/.test(got) ? "bond" : /^sh(100|110|112|113)\d{3}$/.test(got) ? "bond" : /^sz12\d{4}$/.test(got) ? "bond" : /^sh(105|120|129|139)\d{3}$/.test(got) ? "bond" : /^sz11\d{4}$/.test(got) ? "bond" : false;
    },
    /**
     * @param {string} u
     * @param {Object} s
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    us : function(u, s, dataAndEvents) {
      var obj;
      var ca = u.split(";");
      /** @type {Array} */
      var readyList = [];
      /** @type {number} */
      var i = 0;
      var l = ca.length;
      for (;l > i;i++) {
        var m;
        var path;
        var value;
        var v;
        var index;
        var match = ca[i].split(",");
        if (0 == i) {
          if (dataAndEvents) {
            m = match[1].split(":")[0] + ":" + match[1].split(":")[1];
            path = match[0];
            /** @type {number} */
            value = Number(match[4]);
            /** @type {number} */
            v = Number(match[2]);
            /** @type {number} */
            index = Number(match[5]) || Number(match[4]);
          } else {
            index = s.prevclose;
            m = match[0].split(":")[0] + ":" + match[0].split(":")[1];
            /** @type {number} */
            value = Number(match[3]);
            /** @type {number} */
            v = Number(match[1]);
          }
          obj = {
            prevclose : index,
            d : path,
            m : m,
            p : value,
            v : v,
            avp : value
          };
        } else {
          m = match[0].split(":")[0] + ":" + match[0].split(":")[1];
          /** @type {number} */
          value = Number(match[3]);
          /** @type {number} */
          v = Number(match[1]);
          obj = {
            m : m,
            p : value,
            v : v,
            avp : value
          };
        }
        readyList.push(obj);
        if (dataAndEvents) {
          if (i == l - 1) {
            if ("16:00" > m) {
              obj = {
                m : "16:00",
                p : value,
                v : 0,
                avp : value
              };
              readyList.push(obj);
            }
          }
        }
      }
      return readyList;
    },
    /**
     * @param {Array} employees
     * @param {Object} s
     * @param {string} arg
     * @return {?}
     */
    optionCn : function(employees, s, arg) {
      if (typeof employees.length < 1) {
        return[];
      }
      var g;
      var r;
      var o;
      var el;
      var keyName = self.gata(arg);
      /** @type {Array} */
      var excludes = [];
      var l = employees.length;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var u = 0;
      for (;l > i;i++) {
        o = employees[i];
        if (!(keyName[keyName.length - 1] < o.m)) {
          if (0 == u) {
            if (Number(o.p) <= 0) {
              o.p = s.price || s.prevclose;
            }
          }
          u++;
          if (Number(o.p) > 0) {
            /** @type {number} */
            g = Number(o.p);
          }
          if (Number(o.p) <= 0) {
            /** @type {number} */
            o.p = g || 0;
          }
          if (Number(o.a) > 0) {
            /** @type {number} */
            r = Number(o.a);
          }
          if (Number(o.a) <= 0) {
            /** @type {number} */
            o.a = r || (g || 0);
          }
          if (Number(o.v) < 0) {
            /** @type {number} */
            o.v = 0;
          }
          el = {
            m : o.i,
            p : Number(o.p),
            avp : Number(o.a),
            v : Number(o.v),
            iy : Number(o.t)
          };
          if (0 == i) {
            el.d = o.d;
          }
          excludes.push(el);
        }
      }
      return excludes;
    },
    /**
     * @param {Array} matches
     * @param {Object} data
     * @param {string} str
     * @param {boolean} isString
     * @return {?}
     */
    hf : function(matches, data, str, isString) {
      if (typeof matches.length < 1) {
        return[];
      }
      var formula;
      var match;
      var arr = self.gata(str, info.time);
      /** @type {Array} */
      var args = [];
      var n = matches.length;
      /** @type {number} */
      var stop = 0;
      if (isString) {
        n = arr.length;
      }
      var i;
      var message;
      /** @type {number} */
      var m = 0;
      /** @type {number} */
      var f = 0;
      for (;n > m && (match = matches[m], i = 0, 0 == m && (i = isString ? 1 : 4), 0 == f && (Number(match[1 + i]) <= 0 && (match[1 + i] = data.price)), !(data.index > 0 && (!isString && data.index <= utils.arrIndexOf(arr, match[i]))));m++) {
        f++;
        if (match) {
          if (Number(match[1 + i]) > 0) {
            /** @type {number} */
            formula = Number(match[1 + i]);
          }
        }
        if (match) {
          if (Number(match[1 + i]) <= 0) {
            /** @type {number} */
            match[1 + i] = formula || 0;
          }
        }
        if (match) {
          stop += Number(match[1 + i]);
          message = {
            m : match[i],
            p : Number(match[1 + i]),
            avp : stop / (m + 1),
            v : 0
          };
          if (0 == m) {
            message.d = match[0];
            message.prevclose = isString ? Number(match[i]) || message.p : data.prevclose;
            if (isString) {
              if (match[1 + i].split(":").length > 1) {
                /** @type {number} */
                message.p = message.avp = Number(match[3]);
              }
              if (isNaN(stop)) {
                /** @type {number} */
                stop = Number(match[3]);
                /** @type {number} */
                message.avp = stop;
              }
            }
          }
        } else {
          if (isString) {
            message = {
              m : arr[m],
              p : args[args.length - 1].p,
              avp : args[args.length - 1].avp,
              v : 0
            };
          }
        }
        args.push(message);
      }
      return args;
    },
    /**
     * @param {Array} employees
     * @param {Object} data
     * @param {?} n
     * @return {?}
     */
    hk : function(employees, data, n) {
      if (typeof employees.length < 1) {
        return[];
      }
      var formula;
      var r;
      var vvar;
      var c = self.gata(n);
      /** @type {Array} */
      var assigns = [];
      var l = employees.length;
      /** @type {number} */
      var totalWidth = 0;
      /** @type {number} */
      var width = 0;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var m = 0;
      for (;l > i;i++) {
        r = employees[i];
        width += Number(r.a);
        totalWidth += Number(r.v);
        if (r.m) {
          r.m = r.m.split(":")[0] + ":" + r.m.split(":")[1];
        }
        if (!(c[c.length - 1] < r.m)) {
          if (0 == m) {
            if (Number(r.p) <= 0) {
              r.p = data.price || data.prevclose;
            }
          }
          m++;
          if (Number(r.p) > 0) {
            /** @type {number} */
            formula = Number(r.p);
          }
          if (Number(r.p) <= 0) {
            /** @type {number} */
            r.p = formula || 0;
          }
          if (0 >= totalWidth) {
            /** @type {number} */
            totalWidth = 1;
          }
          vvar = {
            m : r.m,
            p : Number(r.p),
            avp : width / totalWidth,
            v : Number(r.v)
          };
          assigns.push(vvar);
        }
      }
      return assigns;
    },
    /**
     * @param {Array} employees
     * @param {Object} data
     * @param {?} sel
     * @return {?}
     */
    otc : function(employees, data, sel) {
      if (typeof employees.length < 1) {
        return[];
      }
      var index;
      var height;
      var vvar;
      var options;
      var matched = self.gata(sel);
      /** @type {Array} */
      var assigns = [];
      var l = employees.length;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var u = 0;
      for (;l > i;i++) {
        options = employees[i];
        var m = options.m.split(":");
        var processRelativeTime = m[0] + ":" + m[1];
        if (!(matched[matched.length - 1] < processRelativeTime)) {
          if (0 == u) {
            if (Number(options.p) <= 0) {
              options.p = data.price || data.prevclose;
            }
          }
          u++;
          if (Number(options.p) > 0) {
            /** @type {number} */
            index = Number(options.p);
          }
          if (Number(options.p) <= 0) {
            /** @type {number} */
            options.p = index || 0;
          }
          if (Number(options.avg) > 0) {
            /** @type {number} */
            height = Number(options.avg);
          }
          if (Number(options.avg) <= 0) {
            /** @type {number} */
            options.avg = height || (index || 0);
          }
          vvar = {
            p : Number(options.p),
            m : processRelativeTime,
            avp : Number(options.avg),
            v : Number(options.v) / 1E3
          };
          assigns.push(vvar);
        }
      }
      return assigns;
    },
    /**
     * @param {Array} a
     * @param {Object} s
     * @param {string} sel
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    futures : function(a, s, sel, dataAndEvents) {
      if (typeof a.length < 1) {
        return[];
      }
      var m;
      var i;
      var value;
      var formula;
      var v;
      var g;
      var caltyp;
      var n;
      var j;
      var iy;
      var match = self.gata(sel, opts.time);
      /** @type {number} */
      var h = 0;
      /** @type {Array} */
      var q_arr = [];
      /** @type {number} */
      var ii = 0;
      var al = a.length;
      for (;al > ii;ii++) {
        var p = a[ii];
        if (dataAndEvents ? (i = p[6], j = Number(p[5]) || Number(p[1])) : (i = p[6] || s.today, j = Number(p[5]) || s.prevclose), s.index > 0 && (!dataAndEvents && s.index <= utils.arrIndexOf(match, p[0]))) {
          break;
        }
        h++;
        if (Number(p[1]) > 0) {
          /** @type {number} */
          g = Number(p[1]);
        }
        if (Number(p[1]) <= 0) {
          /** @type {number} */
          p[1] = g || 0;
        }
        if (Number(p[2]) > 0) {
          /** @type {number} */
          caltyp = Number(p[2]);
        }
        if (Number(p[2]) <= 0) {
          /** @type {number} */
          p[2] = caltyp || 0;
        }
        if (Number(p[4]) > 0) {
          /** @type {number} */
          n = Number(p[4]);
        }
        if (Number(p[4]) <= 0) {
          /** @type {number} */
          p[4] = n || 0;
        }
        m = p[0];
        /** @type {number} */
        v = Number(p[3]) || 0;
        /** @type {number} */
        iy = Number(p[4]) || 0;
        if (!dataAndEvents && (a.length <= 1 && 0 == ii)) {
          value = Number(p[1]) ? Number(p[1]) : s.price;
          formula = Number(p[2]) ? Number(p[2]) : s.price;
          j = Number(p[5]) || s.prevclose;
        } else {
          /** @type {number} */
          value = Number(p[1]);
          /** @type {number} */
          formula = Number(p[2]);
        }
        var val = {
          d : i,
          m : m,
          p : value,
          avp : formula,
          iy : iy,
          prevclose : j,
          v : v
        };
        q_arr.push(val);
      }
      return dataAndEvents && (q_arr[q_arr.length - 1].m < "15:00" && (val.m = "15:00", q_arr.push(val))), q_arr;
    },
    /**
     * @param {string} value
     * @param {?} deepDataAndEvents
     * @param {boolean} shallow
     * @return {?}
     */
    gdf : function(value, deepDataAndEvents, shallow) {
      if (!value || (value.length < 9 || !deepDataAndEvents)) {
        return null;
      }
      var arr = shallow ? value : exports.xh5_S_KLC_D(value);
      var fromDate = exports.dateUtil.dd(deepDataAndEvents);
      if (6 == fromDate.getDay()) {
        fromDate.setDate(fromDate.getDate() - 1);
      }
      if (0 == fromDate.getDay()) {
        fromDate.setDate(fromDate.getDate() - 2);
      }
      var current;
      /** @type {Date} */
      var defaultCenturyStart = new Date(fromDate.getFullYear() - 3, fromDate.getMonth(), fromDate.getDate());
      /** @type {number} */
      var start = 0;
      /** @type {number} */
      var fromIndex = 0;
      /** @type {number} */
      var i = 0;
      var l = arr.length;
      for (;l > i;i++) {
        current = arr[i];
        if (current.getTime() <= defaultCenturyStart.getTime()) {
          if (arr[i + 1].getTime() >= defaultCenturyStart.getTime()) {
            /** @type {number} */
            start = i;
          }
        }
        if (exports.dateUtil.stbd(current, fromDate)) {
          /** @type {number} */
          fromIndex = i + 1;
        }
      }
      return arr.slice(start, fromIndex);
    },
    /**
     * @param {string} c
     * @return {?}
     */
    c2b : function(c) {
      c = c.replace(" ", "+");
      /** @type {number} */
      var pos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(c);
      return pos >= 0 ? pos : 0;
    },
    /**
     * @param {string} c
     * @return {?}
     */
    db : function(c) {
      if (!c) {
        return[];
      }
      var val;
      var count;
      /** @type {Array} */
      var keys = [];
      /** @type {number} */
      var key = 0;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var j = 0;
      var cl = c.length;
      for (;cl > j;j++) {
        val = this.c2b(c.charAt(j));
        /** @type {number} */
        count = 6 & i ? 7 & i ^ 7 : 5;
        key |= val >> 5 - count << (7 ^ i) - count;
        if (64767 == key) {
          if (63 == val) {
            /** @type {number} */
            key = 65535;
          }
        }
        if (i > 25) {
          i -= 32;
          /** @type {number} */
          keys[keys.length] = key;
          /** @type {number} */
          key = 0;
        }
        key |= (val & (1 << 5 - count) - 1) << (7 | i) + 4 + count;
        i += 6;
      }
      return keys;
    },
    /**
     * @param {Array} words
     * @param {number} recurring
     * @param {?} n
     * @param {Object} e
     * @return {?}
     */
    fB : function(words, recurring, n, e) {
      words.splice(360, 3);
      var b4;
      /** @type {Array} */
      var data = [];
      var codeSegments = self.gata(n);
      /** @type {number} */
      var jlen = 3 * codeSegments.length;
      /** @type {number} */
      var a1 = 0;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var j = 0;
      for (;jlen > j;j += 3) {
        /** @type {number} */
        i = Math.floor(j / 3);
        if (recurring) {
          data[data.length] = {
            time : codeSegments[i],
            price : words[j + 1] / 1E3
          };
        } else {
          data[data.length] = {
            time : codeSegments[i],
            avg_price : words[j] / 1E3,
            price : words[j + 1] / 1E3,
            volume : words[j + 2] / 100
          };
          if (utils.isRepos(e.symbol)) {
            data[i].avg_price = data[i].price;
            data[i].volume *= 10;
          }
          if (data[i].volume > 0) {
            a1 += data[i].volume;
          }
          if (data[i]) {
            if (0 == data[i].price) {
              if (0 == i) {
                data[i].price = data[i].avg_price = e.prevclose;
              } else {
                data[i].price = data[i - 1].price;
                data[i].avg_price = data[i - 1].price;
              }
            }
          }
          if (data[i].avg_price > 0) {
            b4 = data[i].avg_price;
          }
        }
      }
      return data[0].price < 0 && (data[0].price = data[0].avg_price = a1 = 0), recurring || (data[0].totalVolume = a1, data[0].totalAmount = a1 * b4), data[0].index = e.index, data[0].prevclose = e.prevclose, data[0].symbol = e.symbol, data[0].name = e.name, data[0].today = e.today, data[0].date = e.date, data[0].lastfive = e.lastfive, data;
    },
    /**
     * @param {(Array|NodeList)} str
     * @param {?} first
     * @param {Object} e
     * @param {Array} act
     * @return {?}
     */
    ctdf : function(str, first, e, act) {
      var ast;
      var i;
      var ilen;
      var len;
      /** @type {Array} */
      var a = [];
      var string = first;
      /** @type {number} */
      var j = 0;
      var spaces = str.length;
      for (;spaces > j;j++) {
        a[a.length] = 0 == j && "" == str[0] ? self.gltbt(1, e.prevclose) : exports.xh5_S_KLC_D(str[j]);
        var chunk;
        /** @type {number} */
        var d = 0;
        a[j].splice(120, 1);
        /** @type {number} */
        i = 0;
        /** @type {number} */
        ilen = 241;
        for (;ilen > i;i++) {
          if (a[j][i]) {
            if (0 == a[j][i].price) {
              if (0 == i) {
                a[j][i].price = a[j][i].avg_price = a[j][i].prevclose;
              } else {
                a[j][i].price = a[j][i - 1].price;
                a[j][i].avg_price = a[j][i - 1].avg_price;
              }
            }
          }
          if (utils.isRepos(e.symbol)) {
            a[j][i].avg_price = a[j][i].price;
            a[j][i].volume *= 10;
          }
          /** @type {number} */
          chunk = a[j][i].volume *= 0.01;
          d += chunk;
        }
        /** @type {number} */
        a[j][0].totalVolume = d;
        a[j][0].prevclose = a[j][0].prevclose || a[j][0].price;
      }
      /** @type {number} */
      var l = a.length;
      if (l > 5) {
        a.splice(0, l - 5);
      }
      /** @type {Array} */
      ast = [string];
      l = act.length;
      /** @type {number} */
      j = l - 2;
      for (;j > l - 6;j--) {
        /** @type {number} */
        i = 0;
        /** @type {number} */
        len = a.length;
        for (;len > i;i++) {
          if (exports.dateUtil.stbd(a[i][0].date, act[j])) {
            ast.unshift(self.azft(a[i], "CN"));
            break;
          }
          if (i == a.length - 1) {
            var funcToCall = ast[0][0].prevclose;
            ast.unshift(self.gltbt(1, funcToCall));
            ast[0][0].date = exports.dateUtil.dd(act[j]);
            ast[0][0].prevclose = funcToCall;
          }
        }
      }
      return ast;
    },
    /**
     * @param {number} opt_attributes
     * @param {?} first
     * @param {Object} e
     * @param {Array} expected
     * @param {string} msg
     * @return {?}
     */
    ctdb : function(opt_attributes, first, e, expected, msg) {
      var result = first;
      /** @type {Array} */
      var stack = [result];
      var cnl = expected.length;
      /** @type {number} */
      var x = cnl - 2;
      for (;x > cnl - 6;x--) {
        stack.unshift("HF" == utils.market(e.symbol) ? self.gltbt(1, e.prevclose, false, msg, [expected[x]], info.time) : "NF" == utils.market(e.symbol) ? self.gltbt(1, e.prevclose, false, msg, [expected[x]], opts.time) : self.gltbt(1, e.prevclose, false, msg, [expected[x]]));
      }
      return stack;
    },
    /**
     * @param {Object} data
     * @return {?}
     */
    fund : function(data) {
      /** @type {Array} */
      var include = [];
      if (data) {
        var match = data.detail.split(",");
        /** @type {number} */
        var count = 0;
        /** @type {number} */
        var j = 0;
        var spaces = match.length;
        for (;spaces > j;j += 2) {
          count += Number(match[j + 1]);
          var p = {
            p : Number(match[j + 1]),
            avp : Number(count / (j / 2 + 1)),
            m : match[j]
          };
          if (0 == j) {
            /** @type {number} */
            p.prevclose = Number("09:30" == match[j] ? data.yes : match[j + 1]);
          }
          include.push(p);
        }
      }
      return include;
    },
    /**
     * @param {Array} elems
     * @param {Object} options
     * @param {string} node
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    pkt : function(elems, options, node, dataAndEvents) {
      if (typeof elems.length < 1) {
        return[];
      }
      var values;
      /** @type {boolean} */
      var o = false;
      /** @type {Array} */
      var items = elems;
      var sub = self.s0(options.date.getHours()) + ":" + self.s0(options.date.getMinutes());
      switch(node) {
        case "HF":
          values = self.gata(node, info.time);
          if (items[0].d < options.today) {
            if (sub > info.time[0][0]) {
              sub = info.time[info.time.length - 1][1];
            }
          }
          break;
        case "NF":
          values = self.gata(node, opts.time);
          break;
        default:
          values = self.gata(node);
      }
      var $scope;
      /** @type {Array} */
      var frames = [];
      /** @type {number} */
      var fromIndex = 0;
      /** @type {number} */
      var len = 0;
      var valuesLen = values.length;
      for (;valuesLen > len;len++) {
        if ($scope = {}, frames[frames.length] = $scope, $scope.time = values[len], $scope.volume = $scope.price = -1, $scope.avg_price = -1, sub) {
          if (o && !dataAndEvents) {
            continue;
          }
          if (sub == $scope.time) {
            /** @type {boolean} */
            o = true;
          }
        }
        var newValue = values[0];
        /** @type {number} */
        var i = fromIndex;
        var ilen = items.length;
        for (;ilen > i;i++) {
          var item = items[i];
          /** @type {string} */
          var value = String(item.m).substring(0, 5);
          if (value == values[len]) {
            if (value == newValue) {
              $scope.symbol = options.symbol;
              $scope.name = options.name;
              if (dataAndEvents) {
                /** @type {number} */
                $scope.prevclose = Number(elems[0].prevclose) || Number(elems[0].p);
                $scope.date = exports.dateUtil.sd(elems[0].d);
                $scope.today = elems[0].d;
              } else {
                $scope.prevclose = options.prevclose;
                if ("HF" == node || "NF" == node) {
                  $scope.date = exports.dateUtil.sd(elems[0].d) || options.date;
                  $scope.today = elems[0].d || options.today;
                } else {
                  $scope.date = options.date;
                  $scope.today = options.today;
                }
              }
              if ("fund" == node) {
                $scope.prevclose = elems[0].prevclose;
              }
            }
            $scope.volume = item.v || 0;
            $scope.avg_price = item.avp;
            $scope.price = item.p;
            if (item.iy) {
              $scope.inventory = item.iy;
            }
            items.splice(i, 1);
            break;
          }
          if (value > values[len] || "NF" == node && ("21:00" == newValue && ($scope.time > "21:00" && value < values[len]))) {
            if (0 == len) {
              if (dataAndEvents) {
                $scope.price = elems[0].p;
                $scope.prevclose = elems[0].prevclose || $scope.price;
                $scope.avg_price = elems[0].avp;
                $scope.date = exports.dateUtil.sd(elems[0].d);
                $scope.today = elems[0].d;
              } else {
                $scope.price = options.open || options.prevclose;
                $scope.prevclose = options.prevclose;
                $scope.avg_price = $scope.price;
                $scope.symbol = options.symbol;
                $scope.name = options.name;
                if ("NF" == node) {
                  $scope.date = exports.dateUtil.sd(elems[0].d) || options.date;
                  $scope.today = elems[0].d || options.today;
                } else {
                  $scope.date = options.date;
                  $scope.today = options.today;
                }
              }
            } else {
              $scope.price = frames[len - 1].price;
              $scope.avg_price = frames[len - 1].avg_price;
              if ("option_cn" == node || "NF" == node) {
                $scope.inventory = frames[len - 1].inventory;
              }
            }
            /** @type {number} */
            $scope.volume = -0.01;
          } else {
            if (!(0 != len)) {
              if (!dataAndEvents) {
                $scope.price = elems[i].p || (options.open || options.prevclose);
                $scope.prevclose = options.prevclose;
                $scope.avg_price = elems[i].avp || $scope.price;
                $scope.symbol = options.symbol;
                $scope.name = options.name;
                /** @type {number} */
                $scope.volume = 0;
                if ("HF" == node || "NF" == node) {
                  $scope.date = exports.dateUtil.sd(elems[0].d) || options.date;
                  $scope.today = elems[0].d || options.today;
                } else {
                  $scope.date = options.date;
                  $scope.today = options.today;
                }
              }
            }
          }
        }
      }
      return frames[0].index = valuesLen - 1, frames;
    }
  };
  return new function() {
    /** @type {string} */
    this.VER = "2.5.9";
    /** @type {string} */
    var TRADING_DATES_URL = "http://finance.sina.com.cn/realstock/company/klc_td_sh.txt";
    var matches = {
      CN : {
        T_Head_STR : "hq_str_ml_",
        T_EMI_URL : "http://finance.sina.com.cn/finance/eqlweight/$symbol.js",
        T_URL : "http://hq.sinajs.cn/?_=$rn&list=$symbol",
        T5_URL : "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/klc_cm.js?day=$rn",
        TRADING_DATES_URL : TRADING_DATES_URL,
        HISTORY_DATA_URL : "http://finance.sina.com.cn/realstock/company/$symbol/hisdata/$y/$m.js?d=$date",
        LAST5_URL : "http://finance.sina.com.cn/realstock/lastfive/$symbol.js?_=$rn"
      },
      option_cn : {
        T_Head_STR : "t1",
        T_URL : "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getOptionMinline?symbol=$symbol&random=$rn&callback=$cb=",
        T5_URL : "http://stock.finance.sina.com.cn/futures/api/openapi.php/StockOptionDaylineService.getFiveDayLine?symbol=$symbol&random=$rn&callback=$cb=",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      US : {
        T_Head_STR : "t1",
        T_URL : "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb=/US_MinlineNService.getMinline?symbol=$symbol&day=1&random=$rn",
        T5_URL : "http://stock.finance.sina.com.cn/usstock/api/jsonp_v2.php/$cb/US_MinlineNService.getMinline?symbol=$symbol&day=5&random=$rn",
        TRADING_DATES_URL : "http://stock.finance.sina.com.cn/usstock/api/openapi.php/US_MinKService.getTradeDays?&start_day=$start&end_day=$end&callback=$cb="
      },
      HK : {
        T_Head_STR : "t1",
        T_URL : "http://stock.finance.sina.com.cn/hkstock/api/openapi.php/HK_StockService.getHKMinline?symbol=$symbol&random=$rn&callback=$cb=",
        LAST5_URL : "http://stock.finance.sina.com.cn/hkstock/api/jsonp_v2.php/$cb/HK_StockService.getStock5DayAvgVolume?symbol=$symbol",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      fund : {
        T_Head_STR : "t1",
        T_URL : "http://app.xincai.com/fund/api/jsonp.json/$cb=/XinCaiFundService.getFundYuCeNav?symbol=$symbol&___qn=3",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      CFF : {
        T_Head_STR : "t1",
        T_URL : "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
        T5_URL : "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      OTC : {
        T_Head_STR : "t1",
        T_URL : "http://stock.finance.sina.com.cn/thirdmarket/api/openapi.php/NQHQService.minline?symbol=$symbol&callback=$cb=",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      NF : {
        T_Head_STR : "t1",
        T_URL : "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getMinLine?symbol=$symbol",
        T5_URL : "http://stock2.finance.sina.com.cn/futures/api/jsonp.php/$cb=/InnerFuturesNewService.getFourDaysLine?symbol=$symbol",
        TRADING_DATES_URL : TRADING_DATES_URL
      },
      HF : {
        T_Head_STR : "t1",
        T_URL : "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFuturesMinLine?symbol=$symbol&callback=$cb=",
        T5_URL : "http://stock2.finance.sina.com.cn/futures/api/openapi.php/GlobalFuturesService.getGlobalFutures5MLine?symbol=$symbol&callback=$cb=",
        TRADING_DATES_URL : TRADING_DATES_URL
      }
    };
    var replies = {};
    /** @type {number} */
    var formula = 0;
    /**
     * @param {boolean} b
     * @param {string} str
     * @param {string} i
     * @return {?}
     */
    var call = function(b, str, i) {
      var input = utils.market(str);
      var buf = matches[input][i];
      return(a || b) && (buf = utils.getSUrl(buf)), buf;
    };
    /** @type {number} */
    var idKey = 0;
    /**
     * @param {string} opts
     * @param {string} callback
     * @return {undefined}
     */
    this.get = function(opts, callback) {
      var type;
      var value;
      var data;
      var selector = opts.symbol;
      var sel = utils.market(selector);
      var s = opts.date;
      var success = opts.withT5;
      var timeout = opts.withI;
      var node = opts.ssl;
      idKey = opts.dist5;
      var message = {
        msg : null,
        data : {
          td1 : null,
          td5 : null,
          hq : null
        }
      };
      switch(data = type = selector, sel) {
        case "HK":
          selector = "rt" == selector.substring(0, 2) ? selector.slice(3) : selector;
          type = selector;
          value = type.replace("hk", "");
          break;
        case "US":
          data += "," + selector + ",gb_ixic,sys_time";
          type = value = selector.replace("gb_", "");
          value = value.replace("$", ".");
          type = type.replace(".", "");
          break;
        case "OTC":
          value = selector.replace("sb", "");
          break;
        case "fund":
          value = selector.replace("fu_", "");
          break;
        case "CFF":
          value = selector.replace("CFF_RE_", "");
          break;
        case "CN":
          /** @type {string} */
          value = "ml_" + selector;
          break;
        case "HF":
          value = selector.replace("hf_", "");
          break;
        case "NF":
          value = selector.replace("nf_", "");
          break;
        default:
          value = selector;
      }
      /**
       * @param {?} r
       * @return {?}
       */
      var cb = function(r) {
        var lc;
        var year;
        var month;
        return s ? (month = s.split("-")[1] || "01", year = s.split("-")[0], s.split("-")[1] && (Number(s.split("-")[1]) < 10 && (month = "0" + Number(s.split("-")[1]), s = year + "-" + month + "-" + s.split("-")[2])), lc = "MLC_" + selector + "_" + year + "_" + month, {
          lc : lc,
          year : year,
          month : month
        }) : (s = r, null);
      };
      /**
       * @param {string} item
       * @return {undefined}
       */
      var load = function(item) {
        $(call(node, selector, "HISTORY_DATA_URL").replace("$symbol", selector).replace("$y", item.year).replace("$m", item.month).replace("$date", s), function() {
          /** @type {string} */
          var str = String(window[item.lc]);
          if (window[item.lc] = null, message.msg = "history", str) {
            var o;
            var d;
            var chunk;
            var shape;
            /** @type {Array.<string>} */
            var types = String(str).split(",");
            /** @type {Array} */
            var queue = [];
            /** @type {number} */
            var jlen = types.length;
            var to = self.gata(sel);
            /** @type {number} */
            var type = 0;
            for (;jlen > type;type++) {
              queue[type] = exports.xh5_S_KLC_D(types[type]);
              o = queue[type].shift();
              queue[type][0].prevclose = o.prevclose;
              queue[type][0].date = o.date;
              queue[type].splice(120, 1);
              /** @type {number} */
              d = 0;
              /** @type {number} */
              var i = 0;
              for (;241 > i;i++) {
                /** @type {number} */
                chunk = queue[type][i].volume /= 100;
                d += chunk;
                queue[type][i].time = to[i];
              }
              var ms = exports.dateUtil.ds(o.date);
              if (ms == s) {
                shape = queue[type];
              }
              /** @type {number} */
              queue[type][0].totalVolume = d;
            }
            if (queue.length < 5) {
              return void $(call(node, selector, "TRADING_DATES_URL"), function() {
                var b = window.datelist;
                /** @type {number} */
                var n = queue.length;
                var keys = test.gdf(b, exports.dateUtil.sd(s));
                /** @type {number} */
                var i = 5 - n;
                for (;i > 0;i--) {
                  queue.unshift(self.gltbt(1, queue[0][0].price, false, sel, [keys[keys.length - 5 + i]]));
                }
                message.data.td1 = shape;
                /** @type {Array} */
                message.data.td5 = queue;
                replies[selector + item.year + item.month] = message;
                if (exports.isFunc(callback)) {
                  callback(message);
                }
              }, null);
            }
            message.data.td1 = shape;
            /** @type {Array} */
            message.data.td5 = queue;
            replies[selector + item.year + item.month] = message;
            if (exports.isFunc(callback)) {
              callback(message);
            }
          }
        }, function() {
          /** @type {string} */
          message.msg = "nohistory";
          if (exports.isFunc(callback)) {
            callback(message);
          }
        });
      };
      /**
       * @param {string} value
       * @return {?}
       */
      var parse = function(value) {
        return replies[selector + value.year + value.month] ? void(exports.isFunc(callback) && callback(replies[selector + value.year + value.month])) : void load(value);
      };
      /**
       * @param {Object} obj
       * @param {Object} data
       * @return {?}
       */
      var update = function(obj, data) {
        var ret;
        switch(sel) {
          case "OTC":
            ret = test.otc(obj.result.data, data, sel);
            break;
          case "US":
            ret = test.us(String(obj), data);
            break;
          case "HK":
            ret = test.hk(obj.result.data, data, sel);
            break;
          case "fund":
            ret = test.fund(obj);
            break;
          case "CFF":
            ret = test.futures(obj, data);
            break;
          case "NF":
            ret = test.futures(obj, data, sel);
            break;
          case "option_cn":
            ret = test.optionCn(obj.result.data, data, "CN");
            break;
          case "CN":
            ret = test.db(obj);
            break;
          case "HF":
            ret = test.hf(obj.result.data.minLine_1d, data, sel);
        }
        if ("CN" == sel) {
          ret = test.fB(ret, false, sel, data);
        } else {
          ret = test.pkt(ret, data, sel);
          var time = data.time;
          if ("HK" == sel) {
            if (time > "15:59") {
              if (time > "16:09") {
                /** @type {string} */
                time = "16:09";
              }
              ret[ret.length - 1].price = data.price;
              ret[ret.length - 1].avg_price = ret[ret.length - 2].avg_price;
              ret[ret.length - 1].time = time;
              /** @type {number} */
              ret[ret.length - 1].volume = 0;
              if (ret[ret.length - 1].avg_price < 0) {
                ret[ret.length - 1].avg_price = data.price;
              }
            }
          }
        }
        return ret;
      };
      /**
       * @param {Object} self
       * @param {string} parent
       * @return {undefined}
       */
      var process = function(self, parent) {
        var text;
        /** @type {number} */
        var o = 3;
        if (text && text.length > 600) {
          init(self, selector, parent, text, callback, opts.dataformatter, node);
        } else {
          if (o--, o > 0) {
            if ("US" == sel) {
              var title = utils.dateUtil.ds(new Date(self.date.getFullYear(), self.date.getMonth() - 2, self.date.getDate()), "-");
              $(call(node, data, "TRADING_DATES_URL").replace("$start", title).replace("$end", self.today).replace("$cb", "var usHistorydate"), function() {
                var t = window.usHistorydate.result.data;
                var o = t.length;
                for (;o--;) {
                  t[o] = utils.dateUtil.sd(t[o]);
                }
                if (t.length > 0) {
                  if (!exports.dateUtil.stbd(t[t.length - 1], self.date)) {
                    t.push(self.date);
                  }
                }
                text = test.gdf(t, self.date, true);
                init(self, selector, parent, text, sel, callback, opts.dataformatter, node, type, value);
              }, null);
            } else {
              $(call(node, selector, "TRADING_DATES_URL"), function() {
                var json = window.datelist;
                text = test.gdf(json, self.date);
                init(self, selector, parent, text, sel, callback, opts.dataformatter, node);
              }, null);
            }
          } else {
            null();
          }
        }
      };
      /**
       * @param {?} el
       * @param {Object} value
       * @return {undefined}
       */
      var walk = function(el, value) {
        $(el, function() {
          var c = window[matches[sel].T_Head_STR + type];
          /** @type {null} */
          window[matches[sel].T_Head_STR + type] = null;
          info = window["kke_future_" + value.symbol] || {
            time : [["06:00", "23:59"], ["00:00", "05:00"]]
          };
          opts = window["kke_future_" + value.symbol] || {
            time : [["09:30", "11:29"], ["13:00", "02:59"]]
          };
          var ret;
          if ("" == c || (null == c || (c.result && null == c.result.data || (c.result && (c.result.data && c.result.data.length <= 0) || c.__ERROR)))) {
            switch(message.msg = "empty", sel) {
              case "HF":
                ret = self.gltbt(1, value.prevclose, true, sel, [value.date], info.time);
                break;
              case "NF":
                ret = self.gltbt(1, value.prevclose, true, sel, [value.date], opts.time);
                break;
              default:
                ret = self.gltbt(1, value.prevclose, true, sel);
            }
          } else {
            if (message.msg = "", "HF" == sel) {
              var match = value.today.split("-");
              var p = match[0] + "-" + (Number(match[1]) < 10 ? "0" + match[1] : match[1]) + "-" + (Number(match[2]) < 10 ? "0" + match[2] : match[2]);
              ret = p < c.result.data.minLine_1d[0][0] ? self.gltbt(1, value.prevclose, true, sel, null, info.time) : update(c, value);
              if ("hf_ES" == value.symbol) {
                if (value.time > info.time[0][0]) {
                  if (!exports.dateUtil.stbd(ret[0].date, value.date)) {
                    ret = self.gltbt(1, value.prevclose, true, sel, [value.date], info.time);
                  }
                }
              }
            } else {
              ret = update(c, value);
            }
          }
          return ret && (!ret[0].date && (ret[0].date = value.date)), message.data.td1 = ret, success ? void process(value, ret) : (0 != formula && (ret[0].lastfive = formula), void(exports.isFunc(callback) && callback(message)));
        });
      };
      /**
       * @return {undefined}
       */
      var next = function() {
        KKE.api("datas.hq.get", {
          symbol : data,
          withI : timeout,
          cancelEtag : true,
          ssl : node
        }, function(messageEvent) {
          var self = messageEvent.data[0];
          if (message.data.hq = self, !self.name && "CFF" != sel) {
            return message.msg = "error", void(exports.isFunc(callback) && callback(message));
          }
          var failuresLink = call(node, selector, "T_URL").replace("$rn", (new Date).getTime()).replace("$symbol", value).replace("$cb", "var t1" + type);
          var val = cb(self.today);
          return "CN" != sel || exports.dateUtil.stbd(exports.dateUtil.sd(self.today), exports.dateUtil.sd(s)) ? void walk(failuresLink, self) : void parse(val);
        });
      };
      next();
    };
    /**
     * @param {Object} e
     * @param {string} s
     * @param {(Object|number|string)} results
     * @param {Array} exp
     * @param {string} selector
     * @param {string} callback
     * @param {?} dataAndEvents
     * @param {boolean} node
     * @param {string} type
     * @param {?} fn
     * @return {?}
     */
    var init = function(e, s, results, exp, selector, callback, dataAndEvents, node, type, fn) {
      var data = {
        msg : null,
        data : {
          td1 : null,
          td5 : null,
          hq : null
        }
      };
      if (data.data.hq = e, data.data.td1 = results, !e.name && "CFF" != selector) {
        return data.msg = "error", void(exports.isFunc(callback) && callback(data));
      }
      /**
       * @return {undefined}
       */
      var initialize = function() {
        var min = test.ctdb(5, results, e, exp, selector);
        data.data.td5 = min;
        /** @type {string} */
        var prop = "lastfive" + s;
        var guess = s.substring(2);
        $(call(node, s, "LAST5_URL").replace("$rn", (new Date).getHours()).replace("$symbol", guess).replace("$cb", "var " + prop + "="), function() {
          var value = window[prop];
          return value ? (data.data.td5[4][0].lastfive = formula = Number(value.volume), void(exports.isFunc(callback) && callback(data))) : void(exports.isFunc(callback) && callback(data));
        }, function() {
          data.data.td5 = min;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var onComplete = function() {
        $(call(node, s, "T5_URL").replace("$rn", (new Date).getTime()).replace("$symbol", fn).replace("$cb", "var t5" + type + "="), function() {
          /** @type {string} */
          var str = String(window["t5" + type]);
          /** @type {Array} */
          var r = [];
          /** @type {Array.<string>} */
          var entries = str.split(" ");
          entries.shift();
          /** @type {number} */
          var i = entries.length;
          for (;i--;) {
            var div = test.us(entries[i], e, true);
            entries[i] = test.pkt(div, e, selector, true);
          }
          if (window["t5" + s] = null, "" == str) {
            /** @type {string} */
            data.msg = "empty";
          } else {
            /** @type {string} */
            data.msg = "";
            var x = exp.length;
            /** @type {number} */
            var previous = 0;
            /** @type {number} */
            var remaining = entries.length;
            /** @type {Array} */
            var options = [];
            /** @type {number} */
            i = x - 1;
            for (;i > x - 6;i--) {
              options.unshift(self.gltbt(1, e.prevclose, false, "US", [exp[i]]));
            }
            /** @type {number} */
            i = x - 1;
            for (;i > x - 6;i--) {
              var entry;
              /** @type {number} */
              var N = 0;
              /** @type {number} */
              var base = 0;
              for (;remaining > base;base++) {
                if (exports.dateUtil.stbd(exp[i], entries[base][0].date)) {
                  /** @type {string} */
                  entry = entries[base];
                  /** @type {number} */
                  N = 1;
                  /** @type {number} */
                  previous = base;
                }
              }
              if (0 == N) {
                entry = self.gltbt(1, options[previous][0].prevclose, false, "US", [exp[i]]);
              }
              r.unshift(entry);
            }
          }
          /** @type {(Object|number|string)} */
          r[4] = results;
          /** @type {Array} */
          data.data.td5 = r;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var init = function() {
        var first = "CFF_RE_" == s.substring(0, 7) ? s.slice(7) : s;
        $(call(node, s, "T5_URL").replace("$rn", (new Date).getTime()).replace("$symbol", first).replace("$cb", "var t5" + s), function() {
          var employees = window["t5" + s];
          /** @type {Array} */
          var matched = [];
          if (window["t5" + s] = null, "" == employees) {
            /** @type {string} */
            data.msg = "empty";
          } else {
            if (void 0 == employees) {
              return data.msg = "data error.", void cb();
            }
            /** @type {string} */
            data.msg = "";
            /** @type {Array} */
            var eventPath = [];
            var l = employees.length;
            /** @type {number} */
            var i = 0;
            for (;l > i;i++) {
              var ret = test.futures(employees[i], e, selector, "his");
              if (!exports.dateUtil.stbd(exports.dateUtil.sd(ret[0].d), e.date)) {
                var cur = test.pkt(ret, e, selector, true);
                eventPath.push(cur);
                matched.push(cur);
              }
            }
          }
          /** @type {(Object|number|string)} */
          matched[4] = results;
          /** @type {Array} */
          data.data.td5 = matched;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var cb = function() {
        data.data.td5 = test.ctdb(5, results, e, exp, selector);
        if (exports.isFunc(callback)) {
          callback(data);
        }
      };
      /**
       * @return {undefined}
       */
      var compile = function() {
        $(call(node, s, "T5_URL").replace("$symbol", s.replace("nf_", "")).replace("$cb", "var t5" + s), function() {
          var employees = window["t5" + s];
          /** @type {Array} */
          var paths = [];
          if (window["t5" + s] = null, "" == employees) {
            /** @type {string} */
            data.msg = "empty";
          } else {
            if (void 0 == employees) {
              return data.msg = "data error.", void cb();
            }
            /** @type {string} */
            data.msg = "";
            /** @type {Array} */
            var args = [];
            var l = employees.length;
            /** @type {number} */
            var i = 0;
            for (;l > i;i++) {
              var ret = test.futures(employees[i], e, selector, "his");
              if (!exports.dateUtil.stbd(exports.dateUtil.sd(ret[0].d), e.date) || ("21:00" == opts.time[0][0] && e.time >= "21:00" || e.time <= "02:30")) {
                var directory = test.pkt(ret, e, selector, true);
                args.push(directory);
              }
            }
            /** @type {number} */
            l = 5;
            var diff;
            /** @type {number} */
            diff = "21:00" == opts.time[0][0] && e.time >= "21:00" || e.time <= "02:30" ? 5 : 6;
            var prevSources = exp.splice(exp.length - diff, 5);
            /** @type {number} */
            var rv = 0;
            /** @type {number} */
            i = l - 1;
            for (;i >= 0;i--) {
              /** @type {number} */
              var x = rv;
              for (;x < args.length && !(paths.length > 3);x++) {
                if (exports.dateUtil.stbd(args[args.length - x - 1][0].date, prevSources[i])) {
                  paths.unshift(args[args.length - x - 1]);
                  rv++;
                  break;
                }
                if (x == args.length - 1) {
                  /** @type {number} */
                  var $ = 0;
                  /** @type {number} */
                  var sliceIndex = 0;
                  for (;sliceIndex < args.length;sliceIndex++) {
                    if (exports.dateUtil.stbd(args[args.length - sliceIndex - 1][0].date, prevSources[i])) {
                      /** @type {number} */
                      $ = 1;
                    }
                  }
                  if (0 == $) {
                    paths.unshift(self.gltbt(1, args[args.length - 1][0].prevclose, false, selector, [prevSources[i]], opts.time));
                  }
                }
              }
              if (args.length <= 0) {
                if (paths.length > 3) {
                  break;
                }
                paths.unshift(self.gltbt(1, e.prevclose, false, selector, [prevSources[i]], opts.time));
              } else {
                if (rv == args.length) {
                  if (paths.length < 4) {
                    if (paths.length > 0) {
                      if (!exports.dateUtil.stbd(paths[0][0].date, prevSources[i])) {
                        paths.unshift(self.gltbt(1, args[args.length - 1][0].prevclose, false, selector, [prevSources[i]], info.time));
                      }
                    }
                  }
                }
              }
            }
          }
          /** @type {(Object|number|string)} */
          paths[4] = results;
          /** @type {Array} */
          data.data.td5 = paths;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var validate = function() {
        $(call(node, s, "T5_URL").replace("$symbol", s.replace("hf_", "")).replace("$cb", "var t5" + s), function() {
          var c = window["t5" + s];
          /** @type {Array} */
          var r = [];
          if (window["t5" + s] = null, "" == c) {
            /** @type {string} */
            data.msg = "empty";
          } else {
            if (void 0 == c) {
              return data.msg = "data error.", void cb();
            }
            /** @type {string} */
            data.msg = "";
            /** @type {Array} */
            var array = [];
            var cnl = c.result.data[s.replace("hf_", "")].length;
            /** @type {number} */
            var position = 0;
            for (;cnl > position;position++) {
              var ret = test.hf(c.result.data[s.replace("hf_", "")][position], e, selector, "his");
              if (!exports.dateUtil.stbd(exports.dateUtil.sd(ret[0].d), e.date)) {
                var sub = test.pkt(ret, e, selector, true);
                array.push(sub);
              }
            }
            /** @type {Array} */
            var a = [];
            var year = results[0].date || e.date;
            /** @type {number} */
            var offset = 1;
            for (;a.length < 6;) {
              /** @type {Date} */
              var tmp = new Date(year);
              tmp.setDate(year.getDate() - offset);
              if (6 != tmp.getDay()) {
                if (0 != tmp.getDay()) {
                  a.push(tmp);
                }
              }
              offset++;
            }
            var i;
            /** @type {number} */
            var al = a.length;
            /** @type {number} */
            var pos = 1;
            /** @type {number} */
            position = 0;
            for (;al > position;position++) {
              /** @type {number} */
              i = pos;
              for (;i <= array.length && !(r.length > 3);i++) {
                if (exports.dateUtil.stbd(array[array.length - i][0].date, a[position])) {
                  r.unshift(array[array.length - i]);
                  pos++;
                  break;
                }
                if (i == array.length - 1) {
                  /** @type {number} */
                  var U = 0;
                  /** @type {number} */
                  var n = 1;
                  for (;n <= array.length;n++) {
                    if (exports.dateUtil.stbd(array[array.length - n][0].date, a[position])) {
                      /** @type {number} */
                      U = 1;
                    }
                  }
                  if (0 == U) {
                    r.unshift(self.gltbt(1, array[array.length - 1][0].prevclose, false, selector, [a[position]], info.time));
                  }
                }
              }
              if (pos == array.length) {
                if (r.length <= 3) {
                  if (!exports.dateUtil.stbd(r[0][0].date, a[position])) {
                    r.unshift(self.gltbt(1, array[array.length - 1][0].prevclose, false, selector, [a[position]], info.time));
                  }
                }
              }
            }
          }
          /** @type {(Object|number|string)} */
          r[4] = results;
          /** @type {Array} */
          data.data.td5 = r;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var run = function() {
        $(call(node, s, "T5_URL").replace("$rn", (new Date).getTime()).replace("$symbol", s).replace("$cb", "var t5" + s), function() {
          var c = window["t5" + s];
          var cnl = exp.length;
          /** @type {Array} */
          var eventPath = [];
          if (window["t5" + s] = null, "" == c) {
            /** @type {string} */
            data.msg = "empty";
          } else {
            /** @type {string} */
            data.msg = "";
            var l = c.result.data.length;
            /** @type {number} */
            var i = 0;
            for (;l > i;i++) {
              var tmp = test.optionCn(c.result.data[i], e, "CN");
              var cur = test.pkt(tmp, e, "CN", true);
              eventPath.push(cur);
            }
            /** @type {number} */
            i = cnl - 1 - l;
            for (;i > cnl - 6;i--) {
              eventPath.unshift(self.gltbt(1, eventPath[0][0].prevclose, false, "CN", [exp[i]]));
            }
          }
          /** @type {(Object|number|string)} */
          eventPath[4] = results;
          /** @type {Array} */
          data.data.td5 = eventPath;
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      /**
       * @return {undefined}
       */
      var load = function() {
        $(call(node, s, "T5_URL").replace("$symbol", s).replace("$rn", e.today), function() {
          /** @type {string} */
          var prop = "lastfive" + s;
          var key = window["KLC_ML_" + s];
          /** @type {null} */
          window["KLC_ML_" + s] = null;
          var result;
          var exception;
          if ("" == key) {
            /** @type {string} */
            data.msg = "empty";
            result = test.ctdb(5, results, e, exp, selector);
          } else {
            /** @type {string} */
            data.msg = "";
            exception = key.split(",");
            result = test.ctdf(exception, results, e, exp);
          }
          if (test.isBond(s)) {
            data.data.td5 = result;
            if (exports.isFunc(callback)) {
              callback(data);
            }
          } else {
            $(call(node, s, "LAST5_URL").replace("$rn", (new Date).getHours()).replace("$symbol", s), function() {
              var orig = window[prop];
              if (!orig || !orig.lastfive) {
                return data.data.td5 = result, void(exports.isFunc(callback) && callback(data));
              }
              var i = orig.lastfive.length;
              for (;i--;) {
                var o1 = orig.lastfive[i].d;
                /** @type {number} */
                var partName = result.length - 1;
                for (;partName--;) {
                  if (exports.dateUtil.stbds(result[partName][0].date, o1, null)) {
                    /** @type {number} */
                    result[partName][0].lastfive = Number(orig.lastfive[i].c);
                    break;
                  }
                }
              }
              formula = orig.lastfive[4] ? orig.lastfive[4].c : 0;
              data.data.td5 = result;
              if (exports.isFunc(callback)) {
                callback(data);
              }
            }, function() {
              data.data.td5 = result;
              if (exports.isFunc(callback)) {
                callback(data);
              }
            });
          }
        }, function() {
          data.data.td5 = test.ctdb(5, results, e, exp, selector);
          /** @type {string} */
          data.msg = "error";
          if (exports.isFunc(callback)) {
            callback(data);
          }
        });
      };
      switch(selector) {
        case "HK":
          initialize();
          break;
        case "US":
          onComplete();
          break;
        case "CFF":
          init();
          break;
        case "OTC":
        ;
        case "fund":
          cb();
          break;
        case "NF":
          compile();
          break;
        case "option_cn":
          run();
          break;
        case "CN":
          load();
          break;
        case "HF":
          if (0 == idKey) {
            cb();
          } else {
            validate();
          }
          break;
        case "":
        ;
      }
    };
  };
});
