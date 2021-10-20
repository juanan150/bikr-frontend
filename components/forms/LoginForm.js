import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import customAxios from "../../axios";

const LoginForm = ({ navigation }) => {
  const [form, setForm] = useState(null);

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
    } catch (error) {
      console.log(
        "🚀 ~ file: Login.js ~ line 28 ~ handleSubmit ~ error",
        error
      );
      alert(error.message);
    }
  };

  return (
    <View>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#1c1919",
    fontSize: 30,
    marginBottom: 10,
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
  },
  buttonText: {
    color: "#1c1919",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginForm;
