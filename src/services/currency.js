// import { useContext } from "react";
// import { Context } from "../contexts.js/Context";
// const { setCurrencyByDefault } = useContext(Context);

// const getCurrencyBydefault = () => {
//  useEffect(() => {
   
//     try {
//         const { data } = axios
//           .get(`https://fungest-test.lahode.ch/api/boot`)
//           .then((response) => {
//             // console.log("provider1", response.data.data);
  
//             setCurrencyByDefault(response.settings.data);
//           });
//       } catch (err) {
//         // Handle error
//         // console.log("error from getDataprovidersList", err);
//       }
 
//    return () => {
     
//    }
//  }, [])

//   };

// export {getCurrencyBydefault}