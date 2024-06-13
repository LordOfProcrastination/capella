DELETE FROM characteritems;
DELETE FROM characterallies;
UPDATE characterstats SET understanding = 0, time = 2, supplies = 3, recklessness = 0, injuries = 0 WHERE id = 1;