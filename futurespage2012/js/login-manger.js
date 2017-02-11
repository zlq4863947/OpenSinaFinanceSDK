if(!loginManger){
	/**
		* @description 登录管理模块
		* @require jQuery;
	*/
	var loginManger = (function($){
			var config = {
					sso:"http://i.sso.sina.com.cn/js/sinaSSOManager.js"
			};
			var tool = {
					loadScript: function(url, opt, callback){
						var script = document.createElement("script")
						script.type = "text/javascript";
						if (script.readyState){ //IE
							script.onreadystatechange = function(){
								if (script.readyState == "loaded" || script.readyState == "complete"){
									script.onreadystatechange = null;
									if($.isFunction(callback)){
										callback();
									};
									//script.parentNode.removeChild(script);
								}
							};
						} else { //Others
							script.onload = function(){
								if($.isFunction(callback)){
									callback();
								};
								//script.parentNode.removeChild(script);
							};
						};
						script.charset = opt.charset || 'UTF-8';
						script.src = url;
						document.getElementsByTagName("head")[0].appendChild(script);
					}
			}
			/**
				* @description 登录视图
			*/
			var loginView = {
					config:{
						username:"username",
						password:"password",
						savestate:"savestate",
						error:"error",
						btn_login:"btn-login"
					},
					validate:function(obj){
						var config = loginView.config,
							user = $.trim(config.user.val()),
							pwd = $.trim(config.pwd.val()),
							state = config.state.is(":checked") ? 30 : 0;
						if(user == ''){
							config.user.focus();
							return false;
						};
						if(pwd == ''){
							config.pwd.focus();
							return false;
						};
						return {username:user,password:pwd,savestate:state};
					},
					delegate:function(obj){
						var config = loginView.config;
						//验证表单;
						$(obj).bind("onvalidate",function(){
							var res = loginView.validate(obj);
							if(res && !loginView.has_login){
								loginManger.login(res.username,res.password,res.savestate);
								loginView.has_login = true;
							}
						});
						$(obj).delegate("." + config.btn_login,"click.onLogin",function(e){
							$(obj).trigger("onvalidate");
						});
						//回车提交表单;
						$(obj).bind("keydown.onSubmit",function(e){
							var keycode = e.keyCode;
							switch(keycode){
								case 13:	
									$(obj).trigger("onvalidate");
								break;
							}
						});
					},
					showError:function(obj){
						loginView.config.err.empty().text(obj.reason);
					},
					reset:function(){
						loginView.config.user.val("");
						loginView.config.pwd.val("");
						loginView.has_login = false;
					},
					clear:function(){
						loginView.config.err.empty();
					},
					set:function(config){
						if(config){
							loginView.config = $.extend(loginView.config,config);
						}
					},
					init:function(login_config){
						var obj = login_config.obj
							config = login_config.config;
						if(obj.size() !== 0 ){
							loginView.delegate(obj);
						};
						loginView.set(config);
						var config = loginView.config;
						if(!loginView.has_init){
							config.user = $(obj).find("." + config.username);
							config.pwd = $(obj).find("." + config.password);
							config.state = $(obj).find("." + config.savestate);
							config.err = $(obj).find("." + config.error);
							loginView.has_init = true;
						};
					}
			};
			/**
				* @description 管理模块
				* @require jQuery;
			*/
			var loginManger = {
					loginCallbacks:[],
					logoutCallbacks:[],
					/**
						* @description 退出登录后的回调函数
					*/
					onLogout:function(obj){
						var len = loginManger.logoutCallbacks.length;
						for(var i = 0;i <len;i++ ){
							loginManger.logoutCallbacks[i](obj);
						};
					},
					onLogFailure:function(obj){
						loginView.showError(obj);
					},
					/**
						* @description 登录
						* @param {String} username 用户名
						* @param {String} password 密码
						* @param {String} savestate 保持登录状态的天数
						* @param {String} noNotice 登录成功后不通知哪些函数，多个函数可以使用数组形式
					*/
					login:function(username,password,savestate,noNotice){
						setTimeout(function(){
							sinaSSOManager.login(function(obj){
									if(obj.result == true){
										loginManger.checkLogin();
									}else{
										loginManger.onLogFailure(obj);
									};
									//重置表单;
									loginView.reset();
								},
								username,password,savestate,noNotice);
						},10);
					},
					/**
						* @description 退出登录后的回调函数
						* @param {String} noNotice 退出登录成功后不通知哪些函数，多个函数可以使用数组形式
					*/
					logout:function(noNotice){
						setTimeout(function(){
							sinaSSOManager.logout(function(obj){
									if(obj.result == true){
										loginManger.onLogout(obj);
									}
								},noNotice);
						},10);
					},
					/**
						* @description 检测是否登录成功
					*/
					checkLogin:function(){
						//检测是否登录;
						var sup = sinaSSOManager.getSinaCookie();
						if(sup){
							loginManger.onLogin(sup);
						};
					},
					/**
						* @description 检测登录状态
					*/
					getLoginStatus:function(){
						//检测是否登录;
						var sup = sinaSSOManager.getSinaCookie();
						return sup;
					},
					/**
						* @description 登录后的回调函数
					*/
					onLogin:function(obj){
						var len = loginManger.loginCallbacks.length;
						for(var i = 0;i <len;i++ ){
							loginManger.loginCallbacks[i](obj);
						};
					},
					clear:function(){
						loginView.clear();
					},
					/**
						* @description 初始化登录;
					*/
					init:function(login_config,options,sso_config){
						if(!loginManger.has_login_sso){
							//加载sso模块;
							tool.loadScript(config.sso,{},function(){
								//登录模块验证;
								loginView.init(login_config);
								//sinaSSOManager 登录配置参数;
								var defaults = {
									service:"finance",
									entry:"finance",
									feedBackUrl:'', 
									setDomain:false,
									pageCharset:'GB2312 '
								};
								if(sso_config){
									defaults = $.extend(defaults,sso_config);
								};
								//配置参数;
								$.each(defaults,function(key,val){
									if(val !== ""){
										sinaSSOManager.config[key] = val;
									};								
								}); 
								//登陆回调函数;
								if(options.onLogin){
									loginManger.loginCallbacks.push(options.onLogin);
								};
								//退出登陆回调函数;
								if(options.onLogout){
									loginManger.logoutCallbacks.push(options.onLogout);
								};
								//检查登陆状态;
								sinaSSOManager.regStatusChangeCallBack(function(is_log){
									if(is_log){
										loginManger.checkLogin();
									}else{
										loginManger.logout();
									}
								});
								loginManger.checkLogin();
								loginManger.has_login_sso = true;
							});
						}
					}
				}
		return loginManger;
	})(jQuery);
};