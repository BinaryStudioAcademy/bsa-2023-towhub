import { type ResultOptions as Options } from 'croppie';

type ResultOptions = Omit<Options, 'type'> & { overrideFilename?: string };

export { type ResultOptions };
