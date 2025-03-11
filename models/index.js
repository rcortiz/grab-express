import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = config[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  );

await Promise.all(
  files.map(async (file) => {
    const model = await import(`./${file}`);
    if (!model.default) {
      return;
    }

    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  })
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

return db;
