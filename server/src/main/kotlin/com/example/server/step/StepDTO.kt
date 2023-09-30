package com.example.server.step

data class StepDTO(
    val id: Int?,
    val description: String,
    val dialogue: String,
    val action_menu: String,
    val side_menu: String,
    val tip: String,
    val check: String,
    val level_id: Int?
)

fun Step.toDTO() : StepDTO{
    return StepDTO(getId(),description,dialogue,action_menu,side_menu,tip,check,level.getId())
}