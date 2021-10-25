import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import customAxios from '../axios'

const initialState = {
  user: null,
  error: null,
  repairShopsInfo: {
    count: 0,
    page: 0,
    repairShops: [],
  },
}

const useInitialState = () => {
  const [state, setState] = useState(initialState)

  const loginUser = async (payload) => {
    try {
      const response = await customAxios.post('/api/users/login', {
        ...payload,
      })
      // save token to local storage
      await AsyncStorage.setItem('@jaq/bikr-auth', response.data.token)
      setState({
        ...state,
        user: {
          _id: response.data._id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          imageUrl: response.data.imageUrl,
        },
        error: null,
      })
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const signUpUser = async (payload) => {
    try {
      await customAxios.post('/api/users/signup', {
        ...payload,
      })

      await loginUser({ email: payload.email, password: payload.password })
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const logoutUser = () => {
    setState({
      user: null,
      error: null,
    })
  }

  // const searchService = () => {}

  const listRepairShops = async (page) => {
    try {
      const response = await customAxios.get(`/api/repairshops/?page=${page}`)
      if (page === 1) {
        setState({
          ...state,
          repairShopsInfo: response.data,
        })
      } else {
        setState({
          ...state,
          repairShopsInfo: {
            ...response.data,
            repairShops: state?.repairShopsInfo?.repairShops.concat(
              response.data.repairShops,
            ),
          },
        })
      }
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const resetError = () => {
    setState(initialState)
  }

  return {
    state,
    loginUser,
    signUpUser,
    logoutUser,
    resetError,
    listRepairShops,
  }
}

export default useInitialState
