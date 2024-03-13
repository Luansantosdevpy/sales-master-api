container_name := sales_master

env:
	cp .env.sample .env
up:
	docker-compose up --build
down:
	docker-compose down --volume --remove-orphans
logs:
	docker-compose logs -f $(container_name)