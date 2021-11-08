import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { Feather } from '@expo/vector-icons'

import AppContext from '../../context/AppContext'
import SubmitButton from '../SubmitButton'

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    alignSelf: 'center',
    color: '#1c1919',
    fontSize: 30,
    fontWeight: 'bold',
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#1c1919',
    fontSize: 18,
    marginRight: 5,
  },
  signUpLink: {
    color: '#f2771a',
    fontSize: 18,
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
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  span: {
    color: '#939393',
    alignSelf: 'center',
    marginBottom: 30,
    fontSize: 16,
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
  const [logged, setLogged] = useState(false)
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
    if (!state.error && state.user && logged) {
      setLogged(false)
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

  const handleSubmit = async () => {
    setLogged(true)
    await loginUser(form)
  }

  return (
    <View>
      <Text style={styles.text}>Login Now</Text>
      <Text style={styles.span}>
        Please enter the details below to continue
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="mail" size={24} color="grey" />
        </View>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => handleChangeText('email', text)}
          keyboardType="email-address"
          placeholder="Enter email"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="lock" size={24} color="grey" />
        </View>
        <TextInput
          autoCapitalize="none"
          onChangeText={(text) => handleChangeText('password', text)}
          style={styles.input}
          secureTextEntry
          placeholder="Enter password"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </SubmitButton>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don&apos;t you have an account?</Text>
        <Text style={styles.signUpLink} onPress={goToSignUp}>
          Sign Up
        </Text>
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
