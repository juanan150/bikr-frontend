import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import AppContext from "../context/AppContext";
import validateReg from "../components/forms/validateReg";

const SignUpScreen = ({ navigation }) => {
  const { state, signUpUser } = useContext(AppContext);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([
    { label: "User", value: "user" },
    { label: "Owner", value: "owner" },
  ]);
  const [errMsg, setErrMsg] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setError(state.error);
    !state.error && state.user && navigation.navigate("Home");
  }, [state]);

  const handleChangeText = (field, text) => {
    setForm({
      ...form,
      [field]: text,
    });
  };

  const handleRoleText = callback => {
    setForm({
      ...form,
      role: callback(),
    });
  };

  const handleSubmit = async () => {
    const errors = validateReg(form);

    if (!Object.keys(errors).length) {
      console.log(errors);
      await signUpUser(form);
    } else {
      setErrMsg(errors);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <Text style={styles.text}>Email</Text>
      {errMsg.email && <Text style={styles.error}>{errMsg.email}</Text>}
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={text => handleChangeText("email", text)}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Password</Text>
      {errMsg.password && <Text style={styles.error}>{errMsg.password}</Text>}
      <TextInput
        autoCapitalize="none"
        onChangeText={text => handleChangeText("password", text)}
        style={styles.input}
        secureTextEntry
      />
      <Text style={styles.text}>Confirm Password</Text>
      {errMsg.confirmedPassword && (
        <Text style={styles.error}>{errMsg.confirmedPassword}</Text>
      )}
      <TextInput
        autoCapitalize="none"
        onChangeText={text => handleChangeText("confirmedPassword", text)}
        style={styles.input}
        secureTextEntry
      />
      <Text style={styles.text}>Full Name</Text>
      {errMsg.name && <Text style={styles.error}>{errMsg.name}</Text>}
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={text => handleChangeText("name", text)}
        keyboardType="email-address"
      />
      <Text style={styles.text}>Role</Text>
      {errMsg.role && <Text style={styles.error}>{errMsg.role}</Text>}
      <DropDownPicker
        open={open}
        value={form?.role}
        items={items}
        setOpen={setOpen}
        setValue={handleRoleText}
        setItems={setItems}
        placeholder="Select a role"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#1c1919",
    fontSize: 24,
    marginBottom: 5,
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

export default SignUpScreen;
