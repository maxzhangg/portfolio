# Gas Optimization in Practice: A Small but Real Improvement (Remix Test)

While studying the Gas optimization chapter in the Web3 internship handbook, I tested a simple but high-frequency scenario in Remix to compare gas usage between an unoptimized and optimized implementation. This post records the process and conclusions.

## 1. Experiment Background

Business scenario:

Implement a batch reward distribution function:

- Input: `users[]` and `amounts[]`
- Behavior: for each user, execute `rewards[user] += amount`

This pattern is common in airdrops, points systems, and rebate settlements.

## 2. Unoptimized Implementation (Baseline)

```solidity
contract RewardDistributorBad {
    mapping(address => uint256) public rewards;

    function batchAddRewards(
        address[] memory users,
        uint256[] memory amounts
    ) public {
        require(users.length == amounts.length, "len mismatch");

        for (uint256 i = 0; i < users.length; i++) {
            rewards[users[i]] += amounts[i];
        }
    }
}
```

Characteristics:

- Uses `public` + `memory`
- Re-reads `users.length` in the loop condition
- Directly applies `+=` to the mapping in the loop (storage reads/writes)

## 3. Optimized Implementation

```solidity
contract RewardDistributorGood {
    mapping(address => uint256) public rewards;

    function batchAddRewards(
        address[] calldata users,
        uint256[] calldata amounts
    ) external {
        uint256 len = users.length;
        require(len == amounts.length, "len mismatch");

        for (uint256 i = 0; i < len; ++i) {
            address u = users[i];
            uint256 addAmt = amounts[i];

            uint256 cur = rewards[u];
            rewards[u] = cur + addAmt;
        }
    }
}
```

Optimization strategies used:

- `external` + `calldata`
- Avoid copying parameters from calldata to memory for external calls
- Cache array length: `uint256 len = users.length`
- One read, one write: make `SLOAD` → `SSTORE` boundaries explicit to avoid hidden re-reads
- Loop micro-optimizations: use `++i`, cache `users[i]` and `amounts[i]`

## 4. Remix Test Results

Test environment: Remix VM

Same input parameters:

- 3 addresses
- `[100, 200, 300]`

Each contract executed only once (to avoid storage pre-initialization effects)

Gas data:

| Contract | Gas Used |
| --- | --- |
| Unoptimized (Bad) | 107,971 gas |
| Optimized (Good) | 106,722 gas |

Gas reduction:

`(107,971 - 106,722) / 107,971 ≈ 1.16%`

## 5. How to Interpret This Result

1️⃣ Why is the improvement small?

This is normal and expected, because:

The dominant cost is still:

- `SSTORE` (mapping from 0 → non-0)

These optimizations mainly target:

- calldata vs. memory
- loop reads
- hidden repeated access

When storage writes dominate, structural improvements matter more than syntax tweaks.

2️⃣ Is this optimization still meaningful?

Yes, and it is important.

Reasons:

- At larger array sizes (e.g., 50 / 100 / 500 users), these savings scale linearly
- In production contracts, `calldata`, `external`, and loop caching are standard engineering practices

3️⃣ What does this case show?

Gas optimization is not about “miracles,” but about consistently removing unnecessary overhead.

Even 1%:

- Is real cost savings in high-frequency calls
- Is a line between “acceptable” and “not acceptable” in audits and engineering quality
