import {
    getAllEvents,
    getSpecificEvent,
    createNewEvent,
    changeEvent,
    removeEvent,
  } from '../../src/services/events-service';
  
  import * as eventsRepo from '../../src/repositories/events-repository';
  
  jest.mock('../../src/repositories/events-repository');
  
  const mk = eventsRepo as jest.Mocked<typeof eventsRepo>;
  
  describe('events-service', () => {
    afterEach(() => jest.clearAllMocks());
  
    it('getAllEvents → retorna array', async () => {
      mk.findAllEvents.mockResolvedValueOnce([
        { id: 1, name: 'A', date: new Date() as any },
      ] as any);
  
      const res = await getAllEvents();
      expect(Array.isArray(res)).toBe(true);
      expect(mk.findAllEvents).toHaveBeenCalledTimes(1);
    });
  
    it('getSpecificEvent → retorna quando existe', async () => {
      mk.findEventById.mockResolvedValueOnce({ id: 10, name: 'Show', date: new Date() } as any);
  
      const res = await getSpecificEvent(10);
      expect(res).toMatchObject({ id: 10, name: 'Show' });
      expect(mk.findEventById).toHaveBeenCalledWith(10);
    });
  
    it('getSpecificEvent → not_found quando não existe', async () => {
      mk.findEventById.mockResolvedValueOnce(null);
  
      await expect(getSpecificEvent(999)).rejects.toMatchObject({ type: 'not_found' });
    });
  
    it('createNewEvent → salva quando nome é único', async () => {
      mk.findEventByName.mockResolvedValueOnce(null);
      mk.saveEvent.mockResolvedValueOnce({ id: 1, name: 'Novo', date: new Date() } as any);
  
      const res = await createNewEvent({ name: 'Novo', date: new Date() });
      expect(mk.findEventByName).toHaveBeenCalledWith('Novo');
      expect(mk.saveEvent).toHaveBeenCalled();
      expect(res).toMatchObject({ id: 1 });
    });
  
    it('createNewEvent → conflict quando nome já existe', async () => {
      mk.findEventByName.mockResolvedValueOnce({ id: 2, name: 'Repetido', date: new Date() } as any);
  
      await expect(createNewEvent({ name: 'Repetido', date: new Date() }))
        .rejects.toMatchObject({ type: 'conflict' });
    });
  
    it('changeEvent → atualiza sem checar nome quando não mudou', async () => {
      mk.findEventById.mockResolvedValueOnce({ id: 5, name: 'Igual', date: new Date() } as any);
      mk.updateEvent.mockResolvedValueOnce({ id: 5, name: 'Igual', date: new Date() } as any);
  
      const res = await changeEvent({ name: 'Igual', date: new Date() }, 5);
      expect(mk.findEventByName).not.toHaveBeenCalled();
      expect(mk.updateEvent).toHaveBeenCalledWith(expect.any(Object), 5);
      expect(res).toMatchObject({ id: 5 });
    });
  
    it('changeEvent → checa nome e atualiza quando mudou (nome livre)', async () => {
      mk.findEventById.mockResolvedValueOnce({ id: 7, name: 'Antigo', date: new Date() } as any);
      mk.findEventByName.mockResolvedValueOnce(null);
      mk.updateEvent.mockResolvedValueOnce({ id: 7, name: 'Novo', date: new Date() } as any);
  
      const res = await changeEvent({ name: 'Novo', date: new Date() }, 7);
      expect(mk.findEventByName).toHaveBeenCalledWith('Novo');
      expect(res).toMatchObject({ name: 'Novo' });
    });
  
    it('changeEvent → conflict quando novo nome já existe', async () => {
      mk.findEventById.mockResolvedValueOnce({ id: 7, name: 'Antigo', date: new Date() } as any);
      mk.findEventByName.mockResolvedValueOnce({ id: 8, name: 'Duplicado', date: new Date() } as any);
  
      await expect(changeEvent({ name: 'Duplicado', date: new Date() }, 7))
        .rejects.toMatchObject({ type: 'conflict' });
    });
  
    it('removeEvent → deleta quando existe', async () => {
      mk.findEventById.mockResolvedValueOnce({ id: 3, name: 'X', date: new Date() } as any);
      mk.deleteEvent.mockResolvedValueOnce({ id: 3 } as any);
  
      const res = await removeEvent(3);
      expect(mk.deleteEvent).toHaveBeenCalledWith(3);
      expect(res).toMatchObject({ id: 3 });
    });
  
    it('removeEvent → not_found quando não existe', async () => {
      mk.findEventById.mockResolvedValueOnce(null);
  
      await expect(removeEvent(123)).rejects.toMatchObject({ type: 'not_found' });
      expect(mk.deleteEvent).not.toHaveBeenCalled();
    });
  });
  