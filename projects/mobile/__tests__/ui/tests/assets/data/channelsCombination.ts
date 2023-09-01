interface ChannelCombination {
  enabled: string[];
  disabled: string[];
}

const channels = ['aja', 'ajm', 'ajd', 'aje', 'ajc', 'ajb'];

function generateCombinations(inputChannels: string[]): ChannelCombination[] {
  const combinations: ChannelCombination[] = [];
  const n = inputChannels.length;

  for (let i = 1; i < Math.pow(2, n); i++) {
    const enabled: string[] = [];
    const disabled: string[] = [];

    for (let j = 0; j < n; j++) {
      if ((i / Math.pow(2, j)) % 2 >= 1) {
        enabled.push(inputChannels[j]);
      } else {
        disabled.push(inputChannels[j]);
      }
    }

    combinations.push({enabled, disabled});
  }

  return combinations;
}

export const channelsCombination = generateCombinations(channels);
