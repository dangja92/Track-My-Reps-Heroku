import 'dotenv/config';
import express from 'express';
import * as Exercises from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ***************************************
app.post('/exercises', (req, res) => {
    Exercises.createExercise(
        req.body.name, 
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error : "Invalid request"});
        });
});

// RETRIEVE controller *************************************
// GET exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    Exercises.getExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error : "Exercise not found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error : "Failed to retrieve exercise"});
        });
});

// GET all exercises in database
app.get('/exercises', (req, res) => {
    let filter = {};
    Exercises.getExercise(filter)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.send({ Error : "Request to retrieve documents failed"});
        });
});


// DELETE controller ******************************************
app.delete('/exercises/:_id', (req, res) => {
    Exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error : "Exercise not found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.send({ Error : "Request to delete document failed"});
        });
});


// UPDATE controller ******************************************
app.put('/exercises/:_id', (req, res) => {
    Exercises.replaceExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({
                    _id : req.params._id,
                    name : req.body.name,
                    reps : req.body.reps,
                    weight : req.body.weight,
                    unit : req.body.unit,
                    date : req.body.date
                });
            } else {
                res.status(404).json({ Error : "Cannot find the exercise to be updated"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error : "Invalid Request"});
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});