const AppErrorMessage = {
  INVALID_QUERY: 'Invalid SQL query was provided!',
  ENTITY_NOT_FOUND: 'Requested entity not found!',
  ENTITY_ACCESS_DENIED: 'The user does not have access to the entity',
} as const;

export { AppErrorMessage };
