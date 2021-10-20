import React from "react";
import { TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigate }) => {
  const logout = async () => {
    await AsyncStorage.removeItem("@jaq/bikr-auth");
    navigate("Login");
  };
  return (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;
