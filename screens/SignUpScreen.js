import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import AppContext from "../context/AppContext";
import validateReg from "../components/forms/validateReg";

const SignUpScreen = ({ navigation }) => {
  const { state, signUpUser, resetError } = useContext(AppContext);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([
    { label: "User", value: "user" },
    { label: "Owner", value: "owner" },
  ]);
  const [errMsg, setErrMsg] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => resetError(), []);

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
      await signUpUser(form);
    } else {
      setErrMsg(errors);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
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
          style={styles.list}
          dropDownContainerStyle={styles.listBox}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  formContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderWidth: 2,
    borderRadius: 20,
  },
  title: {
    color: "#1c1919",
    fontSize: 30,
    marginBottom: 5,
    marginTop: 15,
    alignSelf: "center",
  },
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
    color: "#1c1919",
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 300,
    borderColor: "#1c1919",
    borderWidth: 1,
    borderRadius: 5,
  },
  list: {
    color: "#1c1919",
    height: 40,
    marginBottom: 12,
    padding: 10,
    width: 300,
    borderRadius: 5,
  },
  listBox: {
    color: "#1c1919",
    width: 300,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: "#f2771a",
    borderColor: "#1c1919",
    borderWidth: 3,
    borderRadius: 10,
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
