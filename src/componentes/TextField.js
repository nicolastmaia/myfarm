import { Icon, Input, Item } from 'native-base';
import React from 'react';

export default class TextField extends React.Component {
  render() {
    return (
      <Item
        style={{
          flex: 1,
          minHeight: this.props.tamanho,
        }}
      >
        <Icon
          active
          name={this.props.icone}
          style={{ color: this.props.cor }}
        />
        <Input
          style={{
            height: this.props.tamanho,
            color: this.props.cor,
          }}
          keyboardType={this.props.tipo}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.corP}
          returnKeyType={'next'}
          secureTextEntry={this.props.senha}
          onChangeText={this.props.onChangeText}
        >
          {this.props.texto}
        </Input>
      </Item>
    );
  }
}
