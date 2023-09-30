package com.example.server.step

import com.example.server.step.exceptions.InvalidStepDTOException
import com.example.server.step.exceptions.OperationNotAllowedException
import com.example.server.step.exceptions.StepNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class StepProblemDetailsHandler: ResponseEntityExceptionHandler() {
    @ExceptionHandler(InvalidStepDTOException::class)
    fun handleInvalidStepDTO(e: InvalidStepDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid step body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(StepNotFoundException::class)
    fun handleStepNotFound(e: StepNotFoundException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "Step not found"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(OperationNotAllowedException::class)
    fun handleOperationNotAllowed(e: OperationNotAllowedException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.FORBIDDEN)
        problem.title = "Operation not allowed"
        problem.detail = e.message
        return problem
    }
}