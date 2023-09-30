package com.example.server.profile

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@CrossOrigin
class ProfileController (
    private val profileService: ProfileService
    ) {

    @DeleteMapping("/API/profiles")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProfile(principal : Principal){
        profileService.deleteProfile(principal.name)
    }

    @GetMapping("/API/profile")
    fun getProfile(principal : Principal) : ProfileDTO?{
        return profileService.getProfile(principal.name)
    }

    @GetMapping("/API/profiles")
    fun getProfilesByType (@RequestParam type: String) : List<ProfileDTO?> {
        return profileService.getProfilesByType(type)
    }
}