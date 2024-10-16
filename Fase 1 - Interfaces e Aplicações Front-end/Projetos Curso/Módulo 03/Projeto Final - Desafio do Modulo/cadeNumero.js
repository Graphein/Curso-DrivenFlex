function acheValor(lista, valor) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === valor) {
            return i;
        }
    }
    return -1;
}
