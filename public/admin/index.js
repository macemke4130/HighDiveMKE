import { gql, apiService } from "../utils.js";

const admin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const r = await gql(`{user (username: "${username}", password: "${password}") {username}}`, "admin");
        console.log(r);
        if (r.user.username === username) {
            // Success
            const jwt = await gql(`{jwt (payload: "${username}")}`, "admin");
            console.log(jwt);
            if (jwt) {
                localStorage.setItem("Token", jwt);
                // window.location.href = "./panel.html";
            }
        }
    } catch (e) {
        console.error("Unsuccessful Login \n" + e);
    };
}

document.getElementById("submit").onclick = admin;