import { User } from '@models';
import { logger, getRandomUserProps } from '@utils';

const getInstances = (functionToExecute: Function, instances: number) => {
    const data = [];
    for (let i = 0; i < instances; i++) {
        data.push(functionToExecute());
    }
    return data;
};

const seedUsers = async (instances: number) => {
    const users = getInstances(() => getRandomUserProps(), instances);
    await User.bulkCreate(users);
};
export const seedData = async (instances: number = 50) => {
    logger('Seeders', `Trying to seed ${instances} instances...`);
    try {
        await seedUsers(instances);

        logger('Seeders', `Successfully seeded ${instances} instances.`);
    } catch (err) {
        logger(
            'Seeders',
            `
            Failed to seed ${instances} instances.
            Reason: ${err}
            The seeding may have worked partially. Try putting a lower value to instances
        `
        );
    }
};
