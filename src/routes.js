import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;