import React from 'react';
import { RegisterForm, PageForm } from 'app/layouts';
import { UILink } from 'app/components';
import { routesPath } from 'app/config';
import { requireAnonyme } from 'app/HOC';

interface IProps {}

const _RegisterPage: React.FC<IProps> = () => {
    return (
        <PageForm
            title='Create an account'
            footer={
                <>
                    Already have an account ?{' '}
                    <UILink to={routesPath.login} color='blue.500'>
                        Sign in
                    </UILink>
                </>
            }
        >
            <RegisterForm />
        </PageForm>
    );
};

export const RegisterPage = requireAnonyme(_RegisterPage);
