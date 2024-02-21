import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({
        name: "hiba",
        email: "hiba",
        password: "hiba",
        password_confirmation: "hiba",
    });
    //const csrf = () => axios.get("/sanctum/csrf-cookie");
    let token = "";
    const csrf = () =>
        axios.get("/token").then((response) => {
            console.log(response);
            token = response.data;
        });
    console.log(csrf);
    //bejelentkezett felhasználó adatainak lekérdezése
    const getUser = async () => {
        const { data } = await axios.get("/api/user");
        setUser(data);
    };

    const loginReg = async ({ ...adat }, vegpont) => {
        adat._token = token;
        //lekérjük a csrf tokent
        await csrf();
        //bejelentkezés
        //Összegyűjtjük egyetlen objektumban az űrlap adatokat

        // Megrpóbáljuk elküldeni a /login végpontra az adatot
        // hiba esetén kiiratjuk a hibaüzenetet
        try {
            await axios.post(vegpont, adat);
            console.log("siker");
            //sikeres bejelentkezés esetén elmegyünk  a kezdőlapra
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ loginReg, errors, getUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuthContext() {
    return useContext(AuthContext);
}
