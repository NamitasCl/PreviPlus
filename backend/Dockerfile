# Etapa de construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia las dependencias instaladas y el código compilado desde la etapa de construcción
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY package.json .

# Expone el puerto donde corre el backend
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "dist/app.js"]