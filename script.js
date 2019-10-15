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
   let pilotName = document.querySelector("input[name = pilotName]");
   let copilotName = document.querySelector("input[name = copilotName]");// getElementById("copilotName");
   let fuelLevel = document.querySelector("input[name = fuelLevel]");
   let cargoMass = document.querySelector("input[name = cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");


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

   function notReady(){
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }

   // submit event
   formEle.addEventListener("submit",function(event){
      console.log(typeof pilotName.value);
      // pilot validation
      if(!validate(pilotName.value,"name") ){
         alert(`\'${pilotName.value}\' is not a valid value for Pilot Name.  Please try again!`);
         event.preventDefault();
      }

      // copilot validation
      else if(!validate(copilotName.value,"name")){
         alert(`\'${copilotName.value}\' is not a valid value for Co-pilot Name.  Please try again!`);
         event.preventDefault();
         
      }
      
      // fuelLevel validation
      else if (!validate(fuelLevel.value,"number")){
         alert(`\'${fuelLevel.value}\' is not a valid value for Fuel Level.  Please try again!`);
         event.preventDefault();
      }
      
      // cargoMass validdation
      else if (!validate(cargoMass.value,"number")){
         alert(`\'${cargoMass.value}\' is not a valid value for Cargo Mass.  Please try again!`);
         event.preventDefault();
      }

      // add pilot/copilot name to shuttle requirements
      pilotStatus.innerHTML = `${pilotName.value} ready`;
      copilotStatus.innerHTML = `${copilotName.value} ready`;

      // update fuel level status if less than 10,000
      if (fuelLevel.value < 10000){
         fuelStatus.innerHTML = "There is not enough fuel for the journey";
         // launchStatus.innerHTML = "Shuttle not ready for launch";
         // launchStatus.style.color = "red";
         notReady();
      }

      // update cargo mass status if more than 10,000
      else if (cargoMass.value > 10000){
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         notReady();
      }

      else {
         launchStatus.innerHTML = "Shuttle is ready for launch!";
         launchStatus.style.color = "green";
      }


      // unhide faulty items
      faultyItems.style.visibility = "visible";
      event.preventDefault();  //for testing?
   });

}

window.onload = init;