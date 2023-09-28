package com.example.server.user

import com.example.server.course.CourseRepository
import com.example.server.course.exceptions.CourseNotFoundException
import com.example.server.user.exceptions.UserAlreadyExistingException
import com.example.server.user.exceptions.UserNotFoundException
import com.example.server.utils.UserType
import com.example.server.utils.toUserType
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
@Transactional
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val courseRepository: CourseRepository
) : UserService{
    // postStudent
    override fun postUser(courseId: Int, userDTO: UserDTO): UserDTO? {
        if(userRepository.findByEmail(userDTO.email) !== null){
            throw UserAlreadyExistingException("User already registered!")
        }
        val course = courseRepository.findByIdOrNull(courseId)
        if(course !== null){
            return userRepository.save(userDTO.toEntity(course)).toDTO()
        }else{
            throw CourseNotFoundException("Specified course doesn't exist!")
        }
    }

    override fun deleteUser(email: String) {
        userRepository.deleteByEmail(email)
    }

    override fun getUser(email: String): UserDTO? {
        val user = userRepository.findByEmail(email)
            ?: throw UserNotFoundException("User not found")
        return user.toDTO()
    }

    override fun getUsersByType(type: String): List<UserDTO?> {
        return when(toUserType(type)) {
            UserType.STUDENT -> userRepository.findByType(UserType.STUDENT).map { it.toDTO() }
            UserType.TEACHER -> userRepository.findByType(UserType.TEACHER).map { it.toDTO() }
        }
    }


}