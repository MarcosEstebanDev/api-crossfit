const recordService = require('../services/recordService')

const getRecordForWorkout = (req, res) => {
    const {
        params : { workoutId },
    } = req;
    if(!workoutId){
        res.status(400).send({
            status:"FAILED",
            data:{ error: "Parametrer 'workoutId' can"}
        })
        return
    }
    try{
        const record = recordService.getRecordForWorkout(workoutId)
        res.send({ status: "OK", data: record})
    }catch(err){
        res
        .status(err?.status || 500 )
        .send({ status: "FAILED", data: { error: err?.message || err }})
    }
}

module.exports = { getRecordForWorkout }