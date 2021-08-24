import { gql, auth, logOut } from "../utils.js";

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    document.getElementById("username").innerText = "Hi " + whoIs.username.charAt(0).toUpperCase() + whoIs.username.slice(1);
}

const newEvent = (e) => {
    e.preventDefault();
    console.log(document.getElementById("eventdate").value);
}

document.getElementById("newevent").onsubmit = newEvent;
document.getElementById("submit").onclick = newEvent;

loggedIn();