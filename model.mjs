// Import dependencies
import mongoose from "mongoose";
import 'dotenv/config';

// Connect to MongoDB via connect string
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser : true }
);
const db = mongoose.connection;

// Confirm connection to MongoDB
db.once('open', (err) => {
    if (err) {
        res.status(500).json({ error : "500 Server Error: Connection to server failed"})
    } else {
        console.log("Successfully connected to MongoDB Exercises collection using Mongoose")
    }
});

// Define the SCHEMA for exercises
const exercisesSchema = mongoose.Schema({
    name : { 
        type: String, 
        required: true,
        minlength: 1,
        cast: false
    },
    
    reps : {
        type: Number,
        required: true,
        min: 0,
        cast: false
    },

    weight : {
        type: Number,
        required: true,
        min: 0,
        cast: false,
    },

    unit : {
        type: String,
        required: true,
        enum: ['lbs', 'kgs', 'miles', 'kms', 'min', 'sec']
    },

    date : {
        type: Date,
        required: true,
    },
});

// Compile the Exercises model using Schema
const Exercise = mongoose.model('Exercises', exercisesSchema);

// CREATE model ***********************************************
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name : name,
        reps : reps,
        weight : weight,
        unit : unit, 
        date : date
    });
    return exercise.save();
};


// RETRIEVE model *********************************************
// Retrieve exercise based on filter
const getExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

// Retrieve exercise based on its ID
const getExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};


// DELETE model ************************************************
// Delete exercise based on its ID
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id : _id});
    return result.deletedCount;
};


// UPDATE model ************************************************
// Update the exercise based on its ID
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id : _id }, {
        name : name,
        reps : reps,
        weight : weight, 
        unit : unit,
        date : date
    }, {runValidators : true});
    return result.modifiedCount;
};


// Export our models to the controller 
export { createExercise, getExercise, getExerciseById, replaceExercise, deleteExercise }
