"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeder = void 0;
const tslib_1 = require("tslib");
const _db_1 = require("@db");
exports.seeder = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { instances } = req.query;
    try {
        yield _db_1.seedData(Number(instances));
        return res.status(200).json({
            status: 'Success',
        });
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=JobController.js.map