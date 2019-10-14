// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


function init(){
   // declare variables
   const formEle = document.getElementById("launchForm");  //getElementById("formContainer"); // 
   let pilotName = document.querySelector("input[name = pilotName]");;
   let copilotName = document.querySelector("input[name = copilotName]");// getElementById("copilotName");
   let fuelLevel = document.querySelector("input[name = fuelLevel]");
   let cargoMass = document.querySelector("input[name = cargoMass]");

   // helper functions
   function validate(value,expected){
      let correct = true;
      if (expected === "name"){
         if (value === "" || !isNaN(value) ){
            correct = false;
         } 
      } else if(expected === "number"){
         if (value === "" || isNaN(value) ){
            correct = false;
         }
      }
      
      return correct;
   }

   // submit event
   formEle.addEventListener("submit",function(event){
      console.log(typeof pilotName.value);
      // pilot validation
      if(!validate(pilotName.value,"name") ){
         console.log(`\'${pilotName.value}\' is not a valid value for Pilot Name.  Please try again!`);
         event.preventDefault();
      }

      // copilot validation
      if(!validate(copilotName.value,"name")){
         console.log(`\'${copilotName.value}\' is not a valid value for Co-pilot Name.  Please try again!`);
         event.preventDefault();
         
      }
      
      // fuelLevel validation
      if (!validate(fuelLevel.value,"number")){
         console.log(`\'${fuelLevel.value}\' is not a valid value for Fuel Level.  Please try again!`);
         event.preventDefault();
      }
      
      // cargoMass validdation
      if (!validate(cargoMass.value,"number")){
         console.log(`\'${cargoMass.value}\' is not a valid value for Cargo Mass.  Please try again!`);
         event.preventDefault();
      }
   });

}

window.onload = init;