# ASI Coding Challenge

[![workflow](https://github.com/mrlannigan/asi-prompt/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrlannigan/asi-prompt/actions/workflows/node.js.yml)

Thank you again for the time and opportunity. I throughly enjoyed the conversation and this coding exercise.

If you would like to pull down this code and try it for yourself make sure you are using at least Node.js v18 or greater.

```shell
$ npm install

# Then to exercise the code run the test suite

$ npm test
```

## Prompt


### Simplifying *multilinear* polynomials

#### Objective

Write a function: `simplify`, that takes a string in input, representing a *multilinear non-constant polynomial in integers coefficients* (like `"3x-zx+2xy-x"`), and returns another string as output where the same expression has been simplified in the following way ( `->` means the application of `simplify`):

-   All possible sums and subtraction of equivalent monomials ("xy==yx") have been done, e.g.:

    `"cb+cba" -> "bc+abc"`, `"2xy-yx" -> "xy"`, `"-a+5ab+3a-c-2a" -> "-c+5ab"`

-   All monomials appear in order of increasing number of variables, e.g.:

    `"-abc+3a+2ac" -> "3a+2ac-abc"`, `"xyz-xz" -> "-xz+xyz"`

-   If two monomials have the same number of variables, they appear in **[lexicographic order](https://en.wikipedia.org/wiki/Lexicographical_order)**, e.g.:

    `"a+ca-ab" -> "a-ab+ac"`, `"xzy+zby" ->"byz+xyz"`

-   There is no leading `+` sign if the first coefficient is positive, e.g.:

    `"-y+x" -> "x-y"`, but no restrictions for `-`: `"y-x" ->"-x+y"`

To keep it simplest, the string in input is restricted to represent only *multilinear non-constant polynomials*, so you won't find something like `-3+yx^2`. **Multilinear** means in this context: **of degree 1 on each variable**.

**Warning**: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.