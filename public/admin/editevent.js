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
    const r = await gql(`{ event(id: ${id}) {
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

    eventdate.value = event.eventdate;
}

getEvent();