import React from "react";
import Row from './Row';

function Table({ exercises_db, onDeleteExercise, onEditExercise }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises_db.map((exercise, i) => 
                    <Row
                        exercise={exercise}
                        key={i}
                        onDeleteExercise={onDeleteExercise}
                        onEditExercise={onEditExercise}
                />)}
            </tbody>
        </table>
    );
};

export default Table