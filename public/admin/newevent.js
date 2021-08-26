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

    const check = validate();
    if (check === false) return;
   
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
    const required = [title, eventdate, starttime, price];
    const red = "5px solid red";

    for (let i = 0; i < required.length; i++) {
        if (required[i].value === "" || required[i].value === undefined) {
            required[i].style.border = red;
            return false;
        } else {
            required[i].style.border = "none";
        }
    }
    return true;
}

document.getElementById("newevent").onsubmit = newEvent;
document.getElementById("submit").onclick = newEvent;