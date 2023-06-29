$(document).ready(function () {
  let b = true;
  let timeOut = 0;
  $("#message").html("Estamos llamando a la granja");
  let internalID = setInterval(textView, 3000);
  function textView() {
    timeOut += 1;
    if (b) {
      $("#message").html("Obteniendo datos de la granja");
      b = false;
    } else {
      b = true;
      $("#message").html("Creando dashboard :)");
    }
    console.log(timeOut);
    timeOutBackend(timeOut);
  }
  $(".centrado").css("display", "flex");
  $("#wrapper").css("display", "none");

  function timeOutBackend(seconds) {
    if (seconds == 7) {
      timeOut = 0;
      console.log(`Timeout ${timeOut}`);
      $("#message").html("Hemos detectado un problema");
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          // muestra el alerta si se cumple la condición
          Swal.fire({
            title: "Hemos detectado un error",
            showDenyButton: true,
            text: `
            \n1.Por favor, verifique que esté en una red externa al banco   

            

            \n2.Intenta conectar desde otro equipo    

            

            \n3.Descarga la app para Android   
            `,
            icon: "error",
            confirmButtonText: "Descargar la app",
            denyButtonText: `Recargar pagina`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "https://drive.google.com/file/d/1GLqqy7TuPwDUkWFWP_tOItl2VuHuLZaj/view?usp=share_link";
            }else if(result.isDenied){
              window.location.reload()
            }
          });
          console.log(`La dirección IP del usuario es ${data.ip}`);
          console.log(`El usuario está conectado a la red ${data.org}`);
        })
        .catch((error) => console.error(error));
    }
  }

  var apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoianVhbmNhcmxvcy5jb3JvbmFkb0BiYnZhLmNvbSIsImlhdCI6MTY3Nzc5MjIyNCwiZXhwIjoxNjc3NzkyNTI0fQ.wJTbooDvyg8IpmDLjNJKbmrl7-1v-pF4G_1781S4HEU";
  var url = "http://devosfernando.com:38900/api/1";
  var user = {
    email: "juancarlos.coronado@bbva.com",
  };

  var configfurationGraphic = {
    high_chartsIni: "",
    high_chartsFin: "",
  };

  function authorizationToken() {
    $.ajax({
      url: `${url}/auth/securityToken`,
      type: "POST",
      dataType: "json",
      data: user,
      success: function (data) {
        parametry(data.token);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
  }

  function kpiActual(tkn) {
    debugger;
    $.ajax({
      url: `${url}/kpi/prevMonht/kpi`,
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: tkn,
      },
      success: function (data) {
        let array = data.response;
        let fechaKpi = {
          fecha: array[0]["hist_date"].substring(
            0,
            array[0]["hist_date"].indexOf("T")
          ),
          kpi: array[0]["hist_kpiReal"] * 100,
        };
        $("#kpiFecha").html(`Kpi fecha actual: ${fechaKpi.fecha}`);
        $("#kpiyear").html("Kpi año actual");

        ///Creando campos en json para pintar limites de aguja
        configfurationGraphic.kpiEstimado =
          data.response[0]["hist_kpiEstimado"];
        configfurationGraphic.kpiReal = data.response[0]["hist_kpiReal"];
        pintarImg(fechaKpi.kpi.toFixed(2));
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
      complete: function () {
        clearInterval(internalID);
        $(".centrado").css("display", "none");
        $("#wrapper").css("display", "flex");
        //$(".modal").css("display","block")
      },
    });
  }

  function parametry(tkn) {
    $.ajax({
      url: `${url}/kpi/parametry`,
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: tkn,
      },
      success: function (data) {
        configfurationGraphic.high_chartsIni = data.response[0]["value"];
        configfurationGraphic.high_chartsFin = data.response[1]["value"] ;
        kpiActual(tkn);
      },

      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
  }

  function pintarImg(dataF) {
    Highcharts.chart("container", {
      chart: {
        type: "gauge",
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      exporting: {
        enabled: false, // deshabilitar la funcionalidad de exportación -
      },
      credits: {
        enabled: false, // deshabilitar la funcionalidad de créditos
      },

      title: {
        text: "",
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, "#FFF"],
                [1, "#333"],
              ],
            },
            borderWidth: 0,
            outerRadius: "109%",
          },
          {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, "#333"],
                [1, "#FFF"],
              ],
            },
            borderWidth: 1,
            outerRadius: "107%",
          },
          {
            // default background
          },
          {
            backgroundColor: "#DDD",
            borderWidth: 0,
            outerRadius: "105%",
            innerRadius: "103%",
          },
        ],
      },

      // the value axis
      yAxis: {
        min: Number(configfurationGraphic.high_chartsIni),
        max: Number(configfurationGraphic.high_chartsFin),

        minorTickInterval: "auto",
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: "inside",
        minorTickColor: "#666",

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: "inside",
        tickLength: 10,
        tickColor: "#666",
        labels: {
          step: 2,
          rotation: "auto",
        },
        title: {
          text: "",
        },
        plotBands: [
          {
            from: configfurationGraphic.high_chartsIni,
            to: configfurationGraphic.kpiEstimado * 100,
            color: "#DF5353", // red
          },
          {
            from: configfurationGraphic.kpiEstimado * 100,
            to: configfurationGraphic.kpiEstimado * 100 + 1,
            color: "#DDDF0D", // yellow
          },
          {
            from: configfurationGraphic.kpiEstimado * 100 + 1,
            to: configfurationGraphic.high_chartsFin,
            color: "#55BF3B", // greencolor: '#55BF3B' // red
          },
        ],
      },

      series: [
        {
          name: "Kpi",
          data: [Number(dataF)],
          tooltip: {
            valueSuffix: "",
          },
        },
      ],
    });
  }
  authorizationToken();
});
