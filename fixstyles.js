(function fixstyles (){
var element = document.querySelector("#register-city");
var xs = document.querySelector(".form-field.text-city label")
console.log("hola1")
function setDisplay() {
 if(!element.value== "")
   xs.classList.remove("focus-out")
   xs.classList.remove("focus-in")
   console.log("hola3")
  }

  
 setDisplay()

const observer = new MutationObserver(() => {
 setDisplay();
 console.log("hola2")

});
// Opcions para el observer
const observerOptions = {
attributes: true,
childList: true,
subtree: true,
characterData: false,
attributeOldValue: false,
characterDataOldValue: false
};
observer.observe(element, observerOptions);
})(); 
