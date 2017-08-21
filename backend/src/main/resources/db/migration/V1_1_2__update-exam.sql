ALTER TABLE exam
  ADD COLUMN description VARCHAR(255) NULL;

UPDATE exam
SET description = ''
WHERE description IS NULL;

ALTER TABLE exam
  MODIFY description VARCHAR(255) NOT NULL;

ALTER TABLE exam_task
  DROP FOREIGN KEY fk_exam_task_exam;

ALTER TABLE exam_task
  ADD CONSTRAINT fk_exam_task_exam FOREIGN KEY (exam_id) REFERENCES exam (id)
  ON DELETE CASCADE;