import { FC, useState } from "react";
import { Link } from "react-router-dom";
import s from "./SummaryCard.module.scss";

import Button from "../../../components/UI/Button/Button";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

import { BiCreditCardFront } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { AiOutlineLock } from "react-icons/ai";
import { LuSettings2 } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

import mastercard from "/assets/mc_symbol.svg";

interface ISummaryCard {
    userName: string;
    cards: [] | false;
    getCardsData(): void;
}

interface IPrimaryCard {
    primary_card: boolean;
    type: string;
}

const SummaryCard: FC<ISummaryCard> = ({ userName, cards, getCardsData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const primaryCard =
        cards &&
        cards.filter((item: IPrimaryCard) => item.primary_card && item);
    // const cardList = cards?.map((item) => item);
    // const firstCard = cardList[0];

    const handleModalOpen = () => setIsOpen(true);

    const handleModalClose = () => setIsOpen(false);

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

    return (
        <>
            {isOpen && (
                <DeleteModal
                    handleModalClose={handleModalClose}
                    handleDelete={handleDelete}
                    id={primaryCard[0].id}
                ></DeleteModal>
            )}
            <section className={s.sectionSummaryCard}>
                {cards ? (
                    cards.length > 0 ? (
                        primaryCard[0] ? (
                            <>
                                <div className={s.top}>
                                    <div className={s.topText}>
                                        <h2 className={s.header}>Cards</h2>
                                        <Link className={s.link} to="cards">
                                            Show All
                                        </Link>
                                    </div>
                                    <div className={s.cardContainer}>
                                        <div className={s.bgCard}></div>
                                        <div
                                            className={s.card}
                                            style={
                                                primaryCard[0].type ===
                                                "default"
                                                    ? {
                                                          backgroundColor:
                                                              "black",
                                                          color: "white",
                                                      }
                                                    : primaryCard[0].type ===
                                                      "green"
                                                    ? {
                                                          backgroundColor:
                                                              "green",
                                                          color: "white",
                                                      }
                                                    : primaryCard[0].type ===
                                                      "silver"
                                                    ? {
                                                          backgroundColor:
                                                              "silver",
                                                          color: "black",
                                                      }
                                                    : primaryCard[0].type ===
                                                      "golden"
                                                    ? {
                                                          backgroundColor:
                                                              "gold",
                                                          color: "black",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <div className={s.cardTop}>
                                                <p className={s.name}>
                                                    {userName}
                                                </p>
                                                <img
                                                    src={mastercard}
                                                    className={s.cardType}
                                                ></img>
                                            </div>
                                            <div className={s.cardBottom}>
                                                <p className={s.cardNumber}>
                                                    {primaryCard[0].card_number.replace(
                                                        /\B(?=(\d{4})+(?!\d))/g,
                                                        " "
                                                    )}
                                                </p>
                                                <div className={s.cvv}>
                                                    {primaryCard[0].cvv}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.bottom}>
                                    <ul className={s.list}>
                                        <li className={s.item}>
                                            <Link to="">
                                                <div className={s.left}>
                                                    <div
                                                        className={
                                                            s.iconContainer
                                                        }
                                                    >
                                                        <BiCreditCardFront
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                            }}
                                                        />
                                                    </div>
                                                    <p className={s.itemText}>
                                                        Show Card Details
                                                    </p>
                                                </div>
                                                <AiOutlineRight
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                        <li className={s.item}>
                                            <Link to="">
                                                <div className={s.left}>
                                                    <div
                                                        className={
                                                            s.iconContainer
                                                        }
                                                    >
                                                        <CgPassword
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                            }}
                                                        />
                                                    </div>
                                                    <p className={s.itemText}>
                                                        Your PIN
                                                    </p>
                                                </div>
                                                <AiOutlineRight
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                        <li className={s.item}>
                                            <Link to="">
                                                <div className={s.left}>
                                                    <div
                                                        className={
                                                            s.iconContainer
                                                        }
                                                    >
                                                        <AiOutlineLock
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                            }}
                                                        />
                                                    </div>
                                                    <p className={s.itemText}>
                                                        Security Code
                                                    </p>
                                                </div>
                                                <AiOutlineRight
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                        <li className={s.item}>
                                            <Link to="">
                                                <div className={s.left}>
                                                    <div
                                                        className={
                                                            s.iconContainer
                                                        }
                                                    >
                                                        <LuSettings2
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                            }}
                                                        />
                                                    </div>
                                                    <p className={s.itemText}>
                                                        Edit Limits
                                                    </p>
                                                </div>
                                                <AiOutlineRight
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                    }}
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className={s.btnContainer}>
                                        <Link to="create">
                                            <Button
                                                text={"Add Card"}
                                                Icon={AiOutlinePlus}
                                                color={"rgb(253, 242, 240)"}
                                                bgColor={"rgb(110, 70, 143)"}
                                            ></Button>
                                        </Link>
                                        <Button
                                            text={"Remove"}
                                            Icon={AiOutlineMinus}
                                            color={"rgb(255, 82, 124)"}
                                            bgColor={"rgb(253, 242, 240)"}
                                            handleClick={handleModalOpen}
                                        ></Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={s.placeholder}>
                                <p>You haven't selected your primary card</p>
                            </div>
                        )
                    ) : (
                        <div className={s.placeholder}>
                            <div className={s.placeholderContainer}>
                                <p>You don't have any card</p>
                                <Link to="create">Create a new one</Link>
                            </div>
                        </div>
                    )
                ) : (
                    <div className={s.placeholder}>
                        <p>Loading...</p>
                    </div>
                )}

                {/* <div className={s.placeholder}>
                    <div className={s.placeholderContainer}>
                        <h2>You don't have any cards</h2>
                        <Link to="create">
                            <Button
                                text={"Add a new card"}
                                color={"rgb(253, 242, 240)"}
                                bgColor={"rgb(110, 70, 143)"}
                            ></Button>
                        </Link>
                    </div>
                </div> */}
            </section>
        </>
    );
};

export default SummaryCard;
