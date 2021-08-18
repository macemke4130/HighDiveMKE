console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const getAllEvents = async () => {
    const r = await gql(`{ allTaps { tapname, price, size, brewer, abv, ibu } }`);
    const allTaps = r.allTaps;
    console.log(allTaps);

    const events = document.getElementById("events");
}

getAllEvents();