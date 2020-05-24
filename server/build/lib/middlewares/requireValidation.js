"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidation = void 0;
const check_1 = require("express-validator/check");
const _utils_1 = require("@utils");
// Use express validator to check if all rules are passing, redirecting to error handler otherwise
exports.requireValidation = (req, res, next) => {
    const errors = check_1.validationResult(req);
    res;
    if (!errors.isEmpty()) {
        return next(_utils_1.unprocessableEntity('Validation errors', errors));
    }
    next();
};
//# sourceMappingURL=requireValidation.js.map