package com.example.server.user.exceptions

class UserAlreadyExistingException(override val message: String?): RuntimeException() {
}