import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
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
})

const ProfileScreen = () => {
  const { state, updateProfile } = useContext(AppContext)
  const [form, setForm] = React.useState({ name: state?.user?.name })

  const handleUpdateImage = (imageUrl) => {
    updateProfile({ uri: imageUrl, name: state?.user?.name })
  }

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    })
  }

  const updateName = () => {
    updateProfile({ name: form.name })
  }

  return (
    <View style={styles.container}>
      <ImageComp
        imageUrl={state?.user?.imageUrl || ''}
        handleUpdateImage={handleUpdateImage}
      />
      <TextInput
        style={styles.title}
        onBlur={updateName}
        onChangeText={(text) => handleChangeText('name', text)}
      >
        {state?.user?.name}
      </TextInput>
      <Text>Tap your name to edit</Text>
      <Text style={styles.email}>{state?.user?.email}</Text>
    </View>
  )
}

export default ProfileScreen
