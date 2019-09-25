'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoromPayAdvise = sequelize.define('CoromPayAdvise', {
    FiscalYear: DataTypes.STRING,
    CompanyCode: DataTypes.STRING,
    PaymentDocNo: DataTypes.STRING,
    PostingDate: DataTypes.STRING,
    BusinessArea: DataTypes.STRING,
    AccountNo: DataTypes.STRING,
    SupplierReconAccount: DataTypes.STRING,
    SapInvDocument: DataTypes.STRING,
    WithholdingTax: DataTypes.STRING,
    Amount: DataTypes.STRING,
    SupplierName: DataTypes.STRING,
    Address1: DataTypes.STRING,
    Address2: DataTypes.STRING,
    Address3: DataTypes.STRING,
    City: DataTypes.STRING,
    District: DataTypes.STRING,
    Region: DataTypes.STRING,
    Pincode: DataTypes.STRING,
    GrossAmount: DataTypes.STRING,
    InvoiceNumber: DataTypes.STRING
    // PostingDate: DataTypes.STRING,
    // InvoiceNumber: DataTypes.STRING,
    // SapInvDocument: DataTypes.STRING,


  }, {
    timestamps: false,
    freezeTableName: true
  });
  CoromPayAdvise.associate = function (models) {
    // associations can be defined here
  };
  return CoromPayAdvise;
};


