package com.example.server.step

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface StepRepository: JpaRepository<Step, Int> {
    fun findStepsByLevel_IdOrderByIdAsc(level_id: Int): List<Step>
}