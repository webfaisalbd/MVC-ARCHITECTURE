const express = require('express');

const app = express();
const PORT = 3000;

// without body-parser
app.use(express.urlencoded({extended: true}));

const users = [
    {
        name: "Faisal",
        age: 25
    },
    {
        name: "Ahmed",
        age: 26
    }
]

const htmlForm = `
    <form method="POST" action="/users">
        <input type="text" name="name" placeholder="Enter your name" />
        <input type="number" name="age" placeholder="Enter your age" />
        <button type="submit">Save Data</button>
    </form>
`;


app.get('/users', (req, res) => {
    res.send(htmlForm);
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const user = {
        name, 
        age
    };
    users.push(user);
    res.status(201).json({
        success: true,
        users
    })
});

app.use((req,res,next)=>{
    res.status(404).json({
        message: "oh no, resource not found.",
    })
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});