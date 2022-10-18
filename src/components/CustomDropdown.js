
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
  
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  // correspond à la valeur que l'utilsateur tappe dans la bar de recherche
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = ()=> {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py - propHeight );
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

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