# porta-automágica

Uma prática muito comum no mercado é armazenar configurações importantes dentro de arquivos .env. Essa técnica é interessante pois permite flexibilizar a sua aplicação para diferentes ambientes ao mesmo tempo que torna sua execução segura, afinal de contas, os valores ficam "escondidos" dentro destes arquivos que não são enviados para o git.

Uma das aplicações mais comuns está na configuração da porta em que aplicação será executada. Como veremos adiante, ao pedir para um serviço na nuvem subir nossa aplicação, ela atribuirá uma porta aleatória. Logo, para que nossa aplicação possa subir, precisamos preparar o nosso código para isso.

Com a ajuda da biblioteca dotenv, altere o arquivo `app.js` para que a aplicação:
- Suba na porta 5000 caso não exista nenhuma variável de ambiente com o nome `PORT`;
- Caso contrário, utilize a porta destacada nesta variável.

Não é necessário assumir casos de erros, como por exemplo, a utilização de uma string ao invés de um número.

Suba seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
**Escreva seu código no arquivo src/app.js**
