package com.example.server.profile

import com.example.server.course.CourseRepository
import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.profile.exceptions.ProfileAlreadyExistingException
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.utils.ProfileType
import com.example.server.utils.toProfileType
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
@Transactional
class ProfileServiceImpl(
    private val profileRepository: ProfileRepository,
    private val courseRepository: CourseRepository
) : ProfileService{
    // postStudent
    override fun postProfile(courseId: Int, profileDTO: ProfileDTO): ProfileDTO? {
        if(profileRepository.findByEmail(profileDTO.email) !== null){
            throw ProfileAlreadyExistingException("Profile already registered!")
        }
        val course = courseRepository.findByIdOrNull(courseId)
        if(course !== null){
            return profileRepository.save(profileDTO.toEntity(course)).toDTO()
        }else{
            throw CourseNotFoundException("Specified course doesn't exist!")
        }
    }

    override fun deleteProfile(email: String) {
        profileRepository.deleteByEmail(email)
    }

    override fun getProfile(email: String): ProfileDTO? {
        val Profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found")
        return Profile.toDTO()
    }

    override fun getProfilesByType(type: String): List<ProfileDTO?> {
        return when(toProfileType(type)) {
            ProfileType.STUDENT -> profileRepository.findByType(ProfileType.STUDENT).map { it.toDTO() }
            ProfileType.TEACHER -> profileRepository.findByType(ProfileType.TEACHER).map { it.toDTO() }
        }
    }


}