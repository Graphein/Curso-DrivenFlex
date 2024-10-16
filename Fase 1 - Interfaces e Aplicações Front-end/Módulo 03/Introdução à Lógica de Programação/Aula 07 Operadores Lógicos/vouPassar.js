function vouPassar(p1, p2, p3) {
    let media1 = ( p1 + p2 ) / 2;
    let media2 = ( p1 + p2 ) / 2;
    let media3 = (p1 + p2 + p3) / 3;
  
    if (media1 > 7)
    {
      return "Aprovado(a)";
    }
    else
    if (media2 < 3)
    {
      return "Reprovado(a)";
    }
    else
    if (media3 > 5)
    {
        return "Aprovado(a)";
    }
    else
    {
        return "Reprovado(a)";
    }
  }