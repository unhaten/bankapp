import Nav from "./Nav/Nav";
import Profile from "../Profile/Profile";

import s from "./Header.module.scss";
import logo from "/assets/logo.svg";
import { FC } from "react";

interface IHeader {
    userName: string;
}

const Header: FC<IHeader> = ({ userName }) => {
    return (
        <>
            <header className={s.header}>
                <div className={s.left}>
                    <img src={logo} alt="logo" className={s.logo} />
                    <Profile userName={userName}></Profile>
                </div>
                <Nav></Nav>
            </header>
        </>
    );
};

export default Header;
