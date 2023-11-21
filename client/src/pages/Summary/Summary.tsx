import s from "./Summary.module.scss";
import { FC, useEffect, useState } from "react";
import SummaryCard from "./SummaryCard/SummaryCard";
import MoneyReceive from "./MoneyReceive/MoneyReceive";
import Ballance from "./Ballance/Balance";
import Referral from "./Referral/Referral";
import Contacts from "./Contacts/Contacts";
import Transactions from "./Transactions/Transactions";

interface ISummary {
    authToken: boolean;
    userEmail: string;
    userName: string;
    currency: number;
}

const Summary: FC<ISummary> = ({
    // authToken,
    userEmail,
    userName,
    currency,
}) => {
    const [transactions, setTransactions] = useState<[] | false>(false);
    const [cards, setCards] = useState<[] | false>(false);

    const getTransactionsData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/transactions/${userEmail}`
            );
            const json = await response.json();
            setTransactions(json);
        } catch (err) {
            console.error(err);
        }
    };

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

    useEffect(() => {
        getTransactionsData();
        getCardsData();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={s.container}>
                <div className={s.left}>
                    <SummaryCard
                        userName={userName}
                        cards={cards}
                        getCardsData={getCardsData}
                    ></SummaryCard>
                    <MoneyReceive></MoneyReceive>
                </div>
                <div className={s.right}>
                    <div className="row">
                        <Ballance currency={currency}></Ballance>
                        <Referral userName={userName}></Referral>
                    </div>
                    <div className="row">
                        <Contacts></Contacts>
                    </div>
                    <div className="row">
                        <Transactions
                            transactions={transactions}
                        ></Transactions>
                    </div>
                </div>
            </div>
            {/* {transactions?.map((item, index) => (
                <p key={index}>{item.destination}</p>
            ))} */}
        </>
    );
};

export default Summary;
