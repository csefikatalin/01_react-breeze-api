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

    //bejelentkezett felhasználó adatainak lekérdezése
    const getUser = async () => {
        const { data } = await axios.get("/api/user");
        setUser(data);
    };
    const logout = () => {
        csrf()
        console.log(token)
        axios.post("/logout").then((resp) => {
            setUser(null);
            console.log(resp);
        });
    };
    
    const loginReg = async ({ ...adat }, vegpont) => {
        await csrf()
        console.log(token)
        adat._token = token;
        console.log(adat)
        //lekérjük a csrf tokent
        await csrf();
        //bejelentkezés
        //Összegyűjtjük egyetlen objektumban az űrlap adatokat

        // Megrpóbáljuk elküldeni a /login végpontra az adatot
        // hiba esetén kiiratjuk a hibaüzenetet
        try {
            await axios.post(vegpont, adat);
            console.log("siker");
            //sikeres bejelentkezés/regisztráció esetén
            //Lekérdezzük a usert
            await getUser();
            //elmegyünk  a kezdőlapra
            navigate("/");
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ logout, loginReg, errors, getUser, user }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default function useAuthContext() {
    return useContext(AuthContext);
}
