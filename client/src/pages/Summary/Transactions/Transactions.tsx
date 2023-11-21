import s from "./Transactions.module.scss";
import { useState, useRef, FC } from "react";
import TransactionBlock from "./TransactionBlock/TransactionBlock";
import { AiOutlineRight } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
// import data from "./TransactionBlock/TransactionData";

import "react-datepicker/dist/react-datepicker.css";

interface ITransactions {
    transactions: [] | false;
}

const Transactions: FC<ITransactions> = ({ transactions }) => {
    // const ref = useRef();
    const [isDatePickerActive, setIsDatePickerActive] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates: [Date, Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <section className={s.section}>
            <div className={s.topContainer}>
                <h2 className={s.header}>Transactions History</h2>
                <div className={s.options}>
                    <div className={s.dateSelection}>
                        <div
                            className={s.dateContent}
                            onClick={() =>
                                setIsDatePickerActive((prev) => !prev)
                            }
                        >
                            <p className={s.text}>Select Date Range</p>
                            <div className={s.icon}>
                                <MdDateRange
                                    style={{ width: 25, height: 25 }}
                                />
                            </div>
                        </div>
                        <AnimatePresence>
                            {isDatePickerActive && (
                                <motion.div
                                    className={s.dateContainer}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <DatePicker
                                        selected={startDate}
                                        onChange={onChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className={s.arrowContainer}>
                        <AiOutlineRight />
                    </div>
                </div>
            </div>
            <div className={s.container}>
                <ul className={s.list}>
                    {transactions ? (
                        transactions.length > 0 ? (
                            transactions.map((item, index) => (
                                <TransactionBlock
                                    key={index}
                                    data={item}
                                    startDate={startDate}
                                    endDate={endDate}
                                ></TransactionBlock>
                            ))
                        ) : (
                            <p>No transactions so far</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default Transactions;
