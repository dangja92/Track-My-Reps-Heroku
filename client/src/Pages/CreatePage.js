import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreatePage = () => {

    const [name, setName]       =   useState("");
    const [reps, setReps]       =   useState(0);
    const [weight, setWeight]   =   useState(0);
    const [unit, setUnit]       =   useState("lbs");
    const [date, setDate]       =   useState("");

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch('/exercises', {
            method : 'POST',
            body : JSON.stringify(newExercise),
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        if (response.status === 201) {
            alert("New Exercise Added! Good Job!");
        } else {
            alert(`Failed to add new exercise. Status code = ${response.status}`);
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
            <h2>Log your workouts</h2>
                <p>
                    You can add or log any exercise/workouts that you've finished here.
                    Keep up the great work!
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
                                    onClick={addExercise}
                                    id="submit">
                                        Add
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

export default CreatePage