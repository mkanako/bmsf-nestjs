export interface Hasher {
  make (value: string): string
  check (value: string, hashedValue: string): boolean
}
