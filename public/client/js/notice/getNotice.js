function page() { 
    var arrParams = []; 
    var uriParams = location.search.substr(1).split('&'); 
    for (var i=0; i<uriParams.length; i++) {
        if(i % 2 == 0){
            var param = uriParams[i].split('=');
            arrParams.push(decodeURIComponent(param[1])); 
        }
    } 
    return JSON.stringify(arrParams); 
}

function dataSpread(data){
    var name = $(".name");
    var day = $(".day");
    var viewCount = $(".view_count");
    var title = $(".title");
    var contents = $(".contents");

    name.text(data[0].mt_name);
    day.text(data[0].mt_date);
    viewCount.text(data[0].mt_look);
    title.text(data[0].mt_title);
    contents.append(data[0].mt_text);
}

function getData(){
    $.ajax({
        url:"/getBoardData",
        dataType:"json",
        type:"post",
        data:{page:page()},
        success:function(data){
            dataSpread(data);
        },error:function(){

        }
    })
}

$(function(){
    getData();
});