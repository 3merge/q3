export default jest.fn().mockReturnValue({
  onStart: jest.fn(),
  onComplete: jest.fn(),
  connect: jest.fn(),
});
