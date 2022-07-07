# USAR UBUNTU COMO IMAGEN BASE
FROM ubuntu:latest

# ACTUALIZAR REPOSITORIOS
RUN apt-get update

#INSTALAR CURL
RUN apt-get install -y curl

#DESCARGA REPO NODE 14
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

#INSTALA NODE 14
RUN apt-get install -y nodejs

#CREA EL DIRECTORIO DONDE SE VA A ALOJAR LA APP
RUN mkdir -p /home/node/app/node_modules && chown -R www-data:www-data /home/node/app

#COLOCA EL DIRECTORIO ANTES CREADO COMO EL DIRECTORIO DE TRABAJO
WORKDIR /home/node/app

#COPIAMOS EL PACKAGE.JSON AL DIRECTORIO DE TRABAJO
COPY package*.json ./

#INSTALAR PAQUETES
RUN npm install

#COPIAMOS LOS ARCHIVOS DE LA APP AL DIRECTORIO DE TRABAJO
COPY --chown=www-data:www-data . .

# ACTUALIZAR REPOSITORIOS
RUN chown www-data:www-data /dev

# ACTUALIZAR REPOSITORIOS
RUN apt-get update

#EXPONEMOS EL PUERTO POR DONDE VA A SERVIRSE LA APP AL EXTERIOR DEL CONTENEDOR
EXPOSE 8885:4000

#CORREMOS LA APP
CMD ["node", "./build/app.js"]
