package com.example.server.profile

import com.example.server.profile.exceptions.InvalidProfileDTOException
import com.example.server.profile.exceptions.ProfileAlreadyExistingException
import com.example.server.profile.exceptions.ProfileNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ProfileProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(InvalidProfileDTOException::class)
    fun handleInvalidProfileDTO(e: InvalidProfileDTOException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        problem.title = "Invalid profile body"
        problem.detail = e.toString()
        return problem
    }

    @ExceptionHandler(ProfileNotFoundException::class)
    fun handleProfileNotFound(e: ProfileNotFoundException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.NOT_FOUND)
        problem.title = "Profile not found"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(ProfileAlreadyExistingException::class)
    fun handleProfileAlreadyExisting(e: ProfileAlreadyExistingException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "Profile already existing"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(IllegalStateException::class)
    fun handleIllegalState(e: IllegalStateException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "Profile Type not existing"
        problem.detail = e.message
        return problem
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleProfileBadFormatting(e: java.lang.IllegalArgumentException): ProblemDetail{
        val problem = ProblemDetail.forStatus(HttpStatus.CONFLICT)
        problem.title = "Request param not valid"
        problem.detail = e.message
        return problem
    }
}