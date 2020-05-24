"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = require("lodash");
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const _controllers_1 = require("@controllers");
const _config_1 = require("@config");
let UserController = /** @class */ (() => {
    class UserController extends _controllers_1.ModelController {
        constructor() {
            super(_models_1.User);
        }
        create(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const { email } = req.body;
                    const conflictUser = yield _models_1.User.findOne({
                        where: { email },
                    });
                    if (conflictUser) {
                        return next(_utils_1.conflictError('User already exist'));
                    }
                    const user = yield _models_1.User.create(req.body);
                    return res.status(201).json({
                        user: lodash_1.omit(user.get({ plain: true }), ..._config_1.FORBIDDEN_FIELDS),
                        token: user.getAccessToken(),
                    });
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        getToken(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { email, password } = req.body;
                try {
                    const user = yield _models_1.User.findOne({ where: { email } });
                    if (!user) {
                        return next(_utils_1.notFoundError('User'));
                    }
                    const equal = yield bcryptjs_1.compare(password, user.password);
                    if (!equal) {
                        return next(_utils_1.unauthorizedError('Invalid credentials'));
                    }
                    return res.status(200).json({
                        user: lodash_1.omit(user.get({ plain: true }), ..._config_1.FORBIDDEN_FIELDS),
                        token: user.getAccessToken(),
                    });
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        getMe(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const { owner } = req;
                    return res
                        .status(200)
                        .json(lodash_1.omit(owner.get({ plain: true }), ..._config_1.FORBIDDEN_FIELDS));
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        updateById(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { user } = req;
                try {
                    user.username = req.body.username || user.username;
                    user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
                    user.country = req.body.country || user.country;
                    user.city = req.body.city || user.city;
                    user.firstName = req.body.firstName || user.firstName;
                    user.lastName = req.body.lastName || user.lastName;
                    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
                    yield user.save();
                    return res
                        .status(200)
                        .json(lodash_1.omit(user.get({ plain: true }), 'password'));
                }
                catch (err) {
                    return next(err);
                }
            });
        }
        checkIfEmailIsAvailable(req, res, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { email } = req.body;
                try {
                    const user = yield _models_1.User.findOne({ where: { email } });
                    if (!user) {
                        return res.sendStatus(200);
                    }
                    return next(_utils_1.conflictError());
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
    ], UserController.prototype, "create", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UserController.prototype, "getToken", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UserController.prototype, "getMe", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UserController.prototype, "updateById", null);
    tslib_1.__decorate([
        _utils_1.logRequest,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Function]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UserController.prototype, "checkIfEmailIsAvailable", null);
    return UserController;
})();
exports.userController = new UserController();
//# sourceMappingURL=UserController.js.map