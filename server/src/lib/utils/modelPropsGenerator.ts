import { internet, name } from 'faker';
import { IUserProps } from '@models';

export const getRandomUserProps = (): IUserProps => {
    const firstName = name.firstName();
    const lastName = name.lastName();
    return {
        firstName,
        lastName,

        email: internet.email(firstName, lastName),
        avatarUrl: internet.avatar(),
        password: internet.password(),
    };
};
