declare module 'gitignore' {
  interface GitignoreOptions {
    type: string;
    file?: NodeJS.WritableStream;
  }

  export function writeFile(options: GitignoreOptions): Promise<void>;
}
