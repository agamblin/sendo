"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const passport_1 = require("passport");
// tslint:disable-next-line: no-floating-promises
Promise.resolve().then(() => require('@services/passport'));
// Middleware to check if the user is logged in or not
exports.requireAuth = passport_1.authenticate('jwt', {
    session: false,
    assignProperty: 'owner',
});
//# sourceMappingURL=requireAuth.js.map