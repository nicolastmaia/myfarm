import { DatePicker, Input, Item } from 'native-base';
import React from 'react';

export default class DateField extends React.Component {
  render() {
    return (
      <>
        <Item
          style={{
            marginBottom: 12,
            flex: 1,
            minHeight: this.props.tamanho,
          }}
        >
          <DatePicker
            defaultDate={new Date()}
            maximumDate={new Date()}
            locale='pt'
            modalTransparent={false}
            animationType='fade'
            androidMode='spinner'
            placeHolderText={this.props.placeholder}
            textStyle={{ color: this.props.cor }}
            placeHolderTextStyle={{ color: this.props.corP }}
            onDateChange={this.props.onDateChange}
          />
          <Input
            placeholder={
              this.props.data
                ? '(atual: ' + new Date(this.props.data).toDateString() + ')'
                : ''
            }
            disabled
          ></Input>
        </Item>
      </>
    );
  }
}
