/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  CheckBox,
  Alert,
} from 'react-native'
import PropTypes from 'prop-types'
import MapView, { Marker } from 'react-native-maps'
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'

import { useIsFocused } from '@react-navigation/native'
import ImageComp from '../components/ImageComp'
import SubmitButton from '../components/SubmitButton'
import validateRepairShop from '../components/forms/validateRepairShop'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#1c1919',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 30,
  },
  formContainer: {
    marginTop: 30,
    width: 350,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#EBEBEC',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  input: {
    height: 60,
    marginBottom: 12,
    padding: 20,
    paddingLeft: 10,
    width: 300,
    color: '#1c1919',
    backgroundColor: '#EBEBEC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 18,
  },
  serviceTitle: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    height: 350,
    width: 350,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceInput: {
    height: 40,
    padding: 5,
    paddingLeft: 10,
    width: 150,
    color: '#1c1919',
    backgroundColor: '#EBEBEC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 18,
  },
  serviceItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    display: 'flex',
    width: 120,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
    width: 350,
  },
})

const CreateRepairShopScreen = ({ navigation, route }) => {
  const { state, createRepairShop, listServices, resetError } =
    useContext(AppContext)
  const create = route?.params || false
  const [form, setForm] = useState(state?.repairShop || {})
  const [errMsg, setErrMsg] = useState({})
  const [services, setServices] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const isVisible = useIsFocused()

  const handleUpdateImage = (imageUrl) => {
    setForm({ ...form, imageUrl })
  }

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  const onMapPress = (e) => {
    setForm({
      ...form,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    })
  }

  const handleSubmit = async () => {
    const errors = validateRepairShop(form)
    if (!Object.keys(errors).length) {
      setSubmitted(true)
      create
        ? await createRepairShop({ ...form, create: true })
        : await createRepairShop({ ...form, create: false })
    } else {
      setErrMsg(errors)
    }
  }

  const handleCheckboxChange = (service) => {
    console.log(form)
    const newServices = form.services ? [...form?.services] : []
    console.log(1, newServices)
    let index = -1
    if (newServices.length > 0) {
      index = newServices.findIndex(
        (s) => s.serviceName === service.serviceName,
      )
    }
    console.log(2, index)
    if (index === -1) {
      newServices.push({
        serviceName: service?.serviceName,
        serviceDetails: service?.serviceDetails,
        price: services?.[service?._id]?.price || 0,
      })
      setServices({
        ...services,
        [service._id]: {
          price: services?.[service?._id]?.price || 0,
          checked: true,
        },
      })
    } else {
      newServices.splice(index, 1)
      setServices({
        ...services,
        [service._id]: {
          price: services?.[service?._id]?.price || 0,
          checked: false,
        },
      })
    }
    console.log(3, newServices)
    setForm({ ...form, services: newServices })
  }

  const handleChangePriceText = (service, text) => {
    const newServices = [...form.services]
    const index = newServices.findIndex(
      (s) => s.serviceName === service.serviceName,
    )
    if (index !== -1) {
      newServices[index].price = text
    }
    setForm({ ...form, services: newServices })
    setServices({
      ...services,
      [service._id]: {
        price: text,
        checked: services?.[service?._id]?.checked,
      },
    })
  }

  const populateServices = () => {
    console.log(state.repairShop)
    if (state.repairShop?.services) {
      console.log(state.repairShop)
      if (Object.keys(state.repairShop).length) {
        state.repairShop.services.forEach((service) => {
          state.availableServices.forEach((s) => {
            s.serviceName === service.serviceName &&
              setServices((prevState) => ({
                ...prevState,
                [s._id]: {
                  price: service.price,
                  checked: true,
                },
              }))
          })
        })
      }
    }
  }

  useEffect(() => {
    if (isVisible) {
      resetError()
      listServices()
      setSubmitted(false)
      setErrMsg({})
    }
  }, [])

  useEffect(() => {
    if (state.repairShop) {
      if (
        !state.error &&
        Object.keys(state.repairShop).length &&
        submitted &&
        isVisible
      ) {
        if (create) {
          navigation.navigate('Home')
        } else {
          Alert.alert('Repair Shop updates succesfully')
        }
      }
    }
  }, [state])

  useEffect(() => {
    state.availableServices && populateServices()
  }, [state.availableServices])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {create ? 'Create' : 'Edit'} your Repair Shop
      </Text>
      <ImageComp
        imageUrl={form?.imageUrl || ''}
        handleUpdateImage={handleUpdateImage}
      />
      <View style={styles.formContainer}>
        {errMsg.name && <Text style={styles.error}>{errMsg.name}</Text>}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="drive-file-rename-outline"
              size={24}
              color="grey"
            />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('name', text)}
            placeholder="Enter the repair shop name"
            value={form.name}
          />
        </View>
        {errMsg.bankAccount && (
          <Text style={styles.error}>{errMsg.bankAccount}</Text>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bank" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('accountNumber', text)}
            placeholder="Enter your bank account"
            value={form.accountNumber}
          />
        </View>
        {errMsg.address && <Text style={styles.error}>{errMsg.address}</Text>}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Entypo name="address" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('address', text)}
            placeholder="Enter the repair shop address"
            value={form.address}
          />
        </View>
        <Text style={styles.serviceTitle}>Select the location on the map</Text>
        {errMsg.coords && <Text style={styles.error}>{errMsg.coords}</Text>}
        <MapView
          style={styles.map}
          onPress={(e) => onMapPress(e)}
          initialRegion={{
            latitude: form?.latitude || 6.2468374608707755,
            longitude: form?.longitude || -75.56848034226708,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            key="1"
            coordinate={{
              latitude: form?.latitude || 6.2468374608707755,
              longitude: form?.longitude || -75.56848034226708,
            }}
          />
        </MapView>
        <Text style={styles.serviceTitle}>
          Select the services you will provide
        </Text>
        {errMsg.services && <Text style={styles.error}>{errMsg.services}</Text>}
        {state?.availableServices?.length > 0 &&
          state?.availableServices?.map((service) => (
            <View style={styles.serviceItem} key={service._id}>
              <View style={styles.checkboxContainer}>
                <Text>{service.serviceDetails}</Text>
                <CheckBox
                  key={service.id}
                  title={service.name}
                  value={!!services?.[service._id]?.checked}
                  onValueChange={() => handleCheckboxChange(service)}
                />
              </View>
              <TextInput
                autoCapitalize="none"
                style={styles.serviceInput}
                placeholder="Service price"
                keyboardType="numeric"
                onChangeText={(text) => handleChangePriceText(service, text)}
                value={services?.[service._id]?.price.toString()}
              />
            </View>
          ))}
      </View>

      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>
          {create ? 'Create' : 'Edit'} Repair Shop
        </Text>
      </SubmitButton>
    </ScrollView>
  )
}

CreateRepairShopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      create: PropTypes.bool,
    }),
  }),
}

CreateRepairShopScreen.defaultProps = {
  route: {
    params: {
      create: false,
    },
  },
}

export default CreateRepairShopScreen
