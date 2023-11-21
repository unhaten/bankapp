import styles from "./Balance.module.scss";
import Button from "../../../components/UI/Button/Button";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FC } from "react";

interface IBallance {
    currency: number;
}

const Balance: FC<IBallance> = ({ currency }) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Total Balance</h2>
            <p className={styles.balance}>
                {new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "USD",
                }).format(currency)}
            </p>
            {/* <span className={styles.currency}>USD</span> */}
            <div className={styles.buttonContainer}>
                <Button
                    text={"Send"}
                    color={"#fff"}
                    Icon={BsArrowUp}
                    bgColor={"rgb(110, 70, 143)"}
                ></Button>
                <Button
                    text={"Request"}
                    color={"#000"}
                    Icon={BsArrowDown}
                    bgColor={"rgb(245, 245, 245)"}
                ></Button>
                <Button
                    text={"Top Up"}
                    color={"#000"}
                    Icon={AiOutlinePlus}
                    bgColor={"rgb(245, 245, 245)"}
                ></Button>
            </div>
        </section>
    );
};

export default Balance;
