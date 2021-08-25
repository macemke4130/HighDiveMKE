import { gql, auth, logOut } from "../utils.js";

const whoIs = auth();

let title = document.getElementById("eventtitle");
let eventdate = document.getElementById("eventdate");
let starttime = document.getElementById("starttime");
let endtime = document.getElementById("endtime");
let price = document.getElementById("price");
let eventlink = document.getElementById("eventlink");
let ticketlink = document.getElementById("ticketlink");
let description = document.getElementById("description");

const newEvent = async (e) => {
    e.preventDefault();

    // Add seconds for mysql Format --
    const starttimeCatch = starttime.value + ":00";
    const endtimeCatch = endtime.value + ":00";

    const r = await gql(` mutation { 
        newEvent
        (
        title: "${title.value}", 
        eventdate: "${eventdate.value}", 
        starttime: "${starttimeCatch}", 
        endtime: "${endtimeCatch}", 
        price: "${price.value}",
        eventlink: "${eventlink.value}",
        ticketlink: "${ticketlink.value}",
        description: "${description.value}" 
        )
        { insertId } }`, "admin");

    console.log(r);
}

const validate = () => {

}

document.getElementById("newevent").onsubmit = newEvent;
document.getElementById("submit").onclick = newEvent;