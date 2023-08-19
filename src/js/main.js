function createFilterList(data) {
  const $list = document.createElement('li');

  const $title = document.createElement('strong');
  $title.classList.add('title');
  $title.innerText = data.title;

  const $conditions = document.createElement('div');
  $conditions.classList.add('conditions');
  $conditions.innerHTML = `
    <input type="checkbox" name="${data.name}" id="${data.name}_all" value="-Infinity, Infinity">
    <label for="${data.name}_all">전체</label>
  `;

  data.conditions.forEach((condition, index) => {
    const $input = document.createElement('input');
    $input.setAttribute('type', 'checkbox');
    $input.setAttribute('name', data.name);
    $input.setAttribute('id', `${data.name}_${index}`);
    $input.setAttribute('value', condition.value);
    $input.checked = condition.checked;

    const $label = document.createElement('label');
    $label.setAttribute('for', `${data.name}_${index}`);
    $label.innerText = condition.label;

    $conditions.appendChild($input);
    $conditions.appendChild($label);
  });

  $list.appendChild($title);
  $list.appendChild($conditions);

  return $list;
}

function createTableList(data) {
  const $elem = document.createElement('tr');
  $elem.innerHTML = `
      <td>${data.code}</td>
      <td>${data.x}</td>
      <td>${data.y}</td>
      <td>${data.sales.toLocaleString()}</td>
  `;

  return $elem;
}

function dataProcessing(data, conditions) {
  const filteredData = data.filter(item => {
    if (
      item.x >= conditions.x[0] && item.x < conditions.x[1] &&
      item.y >= conditions.y[0] && item.y < conditions.y[1] &&
      item.sales >= conditions.sales[0] && item.sales < conditions.sales[1]
    ) return true;
  });

  return filteredData;
}

function conditionProcessing(data, conditions) {
  data.map(item => {
    const checkedCondition = item.conditions.filter(condition => condition.checked);
    let conditionValues = [];

    checkedCondition.forEach(condition => {
      conditionValues.push(...condition.value)
    });

    conditions[item.name] = [
      Math.min(...conditionValues),
      Math.max(...conditionValues)
    ];
  });

  return conditions;
}

// ---- main
const main = function () {
  const $filterList = document.querySelector('.filter ul');
  const $filterBtn = document.querySelector('.filter .btn-search');
  const $tableList = document.querySelector('.list table tbody');

  let conditions = { x: [], y: [], sales: [] };
  let filteredData;

  // * Functions
  function onClickInput(e) {
    const $target = e.currentTarget;
    const name = $target.name;
    const idx = $target.id.split('_')[1];

    const relationObject = relation.find(item => item.name == name);

    if ( idx == 'all' ) {
      const $inputs = $filterList.querySelectorAll(`input[name="${name}"]:not([id*="all"])`);
      $inputs.forEach(elem => elem.checked = false);

      relationObject.conditions.map(item => item.checked = $target.checked);
    } else {
      relationObject.conditions[idx].checked = $target.checked;
    }
  }

  function onClickBtnFilter() {
    conditions = conditionProcessing(relation, conditions);
    filteredData = dataProcessing(datas, conditions);

    $tableList.innerHTML = '';
    filteredData.map(item => {
      const $list = createTableList(item);
      $tableList.appendChild($list);
    });
  }

  // * Events
  // condition 처리
  conditions = conditionProcessing(relation, conditions);

  // data 처리
  filteredData = dataProcessing(datas, conditions);

  // list 생성
  filteredData.map(item => {
    const $list = createTableList(item);
    $tableList.appendChild($list);
  });
  
  // filter 생성
  relation.map(item => {
    const $list = createFilterList(item);
    $filterList.appendChild($list);
  });

  // input 이벤트
  const $inputs = $filterList.querySelectorAll('input');
  $inputs.forEach(item => item.addEventListener('click', onClickInput));
  $filterBtn.addEventListener('click', onClickBtnFilter);
};
window.addEventListener('load', main);