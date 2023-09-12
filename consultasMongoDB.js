
// Selecionando a equipe LOUD

db.pessoas_tabela.find({"equipe" : "LOUD"})

// Selecionando todas as equipes de CS com 6 atletas usando $size

db.times_tabela.find({"atletas": {"$size": 6}})

// Agrupando todos os atletas brasileiros e calculando a média de idade 
 
db.pessoas_tabela.aggregate([{$match: { tipo: "Jogador",pais: "Brasil"}},{$group: {_id: null, media_idade: {$avg: "$idade"}}}])

// Selecionando todos os atletas sem mostrar time correspondente 

db.pessoas_tabela.aggregate([{$match: {tipo: "Jogador",   }},{ $project: {equipe: 0}}])

// Selecionando os jogadores com 26 anos ou mais

db.pessoas_tabela.find({"tipo": "Jogador", "idade": {"$gte": 26}})

// Selecionando a soma de idade do time da LOUD 

db.pessoas_tabela.aggregate([{$match: {equipe: "LOUD"}},{$group: {_id: null,soma_idade: {"$sum": "$idade"}}}])

// Contando quantos narradores existem 

db.pessoas_tabela.countDocuments({"tipo": "Narrador"})

// Selecionando o tecnico mais velho dos times de valorant 

db.pessoas_tabela.aggregate([{$match: {tipo: "Tecnico", jogo : "Valorant"}},{$group: {_id: null, max_idade: {"$max": "$idade"}}}])

//selecionando as equipes que não possuem técnico 

db.times_tabela.find({"CampeaoMundial": {$exists: true}})

// selecionando as partidas ordenadas crescentemente pela capacidade maxima de cada estadio

db.partidas_tabela.find().sort("capacidade", 1)

// selecionando as 3 partidas com maior capacidade

db.partidas_tabela.find().sort("capadidade", -1).limit(3)

// selecionando as pessoas com menos de 20 anos

db.pessoas_tabela.find({"$where": "this.idade < 20"})

//usando pretty

db.pessoas_tabela.find({"equipe" : "LOUD"}).pretty()

// selecionando as partidas que tem LOUD e Cavaleiros do Grad como competidores

db.partidas_tabela.find({"competidores": {$all: [db.equipes_tabela.findOne({"nome": "LOUD"}), db.equipes_tabela.findOne({"nome": "Sentinels"})]}})

//usando set para atualizar um valor

db.partidas_tabela.updateOne({id :1000},{$set: {"capacidade": 11000}})

// utilizar text para procurar pessoas, primeiro tem q criar um indice

db.pessoas_tabela.createIndex({nome: "text"})

// selecionando as pessoas com nome "João" e tb usando a funcao search

db.pessoas_tabela.find({$text: {$search: "Luiz Eduardo"}})

//selecionando as partidas com jogadores brasileiros

db.partidas_tabela.find(filter={"competidores": {$elemMatch: {pais: "Brasil"}}})

//renomeando tabela 
db.transmissao_tabela.renameCollection("transmissao_colecao")
//desrenomeando
db.transmissao_colecao.renameCollection("transmissao_tabela")

//usando cond para ver se as pessoas sao de maior ou nao
db.pessoas_tabela.aggregate([{$project: {nome: 1,idade: 1,faixa_etaria: {$cond: {if: { $gte: ["$idade", 18] },then: "Adulto",else: "Menor de Idade" }}}}])

//usando find one

db.pessoas_tabela.findOne()

