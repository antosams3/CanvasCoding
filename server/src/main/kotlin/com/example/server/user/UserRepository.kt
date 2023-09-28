package com.example.server.user

import com.example.server.utils.UserType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Int> {
    fun findByEmail(email: String?) : User?
    fun deleteByEmail(email: String?)
    fun findByType(type: UserType) : List<User>

}