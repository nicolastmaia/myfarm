import React, { useState, useEffect } from 'react';
import { Card, Button, Text, Content, Container } from 'native-base';

// const analytics = require("./instancias/analytics");
import { Formulario } from '../componentes/Formulario';
import { Banco } from '../instancias/conexao.js';

var form1 = [
  { nome: 'praga', placeholder: 'Praga/doença (nome científico)' },
  { nome: 'data_aplicacao', placeholder: 'Data de aplicação', tipo: 'data' },
  { nome: 'produto', placeholder: 'Produto' },
  {
    nome: 'quantidade',
    placeholder: 'Quantidade (ml ou g)',
    tipo: 'numeric',
  },
  { nome: 'preco', placeholder: 'Preço estimado (R$)', tipo: 'numeric' },
  { nome: 'coadjuvante', placeholder: 'Produto (Coadjuvante)' },
  {
    nome: 'c_quantidade',
    placeholder: 'Quantidade (ml ou g) (Coadjuvante)',
    tipo: 'numeric',
  },
  {
    nome: 'volume',
    placeholder: 'Volume de calda (litros)',
    tipo: 'numeric',
  },
  { nome: 'area_tratada', placeholder: 'Área tratada (ha)', tipo: 'numeric' },
  { nome: 'justificativa', placeholder: 'Justificativa' },
];

export default function CadAplicacao(props) {
  const [formulario1, setFormulario1] = useState({});
  const [aplicacao, setAplicacao] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const { params } = props.route;
  const { goBack } = navigation;

  const getAplicacaoDataFromLocalPouch = async () => {
    const aplicacaoTmp = await Banco.local.get(params.itemId);
    setAplicacao(aplicacaoTmp);
    setIsLoading(true);
  };

  const fillFormValues = () => {
    for (var i = 0; i < form1.length; i++) {
      form1[i]['valor'] = aplicacao[form1[i]['nome']];
    }
  };

  useEffect(() => {
    if (params.update) {
      getAplicacaoDataFromLocalPouch();
    }
  }, []);

  useEffect(() => {
    fillFormValues();
    setIsLoading(false);
  }, [isLoading]);

  const handleSave = () => {
    var tmpAplicacao = {
      ...formulario1.getValores(),
    };

    if (params.update) {
      saveUpdatedData(tmpAplicacao);
    } else {
      saveNewData(tmpAplicacao);
    }

    goBack();
  };

  const saveNewData = async (tmpAplicacao) => {
    await Banco.store('aplicacao', tmpAplicacao);
  };

  //TOFIX: Por conta da condição de delete dessa função, ao editar um talhão, não é possível simplesmente apagar um campo de um talhão já salvo na memória.
  const saveUpdatedData = (tmpAplicacao) => {
    for (var i in tmpAplicacao) {
      if (tmpAplicacao[i] == '') {
        delete tmpAplicacao[i];
      }
    }
    const dado = {
      ...aplicacao,
      ...tmpAplicacao,
    };
    Banco.update(dado);
  };

  return (
    <Container>
      <Content style={{ backgroundColor: '#eee', padding: 15 }}>
        <Text style={{ fontSize: 18, marginLeft: 5 }}>APLICAÇÕES</Text>
        <Text
          style={{
            fontSize: 14,
            color: '#444',
            marginBottom: 8,
            marginLeft: 5,
          }}
        >
          Registro da aplicação de acaricidas, inseticidas e nematicidas.
        </Text>

        <Card style={{ borderRadius: 5, padding: 10 }}>
          <Formulario
            keyExtractor={(item) => {
              item.key;
            }}
            tamanho={55}
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
