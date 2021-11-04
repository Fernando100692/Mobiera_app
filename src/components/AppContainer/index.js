// Dependencies
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Components
import Registration from '../../views/RegisterForm';
import EditProfile from '../../views/EditProfileForm';
import Login from '../../views/Login';
import {DashboardTapNavigator} from '../../components';

const Stack = createStackNavigator();

export const AppContainer = () => {
  const screenNavigatorOptions = {
    gestureEnabled: true,
    headerTitleAlign: 'center',
    headerStyle: {backgroundColor: '#0284c7'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
    cardShadowEnabled: true,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenNavigatorOptions}>
          <Stack.Screen
            options={{header: () => null}}
            name="Login"
            component={Login}
          />
          <Stack.Screen options={{header: () => null}} name="Home">
            {props => <DashboardTapNavigator {...props} />}
          </Stack.Screen>
          <Stack.Screen
            options={{
              headerTitle: 'Registration Form',
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
            name="RegistrationForm"
            component={Registration}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Update Profile Form',
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
            name="EditProfileForm"
            component={EditProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
