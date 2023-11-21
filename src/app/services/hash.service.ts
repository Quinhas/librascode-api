export interface IHashService {
  /**
   * Hash data
   * @param {string} data the data to encrypt
   */
  hash(data: string): Promise<string>;
  /**
   * Compare raw data to a hash
   * @param {string} data the data to hash and compare
   * @param {string} hash expected hash
   */
  compare(data: string, hash: string): Promise<boolean>;
}
