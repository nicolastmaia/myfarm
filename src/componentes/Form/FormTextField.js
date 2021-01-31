import { Icon, Input, Item } from 'native-base';
import React from 'react';

export default FormTextField = (props) => {
  return (
    <Item
      style={{
        flex: 1,
        minHeight: props.tamanho,
      }}
    >
      <Icon active name={props.icone} style={{ color: props.cor }} />
      <Input
        style={{
          height: props.tamanho,
          color: props.cor,
        }}
        keyboardType={props.tipo}
        placeholder={props.placeholder}
        placeholderTextColor={props.corP}
        returnKeyType={'next'}
        secureTextEntry={props.senha}
        onChangeText={props.onChangeText}
      >
        {props.texto}
      </Input>
    </Item>
  );
};
