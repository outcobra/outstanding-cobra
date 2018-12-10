ALTER TABLE exam
  DROP FOREIGN KEY fk_exam_subject,
  DROP COLUMN subject_id;

ALTER TABLE task
  DROP FOREIGN KEY fk_task_subject,
  DROP COLUMN subject_id;

ALTER TABLE mark_report
  DROP FOREIGN KEY fk_mark_report_semester,
  DROP COLUMN semester_id;

ALTER TABLE class
  DROP FOREIGN KEY fk_class_institution,
  DROP COLUMN institution_id;

ALTER TABLE teacher
  DROP FOREIGN KEY fk_teacher_institution,
  DROP COLUMN institution_id;

ALTER TABLE mark_report_entry
  DROP FOREIGN KEY fk_mark_report_entry_subject,
  DROP COLUMN subject_id,
  ADD COLUMN school_class_semester_subject_id BIGINT(20),
  ADD CONSTRAINT fk_mark_report_entry_school_class_semester_subject
FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject (id);

ALTER TABLE timetable_entry
  DROP FOREIGN KEY fk_timetable_entry_subject,
  DROP COLUMN subject_id,
  ADD COLUMN school_class_semester_subject_id BIGINT(20),
  ADD CONSTRAINT fk_timetable_entry_school_class_semester_subject
FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject (id);

ALTER TABLE holiday
  DROP FOREIGN KEY fk_holiday_school_year;

/* Needs to be separated otherwise it will say it is a duplicate key */
ALTER TABLE holiday
  ADD CONSTRAINT fk_holiday_school_year
  FOREIGN KEY (school_year_id) REFERENCES school_year (id);

DROP TABLE legacy_subject;
DROP TABLE legacy_semester;
DROP TABLE legacy_school_year;
DROP TABLE institution;