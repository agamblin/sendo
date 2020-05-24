"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const bcryptjs_1 = require("bcryptjs");
const jwt_simple_1 = require("jwt-simple");
const _config_1 = require("@config");
class User extends sequelize_1.Model {
    getAccessToken() {
        const timestamp = new Date().getTime();
        return jwt_simple_1.encode({ sub: this.id, iat: timestamp }, _config_1.jwtSecret);
    }
}
exports.User = User;
exports.initUser = (db) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        avatarUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        },
    }, {
        tableName: 'Users',
        sequelize: db,
    });
    User.beforeCreate((user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const hashed = yield bcryptjs_1.hash(user.password, 10);
        user.password = hashed;
        return Promise.resolve();
    }));
};
//# sourceMappingURL=User.js.map