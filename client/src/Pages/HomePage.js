import React from "react";
import { useState, useEffect } from "react";
import Table from '../Components/Table';
import { useHistory } from "react-router-dom";

function HomePage({ changeExercise }) {
    const [exercises_db, setExercises ] = useState([]);
    const history = useHistory();

    // RETRIEVE the exercises in the database
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises_db = await response.json();
        setExercises(exercises_db);
    };

    // EDIT the exercises
    const onEditExercise = async editExercise => {
        changeExercise(editExercise);
        history.push("/edit-exercise");
    };

    // DELETE exercise
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method : 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises_db = await getResponse.json();
            setExercises(exercises_db);
        } else {
            console.error(`Failed to delete exercise with _id=${_id}, status code=${response.status}`);
        };
    };

    // LOAD the exercises in the database whenever components are mounted (setExercises)
    useEffect(() => {
        loadExercises();
    }, []);

    // Display the exercises
    return (
        <>
            <article>
                <h2>My Workout</h2>
                    <p>
                        Here are the exercises you have done so far
                    </p>
                    <Table
                        exercises_db={exercises_db}
                        onDeleteExercise={onDeleteExercise}
                        onEditExercise={onEditExercise}
                    />
            </article>
        </>
    );
};

export default HomePage