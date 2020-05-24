"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const _utils_1 = require("@utils");
const _config_1 = require("@config");
/**
 * Base class to all Controllers
 */
let ModelController = /** @class */ (() => {
    class ModelController {
        constructor(model) {
            this.model = model;
            this.modelName = this.model.toString().split(' ')[1].toLowerCase();
            this.findAll = this.findAll.bind(this);
            this.findById = this.findById.bind(this);
            this.deleteById = this.deleteById.bind(this);
            this.updateById = this.updateById.bind(this);
            this.create = this.create.bind(this);
        }
        /**
         * Method by defaults.
         * You can implement it yourself on your controller
         */
        findAll(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { pagination, filters, count } = req;
                try {
                    if (!count) {
                        const records = yield this.model.findAll({
                            limit: _config_1.RECORDS_PER_PAGE,
                            offset: (pagination - 1) * _config_1.RECORDS_PER_PAGE,
                            where: filters,
                            raw: true,
                        });
                        return res
                            .status(200)
                            .json(records.map(record => lodash_1.omit(record, ..._config_1.FORBIDDEN_FIELDS)));
                    }
                    const recordsCount = yield this.model.count({ where: filters });
                    return res.status(200).json({ records: recordsCount });
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        findById(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const instance = req[`${this.modelName}`];
                try {
                    return res
                        .status(200)
                        .json(lodash_1.omit(instance.get({ plain: true }), ..._config_1.FORBIDDEN_FIELDS));
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        deleteById(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const instance = req[`${this.modelName}`];
                try {
                    yield instance.destroy();
                    return res.sendStatus(200);
                }
                catch (err) {
                    return next(err);
                }
            });
        }
    }
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ModelController.prototype, "findAll", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ModelController.prototype, "findById", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ModelController.prototype, "deleteById", null);
    return ModelController;
})();
exports.ModelController = ModelController;
//# sourceMappingURL=ModelController.js.map