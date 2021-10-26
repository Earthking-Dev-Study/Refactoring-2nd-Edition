import { getDefaultOwner } from '../../src/chapter6/defaultOwner';

describe('Test defaultOwner()', () => {
  test('', () => {
    const owner1 = getDefaultOwner();
    expect(owner1.lastName).toEqual('파울러');
    const owner2 = getDefaultOwner();
    owner2.lastName = '파슨스';
    expect(owner1.lastName).toEqual('파슨스');
  });
});
