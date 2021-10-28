import React, { useContext } from 'react'
import { View, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import userImage from '../assets/user-dummy.png'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    height: 400,
  },
  image: {
    flex: 1,
    marginTop: 20,
    height: 300,
    width: 300,
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
})

const ProfileScreen = () => {
  const { state, updateProfile } = useContext(AppContext)

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
    </View>
  )
}

export default ProfileScreen
