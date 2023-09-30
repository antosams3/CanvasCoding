package com.example.server.archive

import com.example.server.archive.exceptions.InvalidArchiveDTOException
import jakarta.validation.Valid
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@CrossOrigin
class ArchiveController(
    private val archiveService: ArchiveService
) {

    @PutMapping("/API/archive")
    fun putArchive(@Valid @RequestBody archiveDTO: ArchiveDTO, br : BindingResult, principal : Principal): ArchiveDTO? {
        if (br.hasErrors()){
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidArchiveDTOException(errMessages)
        }
        return archiveService.putArchive(principal.name, archiveDTO)
    }

    @GetMapping("/API/archive")
    fun getArchive(@Valid principal: Principal): ArchiveDTO? {
        return archiveService.getArchive(principal.name)
    }
}