package com.example.server.gamesession

import com.example.server.gamesession.exceptions.GameSessionNotFoundException
import com.example.server.profile.ProfileRepository
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.step.StepRepository
import com.example.server.step.exceptions.StepNotFoundException
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
@Transactional
class GameSessionServiceImpl(
    private val gameSessionRepository: GameSessionRepository,
    private val profileRepository: ProfileRepository,
    private val stepRepository: StepRepository
): GameSessionService {

    override fun postGameSession(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val step = stepRepository.findByIdOrNull(gameSessionDTO.step_id)
            ?: throw StepNotFoundException("Step not found!")
        val currDate = Date.from(Instant.now())
        return gameSessionRepository.save(gameSessionDTO.toEntity(step, profile, currDate)).toDTO()
    }

    @Secured("ROLE_STUDENT")
    override fun getLatestGameSessionByStepIdDesc(email: String): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val sessions = gameSessionRepository.findGameSessionsByStudent_IdOrderByStep_IdDesc(profile.getId()!!)
        if(sessions.isEmpty()){
            throw GameSessionNotFoundException("Game session not found!")
        }else{
            return sessions[0].toDTO()
        }
    }

    override fun getGameSessionByStepId(email: String, step_id: Int): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val session = gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, step_id)
            ?: throw GameSessionNotFoundException("Game session not found!")
        return session.toDTO()
    }


    override fun putGameSession(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val step = stepRepository.findByIdOrNull(gameSessionDTO.id)
            ?: throw StepNotFoundException("Step not found!")
        val session = gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, step.getId()!!)
            ?: throw GameSessionNotFoundException("Game session not found!")

        session.apply {
            code = gameSessionDTO.code
        }
        return session.toDTO()
    }


}