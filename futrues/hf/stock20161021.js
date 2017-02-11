/**
 @id 31-462-156
 @description 沪深300 modular
 @author xingben1
 @version 0.1
 */
var modular = (function($){
	var modular = {
		/**
		 @description 根据期指类型重新格式化code
		 @param {String} code 要格式化的期货代码
		 @param {String} type 要格式化的期货类型(0外盘,1内盘,2期指)
		 */
		format_code:function(code,type,postfix){
			var code = {
				"0":["hf_",code,"_0"],
				"1":[code,"_1"],
				"2":["CFF_RE_",code,"_2"],
				"3":[code,"_3"]
			}[type].join("");
			return (typeof  postfix != "undefined") ? code : code.substring(0,code.length - 2);
		},
		format:function(key,arr,index,type){
			var tool = modular.helper,
				a_obj = {
					code:"--",
					name:"--",
					price:"--",
					amt:"--",
					cls:config.marks[0]
				};
			switch(type * 1){
				case 0:
					return $.extend(a_obj,{
						name:arr[14],
						code:arr[0].substring(3),//截去hf_
						type:0,
						light:index % 2 == 0 ? "even" : "odd",
						title:arr[14],
						price:arr[1] === 0 ? "--" : tool.num_to_str(arr[1],2),
						amt: arr[2] === 0 ? "--" : tool.num_to_str(arr[2],2,"%"),
						cls: config.marks[tool.get_status(arr[2])]
					});
					break;
				case 2:
					var amt = !!(arr[4] * 1) == false ? 0 :  tool.plus(tool.num_to_str((arr[4] - arr[15]) / arr[15] * 100,2));
					return $.extend(a_obj,{
						//name:(name = (/CFF_RE_TF/g).test(arr[0])?arr[0].replace(/CFF_RE_TF/g,"国债"):arr[0].replace(/CFF_RE_IF/g,"期指")),
						name:(name = arr[0].replace(/CFF_RE_TF/g,"5国债").replace(/CFF_RE_IF/g,"IF").replace(/CFF_RE_T/g,"10国债").replace(/CFF_RE_IH/g,"IH").replace(/CFF_RE_IC/g,"IC")),
						code:arr[0].replace(/CFF_RE_/g,""),
						light:index % 2 == 0 ? "even" : "odd",
						title:name,
						type:2,
						price:amt === 0 ? "--" : tool.num_to_str(arr[4],1),
						amt: amt === 0 ? "--" : amt + "%",
						cls: config.marks[tool.get_status(amt)]
					});
					break;
				default:
					var amt = !!(arr[9] * 1) == false ? 0 :  tool.plus(tool.num_to_str((arr[9] - arr[11]) / arr[11] * 100,2));
					return $.extend(a_obj,{
						name:arr[1] !== "" ? arr[1] : arr[0],
						code:arr[0],
						type:1,
						light:index % 2 == 0 ? "even" : "odd",
						title:arr[1] !== "" ? arr[1] : arr[0],
						price:amt === 0 ? "--" : arr[9],
						amt: amt === 0 ? "--" : amt + "%",
						cls: config.marks[tool.get_status(amt)]
					});
					break;
			}
		},
		/**
		 @description 登陆模块
		 */
		login:{
			update:function(data,callback){
				modular.login.has_login = data.has_login;
				if($.isFunction(callback)){
					callback(modular.login.has_login);
				}
			}
		},
		/**
		 @description 最近访问和热门基金
		 */
		latset_hot_futures:{
			a_hot:[],
			a_latest:[],
			o_latest:{},
			latest_len:0,
			delay:3000,
			timer:null,
			max_len:13,
			/**
			 @description 根据数据渲染视图
			 @param {Object} options 渲染参数;
			 */
			render:function(options){
				var mod = modular.latset_hot_futures,
					tmpl = modular.helper.tmpl,
					data_latest = $(config.ids.tbody_latest),
					data_hot = $(config.ids.tbody_hot),
					box_hot_futures = $(config.ids.box_hot_futures),
					box_latest_futures = $(config.ids.box_latest_futures),
					data_latest_index = 0;
				data_hot_index = 0;
				data_latest.empty().hide();
				data_hot.empty().hide();
				box_hot_futures.hide();
				box_latest_futures.hide();
				$.each(options.data,function(key,arr){
					//var fund = "f_" + arr[0];
					var type = modular.latset_hot_futures.o_latest[arr[0]];
					if($.inArray(arr[0],options.a_latest) >= 0){
						var obj = modular.format(key,arr,data_latest_index,type);
						data_latest.append(tmpl(config.latest_hot_fund.tmpl.latest,obj));
						data_latest_index++;
					}else{
						if($.inArray(arr[0],options.a_latest) < 0){
							var obj = modular.format(key,arr,data_hot_index,type);							                      data_hot.append(tmpl(config.latest_hot_fund.tmpl.hot,obj));
							data_hot_index++;
						}
					};
				});
				data_hot.show();
				box_hot_futures.show();
				data_latest.show();
				box_latest_futures.show();
			},
			/**
			 @description 删除最近访问的期货
			 @param {String} code 要删除的期货代码
			 */
			delete_latest:function(code,type){
				//从cookie中删除;
				$("#futures-code-latest-" + code).remove();
				var mod = modular.latset_hot_futures,
					code = modular.format_code(code,type),
					cookie_code = code + "_" + type,
					pos = $.inArray(code,mod.a_latest),
					temp_cookie_latest = $.cookie(config.CONST.latest).split(",");
				if(mod.timer){
					clearTimeout(mod.timer);
				};
				//从mod.a_latest移除元素;
				if(pos !== -1){
					mod.a_latest.splice(pos,1);
					delete mod.o_latest[code];
				};
				if((pos = $.inArray(cookie_code,temp_cookie_latest)) >=0){
					temp_cookie_latest.splice(pos,1);
				};
				$.cookie(config.CONST.latest,null);
				$.cookie(config.CONST.latest,temp_cookie_latest.join(","),{path:"/",domain:"finance.sina.com.cn",expires:36500});
				mod.update();
			},
			update:function(){
				var mod = modular.latset_hot_futures;
				//动态刷新行情信息;
				(function(){
					StockHq.get_hq({stocks:mod.a_latest.concat(mod.a_hot)},function(data){
						mod.render({
							data:data.str,
							a_hot:mod.a_hot,
							a_latest:mod.a_latest
						});
					});
					if(mod.delay > 0){
						mod.timer = setTimeout(arguments.callee,mod.delay);
					}
				})();
			},
			/**
			 @description 最近访问和热门基金模块初始化
			 */
			init:function(code){
				var mod = modular.latset_hot_futures,
					a_latest = $.cookie(config.CONST.latest),
					temp_a_latest = [],
					code = modular.format_code(code,futures_app.type,true);
				if(a_latest !== null && a_latest !== ''){
					temp_a_latest = a_latest.split(",");
					var pos = $.inArray(code,temp_a_latest);
					if(pos < 0){
						if(temp_a_latest.length >= mod.max_len){
							temp_a_latest.pop();
						};
						temp_a_latest.unshift(code);
					}else{
						var temp_item = temp_a_latest.splice(pos,1);
						temp_a_latest.unshift(temp_item[0]);
					};
				}else{
					temp_a_latest.unshift(code);
				};
				$.each(temp_a_latest,function(i,v){
					var len = v.length,
						str_len = len - 2,
						type = (v + "").slice(-1),
						code = (v + "").substring(0,str_len);
					mod.a_latest.push(code);
					mod.o_latest[code] = type;
				});
				//mod.latest_len = mod.a_latest.length;
				//保存cookie;
				$.cookie(config.CONST.latest,temp_a_latest.join(","),{path:"/",domain:"finance.sina.com.cn",expires:36500});
				mod.a_hot = [].concat(futures_app.hot_list);
				mod.update();
			}
		},
		/**
		 @description 期货行情信息模块
		 */
		futures_hq:{
			delay:3000,
			/**
			 @description 格式化数据
			 @param {Array} arr 数据内容;
			 */
			format:function(arr,type){
				var obj = {},
					tool = modular.helper;
				$.extend(obj,(arr.length > 2) ? (function(){
					switch(type * 1){
						case 0:
							return {
								'price'			: tool.num_to_str(!!(arr[1]*1) == true ? arr[1] : arr[8],2),
								'cls'			: config.marks[tool.get_status(arr[2])],
								'time'			: arr[13] + " " + arr[7],
								'open-price'	: tool.num_to_str(arr[9],2),
								'max-price'		: tool.num_to_str(arr[5],2),
								'min-price'		: tool.num_to_str(arr[6],2),
								'close-price'	: "--",
								'yestoday-price': tool.num_to_str(arr[8],2),
								'amount'		: tool.num_to_str(arr[10],0),
								'volume'		: "--",
								'buy'			: tool.num_to_str(arr[3],2),
								'sell'			: tool.num_to_str(arr[4],2),
								'buy-amount'	: arr[11] === 0 ? "--" : tool.plus(tool.num_to_str(arr[11],2)),
								'sell-amount'	: arr[12] === 0 ? "--" : tool.plus(tool.num_to_str(arr[12],2)),
								'amt'			: arr[2] === 0 ? "--" : tool.plus(tool.num_to_str(arr[2],2)) + "%",
								'amt-value'		: arr[2] === 0 ? "--" : tool.plus(tool.num_to_str(arr[1] - arr[8] ,2))
							};
							break;
						case 2:
							var amt = !!(arr[4] * 1) == false ? 0 :  (arr[4] - arr[15]) / arr[15] * 100;
							return {
								'price'			: tool.num_to_str(!!(arr[4]*1) == true ? arr[4] : arr[15],1),
								'cls'			: config.marks[tool.get_status(amt)],
								'time'			: arr[37] + " " + arr[38],
								'open-price'	: tool.num_to_str(arr[1],1),
								'max-price'		: tool.num_to_str(arr[2],1),
								'min-price'		: tool.num_to_str(arr[3],1),
								'close-price'	: tool.num_to_str(arr[9],1),
								'yestoday-price': tool.num_to_str(arr[14],1),
								'amount'		: tool.num_to_str(arr[7],0),
								'volume'		: tool.num_to_str(arr[5],0),
								'buy'			: "--",
								'sell'			: "--",
								'buy-amount'	: "--",
								'sell-amount'	: "--",
								'amt'			: amt === 0 ? "--" : tool.plus(tool.num_to_str(amt,2)) + "%",
								'amt-value'		: amt === 0 ? "--" : tool.plus(tool.num_to_str(arr[4] - arr[15] ,2))
							};
							break;
						default:
							var amt = !!(arr[9] * 1) == false ? 0 :  (arr[9] - arr[11]) / arr[11] * 100,
								time = [arr[2].substring(0,2),arr[2].substring(2,4),arr[2].substring(4)].join(":");
							return {
								'price'			: tool.num_to_str(!!(arr[9]*1) == true ? arr[9] : arr[11],0),
								'cls'			: config.marks[tool.get_status(amt)],
								'time'			: arr[18] + " " + time,
								'open-price'	: tool.num_to_str(arr[3],0),
								'max-price'		: tool.num_to_str(arr[4],0),
								'min-price'		: tool.num_to_str(arr[5],0),
								'close-price'	: tool.num_to_str(arr[10],0),
								'yestoday-price': tool.num_to_str(arr[11],0),
								'amount'		: tool.num_to_str(arr[14],0),
								'volume'		: tool.num_to_str(arr[15],0),
								'buy'			: tool.num_to_str(arr[7],0),
								'sell'			: tool.num_to_str(arr[8],0),
								'buy-amount'	: tool.num_to_str(arr[12],0),
								'sell-amount'	: tool.num_to_str(arr[13],0),
								'amt'			: amt === 0 ? "--" : tool.plus(tool.num_to_str(amt,2)) + "%",
								'amt-value'		: amt === 0 ? "--" : tool.plus(tool.num_to_str(arr[9] - arr[11] ,2))
							}

					}
				})() : {
					'price'			: "--",
					"cls"			: config.marks[tool.get_status(0)],
					'time'			: "--",
					'open-price'	: "--",
					'max-price'		: "--",
					'min-price'		: "--",
					'close-price'	: "--",
					'yestoday-price': "--",
					'amount'		: "--",
					'volume'		: "--",
					'buy'			: "--",
					'sell'			: "--",
					'buy-amount'	: "--",
					'sell-amount'	: "--",
					'amt'			: "--",
					'amt-value'		: "--"
				});
				return obj;
			},
			// 数据format

			lqf_format: function(arr,type){
				var obj = {},
					tool = modular.helper;
				$.extend(obj,(arr.length > 2) ? (function(){
					switch(type * 1){
						case 0:
							var toFixedStr = arr[5] + '';
							var toFixedNumber = toFixedStr.length - toFixedStr.indexOf('.') - 1;
							if(toFixedStr.indexOf('.') < 0){
								toFixedNumber = 0;
							}
							return {
								'price'			: !!(arr[1]*1) == true ? arr[1] : arr[8],
								'cls'			: config.marks[tool.get_status(arr[2])],
								'time'			: arr[13] + " " + arr[7],
								'open-price'	: arr[9],
								'max-price'		: arr[5],
								'min-price'		: arr[6],
								'close-price'	: "--",
								'yestoday-price': arr[8],
								'amount'		: arr[10],
								'volume'		: "--",
								'buy'			: arr[3],
								'sell'			: arr[4],
								'buy-amount'	: arr[11] === 0 ? "--" : tool.plus(tool.num_to_str(arr[11],2)),
								'sell-amount'	: arr[12] === 0 ? "--" : tool.plus(tool.num_to_str(arr[12],2)),
								'amt'			: arr[2] === 0 ? "--" : tool.plus(tool.num_to_str(arr[2],2)) + "%",
								'amt-value'		: arr[2] === 0 ? "--" : tool.plus(tool.num_to_str(arr[1] - arr[8] ,toFixedNumber))
							}
							break;
						case 2:
							var amt = !!(arr[4] * 1) == false ? 0 :  (arr[4] - arr[15]) / arr[15] * 100;
							var toFixedStr = arr[2] + '';
							var toFixedNumber = toFixedStr.length - toFixedStr.indexOf('.') - 1;
							if(toFixedStr.indexOf('.') < 0){
								toFixedNumber = 0;
							}
							return {
								'price'			: !!(arr[4]*1) == true ? arr[4] : arr[15],
								'cls'			: config.marks[tool.get_status(amt)],
								'time'			: arr[37] + " " + arr[38],
								'open-price'	: arr[1],
								'max-price'		: arr[2],
								'min-price'		: arr[3],
								'close-price'	: arr[9],
								'yestoday-price': arr[14],
								'amount'		: arr[7],
								'volume'		: arr[5],
								'buy'			: "--",
								'sell'			: "--",
								'buy-amount'	: "--",
								'sell-amount'	: "--",
								'amt'			: amt === 0 ? "--" : tool.num_to_str(amt,2) + "%",
								'amt-value'		: amt === 0 ? "--" : tool.plus(tool.num_to_str(arr[4] - arr[15] ,toFixedNumber))
							}
							break;
						default:
							var amt = !!(arr[9] * 1) == false ? 0 :  (arr[9] - arr[11]) / arr[11] * 100,
								time = [arr[2].substring(0,2),arr[2].substring(2,4),arr[2].substring(4)].join(":");

							var toFixedStr = arr[4] + '';
							var toFixedNumber = toFixedStr.length - toFixedStr.indexOf('.') - 1;
							if(toFixedStr.indexOf('.') < 0){
								toFixedNumber = 0;
							}

							return {
								'price'			: !!(arr[9]*1) == true ? arr[9] : arr[11],
								'cls'			: config.marks[tool.get_status(amt)],
								'time'			: arr[18] + " " + time,
								'open-price'	: arr[3],
								'max-price'		: arr[4],
								'min-price'		: arr[5],
								'close-price'	: arr[10],
								'yestoday-price': arr[11],
								'amount'		: tool.num_to_str(arr[14],0),
								'volume'		: tool.num_to_str(arr[15],0),
								'buy'			: arr[7],
								'sell'			: arr[8],
								'buy-amount'	: tool.num_to_str(arr[12],0),
								'sell-amount'	: tool.num_to_str(arr[13],0),
								'amt'			: amt === 0 ? "--" : tool.plus(tool.num_to_str(amt,2)) + "%",
								'amt-value'		: amt === 0 ? "--" : tool.plus(tool.num_to_str(arr[9] - arr[11] ,toFixedNumber))
							}

					}
				})() : {
					'price'			: "--",
					"cls"			: config.marks[tool.get_status(0)],
					'time'			: "--",
					'open-price'	: "--",
					'max-price'		: "--",
					'min-price'		: "--",
					'close-price'	: "--",
					'yestoday-price': "--",
					'amount'		: "--",
					'volume'		: "--",
					'buy'			: "--",
					'sell'			: "--",
					'buy-amount'	: "--",
					'sell-amount'	: "--",
					'amt'			: "--",
					'amt-value'		: "--"
				});
				return obj;
			},
			/**
			 @description 根据数据渲染视图
			 @param {Object} data 数据对象;
			 */
			render:function(data,type){
				if(data.length > 2){
					var hq_field = config.futures_hq.fields,
						cache_obj = modular.futures_hq.cache_obj;
					//缓存查找的dom对象;
					if(!cache_obj){
						cache_obj = modular.futures_hq.cache_obj = {};
						$.each(hq_field,function(key,val){
							cache_obj[val] = $(config.ids.box_futures_hq_wrap).find("." + val);
						});
					}
					var data_obj = modular.futures_hq.lqf_format(data,type);
					$.each(cache_obj,function(key,obj){
						if(obj.size() > 0 && data_obj[key]){
							if($.inArray(key,config.futures_hq.mark_fields) >= 0){
								$.each(config.marks,function(k,v){
									if($(obj).hasClass(v)){
										$(obj).removeClass(v);
									}
								});
								$(obj).addClass(data_obj["cls"]);
							}
							$(obj).text(data_obj[key]);
						}
						//涨红跌绿
						if(obj.size() > 0 && !data_obj[key]){
							$(obj).removeClass().addClass(data_obj["cls"]);
						}
					});
				}
			},
			/**
			 @description 获取基金信息
			 */
			get_futures_hq:function(){
				var code = modular.format_code(futures_app.code,type = futures_app.type);
				(function(){
					StockHq.get_hq({stocks:[code]},function(data){
						modular.futures_hq.render(data.str[code],type);
					});
					setTimeout(arguments.callee,modular.futures_hq.delay);
				})();
			}
		},
		/**
		 @description 下拉列表数据
		 */
		select:{
			query_history:function(options){
				var jys = $(options.jys).val(),
					breed = options.type * 1 == 0 ? $(options.pz).val() : $(options.hy).val(),
					type = ["global","inner","cffex"][options.type];
				if(jys == 0){
					alert(config.txt.select_futures);
					return;
				}else{
					var opt = {
						jys:$(options.jys).val(),
						pz:$(options.pz).val(),
						hy:options.type * 1 == 0 ? "" : $(options.hy).val(),
						breed:breed,
						type:type,//期货类型
						start:options.start,
						end:options.end
					};
					window.open(config.api.get_history + $.param(opt), "_blank");
				}
			},
			query:function(options) {
				var code = options.code,
					tmpl = modular.helper.tmpl,
					url;
				if (code.indexOf("CFF_IF") >= 0) {
					code = code.replace("CFF_", "");
					url = tmpl(config.select.urls["outer"],{code:code})
				} else {
					url = tmpl(config.select.urls["inner"],{code:code})
				}
				window.open(url, '_self');
			},
			change:function(options){
				var obj = options.obj,
					child = options.child,
					sub_child = options.sub_child,
					tmpl = modular.helper.tmpl,
					type = options.type,
					val = $(obj).val();
				child.empty();
				switch(type){
					case "pz":
						if(val !== "0"){
							var pz = jys_data.pz[val];
							$.each(pz,function(i,v){
								child.append(tmpl(config.select.tmpl,{value:i,name:v}));
							});
							//判断是否为外盘期货和内盘期货;
							if($.inArray(futures_app.type * 1,[1,2]) >= 0 ){
								sub_child.empty();
								var index = child.find("option").eq(0).attr("value"),
									hy = jys_data.hy[index];
								$.each(hy,function(i,v){
									sub_child.append(tmpl(config.select.tmpl,{value:i,name:v}));
								});
							};
						}else{
							modular.select.reset(child,"pz");
							modular.select.reset(sub_child,"hy");
						}
						break;
					case "hy":
						//判断是否为外盘期货和内盘期货;
						if($.inArray(futures_app.type * 1,[1,2]) >= 0 ){
							var hy = jys_data.hy[val];
							$.each(hy,function(i,v){
								child.append(tmpl(config.select.tmpl,{value:i,name:v}));
							});
						}
						break;
				}
			},
			reset:function(obj,type){
				var tmpl = modular.helper.tmpl;
				$(obj).empty().append(tmpl(config.select.tmpl,{value:0,name:config.jys[type]}));
			},
			init:function(){
				//是否已经加载了jys数据;
				if(jys_data){
					var type = futures_app.type,
						tmpl = modular.helper.tmpl,
						select_jys = $("." + config.clses.select_jys).attr("data-type",type),
						select_pz = $("." + config.clses.select_pz);
					select_hy = $("." + config.clses.select_hy);
					select_jys.empty();
					select_pz.empty();
					select_hy.empty();
					//交易所
					$.each(select_jys,function(m,obj){
						$(obj).append(tmpl(config.select.tmpl,{value:0,name:config.jys.jys}));
						$.each(jys_data.jys,function(i,v){
							$(obj).append(tmpl(config.select.tmpl,{value:i,name:v}));
						});
					});
					//品种
					$.each(select_pz,function(m,obj){
						modular.select.reset(obj,"pz");
					});
					//根据type决定select的显示 ;
					if(type * 1 == 0 ){
						select_hy.remove();
					}else{
						//合约
						$.each(select_hy,function(m,obj){
							modular.select.reset(obj,"hy");
						});
					}
				}
			}
		},
		/**
		 @description 获取其他期货信息
		 */
		other_futures:{
			delay:3000,
			contract_len:10,
			cache_render:{},
			/**
			 @description 根据数据渲染视图
			 @param {Object} data 数据对象;
			 */
			render:function(tag,data,arr_code,futures_type){
				var options = config.other_futures,
					tool =  modular.helper,
					hq_arr = [],
					tmpl_options = {
						data:{tag:tag,type:futures_type * 1},
						tmpl:options.tmpl,
						container:options.containers[tag]
					},
					_format = function(tag,arr){
						var a_obj = {
							code:"--",
							name:"--",
							price:"--",
							amt:"--",
							cls:config.marks[0]
						};
						switch(tag){
							case "month":
								switch(futures_type * 1){
									case 0:
										if(arr.length > 2){
											$.extend(a_obj,{
												name:arr[14],
												code:arr[0].substring(3),//截去hf_
												price:arr[1] === 0 ? "--" : tool.num_to_str(arr[1],2),
												amt: arr[2] === 0 ? "--" : tool.num_to_str(arr[2],2,"%"),
												cls: config.marks[tool.get_status(arr[2])]
											});
										}
										break;
									case 3:
										if(arr.length > 2){
											var amt = !!(arr[2] * 1) == false ? 0 :  tool.plus(tool.num_to_str((arr[2] - arr[4]) / arr[4] * 100,4));
											$.extend(a_obj,{
												name:arr[10],
												code:arr[0],
												price:arr[2] === 0 ? "--" : tool.num_to_str(arr[2],4),
												amt: amt === 0 ? "--" : amt + "%",
												cls: config.marks[tool.get_status(amt)]
											});
										}
										break;
									case 2:
										if(arr.length > 2){
											var amt = !!(arr[4] * 1) == false ? 0 :  tool.plus(tool.num_to_str((arr[4] - arr[15]) / arr[15] * 100,2));
											$.extend(a_obj,{
												//name:(name = (/CFF_RE_TF/g).test(arr[0])?arr[0].replace(/CFF_RE_TF/g,"国债"):arr[0].replace(/CFF_RE_IF/g,"期指")),
												name:(name = arr[0].replace(/CFF_RE_TF/g,"5国债").replace(/CFF_RE_IF/g,"IF").replace(/CFF_RE_T/g,"10国债").replace(/CFF_RE_IH/g,"IH").replace(/CFF_RE_IC/g,"IC")),
												code:arr[0].replace(/CFF_RE_/g,""),
												price:amt === 0 ? "--" : tool.num_to_str(arr[4],1),
												amt: amt === 0 ? "--" : amt + "%",
												cls: config.marks[tool.get_status(amt)]
											});
										}
										break;
									default:
										if(arr.length > 2){
											var amt = !!(arr[9] *1 ) == false ? 0 :  tool.plus(tool.num_to_str((arr[9] - arr[11]) / arr[11] * 100,2));
											$.extend(a_obj,{
												name:arr[1],
												code:arr[0],
												price:amt === 0 ? "--" : arr[9],
												amt: amt === 0 ? "--" : amt + "%",
												cls: config.marks[tool.get_status(amt)]
											});
										}
								}
								break;
							case "contract":
								if(arr.length > 2){
									var amt = !!(arr[9] *1 ) == false ? 0 :  tool.plus(tool.num_to_str((arr[9] - arr[11]) / arr[11] * 100,2));
									$.extend(a_obj,{
										name:arr[1],
										code:arr[0],
										price:amt === 0 ? "--" : arr[9],
										amt: amt === 0 ? "--" : amt + "%",
										cls: config.marks[tool.get_status(amt)]
									});
								}
								break;
							case "current":
								var code = arr[0].substring(3),
									a_obj = {
										name:futures_app.current_futures[code],
										code:code,
										price:"--",
										amt:"--",
										cls:config.marks[0]
									};
								if(arr.length > 2){
									$.extend(a_obj,{
										name:futures_app.current_futures[code],
										code:code,
										price: tool.num_to_str(arr[1],2),
										amt: tool.plus(tool.num_to_str(arr[2],2)) + "%",
										cls: config.marks[tool.get_status(arr[2])]
									});
								}
								break;
							case "stock":
							case "rate":
								if(arr.length > 2){
									var amt = !!(arr[3] * 1) == false ? 0 :  tool.plus(tool.num_to_str((arr[4] - arr[3]) / arr[3] * 100,2));
									$.extend(a_obj,{
										name:arr[1],
										code:arr[0],
										price: tool.num_to_str(arr[4],2),
										amt: amt === 0 ? "--" : amt + "%",
										cls: config.marks[tool.get_status(amt)]
									});
								}
								break;
						}
						return a_obj;
					};
				if(!modular.other_futures.cache_render[tag]){
					$.each(data,function(k,arr){
						if($.inArray(k,arr_code) >= 0){
							var a_obj = _format(tag,arr);
							hq_arr.push(a_obj);
						}
					});
					tmpl_options.data.data = hq_arr;
					$(control).trigger("onRender",[tmpl_options]);
					//用以缓存后面查找的dom对象;
					modular.other_futures.cache_render[tag] = {};
				}else{
					var cache = modular.other_futures.cache_render[tag];
					$.each(data,function(k,arr){
						if($.inArray(k,arr_code) >= 0){
							var a_obj = _format(tag,arr),
								cls = a_obj["cls"];
							if(!cache[k]){
								cache[k] = {
									"obj":$(["#futures","code",tag,k].join("-"))
								}
							}
							delete a_obj["cls"];
							delete a_obj["name"];
							delete a_obj["code"];
							if((cache_k = cache[k]["obj"]).size() == 1){
								var temp_cls = cache_k.attr("data-cls");
								if(temp_cls !== cls){
									cache_k.attr("data-cls",cls).removeClass(temp_cls).addClass(cls);
								}
								$.each(a_obj,function(m,n){
									if(!cache[k][m]){
										cache[k][m] = cache[k]["obj"].find("." + m);
									}
									var item = cache[k][m];
									if(item.size() == 1){
										item.text(n);
									}
								});
							}
						}
					});
				}
			},
			get_hq:function(){
				var contract_code = futures_app.main_contract.concat([]).splice(0,modular.other_futures.contract_len),
					month_type = futures_app.inner_futures_per_month.type,
					current_code = [],
					month_code = [],
					all_code = [],
					stock_code = futures_app.relate_stock,
					exchange_rate_code = futures_app.exchange_rate_symbol;
				$.each(futures_app.current_futures,function(k,v){
					current_code.push(modular.format_code(k,0));
				});
				//inner_per_month;
				$.each(futures_app.inner_futures_per_month.data,function(k,v){
					month_code.push(modular.format_code(v,month_type));
				});
				if(stock_code.length <= 0){
					$(config.ids.box_relate_stock_wrap).hide();
				}else{
					all_code = [].concat(stock_code).concat(contract_code).concat(current_code);
				}
				if(month_code.length > 0){
					all_code = all_code.concat(month_code);
				}
				var obj_arr = {
					"contract":contract_code,
					"current":current_code,
					"month":month_code,
					"stock":stock_code,
					"rate":exchange_rate_code
				},i = 0;
				(function(){
					if(!modular.other_futures.has_get){
						$.each(obj_arr,function(key,arr){
							if(arr.length > 0 ){
								setTimeout(function(){
									StockHq.get_hq({stocks:arr},function(data){
										modular.other_futures.render(key,data.str,arr,key == "month" ? month_type : "");
									});
								},(100 + ((i++) - 1) * 50));
								if(i== 5){
									modular.other_futures.has_get = true;
								}
							}
						});
					}else{
						StockHq.get_hq({stocks:all_code},function(data){
							$.each(obj_arr,function(key,arr){
								if(arr.length > 0 ){
									setTimeout(function(){
										modular.other_futures.render(key,data.str,arr,key == "month" ? month_type : "");
									},(i++) * 10);
								}
							});
						});
					}
					setTimeout(arguments.callee,modular.other_futures.delay);
				})();
			}
		},
		calc:{
			calc:function(options){
				var unit_p = options.unit_p,
					unit_i = options.unit_i,
					select_i = options.select_i,
					select_p = options.select_p,
					unit_p_v = $.trim(unit_p.val()),
					unit_i_v = $.trim(unit_i.val());
				var _calc = function(val,obj,exchange){
					if (/[\d\.]+/.test(val) == true) {
						obj.val((val * exchange).toFixed(2));
					}else {
						obj.val("--");
					}
				};
				if ( unit_p_v !== "") {
					_calc(unit_p_v,unit_i,select_p.val())
				}else if(unit_i_v !== "") {
					_calc(unit_i_v,unit_p,1 / select_p.val())
				}
			},
			render:function(data){
				var options = config.calc,
					_change = function(context,swap_p,swap_i){
						var swap_p = config.clses[swap_p],
							swap_i = config.clses[swap_i];
						$(context).find("." + swap_p).bind("change.onSelect",function(e){
							var index = $(this).get(0).selectedIndex,
								select_tag = $(this).find("option").eq(index).attr("data-tag");
							$(context).find("." + swap_i + " option[data-tag='" + select_tag + "']").attr("selected",true);
							e.preventDefault();
						});
					},
					tmpl_options = {
						data:{
							exchange:data[9] * 1,
							data:config.calc.data
						},
						tmpl:options.tmpl,
						container:options.container,
						callback:function(context){
							_change(context,"select_popular","select_international");
							_change(context,"select_international","select_popular");
						}
					};
				$(control).trigger("onRender",[tmpl_options]);
			},
			get_exchange:function(){
				StockHq.get_hq({stocks:[config.calc.exchange_base]},function(data){
					modular.calc.render(data.str[config.calc.exchange_base]);
				});
			}
		},
		/**
		 @description 获取微博信息模块
		 */
		weibo:{
			/**
			 @description 根据数据渲染视图
			 @param {Object} data 数据对象;
			 */
			render:function(data){
				var tmpl_options = config.weibo,
					options = {
						data:data,
						tmpl:tmpl_options.tmpl,
						container:tmpl_options.container
					};
				$(control).trigger("onRender",[options]);
			},
			/**
			 @description 获取微博信息
			 @param {String} key 基金名称;
			 @param {String} code 基金代码;
			 */
			get_weibo:function(key,code){
				var fund_key = key;
				$.loadScript(config.api.get_weibo,{q:encodeURIComponent(key)}, function(data){
					var len = data.statuses.length;
					if(len <= 3){
						fund_key = config.weibo.default_key;
						$.loadScript(config.api.get_weibo,{q:encodeURIComponent(fund_key)}, function(res){
							res.key = fund_key;
							res.total_number = res.statuses.length;
							modular.weibo.render(res);
						});
					}else{
						data.key = fund_key;
						data.total_number = len;
						modular.weibo.render(data);
					}
				});
			},
			/**
			 @description 正则替换//@、##、url为链接
			 */
			replace:function(text){
				return text.replace(/@([0-9a-zA-Z\u4e00-\u9fa5\-]*)/g,function(arg$,arg$1){
					return '<a href="http://weibo.com/n/' + arg$1 + '" target="_blank">@' + arg$1 + '</a>';
				}).replace(/#(.*?)#/g,function(arg$,arg$1){
					return '<a href="http://weibo.com/k/' + arg$1 + '" target="_blank">' + arg$ + '</a>';
				}).replace(/http:\/\/(sinaurl|t).cn\/[0-9a-zA-Z]{1,}/g,function($1){
					return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
				});
			}
		},
		/**
		 @description exponent module
		 */
		exponent:{
			cache_code_arr:[],
			cache_gxzs_obj:{},
			cache_gxzs_arr:[],
			clear_timer:function(){
				if(modular.exponent.get_exponent_hq_timer){
					clearTimeout(modular.exponent.get_exponent_hq_timer);
				}
				if(modular.exponent.get_exponent_timer){
					clearTimeout(modular.exponent.get_exponent_timer);
				}
			},
			/**
			 @description 获取指数贡献内容;
			 @param {Object} opt 请求参数;
			 */
			get_exponent:function(opt,callback){
				$.getJSONP(config.api.exponent_api, config.services['exponent'],opt,function(result){
					if($.isFunction(callback)){
						callback(result);
					}
				});
			},
			/**
			 @description 根据上下文更新数据
			 @param {Object} 需要更新的上下文
			 */
			update:function(context){
				var stock_arr = modular.exponent.cache_code_arr;
				var _render = function(code,obj,tag){
					var row_id = "#stock-exponent-" + code;
					var row = $(context).find(row_id);
					if(row.size() == 1){
						row.addClass(tag);
						$.each(obj,function(k,j){
							var cell = row.find(".stock-exponent-" + k),
								val = j;
							if(k == "amt"){
								val = modular.helper.num_to_str(j,2,k == "amt" ? "%" : "");
							}else{
								val = modular.helper.num_to_str(j,2);
							}
							cell.text(val);
						});
					}
				};
				modular.exponent.clear_timer();
				//每隔1分钟更新权重;
				modular.exponent.get_exponent_timer = setTimeout(function(){
					modular.exponent.get_exponent_info({});
				},60 * 1000);
				//获取行情串;
				(function(){
					StockHq.get_hq({stocks:stock_arr},function(data){
						var hq_str = data.str;
						$.each(hq_str,function(key,hq){
							var obj = {
								price:hq[4],
								change:hq[4] * 1 == 0 ? "--" : hq[4] - hq[3],
								amt:hq[4] * 1 == 0 ? "--" : (hq[4] - hq[3]) * 100 / hq[4]
							};
							//更新modular.exponent.cache_gxzs_obj;
							var gxzs_obj = modular.exponent.cache_gxzs_obj[hq[0]],
								gxzs_arr = modular.exponent.cache_gxzs_arr;
							if(modular.exponent.cache_gxzs_obj[hq[0]] && gxzs_arr.length < 5){
								gxzs_obj.name = hq[1];
								gxzs_arr.push(gxzs_obj);
							}
							var tag = config.marks[modular.helper.get_status(hq[4] == 0 ? 0 : hq[4] - hq[3])];
							_render(hq[0],obj,tag);
						});
					});
					modular.exponent.get_exponent_hq_timer = setTimeout(arguments.callee,6000);
				})();
			},
			store:function(code,gxzs){
				modular.exponent.cache_code_arr.push("sh" + code);
				modular.exponent.cache_gxzs_obj["sh" + code] = {name:'',gxzs:modular.helper.num_to_str(gxzs,2)};
				return "sh" + code;
			},
			/**
			 @description 获取沪深贡献指数信息
			 @param {Object} 请求的参数
			 */
			get_exponent_info:function(opt){
				var config_exponent = config.exponent.list;
				var param = $.extend({},opt,{rn:new Date().getTime()});
				modular.exponent.get_exponent(param,function(result){
					modular.exponent.cache_code_arr = [];
					modular.exponent.cache_gxzs_obj = {};
					modular.exponent.cache_gxzs_arr = [];
					$(control).trigger('onRender',[{
						container:config_exponent['container'],
						data:result,
						tmpl:config_exponent.tmpl,
						callback:function(context){
							modular.exponent.update(context);
						}
					}]);
				});
			}
		},
		/**
		 @description 专家答疑模块
		 */
		expert_questions:{
			render:function(data){
				var tmpl_options = config.expert_questions,
					options = {
						data:data,
						tmpl:tmpl_options.tmpl,
						container:tmpl_options.container
					};
				$(control).trigger("onRender",[options]);
			},
			init:function(){
				if(futures_app.expert_questions){
					var tool = modular.helper;
					tool.get_date_time(function(date){
						var current = date.getDay(),
							data = {
								data:futures_app.expert_questions,
								current:current == 0 ? 1 : current == 6 ? 1 :current
							};
						modular.expert_questions.render(data);
					});
				}
			}
		},
		/**
		 @description 期货行情flash模块
		 */
		hq_flash:{
			delay:60 * 1000,
			render:function(data){
				var tmpl_options = config.ipad_hq_img,
					options = {
						data:data,
						tmpl:tmpl_options.tmpl[futures_app.type],//根据不同type选择不同的模板
						container:tmpl_options.container,
						callback:function(context){
							var tab_container = context.find("." + config.clses.box_tab),
								hq_flash = modular.hq_flash;
							if(tab_container.size()){
								var tab_hq_img = new TabSwitch({
									context:tab_container[0]
								});
								tab_hq_img.goto(0);
							}
						}
					};
				$(control).trigger("onRender",[options]);
			},
			get_status:function(type,callback){
				var param = {
					rn:new Date().getTime(),
					list:type
				};
				$.getScript(config.api.hq_url + $.param(param),function(){
					var data = window["hq_str_" + type],
						arr_temp,
						obj_status = {
							festival:{},
							holiday:{},
							normal:[]
						};
					if(data){
						arr_temp = data.split("|")[1].replace(/;$/, "").split(";");
						$.each(arr_temp,function(i,str_status){
							temp_str = str_status = str_status.split(",");
							if(temp_str[0] == "*"){
								obj_status.normal.push([temp_str[1],temp_str[2],temp_str[3]]);
							}else if(temp_str[0].substr(0, 1) == "w"){
								obj_status.holiday["'"+temp_str[0].substr(1, 1) + "'"] = temp_str[3];
							}else{
								obj_status.festival[temp_str[0]] = temp_str[3];
							}
						});
					}
					if($.isFunction(callback)){
						callback(obj_status);
					}
				});
			},
			load_img:function(){
				var type = config.ipad_hq_img.types[futures_app.type],
					rand = new Date().getTime();
				switch(futures_app.type * 1){
					case 0:
						var data = {
							code:futures_app.code,
							rand:new Date().getTime()
						};
						modular.hq_flash.render(data);
						break;
					case 1:
					case 2:
						modular.hq_flash.get_status(type,function(obj_status){
							//获取服务器时间戳；
							modular.helper.get_date_time(function(date){
								modular.hq_flash.timer = date.getTime();
								//获取时差;
								modular.helper.get_time_zone(function(){
									var tool = modular.helper,
										arr_date_time = [
											date.getFullYear(),tool.fix_zero(date.getMonth() + 1),
											tool.fix_zero(date.getDate())
										],
										day = date.getDay(),
										current_date = arr_date_time.join("-");
									//节日
									if(obj_status[current_date]){
										var data = {
											status:obj_status[current_date],
											code:futures_app.code,
											rand:new Date().getTime()
										};
										modular.hq_flash.render(data);
										//假期
									}else if(obj_status[day]){
										var data = {
											status:obj_status[current_date],
											code:futures_app.code,
											rand:new Date().getTime()
										};
										modular.hq_flash.render(data);
									}else{
										(function(){
											var time_offset = ((-1 * (new Date()).getTimezoneOffset()) - (config.ipad_hq_img.bj_time_zone * 60)) * 60000;
											new_date = new Date(modular.hq_flash.timer + getGlobalTimezone("CN") * 3600000 - time_offset);
												diff = new_date.toString().match(/\d{2}:\d{2}:\d{2}/)[0];
												status = "";
											$.each(obj_status.normal,function(i,arr){
												if(diff > arr[0] && diff < arr[1]){
													status = arr[2];
												}
											});
											var data = {
												status:status,
												code:futures_app.code,
												rand:new Date().getTime()
											};
											modular.hq_flash.render(data);
											modular.hq_flash.timer += modular.hq_flash.delay;
											setTimeout(arguments.callee,modular.hq_flash.delay);
										})();
									}
								});
							});
						});
						break;
				}
			},
			init:function(){
				//判断支持FL、H5
				var h5Test = document.createElement('canvas');
				var oldChart=document.getElementById('btn-old-chart');

				function initH5Chart(){
					KKE.api('plugins.sinaTKChart.get',{
						symbol:'hf_'+futures_app.code,//证券代码 sh600650
						dom_id:'box-flash-wrap'//放置图形的dom容器id
					});

					oldChart.href=oldChart.href.replace('$symbol',futures_app.code)+'?showflash';
					oldChart.innnerText='查看旧版行情图';
				}

				function initFlashChart(){
					swfobject.embedSWF( futuresFlashUrl + (document.all ? "?_=" + (+new Date()) : ''), "box-flash-wrap", "558", "410", "10.0.0", "http://i2.sinaimg.cn/cj/swf/20100612/expressInstall.swf",
						{symbol:futures_app.code},
						{
							wmode: "transparent",
							allowScriptAccess: "always",
							allowFullScreen: "true"
						},
						{}
					);

					oldChart.href=oldChart.href.replace('$symbol',futures_app.code)+'?showhtml5';
					oldChart.innerText='查看新版行情图';
				}

				function initChart(){

					if ((h5Test.getContext && h5Test.getContext('2d'))) {
						initH5Chart();
					} else {
						if(!modular.helper.apple_kit() && swfobject && typeof futuresFlashUrl !== "undefined"){
							initFlashChart();
						}else{
							modular.hq_flash.load_img();
						}
					}
				}

				if(location.search.indexOf('showhtml5')>-1){
					initChart();
				}else if(location.search.indexOf('showflash')>-1){
					initFlashChart();
				}else{
					initChart();
				}
			}
		},
		/**
		 @description FusionCharts模块
		 */
		fusion_charts:{
			init:function(){
				var ids = config.ids;
				if($.inArray(futures_app.type,[1,2]) >= 0){
					//成交持仓分析flash;
					(function (breed,date) {
						var myChart1 = new FusionCharts("http://i0.sinaimg.cn/dy/fusioncharts/v3_2_2/o_swf/Pie2D.swf?PBarLoadingText=Loading&XMLLoadingText=Loading&ParsingDataText=Loading", "FusionCharts1", "230","260", "0", "0");
						$.loadScript("http://biz.finance.sina.com.cn/futures/hold/detail_img_2013.php?",{
								t_breed:breed,
								t_date:date,
								img_type:"deal",
								list:0
							},
							function(data){
								myChart1.setDataXML(data);
								myChart1.render(ids.box_flash_deal);
							});
						var myChart2 = new FusionCharts("http://i0.sinaimg.cn/dy/fusioncharts/v3_2_2/o_swf/Pie2D.swf?PBarLoadingText=Loading&XMLLoadingText=Loading&ParsingDataText=Loading", "FusionCharts2", "230","260", "0", "0");
						$.loadScript("http://biz.finance.sina.com.cn/futures/hold/detail_img_2013.php?",{
								t_breed:breed,
								t_date:date,
								img_type:"buy",
								list:0
							},
							function(data){
								myChart2.setDataXML(data);
								myChart2.render(ids.box_flash_buy);
							});

						var myChart3 = new FusionCharts("http://i3.sinaimg.cn/dy/fusioncharts/v3/flash/Pie2D.swf?PBarLoadingText=Loading&XMLLoadingText=Loading&ParsingDataText=Loading", "FusionCharts3", "230","260", "0", "0");
						$.loadScript("http://biz.finance.sina.com.cn/futures/hold/detail_img_2013.php?",{
								t_breed:breed,
								t_date:date,
								img_type:"sell",
								list:0
							},
							function(data){
								myChart3.setDataXML(data);
								myChart3.render(ids.box_flash_sell);
							});
					})(futures_app.hold_flash_code,futures_app.transcation_date);
				}
			}
		},
		/**
		 @description 投票模块
		 */
		vote:{
			get_vote:function(url,opt,callback){
				var param = $.param(opt),url = url + param;
				$.getScript(url,function(){
					if($.isFunction(callback)){
						callback();
					}else{
						var data = {},arr = [];
						for(var i in Question_futures){
							data.question = i;
						};
						for(var i in Data_futures[data.question]){
							var text = Option_futures[data.question][i],
								num = Data_futures[data.question][i];
							arr.push({value:i,text:text,num:num});
						};
						arr.sort(function(a,b){
							return b.num - a.num
						});
						data.total = Num_futures;
						data.data = arr;
						modular.vote.render(data);
					}
				})
			},
			render:function(data){
				var tmpl_options = config.vote;
				var options = {
					data:data,
					tmpl:tmpl_options.tmpl,
					container:tmpl_options.container
				};
				$(control).trigger("onRender",[options]);
			}
		},
		/**
		 @description 帮助工具
		 */
		helper:{
			/**
			 @description 根据数值添加前缀
			 @param {Number} val 需要添加的数值
			 */
			plus:function(val){
				return val > 0 ? "+" + val : val
			},
			/**
			 @description 格式化数值对象
			 @param {Number} val 需要格式化的数值
			 @param {Number} decimal 需要截取的小数位数
			 @param {String} unit 数值单位
			 */
			num_to_str:function (val, decimal, unit ){
				var amt = parseFloat( val );
				return ( isNaN( amt ) )  ? "--" : ( ( decimal === undefined ? amt : amt.toFixed( decimal ) ) + (unit || "") );
			},
			/**
			 @description 格式化时间对象
			 @param {Date} date 需要格式化的时间对象
			 */
			parse_time: function(date){
				var temp_date = date.split(" ");
				temp_date[4] = "UTC" + temp_date[4],
					min_seconds = Date.parse(temp_date.join(" ")),
					date = new Date(min_seconds),
					temp_arr = ["","月","","日"," ","",":",""];
				temp_arr[0] = date.getMonth() + 1;
				temp_arr[2] = date.getDate();
				temp_arr[5] = date.getHours();
				temp_arr[5] = temp_arr[5] < 10 ? "0" + temp_arr[5] : temp_arr[5];
				temp_arr[7] = date.getMinutes();
				temp_arr[7] = temp_arr[7] < 10 ? "0" + temp_arr[7] : temp_arr[7];
				return temp_arr.join("");

			},
			/**
			 @description 比较数值
			 @param {Number} amt 需要比较的数值
			 @param {Number} base 比较的基数
			 */
			get_status:function( amt,base ){
				var base = parseFloat( base || 0 );
				amt = parseFloat( amt );
				if(isNaN(amt) || amt == base){
					return 0;
				}else if(amt > base){
					return 1;
				}else{
					return 2;
				}
			},
			/**
			 @description 计算字符串长度(一个中文算作两个英文字符)
			 @param {String} val 需要计算的字符串
			 @param {Number} max 计算的最大长度
			 */
			calc_size:function(val,max){
				var len = val.replace(/[^\x00-\xff]/g,'**').length,
					less = max * 2 - len,
					reminder;
				less = less / 2;
				if(less >= 0){
					reminder = Math.floor(less);
				}else{
					reminder = Math.ceil(-less);
				}
				return {reminder:reminder,overflow:(less >=0 )}
			},
			/**
			 @description 从服务器获取时间
			 @param {Funciton} callback 处理时间的回调函数
			 */
			get_date_time:function(callback){
				$.getScript('http://hq.sinajs.cn/?format=json&func=window.StandardBJTime=hq_json_sys_time;if%28typeof%28StandardBJTime_Callback%29==%27function%27%29StandardBJTime_Callback%28%29;&list=sys_time',function(){
					var time = window.StandardBJTime;
					if(time){
						var milseconds = time * 1000;
						var date = new Date();
						date.setTime(milseconds);
						if($.isFunction(callback)){
							callback(date)
						}
						delete time
					}
				});
			},
			/**
			 @description 从服务器获取时差
			 @param {Funciton} callback 处理时差的回调函数
			 */
			get_time_zone:function(callback){
				var url = 'http://stock.finance.sina.com.cn/misc/userapi/timezone.php?dpc=1';
				$.getScript(url,function(){
					if($.isFunction(callback)){
						callback();
					}
				});
			},
			/**
			 @description 截取字符串
			 @param {String} str 需要截取的字符串
			 @param {Number} max 截取的最大长度
			 @param {String} postfix 字符串后缀
			 */
			cut_str:function(str,max,postfix){
				var calc_str_size = function(str){
					return str.replace(/[^\x00-\xff]/g,"**").length
				};
				var reg = /[^\x00-\xff]/g,
					reg_char = /[^\x00-\xff]/,
					len = str.length,
					char_cn = 0,
					char_en = 0,
					size = calc_str_size(str);
				if(!postfix){
					diff = 0;
					postfix = "";
				}else{
					diff = 1;
				}
				while(reg.test(str)){
					char_cn += 1;
				}
				char_en = len - char_cn;
				if(size <= max * 2){
					return str;
				}else{
					if(char_cn == 0){
						var temp_str = str.substring(0,(max - diff) * 2);
						return (typeof postfix !== 'undefined') ? temp_str + postfix : temp_sr;
					}else{
						if(char_en == 0){
							var temp_str = str.substring(0,max - diff);
							return (typeof postfix !== 'undefined') ? temp_str + postfix : temp_sr;
						}else{
							var slice = 0,
								limit = (max - diff) * 2;
							temp_str = '';
							for(var i=0;i<len;i++){
								if(slice < limit){
									var char = str.charAt(i);
									if(reg_char.test(char)){
										slice += 2;
									}else{
										slice += 1;
									}
									temp_str += char;
								}else{
									break
								}
							}
							return (typeof postfix !== 'undefined') ? temp_str + postfix : temp_str;
						}
					}
				}
			},
			fix_zero:function (num) {
				return (num * 1 < 10 ? "0" : "") + num.toString();
			},
			apple_kit:function(){
				return arguments.callee.is_apple || (arguments.callee.is_apple = (/iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ));
			},
			/**
			 @description 模板渲染函数
			 @param {String} str 字符串模板
			 @param {Object} data 数据对象
			 */
			tmpl:(function(){
				var cache = {};
				var tmpl = function tmpl(str, data){
					var fn = !/\W/.test(str) ?
						cache[str] = cache[str] || tmpl(str) :
						new Function("obj",
							"var p=[],print=function(){p.push.apply(p,arguments);};" +
							"with(obj){p.push('" +
							str
								.replace(/[\r\t\n]/g, " ")
								.split("<%").join("\t")
								.replace(/((^|%>)[^\t]*)'/g, "$1\r")
								.replace(/\t=(.*?)%>/g, "',$1,'")
								.split("\t").join("');")
								.split("%>").join("p.push('")
								.split("\r").join("\\'")
							+ "');}return p.join('');");
					return data ? fn( data ) : fn;
				};
				return tmpl;
			})()
		},
		/**
		 @description 模块初始化函数
		 */
		init:function(){
			//行情flash;
			modular.hq_flash.init();
			//获取汇率;
			modular.calc.get_exchange();
			//初始化select的数据
			modular.select.init();
			modular.latset_hot_futures.init(futures_app.code);
			//更新行情信息（实时，更新时间：3秒）
			modular.futures_hq.get_futures_hq();
			//其他相关行情
			modular.other_futures.get_hq();
			//专家答疑;
			modular.expert_questions.init();
			//FusionCharts
			modular.fusion_charts.init();
			//获取微博信息;
			modular.weibo.get_weibo(futures_app.name,futures_app.code);
			//获取投票信息
			modular.vote.get_vote(config.api.vote,{p_mark:"futures_survey",suffix:"futures",i_mark:futures_app.vote_code});
			//获取行业贡献指数;
			if(futures_app.type * 1 == 2){
				modular.exponent.get_exponent_info({});
			}
		}
	};
	return modular;
})(jQuery);