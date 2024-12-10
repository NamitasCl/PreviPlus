#!/bin/bash
set -e

# Verificar y crear base de datos para producción
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE previplus'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'previplus')
    \gexec

    SELECT 'CREATE DATABASE previplus_test'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'previplus_test')
    \gexec
EOSQL