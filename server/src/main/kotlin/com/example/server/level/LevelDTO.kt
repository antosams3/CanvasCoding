package com.example.server.level

data class LevelDTO(
    val id: Int?,
    val description: String,
    val goal: String
)

fun Level.toDTO() : LevelDTO {
    return LevelDTO(getId(),description, goal)
}