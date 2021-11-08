import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Onboarding from 'react-native-onboarding-swiper'

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
import MapScreen from './screens/MapScreen'
import VerifyEmailScreen from './screens/VerifyEmailScreen'
import onboarding1 from './assets/onboarding1.png'
import onboarding2 from './assets/onboarding2.png'
import onboarding3 from './assets/onboarding3.png'

const icons = {
  SearchesStack: 'tools',
  ProfilesStack: 'user',
  ServicesStack: 'list-alt',
  RepairStack: 'list-alt',
  MapStack: 'map',
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

function MapStack() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Map" component={MapScreen} />
    </SearchStack.Navigator>
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
        <>
          <Tab.Screen
            name="ServicesStack"
            options={{
              title: 'My Services',
              headerShown: false,
            }}
            component={ServicesStack}
          />
          <Tab.Screen
            name="MapStack"
            options={{
              title: 'Map',
              headerShown: false,
            }}
            component={MapStack}
          />
        </>
      ) : (
        <Tab.Screen
          name="RepairStack"
          options={{
            title: 'My Repair Shop',
            headerShown: false,
          }}
          component={CreateRepairShopScreen}
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

function onBoardingScreen({ navigation }) {
  return (
    <Onboarding
      onDone={() => {
        navigation.navigate('Login')
      }}
      pages={[
        {
          backgroundColor: '#f2771a',
          image: <Image source={onboarding1} />,
          title: 'Repair Shops',
          subtitle: 'Find repair shops near you',
        },
        {
          backgroundColor: '#f2771a',
          image: <Image source={onboarding2} />,
          title: 'Services',
          subtitle: 'Schedule services on the date you prefer',
        },
        {
          backgroundColor: '#f2771a',
          image: <Image source={onboarding3} />,
          title: 'My services',
          subtitle: 'Manage your scheduled services',
        },
      ]}
    />
  )
}

onBoardingScreen.propTypes = {
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
            name="Onboarding"
            options={{ headerShown: false }}
            component={onBoardingScreen}
          />
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

          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmailScreen}
            options={{
              title: 'Verify Email Shop',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
