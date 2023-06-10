const loader = document.getElementById("loading");

        function showLoading(){
            loading = setTimeout(showContent => {loader.style.display = "none";
            document.getElementById("myContents").style.display = "block";
            document.body.style.display = "block";}, 1000);
        }

const sidebarButton = document.querySelector(".side-bar");
const sidebarCancelButton = document.querySelector(".close-bar");

function show() {
    sidebarButton.style.display = "flex";
    
}
console.log(sidebarCancelButton,"pass")
sidebarCancelButton.addEventListener('click', (e)=>{
    sidebarButton.style.display = "none";
})