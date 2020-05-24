"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const tslib_1 = require("tslib");
const _utils_1 = require("@utils");
const _models_1 = require("@models");
exports.userResolver = (req, res, next, id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        res;
        const user = yield _models_1.User.findByPk(id);
        if (!user) {
            _utils_1.logger('Resolver', `User ${id} not found`);
            return next(_utils_1.notFoundError('User'));
        }
        req.user = user;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=userResolver.js.map