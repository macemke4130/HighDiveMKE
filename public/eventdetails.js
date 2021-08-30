console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const id = window.location.search.split("id=")[1];

const eventContainer = document.getElementById("event");
const h2 = document.getElementsByTagName("h2")[0];
const eventdate = document.getElementById("eventdate");
const starttime = document.getElementById("starttime");
const price = document.getElementById("price");

const getEvent = async () => {
    const r = await gql(`{ event (id: ${id}) { 
        title,
        eventdate, 
        starttime,
        endtime,
        price,
        eventlink,
        ticketlink,
        description
    }}`);
    const event = r.event;
    console.log(event);

    h2.innerText = event.title;
    eventdate.innerText = event.eventdate;
    starttime.innerText = event.endtime ? event.starttime + " - " + event.endtime : event.starttime;
    price.innerText = event.price;

    if ( event.eventlink ) {
        const eventlink = document.createElement("a");
        eventlink.innerText = "Facebook Event";
        eventlink.href = event.eventlink;
        eventlink.target = "_blank";
        eventContainer.appendChild(eventlink);
    }

    if ( event.ticketlink ) {
        const ticketlink = document.createElement("a");
        ticketlink.innerText = "Buy Tickets";
        ticketlink.className = "buyticketsbutton";
        ticketlink.href = event.ticketlink;
        ticketlink.target = "_blank";
        eventContainer.appendChild(ticketlink);
    }

    if ( event.description ) {
        const description = document.createElement("p");
        description.innerText = event.description;
        eventContainer.appendChild(description);
    }
}

getEvent();