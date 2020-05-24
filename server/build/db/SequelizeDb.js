"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeDb = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const _utils_1 = require("@utils");
const _config_1 = require("@config");
const _models_1 = require("@models");
class SequelizeDb {
    constructor() {
        this.db = null;
        this.dbTest = null;
    }
    createInstance(db) {
        return new sequelize_1.Sequelize(db, _config_1.sqlUser, _config_1.sqlPassword, {
            dialect: 'mysql',
            host: _config_1.sqlHost,
            port: _config_1.sqlPort,
            // tslint:disable-next-line: no-console
            logging: _config_1.sequelizeLogs ? console.log : null,
        });
    }
    getDb(test = false) {
        if (!this.db && !test) {
            _utils_1.logger('Database', `Creating standard instance...\nHost: ${_config_1.sqlHost}\nUser: ${_config_1.sqlUser}\nPwd: ${_config_1.sqlPassword}\nPort: ${_config_1.sqlPort}\nDatabase: ${_config_1.sqlDb}`);
            this.db = this.createInstance(_config_1.sqlDb);
        }
        if (!this.dbTest && test) {
            _utils_1.logger('Database', 'Creating test instance...');
            this.dbTest = this.createInstance('eh_testing');
        }
        return test ? this.dbTest : this.db;
    }
    connect(test = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return test ? this.dbTest.authenticate() : this.db.authenticate();
        });
    }
    sync(force = false, test = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return test ? this.dbTest.sync({ force }) : this.db.sync({ force });
        });
    }
    /**
     * @param db : Sequelize ;
     * Register the models into the sequelize instance
     */
    registerModels(db) {
        _models_1.initUser(db);
    }
    /**
     * Define sequelize relations
     */
    registerRelations() {
        /**
         * User can have many teams
         * Teams can have many users
         */
        // User.belongsToMany(Team, { through: TeamUser });
        // Team.belongsToMany(User, { through: TeamUser });
    }
    close(test = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return test ? this.dbTest.close() : this.db.close();
        });
    }
    /**
     * @param force : Do you want to reset the database on each instance
     * @param test : Is it test mode (eh_testing or eh)
     * Main function to initialize the database
     */
    init(force = false, test = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            _utils_1.logger('Database', `Launching database initialization (force: ${force}, test: ${test})`);
            if (!test && this.dbTest) {
                yield this.dbTest.close();
            }
            if (test && this.db) {
                yield this.db.close();
            }
            _utils_1.logger('Database', 'Fetching database instance...');
            const db = this.getDb(test);
            _utils_1.logger('Database', 'Initializing models...');
            this.registerModels(db);
            _utils_1.logger('Database', 'Initializing relations...');
            this.registerRelations();
            _utils_1.logger('Database', 'Authenticating to database...');
            yield this.connect(test);
            _utils_1.logger('Database', 'Syncing database...');
            yield this.sync(force, test);
            _utils_1.logger('Database', 'Initialization ok.');
        });
    }
}
exports.sequelizeDb = new SequelizeDb();
//# sourceMappingURL=SequelizeDb.js.map