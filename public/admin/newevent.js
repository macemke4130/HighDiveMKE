import { gql, auth, logOut } from "../utils.js";

const whoIs = auth();

let title = document.getElementById("title");
let eventdate = document.getElementById("eventdate");
let starttime = document.getElementById("starttime");
let endtime = document.getElementById("endtime");
let price = document.getElementById("price");
let eventlink = document.getElementById("eventlink");
let ticketlink = document.getElementById("ticketlink");
let description = document.getElementById("description");

const newEvent = async (e) => {
    e.preventDefault();

    const r = await gql(` { 
        newEvent
        (
        title: "${title.value}", 
        eventdate: "${eventdate.value}", 
        starttime: "${starttime.value}", 
        endtime: "${endtime.value}", 
        price: "${price.value}",
        eventlink: "${eventlink.value}",
        ticketlink: "${ticketlink.value}",
        description: "${description.value}" 
        )
        { insertId } }`, "admin");

    console.log(r);
}

document.getElementById("newevent").onsubmit = newEvent;
document.getElementById("submit").onclick = newEvent;