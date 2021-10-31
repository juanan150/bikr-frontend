/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-use-before-define */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import AppContext from '../context/AppContext'
import UserHome from '../components/homeScreens/UserHome'
import OwnerHome from '../components/homeScreens/OwnerHome'

const SearchScreen = ({ navigation }) => {
  const { state } = useContext(AppContext)

  return (
    <>
      {state?.user?.role === 'user' ? (
        <UserHome navigation={navigation} />
      ) : (
        <OwnerHome navigation={navigation} />
      )}
    </>
  )
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default SearchScreen
