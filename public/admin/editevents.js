import { gql, auth, logOut } from "../utils.js";

const whoIs = auth();

const app = async () => {
    const r = await gql(`{ allEvents { id, title, eventdate } }`, "admin");
    const allEvents = r.allEvents;
    
    // Input Source for Dom Manipulation --
    const main = document.getElementById("allEvents");

    // Loop through all taps --
    for (let i = 0; i < allEvents.length; i++) {
        // Create Row Div --
        let eventRow = document.createElement("div");
        eventRow.className = i % 2 === 0 ? "eventRow black" : "eventRow grey";

        // Create Event Title Text --
        let eventTitle = document.createElement("p");
        eventTitle.className = "eventTitle";
        eventTitle.innerText = allEvents[i].title + " - " + allEvents[i].eventdate;
        eventRow.appendChild(eventTitle);

        // Create Controls Div --
        let controls = document.createElement("div");
        controls.className = "controls";
        eventRow.appendChild(controls);
        
        // Create Edit Link -- 
        let editLink = document.createElement("a");
        editLink.href = "./editevent.html?id=" + allEvents[i].id;
        editLink.innerText = "Edit";
        controls.appendChild(editLink);

        eventRow.appendChild(controls);
        main.appendChild(eventRow);
    }
}

app();

document.getElementById("logout").onclick = logOut;