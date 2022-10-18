import React, { useState, useContext } from "react";
import { Alert, Modal, StyleSheet, View, Text, TextInput } from "react-native";
import Button from "./Button";
import axios from "axios";
import { Context } from "../contexts.js/Context";

 const AddProviderModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {setLoadAgainProviderList} = useContext(Context)
  const [newProvider, setNewProvider] = useState({
    name: "",
    account_id: null,
  });

  const handleProviderInfoChange = (value, target) => {
    console.log("handleFormChange", value, target);
    let data = { ...newProvider };
    data[target] = value;
    setNewProvider(data);
    console.log(newProvider);
  };
  const submitAddProvider = async () => {
    console.log("submitAddProvider");
    if (newProvider.name === "") {
      alert("Please give a name to your new Provider");
    } else if (newProvider.account_id === null) {
      alert("Please give an account id to your new Provider");
    } else {
      try {
        const { data } = await axios.post(
          "https://fungest-test.lahode.ch/api/providers",
          newProvider,
        );
        console.log("POST PROVIDER SUCESS", data);
        setLoadAgainProviderList(true)
        alert("A NEW PROVIDER HAS BEEN CREATED")
      } catch (err) {
        console.log(err.message);
      }
    }
    
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Provider Name:</Text>
            <TextInput
              style={[styles.input, styles.border]}
              value={newProvider.name}
              onChangeText={(value) => handleProviderInfoChange(value, "name")}
              name="addProviderName"
            />
            <Text style={styles.textStyle}>account_id:</Text>
            <TextInput
              style={[styles.input, styles.border]}
              value={newProvider.id}
              onChangeText={(value) =>
                handleProviderInfoChange(value, "account_id")
              }
              name="addProviderId"
              keyboardType="numeric"
            />
            <Button
              elevation={5}
              colorBg={"#00ff00"}
              colorText={"white"}
              title={"Submit new Provider  "}
              icon="check"
              onPress={() => submitAddProvider()}
            />

            <Button
              elevation={5}
              colorBg={"#ff0000"}
              colorText={"white"}
              title={"Close  "}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      <Button
        elevation={5}
        colorBg={"#00ff00"}
        colorText={"white"}
        title={"ADD A NEW PROVIDER"}
        icon="circle-with-plus"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  bigModal: {
    width: "100%",
  },
  image: {
    height: "80%",
    paddingBottom: 50,
    alignSelf: "stretch",
  },
  modalView: {
    width: "100%",
    height: "100%",
    margin: 5,

    backgroundColor: "#16181A",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  border: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 8,
    color: "white",
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  buttonOpen: {
    backgroundColor: "green",
    color: "white",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    color: "white",
    paddingLeft: 30,
    paddingRight: 30,
    width: "50%",
  },
});

export default AddProviderModal
