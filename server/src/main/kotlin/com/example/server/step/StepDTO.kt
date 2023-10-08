package com.example.server.step

data class StepDTO(
    val id: Int?,
    val action_menu: String?,
    val complete_check: String?,
    val description: String?,
    val dialogue: String?,
    val side_menu: String?,
    val tip: String?,
    val level_id: Int?,


    )

fun Step.toDTO() : StepDTO{
    return StepDTO(getId(),action_menu,complete_check,description,dialogue,side_menu,tip,level.getId())
}
