import { gql, auth } from "../utils.js";

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    document.getElementById("username").innerText = "Hi " + whoIs.username.charAt(0).toUpperCase() + whoIs.username.slice(1);
    app();
}

const app = async () => {
    const r = await gql(`{ allTaps(admin: true) { id, tapname, active } }`, "admin");
    const allTaps = r.allTaps;
    console.log(allTaps);
    
    // Input Source for Dom Manipulation --
    const main = document.getElementById("allTaps");

    // Loop through all taps --
    for (let i = 0; i < allTaps.length; i++) {
        // Create Row Div --
        let tapRow = document.createElement("div");
        tapRow.className = i % 2 === 0 ? "tapRow black" : "tapRow grey";

        // Create Tap Name Text --
        let tapName = document.createElement("p");
        tapName.className = allTaps[i].active ? "tapName" : "tapName redText";
        tapName.innerText = allTaps[i].tapname;
        tapRow.appendChild(tapName);

        // Create Controls Div --
        let controls = document.createElement("div");
        controls.className = "controls";
        tapRow.appendChild(controls);

        // Create Activate Button --
        let activeateButton = document.createElement("button");
        activeateButton.innerText = allTaps[i].active ? "Deactivate" : "Activate";
        
        // Create Activate Link -- 
        let activateLink = document.createElement("a");
        const activatePath = "./activate.html?id=" + allTaps[i].id;
        activateLink.href = allTaps[i].active ? activatePath + "&active=false" : activatePath + "&active=true";
        activateLink.appendChild(activeateButton);
        controls.appendChild(activateLink);

        // Create Edit Button --
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        
        // Create Edit Link -- 
        let editLink = document.createElement("a");
        editLink.href = "./edit.html?id=" + allTaps[i].id;
        editLink.appendChild(editButton);
        controls.appendChild(editLink);

        tapRow.appendChild(controls);
        main.appendChild(tapRow);
    }
}

loggedIn();

