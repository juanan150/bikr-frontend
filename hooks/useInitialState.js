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
  payed: false,
  userServices: [],
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
      customAxios.defaults.headers.common.Authorization =
        await AsyncStorage.getItem('@jaq/bikr-auth')
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

  const loadUser = async () => {
    try {
      customAxios.defaults.headers.common.Authorization =
        await AsyncStorage.getItem('@jaq/bikr-auth')
      const response = await customAxios.get('/api/users/me')
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
      // console.log(e)
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
    setState(initialState)
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

  const requestService = (payload) => {
    setState({
      ...state,
      serviceInfo: payload,
    })
  }

  const generatePayment = async (payload) => {
    try {
      const data = {
        cardNumber: payload.cardNumber,
        expYear: payload.expYear,
        expMonth: payload.expMonth,
        cvc: payload.cvc,
        value: payload.amount,
        customerId: state.user._id,
        service: state.serviceInfo.serviceName,
        repairShopId: state.serviceInfo.repairShopId,
        dues: 1,
      }
      await customAxios.post('/api/transactions', data)
      setState({
        ...state,
        payed: true,
      })
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const updateProfile = async (payload) => {
    try {
      const formData = new FormData()
      formData.append('name', payload.name)
      formData.append('_id', state.user._id)
      if (payload.uri) {
        formData.append('image', {
          uri: payload.uri,
          name: payload.uri.split('/').pop(),
          type: `image/${payload.uri.split('.').pop()}`,
        })
      }

      const response = await customAxios.put(
        `/api/users/${state.user._id}`,
        formData,
      )

      setState({
        ...state,
        user: {
          ...response.data,
        },
      })
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const getServices = async (payload) => {
    try {
      const response = await customAxios.get(`/api/users/${payload}/services`)
      setState({
        ...state,
        userServices: response.data,
      })
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const resetError = () => {
    setState({
      ...state,
      error: null,
      payed: false,
    })
  }

  return {
    state,
    loginUser,
    loadUser,
    signUpUser,
    logoutUser,
    resetError,
    listRepairShops,
    requestService,
    generatePayment,
    updateProfile,
    getServices,
  }
}

export default useInitialState
