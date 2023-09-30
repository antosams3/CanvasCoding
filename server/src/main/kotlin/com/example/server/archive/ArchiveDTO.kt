package com.example.server.archive

import java.util.*

data class ArchiveDTO(
    val id: Int?,
    val creation_date: Date?,
    val code: String,
    val student_id: Int?

)

fun Archive.toDTO() : ArchiveDTO{
    return ArchiveDTO(getId(),creation_date,code,student.getId())
}