// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useToast, Box} from 'native-base';

// Components
import {FormCreator} from '../../components';

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Is required'),
  lastName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Is required'),
  email: Yup.string().email('Invalid email').required('Is required'),
  password: Yup.string().min(3, 'Too Short!').required('Is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Is required'),
});

const formItemList = [
  {
    formItemKey: 'firstName',
    formItemName: 'First name',
  },
  {
    formItemKey: 'lastName',
    formItemName: 'Last name',
  },
  {
    formItemKey: 'email',
    formItemName: 'Email',
    inputType: 'email',
  },
  {
    formItemKey: 'password',
    formItemName: 'Password',
    inputType: 'password',
  },
  {
    formItemKey: 'confirmPassword',
    formItemName: 'Confirm password',
    inputType: 'password',
  },
];

const RegisterFormView = ({navigation, authActions}) => {
  const toast = useToast();
  const {userSignUp} = authActions;

  const onSignUp = (type, response) => {
    if (type === 'success') {
      navigation.navigate('Login');
      toast.show({
        title: 'Registration completed!',
        placement: 'top',
        backgroundColor: 'green.700',
      });
    }
  };

  const onSubmit = values => userSignUp(values, onSignUp);

  return (
    <Box height="full" backgroundColor="white">
      <FormCreator
        formItemList={formItemList}
        initialValues={initialValues}
        signupSchema={signupSchema}
        onSubmit={onSubmit}
        buttonText="Sign up"
      />
    </Box>
  );
};

/**
 * Component properties.
 */
RegisterFormView.propTypes = {
  authActions: PropTypes.shape({
    userSignUp: PropTypes.func,
  }).isRequired,
};

export default RegisterFormView;
