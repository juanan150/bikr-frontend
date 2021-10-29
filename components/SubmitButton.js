import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 60,
    marginTop: 10,
    padding: 10,
    width: 350,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: '#f2771a',
  },
})

const SubmitButton = ({ children, handleSubmit }) => {
  const handleClick = () => {
    handleSubmit()
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      {children}
    </TouchableOpacity>
  )
}

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default SubmitButton
