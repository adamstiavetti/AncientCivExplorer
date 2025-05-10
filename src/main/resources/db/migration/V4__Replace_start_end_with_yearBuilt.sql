ALTER TABLE ancient_site
DROP COLUMN start_year,
DROP COLUMN end_year;

ALTER TABLE ancient_site
    ADD COLUMN year_built INTEGER;
