import React, { useCallback } from 'react';
import { SimpleGrid, Button } from '@chakra-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useDispatch, shallowEqual } from 'react-redux';
import { FormEntry, FormError } from 'app/components';
import { required, isEmail } from 'app/shared';
import { ReduxFormValues, login } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

interface IProps {}

const _LoginForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = React.memo(
    ({ handleSubmit }) => {
        const dispatch = useDispatch();
        const { isLoading, errorMsg } = useSelector(
            state => state.authentification.login,
            shallowEqual
        );

        const onSubmit = useCallback(
            (formValues: ReduxFormValues) => {
                dispatch(login(formValues));
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
                    name='email'
                    type='email'
                    label='Email address'
                    placeholder='name@company.com'
                    validate={[required, isEmail]}
                    component={FormEntry}
                />
                <Field
                    name='password'
                    type='password'
                    label='Password'
                    placeholder='Password (at least 8 characters)'
                    validate={[required]}
                    component={FormEntry}
                />
                <Button variantColor='blue' type='submit' isLoading={isLoading}>
                    Sign in
                </Button>
                {errorMsg && <FormError message={errorMsg} />}
            </SimpleGrid>
        );
    }
);

export const LoginForm = reduxForm<{}, IProps>({
    form: 'login',
})(_LoginForm);
