import { useState, createContext } from "react";

export const Context = createContext();

function ContextProvider(props) {
  // informations pour afficher l'image
  const [image, setImage] = useState("");
  // informations transformée pour envoyer à l api
  const [imageInfoToSend, setImageInfoToSend] = useState("");
  // liste des provider récupérée de l 'api
  const [dataProvidersList, setDataProvidersList] = useState([]);
  // array d'objet breakdown
  const [breakdowns, setBreakdowns] = useState([
    { amount: 0, account_id: 1, name: "", description: "" },
  ]);
  // list des accounts récupéree de l'api
  const [accountsList, setAccountsList] = useState([]);
  const [account, setAccount] = useState("");
  // utilisé pour les opérations ternaire d'affichage pour afficher les informations au moment ou elles sont disponible
  const [isLoading, setIsLoading] = useState(true);
  // stocker monnaie par défaut récupérée de l'api
  const [currencyByDefault, setCurrencyByDefault] = useState("");
  // liste des monnaie récupérée de l'api
  const [dataCurrencyList, setDataCurrencyList] = useState([]);
  // relancer la requête pour avoir la nouvelle liste des providers
  const [loadAgainProviderList, setLoadAgainProviderList] = useState(false)

  // les valeurs que je veux récupérer à travers l'application
  const value = {
    imageInfoToSend,
    setImageInfoToSend,
    isLoading,
    setIsLoading,
    image,
    setImage,
    dataProvidersList,
    setDataProvidersList,
    breakdowns,
    setBreakdowns,
    accountsList,
    setAccountsList,
    account,
    setAccount,
    currencyByDefault,
    setCurrencyByDefault,
    dataCurrencyList,
    setDataCurrencyList,
    loadAgainProviderList,
    setLoadAgainProviderList
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export default ContextProvider;
