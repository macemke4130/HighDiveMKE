console.log("Created by Lucas Mace");
console.log("lucasmace4130@gmail.com");

import { gql } from "./utils.js";

const app = async () => {
    const r = await gql(`{ allTaps { tapname, price, size, brewer, abv, ibu } }`);
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

        // Create Brewer Text --
        let brewer = document.createElement("p");
        brewer.className = "brewer";
        brewer.innerText = allTaps[i].brewer;
        tapDiv.appendChild(brewer);

        // Create Price Text --
        let price = document.createElement("p");
        price.className = "price";
        const output = allTaps[i].price.charAt(0) === "$" ? allTaps[i].price : "$" + allTaps[i].price;
        price.innerText = output;
        tapDiv.appendChild(price);

        // Create Size Text --
        let size = document.createElement("p");
        size.className = "tapDetails";
        size.innerText = allTaps[i].size ? allTaps[i].size + "oz" : "16oz";
        tapDiv.appendChild(size);

        // Create ABV Text --
        if (allTaps[i].abv) {
            let abv = document.createElement("p");
            abv.className = "tapDetails";
            abv.innerText = "ABV: " + allTaps[i].abv + "%";
            tapDiv.appendChild(abv);
        }

        // Create IBU Text --
        if (allTaps[i].ibu) {
            let ibu = document.createElement("p");
            ibu.className = "tapDetails";
            ibu.innerText = "IBU: " + allTaps[i].ibu;
            tapDiv.appendChild(ibu);
        }

        // Modify DOM --
        onTap.appendChild(tapDiv);
    }
}

app();