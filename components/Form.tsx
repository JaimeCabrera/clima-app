import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export const Form = () => {
  return (
    <View style={styles.form}>
      <View>
        <TextInput placeholder="Ciudad" placeholderTextColor="#808b96" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
});
