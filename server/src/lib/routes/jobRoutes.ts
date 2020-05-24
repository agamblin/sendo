import { BaseRouter } from '@services/router';
import { seeder } from '@controllers';

const jobRoutes = BaseRouter();

jobRoutes.get('/seeders', seeder);

export { jobRoutes };
