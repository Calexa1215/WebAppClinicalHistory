<template>
    <div id="ConsultUser" class="consultuser">
        <div class="login">
            <section class="login__container">
                <h2>iniciar</h2>
                <form v-on:submit.prevent="processAuthUser">
                    <h3>Documento :</h3>
                    <input class="input" type="text" v-model="user_in.username" placeholder="Documento de identidad">
                    <h3>nose:</h3>
                    <input class="input" type="password" v-model="user_in.password" placeholder="*******">
                    
                    <button class="submit">Iniciar</button>
                   
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
                <img src="./Loginimg.png" >
            </section>
        </div> 
    </div>

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
            console.log(this.user_in)
            await this.$apollo.mutate({
                mutation: gql`
                mutation ($authenticateCredentials: CredentialsInput!) {
                authenticate(credentials: $authenticateCredentials) {
                access
                refresh
                }
                }`,
                variables:{
                authenticateCredentials: this.user_in
                }

            }).then((result) => { console.log(result)
            let data = result.data.authenticate
            }).catch((error)=>{
                alert("Usuario o contraseña incorrectos")
                });


        }
    }
}


</script>

<style>
    #User{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;    
        align-items: center;
    }

    #User h2{
        font-size: 50px;
        color: #283747;
    }

    #User span{
        color: crimson;
        font-weight: bold;
    }
</style>