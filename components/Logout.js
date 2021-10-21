import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../context/AppContext";

const Logout = ({ navigate }) => {
  const { logoutUser } = useContext(AppContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@jaq/bikr-auth");
    logoutUser();
    navigate("Login");
  };
  return (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;
