"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const check_1 = require("express-validator/check");
const router_1 = require("@services/router");
const _controllers_1 = require("@controllers");
const _middlewares_1 = require("@middlewares");
const userRoutes = router_1.BaseRouter();
exports.userRoutes = userRoutes;
/**
 * Get routes
 */
userRoutes.get('/', _middlewares_1.requireAuth, _middlewares_1.requireFiltersOrPagination, _controllers_1.userController.findAll);
userRoutes.get('/me', _middlewares_1.requireAuth, _controllers_1.userController.getMe);
userRoutes.get('/:userId', _middlewares_1.requireAuth, _controllers_1.userController.findById);
/**
 * Post routes
 */
userRoutes.post('/', [
    check_1.body('email').isEmail().withMessage('Please enter a valid email'),
    check_1.body('password')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Please enter a password between 5 and 20 characters'),
    check_1.body('firstName').trim().isString(),
    check_1.body('lastName').trim().isString(),
    check_1.body('username').trim().isLength({ min: 2, max: 25 }),
], _middlewares_1.requireValidation, _controllers_1.userController.create);
userRoutes.post('/token', [check_1.body('email').isEmail().withMessage('Please enter a valid email')], _middlewares_1.requireValidation, _controllers_1.userController.getToken);
userRoutes.post('/email', [check_1.body('email').isEmail()], _middlewares_1.requireValidation, _controllers_1.userController.checkIfEmailIsAvailable);
/**
 * Patch routes
 */
userRoutes.patch('/:userId', _middlewares_1.requireAuth, _controllers_1.userController.updateById);
/**
 * Delete routes
 */
userRoutes.delete('/:userId', _middlewares_1.requireAuth, _controllers_1.userController.deleteById);
//# sourceMappingURL=userRoutes.js.map