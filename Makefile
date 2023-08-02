CONTAINER_PORT=3001
LOCAL_PORT=3001

ALIAS = flask_ss_new
IMAGE_NAME = jqp4x/$(ALIAS):v0.1


all: stop remove build run

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d -p $(LOCAL_PORT):$(CONTAINER_PORT) -v ./volume:/home/flask_skipod/volume --rm --name $(ALIAS) $(IMAGE_NAME)
	echo "Port: " $(LOCAL_PORT)

stop:
	docker stop $(ALIAS)

remove:
	docker image rm $(IMAGE_NAME)

push-to-hub:
	docker push $(IMAGE_NAME)
