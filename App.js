import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import AppContext from './context/AppContext'
import LoginScreen from './screens/LoginScreen'
import SearchScreen from './screens/SearchScreen'
import ProfileScreen from './screens/ProfileScreen'
import SignUpScreen from './screens/SignUpScreen'
import Logout from './components/Logout'
import useInitialState from './hooks/useInitialState'

const icons = {
  SearchStack: 'tools',
  Profile: 'user',
}

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const DetailStack = createNativeStackNavigator()

function SearchStack({ navigation }) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Services"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={SearchScreen}
      />
    </DetailStack.Navigator>
  )
}

SearchStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function LandingScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = icons[route.name] || 'tools'

          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen
        name="SearchStack"
        options={{
          title: 'Services',
          headerShown: false,
        }}
        component={SearchStack}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const initialState = useInitialState()
  return (
    <AppContext.Provider value={initialState}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />

          <Stack.Screen
            name="Home"
            component={LandingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
