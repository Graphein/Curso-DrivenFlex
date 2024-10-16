function somaDivisores(n) {
    let soma = 0;

    for (let i = 2; i < n; i++) 
	{ 
        if (n % i === 0) 
		{  
            soma += i;  
        }
    }
    
    return soma;
}