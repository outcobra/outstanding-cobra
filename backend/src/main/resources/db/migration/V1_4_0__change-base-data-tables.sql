# region DDL buildup
CREATE TABLE school_year_school_class (
  id              BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  school_year_id  BIGINT(20) NOT NULL,
  school_class_id BIGINT(20) NOT NULL,
  CONSTRAINT fk_school_year_school_class_class
  FOREIGN KEY (school_class_id) REFERENCES class (id),
  CONSTRAINT fk_school_year_school_class_school_year
  FOREIGN KEY (school_year_id) REFERENCES school_year (id)
);

/*CREATE TABLE subject_semester (
  id          BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  semester_id BIGINT(20) NOT NULL,
  subject_id  BIGINT(20) NOT NULL,
  CONSTRAINT fk_subject_semester_semester
  FOREIGN KEY (semester_id) REFERENCES semester (id),
  CONSTRAINT fk_subject_semester_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id)
);*/

/*CREATE TABLE subject_school_class (
  id              BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subject_id      BIGINT(20) NOT NULL,
  school_class_id BIGINT(20) NOT NULL,
  CONSTRAINT fk_subject_school_class_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id),
  CONSTRAINT fk_subject_school_class_school_class
  FOREIGN KEY (school_class_id) REFERENCES class (id)
);*/

ALTER TABLE school_year
  ADD COLUMN user_id BIGINT(20) NOT NULL DEFAULT 1,
  ADD CONSTRAINT fk_school_year_user
FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE subject
  ADD COLUMN user_id BIGINT(20) NOT NULL DEFAULT 1,
  ADD CONSTRAINT fk_subject_user
FOREIGN KEY (user_id) REFERENCES user (id);


CREATE TABLE school_class_semester (
  id BIGINT(20) NOT NULL PRIMARY KEY,
  school_class_id BIGINT(20) NOT NULL,
  semester_id     BIGINT(20) NOT NULL,
  CONSTRAINT fk_scs_school_class
  FOREIGN KEY (school_class_id) REFERENCES class(id),
  CONSTRAINT fk_scs_semester
  FOREIGN KEY (semester_id) REFERENCES semester(id)

);

CREATE TABLE school_class_semester_subject (
  id BIGINT(20) NOT NULL PRIMARY KEY,
  school_class_semester_id BIGINT(20) NOT NULL,
  subject_id BIGINT(20) NOT NULL,
  CONSTRAINT fk_scss_scs
  FOREIGN KEY (school_class_semester_id) REFERENCES school_class_semester(id),
  CONSTRAINT fk_scss_subject
  FOREIGN KEY (subject_id) REFERENCES subject(id)
);

ALTER TABLE exam
  ADD COLUMN school_class_semester_subject_id BIGINT(20) NOT NULL DEFAULT 0,
  ADD CONSTRAINT fk_scss_exam
  FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject(id);

ALTER TABLE mark_group
  ADD COLUMN school_class_semester_subject_id BIGINT(20) NOT NULL DEFAULT 0,
  ADD CONSTRAINT fk_scss_mark_group
  FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject(id);

ALTER TABLE task
  ADD COLUMN school_class_semester_subject_id BIGINT(20) NOT NULL DEFAULT 0,
  ADD CONSTRAINT fk_scss_task
  FOREIGN KEY (school_class_semester_subject_id) REFERENCES school_class_semester_subject(id);

# endregion

# region DML transfer
DELIMITER $

CREATE PROCEDURE UPDATE_BASE_DATA()
  BEGIN
    DECLARE user BIGINT(20);
    DECLARE class BIGINT(20);
    DECLARE year BIGINT(20);
    DECLARE semester BIGINT(20);
    DECLARE subject BIGINT(20);
    DECLARE done INT;

    DECLARE user_class_year CURSOR FOR (
      SELECT
        u.id  AS user_id,
        c.id  AS class_id,
        sy.id AS year_id
      FROM user u
        JOIN institution i ON u.id = i.user_id
        JOIN class c ON i.id = c.institution_id
        JOIN school_year sy ON c.id = sy.school_class_id
    );

    DECLARE user_subject_semester CURSOR FOR (
      SELECT
        u.id  AS user_id,
        se.id AS semester_id,
        su.id AS subject_id
      FROM user u
        JOIN institution i ON u.id = i.user_id
        JOIN class c ON i.id = c.institution_id
        JOIN school_year sy ON c.id = sy.school_class_id
        JOIN semester se ON sy.id = se.school_year_id
        JOIN subject su ON se.id = su.semester_id
    );

    DECLARE subject_school_class CURSOR FOR (
      SELECT
        s.id,
        c.id
      FROM subject s
        JOIN semester se ON s.semester_id = se.id
        JOIN school_year sy ON se.school_year_id = sy.id
        JOIN class c ON sy.school_class_id = c.id
    );

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN user_class_year;
    classYearLoop: LOOP
      FETCH user_class_year
      INTO user, class, year;
      IF done = 1
      THEN
        LEAVE classYearLoop;
      END IF;

      INSERT INTO school_year_school_class (school_year_id, school_class_id) VALUES (year, class);
      UPDATE school_year
      SET user_id = user
      WHERE id = year;
    END LOOP;

    SET done = 0;
    OPEN user_subject_semester;
    semesterSubjectLoop: LOOP
      FETCH user_subject_semester
      INTO user, semester, subject;
      IF done = 1
      THEN
        LEAVE semesterSubjectLoop;
      END IF;

      INSERT INTO subject_semester (semester_id, subject_id) VALUES (semester, subject);
      UPDATE subject
      SET user_id = user
      WHERE id = subject;
    END LOOP;
    SET done = 0;

    OPEN subject_school_class;
    subjectSchoolClassLoop: LOOP
      FETCH subject_school_class
      INTO subject, class;
      IF done = 1
      THEN
        LEAVE subjectSchoolClassLoop;
      END IF;

      INSERT INTO subject_school_class (subject_id, school_class_id) VALUES (subject, class);
    END LOOP;

    CLOSE user_class_year;
    CLOSE user_subject_semester;
  END$
DELIMITER ;

CALL UPDATE_BASE_DATA();
COMMIT;

DROP PROCEDURE UPDATE_BASE_DATA;
# endregion

# region DDL cleanup
ALTER TABLE subject
  DROP FOREIGN KEY fk_subject_semester,
  DROP COLUMN semester_id;

ALTER TABLE school_year
  DROP FOREIGN KEY fk_school_year_class,
  DROP COLUMN school_class_id;

ALTER TABLE subject
  DROP FOREIGN KEY fk_subject_mark_group,
  DROP COLUMN mark_group_id;
# endregion