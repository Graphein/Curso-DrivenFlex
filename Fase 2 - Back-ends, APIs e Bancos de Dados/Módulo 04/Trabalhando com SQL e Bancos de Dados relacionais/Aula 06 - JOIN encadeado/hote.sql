SELECT allocations.*, rooms.name AS "roomName", guests.name AS "guestsName"
	FROM allocations
	JOIN rooms ON rooms.id = allocations."roomId"
	JOIN guests ON guests.id = allocations."guestId";
