let mongoose = require("mongoose")

let CourseSchema = new mongoose.Schema({
    title: String,
    desc: String,
    wistiaId: String,
    price: Number,
    ownByTeacher: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    ownByStudent: [{
        user: {
            type: Schema.Types.ObjectId, ref: 'User' 
        },
    }],
    totalStudents: Number
})

module.export = mongoose.model('Course', CourseSchema)