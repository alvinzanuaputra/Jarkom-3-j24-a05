apt-get update
apt install htop -y

echo '
nameserver 192.168.122.1
nameserver 10.6.3.2
' >/etc/resolv.conf

ping hogwarts.a05.com -c 3
ping www.hogwarts.a05.com -c 3
ping gryffindor.hogwarts.a05.com -c 3
ping www.gryffindor.hogwarts.a05.com -c 3
ping ravenclaw.hogwarts.a05.com -c 3

# cobain reverse proxy
apt-get install dnsutils -y
host -t A hogwarts.a05.com
host -t A www.hogwarts.a05.com  
host -t A gryffindor.hogwarts.a05.com
host -t A ravenclaw.hogwarts.a05.com


# nomor 7
echo 'nameserver 10.6.3.2 
nameserver 192.168.122.1' > /etc/resolv.conf
apt-get update
apt install lynx -y
apt install htop -y
lynx gryffindor.hogwarts.a05.com

htop


# nomor 8 pakai client dracomalfoy aja
echo 'nameserver 192.168.122.1 ' > /etc/resolv.conf
apt-get update
java -version
apt-get install openjdk-11-jre
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip
unzip apache-jmeter-5.6.3.zip
cd apache-jmeter-5.6.3/bin

#####################################################################################
nano 1-RoundRobbin.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../1-ROUNDROBBINJMX
./jmeter -n -t 1-RoundRobbin.jmx -l 1-RoundRobbin.csv -e -o ../../1-ROUNDROBBINJMX

# kalau gajadi/gagal
rm -r ../../1-ROUNDROBBINJMX
mkdir ../../1-ROUNDROBBINJMX
rm 1-RoundRobbin.csv
./jmeter -n -t 1-RoundRobbin.jmx -l 1-RoundRobbin.csv -e -o ../../1-ROUNDROBBINJMX



cd

zip -r 1-ROUNDROBBIN.zip 1-ROUNDROBBINJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./1-ROUNDROBBIN.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################
nano 2-LeasConnection.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../2.LEASCONNECTIONJMX
./jmeter -n -t 2-LeasConnection.jmx -l 2-LeasConnection.csv -e -o ../../2.LEASCONNECTIONJMX

# kalau gajadi/gagal
rm -r ../../2.LEASCONNECTIONJMX
mkdir ../../2.LEASCONNECTIONJMX
rm 2-LeasConnection.csv
./jmeter -n -t 2-LeasConnection.jmx -l 2-LeasConnection.csv -e -o ../../2.LEASCONNECTIONJMX

cd

zip -r 2-LEASCONNECTION.zip 2.LEASCONNECTIONJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./2-LEASCONNECTION.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################
nano 3-iphash.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../3-IPHASHJMX
./jmeter -n -t 3-iphash.jmx -l 3-iphash.csv -e -o ../../3-IPHASHJMX

# kalau gajadi/gagal
rm -r ../../3.IPHASHJMX
mkdir ../../3.IPHASHJMX
rm 3-iphash.csv
./jmeter -n -t 3-iphash.jmx -l 3-iphash.csv -e -o ../../3-IPHASHJMX

cd

zip -r 3-IPHASH.zip 3-IPHASHJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./3-IPHASH.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################

# ab -n 300 -c 3 http://gryffindor.hogwarts.a05.com/index.php


# nomor 9
echo 'nameserver 192.168.122.1 ' > /etc/resolv.conf
apt-get update
apt install lynx -y
apt install htop -y

# lynx ke client jangan lupa nameserver

lynx gryffindor.hogwarts.a05.com
lynx www.gryffindor.hogwarts.a05.com


# masukin username pw

# apt update
# apt install lynx -y
# apt install htop -y
# apt install apache2-utils -y
# apt-get install jq -y



# nomor 10 pakai client dracomalfoy aja
echo 'nameserver 192.168.122.1 
nameserver 8.8.8.8' > /etc/resolv.conf
apt-get update
java -version
apt-get install openjdk-11-jre
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip
unzip apache-jmeter-5.6.3.zip
cd apache-jmeter-5.6.3/bin

# nano file.jmx (sesuaikan dengan worker)


