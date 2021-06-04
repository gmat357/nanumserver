var url = "/getMenu";
var dataType = "json";

function menuTemplate(data) {
  var template = "";
  var list_object = $(".category");
  for (var i = 0; i < data.length; i++) {
    template = `
    <a href = "#######">
    <li class="category_list">
    <p>${data[i].menu_nm}</p>
    </li>
    </a>
    `;

    list_object.append(template);
  }
}

$(function () {
  $.ajax({
    url: url,
    dataType: dataType,
    type: "post",
    success: function (data) {
      menuTemplate(data);
    },
    error: function (err) {
      throw err;
    }
  });
});