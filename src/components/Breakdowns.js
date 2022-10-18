import React, { useContext, useState, useEffect } from "react";


import { StyleSheet, TextInput, Text, ScrollView, View } from "react-native";
import axios from "axios";

import Button from "./Button";
import { Context } from "../contexts.js/Context";
import CustomDropdown from "./CustomDropdown";

const Breakdowns = (props) => {
  
  // const [accountsListName, setAccountsListName] = useState([]);
  const { breakdowns, setBreakdowns, account, setAccount, accountsList, setAccountsList,isLoading, setIsLoading } = useContext(Context);
 

  console.log("accountFromProvider", props.accountFromProvider);
  console.log("total in breakdowns", props.total);

  console.log("account", account);
  

  ///////////////////////////////////////////////////////////////////////////////

 

  const addBreakdown = () => {
    let breakdownAmount = 0;
    if (breakdowns.length === 0) {
      breakdownAmount = props.total;
    }
    setBreakdowns([
      ...breakdowns,
      {
     
        amount: breakdownAmount,
        account_id: props.accountFromProvider,
        description: "",
      },
    ]);
  };

  const handleFormChange = (index, value, target) => {
    console.log("handleFormChange", index, value, target);
    let data = [...breakdowns];
    data[index][target] = value;
    setBreakdowns(data);
    console.log(breakdowns);
  };

  const removeBreakdown = (index) => {
    console.log(index);
    let data = [...breakdowns];
    data.splice(index, 1);
    setBreakdowns(data);
  };

  return (
    <View>
      <Button
        elevation={10}
        colorBg={"gray"}
        colorText={"white"}
        title={"Add breakdown"}
        icon="circle-with-plus"
        onPress={addBreakdown}
      />

      {breakdowns.map((breakdown, index) => {
       
        return (
          <View key={index} style={styles.border}>
            <Text style={styles.textStyle}>
              account id:
          
             {account?   account.id : 1}
            </Text>
            <Text style={styles.textStyle}>Account:</Text>

            {/* <ScrollView>
              <Picker
                style={styles.picker}
                onValueChange={(value, index) => {
                  console.log("new value will be", value);
                  setAccount(value);
                  console.log("index", index);

                  breakdown.account_id = value.id;
                }}
                mode="dropdown" // Android only
              >
                {}
                <Picker.Item
                  value=""
                  label={isLoading ? "Vibxtbrixrmnrnzu" : ""}
                />
                {accountsList.map((acc, index) => {
                  return (
                    <Picker.Item key={acc.id} label={acc.name} value={acc} />
                  );
                })}
              </Picker>
            </ScrollView> */}
            {/* <Text style={styles.textStyle}>Selected Account: {account.name}</Text> */}
            
            <CustomDropdown label={account?   account.name : "Account"} data={accountsList} onSelect={setAccount}/>
            <Text style={styles.textStyle}>Amount:</Text>
            <TextInput
              style={[styles.input, styles.border]}
              value={breakdown.amount}
              onChangeText={(value) => handleFormChange(index, value, "amount")}
              name="amount"
              keyboardType="numeric"
            />
            <Text style={styles.textStyle}>Description breakdown:</Text>
            <TextInput
              style={[styles.descriptionInput, styles.border]}
              onChangeText={(value) =>
                handleFormChange(index, value, "description")
              }
              name="description"
              multiline={true}
            />
            <Button
              elevation={10}
              colorBg={"gray"}
              colorText={"white"}
              title={"remove this breakdown"}
              icon="trash"
              onPress={() => removeBreakdown(index)}
            />
          </View>
        );
      })}
      {breakdowns.length > 0 ? (
        <Button
          elevation={10}
          colorBg={"red"}
          colorText={"white"}
          title={"remove all breakdowns"}
          icon="trash"
          onPress={() => setBreakdowns([])}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    color: "white",
    paddingLeft: 30,
  },

  descriptionInput: {
    height: 100,
    margin: 12,
    padding: 10,
    color: "white",
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
  textStyle: {
    color: "white",
    margin: 10,
  },
  picker: {
    color: "white",
    backgroundColor: "gray",
  },
});

export default Breakdowns;
