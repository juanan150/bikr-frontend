import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import PropTypes from 'prop-types'

import AppContext from '../../context/AppContext'
import SubmitButton from '../SubmitButton'

const styles = StyleSheet.create({
  text: {
    color: '#1c1919',
    fontSize: 30,
    marginBottom: 10,
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
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 300,
    color: '#1c1919',
    borderColor: '#1c1919',
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    borderRadius: 10,
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

const LoginForm = ({ navigation }) => {
  const { state, loginUser, loadUser, resetError } = useContext(AppContext)
  const [form, setForm] = useState(null)
  const [error, setError] = useState(null)
  const isVisible = useIsFocused()

  const goToSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  useEffect(() => {
    resetError()
  }, [isVisible])

  useEffect(() => {
    setError(state.error)
    if (!state.error && state.user) {
      navigation.navigate('Home')
    }
  }, [state])

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@jaq/bikr-auth')
        if (value) {
          loadUser()
        }
      } catch (e) {
        // error reading value
      }
    }
    getData()
  }, [])

  useEffect(() => {
    setError(state.error)
    !state.error && state.user && navigation.navigate('Home')
  }, [state])

  const handleSubmit = async () => {
    await loginUser(form)
  }

  return (
    <View>
      <Text style={styles.text}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(text) => handleChangeText('email', text)}
        keyboardType="email-address"
        placeholder="Enter email"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={(text) => handleChangeText('password', text)}
        style={styles.input}
        secureTextEntry
        placeholder="Enter password"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </SubmitButton>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don&apos;t you have an account?</Text>
        <SubmitButton handleSubmit={goToSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </SubmitButton>
      </View>
    </View>
  )
}

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default LoginForm
