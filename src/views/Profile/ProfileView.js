/* eslint-disable react-hooks/exhaustive-deps */
//Dependencies
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import RNRestart from 'react-native-restart';
import {
  Box,
  Avatar,
  Text,
  Button,
  HStack,
  Spacer,
  Spinner,
  Heading,
  VStack,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Components
import Storage from '../../config/StorageServices';

const ProfileView = ({navigation, globalActions, authActions, user}) => {
  const [isLoading, setIsLoading] = useState(true);

  const {getProfilesData} = authActions;
  const {setUser} = globalActions;

  const onCloseSession = async () => {
    await Storage.removeSession();
    RNRestart.Restart();
  };

  const onGetProfilesData = (type, response) => {
    if (type === 'success') {
      setUser(response);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfilesData(onGetProfilesData);
    }, []),
  );

  return isLoading ? (
    <VStack space={3} alignItems="center" mt="20">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </VStack>
  ) : (
    <Box
      safeArea
      flex={1}
      alignItems="center"
      w="full"
      backgroundColor="lightBlue.600">
      <Image
        source={{uri: user.img, isStatic: true}}
        style={styles.avatarStyle}
        alt="avatar"
      />
      <Text fontSize="lg" mt="2" color="white" fontWeight={400}>
        {user.firstName} {user.lastName}
      </Text>
      <Text fontSize="lg" color="white" fontWeight={400}>
        {user.email}
      </Text>
      <Box
        alignItems="center"
        mt="15"
        px="5"
        backgroundColor="white"
        height="full"
        width="full"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl">
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfileForm', user)}
          style={styles.touchableStyle}>
          <HStack
            space={3}
            mt="5"
            alignItems="center"
            borderBottomWidth="1"
            borderBottomColor="lightBlue.600">
            <Text fontSize="lg" mt="2" color="lightBlue.600" fontWeight={400}>
              Edit profile
            </Text>
            <Spacer />
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              color="#0888D1"
              size={20}
            />
          </HStack>
        </TouchableOpacity>
        <Button
          onPress={onCloseSession}
          mt="10"
          maxWidth="3xs"
          colorScheme="lightBlue"
          _text={{color: 'white'}}>
          Close session
        </Button>
      </Box>
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
    marginTop: 40,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 4,
    borderColor: 'white',
  },
});

/**
 * Component properties.
 */
ProfileView.propTypes = {
  globalActions: PropTypes.shape({
    setUser: PropTypes.func,
  }).isRequired,
  authActions: PropTypes.shape({
    getProfilesData: PropTypes.func,
  }).isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};

export default ProfileView;
