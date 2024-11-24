import type { FileContent, FileError } from '@/actions/editor/content';

export function isFileError(result: FileContent | FileError): result is FileError {
  return 'code' in result;
}