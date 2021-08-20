console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const getAllEvents = async () => {
    const r = await gql(`{ allEvents { title, eventdate, starttime, price }}`);
    const allEvents = r.allEvents;
    console.log(allEvents);

    const events = document.getElementById("events");

    for (let i = 0; i < allEvents.length; i++) {
        // Create Div for Event --
        let eventDiv = document.createElement("div");
        eventDiv.className = "eventTitle";

        // Create Event Title Text --
        let eventTitle = document.createElement("p");
        eventTitle.className = "eventTitle";
        eventTitle.innerText = allEvents[i].title;
        eventDiv.appendChild(eventTitle);

        // Create Event Date Text --
        let eventdate = document.createElement("p");
        eventdate.className = "eventdate";
        eventdate.innerText = allEvents[i].eventdate;
        eventDiv.appendChild(eventdate);

        // Create Price Text --
        let price = document.createElement("p");
        price.className = "price";
        // Needs logic for FREE events --
        const output = allEvents[i].price.charAt(0) === "$" ? allEvents[i].price : "$" + allEvents[i].price;
        price.innerText = output;
        eventDiv.appendChild(price);

        // Create Start Time Text --
        let startTime = document.createElement("p");
        startTime.className = "eventDetails";
        startTime.innerText = allEvents[i].starttime;
        eventDiv.appendChild(startTime);

        // Modify DOM --
        events.appendChild(eventDiv);
    }
}

getAllEvents();