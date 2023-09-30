package com.example.server.step

import com.example.server.level.Level
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.ManyToOne

@Entity
class Step(
    var description : String,
    var dialogue: String,
    var action_menu: String,
    var side_menu: String,
    var check: String,
    var tip: String,
    @ManyToOne
    var level : Level
): EntityBase<Int>()

fun StepDTO.toEntity(level: Level): Step{
    return Step(description,dialogue,action_menu,side_menu,check,tip,level = level)
}