import React, { useCallback, useState } from 'react';
import { SimpleGrid, Button, useToast } from '@chakra-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { useDispatch } from 'react-redux';
import { FormEntry } from 'app/components';
import { required, isEmail } from 'app/shared';
import { ReduxFormValues, login, AsyncDispatch } from 'app/actions';

interface IProps {}

const _LoginForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = React.memo(
    ({ handleSubmit }) => {
        const dispatch = useDispatch() as AsyncDispatch;
        const [isLoading, setLoading] = useState(false);
        const toast = useToast();

        const onSubmit = useCallback(
            async (formValues: ReduxFormValues) => {
                setLoading(true);
                try {
                    await dispatch(login(formValues));
                    toast({
                        duration: 9000,
                        position: 'top',
                        isClosable: true,
                        status: 'success',
                        title: 'Login successful',
                        description: `Happy to see you again !`,
                    });
                } catch (err) {
                    setLoading(false);
                    toast({
                        position: 'top',
                        duration: 9000,
                        isClosable: true,
                        status: 'error',
                        title: 'Login error',
                        description: err || 'Unknown error.',
                    });
                }
            },
            [dispatch, toast]
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
            </SimpleGrid>
        );
    }
);

export const LoginForm = reduxForm<{}, IProps>({
    form: 'login',
})(_LoginForm);
