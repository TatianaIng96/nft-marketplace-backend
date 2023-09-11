# Use the official Node.js 18.16.0 image as the base image
FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si está presente) al directorio de trabajo
COPY package*.json tsconfig.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Compila TypeScript (asegúrate de que tengas el TypeScript instalado en tus dependencias)
RUN npm run build

# Expone el puerto 8080 en el contenedor
EXPOSE 8080

# Inicia la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]
