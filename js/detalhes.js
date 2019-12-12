const usuariopadrao = 7

var app = new Vue({
    el: '#app',
    data() {
        return {
            autenticado: false,
            erro: false,
            usuario: null,
            albuns: null,
            post: null,
            carregando: true,
            comentarios: []
        }

    },

    methods: {
        checarDados: function () {
            dadoArmazenado = localStorage.getItem("userid") && localStorage.getItem("username") && localStorage.getItem("postid")
            if (!dadoArmazenado) {
                this.erro = true; // Caso não esteja logado ou acessado sem dados do post, dispara um erro
            }

        },
        criarComment: function () {
            var comment = { name: this.usuario.name, email: this.usuario.email, body: document.getElementById("novocomment").value };

            console.log(comment);
            this.comentarios.unshift(comment)

        },
        getComments: async function (url) {

            var id = localStorage.getItem("postid")
            await axios
                .get(url + "?postId=" + id)

                .then(response => {
                    if (response.data.length) {
                        for (var i in response.data)
                            this.comentarios.push(response.data[i])
                    }
                })
                .catch(error => {
                    console.log("Houve um erro")
                    console.log(error)
                    this.erro = true
                })
                .finally(() => { return true })
        },
        getUsuario: async function (apiUsuarios) {
            apiUsuarios += "?id=" + localStorage.getItem("userid")
            console.log(apiUsuarios)
            await axios
                .get(apiUsuarios)

                .then(response => {
                    this.usuario = response.data[0]
                })
                .catch(error => {
                    console.log("Houve um erro")
                    console.log(error)
                    this.erro = true
                })
                .finally(() => { return true })
        },
        getPost: async function (url) {
            var id = localStorage.getItem("postid")
            await axios
                .get(url + "?id=" + id)

                .then(response => {
                    if (response.data.length) {
                        this.post = response.data[0]
                    }
                })
                .catch(error => {
                    console.log("Houve um erro")
                    console.log(error)
                    this.erro = true
                })
                .finally(() => { return true })
        }
    },

    async mounted() {
        await this.checarDados()
        if (!this.erro) {
            var apiPost = "https://jsonplaceholder.typicode.com/posts"
            var apiComentario = "https://jsonplaceholder.typicode.com/comments"
            var apiUsuario = "https://jsonplaceholder.typicode.com/users"

            await this.getPost(apiPost)
            this.getPost(apiPost)
            this.getComments(apiComentario)
            await this.getUsuario(apiUsuario)
            if (this.post && this.comentarios && this.usuario) {
                this.carregando = false
            }
        }

    }
})
