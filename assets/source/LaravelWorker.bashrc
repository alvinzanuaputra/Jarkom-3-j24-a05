echo 'nameserver 10.6.3.2'> /etc/resolv.conf

apt-get update
apt-get install lynx -y
apt-get install mariadb-client -y

apt-get install -y lsb-release ca-certificates apt-transport-https software-properties-common gnupg2

curl -sSLo /usr/share/keyrings/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg

sh -c 'echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'


apt-get update
apt-get install php7.4 php7.4-mbstring php7.4-xml php7.4-cli php7.4-common php7.4-intl php7.4-opcache php7.4-readline php7.4-mysql php7.4-fpm php7.4-curl unzip wget -y


apt-get install nginx -y

service nginx start
service php7.4-fpm start

service nginx restart
service php7.4-fpm restart


# nomor 13
# ini di LARAVELwork
# Setelah itu lakukan pengecekan di salah satu Laravel Worker. Disini kami akan melakukan pengecekan pada worker Fern dengan melakukan perintah shell berikut

mariadb --host=10.6.4.1 --port=3306 --user=kelompoka05 --password=passworda05 dbkelompoka05 -e "SHOW DATABASES;"



# nomor 14
apt-get update
apt-get install -y lsb-release ca-certificates apt-transport-https software-properties-common gnupg2
curl -sSLo /usr/share/keyrings/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
add-apt-repository ppa:ondrej/php
apt-get install php8.0-mbstring php8.0-xml php8.0-cli php8.0-common php8.0-intl php8.0-opcache php8.0-readline php8.0-mysql php8.0-fpm php8.0-curl unzip nginx wget -y

service nginx start
service php8.0-fpm start


wget https://getcomposer.org/download/2.0.13/composer.phar
chmod +x composer.phar
mv composer.phar /usr/bin/composer

apt-get install git -y
cd /var/www && git clone https://github.com/lodaogos/laravel-jarkom-modul-3.git
cd /var/www/laravel-jarkom-modul-3 && composer update

cd /var/www/laravel-jarkom-modul-3 && cp .env.example .env
# nano /var/www/laravel-jarkom-modul-3/.env
echo '
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=10.6.4.1
DB_PORT=3306
DB_DATABASE=dbkelompoka05
DB_USERNAME=kelompoka05
DB_PASSWORD=passworda05

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"' > /var/www/laravel-jarkom-modul-3/.env
cd /var/www/laravel-jarkom-modul-3 && php artisan key:generate
cd /var/www/laravel-jarkom-modul-3 && php artisan config:cache
cd /var/www/laravel-jarkom-modul-3 && php artisan migrate
cd /var/www/laravel-jarkom-modul-3 && php artisan db:seed
cd /var/www/laravel-jarkom-modul-3 && php artisan storage:link
cd /var/www/laravel-jarkom-modul-3 && php artisan jwt:secret
cd /var/www/laravel-jarkom-modul-3 && php artisan config:clear
chown -R www-data.www-data /var/www/laravel-jarkom-modul-3/storage


echo -e '
server {
    listen 8003;

    root /var/www/laravel-jarkom-modul-3/public;

    index index.php index.html index.htm;
    server_name _;

    location / {
            try_files $uri $uri/ /index.php?$query_string;
    }

    # pass PHP scripts to FastCGI server
    location ~ \.php$ {
      include snippets/fastcgi-php.conf;
      fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }

    location ~ /\.ht {
            deny all;
    }

    error_log /var/log/nginx/implementasi_error.log;
    access_log /var/log/nginx/implementasi_access.log;
}' > /etc/nginx/sites-available/laravel-worker

cp /etc/nginx/sites-available/default /etc/nginx/sites-available/laravel-worker
rm /etc/nginx/sites-enable/default
ln -s /etc/nginx/sites-available/laravel-worker /etc/nginx/sites-enabled/laravel-worker

# chown -R www-data.www-data /var/www/laravel-jarkom-modul-3/storage
# chmod -R 777 public
# chmod -R 777 storage

service nginx restart
service php8.0-fpm start
service php8.0-fpm restart

lynx localhost:8003


# nomor 15 di client


# nomor 19 di masing masing laravel worker

# script1
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
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3' > /etc/php/8.0/fpm/pool.d/www.conf

service php8.0-fpm restart

apt install apache2-utils -y

# di client
# ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login

# script 2
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
pm.max_children = 25
pm.start_servers = 5
pm.min_spare_servers = 3
pm.max_spare_servers = 10' > /etc/php/8.0/fpm/pool.d/www.conf

service php8.0-fpm restart
# di client
# ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login


# script3
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
pm.max_children = 50
pm.start_servers = 8
pm.min_spare_servers = 5
pm.max_spare_servers = 15' > /etc/php/8.0/fpm/pool.d/www.conf

service php8.0-fpm restart
# di client
# ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login



# nomor 20 di load balancer