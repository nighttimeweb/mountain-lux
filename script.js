/* new_script.js - Unified JavaScript for Mountain Life Luxury Site */

document.addEventListener("DOMContentLoaded", function () {
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    const progressFill = document.querySelector('.progress-fill');
  
    if (preloader && progressFill) {
      const start = performance.now();
      window.addEventListener('load', () => {
        const end = performance.now();
        const loadTime = end - start;
        const duration = Math.min(Math.max(loadTime, 400), 3000);
        progressFill.style.transition = `width ${duration}ms linear`;
        progressFill.style.width = '100%';
        setTimeout(() => {
          preloader.classList.add('hidden');
        }, duration);
      });
    }
  
    // --- Sticky Header ---
    const header = document.querySelector('.site-header-luxury');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
  
    // --- Mobile Navigation ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav-luxury');
    if (mobileNavToggle && mainNav) {
      mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('open');
        mainNav.classList.toggle('mobile-open');
        document.body.style.overflow = mainNav.classList.contains('mobile-open') ? 'hidden' : '';
      });
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (mainNav.classList.contains('mobile-open')) {
            mobileNavToggle.classList.remove('open');
            mainNav.classList.remove('mobile-open');
            document.body.style.overflow = '';
          }
        });
      });
    }
  
    // --- Parallax Background ---
    const heroBackground = document.querySelector('.hero-background video, .hero-background img');
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      });
    }
  
    // --- Reveal Animations ---
    const revealElements = document.querySelectorAll('.headline-reveal, .tagline-reveal, .cta-button-hero, .glass-panel, .annuities-header, .rate-block, .footer-content > div');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    revealElements.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      revealObserver.observe(el);
    });
  
    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // --- SVG Map Interaction ---
    const operatingStates = ['Alabama', 'Arizona', 'Arkansas', 'Georgia', 'Indiana', 'Kentucky', 'Louisiana', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Oklahoma', 'Tennessee', 'Texas'];
    const stateNameToId = { 'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY' };
    const svgObj = document.getElementById("us-map-luxury");
    if (svgObj) {
      svgObj.addEventListener("load", function () {
        const svgDoc = svgObj.contentDocument;
        if (!svgDoc) return;
        const tooltip = document.getElementById("map-tooltip-luxury");
        svgDoc.querySelectorAll('path').forEach(path => {
          path.style.fill = '#e0e0e0';
          path.style.stroke = '#a0a0a0';
          path.style.strokeWidth = '1';
          path.style.transition = 'fill 0.2s ease';
        });
        operatingStates.forEach(stateName => {
          const stateId = stateNameToId[stateName];
          const stateEl = svgDoc.getElementById(stateId);
          if (stateEl) {
            stateEl.style.fill = "var(--moss-green, #6b8e23)";
            stateEl.style.cursor = 'default';
            const oldTitle = stateEl.querySelector("title");
            if (oldTitle) stateEl.removeChild(oldTitle);
            if (tooltip) {
              stateEl.addEventListener("mouseenter", () => {
                tooltip.textContent = stateName + " (Operating State)";
                tooltip.style.opacity = 1;
                tooltip.style.visibility = 'visible';
              });
              stateEl.addEventListener("mousemove", (e) => {
                tooltip.style.left = (e.clientX + 15) + "px";
                tooltip.style.top = (e.clientY + 15) + "px";
              });
              stateEl.addEventListener("mouseleave", () => {
                tooltip.style.opacity = 0;
                tooltip.style.visibility = 'hidden';
              });
            }
          }
        });
      });
    }
  
   // 8. Annuity Calculator Logic
const investmentAmountInput = document.getElementById('investmentAmount');
const investmentDurationInput = document.getElementById('investmentDuration');
const apyDisplay = document.getElementById('apyDisplay');
const durationLabel = document.getElementById('durationLabel');
const totalInterestDisplay = document.getElementById('totalInterest');
const projectedBalanceDisplay = document.getElementById('projectedBalance');
const chartCanvas = document.getElementById('projectionChart');
let projectionChart;

function getApyForDuration(duration) {
  return duration <= 2 ? 5.25 : 5.75;
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function calculateProjection() {
  let amount = parseFloat(investmentAmountInput.value);
  const duration = parseInt(investmentDurationInput.value);
  if (isNaN(amount) || amount < 1000) amount = 1000;
  if (amount > 1000000) amount = 1000000;

  const currentApy = getApyForDuration(duration);
  apyDisplay.textContent = `${currentApy.toFixed(2)}%`;
  durationLabel.textContent = `${duration} ${duration === 1 ? 'year' : 'years'}`;

  let balance = amount;
  const dataPoints = [{ year: 0, balance: balance }];
  for (let year = 1; year <= duration; year++) {
    balance *= (1 + currentApy / 100);
    dataPoints.push({ year, balance: parseFloat(balance.toFixed(2)) });
  }

  const finalBalance = dataPoints[dataPoints.length - 1].balance;
  const totalInterest = finalBalance - amount;

  totalInterestDisplay.textContent = formatCurrency(totalInterest);
  projectedBalanceDisplay.textContent = formatCurrency(finalBalance);
  updateChart(dataPoints);
}

function updateChart(data) {
  const labels = data.map(p => p.year);
  const balances = data.map(p => p.balance);

  if (projectionChart) projectionChart.destroy();

  projectionChart = new Chart(chartCanvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Projected Balance',
        data: balances,
        borderColor: '#1A4D2E',
        backgroundColor: 'rgba(26, 77, 46, 0.15)',
        fill: true,
        tension: 0.25,
        pointBackgroundColor: '#1A4D2E',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: value => `$${(value / 1000).toFixed(0)}k`
          }
        },
        x: {
          title: {
            display: true,
            text: 'Year'
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      }
    }
  });
}

if (investmentAmountInput && investmentDurationInput && chartCanvas) {
  calculateProjection();
  investmentAmountInput.addEventListener('input', calculateProjection);
  investmentDurationInput.addEventListener('input', calculateProjection);
}

  });
  