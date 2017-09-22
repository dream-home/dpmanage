//var $base_path = 'http://192.168.2.200:9011/';
var $base_path = 'http://localhost:8080/';
//var $base_path = 'http://192.168.2.202:8889/';
//var $downImg = $base_path+"manage/image/";
//var $downImg = "http://192.168.2.200:9010/api/image";
//var $base_path = 'http://192.168.2.105:8080/';
//var $base_path = 'http://121.199.19.29:8091/';
//var $base_path = 'http://121.199.25.90:8092/';
//var $base_path = 'http://manage.6pyun.com/';
//var $base_path = 'http://192.168.2.200:8888/';
/*0:test七牛上传空间，1：正式七牛上传空间*/
//var $base_path = 'http://120.25.79.61:8090/';
var $qiniu_root = 0;


/*截取七牛文件名字符串*/
var $qiniuUrl = ".com/";


//微信店铺域名
var $wechat_path='http://m.yanbaocoin.cn/wxpage';
//$(function (){	
	/*if(token==null){
		top.location.href='/enjoyRedEnvelopeManager/html/login.html';
	}*/
//});


//富文本上传图片到七牛（上传空间）
if($qiniu_root ==1){
	var $qiniuTextUpload = "doupai-offical-goods";	
}else{
	var $qiniuTextUpload = "doupai-test-goods";
}
 



function uploadBase(input1,img_area1,result1){
		
		window.onload = function () {
            var input = document.getElementById(input1);
            
           
            var img_area = document.getElementById(img_area1);
             var result = document.getElementById(result1);
            if (typeof(FileReader) === 'undefined') {
                //result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！";
                alert("抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！");
                input.setAttribute('disabled', 'disabled');
            } else {
            	//alert("test");	
            	 
           	     input.addEventListener('change', readFile, false);
            }
        };
        function readFile() {
            var file = this.files[0];
           
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
            	var img_area = document.getElementById(img_area1);
            	 var result = document.getElementById(result1);
                var img = new Image,
                        width = 720,    //图片resize宽度
                        quality = 0.5,  //图像质量
                        height = 720,
                        canvas = document.createElement("canvas"),
                        drawer = canvas.getContext("2d");
                img.src = this.result;
                canvas.width = width;
                canvas.height = height;
                //canvas.height = width * (img.height / img.width);
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL("image/jpeg", quality);
                //alert(img.src.length);
                result.value = img.src;  
                //console.log(img.src);
                //$("#adImg").val(img.src);
                //result.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                
                //img_area.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                img_area.src = img.src;
                var obj = document.getElementById(input1); 
                //alert(obj.value);
				//obj.outerHTML=obj.outerHTML;
           	     obj.value = "";
           	     
                //alert(img_area.src);
                //alert(img.src.length);
                //return img.src.length; 
            }
        }
	
	
	
	
}


