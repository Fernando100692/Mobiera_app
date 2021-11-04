// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Platform, ScrollView} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import {
  VStack,
  FormControl,
  Input,
  Box,
  Button,
  Text,
  KeyboardAvoidingView,
} from 'native-base';

export const FormCreator = ({
  formItemList,
  initialValues,
  signupSchema,
  onSubmit,
  buttonText,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={signupSchema}
    onSubmit={values => onSubmit(values)}>
    {({handleChange, handleBlur, handleSubmit, values}) => (
      <KeyboardAvoidingView
        showsVerticalScrollIndicator={false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollStyle}>
          <Box
            safeArea
            flex={1}
            px="10"
            w="100%"
            mx="auto"
            backgroundColor="white">
            <VStack space={3} mt="5">
              {formItemList?.map((itm, idx) => {
                return (
                  <FormControl key={idx}>
                    <FormControl.Label _text={styles.inputLabelStyle}>
                      {itm.formItemName}
                    </FormControl.Label>
                    <Input
                      value={values[itm.formItemKey]}
                      onChangeText={handleChange(itm.formItemKey)}
                      onBlur={handleBlur(itm.formItemKey)}
                      type={itm.inputType}
                    />
                    <Text fontSize="xs" color="error.500" fontWeight="semibold">
                      <ErrorMessage name={itm.formItemKey} />
                    </Text>
                  </FormControl>
                );
              })}
              <Button
                onPress={handleSubmit}
                mt="2"
                colorScheme="lightBlue"
                _text={{color: 'white'}}>
                {buttonText}
              </Button>
            </VStack>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    )}
  </Formik>
);

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
  scrollStyle: {backgroundColor: 'white'},
});

/**
 * Component properties.
 */
FormCreator.propTypes = {
  formItemList: PropTypes.array,
  initialValues: PropTypes.object,
  signupSchema: PropTypes.any,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
};
