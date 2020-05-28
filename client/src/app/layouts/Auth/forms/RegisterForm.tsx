import React, { useCallback } from 'react';
import { SimpleGrid, Button } from '@chakra-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useDispatch } from 'react-redux';
import { FormEntry } from 'app/components';
import {
    required,
    isEmail,
    getMinFunction,
    getMaxFunction,
    matchesPassword,
    capitalizeWords,
    isEmailAvailable,
} from 'app/shared';
import { ReduxFormValues, register } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

interface IProps {}

const _RegisterForm: React.FC<IProps &
    InjectedFormProps<{}, IProps>> = React.memo(({ handleSubmit }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(
        state => state.authentification.register.isLoading
    );

    const onSubmit = useCallback(
        (formValues: ReduxFormValues) => {
            dispatch(register(formValues));
        },
        [dispatch]
    );

    return (
        <SimpleGrid
            p={8}
            as='form'
            columns={1}
            spacing={8}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Field
                name='fullName'
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
            <Button variantColor='blue' type='submit' isLoading={isLoading}>
                Sign up
            </Button>
        </SimpleGrid>
    );
});

export const RegisterForm = reduxForm<{}, IProps>({
    form: 'register',
    asyncValidate: isEmailAvailable,
    asyncBlurFields: ['email'],
})(_RegisterForm);
