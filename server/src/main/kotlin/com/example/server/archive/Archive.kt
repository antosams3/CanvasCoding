package com.example.server.archive

import com.example.server.profile.Profile
import com.example.server.utils.EntityBase
import jakarta.persistence.Entity
import jakarta.persistence.OneToOne
import jakarta.persistence.Temporal
import jakarta.persistence.TemporalType
import java.util.*

@Entity
class Archive(

    @Temporal(TemporalType.TIMESTAMP)
    var creation_date : Date?,

    var code : String = "",

    @OneToOne
    var student: Profile

    ): EntityBase<Int>()

fun ArchiveDTO.toEntity(profile: Profile) : Archive {
    return Archive(creation_date,code, student = profile)
}