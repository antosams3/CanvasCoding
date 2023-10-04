package com.example.server.gamesession

import com.example.server.gamesession.exceptions.InvalidGameSessionDTOException
import jakarta.validation.Valid
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@CrossOrigin
class GameSessionController(
    private val gameSessionService: GameSessionService
) {
    /*
    @PostMapping("/API/game_session")
    fun postGameSession(@Valid @RequestBody gameSessionDTO: GameSessionDTO, br : BindingResult, principal : Principal): GameSessionDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidGameSessionDTOException(errMessages)
        }
        return gameSessionService.postGameSession(principal.name, gameSessionDTO)
    }*/

    @GetMapping("/API/game_session/latest")
    fun getLatestGameSessionByStepId(principal : Principal): GameSessionDTO?{
        return gameSessionService.getLatestGameSessionByStepIdDesc(principal.name)
    }

    @GetMapping("/API/game_session/{step_id}")
    fun getGameSessionByStepId(@PathVariable step_id: Int, principal : Principal): GameSessionDTO?{
        return gameSessionService.getGameSessionByStepId(principal.name, step_id)
    }

    @PutMapping("/API/game_session")
    fun putGameSession(@Valid @RequestBody gameSessionDTO: GameSessionDTO, br : BindingResult, principal : Principal): GameSessionDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidGameSessionDTOException(errMessages)
        }
        return gameSessionService.putGameSession(principal.name, gameSessionDTO)
    }
}