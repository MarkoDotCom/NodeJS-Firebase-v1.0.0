const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");

var serviceAccount = require("../../nodejs-firebase-304db-firebase-adminsdk-etv1h-0410c5d284.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-firebase-304db.firebaseio.com/",
});

const db = admin.database();

router.get("/", (req, res) => {
  db.ref("contacts").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("index", { contacts: data });
  });
});

router.post("/new-contact", (req, res) => {
  console.log(req.body);
  const newContact = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
  };
  db.ref("contacts").push(newContact);
  res.redirect('/');
});

router.get('/delete-contact/:id', (req,res) => {
  db.ref('contacts/' + req.params.id).remove();
  res.redirect('/');
});

module.exports = router;
