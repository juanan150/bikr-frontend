/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import PropTypes from 'prop-types'
import DropDownPicker from 'react-native-dropdown-picker'

import AppContext from '../context/AppContext'
import SubmitButton from '../components/SubmitButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFA347',
    marginBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderWidth: 2,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#1c1919',
  },
  title: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  form: {
    paddingLeft: 20,
  },
  text: {
    color: '#1c1919',
    fontSize: 22,
    marginTop: 5,
  },
  input: {
    color: '#1c1919',
    height: 40,
    marginBottom: 20,
    padding: 10,
    width: 300,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  list: {
    color: '#1c1919',
    height: 40,
    marginBottom: 20,
    padding: 10,
    width: 300,
    borderRadius: 5,
    backgroundColor: '#FFA347',
  },
  listBox: {
    color: '#1c1919',
    width: 300,
    fontSize: 18,
    backgroundColor: '#FFA347',
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

const PaymentScreen = ({ navigation }) => {
  const { state, generatePayment } = useContext(AppContext)
  const [form, setForm] = useState(null)
  const [month, setMonth] = useState([
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ])
  const [year, setYear] = useState([
    { label: '2021', value: 2021 },
    { label: '2022', value: 2022 },
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 },
  ])
  const [openM, setOpenM] = useState(false)
  const [openY, setOpenY] = useState(false)
  const [error, setError] = useState(false)

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  const handleConfirm = () => {
    Alert.alert('Payment Done!', 'Thank you for your payment', [
      {
        text: 'Back to Home',
        onPress: () => navigation.navigate('Services'),
      },
    ])
  }

  useEffect(() => {
    setError(state.error)
    !state.error && state.user && state.payed && handleConfirm()
  }, [state])

  const handleMonthText = (callback) => {
    setForm({
      ...form,
      expMonth: callback(),
    })
  }

  const handleYearText = (callback) => {
    setForm({
      ...form,
      expYear: callback(),
    })
  }

  const handleSubmit = () => {
    if (!form?.cardNumber || !form?.expMonth || !form?.expYear || !form?.cvc) {
      setError('* All fields are required')
    } else {
      Alert.alert(
        'Payment confirmation',
        `Are you sure you want to pay $${state.serviceInfo.servicePrice} at `,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => generatePayment(form),
          },
        ],
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Payment for {state.serviceInfo.serviceName}
        </Text>
        <View style={styles.form}>
          <Text style={styles.text}>Cerdit Card Number</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('cardNumber', text)}
            placeholder="Enter credit card number"
            keyboardType="number-pad"
          />
          <DropDownPicker
            open={openM}
            value={form?.expMonth}
            items={month}
            setOpen={setOpenM}
            setValue={handleMonthText}
            setItems={setMonth}
            placeholder="Select the expiration month"
            style={styles.list}
            placeholderStyle={{ fontSize: 18 }}
            dropDownContainerStyle={styles.listBox}
            zIndex={2000}
            zIndexInverse={2000}
          />
          <DropDownPicker
            open={openY}
            value={form?.expYear}
            items={year}
            setOpen={setOpenY}
            setValue={handleYearText}
            setItems={setYear}
            placeholder="Select the expiration year"
            style={styles.list}
            placeholderStyle={{ fontSize: 18 }}
            dropDownContainerStyle={styles.listBox}
            zIndex={1000}
            zIndexInverse={3000}
          />
          <Text style={styles.text}>Cerdit Card CVC Number</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('cvc', text)}
            placeholder="Enter credit card cvc"
            keyboardType="number-pad"
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <SubmitButton handleSubmit={handleSubmit}>
            <Text style={styles.buttonText}>Pay Service</Text>
          </SubmitButton>
        </View>
      </View>
    </View>
  )
}

PaymentScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default PaymentScreen
