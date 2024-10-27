# 7 dan 8
echo '
nameserver 192.168.122.1
nameserver 10.6.3.2
' >/etc/resolv.conf
apt-get update
apt-get install nginx -y
apt-get install lynx -y
apt-get install apache2-utils -y
service nginx start

cp /etc/nginx/sites-available/default /etc/nginx/sites-available/libray_php

echo ' 
upstream backend {
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}

server {
    listen 80;
    server_name gryffindor.hogwarts.a05.com;

    location / {
            proxy_pass http://backend;
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    Host $http_host;
    }

    auth_basic "Restricted Content";
    auth_basic_user_file /etc/nginx/secretchamber/htpasswd;

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;

}' >/etc/nginx/sites-available/libray_php

ln -s /etc/nginx/sites-available/libray_php /etc/nginx/sites-enabled/libray_php
rm /etc/nginx/sites-enabled/default

service nginx restart

# soal 7
ab -n 1000 -c 100 http://www.gryffindor.hogwarts.a05.com/index.php

# soal 8 jmeter
htop
# siapkan jmeter
# buat thread group
# sampai masuk ke http request
# jmx sudah siap sampai dengan mengunduh java :
# ini untuk config lanjut di client

echo '
upstream backend {
    # Round Robin
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}
upstream backend {
    # Least-connection
    least_conn;
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}
upstream backend {
    # ip_hash
    ip_hash;
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}
' >/etc/nginx/sites-available/libray_php

testing 
ab -n 300 -c 10 http://www.gryffindor.hogwarts.a05.com/index.php

# 9
echo 'nameserver 192.168.122.1 ' >/etc/resolv.conf
# nano /etc/resolv.conf
apt-get update
apt install apache2-utils -y
mkdir -p /etc/nginx/secretchamber
htpasswd -c /etc/nginx/secretchamber/htpasswd jarkom

# lalu masukkan password modul3
# ini di client
nginx -t

service nginx restart

# nomor 10 
# nano /etc/nginx/sites-available/libray_php

echo '
upstream backend {
    # Round Robin
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}
upstream backend  {
    # Round Robin
    server 10.6.1.1;
    server 10.6.1.2;
}
upstream backend  {
    # Round Robin
    server 10.6.1.1;
}' >/etc/nginx/sites-available/libray_php

# ab -n 300 -c 100 http://www.gryffindor.hogwarts.a05.com/index.php

# test lanjutanya pakai jmeter

# 11

echo ' 
upstream backend {
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}

server {
    listen 80;
    server_name gryffindor.hogwarts.a05.com;

    location ~ /informatika {
        rewrite ^/informatika(.*)$ /informatika/id/beranda$1 break;
        proxy_pass https://www.its.ac.id;
        proxy_set_header Host www.its.ac.id;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    auth_basic "Restricted Content";
    auth_basic_user_file /etc/nginx/secretchamber/htpasswd;

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}' >/etc/nginx/sites-available/libray_php

service nginx restart
nginx -t

# testing
lynx gryffindor.hogwarts.a05.com/informatika

# 12

echo '
upstream backend {
    server 10.6.1.1;
    server 10.6.1.2;
    server 10.6.1.3;
}

server {
    listen 80;
    server_name gryffindor.hogwarts.a05.com www.gryffindor.hogwarts.a05.com;

    # Mengatur pembatasan akses berdasarkan IP
    location / {
        allow 10.6.2.64;
        allow 10.6.2.100;
        allow 10.6.5.50;
        allow 10.6.5.155;
        deny all; # Menolak semua IP lainnya

        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }

    auth_basic "Restricted Content";
    auth_basic_user_file /etc/nginx/secretchamber/htpasswd;

    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
}
' >/etc/nginx/sites-available/libray_php

service nginx restart

lynx gryffindor.hogwarts.a05.com


# nomor 18


echo '
worker {
    server 10.6.6.1:8004;
    server 10.6.6.2:8005;
    server 10.6.6.3:8006;
}

server {
    listen 80;
    server_name gryffindor.hogwarts.a05.com www.gryffindor.hogwarts.a05.com;

    location / {
        proxy_pass http://worker;
    }
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
} 
' > /etc/nginx/sites-available/laravel-worker

ln -s /etc/nginx/sites-available/laravel-worker /etc/nginx/sites-enabled/laravel-worker

service nginx restart



# ini di client
# ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login

ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login




# nomor 19 di laravel worker 


# nomor 20

# note ini di laravel worker namun dengan konfigurasi lebih besar

echo '[www]
user = www-data
group = www-data
listen = /run/php/php8.0-fpm.sock
listen.owner = www-data
listen.group = www-data
php_admin_value[disable_functions] = exec,passthru,shell_exec,system
php_admin_flag[allow_url_fopen] = off

; Choose how the process manager will control the number of child processes.

pm = dynamic
pm.max_children = 100
pm.start_servers = 20
pm.min_spare_servers = 15
pm.max_spare_servers = 30' > /etc/php/8.0/fpm/pool.d/www.conf
#

# load B

echo '
upstream worker {
    least_conn;
    server 10.6.6.1:8004;
    server 10.6.6.2:8005;
    server 10.6.6.3:8006;
}

server {
    listen 80;
    server_name gryffindor.hogwarts.a05.com www.gryffindor.hogwarts.a05.com;

    location / {
        proxy_pass http://worker;
    }
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
} 
' > /etc/nginx/sites-available/laravel-worker

ln -s /etc/nginx/sites-available/laravel-worker /etc/nginx/sites-enabled/laravel-worker

service nginx restart