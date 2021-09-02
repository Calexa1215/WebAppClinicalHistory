<template>
    <div id="app" class="app">
        <div class="header">   
          <nav>
            <button v-on:click="about" v-if="is_auth" > ABOUT </button>
            <button v-on:click="login" v-if="is_auth" > LOG IN </button>
          </nav>
        </div>
        <div class="description">
            <h2>Bienvenido a su historia clínica ONline!</h2>
            <p>Revise toda su trazabilidad clínica en un solo lugar y descarguela cuando requiera.</p>
        </div>
      </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'App',

  data: function(){
      return{ 
        is_auth: false
      }    
  },

  created: function(){
    this.updateAccessToken();
  },

  methods:{

    updateAccessToken: async function(){
      if(localStorage.getItem('refresh_token')==null){
        this.$router.push({name: "user_auth"})
        this.is_auth = false
        return;
      }

      await this.$apollo.mutate({
        mutation: gql`
          mutation ($refreshTokenRefresh: String!) {
            refreshToken(refresh: $refreshTokenRefresh) {
              access
            }
          }`
        , 
        variables: {
          refreshTokenRefresh: localStorage.getItem('refresh_token')
        }
      }).then((result) => {
        localStorage.setItem('access_token', result.data.refreshToken.access)
        this.is_auth = true
      }).catch((error) => {
        alert("Su sesión expiró, vuelva a iniciar sesión.")
        this.$router.push({name: "user_auth"})
        this.is_auth = false
      });
    },

    logIn: async function(data, username){
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('current_username', username)

      await this.updateAccessToken();
      if(this.is_auth) this.init();
    },

    init: function(){
      this.$router.push({name: "user", params:{ username: localStorage.getItem("current_username") }})
    },

    logOut: async function(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('current_username')

      await this.updateAccessToken();
    }   
  }
  
}
</script>

<style>
  body{
    height: 665px;
    background-size: 100%;
  }
  .header{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
    margin: 0%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header nav {
    height: 100%;
    width: 40%;
    margin-left: 70%;
    margin-right: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    font-size: 25px;
    font-weight: bold;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    display: flex;
    text-align: right;
    padding: 10px 20px;
  }

  .header nav button:hover{
    border: 1px solid #E5E7E9;
    border-radius: 10px;
  }

  .description{
    margin-top: 20%;
    margin-left: 50%;
  }

  .description h2{
    color: yellow;
    font-size: 30px;
    font-style: italic;
  }

  .description p{
    color: white;
    font-size: 20px;
  }
  
</style>
