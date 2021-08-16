console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const app = async () => {
    const r = await gql(`{ allTaps { tapname, price, brewer } }`);
    const allTaps = r.allTaps;
    console.log(allTaps);

    const onTap = document.getElementById("onTap");

    for (let i = 0; i < allTaps.length; i++) {
        // Create Div for Tap --
        let tapDiv = document.createElement("div");
        tapDiv.className = "tap";

        // Create Tap Name Text --
        let tapName = document.createElement("p");
        tapName.className = "tapName";
        tapName.innerText = allTaps[i].tapname;
        tapDiv.appendChild(tapName);

        onTap.appendChild(tapDiv);
    }
}

app();