const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (
    enteredPassword
) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

module.exports = mongoose.model("User", userSchema);