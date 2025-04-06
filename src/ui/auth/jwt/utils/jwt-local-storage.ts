export function setJWT(user_id: number | string, jwt: string) {
    const data = { jwt: jwt, user_id: user_id };

    localStorage.setItem("JWT", JSON.stringify(data));
}

export function getJWT() {
    const data = localStorage.getItem("JWT");

    return JSON.parse(data!);
}

export function removeJWT() {
    localStorage.removeItem("JWT");
}