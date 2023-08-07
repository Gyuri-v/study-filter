const relation = [
  {
    title: '성장률',
    name: 'x',
    conditions: [
      {
        label: '0% 미만',
        value: [-Infinity, 0],
      },
      {
        label: '0% 이상 ~ 10% 미만',
        value: [0, 10],
      },
      {
        label: '10% 이상 ~ 20% 미만',
        value: [10, 20],
      },
      {
        label: '20% 이상 ~ 30% 미만',
        value: [20, 30],
      },
      {
        label: '30% 이상',
        value: [30, Infinity],
      },
    ],
  },
  {
    title: '경쟁강도',
    name: 'y',
    conditions: [
      {
        label: '10 미만',
        value: [-Infinity, 10],
      },
      {
        label: '10 이상 ~ 50 미만',
        value: [10, 50],
      },
      {
        label: '50 이상 ~ 100 미만',
        value: [50, 100],
      },
      {
        label: '100 이상 ~ 200 미만',
        value: [100, 200],
      },
      {
        label: '200 이상',
        value: [200, Infinity],
      },
    ],
  },
  {
    title: '처장조제액',
    name: 'sales',
    conditions: [
      {
        label: '10억 미만',
        value: [-Infinity, 1000000000],
      },
      {
        label: '10억 이상 ~ 50억 미만',
        value: [1000000000, 5000000000],
      },
      {
        label: '50억 이상 ~ 100억 미만',
        value: [5000000000, 10000000000],
      },
      {
        label: '100억 이상 ~ 300억 미만',
        value: [10000000000, 30000000000],
      },
      {
        label: '300억 이상',
        value: [30000000000, Infinity],
      },
    ],
  },
];
