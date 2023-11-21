import s from "../Header.module.scss";

import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav className={s.nav}>
            <ul className={s.list}>
                <li className={s.item}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Summary
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink
                        to="cards"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Cards
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink
                        to="activity"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Activity
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink
                        to="recipients"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Recipients
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink
                        to="help"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Help Center
                    </NavLink>
                </li>
                <li className={s.item}>
                    <NavLink
                        to="gifts"
                        className={({ isActive }) =>
                            isActive ? `${s.active}` : ""
                        }
                    >
                        Earn Gifts
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
