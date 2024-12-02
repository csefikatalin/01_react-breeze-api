import axios from "axios";

//létrehozunk egy új Axios példányt a create metódus segítsével.
export const  myAxios=axios.create({
    // alap backend api kiszolgáló elérési útjának beállítása
    baseURL: "http://localhost:8000",

    //beállítjuk, hogy  a kérések azonosítása coockie-k segítségével történik.
    withCredentials: true,
});
myAxios.interceptors.request.use((config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }
    console.log(JSON.stringify(config))
    return config;
  }); 