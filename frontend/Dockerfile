# Etapa de construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto Vite
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos compilados al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración personalizada de Nginx (si tienes)
# Asegúrate de tener un archivo nginx.conf en frontend/ si lo usas
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]