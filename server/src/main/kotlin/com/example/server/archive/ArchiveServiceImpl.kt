package com.example.server.archive

import com.example.server.profile.ProfileRepository
import com.example.server.profile.exceptions.ProfileNotFoundException
import com.example.server.archive.exceptions.ArchiveNotFoundException
import jakarta.transaction.Transactional
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
@Transactional
class ArchiveServiceImpl(
    private val archiveRepository: ArchiveRepository,
    private val profileRepository: ProfileRepository
): ArchiveService {

    override fun postArchive(email: String): ArchiveDTO? {
        val user = profileRepository.findByEmail(email)
        if(user !== null){
            val currDate = Date.from(Instant.now())
            val archive = Archive(currDate, "", user)
            return archiveRepository.save(archive).toDTO()
        }else{
            throw ProfileNotFoundException("Student doesn't exist!")
        }
    }

    @PreAuthorize("hasRole('ROLE_STUDENT') or #email == authentication.principal.claims['email']")
    override fun putArchive(email: String, archiveDTO: ArchiveDTO): ArchiveDTO? {
        val user = profileRepository.findByEmail(email)
        if(user !== null){
            val archive = archiveRepository.findByStudent(user)
                ?: throw ArchiveNotFoundException("Archive not found")

            archive.apply { this.code = archiveDTO.code }
            return archive.toDTO()

        }else{
            throw ProfileNotFoundException("Student doesn't exist!")
        }
    }

    @PreAuthorize("#email == authentication.principal.claims['email']")
    override fun getArchive(email: String): ArchiveDTO? {
        val user = profileRepository.findByEmail(email)
        if(user !== null){
            val archive = archiveRepository.findByStudent(user)
                ?: throw ArchiveNotFoundException("Archive not found")

            return archive.toDTO()

        }else{
            throw ProfileNotFoundException("Student doesn't exist!")
        }
    }

}