if (window.location.pathname != "/login.html") {
  if (dataSession == null || dataSession == "") {
    window.location.href = "login.html";
  } else {
    let photo = JSON.parse(dataSession)["photoURL"];
    let name = JSON.parse(dataSession)["email"];
    console.log("FOTOOOOOOS");
    console.log(photo);
    var photoUser = document.getElementById("userDropdown");
    photoUser.innerHTML = `
    <span
      class="mr-2 d-none d-lg-inline text-gray-600 small"
      id="nameUser"
      >${name}</span
    >
    <img
    class="img-profile rounded-circle"
    src="${photo}"
    />
    `

  }
}

$("#loginGoogle").click(() => {
  console.log("Entra");

  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((res) => {
      console.log("GOOGLE SIGN IN");
      console.log(res);
      console.log("SEPARANDO DATOS");
      console.log(res.user.displayName);
      console.log(res.user.email);
      console.log("DATOS DE CREDENTIAL");
      console.log(res.credential.accessToken);
      console.log("PHOTO URL");
      console.log(res.user.photoURL);

      if (
        res.user.email.substring(res.user.email.indexOf("@")).toUpperCase() ===
        "@BBVA.COM"
      ) {
        Swal.fire({
          title: "Bienvenido",
          text: `${res.user.displayName}`,
          icon: "success",
          confirmButtonText: "Ir",
        }).then((result) => {
          if (result.isConfirmed) {
            let dUAuth = {
              jwt: res.credential.accessToken,
              email: res.user.email,
              photoURL: res.user.photoURL,
            };
            sessionStorage.setItem("duAuth", JSON.stringify(dUAuth));
            window.location.href = "index.html";
          }
        });
      }
    })
    .cacth((err) => {
      console.log("ERROR SIGN IN");
      console.log(err);
    });

  // Obtiene la URL base
  console.log(urlBase);
  console.log(window.location.pathname);
});

$("#logOut").click(() => {
  auth
    .signOut()
    .then((lg) => {
      console.log("Sign out");
      window.location.href = "login.html";
    })
    .catch((e) => {
      console.log(e);
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Ingresa en la app");
  } else {
    console.log("Sale de la app");
  }
});
