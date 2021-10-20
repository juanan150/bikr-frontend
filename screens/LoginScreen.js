import React from "react";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/bikr-logo.png";

const LoginScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled="false"
      style={styles.container}
    >
      <Image source={logo} style={styles.image} />
      <View style={styles.formContainer}>
        <LoginForm navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
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
    flex: 1,
    height: 300,
    width: 300,
    resizeMode: "contain",
    // borderRadius: 100,
  },
});

export default LoginScreen;
