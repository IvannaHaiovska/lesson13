ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

drop database if exists dashboard;
create database dashboard char set UTF8;
use dashboard;
select database();