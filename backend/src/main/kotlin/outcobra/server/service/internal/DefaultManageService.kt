package outcobra.server.service.internal

import org.springframework.stereotype.Service
import outcobra.server.model.dto.manage.*
import outcobra.server.service.ManageService
import java.time.LocalDate
import java.util.*

@Service
open class DefaultManageService : ManageService {
    override fun getManageData(): ManageDto {
        return ManageDto(
                Arrays.asList(
                        InstitutionDto(
                                1, "IET-gibb",
                                Arrays.asList(
                                        SchoolClassDto(
                                                1, "INF2014.5G",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                1, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                1, "1. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                1, "Mathematik"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        ),
                                        SchoolClassDto(
                                                1, "INF2014.5K",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                1, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                1, "2. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                1, "Modul 201"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                )
                        ),
                        InstitutionDto(
                                1, "BMS-gibb",
                                Arrays.asList(
                                        SchoolClassDto(
                                                1, "BMSi2014C",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                1, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                1, "1. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                1, "Mathematik"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        ),
                                        SchoolClassDto(
                                                1, "BMSi2014A",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                1, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                1, "2. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                1, "Englisch"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                )
        )
    }

}