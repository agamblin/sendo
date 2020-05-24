"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
const _routes_1 = require("@routes");
exports.BaseRouter = () => express_1.Router({ mergeParams: true }).param('userId', _routes_1.userResolver);
//# sourceMappingURL=router.js.map