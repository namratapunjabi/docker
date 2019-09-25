'use strict';
module.exports = (sequelize, DataTypes) => {
  const InvoiceDetail = sequelize.define('InvoiceDetail', {
    PaymentDocNo: DataTypes.STRING,
    FiscalYear: DataTypes.STRING,
    CompCode: DataTypes.STRING,
    Utrdatetime: DataTypes.DATE,
    OrgId: DataTypes.INTEGER,
    Amount: DataTypes.INTEGER,
    UTR: DataTypes.STRING,
    InvoiceApproveDt: DataTypes.DATE,
    RunDate: DataTypes.DATE



    // Utrdatetime:
  }, {
    freezeTableName: true,
    timestamps: false
  });
  InvoiceDetail.associate = function (models) {
    // associations can be defined here

    InvoiceDetail.belongsTo(models.VendorDetail, {

      as: 'Vender',
      foreignKey: 'VenderId'
    })
  };
  return InvoiceDetail;
};

