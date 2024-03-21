"use client"

import React, { useState } from 'react';

const CaesarCipher: React.FC = () => {
  // Inisialisasi variabel state untuk mengelola teks input, pergeseran kunci dan jenis operasi (enkripsi/dekripsi)
  const [text, setText] = useState<string>('');
  const [shift, setShift] = useState<number>(0);
  const [typeState, setTypeState] = useState<boolean>(true); // true untuk enkripsi, false untuk dekripsi

  // Fungsi untuk mengenkripsi teks input menggunakan metode Caesar Cipher
  const encrypt = (text: string, shift: number): string => {
    return text
      .split('')
      .map((char: string) => {
        if (char.match(/[a-z]/i)) {
          const code: number = char.charCodeAt(0);
          let encryptedChar: string;

          if (code >= 65 && code <= 90) {
            encryptedChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            encryptedChar = String.fromCharCode(((code - 97 + shift) % 26) + 97);
          } else {
            encryptedChar = char;
          }

          return encryptedChar;
        }
        return char;
      })
      .join('');
  };

  // Fungsi untuk mendekripsi teks input menggunakan metode Caesar Cipher
  const decrypt = (text: string, shift: number): string => {
    return encrypt(text, 26 - shift); // Dekripsi sebenarnya adalah enkripsi dengan pergeseran yang berlawanan
  };

  // Fungsi untuk beralih antara mode enkripsi dan dekripsi
  const handleSwitchState = (): void => {
    setTypeState(!typeState);
  };

  // Fungsi untuk mendapatkan posisi sebuah huruf dalam alfabet
  const getAlphabetPosition = (letter: string): number => {
    const charCodeA: number = 'A'.charCodeAt(0);
    const charCodeLetter: number = letter.toUpperCase().charCodeAt(0);
    const position: number = charCodeLetter - charCodeA;
    return position;
  }

  return (<>
    <div className="container mx-auto p-4">
      <div className='mb-4'>
        <h1 className="text-2xl font-bold">Enkripsi dan Dekripsi Caesar Cipher</h1>
        <p>By: Tegar Maulana Fahreza (<a href="http://lowscarlet.my.id/" target="_blank" rel="noopener noreferrer">LowScarlet</a>) </p>
      </div>

      <div className="mb-4">
        {/* Bidang input untuk memasukkan teks */}
        <label className="block mb-2">
          Input:
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </label>
        {/* Bidang input untuk memasukkan kunci pergeseran */}
        <label className="block mb-2">
          Kunci:
          <input
            type="number"
            value={shift}
            onChange={(e) => {
              setShift(parseInt(e.target.value))
            }}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </label>
        {/* Tombol untuk beralih antara enkripsi dan dekripsi */}
        <button disabled={typeState} onClick={handleSwitchState} className={(typeState ? "bg-blue-500" : "bg-gray-500") + " text-white px-4 py-2 rounded-md mr-2"}>
          Enkripsi
        </button>
        {/* Tombol untuk beralih antara enkripsi dan dekripsi */}
        <button disabled={!typeState} onClick={handleSwitchState} className={(!typeState ? "bg-blue-500" : "bg-gray-500") + " text-white px-4 py-2 rounded-md mr-2"}>
          Dekripsi
        </button>
      </div>
      <div>
        {/* Bagian output */}
        <label className="block mb-2">
          Output:
          <div className="overflow-x-auto">

            {text.length === 0 ?
              <p>Masukan Input terlebih dahulu!</p> :
              <table className="table-auto border border-collapse">
                <thead>
                  <tr>
                    {/* Menampilkan karakter input */}
                    {text.split('').map((char, index) => (
                      <th key={index} className="px-4 py-2 border">
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* Menampilkan posisi karakter dalam alfabet */}
                    {text.split('').map((char, index) => (
                      <td key={index} className="px-4 py-2 border">
                        {getAlphabetPosition(char)}{typeState ? '+' : '-'}{shift | 0}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {/* Menampilkan karakter terenkripsi atau terdekripsi berdasarkan mode */}
                    {text.split('').map((char, index) => (
                      <td key={index} className="px-4 py-2 border">
                        {typeState ? encrypt(char, shift | 0) : decrypt(char, shift | 0)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </label>
      </div>
    </div>

    <div className="w-full py-4 fixed bottom-0">
      <div className="container mx-auto flex justify-center">
        <p className='text-center'>Program ini dikhususkan untuk tugas Matakuliah Kemananan Perangkat Lunak</p>
      </div>
    </div>
  </>);
};

export default CaesarCipher;
