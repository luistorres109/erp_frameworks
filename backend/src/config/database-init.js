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
   console.log(DBOptionLocation.name)
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
   if (await DBUser.count() == 0) {
      // senha: admin
      await DBUser.create({
         name: "Admin",
         office_id: 1,
         login: "admin",
         password: "$2b$10$cQ.bOKkBI5GfVkgwLffc.u4LBSeo6Cct.ytPjSGFPZ8ODdNnhzcxu"
      });
   }
   const option_p = (await DBOptionLocation.findOrCreate({ where: { name: "product" } }))[0];
   await DBOption.findOrCreate({
      where: { value: "Unidade", location_id: option_p.id, },
   });
   await DBOption.findOrCreate({
      where: { value: "Kilo", location_id: option_p.id },
   });
   await DBOption.findOrCreate({
      where: { value: "Grama", location_id: option_p.id },
   });

   // await DBOptionLocation.findOrCreate({
   //    where: { id: 2 },
   //    defaults: { name: "Medidas do produto" }
   // })
   // await DBOption.findOrCreate({
   //    where: { id: 1, },
   //    defaults: { value: "Unidade", location_id: 2 }
   // });


}

export default { init, insertDev };