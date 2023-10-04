package com.example.server.gamesession

import com.example.server.profile.Profile
import com.example.server.step.Step
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne
import jakarta.persistence.Temporal
import jakarta.persistence.TemporalType
import java.util.Date

@Entity
class GameSession(
    @Temporal(TemporalType.TIMESTAMP)
    var timestamp: Date?,
    var code: String?,

    @ManyToOne
    var step: Step,

    @ManyToOne
    var student: Profile
): EntityBase<Int>()

fun GameSessionDTO.toEntity(step: Step, student: Profile, timestamp: Date?): GameSession{
    return GameSession(timestamp = timestamp,code, step = step, student = student)
}