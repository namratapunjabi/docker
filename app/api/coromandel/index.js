const db = require('../../models'),
    express = require('express'),
    router = module.exports = express.Router(),
    bodyParser = require("body-parser"),
    moment = require('moment'),
    num = require('../externalmodules/numberToWords').numberToWord,
    coroTemplate = require('../../templates/coromandel').coroTemplate,
    queue = require('../externalmodules/queue').queue,
    sequelize = db.sequelize,
    Sequelize = db.Sequelize,
    Op = Sequelize.Op,
    advice = db.CoromPayAdvise,
    invoice = db.InvoiceDetail,
    vendor = db.VendorDetail,
    routingKey = "PaymentAdvice";


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function getDate() {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;   // IST offset UTC +5:30 

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // ISTTime now represents the time in IST coordinates
    // var hoursIST = ISTTime.getHours()
    // var minutesIST = ISTTime.getMinutes()
    return ISTTime
}
// moment(curr_date).format('YYYY-MM-DD HH:mm:ss.SSS')
// var c_date = new Date();
// var month = c_date.getMonth() + 1
// curr_date = moment(c_date.getFullYear() + '-' + month + '-' + c_date.getDate() + " 00:00:00:000").format('YYYY-MM-DD HH:mm:ss.SSS');

// console.log(curr_date)

router.post("/advice", (req, res) => {
    console.log("============")
    console.log(req.body)
    var { payDocNo, fiscalYear, compCode } = req.body
    invoice.findAll({
        where: {
            OrgId: 257,
            FiscalYear: fiscalYear,
            CompCode: compCode,
            PaymentDocNo: payDocNo
            // PaymentDocNo: "0004405777"
            // Utrdatetime: {
            //     [Op.between]: [curr_date, getDate()],
            // },
            // Utrdatetime: {
            //     [Op.lt]: getDate(),
            //     [Op.gt]: moment(new Date(getDate() - 24 * 60 * 60 * 1000))
            // }
        },
        include: [{ model: vendor, as: 'Vender' }],
        attribute: ['FiscalYear', "CompCode", "PaymentDocNo", "UTR", "InvoiceApproveDt", "Amount", "RunDate"]
    }).then(datum => {

        var prom = datum.map(asyncFun)
        final = Promise.all(prom)
        final.then(templateData => {
            let finalTemplate = JSON.stringify(coroTemplate(templateData))
            queue("", routingKey, finalTemplate)
            res.send({ err: false, msg: "Data pushed to the queue" })
            // console.log(typeof finalTemplate)
            // res.write(finalTemplate.body)

        }).catch(err => {
            res.send({ err: true, msg: err })

        })


    })
        .catch(err => {
            res.send({ err: true, msg: err })

        })
})


function onErr(err) {

}





/**
 * 
 * Function returns final data to be sent in advice
 */

const asyncFun = (data) => {
    return new Promise((resolve, reject) => {
        advice.findAll({
            where: {
                FiscalYear: data.FiscalYear,
                CompanyCode: data.CompCode,
                PaymentDocNo: data.PaymentDocNo
            },
            attribute: ["FiscalYear", "CompanyCode", "PaymentDocNo", "PostingDate", "BusinessArea", "AccountNo", "SupplierReconAccount", "SapInvDocument", "WithholdingTax", "Amount", "GrossAmount", "SupplierName", "Address1", "Address2", "Address3", "City", "District", "Region", "Pincode", "InvoiceNumber"]
        }).then(pAdv => {
            if (pAdv.length > 0) {
                let arr = [];
                let obj = {};
                obj["SupplierName"] = pAdv[0].SupplierName;
                obj["Address1"] = pAdv[0].Address1;
                obj["Address2"] = pAdv[0].Address2;
                obj["Address3"] = pAdv[0].Address3;
                obj["City"] = pAdv[0].City;
                obj["District"] = pAdv[0].District;
                obj["Region"] = pAdv[0].Region;
                obj["Pincode"] = pAdv[0].Pincode;
                obj["PaymentDocNo"] = data.PaymentDocNo;
                obj["Date"] = data.RunDate;
                obj["AccountNo"] = pAdv[0].AccountNo;
                obj["GLCode"] = pAdv[0].SupplierReconAccount;
                obj["UTR"] = data.UTR;

                var current_datetime = data.InvoiceApproveDt;
                obj["InvoiceApproveDt"] = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
                obj["paymentAmount"] = data.Amount;
                obj["amtInWord"] = num(data.Amount);
                obj["Email"] = data.Vender.Email;
                // console.log("*************************")
                // console.log(data.Amount)

                pAdv.map(da => {
                    let advArr = {
                        BusinessArea: da.BusinessArea,
                        processingDocNo: da.SapInvDocument,
                        PostingDate: da.PostingDate.slice(0, 10),
                        InvoiceNumber: da.InvoiceNumber,
                        InvoiceAmount: da.GrossAmount,
                        Deduction: da.WithholdingTax,
                        Amount: da.Amount,
                    }
                    arr.push(advArr)
                })
                obj.arr = arr;
                resolve(obj)
            } else {
                reject("No advice found")
            }
        }).catch(err => {
            reject(err)
        })
    })
}