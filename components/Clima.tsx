import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {InterfaceResultWeather} from '../App';

interface Props {
  weatherResult: InterfaceResultWeather;
}

export const Clima = ({weatherResult}: Props) => {
  const {name, main, weather} = weatherResult;
  // if (!name) {
  //   return null;
  // }

  return (
    <View style={styles.weather}>
      {name && (
        <>
          <Text style={styles.weatherText}>
            {Math.trunc(main.temp - 273.15)}
            <Text style={styles.temp}>&#x2103;</Text>
            <Image
              style={styles.weatherImage}
              source={{
                uri: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
              }}
            />
          </Text>
          <View style={styles.temps}>
            <Text style={styles.text}>
              Max:{' '}
              <Text style={styles.tempMax}>
                {Math.trunc(main.temp_min - 273.15)}&#x2103;
              </Text>
            </Text>
            <Text style={styles.text}>
              Min:{' '}
              <Text style={styles.tempMax}>
                {Math.trunc(main.temp_max - 273.15)}&#x2103;
              </Text>
            </Text>
          </View>
          <Text style={styles.text}>Ciudad: {name}</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  weather: {
    // marginBottom: 10,
    padding: 10,
    height: 250,
    backgroundColor: 'rgba(41, 128, 185  ,.5)',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  weatherText: {
    color: '#fff',
    fontSize: 80,
    textAlign: 'center',
    fontWeight: '600',
  },
  temp: {
    fontSize: 24,
  },
  weatherImage: {
    flex: 1,
    width: 66,
    height: 50,
  },
  temps: {
    // fontSize: 24
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tempMax: {},
});
