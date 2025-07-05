import fs from "fs";

// Vamos começar o for a partir do 1, 
// porque não queremos criar o arquivo 0.txt
for (let i = 1; i <= 100; i++) {
    const fileName = `${i}.txt`;
    const content = `Lista 1 - Cálculo 1 - Exercício ${i}`;
    fs.writeFileSync(fileName, content);
}