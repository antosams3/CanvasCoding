package com.example.server.gamesession

import java.util.*

data class GameSessionDTO(
    val id: Int?,
    val timestamp: Date?,
    val code: String?,
    val step_id: Int?,
    val profile_id: Int?
)

fun GameSession.toDTO(): GameSessionDTO{
    return GameSessionDTO(getId(),timestamp,code,step.getId(),student.getId())
}