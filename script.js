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
   const formEle = document.getElementById("launchForm");  
   const button = document.getElementById("formSubmit");
   let pilotName = document.querySelector("input[name = pilotName]");
   let copilotName = document.querySelector("input[name = copilotName]");
   let fuelLevel = document.querySelector("input[name = fuelLevel]");
   let cargoMass = document.querySelector("input[name = cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");

   let origFuelStatus = fuelStatus.textContent;
   let origCargoStatus = cargoStatus.textContent;


   // helper functions
   function hasValue(value){
      let correct = true;
      if(value === ""){
         correct = false;
      }
      return correct;
   }

   // update heading of faultyItems 
   function notReady(){
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }

   function isValid(){
      let correct = true;
      if(!hasValue(pilotName.value) || !hasValue(copilotName.value) || !hasValue(fuelLevel.value) || !hasValue(cargoMass.value)){
         alert("All fields are required!");
         event.preventDefault();
         correct = false;
      }
      
      else if (!isNaN(pilotName.value) || !isNaN(copilotName.value) || pilotName.value < 1 || copilotName.value < 1 || fuelLevel.value < 0 || cargoMass.value < 0){
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
         correct = false;
      }

      return correct;
   }

   function showFaultyItems(){
      let ready = true;
      // add pilot/copilot name to shuttle requirements
      pilotStatus.innerHTML = `${pilotName.value} ready`;
      copilotStatus.innerHTML = `${copilotName.value} ready`;

      // update fuel level status if less than 10,000 -else resets innerhtml in case form was resubmitted
      if (fuelLevel.value < 10000){
         fuelStatus.innerHTML = "There is not enough fuel for the journey";
         notReady();
         ready = false;
      }
      else {
         fuelStatus.innerHTML = origFuelStatus;
      }

      // update cargo mass status if more than 10,000 -else resets innerhtml in case form was resubmitted
      if (cargoMass.value > 10000){
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         notReady();
         ready = false;
      }
      else {
         cargoStatus.innerHTML = origCargoStatus;
      }

      if (ready) {
         launchStatus.innerHTML = "Shuttle is ready for launch!";
         launchStatus.style.color = "green";
      }

      // unhide faulty items
      faultyItems.style.visibility = "visible";
      event.preventDefault();
   }


   // submit event
   formEle.addEventListener("submit",function(event){
      
      // perform validation check
      if (isValid()){
         // update/display faulty items section
         showFaultyItems();
      }
   });

}

window.onload = init;