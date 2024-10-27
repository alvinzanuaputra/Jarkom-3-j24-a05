# Dumbledore (Router)

auto eth0
iface eth0 inet dhcp
up iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE -s 10.6.0.0/16

auto eth1
iface eth1 inet static
    address 10.6.1.0
    netmask 255.255.255.0

auto eth2
iface eth2 inet static
    address 10.6.2.0
    netmask 255.255.255.0

auto eth3
iface eth3 inet static
    address 10.6.3.0
    netmask 255.255.255.0

auto eth4
iface eth4 inet static
    address 10.6.4.0
    netmask 255.255.255.0

auto eth5
iface eth5 inet static
    address 10.6.5.0
    netmask 255.255.255.0

auto eth6
iface eth6 inet static
    address 10.6.6.0
    netmask 255.255.255.0



############################################################

# HarryPotter (PHP Worker)
auto eth0
iface eth0 inet static
	address 10.6.1.1
	netmask 255.255.255.0
	gateway 10.6.1.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf


# RonWeasley (PHP Worker)
auto eth0
iface eth0 inet static
	address 10.6.1.2
	netmask 255.255.255.0
	gateway 10.6.1.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf

# HermioneGranger (PHP Worker)
auto eth0
iface eth0 inet static
	address 10.6.1.3
	netmask 255.255.255.0
	gateway 10.6.1.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf

###########################################################

# DracoMalfoy (Client)
auto eth0
iface eth0 inet dhcp


# AstoriaGreengrass (Client)
auto eth0
iface eth0 inet dhcp



#############################################################

# ServerusSnape (DHCP Server)
auto eth0
iface eth0 inet static
	address 10.6.3.1
	netmask 255.255.255.0
	gateway 10.6.3.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf
# McGonagall (DNS Server)
auto eth0
iface eth0 inet static
	address 10.6.3.2
	netmask 255.255.255.0
	gateway 10.6.3.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf


###########################################################


# Hagrid (Database Server)
auto eth0
iface eth0 inet static
	address 10.6.4.1
	netmask 255.255.255.0
	gateway 10.6.4.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf
# VoldeMort (Load Balancer)
auto eth0
iface eth0 inet static
	address 10.6.4.2
	netmask 255.255.255.0
	gateway 10.6.4.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf
# Dementor (Load Balancer)
auto eth0
iface eth0 inet static
	address 10.6.4.3
	netmask 255.255.255.0
	gateway 10.6.4.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf


############################################################

# SusanBones (Client)
auto eth0
iface eth0 inet dhcp

# HannahAbbott (Client)   
auto eth0
iface eth0 inet dhcp

############################################################

# ChoChang (Laravel Worker)
auto eth0
iface eth0 inet static
	address 10.6.6.1
	netmask 255.255.255.0
	gateway 10.6.6.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf
# FiliusFlitwick (Laravel Worker)
auto eth0
iface eth0 inet static
	address 10.6.6.2
	netmask 255.255.255.0
	gateway 10.6.6.0

up echo nameserver 192.168.122.1 > /etc/resolv.conf
# Lunalovegood (Laravel Worker)
auto eth0
iface eth0 inet static
	address 10.6.6.3
	netmask 255.255.255.0
	gateway 10.6.6.0
up echo nameserver 192.168.122.1 > /etc/resolv.conf
