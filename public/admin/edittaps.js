import { gql, auth } from "../utils.js";

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    document.getElementById("username").innerText = "Hi " + whoIs.username.charAt(0).toUpperCase() + whoIs.username.slice(1);
    app();
}

const app = () => {
    
}

loggedIn();

