import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import PropTypes from 'prop-types'

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
    alignSelf: 'center',
    color: '#1c1919',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
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
    textAlign: 'center',
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

const VerifyEmailScreen = ({ navigation, route }) => {
  const { state, verifyEmail, resetError } = useContext(AppContext)
  const { email, password } = route.params
  const [error, setError] = useState(null)
  const [logged, setLogged] = useState(false)
  const [token, setToken] = useState('')
  const isVisible = useIsFocused()
  const codeRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      resetError()
      setLogged(false)
    }
  }, [])

  useEffect(() => {
    setError(state.error)
    if (!state.error && state.user && logged && isVisible) {
      if (state.user.role === 'user') {
        navigation.navigate('Home')
      }
      if (state.user.role === 'owner') {
        navigation.navigate('CreateRepairShop', { create: true })
      }
    } else {
      setLogged(false)
    }
  }, [state])

  const handleChangeText = (text) => {
    setToken(text)
  }

  const handleSubmit = () => {
    setLogged(true)
    verifyEmail({ token, email, password })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please check your email for the verification token
      </Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter your verification token"
        onChangeText={(text) => handleChangeText(text)}
        ref={codeRef}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <SubmitButton handleSubmit={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </SubmitButton>
    </View>
  )
}

VerifyEmailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default VerifyEmailScreen
