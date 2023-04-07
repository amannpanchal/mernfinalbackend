const express = require("express");
const mongoose = require("mongoose");
const Register = require("./models/Schema");

const cors = require("cors");
const PORT = process.env.PORT || 5000 ;
const BASE_URL = process.env.BASE_URL

const ImageModel = require("./models/imageModel");


const path = require("path");
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const db = "mongodb+srv://howareyou:howareyou@cluster0.tysxevl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db).then(() => {
    console.log("The database is conncected successfully");

}).catch((e) => {
    console.log("The error in database is : ", e);
});

app.post("/uplaod", async (req, res) => {
    console.log("hey");
    const { name, image } = req.body;
    try {
        const user = new ImageModel({
            name, image
        })
        console.log(user);
        const result = await user.save();

        res.json({ msg: "request is sent" })
        console.log("Saved successfullY");


    } catch (e) {
        console.log('The error in the upload req. is ', e);
    }
})

app.get("/uplaod", async (req, res) => {
    try {
        const result = await ImageModel.find({});
        console.log(result);
        res.send({ msg: "data is sent", result })
        console.log("Data is saved updating successfully");

    } catch (e) {
        console.log("The error in uplaod database is : ", e);
    }
})







// ______Finish______


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Register.findOne({
            email: email
        })
        if (user) {
            res.json({ msg: "User is already exist." })
        }
        else {
            const user = await new Register({
                name, email, password
            })
            const result = user.save();
            res.json({
                msg: "User is created successfully"
            })
        }
    } catch (e) {
        console.log("The error in post request is : ", e);
    }
}
);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Register.findOne({ email: email });
        console.log("something we found :", user);
        if (user) {
            if (user.password == password) {

                res.json({ msg: "Login Successful", user: user })
            } else {
                res.json({ msg: "Password is incorrect." })
            }


        }
        else if (user == null) {
            res.json({ msg : "User does not exist." })
        }

    } catch (e) {
        console.log("The error in login page is : ", e);
    }
})




app.put('/put/:id', async (req, res) => {
    // console.log("hello");
    try {
        const { name, image, id } = req.body;


        await ImageModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: name,
                image: image,

            }
        }, {
            new: true
        }).then((data) => {
            res.json({ msg: "Data is updated succesfully", data });
            console.log("Data is updated succsessfully")
        }).catch((e) => {
            console.log("Ther error in in mongo db :", e);
        })
        // console.log(updatedItem);

    } catch (e) {
        res.json({ msg: "There is an error to change the data" })
    }
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);
    const deleteItem = await ImageModel.findByIdAndDelete({ _id: id }).then(() => {
        res.json({ msg: "Item Deleted" })
    }).catch((e) => {
        res.json({ msg: "There is error to delete" })
    }
    )
})


app.listen(PORT, () => {
    console.log("The server is running successfully at server 5000");
})