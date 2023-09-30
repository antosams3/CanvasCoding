package com.example.server.level

import com.example.server.level.exceptions.LevelNotFoundException
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.stereotype.Service

@Service
@Transactional
class LevelServiceImpl(
    private val levelRepository: LevelRepository
    ): LevelService {

    @Secured("ROLE_TEACHER")
    override fun postLevel(levelDTO: LevelDTO): LevelDTO? {
        return levelRepository.save(levelDTO.toEntity()).toDTO()
    }

    override fun getLevel(id: Int): LevelDTO? {
        val level = levelRepository.findByIdOrNull(id) ?: throw LevelNotFoundException("Level not found!")
        return level.toDTO()
    }

    @Secured("ROLE_TEACHER")
    override fun deleteLevel(id: Int) {
        levelRepository.findByIdOrNull(id) ?: throw LevelNotFoundException("Level not found!")
        levelRepository.deleteById(id)
    }

}