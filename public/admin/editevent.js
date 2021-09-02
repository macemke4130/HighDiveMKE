import { gql, auth } from "../utils.js";

const whoIs = auth();

const params = window.location.search;
const paramsList = params.split("id=");
const id = Number(paramsList[1].split("&")[0]);

let title = document.getElementById("eventtitle");
let eventdate = document.getElementById("eventdate");
let starttime = document.getElementById("starttime");
let endtime = document.getElementById("endtime");
let price = document.getElementById("price");
let eventlink = document.getElementById("eventlink");
let ticketlink = document.getElementById("ticketlink");
let description = document.getElementById("description");

const getEvent = async () => {
    const r = await gql(`{ event(id: ${id}, admin: true) {
          title,
          eventdate,
          starttime,
          endtime,
          price,
          eventlink,
          ticketlink,
          description
        }
      }
      `, "admin");
    const event = r.event;
    console.log(event);
    
    title.value = event.title;
    eventdate.value = event.eventdate;
    starttime.value = event.starttime;
    endtime.value = event.endtime;
    price.value = event.price;
    eventlink.value = event.eventlink;
    ticketlink.value = event.ticketlink;
    description.value = event.description;
}

const editEvent = async (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) return;

    const endtimeCatch = endtime.value === "" ? null : `"${endtime.value}"`;

    const r = await gql(` mutation { 
        editEvent
        (
        id: ${id},
        title: "${title.value}", 
        eventdate: "${eventdate.value}", 
        starttime: "${starttime.value}", 
        endtime: ${endtimeCatch}, 
        price: "${price.value}",
        eventlink: "${eventlink.value}",
        ticketlink: "${ticketlink.value}",
        description: "${description.value}" 
        )
        { affectedRows } }`, "admin");
        console.log(r);

    if (r) window.location.href = "./editevents.html";
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

const deleteAlert = () => {
    if( confirm("Delete Event?") ) deleteEvent();
}

const deleteEvent = async () => {
    const r = await gql(` mutation {deleteEvent ( id: ${id} ) { affectedRows }} `, "admin");
    if (r) window.location.href = "./editevents.html";
}

getEvent();

document.getElementById("editevent").onsubmit = editEvent;
document.getElementById("submit").onclick = editEvent;
document.getElementById("delete-event").onclick = deleteAlert;
document.getElementById("resetEndTime").onclick = resetEndTime;