echo '
nameserver 192.168.122.1
nameserver 10.6.3.2
' > /etc/resolv.conf

apt-get update
apt-get install mariadb-server -y
service mysql start

# Lalu jangan lupa untuk mengganti [bind-address] pada file /etc/mysql/mariadb.conf.d/50-server.cnf menjadi 0.0.0.0 dan jangan lupa untuk melakukan restart mysql kembali

# Db akan diakses oleh 3 worker, maka 
echo '# This group is read both by the client and the server
# use it for options that affect everything
[client-server]

# Import all .cnf files from configuration directory
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mariadb.conf.d/

# Options affecting the MySQL server (mysqld)
[mysqld]
skip-networking=0
skip-bind-address
' > /etc/mysql/my.cnf

nano /etc/mysql/mariadb.conf.d/50-server.cnf

# Changes
bind-address            = 0.0.0.0

service mysql start

mysql -u root -p
# Enter password: 

CREATE USER 'kelompoka05'@'%' IDENTIFIED BY 'passworda05';
CREATE USER 'kelompoka05'@'localhost' IDENTIFIED BY 'passworda05';
CREATE DATABASE dbkelompoka05;
GRANT ALL PRIVILEGES ON *.* TO 'kelompoka05'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'kelompoka05'@'localhost';
FLUSH PRIVILEGES;

exit

service mysql restart
# TESTING DI LAAVELWORKER