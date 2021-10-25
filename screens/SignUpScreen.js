import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import PropTypes from 'prop-types'

import AppContext from '../context/AppContext'
import validateReg from '../components/forms/validateReg'
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
    color: '#1c1919',
    fontSize: 30,
    marginBottom: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  text: {
    color: '#1c1919',
    fontSize: 24,
    marginTop: 5,
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#1c1919',
    fontSize: 22,
    marginTop: 10,
  },
  input: {
    color: '#1c1919',
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 300,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  list: {
    color: '#1c1919',
    height: 40,
    marginBottom: 12,
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
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.text}>Email</Text>
        {errMsg.email && <Text style={styles.error}>{errMsg.email}</Text>}
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => handleChangeText('email', text)}
          keyboardType="email-address"
          placeholder="Enter email"
        />
        <Text style={styles.text}>Password</Text>
        {errMsg.password && <Text style={styles.error}>{errMsg.password}</Text>}
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => handleChangeText('password', text)}
          style={styles.input}
          secureTextEntry
          placeholder="Enter password"
        />
        <Text style={styles.text}>Confirm Password</Text>
        {errMsg.confirmedPassword && (
          <Text style={styles.error}>{errMsg.confirmedPassword}</Text>
        )}
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => handleChangeText('confirmedPassword', text)}
          style={styles.input}
          secureTextEntry
          placeholder="Enter password"
        />
        <Text style={styles.text}>Full Name</Text>
        {errMsg.name && <Text style={styles.error}>{errMsg.name}</Text>}
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => handleChangeText('name', text)}
          placeholder="Enter full name"
        />
        <Text style={styles.text}>Role</Text>
        {errMsg.role && <Text style={styles.error}>{errMsg.role}</Text>}
        <DropDownPicker
          open={open}
          value={form?.role}
          items={items}
          setOpen={setOpen}
          setValue={handleRoleText}
          setItems={setItems}
          placeholder="Select a role"
          style={styles.list}
          placeholderStyle={{ fontSize: 18 }}
          dropDownContainerStyle={styles.listBox}
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
