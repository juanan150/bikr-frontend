/* eslint-disable object-curly-newline */
import React from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'

import LoginForm from '../components/forms/LoginForm'
import logo from '../assets/bikr-logo.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 2,
  },
  image: {
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
})

const LoginScreen = ({ navigation }) => (
  <KeyboardAvoidingView
    behavior="height"
    enabled="false"
    style={styles.container}
  >
    <Image source={logo} style={styles.image} />
    <View style={styles.formContainer}>
      <LoginForm navigation={navigation} />
    </View>
  </KeyboardAvoidingView>
)

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default LoginScreen
