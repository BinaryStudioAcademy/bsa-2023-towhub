const FileStatus = {
  IDLE: 'idle',
  CHOSEN: 'chosen',
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  REJECTED: 'rejected',
} as const;

export { FileStatus };
