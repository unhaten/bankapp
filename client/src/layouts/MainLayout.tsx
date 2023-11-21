import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FC } from "react";

interface IMainLayout {
    userName: string;
}

const MainLayout: FC<IMainLayout> = ({ userName }) => {
    return (
        <>
            <Header userName={userName}></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;
