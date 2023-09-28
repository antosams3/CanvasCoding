create schema store;
create table store.class
(
    id     serial
        constraint class_pk
            primary key,
    grade  int     not null,
    course varchar not null,
    year   varchar not null
);

create table store.user
(
    id       serial
        constraint user_pk
            primary key,
    email    varchar not null,
    name     varchar not null,
    surname  varchar not null,
    password varchar not null,
    type     int     not null
);

create unique index user_email_uindex
    on store.user (email);

create table store.repository
(
    id            serial
        constraint repository_pk
            primary key,
    creation_date date not null,
    code          varchar,
    student_id    int  not null,
    constraint student_id
        foreign key (student_id) references store."user"
);

create table store.object
(
    id   serial
        constraint object_pk
            primary key,
    name varchar not null,
    code varchar,
    type varchar not null
);

create table store.level
(
    id          serial
        constraint level_pk
            primary key,
    description varchar not null,
    goal        varchar
);

create table store.step
(
    id          serial
        constraint step_pk
            primary key,
    description varchar not null,
    action_menu varchar,
    "check"     varchar,
    tip         varchar,
    level_id    int
        constraint level_id
            references store.level
            on update cascade on delete cascade
);

alter table store.class
    add teacher_id int;

alter table store.class
    add constraint teacher_id
        foreign key (teacher_id) references store."user"
            on update cascade on delete cascade;


create table store.object_repository
(
    object_repository int
        constraint object_repository_pk
            primary key,
    object_id         int
        constraint object_id
            references store.object,
    repository_id     int
        constraint repository_id
            references store.repository
);


create table store.student_step
(
    student_step_id int
        constraint student_step_pk
            primary key,
    student_id      int
        constraint student_id
            references store."user",
    step_id         int
        constraint step_id
            references store.step
);



