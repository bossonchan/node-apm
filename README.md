# node-apm

## Introduction

This project is using the knowledge, which is from dell's IT Management lesson in SYSU, to build the application monitor for nodejs web application.

It's a demo, *DO NOT* use it on any production environment.

## Background

1. Web application written by nodejs has the common web interface, see `http.createServer`. We can rewrite the interface to inject our monitoring code.
2. We cannot monitor the database queries, because of no common database interface supported for nodejs. :(
3. Nodejs offers non-blocked, asynchronous apis, so we should record some monitor data in callback function.

## Monitoring Arhitecture

```
                    1. send request
    Client  -------------------------->   Agent & Nodejs Web Application
                                            |
                                            | 2. send monitoring data
                                            |
    Admin <--------  Monitor Server <-------|
     3. analysic and show data
```

## Demo

1. start monitoring server: `node ./server`
2. start application with agent: `node -r ./agent ./application`
3. view application page: [http://localhost:3000](http://localhost:3000)
4. view monitoring server page: [http://localhost:8080](http://localhost:8080)
