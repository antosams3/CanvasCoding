package com.example.server.archive

import com.example.server.profile.Profile
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ArchiveRepository: JpaRepository<Archive, Int> {
    fun findByStudent(student: Profile): Archive?
}