const Workout = require('../db/Workout')
const {v4: uuid} = require('uuid')

const getAllWorkouts = (filterParams) => {
    try{
        const allWorkouts = Workout.getAllWorkouts(filterParams)
        return allWorkouts;
    }catch(err){
        throw err
    }
}
const getOneWorkout = (workoutId) => {
    try{
        const workout = Workout.getOneWorkout(workoutId)
        return workout
    }catch(err){
        throw err
    }
}
const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString('en-US',{ timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: "UTC"})
    }
    try{
        const createdWorkout = Workout.createNewWorkout(workoutToInsert)
        return createdWorkout;
    }catch(err){
        throw err
    }
}
const updateOneWorkout= (workoutId, changes) => {
    try{
        const updateOneWorkout = Workout.updateOneWorkout(workoutId, changes)
        return updateOneWorkout
    }catch(err){
        throw err
    }
}
const deleteOneWorkout= (workoutId) => {
    Workout.deleteOneWorkout(workoutId)
}

module.exports = { getAllWorkouts, getOneWorkout, createNewWorkout, updateOneWorkout, deleteOneWorkout }