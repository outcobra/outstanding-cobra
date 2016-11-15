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
                                                2, "INF2014.5G",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                3, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                4, "1. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                5, "Mathematik"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        ),
                                        SchoolClassDto(
                                                6, "INF2014.5K",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                7, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                8, "2. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                9, "Modul 201"
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
                                10, "BMS-gibb",
                                Arrays.asList(
                                        SchoolClassDto(
                                                11, "BMSi2014C",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                12, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                13, "1. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                14, "Mathematik"
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        ),
                                        SchoolClassDto(
                                                15, "BMSi2014A",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                16, "2016/17",
                                                                LocalDate.of(2016, 8, 1),
                                                                LocalDate.of(2017, 7, 31),
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                17, "2. Semester",
                                                                                LocalDate.of(2016, 8, 1),
                                                                                LocalDate.of(2017, 1, 30),
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                18, "Englisch"
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