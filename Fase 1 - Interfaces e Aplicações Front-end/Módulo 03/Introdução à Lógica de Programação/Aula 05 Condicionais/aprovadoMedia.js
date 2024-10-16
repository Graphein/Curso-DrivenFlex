function aprovado(nota1, nota2, nota3) {
    let media = ( nota1 + nota2 + nota3 ) / 3;
    if (media >= 7)
    {
      return "sim";
    }
    else
    {
      return "não";
    }
  }