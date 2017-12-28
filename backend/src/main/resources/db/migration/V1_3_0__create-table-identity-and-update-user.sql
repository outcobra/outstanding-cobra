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

ALTER TABLE USER
  ADD COLUMN MAIL VARCHAR(100);

CREATE PROCEDURE migrate_auth0_google()
  BEGIN
    DECLARE auth0_cur CURSOR FOR
      SELECT
        id,
        auth0id
      FROM user
      WHERE auth0id LIKE 'google-oauth2|%'; -- length: 14

    DECLARE cur_user BIGINT(20);
    DECLARE auth0id VARCHAR(255);

    LOOP
      FETCH auth0_cur
      INTO cur_user, auth0id;

      INSERT INTO identity (user, identity_type, identifier)
      VALUES (cur_user, 'google-auth', substring(auth0id, 14));
    END LOOP;
  END;

CALL migrate_auth0_google();
DROP PROCEDURE migrate_auth0_google;

ALTER TABLE USER
  DROP COLUMN AUTH0ID;