/**
	* @description 微博登录管理模块
	* @require jQuery;
*/
if(!weiboApp){
	var weiboApp = (function($){
			var config = {
					url:"http://tjs.sjs.sinajs.cn/open/api/js/wb.js?",
					param:{
						appkey:'2032861517',
						charset:'utf-8'
					}
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
			};	
			var weiboApp = {
					loginCallbacks:[],
					logoutCallbacks:[],
					errorMsg:{
						'20016': '发布失败，发布内容过于频繁',
						'20017': '发布失败，刚刚发布了相似的信息',
						'20018': '发布失败，包含非法网址',
						'20019': '发布失败，刚刚发布了相同的信息',
						'20021': '发布失败，包含非法内容',
						'20111': '发布失败，不能发布相同的微博',
						'99999':'发布失败'
					},
					/**
						@description 发布微博;
					*/
					publish:function(words,callback){
						WB2.anyWhere(function (W){
							W.parseCMD('/statuses/update.json',function (sResult,bStatus){
								if(bStatus){
									if($.isFunction(callback)){
										callback(sResult,weiboApp.userinfo);
									}
								}else{
									alert(weiboApp.errorMsg[sResult.error_code] || weiboApp.errorMsg['99999'] );
								}
							},{
								source: weiboApp.param.appkey,
								status: encodeURIComponent(words)
							},{
								method: 'post'
							});
						});
					},
					login:function(){
						setTimeout(function(){
							WB2.login(function(){
								weiboApp.checkLogin();
							});
						},10);
					},
					logout:function(){
						setTimeout(function(){
							WB2.logout(function(){
								//weiboApp.checkLogin();
							});
						},10);
						setTimeout(function(){
							weiboApp.checkLogin();
						},20);
					},
					getUserInfo:function(){
						return weiboApp.userinfo;
					},
					checkLogin:function(){
						var status = WB2.checkLogin();
						//console.log(status);
						if(!weiboApp.has_login && status){
							WB2.anyWhere(function (W){
								W.parseCMD('/account/get_uid.json',function (uid){
									W.parseCMD('/users/show.json',function (info){
										weiboApp.userinfo = info;
										weiboApp.onLogin(info);
									},
									{
										source: weiboApp.param.appkey,
										uid: uid.uid
									},{
										method: 'get'
									});
								},{ source: weiboApp.param.appkey },{ method: 'get' });
							});
							weiboApp.has_login = true;
						};
						if(weiboApp.has_login && !status){
							weiboApp.has_login = false;
							weiboApp.userinfo = null;
							weiboApp.onLogout();
						}
					},
					onLogin:function(obj){
						var len = weiboApp.loginCallbacks.length;
						for(var i = 0;i <len;i++ ){
							weiboApp.loginCallbacks[i](obj);
						};
					},
					onLogout:function(){
						var len = weiboApp.logoutCallbacks.length;
						for(var i = 0;i <len;i++ ){
							weiboApp.logoutCallbacks[i]();
						};
					},
					init:function(options){
						var url = options.url || config.url;
						var param = (weiboApp.param = $.extend({rn:new Date().getTime()},config.param,options.param));
						if(!weiboApp.has_load_wb){
							//加载wb.js
							tool.loadScript(url + "appkey=" + param.appkey,{charset:param.charset},function(){
								//登陆回调函数;
								if(options.onLogin){
									weiboApp.loginCallbacks.push(options.onLogin);
								};
								//退出登陆回调函数;
								if(options.onLogout){
									weiboApp.logoutCallbacks.push(options.onLogout);
								};
								weiboApp.checkLogin();
							});
						}
					}
				}
			return weiboApp;	
	})(jQuery)
}