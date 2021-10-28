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
import RepairShopScreen from './screens/RepairShopScreen'
import PaymentScreen from './screens/PaymentScreen'

const icons = {
  SearchStack: 'tools',
  Profile: 'user',
  ServicesStack: 'list-alt',
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
      <DetailStack.Screen
        name="RepairShopDetail"
        options={{
          title: 'Repair Shop',
        }}
        component={RepairShopScreen}
      />
      <DetailStack.Screen
        name="Payment"
        options={{
          title: 'Payment',
        }}
        component={PaymentScreen}
      />
    </DetailStack.Navigator>
  )
}

SearchStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function ServicesStack({ navigation }) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Services"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={SearchScreen}
      />
      <DetailStack.Screen
        name="RepairShopDetail"
        options={{
          title: 'Repair Shop',
        }}
        component={RepairShopScreen}
      />
    </DetailStack.Navigator>
  )
}

ServicesStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function ProfileStack({ navigation }) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="Profile"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={ProfileScreen}
      />
    </DetailStack.Navigator>
  )
}

ProfileStack.propTypes = {
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
      <Tab.Screen
        name="ServicesStack"
        options={{
          title: 'My Services',
          headerShown: false,
        }}
        component={ServicesStack}
      />
      <Tab.Screen
        name="ProfileStack"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  )
}

LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
