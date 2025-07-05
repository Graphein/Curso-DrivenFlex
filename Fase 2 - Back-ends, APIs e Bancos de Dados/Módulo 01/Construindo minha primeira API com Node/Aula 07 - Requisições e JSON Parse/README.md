# yet-another-todo-list

Crie um servidor que tenha internamente uma array de tasks como exemplo abaixo:

```jsx
//...
const tasks = [{ description: "codar", isChecked: false }, { description: "dormir", isChecked: false }];
//...
```

A array de tasks **deve estar inicialmente vazia** e o servidor deve ter duas rotas:

1. **POST** `/tasks` que recebe um body com uma única nova task a ser adicionada no formato:
    
    ```json
    { "description": "codar", "isChecked": false }
    ```
    
    Adiciona à lista de tasks do servidor e, em seguida, responde com a própria task criada para o cliente.
    Para esse exercício, você **não deve** adicionar ids nas tarefas, mantenha o formato das tasks como no array mostrado no início deste enunciado.
    
2. **GET** `/tasks` que responde um JSON com a lista de tasks adicionadas.
    
    Utilize a porta `5005` para subir seu servidor e teste o exercício com o **ThunderClient** ou algum outro **API Client** (Postman, Insomnia, etc)
