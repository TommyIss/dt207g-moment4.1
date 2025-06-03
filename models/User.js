/**
 * Användare model
 */
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');


// Användare schema
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Du måste fylla användarnamn'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Du måste fylla e-post'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Du måste fylla lösenord'],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hasha lösenordet
userSchema.pre('save', async function(next) {
    try {
        if(this.isNew || this.isModified('password')) {
            let hashPassword = await bcrypt.hash(this.password, 10);
            this.password = hashPassword;
        }

        next();
    } catch(error) {
        next(error);
    }
});

// Registrera användare
userSchema.statics.register = async function (username, email, password) {
    try{
        let user = new this({username, email, password});
        await user.save();
        return user;
    } catch(error) {
        throw error;
    }
}

// Jämför hashade lösenordet
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

// Logga in
userSchema.statics.login = async function (email, password) {
    try {
        let user = await this.findOne({email});

        if(!user) {
            throw new Error('Felaktigt användarnamn/lösenord');
        }
        let isPasswordMatched = await user.comparePassword(password);

        // Fel lösenord
        if(!isPasswordMatched) {
            throw new Error('Felaktigt användarnamn/lösenord');
        }

        // Rätt
        return user;
    } catch (error) {
        throw error;
    }
}

let User = mongoose.model('User', userSchema);
module.exports = User;