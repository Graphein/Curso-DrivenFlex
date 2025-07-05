# ajudem-o-instrutor

Hackers clandestinos vazaram a API do TasteCamp, e a pior parte é que o instrutor ainda não criou as validações de input necessárias!!! 😱

Ajude o instrutor criando as seguintes validações

1. POST `/receitas`
    1. Verificar e impedir o cadastro de receitas com o mesmo nome, retornando status code 409 e a mensagem “Receita já existente”
    2. Verificar se todos os campos do objeto receita foram preenchidos e se não forem, retornar o status code 422 e a mensagem “Todos os campos são obrigatórios”
        - [ ]  titulo
        - [ ]  ingredientes
        - [ ]  preparo
    3. Caso tudo ocorra bem, retorne o status code 201
2. GET `/receitas/:idDaReceita`
    1. Verificar se a receita com o id solicitado via path params existe e, caso não existir, retornar o status code 404

Utilize a porta 5005 para subir seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
**Faça o código no arquivo src/app.js**
