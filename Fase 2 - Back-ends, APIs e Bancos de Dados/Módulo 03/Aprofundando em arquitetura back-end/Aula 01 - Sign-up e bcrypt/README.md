# Sistema de cadastros Cadastra Aí

Você está implementando seu primeiro sistema de cadastros. Para isso você precisará criar as rotas de `/sign-up` e `/sign-in`.

Finalize as rotas de `sign-up` e `sign-in`, inserindo um usuario no banco utilizando `bcrypt` para criptografar e verificar a senha recebida por `body`.

O nome da collection onde os usuários devem ser adicionador é `users`. Não é ecessário fazer validações com o joi nem validar se o usuário já foi iserido anteriormente, apenas implemente a função básica de login e cadastro.

No caso de sucesso no cadastro, envie o status code 201.
No caso de sucesso do login, envie status 200.
No caso de erro do login, envie status 401.
