export const gql = async (ask, path = "public") => {
    let query = ask;
    let method = "POST";
    let headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    let body = JSON.stringify({ query });
    
    const graphqlPath = (path === "admin") ? "../graphql" : "./graphql"

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
    const r = await gql(`{auth(token: "${token}") {}}`);
    
    if (r.data === "jwt expired") {
        localStorage.removeItem("Token");
        window.location.href = "../";
        return;
    } else if (r.data === "jwt malformed") {
        localStorage.removeItem("Token");
        window.location.href = "../";
        return;
    }
}