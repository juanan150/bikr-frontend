import React, { useContext } from 'react'
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
import MyServicesScreen from './screens/MyServicesScreen'
import CreateRepairShopScreen from './screens/CreateRepairShopScreen'

const icons = {
  SearchesStack: 'tools',
  ProfilesStack: 'user',
  ServicesStack: 'list-alt',
  RepairStack: 'list-alt',
}

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const SearchStack = createNativeStackNavigator()
const ServiceStack = createNativeStackNavigator()
const profileStack = createNativeStackNavigator()

function SearchesStack({ navigation }) {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Services"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={SearchScreen}
      />
      <SearchStack.Screen
        name="RepairShopDetail"
        options={{
          title: 'Repair Shop',
        }}
        component={RepairShopScreen}
      />
      <SearchStack.Screen
        name="Payment"
        options={{
          title: 'Payment',
        }}
        component={PaymentScreen}
      />
    </SearchStack.Navigator>
  )
}

SearchesStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function ServicesStack({ navigation }) {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="MyServicesScreen"
        options={{
          title: 'My Services',
          headerRight: () => <Logout {...navigation} />,
        }}
        component={MyServicesScreen}
      />
      <ServiceStack.Screen
        name="RepairShopDetail"
        options={{
          title: 'Repair Shop',
        }}
        component={RepairShopScreen}
      />
    </ServiceStack.Navigator>
  )
}

ServicesStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function ProfilesStack({ navigation }) {
  return (
    <profileStack.Navigator>
      <profileStack.Screen
        name="Profile"
        options={{
          headerRight: () => <Logout {...navigation} />,
        }}
        component={ProfileScreen}
      />
    </profileStack.Navigator>
  )
}

ProfilesStack.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function LandingScreen() {
  const { state } = useContext(AppContext)

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
        name="SearchesStack"
        options={{
          title: 'Services',
          headerShown: false,
        }}
        component={SearchesStack}
      />
      {state?.user?.role === 'user' ? (
        <Tab.Screen
          name="ServicesStack"
          options={{
            title: 'My Services',
            headerShown: false,
          }}
          component={ServicesStack}
        />
      ) : (
        <Tab.Screen
          name="RepairStack"
          options={{
            title: 'My Repair Shop',
            headerShown: false,
          }}
          component={CreateRepairShopScreen}
          initialParams={{ repairShop: state.repairShop }}
        />
      )}
      <Tab.Screen
        name="ProfilesStack"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
        component={ProfilesStack}
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

          <Stack.Screen
            name="CreateRepairShop"
            component={CreateRepairShopScreen}
            options={{
              title: 'Create Repair Shop',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
