import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import PropTypes from 'prop-types'

import AppContext from '../../context/AppContext'

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
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#f2771a',
    borderColor: '#1c1919',
    borderWidth: 3,
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
  const { state, loginUser, resetError } = useContext(AppContext)
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
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@jaq/bikr-auth')
        if (value) {
          navigation.navigate('Home')
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
    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(text) => handleChangeText('email', text)}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={(text) => handleChangeText('password', text)}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don&apos;t you have an account?</Text>
        <TouchableOpacity style={styles.button} onPress={goToSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
