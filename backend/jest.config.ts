// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Utiliza ts-jest para transformar TypeScript
  testEnvironment: 'node', // Entorno de pruebas
  roots: ['<rootDir>/src'], // Directorios raíz para las pruebas
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'], // Patrón para encontrar archivos de prueba
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensiones de archivos
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma archivos TypeScript usando ts-jest
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Alias para resolver módulos
    // Agrega más mapeos de alias si los tienes en tsconfig.json
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Ruta a tu tsconfig.json
    },
  },
  // Ignora la carpeta dist para evitar conflictos
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
