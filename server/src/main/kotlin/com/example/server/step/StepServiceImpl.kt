package com.example.server.step

import com.example.server.level.LevelRepository
import com.example.server.level.exceptions.LevelNotFoundException
import com.example.server.step.exceptions.StepNotFoundException
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.stereotype.Service

@Service
@Transactional
class StepServiceImpl(
    private val stepRepository: StepRepository,
    private val levelRepository: LevelRepository
) : StepService {

    @Secured("ROLE_TEACHER")
    override fun postStep(stepDTO: StepDTO): StepDTO? {
        val level = levelRepository.findByIdOrNull(stepDTO.level_id)
        if(level !== null){
            return stepRepository.save(stepDTO.toEntity(level)).toDTO()
        }else{
            throw LevelNotFoundException("Level not found!")
        }
    }

    override fun getStepsByLevelId(levelId: Int): List<StepDTO> {
        val level = levelRepository.findByIdOrNull(levelId)
        if(level != null){
            return stepRepository.findStepsByLevel_Id(levelId).map { it.toDTO() }

        }else{
            throw LevelNotFoundException("Level not found!")
        }
    }

    override fun getStep(id: Int): StepDTO? {
        val step = stepRepository.findByIdOrNull(id)
            ?: throw StepNotFoundException("Step not found!")
        return step.toDTO()
    }

    @Secured("ROLE_TEACHER")
    override fun putStep(stepDTO: StepDTO): StepDTO? {
        val newlev = levelRepository.findByIdOrNull(stepDTO.level_id)

        if(newlev !== null){
            val step = stepRepository.findByIdOrNull(stepDTO.id) ?: throw StepNotFoundException("Step not found")
            step.apply {
                description = stepDTO.description
                action_menu = stepDTO.action_menu
                side_menu = stepDTO.side_menu
                complete_check = stepDTO.complete_check
                tip = stepDTO.tip
                dialogue = stepDTO.dialogue
                level = newlev
            }
            return step.toDTO()
        }else{
            throw LevelNotFoundException("Level not found!")
        }
    }

    @Secured("ROLE_TEACHER")
    override fun deleteStep(id: Int) {
        stepRepository.findByIdOrNull(id) ?: throw StepNotFoundException("Step not found!")
        stepRepository.deleteById(id)
    }
}