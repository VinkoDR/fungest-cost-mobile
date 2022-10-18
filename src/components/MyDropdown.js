import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function MyDropdown({ dataDropdown, valueToUpdate, valueName }) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Dropdown
      data={dataDropdown}
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      search
      maxHeight={300}
      labelField="name"
      valueField="value"
      placeholder={!isFocus ? `Select ${valueName}` : ""}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        valueToUpdate = item.value;
        console.log(item.value);
        setIsFocus(false);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    margin: 10,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MyDropdown;
