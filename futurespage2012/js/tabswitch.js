/**
	* @fileOverview tab切换类
	* @author <a href="www.denisdeng.com">xingben1@staff.sina.com.cn</a>
	* @requires jquery.js
	* @version 0.1
*/ 
(function($){
	/**
		* @constructor 
		* @param {Object} options tab切换对象参数配置;
	*/ 
	TabSwitch = function(options){
		this.defaults = {
			context:"#tab",
			onTab:null,
			eventType:"click"
		};
		if (options){
			this.defaults = $.extend(this.defaults,options);
		};
		this.init();
	};
	TabSwitch.prototype = {
		init:function(){
			var self = this;
			this.context = $(this.defaults.context);
			this.tab_title_wrap = this.context.children(".box-tab-title");
			this.tab_titles = this.tab_title_wrap.children("ul").children("li");
			this.tab_content_wrap = this.context.children(".box-tab-content");
			this.tab_items = this.tab_content_wrap.children(".box-tab-item");
			$(this.tab_title_wrap).delegate("li",this.defaults.eventType + ".tab",function(e){
				var data = {
					current_tab_item:$($(this).children("a").attr("data-id")),
					current_title:$(this)
				};
				if(self.tab_timer){
					clearTimeout(self.tab_timer);
				};
				//阻止多次点击同一个标签;
				if(!$(this).hasClass("current")){
					self.tab_timer = setTimeout(function(){
						//触发tab切换事件;
						$(self.tab_title_wrap).trigger('tab-switch',[data,true]);
					},100);
				}
				e.preventDefault();
			});
			//给容器绑定tab切换事件;
			$(this.tab_title_wrap).bind("tab-switch",function(e,data, trigger){
				//console.log(data);
				var current_tab_item = data.current_tab_item;
				self.tab_titles.removeClass("current");
				$(data.current_title).addClass("current");
				self.tab_content_wrap.removeClass().addClass("box-tab-content " + current_tab_item.attr("id"));
				self.tab_items.hide();
				current_tab_item.show();
				//console.log(trigger);
				if($.isFunction(self.defaults.onTab) && trigger){
					self.defaults.onTab($(data.current_title),current_tab_item,current_tab_item.attr("id"));
				};
				e.preventDefault();
			});
		},
		/**
			* @description 切换到相应的标签
			* @param {Number} tab 对应标签的索引
			* @param {Function} callback 标签切换的回调函数
		*/
		goto:function(tab,callback){
			var current_title = this.tab_titles.eq(tab);
			if(current_title.size() == 1){
				var current_tab_item = $(current_title.children("a").attr("data-id"));
				var data = {
					current_tab_item:current_tab_item,
					current_title:current_title
				};
				$(this.tab_title_wrap).trigger('tab-switch',[data, true]);
				if($.isFunction(callback)){
					callback(this.context,current_tab_item,current_tab_item.attr("id"));
				};
			};
		},
		/**
			* @description 切换到相应的标签不触发tab切换事件
			* @param {Number} tab 对应标签的索引
		*/
		highlight:function(tab){
			var current_title = this.tab_titles.eq(tab);
			if(current_title.size() == 1){
				var current_tab_item = $(current_title.children("a").attr("data-id"));
				var data = {
					current_tab_item:current_tab_item,
					current_title:current_title
				};
				$(this.tab_title_wrap).trigger('tab-switch',[data, false]);
			};
		}
	}
})(jQuery)