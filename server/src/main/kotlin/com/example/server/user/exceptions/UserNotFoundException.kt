package com.example.server.user.exceptions

class UserNotFoundException(override val message: String?) : RuntimeException() {
}