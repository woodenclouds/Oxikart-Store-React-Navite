import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import InputLabel from './InputLabel';
import {icons} from '../../assets/icons';

const PasswordField = ({placeholder, onChangeText, value}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleTextChange = text => {
    onChangeText(text);
    setError(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && {borderColor: '#D64A4A'}]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          value={value}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleSecureTextEntry}>
          <Image
            source={secureTextEntry ? icons.show : icons.hide}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    // padding: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
});

export default PasswordField;
