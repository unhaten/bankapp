import Button from "../../components/UI/Button/Button";
import { FC, useState, ChangeEvent } from "react";
import s from "./Auth.module.scss";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface IAuth {
    authToken: boolean;
}

const Auth: FC<IAuth> = ({ authToken }) => {
    //eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies<any>(null);
    const [registration, setRegistration] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [password, setPassword] = useState<number | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<number | null>(null);

    const handleClick = () => {
        setRegistration((prev) => !prev);
    };

    const handleLogInClick = async (
        e: ChangeEvent<HTMLInputElement>,
        endpoint: string
    ) => {
        e.preventDefault();
        setError(null);
        const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie("Email", data.email);
            setCookie("Name", data.name);
            setCookie("Currency", data.currency);
            setCookie("AuthToken", data.token);

            // window.location.reload();
        }
    };

    const handleRegisterClick = async (
        e: ChangeEvent<HTMLInputElement>,
        endpoint: string
    ) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Make sure that passwords match!");
            return;
        }
        setError(null);
        const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                name,
                password,
            }),
        });
        console.log(response);
        const data = await response.json();
        // data = email + token

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie("Email", data.email);
            setCookie("Name", data.name);
            setCookie("Currency", data.currency);
            setCookie("AuthToken", data.token);

            // window.location.reload();
        }
    };
    if (authToken) {
        return <Navigate to="/" replace></Navigate>;
    }
    return (
        <section className={s.auth}>
            <form action="" className={s.form}>
                <div className={s.container}>
                    <h1 className={s.header}>
                        {registration ? "Sign Up " : "Log In"}
                    </h1>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className={s.input}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {registration && (
                        <input
                            type="text"
                            placeholder="Name"
                            className={s.input}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        className={s.input}
                        onChange={(e) => setPassword(parseInt(e.target.value))}
                    />
                    {registration && (
                        <input
                            type="password"
                            placeholder="Repeat password"
                            className={s.input}
                            onChange={(e) =>
                                setConfirmPassword(parseInt(e.target.value))
                            }
                        />
                    )}
                    <small onClick={handleClick}>
                        {registration
                            ? "Move to Log In Page"
                            : "Create An Account"}
                    </small>
                    <Button
                        text={registration ? "Sign up" : "Log in"}
                        color={"#fff"}
                        bgColor={"rgb(110, 70, 143)"}
                        handleClick={
                            !registration
                                ? (e) => handleLogInClick(e, "login")
                                : (e) => handleRegisterClick(e, "signup")
                        }
                    ></Button>
                    {error && <p>{error}</p>}
                </div>
            </form>
        </section>
    );
};

export default Auth;
