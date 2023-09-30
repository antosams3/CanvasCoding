package com.example.server.archive

import com.example.server.course.exceptions.OperationNotAllowedException
import com.example.server.archive.exceptions.InvalidArchiveDTOException
import com.example.server.archive.exceptions.ArchiveNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ArchiveProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(InvalidArchiveDTOException::class)
    fun handleInvalidArchiveDTO(e: InvalidArchiveDTOException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid Archive body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(ArchiveNotFoundException::class)
    fun handleArchiveNotFound(e: ArchiveNotFoundException): ProblemDetail {
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "Archive not found"
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