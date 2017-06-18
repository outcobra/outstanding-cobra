package outcobra.server.data

import outcobra.server.data.loaders.DataLoader

/**
 * Contains constants for the order of our [DataLoader]s. When adding new loaders, please leave some distance to the last loader
 *
 * @author Joel Messerli
 * @since <since>
 */
object DataLoadOrder {
    const val USER = 1
    const val INSTITUTION = 4
    const val SCHOOL_CLASS = 7
    const val YEAR = 10
    const val SEMESTER = 13
    const val SUBJECT = 16
    const val TASK = 19
    const val MARK = 23
    const val EXAM = 26
    const val EXAM_TASK = 30
}