/*const loader = document.getElementById("loading");

        function showLoading(){
            loading = setTimeout(() => {loader.style.display = "none";
            document.getElementById("myContents").style.display = "block"}, 1000);
        }
*/
const sidebarButton = document.querySelector(".side-bar");
const sidebarCancelButton = document.querySelector(".close-bar");


function show() {
    sidebarButton.style.display = "flex";
    
}
sidebarCancelButton.addEventListener('click', (e)=>{
    sidebarButton.style.display = "none";
})

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loading").style.visibility = "visible";
    } else {
        document.querySelector("#loading").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
}



  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
