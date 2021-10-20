import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import customAxios from "../axios";

const initialState = {
  user: null,
  error: null,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const loginUser = async payload => {
    try {
      const response = await customAxios.post("/api/users/login", {
        ...payload,
      });
      // save token to local storage
      await AsyncStorage.setItem("@jaq/bikr-auth", response.data.token);
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
      });
    } catch (e) {
      setState({
        ...state,
        error: e.response.data.error,
      });
    }
  };

  return {
    state,
    loginUser,
  };
};

export default useInitialState;
