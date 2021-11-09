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
  serviceInfo: {},
  repairshopServices: [],
  repairShop: {},
}

const useInitialState = () => {
  const [state, setState] = useState(initialState)

  const loginUser = async (payload) => {
    try {
      console.log('login')
      const response = await customAxios.post('/api/users/login', {
        ...payload,
      })
      // save token to local storage
      await AsyncStorage.setItem('@jaq/bikr-auth', response.data.token)
      customAxios.defaults.headers.common.Authorization =
        await AsyncStorage.getItem('@jaq/bikr-auth')
      setState((prevState) => ({
        ...prevState,
        user: {
          _id: response.data._id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          imageUrl: response.data.imageUrl,
          phoneNumber: response.data.phoneNumber,
        },
        error: null,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const loadUser = async () => {
    try {
      console.log('load')
      customAxios.defaults.headers.common.Authorization =
        await AsyncStorage.getItem('@jaq/bikr-auth')
      const response = await customAxios.get('/api/users/me')
      setState((prevState) => ({
        ...prevState,
        user: {
          _id: response.data._id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          imageUrl: response.data.imageUrl,
          phoneNumber: response.data.phoneNumber,
        },
        error: null,
      }))
    } catch (e) {
      // console.log(e)
    }
  }

  const signUpUser = async (payload) => {
    try {
      console.log('signup')
      const user = await customAxios.post('/api/users/signup', {
        ...payload,
      })

      setState((prevState) => ({
        ...prevState,
        user: {
          ...user,
        },
        error: null,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const verifyEmail = async (payload) => {
    try {
      console.log('verify email')
      await customAxios.post(`/api/users/verify/${payload.token}`)

      await loginUser({ email: payload.email, password: payload.password })
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }
  const logoutUser = () => {
    console.log('logout')
    setState((prevState) => ({ ...prevState, ...initialState }))
  }

  const listRepairShops = async (page) => {
    try {
      console.log('list repair')
      const response = await customAxios.get(`/api/repairshops/?page=${page}`)
      if (page === 1) {
        setState((prevState) => ({
          ...prevState,
          repairShopsInfo: response.data,
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          repairShopsInfo: {
            ...response.data,
            repairShops: state?.repairShopsInfo?.repairShops.concat(
              response.data.repairShops,
            ),
          },
        }))
      }
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const requestService = async (payload) => {
    console.log('request ser')
    await customAxios.post('/api/transactions', {
      userId: state.user._id,
      repairShopId: payload.repairShopId,
      service: payload.serviceName,
      scheduleDate: new Date(payload.scheduleDate).getTime(),
      value: payload.servicePrice,
      status: 'pending',
    })
    setState((prevState) => ({
      ...prevState,
      serviceInfo: {
        ...payload,
        scheduleDate: new Date(payload.scheduleDate).getTime(),
      },
    }))
  }

  const generatePayment = async (payload) => {
    try {
      console.log('pay')
      const data = {
        cardNumber: payload.cardNumber,
        expYear: payload.expYear,
        expMonth: payload.expMonth,
        cvc: payload.cvc,
        value: state.serviceInfo.servicePrice,
        customerId: state.user._id,
        dues: 1,
        serviceId: state.serviceInfo.serviceId,
      }
      await customAxios.put('/api/transactions/service', data)
      setState((prevState) => ({
        ...prevState,
        payed: true,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const createRepairShop = async (payload) => {
    try {
      console.log('create repair')
      const formData = new FormData()
      formData.append('name', payload.name)
      formData.append('address', payload.address)
      formData.append('accountNumber', payload.accountNumber)
      formData.append('latitude', payload.latitude)
      formData.append('longitude', payload.longitude)
      formData.append('services', JSON.stringify(payload.services))
      formData.append('bank', 'Bancolombia')
      formData.append('userId', state.user._id)
      if (payload.imageUrl) {
        formData.append('image', {
          uri: payload.imageUrl,
          name: payload.imageUrl.split('/').pop(),
          type: `image/${payload.imageUrl.split('.').pop()}`,
        })
      }

      let response = {}

      if (payload.create) {
        response = await customAxios.post('/api/repairshops', formData)
      } else {
        formData.append('_id', payload._id)
        response = await customAxios.put('/api/repairshops', formData)
      }

      setState((prevState) => ({
        ...prevState,
        repairShop: {
          ...response.data,
        },
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const updateProfile = async (payload) => {
    try {
      console.log('update prof')
      const formData = new FormData()
      payload.name
        ? formData.append('name', payload.name)
        : formData.append('phoneNumber', payload.phoneNumber)
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

      setState((prevState) => ({
        ...prevState,
        user: {
          ...response.data,
        },
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const getServices = async (payload) => {
    try {
      console.log('get servs')
      const response = await customAxios.get(`/api/users/${payload}/services`)
      setState((prevState) => ({
        ...prevState,
        userServices: response.data,
      }))
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      })
    }
  }

  const searchRepairShops = async (payload) => {
    try {
      console.log('search servs')
      const response = await customAxios.get(
        `/api/repairshops/search?q=${payload}`,
      )

      setState((prevState) => ({
        ...prevState,
        repairShopsInfo: response.data,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const listServices = async () => {
    try {
      console.log('list servs')
      const response = await customAxios.get('/api/services')
      setState((prevState) => ({
        ...prevState,
        availableServices: response.data.services,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const getRepairShopServices = async (payload) => {
    try {
      console.log('get repair servs')
      const response = await customAxios.get(
        `/api/repairshops/${payload}/services`,
      )
      setState((prevState) => ({
        ...prevState,
        repairshopServices: response.data,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const getRepairShop = async (payload) => {
    try {
      console.log('get repair shop')
      const response = await customAxios.get(`/api/repairshops/info/${payload}`)
      setState((prevState) => ({
        ...prevState,
        repairShop: response.data,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const searchRepairShopServices = async (payload) => {
    try {
      console.log('search repair servs')
      const response = await customAxios.get(
        `/api/repairshops/${payload.userId}/services?q=${payload.query}`,
      )

      setState((prevState) => ({
        ...prevState,
        repairshopServices: response.data,
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const updateService = async (payload) => {
    try {
      console.log('update serv')
      await customAxios.put('/api/transactions', payload)
      setState((prevState) => ({
        ...prevState,
        repairshopServices: prevState.repairshopServices.map((service) => {
          if (service.serviceId === payload.serviceId) {
            return { ...service, status: payload.status }
          }
          return service
        }),
      }))
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e.response.data.error,
      }))
    }
  }

  const setService = (payload) => {
    setState((prevState) => ({
      ...prevState,
      serviceInfo: {
        servicePrice: payload.service.price,
        serviceDetails: payload.service.serviceDetails,
        repairShopName: payload.name,
        serviceId: payload.serviceId,
      },
    }))
  }

  const resetError = () => {
    console.log('reset err')
    setState((prevState) => ({
      ...prevState,
      error: null,
      payed: false,
    }))
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
    searchRepairShops,
    createRepairShop,
    listServices,
    getRepairShopServices,
    searchRepairShopServices,
    getRepairShop,
    verifyEmail,
    updateService,
    setService,
  }
}

export default useInitialState
