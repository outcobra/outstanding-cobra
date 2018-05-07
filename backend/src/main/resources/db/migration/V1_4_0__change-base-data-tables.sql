# region DDL buildup
CREATE TABLE school_year_school_class (
  id             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  school_year_id BIGINT(20) NOT NULL,
  school_class_id       BIGINT(20) NOT NULL,
  CONSTRAINT fk_school_year_school_class_class
  FOREIGN KEY (school_class_id) REFERENCES class (id),
  CONSTRAINT fk_school_year_school_class_school_year
  FOREIGN KEY (school_year_id) REFERENCES school_year (id)
);

CREATE TABLE semester_subject (
  id          BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  semester_id BIGINT(20) NOT NULL,
  subject_id  BIGINT(20) NOT NULL,
  CONSTRAINT fk_semester_subject_semester
  FOREIGN KEY (semester_id) REFERENCES semester (id),
  CONSTRAINT fk_semester_subject_subject
  FOREIGN KEY (subject_id) REFERENCES subject (id)
);

ALTER TABLE school_year
  ADD COLUMN user_id BIGINT(20) NOT NULL DEFAULT 1,
  ADD CONSTRAINT fk_school_year_user
FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE subject
  ADD COLUMN user_id BIGINT(20) NOT NULL DEFAULT 1,
  ADD CONSTRAINT fk_subject_user
FOREIGN KEY (user_id) REFERENCES user (id);
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

    DECLARE user_semester_subject CURSOR FOR (
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
      UPDATE school_year SET user_id = user where id = year;
    END LOOP;

    SET done = 0;
    OPEN user_semester_subject;
    semesterSubjectLoop: LOOP
      FETCH user_semester_subject
      INTO user, semester, subject;
      IF done = 1
      THEN
        LEAVE semesterSubjectLoop;
      END IF;

      INSERT INTO semester_subject (semester_id, subject_id) VALUES (semester, subject);
      UPDATE subject SET user_id = user where id = subject;
    END LOOP;

    CLOSE user_class_year;
    CLOSE user_semester_subject;
  END$
DELIMITER ;

CALL UPDATE_BASE_DATA();
COMMIT;

DROP PROCEDURE UPDATE_BASE_DATA;
# endregion

# region DDL cleanup
ALTER TABLE subject
    DROP COLUMN semester_id;

ALTER TABLE school_year
    DROP COLUMN school_class_id;
# endregion