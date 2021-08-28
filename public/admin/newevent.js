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

    // const check = validate();
    // if (check === false) return;

    //
    const endtimeCatch = endtime.value === "" ? null : `"${endtime.value}"`;

    const r = await gql(` mutation { 
        newEvent
        (
        title: "${title.value}", 
        eventdate: "${eventdate.value}", 
        starttime: "${starttime.value}", 
        endtime: ${endtimeCatch}, 
        price: "${price.value}",
        eventlink: "${eventlink.value}",
        ticketlink: "${ticketlink.value}",
        description: "${description.value}" 
        )
        { insertId } }`, "admin");
        console.log(r);

    if (r) window.location.href = "./editevents.html";

    console.log(endtime.value);
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

const resetEndTime = (e) => {
    e.preventDefault();
    endtime.value = null;
}

document.getElementById("newevent").onsubmit = newEvent;
document.getElementById("submit").onclick = newEvent;
document.getElementById("resetEndTime").onclick = resetEndTime;