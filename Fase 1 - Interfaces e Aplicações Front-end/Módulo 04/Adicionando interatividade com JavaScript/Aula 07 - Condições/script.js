let primeiroNumero = prompt ("Digite o primeiro numero");

let operacao = prompt ("digite qual operação  (+, -, *): ");

let segundoNumero = prompt ("Digite o segundo numero");

primeiroNumero = Number(primeiroNumero);
segundoNumero = Number(segundoNumero);

let resultado=0;

if (operacao == "+")
{
  resultado = primeiroNumero + segundoNumero
} 
if (operacao == "-")
{
  resultado = primeiroNumero - segundoNumero
}
if (operacao == "*"){
  
    resultado = primeiroNumero * segundoNumero
}

alert("O resultado é " + resultado);