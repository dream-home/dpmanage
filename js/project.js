
/*图片上传关闭*/
function _piImgUploadClosed(flag){
	window.frames["image_upload_iframe"].setUploadImgUrl();
	$("#image_upload_iframe").attr("src","");
	if(flag==2){
		$("#image_upload_iframe").attr("src","../imageUpload.html");
	}else{
		$("#image_upload_iframe").attr("src","imageUpload.html");
	}
	$.hide("image_upload");
}	

//将Logo列显示成图片
function logoFormatter(cellvalue, options, rowdata)
{
    if (cellvalue != "" && cellvalue!=null)
        return '<img class="logoimg" src="'+cellvalue+'" alt="' + cellvalue + '" />';
    else 
        return '<img class="logoimg" src="../../images/image.png" alt="' + cellvalue + '" />';
}

function deleteFiles(base_path,token,folderName,urls){
	$.ajax({
        type: 'POST',
        url: base_path + 'fileUpload/deleteFiles',
        async:false,
        data: 'token=' + token+'&folderName='+folderName+'&urls='+urls,
        success: function(data) {				           
        }
    });
}



