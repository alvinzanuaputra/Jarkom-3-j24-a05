#  ini di relay utama 
apt-get update
apt-get install isc-dhcp-relay -y

# nano /etc/default/isc-dhcp-relay

echo '
SERVERS="10.6.3.1"  
INTERFACES="eth1 eth2 eth3 eth4 eth5 eth6"
OPTIONS=
' > /etc/default/isc-dhcp-relay


# nano /etc/sysctl.conf

echo 'net.ipv4.ip_forward=1' > /etc/sysctl.conf

service isc-dhcp-relay restart