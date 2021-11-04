// Dependencies
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Box, Text, Heading, VStack, Link, HStack, useToast} from 'native-base';
import * as Yup from 'yup';

// Components
import {FormCreator} from '../../components';

const initialValues = {
  email: '',
  password: '',
};

const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Is required'),
  password: Yup.string().min(3, 'Too Short!').required('Is required'),
});

const formItemList = [
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
];

const LoginView = ({navigation, authActions}) => {
  const toast = useToast();
  const {getUserCredentialsData} = authActions;

  const onGetLogin = (type, response) => {
    if (response.granted) {
      navigation.navigate('Home');
    } else {
      toast.show({
        title: 'Email or password are wrong!',
        placement: 'bottom',
        backgroundColor: 'red.700',
      });
    }
  };

  const onLogin = async values => {
    getUserCredentialsData({...values}, onGetLogin);
  };

  return (
    <Box safeArea flex={1} py="30" w="full" mx="auto" backgroundColor="white">
      <Heading size="lg" ml="10" fontWeight="600" color="coolGray.800">
        Mobiera App
      </Heading>
      <Heading
        mt="1"
        ml="10"
        color="coolGray.600"
        fontWeight="medium"
        size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormCreator
          formItemList={formItemList}
          initialValues={initialValues}
          signupSchema={signupSchema}
          onSubmit={onLogin}
          buttonText="Sign in"
        />
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I'm a new user.{' '}
          </Text>
          <Link
            onPress={() => navigation.navigate('RegistrationForm')}
            _text={styles.registerLinkStyle}>
            Sign up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputLabelStyle: {
    color: 'coolGray.800',
    fontSize: 'xs',
    fontWeight: 500,
  },
  rememberLinkStyle: {
    fontSize: 'xs',
    fontWeight: '500',
    color: 'lightBlue.600',
  },
  registerLinkStyle: {
    color: 'lightBlue.600',
    fontWeight: 'medium',
    fontSize: 'sm',
  },
});

/**
 * Component properties.
 */
LoginView.propTypes = {
  authActions: PropTypes.shape({
    getUserCredentialsData: PropTypes.func,
  }).isRequired,
};

export default LoginView;
