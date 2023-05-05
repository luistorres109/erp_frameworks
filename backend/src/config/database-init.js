import { DBCep } from "#MODELS/DBCep.js";
import { DBClient } from "#MODELS/DBClient.js";
import { DBOffice } from "#MODELS/DBOffice.js";
import { DBOfficePermissions } from "#MODELS/DBOfficePermission.js";
import { DBOption } from "#MODELS/DBOption.js";
import { DBOptionLocation } from "#MODELS/DBOptionLocation.js";
import { DBOrder } from "#MODELS/DBOrder.js";
import { DBOrderItem } from "#MODELS/DBOrderItem.js";
import { DBPermission } from "#MODELS/DBPermission.js";
import { DBProduct } from "#MODELS/DBProduct.js";
import { DBUser } from "#MODELS/DBUser.js";
import { DBUserPermission } from "#MODELS/DBUserPermission.js";


function init(sequelize) {

   DBOffice.init(sequelize);
   DBUser.init(sequelize);
   DBPermission.init(sequelize);
   DBUserPermission.init(sequelize);
   DBOption.init(sequelize);
   DBProduct.init(sequelize);
   DBClient.init(sequelize);
   DBOrder.init(sequelize);
   DBOrderItem.init(sequelize);
   DBOfficePermissions.init(sequelize);
   DBOptionLocation.init(sequelize);
   DBCep.init(sequelize);

   // Cria as ASSOCIAÇÕES das tabelas, OBS: A ordem da associação é muito importante!
   const { models } = sequelize;

   DBOffice.associate(models);
   DBUser.associate(models);
   DBPermission.associate(models);
   DBUserPermission.associate(models);
   DBOption.associate(models);
   DBProduct.associate(models);
   DBClient.associate(models);
   DBOrder.associate(models);
   DBOrderItem.associate(models);
   DBOfficePermissions.associate(models);
   DBOptionLocation.associate(models);
   DBCep.associate(models);

}

// Função para criar primeiros registro de teste em ambiente de desenvolvimento
async function insertDev() {
   if (await DBOffice.count() == 0) {
      await DBOffice.create({ name: "Admin" });
   }
}

export default { init, insertDev };