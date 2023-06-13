function callApi(){
  $.ajax({
    url: `http://devosfernando.com:38900/api/1/auth/parametry/data`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log("MENSAJE DESDE KEY AJAX")
      console.log(data.response)
      dataFront(data.response)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown); // Imprimimos el error en la consola en caso de fallar
    },
  });
}

function dataFront(data) {


  var firebaseConfig = {
    apiKey: data[6],
    authDomain: data[5],
    projectId: data[4],
    storageBucket: data[3],
    messagingSenderId: data[2],
    appId: data[1],
    measurementId: data[0],
  };

  console.log("MENSAJE DESDE KEY")
  console.log(firebaseConfig)



  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
}

callApi();
