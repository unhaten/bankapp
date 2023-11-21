import { FC } from "react";
import styles from "./Referral.module.scss";
import { IoMdCopy } from "react-icons/io";

interface IReferral {
    userName: string;
}

const Referral: FC<IReferral> = ({ userName }) => {
    const year = new Date().getFullYear();
    const name = userName.split(" ").join("");
    return (
        <section className={styles.referral}>
            <img src={"#"} alt="" className={styles.background} />
            <p className={styles.text}>
                Invite a friend with code below and redeem special bonus USD 15
                from us!
            </p>
            <div className={styles.placeholder}>
                <p>
                    {name}SEP{year}
                </p>
                <div className={styles.icon}>
                    <IoMdCopy
                        style={{ color: "#fff", width: 25, height: 25 }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Referral;
