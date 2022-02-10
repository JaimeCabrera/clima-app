import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InterfaceResultWeather} from '../App';

interface Props {
  weatherResult: InterfaceResultWeather;
}

export const Clima = ({weatherResult}: Props) => {
  const {name, main} = weatherResult;
  if (!name) {
    return null;
  }

  return (
    <View style={styles.weather}>
      <Text style={styles.weatherText}>
        {Math.trunc(main.temp - 273.15)} &#x2103;
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  weather: {
    marginBottom: 20,
  },
  weatherText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
