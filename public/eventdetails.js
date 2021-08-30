console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const id = window.location.search.split("id=")[1];

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
    console.log(r.event);
}

getEvent();