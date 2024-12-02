const mockDataSource = {
  initialize: jest.fn().mockResolvedValue(true),
  destroy: jest.fn().mockResolvedValue(true),
  getRepository: jest.fn().mockReturnValue({
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }),
};

export const MockDataSource = jest
  .fn()
  .mockImplementation(() => mockDataSource);

export default {
  DataSource: mockDataSource,
};
