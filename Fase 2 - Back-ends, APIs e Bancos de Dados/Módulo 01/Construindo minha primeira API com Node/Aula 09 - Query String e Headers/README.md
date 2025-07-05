# extrato-bancario

Você foi contratado para trabalhar como Back-end numa Fintech (empresa de tecnologia e finanças). Sua primeira task é criar uma rota que retorna o extrato bancário de um cliente.

A rota e a configuração minima do servidor já existe, seu papel é implementar as seguintes funcionalidades:

1. O nome do cliente virá dentro dos headers da requisição, especificamente no header user, o extrato deverá ser filtrado para somente retornar as movimentações do cliente recebido pelo header. Se esse header não existir, a resposta deverá ser o status code 401
2. Três possíveis query strings poderão ser enviadas, `dia`, `mes` e `tipo`
    - `dia` deverá retornar todas as movimentações do dia (enviados como '?dia=03')
    - `mes` deverá retornar todas as movimentações do mês (enviados como '?mes=01')
    - `tipo` deverá retornar todas as movimentações do tipo indicado (enviados como '?tipo=entrada' ou '?tipo=saida')

Lembre-se que para enviar mais de uma query string você deve juntá-las com &

Utilize a porta 5005 para subir seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
**Escreva seu código no arquivo src/app.js**
