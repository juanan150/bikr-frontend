import React from "react";
import { View, StyleSheet, Image } from "react-native";

import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/bikr.svg";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 2,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    // borderRadius: 100,
  },
});

export default LoginScreen;
