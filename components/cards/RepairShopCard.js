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
import { Feather } from '@expo/vector-icons'

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    minHeight: 170,
    width: 370,
    marginVertical: 5,
    backgroundColor: '#F7F7F8',
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#1c1919',
    marginBottom: 15,
  },
  image: {
    height: 170,
    width: 150,
    borderRadius: 20,
  },
  infoContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  address: {
    color: '#939393',
    fontSize: 16,
    marginBottom: 10,
  },
  service: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 180,
    marginBottom: 5,
    backgroundColor: '#f2771a',
    borderRadius: 12,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  schedule: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: -20,
  },
  scheduleText: {
    fontSize: 16,
    marginRight: 3,
  },
})

const RepairShopCard = (props) => {
  const { imageUrl, name, address, services } = props

  const goToRepairShop = () => {
    const { router, ...repairShop } = props
    router.navigate('RepairShopDetail', {
      repairShop,
      schedule: true,
    })
  }
  return (
    <TouchableOpacity style={styles.item} onPress={goToRepairShop}>
      <View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.address}>{address}</Text>

        <FlatList
          data={services}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>
                {item.serviceDetails}: ${item.price}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.serviceName}
        />
        <View style={styles.schedule}>
          <Text style={styles.scheduleText}>Schedule</Text>
          <Feather name="arrow-right" size={22} color="#f2771a" />
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
