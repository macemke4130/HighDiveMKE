import { gql } from "../utils.js";

const admin = async (e) => {
    // Prevent Form Page Refresh --
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const r = await gql(`{user (username: "${username}", password: "${password}") {id, username, admin}}`, "admin");

        if (r.user.username === username) {
            // Successful Login --
            const jwt = await gql(`{ jwt(username: "${r.user.username}", id: ${r.user.id}, admin: ${r.user.admin}) { token }}`, "admin");
            localStorage.setItem("Token", jwt.jwt.token);
            window.location.href = "./edittaps.html";
        }
    } catch (e) {
        console.error("Unsuccessful Login \n" + e);
    };
}

document.getElementById("login").onsubmit = admin;
document.getElementById("submit").onclick = admin;