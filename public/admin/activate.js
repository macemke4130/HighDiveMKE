import { gql, auth } from "../utils.js";

const params = window.location.search;
const paramsList = params.split("id=");
const id = paramsList[1].split("&")[0];
const active = params.split("active=")[1];

const activate = async () => {
    const r = await gql(`mutation { editTap (id: ${id}, active: ${active}) { affectedRows } }`, "admin");
    if (r) window.location.href = "./edittaps.html";
}

activate();