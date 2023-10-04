package com.example.server.gamesession


import com.example.server.gamesession.exceptions.GameSessionNotFoundException
import com.example.server.gamesession.exceptions.InvalidGameSessionDTOException
import com.example.server.gamesession.exceptions.OperationNotAllowedException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class GameSessionProblemDetailsHandler: ResponseEntityExceptionHandler() {
    @ExceptionHandler(InvalidGameSessionDTOException::class)
    fun handleInvalidGameSessionDTO(e: InvalidGameSessionDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid GameSession body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(OperationNotAllowedException::class)
    fun handleOperationNotAllowed(e: OperationNotAllowedException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.FORBIDDEN)
        problem.title = "Operation not allowed"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(GameSessionNotFoundException::class)
    fun handleGameSessionNotFound(e: GameSessionNotFoundException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "GameSession not found"
        problem.detail = e.message
        return problem
    }
}