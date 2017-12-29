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

ALTER TABLE user
  ADD COLUMN MAIL VARCHAR(100);

CREATE PROCEDURE migrate_auth0_google()
  BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_user BIGINT(20);
    DECLARE cur_auth0id VARCHAR(255);

    DECLARE auth0_cur CURSOR FOR
      SELECT
        id,
        auth0id
      FROM user
      WHERE auth0id LIKE 'google-oauth2|%'; -- length: 14
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN auth0_cur;

    migrate_loop: LOOP
      FETCH auth0_cur
      INTO cur_user, cur_auth0id;

      IF done
      THEN
        LEAVE migrate_loop;
      END IF;

      INSERT INTO identity (user, identity_type, identifier)
      VALUES (cur_user, 'google-auth', substring(cur_auth0id, 15));
    END LOOP;

    CLOSE auth0_cur;
  END;

CALL migrate_auth0_google;
DROP PROCEDURE migrate_auth0_google;

ALTER TABLE user
  DROP COLUMN auth0id;