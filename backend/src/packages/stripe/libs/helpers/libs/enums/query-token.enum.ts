const QueryToken = {
  LT: '<',
  GT: '>',
  LTE: '<=',
  GTE: '>=',
  EQ: ':',
  AND: ' and ',
  OR: ' or ',
  NEGATE: '-',
  NULL: 'null',
  MATCH_SUBSTR: '~',
} as const;

export { QueryToken };
