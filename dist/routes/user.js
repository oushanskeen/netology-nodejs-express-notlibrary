"use strict";
module.exports = (app) => {
    app.post("/api/user/login", (req, res) => {
        res.status(201);
        res.json({ id: 1, mail: "test@mail.ru" });
    });
};
