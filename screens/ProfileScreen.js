import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

import AppContext from '../context/AppContext'
import ImageComp from '../components/ImageComp'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 10,
    color: '#1c1919',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  email: {
    marginTop: 20,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    padding: 12,
    paddingLeft: 10,
    width: 210,
    color: '#1c1919',
    backgroundColor: '#EBEBEC',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 16,
  },
  text: {
    color: 'grey',
    padding: 18,
  },
})

const ProfileScreen = () => {
  const { state, updateProfile } = useContext(AppContext)
  const [form, setForm] = React.useState({
    name: state?.user?.name,
    phoneNumber: state?.user?.phoneNumber,
  })

  const handleUpdateImage = (imageUrl) => {
    updateProfile({
      uri: imageUrl,
      name: state?.user?.name,
      phoneNumber: state?.user?.phoneNumber,
    })
  }

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  const updateName = (key) => {
    updateProfile({ [key]: form[key] })
  }

  return (
    <View style={styles.container}>
      <ImageComp
        imageUrl={state?.user?.imageUrl || ''}
        handleUpdateImage={handleUpdateImage}
      />
      <TextInput
        style={styles.title}
        onBlur={() => updateName('name')}
        onChangeText={(text) => handleChangeText('name', text)}
      >
        {state?.user?.name}
      </TextInput>
      <Text>Tap your name to edit</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="phone" size={24} color="grey" />
        </View>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => handleChangeText('phoneNumber', text)}
          placeholder="Enter your phone number"
          onBlur={() => updateName('phoneNumber')}
          value={form.phoneNumber}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Feather name="mail" size={24} color="grey" />
        </View>
        <Text style={[styles.input, styles.text]}>{state?.user?.email}</Text>
      </View>
    </View>
  )
}

export default ProfileScreen
