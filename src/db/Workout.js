const DB = require('./db.json')
const { saveToDataBase } = require('./utils')

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllWorkouts = (filterParams) =>{
  try {
    let workouts = DB.workouts
    if(filterParams.mode){
      return DB.workouts.filter((workout)=> workout.mode.toLowerCase().includes(filterParams.mode))
    }
    return workouts
  }catch(err){
    throw { status: 500, message: err}
  }
}
const getOneWorkout = (workoutId) =>{
  try{
    const workout = DB.workouts.find((workout)=> workout.id === workoutId)
    if(!workout){
      throw{
        status:400,
        message:`Can't find workout with the id '${workoutId}'`
      }
    }
return workout
  }catch(err){
    throw{ status: err?.status || 500, message: err?.message || err}
  }
  }
const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      throw{
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      }
    }
    try{
      DB.workouts.push(newWorkout);
      saveToDataBase(DB);
      return newWorkout;
    }catch(err){
      throw { status: 500, message: err?.message || err }
    }

  };
  const updateOneWorkout = (workoutId, changes) => {
    try{
      const isAlreadyAdded = DB.workouts.findIndex((workout)=>workout.name === changes.name) > -1
      if(isAlreadyAdded){
        throw{
          status:400,
          message:`Workout with the name '${changes.name}' already exists`,
        }
      }
      const indexForUpdate = DB.workouts.findIndex((workout)=> workout.id === workoutId)
      if(indexForUpdate === -1){
        throw{
          status:400,
          message:`Can't find workout with the id'${workoutId}'`,
        }
      }
      const updateOneWorkout = {
        ...DB.workouts[indexForUpdated],
        ...changes,
        updateAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
      }
      DB.workouts[indexForUpdated] = updateOneWorkout;
      saveToDataBase(DB)
      return updateOneWorkout
    }catch(err){
      throw{ status: err?.status || 500, message: err?.message || err}
    }
}
const deleteOneWorkout = (workoutId) => {
  try{
    const indexForDeleted = DB.workouts.findIndex((workout)=>workout.id === workoutId)
  if(indexForDeleted === -1){
    throw{
      status:400,
      message:`Can't find workout with the id '${workoutId}'`
    }
  }
  DB.workouts.splice(indexForDeleted, 1)
  saveToDataBase(DB)
  }catch(err){
    throw{ status: err?.status || 500, message:err?.message || err}
  }
}
module.exports = {  getAllWorkouts,
                    createNewWorkout,
                    getOneWorkout,
                    updateOneWorkout,
                    deleteOneWorkout  };