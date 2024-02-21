# REACT frontend laravel Breeze API végpontokhoz

## Bejelentkezés és Regisztráció

1. **laravel telepítése**: composer create-project laravel/laravel laravel-breeze-api
2. **breeze telepítése**: composer require laravel/breeze --dev
3. **breeze api telepítése**: php artisan breeze:install api
4. a routes/auth.php fájlban vannak a használható végpontok. Ehhez kapcsolódunk frontenden.
5. env fájlban állítsuk be az adatbázis elérhetőségeket.
6. migráljuk az adatbázist
7. env. php ban be kell állítani a forntend elérés értékeit:
   APP_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:3000
   SANCTUM_STATEFUL_DOMAINS=localhost:3000
   SESSION_DOMAIN=localhost

## Frontend létrehozása és beállításai

Hozzuk létre a react projektet és telepítsük hozzá a React routert, bootstrapet és az axiost

### React telepítése:

    npx create-react-app frontend

Nyisd meg VS Code-ban és indítsd el!

    npm start

### Csomagok telepítése

-   react router telepítése, majd importáljuk az index.js fájlba és helyezük el a <BrowserRouter> komponenst az App komponens köré

    npm install react-router-dom

    import { BrowserRouter } from "react-router-dom";

    <BrowserRouter>
        <App />
    </BrowserRouter>

-   bootstrap telepítése,majd importáljuk az index.js fájlba.

    npm install react-bootstrap bootstrap

-   axios
    npm install axios

### Mappastruktúra kialakítása

-   pages: itt fogjuk tárolni az egyes oldalakat
-   layouts: itt fogjuk tárolni a különböző jogosultságokhoz tartozó menüket, elrendezéseket.
-   components: itt fogjuk tárolni az oldalakat felépítő komponenseket
-   api: itt fogjuk tárolni az axios beállításait
-   contexts: itt fogjuk tárolni a contextusokat, providereket.

### Route és a navigáció

#### Oldalak létrehozása

A **pages** mappában hozzuk létre az alábbi oldalakat egy alap function komponens segítségével

-   Kezdolap
-   Bejelentkezes
-   Regisztracio

#### App.js fájlban alakítsuk ki az útvonalakat

    import { Route, Routes } from "react-router-dom";
    import Kezdolap from "./pages/Kezdolap";
    import Bejelentkezes from "./pages/Bejelentkezes";
    import Regisztracio from "./pages/Regisztracio";
    import VendegLayout from "./layouts/VendegLayout";

    function App() {
        return (
            <Routes>
                <Route path="/" element={<VendegLayout />}>
                    <Route index element={<Kezdolap />} />
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />

                </Route>
            </Routes>
        );
    }

    export default App;

