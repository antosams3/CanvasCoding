package com.example.server.profile

import com.example.server.profile.exceptions.InvalidProfileDTOException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class ProfileController (
    private val profileService: ProfileService
    ) {

    @PostMapping("/API/profiles/{courseId}")
    fun postProfile(@Valid @RequestBody profileDTO: ProfileDTO,@PathVariable courseId: Int, br : BindingResult): ProfileDTO?{
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidProfileDTOException(errMessages)
        }
        return profileService.postProfile(courseId,profileDTO)
    }

    @DeleteMapping("/API/profiles/{email}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProfile(@PathVariable email: String){
        profileService.deleteProfile(email)
    }

    @GetMapping("/API/profiles/{email}")
    fun getProfile(@PathVariable email: String) : ProfileDTO?{
        return profileService.getProfile(email)
    }

    @GetMapping("/API/profiles")
    fun getProfilesByType (@RequestParam type: String) : List<ProfileDTO?> {
        return profileService.getProfilesByType(type)
    }
}