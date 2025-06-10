describe('GET Request Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Fetches successfully data from an API', async () => {
        const result = await fetchData('https://api.binance.com/api/v3/ticker/price');
        expect(result).toEqual(data);
        expect(axios.get).toHaveBeenCalledWith('https://api.binance.com/api/v3/ticker/price');
    });

    it('Fetches data error from an API', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchData('https://api.example.com/user/1')).rejects.toThrow(errorMessage);
    });
});