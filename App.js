import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import API from './src/Api';

export default function App() {

  const [cidade, setCidade] = useState('');
  const [resultado, setResultado] = useState('');

  const divisor = () => {
    return (
      <View style={{ borderBottomColor: 'purple', borderWidth: 2, marginBottom: 5, marginTop: 5 }}></View>
    )

  }

  async function trabalharapi() {

    const resposta = await API.get(`weather?array_limit=8&fields=only_results,temp,city_name,forecast,max,min,date,description,weekday&key=2f3ce6ea`);
    setResultado(resposta.data.forecast);

  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#000' />
      <Text style={{ alignItems: 'center', marginTop: 200, borderWidth: 2, borderColor: '#000', padding: 5, marginBottom: 5, width: '60%', textAlign: 'center' }}>Clima - Vitor Barbosa</Text>
      <TextInput
        placeholder='Digite a cidade'
        style={{ width: '60%', padding: 5, borderColor: '#000', borderWidth: 2, marginBottom: 5 }}
        onChangeText={(cidade) => setCidade(cidade)}
      />
      <TouchableOpacity style={{ padding: 5, borderColor: '#000', borderWidth: 2, width: '60%', alignItems: 'center' }}
        onPress={trabalharapi}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      <FlatList
        style={{ marginTop: 50, marginBottom: 20 }}
        ItemSeparatorComponent={divisor}
        data={resultado}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>Data: {item.date}</Text>
              <Text>Dia: {item.weekday}</Text>
              <Text>Min: {item.min} °C</Text>
              <Text>Máx: {item.min} °C</Text>
              <Text>Descrição: {item.description}</Text>
            </View>
          )
        }}
      />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
