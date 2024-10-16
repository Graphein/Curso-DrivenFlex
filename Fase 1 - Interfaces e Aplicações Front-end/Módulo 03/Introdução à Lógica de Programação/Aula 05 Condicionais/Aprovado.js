function situacao(nota) {
    if (nota >= 7)
    {
      return "Aprovado";
    }
    else
    if (nota >= 5)
    {
      return "Prova Final";
    }
    else
    {
      return "Reprovado";
    }
  }