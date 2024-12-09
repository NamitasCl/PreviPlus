# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Define el comando para iniciar el servidor
CMD ["node", "dist/server.js"]

# Expone el puerto de la aplicación
EXPOSE 3000
