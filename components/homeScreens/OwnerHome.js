/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import { useIsFocused } from '@react-navigation/native'
import debounce from 'lodash/debounce'

import AppContext from '../../context/AppContext'
import SearchBar from '../SearchBar'
import userImage from '../../assets/user-dummy.png'
import ServiceCard from '../cards/ServiceCard'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 20,
    color: '#1c1919',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  span: {
    color: '#1c1919',
    fontSize: 18,
    marginRight: 5,
    marginLeft: 20,
  },
  list: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  error: {
    color: 'red',
    fontSize: 22,
    marginBottom: 10,
  },
})

const OwnerHome = ({ navigation }) => {
  const {
    state,
    searchRepairShopServices,
    getRepairShopServices,
    getRepairShop,
  } = useContext(AppContext)
  const [services, setServices] = React.useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = React.useState(true)
  const isVisible = useIsFocused()

  useEffect(() => {
    setServices(state?.repairshopServices)
    setError(state?.error)
    setLoading(false)
  }, [state])

  useEffect(() => {
    if (isVisible) {
      getRepairShop(state?.user._id)
      getRepairShopServices(state?.user._id)
    }
  }, [isVisible])

  const handleServiceSearch = (text) => {
    searchRepairShopServices({ userId: state.user._id, query: text })
  }

  const searchServicesDebounced = useCallback(
    debounce(handleServiceSearch, 900),
    [],
  )

  return (
    <View style={styles.screen}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          title="Services"
          handleChangeInput={searchServicesDebounced}
        />
        <Image
          source={
            state?.user?.imageUrl ? { uri: state?.user?.imageUrl } : userImage
          }
          style={styles.image}
        />
      </View>
      <Text style={styles.span}>Hi {state?.user?.name},</Text>
      <Text style={styles.title}>Check out your scheduled Services</Text>
      {error ? (
        <View>
          <Text>You don&apos;t have any services scheduled</Text>
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f2771a" />
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceCard {...item} repairCard router={navigation} />
          )}
          keyExtractor={(item) => item.serviceId}
          numColumns={1}
          onEndReachedThreshold={10}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

OwnerHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default OwnerHome
