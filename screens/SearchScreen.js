/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import { useIsFocused } from '@react-navigation/native'
// import debounce from 'lodash/debounce'

import SearchBar from '../components/SearchBar'
import AppContext from '../context/AppContext'
import RepairShopCard from '../components/RepairShopCard'
import userImage from '../assets/user-dummy.png'

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

const SearchScreen = ({ navigation }) => {
  const { state, listRepairShops, resetError } = useContext(AppContext)
  const [repairShops, setRepairShops] = useState({
    page: 0,
    count: 0,
    repairShops: [],
  })
  const [error, setError] = useState(null)
  const isVisible = useIsFocused()

  useEffect(() => {
    listNextRepairShops(1)
    resetError()
  }, [isVisible])

  useEffect(() => {
    setRepairShops(state.repairShopsInfo)
    setError(state.error)
  }, [state])

  // const handleServiceSearch = (text) => {

  // }

  const searchServicesDebounced = () => {
    // debounce(handleServiceSearch, 900)
  }

  const listNextRepairShops = (page = 1) => {
    listRepairShops(page)
  }
  return (
    <View style={styles.screen}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          title="Services"
          handleChangeInput={searchServicesDebounced}
        />
        <Image source={userImage} style={styles.image} />
      </View>
      <Text style={styles.span}>Hi {state.user.name},</Text>
      <Text style={styles.title}>Are you looking for a Service?</Text>
      {error ? (
        <View>
          <Text>There is nothing here</Text>
        </View>
      ) : (
        <FlatList
          data={repairShops.repairShops}
          renderItem={({ item }) => (
            <RepairShopCard {...item} router={navigation} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={1}
          onEndReachedThreshold={10}
          onEndReached={() => {
            listNextRepairShops(+repairShops.page + 1)
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SearchScreen
