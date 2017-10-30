CREATE TABLE identity (
  id            BIGINT(20)   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user          BIGINT(20)   NOT NULL,
  identity_type VARCHAR(255) NOT NULL,
  identifier    VARCHAR(255) NOT NULL,
  secret        VARCHAR(255),

  CONSTRAINT fk_identity_user FOREIGN KEY (user) REFERENCES user (id)
);

CREATE UNIQUE INDEX idx_identity_id
  ON identity (id);

CREATE UNIQUE INDEX idx_identity_identifier
  ON identity (identifier);