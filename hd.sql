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
    price varchar(10) not null,
    size tinyInt,
    abv decimal(3, 2),
    ibu int,
    created timestamp default now()
);
insert into ontap (active, tapname, brewer, price, abv, ibu) values (
1, "Riverwest Stein", "Lakefront Brewery", "5.50", 6, 24
);
insert into ontap (active, tapname, brewer, price, abv, ibu) values (
1, "Fixed Gear", "Lakefront Brewery", "5", 6.5, 54
);
select * from ontap order by active desc;

drop table events;
create table events (
	id int primary key auto_increment not null,
    title varchar(120) not null,
    description varchar(1000), 
    eventdate date,
    starttime time,
    endtime time,
    price varchar(120),
    eventlink varchar(1000),
    ticketlink varchar(1000),
    createdat timestamp default now() 
);
insert into events (title, description, eventdate, starttime, endtime, price, eventlink, ticketlink) values (
"Jason's Birthday", "He lived another year! Some bands will play", "2020-12-15", "13:15:00", "19:30:00", "10", "Facebook Link", "Ticket Link"
);
select * from events where eventdate >= now() order by eventdate;
select * from events;