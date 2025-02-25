class User {
  constructor (id,nome,email,senha,endereco,telefone,cpf){
    this.id = id; //id do usuario
    this.Nome = nome; //nome do usuario
    this.email = email; //email do usuario
    this.senha = senha; //senha do usuário
    this.endereco = endereco; //Endereço do usuário
    this.telefone = telefone // telefone do usuário
    this.cpf = cpf; //CPF do usuário
  }
}

module.exports = User; // exportar o modulo
