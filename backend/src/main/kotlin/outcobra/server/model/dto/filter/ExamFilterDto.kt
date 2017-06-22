package outcobra.server.model.dto.filter

import com.querydsl.core.types.dsl.BooleanExpression
import outcobra.server.model.QExam
import java.time.LocalDate


/**
 * @author Florian Bürgi
 * @since <since>
 */
data class ExamFilterDto(val upcoming: Boolean? = null,
                         val hasMark: Boolean? = null,
                         val semesterId: Long? = null,
                         val subjectId: Long? = null,
                         val fullTextSearch: String? = null) {


    fun getFilter(authId: String): BooleanExpression {
        var filterAsQuery = QExam.exam.subject.semester.schoolYear.schoolClass.institution.user.auth0Id.eq(authId)
        if (semesterId != null) {
            filterAsQuery.and(QExam.exam.subject.semester.id.eq(semesterId))
        }
        if (subjectId != null) {
            filterAsQuery.and(QExam.exam.subject.id.eq(subjectId))
        }
        if (hasMark is Boolean) {
            if (hasMark) {
                filterAsQuery = filterAsQuery.and(QExam.exam.mark.isNull)
            } else {
                filterAsQuery = filterAsQuery.and(QExam.exam.mark.isNotNull)

            }
        }
        if (upcoming is Boolean) {
            if (upcoming) {
                filterAsQuery = filterAsQuery.and(QExam.exam.date.after(LocalDate.now().minusDays(1)))
            } else {
                filterAsQuery = filterAsQuery.and(QExam.exam.date.before(LocalDate.now()))

            }
        }
        return filterAsQuery.and(getQueryForTextSearch())
    }

    private fun getQueryForTextSearch(): BooleanExpression {
        if (fullTextSearch !is String || fullTextSearch.isEmpty()) {
            return QExam.exam.isNotNull
        }
        return QExam.exam.name.containsIgnoreCase(fullTextSearch)
                .or(QExam.exam.subject.name.containsIgnoreCase(fullTextSearch))
                .or(QExam.exam.tasks.any().task.contains(fullTextSearch))

    }

}