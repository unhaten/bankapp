import s from "./TransactionBlock.module.scss";
import { FC } from "react";

interface ITransactionBlock {
    data: {
        name: string;
        option: string;
        destination: string;
        date: Date;
        amount: string;
    };
    startDate: Date;
    endDate: Date | null;
}

const TransactionBlock: FC<ITransactionBlock> = ({ data }) => {
    const shortIconNameList: string[] = [];
    const shortName = data.name.split(" ");
    shortName.forEach((word: string) => {
        shortIconNameList.push(word.split("")[0]);
    });
    const shortIconName = shortIconNameList.join("");

    // const transactionStyle = data.option.toLowerCase() === "sent" ? {} : {};

    return (
        <li className={s.item}>
            <div className={s.trade}>
                <div
                    className={s.tradeIcon}
                    style={
                        data.option.toLowerCase() === "sent"
                            ? {
                                  color: "rgb(255, 82, 124)",
                                  backgroundColor: "rgb(253, 242, 240)",
                              }
                            : undefined
                    }
                >
                    {shortIconName}
                </div>
                <div className={s.tradeInfo}>
                    <p className={s.tradeName}>{data.name}</p>
                    <p className={s.tradeDirection}>
                        {data.option}: {data.destination}
                    </p>
                </div>
            </div>
            <div className={s.dateInfo}>
                <p className={s.date}>{data.date.toString()}</p>
                <p className={s.time}>1:05 PM</p>
            </div>
            <div className={s.cost}>
                <p
                    className={s.amount}
                    style={
                        data.option.toLowerCase() === "sent"
                            ? {
                                  color: "rgb(255, 82, 124)",
                              }
                            : undefined
                    }
                >
                    USD <span className={s.currency}>{data.amount}</span>
                </p>
            </div>
        </li>
    );
};

export default TransactionBlock;
