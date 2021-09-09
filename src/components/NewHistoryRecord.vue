<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <div style="padding: 10px">
    <span
      ><i><strong>¡Bienvenido!</strong></i> Doctor
    </span>
  </div>

  <div 
    class="container"
    style="
      align-items: center;
      padding: 50px;
      width: 70%;
      margin: 0 auto;
      border-radius: 15px;
      margin-top: 100px;
      background-image:Fondo.jpg;
    "
  >
    <div
      style="
        background-color: rgb(243, 243, 243);
        padding: 30px;
        border-radius: 15px;
      "
    >
      <div
        class="row"
        style="
          position: relative;
          left: 0px;
          top: -50px;
          background-color: rgb(159, 197, 233);
          width: max-content;
          padding: 5px;
          border-radius: 10px 10px 10px 10px;
          width: 70%;
        "
      >
        <div
          style="
            position: relative;
            left: 0px;
            bottom: -5px;
            background-color: rgb(184, 161, 86);
            width: max-content;
            padding: 5px;
            border-radius: 10px 10px 0px 0px;
          "
        >
          Consultas registradas
        </div>
        <div
          style="
            position: relative;
            left: 0px;
            bottom: -5px;
            background-color: rgb(254, 217, 100);
            width: max-content;
            padding: 5px;
            border-radius: 10px 10px 0px 0px;
          "
        >
          Registrar consulta
        </div>
      </div>
      <div
        style="
          background-color: #fff;
          padding: 30px 10px;
          border-color: black;
          border-width: 1px;
          border-style: solid;
          border-radius: 50px;
          text-align: left;
        "
      >
        <h1 style="text-align: center">Historía Clínica N 111</h1>
        <div
          class="row"
          style="text-align: center; padding: 10px; margin-bottom: 10px"
        >
          <div class="col-md-4" style="padding: 10px">
            <select style="height: 100%; width: 100%">
              <option>Cédula de Ciudadanía</option>
              <option>Registro civil</option>
              <option>EX</option>
            </select>
          </div>
          <div class="col-md-4" style="padding: 10px">
            <input id="cedula" style="width: 100%; height: 100%" placeholder="Ingrese documento"/>
          </div>
          <div class="col-md-4" style="padding: 10px">
            <button class="btn btn-primary"
            style=" width: 100%; border-radius: 15px;background-color: rgb(159, 197, 233); "
            v-on:click="consultar()"> consultar </button>
          </div>
        </div>

        <div id="FormularioConsulta" class="container" hidden>
          <div class="row" style="margin-bottom: 10px">
            <div class="col-md-4">
              <input id="nombre" class="deshabilitado" type="text"  placeholder="Nombres" style="width: 100%"  disabled />
            </div>

            <div class="col-md-4">
              <input id="nacimiento" class="deshabilitado" type="date" value="1997-11-11" style="width: 100%"  disabled />
              </div>

            <div class="col-md-4">
              <input id="edad" class="deshabilitado" type="text" value="20 años" style="width: 100%" placeholder="Edad" disabled />
            </div>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <div class="col-md-4">
              <input id="sexo" class="deshabilitado" type="text" value="Femenino"  placeholder="Sexo" style="width: 100%" disabled />
            </div>

            <div class="col-md-4">
              <input id="ocupacion" class="deshabilitado" type="text" value="Estudiante" placeholder="Ocupación" style="width: 100%" disabled />
            </div>

            <div class="col-md-4">
              <input id="direccion" class="deshabilitado" type="text" value="Calle 1 # 1 - 1"  placeholder="Dirección" style="width: 100%" disabled/> 
            </div>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <div class="col-md-4">
              <input id="sintoma" class="deshabilitado" type="text" value="Anemia" placeholder="Síntomas" style="width: 100%" disabled />
            </div>

            <div class="col-md-4">
              <input id="procedimiento" class="deshabilitado" type="text" value="Apendicectomía" placeholder="Procedimientos" style="width: 100%" disabled/>
            </div>

            <div class="col-md-4">
              <input id="diagnostico" class="deshabilitado" type="text" value="Diabétes" placeholder="Diagnóstico" style="width: 100%" disabled />
            </div>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <div class="col-md-12">
              <input type="text" placeholder="Motivo de la consulta, exámenes y diagnóstico (Separados por punto y coma)" style="width: 100%" />
            </div>
          </div>

          <div class="row" style="margin-bottom: 10px">
            <div class="col-md-8">
              <textarea type="text" placeholder="Tratamiento" style="width: 100%" ></textarea>
            </div>

            <div class="col-md-4">
              <button class="btn btn-primary" style=" width: 90%;border-radius: 15px; background-color: rgb(159, 197, 233);" v-on:click="guardar()">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import gql from "graphql-tag";
