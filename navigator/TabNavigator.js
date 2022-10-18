import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import Mycamera from "../src/screens/Mycamera";
import Home from "../src/screens/Home";
import Form from "../src/components/Form";

const TabNavigator = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#00ff00",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Take picture") {
            return (
              <Icon
                name="camera"
                type="entypo"
                color={focused ? "#00ff00" : "gray"}
              />
            );
          } else if (route.name === "Home") {
            return (
              <Icon
                name="home"
                type="entypo"
                color={focused ? "#00ff00" : "gray"}
              />
            );
          } else if (route.name === "Form") {
            return (
              <Icon
                name="open-book"
                type="entypo"
                color={focused ? "#00ff00" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Take picture" component={Mycamera} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Form" component={Form} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
