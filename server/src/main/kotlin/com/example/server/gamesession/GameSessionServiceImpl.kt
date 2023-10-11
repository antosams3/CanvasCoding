package com.example.server.gamesession

import com.example.server.gamesession.exceptions.GameSessionNotFoundException
import com.example.server.gamesession.exceptions.OperationNotAllowedException
import com.example.server.profile.ProfileRepository
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.step.StepRepository
import com.example.server.step.exceptions.StepNotFoundException
import com.example.server.step.toDTO
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.security.access.prepost.PreAuthorize
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

    @PreAuthorize("#email == authentication.principal.claims['email']")
    override fun getGameSessionByStepId(email: String, step_id: Int): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val session = gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, step_id)
            ?: throw GameSessionNotFoundException("Game session not found!")
        return session.toDTO()
    }

    @Secured("ROLE_STUDENT")
    override fun putGameSession(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO? {
        profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")
        val session = gameSessionRepository.findByIdOrNull(gameSessionDTO.id)
            ?: throw GameSessionNotFoundException("Game session not found!")

        session.apply {
            code = gameSessionDTO.code
        }
        return session.toDTO()
    }

    @PreAuthorize("#email == authentication.principal.claims['email']")
    override fun putNextStep(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")

        if(gameSessionDTO.step_id !== null){
            // Retrieve current game session
            val session = gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, gameSessionDTO.step_id)
            // Save code to current gameSession
            session?.apply {
                code = gameSessionDTO.code
            }
            // Retrieve next gameSession
            val nextSession = gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, gameSessionDTO.step_id + 1)
            if(nextSession !== null){
                // GameSession already existing
                nextSession.apply {
                    code = gameSessionDTO.code
                }
                return nextSession.toDTO()
            }else{
                // New GameSession
                val dto = GameSessionDTO(null,null,gameSessionDTO.code,gameSessionDTO.step_id + 1, profile.getId())
                return postGameSession(email, dto)
            }

        }else{
            throw StepNotFoundException("Step not found!")
        }

    }

    @PreAuthorize("#email == authentication.principal.claims['email']")
    override fun getPreviousLevel(email: String, gameSessionDTO: GameSessionDTO): GameSessionDTO? {
        // gameSessionDTO contains only actual step_id
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found!")

        if(gameSessionDTO.step_id !== null){
            // Check existing actual gameSession
            gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!, gameSessionDTO.step_id)
                ?: throw GameSessionNotFoundException("GameSession not found")
            // Retrieve current step and level
            val currentStepDTO = stepRepository.findByIdOrNull(gameSessionDTO.step_id)?.toDTO()
                ?: throw StepNotFoundException("Step not found")
            val previousLevel = currentStepDTO.level_id?.minus(1)

            // Check previous level
            if(previousLevel != 0){
                // Retrieve previous step
                val previousStep = stepRepository.findStepByLevelIdOrderByNumberAsc(previousLevel!!).toDTO()
                if(previousStep.id !== null){
                    // Retrieve previous gameSession
                    return gameSessionRepository.findGameSessionByStudent_IdAndStep_Id(profile.getId()!!,previousStep.id)!!.toDTO()
                }else{
                    throw StepNotFoundException("Step not found!")
                }
            }else{
                throw OperationNotAllowedException("Operation not allowed!")
            }

        }else{
            throw GameSessionNotFoundException("GameSession ID not defined!")
        }
    }


}