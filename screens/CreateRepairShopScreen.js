import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native'
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
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
    width: 350,
  },
})

const CreateRepairShopScreen = ({ navigation }) => {
  const { createRepairShop, listServices, resetError } = useContext(AppContext)
  const [form, setForm] = useState(null)
  const [errMsg, setErrMsg] = useState({})
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
      await createRepairShop(form)
    } else {
      setErrMsg(errors)
    }
  }

  useEffect(() => {
    if (isVisible) {
      // resetError()
      listServices()
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your Repair Shop</Text>
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
          />
        </View>
        {errMsg.bankName && <Text style={styles.error}>{errMsg.bankName}</Text>}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bank" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('bankAccount', text)}
            placeholder="Enter your bank account"
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
      </View>

      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>Create Repair Shop</Text>
      </SubmitButton>
    </ScrollView>
  )
}

CreateRepairShopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default CreateRepairShopScreen
