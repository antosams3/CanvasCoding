package com.example.server.course

import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.course.exceptions.OperationNotAllowedException
import com.example.server.profile.ProfileRepository
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.utils.ProfileType
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.annotation.Secured
import org.springframework.stereotype.Service

@Service
@Transactional
class CourseServiceImpl(
    private val courseRepository: CourseRepository,
    private val profileRepository: ProfileRepository
): CourseService {

    @Secured("ROLE_TEACHER")
    override fun postCourse(email: String, courseDTO: CourseDTO): CourseDTO? {
        val user = profileRepository.findByEmail(email)
        if(user !== null){
            if(user.type === ProfileType.TEACHER){
                return courseRepository.save(courseDTO.toEntity(user)).toDTO()
            }else{
                throw OperationNotAllowedException("Operation not allowed")
            }
        }else{
            throw ProfileNotFoundException("Teacher doesn't exist!")
        }
    }

    @Secured("ROLE_TEACHER")
    override fun putCourse(email: String, courseDTO: CourseDTO): CourseDTO? {
        val user = profileRepository.findByEmail(email)
        if(user !== null){
            if(user.type === ProfileType.TEACHER) {
                val course = courseRepository.findByGradeAndNameAndYear(courseDTO.grade,courseDTO.name,courseDTO.year)
                    ?: throw CourseNotFoundException("Course not found")
                course.apply {
                    teacher = user
                } // Update teacher_id
                return course.toDTO()
            }else{
                throw OperationNotAllowedException("Operation not allowed")
            }
        }else{
            throw ProfileNotFoundException("Teacher doesn't exist!")
        }
    }

    override fun getCourse(id: Int): CourseDTO? {
        val course = courseRepository.findByIdOrNull(id)
            ?: throw CourseNotFoundException("Course not found")
        return course.toDTO()
    }

    @Secured("ROLE_TEACHER")
    override fun deleteCourse(id: Int) {
        courseRepository.deleteById(id)
    }

}