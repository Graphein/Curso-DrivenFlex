# lista-telefonica-da-vovo

Sua primeira implementação da lista telefonica online da sua vovó foi um sucesso! 

Porém, não é possível usar a linha de comando em um front-end, como o celular da sua vovó

Para isso, crie um servidor que utilize a biblioteca `mongodb` para se comunicar com o mongo e exponha as seguintes rotas

1. POST `/contatos`
    
    Insere um documento no formato recebido pelo body na coleção `contatos`
    
2. GET `/contatos/`
    
    Retorna todos os documentos da coleção `contatos`

Utilize a porta 5000 para subir seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
