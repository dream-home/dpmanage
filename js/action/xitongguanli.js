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
	var par12 = 0;
	var par13 = 0;
	var par14= 0;
	var par15= 0;
	var par16= 0;
	var par20 = 0;
	var par21 = 0;
	var par22 = 0;
	var par23 = 0;
	var par24 = 0;
	var par25 = 0;
	var par26 = 0;
	var par27 = 0;
	var par28 = 0;
	var par30 = 0;
	var par31 = 0;
	var par32 = 0; 
	var par33 = 0;
	var par34 = 0;
	var par35 = 0;
	var par36 = 0;
	var par37 = 0;
	var par38 = 0;
	
	
	var par42 = 0;
	var par43 = 0;
	var par44 = 0;
	
	
	
	//ajax提交
	
		/*$.post($base_path+"manage/sys/detail",{},function(data){
			alert(JSON.stringify(data));
		})*/
		
	
		
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
					    $("#canshu1").val(data.result.drawMinScore);
						$("#canshu2").val(data.result.winnerScaleMin);
						$("#canshu3").val(data.result.winnerScaleMax);
						$("#canshu4").val(data.result.systemPoundageScale);
						$("#canshu5").val(data.result.androidAppVersion);
						$("#canshu6").val(data.result.firstReferrerScale);
						$("#canshu7").val(data.result.androidAppUrl);
						$("#canshu8").val(data.result.secondReferrerScale);
						$("#canshu9").val(data.result.androidAppDetail);
						$("#canshu10").val(data.result.thirdReferrerScale);
						$("#canshu11").prop("checked",data.result.androidAppForceUpdate==1?true:false);
						$("#canshu12").val(data.result.iosAppVersion);
						$("#canshu13").val(data.result.drawNumMin);
						$("#canshu14").val(data.result.iosAppUrl);
						$("#canshu15").val(data.result.winnerListNum);
						$("#canshu16").val(data.result.iosAppDetail);
						$("#canshu17").prop("checked",data.result.donateSwich==1?true:false);
						$("#canshu18").prop("checked",data.result.iosAppForceUpdate==1?true:false);
						$("#canshu19").prop("checked",data.result.exchangeSwitch==1?true:false);
						$("#canshu20").val(data.result.exchangePoundageScale);
						$("#canshu21").val(data.result.exchangeMin);
						$("#canshu22").val(data.result.exchangeMax);
						$("#canshu23").val(data.result.systemCopyright);
						$("#canshu24").val(data.result.systemDomain);
						$("#canshu25").val(data.result.donateMax);
						$("#canshu26").val(data.result.storeGoodsMax);
						$("#canshu27").val(data.result.storeStockMax);
						$("#canshu28").val(data.result.createStoreCondition);
						$("#canshu29").prop("checked",data.result.inviteSwich==1?true:false);
						$("#canshu30").val(data.result.vipWinScale);
						$("#canshu31").val(data.result.levelNo);
						$("#canshu32").val(data.result.registerEP);
						$("#canshu33").val(data.result.inviterEP);
						$("#canshu34").val(data.result.bindEP);
						$("#canshu35").val(data.result.shareTitle);
						$("#canshu36").val(data.result.shareMessage);
						$("#canshu37").val(data.result.mailPeople);
						$("#canshu38").val(data.result.tradeRate);
						$("#canshu39").val(data.result.servicePhone);
						$("#canshu40").prop("checked",data.result.isAndroidPopup==1?true:false);
						$("#canshu41").prop("checked",data.result.isIOSPopup==1?true:false);
						$("#canshu42").val(data.result.registerDoudou);
						$("#canshu43").val(data.result.inviterDoudou);
						$("#canshu44").val(data.result.bindDoudou);
						
						
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
		if($("#canshu1").val()<=1 && $("#canshu1").val()>=0 && $("#canshu1").val().trim().length>0){
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
		if($("#canshu2").val()<=1 && $("#canshu2").val()>=0 && $("#canshu2").val().trim().length>0 && $("#canshu2").val()<=$("#canshu3").val()){
			//alert($("#canshu2s").text());
			par2 = 1;
			$("#canshu2s").css("color","#707070");
		}else{
			par2 = 0;
			$("#canshu2s").css("color","red");
			//return;	
		}
		
		//幸运中拍奖金比例上限
		
		if($("#canshu3").val()<=1 && $("#canshu3").val()>=0 && $("#canshu3").val().trim().length>0){
			if($("#canshu3").val().trim()>= $("#canshu2").val().trim()){
				par3 = 1;
				$("#canshu3s").css("color","#707070");	
			}else{
				par3 = 0;
				$("#canshu3s").css("color","red");
			}
					
			
		}else{
			//alert("dd1");
			par3 =0;
				$("#canshu3s").css("color","red");			
			//return;
		}
		
		//系统分销比例
		if($("#canshu4").val()<=0.1 && $("#canshu4").val()>=0 && $("#canshu4").val().trim().length>0){
			
			par4 = 1;
			$("#canshu4s").css("color","#707070");
		}else{
			par4 = 0;
			$("#canshu4s").css("color","red");
		}
		
		//Android App版本号
		if($("#canshu5").val().trim().length>0){
			par5 = 1;
			$("#canshu5s").css("color","#707070");
		}else{
			par5 = 0;
			$("#canshu5s").css("color","red");
		}
		
		//一度人脉分销比例
		if($("#canshu6").val()<=0.1 && $("#canshu6").val()>=0 && $("#canshu6").val().trim().length>0){
			par6 = 1;
			$("#canshu6s").css("color","#707070");
		}else{
			par6 = 0;
			$("#canshu6s").css("color","red");
		}
		
		//Android下载地址
		if($("#canshu7").val().trim().length>0){
			par7 = 1;
			$("#canshu7s").css("color","#707070");
		}else{
			par7 = 0;
			$("#canshu7s").css("color","red");
		}
		
		//二度人脉分销比例
		if($("#canshu8").val()<=0.1 && $("#canshu8").val()>=0 && $("#canshu8").val().trim().length>0){
			par8 = 1;
			$("#canshu8s").css("color","#707070");
		}else{
			par8 = 0;
			$("#canshu8s").css("color","red");
		}
		
		//Android更新说明
		if($("#canshu9").val().trim().length>0){
			par9= 1;
			$("#canshu9s").css("color","#707070");
		}else{
			par9= 0;
			$("#canshu9s").css("color","red");
		}
		
		//三度人脉分销比例
		if($("#canshu10").val()<=0.1 && $("#canshu10").val()>=0 && $("#canshu10").val().trim().length>0){
			par10 = 1;
			$("#canshu10s").css("color","#707070");
		}else{
			par10 = 0;
			$("#canshu10s").css("color","red");
		}
		//ios APP版本号
		if($("#canshu12").val().trim().length>0){
			
			par12 = 1;
			$("#canshu12s").css("color","#707070");
		}else{
			
			par12 = 0;
			$("#canshu12s").css("color","red");
		}
		//最小开奖人数
		if($("#canshu13").val()>=2 && $("#canshu13").val().trim().length>0){
			par13 = 1;
			$("#canshu13s").css("color","#707070");
		}else{
			par13 = 0;
			$("#canshu13s").css("color","red");
		}
		
		//ios下载地址
		if($("#canshu14").val().trim().length>0){
			par14 = 1;
			$("#canshu14s").css("color","#707070");
		}else{
			par14 = 0;
			$("#canshu14s").css("color","red");
		}
		
		//排行榜上榜数
		if($("#canshu15").val()>=1 &&  $("#canshu15").val()<=50 && $("#canshu15").val().trim().length>0){
			par15 = 1;
			$("#canshu15s").css("color","#707070");
		}else{
			par15 = 0;
			$("#canshu15s").css("color","red");
		}
		
		//ios更新说明
		if($("#canshu16").val().trim().length>0){
			par16 = 1;
			$("#canshu16s").css("color","#707070");
		}else{
			par16 = 0;
			$("#canshu16s").css("color","red");
		}
		
		//积分兑换手续费
		if($("#canshu20").val()<=0.1 && $("#canshu20").val()>=0 && $("#canshu20").val().trim().length>0){
			par20 = 1;
			$("#canshu20s").css("color","#707070");
		}else{
			par20 = 0;
			$("#canshu20s").css("color","red");
		}
		
		//积分兑换下限
		if($("#canshu21").val()>=100 && $("#canshu21").val().trim().length>0){
			par21 = 1;
			$("#canshu21s").css("color","#707070");
		}else{
			
			par21 = 0;
			$("#canshu21s").css("color","red");
		}
		
		//积分兑换上限
		if($("#canshu22").val()>=0  && $("#canshu22").val().trim().length>0){
			
			if($("#canshu22").val().trim()>= $("#canshu21").val().trim()){
				par22 = 1;
				
				$("#canshu22s").css("color","#707070");
			}else{
				par22 = 0;
				$("#canshu22s").css("color","red");	
			}
			
			
			
		}else{
			//alert($("#canshu22").val()+"'"+$("#canshu21").val());
				par22 = 0;
				$("#canshu22s").css("color","red");
		}
		
		
		//系统版权设置
		if($("#canshu23").val().trim().length>0){
			par23 = 1;
			$("#canshu23s").css("color","#707070");
		}else{
			par23 = 0;
			$("#canshu23s").css("color","red");
		}
		
		//官网域名设置
		if($("#canshu24").val().trim().length>0){
			par24 = 1;
			$("#canshu24s").css("color","#707070");
		}else{
			par24 = 0;
			$("#canshu24s").css("color","red");
		}
		
		//会员赠送积分最高限制
		if($("#canshu25").val()>=10 && $("#canshu25").val().trim().length>0){
			par25 = 1;
			$("#canshu25s").css("color","#707070");
		}else{
			par25 = 0;
			$("#canshu25s").css("color","red");
		}
		
		//商家商品发布数量限制
		if($("#canshu26").val()>=0 && $("#canshu26").val().trim().length>0){
			par26 = 1;
			$("#canshu26s").css("color","#707070");
		}else{
			par26 = 0;
			$("#canshu26s").css("color","red");
		}
		
		//商品库存数量限制
		if($("#canshu27").val()>=0 && $("#canshu27").val().trim().length>0){
			par27 = 1;
			$("#canshu27s").css("color","#707070");
		}else{
			par27 = 0;
			$("#canshu27s").css("color","red");
		}
		
		//免费开店条件
		if($("#canshu28").val()>=0 && $("#canshu28").val().trim().length>0){
			par28 = 1;
			$("#canshu28s").css("color","#707070");
		}else{
			par28 = 0;
			$("#canshu28s").css("color","red");
		}
		
		//vip中奖率
		if($("#canshu30").val()>=0.1 && $("#canshu30").val()<=1){
			par30 = 1;
			$("#canshu30s").css("color","#707070");
		}else{
			par30 = 0;
			$("#canshu30s").css("color","red");
		}
		
		//层数		
		if($("#canshu31").val()>=0){
			par31 = 1;
			$("#canshu30s").css("color","#707070");
		}else{
			par31 = 0;
			$("#canshu30s").css("color","red");
		}
		
		
		//注册赠送ep		
		if($("#canshu32").val()>=0){
			par32 = 1;
			$("#canshu32s").css("color","#707070");
		}else{
			par32 = 0;
			$("#canshu32s").css("color","red");
		}
		
		//邀请人赠送ep		
		if($("#canshu33").val()>=0){
			par33 = 1;
			$("#canshu33s").css("color","#707070");
		}else{
			par33 = 0;
			$("#canshu33s").css("color","red");
		}
		
		//邀请人赠送ep		
		if($("#canshu34").val()>=0){
			par34 = 1;
			$("#canshu34s").css("color","#707070");
		}else{
			par34 = 0;
			$("#canshu34s").css("color","red");
		}
		
		//分享标题
		if($("#canshu35").val().trim().length>0){
			par35 = 1;
			$("#canshu35s").css("color","#707070");
		}else{
			par35 = 0;
			$("#canshu35s").css("color","red");
		}
		//分享内容
		if($("#canshu36").val().trim().length>0){
			par36 = 1;
			$("#canshu36s").css("color","#707070");
		}else{
			par36 = 0;
			$("#canshu36s").css("color","red");
		}
		//分享内容
		if($("#canshu37").val().trim().length>0){
			par37 = 1;
			$("#canshu37s").css("color","#707070");
		}else{
			par37 = 0;
			$("#canshu37s").css("color","red");
		}
		
		//交易手续费		
		if($("#canshu38").val()>=0 && $("#canshu38").val()<=1){
			par38 = 1;
			$("#canshu38s").css("color","#707070");
		}else{
			par38 = 0;
			$("#canshu38s").css("color","red");
		}
		
		
		//注册赠送斗斗		
		if($("#canshu42").val()>=0){
			par42 = 1;
			$("#canshu42s").css("color","#707070");
		}else{
			par42 = 0;
			$("#canshu42s").css("color","red");
		}
		//邀请人赠送斗斗		
		if($("#canshu43").val()>=0){
			par43 = 1;
			$("#canshu43s").css("color","#707070");
		}else{
			par43 = 0;
			$("#canshu43s").css("color","red");
		}
		//累计最多赠送斗斗		
		if($("#canshu44").val()>=0){
			par44 = 1;
			$("#canshu44s").css("color","#707070");
		}else{
			par44 = 0;
			$("#canshu44s").css("color","red");
		}
		
		
		

		
		if(par1==1 && par2 ==1 && par3 ==1 && par4 ==1 && par5 ==1 && par6 ==1 && par7 ==1 && par8 ==1 && par9 ==1 && par10 ==1 && par12 ==1 && par13 ==1 && par14 ==1 && par15 ==1 && par16 ==1 && par20 ==1 && par21 ==1 && par22 ==1 && par23 ==1 && par24 ==1 && par25 ==1 && par26 == 1 && par27==1  && par28==1 && par30==1 && par31==1 && par32==1 && par33==1 && par34==1 && par35==1 && par36==1 && par37==1&& par38==1 && par42==1 && par43==1&& par44==1 ){
			//alert("dd");
			
			//封装对象
			var parme = {
				id:$("#canshuId").val(),
				drawMinScore:$("#canshu1").val(),
				winnerScaleMin:$("#canshu2").val(),
				winnerScaleMax:$("#canshu3").val(),
				systemPoundageScale:$("#canshu4").val(),
				androidAppVersion:$("#canshu5").val(),
				firstReferrerScale:$("#canshu6").val(),
				androidAppUrl:$("#canshu7").val(),
				secondReferrerScale:$("#canshu8").val(),
				androidAppDetail:$("#canshu9").val(),
				thirdReferrerScale:$("#canshu10").val(),
				androidAppForceUpdate:$("#canshu11").prop("checked")==true?'1':'0',
				iosAppVersion:$("#canshu12").val(),
				drawNumMin:$("#canshu13").val(),
				iosAppUrl:$("#canshu14").val(),
				winnerListNum:$("#canshu15").val(),
				iosAppDetail:$("#canshu16").val(),
				donateSwich:$("#canshu17").prop("checked")==true?'1':'0',
				iosAppForceUpdate:$("#canshu18").prop("checked")==true?'1':'0',
				exchangeSwitch:$("#canshu19").prop("checked")==true?'1':'0',
				exchangePoundageScale:$("#canshu20").val(),
				exchangeMin:$("#canshu21").val(),
				exchangeMax:$("#canshu22").val(),
				systemCopyright:$("#canshu23").val(),
				systemDomain:$("#canshu24").val(),
				donateMax:$("#canshu25").val(),
				storeGoodsMax:$("#canshu26").val(),
				createStoreCondition:$("#canshu28").val(),
				storeStockMax:$("#canshu27").val(),
				inviteSwich:$("#canshu29").prop("checked")==true?'1':'0',
				vipWinScale:$("#canshu30").val(),
				levelNo:$("#canshu31").val(),
				registerEP:$("#canshu32").val(),
				inviterEP:$("#canshu33").val(),
				bindEP:$("#canshu34").val(),
				shareTitle:$("#canshu35").val(),
				shareMessage:$("#canshu36").val(),
				mailPeople:$("#canshu37").val(),
				tradeRate:$("#canshu38").val(),
				servicePhone:$("#canshu39").val(),
				isAndroidPopup:$("#canshu40").prop("checked")==true?'1':'0',
				isIOSPopup:$("#canshu41").prop("checked")==true?'1':'0',
				registerDoudou:$("#canshu42").val(),
				inviterDoudou:$("#canshu43").val(),
				bindDoudou:$("#canshu44").val()
				
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
					/*headers:{"token":sessionStorage.getItem("token")},*/
					success:function(data){
						alert("修改成功");
						/*if(data.code==200){
							alert(data.msg);
						}else{
							alert(data.msg);
						}*/
					}, 
					error:function(data){ 
					} 
					
			});
					
			
			
			
			
			
		}else{
			
		}
		
		
		
		
		
	
	
	})
	
	
	
})
