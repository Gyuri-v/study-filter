// import relation from '../data/arrayRelation' assert { type: "json" };
// import datas from '../data/arrayData' assert { type: "json" };


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
    `;

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
  const $inputsSeleted = $form.querySelectorAll('input:checked');
  const $inputsAll = $form.querySelectorAll('input[name*=all]');
  let filteredData = [...data];
  let conditions = {};
  
  $inputsSeleted.forEach(item => {
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

  for (let i = 0; i < $inputsAll.length; i++) {
    const $inputAll = $inputsAll[i];
    const key = $inputAll.name.replace('_all', '');

    if ( !conditions[key] ) {
      $inputAll.click();
    } else {
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

  function onClickInput (e) {
    const $target = e.currentTarget;
    const name = $target.name;

    const $inputs = $filterList.querySelectorAll(`input[name="${name}"]:not([name*="all"])`);
    const $inputsSeleted = $filterList.querySelectorAll(`input[name="${name}"]:checked`);
    const $inputsAll = $filterList.querySelector(`input[name="${name}_all"]`);

    $inputsAll.checked = $inputsSeleted.length == $inputs.length ? true : false;
  }

  function onClickInputAll (e) {
    const $target = e.currentTarget;
    const name = $target.name.replace('_all', '');

    const $inputs = $filterList.querySelectorAll(`input[name="${name}"]:not([name*="all"])`);
    $inputs.forEach(item => item.checked = $target.checked); 
  }

  renderFilter(relation, $filterList);

  const $inputs = $filterList.querySelectorAll('input:not([name*=all])');
  const $inputsAll = $filterList.querySelectorAll('input[name*=all]');
  $inputs.forEach(item => item.addEventListener('click', onClickInput))
  $inputsAll.forEach(item => item.addEventListener('click', onClickInputAll));
  $filterBtn.addEventListener('click', onClickBtnFilter);
  $filterBtn.click();
}
window.addEventListener('load', main);


// onClick 이벤트들도 빼는게 좋은지
// $inputsAll 이런 애들은 한번만 선언하고 넘겨주는게 좋은지

// * 리뷰
// 초기 설정값 변경하고자 하면 -- 하면 전체가 클릭될 필요가 없지
// 전체 일때는 나머지가 해제 되게끔
// input의 체크될때마다 data를 따로 
// - 랑 + infinity 로 퉁
// all 따로 갖고 있지 않음 -- input cheked 가 아닌 all이 아닌것들로 / 하나로 해결하게끔
// 파라미터로 돔 말고, conditions 를 보내고 가져와서 돔에 뿌려주는거는 다르게 
// inputAll 을 안 쓰는 방향으로
// renderFilte string 값만 return 되게 해서 innerHtml 을 안에서
// dom 을 가져가지 않도록
// elem 분리하고, 필터도 어떤 값이든 넣을 수 있게
// 검색은 전체가 되게끔이 아니라 위의 상태값 그대로
// _all 안쓰면 안생기게
// hasOwnPropertys -> if ( values )
// forEach -> 