# masukin script jmeter
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="NOMOR 8">
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group">
        <intProp name="ThreadGroup.num_threads">300</intProp>
        <intProp name="ThreadGroup.ramp_time">3</intProp>
        <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller">
          <stringProp name="LoopController.loops">1</stringProp>
          <boolProp name="LoopController.continue_forever">false</boolProp>
        </elementProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Login">
          <stringProp name="HTTPSampler.domain">gryffindor.hogwarts.a05.com</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/api/login</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables">
            <collectionProp name="Arguments.arguments">
              <elementProp name="username" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">wingardium</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">username</stringProp>
              </elementProp>
              <elementProp name="password" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">leviosa</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">password</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Access Home">
          <stringProp name="HTTPSampler.domain">gryffindor.hogwarts.a05.com</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/home</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Logout">
          <stringProp name="HTTPSampler.domain">gryffindor.hogwarts.a05.com</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.path">/api/logout</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
        </HTTPSamplerProxy>
        <hashTree/>
        <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="View Results Tree">
          <boolProp name="ResultCollector.error_logging">false</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time>
              <latency>true</latency>
              <timestamp>true</timestamp>
              <success>true</success>
              <label>true</label>
              <code>true</code>
              <message>true</message>
              <threadName>true</threadName>
              <dataType>true</dataType>
              <encoding>false</encoding>
              <assertions>true</assertions>
              <subresults>true</subresults>
              <responseData>false</responseData>
              <samplerData>false</samplerData>
              <xml>false</xml>
              <fieldNames>true</fieldNames>
              <responseHeaders>false</responseHeaders>
              <requestHeaders>false</requestHeaders>
              <responseDataOnError>false</responseDataOnError>
              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
              <assertionsResultsToSave>0</assertionsResultsToSave>
              <bytes>true</bytes>
              <sentBytes>true</sentBytes>
              <url>true</url>
              <threadCounts>true</threadCounts>
              <idleTime>true</idleTime>
              <connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
```



#####################################################################################
nano 1-worker.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../1-WORKERJMX
./jmeter -n -t 1-worker.jmx -l 1-worker.csv -e -o ../../1-WORKERJMX

# kalau gajadi/gagal
rm -r ../../1-WORKERJMX
mkdir ../../1-WORKERJMX
rm 1-worker.csv
./jmeter -n -t 1-worker.jmx -l 1-worker.csv -e -o ../../1-WORKERJMX



cd

zip -r 1-WORKER.zip 1-WORKERJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./1-WORKER.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################
nano 2-worker.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../2-WORKERJMX
./jmeter -n -t 2-worker.jmx -l 2-worker.csv -e -o ../../2-WORKERJMX

# kalau gajadi/gagal
rm -r ../../2-WORKERJMX
mkdir ../../2-WORKERJMX
rm 2-worker.csv
./jmeter -n -t 2-worker.jmx -l 2-worker.csv -e -o ../../2-WORKERJMX

cd

zip -r 2-WORKER.zip 2-WORKERJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./2-WORKER.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################
nano 3-worker.jmx
# masukin isi file bawaan jmx tadi
echo 'nameserver 192.122.1 ' > /etc/resolv.conf
mkdir ../../3-WORKERJMX
./jmeter -n -t 3-worker.jmx -l 3-worker.csv -e -o ../../3-WORKERJMX

# kalau gajadi/gagal
rm -r ../../3-WORKERJMX
mkdir ../../3-WORKERJMX
rm 3-worker.csv
./jmeter -n -t 3-worker.jmx -l 3-worker.csv -e -o ../../3-WORKERJMX

cd

zip -r 3-WORKER.zip 3-WORKERJMX/
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./3-WORKER.zip" https://webhook.site/d2e2392e-e7ae-48ea-9a05-5f244e81e565
#####################################################################################


# nomor 15
echo 'nameserver 10.6.3.2'> /etc/resolv.conf
apt-get update
apt-get install apache2-utils -y

echo '
{
  "username": "kelompoka05",
  "password": "passworda05"
}' > register.json

ab -n 100 -c 10 -p register.json -T application/json http://10.6.6.2:8003/api/auth/register

# nomor 16
echo '
{
  "username": "kelompoka05",
  "password": "passworda05"
}' > login.json

ab -n 100 -c 10 -p login.json -T application/json http://10.6.6.2:8003/api/auth/login
curl -X POST -H "Content-Type: application/json" -d @login.json http://10.6.6.2:8003/api/auth/login > historyLogin.txt
cat historyLogin.txt

# nomor 17

echo "nameserver 8.8.8.8" > /etc/resolv.conf
apt-get install jq -y

token=$(cat historyLogin.txt | jq -r '.token')

ab -n 100 -c 10 -p login.json -T application/json http://10.6.6.2:8003/api/me

# nomor 18 di load balancer


# nomor 19 testing 3 script :
ab -n 100 -c 10 -p login.json -T application/json http://www.gryffindor.hogwarts.a05.com/api/auth/login


# nomor 20
ab -n 100 -c 10 -p login.json -T application/json http://10.6.6.2:8003/api/me













echo 'nameserver 10.6.3.2' > /etc/resolv.conf
apt-get update
apt-get install nginx -y
apt-get install wget -y
apt-get install unzip -y
apt-get install lynx -y
apt-get install htop -y
apt-get install apache2-utils -y
apt-get install php7.4-fpm php7.4-common php7.4-mysql php7.4-gmp php7.4-curl php7.4-intl php7.4-mbstring php7.4-xmlrpc php7.4-gd php>

service nginx start
service php7.4-fpm start



echo '
nameserver 192.168.122.1
nameserver 10.6.3.2
' > /etc/resolv.conf