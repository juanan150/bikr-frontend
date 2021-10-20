import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import customAxios from "../../axios";

const LoginForm = ({ navigation }) => {
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const goToSignIn = () => {
    navigation.navigate("SignUp");
  };

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@jaq/bikr-auth");
        if (value) {
          navigation.navigate("Home");
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await customAxios.post("/api/users/login", { ...form });

      // save token to local storage
      await AsyncStorage.setItem("@jaq/bikr-auth", response.data.token);

      navigation.navigate("Home");
    } catch (e) {
      console.log(
        "🚀 ~ file: Login.js ~ line 28 ~ handleSubmit ~ error",
        e.response.data.error
      );
      setError(e.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={text => handleChangeText("email", text)}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={text => handleChangeText("password", text)}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't you have an account?</Text>
        <TouchableHighlight style={styles.button} onPress={goToSignIn}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#1c1919",
    fontSize: 30,
    marginBottom: 10,
  },
  signUpContainer: {
    alignItems: "center",
  },
  signUpText: {
    color: "#1c1919",
    fontSize: 22,
    marginTop: 10,
  },
  input: {
    borderColor: "#1c1919",
    borderWidth: 1,
    color: "#1c1919",
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 300,
  },
  button: {
    backgroundColor: "#f2771a",
    borderColor: "#1c1919",
    borderWidth: 3,
    marginTop: 10,
    padding: 10,
    width: 300,
  },
  buttonText: {
    color: "#1c1919",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 22,
    marginBottom: 10,
  },
});

export default LoginForm;
