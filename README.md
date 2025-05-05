# Blockchain-Final-Project


---

```markdown
# Private & Verifiable Voting using ZK-SNARKs

This project implements a private and verifiable voting system using ZK-SNARKs, specifically the PLONK proof system. It leverages zero-knowledge proofs to allow users to prove the validity of their vote without revealing their vote or identity, while ensuring each voter can vote only once.

The project focuses on the cryptographic and backend implementation, following feedback to prioritize smart contract design, circuit construction, and benchmarking privacy vs. gas trade-offs, rather than frontend development.

## Key Features

- Zero-knowledge proof-based vote verification
- Smart contract verification of ZK-SNARKs, specifically the PLONK proof system
- Circom circuit to generate proofs
- Focus on backend: contract design, circuit construction, and gas vs. privacy trade-offs
- Logs that benchmark gas usage and calldata size
- Deployment on Sepolia Ethereum testnet

## Why this project?

This project was developed with the goal of focusing on the technical novelty of private and verifiable voting using zero-knowledge proofs. Following project feedback, the implementation:
  - Contract and circuit design
  - Gas usage benchmarking
  - Proof size analysis
  - Demonstrating on-chain verification of private votes

## Project Structure
Blockchain-Final-Project/
├── contracts/
│   ├── Verifier.sol
│   └── Voting.sol
├── circuits/
│   ├── vote.circom
│   ├── vote.r1cs
│   ├── vote_final.zkey
│   ├── proof.json
│   ├── public.json
├── scripts/
│   ├── deploy.js
│   └── castVote.js
├── hardhat.config.js
├── .env
└── README.md

```



````

## Setup Instructions

### 1. Clone & install dependencies

```bash
git clone https://github.com/rajatpodder22/Blockchain-Final-Project.git
cd Blockchain-Final-Project
npm install
````

### 2. Create `.env` file

```env
PRIVATE_KEY=metamask_private_key_without_0x
INFURA_API_KEY=infura_api_key
```

Ensure your wallet has Sepolia ETH.

### 3. Compile the circuit

Inside `/circuits`:

```bash
circom vote.circom --r1cs --wasm --sym
snarkjs plonk setup vote.r1cs pot12_final.ptau vote_final.zkey
snarkjs zkey export verificationkey vote_final.zkey verification_key.json
node vote_js/generate_witness.js vote_js/vote.wasm input.json witness.wtns
snarkjs plonk prove vote_final.zkey witness.wtns proof.json public.json
snarkjs plonk verify verification_key.json public.json proof.json
snarkjs zkey export soliditycalldata public.json proof.json
```

Verification should print `OK!`

## Deploy Contracts

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Record the deployed contract addresses.

## Cast a Vote

Update `scripts/castVote.js` with contract address and proof/calldata.

Run:

```bash
npx hardhat run scripts/castVote.js --network sepolia
```

Example output:

```
Submitting vote...
Vote submitted! TX hash: 0x...
Gas used: 4923355
```

These logs confirm proof verification and gas benchmarking.

## Evaluation

- Contract verifies ZK-SNARK proof
- Circuit generates valid PLONK proof
- Focused on backend smart contract & circuit logic





