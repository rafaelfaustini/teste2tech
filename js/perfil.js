

var app = new Vue({
    el: '#app',
    data () {
      return {
      erro: false,
      carregando: true,
      usuario: null
      }

    },
    mounted () {
        var apiUsuarios = "https://jsonplaceholder.typicode.com/users"

        if(localStorage.userid){ // Caso usuario já esteja "logado", pegar os dados apenas dele
            this.userid = localStorage.userid
            this.username = localStorage.username
            apiUsuarios+= "/"+this.userid;
        }

        axios
          .get(apiUsuarios)

          .then(response => {
              if(this.userid){
                this.usuario = response.data
              } else{
                this.usuario = response.data[4] // Simula antes de um 'login', onde de todos os usuários o de id 5 é 'logado'
              }
              localStorage.setItem('userid', this.usuario.id) // Ao "logar" o id do usuário fica armazenado, fazendo com que não seja necessário carregar todos os usuários cada vez que acessar a página
              localStorage.setItem('username', this.usuario.username) // Também é armazenado o username
          })
          .catch(error => {
              console.log("Houve um erro")
              console.log(error)
              this.erro = true
          })
          .finally(() => this.carregando = false)
      }
  })
