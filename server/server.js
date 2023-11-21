const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

// get all transactions

app.get("/api/transactions/:userEmail", async (req, res) => {
    const { userEmail } = req.params;

    try {
        const transactions = await pool.query(
            "SELECT * FROM transactions WHERE userEmail = $1",
            [userEmail]
        );
        return res.json(transactions.rows);
    } catch (err) {
        console.error(err);
    }
});

// get all cards

app.get("/api/cards/:userEmail", async (req, res) => {
    const { userEmail } = req.params;

    try {
        const cards = await pool.query("SELECT * FROM cards WHERE email = $1", [
            userEmail,
        ]);
        // if (res.ok) {
        //     throw {
        //         message: "no cards",
        //     };
        // }
        // if (cards.rows.length === 0) {
        //     console.error("error");
        // } else {
        // }
        return res.json(cards.rows);
    } catch (err) {
        console.error(err);
    }
});

// create a new card

app.post("/api/cards", async (req, res) => {
    const { userEmail, cardNumber, cvv, type } = req.body;
    const id = uuidv4();
    const primary = false;
    try {
        const newCard = pool.query(
            "INSERT INTO cards(id, email, card_number, cvv, primary_card, type) VALUES($1, $2, $3, $4, $5, $6)",
            [id, userEmail, cardNumber, cvv, primary, type]
        );
        res.json(newCard);
    } catch (err) {
        console.error(err);
    }
});

// delete a card

app.delete("/api/cards/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCard = await pool.query(
            "DELETE FROM cards WHERE id = $1;",
            [id]
        );
        res.json(deleteCard);
    } catch (err) {
        console.error(err);
    }
});

// signup
app.post("/api/signup", async (req, res) => {
    const { email, name, password } = req.body;
    let strPass = password.toString();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(strPass, salt);
    const currency = 0;
    try {
        const signUp = await pool.query(
            `INSERT INTO users (email, name, hashed_password, currency) VALUES($1, $2, $3, $4)`,
            [email, name, hashedPassword, currency]
        );

        const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

        res.json({ email, name, token, currency });
    } catch (err) {
        if (err) {
            res.json({ detail: err.detail });
        }
    }
});

// login

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (!users.rows.length)
            return res.json({ detail: "User does not exists!" });

        const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

        const success = await bcrypt.compare(
            password.toString(),
            users.rows[0].hashed_password
        );

        if (success) {
            res.json({
                email: users.rows[0].email,
                name: users.rows[0].name,
                currency: users.rows[0].currency,
                token,
            });
        } else {
            res.json({ detail: "Login failed" });
        }
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => console.log("server running on port", PORT));
