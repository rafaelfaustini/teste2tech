const usuariopadrao = 7

var app = new Vue({
    el: '#app',
    data () {
      return {
      erro: false,
      carregando: true,
      usuario: null,
      albuns: null
      }

    },

    methods: {
        checarDados: function(){
            dadoArmazenado = localStorage.getItem("userid")
            if(dadoArmazenado){
                if(dadoArmazenado != usuariopadrao){
                    localStorage.clear();
                }
            }
        },

        getUsuario: async function (apiUsuarios) {
            if(localStorage.userid){ // Caso usuario já esteja "logado", pegar os dados apenas dele
            this.userid = localStorage.userid
            this.username = localStorage.username
            apiUsuarios+= "/"+this.userid;
        }

        await axios
          .get(apiUsuarios)

          .then(response => {
              if(this.userid){
                this.usuario = response.data
              } else{
                this.usuario = response.data[usuariopadrao] // Simula antes de um 'login', onde de todos os usuários o de id 5 é 'logado'
              }

              localStorage.setItem('userid', this.usuario.id) // Ao "logar" o id do usuário fica armazenado, fazendo com que não seja necessário carregar todos os usuários cada vez que acessar a página
              localStorage.setItem('username', this.usuario.username) // Também é armazenado o username
              this.userid = this.usuario.id
              this.username = this.usuario.username
              this.carregando = this.carregando && false
            })
          .catch(error => {
              console.log("Houve um erro")
              console.log(error)
              this.erro = true
          })
          .finally(() => {return true})
          },
          
          getAlbunsUsuario: async function (apiAlbum){
            apiAlbum += "?userId="+this.userid // Albuns de um específico usuário
            console.log(apiAlbum)
            await axios
            .get(apiAlbum)
  
            .then(response => {
                this.albuns = response.data
            })
            .catch(error => {
                console.log("Houve um erro")
                console.log(error)
                this.erro = true
            })
            .finally(() => this.carregando = false)
          },

          getQuantidadeAlbunsUsuario: function (){
            var albuns = this.albuns
            if(albuns){
                return albuns.length;    
            } else{
                return 0;
            }
          }
      },

    async mounted () {
        this.checarDados()

        // Dados do Usuário pela API
        var urlUsuario = "https://jsonplaceholder.typicode.com/users"
        await this.getUsuario(urlUsuario)
         // Fim-Dados do Usuário pela API

        // Albuns do Usuário pela API
        var urlAlbum = "https://jsonplaceholder.typicode.com/albums"
        await this.getAlbunsUsuario(urlAlbum)
        // Fim-Albuns do Usuário pela API
      }
  })
