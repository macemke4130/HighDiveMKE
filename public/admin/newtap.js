import { gql, auth } from "../utils.js";

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    document.getElementById("username").innerText = "Hi " + whoIs.username.charAt(0).toUpperCase() + whoIs.username.slice(1);
}

const newTap = async (e) => {
    e.preventDefault();

    const tapName = document.getElementById("tapname").value;
    const brewer = document.getElementById("brewer").value;
    const price = document.getElementById("price").value;
    const abv = Number(document.getElementById("abv").value);
    const ibu = Number(document.getElementById("ibu").value);
    const size = Number(document.getElementById("size").value);
    const active = document.getElementById("active").value;

    const r = await gql(`mutation { newTap(active: true, tapname: "${tapName}", brewer: "${brewer}", price: "${price}", size: ${size}, abv: ${abv}, ibu: ${ibu}) { insertId } }`, "admin");
    console.log(r);
}


document.getElementById("newtap").onsubmit = newTap;
document.getElementById("submit").onclick = newTap;

loggedIn();