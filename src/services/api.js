import React, {useContext, useEffect} from "react";
import axios from "axios";

import { Context } from "../contexts.js/Context";
const { setDataProvidersList } = useContext(Context);

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

export {getDataProvidersList}