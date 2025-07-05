import express from "express";

const extrato = [
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 210.30, data: "14/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 500.00, data: "14/01/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 704.30, data: "20/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 600.00, data: "30/01/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 200.50, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 42.80, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 100.00, data: "04/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 20.10, data: "11/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 30.30, data: "21/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 300.20, data: "25/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 100.60, data: "30/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 41.00, data: "03/03/2022", tipo: "saida" },
  { cliente: 'Ciclana', movimentacao: 23.00, data: "08/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/03/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 10.10, data: "15/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 30.90, data: "20/03/2022", tipo: "saida" },
];

const app = express();

function getDay(date) {
  const splitDate = date.split("/")
  return splitDate[0]
}

function getMonth(date) {
  const splitDate = date.split("/")
  return splitDate[1]
}

app.get("/extrato", (req, res) => {
  let extratoFiltrado = extrato;
  const { user } = req.headers
  const { dia, mes, tipo } = req.query

  if (!user) {
    res.sendStatus(401)
    return
  }

  extratoFiltrado = extrato
	  .filter(op => op.cliente === user)                     // usuario
	  .filter(op => dia ? getDay(op.data) === dia : true)    // dia
	  .filter(op => mes ? getMonth(op.data) === mes : true)  // mes
	  .filter(op => tipo ? op.tipo === tipo : true)          // tipo

  res.send(extratoFiltrado);
});


app.listen(5000);