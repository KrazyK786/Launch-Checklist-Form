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
   let missionTarget = document.getElementById("missionTarget");

   let origFuelStatus = fuelStatus.textContent;
   let origCargoStatus = cargoStatus.textContent;

   let jsonObjarr = [];
   
   // helper functions
   function updateMissionTarget(){
      let randomIndex = Math.floor(Math.random() * jsonObjarr.length);
      let planet = jsonObjarr[randomIndex];

      let template = `
      <h2>Mission Destination</h2>
      <ol>
         <li>Name: ${planet.name}</li>
         <li>Diameter: ${planet.diameter}</li>
         <li>Star: ${planet.star}</li>
         <li>Distance from Earth: ${planet.distance}</li>
         <li>Number of Moons: ${planet.moons}</li>
      </ol>
      <img src="${planet.image}">
      `;

      missionTarget.innerHTML = template;
   }

   function getJSON(){
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
         response.json().then(function(json){
            // let jsonObjarr = [];
            // let jsonContainer = JSON.parse(json);
            console.log(json[0]);

            for (let i = 0; i <json.length; i++){
               // let jsonContainer = JSON.parse(json[i]);
               let tempObj = {};
               for (let key in json[i]){
                  tempObj[key] = json[i][key];
               }
               jsonObjarr[i] = tempObj;
            }
            
            // return jsonObjarr;
            updateMissionTarget();
         });
      });
      // console.log(jsonObjarr);
   }

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
         // if faultyItems is already visible, re-hide
         if (faultyItems.style.visibility === "visible"){
            faultyItems.style.visibility = "hidden";
            launchStatus.innerHTML = "";
         }

         alert("All fields are required!");

         event.preventDefault();
         correct = false;
      }
      
      else if (!isNaN(pilotName.value) || !isNaN(copilotName.value) || pilotName.value < 1 || copilotName.value < 1 || fuelLevel.value < 0 || cargoMass.value < 0){
         
         // if faultyItems is already visible, re-hide
         if (faultyItems.style.visibility === "visible"){
            faultyItems.style.visibility = "hidden";
            launchStatus.innerHTML = "";
         }
         
         alert("Make sure to enter valid information for each field!");

         event.preventDefault();
         correct = false;
      }

      return correct;
   }

   function showFaultyItems(){
      let ready = true;
      // add pilot/copilot name to shuttle requirements
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready`;
      copilotStatus.innerHTML = `Pilot ${copilotName.value} is ready`;

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

      return ready;
   }


   // submit event
   formEle.addEventListener("submit",function(event){
      
      // perform validation check
      if (isValid()){
         // update/display faulty items section
         let readyForLaunch = showFaultyItems();
         if (readyForLaunch){
            getJSON();
            console.log(jsonObjarr);
            // updateMissionTarget();
         }
      }
   });

}

window.onload = init;