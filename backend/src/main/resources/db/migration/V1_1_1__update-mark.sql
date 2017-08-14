ALTER TABLE mark_value
  ADD COLUMN description VARCHAR(255) NULL;
ALTER TABLE mark_group
  ADD COLUMN description VARCHAR(255) NULL;

UPDATE mark_group
SET description = ''
WHERE description IS NULL;

UPDATE mark_value
SET description = ''
WHERE description IS NULL;

ALTER TABLE mark_group
  MODIFY description VARCHAR(255) NOT NULL;


ALTER TABLE mark_value
  MODIFY description VARCHAR(255) NOT NULL;

ALTER TABLE exam
  ADD CONSTRAINT FKos7g6jn2448ll3ofc3w163cwh
FOREIGN KEY (mark_id) REFERENCES mark_value (id);

