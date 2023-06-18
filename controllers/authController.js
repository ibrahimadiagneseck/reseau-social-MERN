const User = require('../models/user.model');

// const registerUser = async (req, res) => {

//     const { user, email, password } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//         return res.status(200).send({ success: false, msg: "User already registered with this email" });
//     } else {

//         try {
//             const newEntry = new User(req.body);
//             newEntry.save();
//             console.log(newEntry);

//             return res.status(200).send({ success: true, msg: "Registration successful" })
//         } catch (error) {
//             return res.status(400).send({ sucess: false, msg: error})
//         }
//     }

// }

module.exports.signUp = async (req, res) => {

    const {
        pseudo,
        email,
        password
    } = req.body;

    try {
        const user = await User.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } catch (error) {
        res.status(400).send({ error })
    }
}

// module.exports = {
//     registerUser
// }