import { FC, useEffect, useState } from "react";
import s from "./Cards.module.scss";
import mastercard from "/assets/mc_symbol.svg";
import Button from "../../components/UI/Button/Button";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

interface ICards {
    userEmail: string;
    userName: string;
}

const Cards: FC<ICards> = ({ userEmail, userName }) => {
    const [cards, setCards] = useState<false | []>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<undefined | string>(undefined);

    const getCardsData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/cards/${userEmail}`
            );
            if (response.ok) {
                const json = await response.json();
                setCards(json);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string | number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/cards/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (response.status === 200) {
                handleModalClose();
                alert("You have deleted your card");
                getCardsData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCardClick = (id: string) => {
        handleModalOpen();
        setId(id);
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        getCardsData();
        //eslint-disable-next-line
    }, []);

    const cardList =
        cards &&
        cards.map((item, index) => (
            <li key={index} className={s.item}>
                <div
                    className={s.card}
                    style={
                        item.type === "default"
                            ? {
                                  backgroundColor: "black",
                                  color: "white",
                              }
                            : item.type === "green"
                            ? {
                                  backgroundColor: "green",
                                  color: "white",
                              }
                            : item.type === "silver"
                            ? {
                                  backgroundColor: "silver",
                                  color: "black",
                              }
                            : item.type === "golden"
                            ? {
                                  backgroundColor: "gold",
                                  color: "black",
                              }
                            : {}
                    }
                >
                    <div className={s.cardTop}>
                        <p className={s.name}>{userName}</p>
                        <img src={mastercard} className={s.cardType}></img>
                    </div>
                    <div className={s.cardBottom}>
                        <p className={s.cardNumber}>
                            {item.card_number.replace(
                                /\B(?=(\d{4})+(?!\d))/g,
                                " "
                            )}
                        </p>
                        <div className={s.cvv}>{item.cvv}</div>
                    </div>
                </div>
                <div className={s.btnContainer}>
                    {item.primary_card ? (
                        <div className={s.primary}>Primary</div>
                    ) : (
                        <Button
                            text={"Set Primary"}
                            color={"rgb(253, 242, 240)"}
                            bgColor={"rgb(110, 70, 143)"}
                        ></Button>
                    )}
                    <Button
                        text={"Delete"}
                        color={"rgb(255, 82, 124)"}
                        bgColor={"rgb(253, 242, 240)"}
                        // handleClick={() => handleDelete(item.id)}
                        handleClick={() => handleCardClick(item.id)}
                    ></Button>
                </div>
            </li>
        ));

    return (
        <section className={s.section}>
            {isOpen && (
                <DeleteModal
                    handleModalClose={handleModalClose}
                    handleDelete={handleDelete}
                    id={id}
                />
            )}
            <h2 className={s.header}>Here are your cards</h2>
            <div className={s.content}>
                {cards ? (
                    <ul className={s.list}>{cardList}</ul>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </section>
    );
};

export default Cards;
