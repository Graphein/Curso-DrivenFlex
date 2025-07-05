SELECT clients.name, COUNT(*) AS compras FROM orders 
	JOIN clients on clients.id = client_id
	GROUP BY clients.name
	ORDER BY compras DESC;