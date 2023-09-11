"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeeder = void 0;
const bcrypt_1 = require("../../auth/utils/bcrypt");
exports.userSeeder = [
    {
        id: 'clllb0w400000p8qqfhuzeavw01',
        firstName: 'Sergio',
        lastName: 'Jaramillo',
        email: 'sergiojaramillo@test.com',
        password: (0, bcrypt_1.hashPasswordSync)('1234'),
        role: 'ADMIN',
        isActive: true,
    },
    {
        id: 'clllb0w400000p8qqfhuzeavw02',
        firstName: 'Hector',
        lastName: 'Triana',
        email: 'hectortriana@test.com',
        password: (0, bcrypt_1.hashPasswordSync)('1234'),
        role: 'ADMIN',
        isActive: true,
    },
    {
        id: 'clllb0w400000p8qqfhuzeavw03',
        firstName: 'Camilo',
        lastName: 'Suarez',
        email: 'camilo.suarez85@gmail.com',
        password: (0, bcrypt_1.hashPasswordSync)('1234'),
        role: 'USER',
        isActive: true,
    },
    {
        id: 'clllb0w400000p8qqfhuzeavw04',
        firstName: 'Tatiana',
        lastName: 'Cardona',
        email: 'ltcardonal@uqvirtual.edu.co',
        password: (0, bcrypt_1.hashPasswordSync)('1234'),
        role: 'USER',
        isActive: true,
    },
    {
        id: 'clllb0w400000p8qqfhuzeavw05',
        firstName: 'Juan Camilo',
        lastName: 'Clement',
        email: 'juancamiloclement@gmail.com',
        password: (0, bcrypt_1.hashPasswordSync)('1234'),
        role: 'USER',
        isActive: true,
    },
];
