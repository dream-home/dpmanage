$(function(){
	var par1 = 0;
	var par2 = 0;
	var par3 = 0;
	var par4 = 0;
	var par5 = 0;
	var par6 = 0;
	var par7 = 0;
	var par8 = 0;
	var par9 = 0;
	var par10 = 0;
	var par11 = 0;
	var par12 = 0;
	var par13 = 0;
	var par14 = 0;
	var par15 = 0;
	
	
	
		
		$.ajax({
				type:"post",
				url:$base_path+"manage/sys/detail", 
				//headers:{"token","asdf"},
				beforeSend: function(request) {
                        request.setRequestHeader("token", sessionStorage.getItem("token"));
                },
				success:function(data){ 
					if(data.code==200){
						//alert(data.result.id);
						//alert(data.result.exchangeMin);
						$("#canshuId").val(data.result.id);
					    $("#canshu1").val(Number(data.result.epscale*100).toFixed(2));
						$("#canshu2").val(Number(data.result.balanceScale*100).toFixed(2));
						$("#canshu3").val(data.result.billDay);
						$("#canshu4").val(data.result.joinEp);
						$("#canshu5").val(Number(data.result.joinFirstReferrerScale*100).toFixed(2));
						$("#canshu6").val(Number(data.result.joinSecondReferrerScale*100).toFixed(2));
						$("#canshu7").val(Number(data.result.joinThirdReferrerScale*100).toFixed(2));
						
						$("#canshu8").val(data.result.eptoDouScale);
						$("#canshu9").val(data.result.minSignDouNum);
						$("#canshu10").val(data.result.minEPConvertNum);
						$("#canshu11").val(data.result.maxEPConvertNum);
						$("#canshu12").val(Number(data.result.commonReleaseScale*100).toFixed(2));
						$("#canshu13").val(Number(data.result.vipReleaseScale*100).toFixed(2));
						$("#canshu14").prop("checked",data.result.epSwitch==1?true:false);
						$("#canshu15").val(data.result.joinToDouScale);
						
						
					}else if(data.code==1403){
						/*alert("登录失效,请重新登录");
						top.location.href="/enjoyRedEnvelopeManager/index.html";*/
						overTime();
					}else{
						//alert(data.msg);
					}
				}, 
				error:function(data){ 
					alert("服务器跑丢了......");
				} 
				
		});
	
	
	
	
	
	
	$("#canshusave").click(function(){

		//开奖分配比例下限幸运中拍奖金比例下限
		if($("#canshu1").val().trim()<=100 && $("#canshu1").val().trim()>=0 && $("#canshu1").val().trim().length>0){
			//alert($("#canshu2s").text());
			$("#canshu1s").css("color","#707070");
			par1 = 1;
		}else{
			par1 = 0;
			$("#canshu1s").css("color","red");
			//return;	
		}
		
		//alert($("#canshu11").prop("checked")==true?'1':'0');		
		
		//幸运中拍奖金比例下限
		if($("#canshu2").val().trim()<=100 && $("#canshu2").val()>=0 && $("#canshu2").val().trim().length>0){
			
			par2 = 1;
			$("#canshu2s").css("color","#707070");
		}else{
			par2 = 0;
			$("#canshu2s").css("color","red");
			//return;	
		}
		
		//幸运中拍奖金比例上限
		
		if($("#canshu3").val().trim()>=1&& $("#canshu3").val().trim()<=31 && $("#canshu3").val().trim().length>0){
			
			par3 = 1;
			$("#canshu3s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par3 =0;
				$("#canshu3s").css("color","red");			
			//return;
		}
		
		
		
		

		
		if(par1==1 && par2 ==1 && par3 ==1){
			//alert("dd");
			
			//封装对象
			var parme = {
				id:$("#canshuId").val(),
				EPScale:parseFloat($("#canshu1").val())*0.01,
				balanceScale:parseFloat($("#canshu2").val())*0.01,
				billDay:$("#canshu3").val()
			}
			
			//alert(parme.storeGoodsMax);
				
			//ajax提交
			$.ajax({
					type:"post",
					url:$base_path+"manage/sys/update", 
					async:true,
					data:parme,
					beforeSend: function(request) {
                        request.setRequestHeader("token", sessionStorage.getItem("token"));
               		 },
					
					success:function(data){
						alert("修改成功");
					
					}, 
					error:function(data){ 
					} 
					
			});
					
					
			
			
			
			
			
		}else{
			
		}
		
		
		
		
		
	
	
	})
	
	
	$("#canshusave1").click(function(){

		if( $("#canshu4").val().trim()>=0 && $("#canshu4").val().trim().length>0){
			//alert($("#canshu2s").text());
			$("#canshu4s").css("color","#707070");
			par4 = 1;
		}else{
			par4 = 0;
			$("#canshu4s").css("color","red");
			//return;	
		}
		
		//alert($("#canshu11").prop("checked")==true?'1':'0');		
		
		//幸运中拍奖金比例下限
		if($("#canshu5").val().trim()<=100 && $("#canshu5").val()>=0 && $("#canshu5").val().trim().length>0){
			
			par5 = 1;
			$("#canshu5s").css("color","#707070");
		}else{
			par5 = 0;
			$("#canshu5s").css("color","red");
			//return;	
		}
		
		//幸运中拍奖金比例上限
		
		if($("#canshu6").val().trim()<=100&& $("#canshu6").val().trim()>=0  && $("#canshu6").val().trim().length>0){
			
			par6 = 1;
			$("#canshu6s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par6 =0;
				$("#canshu6s").css("color","red");			
			//return;
		}


		if($("#canshu7").val().trim()<=100&& $("#canshu7").val().trim()>=0  && $("#canshu7").val().trim().length>0){
			
			par7 = 1;
			$("#canshu7s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par7 =0;
				$("#canshu7s").css("color","red");			
			//return;
		}

		
		
		

		
		if(par4==1 && par5 ==1 && par6 ==1 && par7 ==1){
			//alert("dd");
			
			//封装对象
			var parme = {
				id:$("#canshuId").val(),
				joinEp:$("#canshu4").val(),
				joinFirstReferrerScale: parseFloat($("#canshu5").val())*0.01,
				joinSecondReferrerScale:parseFloat($("#canshu6").val())*0.01,
				joinThirdReferrerScale:parseFloat($("#canshu7").val())*0.01,
				
			}
			
			
			//alert(parme.storeGoodsMax);
				
			//ajax提交
			$.ajax({
					type:"post",
					url:$base_path+"manage/sys/update", 
					async:true,
					data:parme,
					beforeSend: function(request) {
                        request.setRequestHeader("token", sessionStorage.getItem("token"));
               		 },
					
					success:function(data){
						alert("修改成功");
					
					}, 
					error:function(data){ 
					} 
					
			});
					
					
			
			
			
			
			
		}else{
			
		}
		
		
		
		
		
	
	
	})
	
	
	
	/*ep参数设置*/
	$("#canshusave2").click(function(){


		//ep兑换成斗斗比例
		if( $("#canshu8").val().trim()>=0 && $("#canshu8").val().trim().length>0){
			//alert($("#canshu2s").text());
			$("#canshu8s").css("color","#707070");
			par8 = 1;
		}else{
			par8 = 0;
			$("#canshu8s").css("color","red");
			//return;	
		}
		
		//alert($("#canshu11").prop("checked")==true?'1':'0');		
		
		//斗斗签到最小值
		if($("#canshu9").val()>=0 && $("#canshu9").val().trim().length>0){
			
			par9 = 1;
			$("#canshu9s").css("color","#707070");
		}else{
			par9 = 0;
			$("#canshu9s").css("color","red");
			//return;	
		}
		
		//ep兑换最小值
		
		if($("#canshu10").val().trim()>=0  && $("#canshu10").val().trim().length>0){
			
			par10 = 1;
			$("#canshu10s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par10 =0;
				$("#canshu10s").css("color","red");			
			//return;
		}




		//ep兑换最大值		
		if($("#canshu11").val().trim()>=0  && $("#canshu11").val().trim().length>0){
			
			par11 = 1;
			$("#canshu11s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par11 =0;
				$("#canshu11s").css("color","red");			
			//return;
		}
		
		
		//普通会员斗斗释放比例
		if($("#canshu12").val().trim()<=100&& $("#canshu12").val().trim()>=0  && $("#canshu12").val().trim().length>0){
			
			par12 = 1;
			$("#canshu12s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par12 =0;
			$("#canshu12s").css("color","red");			
			//return;
		}
		
		
		//VIP会员斗斗释放比例
		if($("#canshu13").val().trim()<=100&& $("#canshu13").val().trim()>=0  && $("#canshu13").val().trim().length>0){
			
			par13 = 1;
			$("#canshu13s").css("color","#707070");	
		}else{
			//alert("dd1");
			par13 =0;
			$("#canshu13s").css("color","red");			
			//return;
		}
		
		//加入合伙人时EP兑换成斗斗比例
		if($("#canshu15").val().trim()>=0  && $("#canshu15").val().trim().length>0){
			
			par15 = 1;
			$("#canshu15s").css("color","#707070");	
			
					
			
		}else{
			//alert("dd1");
			par15 =0;
				$("#canshu15s").css("color","red");			
			//return;
		}

		
		if(par8==1 && par9 ==1 && par10 ==1 && par11 ==1 && par12 ==1 && par13 ==1 && par15 ==1){
			//alert("dd");
			
			//封装对象
			var parme = {
				id:$("#canshuId").val(),
				EPToDouScale:$("#canshu8").val(),
				minSignDouNum:$("#canshu9").val(),
				minEPConvertNum:$("#canshu10").val(),
				maxEPConvertNum:$("#canshu11").val(),
				commonReleaseScale: parseFloat($("#canshu12").val())*0.01,
				vipReleaseScale:parseFloat($("#canshu13").val())*0.01,
				epSwitch:$("#canshu14").prop("checked")==true?'1':'0',
				joinToDouScale:$("#canshu15").val()
					/*donateSwich:$("#canshu17").prop("checked")==true?'1':'0',*/
				
			}
			
			
			//alert(parme.storeGoodsMax);
				
			//ajax提交
			$.ajax({
					type:"post",
					url:$base_path+"manage/sys/update", 
					async:true,
					data:parme,
					beforeSend: function(request) {
                        request.setRequestHeader("token", sessionStorage.getItem("token"));
               		 },
					
					success:function(data){
						alert("修改成功");
					
					}, 
					error:function(data){ 
					} 
					
			});
					
					
			
			
			
			
			
		}else{
			
		}
		
		
		
		
		
	
	
	})
	
	
	
	
})
