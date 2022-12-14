0.0.1

docker build -t sysinfo-api:0.0.1 -f .\Dockerfile.alpine .
docker run -p 8123:8000 -m1024m --cpus=1 sysinfo-api:0.0.1

0.0.2

docker build -t sysinfo-api:0.0.2 -f .\Dockerfile.alpinemulti .
docker run -p 8123:8000 -m1024m --cpus=1 sysinfo-api:0.0.2