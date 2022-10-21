
import React, {  useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  

} from 'react-native';
import { SearchBar } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";



const CustomDropdown = ({ label, data, onSelect, propHeight }) => {
  //propHeight = définit la hauteur du dropdown par rapport au label

  // useRef utilisé pour atteindre un élément du dom
  const DropdownButton = useRef();

  //boolean qui definira si on ferme le dropdown ou si on l'affiche
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(undefined);

  // valeur qui positionera le dropdown
  const [dropdownTop, setDropdownTop] = useState(0);

  // correspond à la valeur que l'utilsateur tappe dans la bar de recherche
  const [search, setSearch] = useState("");

  //met à jour la recherche à chaque fois que la valeur de l'input est changée
  const updateSearch = (search) => {
    setSearch(search);
  };

  // vérification du sate  visible
  // si visible on lance openDropdown
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  // les mesures du dropdown qui s affichera
  // on change le sate de visible à true
  const openDropdown = ()=> {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py - propHeight );
    });
    setVisible(true);
  };

  //quand on clique sur un item dans le dropdown
  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  // rendu de chaque item qui proviennent de data
  const renderItem = ({ item }) => {
  //si search existe pas on retourne la liste entière
  // si search existe on retourne uniquement les items qui ont items.name qui commencent par search avec .startsWith(search)
  if(search === ""){
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
    )
  }else if(item.name.startsWith(search)){
    return(
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
    )
  }else{
    return <Text></Text>
  }
    
   
  
  
}
  ;

  const renderDropdown = () => {
    // affiche le dropdown et parcours les éléments passé dans data pour les afficher
    return (
      <Modal visible={visible} transparent animationType="none">
      
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown]}>
          <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    />
            <FlatList
              
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return(
                   index.toString()
                    
                )
              }
             
              }
            />
           
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(!!selected && selected.label) || label}
      </Text>
      <Entypo style={styles.icon}  name="chevron-down" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
   
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: "white",
    fontWeight:"bold"
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    color:"black",
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: 500,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
   
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
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
});

export default CustomDropdown;