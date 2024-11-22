import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';



export default LoginInput: React.FC<{}> = () => {
    return (
        <TextInput
            style={styles.login_input}
            placeholder="Nombre"
            placeholderTextColor={'gray'}
            value={state.email}
            onChangeText={(text: string) => dispatch({type: 'EMAIL', value: text})}
          />
    );
}

const styles = StyleSheet.create({
    login_input: {
      width: '100%',
      height: 50,
      backgroundColor: '#1B1B1B',
      borderRadius: 10,
      padding: 15,
      color: 'white',
    },
  });