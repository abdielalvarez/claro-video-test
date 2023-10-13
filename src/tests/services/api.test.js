import { fetchData } from '../../services/api'

describe('fetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('handle succesful request', async () => {
    const data = { example: 'data' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const result = await fetchData('example-endpoint');
    expect(result).toEqual(data);
  });

  it('handle error message', async () => {
    const errorResponse = {
      ok: false,
      json: () => Promise.resolve({ message: 'Error message' }),
    };
    global.fetch.mockResolvedValue(errorResponse);

    await expect(fetchData('error-endpoint')).rejects.toThrow('Error message');
  });

  it('handle error requests', async () => {
    const errorMessage = 'Network error';
    global.fetch.mockRejectedValue(new Error(errorMessage));

    await expect(fetchData('network-error-endpoint')).rejects.toThrow(errorMessage);
  });
});