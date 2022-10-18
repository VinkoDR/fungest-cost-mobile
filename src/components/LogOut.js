import React from 'react';
import jwtDecode from 'jwt-decode';
import * as AuthSession from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';

const auth0ClientId = "";
const authorizationEndpoint = "https://youraccount.eu.auth0.com/v2/logout";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy }); // <-- must be set in allowed logout urls

export default function Logout() {
  const logout = async () => {
    try {
      await openAuthSessionAsync(`${authorizationEndpoint}?client_id=${auth0ClientId}&returnTo=${redirectUri}`, 'redirectUrl');
      // handle unsetting your user from store / context / memory
    } catch (err) {
       console.error(err)    
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  );
}