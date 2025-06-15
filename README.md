# ChronoTx - A platform for gas-optimized smart contract deployments.

> **"Deploy Smarter, Not Harder — AI-Powered Contract Deployment at Optimal Gas Prices."**
---

## Overview

ChronoTx is an AI-powered agent platform that helps users reduce Ethereum gas costs by automatically analyzing gas price trends and deploying smart contracts only when optimal. The user specifies the chain, contract payload, and a gas fee threshold. The agent monitors gas fees using Chainlink services and automatically deploys or notifies the user when conditions are met.

---

## Problem

Gas prices fluctuate based on on-chain activity, which causes:

* Wasted ETH from deploying at high gas times.
* Inefficiency for projects deploying onchain contracts.
* Manual monitoring overhead.

There is **no simple tool** today that provides:

* Automated, intelligent contract deployment.
* Personalized gas price thresholding.
* Historical gas analytics and gas-saving insights.

---

## Solution

ChronoTx offers a simple interface where users can:

1. Upload contract details and choose the deployment chain.
2. Get real-time and historical gas fee analysis.
3. Set a gas price threshold.
4. Choose either:

   * **Auto Deploy**: System deploys when gas < threshold.
   * **Notify Me**: System notifies when conditions are met.

---

## Key Features

### 1. User Input Interface

* Choose blockchain (Ethereum, Arbitrum, Polygon, etc.)
* Input verified smart contract bytecode or link to verified source
* Set custom gas price threshold (Gwei)
* Choose between "Auto Deploy" or "Notify Me"

### 2. Real-time Gas Analysis Dashboard

* Current gas price on selected chain
* Estimated gas cost in ETH and USD
* Gas price trends (last 24h, 7d)
* Predicted optimal window for deployment (AI/heuristics)

### 3. Auto Deployment Engine

* If selected, contract is stored securely
* Agent monitors gas fees using Chainlink Functions
* When threshold is hit:

  * Deploy via Chainlink Automation
  * Notify user (email + dashboard)
  * Log data (gas price, savings, time, txn hash)

### 4. Notification-Only Mode

* Monitor only mode
* When gas < threshold, user gets alert (email)
* User can deploy manually from dashboard
* Still logs potential savings

### 5. Deployment History

* All deployments made
* Gas saved
* Chain, timestamp, txn hash
* Manual vs auto

---

## Future Feature Expansion 

* Token, NFT, and DAO deployments
* Deployment batching (group deploy to share gas)
* Gas estimator for ERC20/ERC721 mints
* AI-powered contract audit feedback before deploy
* Green deployment mode (carbon footprint insights)

---

## User Flow

1. User signs in (wallet connect)
2. User selects chain and uploads contract bytecode + constructor params
3. Gas estimator runs and AI Agent predicts lowest gas fees
4. User sets gas threshold
5. Chooses "Auto Deploy" or "Notify Me"
6. Agent does the job (either deploys or alerts)
7. User receives update
8. Deployment recorded in dashboard

---

## Tech Stack

### Frontend

* **HTML + CSS + Vanilla JavaScript**: UI/UX (simplified from React for hackathon speed)
* **MetaMask (window.ethereum)**: Wallet Connect (simplified from Wagmi + RainbowKit)
* **Chart.js / Recharts**: Graph gas trends

### Backend

* **Node.js + Express (or Firebase Functions)**: API
* **PostgreSQL or Supabase**: User deployment records
* **Mailer (Resend/SendGrid)**: Email alerts

### Chainlink Stack

* **Chainlink Functions**: Fetch real-time gas prices from Web2 APIs
* **Chainlink Automation**: Trigger contract deployment
* **Chainlink Data Feeds**: Benchmark gas prices
* **Chainlink CCIP (future)**: Cross-chain deployments

### Smart Contracts

* Minimal contract for orchestrating deployments
* Storage of contract payload + user thresholds (encoded securely)
* Logs and emits data for frontend sync

---

## Approach

### Phase 1: Core Setup + Wallet Connect + Contract Upload UI

#### Goals:
- User wallet connection
- Uploading smart contract bytecode + constructor params
- Chain selection
- Set up basic project skeleton (frontend/backend)

#### Tasks:
1) Frontend
- Set up HTML + CSS + Vanilla JS scaffold
- Implement Wallet Connect via MetaMask (window.ethereum)
- UI for uploading bytecode (text input or file)
- UI for selecting chain (Ethereum, Arbitrum)
- UI for entering constructor params

2) Backend
- Setup Express or Firebase functions
- Basic API to accept contract data (store in Supabase temporarily)

3) Infra
- Supabase DB: Users, Contracts, Sessions
- Resend or SendGrid setup (API key, test endpoint)

#### Deliverable:
- A working frontend with wallet connect + contract input
- Backend endpoint storing contract info per user

### Phase 2: Gas Estimation + AI Prediction

#### Goals:
- Real-time gas data (Chainlink Functions)
- Historical gas chart
- AI-powered "when to deploy" prediction

#### Tasks:
1) Chainlink Functions
- Use Chainlink Functions to pull gas data from Web2 API (e.g. Etherscan or GasStation)
- Store/stream data for frontend

2) Gas Analysis Dashboard
- Use Chart.js or Recharts for 24h/7d gas trend graph
- Estimate cost in ETH + USD
- Display AI-predicted "optimal deployment window"

3) AI Agent
- Basic heuristic model (moving average + std dev)
- Optionally use a simple Python microservice for analysis (send output to backend)

#### Deliverable:
- Dashboard showing gas trends and AI recommendation

### Phase 3: Deployment Mode + Automation Setup

#### Goals:
- Let users choose between Auto Deploy or Notify Me
- Deploy contract when gas < threshold using Chainlink Automation
- Set up Chainlink Functions + Automation properly

#### Tasks:
1) Frontend
- UI to input gas threshold (Gwei)
- UI for mode selection: "Auto Deploy" or "Notify Me"

2) Backend
- Store user threshold + selected mode
- Configure Chainlink Automation to watch gas price (via Chainlink Function trigger)
- On threshold match: Trigger deployment; Or send notification email (Resend)

3) Smart Contracts
- Write minimal wrapper smart contract that: Accepts stored bytecode; Deploys it on behalf of the user; Emits event (txn hash, timestamp, gas used)

4) Chainlink Integration
- Chainlink Functions to monitor gas
- Chainlink Automation for triggering the deploy

#### Deliverable:
- Smart contracts deployed automatically or notify user when gas is optimal

### Phase 4: History Dashboard + Polish + Testing

#### Goals:
- Deployment logs and analytics
- Polishing UI/UX
- Testing end-to-end flows
- Submission prep

#### Tasks:
1) Frontend
- Dashboard view for past deployments; Chain, gas saved, txn hash, date/time, deploy mode
- Notification history

2) Backend
- Store logs of: Estimated vs actual gas; Mode used; Timestamps, savings

3) Final Checks
- Test gas monitoring interval
- Email delivery confirmation
- Fallback handling (e.g. gas spike after triggering)

4) Documentation + Submission
- Add README + full tech explanation
- Make GitHub repo + write install/run guide
- Submission video/demo script

#### Deliverable:
- Complete MVP
- Chainlink requirement fulfilled (Functions + Automation used)
- Clean dashboard + docs ready for submission

---

### MVP Scope Summary
- Ethereum + Arbitrum supported chains (more later)
- Contract-only deployments (tokens/NFTs come in Version 2)
- Focused on gas-saving, automation, and smart alerts
- Clean, elegant UX with minimal cognitive load