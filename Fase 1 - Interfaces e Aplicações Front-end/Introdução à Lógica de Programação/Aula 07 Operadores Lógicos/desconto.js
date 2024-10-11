function pecoDesconto(preco, estaComDesconto) {
    if (preco>100 && !estaComDesconto){
      return "Quero pechinchar";
    }
    else{
      return "Negócio fechado";
    }
  }