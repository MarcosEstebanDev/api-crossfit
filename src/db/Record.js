const DB = require('./db.json')


const getRecordForWorkout = (workoutId) =>{
    try{
        const record = DB.filter((record)=> record.workout === workoutId)
        if(!record){
            throw{ 
                status:400,
                message: `Can't find workout with the id '${workoutId}'`
            }
        }
        return record
    }catch(err){
        throw { status: err?.status || 500, message: err?.message || err }
    }
}

module.exports = { getRecordForWorkout }