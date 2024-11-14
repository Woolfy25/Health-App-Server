const User = require("./schemas/Users");
// const Contacts = require("./schemas/Contacts");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secret = process.env.SECRET;
const pass = process.env.PASS;

// Done
const logOutAccount = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    user.token = null;
    await user.save();

    return userId;
  } catch (error) {
    throw error;
  }
};

// Done
const createAccount = async ({ email, name, password }) => {
  try {
    const userExistent = await User.findOne({ email });
    if (userExistent) {
      throw new Error("Aceste email exista deja!");
    }

    const codUnicDeVerificare = nanoid();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ramonspuci@gmail.com",
        pass: pass,
      },
    });

    const mailOptions = {
      from: "ramonspuci@gmail.com",
      to: `${email}`,
      subject: "Email de verificare cont Slim Mom",
      text: `Codul tau de verificare este ${codUnicDeVerificare}, http://localhost:3000/health/account/verify/${codUnicDeVerificare}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });

    const newUser = User({
      email,
      name,
      verificationToken: codUnicDeVerificare,
    });
    newUser.setPassword(password);

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      },
      secret,
      { expiresIn: "1h" }
    );
    savedUser.token = token;

    return await savedUser.save();
  } catch (error) {
    throw error;
  }
};

// Done
const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email sau parola gresita!");
    }

    if (!user.verify) {
      throw new Error("Trebuie sa iti verifici contul!");
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      secret,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;

    return await user.save();
  } catch (error) {
    throw error;
  }
};

// Done
const updateAccount = async (accountId, updatedData) => {
  try {
    return await User.findByIdAndUpdate(
      accountId,
      { $set: updatedData },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

// Done
const deleteAccount = async (accountId) => {
  try {
    return User.deleteOne({ _id: accountId });
  } catch (error) {
    throw error;
  }
};

const getAllContacts = async (ownerId) => {
  try {
    return Contacts.find({ owner: ownerId });
  } catch (error) {
    throw error;
  }
};

const addContact = async ({ name, email, phone, ownerId }) => {
  try {
    const contact = new Contacts({
      name,
      email,
      phone,
      owner: ownerId,
    });
    await contact.save();

    return contact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, updatedData, ownerId) => {
  try {
    update = { ...updatedData };
    console.log(update);
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      { $set: update },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error(
        "Contact not found or you don't have permission to update"
      );
    }

    return updatedContact;
  } catch (error) {
    throw error;
  }
};

const deleteContact = async (contactId, ownerId) => {
  try {
    const deletedContact = await Contacts.deleteOne({
      _id: contactId,
      owner: ownerId,
    });

    if (deletedContact.deletedCount === 0) {
      throw new Error(
        "Contact not found or you don't have permission to delete"
      );
    }

    return deletedContact;
  } catch (error) {
    throw error;
  }
};

// Done
const verifyEmailAddress = async (verificationToken) => {
  try {
    const update = { verify: true, verificationToken: null };

    const result = await User.findOneAndUpdate(
      {
        verificationToken: verificationToken,
      },
      { $set: update },
      { new: true }
    );

    if (!result) throw new Error("Userul nu exista!");
  } catch (error) {
    throw error;
  }
};

const verifyEmailResend = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Userul nu exista!");
    if (user.verify === true)
      throw new Error("Verification has already been passed!");

    const codUnicDeVerificare = user.verificationToken;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ramonspuci@gmail.com",
        pass: pass,
      },
    });

    const mailOptions = {
      from: "ramonspuci@gmail.com",
      to: `${email}`,
      subject: "Email de verificare cont Slim Mom",
      text: `Codul tau de verificare este ${codUnicDeVerificare}, http://localhost:3000/health/account/verify/${codUnicDeVerificare}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  checkUserDB,
  updateAccount,
  logOutAccount,
  deleteAccount,
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
  verifyEmailAddress,
  verifyEmailResend,
};
