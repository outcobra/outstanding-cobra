ALTER TABLE hibernate_sequences
  CHANGE COLUMN sequence_next_hi_value next_val BIGINT(20) NULL;

CREATE TABLE `hibernate_sequence` (
  `next_val` BIGINT(20) DEFAULT NULL
)