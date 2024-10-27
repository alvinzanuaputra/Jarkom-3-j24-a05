echo 'nameserver 192.168.122.1' >/etc/resolv.conf

apt-get update
apt-get install bind9 -y
mkdir /etc/bind/hogwarts

# nano /etc/bind/named.conf.local

echo '
zone "hogwarts.a05.com" {
        type master;
        file "/etc/bind/hogwarts/hogwarts.a05.com";
};' >/etc/bind/named.conf.local

cp /etc/bind/db.local /etc/bind/hogwarts/hogwarts.a05.com

# nano /etc/bind/hogwarts/hogwarts.a05.com

echo '
$TTL    604800
@       IN      SOA     hogwarts.a05.com. root.hogwarts.a05.com. (
                        2023110101    ; Serial
                        604800        ; Refresh
                        86400         ; Retry
                        2419200       ; Expire
                        604800 )      ; Negative Cache TTL
;
@               IN      NS      hogwarts.a05.com.
@               IN      A       10.6.3.2 ; MasterDNS
www             IN      CNAME   hogwarts.a05.com.
gryffindor      IN      A       10.6.4.2 ; IP Voldemort
ravenclaw       IN      A       10.6.4.3 ; IP Dementor
www.gryffindor  IN      CNAME   gryffindor.hogwarts.a05.com.
' >/etc/bind/hogwarts/hogwarts.a05.com


echo 'options {
      directory "/var/cache/bind";

      forwarders {
        192.168.122.1;
      };

      // dnssec-validation auto;
      allow-query{any;};
      auth-nxdomain no; 
      listen-on-v6 { any; };
}; ' >/etc/bind/named.conf.options

service named restart

#WOEEEEEEEEEEEEEEEEEEE
# dns server nyalain
# dhcp nyalain
# dhcprelay nyalain

