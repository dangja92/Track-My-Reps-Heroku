import React from "react";
import { RiDeleteBin5Fill, RiEdit2Fill } from 'react-icons/ri';

function Row({ exercise, onDeleteExercise, onEditExercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10)}</td>
            <td id="td-icon">
                <span className="change-cursor">
                    <RiDeleteBin5Fill onClick={() => onDeleteExercise(exercise._id)} />
                </span>        
            </td>
            <td id="td-icon">
                <span className="change-cursor">
                    <RiEdit2Fill onClick={() => onEditExercise(exercise)} />
                </span>
            </td>
        </tr>
    );
};

export default Row