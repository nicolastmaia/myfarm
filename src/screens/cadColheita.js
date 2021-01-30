import React, { useEffect, useState } from 'react';
import { Card, Button, Text, Content, Container } from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';

import { Formulario } from '../componentes/Formulario';

var form1 = [
  { nome: 'data', placeholder: 'Data da colheita', tipo: 'data' },
  { nome: 'quantidade', placeholder: 'Quantidade', tipo: 'numeric' },
  { nome: 'peso', placeholder: 'Peso (kg)', tipo: 'numeric' },
  { nome: 'producao', placeholder: 'Produção (kg/ha)', tipo: 'numeric' },
  { nome: 'observacoes', placeholder: 'Observações' },
];

export default function CadColheita(props) {
  const [colheita, setColheita] = useState([]);
  const [formulario1, setFormulario1] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const { params } = props.route;
  const { goBack } = navigation;

  useEffect(() => {
    if (params.update) {
      getColheitaoDataFromLocalPouch();
    }
  }, []);

  useEffect(() => {
    fillFormValues();
    setIsLoading(false);
  }, [isLoading]);

  const getColheitaoDataFromLocalPouch = async () => {
    const colheitaTmp = await Banco.local.get(params.itemId);
    setColheita(colheitaTmp);
    setIsLoading(true);
  };

  const fillFormValues = () => {
    for (var i = 0; i < form1.length; i++) {
      form1[i]['valor'] = colheita[form1[i]['nome']];
    }
  };

  const handleSave = () => {
    var tmpColheita = {
      ...formulario1.getValores(),
    };

    if (params.update) {
      saveUpdatedData(tmpColheita);
    } else {
      saveNewData(tmpColheita);
    }

    goBack();
  };

  const saveNewData = async (tmpColheita) => {
    await Banco.store('colheita', tmpColheita);
  };

  //TOFIX: Por conta da condição de delete dessa função, ao editar um talhão, não é possível simplesmente apagar um campo de um talhão já salvo na memória.
  const saveUpdatedData = (tmpColheita) => {
    for (var i in tmpColheita) {
      if (tmpColheita[i] == '') {
        delete tmpColheita[i];
      }
    }
    const dado = {
      ...colheita,
      ...tmpColheita,
    };
    Banco.update(dado);
  };

  return (
    <Container>
      <Content style={{ backgroundColor: '#eee', padding: 15 }}>
        <Text style={{ fontSize: 18, marginLeft: 5 }}>COLHEITA</Text>
        <Text
          style={{
            fontSize: 14,
            color: '#444',
            marginBottom: 8,
            marginLeft: 5,
          }}
        >
          Registro da produção diária.
        </Text>

        <Card style={{ borderRadius: 5, padding: 10 }}>
          <Formulario
            tamanho={45}
            campos={form1}
            cor='#000'
            corP='#555'
            ref={(tmp) => setFormulario1(tmp)}
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
