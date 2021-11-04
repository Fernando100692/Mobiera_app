// Dependencies
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAstronaut} from '@fortawesome/free-solid-svg-icons';

// Components
import Profile from '../../views/Profile';

const Tab = createBottomTabNavigator();

export const DashboardTapNavigator = ({route}) => {
  const sizeIcon = 25;

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: '#0888D1',
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveTintColor: '#9A9A9A',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {height: 60, paddingBottom: 5},
        headerTitle: '',
        headerStatusBarHeight: -60,
      }}>
      <Tab.Screen
        name={'Profile'}
        options={{
          tabBarLabel: dashboardStrings.profile,
          tabBarIcon: ({focused}) => {
            let iconName;
            let iconColor;
            iconName = faUserAstronaut;
            iconColor = focused ? '#0888D1' : '#9A9A9A';

            return (
              <FontAwesomeIcon
                icon={iconName}
                color={iconColor}
                size={sizeIcon}
              />
            );
          },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const dashboardStrings = {
  profile: 'Profile',
  register: 'Registration Form',
};
