const express = require('express')
const userService = require('./userService')

const app = express (); // nome qualquer para express
app.use(express.json()); // vou habilitar json no express 

// rota para criar usuario

app.post("/users", async (req,res) =>{
  const {nome, email, senha, endereco, telefone, cpf} = req.body;
  if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
      return res.status(400).json
      ({error: "Nome e email são obrigatórios"})


  }
  const user = await userService.addUser(nome,email,senha, endereco, telefone, cpf);
  res.status(200).json({user});
})

//rota para excluir usuario pelo id

app.delete("/users/:id",(req, res)=> {
const id = parseInt(req.params.id);
//converte o ID para numero
try {
  const resultado = userService.deleteUser(id);
  //tenta excluir o usuario
  res.status(200).json(resultado);
  //retorna a mensagem de sucesso
} catch (erro) {
    res.status(400).json({error:erro.massage});
    //retorna mensagem de erro
  }
});

//rota para listar todos os usuarios

app.get("/users", (req,res)=>{
 res.json(userService.getUsers());
})

app.put("/users/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const {nome, email, senhaCripto, endereco, telefone, cpf} = req.body;
  try{
    const user = userService.putuser(id, nome, email, senhaCripto, endereco, telefone, cpf);
    res.status(200).json(user);
  }catch(erro){
    res.status(400).json({error: erro.message});
  }
})

const port = 3000
app.listen(port,()=>{
    console.log("Servidor rodando na porta", port);

})