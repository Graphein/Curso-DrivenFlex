function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const luckyNumber = randomNumber(2, 12)
const firstDie = randomNumber(1, 6)
const secondDie = randomNumber(1, 6)

console.log(`Seu número da sorte é: ${luckyNumber}`)
console.log("Jogando dados...")

setTimeout(() => {
    console.log(`Você tirou ${firstDie} no primeiro dado!`)
}, 2000)

setTimeout(() => {
    console.log(`Você tirou ${secondDie} no segundo dado!`)
}, 4000)

setTimeout(() => {
    const sum = firstDie + secondDie
    if (sum === luckyNumber || firstDie === secondDie) {
        console.log("Você ganhou!")
    } else {
        console.log("Você perdeu")
    }
}, 5000)