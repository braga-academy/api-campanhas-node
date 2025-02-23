
# API Node.js com Docker e PostgreSQL

Este projeto é uma API construída com Node.js, Express e PostgreSQL. Ele utiliza Docker para facilitar o processo de desenvolvimento e deployment.

## Tecnologias Utilizadas

- Node.js
- Express
- Jest
- PostgreSQL
- Docker

## Instruções para Rodar a Aplicação

Para rodar a aplicação localmente utilizando Docker, siga os passos abaixo:

### 1. Clonar o Repositório

Clone este repositório para sua máquina local:

```bash
git clone <url-do-repositorio>
```

### 2. Construir e Iniciar os Contêineres

Certifique-se de que você tem o Docker e o Docker Compose instalados em sua máquina. Se não tiver, siga a [documentação oficial do Docker](https://docs.docker.com/get-docker/) para instalá-los.

Navegue até o diretório raiz do projeto e execute o seguinte comando:

```bash
docker-compose up -d
```

Esse comando irá:

- Construir os contêineres necessários (baseados no `Dockerfile`).
- Criar e iniciar os contêineres para o servidor Node.js e o banco de dados PostgreSQL.
- Mapear as portas para que você possa acessar a aplicação via `localhost:3001` (ou a porta configurada).

### 3. Acessar a API

Após rodar o comando `docker-compose up -d`, a API estará disponível em `http://localhost:3001`. Você pode começar a fazer requisições à API ou utilizar ferramentas como o Postman ou cURL para interagir com os endpoints.

### 4. Documentação da API com Swagger

Após rodar o comando `docker-compose up -d`, a documentação da API estará disponível em `http://localhost:3001/api-docs` através do Swagger. Você pode começar a fazer requisições à API ou utilizar ferramentas como o Postman ou Insomnia para interagir com os endpoints.

### Testes

Por questão de praticidade, os testes rodam em um contêiner. Isso garante que o ambiente de testes seja consistente e isolado, evitando problemas de configuração que podem ocorrer ao rodar testes localmente. `api-node-test`

### Seeders

Para popular o banco de dados com dados iniciais (seeders), você pode executar o seguinte comando:

```bash
docker exec -it api-node npm run seed
```

Este comando irá executar o script de seeders dentro do contêiner Node.js, garantindo que o banco de dados seja populado com os dados necessários para o funcionamento da aplicação.


### Parar os Contêineres

Para parar os contêineres e remover os recursos criados, execute:

```bash
docker-compose down
```

Isso irá parar e remover os contêineres, mas os dados do banco de dados (se configurado com volumes) permanecerão salvos.

### Reiniciar os Contêineres

Caso você faça alguma modificação no código e precise reiniciar os contêineres, basta rodar os seguintes comandos:

```bash
docker-compose down
docker-compose up -d
```

Isso vai parar e remover os contêineres e depois reconstruir e iniciar novamente.

## Configuração do Banco de Dados

O PostgreSQL será iniciado com as credenciais de acesso configuradas no arquivo `docker-compose.yml`:

- **Usuário**: `user`
- **Senha**: `password`
- **Banco de dados**: `campanha_db`

A URL de conexão ao banco de dados no arquivo `.env` está configurada da seguinte forma:

```
DATABASE_URL=postgres://user:password@db:5432/campanha_db
```

Certifique-se de que as configurações estejam corretas para que o servidor Node.js se conecte corretamente ao banco de dados.

## Contribuições

Se você deseja contribuir para este projeto, basta seguir os seguintes passos:

1. Faça um fork do repositório.
2. Crie uma branch para sua alteração: `git checkout -b minha-alteracao`.
3. Realize suas alterações e commit: `git commit -am 'Minha alteração'`.
4. Envie para o repositório remoto: `git push origin minha-alteracao`.
5. Abra um pull request com uma descrição detalhada de sua alteração.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
