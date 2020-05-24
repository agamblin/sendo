"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const router_1 = require("@services/router");
const _controllers_1 = require("@controllers");
const jobRoutes = router_1.BaseRouter();
exports.jobRoutes = jobRoutes;
jobRoutes.get('/seeders', _controllers_1.seeder);
//# sourceMappingURL=jobRoutes.js.map