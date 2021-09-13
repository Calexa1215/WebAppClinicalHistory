<template>
    
    <div id="app" class="app">
        <div class="header">
          <h1><i>CliniOnline</i></h1>
          <nav>
            <button v-on:click="init" v-if="is_auth" > ABOUT </button>
            <button v-on:click="logIn" v-if="is_auth" > LOG IN </button>
            <button v-on:click="logOut" v-if="!is_auth"> LOG OUT </button>
          </nav>
        </div>
      <div class="main-component">
        <router-view></router-view>
      </div> 
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'App',

  data: function(){
      return{ 
        is_auth: true,
        autenticacion: false
      }    
  },

  created: function(){
    this.updateAccessToken();
  },

  methods:{

    updateAccessToken: async function(){
      this.$router.push({name: "history"})
      if(localStorage.getItem('refresh_token')==null){
        
        return;
      }


    },

    logIn: async function(data, username){
      
      this.$router.push({name: "ConsultUser"})
      await this.updateAccessToken();
      if(this.is_auth) this.init();
    },

    init: function(){
      this.$router.push({name: "user_auth", params:{ username: localStorage.getItem("current_username") }})
      this.is_auth = false
    },

    fin: function(){
      this.$router.push({name: "user_auth", params:{ username: localStorage.getItem("current_username") }})
      this.is_auth = true
    },
    logOut: async function(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('current_username')
      this.fin();
      await this.updateAccessToken();
    }   
  }
  
}
</script>

<style>
 body{
    height: 665px;
    background-image: url("components/Fondo.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .header{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 80px;
    margin: 0%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header nav {
    height: 100%;
    width: 40%;
    margin-left: 50%;
    margin-right: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    font-size: 25px;
    font-weight: bold;
    color: blue;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    display: flex;
    text-align: right;
    padding: 10px 20px;
  }

  .header nav button:hover{
    border: 1px solid black;
    border-radius: 10px;
  }

  .description{
    margin-top: 20%;
    margin-left: 50%;
  }

  .description h2{
    color: rgb(0, 0, 0);
    font-size: 30px;
    font-style: italic;
  }

  .description p{
    color: green;
    font-size: 20px;
  }

</style>