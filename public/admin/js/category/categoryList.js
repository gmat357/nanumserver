
function listChangeUp() {
  var checkbox = $(".category_item input");
  var upBtn = $('.up');
  var downBtn = $('.down');
  var checkResult = false;
  var thisList = "";
  var prevList = "";
  var nextList = "";
  checkbox.each(function () {
    $(this).on("change", function () {
      checkResult = $(this).prop("checked");
      thisList = $(this).parent();
      if (checkResult == false) {
        checkbox.prop("checked", false);
      }
      else {
        checkbox.prop("checked", false);
        $(this).prop("checked", true);
      }
      checkResult = $(this).prop("checked");
    });
  });

  upBtn.on("click", function () {
    if (checkResult) {
      prevList = thisList.prev();
      if (prevList[0] != undefined) {
        prevList.insertAfter(thisList);
        addDataVal();
      }
    }
  });

  downBtn.on("click", function () {
    if (checkResult) {
      nextList = thisList.next();
      if (nextList[0] != undefined) {
        thisList.insertAfter(nextList);
        addDataVal();
      }
    }
  });
}

function addDataVal() {
  var categoryUl = $(".category_list");
  var categoryLi = categoryUl.children();
  for (var i = 0; i < categoryLi.length; i++) {
    categoryLi.eq(i).attr("data-value", i + 1);
  }
}