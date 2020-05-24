"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeLogs = exports.jwtSecret = exports.sqlPort = exports.sqlDb = exports.sqlPassword = exports.sqlUser = exports.sqlHost = void 0;
exports.sqlHost = process.env.SQL_HOST;
exports.sqlUser = process.env.SQL_USER;
exports.sqlPassword = process.env.SQL_PASSWORD;
exports.sqlDb = process.env.SQL_DB;
exports.sqlPort = parseInt(process.env.SQL_PORT);
exports.jwtSecret = process.env.JWT_SECRET;
exports.sequelizeLogs = Boolean(process.env.SEQUELIZE_LOGS);
//# sourceMappingURL=keys.js.map