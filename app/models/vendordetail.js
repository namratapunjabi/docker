'use strict';
module.exports = (sequelize, DataTypes) => {
  const VendorDetail = sequelize.define('VendorDetail', {
    Email: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
  VendorDetail.associate = function (models) {
    // associations can be defined here
    VendorDetail.hasMany(models.InvoiceDetail, {
      as: 'Vender',
      foreignKey: 'VenderId'
    })
  };
  return VendorDetail;
};

