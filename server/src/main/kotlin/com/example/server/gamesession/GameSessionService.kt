package com.example.server.gamesession

interface GameSessionService {
    fun postGameSession(email:String, gameSessionDTO: GameSessionDTO): GameSessionDTO?
    fun getLatestGameSessionByStepIdDesc(email: String): GameSessionDTO?
    fun getGameSessionByStepId(email: String, step_id: Int): GameSessionDTO?
    fun putGameSession(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO?
    fun putNextStep(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO?
    fun getPreviousLevel(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO?
}