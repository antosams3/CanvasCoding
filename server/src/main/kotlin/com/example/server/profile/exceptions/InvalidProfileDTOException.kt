package com.example.server.profile.exceptions

class InvalidProfileDTOException(val messages: List<String?>) : RuntimeException() {
    override fun toString(): String {
        var errorMessage = ""
        for ((index,message) in messages.withIndex()){
            errorMessage += "${index+1}) $message\n"
        }
        return errorMessage
    }
}