ALTER TABLE exam
  ADD COLUMN description VARCHAR(255) NULL;

ALTER TABLE exam_task
  DROP FOREIGN KEY FK1yg6686i4k5pp0bhjqcn3gwwh,
  ADD CONSTRAINT examTask_Exam FOREIGN KEY (exam_id) REFERENCES exam (id)
  ON DELETE CASCADE;