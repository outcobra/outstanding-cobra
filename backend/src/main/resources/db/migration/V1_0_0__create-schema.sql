CREATE TABLE hibernate_sequences
(
  sequence_name          VARCHAR(255) NOT NULL PRIMARY KEY,
  sequence_next_hi_value BIGINT(20)   NULL
);

CREATE TABLE class
(
  id              BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  normalized_name VARCHAR(255) NOT NULL,
  institution_id  BIGINT(20)   NULL
);

CREATE INDEX FKcne5atascp6j90bqw7mf1rbok
  ON class (institution_id);

CREATE TABLE exam
(
  id         BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date       TINYBLOB     NOT NULL,
  name       VARCHAR(255) NOT NULL,
  mark_id    BIGINT(20)   NULL,
  subject_id BIGINT(20)   NOT NULL
);

CREATE INDEX FKos7g6kn2748ll3ofc3w163gxh
  ON exam (subject_id);

CREATE TABLE exam_task
(
  id       BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  finished BIT(1)       NOT NULL,
  task     VARCHAR(255) NOT NULL,
  exam_id  BIGINT(20)   NOT NULL,
  CONSTRAINT FK1yg6686i4k5pp0bhjqcn3gwwh
  FOREIGN KEY (exam_id) REFERENCES exam (id)
);

CREATE INDEX FK1yg6686i4k5pp0bhjqcn3gwwh
  ON exam_task (exam_id);

CREATE TABLE holiday
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  valid_from     TINYBLOB     NOT NULL,
  valid_to       TINYBLOB     NOT NULL,
  school_year_id BIGINT(20)   NULL
);

CREATE INDEX FK8hvf3uhvsc0dhd8vooj9o0nvr
  ON holiday (school_year_id);

CREATE TABLE institution
(
  id      BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name    VARCHAR(255) NOT NULL,
  user_id BIGINT(20)   NULL
);

CREATE INDEX FKcewi0hefcjabhhswl0fd9lrim
  ON institution (user_id);

ALTER TABLE class
  ADD CONSTRAINT FKcne5atascp6j90bqw7mf1rbok
FOREIGN KEY (institution_id) REFERENCES institution (id);

CREATE TABLE mark_group
(
  id            BIGINT(20) NOT NULL
    PRIMARY KEY,
  weight        DOUBLE     NOT NULL,
  mark_group_id BIGINT(20) NULL,
  CONSTRAINT FK_nxnsocqwok82hut41877aawa7
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id)
);

CREATE INDEX FK_nxnsocqwok82hut41877aawa7
  ON mark_group (mark_group_id);

CREATE TABLE mark_report
(
  id          BIGINT(20)   NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  semester_id BIGINT(20)   NOT NULL
);

CREATE INDEX FKi1tu4d51x01l5qk3wytr4vsi5
  ON mark_report (semester_id);

CREATE TABLE mark_report_entry
(
  id         BIGINT(20) NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
  weight     DOUBLE     NOT NULL,
  report_id  BIGINT(20) NOT NULL,
  subject_id BIGINT(20) NOT NULL,
  CONSTRAINT FKr9jkscbje7ds5509dkgwdqwy5
  FOREIGN KEY (report_id) REFERENCES mark_report (id)
);

CREATE INDEX FKeitykibr3r3hvanitx7n4juk3
  ON mark_report_entry (subject_id);

CREATE INDEX FKr9jkscbje7ds5509dkgwdqwy5
  ON mark_report_entry (report_id);

CREATE TABLE mark_value
(
  id            BIGINT(20) NOT NULL    PRIMARY KEY,
  weight        DOUBLE     NOT NULL,
  mark_group_id BIGINT(20) NULL,
  value         DOUBLE     NOT NULL,
  CONSTRAINT FK_s8x2nqqvbwde46ooii5ektlh4
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id)
);

CREATE INDEX FK_s8x2nqqvbwde46ooii5ektlh4
  ON mark_value (mark_group_id);

CREATE TABLE school_year
(
  id              BIGINT(20)   NOT NULL AUTO_INCREMENT
    PRIMARY KEY,
  name            VARCHAR(255) NOT NULL,
  valid_from      TINYBLOB     NOT NULL,
  valid_to        TINYBLOB     NOT NULL,
  school_class_id BIGINT(20)   NULL,
  CONSTRAINT FKstogi8dpaltkn9o4nskjaq4nx
  FOREIGN KEY (school_class_id) REFERENCES class (id)
);

CREATE INDEX FKstogi8dpaltkn9o4nskjaq4nx
  ON school_year (school_class_id);

ALTER TABLE holiday
  ADD CONSTRAINT FK8hvf3uhvsc0dhd8vooj9o0nvr
