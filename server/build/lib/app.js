"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = require("body-parser");
const cors = require("cors");
const express = require("express");
// Routes
const _routes_1 = require("@routes");
// Express app creation
const app = express();
exports.app = app;
// CORS configuring + parser for requests
app.use(cors());
app.use(body_parser_1.json());
// Redirect every url beginning by auth to authRoutes
app.param('userId', _routes_1.userResolver);
app.use('/users', _routes_1.userRoutes);
app.use('/jobs', _routes_1.jobRoutes);
// Healthcheck route
app.get('/', (_req, res) => {
    return res.status(200).json({ success: 'Spendo {API v1.0} is online' });
});
// Error handler
app.use((error, req, res, next) => {
    req;
    next;
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});
//# sourceMappingURL=app.js.map