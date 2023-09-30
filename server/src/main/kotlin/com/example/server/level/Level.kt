package com.example.server.level

import com.example.server.utils.EntityBase
import jakarta.persistence.Entity

@Entity
class Level(
    var description: String = "",
    var goal: String = ""
): EntityBase<Int>()

fun LevelDTO.toEntity() : Level{
    return Level(description,goal)
}