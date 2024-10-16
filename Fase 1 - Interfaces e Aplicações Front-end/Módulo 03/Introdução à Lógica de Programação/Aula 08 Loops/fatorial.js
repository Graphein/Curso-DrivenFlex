function fatorial(n) {
    let resultado = 1;

    for (let i = n; i > 1; i--) { 
        resultado *= i;
    }
    
    return resultado;
}