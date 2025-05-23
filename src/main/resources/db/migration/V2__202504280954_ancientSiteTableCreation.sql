CREATE TABLE ancient_site
(
    id                BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name              VARCHAR(255)                            NOT NULL,
    description       TEXT,
    latitude          DOUBLE PRECISION                        NOT NULL,
    longitude         DOUBLE PRECISION                        NOT NULL,
    image_url         VARCHAR(255),
    era               VARCHAR(255),
    region            VARCHAR(255),
    start_year        INTEGER,
    end_year          INTEGER,
    discovery_year    INTEGER,
    credibility_level VARCHAR(255),
    is_alternative    BOOLEAN,
    site_type_id      BIGINT                                  NOT NULL,
    is_user_submitted BOOLEAN,
    is_deleted        BOOLEAN,
    created_at        TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_ancientsite PRIMARY KEY (id)
);

ALTER TABLE ancient_site
    ADD CONSTRAINT FK_ANCIENTSITE_ON_SITE_TYPE FOREIGN KEY (site_type_id) REFERENCES site_type (id);