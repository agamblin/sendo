import { Sequelize } from 'sequelize';
import { logger } from '@utils';
import {
    sqlDb,
    sqlHost,
    sqlPassword,
    sqlPort,
    sqlUser,
    sequelizeLogs,
} from '@config';
import { initUser } from '@models';

class SequelizeDb {
    private db: Sequelize;
    private dbTest: Sequelize;

    constructor() {
        this.db = null;
        this.dbTest = null;
    }

    private createInstance(db: string) {
        return new Sequelize(db, sqlUser, sqlPassword, {
            dialect: 'mysql',
            host: sqlHost,
            port: sqlPort,
            // tslint:disable-next-line: no-console
            logging: sequelizeLogs ? console.log : null,
        });
    }

    private getDb(test: boolean = false) {
        if (!this.db && !test) {
            logger(
                'Database',
                `Creating standard instance...\nHost: ${sqlHost}\nUser: ${sqlUser}\nPwd: ${sqlPassword}\nPort: ${sqlPort}\nDatabase: ${sqlDb}`
            );
            this.db = this.createInstance(sqlDb);
        }
        if (!this.dbTest && test) {
            logger('Database', 'Creating test instance...');
            this.dbTest = this.createInstance('eh_testing');
        }
        return test ? this.dbTest : this.db;
    }

    private async connect(test: boolean = false) {
        return test ? this.dbTest.authenticate() : this.db.authenticate();
    }

    private async sync(force: boolean = false, test: boolean = false) {
        return test ? this.dbTest.sync({ force }) : this.db.sync({ force });
    }

    /**
     * @param db : Sequelize ;
     * Register the models into the sequelize instance
     */
    private registerModels(db: Sequelize) {
        initUser(db);
    }

    /**
     * Define sequelize relations
     */
    private registerRelations() {
        /**
         * User can have many teams
         * Teams can have many users
         */
        // User.belongsToMany(Team, { through: TeamUser });
        // Team.belongsToMany(User, { through: TeamUser });
    }

    public async close(test: ConstrainBoolean = false) {
        return test ? this.dbTest.close() : this.db.close();
    }

    /**
     * @param force : Do you want to reset the database on each instance
     * @param test : Is it test mode (eh_testing or eh)
     * Main function to initialize the database
     */
    public async init(force: boolean = false, test: boolean = false) {
        logger(
            'Database',
            `Launching database initialization (force: ${force}, test: ${test})`
        );
        if (!test && this.dbTest) {
            await this.dbTest.close();
        }
        if (test && this.db) {
            await this.db.close();
        }
        logger('Database', 'Fetching database instance...');
        const db = this.getDb(test);
        logger('Database', 'Initializing models...');
        this.registerModels(db);
        logger('Database', 'Initializing relations...');
        this.registerRelations();
        logger('Database', 'Authenticating to database...');
        await this.connect(test);
        logger('Database', 'Syncing database...');
        await this.sync(force, test);
        logger('Database', 'Initialization ok.');
    }
}

export const sequelizeDb = new SequelizeDb();
