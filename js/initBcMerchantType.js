
function initBcMerchantType(typeId){
	$("#"+typeId+"").append("<option value=''>请选择</option>");
	
	//获取商家类型
	$.ajax({
		type: 'POST',
		url: $base_path+'bcMerchantTypeController/selectBcMerchantType',
		data: 'token=' + token,
		success: function(data) {				        	
			if(data.code == 0){
		    	$.each(data.result["rows"], function(index, type){ 
		     		$("#"+typeId+"").append("<option value='"+type.mtId+"'>"+type.mtName+"</option>");
				});
		  	}else{
		 		alert("商家类型获取失败！");
		   	}
		}
	});	

}
