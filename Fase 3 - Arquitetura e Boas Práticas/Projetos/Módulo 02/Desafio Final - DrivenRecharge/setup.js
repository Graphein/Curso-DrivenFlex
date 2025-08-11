const fs = require("fs");
const path = require("path");

const structure = [
  "src/config",
  "src/controllers",
  "src/middlewares",
  "src/repositories",
  "src/routers",
  "src/services",
  "src/protocols",
  "src/schemas",
  "sql",
];

const files = [
  "src/app.ts",
  "src/server.ts",
  "src/config/database.ts",
  "src/controllers/phones.controller.ts",
  "src/controllers/recharges.controller.ts",
  "src/controllers/summary.controller.ts",
  "src/middlewares/validation.middleware.ts",
  "src/middlewares/error.middleware.ts",
  "src/repositories/phones.repository.ts",
  "src/repositories/recharges.repository.ts",
  "src/repositories/carriers.repository.ts",
  "src/routers/phones.router.ts",
  "src/routers/recharges.router.ts",
  "src/routers/summary.router.ts",
  "src/routers/index.ts",
  "src/services/phones.service.ts",
  "src/services/recharges.service.ts",
  "src/services/summary.service.ts",
  "src/protocols/phone.protocol.ts",
  "src/protocols/recharge.protocol.ts",
  "src/protocols/carrier.protocol.ts",
  "src/protocols/summary.protocol.ts",
  "src/schemas/phone.schema.ts",
  "src/schemas/recharge.schema.ts",
  "sql/schema.sql",
  ".gitignore",
  ".env.example",
  "README.md",
  "tsconfig.json",
  "package.json"
];

function createStructure() {
  structure.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Pasta: ${dir}`);
    }
  });

  files.forEach((file) => {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "");
      console.log(`Arquivo: ${file}`);
    }
  });
}

createStructure();
