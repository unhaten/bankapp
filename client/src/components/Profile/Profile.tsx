import { FC } from "react";
import s from "./Profile.module.scss";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";

interface IProfile {
    userName: string;
}

const Profile: FC<IProfile> = ({ userName }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const navigate = useNavigate();

    const signOut = () => {
        removeCookie("Email");
        removeCookie("AuthToken");
        removeCookie("Name");
        removeCookie("Currency");
        // window.location.replace("/");
        navigate("/auth");
    };

    return (
        <div className={s.profile}>
            <p className={s.text}>
                Welcome back,{" "}
                <span className={s.name}>{userName?.split(" ", 1)}!</span>
            </p>
            <button onClick={signOut}>logout</button>
            <div className={s.icon}>icon</div>
        </div>
    );
};

export default Profile;
