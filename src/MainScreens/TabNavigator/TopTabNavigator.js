
// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { View, Text } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Tab = createMaterialTopTabNavigator();

// const ScreenTemplate = ({ label }) => (
//   <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
//     <Text style={{ color: '#000', fontSize: 18 }}>{label}</Text>
//   </View>
// );

// const TopTabNavigator = () => {
//   return (
//     <Tab.Navigator
  
//       screenOptions={({ route }) => ({
//         tabBarStyle: {
//           backgroundColor: 'transparent',
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: 'bold',
//           textTransform: 'none',
//         },
//         tabBarIndicatorStyle: {
//           backgroundColor: '#FFD700',
//           height: 3,
//         },
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: '#ccc',
//         tabBarShowIcon: true,
//         tabBarIcon: ({ color }) => {
//           let iconName;
//           switch (route.name) {
//             case 'AI ROAST':
//               iconName = 'flame'; // fire icon
//               break;
//             case 'Top Memes':
//               iconName = 'gift'; // gift icon
//               break;
//             case 'Reels':
//               iconName = 'play-circle'; // play icon
//               break;
//             case 'Bonk Feed':
//               iconName = 'chatbubble'; // chat icon
//               break;
//             default:
//               iconName = 'ellipse';
//           }
//           return <Ionicons name={iconName} size={16} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="AI ROAST" children={() => <ScreenTemplate label="AI ROAST" />} />
//       <Tab.Screen name="Top Memes" children={() => <ScreenTemplate label="Top Memes" />} />
//       <Tab.Screen name="Reels" children={() => <ScreenTemplate label="Reels" />} />
//       <Tab.Screen name="Bonk Feed" children={() => <ScreenTemplate label="Bonk Feed" />} />
//     </Tab.Navigator>
//   );
// };

// export default TopTabNavigator;

import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Or your icon set
import AiRoastScreen from './TabBarScreens/AiRoastScreen';
import TopMemesScreen from './TabBarScreens/TopMemesScreen';
import ReelsScreen from './TabBarScreens/ReelsScreen';
import BonkFeedScreen from './TabBarScreens/BonkFeedScreen';
import colors from '../../../constants/colors';


const Tab = createMaterialTopTabNavigator();

const CustomTabLabel = ({ label, icon, focused }) => {
  const color = focused ? colors.main : '#000'; // gold = #FFD700

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name={icon} size={16} color={color} style={{ marginRight: 4 }} />
      <Text style={{ color, fontSize: 14 }}>{label}</Text>
    </View>
  );
};

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.main,
        },
        // tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen
        name="AiRoast"
        component={AiRoastScreen}
         options={{
          tabBarLabel: ({ focused }) => (
            <CustomTabLabel label="AI ROAST" icon="flame-outline" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="TopMemes"
        component={TopMemesScreen}
        options={{
          tabBarLabel:({ focused })=> (
          <CustomTabLabel label="Top Memes" icon="star-outline" focused={focused}/>
          
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          tabBarLabel: ({ focused })=> (
          <CustomTabLabel label="Reels" icon="play-circle-outline" focused={focused}/>
          ),
        }}
      />
      <Tab.Screen
        name="BonkFeed"
        component={BonkFeedScreen}
        options={{
          tabBarLabel:({ focused }) => (
          <CustomTabLabel label="Bonk Feed" icon="rocket-outline" focused={focused}/>
           ) ,
        }}
      />
    </Tab.Navigator>
  );
};

export default TopTabs;
