const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10,
    bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String, 
        lowercase: [true, 'lowercase only'], 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: {unique: true}
    },
    email: {
        type: String, 
        lowercase: [true, 'lowercase only'], 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: {unique: true}
    },
    bio: String,
    password: {
        type: String, 
        required: true
    }
}, { timestamps: true });


UserSchema.pre('save', async function(next) {
    let user = this;

    // only hash password if it has been modified or is new
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, SALT_WORK_FACTOR)
        user.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;