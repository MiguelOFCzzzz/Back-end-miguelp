//classe base Usuário

class Usuário {
 constructor (nome,email,senha){
          this.nome = nome;
          this.email = email;
          this._senha = senha; //atributo privado
    }

    
     autenticar (senha){
      return senha === this._senha;

  }
  
      alterarSenha(novaSenha){
      this._senha = novaSenha;
      console.log('senha alterada com sucesso');
  }
}

//classe admin que herda de usuário
class admin extends Usuário{
   constructor(nome,email,senha,nivelAcesso) {
     super(nome,email,senha); //chama o construtor da classe 
     this.nivelAcesso = nivelAcesso;

   }
  banirUsuario(usuário) {
   console.log(`${usuário.nome} foi banido pelo admin ${this.nome}`);
  }

  
//polimorfismo sobrepondo o metodo autenticar
autenticar(senha){
    return senha === this._senha && this.nivelAcesso === 'alto';
 
 }
 

}



//exemplo de uso 

const usuario1 = new Usuário ('Luiz','Luiz@gmail.com','1234')
const usuario2 = new admin('Maria','Maria@gmail.com','6789','alto')
console.log(usuario1.autenticar('1234'));
console.log(usuario2.autenticar('6789'));
usuario2.banirUsuario(usuario1);


