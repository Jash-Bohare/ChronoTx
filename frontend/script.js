const connectWalletBtn = document.getElementById('connectWallet');
const disconnectWalletBtn = document.getElementById('disconnectWallet');
const walletAddressDisplay = document.getElementById('walletAddress');
const contractForm = document.getElementById('contractForm');
const statusMsg = document.getElementById('statusMsg');

let userAddress = null;

// Connect wallet logic
connectWalletBtn.addEventListener('click', async () => {
  if (!window.ethereum) {
    alert('MetaMask not installed.');
    return;
  }

  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];

    walletAddressDisplay.textContent = `Connected: ${userAddress}`;
    connectWalletBtn.style.display = 'none';
    disconnectWalletBtn.style.display = 'inline-block';
    contractForm.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Wallet connection failed.');
  }
});

// Disconnect wallet logic
disconnectWalletBtn.addEventListener('click', () => {
  userAddress = null;

  connectWalletBtn.style.display = 'inline-block';
  disconnectWalletBtn.style.display = 'none';
  contractForm.style.display = 'none';

  walletAddressDisplay.textContent = 'Not connected';
  statusMsg.textContent = '';
});

// Form submission
contractForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const chain = document.getElementById('chain').value.trim();
  const bytecode = document.getElementById('bytecode').value.trim();
  const param1 = document.getElementById('param1').value.trim();
  const param2 = document.getElementById('param2').value.trim();

  const constructorParams = [];
  if (param1) constructorParams.push(param1);
  if (param2) constructorParams.push(isNaN(param2) ? param2 : parseInt(param2));

  if (!userAddress || !chain || !bytecode) {
    alert('Please fill in all required fields.');
    return;
  }

  const payload = {
    address: userAddress,
    chain,
    bytecode,
    constructorParams,
  };

  statusMsg.textContent = 'Submitting...';

  try {
    const res = await fetch('http://localhost:5000/api/saveContract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      statusMsg.textContent = `✅ Contract saved with ID: ${data.contract.id}`;
    } else {
      statusMsg.textContent = `❌ Error: ${data.error || 'Unknown error'}`;
    }
  } catch (err) {
    console.error(err);
    statusMsg.textContent = '❌ Network error';
  }
});
