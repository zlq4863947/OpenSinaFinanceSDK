xh5_define("cfgs.settinger", [], function() {
  /**
   * @param {(number|string)} rows
   * @return {undefined}
   */
  function render(rows) {
    /** @type {(number|string)} */
    this.uid = rows;
    this.custom = {
      show_underlay_vol : true,
      show_ext_marks : true,
      show_floater : true,
      mousewheel_zoom : true,
      keyboard : true,
      history_t : "window",
      allow_move : true,
      mouse_and_touch : true,
      tchart_tap : true,
      show_k_rangepercent : true,
      touch_prevent : true,
      mini_threshold : {
        width : 0 / 0,
        height : 0 / 0
      },
      show_logo : true,
      k_overlay : false,
      stick : true,
      smooth : false,
      indicatorpanel_url : "https://current.sina.com.cn/sinatkchart/indicatorpanel.html?20160704",
      allow_indicator_edit : true,
      storage_lv : 2,
      indicator_reorder : true,
      indicator_cvs_title : false,
      indicator_reheight : true,
      centerZoom : true
    };
    this.PARAM = {
      K_CL_NUM : 260,
      updateRate : 5,
      T_RATE : 120,
      minCandleNum : 15,
      maxCandleNum : 0 / 0,
      defaultCandleNum : 80,
      zoomUnit : 90,
      zoomLimit : 10,
      zoomArea : 0.15,
      I_Z_INDEX : 50,
      G_Z_INDEX : 30,
      _hd : 1,
      /**
       * @param {number} $val$$
       * @return {undefined}
       */
      setHd : function($val$$) {
        if ("number" == typeof $val$$) {
          /** @type {number} */
          this._hd = $val$$;
        }
      },
      /**
       * @return {?}
       */
      getHd : function() {
        return this._hd;
      },
      isFlash : false,
      LOGO_ID : "KKE_sina_finance_logo"
    };
    this.DIMENSION = {
      extend_draw : false,
      LOGO_W : 80,
      LOGO_H : 20,
      posY : 0,
      posX : 55,
      RIGHT_W : 55,
      K_RIGHT_W : 9,
      _w : void 0,
      _h : void 0,
      w_t : void 0,
      w_k : void 0,
      h_t : void 0,
      h_k : void 0,
      P_HV : 0.28,
      H_MA4K : 13,
      H_TIME_PART : 13,
      K_F_T : 47,
      T_F_T : 13,
      H_T_T : 14,
      W_T_L : 43,
      H_T_G : 60,
      H_BLK : 50,
      H_T_B : 7,
      I_V_O : 0,
      /**
       * @return {?}
       */
      getOneWholeTH : function() {
        return this.H_T_T + this.H_T_G;
      },
      H_RS : 30,
      /**
       * @param {?} dataAndEvents
       * @return {undefined}
       */
      setStageW : function(dataAndEvents) {
        this._w = dataAndEvents;
        /** @type {number} */
        this.w_k = dataAndEvents - this.posX - this.K_RIGHT_W;
        /** @type {number} */
        this.w_t = dataAndEvents - this.posX - this.RIGHT_W;
      },
      /**
       * @param {?} h
       * @param {?} y
       * @return {undefined}
       */
      setStageH : function(h, y) {
        this._h = h;
        /** @type {number} */
        this.h_k = this.h_t = h - y - this.H_TIME_PART - this.H_MA4K;
      },
      /**
       * @return {?}
       */
      getStageW : function() {
        return this._w;
      },
      /**
       * @return {?}
       */
      getStageH : function() {
        return this._h;
      }
    };
    this.STYLE = {
      FONT_SIZE : 12,
      FONT_FAMILY : "helvetica,arial,sans-serif"
    };
    this.COLOR = {
      BG : "#fff",
      T_P : "#007cc8",
      T_AVG : "#000000",
      T_PREV : "#9b9b9b",
      K_RISE : "#f11200",
      K_FALL : "#00a800",
      K_N : "#000000",
      K_CL : "#007cc8",
      K_MS_RISE : "#f11200",
      K_MS_FALL : "#00a800",
      K_MS_N : "#000000",
      T_RISE : "#f11200",
      T_FALL : "#00a800",
      T_N : "#000000",
      F_RISE : "#f11200",
      F_FALL : "#00a800",
      F_N : "#000000",
      F_BG : "rgba(255,255,255,.9)",
      F_BR : "#000",
      F_T : "#000",
      K_EXT : "#080208",
      T_T : "#777",
      K_P : "#555",
      V_SD : "#dddddd",
      M_ARR : ["#fff", "#BCD4F9"],
      TIME_S : "#000000",
      TIME_L : "#eeeeee",
      GRID : "#eee",
      IVH_LINE : "#494949",
      P_TC : "#fff",
      P_BG : "#494949",
      T_TC : "#fff",
      T_BG : "#494949",
      REMARK_T : "#fff",
      REMARK_BG : "#494949",
      K_PCT : "#ccc",
      BTN_ARR : ["#2b9dfc", "#fff"],
      TIP_ARR : ["#000", "#fff", null, false, null],
      LOGO : "#ccc"
    };
    this.datas = {
      s : "sh000001",
      mode : "",
      tDataLen : 241,
      t : "",
      isT : false,
      scaleType : "price",
      candle : "solid"
    };
  }
  var FIELDS = {
    URLHASH : {
      TS : 1,
      T1 : 1,
      T5 : 5,
      FAKE_T5 : 2,
      NTS : "ts",
      NT5 : "t5",
      KD : 24,
      KW : 168,
      KM : 720,
      KCL : 365,
      KDF : 23,
      KDB : 25,
      KWF : 167,
      KWB : 169,
      KMF : 719,
      KMB : 721,
      KCLF : 364,
      KCLB : 366,
      NKD : "kd",
      NKW : "kw",
      NKM : "km",
      NKCL : "kcl",
      NKDF : "kdf",
      NKDB : "kdb",
      NKWF : "kwf",
      NKWB : "kwb",
      NKMF : "kmf",
      NKMB : "kmb",
      NKCLF : "kclf",
      NKCLB : "kclb",
      K1 : 1,
      K5 : 5,
      K15 : 15,
      K30 : 30,
      K60 : 60,
      K240 : 240,
      NK1 : "k1",
      NK5 : "k5",
      NK15 : "k15",
      NK30 : "k30",
      NK60 : "k60",
      NK240 : "k240",
      KMS : 1E3,
      NKMS : "kms",
      KYTD : 983,
      NYTD : "kytd",
      /**
       * @param {?} dataAndEvents
       * @return {?}
       */
      vn : function(dataAndEvents) {
        var link;
        for (link in this) {
          if (this.hasOwnProperty(link) && ("number" == typeof this[link] && dataAndEvents == this[link])) {
            return this[link];
          }
        }
        return void 0;
      },
      /**
       * @param {string} letter
       * @return {?}
       */
      vi : function(letter) {
        switch(letter) {
          case this.NTS:
            return this.TS;
          case this.NT5:
            return this.FAKE_T5;
          default:
            return this[letter.toUpperCase()];
        }
      },
      /**
       * @param {?} match
       * @return {?}
       */
      gt : function(match) {
        var chunk;
        switch(match) {
          case this.KMS:
            chunk = {
              type : "msk"
            };
            break;
          case this.K1:
          ;
          case this.K5:
          ;
          case this.K15:
          ;
          case this.K30:
          ;
          case this.K60:
          ;
          case this.K240:
            chunk = {
              type : "mink"
            };
            break;
          case this.KDF:
          ;
          case this.KWF:
          ;
          case this.KMF:
          ;
          case this.KCLF:
            chunk = {
              type : "rek",
              dir : "q"
            };
            break;
          case this.KDB:
          ;
          case this.KWB:
          ;
          case this.KMB:
          ;
          case this.KCLB:
            chunk = {
              type : "rek",
              dir : "h"
            };
            break;
          default:
            chunk = {
              type : "k"
            };
        }
        switch(match) {
          case this.KD:
          ;
          case this.KDF:
          ;
          case this.KDB:
            chunk.baseid = this.KD;
            break;
          case this.KW:
          ;
          case this.KWF:
          ;
          case this.KWB:
            chunk.baseid = this.KW;
            break;
          case this.KM:
          ;
          case this.KMF:
          ;
          case this.KMB:
            chunk.baseid = this.KM;
            break;
          case this.KCL:
          ;
          case this.KCLF:
          ;
          case this.KCLB:
            chunk.baseid = this.KCL;
            break;
          default:
            chunk.baseid = match;
        }
        return chunk;
      }
    },
    e : {
      K_DATA_LOADED : "kDataLoaded",
      T_DATA_LOADED : "tDataLoaded",
      I_EVT : "iEvent"
    },
    nohtml5info : "检测到您的浏览器过旧且不支持HTML 5，当前以兼容模式运行。<br/>为获得更好的体验及完善的功能，建议使用<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/40975.html' target='_blank'>谷歌Chrome</a>浏览器，或升级到您浏览器的<a style='color:#fff;text-decoration:underline;' href='http://down.tech.sina.com.cn/content/58979.html' target='_blank'>最新版本</a>。",
    historyt08 : "当前提供A股2008年以来的历史分时走势查询",
    nohistoryt : "无此证券此时段历史分时数据",
    norecord : "证券代码无记录",
    notlisted : "未上市",
    delisted : "退市",
    nodata : "未加载到有效数据",
    noredata : "部分证券无复权数据"
  };
  return new function() {
    /** @type {string} */
    this.VER = "2.0.27";
    /** @type {Array} */
    var values = [];
    /**
     * @param {string} name
     * @return {?}
     */
    this.getSetting = function(name) {
      var value;
      /** @type {number} */
      var j = values.length;
      for (;j--;) {
        if (value = values[j], name == value.uid) {
          return value;
        }
      }
      return value = new render(name), values.push(value), value;
    };
    this.globalCfg = FIELDS;
  };
});
