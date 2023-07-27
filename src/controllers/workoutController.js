const workoutService = require('../services/workoutService')

const getAllWorkouts = (req,res)=>{
    const { mode }= req.body
    try{
        const allWorkouts = workoutService.getAllWorkouts({ mode })
        res.send({ status: 'OK', data: allWorkouts })
    }catch(err){
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data:{error:err?.message || err}})
    }
}

const getOneWorkout = (req,res) => {
const { params: { workoutId }} = req
if(!workoutId){
    res.status(400).send({ 
        status: "FAILED", data:{ error: "Parameter ':workoutId' can not be empty"},
    })
    return
}
try{
    const workout = workoutService.getOneWorkout(workoutId)
    res.send({status: "OK", data: workout })
}catch(err){
    res.status(err?.status || 500).send({ status: "FAILED", data:{ error: err?.message || err } })
}

}

const createNewWorkout = (req,res) => {
    const { body } = req;
    if( !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips ){
    res.status(400).send({ status: "FAILED", data: {error:"One of the following keys is missing or is empty in request body.."}})
    }
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }

    try{
        const createdWorkout = workoutService.createNewWorkout(newWorkout)
        res.status(201).send({ status: "Ok", data: createdWorkout})
    }catch(err){
        res
        .status(err?.status || 500)
        .send({ status:"FAILED", data:{error: err?.message || err }})
    }
}

const updateOneWorkout = (req,res) => {
    const { body, params: { workoutId },} = req
    if(!workoutId){
        res.status(400).send({
            status:"FAILED",
            data: { error: "Parameter ':workoutId' can notbe empty"},
        })
    }
    try{
        const updatedWorkout = workoutService.updateOneWorkout(workoutId,body)
            res.status(201).send({status:"OK", data: updatedWorkout})
    }catch(err){
        res
        .status(err?.status || 500)
        .send({ status:"FAILDED", data:{ error: err?.message || err } })
    }

}

const deleteOneWorkout = (req,res) => {
    const { params: {workoutId } } = req
    if(!workoutId){
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':workoutId' can not be empty"},
        })
    }
    try{
        workoutService.deleteOneWorkout(workoutId)
        res.status(204).send({status :"OK"})
    }catch(err){
        res
        .status(err?.status || 500)
        .send({ status:"FAILED", data:{ error: err?.message || error }})
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}