import { gql, auth } from "../utils.js";

let whoIs;
const loggedIn = async () => {
    whoIs = await auth();
    console.log(whoIs);
}
loggedIn();