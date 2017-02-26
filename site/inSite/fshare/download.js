$('.modal').on('shown.bs.modal', function () {
    $('[data-modalfocus]').focus();
});
function getDownloadData(form, data, hasError) {
    if (!hasError) {
        if (form.data('parent') !== undefined) {
            var modal = '#' + form.data('parent');
            $(modal).modal('hide');
            var btn = $('button[data-target=' + modal + ']');
        } else {
            var btn = form.find('.dl-btn');
            if (form.data('smsnoti') !== undefined) {
                //$('#fcodeNotifi').modal('show');
            }
        }
        btn.prop('disabled', true);
        btn.children('i.fa, span.fa-stack').toggle();
        if ('url' in data) {
            window.location = data.url
        } else {
            btn.children('i.fa, span.fa-stack').toggle();
            $.alert({success: false, message: data.msg});
        }
    }
}
$(document).ready(function(){
		//$("#download-form").find('.btn.btn-default.btn-lg.btn-block.dl-btn').trigger("click")
    $('.favorite').click(function(event){
        var that=this;
        event.preventDefault(); 
        var guest=$(that).attr('data-guest');
        if(guest==1){
            $('.welcome .parent li .dropdown a[data-target="#homeclonefile"]').trigger('click');
           
        }
        else{
            var items=[];
            var favorite=$(that).attr('data-favorite');
            var status=0;
            if(favorite==1)
                status=0;
            else
                status=1;
            items.push($(this).attr('data-linkcode'));
            var dataSend = {items: items, status: status,token:$('.favorite').attr('data-token')};
            dataSend = JSON.stringify(dataSend);
            $.ajax({
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                traditional: true,
                url: '/api/fileops/ChangeFavorite',
                data: dataSend,
                beforeSend: $.proxy(function() {
                        $("#loading-indicator, .img-text").modal('show');
                    }, this),
                success: $.proxy(function(data) {
                    if(favorite==0){
                        $(that).attr('data-favorite','1');
                        $(that).removeClass('add-favorite');
                        $(that).addClass('remove-favorite');
                        $(that).find('i').removeClass('a fa-star-o fa-lg color').addClass('a fa-star fa-lg color');
                        $(that).attr('title','Remove favorite');
                        $(that).find('.text-favorite').text(message('Click to remove favorite'));
        //                $.alert({success:true,message:data.msg});
        //                $('#loading-indicator, .img-text').modal('hide');
                        $('#loading-indicator, .img-text').modal('hide');
                    }
                    else{
                        $(that).attr('data-favorite','0');
                        $(that).addClass('add-favorite');
                        $(that).removeClass('remove-favorite');
                        $(that).find('i').removeClass('a fa-star fa-lg color').addClass('a fa-star-o fa-lg color');
                        $(that).attr('title','Add favorite');
                        $(that).find('.text-favorite').text(message('Click to add favorite'));
        //                $.alert({success:true,message:data.msg});
        //                $('#loading-indicator, .img-text').modal('hide');
                        $('#loading-indicator, .img-text').modal('hide');
                    }
                    if (data['code'] === 200) {
                       $.alert({success:true,message:data['msg']});
                    }
                    else {
                      $.alert({success:false,message:data['msg']});
                    }
                }, this),
                error: $.proxy(function(xhr, ajaxOptions, thrownError) {
                    $('#loading-indicator, .img-text').modal('hide');
                    $.alert({success:false,message:xhr.responseJSON.msg});
                    this.reload()
                }, this),
            });
        }
    });
});

function message(msg){
    
    var msgs={'Click to add favorite':'Nhấn v� o để thêm link yêu thích',
              'Click to remove favorite':'Nhấn v� o để xóa link yêu thích',
            };
    if(language=='vi'){
        return msgs[msg];
    }
    else{
        return msg;
    }
}