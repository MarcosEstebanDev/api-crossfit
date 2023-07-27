const Record = require('../db/Record')

const getRecordForWorkout = (workoutId) => {
    try{
        const record = Record.getRecordForWorkout(workoutId)
        return record
    }catch(err){
        throw err
    }
}

module.exports = { getRecordForWorkout }