/**
        @id 31-462-157
	@description 沪深300 config
	@author xingben1
	@version 0.1
*/
var config = {
		CONST:{
			"latest":"VISITED_FUTURE"
		},
		api:{
			exponent_api:'http://stock.finance.sina.com.cn/hs300/api/jsonp.json', // 指数api
			get_weibo:'http://stock.finance.sina.com.cn/weibo/api/2/search/statuses.php?', // 微博状态api
			self_fund:'http://stock.finance.sina.com.cn/portfolio/api/openapi.php/PortfolioInterfaceService.getPyListFace?',
			hot_fund:'http://stock.finance.sina.com.cn/portfolio/api/jsonp.php',
			vote:"http://mark.sina.com.cn/v2/GetResult.php?", //投票api
			get_history:"http://vip.stock.finance.sina.com.cn/q/view/vFutures_History.php?", //历史api
			hq_url:"http://hq.sinajs.cn/" // 期货api
		},
		services:{
			"exponent":"Cffex_PositionsService.getHS300HYInfo",
			"hot_fund":"AttentionTradeService.getFundAttention20"
		},
		ids:{
			box_stock_index_wrap:"#box-stock-index-wrap",
			box_latest_fund:"#box-latest-fund",
			box_no_login:"#box-no-login",
			box_hot_stock_wrap:"#box-hot-stock-wrap",
			box_free_fund_wrap:"#box-free-fund-wrap",
			has_login_wrap:"#has-login-wrap",
			box_fund_files:"#box-fund-files",
			btn_toggle_all:"#btn-toggle-all",
			box_futures_hq_wrap:"#box-futures-hq-wrap",// 期货行情wrap元素id
			tbody_latest:"#tbody-latest",
			tbody_hot:"#tbody-hot",
			box_hot_futures:"#box-hot-futures",
			box_latest_futures:"#box-latest-futures",
			box_publish_weibo:"#box-publish-weibo",
			box_publish_weibo_wrap:"#box-weibo-publish-wrap",
			box_login_pannel:"#box-login-pannel",
			box_tab_interaction:"#box-tab-interaction",
			box_scroll_news:"#box-scroll-news",
			btn_query_hq:"#btn-query-hq",
			date_from:"#date-from",
			date_to:"#date-to",
			box_relate_stock_wrap:"#box-relate-stock-wrap",
			btn_query_history:"#btn-query-history",
			box_flash_deal:"box-flash-deal",
			box_flash_buy:"box-flash-buy",
			box_flash_sell:"box-flash-sell"
		},
		// 显示数据文字颜色
		marks:['gray','red','green'],
		txt:{
			"toggle":"收起",
			"speak":"我要发言",
			"advice":"欢迎你输入意见...",
			"require_one":"请至少勾选一项",
			"select_futures":"请选择期货"
		},
		clses:{
			date_picker:"date-picker",
			btn_toggle:"btn-toggle",
			btn_publish:"btn-publish",
			btn_show_login:"btn-show-login",
			btn_login:"btn-login",
			btn_weibo_login:"btn-weibo-login",
			btn_close:"btn-close",
			btn_logout:"btn-logout",
			btn_weibo_logout:"btn-weibo-logout",
			s_hover:"s-hover",
			btn_quartile_help:"btn-quartile-help",
			btn_down_help:"btn-down-help",
			btn_haitong_help:"btn-haitong-help",
			btn_galaxy_help:"btn-galaxy-help",
			btn_merchants_help:"btn-merchants-help",
			btn_jinxin_help:"btn-jinxin-help",
			file_fold:"file-fold",
			file_item:"file-item ",
			show_all:"show-all",
			user_name:"user-name",
			num:"num",
			char_tip:"char-tip",
			weibo_focus:"weibo-focus",
			weibo_content:"weibo-content",
			weibo_success:"weibo-success",
			to_weibo:"to-weibo",
			has_login_wrap:"has-login-wrap",
			weibo_content_textarea:'weibo-content-textarea',
			select_jys:"select-jys",
			select_pz:"select-pz",
			select_hy:"select-hy",
			fake_select_wrap:"fake-select-wrap",
			btn_submit:"btn-submit",
			btn_calc:"btn-calc",
			btn_reset:"btn-reset",
			unit_popular:"unit-popular",
			unit_international:"unit-international",
			select_international:"select-international",
			select_popular:"select-popular",
			experts_list:"experts-list",
			item:"item",
			current:"current",
			box_tab:"box-tab"
		},
		date_config:{
			inline:true,
			changeYear:true,
			dateFormat:"yy-mm-dd",
			yearRange:"1990:2090",
			dayNamesMin:["日","一","二","三","四","五","六"],
			monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
			buttonImage:"images/calendar.gif"
		},
		jys:{
			jys:"交易所",
			pz:"品种",
			hy:"合约"
		},
		select:{
			tmpl:"<option value='<%=value%>'><%=name%></option>",
			urls:{
				outer:"http://finance.sina.com.cn/futures/quote/cff/bc.shtml?code=<%=code%>",
				inner:"http://finance.sina.com.cn/futures/quotes/<%=code%>.shtml"
			}
		},
		latest_hot_fund:{
			tmpl:{
				latest:'<tr id="futures-code-latest-<%=code%>" class="<%=cls%>"><td><a title="<%=title%>" target="_blank" href="http://finance.sina.com.cn/futures/quotes/<%=code%>.shtml"><%=name%></a><td><span class="price"><%=price%></span><td><span class="amt"><%=amt%></span><td><a class="btn btn-close" href="javascript:void(0);" data-type="<%=type%>" data-code="<%=code%>"><span>删除</span></a></tr>',
				hot:'<tr class="<%=light%> <%=cls%>" id="futures-code-hot-<%=code%>"><td><a title="<%=title%>" target="_blank" href="http://finance.sina.com.cn/futures/quotes/<%=code%>.shtml"><%=name%></a><td><span class="price"><%=price%></span><td><span class="amt"><%=amt%></span><td><a class="btn fake"><span></span></a></tr>'
			}
		},
		calc:{
			exchange_base:"USDCNY",
			container:"#box-futures-calc",
			data:[
				{left:"黄金(美元/盎司)",right:"黄金(元/克)",tag:"0",base:1/31.1035},
				{left:"白银(美元/盎司)",right:"白银(元/克)",tag:"6",base:1/31.1035},
				{left:"大豆(美分/蒲式耳)",right:"大豆(元/吨)",tag:"1",base:(36.7437/100)},
				{left:"小麦(美分/蒲式耳)",right:"小麦(元/吨)",tag:"2",base:(36.7437/100)},
				{left:"玉米(美分/蒲式耳)",right:"玉米(元/吨)",tag:"3",base:(39.36825/100)},
				{left:"棉花(美分/磅)",right:"棉花(元/吨)",tag:"4",base:22.0462},
				{left:"白糖(美分/磅)",right:"白糖(元/吨)",tag:"5",base:22.0462}
			],
			tmpl:{
				name:"calc-tmpl",
				markup:'<span class="title title-futures-calc">期货计算器</span> <input type="text"  class="unit-popular text small" /> <select class="select-popular">{{each data}}<option data-tag="${tag}" value="${ exchange * base}">${left}</option>{{/each}}</select> = <input type="text" class="unit-international text small" /> <select class="select-international">{{each data}}<option data-tag="${tag}" value="${ exchange * base}">${right}</option>{{/each}}</select> <a class="btn btn-calc"><span>计算</span></a> <a class="btn btn-reset"><span>重置</span></a>',
				opt:{}
			}
		},
		// 期货行情配置
		futures_hq:{
			fields:["price","open-price","max-price","min-price","close-price","yestoday-price","amount","volume","buy","sell","buy-amount","sell-amount","amt","amt-value","time","box-simple-basic-info"],
			// 标记节点
			mark_fields:["price","box-simple-basic-info"]
		},
		ipad_hq_img:{
			bj_time_zone:8,
			types:["market_future_stock_index","market_future_in_good","market_future_stock_index"],
			container:"#box-flash-wrap",
			img_tmpl:"http://image.sinajs.cn/newchart/v5/futures/<%=tag%>/<%=code%>}.gif?<%=rand>",
			tmpl:{
				//外盘期货模板
				"0":{
					name:"hq-img-tmpl-0",
					markup:'<div class="box-tab" id="box-tab-flash-hq"><div class="box-tab-title" id="box-tab-flash-hq-title"><span class="float-right" style="padding-right:5px;color:#333;position:relative;top:3px;">期货行情由倚天财经提供</span><ul><li><a data-id="#box-futures-flash-min" href="javascript:void(0);">分时</a></li><li><a data-id="#box-futures-flash-5d" href="javascript:void(0);">5日</a></li><li><a data-id="#box-futures-flash-1m" href="javascript:void(0);">1月</a></li><li><a data-id="#box-futures-flash-3m" href="javascript:void(0);">3月</a></li><li><a data-id="#box-futures-flash-6m" href="javascript:void(0);">6月</a></li><li><a data-id="#box-futures-flash-1y" href="javascript:void(0);">1年</a></li></ul></div><div class="box-tab-content"><div id="box-futures-flash-min" class="box-tab-item"><img data-tag="min" src="http://image.sinajs.cn/newchart/v5/futures/global/min/${code}.gif?${rand}"></div><div id="box-futures-flash-5d" class="box-tab-item"><img data-tag="5d" src="http://image.sinajs.cn/newchart/v5/futures/global/mline/5d/${code}.gif?${rand}"></div><div id="box-futures-flash-1m" class="box-tab-item"><img data-tag="1m" src="http://image.sinajs.cn/newchart/v5/futures/global/mline/1m/${code}.gif?${rand}"></div><div id="box-futures-flash-3m" class="box-tab-item"><img data-tag="3m" src="http://image.sinajs.cn/newchart/v5/futures/global/mline/3m/${code}.gif?${rand}"></div><div id="box-futures-flash-6m" class="box-tab-item"><img data-tag="6m" src="http://image.sinajs.cn/newchart/v5/futures/global/mline/6m/${code}.gif?${rand}"></div><div id="box-futures-flash-1y" class="box-tab-item"><img data-tag="1y" src="http://image.sinajs.cn/newchart/v5/futures/global/mline/1y/${code}.gif?${rand}"></div></div></div>',
					opt:{}
				},
				//内盘期货模板
				"1":{
					name:"hq-img-tmpl-1",
					markup:'<div class="box-tab" id="box-tab-flash-hq"><div class="box-tab-title" id="box-tab-flash-hq-title"><span class="float-right" style="padding-right:5px;color:#333;position:relative;top:3px;">${status}</span><ul><li><a data-id="#box-futures-flash-min" href="javascript:void(0);">分时图</a></li><li><a data-id="#box-futures-flash-mink30" href="javascript:void(0);">30分钟k线</a></li><li><a data-id="#box-futures-flash-mink60" href="javascript:void(0);">60分钟k线</a></li><li><a data-id="#box-futures-flash-daily" href="javascript:void(0);">日k线</a></li><li><a data-id="#box-futures-flash-weekly" href="javascript:void(0);">周k线</a></li><li><a data-id="#box-futures-flash-monthly" href="javascript:void(0);">月k线</a></li></ul></div><div class="box-tab-content"><div id="box-futures-flash-min" class="box-tab-item"><img data-tag="min" src="http://image.sinajs.cn/newchart/v5/futures/min/${code}.gif?${rand}"></div><div id="box-futures-flash-mink30" class="box-tab-item"><img data-tag="mink30" src="http://image.sinajs.cn/newchart/v5/futures/mink30/${code}.gif?${rand}"></div><div id="box-futures-flash-mink60" class="box-tab-item"><img data-tag="mink60" src="http://image.sinajs.cn/newchart/v5/futures/mink60/${code}.gif?${rand}"></div><div id="box-futures-flash-daily" class="box-tab-item"><img data-tag="daily" src="http://image.sinajs.cn/newchart/v5/futures/daily/${code}.gif?${rand}"></div><div id="box-futures-flash-weekly" class="box-tab-item"><img data-tag="weekly" src="http://image.sinajs.cn/newchart/v5/futures/weekly/${code}.gif?${rand}"></div><div id="box-futures-flash-monthly" class="box-tab-item"><img data-tag="monthly" src="http://image.sinajs.cn/newchart/v5/futures/monthly/${code}.gif?${rand}"></div></div></div>',
					opt:{}
				},
				//期指模板
				"2":{
					name:"hq-img-tmpl-2",
					markup:'<div class="box-tab" id="box-tab-flash-hq"><div class="box-tab-title" id="box-tab-flash-hq-title"><span class="float-right" style="padding-right:5px;color:#333;position:relative;top:3px;">${status}</span><ul><li><a data-id="#box-futures-flash-min" href="javascript:void(0);">分时图</a></li><li><a data-id="#box-futures-flash-mink30" href="javascript:void(0);">30分钟k线</a></li><li><a data-id="#box-futures-flash-mink60" href="javascript:void(0);">60分钟k线</a></li><li><a data-id="#box-futures-flash-daily" href="javascript:void(0);">日k线</a></li><li><a data-id="#box-futures-flash-weekly" href="javascript:void(0);">周k线</a></li><li><a data-id="#box-futures-flash-monthly" href="javascript:void(0);">月k线</a></li></ul></div><div class="box-tab-content"><div id="box-futures-flash-min" class="box-tab-item"><img data-tag="min" src="http://image.sinajs.cn/newchart/cffex/real/min/${code}.gif?${rand}"></div><div id="box-futures-flash-mink30" class="box-tab-item"><img data-tag="mink30" src="http://image.sinajs.cn/newchart/cffex/real/kmin30/${code}.gif?${rand}"></div><div id="box-futures-flash-mink60" class="box-tab-item"><img data-tag="mink60" src="http://image.sinajs.cn/newchart/cffex/real/kmin60/${code}.gif?${rand}"></div><div id="box-futures-flash-daily" class="box-tab-item"><img data-tag="daily" src="http://image.sinajs.cn/newchart/cffex/real/kday/${code}.gif?${rand}"></div><div id="box-futures-flash-weekly" class="box-tab-item"><img data-tag="weekly" src="http://image.sinajs.cn/newchart/cffex/real/kweek/${code}.gif?${rand}"></div><div id="box-futures-flash-monthly" class="box-tab-item"><img data-tag="monthly" src="http://image.sinajs.cn/newchart/cffex/real/kmonth/${code}.gif?${rand}"></div></div></div>',
					opt:{}
				}
			}
		},
		weibo:{
			default_key:"期货",
			container:"#box-weibo-detail",
			tmpl:{
				name:"weibo-tmpl",
				markup:'<!--p class="more"><a title="${key}" target="_blank" href="http://s.weibo.com/weibo/${key}">更多></a></p--><p class="weibo-tip">共有<span class="weibo-num">${total_number}</span>条微博在讨论<a title="${key}" target="_blank" href="http://s.weibo.com/weibo/${key}">"${key}"</a></p><div id="box-weibo-list"{{if total_number >3}}class="weibo-list-scroll"{{/if}}><ul class="weibo-list">{{each statuses}}{{if $index < 20}}<li><div class="img-wrap"><a href="http://weibo.com/u/${user.id}"  target="_blank"><img src="http://tp1.sinaimg.cn/${user.id}/50/0/0" width="50" height="50" alt="${user.name}" title="{user.name}"></a></div><div class="weibo-detail"><div class="weibo-content"><a href="http://weibo.com/u/${user.id}"  target="_blank" class="name">${user.name}：</a>{{html modular.weibo.replace(text)}}</div><p><span class="float-right"><a href="http://weibo.com/${user.id}/${base62_id}?type=repost" target="_blank">转发(${reposts_count})</a> | <a href="http://weibo.com/${user.id}/${base62_id}" target="_blank">评论(${comments_count})</a></span><span class="source"><strong class="time">${modular.helper.parse_time(created_at)}</strong>来自{{html source}}</span></p></div></li>{{/if}}{{/each}}</ul></div>',
				opt:{}
			}
		},
		send_weibo:{
			max:140,
			tmpl:{
				normal:'还可以输入<span class="num"><%=num%></span>字',
				error:'已经超过<span class="num orange"><%=num%></span>字'
			}
		},
		other_futures:{
			containers:{
				contract:"#box-main-contract-price",
				current:"#box-currency-futures",
				stock:"#box-relate-stock",
				month:"#box-month-contract-list",
				rate:"#box-exchange-expo-rate" 
			},
			tmpl:{
				name:"other-futures-tmpl",
				markup:'<table cellpadding="0" class="table" id="table-${tag}-price" cellspacing="0" width="100%"><colgroup><col span="1" width="34%" /><col span="1" width="33%" /><col span="1" /></colgroup><thead><tr><th>品种名称</th><th>最新价</th><th>涨跌幅</th></tr></thead><tbody>{{each data}}<tr id="futures-code-${tag}-${code}" data-cls="${cls}" class="${cls} {{if $index % 2 == 0}}odd{{/if}}"><td style="text-align:left;">{{if tag!="rate"}}<a {{if tag=="month" && type==3}}href="http://finance.sina.com.cn/money/forex/hq/${code}.shtml" {{else}} {{if tag!="stock"}} href="http://finance.sina.com.cn/futures/quotes/${code}.shtml"{{/if}}{{/if}} {{if tag=="contract"}}href="http://finance.sina.com.cn/futures/quotes/${code}.shtml"{{/if}}{{if tag=="current"}}href="http://finance.sina.com.cn/money/future/${code}/quote.shtml"{{/if}}{{if tag=="stock"}}href="http://finance.sina.com.cn/realstock/company/${code}/nc.shtml"{{/if}} target="blank">${name}</a>{{else}}${name}{{/if}}<td><span class="price">${price}</span><td><span class="amt">${amt}</span></tr>{{/each}}</tbody></table>',
				opt:{}
			}
		},
		exponent:{
			list:{
				container:"#box-hot-recommand-list",
				tmpl:{
					name:'stock-exponent-tmpl',
					markup:'<table cellpadding=0 cellspacing=0 class="table" width="100%" id="stock-exponent-table"><colgroup><col style="width:33%;" span="1" /><col style="width:34%;" span="1" /></colgroup><thead><th>指数名称</th><th>涨跌幅</th><th>贡献指数</th></thead><tbody>{{each data}}{{if $index < 8}}<tr id="stock-exponent-${modular.exponent.store(HYSYMBOL,gxzs)}" {{if $index % 2 == 0}}class="odd"{{/if}}><td><a target="_blank" href="http://finance.sina.com.cn/realstock/company/sh${HYSYMBOL}/nc.shtml" class="stock-name-link">${INAME}</a></td><td><span class="stock-exponent-amt"></span></td><td>${gxzs}</td></tr>{{/if}}{{/each}}</tbody></table>',
					opt:{}
				}
			}
		},
		expert_questions:{
			container:"#box-expert-answer",
			tmpl:{
				name:"expert-answer-tmpl",
				markup:'{{each data}}<div {{if current !== ($index + 1) }}style="display:none"{{/if}} class="item" id="box-expert-answer-item-${$index + 1}"><div class="img-wrap"><img src="${photo_url}" /></div><div class="desc"><h4>今日在线专家:${name}</h4>{{html description}} <a href="http://biz.finance.sina.com.cn/futures/ask/" target="_blank">[详细]</a><p style="padding-top:5px;display:block;"><a href="http://biz.finance.sina.com.cn/futures/ask/" target="_blank" class="btn btn-question"><span>点击提问</span></a></div></div>{{/each}}<div class="experts-list"><span>专家：</span><ul>{{each data}}<li {{if current == ($index+1)}}class="current"{{/if}} data-obj="#box-expert-answer-item-${$index + 1}"><a href="javascript:void(0);">${name}</a></li>{{/each}}</ul>',
				opt:{}
			}
		},
		vote:{
			container:"#box-many-survey-wrap",
			tmpl:{
				name:"vote-tmpl",
				markup:'<p class="more"><a target="_blank" href="http://mark.sina.com.cn/v2/AllResult.php?p_mark=futures_survey&i_mark=${futures_app.vote_code}">更多></a><h3 class="title title-many-survey">多空调查</h3><form id="box-many-survey" target="_blank" method="post" action="http://mark.sina.com.cn/v2/Post.php"><p>本周共有${total}人参加投票，请点击参与调查。<ul class="vote-list">{{each data}}<li><label><input class="radio" type="radio" value="${value}" name="option_${question}"/>${text}</label><span class="vote-bar" style="width:100px;"><span class="bar" style="width:${((num/total)* 100).toFixed(2)}px;"></span></span><strong>${num}人(${((num/total) * 100).toFixed(2)}%)</strong></li>{{/each}}</ul><input type="hidden" name="p_mark" value="futures_survey"><input type="hidden" name="i_mark" value="${futures_app.vote_code}"><input type="hidden" name="name" value="${futures_app.name}多空调查"><input type="hidden" name="question[]" value="${question}"><input type="hidden" name="type" value=""><input type="hidden" name="ext1" value=""><input type="hidden" name="ext2" value=""><input type="hidden" name="ext3" value=""><input type="hidden" name="ext4" value=""><input type="hidden" name="ext5" value=""><p style="margin-top:10px;"><span class="fake-input"><span class="fake-submit"></span><input type="submit" value="提交" /></span><span class="fake-input"><a href="http://mark.sina.com.cn/v2/Result.php?p_mark=futures_survey&i_mark=${futures_app.vote_code}" target="_blank" class="fake-reset"></a></span></form>',
				opt:{}
			}
		}
}