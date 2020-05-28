import { body } from 'express-validator/check';
import { BaseRouter } from '@services/router';
import { userController } from '@controllers';
import {
    requireValidation,
    requireAuth,
    requireFiltersOrPagination,
} from '@middlewares';

const userRoutes = BaseRouter();

/**
 * Get routes
 */
userRoutes.get(
    '/',
    requireAuth,
    requireFiltersOrPagination,
    userController.findAll
);

userRoutes.get('/me', requireAuth, userController.getMe);

userRoutes.get('/:userId', requireAuth, userController.findById);

/**
 * Post routes
 */
userRoutes.post(
    '/',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password')
            .trim()
            .isLength({ min: 8, max: 50 })
            .withMessage('Please enter a password between 8 and 50 characters'),
        body('firstName').trim().isString(),
        body('lastName').trim().isString(),
    ],
    requireValidation,
    userController.create
);

userRoutes.post(
    '/token',
    [body('email').isEmail().withMessage('Please enter a valid email')],
    requireValidation,
    userController.getToken
);

userRoutes.post(
    '/email',
    [body('email').isEmail()],
    requireValidation,
    userController.checkIfEmailIsAvailable
);

/**
 * Patch routes
 */
userRoutes.patch('/:userId', requireAuth, userController.updateById);

/**
 * Delete routes
 */
userRoutes.delete('/:userId', requireAuth, userController.deleteById);

export { userRoutes };
