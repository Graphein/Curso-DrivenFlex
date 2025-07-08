# my-store-ultra-system-incremented-mongo

Você está trabalhando em uma loja e a sua API tem endpoints relativos aos produtos (products) e clientes (customers).

Depois de ver como async/await deixa o código muito mais legível que deixar várias promessas umas dentros das outras, você decidiu refatorar o sistema para que fosse utilizado async/await em todos os lugares possíveis.

Refatore as funções das rotas de **produto** do arquivo `src/app.js`, retirando `then` e `catch` para utilizar `async`/`await` dentro de blocos `try`/`catch`. As rotas de clientes já foram refatoradas.

Para conseguir testar se tudo está funcionando, você precisará:
1. Rodar o banco de dados em um terminal
2. Rodar a aplicação em outro terminal
3. Utilizar o ThunderClient para fazer as requisições (comece pela de POST, assim você irá adicionar um produto para poder vê-lo quando der um GET).

O formato dos dados esperados para um produto é:
- nome, string;
- preco, número inteiro;
- condicao, string com valor "novo", "seminovo" ou "usado".
