ALTER TABLE exam
  ADD COLUMN description VARCHAR(255) NULL;

UPDATE exam
SET description = ''
WHERE description IS NULL;

ALTER TABLE exam
  MODIFY description VARCHAR(255) NOT NULL;

ALTER TABLE exam_task
  DROP FOREIGN KEY FK1yg6686i4k5pp0bhjqcn3gwwh;

ALTER TABLE exam_task
  ADD CONSTRAINT examTask_Exam FOREIGN KEY (exam_id) REFERENCES exam (id)
  ON DELETE CASCADE;