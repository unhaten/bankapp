import s from "./Create.module.scss";
import { FC, useState } from "react";

import mastercard from "/assets/mc_symbol.svg";
import Button from "../../components/UI/Button/Button";

interface ICreate {
    userName: string;
    userEmail: string;
}

const Create: FC<ICreate> = ({ userName, userEmail }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [type, setType] = useState<undefined | string>(undefined);

    const handleType = (type: string) => {
        setType(type);
    };

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail,
                    cardNumber,
                    cvv,
                    type,
                }),
            });

            if (response.status === 200) {
                setCardNumber("");
                setCvv("");
                setType(undefined);
                alert("You have added a new card");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className={s.section}>
            <h2>Select type of your new card</h2>
            <form className={s.form}>
                <div className={s.content}>
                    <div className={s.cardContainer}>
                        <div className={s.bgCard}></div>
                        <div
                            className={s.card}
                            style={
                                type
                                    ? type === "default"
                                        ? {
                                              opacity: 1,
                                              backgroundColor: "black",
                                              color: "white",
                                          }
                                        : type === "green"
                                        ? {
                                              opacity: 1,
                                              backgroundColor: "green",
                                              color: "white",
                                          }
                                        : type === "silver"
                                        ? {
                                              opacity: 1,
                                              backgroundColor: "silver",
                                              color: "black",
                                          }
                                        : type === "golden"
                                        ? {
                                              opacity: 1,
                                              backgroundColor: "gold",
                                              color: "black",
                                          }
                                        : {}
                                    : { opacity: 0.5 }
                            }
                        >
                            <div className={s.cardTop}>
                                <p className={s.name}>{userName}</p>
                                <img
                                    src={mastercard}
                                    className={s.cardType}
                                ></img>
                            </div>
                            <div className={s.cardBottom}>
                                <p className={s.cardNumber}>
                                    {cardNumber.replace(
                                        /\B(?=(\d{4})+(?!\d))/g,
                                        " "
                                    )}
                                </p>
                                <div className={s.cvv}>
                                    {/* {primaryCard[0].cvv} */}
                                    {cvv}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.inputContainer}>
                    <div className={s.inputContent}>
                        <p className={s.text}>Enter card number</p>
                        <input
                            maxLength={12}
                            type="text"
                            placeholder="example: 2389 3849 3892"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div className={s.inputContent}>
                        <p className={s.text}>Enter your cvv</p>
                        <input
                            maxLength={3}
                            type="text"
                            placeholder="example: 111"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </div>
                </div>
                <div className={s.typeContainer}>
                    <p className={s.text}>Choose type of the card</p>
                    <div className={s.typeContent}>
                        <label
                            className={s.label}
                            onClick={() => handleType("default")}
                        >
                            <input type="radio" name="bgColor" id="" />
                            <div
                                style={{ backgroundColor: "black" }}
                                className={s.cardExample}
                            ></div>
                        </label>
                        <label
                            className={s.label}
                            onClick={() => handleType("green")}
                        >
                            <input type="radio" name="bgColor" id="" />
                            <div
                                style={{ backgroundColor: "green" }}
                                className={s.cardExample}
                            ></div>
                        </label>
                        <label
                            className={s.label}
                            onClick={() => handleType("silver")}
                        >
                            <input type="radio" name="bgColor" id="" />
                            <div
                                style={{ backgroundColor: "silver" }}
                                className={s.cardExample}
                            ></div>
                        </label>
                        <label
                            className={s.label}
                            onClick={() => handleType("golden")}
                        >
                            <input type="radio" name="bgColor" id="" />
                            <div
                                style={{ backgroundColor: "gold" }}
                                className={s.cardExample}
                            ></div>
                        </label>
                    </div>
                </div>
                <div className={s.btnContainer}>
                    <Button
                        className={!type ? "disabled" : undefined}
                        text={"Submit"}
                        color={"rgb(253, 242, 240)"}
                        bgColor={"rgb(110, 70, 143)"}
                        handleClick={handleSubmit}
                    ></Button>
                </div>
            </form>
        </section>
    );
};

export default Create;
