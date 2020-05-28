import React from 'react';
import { PageForm, LoginForm } from 'app/layouts';
import { UILink } from 'app/components';
import { routesPath } from 'app/config';
import { requireAnonyme } from 'app/HOC';

interface IProps {}

const _LoginPage: React.FC<IProps> = () => {
    return (
        <PageForm
            title='Sign in to Sendo'
            footer={
                <>
                    New to Sendo ?{' '}
                    <UILink to={routesPath.register} color='blue.500'>
                        Sign up
                    </UILink>
                </>
            }
        >
            <LoginForm />
        </PageForm>
    );
};

export const LoginPage = requireAnonyme(_LoginPage);
