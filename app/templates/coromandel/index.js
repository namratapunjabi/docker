exports.coroTemplate = (data) => {
  let emailObj = {};
  let trss = trs(data[0].arr);

  emailObj['from'] = "Aqupay - no reply <noreply@aquapay.in>";
  emailObj['to'] = ["support@aquapay.in"];
  emailObj['cc'] = ["achin@aquapay.in"];
  emailObj['bcc'] = [];
  emailObj['returnTo'] = 'achin@aquapay.in';
  emailObj['subject'] = "Payment Advice : AQUAPAY PAYMENT TECHNOLOGIES PRIVATE LIMITED : COROMANDAL INT LTD : " + data[0].SupplierName;

  // emailObj['subject'] = data[0].Email;
  emailObj["body"] = body(data[0], trss)
  return emailObj;
}

function body(data, trss) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Advice</title>
    </head>
    <body style="font-family: sans-serif;color:#000;">
      <div style="overflow-x: scroll;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      scroll-snap-type: x mandatory;">
      <table>
        <tr>
          <td>
      <div style="margin-right: 0px;margin-left: 0px;">
        <div style="width:100%;margin-top: 1rem!important;">
          <div style="border-bottom:3px solid black;margin-right: -15px;margin-left: -15px;padding-bottom: 30px;">
            <div style="font-family:sans-serif;font-size: 30px; margin-top: 1.5rem!important;
            width: 32.333333%;display: inline-block;vertical-align: 40%;">Coromandel</div>
            <div style="margin-top: 1rem!important;
            width: 33.333333%;text-align: center;display: inline-block;">
              <span style="font-size:14px; margin-bottom: 1rem!important;">COROMANDEL INTERNATIONAL LIMITED</span><br>
              <span>SRIHARIPURAM,<br>
                  MALAKAPURAM POST,<br>
                  VISAKHAPATNAM</span>
            </div>
            <div style="font-family:sans-serif;color:#da242b;font-size: 30px;margin-top: 1.5rem!important;
            width: 32.333333%;text-align: right;display: inline-block;vertical-align: 40%;">murugappa</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px;">
        <div style="width: 49%; display: inline-block;">
        
            ${data.SupplierName}<br>
            ${data.Address1}<br>
            ${data.Address2} ${data.Address3}<br>
            ${data.City} ${data.District}<br>
            ${data.Region} ${data.Pincode}
        </div>
        <div style="width: 49%;margin-top:20px;display: inline-block;float: right;position: relative;">
          <div style="position:absolute;right:0;width:450px;">
            <div style="display:inline-block;width:175px;font-size: 15px;">Payment Doc No / Date</div>
            <span>:</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <div style="display:inline-block;width:43%;font-size: 15px;">${data.PaymentDocNo} / ${data.Date}</div>
          </div>
  
          <div style="position:absolute;right:0;width:450px;top:40px;">
            <div style="display:inline-block;width:175px;font-size: 15px;">Your Account with us</div>
            <span>:</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <div style="display:inline-block;width:43%;font-size: 15px;">${data.AccountNo}</div>
          </div>
          <div style="position:absolute;right:0;width:450px;top:60px;">
            <div style="display:inline-block;width:175px;font-size: 15px;">G/L Code</div>
            <span>:</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <div style="display:inline-block;width:43%;font-size: 15px;">${data.GLCode}</div>
          </div>
        </div>
        <div style="width: 100%;text-align: left;font-size: 15px;margin-top: 3rem!important;">Dear Sir/Madam,</div>
        <div style="width: 1000px;text-align: left;font-size: 15px;margin-bottom: 1rem!important;">We have credited your bank acount ${data.AccountNo}&nbsp;&nbsp;as per the below mentioned payment details.</div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse: collapse;">
            <tr style="border-top:2px solid #000;border-bottom:2px solid #000;line-height: 25px;">
              <td>Business Area</td>
        <td>Processing Doc No.</td>
              <td>Date</td>
              <td>Your Inv No.</td>
              <td>Invoice Amount</td>
              <td>Deduction</td>
              <td>Net Amount</td>
            </tr>
            ${trss}
           </table>
        </div>
        <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px;border-top:2px solid black;">
        <span style="float:left;margin-top: 10px">Sum Total</span><span style="float: right;margin-top: 10px">${data.paymentAmount}</span>
        </div>
        <div style="margin-top: 2rem!important;margin-right: 0px;margin-left: 0px;">
      <span style="float:left;margin-top: 10px">Amount in words</span><span style="float: right;margin-top: 10px">${data.amtInWord}</span>
      </div>
    
        </div>
        <div style="clear: both"></div>
        
        <div style="margin-top: 3rem!important;">Please acknowledge by sending us your Stamped official receipt</div>
        <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px;border-top:2px solid black;">
            <table style="width:100%;border-collapse: collapse;margin-top: 10px;">
                <tr style="line-height: 25px;">
                  <td>Payment Document</td>
                  <td>Bank Ref. No</td>
                  <td>Payment Date</td>
                  <td>Payment Amount</td>
                </tr>
                <tr>
                  <td>${data.PaymentDocNo}</td>
                  <td>${data.UTR}</td>
                  <td>${data.InvoiceApproveDt}</td>
                  <td>${data.paymentAmount}</td>
                </tr>
              </table>
        </div>
      <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px; font-weight:bold;">Contact Person Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      
      <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px;">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSCPayments@Coromandel.murugappa.com</div>
      <div style="margin-top: 1rem!important;margin-right: 0px;margin-left: 0px;">Mobile No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18004255696</div>
        <div style="margin-top: 3rem!important;">This is a computer generated advice not required to be signed</div>
      </div>
  
    </td>
    </tr>
    </table>
    </div>
    </body>
  </html>`
}


var trs = (data) => {

  let trs = '';
  trs += data.map(td => {
    return temptr =
      `<tr>
        <td>${td.BusinessArea}</td>
              <td>${td.processingDocNo}</td>
              <td>${td.PostingDate}</td>
              <td>${td.InvoiceNumber}</td>
              <td>${td.InvoiceAmount}</td>
              <td>${td.Deduction}</td>
              <td>${td.Amount}</td>
            </tr>`
  })
  trs = trs.replace(/,/g, "")

  return trs
}