# Before running this script, install httpie for your device.

# Instances IP, Region-IP addresses key pair.
MUMBAI_IP=65.0.184.26
SYDNEY_IP=3.26.117.51
TOKYO_IP=35.77.74.17
UAE_IP=3.28.240.235
BRAZIL_IP=18.231.195.96
IRELAND_IP=34.241.62.34
CAPETOWN_IP=13.244.110.176
FRANKFURT_IP=18.192.116.174
CANADA_IP=35.183.205.
SEOUL_IP=3.39.194.175

# API variables

# Number of iteration to perform
COUNT=12

# Type of tests to run - acceptable values are 
# sapphire - for testing sapphire architecture.
# current - for testing current architecture.
# all - for testing both architectures
TEST_TYPE=all

# Instances array.
INSTANCES_ARR=($MUMBAI_IP $SYDNEY_IP $TOKYO_IP $UAE_IP $BRAZIL_IP $IRELAND_IP $CAPETOWN_IP $FRANKFURT_IP $CANADA_IP)

for ip in ${INSTANCES_ARR[@]}; do
  http --follow --timeout 3600 POST "http://$ip:8080/test-login/$TEST_TYPE?count=$COUNT" Authorization:'Basic YWRtaW46YWFkZHdlZHNkYXNk'
done