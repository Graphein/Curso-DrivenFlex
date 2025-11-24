import prisma from '../../../src/database';
import { findMiles, saveMiles } from '../../../src/repositories/miles-repository';

jest.mock('../../../src/database', () => ({
  __esModule: true,
  default: {
    miles: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('Miles Repository', () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call prisma.miles.findUnique with correct code', async () => {
    (mockPrisma.miles.findUnique as jest.Mock).mockResolvedValue({ code: 'ABC123', miles: 1000 });
    const result = await findMiles('ABC123');
    expect(mockPrisma.miles.findUnique).toHaveBeenCalledWith({ where: { code: 'ABC123' } });
    expect(result).toEqual({ code: 'ABC123', miles: 1000 });
  });

  it('should call prisma.miles.create with correct data', async () => {
    (mockPrisma.miles.create as jest.Mock).mockResolvedValue({ code: 'ABC123', miles: 2000 });
    const result = await saveMiles('ABC123', 2000);
    expect(mockPrisma.miles.create).toHaveBeenCalledWith({ data: { code: 'ABC123', miles: 2000 } });
    expect(result).toEqual({ code: 'ABC123', miles: 2000 });
  });
});
