// Import Modules
const settings = require("../data/api-settings.json");
const axios = require('axios');
const express = require("express");
const router = express.Router();

// Import problems logic.
const problems = require("../src/problems-req.js");

// Get URL for given Index Problem 
router.get("/search", (req, res) => {
    let data = problems.printElement(req.query.index);
    res.send(`${JSON.stringify(data)}`);
});

// Get Direct Problem List
router.get("/refresh", (req, res) => {
    let session = req.query.userSession;
    axios.request({
        url: "https://leetcode.com/api/problems/all/",
        method: "get",
        headers: {
            Cookie: session == "enabled" ? `LEETCODE_SESSION=${settings.LEETCODE_SESSION};` : ``
        } 
    }).then((response) => {
        res.send(response.data);
        console.log(response.data);
    });
});

router.get("/test", (req, res) => {
    res.send(problems.sortByDifficulty());
});

// Always export the router so it can be accessed in the main index.js file
module.exports = router;