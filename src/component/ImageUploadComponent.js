// ImageUploadComponent.js

import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const ImageUploadComponent = ({style, onImagePicked}) => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        setImageUri(uri);
        if (onImagePicked) {
          onImagePicked(uri);
        }
      }
    });
  };

  return (
    <View style={[styles.container, style]}>
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={selectImage} style={styles.placeholder}>
          {/* <Icon name="add-a-photo" size={30} color="#999" /> */}
          <Text>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ImageUploadComponent;
