package com.example.server.level

import com.example.server.course.exceptions.InvalidCourseDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class LevelController(
    private val levelService: LevelService
) {

    @PostMapping("/API/levels")
    fun postLevel(@Valid @RequestBody levelDTO: LevelDTO, br : BindingResult): LevelDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return levelService.postLevel(levelDTO)
    }

    @GetMapping("/API/levels/{id}")
    fun getLevel(@PathVariable id: Int): LevelDTO? {
        return levelService.getLevel(id)
    }

    @DeleteMapping("/API/levels/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteLevel(@PathVariable id: Int) {
        levelService.deleteLevel(id)
    }
}