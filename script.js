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

