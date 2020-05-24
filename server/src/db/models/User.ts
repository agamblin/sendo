import { Model, DataTypes, Sequelize } from 'sequelize';
import { hash } from 'bcryptjs';
import { encode } from 'jwt-simple';
import { jwtSecret } from '@config';

// import {
// 	HasManyGetAssociationsMixin,
// 	HasManyAddAssociationMixin,
// 	HasManyHasAssociationMixin,
// 	Association,
// 	HasManyCountAssociationsMixin,
// 	HasManyCreateAssociationMixin
// } from 'sequelize/lib/associations';

export interface IUserProps {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatarUrl: string;
}

export class User extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public firstName: string;
    public lastName: string;
    public username!: string;
    public email!: string; // for nullable fields
    public avatarUrl: string;
    public country: string;
    public city: string;
    public phoneNumber: string;
    public password: string;
    public superAdmin: boolean;
    public hashtag: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    getAccessToken() {
        const timestamp = new Date().getTime();
        return encode({ sub: this.id, iat: timestamp }, jwtSecret);
    }
}

export const initUser = (db: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },

            password: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatarUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:
                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            },
        },
        {
            tableName: 'Users',
            sequelize: db,
        }
    );

    User.beforeCreate(async user => {
        const hashed = await hash(user.password, 10);
        user.password = hashed;
        return Promise.resolve();
    });
};
