function concatenaNomes(primeirosNomes, ultimosNomes) {
  return primeirosNomes.map((primeiro, i) => `${primeiro} ${ultimosNomes[i]}`);
}