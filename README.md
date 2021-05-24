# Pré-requisitos

A seguir estão listadas as versões de cada item que foram utilizadas e testadas em ambiente de desenvolvimento. Provavelmente funciona com versões mais atuais do *node* e *npm*, mas o JDK recomendo manter o mesmo.

- Versão do node: 10.23.1;
- Versão do npm: 6.14.10;
- Versão do JDK: 8;
- Android Studio com SDK 28.

Recomendado instalar o JDK atraves dos repos do linux e gerencia-lo com update-alternatives. Recomendado instalar o nvm para ter melhor gerenciamento das versões do node e npm.

&nbsp;


# Rodando o projeto

1. Duplicar o arquivo "config.json.example", renomear para "config.json" e substituir as variáveis ali pelos dados do couchDB rodando no AWS EC2.

2. Rodar `npm i` para instalar as dependências do projeto;

3. Instalar globalmente o amplify-cli com o comando `npm install -g @aws-amplify/cli`

4. Rodar `amplify init` e deixar os valores *defaults* às perguntas apresentadas;

5. Rodar `npm start` para iniciar o servidor node.

6. Iniciar um emulador ou conectar um dispositivo físico à entrada USB da máquina.

7. Em outro terminal, rodar `npx react-native run-android` para instalar o app em um emulador ou dispositivo conectado.
