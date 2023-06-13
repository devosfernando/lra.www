$(document).ready(function () {
  var apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoianVhbmNhcmxvcy5jb3JvbmFkb0BiYnZhLmNvbSIsImlhdCI6MTY3Nzc5MjIyNCwiZXhwIjoxNjc3NzkyNTI0fQ.wJTbooDvyg8IpmDLjNJKbmrl7-1v-pF4G_1781S4HEU";
  var url = "http://192.168.0.200:38900/api/1";
  var user = {
    email: "juancarlos.coronado@bbva.com",
  };

  function authorizationToken() {
    $.ajax({
      url: `${url}/auth/securityToken`,
      type: "POST",
      dataType: "json",
      data: user,
      success: function (data) {
        kpiYear(data.token);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); // Imprimimos el error en la consola en caso de fallar
      },
    });
  }

  function kpiYear(tkn) {
    $.ajax({
      url: `${url}/kpi/year`,
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: tkn,
      },
      success: function (data) {
        let array = data.response
        pintarImg(array);
        //console.log(data); // Imprimimos los datos de la respuesta en la consola
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown); // Imprimimos el error en la consola en caso de fallar
      },
    });
  }



  function pintarImg(dataF) {


    // Set new default font family and font color to mimic Bootstrap's default styling
    (Chart.defaults.global.defaultFontFamily = "Nunito"),
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = "#858796";

    // Area Chart Example
    var ctx = document.getElementById("myAreaChart");

    let dataKpiReal = []
    let dataKpiEstimado = []

    dataF.forEach(element => {
        //console.log(element)

        dataKpiEstimado.push(element["kpiestimado"])
        
        if(element["kpireal"] == 0){
          dataKpiReal.push(null)
        }else{
          dataKpiReal.push(element["kpireal"])
        }



    });

    console.log(dataKpiEstimado)

    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Kpi Real",
            lineTension: 0.1,
            backgroundColor: "rgba(45,204,205, 0.05)",
            borderColor: "rgba(45,204,205, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba( 45,204,205, 1)",
            pointBorderColor: "rgba( 45,204,205, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: dataKpiReal
          },
          {
            label: "Kpi Estimado",
            lineTension: 0.5,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: dataKpiEstimado ,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              time: {
                unit: "date",
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                maxTicksLimit: 7,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
              },
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: "#6e707e",
          titleFontSize: 14,
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel =
                chart.datasets[tooltipItem.datasetIndex].label || "";
              return datasetLabel + ": " + tooltipItem.yLabel;
            },
          },
        },
      },
    });
  }
  authorizationToken();

});
