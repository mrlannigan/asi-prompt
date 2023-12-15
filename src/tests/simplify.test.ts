import { simplify } from "../index"

describe('simplify()', () => {
  it.each([
    ['cb+cba', 'bc+abc'],
    ['2xy-yx', 'xy'],
    ['-a+5ab+3a-c-2a', '-c+5ab'],
    ['-abc+3a+2ac', '3a+2ac-abc'],
    ['xyz-xz', '-xz+xyz'],
    ['a+ca-ab', 'a-ab+ac'],
    ['xzy+zby', 'byz+xyz'],
    ['-y+x', 'x-y'],
    ['y-x', '-x+y'],
  ])('given "%s" it should return "%s"', (given, expected) => {
    expect(simplify(given)).toEqual(expected)
  });
})
