xh5_define("plugins.menu", ["utils.util"], function(menuOpt) {
  /**
   * @param {Object} options
   * @return {undefined}
   */
  function init(options) {
    /**
     * @param {?} match
     * @return {undefined}
     */
    function eq(match) {
      /** @type {string} */
      var kittens = "touzi_pc_v2_market_today";
      if (options.user_obj.mt && "cntouzi2" == options.user_obj.mt) {
        switch(match) {
          case "ts":
            menuOpt.suda(kittens + "_05", null, kittens);
            break;
          case "t5":
            menuOpt.suda(kittens + "_06", null, kittens);
            break;
          case "kcl":
            menuOpt.suda(kittens + "_07", null, kittens);
            break;
          case "kdd":
            menuOpt.suda(kittens + "_08", null, kittens);
            break;
          case "kd":
            menuOpt.suda(kittens + "_09", null, kittens);
            break;
          case "kw":
            menuOpt.suda(kittens + "_10", null, kittens);
            break;
          case "km":
            menuOpt.suda(kittens + "_11", null, kittens);
            break;
          case "k5":
            menuOpt.suda(kittens + "_12", null, kittens);
            break;
          case "k15":
            menuOpt.suda(kittens + "_13", null, kittens);
            break;
          case "k30":
            menuOpt.suda(kittens + "_14", null, kittens);
            break;
          case "k60":
            menuOpt.suda(kittens + "_15", null, kittens);
        }
      }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    function remove(e) {
      self.preventDefault(e);
      self.stopPropagation(e);
      var child = self.getTarget(e);
      if (child.getAttribute("data-a") && (child = child.parentNode), node != child || "more" === child.getAttribute("data-view")) {
        node = child;
        var data = child.innerHTML;
        if (data) {
          if ("more" === child.getAttribute("data-view")) {
            return void f(child);
          }
          error();
          if (getElementById(mod)) {
            /** @type {string} */
            getElementById(mod).style.display = "none";
          }
          fn(child);
          item.setPPT("none");
          render(child);
          item.chooseTab.tab = child.getAttribute("data-view");
          item.re("KKE_MENU_CLICK_TAB", null);
        }
      }
    }
    /**
     * @param {Node} element
     * @return {undefined}
     */
    function init(element) {
      var poster;
      var self;
      var l = employees.length;
      /** @type {number} */
      var i = 0;
      for (;l > i;i++) {
        poster = employees[i].tChart;
        self = employees[i].kChart;
        if (poster) {
          poster.hide();
        }
        /** @type {Date} */
        var currentTime = new Date;
        /** @type {Date} */
        var stamp = new Date;
        if (self) {
          self.show();
          var view = element.getAttribute("data-view");
          switch(view) {
            case "km12":
              currentTime.setDate(currentTime.getDate() - 264);
              break;
            case "km1":
              currentTime.setDate(currentTime.getDate() - 22);
              break;
            case "km3":
              currentTime.setDate(currentTime.getDate() - 66);
              break;
            case "kcl":
            ;
          }
          if ("km1" == view || ("km3" == view || "km12" == view)) {
            self.showYTD();
            self.dateFromTo(currentTime, stamp);
          } else {
            if ("kdd" == view) {
              menuOpt.suda("m_bs");
              if ("cnlv1" == options.user_obj.mt || ("cnlv2" == options.user_obj.mt || ("cntouzi2" == options.user_obj.mt || "cnlv1wap" == options.user_obj.mt))) {
                /** @type {number} */
                L = 1;
                self.showView("kd");
                item.setPPT("block");
                self.setDimension({
                  I_V_O : 0
                });
                self.pCharts([{
                  name : options.user_obj.DKpChart
                }], {
                  isexclusive : true
                });
                if ("cnlv1wap" != options.user_obj.mt) {
                  self.tCharts([{
                    name : options.user_obj.DKtChart
                  }, {
                    name : "volume"
                  }], {
                    isexclusive : true
                  });
                } else {
                  self.tCharts([{
                    name : options.user_obj.DKtChart
                  }], {
                    isexclusive : true
                  });
                }
                if ("TZY" == options.user_obj.DKpChart) {
                  self.setReK(-1);
                }
                self.setLineStyle({
                  linetype : "solid"
                });
              }
            } else {
              if ("cnlv1" == options.user_obj.mt || ("cnlv2" == options.user_obj.mt || ("cntouzi2" == options.user_obj.mt || "cnlv1wap" == options.user_obj.mt))) {
                if (L > 0) {
                  /** @type {number} */
                  L = 0;
                  var attrName;
                  if ("cnlv1wap" != options.user_obj.mt) {
                    if (options.user_obj.indicatorTabLogger.h5k) {
                      attrName = options.user_obj.indicatorTabLogger.h5k.getCurrentIndicatorName();
                    }
                    attrName = attrName || "MACD";
                    if ("HF" != HF) {
                      self.tCharts([{
                        name : "VOLUME"
                      }, {
                        name : attrName
                      }, {
                        name : "BLANKCTN"
                      }], {
                        isexclusive : true,
                        /**
                         * @return {undefined}
                         */
                        callback : function() {
                          if (1 == kdd) {
                            /** @type {number} */
                            kdd = 2;
                            options.user_obj.indicatorTab(self);
                          }
                        }
                      });
                    } else {
                      self.tCharts([{
                        name : attrName
                      }, {
                        name : "BLANKCTN"
                      }], {
                        isexclusive : true,
                        /**
                         * @return {undefined}
                         */
                        callback : function() {
                          if (1 == kdd) {
                            /** @type {number} */
                            kdd = 2;
                            options.user_obj.indicatorTab(self);
                          }
                        }
                      });
                    }
                  } else {
                    self.tCharts([{
                      name : "MACD"
                    }], {
                      isexclusive : true
                    });
                  }
                  if ("kcl" == view) {
                    self.pCharts([], {
                      isexclusive : true,
                      /**
                       * @return {undefined}
                       */
                      callback : function() {
                        if (text.kChart.setCustom.show_underlay_vol) {
                          self.setCustom({
                            show_underlay_vol : text.kChart.setCustom.show_underlay_vol
                          });
                        }
                      }
                    });
                  } else {
                    self.pCharts(text.kChart.pCharts, {
                      isexclusive : true,
                      /**
                       * @return {undefined}
                       */
                      callback : function() {
                        if (text.kChart.setCustom.show_underlay_vol) {
                          self.setCustom({
                            show_underlay_vol : text.kChart.setCustom.show_underlay_vol
                          });
                        }
                      }
                    });
                  }
                  self.setDimension({
                    I_V_O : -22
                  });
                } else {
                  if ("kcl" == view) {
                    self.showView(view);
                  } else {
                    self.pCharts(text.kChart.pCharts, {
                      isexclusive : true,
                      /**
                       * @return {undefined}
                       */
                      callback : function() {
                        if (text.kChart.setCustom.show_underlay_vol) {
                          self.setCustom({
                            show_underlay_vol : text.kChart.setCustom.show_underlay_vol
                          });
                        }
                      }
                    });
                  }
                }
                if (check(options.user_obj.symbol)) {
                  if (element.getAttribute("data-id")) {
                    self.setReK("cnlv1wap" == options.user_obj.mt ? 0 : text.kChart.setReK);
                  }
                }
              }
              self.showView(view);
              if ("kcl" !== view) {
                self.setLineStyle({
                  linetype : text.kChart.setLineStyle.linetype
                });
              }
            }
          }
          if (element.getAttribute("data-id")) {
            if (element.childNodes[1]) {
              /** @type {string} */
              element.childNodes[1].style.display = "none";
            }
          } else {
            if (element.parentNode) {
              /** @type {string} */
              element.parentNode.style.display = "none";
            }
            if ("CN" == HF) {
              if (element.getAttribute("data-rek")) {
                self.setReK(Number(element.getAttribute("data-rek")));
                stack = element.getAttribute("data-rek");
                text.kChart.setReK = element.getAttribute("data-rek");
                data.save({
                  uid : [options.user_obj.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
                  key : options.user_obj.CFGSETTING_IFRAME_PREFIX,
                  value : text
                });
              }
            }
          }
        } else {
          if (element.childNodes[1]) {
            /** @type {string} */
            element.childNodes[1].style.display = "none";
          }
          if ("kdd" !== element.getAttribute("data-view")) {
            /** @type {number} */
            kdd = 2;
          }
          employees[i].initK(null, element.getAttribute("data-view"), element.getAttribute("data-rek"));
          if (element.getAttribute("data-rek")) {
            stack = element.getAttribute("data-rek") || (memory || 0);
            if (element.parentNode) {
              /** @type {string} */
              element.parentNode.style.display = "none";
            }
          }
        }
      }
    }
    /**
     * @param {?} letter
     * @return {?}
     */
    function check(letter) {
      return/^sh6\d{5}|sh900\d{3}|sz00\d{4}|sz30\d{4}|sz20\d{4}$/.test(letter);
    }
    menuOpt.xh5_EvtDispatcher.call(this);
    var text = options.user_obj.settingCfg;
    /** @type {Array} */
    var employees = [];
    var data = {
      tab : [{
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
      }, {
        lab : "更多",
        v : "more",
        t : "K"
      }],
      clsName : {
        normal : "kke_menus_tab_normal",
        edage : "kke_menus_tab_edage",
        active : "kke_menus_tab_active",
        active_a : "kke_menus_tab_active_a",
        rek : "kke_menus_tab_rek",
        more : "kke_menus_tab_more",
        up : "kke_menu_tab_up",
        down : "kke_menu_tab_down"
      },
      clsStyle : {
        cnnormal : "{width:41px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
        normal : "{width:47px;height:25px;line-height:25px;margin-top:3px;float:left;background:#EFF5FF;border:1px solid #EFF5FF;color:#08237a;text-align:center;font-size:12px;cursor:pointer;}",
        active : "{background-color:#ffffff;border-top:2px solid #062784;border-left:1px solid #dde4f4;border-right:1px solid #dde4f4;border-bottom:1px solid #ffffff;cursor:pointer;}",
        active_a : "{border-bottom:2px #3990e6 solid;display:inline-block;color:#3990e6;}",
        edage : "{width:100%;height:30px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #EFF5FF;position: relative;z-index: 233;}",
        rek : "{list-style:none;border:1px solid #dde4f4;margin-bottom:-1px;height:23px;line-height:23px;text-align:center;cursor:pointer;background-color:#EFF5FF;}"
      }
    };
    var logs = {
      normal : "{height:35px;line-height:35px;position:relative;float:left;background:#ffffff;border:1px solid #ffffff;color:#1a1a1a;text-align:center;font-size:14px;cursor:pointer;}",
      active : "{background-color:#ffffff;color:#3990e6;border-left:1px solid #ffffff;border-right:1px solid #ffffff;cursor:default;}",
      active_a : "{border-bottom:2px #3990e6 solid;margin-bottom:-2px;display:inline-block;color:#3990e6;}",
      edage : "{width:100%;height:37px;border-top: 1px solid #dde4f4;border-bottom: 1px solid #dde4f4;background-color: #ffffff;position: relative;z-index: 233;font-weight:bold;}",
      rek : "{list-style:none;border:1px solid #f0f0f0;margin-bottom:-1px;height:33px;line-height:33px;text-align:center;cursor:pointer;background-color:#f0f0f0;color:#1a1a1a;}",
      more : '{position: absolute;width: 13px;height: 9px;background-image:url("//www.sinaimg.cn/cj/finance_images/ua_ico.png");float: left;top:50%;margin-top:-4px;left: 50%;margin-left: 12px;}',
      up : "{background-position: 2px -105px;}",
      down : "{background-position: 2px -78px;}"
    };
    if (options.iswap || options.menu_wapmore) {
      data.clsStyle = logs;
    }
    /** @type {string} */
    var mod = "KKE_more_" + 12345 * Math.random();
    options = extend({
      type : "C",
      tchart : void 0,
      kchart : void 0,
      menu_dom_id : void 0,
      active : 0,
      tab : [{
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
      }, {
        lab : "更多",
        v : "more",
        t : "K"
      }],
      tabPosX : 15,
      clsName : {
        edage : data.clsName.edage,
        normal : data.clsName.normal,
        active : data.clsName.active,
        active_a : data.clsName.active_a,
        rek : data.clsName.rek,
        more : data.clsName.more || void 0,
        up : data.clsName.up || void 0,
        down : data.clsName.down || void 0
      },
      menu_rek : void 0,
      cb : void 0,
      me : void 0,
      menu_wapmore : void 0,
      user_obj : {
        symbol : "sh000001"
      },
      more : void 0
    }, options || {});
    if (options.me) {
      employees.push(options.me);
    }
    var memory;
    var item = this;
    var el = getElementById(options.menu_dom_id);
    var k = options.active || 0;
    var codeSegments = options.tab || data.tab;
    /** @type {Array} */
    var nodes = [];
    /** @type {Array} */
    var lis = [];
    var HF = menuOpt.market(options.user_obj && options.user_obj.symbol || "sh000001");
    /**
     * @param {Object} opts
     * @param {Object} data
     * @return {undefined}
     */
    var update = function(opts, data) {
      var n = data.normal;
      var type = data.active;
      var name = data.edage;
      var end = data.rek;
      if ("cnlv1" == options.user_obj.mt || "cnlv2" == options.user_obj.mt) {
        n = data.cnnormal;
      }
      /** @type {string} */
      n = "." + opts.normal + n + "\n";
      /** @type {string} */
      type = "." + opts.active + type + "\n";
      /** @type {string} */
      name = "." + opts.edage + name + "\n";
      /** @type {string} */
      end = "." + opts.rek + end + "\n";
      /** @type {string} */
      var initial = n + type + name + end;
      if (options.iswap || options.menu_wapmore) {
        var base = data.active_a;
        var post = data.active_a;
        var file = data.more;
        var x = data.up;
        var height = data.down;
        /** @type {string} */
        base = "." + opts.active + " a" + base + "\n";
        /** @type {string} */
        post = "." + opts.active_a + post + "\n";
        /** @type {string} */
        file = "." + opts.more + file + "\n";
        /** @type {string} */
        x = "." + opts.up + x + "\n";
        /** @type {string} */
        height = "." + opts.down + height + "\n";
        /** @type {string} */
        var path = options.iswap ? "" : "." + opts.normal + " a:hover" + data.active_a + "\n";
        initial += base + post + path + file + x + height;
      }
      cssUtil.inject(initial);
    };
    /**
     * @return {undefined}
     */
    var parent = function() {
      var o = nodes[k];
      if (o) {
        cssUtil.adCls(o, options.clsName.active);
      }
    };
    /**
     * @return {undefined}
     */
    var error = function() {
      var el;
      /** @type {number} */
      var index = nodes.length;
      for (;index--;) {
        el = nodes[index];
        cssUtil.rmCls(el, options.clsName.active);
        cssUtil.rmCls(el.childNodes[0], options.clsName.active);
        cssUtil.rmCls(el.childNodes[0], options.clsName.active_a);
      }
      var li;
      /** @type {number} */
      var i = lis.length;
      for (;i--;) {
        li = lis[i];
        cssUtil.rmCls(li.childNodes[0], options.clsName.active_a);
        cssUtil.rmCls(li, options.clsName.active);
      }
    };
    this.chooseTab = {
      tye : "T",
      tab : "t1"
    };
    var node;
    /**
     * @param {Node} n
     * @return {undefined}
     */
    var f = function(n) {
      if ("" == n.childNodes[2].style.display) {
        /** @type {string} */
        n.childNodes[2].style.display = "none";
        cssUtil.rmCls(n.childNodes[1], options.clsName.up);
        cssUtil.adCls(n.childNodes[1], options.clsName.down);
      } else {
        /** @type {string} */
        n.childNodes[2].style.display = "";
        cssUtil.rmCls(n.childNodes[1], options.clsName.down);
        cssUtil.adCls(n.childNodes[1], options.clsName.up);
      }
    };
    /**
     * @param {Node} el
     * @return {undefined}
     */
    var fn = function(el) {
      if (el.getAttribute("data-id")) {
        if ("k5" !== el.getAttribute("data-view") && ("k15" !== el.getAttribute("data-view") && ("k30" !== el.getAttribute("data-view") && ("k60" !== el.getAttribute("data-view") && ("km3" !== el.getAttribute("data-view") && ("km1" !== el.getAttribute("data-view") && "km12" !== el.getAttribute("data-view")))))) || (!options.iswap && !options.menu_wapmore || (cssUtil.rmCls(el.parentNode.parentNode.childNodes[1], options.clsName.up), cssUtil.adCls(el.parentNode.parentNode.childNodes[1], options.clsName.down),
        cssUtil.adCls(el.parentNode.parentNode.childNodes[0], options.clsName.active), cssUtil.adCls(el.parentNode.parentNode.childNodes[0], options.clsName.active_a))), options.menu_wapmore) {
          cssUtil.adCls(el.childNodes[0], options.clsName.active_a);
        } else {
          var color = menuOpt.getCSS(el).color;
          cssUtil.adCls(el, options.clsName.active);
          if (el.childNodes[1]) {
            el.childNodes[1].style.color = color;
          }
        }
      } else {
        if (options.menu_wapmore) {
          cssUtil.adCls(el.parentNode.parentNode.childNodes[0], options.clsName.active_a);
        } else {
          cssUtil.adCls(el.parentNode.parentNode, options.clsName.active);
        }
      }
    };
    /**
     * @param {Node} element
     * @return {undefined}
     */
    var render = function(element) {
      var l = employees.length;
      if ("T" == element.getAttribute("data-type")) {
        var $scope;
        var poster;
        /** @type {number} */
        var i = 0;
        for (;l > i;i++) {
          $scope = employees[i].tChart;
          poster = employees[i].kChart;
          if (poster) {
            poster.hide();
          }
          if ($scope) {
            $scope.show();
            $scope.showView(element.getAttribute("data-view"));
          }
        }
        var strMatchedValue;
        if ("cnlv1wap" != options.user_obj.mt) {
          if (options.user_obj.indicatorTabLogger.h5t) {
            strMatchedValue = options.user_obj.indicatorTabLogger.h5t.getCurrentIndicatorName();
          }
          if ("HF" == HF) {
            /** @type {string} */
            strMatchedValue = "X";
          }
          if (!strMatchedValue) {
            if (!(2 != kdd)) {
              /** @type {number} */
              kdd = 3;
              options.user_obj.indicatorTab($scope);
            }
          }
        }
        /** @type {string} */
        item.chooseTab.tye = "T";
      } else {
        /** @type {string} */
        item.chooseTab.tye = "K";
        init(element);
      }
      eq(element.getAttribute("data-view"));
    };
    /** @type {number} */
    var stack = 0;
    /** @type {number} */
    var L = 9;
    /**
     * @return {undefined}
     */
    var initialize = function() {
      var ele = $("div");
      if (el) {
        el.appendChild(ele);
      }
      ele.className = options.clsName.edage;
      /**
       * @param {number} i
       * @param {number} left
       * @return {?}
       */
      var initialize = function(i, left) {
        left = left || 0;
        var el = $("div");
        nodes.push(el);
        ele.appendChild(el);
        el.className = options.clsName.normal;
        /** @type {string} */
        el.style.marginLeft = left + "px";
        if (options.iswap || options.menu_wapmore) {
          /** @type {string} */
          el.style.width = 100 / options.tab.length - 1 + "%";
        }
        el.setAttribute("data-id", "KKE_tab_" + codeSegments[i].v);
        el.setAttribute("data-view", codeSegments[i].v);
        el.setAttribute("data-type", codeSegments[i].t);
        self.addHandler(el, "click", remove);
        if (related.allowt) {
          self.addHandler(el, "touchend", remove);
        }
        "kdd" === codeSegments[i].v;
        var b = $("a");
        if (b.innerHTML = codeSegments[i].lab, b.setAttribute("data-a", "a"), el.appendChild(b), "more" == codeSegments[i].v) {
          var wrapper = $("div");
          wrapper.setAttribute("data-a", "a");
          /** @type {string} */
          wrapper.className = options.clsName.more + " " + options.clsName.down;
          el.appendChild(wrapper);
        }
        return el;
      };
      /**
       * @param {?} event
       * @return {undefined}
       */
      var trigger = function(event) {
        /**
         * @param {?} e
         * @return {undefined}
         */
        var reset = function(e) {
          self.preventDefault(e);
          if (self.getTarget(e).childNodes[1]) {
            /** @type {string} */
            self.getTarget(e).childNodes[1].style.display = "";
          }
        };
        self.addHandler(event, "touchstart", reset);
        self.addHandler(event, "mouseover", reset);
        /**
         * @param {?} e
         * @return {undefined}
         */
        var onClick = function(e) {
          self.preventDefault(e);
          var node = self.getTarget(e);
          var descendant = self.getRelatedTarget(e);
          if (!(descendant && (node !== descendant && removeClass(node, descendant)))) {
            if (node.childNodes[1]) {
              /** @type {string} */
              node.childNodes[1].style.display = "none";
            }
          }
          if (node.parentNode) {
            if (node.parentNode.childNodes[1]) {
              if (node.parentNode.childNodes[0].getAttribute("data-a")) {
                if (!options.menu_wapmore) {
                  /** @type {string} */
                  node.parentNode.childNodes[1].style.display = "none";
                }
              }
            }
          }
        };
        self.addHandler(event, "touchend", onClick);
        self.addHandler(event, "mouseout", onClick);
      };
      /**
       * @return {undefined}
       */
      var render = function() {
        var excludes = options.show;
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          if (!excludes || -1 != excludes.indexOf(codeSegments[i].v)) {
            switch(codeSegments[i].v) {
              case "kd":
              ;
              case "kw":
              ;
              case "km":
              ;
              case "kcl":
                var e = initialize(i);
                if (options.menu_rek) {
                  if (check(options.user_obj.symbol)) {
                    onClick(e);
                  }
                }
                trigger(e);
                break;
              case "more":
                if (options.more) {
                  e = initialize(i);
                  end(e);
                }
                break;
              default:
                if (options.iswap || options.menu_wapmore) {
                  initialize(i);
                } else {
                  if (0 == i) {
                    initialize(i, options.tabPosX);
                  } else {
                    initialize(i);
                  }
                }
              ;
            }
          }
        }
      };
      render();
      update(data.clsName, data.clsStyle);
      parent();
    };
    /**
     * @param {Element} e
     * @return {undefined}
     */
    var onClick = function(e) {
      var element = $("ul");
      /** @type {string} */
      element.style.display = "none";
      /** @type {number} */
      element.style.padding = element.style.margin = 0;
      if (e) {
        e.appendChild(element);
      }
      /** @type {Array} */
      var cells = [{
        lab : "\u540e\u590d\u6743",
        v : 1
      }, {
        lab : "\u524d\u590d\u6743",
        v : -1
      }, {
        lab : "\u4e0d\u590d\u6743",
        v : 0
      }];
      /** @type {number} */
      var lastIndex = 3;
      for (;lastIndex--;) {
        var current = $("li");
        current.className = options.clsName.rek;
        current.setAttribute("data-rek", cells[lastIndex].v);
        current.setAttribute("data-view", e.getAttribute("data-view"));
        var p = $("a");
        p.setAttribute("data-a", "a");
        p.innerHTML = cells[lastIndex].lab;
        current.appendChild(p);
        element.appendChild(current);
        self.addHandler(e, "touchend", remove);
        self.addHandler(e, "click", remove);
      }
      /**
       * @param {?} e
       * @return {undefined}
       */
      var onClick = function(e) {
        self.preventDefault(e);
        var node = self.getTarget(e).parentNode;
        var descendant = self.getRelatedTarget(e);
        var n = self.getTarget(e);
        if (!(descendant && (node !== descendant && removeClass(node, descendant)))) {
          if (n.getAttribute("data-rek")) {
            /** @type {string} */
            node.style.display = "none";
          }
        }
        if (!removeClass(node.parentNode, descendant)) {
          if (node.getAttribute("data-rek")) {
            /** @type {string} */
            node.parentNode.style.display = "none";
          }
        }
      };
      self.addHandler(element, "touchend", onClick);
      self.addHandler(element, "mouseout", onClick);
    };
    /**
     * @param {Element} event
     * @return {undefined}
     */
    var end = function(event) {
      var li = $("ul");
      /** @type {string} */
      li.id = mod;
      /** @type {string} */
      li.style.display = "none";
      /** @type {number} */
      li.style.padding = li.style.margin = 0;
      if (event) {
        event.appendChild(li);
      }
      var commands = options.more;
      /** @type {number} */
      var prev = 0;
      var running = commands.length;
      for (;running > prev;prev++) {
        var a = commands[prev];
        var element = $("li");
        element.className = options.clsName.rek;
        element.setAttribute("data-id", "KKE_tab_" + a.v);
        element.setAttribute("data-view", a.v);
        var b = $("a");
        b.setAttribute("data-a", "a");
        b.innerHTML = a.lab;
        element.appendChild(b);
        li.appendChild(element);
        self.addHandler(event, "touchend", remove);
        self.addHandler(event, "click", remove);
        lis.push(element);
      }
      if (!options.iswap) {
        /**
         * @param {?} e
         * @return {undefined}
         */
        var onClick = function(e) {
          self.preventDefault(e);
          var node = self.getTarget(e).parentNode.parentNode;
          var descendant = self.getRelatedTarget(e);
          var span = self.getTarget(e).parentNode;
          if (!(descendant && (node !== descendant && removeClass(node, descendant)))) {
            if (span.getAttribute("data-id")) {
              /** @type {string} */
              node.style.display = "none";
            }
            if (node.getAttribute("data-view")) {
              /** @type {string} */
              span.style.display = "none";
            }
          }
        };
        self.addHandler(li, "touchend", onClick);
        self.addHandler(li, "mouseout", onClick);
      }
    };
    initialize();
    /**
     * @param {(number|string)} type
     * @return {undefined}
     */
    this.setPPT = function(type) {
      if (window.chartPPT_panel) {
        /** @type {(number|string)} */
        window.chartPPT_panel.style.display = type;
      }
    };
    /**
     * @param {Array} members
     * @return {undefined}
     */
    this.setTKChart = function(members) {
      /** @type {Array} */
      employees = members;
    };
    /**
     * @param {string} offset
     * @return {undefined}
     */
    this.setTarget = function(offset) {
      if (k = offset, k < nodes.length) {
        node = nodes[offset];
        error();
        var o = nodes[k];
        if (o) {
          cssUtil.adCls(o, options.clsName.active);
        }
        var i = employees.length;
        for (;i--;) {
          var ret = employees[i].kChart;
          if (ret) {
            ret.showView(codeSegments[k].v);
          }
        }
      }
    };
    /**
     * @param {?} textAlt
     * @return {undefined}
     */
    this.setCfg = function(textAlt) {
      text = textAlt;
    };
    /**
     * @param {Object} item
     * @return {undefined}
     */
    this.setChart = function(item) {
      if (node && ("kdd" !== node.getAttribute("data-view") && (kdd = 2)), item && item.k) {
        var i;
        /** @type {number} */
        i = 0;
        for (;i < employees.length;i++) {
          if (item.o.symbol == employees[i].chartUserobj.symbol) {
            employees[i].kChart = item.k;
          }
        }
        if ("CN" == HF) {
          if ("cnlv1wap" !== options.user_obj.mt) {
            stack = memory = options.user_obj.settingCfg.kChart.setReK;
          }
        }
        /** @type {number} */
        i = 0;
        for (;i < employees.length;i++) {
          var self = employees[i].kChart;
          if (node) {
            if (node.view) {
              self.showView(node.view);
            }
          }
          if (node) {
            if (node.getAttribute("data-rek")) {
              if ("CN" == HF) {
                self.setReK(Number(node.getAttribute("data-rek")));
                text.kChart.setReK = node.getAttribute("data-rek");
                data.save({
                  uid : [options.user_obj.CFGSETTING_IFRAME_PREFIX, (new Date).getTime()].join("|"),
                  key : options.user_obj.CFGSETTING_IFRAME_PREFIX,
                  value : text
                });
              }
            }
          }
          if (node) {
            if (!node.getAttribute("data-rek")) {
              if (memory) {
                if (check(options.user_obj.symbol)) {
                  if ("kdd" != node.getAttribute("data-view")) {
                    self.setReK(memory);
                  }
                }
              }
            }
          }
        }
      }
    };
  }
  var $ = menuOpt.$C;
  var extend = menuOpt.oc;
  var getElementById = menuOpt.$DOM;
  var type = menuOpt.isFunc;
  var self = menuOpt.xh5_EvtUtil;
  var related = menuOpt.xh5_deviceUtil;
  var cssUtil = menuOpt.cssUtil;
  var removeClass = menuOpt.$CONTAINS;
  var data = menuOpt.bridge;
  /** @type {number} */
  var kdd = 1;
  return menuOpt.fInherit(init, menuOpt.xh5_EvtDispatcher), new function() {
    /** @type {string} */
    this.VER = "1.1.5";
    /**
     * @param {?} element
     * @param {?} callback
     * @return {undefined}
     */
    this.get = function(element, callback) {
      var wrapper = new init(element);
      if (type(callback)) {
        callback(wrapper);
      }
    };
  };
});
