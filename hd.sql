drop schema highdive;
CREATE SCHEMA `highdive`;
use highdive;

create user 'hdmke_user'@'localhost' identified by 'root';
GRANT ALL ON highdive.* TO 'hdmke_user'@'localhost';

drop table users;
create table users (
	id int primary key auto_increment not null,
    username varchar(32) not null,
    password varchar(32) not null,
    admin bool default 0 not null,
    created datetime default now()
);
insert into users (username, password, admin) values ("jason", "666", 1);
insert into users (username, password, admin) values ("lucas", "666", 0);
select * from users;

drop table ontap;
create table ontap (
	id int primary key auto_increment not null,
    active bool not null,
    tapname varchar(64) not null,
    brewer varchar(64) not null,
    price decimal(3, 2) not null,
    size tinyInt,
    abv decimal(3, 2),
    ibu int,
    description varchar(1000),
    created timestamp default now()
);
insert into ontap (active, tapname, brewer, price, abv, ibu, description) values (
1, "Riverwest Stein", "Lakefront Brewery", 5.50, 6, 24, "Medium-light body with a dash of caramel malt sweetness that’s quickly curbed by pleasing hop notes and crisp, lager finish."
);
select * from ontap;

drop table events;
create table events (
	id int primary key auto_increment not null,
    title varchar(120) not null,
    description varchar(1000), 
    eventdate date,
    starttime time,
    endtime time,
    price decimal(4, 2),
    link varchar(1000),
    createdat timestamp default now() 
);
insert into events (title, description, eventdate, starttime, endtime, price, link) values (
"Jason's Birthday", "He lived another year! Some bands will play", "2021-12-15", "13:15:00", "19:30:00", 10, "Facebook Link"
);
select * from events;