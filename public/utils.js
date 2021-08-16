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

export const apiService = async (uri, method = "GET", body) => {
    const headers = {};
    const options = {
        method,
        headers
    };

    if (method === "POST" || method === "PUT") {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(uri, options);

        if (res.status === 404) {
            throw new Error("Check URI and Server Path.");
        }

        if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.setItem('isAuth', 'false');
            throw new Error("Check Local Storage or Server Endpoint.");
        }

        if (res.status === 500) {
            throw new Error("Check Server Terminal.");
        }

        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.error(e);
    }
};

export const auth = async () => {
    const bodyObject = {
        token: localStorage.getItem("Token")
    };
    const r = await apiService("/auth", "POST", bodyObject);
    
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