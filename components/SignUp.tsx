import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import * as yup from 'yup';
import { object, string} from 'yup';
import Toast from 'react-native-toast-message';

const login_data = (state: { email: string, password: string, password_verification: string }, action: { type: 'EMAIL' | 'PASSWORD' | 'PASSWORD_VALIDATION', value: string }) => {
  switch (action.type) {
    case 'EMAIL':
      return {...state, email: action.value};

    case 'PASSWORD':
      return {...state, password: action.value};

    case 'PASSWORD_VALIDATION':
      return {...state, password_verification: action.value};

    default:
      return state;
  }
};


const Links: React.FC<{ text: string, navigateTo?: () => void }> = ({ text, navigateTo }) => {
  return <Text style={styles.links_texts} onPress={navigateTo}>{text}</Text>;
};

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [state, dispatch] = React.useReducer(login_data, {email: '', password: '', password_verification: ''});
  const [showPassword, setShowPassword] = React.useState(false);

  const validationSchema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    password_verification: string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  const register = async () => {
    try {
      await validationSchema.validate(state, { abortEarly: false });

      Alert.alert(
        'Registration Successful',
        'You have successfully registered. Please login to continue.',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          Alert.alert(
            'Validation Error',
            err.message,
            [{ text: 'OK' }]
          );
        });

        return;
      }
    }

    navigation.navigate('Home');
  };

  return (
    <React.Fragment>
      <View style={styles.login_container}>
        <View style={styles.form}>
          <Text style={styles.login_text_title}>
            Regístrate
          </Text>

          <Text style={styles.login_text_subtitle}>
            Crea Tu Cuenta Y Comienza A Aprender
          </Text>

          <TextInput
            style={styles.login_input}
            placeholder="Nombre"
            placeholderTextColor={'gray'}
            value={state.email}
            onChangeText={(text: string) => dispatch({type: 'EMAIL', value: text})}
          />

          <View style={styles.password_input_container}>
          <TextInput
            style={styles.password_input}
            placeholder="Contraseña"
            placeholderTextColor={'gray'}
            value={state.password}
            onChangeText={(text: string) => dispatch({type: 'PASSWORD', value: text})}
            secureTextEntry={!showPassword}
          />
            <TouchableOpacity style={{padding: 10}} onPress={() => setShowPassword(!showPassword)}>
              <Text style={{color: 'gray'}}>
                {showPassword ? '(─ ‿ ─)' : '(O ‿ O)'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.password_input_container}>
            <TextInput
              style={styles.password_input}
              placeholder="Repite Contraseña"
              placeholderTextColor={'gray'}
              value={state.password_verification}
              onChangeText={(text: string) => dispatch({type: 'PASSWORD_VALIDATION', value: text})}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={{padding: 10}} onPress={() => setShowPassword(!showPassword)}>
              <Text style={{color: 'gray'}}>
                {showPassword ? '(─ ‿ ─)' : '(O ‿ O)'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={styles.term_text}>
            Al Hacer Clic En "Comenzar". Acepto <Links text="Los Términos De Uso" /> Y Reconozco Que Mi Información Personal Se Utilizará De Acuerdo Con La <Links text="Política De Privacidad" /> De Quasar.
          </Text>

          <Text style={styles.sign_in_text}>
            ¿Ya Tienes Una Cuenta? <Links text="Inicia Sesión" navigateTo={() => navigation.navigate('SignIn')}/>
          </Text>
        </View>

        <TouchableOpacity style={styles.sign_up_button} onPress={register}>
          <Text style={styles.sign_up_button_text}>
            Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  login_container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 50,
    paddingTop: 100,
  },
  login_text_title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  login_text_subtitle: {
    color: 'gray',
    fontSize: 20,
  },
  login_input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
    padding: 15,
    color: 'white',
  },
  password_input: {
    width: '80%',
    padding: 15,
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
    color: 'white',
  },
  password_input_container: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B1B1B',
    borderRadius: 10,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  term_text: {
    width: '80%',
    color: 'gray',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sign_in_text: {
    color: 'gray',
    fontSize: 16,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    gap: 22,
  },
  sign_up_button: {
    backgroundColor: '#0C216C',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  sign_up_button_text: {
    color: 'white',
    fontSize: 16,
  },
  links_texts: {
    color: 'blue',
  },
});

export default SignUp;
