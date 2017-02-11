/**
	@description 沪深300 control
	@author xingben1
	@version 0.1
*/
var control = (function($){
	var IE_6 = $.browser.msie&&($.browser.version=="6.0");
	var control = {
			render:function(opt){
				var container = opt.container;
				$(container).hide();
				var data =  opt.data;
				var tmpl = opt.tmpl;
				$.template(tmpl.name, tmpl.markup );
				var html = $.tmpl(tmpl.name,data,tmpl.opt);
				$(container).empty().append(html).show();
				if($.isFunction(opt.callback)){
					opt.callback($(container));		
				}
			},
			init:function(){
				view.init();
				modular.init();
			}
		};
	//给视图绑定更新操作;
	$(control).bind("onRender",function(e,data){
		control.render(data);
	});	
	//绑定最近访问删除事件;
	$(control).bind("onDeleteLatestStock",function(e,code,type){
		modular.latset_hot_futures.delete_latest(code,type);
	});
	//绑定选择期指事件;
	$(control).bind("onSelect",function(e,data){
		modular.select.change(data);
	});
	//绑定查询事件;
	$(control).bind("onQuery",function(e,data){
		modular.select.query(data);
	});
	//绑定查询历史事件;
	$(control).bind("onQueryHistory",function(e,data){
		modular.select.query_history(data);
	});
	//
	$(control).bind("onCalcExchange",function(e,data){
		modular.calc.calc(data);
	});
	return control;
})(jQuery)