import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconButton from './components/IconButton';
import {Colors} from './constants/Colors';
import AddImage from './screens/AddImageScreen';
import Home from './screens/HomeScreen';
import ImageDetails from './screens/ImageDetailsScreen';

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  const allScreenOptions = {
    headerStyle: {
      backgroundColor: Colors.primary500,
    },
    headerTintColor: Colors.gray700,
    contentStyle: {
      backgroundColor: Colors.gray700,
    },
  };

  const homeScreenOptions = ({navigation}) => ({
    title: 'Your favorite picture',
    headerRight: ({tintColor}) => (
      <IconButton
        Icon={AntDesign}
        name="plus"
        size={24}
        color={tintColor}
        onPress={() => navigation.navigate('AddImage')}
      />
    ),
    contentStyle: {
      backgroundColor: Colors.primary50,
    },
  });

  const addScreenOptions = {
    title: 'Add a new image',
  };

  const imageDetailsOptions = {
    title: 'Details',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={allScreenOptions}>
        <Stack.Screen name="Home" component={Home} options={homeScreenOptions} />
        <Stack.Screen name="AddImage" component={AddImage} options={addScreenOptions} />
        <Stack.Screen name="ImageDetails" component={ImageDetails} options={imageDetailsOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
