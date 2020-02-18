<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<p>
  Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!
</p>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução">Instalação e execução</a>
</p>
Instalação e execução

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.

### **Ferramentas utilizadas**

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (PostgreSQL);

### **Funcionalidades**

Abaixo estão descritas as funcionalidades adicionadas na aplicação.

### **1. Autenticação**

- Permite que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.
- Cria um usuário administrador utilizando a funcionalidade de [seeds do sequelize]
- Autenticação utilizando JWT.

### **2. Gestão de destinatários**

- Controle de destinatários (cadastrado/atualização).
- Exclusivo para administradores autenticados na aplicação.
- Validação dos dados de entrada.

## 🚀 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd bootcamp-gostack-02`;
3. Rode `yarn` para instalar as dependências;
4. Crie um banco de dados no `postgres` com o nome de `gobarber`;
5. Altere as credencias dentro de `/src/app/config/database.js`;
6. Rode `yarn sequelize db:migrate` para executar as migrations;
7. Rode `yarn dev` para iniciar o servidor.