/*触发按钮  显示img  保存地址   七牛空间     */
function uploadBase1(input1,img_area1,result1,bucket1){
		
		window.onload = function () {
            var input = document.getElementById(input1);
            
           
            var img_area = document.getElementById(img_area1);
             var result = document.getElementById(result1);
            if (typeof(FileReader) === 'undefined') {
                //result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！";
                alert("抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！");
                input.setAttribute('disabled', 'disabled');
            } else {
            	//alert("test");	
            	 
           	     input.addEventListener('change', readFile, false);
            }
        };
        function readFile() {
            var file = this.files[0];
           
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
            	var img_area = document.getElementById(img_area1);
            	 var result = document.getElementById(result1);
                var img = new Image,
                        width = 760,    //图片resize宽度
                        quality = 0.7,  //图像质量
                        height = 367,
                        canvas = document.createElement("canvas"),
                        drawer = canvas.getContext("2d");
                img.src = this.result;
                canvas.width = width;
                canvas.height = height;
                //canvas.height = width * (img.height / img.width);
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL("image/png", quality);
                //alert(img.src.length);
                //result.value = img.src;  
                //console.log(img.src);
                //$("#adImg").val(img.src);
                //result.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                
                //img_area.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                //img_area.src = img.src;
                
                
                var person = {
						bucket:bucket1
					}
					
					
					
					
					
					var base64 = img.src.split("base64,")[1];
					$.ajax({
								type:"post",
								url:$base_path+"manage/common/uptoken", 
								data:person,
								success:function(data){
									if(data.code==200){
										var pic = base64 ;
									    var url = "http://upload-z2.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
									    var xhr = new XMLHttpRequest();
									 	
										xhr.onreadystatechange=function(){
										    if (xhr.readyState==4){
										    	
										      //document.getElementById("myDiv").innerHTML=data.result.domain+JSON.parse(xhr.responseText).hash;  
										   	  result.value = data.result.domain+JSON.parse(xhr.responseText).hash;
										   	  img_area.src = data.result.domain+JSON.parse(xhr.responseText).hash;
										    }
										}
									  	xhr.open("POST", url, true);
									  	xhr.setRequestHeader("Content-Type", "application/octet-stream");
									  	xhr.setRequestHeader("Authorization", "UpToken "+data.result.token);
									  	xhr.send(pic);
									  	
									  	
									  	
									}else{
										alert(data.msg);
									}
									
									
								}, 
								error:function(data){ 
								} 					
					});
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                var obj = document.getElementById(input1);
                //alert(obj.value);
				//obj.outerHTML=obj.outerHTML;
				
				
				
				
           	     obj.value = "";
           	     
                //alert(img_area.src);
                //alert(img.src.length);
                //return img.src.length; 
            }
        }
	
	
	
	
}


/*触发按钮  显示img  保存地址   七牛空间     */
function uploadBase2(input1,img_area1,result1,bucket1){
		
		window.onload = function () {
            var input = document.getElementById(input1);
            
           
            var img_area = document.getElementById(img_area1);
             var result = document.getElementById(result1);
            if (typeof(FileReader) === 'undefined') {
                //result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！";
                alert("抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！");
                input.setAttribute('disabled', 'disabled');
            } else {
            	//alert("test");	
            	 
           	     input.addEventListener('change', readFile, false);
            }
        };
        function readFile() {
            var file = this.files[0];
           
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
            	var img_area = document.getElementById(img_area1);
            	 var result = document.getElementById(result1);
                var img = new Image,
                        
                        quality = 0.5,  //图像质量
                        
                        canvas = document.createElement("canvas"),
                        drawer = canvas.getContext("2d");
                img.src = this.result;
                
                canvas.width = img.width;
                canvas.height = img.height;
                //canvas.height = width * (img.height / img.width);
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL("image/png", quality);
               
                //alert(img.src.length);
                
                
                /*上传后台form 表单提交base64*/
                //result.value = img.src;
                
                
                
                //console.log(img.src);
                //$("#adImg").val(img.src);
                //result.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                
                //img_area.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                
                /*显示的图片*/
                //img_area.src = img.src;



				/*七牛上传*/
					var person = {
						bucket:bucket1
					}
					
					
					
					
					
					var base64 = img.src.split("base64,")[1];
					$.ajax({
								type:"post",
								url:$base_path+"manage/common/uptoken",  
								data:person,
								success:function(data){
									if(data.code==200){
										var pic = base64 ;
									    var url = "http://upload-z2.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
									    var xhr = new XMLHttpRequest();
									 	
										xhr.onreadystatechange=function(){
										    if (xhr.readyState==4){
										    	
										      //document.getElementById("myDiv").innerHTML=data.result.domain+JSON.parse(xhr.responseText).hash;  
										   	  result.value = data.result.domain+JSON.parse(xhr.responseText).hash;
										   	  img_area.src = data.result.domain+JSON.parse(xhr.responseText).hash;
										    }
										}
									  	xhr.open("POST", url, true);
									  	xhr.setRequestHeader("Content-Type", "application/octet-stream");
									  	xhr.setRequestHeader("Authorization", "UpToken "+data.result.token);
									  	xhr.send(pic);
									  	
									  	
									  	
									}else{
										alert(data.msg);
									}
									
									
								}, 
								error:function(data){ 
								} 					
					});
				  
				
			                
                
                
                
                
                var obj = document.getElementById(input1); 
                //alert(obj.value);
				//obj.outerHTML=obj.outerHTML;
           	     obj.value = "";
           	     
                //alert(img_area.src);
                //alert(img.src.length);
                //return img.src.length; 
            }
        }
	
	
	
	
}





					
function qiniuTextUpload(bucket1,img){
	
	/*七牛上传空间*/
	var person = {
					bucket:bucket1
				}
					
					
					
					
					
	var base64 = img.split("base64,")[1];
	$.ajax({
				type:"post",
				url:$base_path+"manage/common/uptoken",  
				data:person,
				success:function(data){
					if(data.code==200){
						var pic = base64 ;
					    var url = "http://upload-z2.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
					    var xhr = new XMLHttpRequest();
					 	
						xhr.onreadystatechange=function(){
						    if (xhr.readyState==4){
						    	
						      //document.getElementById("myDiv").innerHTML=data.result.domain+JSON.parse(xhr.responseText).hash;  
						   	  result.value = data.result.domain+JSON.parse(xhr.responseText).hash;
						   	  img_area.src = data.result.domain+JSON.parse(xhr.responseText).hash;
						    }
						}
					  	xhr.open("POST", url, true);
					  	xhr.setRequestHeader("Content-Type", "application/octet-stream");
					  	xhr.setRequestHeader("Authorization", "UpToken "+data.result.token);
					  	xhr.send(pic);
					  	
					  	
					  	
					}else{
						alert(data.msg);
					}
					
					
				}, 
				error:function(data){ 
				} 					
	});

	
	
	
	
	
	
	
	
	
	
}





