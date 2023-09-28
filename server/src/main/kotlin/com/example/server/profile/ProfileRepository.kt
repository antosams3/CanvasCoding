package com.example.server.profile

import com.example.server.utils.ProfileType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProfileRepository : JpaRepository<Profile, Int> {
    fun findByEmail(email: String?) : Profile?
    fun deleteByEmail(email: String?)
    fun findByType(type: ProfileType) : List<Profile>

}