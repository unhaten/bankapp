import styles from './ContactsUser.module.scss'
import { FC } from 'react';

interface IContactsUser {
    name: string,
    image?: string
}

const ContactsUser: FC<IContactsUser> = ({ name = '', image = '#' }) => {

    return (
        <li className={styles.item}>
            <div className={styles.imageContainer}>
                {image && <img src={image} className={styles.image} />}
            </div>
            <p className={styles.name}>{name}</p>
        </li>
    );
}

export default ContactsUser;