#### Menü kialakítása a Navigacio komponensben

    import React from "react";
    import { Link } from "react-router-dom";

    export default function Navigacio() {
        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link className="nav-link" to="/">
                                Kezdőlap
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/bejelentkezes">
                                Bejelentkezés
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/regisztracio">
                                Regisztráció
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

#### Layout kialakítása - VendegLayout létrehozása a layouts mappában

    import React from "react";
    import Navigacio from "../pages/Navigacio";
    import { Outlet } from "react-router-dom";

    export default function VendegLayout() {
        return (
            <>
                <Navigacio />
                <Outlet />
            </>
        );
    }

#### Az App.js-ben állítsuk be a Layoutot a menüpontokhoz.

    import { Route, Routes } from "react-router-dom";
    import Kezdolap from "./pages/Kezdolap";
    import Bejelentkezes from "./pages/Bejelentkezes";
    import Regisztracio from "./pages/Regisztracio";
    import VendegLayout from "./layouts/VendegLayout";

    function App() {
        return (
            <Routes>
                <Route path="/" element={<VendegLayout />}>
                    <Route index element={<Kezdolap />} />
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />

                </Route>
            </Routes>
        );
    }

    export default App;

## Bejelentkezés és Regisztrációs formok létrehozása

### Bejelentkezés form

A Bejelentkezés oldalon hozzunk létre az alábbi mintának megfelelő formot.
Minden beviteli mező alatt van egy div, ahova az esetleges hibaüzeneteket jelenítjük meg.

A Regisztráció feliratra kattintva navigáljunk a regisztráció oldalra.

<img src="public/readme_kepek/login.PNG" alt="Bejelentkezés képernyőkép">

    import React from "react";
    import { Link } from "react-router-dom";

    export default function Bejelentkezes() {
        return (
            <div className="m-auto" style={{ maxWidth: "400px" }}>
                <h1 className="text-center">Bejelentkezés</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">
                            Jelszó:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            placeholder="jelszó"
                            name="pwd"
                        />
                        <div>
                            <span className="text-danger">hiba</span>
                        </div>
                    </div>

                    <div className=" text-center">
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>

                        <p>
                            Még nincs felhaszálóneve?
                            <Link className="nav-link text-info" to="/regisztracio">
                                Regisztráció
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }

### Regisztrációs form

Hasonló módon hozzuk létre a regisztráció oldal formját is.

<img src="public/readme_kepek/registracio.PNG" alt="Regisztrációs képernyőkép">

## Regisztráció és a Bejelentkezés logikája

Űrlapok beviteli mezőinek kezelése state-kkel történik, ezért a Bejelentkezés komponensben hozzunk létre az email és a password mezőkhöz state-t.
Ne felejtsük el importálni az useState react hook-ot!

### Bejelentkezés

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

Majd az input mezőkhöz helyezzük el a value tulajdonsághoz a megfelelő state értékét,
valamint a beviteli mező onChange eseményéhez a érték setterével állítsuk be a bevitt adatot.

pl. az email mező esetében most így alakul az input elem.

    <input
        type="email"

        // value beállítása a state értékére
        value={email}
        // state értékének módosításváltozik a beviteli mező tartalma
        onChange={(e) => {
            setEmail(e.target.value);
        }}

        className="form-control"
        id="email"
        placeholder="email"
        name="email"
    />

A form onSubmit eseményéhze pedig rendeljünk egy függvényt. Első lépésben szedjük le a submit gombról a hozzá rendelt alapértelmezett eseménykezelőt.

    function handleSubmit(e){
        e.preventDefault();
        //bejelentkezés kezelése
    }

### Regisztráció

Regisztráció esetén 4 state értékre van szükség

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

### handleSubmit függvény - a bejelentkezési és regisztrációs adatok elküldése

Ebben a metódusban fogjuk elküldeni az adatokat a szerver felé axios segítségével asszinkron módon.

#### AXIOS alapértelmezett beállításai

Az api/axios.js fájlba írjuk az alábbi kódot:

-   importáljuk az Axios objektumot
-   létrehozunk egy új Axios példányt a create metódus segítsével.
-   megadjuk, hogy a kérések azonosítása coockie-k segítségével történik.

    import axios from "axios";

    //létrehozunk egy új Axios példányt a create metódus segítsével.
    export default axios.create({
    // alap backend api kiszolgáló elérési útjának beállítása
    baseURL: "http://localhost:8000/",

        //beállítjuk, hogy  a kérések azonosítása coockie-k segítségével történik.
        withCredentials: true,

    });

#### Bejelentkezés logikája

A **Bejelentkezes** komponensbe importáljuk be az előbb létrehozott saját axios-unkat.

    import  axios  from "../api/axios";

Most már használhatjuk az axios post és get metódusait. Mivel ezek asszinkron hívások, ezért a handleSubmit függvényünket át kell alakítanuk asszinkron hívások kezelésére az alábbi módon.

-   Összegyűjtjük egyetlen objektumban az űrlap adatokat
-   Megpróbáljuk elküldeni a /login végpontra az adatot
-   Hiba esetén kiiratjuk a hibaüzenetet

    const handleSubmit = async (e) => {
    e.preventDefault();
    //bejelentkezés
    //Összegyűjtjük egyetlen objektumban az űrlap adatokat
    const adat = {
    email: email,
    password: password,
    };
    // Megrpóbáljuk elküldeni a /login végpontra az adatot
    // hiba esetén kiiratjuk a hibaüzenetet
    try {
    await axios.post("/login", adat );
    } catch (error) {
    console.log(error);
    }
    };

Hasonló módon kell eljárni a Regisztráció esetén is.

Ha most megpróbálunk regisztrálni a rendszerbe 419-es hibát kapunk.
Ennek oka, hogy nem azonosítottuk magunkat a szerver számára, ezért a szerver elutasította a kérésünket. A post kéréssel együtt el kell küldenünk a csrf tokent is, ami a kérésünk azonosítására szolgál.

![419 CSRF token mismatch](./public/readme_kepek/error419.PNG)

A CSRF token felhasználónként egyedi kód, amit a weboldalak arra használnak, hogy a segítségével kivédjék az olyan támadásokat, amiknél illetéktelen felek egy felhasználó nevében küldenek a weboldalnak parancsokat (CSRF támadás).
Amikor egy felhasználó valamilyen kritikus funkciót próbál meg elérni egy weboldalon (például törlés vagy jelszóváltoztatás), akkor ahhoz ezt a korábban kapott tokent is el kell küldje a böngészője a szervernek. Mivel a token minden felhasználónál más és más, és nem lehet egyszerűen kitalálni, ezért a CSRF támadás tervezői nem tudják a parancsot a felhasználó nevében elküldeni, mert ahhoz a tokent is tudniuk kellene.

Ha "érvénytelen CSRF token", "CSRF token missing or incorrect", "CSRF token mismatch" vagy hasonló hibaüzenetet kapsz, az azt jelenti, hogy a böngésződ által küldött kód hibás. Ez előfordulhat például amiatt, hogy időközben egy másik ablakban kijelentkeztél az oldalról, vagy már nagyon rég nyitottad meg az oldalt, és a token azóta megváltozott vagy a cookie‑d lejárt.

#### CSRF azonosító token beépítése

Helyezzük el a Bejelentkezés és a Regisztráció komponensekben is a következő sorokat:
Ehhez a backenden készítsük el a token végpontot a web.php-ban.
A végpont visszaad egy sesson tokent. Ezt a tokent minden szerver felé intézett kéréskor el kell küldenünk a szervernek.

**Backend oldal web.php**:

    Route::get('/token', function () {
        return request()->session()->token();
    });

**Frontend oldal**:

    let token = "";
        const csrf = () =>
            axios.get("/token").then((response) => {
                console.log(response);
                token = response.data;
            });

Majd az adatoknál küldjük el a tokent is.

    const adat = {
        email: email,
        password: password,
        _token: token,
    };

Hasonlóan járunk el a regisztráció esetében is.

Ezzel lekérjük a backendtől az adott kéréshez tartozó CSRF toketn. Ezt a tokent kell visszaküldenünk a post kérésünkkel együtt ahhoz, hogy azonosítva legyünk, és a szerver tudja, hogy jogosan használjuk a végpontjait.

#### Navigáció készítése

Ezen kívül sikeres bejelentkezés vagy regisztráció esetén rögtön navigáljunk el a Kezdőlapra.

Ehhez használjuk a useNavigate Hook-ot.

-   Importáljuk az oldal tetején!
-   Majd hozzunk létre egy változót:

    const navigate = useNavigate();

-   Végül sikeres bejelentkezés után navigáljunk a kezdőlapra:

    navigate("/");

#### Hibakezelés

Amennyiben nem megfelelő adatokat adunk meg, az api kiszolgáló 422-es hibakóddal tér vissza, és kiolvashatjuk a válaszból a megfelelő mezőkhöz tartozó hibákat.

![422-es hiba ](./public/readme_kepek/hibakezeles.PNG)

Ehhez szükségünk van egy új state-re a Bejelentkezés és a Regisztráció komponensekben.

    const [errors, setErrors] = useState("");

Az inputmezők mögötti div-eket cseréljük le ilyesmi kódra:

    <div>
        {errors.email && (
            <span className="text-danger">{errors.email[0]}</span>
        )}
    </div>

Módosítsuk a handleSubmit függvény catch ágát az alábbiak szerint: .

    } catch (e) {
        if (e.response.status === 422) {
            setErrors(e.response.data.errors);
        }
    }

**Most így néz ki a login kód**:

    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import axios from "../api/axios";

    export default function Bejelentkezes() {
        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
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

        const handleSubmit = async (e) => {
            e.preventDefault();
            //lekérjük a csrf tokent
            await csrf();
            //bejelentkezés
            //Összegyűjtjük egyetlen objektumban az űrlap adatokat
            const adat = {
                email: email,
                password: password,
                _token: token,
            };

            // Megrpóbáljuk elküldeni a /login végpontra az adatot
            // hiba esetén kiiratjuk a hibaüzenetet
            try {
                await axios.post("/login", adat );
                console.log("siker")
                //sikeres bejelentkezés esetén elmegyünk  a kezdőlapra
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <div className="m-auto" style={{ maxWidth: "400px" }}>
                <h1 className="text-center">Bejelentkezés</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            // value beállítása a state értékére
                            value={email}
                            // state értékének módosítása ha változik a beviteli mező tartalma
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="form-control"
                            id="email"
                            placeholder="email"
                            name="email"
                        />
                    </div>
                    <div>
                        {errors.email && (
                            <span className="text-danger">{errors.email[0]}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">
                            Jelszó:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="form-control"
                            id="pwd"
                            placeholder="jelszó"
                            name="pwd"
                        />
                        <div>
                            {errors.password && (
                                <span className="text-danger">
                                    {errors.password[0]}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className=" text-center">
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>

                        <p>
                            Még nincs felhaszálóneve?
                            <Link className="nav-link text-info" to="/regisztracio">
                                Regisztráció
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }

## AuthContext létrehozása

Context-ek használatával a programozási logikát kiemelhetjük a kompponensekből és egyetlen közös fájlban kezelhetjük.

-   Hozzuk létre a **contexts/AuthContext.js** fájlt.
-   Hozzuk létre benne az AuthContext objektumot.

    import { createContext} from "react";
    export const AuthContext = createContext({});

-   Hozzuk létre az alap Providert a context-hez.

    import { createContext } from "react";
    const AuthContext = createContext({});

    export const AuthProvider = ({ children }) => {

          return (
              <AuthContext.Provider
                  value={{ }}
              >
                  {children}
              </AuthContext.Provider>
          );

    };

-   Emeljük át a Bejelentkezés és a Regiszter komponensekből a közösen használadnó változókat és metódusokat.
-   axios import
-   csrf token lekérésére szolgáló függvény
-   handleSubmit logika - paraméterként fogja megkapni az elküldendő adatokat a komponenstől. (data)
-   az errort kezelő state

#### Bejelentkezett felhasználó adatainak lekérdezése

- Hozzunk létre a providerünkben egy user state-t. 


## Contextus felhasználása

### Providerrel öleljük körbe az App komponenst az index-js fájlban

    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>

Ne felejtsük el importálni az AuthProvidert

    import { AuthProvider } from "./contexts/AuthContext";

### Bejelentkezes és a Regisztracio komponensekben használjuk a contextust

Importáljuk AuthContext objektumot.

    import { AuthContext } from "../contexts/AuthContext";

A komponensen belül megadjuk a változókat.

    const { handleSubmit, errors } = AuthContext();


A Regisztráció  esetében hasonlóan járunk el.

## Layoutok kialakítása
