import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View, Image } from "react-native";
import Button from "./Button";

const MyModal = ({ source }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Image style={styles.image} source={{ uri: source }} />

            <Button
              elevation={5}
              colorBg={"#ff0000"}
              colorText={"white"}
              title={"Close"}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      <Button
        elevation={5}
        colorBg={"gray"}
        colorText={"white"}
        title={"my picture"}
        icon="eye"
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
    margin: 20,

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
});

export default MyModal;
