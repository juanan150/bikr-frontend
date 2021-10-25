import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignItems: 'center',
    marginBottom: 20,
  },
  barContainer: {
    paddingTop: 20,
  },
  input: {
    height: 40,
    padding: 10,
    width: 300,
    color: '#1c1919',
    borderColor: '#1c1919',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
})

const SearchBar = ({ title, handleChangeInput }) => (
  <View style={styles.container}>
    <View style={styles.barContainer}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder={`Search ${title}`}
        placeholderTextColor="#1c1919"
        onChangeText={handleChangeInput}
      />
    </View>
  </View>
)

SearchBar.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default SearchBar
