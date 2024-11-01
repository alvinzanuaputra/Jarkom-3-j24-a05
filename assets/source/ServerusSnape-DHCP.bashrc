echo 'nameserver 10.6.3.2' > /etc/resolv.conf   # Pastikan DNS Server sudah berjalan 

apt-get update
apt install isc-dhcp-server -y



# nano /etc/default/isc-dhcp-server

echo '
INTERFACESv4="eth0"
' > /etc/default/isc-dhcp-server



# NOMOR 2
# nano /etc/dhcp/dhcpd.conf

echo '
subnet 10.6.1.0 netmask 255.255.255.0 {
}

subnet 10.6.2.0 netmask 255.255.255.0 {
    range 10.6.2.64 10.6.2.65;
    range 10.6.2.100 10.6.2.101;
    option routers 10.6.2.0;
}


subnet 10.6.3.0 netmask 255.255.255.0 {
}

subnet 10.6.4.0 netmask 255.255.255.0 {
}

subnet 10.6.5.0 netmask 255.255.255.0 {
    range 10.6.5.50 10.6.5.51;
    range 10.6.5.155 10.6.5.156;
    option routers 10.6.5.0;
}

subnet 10.6.6.0 netmask 255.255.255.0 {
}
' > /etc/dhcp/dhcpd.conf


service isc-dhcp-server restart


# NOMOR 3
# nano /etc/dhcp/dhcpd.conf

echo '
subnet 10.6.1.0 netmask 255.255.255.0 {
    range 10.6.1.10 10.6.1.15;
    range 10.6.1.20 10.6.1.25;
    option routers 10.6.1.0;
}

subnet 10.6.2.0 netmask 255.255.255.0 {
    range 10.6.2.64 10.6.2.65;
    range 10.6.2.100 10.6.2.101;
    option routers 10.6.2.0;
}


subnet 10.6.3.0 netmask 255.255.255.0 {
}

subnet 10.6.4.0 netmask 255.255.255.0 {
}

subnet 10.6.5.0 netmask 255.255.255.0 {
    range 10.6.5.50 10.6.5.51;
    range 10.6.5.155 10.6.5.156;
    option routers 10.6.5.0;
}

subnet 10.6.6.0 netmask 255.255.255.0 {
    range 10.6.6.10 10.6.6.15;
    range 10.6.6.20 10.6.6.25;
    option routers 10.6.6.0;
}
' > /etc/dhcp/dhcpd.conf

service isc-dhcp-server restart


# nomor 4 
# nano /etc/dhcp/dhcpd.conf


echo '
subnet 10.6.1.0 netmask 255.255.255.0 {
    range 10.6.1.10 10.6.1.15;
    range 10.6.1.20 10.6.1.25;
    option routers 10.6.1.0;
    default-lease-time 600;  # 10 minutes (Switch 1)
    max-lease-time 6000;      # Maximum 100 minutes
}

subnet 10.6.2.0 netmask 255.255.255.0 {
    range 10.6.2.64 10.6.2.65;
    range 10.6.2.100 10.6.2.101;
    option routers 10.6.2.0;
    default-lease-time 300;  # 5 minutes (Switch 2)
    max-lease-time 6000;     # Maximum 100 minutes
}


subnet 10.6.3.0 netmask 255.255.255.0 {
}

subnet 10.6.4.0 netmask 255.255.255.0 {
}

subnet 10.6.5.0 netmask 255.255.255.0 {
    range 10.6.5.50 10.6.5.51;
    range 10.6.5.155 10.6.5.156;
    option routers 10.6.5.0;
    default-lease-time 1200;  # 20 minutes (Switch 5)
    max-lease-time 6000;      # Maximum 100 minutes
}

subnet 10.6.6.0 netmask 255.255.255.0 {
    range 10.6.6.10 10.6.6.15;
    range 10.6.6.20 10.6.6.25;
    option routers 10.6.6.0;
    default-lease-time 600;  # 10 minutes (Switch 6)
    max-lease-time 6000;     # Maximum 100 minutes
}
' > /etc/dhcp/dhcpd.conf


service isc-dhcp-server restart

# jaga jaga error : 
# rm /var/run/dhcpd.pid



# NOMOR 5

# nano >> /etc/dhcp/dhcpd.conf

echo '
host HermioneGranger {
    hardware ethernet 42:56:87:3c:9e:3d;  
    fixed-address 10.6.1.14;              
}

host ChoChang {
    hardware ethernet b6:04:99:bd:42:8a; 
    fixed-address 10.6.6.14;            
}' >> /etc/dhcp/dhcpd.conf


service isc-dhcp-server restart


# testingnya ip a di hermione dan chochang
# ip a di hermione
# ip a di chochang
# putusin telnet lagi 


# auto eth0
# iface eth0 inet dhcp
# hwaddress ether 42:56:87:3c:9e:3d