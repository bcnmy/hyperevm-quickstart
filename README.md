# Biconomy MEE + HyperEVM Example

This repository demonstrates how to use the [Biconomy Modular Execution Environment (MEE)](https://docs.biconomy.io/) infrastructure with the HyperEVM chain.

## Prerequisites

- [Bun](https://bun.sh/) (tested with version 1.2.5)
- [Node.js](https://nodejs.org/) (tested with version 23.10.0)
- A Biconomy MEE API key ([get one here](https://dashboard.biconomy.io/))
- A test EOA (Externally Owned Account) private key

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone <this-repo-url>
   cd <repo-directory>
   ```

2. **Install dependencies:**

   ```sh
   bun i
   ```

3. **Configure your credentials:**

   - Open `index.ts` and fill in your test EOA private key and MEE API key:
     ```ts
     const MEE_API_KEY = "<your-mee-api-key>";
     const EOA_PRIV_KEY = "<your-eoa-private-key>";
     ```

4. **Fund your Nexus Smart Account:**

   - The Nexus smart account corresponding to your EOA must be funded with some asset on some chain to run this example.

5. **Run the example:**

   ```sh
   bun run index.ts
   ```

## Notes

- This example uses the Nexus smart account derived from the EOA. Make sure that account is funded in order to perform some instruactions that consume funds (like swaps, transfers, batching, etc).
- **Get your Nexus smart account address:** To get your Nexus smart account address, simply run:
  ```sh
  bun run getAddress.ts
  ```
- **Sponsorship:** This example demonstrates the use of MEE supertransaction sponsorship (gasless transactions). You can get access to sponsorship for your own projects by creating a project on the [Biconomy Dashboard](https://dashboard.biconomy.io/) and reaching out to the Biconomy team via the Dashboard.
- You can also run the example from the EOA directly by using MEE Fusion transactions. See the [Biconomy Fusion Transaction documentation](https://docs.biconomy.io/mee/fusion#encode-a-fusion-transaction) for more details.

---

For more information, visit the [Biconomy Documentation](https://docs.biconomy.io/).
