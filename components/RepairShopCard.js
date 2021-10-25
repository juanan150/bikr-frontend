/* eslint-disable react/jsx-one-expression-per-line */
import { PropTypes } from 'prop-types'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 170,
    width: 350,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFA347',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#1c1919',
    marginBottom: 15,
  },
  image: {
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
  },
  service: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
  },
})

const RepairShopCard = (props) => {
  const { imageUrl, name, address, services } = props

  const goToRepairShop = () => {
    const { router, ...repairShop } = props
    router.navigate('RepairShopDetail', {
      repairShop,
    })
  }
  return (
    <TouchableOpacity style={styles.item} onPress={goToRepairShop}>
      <View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{address}</Text>

        <View>
          <Text style={styles.service}>Services</Text>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>
                {item.serviceName}: ${item.price}
              </Text>
            )}
            keyExtractor={(item) => item.serviceName}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

RepairShopCard.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      serviceName: PropTypes.string.isRequires,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default RepairShopCard
