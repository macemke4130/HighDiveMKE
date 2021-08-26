import { gql, auth } from "../utils.js";

const whoIs = auth();

const params = window.location.search;
const paramsList = params.split("id=");
const id = paramsList[1].split("&")[0];

let tapName = document.getElementById("tapname");
let brewer = document.getElementById("brewer");
let price = document.getElementById("price");
let abv = document.getElementById("abv");
let ibu = document.getElementById("ibu");
let size = document.getElementById("size");
let active = document.getElementById("active");

const editTap = async (e) => {
    e.preventDefault();

    const check = validate();
    if (check === false) return;

    // Prevents endless "16" entries into the DB --
    const sizeCatch = size.value === "16" || size.value === "" ? null : size.value;

    const r = await gql(`mutation { 
        editTap
        (
            id: ${id}, 
            active: ${active.value}, 
            tapname: "${tapName.value}", 
            brewer: "${brewer.value}", 
            price: "${price.value}", 
            size: ${sizeCatch}, 
            abv: ${abv.value || null}, 
            ibu: ${ibu.value || null}
        ) 
            { affectedRows } }`, "admin");
    if (r) window.location.href = "./edittaps.html";
}

const getTap = async () => {
    const r = await gql(`{ tap(id: ${id}) { tapname, brewer, price, abv, ibu, size, active } }`, "admin");
    const tap = r.tap;

    tapName.value = tap.tapname;
    brewer.value = tap.brewer;
    price.value = tap.price;
    abv.value = tap.abv;
    ibu.value = tap.ibu;
    size.value = tap.size || "16";
    active.value = tap.active;
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

getTap();

document.getElementById("edittap").onsubmit = editTap;
document.getElementById("submit").onclick = editTap;