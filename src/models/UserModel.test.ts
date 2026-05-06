import { AppDataSource } from '../dataSource.js';
import { getUserById } from './UserModel.js';

jest.mock('../dataSource.js');

const mockedDataSource = jest.mocked(AppDataSource);

describe('getUserById', (): void => {
  const mockFindOneBy = jest.fn();

  beforeEach((): void => {
    jest.clearAllMocks();
    mockedDataSource.getRepository.mockReturnValue({
      findOneBy: mockFindOneBy,
    } as never);
  });

  it('returns the user when one is found', async (): Promise<void> => {
    const fakeUser = { id: 'abc' };
    mockFindOneBy.mockResolvedValue(fakeUser);

    const result = await getUserById('abc');

    expect(result).toEqual(fakeUser);
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 'abc' });
  });

  it('returns null when no user is found', async (): Promise<void> => {
    mockFindOneBy.mockResolvedValue(null);

    const result = await getUserById('missing');

    expect(result).toBeNull();
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 'missing' });
  });

  it('propagates errors from the repository', async (): Promise<void> => {
    mockFindOneBy.mockRejectedValue(new Error('connection lost'));

    await expect(getUserById('abc')).rejects.toThrow('connection lost');
  });
});
