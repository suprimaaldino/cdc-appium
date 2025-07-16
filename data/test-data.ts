export default class TestData {
  static readonly validUser = {
    email: 'dino@example.com',
    password: '10203040'
  };

  static readonly invalidUser = {
    email: 'invalid@example.com',
    password: 'wrongpass'
  };
}
