import React from 'react'
import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import PropTypes from 'prop-types'

import userImage from '../assets/user-dummy.png'

const styles = StyleSheet.create({
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
})

const ImageComp = ({ imageUrl, handleUpdateImage }) => {
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

    handleUpdateImage(result.uri)
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
    <View style={styles.imageContainer}>
      <Image
        source={imageUrl ? { uri: imageUrl } : userImage}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleOpenImagePickerAsync}
      >
        <Feather name="camera" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

ImageComp.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleUpdateImage: PropTypes.func.isRequired,
}

export default ImageComp
