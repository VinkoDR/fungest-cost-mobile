import React  from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRef } from "react";

export default function Button({ title, onPress, icon, colorBg, colorText, elevation, prop, propRef }) {
  const styles = StyleSheet.create({
    button: {
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: colorBg,
      borderRadius: 20,
      margin: 30,
      padding: 5,
      shadowColor: "white",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: elevation,
      
    },
    text: {
      fontWeight: "bold",
      fontSize: 16,
      color: colorText,
      marginLeft: 10,
    },
    icon: {
      marginLeft: 10,
    }

  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} ref={propRef}>
      <Entypo name={icon} size={28} style={styles.icon}></Entypo>
      <Text style={styles.text}>{`${title}  `}</Text>
      
    </TouchableOpacity>
  );
}
