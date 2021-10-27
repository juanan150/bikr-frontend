/* eslint-disable import/no-duplicates */
import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import PropTypes from 'prop-types'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import AppContext from '../context/AppContext'
import validateReg from '../components/forms/validateReg'
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
    alignSelf: 'center',
    color: '#1c1919',
    fontSize: 30,
    fontWeight: 'bold',
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
    color: '#1c1919',
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#EBEBEC',
  },
  listBox: {
    color: '#1c1919',
    width: 340,
    fontSize: 18,
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

const SignUpScreen = ({ navigation }) => {
  const { state, signUpUser, resetError } = useContext(AppContext)
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const [items, setItems] = useState([
    { label: 'User', value: 'user' },
    { label: 'Owner', value: 'owner' },
  ])
  const [errMsg, setErrMsg] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => resetError(), [])

  useEffect(() => {
    setError(state.error)
    if (!state.error && state.user) {
      navigation.navigate('Home')
    }
  }, [state])

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  const handleRoleText = (callback) => {
    setForm({
      ...form,
      role: callback(),
    })
  }

  const handleSubmit = async () => {
    const errors = validateReg(form)

    if (!Object.keys(errors).length) {
      await signUpUser(form)
    } else {
      setErrMsg(errors)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sign Up</Text>
        {errMsg.email && <Text style={styles.error}>{errMsg.email}</Text>}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Feather name="mail" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => handleChangeText('email', text)}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
        </View>
        {errMsg.password && <Text style={styles.error}>{errMsg.password}</Text>}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => handleChangeText('password', text)}
            style={styles.input}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>
        {errMsg.confirmedPassword && (
          <Text style={styles.error}>{errMsg.confirmedPassword}</Text>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={24} color="grey" />
          </View>
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => handleChangeText('confirmedPassword', text)}
            style={styles.input}
            secureTextEntry
            placeholder="Enter your password again"
          />
        </View>
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
            placeholder="Enter your full name"
          />
        </View>
        {errMsg.role && <Text style={styles.error}>{errMsg.role}</Text>}
        <DropDownPicker
          open={open}
          value={form?.role}
          items={items}
          setOpen={setOpen}
          setValue={handleRoleText}
          setItems={setItems}
          placeholder="Select your role"
          style={styles.list}
          placeholderStyle={{ fontSize: 18, paddingLeft: 10, color: 's' }}
          dropDownContainerStyle={styles.listBox}
          zIndex={3000}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </SubmitButton>
    </View>
  )
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SignUpScreen
