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

    const r = await gql(`mutation { newTap(active: true, tapname: "${tapName.value}", brewer: "${brewer.value}", price: "${price.value}", size: ${sizeCatch}, abv: ${abv.value || null}}, ibu: ${ibu.value || null}) { insertId } }`, "admin");
    if (r) window.location.href = "./edittaps.html";
}

const validate = () => {
    const required = [tapName, brewer, price];
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

document.getElementById("newtap").onsubmit = newTap;
document.getElementById("submit").onclick = newTap;
document.getElementById("logout").onclick = logOut;