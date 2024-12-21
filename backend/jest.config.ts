// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Elimina el preset para evitar configuraciones obsoletas
  // preset: 'ts-jest',

  testEnvironment: 'node', // Entorno de pruebas
  roots: ['<rootDir>/src'], // Directorios raíz para las pruebas
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ], // Patrón para encontrar archivos de prueba
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensiones de archivos
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json', // Ruta a tu tsconfig.json
      }
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Alias para resolver módulos
    // Agrega más mapeos de alias si los tienes en tsconfig.json
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora carpetas específicas
};

export default config;