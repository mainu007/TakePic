import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export default function IconButton({Icon, name, color, size, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Icon name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
