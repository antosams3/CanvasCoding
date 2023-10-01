package com.example.server.utils

enum class ActionMenu {
    EMPTY,
    OBJECT_PICKER,
    SORT_OPTIONS,
    SELECTOR;

    override fun toString() : String {
        return when(this) {
            EMPTY -> "EMPTY"
            OBJECT_PICKER -> "OBJECT PICKER"
            SORT_OPTIONS -> "SORT OPTIONS"
            SELECTOR -> "SELECTOR"
        }
    }
}

fun toActionMenu(string: String) : ActionMenu {
    return when(string){
        "EMPTY" -> ActionMenu.EMPTY
        "OBJECT PICKER" -> ActionMenu.OBJECT_PICKER
        "SORT OPTIONS" -> ActionMenu.SORT_OPTIONS
        "SELECTOR" -> ActionMenu.SELECTOR
        else -> throw IllegalStateException("This string cannot be casted to an ActionMenu")
    }
}