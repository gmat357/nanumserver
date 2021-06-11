$(window).ready(function () {

  // 이메일 값
  var domainMail = $('#mail_domain');
  var selectMail = $('#selectMail');

  selectMail.on('change', function () {
    var mailValue = $('#selectMail option:selected').val();
    if (mailValue == "etc") {
      domainMail.val("");
    }
    else {
      domainMail.val(mailValue);
    }
  });

  var bankbookScript = `
    <li class="result_no_bankbook">
      <table>
        <tr>
          <th>입금자명</th>
          <td><input type="text" name="depositor" id="depositor" required></td>
        </tr>
        <tr>
          <th>입금은행</th>
          <td>
            <select id="bankaccount" name="bankaccount" fw-filter="" fw-label="무통장 입금은행" fw-msg="">
              <option value="-1">::: 선택해 주세요. :::</option>
              <option value="">은행이름:000000000000
                나눔마트</option>
            </select>
          </td>
        </tr>
      </table>
    </li>`;
  var receiptScript = `
    <li class="receipt">
      <p>현금영수증 신청</p>
      <div class="receipt_info">
        <input type="radio" name="receipt_check" id="receipt_true" value="receipt_true">
        <label for="receipt_true">현금영수증 신청</label>
        <input type="radio" name="receipt_check" id="receipt_false" value="receipt_false" checked>
        <label for="receipt_false">신청안함</label>
      </div>
    </li>`;
  var cardOrMoblie = `
    <li class="result_card result_moblie">
    <p><b></b>소액 결제의 경우 PG사 정책에 따라 결제 금액 제한이 있을 수 있습니다.</p>
    </li>`;

  var methodUl = $(".pay_method_area");
  var payMethod = $('input[name=payment_methods]');
  var receipt_info = $('.receipt_info');
  var receipt = $('input[name=receipt_check]');
  //  결제수단선택
  payChoice();
  payMethod.on('change', function () {
    var selected = $(this).val();
    var methods_list = $('.methods_list');


    if (selected == "moblie_pay") { selected = "card" }
    switch (selected) {
      case "no_bankbook":
        methods_list.nextAll().remove();
        methodUl.append(bankbookScript);
        methodUl.append(receiptScript);
        $(".money_btn").css("display","block");
        $(".payment_btn").css("display","none");
        payChoice();
        break
      case "card":
        methods_list.nextAll().remove();
        methodUl.append(cardOrMoblie);
        $(".money_btn").css("display","none");
        $(".payment_btn").css("display","block");
        break
    }
  });

  // 현금영수증
  var receipt_true = `
  <table class="receipt_table">
  <tbody>
  <tr class="client_check_box">
  <th>구분</th>
  <td>
  <input type="radio" name="client_check" id="solo" value="solo" checked>
  <label for="solo">개인</label>
  <input type="radio" name="client_check" id="business" value="business">
  <label for="business">사업자</label>
  </td>
  </tr>
  <tr class="solo_check">
  <th>핸드폰 번호</th>
  <td>
  <select name="money_phone" value="" id="phone">
  <option value="010" seleted>010</option>
  <option value="011">011</option>
  <option value="016">016</option>
  <option value="017">017</option>
  <option value="018">018</option>
  <option value="019">019</option>
  </select>
  <input type="text" name="money_phone" value="" id="client_middleNum" required>
  <input type="text" name="money_phone" value="" id="client_lastNum" required>
  </td>
  </tr>
  </tbody>
  </table>
  `;
  function payChoice() {
    receipt_info = $('.receipt_info');
    receipt = $('input[name=receipt_check]');

    receipt.on('change', function () {
      var selected = $(this).val();
      switch (selected) {
        case "receipt_true":
          receipt_info.append(receipt_true);
          clientJob();
          break;
        case "receipt_false":
          $('.receipt_table').remove();
          break;
      }
    });

  }
  // 개인 OR 사업자
  var soloSript = `
    <tr class="solo_check">
      <th>핸드폰 번호</th>
      <td>
          <select name="money_phone" value="" id="phone">
          <option value="010" seleted>010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        <input type="text" name="money_phone" value="" id="client_middleNum" required>
        <input type="text" name="money_phone" value="" id="client_lastNum" required>
      </td>
    </tr>
    `;
  var businessScript = `
    <tr class="business_check">
    <th>사업자 번호</th>
    <td>
      <input type="text" name="business_num" id="business_num" required>
    </td>
    </tr>
    `;

  function clientJob() {
    var client = $('input[name=client_check]');
    client.on('change', function () {
      var selected = $(this).val();
      var tr = $('.client_check_box');
      switch (selected) {
        case "solo":
          tr.nextAll().remove();
          tr.parent().append(soloSript);
          break;
        case "business":
          tr.nextAll().remove();
          tr.parent().append(businessScript);
          break;
        default:
          break
      }
    });
  }
});