const relation = [
  {
    title: '성장률',
    name: 'x',
    conditions: [
      {
        label: '0% 미만',
        value: [-Infinity, 0],
        checked: false,
      },
      {
        label: '0% 이상 ~ 10% 미만',
        value: [0, 10],
        checked: true,
      },
      {
        label: '10% 이상 ~ 20% 미만',
        value: [10, 20],
        checked: true,
      },
      {
        label: '20% 이상 ~ 30% 미만',
        value: [20, 30],
        checked: true,
      },
      {
        label: '30% 이상',
        value: [30, Infinity],
        checked: false,
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
        checked: false,
      },
      {
        label: '10 이상 ~ 50 미만',
        value: [10, 50],
        checked: false,
      },
      {
        label: '50 이상 ~ 100 미만',
        value: [50, 100],
        checked: true,
      },
      {
        label: '100 이상 ~ 200 미만',
        value: [100, 200],
        checked: false,
      },
      {
        label: '200 이상',
        value: [200, Infinity],
        checked: false,
      },
    ],
  },
  {
    title: '처방조제액',
    name: 'sales',
    conditions: [
      {
        label: '10억 미만',
        value: [-Infinity, 1000000000],
        checked: false,
      },
      {
        label: '10억 이상 ~ 50억 미만',
        value: [1000000000, 5000000000],
        checked: true,
      },
      {
        label: '50억 이상 ~ 100억 미만',
        value: [5000000000, 10000000000],
        checked: true,
      },
      {
        label: '100억 이상 ~ 300억 미만',
        value: [10000000000, 30000000000],
        checked: false,
      },
      {
        label: '300억 이상',
        value: [30000000000, Infinity],
        checked: false,
      },
    ],
  },
];
