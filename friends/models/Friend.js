import mongoose from 'mongoose';

const FriendSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Friend', FriendSchema);