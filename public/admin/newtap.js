import { gql, auth, logOut } from "../utils.js";

const whoIs = auth();

let tapName = document.getElementById("tapname");
let brewer = document.getElementById("brewer");
let price = document.getElementById("price");
let abv = document.getElementById("abv");
let ibu = document.getElementById("ibu");
let size = document.getElementById("size");
let active = document.getElementById("active");

const newTap = async (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) return;

    // Prevents endless "16" entries into the DB --
    const sizeCatch = size.value === "16" || size.value === "" ? null : size.value;

    const r = await gql(`mutation { newTap(active: true, tapname: "${tapName.value}", brewer: "${brewer.value}", price: "${price.value}", size: ${sizeCatch}, abv: ${abv.value || null}}, ibu: ${ibu.value || null}}) { insertId } }`, "admin");
    console.log(r);
}

const validate = () => {
    if (tapName.value === "") {
        tapName.style.border = "5px solid red";
        return false;
    } else {
        tapName.style.border = "none";
    }
    if (brewer.value === "") {
        brewer.style.border = "5px solid red";
        return false;
    } else {
        brewer.style.border = "none";
    }
    if (price.value === "") {
        price.style.border = "5px solid red";
        return false;
    } else {
        price.style.border = "none";
    }
    return true;
}

document.getElementById("newtap").onsubmit = newTap;
document.getElementById("submit").onclick = newTap;
document.getElementById("logout").onclick = logOut;