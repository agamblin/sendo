"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-import-side-effect
require("module-alias/register");
const _app_1 = require("@app");
const _db_1 = require("@db");
const _utils_1 = require("@utils");
_db_1.sequelizeDb
    .init(process.env.NODE_ENV === 'CI' ||
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging')
    .then(() => {
    _app_1.app.listen(process.env.PORT_API, () => {
        _utils_1.logger('Server', `Executed in ${process.env.NODE_ENV} mode`);
        _utils_1.logger('Server', `Server listening on ${process.env.PORT_API}`);
    });
})
    .catch((err) => {
    _utils_1.logger('Database', `Failed to initialize database: ${err}`);
});
//# sourceMappingURL=server.js.map