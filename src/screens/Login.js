
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { Alert, Platform, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";

// you need to swap out these details with your auth0 credientals
const auth0ClientId = "Dd3cyi7Pi0vINCAWix4KbEzZf92lgS4C";
const authorizationEndpoint = "https://dev-nrwblacj.us.auth0.com";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

console.log(redirectUri)  // <-- you will need to add this to your auth0 callbacks / logout configs

export default function Login() {
    const navigation = useNavigation();
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  return (
    // <Layout style={styles.container} level="1">
    <View>

     
        {/* onPress={() => promptAsync({ useProxy })} // <-- will open the universal login  */}
        {/* //  navigation.navigate("Home") */}
        <Button title={"Login"} onPress={() => promptAsync({useProxy })} />
    </View>
    // </Layout>
  );
}