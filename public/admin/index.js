import { gql } from "../utils.js";

const admin = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const r = await gql(`{user (username: "${username}", password: "${password}") {id, username}}`, "admin");
        console.log(r);
        if (r.user.username === username) {
            // Success
            const r = await gql(`{ jwt(payload: "${username}") { token }}`, "admin");
            console.log(r.jwt.token);
            if (r) {
                localStorage.setItem("Token", r.jwt.token);
                // window.location.href = "./panel.html";
            }
        }
    } catch (e) {
        console.error("Unsuccessful Login \n" + e);
    };
}

document.getElementById("submit").onclick = admin;