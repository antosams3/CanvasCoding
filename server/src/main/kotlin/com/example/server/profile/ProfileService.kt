package com.example.server.profile

interface ProfileService {
    fun postStudent(profileDTO: ProfileDTO) : ProfileDTO?
    fun postTeacher(profileDTO: ProfileDTO) : ProfileDTO?
    fun deleteProfile(email: String)
    fun getProfile(email: String): ProfileDTO?
    fun getProfilesByType(type: String) : List<ProfileDTO?>
}