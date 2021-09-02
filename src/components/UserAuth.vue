<template>

<body>
    <div id="AuthUser" class="auth_user">
        <div class="login">
            <section class="login__container">
                <h2>Inicia Sesión</h2>
                <form v-on:submit.prevent="processAuthUser">
                    <h3>Documento de identidad:</h3>
                    <input class="input" type="text" v-model="user_in.username" placeholder="Documento de identidad">
                    <h3>Contraseña:</h3>
                    <input class="input" type="password" v-model="user_in.password" placeholder="*******">
                    <button class="buttom">Iniciar sesión</button>
                    <div class="login__container--remember-me">
                        <label>
                            <input type="checkbox" name="" id="cbox1" value="checkbos">Recuerdame
                        </label>
                        <a href="/">Olvidé mi contraseña</a>
                    </div>
                </form>
                <p class="login__container--register">No tienes ninguna cuenta <a href="">Regístrate</a></p>
            </section>
            <section class="img__container">
                <img src="../assets/img/Loginimg.png" alt="">
            </section>
        </div> 
    </div>
</body>

</template>

<script>

import gql from 'graphql-tag'
import jwt_decode from "jwt-decode"

export default {

    name:"UserAuth",

    data: function(){
        return{
            user_in: {
                username:"",
                password:"",
            }
        }
    },



    methods: {
        processAuthUser: async function(){
            await this.$apollo.mutate({
                mutation: gqlql`
                mutation Mutation($authenticateCredentials: CredentialsInput!) {
                authenticate(credentials: $authenticateCredentials) {
                access
                refresh
                }
                }`,
                variables:{
                authenticateCredentials: this.user_in
                }

            }).them((result) => {  }).catch((error)=>{
                alert("Usuario o contraseña incorrectos")
                });


        }
    }
}

</script>




<style>
    .auth_user{
        display: flex;
        justify-content: center;
    }
    .login{
        background-color: white;
        width: 800px;
        display: flex;
        align-items: center; 
        justify-content: center;
        padding: 0px 30px;  
        margin-top: 70px;
        min-height: calc(100vh - 400px);  /* Altura permanece igual por mas grande que sea el alto de la pantalla (100 vH = view hight, indica el porcentaje que ve el usuario) 200px */
    }

    .login__container {
        padding: 60px 68px 40px;
        min-height: 400px;
        width: 300px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        text-align: justify;
    }
    /* .img__container {
        padding: 60px 68px 40px;
        min-height: 500px;
        width: 300px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        text-align: justify;
    } */

    .img__container img {
        margin: 0;
        height: 600px;
        width: 400px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        text-align: justify;

    }
    

    .login__container h3{
        color: black;
    }
    .login__container h2{
        font-size: 40px;
        font-weight: bold;
        color: rgb(85, 95, 192);
        margin-left: 60px;
    }

    .login__container p{
        color:black;
    }

    .login__container--form{
        display: flex;
        flex-direction: column;
    }
    .login__container--label{
        font-size: 14px;
    }

    .login__container--remember-me {
        color: black;
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }

    .login__container--remember-me a {
        color: black;
        font-size: 14px;
        text-decoration: none;
    }

    .login__container--remember-me a:hover {
        color: rgb(85, 95, 192);
        font-size: 14px;
        text-decoration: underline;
    }

    .login__container--register {
        font-size: 14px;
    }

    .login__container--register a {
        font-size: 16px;
        color:rgb(85, 95, 192);
        font-weight: bold;
        text-decoration: none;
    }

    .login__container--register a:hover {
        text-decoration: underline;
    }
    .input{ 
        border-radius: 8px;
        font-family: 'Mulish', sans-serif;
        font-size: 20px;
        margin-bottom: 20px;
        padding: 0px 30px;
    }

    .buttom{
        background-color: rgb(121, 173, 42);
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        font-family: 'Mulish', sans-serif;
        height: 50px;
        width: 300px;
        letter-spacing: 1px;
        margin: 50px 0px;
    }

    ::placeholder{
        font-size: 15px;
    }
</style>