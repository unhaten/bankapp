import { FC } from "react";
import Button from "../UI/Button/Button";
import s from "./DeleteModal.module.scss";

interface IDeleteModal {
    handleModalClose(): void;
    handleDelete(id: string | undefined): void;
    id?: string | undefined;
}

const DeleteModal: FC<IDeleteModal> = ({
    handleModalClose,
    handleDelete,
    id,
}) => {
    return (
        <div className={s.deleteModal}>
            <div className={s.modalContainer}>
                <h2 className={s.header}>
                    Are you sure you want to delete this card?
                </h2>
                <div className={s.btnContainer}>
                    <Button
                        text={"No"}
                        color={"rgb(0,0,0)"}
                        bgColor={"rgb(98, 253, 76)"}
                        handleClick={handleModalClose}
                    ></Button>
                    <Button
                        text={"Yes"}
                        color={"rgb(253, 242, 240)"}
                        bgColor={"rgb(255, 82, 124)"}
                        handleClick={() => handleDelete(id)}
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
