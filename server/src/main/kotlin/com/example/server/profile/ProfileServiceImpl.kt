package com.example.server.profile

import com.example.server.course.CourseRepository
import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.profile.exceptions.ProfileAlreadyExistingException
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.utils.ProfileType
import com.example.server.utils.toProfileType
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service

@Service
@Transactional
class ProfileServiceImpl(
    private val profileRepository: ProfileRepository,
    private val courseRepository: CourseRepository
) : ProfileService{
    override fun postStudent(profileDTO: ProfileDTO): ProfileDTO? {
        if(profileRepository.findByEmail(profileDTO.email) !== null){
            throw ProfileAlreadyExistingException("Profile already registered!")
        }
        val course = courseRepository.findByIdOrNull(profileDTO.course_id)
        if(course !== null){
            return profileRepository.save(profileDTO.toEntity(ProfileType.STUDENT, course)).toDTO()
        }else{
            throw CourseNotFoundException("Specified course doesn't exist!")
        }
    }

    override fun postTeacher(profileDTO: ProfileDTO): ProfileDTO? {
        if(profileRepository.findByEmail(profileDTO.email) !== null){
            throw ProfileAlreadyExistingException("Profile already registered!")
        }
        return profileRepository.save(profileDTO.toEntity(ProfileType.TEACHER, null)).toDTO()

    }

    @PreAuthorize("#email == authentication.principal.claims['email']")
    override fun deleteProfile(email: String) {
        profileRepository.deleteByEmail(email)
    }

    @PreAuthorize("hasRole('ROLE_TEACHER') or #email == authentication.principal.claims['email']")
    override fun getProfile(email: String): ProfileDTO? {
        val profile = profileRepository.findByEmail(email)
            ?: throw ProfileNotFoundException("Profile not found")
        return profile.toDTO()
    }

    @Secured("ROLE_TEACHER")
    override fun getProfilesByType(type: String): List<ProfileDTO?> {
        return when(toProfileType(type)) {
            ProfileType.STUDENT -> profileRepository.findByType(ProfileType.STUDENT).map { it.toDTO() }
            ProfileType.TEACHER -> profileRepository.findByType(ProfileType.TEACHER).map { it.toDTO() }
        }
    }


}