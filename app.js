const express = require("express");
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

firebase.initializeApp({
  databaseURL: "https://drag-drop-to-watch.firebaseio.com/",
});

const db = firebase.database();
console.log(db);

let app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * Delete User
 *
 */
app.delete("/user/:userId", function (req, res) {
  // req.user.name = req.params.name
  const _id = req.params.userId;
  // const _id = req.body._id;
  const name = req.body.name;
  const age = req.body.age;
  const loc = req.body.loc;

  let ref = db.ref("users");

  let mainKey;
  ref
    .orderByChild("_id")
    .equalTo(_id)
    .on("child_added", function (snapshot) {
      console.log(snapshot.key);
      mainKey = snapshot.key;
      console.log(`mainKey`, mainKey);
      db.ref("users/" + mainKey).remove();
    });

  res.send({
    message: "delete success",
  });
});

/**
 * Get User by id
 *
 */
app.get("/user/:userId", function (req, res) {
  const _id = req.params.userId;
  let ref = db.ref("users");
  let mainKey, data;

  ref
    .orderByChild("_id")
    .equalTo(_id)
    .on("child_added", function (snapshot) {
      console.log(snapshot.key);
      mainKey = snapshot.key;
      data = snapshot;
      console.log(`mainKey`, mainKey);
      res.send(data);
    });
});

/**
 * Update User
 *
 */
app.put("/user/:userId", function (req, res) {
  // req.user.name = req.params.name
  const _id = req.params.userId;
  // const _id = req.body._id;
  const name = req.body.name;
  const age = req.body.age;
  const loc = req.body.loc;

  var newData = {
    _id,
    name,
    age,
    loc,
  };

  let ref = db.ref("users");

  let mainKey;
  ref
    .orderByChild("_id")
    .equalTo(_id)
    .on("child_added", function (snapshot) {
      console.log(snapshot.key);
      mainKey = snapshot.key;
      console.log(`mainKey`, mainKey);
      db.ref("users/" + mainKey).set(newData);
    });

  res.send({
    message: "update success",
  });
});

/**
 * Get all Users
 *
 */
app.get("/user", function (req, res) {
  db.ref("users").once("value", function (snapshot) {
    let arr = [];
    let obj = snapshot.val();
    console.log(obj);
    for (const item of Object.values(obj)) {
      arr.push(item);
    }
    res.send(arr);
  });
});
/**
 * Create User
 *
 */
// POST { "name": "tobi" }
// req.body.name
// => "tobi"
// { "user": "Ben", "age": 26, "loc":"Taipei"}
app.post("/user", function (req, res) {
  const _id = uuidv4();
  const name = req.body.name;
  const age = req.body.age;
  const loc = req.body.loc;

  var newData = {
    _id,
    name,
    age,
    loc,
  };

  const itemRef = db.ref("users").push();

  itemRef.set(newData).then(function () {
    db.ref("users").once("value", function () {
      res.send({
        ...newData,
      });
    });
  });
});

app.listen(3000);
