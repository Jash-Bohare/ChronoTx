const connectWalletBtn = document.getElementById('connectWallet');
const walletAddressDisplay = document.getElementById('walletAddress');
const statusMsg = document.getElementById('statusMsg');
const contractForm = document.getElementById('contractForm');

let userAddress = null;

// Connect MetaMask wallet
connectWalletBtn.addEventListener('click', async () => {
  if (!window.ethereum) {
    alert('MetaMask is not installed. Please install it to use ChronoTx.');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    walletAddressDisplay.textContent = `Connected: ${userAddress}`;
    connectWalletBtn.style.display = 'none'; // hide the button after connect
  } catch (error) {
    console.error(error);
    alert('Could not connect wallet.');
  }
});

// Handle form submission
contractForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!userAddress) {
    alert('Please connect your wallet first.');
    return;
  }

  const chain = document.getElementById('chain').value.trim();
  const bytecode = document.getElementById('bytecode').value.trim();
  const param1 = document.getElementById('param1').value.trim();
  const param2 = document.getElementById('param2').value.trim();

  if (!chain || !bytecode) {
    alert('Chain and bytecode are required.');
    return;
  }

  const constructorParams = [];
  if (param1) constructorParams.push(param1);
  if (param2) constructorParams.push(param2);

  const payload = {
    address: userAddress,
    chain,
    bytecode,
    constructorParams,
  };

  statusMsg.textContent = 'Submitting contract...';

  try {
    const response = await fetch('http://localhost:5000/api/saveContract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      statusMsg.textContent = `✅ Contract saved with ID: ${data.contract.id}`;
    } else {
      statusMsg.textContent = `❌ Error: ${data.error || 'Unknown error'}`;
    }
  } catch (err) {
    console.error(err);
    statusMsg.textContent = '❌ Network error. Could not submit contract.';
  }
});
