let dataSession = sessionStorage.getItem("duAuth");

if (window.location.pathname != "/login.html") {
    if (dataSession == null || dataSession == "") {
      window.location.href = "login.html";
    } 
}