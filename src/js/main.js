import relation from '../data/arrayRelation.json' assert { type: "json" };
import datas from '../data/arrayData.json' assert { type: "json" };

function renderFilter (data, elem) {
  data.forEach((item, index) => {
    const $li = document.createElement('li');

    const $title = document.createElement('strong');
    $title.classList.add('title');
    $title.innerText = item.title;

    const $conditions = document.createElement('div');
    $conditions.classList.add('conditions');
    $conditions.innerHTML = `
      <input type="checkbox" name="${item.name}_all" id="${item.name}_all">
      <label for="${item.name}_all">전체</label>
    `

    // const $inputAll = document.createElement('input');

    item.conditions.forEach((condition, index) => {
      const $input = document.createElement('input');
      $input.setAttribute('type', 'checkbox');
      $input.setAttribute('name', item.name);
      $input.setAttribute('id', `${item.name}_${index}`);
      $input.setAttribute('value', condition.value);

      const $label = document.createElement('label');
      $label.setAttribute('for', `${item.name}_${index}`);
      $label.innerText = condition.label;

      $conditions.appendChild($input);
      $conditions.appendChild($label);
    });

    $li.appendChild($title);
    $li.appendChild($conditions);
    
    elem.appendChild($li);
  });
}

function renderList (data, elem) {
  elem.innerHTML = '';
  data.forEach((item, index) => {
    const $tr = document.createElement('tr');

    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        const values = item[key];
        const $td = document.createElement('td');
        $td.innerText = values;
        $tr.appendChild($td);
      }
    }

    elem.appendChild($tr);
  });
}

function filterData (data, $form) {
  const $selectedInputs = $form.querySelectorAll('input:checked');
  let filteredData = [...data];
  let conditions = {};
  

  $selectedInputs.forEach(item => {
    const name = item.name;
    const value = item.value.split(',');

    if ( conditions[name] ) {
      const array = [...value, ...conditions[name]];
      const min = Math.min(...array);
      const max = Math.max(...array);
      
      conditions[name] = [min, max];
    } else {
      conditions[name] = [...value];
    }
  });

  for (const key in conditions) {
    if (Object.hasOwnProperty.call(conditions, key)) {
      const value = conditions[key];

      filteredData = filteredData.filter(item => {
        if ( item[key] >= value[0] && item[key] < value[1] ) {
          return true
        }
        return false;
      });
    }
  }

  return filteredData;
}

const main = function () {
  const $filterList = document.querySelector('.filter ul');
  const $filterForm = document.querySelector('.filter-form');
  const $filterBtn = document.querySelector('.filter .btn-search');
  const $listTable = document.querySelector('.list table tbody');

  function onClickBtnFilter () {
    const filteredData = filterData(datas, $filterForm);
    renderList(filteredData, $listTable);
  }
  
  renderList(datas, $listTable);
  renderFilter(relation, $filterList);
  $filterBtn.addEventListener('click', onClickBtnFilter);
}

window.addEventListener('load', main);




/*

data = 현재 상태(옵션의)
비교하는 로직
결과 = 상태값

html 에는 어떤 데이터값도 넣지않음

데이터변수를 관리 -> 렌더링은 뿌려만

기능을 구분
1. 필터링 영역 - 데이터 / 뿌려지는 분리
2. 보여지는 영역 - 데이터 / 렌더링 분리

!! 데이터 / 뿌려주는 영역 / 컨트롤 영역 분리해서 작업

input 영역들 form > fildset + legend 으로 감싸기 -- 안에서 Li 묶고 -- submit 

index.html 으로 열어서 볼 수 있도록

처방조제액

*/