var action = "";
export default {
  name: "welcome",
  mounted: function () {
    window.setTimeout(function () {
      $(".logo").css("opacity", 0);
    }, 1000);
  },
  methods: {
    consultar() {
    let cc = $("#cedula").val();
      this.$apollo.query({
          query: gql`
            query Query($infoByUserIdDni: String!) {
                  infoByUserId(dni: $infoByUserIdDni) {
                    userId
                    dni
                    timeBorn
                    typeDni
                    age
                    occupation
                    lastChange
                }
                }
          `,
          variables: {
            infoByUserIdDni: cc,
          },
        })
        .then((result) => {
          let data = result.data.infoByUserId;
          console.log(data)
          if(data.length==0){
            action = "crear";
            alert("Paciente no registrado, por favor regístrelo");
            $(".deshabilitado").removeAttr("disabled");
            $(".deshabilitado").val("");
          }
          else{
            let info= data[0];
            console.log(info)
            $("#nombre").val("Usuario " + info.userId)
            $("#nacimiento").val(info.timeBorn)
            $("#edad").val(info.age)
            $("#ocupacion").val(info.occupation)
            $("#sexo").val("femenino");
            $("#direccion").val("Cra 5a # 5-5");
            $("#sintoma").val("Dolor de estómago")
            this.$apollo.query({
                                query: gql`
                                    query Query($historyByDniDni: String!) {
                                        historyByDni(dni: $historyByDniDni) {
                                            treatment
                                            diagnostic
                                        }
                                        }
                                `,
                                variables: {
                                    historyByDniDni: cc,
                                },
            }).then((result) => {
                let data = result.data.historyByDni.at(-1);
                $("#procedimiento").val(data.treatment)
                $("#diagnostico").val(data.diagnostic)
            });
          }
          $("#FormularioConsulta").removeAttr("hidden");
          $("#FormularioConsulta").show()
        })
        .catch((error) => {
          console.log(error);
        });

    },
    guardar() {
        if(action=="crear"){
            this.$apollo.mutate({
            mutation: gql`
            mutation Mutation($createinfoInfo: Informacion!) {
            createinfo(info: $createinfoInfo) {
                userId
            }
            }
          `,
          variables: {
            createinfoInfo: {
            userId: "007",
            dni: "1114",
            typeDni: "CC",
            timeBorn: "2000-01-01",
            age: "26",
            occupation: "Estudiante",
            lastChange: "2022-01-01"}
          }
        }).then((result)=>{
            console.log(result.data.createinfo.userId)
            $("#FormularioConsulta").hide();
        }).catch((error) => {
          alert(error);
        });
        
        }    
        if(action!="crear"){
             $("#FormularioConsulta").hide();
        }
        },
  },
};
</script>

<style>
.auth_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  background-image: url("Fondo.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_auth_user {
  border: 3px solid #283747;
  border-radius: 10px;
  width: 25%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth_user h2 {
  color: #283747;
}

.auth_user form {
  width: 100%;
}

.auth_user input {
  /* height: 40px;
  width: 100%; */

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 5px;

  border: 1px solid #283747;
}

.auth_user button {
  width: 100%;
  height: 40px;

  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0;
}

.auth_user button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}

.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
}

.button {
  margin-top: 10px;
  /* width: 100%; */
  /* height: 5%; */
  border-radius: 15px;
  background-color: rgb(159, 197, 233);
}
.vertical-center .row {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>