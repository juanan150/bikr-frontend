/* eslint-disable react/jsx-one-expression-per-line */
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
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

import SubmitButton from '../components/SubmitButton'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#1c1919',
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
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
  },
  serviceTitle: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 26,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    width: 150,
  },
  listText: {
    fontSize: 18,
    color: '#1c1919',
  },
  moneyText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  money: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    padding: 10,
    paddingLeft: 10,
    width: 130,
    color: 'grey',
    backgroundColor: '#EBEBEC',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    fontSize: 18,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    height: 50,
    width: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#EBEBEC',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  buttonText: {
    color: '#fff',
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
  let repairShop = {}
  if (route?.params.repairShop._id) {
    repairShop = route?.params.repairShop
  } else {
    repairShop = state.repairShop
  }
  const { schedule } = route?.params
  const [serviceReq, setServiceReq] = useState({
    scheduleDate: new Date(),
    done: false,
    repairShopId: repairShop._id,
    repairShopName: repairShop.name,
  })
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [dateString, setDateString] = useState()
  const isVisible = useIsFocused()

  useEffect(() => {
    setDateString(
      `${serviceReq.scheduleDate.getFullYear()}-${
        serviceReq.scheduleDate.getMonth() + 1
      }-${serviceReq.scheduleDate.getDate()}`,
    )
  }, [serviceReq.scheduleDate])

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
    const currentDate = selectedDate || serviceReq.scheduleDate
    setShow(Platform.OS === 'ios')
    setServiceReq(() => ({
      ...serviceReq,
      scheduleDate: currentDate,
    }))
  }

  const handleSubmit = () => {
    if (!serviceReq.scheduleDate || !serviceReq.serviceName) {
      setError('* All fields are required')
    } else {
      setServiceReq({ ...serviceReq, done: true })
      requestService(serviceReq)
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
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
        {schedule && (
          <>
            <Text style={styles.serviceTitle}>Select your Service</Text>
            <View style={styles.serviceContainer}>
              {repairShop?.services?.map((service) => (
                <View style={styles.list} key={service.serviceName}>
                  <Text style={styles.listText}>{service.serviceDetails}</Text>
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
                        serviceDetails: service.serviceDetails,
                        servicePrice: service.price,
                      })
                    }
                    color="#FFA347"
                  />
                </View>
              ))}
            </View>
            <View style={styles.moneyText}>
              <Text style={styles.money}>
                Total: ${serviceReq.servicePrice || 0}
              </Text>
            </View>
            <Text style={styles.serviceTitle}>Schedule your Service</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Feather
                  name="calendar"
                  size={24}
                  color="grey"
                  onPress={showDatepicker}
                />
              </View>

              <TextInput
                editable={false}
                style={styles.input}
                value={dateString}
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={serviceReq.scheduleDate}
                mode="date"
                is24Hour
                display="default"
                onChange={handleDateChange}
              />
            )}
            {error && <Text style={styles.error}>{error}</Text>}
            <SubmitButton handleSubmit={handleSubmit}>
              <Text style={styles.buttonText}>Schedule</Text>
            </SubmitButton>
          </>
        )}
      </ScrollView>
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
        _id: PropTypes.string,
        name: PropTypes.string,
        address: PropTypes.string,
        imageUrl: PropTypes.string,
        services: PropTypes.arrayOf(
          PropTypes.shape({
            serviceName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
          }),
        ),
      }).isRequired,
    }),
  }).isRequired,
}

export default RepairShopScreen
