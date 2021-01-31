import React from 'react';
import FormDateField from './FormDateField';
import FormTextField from './FormTextField';

//TODO IMPLEMENTAR CHECAGEM DE MINCHARACTERS
export class CustomForm extends React.Component {
  //cria formulario com os campos passados por props
  constructor(props) {
    super(props);

    let tmp = {};
    for (var i = 0; i < props.campos.length; i++) {
      tmp[props.campos[i].nome] = '';
    }

    tmp.campos = props.campos;
    this.state = tmp;
  }

  //retorna um obejto tmp com os mesmos campos do formulario preenchido
  getValores = () => {
    var tmp = {};
    for (var i in this.state) {
      if (i != 'campos') tmp[i] = this.state[i];
    }
    return tmp;
  };

  //coloca determinado valor em determinado campo
  setValor = (chave, valor) => {
    this.setState({ [chave]: valor });
  };

  //verifica se todos os campos obrigatorios foram preenchidos
  verificaRequisitos = () => {
    var erro = 0;
    for (var i in this.state.campos) {
      if (
        this.state.campos[i]['obrigatorio'] &&
        this.state[this.state.campos[i]['nome']] == ''
      ) {
        erro++;
        console.warn('Preencha todos os campos obrigatórios');
      }
    }
    return erro == 0;
  };

  //renderiza um formulario com os campos passados por props
  render() {
    return this.state.campos.map((campo) => {
      if (campo.tipo != 'data') {
        return (
          <FormTextField
            key={campo.nome}
            icone={campo.icone}
            tamanho={this.props.tamanho}
            placeholder={campo.placeholder}
            cor={this.props.cor}
            corP={this.props.corP}
            tipo={campo.tipo}
            senha={campo.senha}
            texto={this.state[campo.nome] || campo.valor}
            onChangeText={(txt) => this.setState({ [campo.nome]: txt })}
          />
        );
      } else {
        return (
          <FormDateField
            key={campo.nome}
            icone={campo.icone}
            tamanho={this.props.tamanho}
            placeholder={campo.placeholder}
            cor={this.props.cor}
            corP={this.props.corP}
            data={this.state[campo.nome] || campo.valor}
            onDateChange={(txt) => this.setState({ [campo.nome]: txt })}
          />
        );
      }
    });
  }
}
