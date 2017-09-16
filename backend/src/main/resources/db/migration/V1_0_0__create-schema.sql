CREATE TABLE hibernate_sequences
(
  sequence_name VARCHAR(255) NOT NULL PRIMARY KEY,
  next_val      BIGINT(20)   NULL
);

CREATE TABLE hibernate_sequence (
  next_val BIGINT(20) DEFAULT NULL
);

INSERT INTO hibernate_sequence (next_val) VALUES (1);

CREATE TABLE class
(
  id              BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  normalized_name VARCHAR(255) NOT NULL,
  institution_id  BIGINT(20)   NULL
);

CREATE INDEX idx_class_institution_id
  ON class (institution_id);

CREATE TABLE exam
(
  id         BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date       TINYBLOB     NOT NULL,
  name       VARCHAR(255) NOT NULL,
  mark_id    BIGINT(20)   NULL,
  subject_id BIGINT(20)   NOT NULL
);

CREATE INDEX idx_exam_subject_id
  ON exam (subject_id);

CREATE TABLE exam_task
(
  id       BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  finished BIT(1)       NOT NULL,
  task     VARCHAR(255) NOT NULL,
  exam_id  BIGINT(20)   NOT NULL,
  CONSTRAINT fk_exam_task_exam
  FOREIGN KEY (exam_id) REFERENCES exam (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_exam_task_exam_id
  ON exam_task (exam_id);

CREATE TABLE holiday
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  valid_from     TINYBLOB     NOT NULL,
  valid_to       TINYBLOB     NOT NULL,
  school_year_id BIGINT(20)   NULL
);

CREATE INDEX idx_holiday_school_year_id
  ON holiday (school_year_id);

CREATE TABLE institution
(
  id      BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name    VARCHAR(255) NOT NULL,
  user_id BIGINT(20)   NULL
);

CREATE INDEX idx_institution_user_id
  ON institution (user_id);

ALTER TABLE class
  ADD CONSTRAINT fk_class_institution
FOREIGN KEY (institution_id) REFERENCES institution (id)
  ON DELETE CASCADE;

CREATE TABLE mark_group
(
  id            BIGINT(20) NOT NULL
    PRIMARY KEY,
  weight        DOUBLE     NOT NULL,
  mark_group_id BIGINT(20) NULL,
  CONSTRAINT fk_mark_group_mark_group
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_mark_group_mark_group_id
  ON mark_group (mark_group_id);

CREATE TABLE mark_report
(
  id          BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  semester_id BIGINT(20)   NOT NULL
);

CREATE INDEX idx_mark_report_semester_id
  ON mark_report (semester_id);

CREATE TABLE mark_report_entry
(
  id         BIGINT(20) NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
  weight     DOUBLE     NOT NULL,
  report_id  BIGINT(20) NOT NULL,
  subject_id BIGINT(20) NOT NULL,
  CONSTRAINT fk_mark_report_entry_mark_report
  FOREIGN KEY (report_id) REFERENCES mark_report (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_mark_report_entry_subject_id
  ON mark_report_entry (subject_id);

CREATE INDEX idx_mark_group_entry_report_id
  ON mark_report_entry (report_id);

CREATE TABLE mark_value
(
  id            BIGINT(20) NOT NULL    PRIMARY KEY,
  weight        DOUBLE     NOT NULL,
  mark_group_id BIGINT(20) NULL,
  value         DOUBLE     NOT NULL,
  CONSTRAINT fk_mark_value_mark_group
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_mark_value_mark_group_id
  ON mark_value (mark_group_id);

CREATE TABLE school_year
(
  id              BIGINT(20)   NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
  name            VARCHAR(255) NOT NULL,
  valid_from      TINYBLOB     NOT NULL,
  valid_to        TINYBLOB     NOT NULL,
  school_class_id BIGINT(20)   NULL,
  CONSTRAINT fk_school_year_class
  FOREIGN KEY (school_class_id) REFERENCES class (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_school_year_school_class_id
  ON school_year (school_class_id);

ALTER TABLE holiday
  ADD CONSTRAINT fk_holiday_school_year
FOREIGN KEY (school_year_id) REFERENCES school_year (id)
  ON DELETE CASCADE;

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

ALTER TABLE mark_report
  ADD CONSTRAINT fk_mark_report_semester
FOREIGN KEY (semester_id) REFERENCES semester (id)
  ON DELETE CASCADE;

CREATE TABLE subject
(
  id            BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color         VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  mark_group_id BIGINT(20)   NULL,
  semester_id   BIGINT(20)   NULL,
  teacher_id    BIGINT(20)   NULL,
  CONSTRAINT fk_subject_mark_group
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_subject_semester
  FOREIGN KEY (semester_id) REFERENCES semester (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_subject_teacher_id
  ON subject (teacher_id);

CREATE INDEX idx_subject_mark_group_id
  ON subject (mark_group_id);

CREATE INDEX idx_subject_semester_id
  ON subject (semester_id);

ALTER TABLE exam
  ADD CONSTRAINT fk_exam_subject
FOREIGN KEY (subject_id) REFERENCES subject (id)
  ON DELETE CASCADE;

ALTER TABLE mark_report_entry
  ADD CONSTRAINT fk_mark_report_entry_subject
FOREIGN KEY (subject_id) REFERENCES subject (id)
  ON DELETE CASCADE;

CREATE TABLE task
(
  id          BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NULL,
  due_date    TINYBLOB     NULL,
  effort      INT(11)      NULL,
  name        VARCHAR(255) NOT NULL,
  progress    INT(11)      NULL,
  todo_date   TINYBLOB     NULL,
  subject_id  BIGINT(20)   NULL,
  CONSTRAINT fk_task_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_task_subject_id
  ON task (subject_id);

CREATE TABLE teacher
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          VARCHAR(255) NULL,
  name           VARCHAR(255) NOT NULL,
  institution_id BIGINT(20)   NULL,
  CONSTRAINT fk_teacher_institution
  FOREIGN KEY (institution_id) REFERENCES institution (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_teacher_institution_id
  ON teacher (institution_id);

ALTER TABLE subject
  ADD CONSTRAINT fk_subject_teacher
FOREIGN KEY (teacher_id) REFERENCES teacher (id)
  ON DELETE CASCADE;

CREATE TABLE timetable
(
  id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

ALTER TABLE semester
  ADD CONSTRAINT fk_semester_timetable
FOREIGN KEY (timetable_id) REFERENCES timetable (id)
  ON DELETE CASCADE;

CREATE TABLE timetable_entry
(
  id                 BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  repeat_everynweeks INT(11)      NOT NULL,
  room               VARCHAR(255) NULL,
  time               TINYBLOB     NOT NULL,
  week_day           VARCHAR(255) NOT NULL,
  subject_id         BIGINT(20)   NULL,
  timetable_id       BIGINT(20)   NULL,
  CONSTRAINT fk_timetable_entry_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_timetable_entry_timetable
  FOREIGN KEY (timetable_id) REFERENCES timetable (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_timetable_entry_subject_id
  ON timetable_entry (subject_id);

CREATE INDEX idx_timetable_entry_timetable_id
  ON timetable_entry (timetable_id);

CREATE TABLE user
(
  id       BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  auth0id  VARCHAR(255) NOT NULL,
  username VARCHAR(50)  NOT NULL
);

ALTER TABLE institution
  ADD CONSTRAINT fk_institution_user
FOREIGN KEY (user_id) REFERENCES user (id)
  ON DELETE CASCADE;