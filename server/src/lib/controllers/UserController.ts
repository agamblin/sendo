import { Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import { omit } from 'lodash';
import { IRequest } from '@typings';
import { User } from '@models';
import {
    logRequest,
    notFoundError,
    unauthorizedError,
    conflictError,
} from '@utils';
import { ModelController } from '@controllers';
import { FORBIDDEN_FIELDS } from '@config';

class UserController extends ModelController<typeof User> {
    constructor() {
        super(User);
    }

    @logRequest
    async create(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> {
        try {
            const { email } = req.body;

            const conflictUser: User = await User.findOne({
                where: { email },
            });
            if (conflictUser) {
                return next(conflictError('User already exist'));
            }
            const user = await User.create(req.body);
            return res.status(201).json({
                token: user.getAccessToken(),
            });
        } catch (err) {
            return next(err);
        }
    }

    @logRequest
    async getToken(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(notFoundError('User'));
            }
            const equal = await compare(password, user.password);
            if (!equal) {
                return next(unauthorizedError('Invalid credentials'));
            }
            return res.status(200).json({
                token: user.getAccessToken(),
            });
        } catch (err) {
            return next(err);
        }
    }

    @logRequest
    async getMe(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> {
        try {
            const { owner } = req;
            return res
                .status(200)
                .json(omit(owner.get({ plain: true }), ...FORBIDDEN_FIELDS));
        } catch (err) {
            return next(err);
        }
    }

    @logRequest
    async updateById(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> {
        const { user, body } = req;

        try {
            user.email = body.email || user.email;
            user.firstName = body.firstName || user.firstName;
            user.lastName = body.lastName || user.lastName;
            user.avatarUrl = body.avatarUrl || user.avatarUrl;
            await user.save();
            return res
                .status(200)
                .json(omit(user.get({ plain: true }), 'password'));
        } catch (err) {
            return next(err);
        }
    }

    @logRequest
    async checkIfEmailIsAvailable(
        req: IRequest,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.sendStatus(200);
            }
            return next(conflictError('Email is already in use'));
        } catch (err) {
            return next(err);
        }
    }
}

export const userController = new UserController();
