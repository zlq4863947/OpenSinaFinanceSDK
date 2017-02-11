xh5_define("plugins.sinaTKChart", ["utils.util"], function(util) {
  /**
   * @param {Object} module
   * @return {undefined}
   */
  function init(module) {
    /**
     * @param {?} cls
     * @return {?}
     */
    function addClass(cls) {
      return/^sh000001|sz399001|sz399006|sz399415|sz399416|sz399300|sz000300$/.test(cls) ? (self.DKpChart = "dpdk", self.DKtChart = "dpdks", true) : false;
    }
    /**
     * @param {string} execResult
     * @return {?}
     */
    function parse(execResult) {
      var data = {
        api : {
          t : {},
          k : {}
        },
        param : {
          t : {},
          k : {}
        }
      };
      var splittheme = {
        K_RISE : "#23bc01",
        K_FALL : "#f11200",
        T_RISE : "#23bc01",
        T_FALL : "#f11200",
        F_RISE : "#23bc01",
        F_FALL : "#f11200"
      };
      var options = {
        dim : {},
        menu : {
          menu_rek : false,
          user_obj : self,
          tab : [{
            lab : "分时",
            v : "ts",
            t : "T"
          }, {
            lab : "日K",
            v : "kd",
            t : "K"
          }, {
            lab : "周K",
            v : "kw",
            t : "K"
          }, {
            lab : "月K",
            v : "km",
            t : "K"
          }]
        },
        param : {
          t : {
            theme : splittheme
          },
          k : {
            theme : splittheme
          }
        },
        api : {
          t : {
            tCharts : [[{
              name : "TVOL"
            }]],
            setCustom : {
              show_floater : false,
              mousewheel_zoom : false,
              touch_prevent : false
            }
          },
          k : {
            tCharts : [[{
              name : "VOLUME"
            }]],
            setCustom : {
              show_floater : false,
              touch_prevent : false
            },
            showRangeSelector : {
              display : false
            }
          }
        }
      };
      var obj = {
        dim : {},
        menu : {
          user_obj : self,
          menu_rek : false
        },
        param : {
          t : {
            theme : splittheme
          },
          k : {
            theme : splittheme
          }
        },
        api : {
          t : {
            setCustom : {
              allow_indicator_edit : true,
              storage_lv : 2
            },
            showRangeSelector : {
              display : true
            }
          },
          k : {
            setCustom : {
              allow_indicator_edit : true,
              storage_lv : 2
            },
            showRangeSelector : {
              display : true
            }
          }
        }
      };
      if (self.iswap || self.menu && self.menu.menu_wapmore) {
        var t = {
          tCharts : tCharts,
          setCustom : {
            allow_indicator_edit : true,
            mousewheel_zoom : true
          }
        };
        switch(self.menu && (self.menu.menu_wapmore && ("HK" != execResult && (t.showRangeSelector = {
          display : true
        }), options.api.t = t, options.api.k = {
          pCharts : [[{
            name : "MA"
          }]],
          tCharts : B,
          setCustom : {
            allow_indicator_edit : true,
            mousewheel_zoom : true
          },
          showRangeSelector : {
            display : true
          }
        })), execResult) {
          case "OTC":
            options.param = data.param;
            break;
          case "US":
            switch(options.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "更多",
              v : "more",
              t : "K"
            }], options.menu.more = [{
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "1月",
              v : "km1",
              t : "K"
            }, {
              lab : "3月",
              v : "km3",
              t : "K"
            }, {
              lab : "1年",
              v : "km12",
              t : "K"
            }], options.api.t.setLineStyle = {
              linetype : "mountain"
            }, options.api.t.showScale = "pct", self.symbol) {
              case "gb_dji":
                /** @type {string} */
                self.symbol = "gb_$dji";
                break;
              case "gb_ixic":
                /** @type {string} */
                self.symbol = "gb_$ixic";
                break;
              case "gb_inx":
                /** @type {string} */
                self.symbol = "gb_$inx";
            }
            break;
          case "CN":
            /** @type {Array} */
            var tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "更多",
              v : "more",
              t : "K"
            }];
            /** @type {Array} */
            var l = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "B/S点",
              v : "kdd",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "更多",
              v : "more",
              t : "K"
            }];
            /** @type {Array} */
            options.menu.tab = hasClass(self.symbol) && (self.mt && (self.iswap || self.menu && !self.menu.menu_wapmore)) ? l : tab;
            /** @type {Array} */
            options.menu.more = [{
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "60分",
              v : "k60",
              t : "K"
            }];
            options.param = data.param;
            break;
          case "HF":
            /** @type {Array} */
            options.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }];
            /** @type {string} */
            options.api.t.showScale = "pct";
            options.param = data.param;
            break;
          case "HK":
          ;
        }
        data = options;
      } else {
        switch(execResult) {
          case "OTC":
            /** @type {Array} */
            obj.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }];
            obj.param = data.param;
            /** @type {number} */
            obj.param.k.candlenum = 70;
            obj.api.t = {
              tCharts : [[{
                name : "TVOL"
              }, {
                name : "LB"
              }, {
                name : "BLANKCTN"
              }], {
                /**
                 * @return {undefined}
                 */
                callback : function() {
                  done(view);
                }
              }],
              setCustom : {
                allow_indicator_edit : true,
                storage_lv : 2,
                mousewheel_zoom : false
              }
            };
            break;
          case "US":
            /** @type {Array} */
            obj.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "年线",
              v : "kcl",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "60分",
              v : "k60",
              t : "K"
            }];
            obj.api.t.setLineStyle = {
              linetype : "mountain"
            };
            /** @type {string} */
            obj.api.t.showScale = "pct";
            break;
          case "HK":
            /** @type {Array} */
            obj.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }];
            /** @type {boolean} */
            obj.api.t.setCustom.mousewheel_zoom = false;
            /** @type {boolean} */
            obj.api.t.showRangeSelector.display = false;
            break;
          case "HF":
            /** @type {Array} */
            obj.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "年线",
              v : "kcl",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }];
            /** @type {string} */
            obj.api.t.showScale = "pct";
            obj.param = data.param;
            break;
          case "CN":
            /** @type {Array} */
            obj.menu.tab = self.mt && (("cnlv1" == self.mt || ("cnlv2" == self.mt || "cntouzi2" == self.mt)) && addClass(self.symbol)) || hasClass(self.symbol) ? [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "年线",
              v : "kcl",
              t : "K"
            }, {
              lab : "B/S点",
              v : "kdd",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "60分",
              v : "k60",
              t : "K"
            }] : [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "年线",
              v : "kcl",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "60分",
              v : "k60",
              t : "K"
            }];
            /** @type {boolean} */
            obj.menu.menu_rek = true;
            obj.param = data.param;
            break;
          case "NF":
            /** @type {Array} */
            obj.menu.tab = [{
              lab : "分时",
              v : "ts",
              t : "T"
            }, {
              lab : "5日",
              v : "t5",
              t : "T"
            }, {
              lab : "年线",
              v : "kcl",
              t : "K"
            }, {
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }, {
              lab : "5分",
              v : "k5",
              t : "K"
            }, {
              lab : "15分",
              v : "k15",
              t : "K"
            }, {
              lab : "30分",
              v : "k30",
              t : "K"
            }, {
              lab : "60分",
              v : "k60",
              t : "K"
            }];
            /** @type {Array} */
            obj.api.t.tCharts = [[{
              name : "TVOL"
            }, {
              name : "POSITION"
            }, {
              name : "BLANKCTN"
            }], {
              /**
               * @return {undefined}
               */
              callback : function() {
                done(view);
              }
            }];
            /** @type {string} */
            obj.api.t.showScale = "pct";
            obj.param = data.param;
        }
        data = obj;
      }
      return data;
    }
    /**
     * @param {Element} html
     * @return {undefined}
     */
    function success(html) {
      var div;
      /** @type {number} */
      var a = 0;
      for (;6 > a;a++) {
        div = createElement("span");
        /** @type {string} */
        div.style.display = "block";
        /** @type {string} */
        div.style.styleFloat = "left";
        /** @type {string} */
        div.style.cssFloat = "left";
        /** @type {string} */
        div.style.width = "33%";
        /** @type {string} */
        div.style.lineHeight = "normal";
        html.appendChild(div);
      }
    }
    /**
     * @return {undefined}
     */
    function hook() {
      doc.dim = {
        H_T_G : 40,
        H_T_T : 0,
        posX : 55
      };
      data.dim = {
        H_T_G : 40,
        H_T_T : 0,
        posX : 45
      };
      /** @type {number} */
      data.candlenum = 45;
    }
    /**
     * @param {?} results
     * @return {?}
     */
    function find(results) {
      switch(results) {
        case 0:
        ;
        case 1:
        ;
        case 2:
          return "t";
        case 23:
        ;
        case 24:
        ;
        case 25:
          return 23;
        case 167:
        ;
        case 168:
        ;
        case 169:
          return 167;
        case 719:
        ;
        case 720:
        ;
        case 721:
          return 719;
        default:
          return results;
      }
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function start(options) {
      if (options.info.data) {
        var data = options.info.viewRangeState;
        var expr = find(data.viewId);
        if (!isNaN(data.start) && !isNaN(data.end)) {
          var domain;
          var p;
          var c;
          var i;
          var j;
          var x;
          /** @type {(HTMLElement|null)} */
          var parentDiv = document.getElementById("mainarea_" + options.chart.getChartId());
          if ("t" == options.type ? (i = options.info.data[0].length, j = [data.start * i, data.end * i - 1], x = options.chart.getSymbols()[0] + "|" + expr) : (j = data.dataLength < options.info.minCandleNum ? [0, options.info.minCandleNum - 1] : [data.start, data.end], x = options.chart.getSymbols()[0] + "|" + expr), options.info.isCompare ? "t" == options.type ? (p = options.info.data[0][0].prevclose, domain = [(options.info.range[0] + 1) * p, (options.info.range[1] + 1) * p]) : (c = options.info.data[0],
          p = c.close / (1 + c.percent), domain = [(options.info.range[1] + 1) * p, (options.info.range[0] + 1) * p]) : domain = "t" == options.type ? options.info.range : [options.info.range[1], options.info.range[0]], self.dotTool && "k" == options.type) {
            if (self.dotTool.inited) {
              if (~[23, 24, 25, 364, 365, 366].indexOf(expr)) {
                self.dotTool.show();
                self.dotTool.update({
                  zoom : j,
                  domain : domain,
                  width : options.info.width,
                  height : options.info.height,
                  top : options.info.top,
                  left : options.info.left,
                  rangeData : options.info.data
                });
              } else {
                self.dotTool.hide();
              }
            } else {
              var propData = self.settingCfg.tkChart.showDotTool;
              self.dotTool.init({
                parentDiv : parentDiv,
                width : options.info.width,
                height : options.info.height,
                top : options.info.top,
                left : options.info.left,
                zoom : j,
                domain : domain,
                rangeData : options.info.data,
                /**
                 * @param {MessageEvent} evt
                 * @return {undefined}
                 */
                onclick : function(evt) {
                  util.suda("go_LHB");
                  window.open(evt.data[0].url);
                },
                tip : {
                  show : true,
                  /**
                   * @param {string} x
                   * @return {?}
                   */
                  formatter : function(x) {
                    return x.date + ":龙虎榜";
                  }
                },
                alwaysHide : propData && !propData.alwaysShow
              });
            }
          }
          if (self.paintTool) {
            if (self.paintTool.param) {
              var opts = {
                zoom : j,
                domain : domain,
                parentDiv : parentDiv,
                width : options.info.width,
                height : options.info.height,
                top : options.info.top,
                left : options.info.left,
                shapeListName : x
              };
              if ("k" == options.type) {
                opts.data = el.getExtraData({
                  name : "currentK",
                  clone : false
                });
              }
              self.paintTool.update(opts);
            } else {
              var defaults = {
                shapeListName : x,
                localStorage : true,
                parentDiv : parentDiv,
                width : options.info.width,
                height : options.info.height,
                top : options.info.top,
                left : options.info.left,
                showZIndex : 35,
                interactZIndex : 55,
                zoom : j,
                domain : options.info.range,
                style : {
                  strokeStyle : "#000",
                  lineWidth : 1
                },
                paintOnEachCenter : true,
                saveKeyPreName : "sinatkchart_paintSth_",
                /**
                 * @param {string} optionsString
                 * @return {?}
                 */
                checkIfNotSave : function(optionsString) {
                  return optionsString && optionsString.match(/sinatkchart_paintSth_[\S]*\|(t|5|15|30|60)/);
                }
              };
              if ("k" == options.type) {
                defaults.data = el.getExtraData({
                  name : "currentK",
                  clone : false
                });
              }
              self.paintTool.init(defaults);
            }
          }
          if (expr != old) {
            me.re("PAINTTOOL_VIEW_CHANGEED", expr);
          }
          old = expr;
        }
      }
    }
    /**
     * @return {?}
     */
    function create() {
      /** @type {number} */
      var charts_dom_id = (new Date).getTime() + Math.floor(987654321 * Math.random() + 1);
      return{
        charts_dom_id : "KKE_chart_" + charts_dom_id,
        charts_Start : "T",
        charts_hasTChart : false,
        stock_stutas : void 0,
        compare : {
          color : ["#f69931", "#f2c700", "#3e4de1", "#bf58ef"],
          userObj : self,
          tkchart : me,
          dis_compare : false,
          compare_dom_id : "KKE_compare_" + charts_dom_id,
          compare_dom_left : "5px",
          compare_dom_h : 23
        },
        menu : {
          dis_menu : true,
          menu_rek : void 0,
          menu_wapmore : false,
          menu_dom_id : "KKE_menu_" + charts_dom_id,
          menu_dom_h : 30
        },
        zoom : {
          zoom_btn : false
        },
        range : {
          rangeColor : ["#666", "#666", "#666", "#666", "#666", "#666"],
          rangeLabel : "margin-left:5px;margin-right:1px;border:#ffffff solid 1px;padding: 1px 2px;text-align: center;",
          rangeValue : "display: inline-block;",
          range_font : void 0,
          range_dom_id : "KKE_range_" + charts_dom_id,
          range_dom_h : 20,
          dis_range : true
        },
        dim : {
          H_T_B : 0,
          H_BLK : 22,
          I_V_O : -22
        },
        param : {
          t : {
            /**
             * @param {Object} err
             * @return {undefined}
             */
            onrange : function(err) {
              start({
                chart : view,
                info : err,
                type : "t"
              });
            },
            /**
             * @param {?} scale
             * @return {undefined}
             */
            oninnerresize : function(scale) {
              if (module.paintTool) {
                module.paintTool.resize(scale);
              }
            },
            /**
             * @param {MessageEvent} res
             * @return {undefined}
             */
            onviewprice : function(res) {
              if (res.data && $(args.range.range_dom_id)) {
                var data = res.data;
                var _trackEvent = self.iswap || self.menu && self.menu.menu_wapmore ? data.time : data.day;
                /** @type {number} */
                var g = Number(data.volume);
                if (Number(g) < 0) {
                  /** @type {number} */
                  g = 0;
                }
                if (data.price < 0) {
                  /** @type {number} */
                  data.price = 0;
                }
                /** @type {string} */
                data.percent = isNaN(data.percent) ? "--" : (100 * data.percent).toFixed(2);
                g = 0 == g ? 0 : util.strUtil.vs(g, true);
                var ok = data.avg_price.toFixed(2);
                /** @type {Array} */
                var arr = [_trackEvent, " 价:", data.price.toFixed(2), " 均:", ok, " 量:", g, " 幅:", data.percent + "%"];
                if (self) {
                  var len = self.market;
                  if ("US" === len && arr.splice(3, 2), "HK" === len) {
                    var text1_length = self.symbol.length;
                    if (self.symbol.substring(text1_length - 1, text1_length) >= "A") {
                      /** @type {string} */
                      ok = arr[4] = "-";
                    }
                  }
                }
                if (self.iswap || self.menu && self.menu.menu_wapmore) {
                  var xhtml;
                  var codeSegments = $(args.range.range_dom_id).childNodes;
                  /** @type {number} */
                  var i = 0;
                  for (;i < codeSegments.length;i++) {
                    /** @type {string} */
                    codeSegments[i].innerHTML = "";
                    if (arr[2 * i]) {
                      xhtml = 0 == i ? arr[2 * i] : arr[2 * i - 1] + arr[2 * i];
                      codeSegments[i].innerHTML = xhtml;
                    }
                  }
                } else {
                  var p = res.curname.length > 4 ? res.curname.substring(0, 5) + ".." : res.curname;
                  if (res.data_array.length > 1) {
                    /** @type {string} */
                    arr[0] = arr[0] + " [" + p + "] ";
                  }
                  var enc3;
                  var enc4;
                  if ("HF" == self.market) {
                    /** @type {string} */
                    enc3 = enc4 = "";
                  } else {
                    /** @type {string} */
                    enc3 = '<span style="color:' + options.range.rangeColor[2] + ';" class="' + options.range.rangeLabel + '">量</span>';
                    /** @type {string} */
                    enc4 = '<span class="' + options.range.rangeValue + '">' + g + "</span>";
                  }
                  /** @type {Array} */
                  var attrList = [arr[0], '<span style="color:' + options.range.rangeColor[0] + ';" class="' + options.range.rangeLabel + '">价</span>', '<span class="' + options.range.rangeValue + '">' + data.price.toFixed(2) + "</span>", '<span style="color:' + options.range.rangeColor[1] + ';" class="' + options.range.rangeLabel + '">均</span>', '<span class="' + options.range.rangeValue + '">' + ok + "</span>", enc3, enc4, '<span style="color:' + options.range.rangeColor[3] + ';" class="' +
                  options.range.rangeLabel + '">幅</span>', '<span class="' + options.range.rangeValue + '">' + data.percent + "%</span>"];
                  if ("cntouzi2" != self.mt) {
                    /** @type {number} */
                    i = 0;
                    for (;i < attrList.length;i++) {
                      attrList[i] = attrList[i].replace('" class="', " ");
                      attrList[i] = attrList[i].replace("class", "style");
                    }
                  }
                  /** @type {string} */
                  $(args.range.range_dom_id).innerHTML = attrList.join("");
                }
              }
            }
          },
          k : {
            /**
             * @param {Object} err
             * @return {undefined}
             */
            onrange : function(err) {
              start({
                chart : el,
                info : err,
                type : "k"
              });
            },
            /**
             * @param {?} delta
             * @return {undefined}
             */
            oninnerresize : function(delta) {
              if (module.paintTool) {
                module.paintTool.resize(delta);
              }
              if (module.dotTool) {
                module.dotTool.update(delta);
              }
            },
            /**
             * @param {MessageEvent} res
             * @return {undefined}
             */
            onviewprice : function(res) {
              if ($(args.range.range_dom_id)) {
                var data = res.data;
                /** @type {string} */
                data.percent = isNaN(data.percent) ? "--" : (100 * data.percent).toFixed(2);
                /** @type {string} */
                data.ampP = isNaN(data.ampP) ? "--" : (100 * data.ampP).toFixed(2);
                /** @type {number} */
                var val = Number(data.volume);
                val = 0 == val ? 0 : util.strUtil.vs(val, true);
                /** @type {string} */
                var expires = "";
                if (app && ("CN" == self.market && hasClass(self.symbol))) {
                  /** @type {number} */
                  var version = 0;
                  client.load({
                    uid : [self.CFGSETTING_IFRAME_PREFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
                    key : self.CFGSETTING_IFRAME_PREFIX
                  }, function(v) {
                    if (version = v ? JSON.parse(v).kChart.setReK : 0, "kd" == app.chooseTab.tab || ("kw" == app.chooseTab.tab || ("km" == app.chooseTab.tab || "kcl" == app.chooseTab.tab))) {
                      switch(version) {
                        case "0":
                          /** @type {string} */
                          expires = "";
                          break;
                        case "1":
                          /** @type {string} */
                          expires = '<span style="color:#ff0000">[后复权]</span>';
                          break;
                        case "-1":
                          /** @type {string} */
                          expires = '<span style="color:#ff0000">[前复权]</span>';
                      }
                    } else {
                      if ("kdd" == app.chooseTab.tab) {
                        /** @type {string} */
                        expires = '<span style="color:#ff0000">[前复权]</span>';
                      }
                    }
                  }, true);
                }
                if (res.data_array.length > 1) {
                  var r = res.curname.length > 4 ? res.curname.substring(0, 5) + ".." : res.curname;
                  /** @type {string} */
                  expires = '<span style="color:#000000">[' + r + "]</span>";
                }
                /** @type {Array} */
                var buffer = [data.day, " ", data.time || "", expires, " 开:", data.open.toFixed(2), " 高:", data.high.toFixed(2), " 幅:", data.percent + "%", " 收:", data.close && data.close.toFixed(2), " 低:", data.low.toFixed(2), " 量:", val];
                if (self.iswap || self.menu && self.menu.menu_wapmore) {
                  var values = $(args.range.range_dom_id).childNodes;
                  buffer.splice(0, 4);
                  buffer.unshift(data.day);
                  var xhtml;
                  /** @type {number} */
                  var i = 0;
                  var vlen = values.length;
                  for (;vlen > i;i++) {
                    xhtml = 0 == i ? buffer[2 * i] : buffer[2 * i - 1] + buffer[2 * i];
                    values[i].innerHTML = xhtml;
                  }
                } else {
                  var enc3;
                  var enc4;
                  if ("HF" == self.market) {
                    /** @type {string} */
                    enc3 = enc4 = "";
                  } else {
                    /** @type {string} */
                    enc4 = '<span style="color:' + options.range.rangeColor[4] + ';" class="' + options.range.rangeLabel + '">量</span>';
                    /** @type {string} */
                    enc3 = '<span class="' + options.range.rangeValue + '">' + val + "</span>";
                  }
                  /** @type {Array} */
                  var attrList = [buffer[0], '<span style="color:' + options.range.rangeColor[0] + ';" class="' + options.range.rangeLabel + '">开</span>', '<span class="' + options.range.rangeValue + '">' + data.open.toFixed(2) + "</span>", '<span style="color:' + options.range.rangeColor[1] + ';" class="' + options.range.rangeLabel + '">高</span>', '<span class="' + options.range.rangeValue + '">' + data.high.toFixed(2) + "</span>", '<span style="color:' + options.range.rangeColor[2] +
                  ';" class="' + options.range.rangeLabel + '">收</span>', '<span class="' + options.range.rangeValue + '">' + data.close.toFixed(2) + "</span>", '<span style="color:' + options.range.rangeColor[3] + ';" class="' + options.range.rangeLabel + '">低</span>', '<span class="' + options.range.rangeValue + '">' + data.low.toFixed(2) + "</span>", enc4, enc3, '<span style="color:' + options.range.rangeColor[5] + ';" class="' + options.range.rangeLabel + '">幅</span>', '<span class="' +
                  options.range.rangeValue + '">' + data.percent + "%</span>"];
                  if ("cntouzi2" != self.mt) {
                    /** @type {number} */
                    i = 0;
                    for (;i < attrList.length;i++) {
                      attrList[i] = attrList[i].replace('" class="', " ");
                      attrList[i] = attrList[i].replace("class", "style");
                    }
                  }
                  /** @type {string} */
                  $(args.range.range_dom_id).innerHTML = attrList.join("");
                }
              }
            }
          }
        },
        api : {
          t : {
            setCustom : {
              show_underlay_vol : false
            },
            tCharts : tCharts
          },
          k : {
            setCustom : {
              show_underlay_vol : false
            },
            pCharts : [[{
              name : "MA"
            }]],
            tCharts : B
          }
        }
      };
    }
    /**
     * @param {Array} data
     * @return {?}
     */
    function update(data) {
      /** @type {Array} */
      var that = [];
      /** @type {number} */
      var b = 0;
      var a = data.length;
      for (;a > b;b++) {
        that.push({
          date : data[b].dt.replace(/-/g, "/"),
          data : [{
            url : data[b].url
          }]
        });
      }
      return that;
    }
    /**
     * @return {undefined}
     */
    function split() {
      if (!object.get("kke_CnLv1_PPT_v2")) {
        if (!!self.mt) {
          if (!("cnlv1" != self.mt && "cnlv2" != self.mt)) {
            KKE.api("tools.pptsetting.get", function() {
              KKE.api("ppt.ppt.get", {
                menu : app,
                userObj : self
              }, null);
            }, null);
          }
        }
      }
    }
    /**
     * @return {undefined}
     */
    function save() {
      KKE.api("plugins.paintSth.get", {}, function(win) {
        /** @type {Function} */
        self.paintTool = win;
        win.bind("save", function() {
          try {
            /** @type {*} */
            var dict = JSON.parse(arguments[1]);
            var name;
            for (name in dict) {
              if (dict.hasOwnProperty(name)) {
                var ii = dict[name].length;
                for (;ii--;) {
                  delete dict[name][ii].style;
                }
              }
            }
            SUDA.uaTrack("chart_draw", encodeURIComponent(arguments[0]) + "$$$$" + encodeURIComponent(JSON.stringify(dict)));
          } catch (n) {
          }
        });
      });
      self.uParam = options.menu.menu_dom_h + 2 + options.range.range_dom_h;
      KKE.api("plugins.userpanel.get", {
        userObj : self,
        chartId : options.domid,
        menu : app,
        chart : me
      }, function() {
      });
    }
    /**
     * @param {Object} args
     * @return {undefined}
     */
    function activeTab(args) {
      if (!options.iswap && !options.menu.menu_wapmore) {
        /** @type {number} */
        var id = 0;
        for (;id < options.menu.tab.length;id++) {
          var rv = options.menu.tab[id].v;
          if (rv == args.view) {
            if (!args.active) {
              /** @type {number} */
              args.active = id;
            }
            break;
          }
        }
        if (app) {
          /** @type {string} */
          app.chooseTab.tye = "t" == args.view.substring(0, 1) ? "T" : "K";
          app.setTarget(args.active || 0);
        }
      }
    }
    util.xh5_EvtDispatcher.call(this);
    var view;
    var el;
    var app;
    var me = this;
    /** @type {Object} */
    var self = module;
    this.me = me;
    var query = {};
    /**
     * @param {Event} ctx
     * @return {undefined}
     */
    var done = function(ctx) {
      var tabs;
      var firsts;
      var v;
      var rightW;
      var value = ctx.getChartId();
      /** @type {string} */
      var tval = "blankctn_" + value;
      var type = ctx.type;
      if ("h5k" == type) {
        /** @type {Array} */
        tabs = "HF" != self.market ? ["无", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "OBV", "WVAD", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI", "VR", "EMV", "BRAR"] : ["无", "MACD", "KDJ", "RSI", "BOLL", "WR", "DMI", "BBIBOLL", "ROC", "PSY", "CCI", "TRIX", "DMA", "EXPMA", "BIAS", "ASI"];
        /** @type {string} */
        firsts = "HF" != self.market ? "VOLUME" : "无";
        /** @type {number} */
        rightW = 1;
        /** @type {string} */
        v = "k";
      } else {
        switch(rightW = 60, self.market) {
          case "HF":
            /** @type {Array} */
            tabs = ["无", "MACD"];
            /** @type {string} */
            firsts = "无";
            break;
          case "NF":
            /** @type {Array} */
            tabs = ["无", "POSITION", "LB", "MACD"];
            /** @type {string} */
            firsts = "TVOL";
            break;
          default:
            /** @type {Array} */
            tabs = "cnlv2" == self.mt ? ["无", "TFLOW", "LB", "MACD"] : ["无", "LB", "MACD"];
            /** @type {string} */
            firsts = "TVOL";
        }
        /** @type {string} */
        v = "t";
      }
      KKE.api("plugins.indicatortab.get", {
        charts : [ctx],
        rightW : rightW,
        fix : {
          firsts : [firsts],
          lasts : ["BLANKCTN"]
        },
        tabs : tabs,
        active : 1,
        type : v,
        domid : tval
      }, function(action) {
        query[type] = action;
      });
    };
    var left = {
      kChart : {
        pCharts : [{
          name : "MA"
        }],
        setCustom : {
          centerZoom : true,
          history_t : "window",
          show_k_rangepercent : true,
          show_ext_marks : true,
          show_floater : true
        },
        setReK : 0,
        setLineStyle : {
          linetype : "solid"
        }
      },
      tChart : {
        setCustom : {
          show_floater : true
        },
        setLineStyle : {
          linetype : "line"
        }
      },
      tkChart : {
        showView : "t1",
        showDotTool : {
          alwaysShow : true
        }
      }
    };
    /** @type {function (Event): undefined} */
    self.indicatorTab = done;
    self.indicatorTabLogger = query;
    /** @type {string} */
    self.CFGSETTING_IFRAME_PREFIX = "sinatkchart_settingcfgpanel~";
    /** @type {string} */
    self.REKSETTING_PREFIX = "sinatkchart_reksetting~";
    /** @type {string} */
    self.REKSETTING_COOKIE = "kCookieRek";
    /** @type {string} */
    self.EXTEND_PERFIX = "sinatkchart_extendsettingV2";
    self.settingCfg = void 0;
    self.settingRek = void 0;
    self.market = util.market(self.symbol);
    /** @type {string} */
    self.DKpChart = "TZY";
    /** @type {string} */
    self.DKtChart = "TZYS";
    /**
     * @param {?} selector
     * @return {?}
     */
    var hasClass = function(selector) {
      return/^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(selector);
    };
    !function() {
      client.load({
        uid : [self.CFGSETTING_IFRAME_PREFIX, (new Date).getTime(), Math.floor(987654321 * Math.random() + 1)].join("|"),
        key : self.CFGSETTING_IFRAME_PREFIX
      }, function(file) {
        if (file) {
          self.settingCfg = merge(left, JSON.parse(file));
        } else {
          if ("US" == self.market) {
            /** @type {string} */
            left.tChart.setLineStyle.linetype = "mountain";
          }
          self.settingCfg = left;
        }
      }, true);
    }();
    var tCharts;
    !function() {
      switch(self.market) {
        case "NF":
          /** @type {Array} */
          tCharts = [[{
            name : "POSITION"
          }, {
            name : "TVOL"
          }, {
            name : "LB"
          }, {
            name : "BLANKCTN"
          }], {
            /**
             * @return {undefined}
             */
            callback : function() {
              done(view);
            }
          }];
          break;
        case "HF":
          /** @type {Array} */
          tCharts = [[{
            name : "MACD"
          }, {
            name : "BLANKCTN"
          }], {
            /**
             * @return {undefined}
             */
            callback : function() {
              done(view);
            }
          }];
          break;
        default:
          /** @type {Array} */
          tCharts = "cnlv2" == self.mt ? [[{
            name : "TVOL"
          }, {
            name : "TFLOW"
          }, {
            name : "BLANKCTN"
          }], {
            /**
             * @return {undefined}
             */
            callback : function() {
              done(view);
            }
          }] : [[{
            name : "TVOL"
          }, {
            name : "LB"
          }, {
            name : "BLANKCTN"
          }], {
            /**
             * @return {undefined}
             */
            callback : function() {
              done(view);
            }
          }];
      }
    }();
    var params;
    var html;
    var innerDiv;
    var div;
    var element;
    var name;
    var doc;
    var data;
    var args;
    var old;
    var text;
    /** @type {Array} */
    var B = "HF" != util.market(self.symbol) ? [[{
      name : "VOLUME"
    }, {
      name : "MACD"
    }, {
      name : "BLANKCTN"
    }], {
      /**
       * @return {undefined}
       */
      callback : function() {
        done(el);
      }
    }] : [[{
      name : "MACD"
    }, {
      name : "BLANKCTN"
    }], {
      /**
       * @return {undefined}
       */
      callback : function() {
        done(el);
      }
    }];
    var options = void 0;
    /**
     * @param {Element} parent
     * @param {?} element
     * @return {undefined}
     */
    var append = function(parent, element) {
      KKE.api("plugins.compare.get", options.compare, function(textAlt) {
        text = textAlt;
        parent.appendChild(element);
      });
    };
    /**
     * @param {Element} n
     * @return {undefined}
     */
    var ready = function(n) {
      if (options.menu.dis_menu) {
        html = createElement("div");
        html.id = options.menu.menu_dom_id;
        if (self.iswap) {
          /** @type {number} */
          options.menu.menu_dom_h = 39;
        }
        /** @type {string} */
        html.style.height = options.menu.menu_dom_h + "px";
        options.menu.iswap = self.iswap;
        n.appendChild(html);
      } else {
        /** @type {number} */
        options.menu.menu_dom_h = 0;
      }
    };
    /**
     * @return {undefined}
     */
    var getSize = function() {
      if (options.compare.dis_compare) {
        element = createElement("div");
        element.id = options.compare.compare_dom_id;
        /** @type {string} */
        element.style.clear = "both";
        element.style.marginLeft = options.compare.compare_dom_left;
        /** @type {string} */
        element.style.paddingTop = "7px";
        /** @type {string} */
        element.style.lineHeight = element.style.height = options.compare.compare_dom_h + "px";
        /** @type {number} */
        options.compare.compare_dom_h = 30;
      } else {
        /** @type {number} */
        options.compare.compare_dom_h = 0;
      }
    };
    /**
     * @param {Element} s
     * @return {undefined}
     */
    var callback = function(s) {
      if (options.range.dis_range) {
        if (div = createElement("div"), div.id = options.range.range_dom_id, div.style.clear = "both", div.style.marginLeft = "5px", div.style.whiteSpace = "nowrap", self.iswap || options.menu.menu_wapmore) {
          /** @type {string} */
          div.style.fontSize = "10px";
          /** @type {string} */
          div.style.marginLeft = "25px";
          success(div);
          /** @type {number} */
          options.range.range_dom_h = 30;
          /** @type {string} */
          div.style.height = options.range.range_dom_h + "px";
        } else {
          /** @type {string} */
          div.style.fontSize = "12px";
          /** @type {number} */
          var fromTop = 4;
          /** @type {string} */
          div.style.paddingTop = fromTop + "px";
          /** @type {string} */
          div.style.lineHeight = div.style.height = options.range.range_dom_h + "px";
          options.range.range_dom_h += fromTop;
        }
        s.appendChild(div);
      } else {
        /** @type {number} */
        options.range_dom_h = 0;
      }
    };
    /**
     * @param {Element} node
     * @return {undefined}
     */
    var cb = function(node) {
      ready(node);
      callback(node);
      getSize(node);
    };
    /**
     * @param {Element} el
     * @return {undefined}
     */
    var log = function(el) {
      if (options.compare.dis_compare) {
        el.appendChild(element);
        append(el, element);
      } else {
        /** @type {number} */
        options.compare.compare_dom_h = 0;
      }
    };
    /**
     * @return {undefined}
     */
    var open = function() {
      if (!options.charts_hasTChart) {
        if (!("US" !== self.market)) {
          if (!(1 !== options.stock_stutas)) {
            /** @type {Array} */
            options.menu.tab = [{
              lab : "日K",
              v : "kd",
              t : "K"
            }, {
              lab : "周K",
              v : "kw",
              t : "K"
            }, {
              lab : "月K",
              v : "km",
              t : "K"
            }];
          }
        }
      }
    };
    /**
     * @return {?}
     */
    var _init = function() {
      var bar = util.$C("div");
      return bar.style.width = bar.style.height = "100%", bar.style.position = "relative", self.dom_id = bar.id = "tkChart_wwy" + self.symbol, bar;
    };
    /**
     * @return {undefined}
     */
    var load = function() {
      var fragment = $(self.dom_id);
      var div = _init();
      fragment.appendChild(div);
      /** @type {string} */
      div.style.webkitUserSelect = div.style.userSelect = div.style.MozUserSelect = "none";
      args = create();
      options = merge(args, options || null);
      options = doc = data = merge(options, self || null);
      options.domid = args.charts_dom_id;
      options.symbol = self.symbol;
      name = parse(self.market);
      options = merge(options, name);
      options = merge(options, self);
      doc = merge(options.param.t, doc || null);
      data = merge(options.param.k, data || null);
      if (self.iswap) {
        hook();
      }
      innerDiv = createElement("div");
      innerDiv.id = args.charts_dom_id;
      cb(div);
      var h = div.offsetHeight;
      /** @type {number} */
      var ms = div.offsetHeight - options.menu.menu_dom_h - 2 - options.range.range_dom_h - options.compare.compare_dom_h;
      /** @type {number} */
      var bottom = ms / h * 100;
      /** @type {string} */
      innerDiv.style.height = bottom + "%";
      div.appendChild(innerDiv);
      log(div);
      open();
      params = options.api;
    };
    /**
     * @return {undefined}
     */
    var animate = function() {
      var context = self.settingCfg.kChart;
      var match;
      for (match in context) {
        if (context.hasOwnProperty(match)) {
          if ("setCustom" == match) {
            el[match](context[match]);
          }
        }
      }
      if (app) {
        app.setPPT("block");
      }
      el.setCustom({
        allow_indicator_edit : true
      });
      el.setCustom({
        storage_lv : 2
      });
      util.suda("m_bs");
      el.showView("kd");
      el.setDimension({
        I_V_O : 0
      });
      el.pCharts([{
        name : self.DKpChart
      }], {
        isexclusive : true
      });
      if ("cnlv1wap" == self.mt) {
        el.tCharts([{
          name : self.DKtChart
        }], {
          isexclusive : true
        });
        el.showRangeSelector({
          display : false
        });
      } else {
        el.tCharts([{
          name : self.DKtChart
        }, {
          name : "volume"
        }], {
          isexclusive : true
        });
        el.showRangeSelector({
          display : true
        });
      }
      if ("TZY" == self.DKpChart) {
        el.setReK(-1);
      }
    };
    /**
     * @param {string} keepData
     * @return {undefined}
     */
    var remove = function(keepData) {
      /** @type {Date} */
      var pos = new Date;
      /** @type {Date} */
      var end = new Date;
      switch(keepData) {
        case "km12":
          pos.setDate(pos.getDate() - 264);
          break;
        case "km1":
          pos.setDate(pos.getDate() - 22);
          break;
        case "km3":
          pos.setDate(pos.getDate() - 66);
      }
      el.showYTD();
      el.showRangeSelector({
        from : pos,
        to : end
      });
    };
    /**
     * @param {Object} options
     * @param {string} b
     * @param {string} range
     * @return {undefined}
     */
    var fn = function(options, b, range) {
      var definition = void 0;
      definition = "t" == b ? self.settingCfg.tChart : self.settingCfg.kChart;
      var key;
      for (key in definition) {
        if (definition.hasOwnProperty(key)) {
          if ("pCharts" == key || "tCharts" == key) {
            options[key](definition[key], {
              isexclusive : true,
              /**
               * @return {undefined}
               */
              callback : function() {
                if (definition.setCustom) {
                  if (definition.setCustom.show_underlay_vol) {
                    options.setCustom({
                      show_underlay_vol : definition.setCustom.show_underlay_vol
                    });
                  }
                }
              }
            });
          } else {
            if ("setReK" == key) {
              if (hasClass(self.symbol)) {
                options[key](definition[key]);
              }
            } else {
              if ("showView" == key) {
                me[key]({
                  view : definition[key]
                });
              } else {
                options[key](definition[key]);
              }
            }
          }
        }
      }
      if ("init" == range) {
        for (key in self.settingCfg.tkChart) {
          if (self.settingCfg.tkChart.hasOwnProperty(key)) {
            me[key]("showView" === key ? {
              view : self.settingCfg.tkChart[key]
            } : self.settingCfg.tkChart[key]);
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    var combine = function() {
      if (view && view.getSymbols().length > 1) {
        /** @type {string} */
        var n = "line";
        /** @type {number} */
        var conditionIndex = 1;
        for (;conditionIndex < view.getSymbols().length;conditionIndex++) {
          el.compare({
            symbol : view.getSymbols()[conditionIndex],
            linecolor : {
              K_N : options.compare.color[conditionIndex - 1]
            },
            linetype : n
          });
        }
      }
    };
    /** @type {number} */
    var ne = 0;
    /**
     * @param {Object} b
     * @param {string} name
     * @param {Object} opt_attributes
     * @param {boolean} color
     * @return {undefined}
     */
    var draw = function(b, name, opt_attributes, color) {
      if (!(ne > 0)) {
        ne++;
        KKE.api("chart.h5k.get", data, function(res) {
          if (me.kChart = el = res, name && "kdd" == name) {
            animate();
            if (color) {
              $({
                view : name,
                active : color
              });
            }
          } else {
            var k;
            for (k in params.k) {
              if (params.k.hasOwnProperty(k)) {
                var r = params.k[k];
                if (!each(r)) {
                  /** @type {Array} */
                  r = [r];
                }
                if (clone(el[k])) {
                  el[k].apply(null, r);
                }
              }
            }
            if ("km1" == name || ("km3" == name || "km12" == name)) {
              remove(name);
            } else {
              if (name) {
                el.showView(name);
              }
            }
            if (opt_attributes) {
              if (hasClass(self.symbol)) {
                el.setReK("cnlv1wap" === self.mt ? 0 : opt_attributes);
              }
            }
            if (options.iswap || "cnlv1wap" == self.mt) {
              if ("cnlv1wap" === self.mt) {
                el.tCharts([{
                  name : "MACD"
                }], {
                  isexclusive : true
                });
              }
            } else {
              fn(el);
              if ("kcl" == name) {
                el.showView(name);
              }
            }
          }
          if (combine(), b) {
            /** @type {number} */
            var update = self.iswap || options.menu.menu_wapmore ? 1 : 2;
            if (app) {
              app.setTarget(update);
            }
            el.compare(b.obj, b.rm);
          }
          if (app) {
            app.setChart({
              k : el,
              o : self
            });
          } else {
            if (options.menu.dis_menu) {
              trigger(options.menu, {
                type : "k",
                chart : el
              });
            }
          }
        });
        if ("CN" === util.market(module.symbol)) {
          if (hasClass(module.symbol)) {
            KKE.api("plugins.dotTool.get", {}, function(theTitle) {
              /** @type {number} */
              self.dotTool = theTitle;
              /** @type {Date} */
              var curTime = new Date;
              /** @type {string} */
              curTime = curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "-" + curTime.getDate();
              util.load("//finance.sina.com.cn/touzi/lhstockskx/" + self.symbol + ".js?" + curTime, function() {
                self.dotTool.pushData({
                  key : "tzylhb",
                  data : update(window["tzy_lhstock_kx_" + self.symbol]),
                  dotStyle : {
                    position : "absolute",
                    width : "8px",
                    height : "8px",
                    borderRadius : "8px",
                    color : "white",
                    backgroundColor : "#349FF9",
                    zIndex : 99,
                    cursor : "pointer",
                    opacity : 1,
                    filter : "alpha(opacity=100)",
                    boxShadow : null
                  },
                  dotHoverStyle : {
                    opacity : 0.8,
                    filter : "alpha(opacity=80)",
                    boxShadow : "0px 0px 5px 2px #349FF9"
                  },
                  tipStyle : {
                    position : "absolute",
                    backgroundColor : "#349FF9",
                    color : "white",
                    zIndex : 999,
                    padding : "5px 10px",
                    textIndent : "18px",
                    borderRadius : "5px",
                    backgroundImage : "url(//n.sinaimg.cn/finance/h5chart/toast.png)",
                    backgroundPosition : "0px -55px",
                    minWidth : "110px",
                    lineHeight : "15px",
                    height : "15px",
                    fontSize : "12px"
                  }
                });
              });
            });
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    var init = function() {
      KKE.api("chart.h5t.get", doc, function(values) {
        var len = self.market;
        me.tChart = view = values;
        var i;
        for (i in params.t) {
          if (params.t.hasOwnProperty(i)) {
            var properties = params.t[i];
            if (!each(properties)) {
              /** @type {Array} */
              properties = [properties];
            }
            if (clone(view[i])) {
              if ("US" != len || 1 !== options.stock_stutas) {
                view[i].apply(null, properties);
              }
            }
          }
        }
        if (app) {
          app.setChart({
            t : view
          });
        } else {
          if (options.menu.dis_menu) {
            trigger(options.menu, {
              type : "t",
              chart : view
            });
          }
        }
        if (!options.iswap) {
          if (!options.menu.menu_wapmore) {
            fn(view, "t", "t1" == self.settingCfg.tkChart.showView ? "click" : "init");
          }
        }
        if (!options.menu.dis_menu) {
          me.re("T_DATA_LOADED", null);
        }
      });
    };
    /**
     * @param {Function} description
     * @return {undefined}
     */
    this.setTKChart = function(description) {
      /** @type {Function} */
      self.settingCfg = description;
      if (app) {
        app.setCfg(description);
      }
      if (app) {
        if ("kdd" != app.chooseTab.tab) {
          if (el) {
            fn(el);
          }
          if (view) {
            fn(view, "t");
          }
        }
      }
      if (description.tkChart.showDotTool) {
        this.showDotTool(description.tkChart.showDotTool);
      }
      client.save({
        uid : [self.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
        key : self.CFGSETTING_IFRAME_PREFIX,
        /** @type {Function} */
        value : description
      });
    };
    /**
     * @param {?} extra
     * @param {Object} data
     * @return {undefined}
     */
    var trigger = function(extra, data) {
      var name = data.type;
      var result = {};
      switch(name) {
        case "t":
          result = {
            t : data.chart
          };
          break;
        case "k":
          result = {
            k : data.chart
          };
      }
      options.menu.me = me;
      options.menu[name + "chart"] = data.chart;
      KKE.api("plugins.menu.get", options.menu, function(yes) {
        me.re("T_DATA_LOADED", null);
        /** @type {string} */
        app = yes;
        if (!options.iswap) {
          if (!options.menu.menu_wapmore) {
            save();
            split();
          }
        }
        activeTab({
          view : self.settingCfg.tkChart.showView
        });
      });
    };
    /**
     * @param {?} html
     * @return {undefined}
     */
    var setup = function(html) {
      if (util.isStr(html)) {
        /** @type {string} */
        var name = String(html).toLowerCase();
        switch(name) {
          case "t":
            init();
            break;
          case "k":
            draw();
        }
        evtUtil.addHandler(window, "resize", function() {
          me.onresize();
        });
      }
    };
    load();
    setup(options.charts_Start);
    this.chartUserobj = self;
    /** @type {function (Object, string, Object, boolean): undefined} */
    this.initK = draw;
    /** @type {function (): undefined} */
    this.initT = init;
    /**
     * @param {string} item
     * @param {?} html
     * @return {undefined}
     */
    this.compare = function(item, html) {
      var x = util.market(item.symbol);
      var y = self.market;
      if (item.linetype = "line", x === y) {
        if (view) {
          view.compare(item, html);
        }
        if (el) {
          el.compare(item, html);
        }
      } else {
        if (view && view.hide(), el) {
          /** @type {number} */
          var setTarget = self.iswap || options.menu.menu_wapmore ? 1 : 2;
          if (app) {
            app.setTarget("kdd" == app.chooseTab.tab ? 3 : setTarget);
          }
          el.show();
          el.compare(item, html);
        } else {
          draw({
            obj : item,
            rm : html
          });
        }
      }
    };
    var b = new function() {
      /** @type {number} */
      var e = 0;
      /**
       * @param {string} last
       * @param {Function} next
       * @param {number} onend
       * @return {?}
       */
      var process = function(last, next, onend) {
        var activeElement;
        if (!onend) {
          /** @type {number} */
          onend = 100;
        }
        try {
          activeElement = el;
        } catch (s) {
        }
        return activeElement ? next() : void(e++ < 10 && setTimeout(function() {
          process(last, next, onend);
        }, 1.2 * onend));
      };
      /** @type {function (string, Function, number): ?} */
      this.waitFor = process;
    };
    /** @type {number} */
    var t1 = 0;
    /**
     * @param {Object} options
     * @return {?}
     */
    this.showView = function(options) {
      if (options.active && (0 == t1 && "t1" != self.settingCfg.tkChart.showView)) {
        return t1++, void b.waitFor("", function() {
          if ("kdd" == options.view) {
            animate();
            $(options);
          } else {
            me.showView(options);
          }
          /** @type {number} */
          t1 = 0;
        });
      }
      switch(options.view) {
        case "t1":
        ;
        case "ts":
          if (el) {
            el.hide();
          }
          view.showView(options.view);
          break;
        case "t5":
          view.showView(options.view);
          break;
        case "kdd":
        ;
        case "kd":
        ;
        case "kw":
        ;
        case "km":
        ;
        case "kcl":
        ;
        case "k5":
        ;
        case "k15":
        ;
        case "k30":
        ;
        case "k60":
          if (view) {
            view.hide();
          }
          if (el) {
            el.showView(options.view);
          } else {
            draw(false, options.view, void 0, options.active);
          }
        ;
      }
      $(options);
    };
    /**
     * @param {?} propData
     * @return {undefined}
     */
    this.showDotTool = function(propData) {
      var v = propData.alwaysShow;
      if (self.dotTool) {
        if (v) {
          self.dotTool.show(true);
        } else {
          self.dotTool.hide(true);
        }
      }
    };
    /**
     * @param {?} data
     * @return {undefined}
     */
    this.pushData = function(data) {
      if (view) {
        view.pushData(data.obj, data.num);
      }
      if (!self.iswap) {
        if (!options.menu.menu_wapmore) {
          if (el) {
            el.pushData(data.obj, data.num);
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.resizePaintTool = function() {
      var diff;
      var opts;
      var node = self.paintTool;
      var context = self.dotTool;
      if (app) {
        if ("K" == app.chooseTab.tye && el) {
          opts = el.getDimension();
          diff = {
            width : opts.w_k,
            height : opts.h_k,
            left : opts.RIGHT_W,
            top : opts.T_F_T
          };
        } else {
          if (view) {
            opts = view.getDimension();
            diff = {
              width : opts.w_t,
              height : opts.h_t,
              left : opts.RIGHT_W,
              top : opts.T_F_T
            };
          }
        }
        if (diff) {
          if (node) {
            node.resize(diff);
          }
        }
        if (diff) {
          if (context) {
            context.update(diff);
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    this.onresize = function() {
      if (view) {
        view.resize();
      }
      if (el) {
        el.resize();
      }
      me.resizePaintTool();
    };
    /**
     * @return {undefined}
     */
    this.update = function() {
      if (view) {
        view.update();
      }
      if (el) {
        el.update();
      }
    };
  }
  /**
   * @return {undefined}
   */
  function Storage() {
    /** @type {string} */
    this.VER = "1.3.4";
    /**
     * @param {Object} e
     * @param {?} next
     * @return {undefined}
     */
    this.get = function(e, next) {
      var self = new init(e);
      /**
       * @param {?} persistent
       * @return {undefined}
       */
      var start = function(persistent) {
        self.me.rl(persistent, start);
        if (util.isFunc(next)) {
          next(self);
        }
        window.sinaTKChartV1 = self;
      };
      self.me.al("T_DATA_LOADED", start, false);
      if (e.mt) {
        if ("cnlv1" == e.mt) {
          KKE.api("tools.spread.get", {
            userObj : e
          }, null);
        }
      }
    };
  }
  var createElement = util.$C;
  var merge = util.oc;
  var $ = util.$DOM;
  var clone = util.isFunc;
  var evtUtil = util.xh5_EvtUtil;
  var each = util.isArr;
  var object = util.cookieUtil;
  var client = util.bridge;
  return util.fInherit(init, util.xh5_EvtDispatcher), Storage;
});
