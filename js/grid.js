/***
 * grid事件机制整合
 * author：Vimer
 */
$(function() { 
	$.extend({ 
		//grid随窗口大小变化自适应宽度
		autoByWindow: function(gridSelector){
			$(window).resize(function(){   
		         $(gridSelector).setGridWidth($(window).width());
	        });
		},
		
		
		//生成grid
		jqGrid: function(gridSelector, url, data, colNames, colModel, pagerSelector, caption, gridComplete, check, fit, rn, rlist, w, h){
			
			var token = sessionStorage.getItem("token");
			var postData = data == null || data == false ? {
	        	'token': token
	       	} : data;
	       	
			$(gridSelector).jqGrid({
				url: url,
				datatype: "json",
				width: w,
				height: h == null || h == false ? 'auto' : h,
				colNames: colNames,
				colModel: colModel, 
				viewrecords : true,
				rowNum: rn == null || rn == false ? 10 : rn,
				rowList: rlist == null || rlist == false ? [10,20,30] : rlist,
				rownumbers:true, 
				pager : pagerSelector,
				altRows: true,		//斑马条纹
				multiselect: check,
		        multiboxonly: false, 
		        postData: postData ,
		        jsonReader:{
					root:"result.rows",
                    records:"result.totalSize",
                    total:"result.totalPage",
                    page:"result.pageNo",			
                    repeatitems:false
                },
				loadComplete : function() {
					var table = this;
					setTimeout(function(){
						//styleCheckbox(table);
						updatePagerIcons(table);
					}, 0);
				},
				editurl: "",
				toolbar: [true,"top"],
				caption: caption,
				autowidth: w == null || w == false ? true : false, 
				shrinkToFit: fit,   //是否自动收缩以适应可用列宽
				gridComplete: gridComplete
			});
			
			
			
		},
		//设置冻结列
		setFrozenColumns: function(){
			$(gridSelector).jqGrid('setFrozenColumns');
		},
		//给paper导航栏添加自定义功能按钮
		navButtonAdd: function(gridSelector, pagerSelector, buttonicon, caption, title, onClickButton){
			$(gridSelector).navSeparatorAdd(pagerSelector,{
				sepclass: "ui-separator", sepcontent: ''
			}).navButtonAdd(pagerSelector,{
               caption: caption,
               title: title,
               buttonicon: buttonicon,
               onClickButton: onClickButton,
               position: "last"
            });
		},
		//给paper导航栏添加默认功能按钮
		navGrid: function(gridSelector, pagerSelector, tbar, addurl, editurl, delurl, dateArray){
			$(gridSelector).jqGrid('navGrid', pagerSelector, tbar == false || tbar == null ? toolbar : tbar,
				{
					//edit record form
					modal:true,
					closeAfterEdit: false,
					recreateForm: true,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						for(var i = 0; i<dateArray.length; i++){
							style_date_field(form, dateArray[i]);
						}
						style_edit_form(form);
						//重写editurl，覆盖之前的url，执行当前操作
						$(gridSelector).jqGrid('setGridParam',{editurl:editurl + '?token=' +　token});
					}
				},
				{
					//new record form
					modal:true,
					closeAfterAdd: true,
					recreateForm: true,
					//viewPagerButtons: false,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						for(var i = 0; i<dateArray.length; i++){
							style_date_field(form, dateArray[i]);
						}
						style_edit_form(form);
						$(gridSelector).jqGrid('setGridParam',{editurl:addurl + '?token=' +　token});
					}
				},
				{
					//delete record form, 删除多个
					modal:true,
					recreateForm: true,
					beforeShowForm : function(e) {
						var form = $(e[0]);
						if(form.data('styled')) return false;
						style_delete_form(form);
						form.data('styled', true);
						var ids = $(gridSelector).jqGrid('getGridParam','selarrrow');
						$(gridSelector).jqGrid('setGridParam',{editurl:delurl + '?token=' + token + '&delIds=' + ids});
					}
				},
				{
					//search form
					afterShowSearch: function(e){
						var form = $(e[0]);
						style_search_form(form);
					},
					afterRedraw: function(){
						style_search_filters($(this));
					},
					multipleSearch: true,
				},
				{} //view record from
			);
		},
		//设置查询参数
		setPostData: function(gridSelector, postData){
			$(gridSelector).jqGrid('setGridParam',{
				postData: postData	//格式：{a:b}
			});
		},
		//刷新
		refresh: function(gridSelector){
			$(gridSelector).trigger("reloadGrid");
		},
		//显示窗口
		show: function(id){
			openForm(id);
			$("#" + id).drag(); 
		},
		//关闭窗口
		hide: function(id){
			closeForm(id)
		},
		//弹出删除对话框
		openDelDailog: function(id, delFn){
			openDelDailog(id, delFn);
		},
		//关闭删除对话框
		closeDelDailog: function(){
			$.hide("del_dailog");
		},
		//打开充值对话框
		openCashDailog:function(id,delFn){
			openCashDailog(id,delFn);
		},
		//关闭充值对话框
		closeCashDailog: function(){
			$.hide("cash_dailog");
		},
		//弹出警告对话框
		reminderDailog: function(id, title, content){
			openReminderDailog(id, title, content)
		}
	}); 
	
	$.fn.extend({ 
		//拖拽功能 , 只针对div内容中的H4元素可供点击拖拽
		drag:function(){ 
			var $tar = $(this); 
			return $(this).mousedown(function(e){ 
				if(e.target.tagName == "H4"){ 
					var diffX = e.clientX - $tar.offset().left; 
					var diffY = e.clientY - $tar.offset().top; 
					$(document).mousemove(function(e){ 
						var left = e.clientX - diffX; 
						var top = e.clientY - diffY; 
						if (left < 0){ 
							left = 0; 
						} 
						else if (left <= $(window).scrollLeft()){ 
							left = $(window).scrollLeft(); 
						} 
						else if (left > $(window).width() +$(window).scrollLeft() - $tar.width()){ 
							left = $(window).width() +$(window).scrollLeft() -$tar.width(); 
						} 
						
						if (top < 0){ 
							top = 0; 
						} 
						else if (top <= $(window).scrollTop()){ 
							top = $(window).scrollTop(); 
						} 
						else if (top > $(window).height() +$(window).scrollTop() - $tar.height()){ 
							top = $(window).height() +$(window).scrollTop() - $tar.height(); 
						} 
						$tar.css("left",left + 'px').css("top",top + 'px'); 
					}); 
				} 
				$(document).mouseup(function(){ 
					$(this).unbind("mousemove"); 
					$(this).unbind("mouseup") 
				}); 
			}); 
		}
	}); 
	
}); 

	//当tbar为false默认不显示jqgrid自带的导航栏
	var toolbar = {
		edit: false, del: false, search: false, view: false, add: false, refresh: false
	};


	//分页样式触发事件
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
			'ui-icon-seek-next' : 'icon-angle-right bigger-140',
			'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			
			if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		})
	}
	
	//复选框样式触发事件
	function styleCheckbox(table) {
		$(table).find('input:checkbox').addClass('ace')
		.wrap('<label />')
		.after('<span class="lbl align-top" />')
	
		$('.ui-jqgrid-labels th[id*="_cb"]:first-child')
		.find('input.cbox[type=checkbox]').addClass('ace')
		.wrap('<label />').after('<span class="lbl align-top" />');
	}
	
	//启用工具提示
	function enableTooltips(table) {
		$('.navtable .ui-pg-button').tooltip({container:'body'});
		$(table).find('.ui-pg-div').tooltip({container:'body'});
	}
	
	
	/*表格渲染*/
	//使用 datepicker
	function pickDate( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=text]')
					.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
		}, 0);
	}
	//开关在编辑内联元素，开关按钮（yes/no）
	function aceSwitch( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=checkbox]')
					.wrap('<label class="inline" />')
				.addClass('ace ace-switch ace-switch-5')
				.after('<span class="lbl"></span>');
		}, 0);
	}
	
	
	/*在表格外进行编辑操作*/
	//在编辑之前回调
	function beforeEditCallback(e) {
		var form = $(e[0]);
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		style_edit_form(form);
	}
	
	//在删除之前回调
	function beforeDeleteCallback(e) {
		var form = $(e[0]);
		if(form.data('styled')) return false;
		
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		style_delete_form(form);
		
		form.data('styled', true);
	}
	
	//表单中日期样式触发事件，参数为字段名称
	function style_date_field(form, field){
		form.find('input[name=' + field + ']').datepicker({format:'yyyy-mm-dd' , autoclose:true});
	}
	//表单中开关按钮样式（yes/no），参数为字段名称
	function style_switch(form, field){
		form.find('input[name=' + field + ']').addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');
	}
	//编辑表单按钮样式
	function style_edit_form(form) {
		//update buttons classes
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
		buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')
		
		buttons = form.next().find('.navButton a');
		buttons.find('.ui-icon').remove();
		buttons.eq(0).append('<i class="icon-chevron-left"></i>');
		buttons.eq(1).append('<i class="icon-chevron-right"></i>');		
	}
	
	//删除表单按钮样式
	function style_delete_form(form) {
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
		buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
		buttons.eq(1).prepend('<i class="icon-remove"></i>')
	}
	
	//搜索过滤器风格
	function style_search_filters(form) {
		form.find('.delete-rule').val('X');
		form.find('.add-rule').addClass('btn btn-xs btn-primary');
		form.find('.add-group').addClass('btn btn-xs btn-success');
		form.find('.delete-group').addClass('btn btn-xs btn-danger');
	}
	
	//搜索表单样式
	function style_search_form(form) {
		var dialog = form.closest('.ui-jqdialog');
		var buttons = dialog.find('.EditTable')
		buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
		buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
		buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
	}
	
	//显示隐藏层和弹出层
	function openForm(id){
		$("#hidebg").show();
		$("#" + id).show();
	}
	//去除隐藏层和弹出层
	function closeForm(id){
		$("#hidebg").hide();
	   	$("#" + id).hide();
	}
	
	//弹出删除对话框
	function openDelDailog(id, delFn){
		$("#" + id).html('');
		var html = '<div id="del_dailog" class="grid_from" style="width: 220px; height: 150px;" >';
		html += '<div class="widget-header"><h4>删除</h4><span class="widget-toolbar"><a href="#" data-action="close" onclick="closeForm(\'del_dailog\')"><i class="icon-remove"></i></a></span></div>';
		html += '<div class="form_content"><div align="center"  class="form_content_table">删除选中的记录？</div>';
		html += '<div><button class="btn btn-sm btn-danger button-left" type="submit" ><i class="icon-trash bigger"></i>删除</button>';
		html += '<button class="btn btn-sm  button-right" onclick="closeForm(\'del_dailog\')"><i class="icon-remove bigger"></i>关闭</button></div></div></div>';
		$("#" + id).append(html);
		$.show("del_dailog");
		$('#del_dailog button[type=submit]').get(0).onclick = delFn;
	}
	//弹出警告对话框
	function openReminderDailog(id, title, content){
		$("#" + id).html('');
		var html = '<div id="reminder_dailog" class="grid_from" style="width: 200px; height: 100px;" >';
		html += '<div class="widget-header"><h4></h4><span class="widget-toolbar"><a href="#" data-action="close" onclick="closeForm(\'reminder_dailog\')"><i class="icon-remove"></i></a></span></div>';
		html += '<div id="reminder_content" class="form_content"></div></div>';
		$("#" + id).append(html);
		$('#reminder_dailog div[class=widget-header] h4').html(title);
		$('#reminder_content').html(content);
		$.show("reminder_dailog");
	}
	
	//弹出提现对话框
	function openCashDailog(id, delFn){
		$("#" + id).html('');
		var html = '<div id="cash_dailog" class="grid_from" style="width: 220px; height: 150px;" >';
		html += '<div class="widget-header"><h4>批量提现</h4><span class="widget-toolbar"><a href="#" data-action="close" onclick="closeForm(\'cash_dailog\')"><i class="icon-remove"></i></a></span></div>';
		html += '<div class="form_content"><div align="center"  class="form_content_table">提现选中的记录？</div>';
		html += '<div><button class="btn btn-sm btn-danger button-left" type="submit" ><i class="icon-trash bigger"></i>提现</button>';
		html += '<button class="btn btn-sm  button-right" onclick="closeForm(\'cash_dailog\')"><i class="icon-remove bigger"></i>关闭</button></div></div></div>';
		$("#" + id).append(html);
		$.show("cash_dailog");
		$('#cash_dailog button[type=submit]').get(0).onclick = delFn;
	}
	
	
