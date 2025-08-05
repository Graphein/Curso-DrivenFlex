function multiply(num1: number, num2: number ): number {
    return num1 * num2;
}

function sum(num1 :number, num2 : number) : number{
    return num1 + num2;
}

function isEven(num: number):boolean {
    return num % 2 === 0;
}

function showResult(result: number): void{
    if(isEven(result)) {
        console.log(`The result is ${result} and it's even!`);
    } else {
        console.log(`The result is ${result} and it's odd!`);
    }
}

(() => {
    const num1 = prompt("First Number");
    const num2 = prompt("Second Number");
    if (typeof num1 === "string" && typeof num2 =="string"){
        const parsedNum1 = Number(num1);
        const parsedNum2 = Number(num2);
        
        if(!isNaN(parsedNum1) && !isNaN(parsedNum2))
        {
            let result = sum(parsedNum1,parsedNum2);
            result += multiply(1,2);
            showResult(result);
        }else {
            console.log("Não é possível executar com estes valores.");
        }
    }else {
        console.log("Entrada inválida. Operação cancelada.");
    }
})();
