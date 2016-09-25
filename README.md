VueCluster
=====================

Complete documentation available at: http://vue-cluster.com/

## Change log

	- 0.0.1 The initial build for VueCluster. This is not something that should be used. It's more for testing for me. Thanks for taking the time to look and feel free to give me any feedback.

## Introduction

VueCluster is a Server-Less,fully clustered (horizontal and vertical), full framework based on Vue2, Vue-router2, Socketcluster, and SC-CRUD-MySQL, and the blazing fast client-side templating engine, Puglatizer. The goal is to build a full framework that provides UNLIMITED scaling, high speed, redundency, and no server management. After the initial mysql setup, there should almost no need for any server code unless you want some kind of API which we provide Express routes for endpoints.

NOTE: While MySQL is the preferred database for VueCluster, you can pass in ANY database connection into the worker as long as it uses .query for querying. You can write a wrapper to match this and pass that in if your preferred database doesn't match that pattern. Thanks!

VueCluster provides so many features to speed up your app, it's hard to put all of them into a few sentences. If you are interested in all the features provided by VueCluster, please navigate to our website.

## Stack Includes

1) Vue2 (http://rc.vuejs.org/api/)

2) SocketCluster (http://socketcluster.io/#!/)

3) SC-CRUD-MySQL (https://github.com/happilymarrieddad/sc-crud-mysql)

4) Vue2-router (http://router.vuejs.org/en/index.html)

5) Bootstrap 4 (http://v4-alpha.getbootstrap.com/)

6) Puglatizer: Client-side templating engine based on Pug (formally Jade) (https://www.npmjs.com/package/puglatizer)

## Main Contributors

- Nick Kotenberg

## Installation

```bash
npm install -g vue-cluster
```

## Building a default application

```bash
vue-cluster create myApp
```

## Usage

1) Install your database onto your system.
2) Fill out the config.json and database.json in your 'myApp' folder.
3) Create the database in mysql (or whatever database you are using) (In mysql -->) ```create database vue_cluster;```
4) ```npm install -g db-migrate```
5)```db-migrate up```
6)```$ npm start```
7) Navigate to ```localhost:3000``` in your browser, login with the parameters you specified in the config file and you're done!

## Structure

The app is structured to provide easy access to everything you need pretty much in two folders.

1) Configuration

```js
public/js/config/app.js
```
The app file provides access to your main vue instance. You can alter this file just like you would a normal Vue2 instance

```js
public/js/config/routes.vue
```
This file provides access to you vue routes. You can alter these routes just like you would normal vue2-router routes.

2) Pages

All pages are altered in the ```public/js/src``` folder. You can add any new pages here just make sure you register them in your router.vue file. For more information on how to build more complex pages, please refer to the documentation on the website.