/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  LogBox,
} from 'react-native'
import { PropTypes } from 'prop-types'
import { Feather } from '@expo/vector-icons'
import moment from 'moment'
import AppContext from '../../context/AppContext'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    minHeight: 170,
    maxHeight: 200,
    width: 370,
    marginVertical: 5,
    backgroundColor: '#F7F7F8',
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#1c1919',
    marginBottom: 15,
  },
  image: {
    minHeight: '100%',
    width: 150,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    position: 'relative',
  },
  title: {
    fontSize: 18,
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
  date: {
    fontSize: 16,
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
  black: {
    color: '#1c1919',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    padding: 10,
    width: 80,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#f2771a',
  },
})

const ServiceCard = (props) => {
  const { setService } = useContext(AppContext)
  const {
    imageUrl,
    name,
    address,
    service,
    scheduleDate,
    repairCard,
    phoneNumber,
    status,
    handleService,
    serviceId,
  } = props
  let statusColor = 'black'

  const goToRepairShop = () => {
    if (repairCard) {
      return
    }
    const { router, ...repairShop } = props
    router.navigate('RepairShopDetail', {
      repairShop,
      schedule: false,
    })
  }

  const handlePay = () => {
    const { router } = props
    setService({ name, service, scheduleDate, serviceId })
    router.navigate('Payment')
  }

  if (status === 'rejected') {
    statusColor = 'red'
  } else if (status === 'approved') {
    statusColor = 'green'
  }

  return (
    <TouchableOpacity style={styles.item} onPress={goToRepairShop}>
      <View>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : {
                  uri: 'https://res.cloudinary.com/juanan150/image/upload/v1636737711/user-dummy_bavfwk.png',
                }
          }
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        {!repairCard && <Text style={styles.address}>{address}</Text>}
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            {service.serviceDetails}: ${service.price}
          </Text>
        </View>
        <Text style={styles.date}>
          Date:{' '}
          {moment(new Date(+scheduleDate), 'DD/MM/YYYY')
            .utc()
            .format('DD/MM/YYYY')}
        </Text>
        <Text style={[styles.date, styles[statusColor]]}>{status}</Text>
        {!repairCard ? (
          <View style={styles.schedule}>
            <Text style={styles.scheduleText}>See On Map</Text>
            <Feather name="arrow-right" size={22} color="#f2771a" />
          </View>
        ) : (
          <Text style={styles.date}>Phone: {phoneNumber}</Text>
        )}
        {status === 'pending' && repairCard && (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleService('approved', serviceId)}
            >
              <Text style={styles.listItem}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleService('rejected', serviceId)}
            >
              <Text style={styles.listItem}>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
        {status === 'approved' && !repairCard && (
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handlePay}>
              <Text style={styles.listItem}>Pay</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

ServiceCard.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  address: PropTypes.string,
  scheduleDate: PropTypes.number.isRequired,
  service: PropTypes.shape({
    serviceName: PropTypes.string.isRequired,
    serviceDetails: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  phoneNumber: PropTypes.string,
  repairCard: PropTypes.bool,
  status: PropTypes.string.isRequired,
  handleService: PropTypes.func,
  serviceId: PropTypes.string.isRequired,
}
ServiceCard.defaultProps = {
  address: '',
  repairCard: false,
  phoneNumber: '',
  imageUrl: '',
  handleService: () => {},
}

export default ServiceCard
