---
name: qo-near-readiness
description: Assess and design optional NEAR integration for QO using mock-first interfaces, explicit trust boundaries, and testnet validation plans. Use for NEAR readiness, not automatic wallet or contract deployment.
---
# QO NEAR readiness

Start by identifying a user-valued use case such as optional account identity or a provenance receipt. If the use case is unresolved, compare a local-only solution and an optional NEAR adapter; do not invent a token economy to justify blockchain.

Read current official NEAR documentation before selecting SDKs, account flows, standards or transaction behavior. Record date and links. Agartha-Ecosystem's Nearblockchainintegration is historical design material with illustrative snippets, not evidence of a deployed contract, verified security or current SDK compatibility.

Define an adapter with network/account configuration, read-only queries, transaction preparation, signer handoff and status reconciliation. Default to a mock adapter and feature disabled. Store amounts in exact integer units, not floating-point currency. Identify chain, contract, method, arguments, attached deposit, gas and expected effects before signing.

Keep wallet authorization in a user-controlled signer. Never request or store seed phrases/private keys in chat, memory or source. Explain full-access versus limited function-call access using current docs and choose least privilege compatible with the task. Never assume a restricted key can perform arbitrary value transfers.

Before any testnet mutation, establish the exact approved account, network, transaction and budget. Mainnet use, deployments, asset transfers and token issuance require explicit action-specific authorization. If submission times out, reconcile transaction/account state before retrying; never blindly resend a financial action.

Keep private data and media off-chain by default. Even a hash may reveal linkability; assess what is published and why. Do not promise deletion of on-chain data or privacy through unspecified encryption. Use established security mechanisms; do not present "quantum encryption" or untested code as a security guarantee.

Produce a readiness matrix: implemented, mocked, unverified, blocked. Define tests for network mismatch, wallet rejection, insufficient balance, RPC outage, duplicate submission and signer scope. Verify QO media and local memory still work when this adapter is disabled or unavailable.

## Acceptance
- The mock path works without a wallet or network.
- Wrong-network and cancelled-signature cases have no unintended mutation.
- No secret or private media enters a repository or chain.
- Every submitted operation has explicit scope and verifiable status.
- Mainnet readiness is never inferred from a successful mock or testnet run.

## References
Read current pages when designing:
https://docs.near.org/protocol/accounts-contracts/access-keys
Historical QO design:
https://github.com/artofray/Agartha-Ecosystem/blob/c264fbf16abe6c02024f90c4d4c59e92b7e94362/Nearblockchainintegration
