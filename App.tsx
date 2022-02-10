import React, {useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import axios from 'axios';
import {Form} from './components/Form';
import {Clima} from './components/Clima';

export interface InterfaceSearch {
  ciudad: string;
  pais: string;
}
const InitialState = {
  ciudad: '',
  pais: '',
};

export interface InterfaceResultWeather {
  name: string;
  weather: InterfaceWeather;
  main: InterfaceMain;
}
export interface InterfaceWeather {
  id: number;
  description: string;
  icon: string;
  main: string;
}
interface InterfaceMain {
  temp: number;
  temp_min: number;
  temp_max: number;
}

const App = () => {
  const [search, setSearch] = useState(InitialState);
  const [consult, setConsult] = useState(false);
  const [weatherResult, setWheaterResult] =
    useState<InterfaceResultWeather>(Object);

  // dest4ruvcutrinm para obetner los datoas de la ciuda dy pais
  const {ciudad, pais} = search;

  useEffect(() => {
    const getWhater = async () => {
      if (consult) {
        const API_KEY = 'dcb39d98cee58cfc760a0173afb4dc2e';
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;

        try {
          const res = await axios.get(URL);
          console.log(res.data);
          setWheaterResult(res.data);
          setConsult(false);
          setSearch(InitialState);
        } catch (error: any) {
          showToastWithGravity(`${error.message}, Please connect to Internet`);
        }
      }
    };
    getWhater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consult]);

  const showToastWithGravity = (msg: string) => {
    ToastAndroid.showWithGravityAndOffset(
      `${msg}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  return (
    <View style={styles.app}>
      <View style={styles.content}>
        <Clima weatherResult={weatherResult} />
        <Form search={search} setSearch={setSearch} setConsult={setConsult} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#8ec1dd',
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
  },
});

export default App;

// azul  ##8ec1dd
