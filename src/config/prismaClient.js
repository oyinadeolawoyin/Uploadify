const { PrismaClient } = require("@prisma/client"); // ✅ Correct destructuring

const prisma = new PrismaClient();

module.exports = prisma;
