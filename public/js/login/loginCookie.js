function getCookieValue(){
    var cookieId = document.cookie
    .split('; ')
    .find(rows => rows.startsWith('nanumLoginId'))
    .split('=')[1];
    var userId = $("#user_id");
    if(cookieId != ""){
        var idKeep = $("#id_keep");
        idKeep.prop("checked",true);
    }
    userId.val(cookieId);
}

$(function(){
    getCookieValue();
});