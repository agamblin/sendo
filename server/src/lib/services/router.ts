import { Router } from 'express';
import { userResolver } from '@routes';

export const BaseRouter = (): Router =>
    Router({ mergeParams: true }).param('userId', userResolver);
