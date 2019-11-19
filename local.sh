docker build -t cloudrun-test .
docker run -it --rm -p 8080:8080 cloudrun-test
