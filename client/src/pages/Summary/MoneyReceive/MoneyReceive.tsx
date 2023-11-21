import { Link } from "react-router-dom";
import s from "./MoneyReceive.module.scss";
import { TbClick } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";
import dollars from "/assets/dollaz.webp";

const MoneyReceive = () => {
    return (
        <section className={s.receive}>
            <img src={dollars} className={s.bg}></img>
            <div className={s.receiveContent}>
                <div className={s.top}>
                    <div className={s.icon}>
                        <TbClick />
                    </div>
                    <p className={s.text}>
                        You have USD 1,000 pending money, it will be ready in 2
                        business days.
                    </p>
                </div>
                <div className={s.bottom}>
                    <Link to="" className={s.link}>
                        <p>Get your money now</p>
                        <span>
                            <BsArrowRight />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MoneyReceive;
