var ObjResult =  {
    Result: ""
};
$(document).ready(function(){
    validationInput();
    $('#AddList').unbind('click');
    var counter = 1;
    $('#AddList').click(function() {
        var makeId = counter++;
        var html = "";
        html += '<div class="clone-form mb-5">';
            html += '<form>';
                html += '<div class="row">';
                    html += '<div class="col">';
                        html += '<input type="text" class="form-control validation-input String" name="name[]" id="name'+ makeId +'" placeholder="Name">';
                        html += '<span class="help-box">กรุณากรอกชื่อ</span>';
                    html += '</div>';
                    html += '<div class="col">';
                        html += '<input type="text" class="form-control validation-input Number" name="age[]" id="age'+ makeId +'" placeholder="Age">';
                        html += '<span class="help-box">กรุณากรอกอายุ</span>';
                    html += '</div>';
                html += '</div>';
            html += '</form>';
        html += '</div>';
        $('#form').append(html);
        validationInput();
    });
    $('#Submit').unbind('click');
    $('#Submit').click(function() {
        var statusCheck = ValidationInputAll('all');
        if(statusCheck == true) {
            var arrResult =  [];
            $.each($('#form .clone-form'), function(k,v){
                var Name = $(this).find('input[name="name[]"]');
                var Age = $(this).find('input[name="age[]"]');
                var Result = {
                    name: "",
                    age: ""
                };
                Result.name = Name.val();
                Result.age = Age.val();
                arrResult[k] = Result;
            });
            ObjResult.Result = arrResult;
        }else {
            alert('โปรดกรอกข้อมูลให้ครบ');
        }
        //เมื่อผ่านหมดแล้วนำ dataที่ได้บันทึกลง ฐานข้อมูล
        console.log(ObjResult);
    });
});

function validationInput() {
    $(".validation-input").focusout(function(){
        ValidationInputAll($(this).attr('id'));
    });
}

function ValidationInputAll(attrId) {
    var status_return = true;
    if(attrId != 'all') {
        var elm = $('.validation-input#'+attrId);
        if(elm.length > 0){
            if(elm.val() != '') {
                if(elm.hasClass("String")) {
                    if(!validatelanguage(elm.val())) {
                        elm.parent().find('.help-box').addClass('help-block-show');
                        elm.addClass('validation-border');
                        status_return = false;
                    }else {
                        elm.parent().find('.help-box').removeClass('help-block-show');
                        elm.removeClass('validation-border');
                    }
                }else if (elm.hasClass("Number")) {
                    if(!validateNumber(elm.val())) {
                        elm.parent().find('.help-box').addClass('help-block-show');
                        elm.addClass('validation-border');
                        status_return = false;
                    }else {
                        elm.parent().find('.help-box').removeClass('help-block-show');
                        elm.removeClass('validation-border');
                    }
                }
            }else {
                elm.parent().find('.help-box').addClass('help-block-show');
                elm.addClass('validation-border');
                status_return = false;
            }
        }
    }else {
        elm = $('#form .clone-form .validation-input');
        if(elm.length > 0){
            $.each(elm ,function(){
                if($(this).val() != '') {
                    if($(this).hasClass("String")) {
                        if(!validatelanguage($(this).val())) {
                            $(this).parent().find('.help-box').addClass('help-block-show');
                            $(this).addClass('validation-border');
                            status_return = false;
                        }else {
                            $(this).parent().find('.help-box').removeClass('help-block-show');
                            $(this).removeClass('validation-border');
                        }
                    }else if ($(this).hasClass("Number")) {
                        if(!validateNumber($(this).val())) {
                            $(this).parent().find('.help-box').addClass('help-block-show');
                            $(this).addClass('validation-border');
                            status_return = false;
                        }else {
                            $(this).parent().find('.help-box').removeClass('help-block-show');
                            $(this).removeClass('validation-border');
                        }
                    }
                }else {
                    $(this).parent().find('.help-box').addClass('help-block-show');
                    $(this).addClass('validation-border');
                    status_return = false;
                }
            });
        }
    }
    return status_return;
}

function validatelanguage(rs) {
    var re = new RegExp("^([A-Z]|[a-z]|[ๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝูฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦ])+$", "g");
    return re.test(rs);
}

function validateNumber(rs) {
    var re = (/^\d+$/);
    return re.test(rs);
}
