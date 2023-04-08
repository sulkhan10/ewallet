import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Login, SignUp, Home } from "../screens";
const Tab = createBottomTabNavigator();


export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
     
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color,size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
          headerShown={false}
          />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          tabBarLabel: "SignUp",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note-check" size={24}  color={color}/>
            ),
          }}
          />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper-variant" size={24} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
