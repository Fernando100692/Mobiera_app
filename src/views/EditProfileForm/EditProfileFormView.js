// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import {useToast, Box, Text, Modal, Button, HStack} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

// Components
import {FormCreator} from '../../components';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
];

const EditProfileFormView = ({navigation, authActions, route: {params}}) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {toggleFacing, setIsRecording, takePicture},
  ] = useCamera();
  const [showModal, setShowModal] = React.useState(false);
  const [profileImg, setProfileImg] = React.useState(params?.img);
  const toast = useToast();

  const {updateUserInfo} = authActions;

  const initialValues = {
    ...params,
  };

  const onUpdateUserInfo = (type, response) => {
    if (type === 'success') {
      navigation.navigate('Home');
      toast.show({
        title: 'Profile updated!',
        placement: 'top',
        backgroundColor: 'green.700',
      });
    }
  };
  const onTakePicture = data => {
    setProfileImg(data.uri);
    setShowModal(false);
  };
  const onSubmit = values =>
    updateUserInfo({...values, img: profileImg}, onUpdateUserInfo);
  return (
    <Box height="full" backgroundColor="white">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content width="full" pt="5">
          <Modal.Body>
            <Box height="full">
              <RNCamera
                ref={cameraRef}
                autoFocusPointOfInterest={autoFocusPoint.normalized}
                type={type}
                ratio={ratio}
                style={{width: windowWidth * 0.9, height: windowHeight * 0.6}}
                autoFocus={autoFocus}
                captureAudio={false}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
              <HStack space={3} alignItems="center" width="full" px="5">
                <Button colorScheme="coolGray" onPress={toggleFacing}>
                  {type}
                </Button>
              </HStack>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="lightBlue"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                colorScheme="lightBlue"
                onPress={async () => {
                  try {
                    setIsRecording(true);
                    const data = await takePicture();
                    onTakePicture(data);
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setIsRecording(false);
                  }
                }}>
                Capture
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <>
          <Image
            source={{uri: profileImg, isStatic: true}}
            style={styles.avatarStyle}
            alt="avatar"
          />
          <Text
            alignSelf="center"
            fontSize="sm"
            color="lightBlue.600"
            fontWeight={400}>
            Change photo
          </Text>
        </>
      </TouchableOpacity>
      <FormCreator
        formItemList={formItemList}
        initialValues={initialValues}
        signupSchema={signupSchema}
        onSubmit={onSubmit}
        buttonText="Update"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    width: '100%',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#0284c7',
  },
});

/**
 * Component properties.
 */
EditProfileFormView.propTypes = {
  authActions: PropTypes.shape({
    updateUserInfo: PropTypes.func,
  }).isRequired,
};

export default EditProfileFormView;
