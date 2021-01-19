import React, { useEffect, useState } from 'react';
import {
  ListItem,
  View,
  Icon,
  Button,
  Text,
  Content,
  Container,
  List,
} from 'native-base';

// const analytics = require("./instancias/analytics");
import { Banco } from '../instancias/conexao.js';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../componentes/customModal.js';

//==========| Fim dos Imports |==========//

export default function Aplicacao() {
  const [flag, setFlag] = useState(false);
  const [modalVIsible, setModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const [aplicacoes, setAplicacoes] = useState([]);
  const { navigate } = useNavigation();

  /* componentWillMount() {
		analytics.trackScreenView("Cadastro de Aplicação");
	} */
  const toggleModal = () => {
    setModalVisible(!modalVIsible);
  };
  const fetchAplicacoesFromDatabase = async () => {
    tmpAplicacoes = await Banco.getByType('aplicacao');
    setAplicacoes(tmpAplicacoes);
  };

  useEffect(() => {
    try {
      fetchAplicacoesFromDatabase();
    } catch (error) {
      console.log(error.message);
    }

    let changes = Banco.local
      .changes({
        live: true,
        include_docs: true,
        filter: function (doc) {
          return doc.type === 'aplicacao';
        },
      })
      .on('change', (info) => {
        setAplicacoes((prevState) => {
          let newState = prevState.filter((current) => {
            return current._id != info.doc._id;
          });
          newState = [...newState, info.doc];
          return newState;
        });
      })
      .on('complete', () => console.log('unsubscribed from database changes'))
      .on('error', () => console.log('deu erro aqui'));

    return () => {
      changes.cancel();
    };
  }, []);

  return (
    <Container>
      <CustomModal
        isVisible={modalVIsible}
        activeItem={activeItem}
        toggleModal={toggleModal}
      />
      <List
        dataArray={aplicacoes}
        keyExtractor={(item) => item._id}
        renderRow={(item) => (
          <ListItem
            style={{ marginLeft: 0 }}
            onPress={() => {
              const novoItem = {
                itemId: item._id,
                update: true,
              };
              navigate('CadAplicacao', novoItem);
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name='md-information-circle'
                  style={{ color: '#4c7a34' }}
                  onPress={() => {
                    setActiveItem(item);
                    setModalVisible(true);
                  }}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  marginLeft: 20,
                }}
              >
                {item.produto}
              </Text>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name='md-trash'
                  style={{ color: '#C62828' }}
                  onPress={async () => {
                    const deletedAplicacao = await Banco.delete(item);
                    const newAplicacoes = aplicacoes.filter((aplicacao) => {
                      return aplicacao._id != deletedAplicacao.id;
                    });
                    setAplicacoes(newAplicacoes);
                  }}
                />
              </View>
            </View>
          </ListItem>
        )}
        extraData={flag}
      />

      <Button
        rounded
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
          backgroundColor: '#4c7a34',
        }}
        onPress={() => navigate('CadAplicacao', { update: false })}
      >
        <Icon name='md-add' />
      </Button>
    </Container>
  );
}
