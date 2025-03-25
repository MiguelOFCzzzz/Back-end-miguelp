const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system
const bcrypt = require('bcryptjs'); //modulo para criptografar senha

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


  SaveUsers() { //função para salvar os arquivos
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.users));
    } catch (erro) {
      console.log('erro ao salvar o arquivo', erro);
    }
  }




  async addUser(id, nome, email, senha, endereco, telefone, cpf) {
    try {
      const senhaCripto = await bcrypt.hash(senha, 10);
      const user = new User(this.nextId++, nome, email, senhaCripto, endereco, telefone, cpf);
      this.users.push(user);
      this.SaveUsers();
      return user;
    } catch (erro) {
      console.log('erro ao adicionar um user', erro);
    }
  }

  getUsers() {
    try {
      return this.users
    } catch (erro) {
      console.log('erro ao chamar usuário', erro);
    }
    return this.users
  }
}

module.exports = new userService;
