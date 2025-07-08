db.contatos.insertMany([
{ nome: "Fulano", telefone: "19 36013540" },
{ nome: "Ciclano", telefone: "19 36013541" },
{ nome: "Fulana", telefone: "19 36013543" },
{ nome: "Ciclana", telefone: "19 36013544" }
])

db.contatos.insertOne({ 
	nome: "Fulaninho", 
	telefone: "19 36013546", 
	neto: "sim" 
})

db.contatos.find() 