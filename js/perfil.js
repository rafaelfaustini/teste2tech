

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
        axios
          .get('https://jsonplaceholder.typicode.com/users')

          .then(response => {
              this.usuario = response.data[4]
              localStorage.setItem('userid', this.usuario.id)
              localStorage.setItem('username', this.usuario.username)
          }) // 4 é um usuário escolhido de id 5
          .catch(error => {
              console.log("Houve um erro")
              console.log(error)
              this.erro = true
          })
          .finally(() => this.carregando = false)
      }
  })