/*引导页*/
/*触发按钮  显示img  保存地址   七牛空间     */
function uploadBase3(input1,img_area1,result1,bucket1){
		
		window.onload = function () {
            var input = document.getElementById(input1);
            
           
            var img_area = document.getElementById(img_area1);
             var result = document.getElementById(result1);
            if (typeof(FileReader) === 'undefined') {
                //result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！";
                alert("抱歉，你的浏览器不支持 FileReader，请升级主流的浏览器来进行操作！");
                input.setAttribute('disabled', 'disabled');
            } else {
            	//alert("test");	
            	 
           	     input.addEventListener('change', readFile, false);
            }
        };
        function readFile() {
            var file = this.files[0];
           
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
            	var img_area = document.getElementById(img_area1);
            	 var result = document.getElementById(result1);
                var img = new Image,
                        width = 1080,    //图片resize宽度
                        quality = 0.1,  //图像质量
                        height = 1920,
                        canvas = document.createElement("canvas"),
                        drawer = canvas.getContext("2d");
                img.src = this.result;
                canvas.width = width;
                canvas.height = height;
                
                
                var imageBase64Url = img.src; 
                
                //canvas.height = width * (img.height / img.width);
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL("image/png", quality);
                
                //result.value = img.src;  
                //console.log(img.src);
                //$("#adImg").val(img.src);
                //result.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                
                //img_area.innerHTML = '<img style="width: 170px;height: 100px" src="' + img.src + '" alt=""/>';
                //img_area.src = img.src;
                
                
                var person = {
						bucket:bucket1
					}
					
					
					
					
					
					var base64 = imageBase64Url.split("base64,")[1];
					$.ajax({
								type:"post",
								url:$base_path+"manage/common/uptoken", 
								data:person,
								success:function(data){
									if(data.code==200){
										var pic = base64 ;
									    var url = "http://upload-z2.qiniu.com/putb64/-1"; //非华东空间需要根据注意事项 1 修改上传域名
									    var xhr = new XMLHttpRequest();
									 	
										xhr.onreadystatechange=function(){
										    if (xhr.readyState==4){
										    	
										      //document.getElementById("myDiv").innerHTML=data.result.domain+JSON.parse(xhr.responseText).hash;  
										   	  result.value = data.result.domain+JSON.parse(xhr.responseText).hash;
										   	  img_area.src = data.result.domain+JSON.parse(xhr.responseText).hash;
										    }
										}
									  	xhr.open("POST", url, true);
									  	xhr.setRequestHeader("Content-Type", "application/octet-stream");
									  	xhr.setRequestHeader("Authorization", "UpToken "+data.result.token);
									  	xhr.send(pic);
									  	
									  	
									  	
									}else{
										alert(data.msg);
									}
									
									
								}, 
								error:function(data){ 
								} 					
					});
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                var obj = document.getElementById(input1);
                //alert(obj.value);
				//obj.outerHTML=obj.outerHTML;
				
				
				
				
           	     obj.value = "";
           	     
                //alert(img_area.src);
                //alert(img.src.length);
                //return img.src.length; 
            }
        }
	
	
	
	
}

























