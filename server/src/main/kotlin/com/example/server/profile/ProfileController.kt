package com.example.server.profile

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
class ProfileController (
    private val profileService: ProfileService
    ) {

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