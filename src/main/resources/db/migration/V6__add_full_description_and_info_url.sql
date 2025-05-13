ALTER TABLE ancient_site
  RENAME COLUMN description TO teaser_description;

ALTER TABLE ancient_site
  ADD COLUMN full_description TEXT,
  ADD COLUMN info_url        VARCHAR(255);
