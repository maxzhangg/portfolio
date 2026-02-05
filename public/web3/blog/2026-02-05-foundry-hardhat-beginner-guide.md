# Foundry and Hardhat: Beginner Guide

This post walks through two beginner-friendly ways to run a local blockchain and interact with it. We will use **Foundry** for command-line speed, then **Hardhat** for JavaScript-based workflows.

If you can follow terminal commands and copy/paste a few snippets, you are good.

---

## Part 1: Foundry (CLI-first)

Think of Foundry as a text-based RPG toolkit:
- **Anvil** = local blockchain server
- **Forge** = contract builder and deployer
- **Cast** = controller to read/write contract state

### Install Foundry (Mac)

```
curl -L https://foundry.paradigm.xyz | bash
```

### Install Foundry (Windows)

On Windows, use **Git Bash** (not PowerShell) to run the same install command:

```
curl -L https://foundry.paradigm.xyz | bash
```

Then run:

```
foundryup
forge --version
```

### Create a project

```
forge init my_first_web3
cd my_first_web3
```

Default structure:
- `src/` contracts
- `test/` tests
- `script/` deploy scripts

### Step 1: Start local chain (Terminal 1)

```
anvil
```

Look for the first **Private Key** and copy it. Keep this terminal running.

### Step 2: Deploy the Counter contract (Terminal 2)

Foundry gives you a simple `Counter.sol` by default. Deploy it:

```
forge create src/Counter.sol:Counter \
  --rpc-url http://127.0.0.1:8545 \
  --private-key <YOUR_PRIVATE_KEY> \
  --broadcast
```

Copy the `Deployed to: 0x...` address.

### Step 3: Interact with the contract

Read the value:

```
cast call <CONTRACT_ADDRESS> "number()" --rpc-url http://127.0.0.1:8545
```

Convert hex to decimal:

```
cast call <CONTRACT_ADDRESS> "number()" --rpc-url http://127.0.0.1:8545 | cast --to-dec
```

Write a new value:

```
cast send <CONTRACT_ADDRESS> "setNumber(uint256)" 666 \
  --rpc-url http://127.0.0.1:8545 \
  --private-key <YOUR_PRIVATE_KEY>
```

Verify again:

```
cast call <CONTRACT_ADDRESS> "number()" --rpc-url http://127.0.0.1:8545 | cast --to-dec
```

---

## Part 2: Hardhat (JavaScript-first)

Hardhat is the standard JS workflow. You write scripts and use a JS console to interact.

### Core roles
- **Hardhat Network** = local blockchain server
- **Scripts** = deployment automation
- **Console** = JS REPL for contract interaction

### Step 1: Setup project (Terminal 1)

Before you start:
- **Node.js must be x64** (64-bit).
- Use **Hardhat v2** (select v2 in the wizard if it asks).

```
mkdir my_hardhat_project
cd my_hardhat_project
npm init -y
npm install --save-dev hardhat@2
npx hardhat init
```

Choose **Create a JavaScript project** in the wizard.

### Step 2: Start local chain (Terminal 1)

```
npx hardhat node
```

Keep this terminal running.

### Step 3: Create a simple contract (Terminal 2)

Replace the default contract with a Counter:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
```

Compile:

```
npx hardhat compile
```

### Step 4: Deploy with a script

Create `scripts/deploy.js`:

```js
const hre = require("hardhat");

async function main() {
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  console.log("Deployed to:", await counter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run:

```
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed address.

### Step 5: Interact via console

```
npx hardhat console --network localhost
```

Then in the console:

```
const counter = await ethers.getContractAt("Counter", "<CONTRACT_ADDRESS>")
await counter.number()
await counter.setNumber(99)
await counter.number()
```

Exit with `Ctrl + C` twice.

---

## Foundry vs Hardhat (when to choose)

- **Foundry**: fastest for pure contract work and CLI experiments.
- **Hardhat**: best if you are already comfortable with JavaScript and want to connect to frontends.

My suggestion: learn Foundry first for the mental model, then use Hardhat for full-stack workflows.

---

## Quick Troubleshooting

Foundry:
- `Connection refused` -> Anvil not running.
- `Contract not found` -> wrong folder, missing `foundry.toml`.
- `Bad key` -> private key must start with `0x`.

Hardhat:
- `HH100: Network localhost doesn't exist` -> typo in `--network localhost`.
- `ECONNREFUSED 127.0.0.1:8545` -> local node not running.
- `ReferenceError: ethers is not defined` -> use `npx hardhat console`.

---

## Homework

Add a `decrement()` function to `Counter.sol`, redeploy, and re-run the steps. This is the fastest way to lock in the workflow.
