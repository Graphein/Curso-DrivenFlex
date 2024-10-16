function decidirCompra(preco, parcelas, estouEndividado) {
    if (preco >= 1000) {
        if (!estouEndividado || parcelas >= 10) {
            return "Vou comprar";
        } else {
            return "Não vou comprar";
        }
    } else if (preco >= 750 && preco < 1000) {
        if (parcelas >= 5) {
            return "Vou comprar";
        } else {
            return "Não vou comprar";
        }
    } else if (preco <= 500) {
        return "Vou comprar";
    } else {
        return "Não vou comprar";
    }
}