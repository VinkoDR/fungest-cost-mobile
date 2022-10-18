import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";

import ContextProvider from "./src/contexts.js/Context";

import TabNavigator from "./navigator/TabNavigator";

// import * as Google from 'expo-auth-session/providers/google'
// import * as WebBrowser from 'expo-web-browser'

// //allow auth to complete and send back here the result
// WebBrowser.maybeCompleteAuthSession()

export default function App() {
  // const [accessToken, setAccessToken] = useState()
  // const [userInfo, setUserInfo] = useState()
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function authenticate() {
      const result = LocalAuthentication.authenticateAsync();
    }
    authenticate();
  }, []);

  function MyStack() {
    return (
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }

  return <MyStack />;
}
