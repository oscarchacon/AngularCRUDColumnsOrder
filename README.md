# AngularCRUDColumnsOrder

Descripción del Repositorio FrontEnd
====================================

Proyecto de Angular 9, que contiene una tabla y dialogs para poder realizar el CRUD, además permite el ordenamiento por columnas.

Consideraciones:
----------------

-   Contiene rutas, pero como contiene una vista esta se redirige automaticamente.

-   Tiene Multilenguaje, la cual estan deficnos por un JSON para cada uno en la carpeta assets/i18n. Es importante considerar que utiliza la librería ngx-translate.

-   Los estilos CSS está definidos por Bootstrap 4 y Material/Angular, además los componentes son propios de Materia/Angular.


Tecnologías utilizadas:
-----------------------

-   Framework de Desarrollo: Angular 9.

-   Lenguaje de Programación: Typescript.

-   Framework de ejecución: Node.Js 10+, junto con NPM 6+

-   Servicios de consumo: Restful, definida en el repositorio Backend.

-   Consumo de Datos: Json, ocupando los servicios de Subscribe.

Utilización:
------------

### Requisitos:

-   Node.js versión 10+, y NPM 6+

-   Instalar Angular a modo global, utilizando el comando *npm install
    -g \@angular/cli*

-   Ocupar un IDE compatible con Angular, como Visual Studio Code,
    Sublime Text, Atom, WebStorm, etc.

### Pasos para utilizarlo:

-   Una vez descargado o clonado desde su repositorio remoto, en el
    terminal ocupar el siguiente comando: *npm install*.

-   Para poder ejecutarlo es necesario ocupar el siguiente comando: *ng serve*.

-   Opcional: Si se requiere usar IIS en el Backend, es necesario cambiar el baseUrl, que se encuenta en el archivo *environments/environment.ts*, 

Estructura del Repositorio:
---------------------------

El repositorio cuenta con varias carpetas, cabe mencionar que el
framework angular crea las carpetas **e2e** y **src** para su ejecución,
en los cuales se centrará específicamente en la última en cual su
estructura se detalla a continuación:

-   **Raiz, Principal o src**: es la carpeta que contiene el proyecto en
    sí, contiene el archivo index.html y main.ts, los cuales indexan
    todos los componentes y código que se utilizarán para el desarrollo
    de esta app, además se definen la hoja de estilo global para que
    tenga la app en si.

-   **enviroments**: carpeta que contiene los archivos que hacen
    referencia y apuntan a los diferentes ambientes en los cuales se
    ejecutará la app.

-   **assets**: carpeta que contiene los recursos, tales como imágenes,
    contenido multimedia o archivos que serán utilizados dentro de la
    app.

-   **app**: carpeta que contiene todos los componentes, servicios,
    interfaces, clases módulos, interceptores, pipes, etc. Está
    compuesta por la siguiente estructura:

    -   *modules*: carpeta que contiene los componentes, servicios y estructuras
        que sirven como vista e interacción dentro la app. Estás se 
        definen dentro de que contexto se ocuparan, además de estar 
        subdividido por los propios modulos.

    -   *core*: contiene los servicios e interfaces que interactuarán y
        se convertirán en objetos en las solicitudes y consumo de
        servicios al web service. Además, contiene el guard, que permite
        ocupar como seguridad para la vista de los componentes, según su
        URI que tengan.

    -   *models*: carpeta que contiene las clases o interfaces que son
        del modelo o propias del proyecto para poder interactuar con las
        peticiones de los servicios.

    -   *shared*: carpeta que contiene los servicios (no petición de
        solicitudes), funciones y componentes que podrán ser compartidos por
        diferentes solicitudes, peticiones o componentes que se
        encuentren en la app. Estos pueden ser ocupados a nivel local,
        siempre y cuando, se declaren en los módulos correspondientes.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
