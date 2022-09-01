import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const EditPage = ({ myExercise }) => {

    const [name, setName]       =   useState(myExercise.name);
    const [reps, setReps]       =   useState(myExercise.reps);
    const [weight, setWeight]   =   useState(myExercise.weight);
    const [unit, setUnit]       =   useState(myExercise.unit);
    const [date, setDate]       =   useState(myExercise.date);

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${myExercise._id}`, {
            method : 'PUT',
            body : JSON.stringify({
                name : name,
                reps : reps,
                weight : weight,
                unit : unit,
                date : date
            }),
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        if (response.status === 200) {
            alert("Your workout has been updated");
        } else {
            const err = await response.json();
            alert(`Failed to update exercise. Status code = ${response.status}, error = ${err.Error}`);
        }

        history.push("/");
    };
    
    const options = [
        { label : "lbs", value : "lbs"},
        { label : "kgs", value : "kgs"},
        { label : "mi", value : "mi"},
        { label : "kms", value : "kms"},
        { label : "hr", value : "hr"},
        { label : "min", value : "min"},
        { label : "sec", value : "sec"},
        { label : "set", value : "set"}
    ]
    
    return (
        <>
        <article>
            <h2>Update Your Workouts</h2>
                <p>
                    You can update any of your past workout on this page
                </p> 
            <form onSubmit={(e) => { e.preventDefault();}}>
                <table id="add-or-edit">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="td-add-edit">
                            <label htmlFor="name">
                            <input 
                                type="text"
                                minLength="1"
                                required
                                size="15"
                                placeholder="Plank"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name" />
                            </label>
                        </td>

                        <td id="td-add-edit">
                            <label htmlFor="reps">
                            <input 
                                className="digit"
                                type="number"
                                min="0"
                                required
                                placeholder="0"
                                value={reps}
                                onChange={e => setReps(e.target.value)}
                                id="reps" />
                            </label>
                        </td>

                        <td id="td-add-edit">
                            <label htmlFor="weight">
                            <input 
                                className="digit"
                                type="number"
                                min="0"
                                required
                                placeholder="0"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                id="weight" />
                            </label>
                        </td>

                        <td id="td-add-edit">
                            <label htmlFor="unit">
                            <select 
                                name="unit" 
                                id="unit" 
                                value={unit} 
                                required
                                onChange={ e => setUnit(e.target.value)}>
                                {options.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            </label>
                        </td>

                        <td id="td-add-edit">
                            <label htmlFor="date">
                            <input 
                                type="date"
                                required
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                id="date" />
                            </label>
                        </td>

                        <td id="td-add-edit">
                            <label htmlFor="submit">
                                <button
                                    type="submit"
                                    onClick={editExercise}
                                    id="submit">
                                        Save
                                    </button>
                            </label>
                        </td>
                    </tr>
                </tbody>
                </table>
            </form>
        </article>
        </>
    );
};

export default EditPage