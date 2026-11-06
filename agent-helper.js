(() => {
  const launcher = document.getElementById('agent-launcher');
  const panel = document.getElementById('agent-panel');
  const output = document.getElementById('agent-output');
  const closeButton = document.querySelector('[data-agent-close]');

  if (!launcher || !panel || !output) return;

  const renderText = (title, lines) => {
    output.innerHTML = `<strong>${title}</strong><ul>${lines.map((line) => `<li>${line}</li>`).join('')}</ul>`;
  };

  const defaultMessage = () => {
    renderText('Karak Ghori Project Helper', [
      'Mission: connect with customers and treat every guest like a king.',
      'Goal: make buying easy, fast, mobile-first, and confidence-building.',
      'Current stack: storefront, cart, staff desk, WhatsApp order flow, and PWA-ready app shell.',
      'Next focus: launch polish, customer retention, and reliable debug checks before release.',
    ]);
  };

  const actions = {
    debug: () => {
      renderText('Debug checklist', [
        'Check Deno lint issues before launch. The app should use globalThis instead of window when running in Deno-compatible environments.',
        'Validate catalog, order, and staff modules load before the storefront starts rendering.',
        'Test the checkout path: cart -> order confirmation -> WhatsApp handoff -> staff desk.',
        'Confirm the PWA and service worker still work after any UI change.',
      ]);
    },
    customer: () => {
      renderText('Customer care rules', [
        'Welcome every guest warmly and treat each one like a king or queen.',
        'Offer fast pickup, delivery, or dine-in choices with clear pricing.',
        'Use WhatsApp as the customer-care channel for confirmations and follow-up.',
        'Be helpful, fast, and easy to reach. A good customer experience is profit.',
      ]);
    },
    easybuy: () => {
      renderText('EasyBuy flow', [
        'Push highlighted favorites and combo deals to the top of the menu.',
        'Keep the checkout flow to a few taps with a clear add-to-cart button and instant totals.',
        'Offer direct WhatsApp ordering for customers who want speed and simplicity.',
        'Create loyalty reminders such as "order again" and special offer bundles.',
      ]);
    },
    copy: async () => {
      const script = [
        'Customer message:',
        'Welcome to Karak Ghori. We serve fresh food and drinks with quick, friendly service. Order in minutes and enjoy the taste we make with care.',
        'Your order is important to us. We treat every customer like a king and make your experience smooth, fast, and satisfying.'
      ].join('\n');

      try {
        await navigator.clipboard.writeText(script);
        renderText('Copied', [
          'A customer-care message was copied to your clipboard.',
          'Use it in WhatsApp, social posts, or customer follow-up.',
        ]);
      } catch (error) {
        renderText('Copy failed', [
          'Clipboard access is blocked in this browser.',
          'Use the message below instead:',
          'Welcome to Karak Ghori. We serve fresh food and drinks with quick, friendly service. Your order is important to us, and every customer is treated like a king.'
        ]);
      }
    },
    launch: () => {
      renderText('Launch checklist', [
        'Verify the storefront loads on mobile and desktop.',
        'Test the cart, subtotal, and WhatsApp checkout flow on live data.',
        'Check staff order desk and saved order state on a real browser session.',
        'Confirm the privacy policy, terms, and contact flow are live and easy to find.',
        'Publish the app with a friendly customer support message and launch campaign.',
      ]);
    },
  };

  launcher.addEventListener('click', () => {
    const nextState = panel.hidden;
    panel.hidden = !nextState;
    launcher.setAttribute('aria-expanded', String(!panel.hidden));
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-agent]');
    if (!button) return;
    const action = button.dataset.agent;
    if (action && actions[action]) {
      actions[action]();
    }
  });

  defaultMessage();
})();
