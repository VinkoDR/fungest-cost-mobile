import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, Text, ScrollView, View } from "react-native";

import Button from "./Button";

import { useForm } from "../utils/hooks";
import axios from "axios";
import { Buffer } from "buffer";

import { Context } from "../contexts.js/Context";
import MyModal from "./MyModal";


import CustomDropdown from "./CustomDropdown";
import Breakdowns from "./Breakdowns";
import {getCurrencyBydefault} from "../services/currency"
import AddProviderModal from "./AddProviderModal";
 // crée un provider
 // button modal
 // name et account_id obligatoire

//  import { getDataProvidersList } from '../services/api'

//corriger la boucle qui va afficher les providers
//ajouter une partie breakdown au formulaire
//si on appui sur add breakdown
// les champs pour ajouter un breakdown apparaissent
// si il y a un breakdown le amount doit correspondre au total
// si il y a plusieurs breakdowns leur somme doit correspondre au total
// faire appel a l api pour récupérer les noms des accounts
// faire un dropdown account dans breakdown
// faire une boucle pour afficher les noms des accounts dans le dropdown
// breakdown.ammount=> Par défaut, ce champ doit reprendre la valeur de total, sauf s'il y a > 1 breakdowns.
// S'il y a plusieurs breakdown ce champ peut être modifié, mais le total des amount doit correspondre
// à la valeur dans total (champ obligatoire)

// faire la function removeBreakdown
//"account_id": 1, => Par défaut, on propose l'account qu'on récupère du provider sélectionné,
// mais l'utilisateur peut très bien changer cette valeur (champ obligatoire)

// quand il appui sur submit le cost est creé
// l'image est uploader dans l 'api en utilisant l lid du cost crée et
// l'image est supprimée du context
// on arrive sur la page d'acceuil

//bug
//l'image n est pas envoyée
//quand on ne rajoute pas de breakdown la requete de post ne se lance pas

// faire un dotenv
// laisser la possibilite de changer la date
// mettre le champs orinal amount en dessous
// nettre total avant breakdown
// remplacer la librairie picker avec un custom dropdown

// {"archived": false,
//  "breakdowns": [{"account_id": 1, "amount": "144", "description": "", "name": ""}],
//   "currency": {"label": "CHF", "value": "CHF"},
//   "date": "Fri Oct 14 2022 16:04:43 ", "description": "",
//    "original_amount": "",
//    "provider_id": 5,
//     "ticket": true,
//     "total": "144"}

