import React, { useContext } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
})

const Logout = ({ navigate }) => {
  const { logoutUser } = useContext(AppContext)
  const logout = async () => {
    await AsyncStorage.removeItem('@jaq/bikr-auth')
    logoutUser()
    navigate('Login')
  }
  return (
    <TouchableOpacity onPress={logout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  )
}

Logout.propTypes = {
  navigate: PropTypes.func.isRequired,
}

export default Logout
