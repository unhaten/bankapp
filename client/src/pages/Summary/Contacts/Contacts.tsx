import { Link } from 'react-router-dom';
import s from './Contacts.module.scss'
import data from './contactsData'
import ContactsUser from './ContactsUser/ContactsUser';

const Contacts = () => {
    const contactsList = data.map((item, index) =>
        <ContactsUser key={index} name={item.name}></ContactsUser>
    )

    return (
        <section className={s.contacts}>
            <div className="row">
                <h2 className={s.header}>Recent Contacts</h2>
                <Link to='' className={s.link}>All Contacts</Link>
            </div>
            <ul className={s.list}>
                <li className={s.add}>
                    <button className={s.button}>+</button>
                    <p className={s.addText}>Add</p>
                </li>
                {contactsList}
            </ul>
        </section>
    );
}

export default Contacts;