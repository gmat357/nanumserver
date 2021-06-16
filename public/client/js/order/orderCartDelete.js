function parseQueryString() { 
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


function checkDelete(seq){
    $.ajax({
        url:"/cart/checkDelete",
        dataType:"json",
        type:"post",
        data:{seq:seq},
        success:function(data){
        },error:function(err){
            alert(err.error);
            console.log("오류");
        }
    });
}
