import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
  button : {
    backgroundColor: "#007DDC",
    borderRadius: 4, 
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height: 48, 
    
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  }
})