const usuariopadrao = 7

var app = new Vue({
    el: '#app',
    data() {
        return {
            autenticado: false,
            erro: false,
            usuario: null,
            albuns: null,
            posts: [],
            users: []
        }

    },

    methods: {
        checarDados: function () {
            dadoArmazenado = localStorage.getItem("userid") && localStorage.getItem("username")
            if (!dadoArmazenado) {
                this.erro = true; // Caso não esteja logado, dispara um erro
            }

        },

        verMais: function (n) {
            localStorage.setItem("postid", n)
            window.location.href = "detalhes.html";
        },

        getUsers: async function () {
            for (var i = 0; i < this.posts.length; i++) {
                id = this.posts[i].userId;
                url = "https://jsonplaceholder.typicode.com/users?id=" + id
                await axios
                    .get(url)

                    .then(response => {
                        if (response.data.length) {
                            this.users.push(response.data[0].username)
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

        getPosts: async function (url) {
            await axios
                .get(url)

                .then(response => {
                    for (var a in response.data) {
                        var p = response.data[a]

                        if (p.userId != localStorage.getItem("userid")) {
                            this.posts.push(p)
                        }
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
            await this.getPosts(apiPost)
            await this.getUsers()
        }

    }
})
