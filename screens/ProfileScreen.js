import React, { useContext } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import userImage from '../assets/user-dummy.png'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    height: 350,
  },
  image: {
    flex: 1,
    marginTop: 20,
    height: 250,
    width: 250,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  iconContainer: {
    height: 70,
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 0,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2771a',
  },
  title: {
    marginBottom: 10,
    color: '#1c1919',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  email: {
    marginTop: 20,
    fontSize: 20,
    color: 'grey',
  },
})

const ProfileScreen = () => {
  const { state, updateProfile } = useContext(AppContext)
  const [form, setForm] = React.useState({ name: state.user.name })

  const openImagePickerAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    })

    if (result.cancelled === true) {
      return
    }

    updateProfile({ uri: result.uri, name: state.user.name })
  }

  const handleOpenImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission to access files is required!')
      return
    }
    openImagePickerAsync()
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
      <View style={styles.imageContainer}>
        <Image
          source={
            state?.user?.imageUrl ? { uri: state?.user?.imageUrl } : userImage
          }
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleOpenImagePickerAsync}
        >
          <Feather name="camera" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
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
