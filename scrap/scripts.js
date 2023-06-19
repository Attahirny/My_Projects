
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();

  let handler = PaystackPop.setup({
    key: 'pk_test_008bcb971b718291c9cfd72207fe89255c2001a9', // Replace with your public key
    email: document.getElementById("email-address").value,
    amount: document.getElementById("amount").value * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);
    }
  });

  handler.openIframe();
}

const imgs =   document.querySelectorAll('.anyjr');


const preview = document.querySelector('.popup-gallery');
const right_button = document.querySelector(".move-right");
const left_button = document.querySelector(".move-left");
let previewed;

imgs.forEach((img, index) => {
    img.addEventListener('click', function(e) {
        preview.style.display = 'block';        
        previewed = index;
        img.classList.add("gallery-item");
        img.onclick = ()=> {this.requestFullscreen()}
        document.querySelector(`.img${index+1} img`).style.width = "80vw";
        document.querySelector(`.img${index+1} img`).style.height = "80vh";
        img.style.height = "auto";
        img.style.width = "auto";
        left_button.style.display = 'grid';
        right_button.style.display = 'grid';

  });
})


function left(){
  imgs[previewed].classList.remove("gallery-item");  
  document.querySelector(`.img${previewed+1} img`).style.width = "auto";
  document.querySelector(`.img${previewed+1} img`).style.height = "100%";
  previewed = check_left(previewed);
  imgs[previewed].classList.add("gallery-item");  
  document.querySelector(`.img${previewed+1} img`).style.width = "80vw";
  document.querySelector(`.img${previewed+1} img`).style.height = "80vh";
  imgs[previewed].style.height = "auto";
  imgs[previewed].style.width = "auto";
}

function right(){
  imgs[previewed].classList.remove("gallery-item");  
  document.querySelector(`.img${previewed+1} img`).style.width = "auto";
  document.querySelector(`.img${previewed+1} img`).style.height = "100%";
  previewed = check_right(previewed);
  imgs[previewed].classList.add("gallery-item");  
  document.querySelector(`.img${previewed+1} img`).style.width = "80vw";
  document.querySelector(`.img${previewed+1} img`).style.height = "80vh";
  imgs[previewed].style.height = "auto";
  imgs[previewed].style.width = "auto";
}

function check_left(num){
  if (num === 0) {
    return imgs.length-1
  }
  else {
    return num-1
  }
}

function check_right(num){
  if (num === imgs.length-1) {
    return 0;
  }
  else {
    return num+1;
  }
}

document.addEventListener('keydown', (event)=>{
  if (event.key === 'ArrowLeft'){
    left();
  } else if (event.key === 'ArrowRight') {
    right();
  } else if (event.key === 'ArrowDown') {
    left();
  } else if (event.key === 'ArrowUp') {
    right();
  }
})

function do_it(){    
  preview.style.display = 'none';
  imgs[previewed].classList = `img${previewed+1}`;  
  document.querySelector(`.img${previewed+1} img`).style.width = "auto";
  document.querySelector(`.img${previewed+1} img`).style.height = "100%";
  right_button.style.display = 'none';
  left_button.style.display = 'none';
}
/*
function callback(result){
  console.log("Async Operation", result)
}
setTimeout(response => callback(response),2000)

fetchResource(url, successCallback, failureCallback)
function successCallback(result){
  console.log("resource found", result);
}
function failureCallback(error){
  console.error("resource Not found", error);
}

const promise = new Promise((resolve, reject) => {
  const num = 10;
  if (num >= 5) {
    setTimeout(() => resolve("promise fulfiled"),2000);
  } else {
    reject("promises failed!");
  }
  //setTimeout(() => resolve("Done!"), 2000);
});

function handleResolve(value){
  console.log(value);
}

function handleReject(reason) {
  console.error(reason);
}

promise.then(handleResolve, handleReject)


const promise1 = new Promise((resolve, reject) => {
  const num = 10;
  if (num >= 5) {
    setTimeout(() => reject("promise fulfiled"),2000);
  } else {
    resolve("promises failed!");
  }
  setTimeout(() => reject("Done!"), 2001);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promise fulfiled"),2000); 
    //reject("promises failed!");
  
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("promises failed!"),3000);

});

Promise.any([promise1, promise2, promise3]).then(value => {console.log(value)})
.catch((error)=>{console.error(error)})*/


async function example(){
try {
  const response = await new Promise(resolve => setTimeout( () => resolve("yeessss"),2000))
  const result = await response.length;
  console.error(result);
} catch (error) {
  console.log( `${error} found`)
} finally {
  console.log("hehe")
}
}
example()

