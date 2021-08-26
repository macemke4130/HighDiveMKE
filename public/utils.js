export const gql = async (ask, path = "public") => {
    let query = ask;
    let method = "POST";
    let headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    let body = JSON.stringify({ query });

    const graphqlPath = (path === "admin") ? "../graphql" : "./graphql";

    try {
        let r = await fetch(graphqlPath, { method, headers, body });
        r = await r.json();
        return r.data;
    } catch (e) {
        console.error(e);
    }
}

export const auth = async () => {
    const token = localStorage.getItem("Token");

    try {
        const r = await gql(`{ auth(token: "${token}"){ valid, id, username, admin } }`, "admin");

        if (r.auth.valid === false) {
            // Token not valid --
            localStorage.removeItem("Token");
            window.location.href = "../";
            return;
        }

        const authObject = {
            id: r.auth.id,
            username: r.auth.username,
            admin: r.auth.admin
        }

        document.getElementById("username").innerText = "Hi " + cap(authObject.username);
        return authObject;
    } catch (e) {
        console.error(e);
    }
}

export const logOut = () => {
    localStorage.removeItem("Token");
    window.location.href = "../";
}

const cap = (toCapitol) => {
    return toCapitol.charAt(0).toUpperCase() + toCapitol.slice(1);
}