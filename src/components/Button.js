import React  from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRef } from "react";



export default function Button({ title, onPress, icon, colorBg, colorText, elevation, prop, propRef }) {
  //title = le texte sur le boutton
  //onPress = pareil que onClick on lui passe une fonction qui sera lancer quand on presse dessus
  //icon = nom de l 'icon de la librairie Entypo
  //colorBg = background du bouton
  //colorText = couleur du title
  //elevation = correspond à l étendu de l'ombre autour du bouton
  //non utilisé
  // prop : transmettre des infos
  // propref: correspond à id dans javascript permet de séléctionner un élément du dom avec l'id

  //j'ai mis ici le styleSheet.crete pour pouvoir avoir des variables dans le css
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
    //touchableOpacity = zone cliquable
    <TouchableOpacity onPress={onPress} style={styles.button} ref={propRef}>
      {/* //Entypo librairie d'icons disponible grace à @expo/vector-icons*/}
      <Entypo name={icon} size={28} style={styles.icon}></Entypo>
      <Text style={styles.text}>{`${title}  `}</Text>
      
    </TouchableOpacity>
  );
}
