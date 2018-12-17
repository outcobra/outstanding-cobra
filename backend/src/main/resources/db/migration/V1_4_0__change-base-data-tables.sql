/* region rename legacy tables */
RENAME TABLE subject TO legacy_subject;
RENAME TABLE school_year TO legacy_school_year;
RENAME TABLE semester TO legacy_semester;

ALTER TABLE legacy_subject
DROP FOREIGN KEY fk_subject_teacher,
DROP FOREIGN KEY fk_subject_mark_group,
DROP FOREIGN KEY fk_subject_semester;

ALTER TABLE legacy_school_year
DROP FOREIGN KEY fk_school_year_class;

ALTER TABLE legacy_semester
DROP FOREIGN KEY fk_semester_school_year,
DROP FOREIGN KEY fk_semester_timetable;

/* endregion */

CREATE TABLE school_year
(
  id              BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(255) NOT NULL,
  valid_from      TINYBLOB     NOT NULL,
  valid_to        TINYBLOB     NOT NULL,
  user_id         BIGINT(20)   NULL,
  CONSTRAINT fk_school_year_user
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE school_year_school_class
(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  school_year_id BIGINT(20) NOT NULL,
  school_class_id BIGINT(20) NOT NULL,
  CONSTRAINT fk_sysc_school_year
  FOREIGN KEY (school_year_id) REFERENCES school_year (id),
  CONSTRAINT fk_sysc_school_class
  FOREIGN KEY (school_class_id) REFERENCES class (id)
);

CREATE TABLE semester
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  valid_from     TINYBLOB     NOT NULL,
  valid_to       TINYBLOB     NOT NULL,
  school_year_id BIGINT(20)   NOT NULL,
  timetable_id   BIGINT(20)   NULL,
  CONSTRAINT fk_semester_school_year
  FOREIGN KEY (school_year_id) REFERENCES school_year (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_semester_school_year_id
  ON semester (school_year_id);

CREATE INDEX idx_semester_timetable_id
  ON semester (timetable_id);

ALTER TABLE semester
  ADD CONSTRAINT fk_semester_timetable
FOREIGN KEY (timetable_id) REFERENCES timetable (id)
  ON DELETE CASCADE;

CREATE TABLE subject
(
  id            BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color         VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  user_id       BIGINT(20)   NULL,
  semester_id   BIGINT(20)   NULL,
  teacher_id    BIGINT(20)   NULL,
  CONSTRAINT fk_subject_user
  FOREIGN KEY (user_id) REFERENCES user (id),
  CONSTRAINT fk_subject_semester
  FOREIGN KEY (semester_id) REFERENCES semester (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_subject_teacher
  FOREIGN KEY (teacher_id) REFERENCES teacher (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_subject_teacher_id
  ON subject (teacher_id);

CREATE INDEX idx_subject_semester_id
  ON subject (semester_id);

/* endregion */

CREATE TABLE school_class_semester (
  id              BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  school_class_id BIGINT(20) NOT NULL,
  semester_id     BIGINT(20) NOT NULL,
  CONSTRAINT fk_scs_school_class
  FOREIGN KEY (school_class_id) REFERENCES class (id),
  CONSTRAINT fk_scs_semester
  FOREIGN KEY (semester_id) REFERENCES semester (id)
);

CREATE TABLE school_class_semester_subject (
  id                       BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  school_class_semester_id BIGINT(20) NOT NULL,
  subject_id               BIGINT(20) NOT NULL,
  CONSTRAINT fk_scss_scs
  FOREIGN KEY (school_class_semester_id) REFERENCES school_class_semester (id),
  CONSTRAINT fk_scss_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id)
);

ALTER TABLE class
  ADD COLUMN user_id BIGINT(20),
  ADD CONSTRAINT fk_class_user
FOREIGN KEY (user_id) REFERENCES `user` (id);

ALTER TABLE exam
  ADD COLUMN school_class_semester_subject_id BIGINT(20),
  ADD CONSTRAINT fk_scss_exam
FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject (id);

ALTER TABLE mark_group
  ADD COLUMN school_class_semester_subject_id BIGINT(20),
  ADD CONSTRAINT fk_scss_mark_group
FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject (id);

ALTER TABLE task
  ADD COLUMN school_class_semester_subject_id BIGINT(20),
  ADD CONSTRAINT fk_scss_task
FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject (id);

ALTER TABLE mark_report
  ADD COLUMN school_class_semester_id BIGINT(20),
  ADD CONSTRAINT fk_scs_mark_report
FOREIGN KEY (school_class_semester_id) REFERENCES school_class_semester (id);

ALTER TABLE teacher
  ADD COLUMN user_id BIGINT(20),
  ADD CONSTRAINT fk_teacher_user
FOREIGN KEY (user_id) REFERENCES user (id);
