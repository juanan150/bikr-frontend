/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
} from 'react-native'
import PropTypes from 'prop-types'
import MapView, { Marker } from 'react-native-maps'
import { RadioButton } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { FontAwesome } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

import SubmitButton from '../components/SubmitButton'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFEEDD',
  },
  scrollView: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  map: {
    height: 350,
    width: 350,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#1c1919',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
    width: 150,
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 18,
    color: '#1c1919',
  },
  input: {
    color: '#1c1919',
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 150,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  buttonText: {
    color: '#1c1919',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 22,
    marginBottom: 10,
  },
})

const RepairShopScreen = ({ route, navigation }) => {
  const { state, resetError, requestService } = useContext(AppContext)
  const { repairShop } = route?.params
  const [serviceReq, setServiceReq] = useState({
    scheduledDate: new Date(),
    done: false,
    repairShopId: repairShop._id,
  })
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [dateString, setDateString] = useState()
  const isVisible = useIsFocused()

  useEffect(() => {
    setDateString(
      `${serviceReq.scheduledDate.getFullYear()}-${
        serviceReq.scheduledDate.getMonth() + 1
      }-${serviceReq.scheduledDate.getDate()}`,
    )
  }, [serviceReq.scheduledDate])

  useEffect(() => {
    setError(state.error)
    !state.error &&
      state.user &&
      serviceReq.done &&
      navigation.navigate('Payment')
  }, [state])

  useEffect(() => {
    resetError()
    setServiceReq({ ...serviceReq, done: false })
  }, [isVisible])

  const showDatepicker = () => {
    setShow(true)
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || serviceReq.scheduledDate
    setShow(Platform.OS === 'ios')
    setServiceReq(() => ({
      ...serviceReq,
      scheduledDate: currentDate,
    }))
  }

  const handleSubmit = () => {
    if (!serviceReq.scheduledDate || !serviceReq.serviceName) {
      setError('* All fields are required')
    } else {
      setServiceReq({ ...serviceReq, done: true })
      requestService(serviceReq)
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      {repairShop.services.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>{repairShop.name}</Text>
          <Text style={styles.text}>{repairShop.address}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: repairShop.latitude,
              longitude: repairShop.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              key="1"
              coordinate={{
                latitude: repairShop.latitude,
                longitude: repairShop.longitude,
              }}
            />
          </MapView>
          <Text style={styles.serviceTitle}>Select your Service</Text>
          <View style={styles.serviceContainer}>
            {repairShop.services.map((service) => (
              <View
                style={styles.list}
                key={service.name + service.price.toString()}
              >
                <Text style={styles.listText}>{service.serviceName}</Text>
                <RadioButton
                  value={service.serviceName}
                  status={
                    serviceReq.serviceName === service.serviceName
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setServiceReq({
                      ...serviceReq,
                      serviceName: service.serviceName,
                      servicePrice: service.price,
                    })
                  }
                  color="#FFA347"
                />
              </View>
            ))}
          </View>
          <Text style={styles.serviceTitle}>Schedule your Service</Text>
          <View style={styles.dateContainer}>
            <FontAwesome
              name="calendar"
              size={24}
              color="#1c1919"
              onPress={showDatepicker}
            />
            <TextInput
              editable={false}
              style={styles.input}
              value={dateString}
              onPress={showDatepicker}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={serviceReq.scheduledDate}
                mode="date"
                is24Hour
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
          <SubmitButton handleSubmit={handleSubmit}>
            <Text style={styles.buttonText}>Schedule</Text>
          </SubmitButton>
        </ScrollView>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  )
}

RepairShopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      repairShop: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        imageUrl: PropTypes.string,
        services: PropTypes.arrayOf(
          PropTypes.shape({
            serviceName: PropTypes.string.isRequires,
            price: PropTypes.number.isRequired,
          }),
        ),
      }).isRequired,
    }),
  }).isRequired,
}

export default RepairShopScreen
