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
                                                1, "INF2014.55G",
                                                Arrays.asList(
                                                        SchoolYearDto(
                                                                1, "2016/17",
                                                                LocalDate.MIN,
                                                                LocalDate.MAX,
                                                                Arrays.asList(
                                                                        SemesterDto(
                                                                                1, "1. Semester",
                                                                                LocalDate.MIN,
                                                                                LocalDate.MAX,
                                                                                Arrays.asList(
                                                                                        SubjectDto(
                                                                                                1, "Mathematik"
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