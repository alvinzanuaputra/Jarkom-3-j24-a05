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


# nomor 8
echo 'nameserver 192.168.122.1 ' > /etc/resolv.conf
htop
apt-get update
java -version
apt-get install openjdk-11-jre
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip
unzip apache-jmeter-5.6.3.zip
cd apache-jmeter-5.6.3/bin
nano test1.jmx
# masukin isi file tadi
mkdir ../../TEST-1JMX
./jmeter -n -t Test-1.jmx -l Test-1.jmx.csv -e -o ../../TEST-1JMX


# tarik ke local
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./nomor8.zip" https://webhook.site/857529be-99b6-4296-803a-3358f513e529

# ab -n 300 -c 3 http://www.gryffindor.hogwarts.a05.com/index.php


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



# nomor 10
echo 'nameserver 192.168.122.1 
nameserver 8.8.8.8' > /etc/resolv.conf
apt-get update
java -version
apt-get install openjdk-11-jre
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.zip
unzip apache-jmeter-5.6.3.zip
cd apache-jmeter-5.6.3/bin
nano testWorker3.jmx
# masukin isi file tadi
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


nano testWorker2.jmx

mkdir ../../TEST-2WORKERJMX
./jmeter -n -t testWorker2.jmx -l Test-2Worker.jmx.csv -e -o ../../TEST-2WORKERJMX

cd

zip -r nomor10-2WORK.zip TEST-2WORKERJMX/

# tarik ke local
echo 'nameserver 8.8.8.8 ' > /etc/resolv.conf
curl -X POST -F "file=@./nomor10-2WORK.zip" https://webhook.site/857529be-99b6-4296-803a-3358f513e529


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
