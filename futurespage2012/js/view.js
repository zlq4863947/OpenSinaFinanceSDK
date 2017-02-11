/**
	@description 沪深300 view
	@author xingben1
	@version 0.1
*/
var view = (function($){
	var IE_6 = $.browser.msie&&($.browser.version=="6.0");
	var view = {
			delegate:function(){
				var clses = config.clses,
					ids = config.ids;
				$("body").delegate("." + clses.btn_logout,"click.onLoginOut",function(e){
					loginManger.logout();
					e.preventDefault();
				});
				//ie6 hover事件;
				if(IE_6){
					$(ids.box_latest_futures).delegate("tr","mouseover",function(e){
						$(this).addClass(clses.s_hover);
					}).delegate("tr","mouseout",function(e){
						$(this).removeClass(clses.s_hover);
					});
				};
				//显示登陆框;
				$("body").bind("onShowLogin",function(){
					if(!view.dialog_login){
						view.dialog_login = new Dialog({
								isCache:true,
								type:"tip",
								theme:'normal dialog-login',
								width:495,
								oBind:false,
								isHideOverlay:false,
								overlayOpacity:0.3,
								content:$(ids.box_login_pannel).show(),
								onClose:function(){
									loginManger.clear();
								}
						});
					};
					view.dialog_login.show();
				});
				$("body").delegate("." + clses.btn_show_login,"click.onShowLogin",function(e){
					$("body").trigger("onShowLogin",[]);
					e.preventDefault();
				});
				//登陆微博接口;
				var weibo_has_login_wrap = $(ids.box_publish_weibo).find("." + clses.has_login_wrap),
					box_publish_weibo_wrap = $(ids.box_publish_weibo_wrap),
					btn_weibo_login = $("." + clses.btn_weibo_login),
					user_name = weibo_has_login_wrap.find("." + clses.user_name),
					weibo_user_name = box_publish_weibo_wrap.find("." + clses.user_name),
					weibo_content = box_publish_weibo_wrap.find("." + clses.weibo_content),
					weibo_success = box_publish_weibo_wrap.find("." + clses.weibo_success),
					char_tip = box_publish_weibo_wrap.find("." + clses.char_tip),
					to_weibo = box_publish_weibo_wrap.find("." + clses.to_weibo),
					weibo_content_textarea = box_publish_weibo_wrap.find("." + clses.weibo_content_textarea);
				//显示微博发布框;
				$(box_publish_weibo_wrap).bind("onShow",function(){
					var left = $(this).data("left");
					if(!left){
						var offset = btn_weibo_login.offset(),
							w = $(this).outerWidth,
							h = $(this).outerHeight(),
							left = offset.left - 10,
							top = offset.top - h -10;
						$(this).data("left",left);
						$(this).data("top",top);
					};
					$(this).css({"position":"absolute","z-index":9999,left:left,top:$(this).data("top")}).show();
					//清空输入框;
					var fund_name = weibo_content_textarea.attr("data-name");
					weibo_content_textarea.val(fund_name);
					weibo_content_textarea.trigger("onCalcSize",[]);
				});
				//绑定onCalcSize事件;
				weibo_content_textarea.bind("onCalcSize",function(){
					var val = $.trim($(this).val());
					var obj = modular.helper.calc_size(val,config.send_weibo.max),
						reminder = obj.reminder,
						is_over = obj.overflow;
						if(is_over){
							var html = modular.helper.tmpl(config.send_weibo.tmpl.normal,{num:reminder});
							$(this).data("is-ok",true);
						}else{
							var html = modular.helper.tmpl(config.send_weibo.tmpl.error,{num:reminder});
							$(this).data("is-ok",false);
						};
						char_tip.empty().append(html);
				});
				//绑定keyup事件;
				weibo_content_textarea.bind("keyup.onCalc",function(){
					$(this).trigger("onCalcSize",[]);
				});
				//重置内容;
				weibo_content_textarea.bind("reset",function(){
					var name = $(this).attr("data-name");
					$(this).val(name);
					$(this).removeClass(clses.weibo_focus);
					$(this).trigger("onCalcSize",[]);
				});
				//获取焦点事件;
				weibo_content_textarea.bind("focus",function(){
					$(this).addClass(clses.weibo_focus);
				});
				//失去焦点事件;
				weibo_content_textarea.bind("blur",function(){
					var val = $.trim($(this).val()),
						name = $(this).attr("data-name");
					if(val !== name){
						$(this).addClass(clses.weibo_focus);
					}else{
						$(this).removeClass(clses.weibo_focus);
					}
				});
				//发布微博
				box_publish_weibo_wrap.delegate("." + clses.btn_publish,"click.onSendWeibo",function(e){
					var self = $(this);
					if(weibo_content_textarea.data("is-ok") && !$(this).data("is-submit")){
						var words = $.trim(weibo_content_textarea.val());
						weiboApp.publish(words,function(res,userinfo){
							self.data("is-submit",false);
							to_weibo.attr("href",'http://weibo.com/' + userinfo.id + '/profile');
							weibo_content.hide();
							char_tip.hide();
							weibo_success.show();
							setTimeout(function(){
								weibo_success.fadeOut(function(){
									weibo_content_textarea.trigger("reset",[]);
									weibo_content.show();
									char_tip.show();
								});
							},3000);
						});
					};
					e.preventDefault();
				});
				//微博登陆;
				$(ids.box_publish_weibo).delegate("." + clses.btn_weibo_login,"click.onShowWeiboLogin",function(e){
					if(!$(this).data("has-login")){
						weiboApp.login();
					}else{
						if(box_publish_weibo_wrap.data("has-show")){
							box_publish_weibo_wrap.hide();
							box_publish_weibo_wrap.data("has-show",false);
							btn_weibo_login.text(config.txt.speak);
							weibo_content_textarea.trigger("reset",[]);
						}else{
							//box_publish_weibo_wrap.show();
							$(box_publish_weibo_wrap).trigger("onShow",[]);
							box_publish_weibo_wrap.data("has-show",true);
							btn_weibo_login.text(config.txt.toggle)
						}
					};
					$(this).data("has-click",true);
					e.preventDefault();
				});
				//微博登出;
				$(ids.box_publish_weibo).delegate("." + clses.btn_weibo_logout,"click.onHideWeiboLogin",function(e){
					weiboApp.logout();
					e.preventDefault();
				});
				//微博组建初始化;
				weiboApp.init({
					onLogin:function(obj){
						weibo_has_login_wrap.show();
						weibo_user_name.empty().text(obj.screen_name);
						user_name.attr("href","http://weibo.com/" + obj.profile_url).text(obj.screen_name);
						if(btn_weibo_login.data("has-click")){
							box_publish_weibo_wrap.data("has-show",true);
							$(box_publish_weibo_wrap).trigger("onShow",[]);
							btn_weibo_login.text(config.txt.toggle);
						};
						btn_weibo_login.data("has-login",true);
					},
					onLogout:function(){
						weibo_has_login_wrap.hide();
						//隐藏发布框;
						box_publish_weibo_wrap.data("has-show",false).hide();
						btn_weibo_login.data("has-login",false).text(config.txt.speak);
					}
				});
				//最近访问删除操作;
				$(ids.box_latest_futures).delegate("." + clses.btn_close,"click.onDelete",function(e){
					var code = $(this).attr("data-code"),
						type = $(this).attr("data-type");
					$(control).trigger("onDeleteLatestStock",[code,type]);
					e.preventDefault();
				});
				//专家答疑
				$(config.expert_questions.container).delegate("." + clses.experts_list + " li","click.onTab",function(e){
					var context = $(config.expert_questions.container),
						items = context.data("items"),
						current = context.find("." + clses.current),
						target = $($(this).attr("data-obj"));
					if(!items){
						context.data("items",items = context.find("." + clses.item));
					};
					items.hide();
					current.removeClass(clses.current);
					$(this).addClass(clses.current);
					target.show();
					e.preventDefault();
				});
				//日期控件;
				$(ids.date_from).datepicker($.extend(config.date_config,{
					onSelect:function(dateText, inst) {
						$(ids.date_to).datepicker('option', 'minDate' , dateText);
					}
				}));
				$(ids.date_to).datepicker($.extend(config.date_config,{
					onSelect:function(dateText, inst) {
						$(ids.date_from).datepicker('option', 'maxDate' ,dateText);
					}
				}));
				modular.helper.get_date_time(function(current_date){
					//设置初始时间;
					var timer = current_date.getTime() - 30 * 24 * 60 * 60 * 1000,
						default_date = [current_date.getFullYear(),current_date.getMonth() + 1,current_date.getDate()].join("-"),
						date = new Date();
						date.setTime(timer);
					var from_date = [date.getFullYear(),date.getMonth() + 1,date.getDate()].join("-");
					$(ids.date_from).datepicker( "setDate", from_date);
					$(ids.date_to).datepicker( "setDate", current_date).datepicker('option', 'minDate' , from_date);
				});
				//$(ids.date_to).
				//select二级联动;
				var select_jys = $("." + clses.select_jys),
					select_pz = $("." + clses.select_pz);
				select_jys.bind("change.onSelect",function(){
					var parent = $(this).closest("." + clses.fake_select_wrap),
						select_pz = parent.find("." + clses.select_pz),
						select_hy = parent.find("." + clses.select_hy);
					$(control).trigger("onSelect",[{obj:$(this),child:select_pz,sub_child:select_hy,type:"pz"}]);
				});
				select_pz.bind("change.onSelect",function(){
					var parent = $(this).closest("." + clses.fake_select_wrap),
						select_hy = parent.find("." + clses.select_hy);
					$(control).trigger("onSelect",[{obj:$(this),child:select_hy,type:"hy"}]);
				});
				//查询行情;
				$(ids.btn_query_hq).bind("click.onQuery",function(e){
					var parent = $(this).closest("." + clses.fake_select_wrap),
						select_obj = $.inArray(futures_app.type * 1,[1,2]) >= 0 ? parent.find("." + clses.select_hy) : parent.find("." + clses.select_pz); //区分外盘期货和内盘期货;
					$(control).trigger("onQuery",[{code:select_obj.val()}]);
					e.preventDefault();
				});
				//查询历史记录
				$(ids.btn_query_history).bind("click.onQueryHistory",function(e){
					var parent = $(this).closest("." + clses.fake_select_wrap),
						select_jys = parent.find("." + clses.select_jys),
						select_pz = parent.find("." + clses.select_pz),
						select_hy = parent.find("." + clses.select_hy),
						type = select_jys.attr("data-type"),
						start = $(ids.date_from).val(),
						end = $(ids.date_to).val();
					$(control).trigger("onQueryHistory",[{jys:select_jys,pz:select_pz,hy:select_hy,start:start,end:end,type:type}]);
					e.preventDefault();
				});
				//缓存期货计算器中对象;
				$(config.calc.container).bind("onCache",function(e,callback){
					if(!$(this).data("cache")){
						var context = $(config.calc.container),
							cache = {
								unit_popular 		: context.find("." + clses.unit_popular),
								unit_international	: context.find("." + clses.unit_international),
								select_international: context.find("." + clses.select_international),
								select_popular		: context.find("." + clses.select_popular)
							};
						$(this).data("cache",cache);
					};
					if($.isFunction(callback)){
						callback($(this).data("cache"));
					}
				});
				//期货计算;
				$(config.calc.container).delegate("." + clses.btn_calc,"click.onCalc",function(e){
					$(config.calc.container).trigger("onCache",[function(cache){
						$(control).trigger("onCalcExchange",[{
							unit_p:cache.unit_popular,
							unit_i:cache.unit_international,
							select_p:cache.select_popular,
							select_i:cache.select_international
						}]);
					}]);
					e.preventDefault();
				});
				//重置期货表单项
				$(config.calc.container).delegate("." + clses.btn_reset,"click.onReset",function(e){
					$(config.calc.container).trigger("onCache",[function(cache){
							cache.unit_popular.add(cache.unit_international).val("");
							cache.select_popular.find("option").eq(0).attr("selected",true);
							cache.select_international.find("option").eq(0).attr("selected",true);
						}
					]);
					e.preventDefault();
				});
			},
			init:function(opt){
				//suggest框;
				view.tab_interaction = new TabSwitch({
						context:config.ids.box_tab_interaction,
						onTab:function(){
							$(config.ids.box_publish_weibo_wrap).data("has-show",false).hide();
							$("." + config.clses.btn_weibo_login).text(config.txt.speak);
						}
				});
				view.tab_interaction.goto(0);
				//silde;
				$(config.ids.box_scroll_news).slide();
				view.delegate();
				/*$("select").fakeSelect({
					onChange:function(text,index){console.log(text);console.log(index);}
				})*/
			}
	};
	return view;
})(jQuery)