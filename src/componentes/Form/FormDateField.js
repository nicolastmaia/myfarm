import { DatePicker, Input, Item } from 'native-base';
import React from 'react';

export default FormDateField = (props) => {
  return (
    <Item
      style={{
        flex: 1,
        minHeight: props.tamanho,
      }}
    >
      <DatePicker
        defaultDate={new Date()}
        maximumDate={new Date()}
        locale='pt'
        modalTransparent={false}
        animationType='fade'
        androidMode='spinner'
        placeHolderText={props.placeholder}
        textStyle={{ color: props.cor }}
        placeHolderTextStyle={{ color: props.corP }}
        onDateChange={props.onDateChange}
      />
      <Input
        placeholder={
          props.data
            ? '(atual: ' + new Date(props.data).toDateString() + ')'
            : ''
        }
        disabled
      ></Input>
    </Item>
  );
};
