const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this._process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this._process(encryptedMessage, key, false);
  }

  _process(text, key, isEncrypt) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    text = text.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (!alphabet.includes(char)) {
        result += char;
      } else {
        const charPos = alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyPos = alphabet.indexOf(keyChar);

        let newPos;
        if (isEncrypt) {
          newPos = (charPos + keyPos) % 26;
        } else {
          newPos = (charPos - keyPos + 26) % 26;
        }

        result += alphabet[newPos];
        keyIndex++;
      }
    }

    return this.direct ? result : result.split('').reverse().join('');
  }
}

// console.log(new VigenereCipheringMachine().encrypt('attack at dawn!', 'alphonse')); // 'AEIHQX SX DLLU!'
// console.log(new VigenereCipheringMachine().decrypt('AEIHQX SX DLLU!', 'alphonse')); // 'ATTACK AT DAWN!'
// console.log(new VigenereCipheringMachine(false).encrypt('attack at dawn!', 'alphonse')); // '!ULLD XS XQHIEA'
// console.log(new VigenereCipheringMachine(false).decrypt('AEIHQX SX DLLU!', 'alphonse')); // '!NWAD TA KCATTA'

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
