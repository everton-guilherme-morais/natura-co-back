# Natura E-commerce Clone - Backend

Este repositório contém o backend para o projeto de clone do site de e-commerce da Natura. Desenvolvido com NestJS e Prisma, ele gerencia a lógica de negócios e a persistência de dados.

## Funcionalidades

- **Busca por produtos diversos**: Realiza a busca dos produtos para listagem.
- **Carrinho de Compras**: Adiciona produtos ao carrinho ao finalizar a compra.
- **Finalização de Compra**: Processa e limpa o carrinho após a finalização da compra.

## Tecnologias Utilizadas

- **NestJS**: Framework para criar aplicações Node.js escaláveis e eficientes.
- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset de JavaScript para adicionar tipagem estática.
- **Prisma**: ORM para interagir com o banco de dados.
- **Jest**: Framework de testes para garantir a qualidade do código.

- **Banco de dados hospedado dentro da Vercel**

## Configuração do Projeto

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/seuusuario/natura-ecommerce-clone-backend.git
    ```

2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Configure o banco de dados:**
    ```bash
    npx prisma migrate deploy
    ```

4. **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

5. **Rode os testes de integração:**
    ```bash
    npm run test
    ```

## Testes

- **Testes de Integração**: Localizados em `src/tests/integration`, esses testes garantem que as funcionalidades de integração do backend estejam funcionando corretamente. Para rodar esses testes, use o comando `npm run test`.
