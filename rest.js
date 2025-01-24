const express = require('express')
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');



let fakeData = [
  { id: uuid(), username: "user123", comment: "This is a great post!" },
  { id: uuid(), username: "coolguy456", comment: "I totally agree with this!" },
  { id: uuid(), username: "dev_dude", comment: "Can you explain more on this?" },
  { id: uuid(), username: "codingqueen", comment: "Amazing content, keep it up!" },
  { id: uuid(), username: "javaFan77", comment: "Wow, this blew my mind!" },
];
// 
// 
app.get('/', (req, res) => {
    res.send('this is home');
});
// 
// 
app.get("/comments", (req, res) => {
    res.render("comments/index",{fakeData});
});
app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    fakeData.push({ username, comment ,id: uuid()});
    res.redirect('/comments');
})
// 
// 
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
// 
// 
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const newC = fakeData.find((user) => user.id === id);
    if (!newC) {
        return res.send("Comment not found");
    }
    res.render("comments/edit", { newC });
});
// 
// 
app.get("/comments/:id", (req, res) => { 
    const { id } = req.params;
    const theComment = fakeData.find(user => user.id === id)
    if (theComment) {
        res.render("comments/show", { theComment });
    } else {
        res.send('id no')
    }
});
// 
// 
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const oldComment = fakeData.find(user => user.id === id);
    oldComment.comment = newComment;
    res.redirect("/comments");
})
//
// 
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    fakeData = fakeData.filter((user) => user.id !== id);
    res.redirect("/comments");
});
// 
// 
app.get('*', (req, res) => {
    res.send("EHHHH");
});
app.listen(port, () => {
    console.log('listening to: ', port);
})