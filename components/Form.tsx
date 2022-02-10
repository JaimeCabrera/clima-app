import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InterfaceCountry {
  name: string;
  alpha2Code: string;
  flags: InterfaceFlags;
}

interface InterfaceFlags {
  png: string;
  svg: string;
}
export const Form = () => {
  const [countries, setCountries] = useState<InterfaceCountry[]>([]);
  const [countrySelected, setCountrySelected] = useState('');

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
      console.log('consulta a la api');
      setCountries(res.data);
      storeData(res.data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // store data in device storage
  const storeData = async (value: InterfaceCountry[]) => {
    try {
      console.log('almacenado en el local');
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@countries', jsonValue);
    } catch (e) {
      showAlert();
    }
  };
  // obtain data to local storage
  const getData = async () => {
    try {
      console.log('usando datos del local');
      const jsonValue = await AsyncStorage.getItem('@countries');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      showAlert();
    }
  };
  const showAlert = () => {
    Alert.alert('Error', 'No se pudo almacenar', [{text: 'Ok'}]);
  };

  return (
    <>
      <View style={styles.form}>
        <View>
          <TextInput placeholder="Ciudad" placeholderTextColor="#808b96" />
        </View>
      </View>
      <View>
        <Picker
          selectedValue={countrySelected}
          onValueChange={city => setCountrySelected(city)}>
          <Picker.Item label="Seleccione su pais" value="" />
          {countries.map(country => {
            return (
              <Picker.Item
                key={country.alpha2Code}
                label={country.name}
                value={country.alpha2Code}>
                <Image
                  source={{uri: `${country.flags.png}`}}
                  accessibilityLabel="imagen"
                />
              </Picker.Item>
            );
          })}
        </Picker>
      </View>
      <TouchableWithoutFeedback>
        <View>
          <Text>Clima</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
});
