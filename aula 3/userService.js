const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system
const { json } = require("stream/consumers");
const bcrypt = require('bcryptjs');
const mysql = require('./mysql');



class userService {
  constructor() {
    this.filePath = path.join(__dirname, 'user.json');
    this.users = this.loadUsers(); //array para armazenar user
    this.nextId = this.getNextId(); //contador para gerar id
  }

  loadUsers() {
    try {
      if (fs.existsSync(this.filePath)) { //verifica se o arquivo existe
        const data = fs.readFileSync(this.filePath); //le o arquivo 
        return JSON.parse(data); //transforma o item em objeto
      }
    } catch (erro) {
      console.log('erro ao carregar arquivo', erro);
    }
    return [];
  }

  getNextId() {
    try {
      if (this.users.length === 0) return 1;
      return Math.max(...this.users.map(user => user.id)) + 1;
    } catch (erro) {
      console.log('erro ao buscar proximo', erro);
    }
  }

  saveUsers() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users));
    } catch (erro) {
      console.log('erro ao salvar arquivo')
    }

  }



  async addUser(nome, email, senha, endereco, telefone, cpf) {
    try {
      const senhaCripto = await bcrypt.hash(senha, 10);
      const resultados = await mysql.execute(
        `insert into usuario (nome, email, endereco, telefone, senha, cpf)  
            Values( ?, ?, ?, ?, ?, ?);`,
        [nome, email, endereco, telefone, senhaCripto, cpf]
      )
      return resultados;



    } catch (erro) {
      console.log('erro ao cadastrar o usuario');
      throw erro; //lança o erro para o controller
    }

  }

  getUsers() {
    try {
      return this.users
    } catch (erro) {
      console.log('erro ao chamar o usuario');
    }

  }

  deleteUser(id) {
    try {
      this.users = this.users.filter(user => user.id !== id);
      this.saveUsers();
    } catch (erro) {
      console.log('Erro ao deletar usuário', erro)
    }
  }

  async putUser(id, nome, email, senha, endereco, telefone, cpf) {
    try {
      const senhaCripto = await bcrypt.hash(senha, 10);

      const resultados = await mysql.execute(
        `UPDATE usuario
              SET nome = ?,
                  email = ?,
                  endereco = ?,
                  telefone = ?,
                  senha = ?,
                  cpf = ?
                WHERE idusuario = ?;
                                            `,
        [nome, email, endereco, telefone, senhaCripto, cpf, id]
      )
      return resultados;
    } catch (erro) {
      console.log('erro ao atualizar usuário', erro);
    }
  }
}


module.exports = new userService;


//esse éo certo 