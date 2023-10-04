package com.example.server.gamesession

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GameSessionRepository: JpaRepository<GameSession, Int> {
    fun findGameSessionsByStudent_IdOrderByStep_IdDesc(student_id: Int): List<GameSession>
    fun findGameSessionByStudent_IdAndStep_Id(student_id: Int, step_Id: Int): GameSession?
}