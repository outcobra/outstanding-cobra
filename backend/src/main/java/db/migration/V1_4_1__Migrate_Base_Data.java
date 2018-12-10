package db.migration;

import db.migration.model.legacy.*;
import db.migration.model.next.NextSchoolClass;
import db.migration.model.next.NextSchoolYear;
import db.migration.model.next.NextSemester;
import db.migration.model.next.NextSubject;
import org.flywaydb.core.api.migration.spring.BaseSpringJdbcMigration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class V1_4_1__Migrate_Base_Data extends BaseSpringJdbcMigration {
    @Override
    public void migrate(JdbcTemplate jdbcTemplate) throws Exception {
        List<User> users = getUsers(jdbcTemplate);

        for (User user : users) {
            long userId = user.getId();
            List<LegacySchoolClass> userSchoolClasses = getSchoolClassByUser(jdbcTemplate, user.getId());

            List<NextSchoolClass> newSchoolClasses = new ArrayList<>();
            List<NextSchoolYear> newSchoolYears = new ArrayList<>();
            List<NextSemester> newSemesters = new ArrayList<>();
            List<NextSubject> newSubjects = new ArrayList<>();

            for (LegacySchoolClass oldSchoolClass : userSchoolClasses) {
                Long schoolClassId = oldSchoolClass.getId();
                updateSchoolClassUserId(jdbcTemplate, schoolClassId, userId);
                NextSchoolClass nextSchoolClass = new NextSchoolClass(schoolClassId, oldSchoolClass.getNormalizedName());
                newSchoolClasses.add(nextSchoolClass);

                List<LegacySchoolYear> schoolYearsBySchoolClass = getSchoolYearsBySchoolClass(jdbcTemplate, schoolClassId);

                for (LegacySchoolYear oldSchoolYear : schoolYearsBySchoolClass) {
                    NextSchoolYear nextSchoolYear = new NextSchoolYear(oldSchoolYear.getName(), oldSchoolYear.getValidFrom(), oldSchoolYear.getValidTo());
                    Optional<NextSchoolYear> existingSchoolYear = newSchoolYears.stream()
                            .filter(sy -> sy.isCongruent(nextSchoolYear))
                            .findFirst();

                    if (existingSchoolYear.isPresent()) {
                        addSchoolYearToClass(jdbcTemplate, existingSchoolYear.get().getId(), schoolClassId);
                    } else {
                        saveNextSchoolYear(jdbcTemplate, nextSchoolYear, schoolClassId, userId);
                        newSchoolYears.add(nextSchoolYear);
                    }

                    long currentSchoolYearId = existingSchoolYear.map(NextSchoolYear::getId).orElse(nextSchoolYear.getId());
                    List<LegacySemester> semestersBySchoolYear = getSemestersBySchoolYear(jdbcTemplate, oldSchoolYear.getId());

                    for (LegacySemester oldSemester : semestersBySchoolYear) {
                        NextSemester nextSemester = new NextSemester(oldSemester.getName(), oldSemester.getValidFrom(), oldSemester.getValidTo());
                        Optional<NextSemester> existingSemester = newSemesters.stream()
                                .filter(sy -> sy.isCongruent(nextSemester))
                                .findFirst();

                        if (existingSemester.isPresent()) {
                            addSemesterToSchoolYear(jdbcTemplate, existingSemester.get().getId(), currentSchoolYearId);
                            nextSemester.setId(existingSemester.get().getId());
                        } else {
                            saveNextSemester(jdbcTemplate, nextSemester, nextSchoolYear.getId());
                            newSemesters.add(nextSemester);
                        }

                        long schoolClassSemesterId = getOrCreateSchoolClassSemester(jdbcTemplate, schoolClassId, nextSemester.getId());

                        List<LegacySubject> subjectsBySemester = getSubjectsBySemester(jdbcTemplate, oldSemester.getId());

                        for (LegacySubject oldSubject : subjectsBySemester) {
                            NextSubject nextSubject = new NextSubject(oldSubject.getName(), oldSubject.getColor());
                            Optional<NextSubject> existingSubject = newSubjects.stream()
                                    .filter(sy -> sy.isCongruent(nextSubject))
                                    .findFirst();

                            long schoolClassSemesterSubjectId;
                            if (existingSubject.isPresent()) {
                                schoolClassSemesterSubjectId = createSchoolClassSemesterSubject(jdbcTemplate, schoolClassSemesterId, existingSubject.get().getId());
                            } else {
                                saveNextSubject(jdbcTemplate, nextSubject, userId);
                                schoolClassSemesterSubjectId = createSchoolClassSemesterSubject(jdbcTemplate, schoolClassSemesterId, nextSubject.getId());
                                newSubjects.add(nextSubject);
                            }

                            addMarkGroupToSchoolClassSemesterSubject(jdbcTemplate, oldSubject.getMarkGroupId(), schoolClassSemesterSubjectId);
                            moveExamToSchoolClassSemesterSubjectFromOldSubject(jdbcTemplate, oldSubject.getId(), schoolClassSemesterSubjectId);
                            moveTaskToSchoolClassSemesterSubjectFromOldSubject(jdbcTemplate, oldSubject.getId(), schoolClassSemesterSubjectId);
                        }
                    }
                }
            }
        }
    }

    private List<User> getUsers(JdbcTemplate jdbcTemplate) {
        return jdbcTemplate.query("SELECT user.id, user.mail, user.username FROM user",
                (rs, rowNum) -> new User(rs.getLong(1), rs.getString(2), rs.getString(3)));
    }

    private List<LegacySchoolClass> getSchoolClassByUser(JdbcTemplate jdbcTemplate, Long userId) {
        return jdbcTemplate.query("SELECT class.id, class.normalized_name FROM class WHERE class.institution_id IN (SELECT institution.id FROM institution WHERE institution.user_id = ?)",
                (rs, rowNum) -> new LegacySchoolClass(rs.getLong(1), rs.getString(2)),
                userId);
    }

    private List<LegacySchoolYear> getSchoolYearsBySchoolClass(JdbcTemplate jdbcTemplate, Long schoolClassId) {
        return jdbcTemplate.query("SELECT sy.id, sy.name, sy.valid_from, sy.valid_to FROM legacy_school_year as sy WHERE sy.school_class_id = ?",
                (rs, rowNum) -> new LegacySchoolYear(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getString(4), schoolClassId),
                schoolClassId);
    }

    private List<LegacySemester> getSemestersBySchoolYear(JdbcTemplate jdbcTemplate, Long schoolYearId) {
        return jdbcTemplate.query("SELECT sem.id, sem.name, sem.valid_from, sem.valid_to FROM legacy_semester as sem WHERE sem.school_year_id = ?",
                (rs, rowNum) -> new LegacySemester(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getString(4), schoolYearId),
                schoolYearId);
    }

    private List<LegacySubject> getSubjectsBySemester(JdbcTemplate jdbcTemplate, Long semesterId) {
        return jdbcTemplate.query("SELECT s.id, s.name, s.color, s.mark_group_id FROM legacy_subject as s WHERE s.semester_id = ?",
                (rs, rowNum) -> new LegacySubject(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getLong(4), semesterId),
                semesterId);
    }

    private void updateSchoolClassUserId(JdbcTemplate jdbcTemplate, long schoolClassId, long userId) {
        jdbcTemplate.update("UPDATE class SET user_id = ? WHERE id = ?",
                userId, schoolClassId);
    }

    private NextSchoolYear saveNextSchoolYear(JdbcTemplate jdbcTemplate, NextSchoolYear schoolYear, long schoolClassId, long userId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO school_year (id, name, valid_from, valid_to, user_id) VALUES (?, ?, ? ,? ,?)",
                id, schoolYear.getName(), schoolYear.getValidFrom(), schoolYear.getValidTo(), userId);

        schoolYear.setId(id);
        addSchoolYearToClass(jdbcTemplate, id, schoolClassId);
        return schoolYear;
    }

    private void addSchoolYearToClass(JdbcTemplate jdbcTemplate, long schoolYearId, long schoolClassId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO school_year_school_class (id, school_year_id, school_class_id) VALUES (?, ?, ?)",
                id, schoolYearId, schoolClassId);
    }

    private NextSemester saveNextSemester(JdbcTemplate jdbcTemplate, NextSemester semester, long schoolYearId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO semester (id, name, valid_from, valid_to, school_year_id) VALUES (?, ?, ? ,? ,?)",
                id, semester.getName(), semester.getValidFrom(), semester.getValidTo(), schoolYearId);

        semester.setId(id);
        return semester;
    }

    private void addSemesterToSchoolYear(JdbcTemplate jdbcTemplate, long semesterId, long schoolYearId) {
        jdbcTemplate.update("UPDATE semester SET school_year_id = ? WHERE id = ?",
                schoolYearId, semesterId);
    }

    private NextSubject saveNextSubject(JdbcTemplate jdbcTemplate, NextSubject subject, long userId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO subject (id, name, color, user_id) VALUES (?, ?, ?, ?)",
                id, subject.getName(), subject.getColor(), userId);

        subject.setId(id);
        return subject;
    }

    private long getOrCreateSchoolClassSemester(JdbcTemplate jdbcTemplate, long schoolClassId, long semesterId) {
        List<Long> id = jdbcTemplate.query("SELECT id from school_class_semester WHERE school_class_id = ? AND semester_id = ?",
                (rs, rowNum) -> rs.getLong(1),
                schoolClassId, semesterId);

        return id.stream()
                .findFirst()
                .orElseGet(() -> createSchoolClassSemester(jdbcTemplate, schoolClassId, semesterId));
    }

    private long createSchoolClassSemester(JdbcTemplate jdbcTemplate, long schoolClassId, long semesterId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO school_class_semester (id, school_class_id, semester_id) VALUES (?, ?, ?)",
                id, schoolClassId, semesterId);
        return id;
    }

    private long createSchoolClassSemesterSubject(JdbcTemplate jdbcTemplate, long schoolClassSemesterId, long subjectId) {
        long id = fetchNextId(jdbcTemplate);
        jdbcTemplate.update("INSERT INTO school_class_semester_subject (id, school_class_semester_id, subject_id) VALUES (?, ?, ?)",
                id, schoolClassSemesterId, subjectId);
        return id;
    }

    private void addMarkGroupToSchoolClassSemesterSubject(JdbcTemplate jdbcTemplate, long markGroupId, long schoolClassSemesterSubjectId) {
        jdbcTemplate.update("UPDATE mark_group SET school_class_semester_subject_id = ? WHERE id = ?", schoolClassSemesterSubjectId, markGroupId);
    }

    private void moveExamToSchoolClassSemesterSubjectFromOldSubject(JdbcTemplate jdbcTemplate, long oldSubjectId, long schoolClassSemesterSubjectId) {
        jdbcTemplate.update("UPDATE exam SET school_class_semester_subject_id = ? WHERE subject_id = ?", schoolClassSemesterSubjectId, oldSubjectId);
    }

    private void moveTaskToSchoolClassSemesterSubjectFromOldSubject(JdbcTemplate jdbcTemplate, long oldSubjectId, long schoolClassSemesterSubjectId) {
        jdbcTemplate.update("UPDATE task SET school_class_semester_subject_id = ? WHERE subject_id = ?", schoolClassSemesterSubjectId, oldSubjectId);
    }

    private long fetchNextId(JdbcTemplate jdbcTemplate) {
        Long nextVal = jdbcTemplate.query("SELECT next_val FROM hibernate_sequence LIMIT 1", rs -> {
            if (rs.first()) {
                return rs.getLong(1);
            }
            return 0L;
        });

        jdbcTemplate.update("UPDATE hibernate_sequence SET next_val = ?", nextVal + 1);
        return nextVal;
    }
}
