function aprovado(media, faltas) {

    let nota = media >= 7;
    let nfaltas = faltas <10;
  
    if (nota && nfaltas)
    {
      return "Aprovado"
    }
    else
    {
      return "Reprovado"
    }
  }