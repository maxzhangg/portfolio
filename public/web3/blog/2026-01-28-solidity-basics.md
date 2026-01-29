# Solidity Basics: What I Learned as Beginner

Solidity is often introduced as “just another programming language,” but once you start working with it, that idea quickly falls apart. Solidity is not designed for general-purpose computing — it is designed for **immutable programs running inside a hostile, resource-constrained environment**: the Ethereum Virtual Machine (EVM).

This article is a technical overview of the **Basic** concepts in Solidity, based on the structure and examples from *Solidity by Example*. The goal is to present a clean, conceptual understanding of the language without focusing on specific code snippets.

## Smart Contracts and the On-Chain Execution Model

A Solidity contract is a program deployed to the blockchain. Once deployed, its logic cannot be changed. Every interaction with a contract is either:

- A **read-only call**, or  
- A **state-changing transaction** that consumes gas

This execution model immediately introduces two constraints that dominate all Solidity design decisions:
1. **Immutability**
2. **Cost of computation**

Unlike traditional applications, there is no concept of “free” execution.

## Primitive Types and Value Semantics

Solidity provides a set of primitive data types such as integers, booleans, addresses, and fixed-size byte arrays. These types are intentionally explicit and restrictive.

Key characteristics include:
- Integer sizes are fixed and matter for storage layout
- The `address` type is a core primitive tied to account identity
- Value semantics dominate — copying data is common and intentional

The language prioritizes predictability and efficiency over convenience.

## State Variables, Constants, and Immutables

State variables live permanently on-chain and represent the contract’s stored data. Writing to these variables is one of the most expensive operations in Solidity.

To reduce storage costs, Solidity provides:
- **Constants**, fixed at compile time
- **Immutables**, assigned once during deployment

These constructs exist not only for safety, but as **first-class gas optimization tools**.

## Reading vs Writing State

One of the most fundamental cost distinctions in Solidity is between reading and writing state.

- Reading from storage is relatively cheap
- Writing to storage is expensive and persistent

This cost difference explains:
- The separation between view, pure, and state-changing functions
- Why contract design favors minimal state mutation
- Why logic is often split between on-chain verification and off-chain computation

## Ether, Wei, Gas, and Transaction Economics

Solidity forces developers to think in economic terms.

- **Ether** represents value
- **Wei** is the smallest unit
- **Gas** measures computational effort
- **Gas price** determines execution priority

Every operation has a measurable cost, and inefficient logic directly increases the cost borne by users.

## Control Flow Under Gas Constraints

Solidity supports standard control flow constructs such as conditional branching and loops, but their use is constrained by gas limits.

Important considerations:
- Loops must be bounded
- Iteration over large datasets is risky
- Unbounded loops can cause transaction failure

As a result, many Solidity designs avoid on-chain iteration entirely.

## Core Data Structures

Solidity includes several data structures, each with distinct trade-offs:

- **Mappings** provide efficient key-based access but cannot be iterated
- **Arrays** allow ordered storage but scale poorly
- **Enums** encode finite state machines clearly
- **Structs** group related data into cohesive units

Choosing a structure is less about syntax and more about access patterns and gas usage.

## Data Locations: Storage, Memory, and Calldata

Solidity introduces explicit data locations:

- **Storage**: persistent and expensive
- **Memory**: temporary and cheaper
- **Calldata**: read-only input data

These distinctions affect performance, safety, and function design, and are central to writing efficient contracts.

## Functions, Visibility, and Modifiers

Functions in Solidity are constrained by visibility rules that enforce access control at the language level.

Visibility modifiers determine:
- Who can call a function
- How contracts expose their interfaces

Function modifiers provide a reusable mechanism for enforcing preconditions, contributing to safer and more maintainable contracts.

## Events and Error Handling

Because contracts cannot produce traditional logs, Solidity relies on:
- **Events** for off-chain observability
- **Reverts and errors** for enforcing correctness

Events are primarily consumed by indexers and frontends, not by other contracts.

## Inheritance, Interfaces, and Libraries

Solidity supports modular contract design through:
- Inheritance
- Interfaces
- Libraries

These features enable code reuse and composability, while still respecting the constraints of on-chain execution.

## Contract Interaction and Ether Transfer

Interacting with other contracts introduces additional complexity and risk.

Key concepts include:
- Low-level calls
- Fallback and receive mechanisms
- Ether transfer semantics

External calls are a major source of vulnerabilities, which is why defensive programming patterns are critical in Solidity.

## ABI Encoding, Hashing, and Signatures

Advanced “basic” topics include:
- ABI encoding and decoding
- Keccak256 hashing
- Signature verification

These features connect Solidity contracts to off-chain systems, wallets, and cryptographic primitives.

## Gas Optimization and Low-Level Operations

Solidity allows fine-grained control over execution through:
- Bitwise operations
- Unchecked arithmetic
- Inline assembly

While powerful, these tools trade safety and readability for performance, and must be used carefully.

## Conclusion

Solidity is a language shaped by constraints: immutability, cost, and adversarial execution. The Basic concepts are less about syntax and more about understanding **how programs behave on-chain**.

A strong grasp of these fundamentals is essential before moving on to higher-level topics such as protocol design, upgradeability, and security auditing.
