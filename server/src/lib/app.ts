import { json } from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

// Routes
import { userRoutes, jobRoutes, userResolver } from '@routes';
import { IError, IRequest } from '@typings';

// Express app creation
const app = express();

// CORS configuring + parser for requests
app.use(cors());
app.use(json());

// Redirect every url beginning by auth to authRoutes
app.param('userId', userResolver);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);

// Healthcheck route
app.get('/', (_req, res) => {
    return res.status(200).json({ success: 'Sendo {API v1.0} is online' });
});

// Error handler
app.use(
    (
        error: IError,
        req: IRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        req;
        next;
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message, data });
    }
);

export { app };
