import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import { Feather } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    width: 400,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
  },

  input: {
    height: 50,
    marginBottom: 12,
    padding: 10,
    paddingLeft: 10,
    width: 200,
    color: '#1c1919',
    backgroundColor: '#EBEBEC',
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    fontSize: 18,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#EBEBEC',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
})

const SearchBar = ({ title, handleChangeInput }) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Feather name="search" size={24} color="grey" />
      </View>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder={`Search ${title}`}
        placeholderTextColor="grey"
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
