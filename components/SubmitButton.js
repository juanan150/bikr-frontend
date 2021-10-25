import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
})

const SubmitButton = ({ children, handleSubmit }) => {
  const handleClick = () => {
    handleSubmit()
  }
  return (
    <LinearGradient colors={['#f2771a', '#AE510A']} style={styles.button}>
      <TouchableOpacity onPress={handleClick}>{children}</TouchableOpacity>
    </LinearGradient>
  )
}

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default SubmitButton
