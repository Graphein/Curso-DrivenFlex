import {
    getAllTickets,
    createNewTicket,
    useTicket,
  } from '../../src/services/tickets-service';
  
  import * as ticketsRepo from '../../src/repositories/tickets-repository';
  import * as eventsService from '../../src/services/events-service';
  
  jest.mock('../../src/repositories/tickets-repository');
  jest.mock('../../src/services/events-service');
  
  const tmk = ticketsRepo as jest.Mocked<typeof ticketsRepo>;
  const evs = eventsService as jest.Mocked<typeof eventsService>;
  
  function eventAt(daysFromNow: number) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return { id: 7, name: 'E', date: d };
  }
  
  describe('tickets-service', () => {
    afterEach(() => jest.clearAllMocks());
  
    it('getAllTickets → delega para o repositório', async () => {
      tmk.findAllEventTickets.mockResolvedValueOnce([{ id: 1 }] as any);
      const res = await getAllTickets(7);
      expect(res.length).toBe(1);
      expect(tmk.findAllEventTickets).toHaveBeenCalledWith(7);
    });
  
    it('createNewTicket → forbidden se evento já aconteceu', async () => {
      evs.getSpecificEvent.mockResolvedValueOnce(eventAt(-1) as any);
  
      await expect(createNewTicket({ code: 'A', owner: 'B', eventId: 7 }))
        .rejects.toMatchObject({ type: 'forbidden' });
    });
  
    it('createNewTicket → conflict se code já existe no evento', async () => {
      evs.getSpecificEvent.mockResolvedValueOnce(eventAt(1) as any);
      tmk.findTicketByCodeForEvent.mockResolvedValueOnce({ id: 1 } as any);
  
      await expect(createNewTicket({ code: 'DUP', owner: 'X', eventId: 7 }))
        .rejects.toMatchObject({ type: 'conflict' });
    });
  
    it('createNewTicket → salva quando ok', async () => {
      evs.getSpecificEvent.mockResolvedValueOnce(eventAt(1) as any);
      tmk.findTicketByCodeForEvent.mockResolvedValueOnce(null as any);
      tmk.saveTicket.mockResolvedValueOnce({ id: 99, eventId: 7 } as any);
  
      const res = await createNewTicket({ code: 'OK', owner: 'Y', eventId: 7 });
      expect(tmk.saveTicket).toHaveBeenCalled();
      expect(res).toMatchObject({ id: 99, eventId: 7 });
    });
  
    it('useTicket → not_found quando ticket não existe', async () => {
      tmk.findTicketById.mockResolvedValueOnce(null as any);
  
      await expect(useTicket(123)).rejects.toMatchObject({ type: 'not_found' });
    });
  
    it('useTicket → forbidden se evento passou', async () => {
      tmk.findTicketById.mockResolvedValueOnce({
        id: 1,
        used: false,
        Event: eventAt(-2),
      } as any);
  
      await expect(useTicket(1)).rejects.toMatchObject({ type: 'forbidden' });
      expect(tmk.updateTicketUse).not.toHaveBeenCalled();
    });
  
    it('useTicket → forbidden se já usado', async () => {
      tmk.findTicketById.mockResolvedValueOnce({
        id: 1,
        used: true,
        Event: eventAt(2),
      } as any);
  
      await expect(useTicket(1)).rejects.toMatchObject({ type: 'forbidden' });
    });
  
    it('useTicket → marca como usado quando válido', async () => {
      tmk.findTicketById.mockResolvedValueOnce({
        id: 1,
        used: false,
        Event: eventAt(2),
      } as any);
  
      tmk.updateTicketUse.mockResolvedValueOnce({ id: 1, used: true } as any);
  
      const res = await useTicket(1);
      expect(tmk.updateTicketUse).toHaveBeenCalledWith(1);
      expect(res).toMatchObject({ id: 1, used: true });
    });
  });
  