FOREIGN KEY (school_year_id) REFERENCES school_year (id);

CREATE TABLE semester
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  valid_from     TINYBLOB     NOT NULL,
  valid_to       TINYBLOB     NOT NULL,
  school_year_id BIGINT(20)   NOT NULL,
  timetable_id   BIGINT(20)   NULL,
  CONSTRAINT FK4k88c9a87iq730e36wcjgxt6l
  FOREIGN KEY (school_year_id) REFERENCES school_year (id)
);

CREATE INDEX FK4k88c9a87iq730e36wcjgxt6l
  ON semester (school_year_id);

CREATE INDEX FK9gx74o1sxnwwpov8iw5uww933
  ON semester (timetable_id);

ALTER TABLE mark_report
  ADD CONSTRAINT FKi1tu4d51x01l5qk3wytr4vsi5
FOREIGN KEY (semester_id) REFERENCES semester (id);

CREATE TABLE subject
(
  id            BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  color         VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  mark_group_id BIGINT(20)   NULL,
  semester_id   BIGINT(20)   NULL,
  teacher_id    BIGINT(20)   NULL,
  CONSTRAINT FKe2o22resstax2t3axugvmwh1
  FOREIGN KEY (mark_group_id) REFERENCES mark_group (id),
  CONSTRAINT FKmphheehxn35mmxxh67nnexukv
  FOREIGN KEY (semester_id) REFERENCES semester (id)
);

CREATE INDEX FKdvgvxo0oxhxeepkkwug7vg4w4
  ON subject (teacher_id);

CREATE INDEX FKe2o22resstax2t3axugvmwh1
  ON subject (mark_group_id);

CREATE INDEX FKmphheehxn35mmxxh67nnexukv
  ON subject (semester_id);

ALTER TABLE exam
  ADD CONSTRAINT FKos7g6kn2748ll3ofc3w163gxh
FOREIGN KEY (subject_id) REFERENCES subject (id);

ALTER TABLE mark_report_entry
  ADD CONSTRAINT FKeitykibr3r3hvanitx7n4juk3
FOREIGN KEY (subject_id) REFERENCES subject (id);

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
  CONSTRAINT FK5k22wv8pvap89p7wpo0ghs95g
  FOREIGN KEY (subject_id) REFERENCES subject (id)
);

CREATE INDEX FK5k22wv8pvap89p7wpo0ghs95g
  ON task (subject_id);

CREATE TABLE teacher
(
  id             BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email          VARCHAR(255) NULL,
  name           VARCHAR(255) NOT NULL,
  institution_id BIGINT(20)   NULL,
  CONSTRAINT FKmxe8fjg81ldmb4fmqfbk9mjxa
  FOREIGN KEY (institution_id) REFERENCES institution (id)
);

CREATE INDEX FKmxe8fjg81ldmb4fmqfbk9mjxa
  ON teacher (institution_id);

ALTER TABLE subject
  ADD CONSTRAINT FKdvgvxo0oxhxeepkkwug7vg4w4
FOREIGN KEY (teacher_id) REFERENCES teacher (id);

CREATE TABLE timetable
(
  id BIGINT(20) NOT NULL AUTO_INCREMENT
    PRIMARY KEY
);

ALTER TABLE semester
  ADD CONSTRAINT FK9gx74o1sxnwwpov8iw5uww933
FOREIGN KEY (timetable_id) REFERENCES timetable (id);

CREATE TABLE timetable_entry
(
  id                 BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  repeat_everynweeks INT(11)      NOT NULL,
  room               VARCHAR(255) NULL,
  time               TINYBLOB     NOT NULL,
  week_day           VARCHAR(255) NOT NULL,
  subject_id         BIGINT(20)   NULL,
  timetable_id       BIGINT(20)   NULL,
  CONSTRAINT FKf19xwgkp24u1q9cpm18guv9a9
  FOREIGN KEY (subject_id) REFERENCES subject (id),
  CONSTRAINT FKhl8jrtlfksu2veh0rvb5etlym
  FOREIGN KEY (timetable_id) REFERENCES timetable (id)
);

CREATE INDEX FKf19xwgkp24u1q9cpm18guv9a9
  ON timetable_entry (subject_id);

CREATE INDEX FKhl8jrtlfksu2veh0rvb5etlym
  ON timetable_entry (timetable_id);

CREATE TABLE user
(
  id       BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  auth0id  VARCHAR(255) NOT NULL,
  username VARCHAR(50)  NOT NULL
);

ALTER TABLE institution
  ADD CONSTRAINT FKcewi0hefcjabhhswl0fd9lrim
FOREIGN KEY (user_id) REFERENCES user (id);