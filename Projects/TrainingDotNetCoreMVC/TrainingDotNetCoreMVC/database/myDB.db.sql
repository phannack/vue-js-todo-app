BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Movie" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	TEXT,
	"coverImg"	TEXT,
	"releaseDate"	TEXT,
	"genre"	TEXT,
	"duration"	INTEGER,
	"createDate"	TEXT,
	"modifyDate"	TEXT
);
INSERT INTO "Movie" VALUES (1,'9 ศาสตรา','https://images.pexels.com/photos/2990/vintage-old-film.jpg?w=940&h=650&auto=compress&cs=tinysrgb','2018-01-05','แอนิเมชัน',107,'2019-04-25','2019-04-25');
COMMIT;
