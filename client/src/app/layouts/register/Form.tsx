import React, { useCallback } from 'react';
import { SimpleGrid, Button } from '@chakra-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { FormEntry } from 'app/components';
import {
    required,
    isEmail,
    getMinFunction,
    getMaxFunction,
    matchesPassword,
    capitalizeWords,
} from 'app/shared';

export type ReduxFormValues = { [key: string]: string };
interface IProps {}

const _RegisterForm: React.FC<IProps &
    InjectedFormProps<{}, IProps>> = React.memo(({ handleSubmit }) => {
    const onSubmit = useCallback((formValues: ReduxFormValues) => {
        // tslint:disable-next-line: no-console
        console.log('register values', formValues);
    }, []);

    return (
        <SimpleGrid
            px={8}
            py={8}
            as='form'
            columns={1}
            spacing={8}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Field
                name='firstname'
                type='text'
                label='Name'
                placeholder='Your full name'
                component={FormEntry}
                validate={[required, getMinFunction(4)]}
                normalize={capitalizeWords}
            />
            <Field
                name='email'
                type='email'
                label='Email address'
                placeholder='name@company.com'
                component={FormEntry}
                validate={[required, isEmail]}
            />
            <Field
                name='password'
                type='password'
                label='Password'
                placeholder='Password (at least 8 characters)'
                component={FormEntry}
                validate={[required, getMinFunction(8), getMaxFunction(20)]}
            />
            <Field
                name='passwordConfirm'
                type='password'
                label='Confirm password'
                placeholder='Confirm password'
                component={FormEntry}
                validate={[required, matchesPassword]}
            />
            <Button d='block' variantColor='blue' type='submit'>
                Sign up
            </Button>
        </SimpleGrid>
    );
});

export const RegisterForm = reduxForm<{}, IProps>({
    form: 'register',
})(_RegisterForm);
