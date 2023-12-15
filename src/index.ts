type Term = { term: string, count: number }

// Parse the operator and number (or lack thereof) of a term
function parseOperatorNumber(input: string): number {
  let count = 1;

  if (input === '-') {
    count = -1
  } else if (input === '+' || input === '') {
    count = 1
  } else {
    count = Number(input)
  }

  return count
}

function parseTerm(input: string): Term {
  // Extract the term as well as the operator and count of term
  const match = input.match(/([-+]?[0-9]?)([A-z]+)/)

  if (match) {
    // Build the Term
    const count = parseOperatorNumber(match[1])
    const term = match[2]

    // If makes sense at this point to normalize the terms by ensuring
    // they are all sorted lexicographicly
    const sortedTerm = term.split('')
    sortedTerm.sort();

    // Return the Term
    return { term: sortedTerm.join(''), count }
  } else {
    // This should never be hit but we should stop if bad data is given
    throw new Error('oh no')
  }
}

// Given a Term produce a string that correctly represents the Term
// This will always include a operator with the expectation that the
// first term's operator is trimmed
function renderTerm(input: Term): string {
  if (input.count === 1) {
    return `+${input.term}`;
  } else if (input.count === -1) {
    return `-${input.term}`
  }

  return `${input.count > 0 ? '+' : ''}${input.count}${input.term}`
}

export function simplify(input: string): string {
  // Parse the terms while preserving the operator for that term
  const terms = input
    .replace(/([+-])/g, ";$1")
    .split(';')
    .filter(e => e)
    .map(parseTerm);

  // Create a map of all terms and sum all like term counts together
  const termMap: Record<string, Term> = {}

  for (const { term, count } of terms) {
    if (term in termMap) {
      termMap[term].count += count
    } else {
      termMap[term] = { term, count }
    }
  }

  // Sort terms by eachother by the increasing number of variables
  // then secondarily by lexicographical order
  const termsOnly = Object.keys(termMap);
  termsOnly.sort((a, b) => {
    // number of variables (ASC) (i.e. xyz,zy,abcd -> zy,xyz,abcd)
    const lengthDiff = a.length - b.length;

    if (lengthDiff === 0) {
      // lexicographical (ASC) (i.e. ac,ab -> ab,ac)
      return a > b ? 1 : -1
    }

    return lengthDiff
  })

  // Start building the final expression
  const output = [];

  for (const theTerm of termsOnly) {
    // Ignore a term that properly was cancelled out
    if (termMap[theTerm].count === 0) {
      continue;
    }

    // Render the term and append it to the output array
    output.push(renderTerm(termMap[theTerm]))
  }

  // Finally join the array of strings into a string and remove the leading
  // operator ONLY if it's positive
  return output.join('')
    .replace(/^\+/, '')
}
