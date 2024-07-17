# PLACE HUB

## Descrição

Este é um desafio para testar minhas habilidades na construção de APIs. O objetivo é criar uma API simples para gerenciar lugares (CRUD) utilizando nodejs com nestjs.

## Conteúdo
- [Instalação e Execução](#instalação-e-execução)
- [Postgres Admin](#postegres-admin)
- [Testes da API](#testes-da-api)
- [Features](#features)
    - 1.1 [Criar um usuario](#user)
    - 1.2 [Autenticar um usuário](#user)
    - 1.3 [Criar um lugar](#criar)
    - 1.4 [Editar um lugar](#editar)
    - 1.5 [Deletar um lugar](#deletar)
    - 1.6 [Listar todos os locais](#listar)
    - 1.7 [Listar lugares e filtrá-los por nome](#listar)
- [Arquitetura](#arquitetura)


## Instalação e Execução

# First Time
 
### 1. Clonar o Repositório

Clone o repositório do GitHub para sua máquina local:

```bash
git clone https://github.com/ThalesAbdon/PlaceHub
```

### 2. Instalar Dependências
Acesse a pasta root
```
cd place-hub
```
Execute o comando:
```
npm install
```
### 3. Configurar Variáveis de Ambiente
Verifique as variavéis de ambiente no arquivo
```
.env.example
```
### 4. Execute o script do Docker
```
sudo docker compose up
```
depois, dê control + C para encerrar o programa

## Depois da primeira vez, não é necessário mais utilizar o docker compose up!

### 5. Container Id
  Primeiro, vamos verificar os id dos containers
  ```
  $sudo docker ps -a
  ```
### 6. Rodar novamente
  Agora, para rodar novamente o programa, basta dar um:
  ```
  $sudo docker start id_container1 id_container2 id_container3
  ```

### 7. Parar a execução  
  Quando quiser parar o sistema, basta dar um:
   ```
  $sudo docker stop id_container1 id_container2 id_container3
  ```
 
# Postegres Admin
  ## A partir daqui, estou considerando a utilização das variavéis de ambiente que estão no arquivo: ```.env.example```.
  
  ###Sinta-se a vontade para utilizar a ferramenta de administração de banco de dados que quiser! ( eu mesmo utilizo o DBeaver), porém deixei aqui o PGAdmin4
  ### 1. Acesso ao PGAdmin4
  No navegador e Com o projeto rodando, acesse
  ```
  http://localhost:5050/
  ```
  ### 2. Login
  Como default temos:
  ```Email: admin@admin.com``` e 
  ```Password: root```
  Basta clicar em Login
  ![Interface de login do PgAdmin4](images/Pgadmin-login.png)
  
  ### 3. Servidor
  Provavelmente, quando logar, não haverá um servidor, então clique em adicionar novo servidor
  ![Servidor ](images/add-server.png)

  ### 4. Configurando Servidor
  Na aba geral, tudo que precisa colocar o campo nome ( pode ser qualquer nome, coloquei o nome do projeto place-hub) 
  ![Aba General](images/general.png)

  Na aba Conexão, é necessário colocar o campo
  - Host name/address: ```localhost```
  - Username: ```root```
  - Senha: ```root```
  ![Aba conexão](images/connections.png)

  Agora, basta clicar em Salvar

  ### 5. Banco criado
  ![database](images/database.png)

## Testes da API
  Para testar, podemos usar o swagger:
  ```http://localhost:3000/api``` ou um cliente GUI (Postman, insomnia, etc).

  - O Primeiro passo é [Criar um usuario](#user)
  
  - Em seguida, precisamos fazer [a Autenticação de um usuário](#user), ou seja: logar no nosso sistema. Assim, será gerado um Bearer token e com ele poderemos ter acesso aos outros end-points. Em caso de não utilização do Bearer token em uma rota que requer autenticação, iremos receber como retorno o erro:

  ```
  {
    "message": "Forbidden resource",
    "error": "Forbidden",
    "statusCode": 403
  }
  ```
# Features
## User
  -  Gerenciamento autenticação de usuários.
  
  - Autenticação do cliente é feita por Bearer token.
  
  - O Usuário é inserido no banco de dados.

### Criar um usuário  

  - Para criar um usuário, utilizamos uma rota POST:
   ```http://localhost:3000/users``` 
   
   Com o seguinte json:

    {
      "name": "Teste",
      "email": "Teste@teste.com",
      "password": "teste123"
    }

### Autenticar um usuário  

  - Para autenticar um usuário, utilizamos uma rota POST:
    ```http://localhost:3000/users/login``` 
       
   Com o seguinte json:

    {
      "email": "Teste@teste.com",
      "password": "teste123"
    }    
    
  Como retorno, teremos um bearer token:

    {
      "auth": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOnsiaWQiOjQsIm5hbWUiOiJUaGFsZXNFcnJvIn19LCJpYXQiOjE3MjEwNjE1NDAsImV4cCI6MTcyMTA2MzM0MH0.xm_J8AYInWm4DOSmFlFC6erSIkI-aVvD5Mz98ir5_LI"
    }  

###É importante lembrar que teremos que utilizar esse token para fazer requisições nos outros endpoints. Ou seja, o usuário precisa estar logado!

Também implementei end-points para:
  - Listar todos os usuários
  - Buscar usuário por id
  - Atualizar um usuário
  - Deletar um usuário

## Places
  - Gerenciamento de Lugares.
  
  - Necessário estar autenticado.
  
  - O Lugar é inserido no banco de dados exclusivo para armazenar lugares.

### Criar
  - Para criar um lugar, utilizamos uma rota POST
   ```http://localhost:3000/places``` 
   
   Com o seguinte json:

    {
      "name": "um lugar qualquer",
      "city": "Belo horizonte",
      "state": "Minas Gerais"
    }

### Editar
  - Para editar um lugar, utilizamos uma rota PATCH
   ```http://localhost:3000/places/:id``` 

  - É necessário colocar um id válido! 

   Com o seguinte json:

    {
      "name": "outro lugar qualquer",
      "city": "Belo horizonte",
      "state": "Minas Gerais"
    }

### Deletar
  - Para deletar um lugar, utilizamos uma rota DELETE
   ```http://localhost:3000/places/:id``` 
   
  - É necessário colocar um id válido! 

### Listar
  - Para listar todos os lugares, utilizamos uma rota GET:
   ```http://localhost:3000/places``` 
   
  - Se não tiver nenhum parametro, então o retorno será de todas as cidades!

  - Também é possível listar por parametros, por exemplo: encontrar todas os lugares que sejam da cidade Belo Horizonte
     ```http://localhost:3000/places?city=Belo Horizonte``` 

### Encontrar Lugar por um id 
   - Para buscar um lugar pelo id, utilizamos uma rota GET:
   ```http://localhost:3000/places/:id``` 
   
  - É necessário colocar um id válido! 

## Arquitetura
![Desenho da Arquitetura](/images//arq.jpg)

Esta arquitetura é apreciada por sua clara separação de responsabilidades. O padrão divide a aplicação em três camadas principais:

Controller: Responsável por expor a funcionalidade para consumo por entidades externas, como interfaces de usuário. Atua como uma camada fina que passa solicitações para o serviço.

Service: Contém a lógica de negócios da aplicação. Realiza operações necessárias e, se precisar buscar ou salvar dados, interage com a camada de Repositório.

Repository: Cuida do armazenamento e recuperação de dados. Não se preocupa com quem está chamando, apenas realiza as operações solicitadas.

Benefícios:
 - Separação de Responsabilidades: Cada camada tem uma função clara e específica, facilitando a manutenção e a compreensão do código.
 
 - Testabilidade: Cada camada pode ser testada isoladamente, o que simplifica os testes unitários e permite a criação de mocks para as camadas adjacentes.

 - Código Limpo: Mantém o código organizado, evitando a mistura de lógica de negócios com operações de armazenamento ou controle.

