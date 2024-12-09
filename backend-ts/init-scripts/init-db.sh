#!/bin/bash
set -e

# Crear base de datos para producción y pruebas
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE previplus;
    CREATE DATABASE prev-test;
EOSQL
