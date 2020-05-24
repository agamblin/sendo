"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = require("passport");
const passport_jwt_1 = require("passport-jwt");
const _models_1 = require("@models");
const _config_1 = require("@config");
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: _config_1.jwtSecret,
};
const jwtLogin = new passport_jwt_1.Strategy(jwtOptions, 
// tslint:disable-next-line: no-any
(payload, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const owner = yield _models_1.User.findByPk(payload.sub);
    if (!owner) {
        return done(null, false);
    }
    return done(null, owner);
}));
/*
Equivalent to passport.use
**/
passport_1.use(jwtLogin);
//# sourceMappingURL=passport.js.map