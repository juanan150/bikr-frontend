import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { PropTypes } from 'prop-types'
import * as Location from 'expo-location'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    height: 350,
    width: 350,
    flex: 10,
    marginBottom: 30,
  },
  title: {
    color: '#1c1919',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 30,
    flex: 1,
  },
})

const MapScreen = ({ navigation }) => {
  const { state } = useContext(AppContext)

  const handleSelect = (repairShop) => {
    navigation.navigate('RepairShopDetail', {
      repairShop,
      schedule: true,
    })
  }

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      console.log(location)
    }
    getLocation()
  }, [])
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>All Repair Shops</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.2468374608707755,
          longitude: -75.56848034226708,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {state.repairShopsInfo.repairShops.map((shop) => (
          <Marker
            key={shop._id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
          >
            <Callout onPress={() => handleSelect(shop)}>
              <View>
                <Text>{shop.name}</Text>
                <Text>{shop.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

MapScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default MapScreen
