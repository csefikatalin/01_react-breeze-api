
import useAuthContext from "../contexts/AuthContext";

export default function Kezdolap() {
     const { user } = useAuthContext(); 

    return (
        <div>
            <h1>Kezdőlap</h1>
            <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
        </div>
    );
}
