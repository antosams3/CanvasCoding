package com.example.server.step

interface StepService {
    fun postStep(stepDTO: StepDTO): StepDTO?
    fun getStepsByLevelId(levelId: Int): List<StepDTO>
    fun getStep(id: Int): StepDTO?
    fun putStep(stepDTO: StepDTO): StepDTO?
    fun deleteStep(id: Int)
}