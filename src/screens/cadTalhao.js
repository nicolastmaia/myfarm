import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Text, Content, Container } from 'native-base';

import { Banco } from '../instancias/conexao.js';

import { Formulario } from '../componentes/Formulario';
import CustomMap from '../componentes/CustomMap.js';
import { Dimensions, StyleSheet } from 'react-native';

var form1 = [
  { nome: 'n_parcela', placeholder: 'Parcela nº', tipo: 'numeric' },
  { nome: 'cultivares', placeholder: 'Cultivares' },
  { nome: 'n_plantas', placeholder: 'Nº de plantas', tipo: 'numeric' },
  { nome: 'data_plantio', placeholder: 'Data de plantio' },
  { nome: 'rendimento', placeholder: 'Rendimento (kg/ha)', tipo: 'numeric' },
];

var form2 = [
  { nome: 'area', placeholder: 'Área (ha)', tipo: 'numeric' },
  { nome: 'densidade', placeholder: 'Densidade atual (ha)', tipo: 'numeric' },
  {
    nome: 'espaco',
    placeholder: 'Espaço (m) entre fileiras',
    tipo: 'numeric',
  },
  { nome: 'irrigacao', placeholder: 'Irrigação' },
  { nome: 'topografia', placeholder: 'Topografia' },
];

let mapCardHeight = 0.7 * Dimensions.get('window').height;

export default function CadTalhao(props) {
  const mapRef = useRef(null);
  const [formulario1, setFormulario1] = useState({});
  const [formulario2, setFormulario2] = useState({});
  const [talhao, setTalhao] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const { params } = props.route;
  const { goBack } = navigation;

  const fillFormValues = () => {
    for (var i = 0; i < form1.length; i++) {
      form1[i]['valor'] = talhao[form1[i]['nome']];
    }

    for (var i = 0; i < form2.length; i++) {
      form2[i]['valor'] = talhao[form2[i]['nome']];
    }
  };

  useEffect(() => {
    if (params.update) {
      setTalhao(params.item);
      setIsLoading(true);
    }
  }, [talhao]);

  useEffect(() => {
    fillFormValues();
    setIsLoading(false);
  }, [isLoading]);

  const handleSave = () => {
    var tmpTalhao = {
      ...formulario1.getValores(),
      ...formulario2.getValores(),
      coordenadas: mapRef.current.getValores(),
    };

    if (params.update) {
      saveUpdatedData(tmpTalhao);
    } else {
      saveNewData(tmpTalhao);
    }

    goBack();
  };

  const saveNewData = async (tmpTalhao) => {
    await Banco.store('talhao', tmpTalhao);
  };

  //TOFIX: Por conta da condição de delete dessa função, ao editar um talhão, não é possível simplesmente apagar um campo de um talhão já salvo na memória.
  const saveUpdatedData = (tmpTalhao) => {
    for (var i in tmpTalhao) {
      if (tmpTalhao[i] == '') {
        delete tmpTalhao[i];
      }
    }
    const dado = {
      ...talhao,
      ...tmpTalhao,
    };
    Banco.update(dado);
  };

  return (
    <Container>
      <Content style={{ backgroundColor: '#eee', padding: 15 }}>
        {/* Informações */}
        <Text style={{ fontSize: 18, marginLeft: 5 }}>INFORMAÇÕES</Text>
        <Text
          style={{
            fontSize: 14,
            color: '#444',
            marginBottom: 8,
            marginLeft: 5,
          }}
        >
          Informações sobre o talhão
        </Text>
        <Card style={{ borderRadius: 5, padding: 10 }}>
          <Formulario
            keyExtractor={(item) => item.key}
            tamanho={45}
            campos={form1}
            cor='#000'
            corP='#555'
            ref={(tmp) => setFormulario1(tmp)}
          />
        </Card>

        {/* Plantação */}
        <Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>
          PLANTAÇÃO
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#444',
            marginBottom: 8,
            marginLeft: 5,
          }}
        >
          Informações sobre a plantação
        </Text>
        <Card style={{ borderRadius: 5, padding: 10 }}>
          {/* TODO verificar se o keyExtractor abaixo faz sentido*/}
          <Formulario
            keyExtractor={(item) => item.key}
            tamanho={45}
            campos={form2}
            cor='#000'
            corP='#555'
            ref={(tmp) => setFormulario2(tmp)}
          />
        </Card>

        {/* Mapa */}
        <Text style={{ fontSize: 18, marginLeft: 5, marginTop: 20 }}>MAPA</Text>
        <Text
          style={{
            fontSize: 14,
            color: '#444',
            marginBottom: 8,
            marginLeft: 5,
          }}
        >
          Informe a posição do talhão no mapa
        </Text>
        <Card style={styles.mapCard}>
          <CustomMap
            style={styles.map}
            markers={talhao.coordenadas || []}
            ref={mapRef}
          />
        </Card>

        <Button
          block
          style={{
            marginTop: 15,
            marginBottom: 25,
            backgroundColor: '#4c7a34',
          }}
          onPress={handleSave}
        >
          {params.update ? <Text>Atualizar</Text> : <Text>Cadastrar</Text>}
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  mapCard: { borderRadius: 5, height: mapCardHeight },
  map: {
    height: mapCardHeight,
  },
});
