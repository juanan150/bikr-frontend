/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import PropTypes from 'prop-types'
import DropDownPicker from 'react-native-dropdown-picker'
import { Feather } from '@expo/vector-icons'

import AppContext from '../context/AppContext'
import SubmitButton from '../components/SubmitButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginBottom: 20,
    color: '#1c1919',
    fontSize: 30,
    fontWeight: 'bold',
  },
  money: {
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#f2771a',
    padding: 5,
    fontSize: 30,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
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
  list: {
    height: 60,
    marginBottom: 12,
    padding: 20,
    width: 340,
    color: 'grey',
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#EBEBEC',
    marginLeft: 5,
  },
  listBox: {
    color: '#1c1919',
    width: 340,
    backgroundColor: '#EBEBEC',
    borderWidth: 0,
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
        `Are you sure you want to pay $${state.serviceInfo.servicePrice} for ${state.serviceInfo.serviceDetails} to ${state.serviceInfo.repairShopName} `,
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
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pay amount</Text>
          <Text style={styles.money}>${state.serviceInfo.servicePrice}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Feather name="credit-card" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('cardNumber', text)}
            placeholder="Enter your credit card number"
            keyboardType="number-pad"
          />
        </View>
        <DropDownPicker
          open={openM}
          value={form?.expMonth}
          items={month}
          setOpen={setOpenM}
          setValue={handleMonthText}
          setItems={setMonth}
          placeholder="Select the expiration month"
          style={styles.list}
          placeholderStyle={{ fontSize: 18, paddingLeft: 10, color: 'grey' }}
          dropDownContainerStyle={styles.listBox}
          textStyle={{ fontSize: 18, paddingLeft: 10 }}
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
          placeholderStyle={{ fontSize: 18, paddingLeft: 10, color: 'grey' }}
          dropDownContainerStyle={styles.listBox}
          textStyle={{ fontSize: 18, paddingLeft: 10 }}
          zIndex={1000}
          zIndexInverse={3000}
        />
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Feather name="credit-card" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('cvc', text)}
            placeholder="Enter your credit card cvc"
            keyboardType="number-pad"
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <SubmitButton handleSubmit={handleSubmit}>
          <Text style={styles.buttonText}>Pay Service</Text>
        </SubmitButton>
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
