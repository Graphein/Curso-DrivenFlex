function produtoImpares(valores) {
    let multiplicacao = 1;
    
    for (let i = 0; i < valores.length; i++) 
    {
        if (valores[i] > 7 && valores[i] % 2 !== 0) 
        {
            multiplicacao *= valores[i];
        }
    }

    return multiplicacao;
}