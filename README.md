# Mobiera_app

## Installation

Sigue los pasos para instalación y configuración:

* Ubicarse en la carpeta del proyecto.
* Ejecuta el siguiente comando para instalar las librerías necesarias para el proyecto:

```bash
npm install
```

* Levanta el Json serve, ubicado en la carpeta raiz del proyecto /json-serve

```bash
json-server --watch db.json  
```

* En lo posible, levanta un Ngrock apuntando al puerto 3000 del json-serve, ya que en android se generan conflictos si se apunta a un endpoint que no sea HTTPS, por lo cual dará problemas en los request.

Una vez descargado el Ngrock, se lanza el siguiente comando:

```bash
/ngrok http 3000 
```

Esto generará lo siguiente:
![image](https://user-images.githubusercontent.com/12545649/140411912-48bcf8cb-64cf-4b1c-a94e-fed432e9a73c.png)

Del cual se usa como endpoint el que está con HTTPS, de la siguiente manera

```bash
https://f42f-186-146-148-161.ngrok.io
```

Realizando esto, se podrá lanzar la aplicación con funcionamiento sin ningún problema.
