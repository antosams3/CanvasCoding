package com.example.server.step

import com.example.server.course.exceptions.InvalidCourseDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class StepController(
    private val stepService: StepService
) {
    @PostMapping("/API/steps")
    fun postStep(@Valid @RequestBody stepDTO: StepDTO, br : BindingResult): StepDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return stepService.postStep(stepDTO)
    }

    @GetMapping("/API/step/{id}")
    fun getStep(@PathVariable id: Int): StepDTO?{
        return stepService.getStep(id)
    }

    @GetMapping("/API/steps/{level_id}")
    fun getStepsByLevelId(@PathVariable level_id: Int): List<StepDTO>{
        return stepService.getStepsByLevelId(level_id)
    }

    @PutMapping("/API/steps")
    fun putStep(@Valid @RequestBody stepDTO: StepDTO, br : BindingResult): StepDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidCourseDTOException(errMessages)
        }
        return stepService.putStep(stepDTO)
    }

    @DeleteMapping("/API/steps/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteStep(@PathVariable id: Int){
        stepService.deleteStep(id)
    }
}