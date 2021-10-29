import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { PropTypes } from 'prop-types'
import { useIsFocused } from '@react-navigation/native'

import ServiceCard from '../components/cards/ServiceCard'
import AppContext from '../context/AppContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
})

const myServices = ({ navigation }) => {
  const { state, getServices } = useContext(AppContext)
  const [loading, setLoading] = React.useState(true)
  const [services, setServices] = React.useState([])

  const isVisible = useIsFocused()

  useEffect(() => {
    getServices(state.user._id)
  }, [isVisible])

  useEffect(() => {
    if (state?.userServices?.length > 0) {
      setLoading(false)
      setServices(state.userServices)
    }
  }, [state])

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f2771a" />
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <ServiceCard {...item} router={navigation} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={1}
          onEndReachedThreshold={10}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

myServices.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default myServices