//上传图片代码
function upload(form){
	/*$('#edit_user')[0]*/
	var formData = new FormData(form);
	var result1 = "";
		formData.append('num', '1');//可以在已有表单数据的基础上，继续添加新的键值对
		$.ajax({
		    url: $base_path+"manage/image/upload",
		    type: 'POST',
		    cache: false,
		    data: new FormData(form),
		    processData: false,
		    contentType: false
		}).done(function(res) {
			//alert(res.result);
			result1 = res.result;
			//return result1;
			//return ($base_path+"manage/image/"+res.result);
		}).fail(function(res) {
			//return result1;
		});

}

Date.prototype.Format = function(fmt)   
			{ //author: meizz   
			  var o = {   
			    "M+" : this.getMonth()+1,                 //月份   
			    "d+" : this.getDate(),                    //日   
			    "h+" : this.getHours()-8,                   //小时   
			    "m+" : this.getMinutes(),                 //分   
			    "s+" : this.getSeconds(),                 //秒   
			    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
			    "S"  : this.getMilliseconds()             //毫秒   
			  };   
			  if(/(y+)/.test(fmt))   
			    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
			  for(var k in o)   
			    if(new RegExp("("+ k +")").test(fmt))   
			  	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			  return fmt;   
			}  
			
			
			
//时间戳转date			
Date.prototype.Format3 = function(fmt)   
			{ //author: meizz   
			  var o = {   
			    "M+" : this.getMonth()+1,                 //月份   
			    "d+" : this.getDate(),                    //日   
			    "h+" : this.getHours(),                   //小时   
			    "m+" : this.getMinutes(),                 //分   
			    "s+" : this.getSeconds(),                 //秒   
			    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
			    "S"  : this.getMilliseconds()             //毫秒   
			  };   
			  if(/(y+)/.test(fmt))   
			    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
			  for(var k in o)   
			    if(new RegExp("("+ k +")").test(fmt))   
			  	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
			  return fmt;   
}  			
			
Date.prototype.Format1 = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours()+15,                   //小时   
    "m+" : this.getMinutes()+59,                 //分   
    "s+" : this.getSeconds()+59,                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

function overTime(){
	alert("登录失效,请重新登录");
	top.location.href="/enjoyRedEnvelopeManager/index.html";
}

$.ajax({
			type:"post",
			url:$base_path+"manage/sys/detail", 
			//headers:{"token","asdf"},
			beforeSend: function(request) {
                    request.setRequestHeader("token", sessionStorage.getItem("token"));
            },
            dataType:"json",
			success:function(data){ 
				if(data.code==200){
					
				}else if(data.code==1403){
					/*alert("登录失效,请重新登录");
					top.location.href="/enjoyRedEnvelopeManager/index.html";*/
					overTime();
				}else{
					//alert("alert");
					//overTime();
					//alert(data);
					//alert(data.msg);
				}
			}, 
			error:function(data){ 
				alert("服务器跑丢了......");
			} 
			
});				

