# SOAL 6
echo 'nameserver 10.6.3.2' > /etc/resolv.conf

# Install necessary packages
apt-get update
apt-get install -y nginx wget unzip lynx htop apache2-utils php7.4-fpm php7.4-common php7.4-mysql php7.4-gmp php7.4-curl php7.4-intl php7.4-mbstring php7.4-xmlrpc php7.4-gd php7.4-xml php7.4-cli php7.4-zip

# Check and start services
service nginx status
service php7.4-fpm status
service nginx restart
service php7.4-fpm start

# Download and unzip the website
wget -O '/var/www/gryffindor.zip' 'https://drive.google.com/uc?export=download&id=17R4Zcxm3emHq21WdMJzSfCxO8FHqvATM'
unzip -o /var/www/gryffindor.zip -d /var/www/gryffindor.hogwarts.a05.com
rm /var/www/gryffindor.zip

# Set proper permissions
chown -R www-data:www-data /var/www/gryffindor.hogwarts.a05.com
chmod -R 755 /var/www/gryffindor.hogwarts.a05.com

# Set up Nginx site configuration
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/gryffindor.hogwarts.a05.com
ln -s /etc/nginx/sites-available/gryffindor.hogwarts.a05.com /etc/nginx/sites-enabled/gryffindor.hogwarts.a05.com
rm /etc/nginx/sites-enabled/default



# nano /etc/hosts

echo '
127.0.0.1 gryffindor.hogwarts.a05.com
127.0.0.1 www.gryffindor.hogwarts.a05.com
# 127.0.1.1 HarryPotter
127.0.0.1 localhost
# ::1     localhost ip6-localhost ip6-loopback
# fe00::0 ip6-localnet
# ff00::0 ip6-mcastprefix
# ff02::1 ip6-allnodes
# ff02::2 ip6-allrouters

# hostname 
# HarryPotter
' > /etc/hosts


# Restart services
service nginx restart
service php7.4-fpm restart


# nano /etc/nginx/sites-available/default
echo '
server {
    listen 80;
    root /var/www/gryffindor.hogwarts.a05.com;
    index index.php index.html index.htm;
    # server_name hogwarts.a05.com www.hogwarts.a05.com gryffindor.hogwarts.a05.com www.gryffindor.hogwarts.a05.com;
    server_name gryffindor.hogwarts.a05.com www.gryffindor.hogwarts.a05.com;

    # pass PHP scripts to FastCGI server
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }

    error_log /var/log/nginx/jarkom_error.log;
    access_log /var/log/nginx/jarkom_access.log;
}' > /etc/nginx/sites-available/gryffindor.hogwarts.a05.com


service nginx restart
service php7.4-fpm restart

# Test the site with lynx
lynx localhost
lynx gryffindor.hogwarts.a05.com
lynx www.gryffindor.hogwarts.a05.com