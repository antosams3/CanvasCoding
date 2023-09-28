package com.example.server.user

interface UserService {
    fun postUser(courseId: Int, userDTO: UserDTO) : UserDTO?
    fun deleteUser(email: String)
    fun getUser(email: String): UserDTO?
    fun getUsersByType(type: String) : List<UserDTO?>
}