import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InterfaceSearch} from '../App';

interface InterfaceCountry {
  name: string;
  alpha2Code: string;
  flags: InterfaceFlags;
}

interface InterfaceFlags {
  png: string;
  svg: string;
}

interface Props {
  search: InterfaceSearch;
  setSearch: ({}: InterfaceSearch) => void;
  setConsult: (value: boolean) => void;
}

export const Form = ({search, setSearch, setConsult}: Props) => {
  // extrat pasis an ciudad from prop
  const {ciudad, pais} = search;

  const [countries, setCountries] = useState<InterfaceCountry[]>([]);
  // const [countrySelected, setCountrySelected] = useState('');
  const btnAnimation = useRef(new Animated.Value(1)).current;
  // const [btnAnimation] = useState(new Animated.Value(1));

  const searchWeather = () => {
    if (ciudad.trim() === '' || pais.trim() === '') {
      showToastWithGravity('Error, los dos campos son obligatorios');
      return;
    }
    // get api whetare info if validation is successfull
    setConsult(true);
  };

  useEffect(() => {
    getData().then(data => {
      if (data) {
        getData().then(dat => {
          setCountries(dat);
          return;
        });
      } else {
        getCountries();
      }
    });
    const getCountries = async () => {
      const res = await axios.get('https://restcountries.com/v2/all');
      setCountries(res.data);
      storeData(res.data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // store data in device storage
  const storeData = async (value: InterfaceCountry[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@countries', jsonValue);
    } catch (e) {
      showToastWithGravity('No se pudo almacenar la información');
    }
  };
  // obtain data to local storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@countries');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      showToastWithGravity('No se obtener la información');
    }
  };

  const showToastWithGravity = (msg: string) => {
    ToastAndroid.showWithGravityAndOffset(
      `${msg}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const animateIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const animateOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      friction: 2,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  // estilos de la animacion
  const animationStyle = {
    transform: [{scale: btnAnimation}],
  };

  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput
            value={ciudad}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChangeText={ciudad => setSearch({...search, ciudad})}
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="#5D6D7E"
          />
        </View>
        <View>
          <Picker
            style={styles.picker}
            selectedValue={pais}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onValueChange={pais => setSearch({...search, pais})}>
            <Picker.Item label="Seleccione su pais" value="" />
            {countries.map(country => {
              return (
                <Picker.Item
                  key={country.alpha2Code}
                  label={country.name}
                  value={country.alpha2Code}
                />
              );
            })}
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPress={() => searchWeather()}
          onPressIn={() => animateIn()}
          onPressOut={() => animateOut()}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.btnTextSearch}>Consultar clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    // marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(41, 128, 185,.5)',
    flex: 1,
  },
  input: {
    padding: 10,
    height: 40,
    backgroundColor: 'rgba(212, 230, 241,.5)',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 4,
  },
  picker: {
    backgroundColor: 'rgba(212, 230, 241,.5)',
    color: '#34495E',
    marginBottom: 30,
  },
  btnSearch: {
    marginTop: 30,
    backgroundColor: '#1B4F72',
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  btnTextSearch: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
