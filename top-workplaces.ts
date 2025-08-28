// src/scripts/top-workplaces.ts

/**
 * This script identifies the top workplaces based on specified metrics.
 * Example metrics could be employee satisfaction, retention, or productivity.
 * Adjust the logic as needed for your use case.
 */

// Example: Import necessary modules
import { getWorkplaceData, Workplace } from '../utils/workplace-data';

// Define how to compute the "top" workplaces
function getTopWorkplaces(workplaces: Workplace[], metric: keyof Workplace, topN: number): Workplace[] {
  return workplaces
    .sort((a, b) => (b[metric] as number) - (a[metric] as number))
    .slice(0, topN);
}

// Main script logic
async function main() {
  try {
    const workplaces: Workplace[] = await getWorkplaceData();
    const topN = 10; // Number of top workplaces to display
    const metric: keyof Workplace = 'employeeSatisfaction'; // Example metric

    const topWorkplaces = getTopWorkplaces(workplaces, metric, topN);
    console.log(`Top ${topN} workplaces by ${metric}:`);
    topWorkplaces.forEach((wp, idx) => {
      console.log(`${idx + 1}. ${wp.name} - ${metric}: ${wp[metric]}`);
    });
  } catch (error) {
    console.error('Error fetching workplace data:', error);
  }
}

// Run the script
main();
