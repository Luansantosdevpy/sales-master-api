# Projeto de Gerenciamento de estabelecimento de vendas

Este é um projeto de gerenciamento de estabelecimento de vendas desenvolvido em TypeScript, com uma arquitetura limpa e integração com um banco de dados PostgreSQL. O projeto inclui módulos de autenticação e um CRUD de clientes até o momento, mas deverá ter módulos de produtos, módulo gerencial para emissão de relatórios, módulo de vendas e controle de estoque.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/gerenciamento-clientes.git
   cd gerenciamento-clientes
2. Copie o arquivo .env.sample para .env:
   ```bash
   cp .env.sample .env
3. Edite o arquivo .env com suas configurações específicas, como credenciais do banco de dados e chaves de API.

## Executando o Projeto

Para executar o projeto, use o Docker Compose:

    ```bash
    docker-compose up
    ```

## Estrutura do Projeto

Este projeto segue os princípios da "Clean Architecture" (Arquitetura Limpa), que promove uma organização estrutural que mantém a separação de preocupações e a independência de frameworks externos. A seguir, uma explicação da estrutura de pastas e como ela se encaixa na Clean Architecture:

- **src/**: Nesta pasta, você encontrará todo o código-fonte da aplicação, seguindo a estrutura de camadas.

- **src/api/controllers/**: Os controladores da API estão localizados aqui e estão relacionados à camada de Interface do Usuário (UI). Eles gerenciam a interação direta com as solicitações HTTP e a apresentação de respostas.

- **src/api/routes/**: As definições de rotas da API também fazem parte da camada de Interface do Usuário (UI). Elas determinam como as solicitações HTTP são roteadas para os controladores correspondentes.

- **src/application/services/**: Aqui residem os serviços de negócios, que compõem a camada de Lógica de Aplicação. Eles contêm a lógica de negócios independente de qualquer detalhe de implementação externa.

- **src/application/validations/**: As validações de solicitações também fazem parte da camada de Lógica de Aplicação. Elas garantem que os dados de entrada sejam corretos antes de serem processados pelos serviços.

- **src/application/exceptions/**: Esta pasta contém exceções da aplicação, seguindo as melhores práticas da Clean Architecture para manter o tratamento de erros centralizado e independente de qualquer framework externo.

- **src/domain/interfaces/**: Aqui, você encontrará as interfaces da aplicação, incluindo interfaces de repositórios, inputs, outputs e mappers. Elas definem contratos que a camada de Infraestrutura deve implementar.

- **src/domain/models/**: Os modelos de dados também fazem parte da camada de Domínio. Eles representam os conceitos centrais da sua aplicação e são independentes de qualquer detalhe de implementação.

- **src/infrastructure/data/**: Esta é a camada de Infraestrutura, onde você encontra as configurações de banco de dados, como migrations e seeders, além de outras configurações específicas de infraestrutura.

- **src/infrastructure/data/repositories/**: Os repositórios de acesso a dados estão na camada de Infraestrutura e fornecem implementações concretas das interfaces definidas na camada de Domínio.

- **src/infrastructure/config/**: As configurações da aplicação, como configurações de ambiente, também fazem parte da camada de Infraestrutura, pois são detalhes de implementação específicos da infraestrutura.

Esta estrutura promove a separação clara das camadas, tornando o projeto escalável, independente de frameworks e de fácil manutenção a longo prazo.

## Funcionalidades (Ainda em construção)

Módulo de Autenticação: Permite que os usuários façam login e recebam um token de autenticação.

CRUD de Clientes: Fornece operações de criação, leitura, atualização e exclusão de registros de clientes no banco de dados.

## Autor

Luan Santos
