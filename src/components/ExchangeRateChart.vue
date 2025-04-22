<template>
  <div class="currency-chart-container d-flex align-center justify-center">
  <div v-if="error" class="text-center">
     {{ error }}
  </div>
     <v-skeleton-loader
          :loading="loading"
          type="list-item-two-line">
    <div class="chart-content">
      <div class="currency-selection">
        <div class="currency-buttons">
          <button
            v-for="currency in availableCurrencies"
            :key="currency"
            @click="toggleCurrency(currency)"
            :class="{ 'selected': selectedCurrencies.includes(currency) }"
            class="currency-button"
          >
            {{ currency }}
          </button>
        </div>
      </div>
      <div class="chart-wrapper">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
      <div class="chart-info">
        <h3>{{$t('currencyExchageRatesBaseEuro')}} </h3>
        <p>{{$t('dateRange')}}</p>
        <p> {{$t('baseCurrency')}} EUR</p>
      </div>
    </div>
  </v-skeleton-loader>
  </div>
</template>

<script setup lang="ts">
import { ref, computed , onMounted} from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
 import { useStore } from 'vuex'
 const store = useStore()
 onMounted(() => {
  store.dispatch('fetchExchangeRatesFromDates');
})
const loading  = computed(() => store.state.loadingChart)
const rateData = computed(() => store.state.chartRated)
const error = computed(() => store.state.chartError)

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const selectedCurrencies = ref(['AUD', 'CAD', 'CHF', 'CZK', 'GBP', 'HKD']); // All 6 currencies selected by default
const availableCurrencies = ref(['AUD', 'CAD', 'CHF', 'CZK', 'GBP', 'HKD']); // Fixed list of 6 currencies

// Define chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    title: {
      display: true,
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 16,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 30
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#000',
      bodyColor: '#333',
      borderColor: '#ddd',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.y.toFixed(4)}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    y: {
      beginAtZero: false,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Inter, system-ui, sans-serif'
        },
        callback: function(value: number) {
          return value.toFixed(2);
        }
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart'
  }
};

const colorPalette = [
  { backgroundColor: 'rgba(59, 130, 246, 0.5)', borderColor: 'rgb(59, 130, 246)' },
  { backgroundColor: 'rgba(249, 115, 22, 0.5)', borderColor: 'rgb(249, 115, 22)' },
  { backgroundColor: 'rgba(20, 184, 166, 0.5)', borderColor: 'rgb(20, 184, 166)' },
  { backgroundColor: 'rgba(139, 92, 246, 0.5)', borderColor: 'rgb(139, 92, 246)' },
  { backgroundColor: 'rgba(236, 72, 153, 0.5)', borderColor: 'rgb(236, 72, 153)' },
  { backgroundColor: 'rgba(234, 179, 8, 0.5)', borderColor: 'rgb(234, 179, 8)' }
];

const chartData = computed<ChartData>(() => {
  if (!rateData.value || typeof rateData.value !== 'object') {
    return {
      labels: [],
      datasets: []
    };
  }
  if (Object.keys(rateData.value).length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  const dates = Object.keys(rateData.value).sort();
  const datasets = selectedCurrencies.value.map((currency, index) => {
    const colorIndex = index % colorPalette.length;
    return {
      label: currency,
      data: dates.map(date => rateData.value[date][currency] || 0),
      backgroundColor: colorPalette[colorIndex].backgroundColor,
      borderColor: colorPalette[colorIndex].borderColor,
      borderWidth: 1
    };
  });

  return {
    labels: dates.map(formatDate),
    datasets
  };
});

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function toggleCurrency(currency: string): void {
  if (selectedCurrencies.value.includes(currency)) {
    // Remove currency if already selected
    if (selectedCurrencies.value.length > 1) { // Keep at least one currency selected
      selectedCurrencies.value = selectedCurrencies.value.filter(c => c !== currency);
    }
  } else {
    selectedCurrencies.value.push(currency);
  }
}

</script>

<style scoped>
.currency-chart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3B82F6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container p {
  color: #dc2626;
  margin-bottom: 1rem;
}

.retry-button {
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s;
}

.retry-button:hover {
  background-color: #2563eb;
}

.chart-content {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: transform 0.3s ease;
}

.chart-content:hover {
  transform: translateY(-5px);
}

.currency-selection {
  margin-bottom: 2rem;
}

.currency-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.currency-button {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 0.5em 1em;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.currency-button:hover {
  background-color: #e5e7eb;
}

.currency-button.selected {
  background-color: #3B82F6;
  color: white;
  border-color: #3B82F6;
}

.chart-wrapper {
  height: 400px;
  margin-bottom: 1.5rem;
}

.chart-info {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.chart-info p {
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .currency-chart-container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  .chart-wrapper {
    height: 300px;
  }
  
  .currency-buttons {
    justify-content: center;
  }
}
</style>