"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireFiltersOrPagination = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const sequelize_1 = require("sequelize");
const CONFIG_FIELDS = ['page', 'count'];
exports.requireFiltersOrPagination = (req, _res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const count = Boolean(req.query.count) || false;
    const queryFilters = lodash_1.omit(req.query, ...CONFIG_FIELDS);
    const filtersArray = Object.entries(queryFilters).map(([key, value]) => {
        return {
            key,
            operator: { [sequelize_1.Op.like]: `${value}%` },
        };
    });
    const filters = lodash_1.fromPairs(lodash_1.map(filtersArray, i => [i.key, i.operator]));
    req.filters = filters;
    req.pagination = page;
    req.count = count;
    return next();
});
//# sourceMappingURL=requireFiltersOrPagination.js.map