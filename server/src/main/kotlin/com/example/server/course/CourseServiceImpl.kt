package com.example.server.course

import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.course.exceptions.OperationNotAllowedException
import com.example.server.user.UserRepository
import com.example.server.user.exceptions.UserNotFoundException
import com.example.server.utils.UserType
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
@Transactional
class CourseServiceImpl(
    private val courseRepository: CourseRepository,
    private val userRepository: UserRepository
): CourseService {

    override fun postCourse(email: String, courseDTO: CourseDTO): CourseDTO? {
        val user = userRepository.findByEmail(email)
        if(user !== null){
            if(user.type === UserType.TEACHER){
                return courseRepository.save(courseDTO.toEntity(user)).toDTO()
            }else{
                throw OperationNotAllowedException("Operation not allowed")
            }
        }else{
            throw UserNotFoundException("Teacher doesn't exist!")
        }
    }

    override fun putCourse(email: String, grade: Int, name: String, year: Int): CourseDTO? {
        val user = userRepository.findByEmail(email)
        if(user !== null){
            if(user.type === UserType.TEACHER) {
                val course = courseRepository.findByGradeAndNameAndYear(grade,name,year)
                    ?: throw CourseNotFoundException("Course not found")
                course.apply { } // Update teacher_id
                return course.toDTO()
            }else{
                throw OperationNotAllowedException("Operation not allowed")
            }
        }else{
            throw UserNotFoundException("Teacher doesn't exist!")
        }
    }

    override fun getCourse(id: Int): CourseDTO? {
        val course = courseRepository.findByIdOrNull(id)
            ?: throw CourseNotFoundException("Course not found")
        return course.toDTO()
    }

    override fun deleteCourse(id: Int) {
        courseRepository.deleteById(id)
    }

}