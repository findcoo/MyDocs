# auth&crypto
인증 시스템과 암호학에 관하여...

## 암호화 알고리즘

[🔗 Refer](http://cryptofundamentals.com/algorithms)

### Symmetric Algorithms

<details>
<summary>📜 원문 보기</summary>
Symmetric algorithms encrypt and decrypt a message using the same key. if you hold a key, you can exchange messages with anybody else holding the same key.
it is a shared secret. But be careful who you give the key to. Once it gets in the wrong hands, there is no getting it back. That person can read all of your past message,
and create new message that are indistinguishable from valid data.
</details>

대칭 알고리즘은 메세지를 하나의 키로 암호화하고 복호화한다. 전송자와 수신자가 같은 키를 갖고 있어 암호화된 메세지를 주고 받는게 가능하다.
한번 키가 유출되면 이를 되돌릴 방법이 없음으로 키 관리에 각별히 주의해야한다. 다음과 같은 대표적인 알고리즘이 있다.

* Blowfish
* DES
* 3DES
* AES

### Asymmetric Algorithms

<details>
<summary>📜 원문 보기</summary>
Asymmetric algorithms use a different key to encrypt than they do to decrypt. The encrypting key is called the public key and the decrypting key is the private key.
if you hold the private key, i can send you a message that only you can read.

These keys will also work in the opposite direction. That is, anything you encrypt with your private key, I can decrypt with your public key. You can use this to digitally sign a document.
Encrypt it with your private key, and i`ll be able to verify your signature by decrypting with your public key. I have confidence that the message came from you, because only someone who holds your private key could have produced a working signature.
</details>

비대칭 알고리즘은 암호화와 복호화에 다른 키를 사용한다. 암호화하는 키는 공개키로 복호화 키는 사설키로 사용된다.
전송자는 해당 키를 갖는 수신자만 읽을 수 있는 메세지를 보낸다.
이는 반대로도 작용하는데, 사설키로 암호화된 메세지는 공개키로 복호화할 수 있다.

* Diffle-hellman
* RSA
* Elliptic Curve

### Hash Functions

<details>
<summary>📜 원문 보기</summary>
An asymmetric algorithm is limited in the size of message that it can encrypt and decrypt. it can`t be run over a large message the way that a symmetric algorithm can.
so if i wan to use an asymmetric algorithm to sign a message, i have to first compute a digest, a smaller number based on the larger message. The way i do that is to run a hash function.

some hash functions were invented for error detection during transmission. These hash functions are not suitable for digital signitures because they are easily reversible. instead,
we have devised cryptographically secure hash functions, which produce hashes that are hard to reverse. in other words, given a hash, it`s hard to make up a document that computes that hash.
these hash functions include
</details>

비대칭 알고리즘은 암호화시 메세지 크기 제한을 갖고 있기에 메세지 크기 제약을 해소하기 위해 작은 크기로 줄이기 위한 방법이 필요하며 이를 위해 해쉬 함수를 사용할 수 있다.
해쉬 함수 중에는 전송간의 에러를 확인하기 위한 목적의 함수도 있는데 이는 쉽게 충돌하기 때문에 디지털 서명을 위한 방법으로는 적합하지 않다. 이러한 함수에는 다음과 같은 함수들이 있다.

* MD5
* SHA1
* SHA2
* SHA3








