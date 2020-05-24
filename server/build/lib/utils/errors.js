"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unprocessableEntity = exports.conflictError = exports.notFoundError = exports.unauthorizedError = void 0;
exports.unauthorizedError = (msg = 'Unauthorized') => {
    const error = new Error(msg);
    error.statusCode = 401;
    error.message = msg;
    return error;
};
exports.notFoundError = (entity) => {
    const error = new Error(`${entity} not found`);
    error.statusCode = 404;
    error.message = `${entity} not found`;
    return error;
};
exports.conflictError = (msg) => {
    const error = new Error(msg || 'Conflict');
    error.statusCode = 409;
    error.message = msg || 'Conflict';
    return error;
};
exports.unprocessableEntity = (msg, errors) => {
    const error = new Error(msg || 'Unprocessable entity');
    error.statusCode = 422;
    if (errors) {
        error.data = errors.array();
    }
    return error;
};
//# sourceMappingURL=errors.js.map