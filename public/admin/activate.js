import { gql, auth } from "../utils.js";

const params = window.location.search;
const paramsList = params.split("=");
const id = paramsList[1];

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    activate();
}

const activate = async () => {
    const r = await gql(`mutation { editTap (id: ${id}, active: true) { affectedRows } }`, "admin");
    if (r) window.location.href = "./edittaps.html";
}

loggedIn();