function Form() {
  const [dataProvider, setDataProvider] = useState({});
  const [defaultValueCurrency, setDefaultValueCurrency ]= useState({})
  const [currency, setCurrency] = useState({ label: "CHF", value: "CHF" });
  const {
    imageInfoToSend,
    setImageInfoToSend,
    image,
    dataProvidersList,
    setDataProvidersList,
    breakdowns,
    account,
    setAccount,
    accountsList,
    setAccountsList,
    setIsLoading,
    isLoading,
    currencyByDefault,
    setCurrencyByDefault,
    dataCurrencyList,
    
    setDataCurrencyList,
    loadAgainProviderList,
   
  } = useContext(Context);


  console.log("currencyByDefault",currencyByDefault)
  console.log(image, "image from Form");
  console.log("type of image", typeof image);
  // const datab = [
  //   {
  //     name: "CHF",
  //     value: "CHF",
  //   },
  //   { name: "EUR", value: "EUR" },
  // ];
  /// récuperer la monnaie depuis le back
  const datab = []
  useEffect(() => {
   
    try {
        const { data } = axios
          .get(`https://fungest-test.lahode.ch/api/boot`)
          .then((response) => {
             console.log("currencies", response.data.currencies);
             console.log("response.data.settings.data", response.data.settings.data)

             const thisDataDefaultCurrency = response.data.settings.data
             setDefaultValueCurrency(thisDataDefaultCurrency.find(element => element.key === "default_currency"))
             setDefaultValueCurrency(prevState => {name: prevState.value})
             

           const thisdata = (response.data.currencies);
            // var arr = ["124857202", "500255104", "78573M104"];
            setDataCurrencyList( thisdata.reduce(function(s, a){
                s.push({name: a});
                return s;
              }, []))
              
          
          });
      } catch (err) {
      //  Handle error
        console.log("error from getCurrencyByDefault", err);
      }
 
   return () => {
     
   }
 }, [])
  /////////////////// api accounts call////////////////////////////////////////////////////////////////

  //  useEffect(() => {
  //   try {
  //     const { data } = axios
  //       .get(`https://fungest-test.lahode.ch/api/accounts`)
  //       .then((response) => {
  //         return setAccountsList(response.data.data);
  //       })
  //       .then(() => {
  //         let accountDefault = accountsList.find(
  //           (defaultAccount) => defaultAccount.id == dataProvider.account_id
  //         );
  //         console.log(accountDefault, "accountDefault");
  //         setAccount(accountDefault);

  //         console.log(account.name, "account.name");
  //         setIsLoading(false);
  //       });
  //   } catch (err) {
  //     // Handle error
  //     console.log("error from getAccountList", err);
  //   }
  //   // console.log("inside useEffect accountsList", accountsList);
  // }, [dataProvider.account_id]);
  ///////////////////////////////////////////////////////////////////////////////

  ///////////////// api providers call/////////////////////////////////////////////////////////////////

  const getDataProvidersList = () => {
    try {
      const { data } = axios
        .get(`https://fungest-test.lahode.ch/api/providers`)
        .then((response) => {
          // console.log("provider1", response.data.data);

          setDataProvidersList(response.data.data);
        });
    } catch (err) {
      // Handle error
      // console.log("error from getDataprovidersList", err);
    }
  };
    /////////////////// api accounts call////////////////////////////////////////////////////////////////

   const getAccountList = () => {
      try {
        const { data } = axios
          .get(`https://fungest-test.lahode.ch/api/accounts`)
          .then((response) => {
            return setAccountsList(response.data.data);
          })
          .then(() => {
            let accountDefault = accountsList.find(
              (defaultAccount) => defaultAccount.id == dataProvider.account_id
            );
            console.log(accountDefault, "accountDefault");
            setAccount(accountDefault);
            
            
          }).then(() => {
            console.log(account.name, "account.name");
            console.log("account from getAccountList", account)
            setIsLoading(false);
          });
      } catch (err) {
        // Handle error
        console.log("error from getAccountList", err);
      }
      // console.log("inside useEffect accountsList", accountsList);
    };

  useEffect(() => {
    getDataProvidersList();
   

   // si loadAgainProviderList change la requete est renvoyée
  }, [loadAgainProviderList]);
  useLayoutEffect(() => {
    getAccountList();
   

    // console.log("inside useEffect", dataProvidersList);
  }, [dataProvider]);

  //////////// useForm custom hook///////////////////////////////////////////////////////////////////////

  const { onChange, values } = useForm(submitChange, {
    date: new Date().toString().substring(0, 25),
    currency: "",
    description: "",
    original_amount: "",
    ticket: true,
    provider_id: 0,
    total: 0,
    // uuid: "",
  });
//////////////////// BLOB //////////////////////////////////////
  // const base64 = image.base64;
  // const buffer = Buffer.from(base64, "base64");

  // const blob = new Blob([buffer], { type: "[content-type]" });
  // setImageInfoToSend(blob);
  // console.log("imageInfoToSend ",imageInfoToSend)
  // var bodyFormData = new FormData();
  // bodyFormData.append("upload", imageInfoToSend);
  // console.log("bodyFormData", bodyFormData);

  //  .then((res) => res.blob())
  // let res = image.blob()
  // console.log(res)
  //     // .then((blob) => {
  //     // Read the Blob as DataURL using the FileReader API
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //         console.log(reader.result);
  //         // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

  //         // Convert to Base64 string
  //         const base64 = getBase64StringFromDataURL(reader.result);
  //         console.log(base64);
  //         // Logs wL2dvYWwgbW9yZ...
  //     };
  //     reader.readAsDataURL(blob);

  ////////////////// Submit form//////////////////////////////////////////////////////////////

  const submitChange = async () => {
    console.log({
      date: values.date,
      currency: currency.value,
      description: values.description,
      original_amount: values.original_amount,
      ticket: values.ticket,
      provider_id: dataProvider.id,
      total: values.total,
      archived: false,
      ticket: true,
      breakdowns: breakdowns,
    });
    let totalBreakdown = 0;

    for (let i = 0; i < breakdowns.length; i++) {
      let thisAmount = parseFloat(breakdowns[i].amount);
      totalBreakdown += thisAmount;
    }

    if (values.currency === "EUR" && values.original_amount == "") {
      alert(
        "You have changed your currency to Euro, please fill the orginal amount field"
      );
    } else if (values.total === 0) {
      alert("Please enter an amount for the total field");
    } else if (values.total != totalBreakdown && breakdowns.length > 0) {
      console.log("values.total", values.total);
      alert(
        `The sum of the breakdowns is not equal to the total, the total is ${values.total} and the sums of the breakdowns is equal to ${totalBreakdown}`
      );
    } else if(dataProvider.id === undefined){
      alert(
        `Please select a Provider`
      )

    }{
      try {
        const { data } = await axios.post("https://fungest-test.lahode.ch/api/costs", {
          date: values.date,
          currency: currency.name,
          description: values.description,
          original_amount: values.original_amount,
          ticket: values.ticket,
          provider_id: dataProvider.id,
          total: values.total,
          archived: false,
          ticket: true,
          breakdowns: breakdowns
        });
        console.log("POST SUCESS", data);
        const id = data.data.id;

      //   // const { dataUpload } = await axios.post(`https://fungest-test.lahode.ch/api/costs/${id}/upload`, {image
      //   // })
      //   axios({
      //     method: "post",
      //     url: `https://fungest-test.lahode.ch/api/costs/${id}/upload`,
      //     data: bodyFormData,
      //     headers: { "Content-Type": "multipart/form-data", "Accept":"application/json" },
      //   })
      //     .then(function (response) {
      //       //handle success
      //       console.log(`succes from post upload`,response);
      //     })
      //     .catch(function (response) {
      //       //handle error
      //       console.log(`error from post upload`,response);
      //     });
      // console.log("id", id);
      alert("Ticket has been created succesfully");
      } catch (err) {
        console.log(err.message);

      }
    }
  };

  return (
    <ScrollView style={styles.global}>
      <Text style={styles.textTitle}>{values.date}</Text>
      <MyModal source={image} />
      <Text style={styles.textStyle}>Selected Currency: {currency.value}</Text>
      <View>
     

        <CustomDropdown
          label={currency.name? currency.name : "Change Currency"}
          data={dataCurrencyList}
          onSelect={setCurrency}
          propHeight = {0}
        />
      </View>
      {currency.name === "CHF" ? (
        <View>
          <Text></Text>
        </View>
      ) : (
        <View>
          <Text style={styles.textStyle}>Original amount:</Text>
          <TextInput
            style={[styles.input, styles.border]}
            onChangeText={(value) => onChange("original_amount", value)}
            value={values.original_amount}
            name="original_amount"
            keyboardType="numeric"
          />
        </View>
      )}
      <Text style={styles.textStyle}>Description:</Text>
      <TextInput
        style={[styles.descriptionInput, styles.border]}
        onChangeText={(value) => onChange("description", value)}
        value={values.description}
        name="description"
        multiline={true}
      />
   
      <View style={styles.containerProvider} >
      <Text style={styles.textStyle}>Provider: </Text>
      <AddProviderModal />

      </View>

      <CustomDropdown
        label={dataProvider.name === "" ? "Provider": dataProvider.name}
        data={dataProvidersList}
        onSelect={setDataProvider}
        propHeight = {300}
      />
      <Text style={styles.textStyle}>Total:</Text>
      <TextInput
        style={[styles.input, styles.border]}
        onChangeText={(value) => onChange("total", value)}
        value={values.total}
        name="total"
        keyboardType="numeric"
      />
      <Breakdowns
        total={values.total}
        accountFromProvider={dataProvider.account_id}
      />

      

      <Button
        elevation={10}
        colorBg={"#00ff00"}
        colorText={"white"}
        title={"Submit"}
        icon="check"
        onPress={submitChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    color: "white",
    paddingLeft: 30,
  },

  global: {
    backgroundColor: "black",
    padding: 20,
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
  date: {
    fontWeight: "bolder",
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
  containerProvider: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  }
});

export default Form;

{
  /* <ScrollView>
<Picker
  style={styles.picker}
  selectedValue={dataProvider}
  onValueChange={(value, index) => setDataProvider(value)}
  mode="dropdown" // Android only
  
>
  {dataProvidersList.map((provider) => {
  
    return (
      <Picker.Item
        key={provider.id}
        label={provider.name}
        value={provider}
      />
    );
  })}
</Picker>
</ScrollView> */
}
