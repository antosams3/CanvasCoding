package com.example.server.step

import com.example.server.level.Level
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Step(
    var action_menu: String?,
    var complete_check: String?,
    var description : String?,
    var dialogue: String?,
    var side_menu: String?,
    var number: Int?,
    var tip: String?,
    @ManyToOne
    var level : Level
    ): EntityBase<Int>()

fun StepDTO.toEntity(level: Level): Step{
    return Step(action_menu,complete_check,description,dialogue, side_menu, number, tip, level = level)
}
