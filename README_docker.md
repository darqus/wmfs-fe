# Docker

Сборка контейнера:
```sh
$ docker build -t wmfs-fe .
```

Запуска контейнера:
```sh
$ docker run -d -p 8080:80 --name wmfs-fe wmfs-fe:latest
```

Остановка контейнера:
```sh
$ docker stop wmfs-fe
```

Просмотр списка контейнеров:
```sh
$ docker ps
```

Приложение будет доступно по [ссылке](http://localhost:8080/)

# Сборка для различных окружений
- Создать файл env/env.<ИМЯ ОКРУЖЕНИЯ> с настройками, специфичными для среды
- Собрать и запустить контейнер для нужной среды:
```sh
$ STAGE=<ИМЯ ОКРУЖЕНИЯ> docker compose --env-file <PATH TO ENV DIR>/env/env.$STAGE up -d
```
Например:
```sh
$ STAGE=test docker compose --env-file ./env/env.#STAGE up -d
```
Остановить контейнер:
```sh
$ docker compose [-f path/to/docker-compose.yaml] stop
```
Остановить и удалить контейнер:
```sh
$ docker compose [-f path/to/docker-compose.yaml] down
```
Просмотр списка контейнеров:
```sh
$ docker compose ps
```
Приложение будет доступно по [ссылке](http://hostname:8080/)
