// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing calculator...');
  const themeToggle = document.getElementById('theme-toggle');
  const menuBtn = document.getElementById('menu-btn');
  const historyPanel = document.getElementById('history-panel');
  const closeHistory = document.getElementById('close-history');
  const resultDisplay = document.getElementById('result');
  const historyList = document.getElementById('history-list');

  // Check if all elements exist
  if (!themeToggle || !menuBtn || !historyPanel || !closeHistory || !resultDisplay || !historyList) {
    console.error('Some required elements are missing:', {
      themeToggle: !!themeToggle,
      menuBtn: !!menuBtn,
      historyPanel: !!historyPanel,
      closeHistory: !!closeHistory,
      resultDisplay: !!resultDisplay,
      historyList: !!historyList
    });
    return;
  }

  let expression = '';
  let history = [];

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light')
    ? '🌙 Dark Mode'
    : '☀️ Light Mode';
});

// Open History Panel
menuBtn.addEventListener('click', () => {
  historyPanel.classList.add('show');
});

// Close History Panel
closeHistory.addEventListener('click', () => {
  historyPanel.classList.remove('show');
});

// Handle Button Clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => handleButton(btn));
});

function handleButton(btn) {
  console.log('Button clicked:', btn.textContent, btn.dataset);
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === 'clear') {
    expression = '';
    resultDisplay.textContent = '0';
  } else if (action === 'backspace') {
    expression = expression.slice(0, -1);
    resultDisplay.textContent = expression || '0';
  } else if (action === 'equals') {
    try {
      const result = eval(expression);
      resultDisplay.textContent = result;
      history.push(`${expression} = ${result}`);
      updateHistory();
      expression = result.toString();
    } catch {
      resultDisplay.textContent = 'Error';
      expression = '';
    }
  } else {
    expression += value;
    resultDisplay.textContent = expression;
  }
}

function updateHistory() {
  historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
}

  // Keyboard Support
  document.addEventListener('keydown', e => {
    if (/[0-9+\-*/.%]/.test(e.key)) {
      expression += e.key;
      resultDisplay.textContent = expression;
    }
    if (e.key === 'Enter') document.querySelector('[data-action="equals"]').click();
    if (e.key === 'Backspace') document.querySelector('[data-action="backspace"]').click();
    if (e.key === 'Escape') document.querySelector('[data-action="clear"]').click();
  });
});