import relation from '../data/arrayRelation' assert { type: "json" };
import datas from '../data/arrayData' assert { type: "json" };

const filterList = function () {
  const $container = document.querySelector('.container');

  const $filter = $container.querySelector('.filter');
  const $filterUl = $filter.querySelector('ul');
  const $filterBtn = $filter.querySelector('.btn-search');
  const filterInputsObj = {};

  const $list = $container.querySelector('.list');
  const $listTable = $list.querySelector('table');
  const $listTbody = $listTable.querySelector('tbody');
  const listTrArray = [];

  // setting
  const setFilter = function () {
    for (let i = 0; i < relation.length; i++) {
      const relationRow = relation[i];
      
      const $filterLi = document.createElement('li');
      let $filterContents = '';
      $filterContents += `<strong class="tit">${relationRow.title}</strong>`;
      $filterContents += `<div class="conditions">`;
      for (let j = 0; j < relationRow.conditions.length; j++) {
        const condition = relationRow.conditions[j];
        let conditionState = condition.replace(/%/g, '');
        conditionState = conditionState.replace(/억/g, '00000000');
        conditionState = conditionState.replace('~', '&&');
        conditionState = conditionState.replace(/이상/g, '<= value');
        conditionState = conditionState.replace(/미만/g, '> value');
        conditionState = conditionState.replace(/전체/g, 'true');
        
        $filterContents += `  <span class="checkbox">`;
        $filterContents += `    <input type="checkbox" title="${relationRow.title}" name="${condition == '전체' ? relationRow.name+'_all' : relationRow.name}" id="${relationRow.name}_${j}" value="${conditionState}">`;
        $filterContents += `    <label for="${relationRow.name}_${j}">${condition}</label>`;
        $filterContents += `  </span>`;
      }
      $filterContents += `</div>`;

      $filterLi.innerHTML = $filterContents;
      $filterUl.appendChild($filterLi);
    }

    filterInputsObj.growth = { 
      all: $filter.querySelector('input[name="growth_all"]'), 
      array: $filter.querySelectorAll('input[name="growth"]') 
    };
    filterInputsObj.competition = { 
      all: $filter.querySelector('input[name="competition_all"]'), 
      array: $filter.querySelectorAll('input[name="competition"]') 
    };
    filterInputsObj.directorsamount = { 
      all: $filter.querySelector('input[name="directorsamount_all"]'), 
      array: $filter.querySelectorAll('input[name="directorsamount"]') 
    };

    const onClickInput = function (e) {
      const $target = e.currentTarget;
      const name = $target.name;

      const $checkedInput = $filter.querySelectorAll(`input[name="${name}"]:checked`);
      filterInputsObj[name].all.checked = filterInputsObj.growth.array.length == $checkedInput.length ? true : false;
    }

    const onClickSelectAll = function (e) {
      const $target = e.currentTarget;
      const name = $target.name.replace('_all', '');

      filterInputsObj[name].array.forEach(item => item.checked = $target.checked); 
    }

    for (const key in filterInputsObj) {
      if (Object.hasOwnProperty.call(filterInputsObj, key)) {
        const values = filterInputsObj[key];
        values.array.forEach(item => item.addEventListener('click', onClickInput));
        values.all.addEventListener('click', onClickSelectAll);
      }
    }
  }

  const setList = function () {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      
      const $listTr = document.createElement('tr');
      let $listTrContents = '';
      $listTrContents += `<td>${data.code}</td>`;
      $listTrContents += `<td>${(data.x*1).toLocaleString()} %</td>`;
      $listTrContents += `<td>${(data.y*1).toLocaleString()}</td>`;
      $listTrContents += `<td>${(data.sales*1).toLocaleString()} 원</td>`;

      $listTr.innerHTML = $listTrContents;
      $listTr.dataset.code = data.code;
      $listTr.dataset.growth = data.x*1;
      $listTr.dataset.competition = data.y*1;
      $listTr.dataset.directorsamount = data.sales*1;
      $listTbody.appendChild($listTr);
      listTrArray.push($listTr);
    }
  }


  // event
  const onClickBtnFilter = function () {
    const $checkedInputs = $filterUl.querySelectorAll('input:checked');

    const matchConditionsObj = {};
    let matchListArray = [];
    let conditionName, condition;
      
    // 조건 가져오기
    for (let i = 0; i < $checkedInputs.length; i++) {
      const $checkedInput = $checkedInputs[i];
      conditionName = $checkedInput.name;
      condition = $checkedInput.value;

      matchConditionsObj[conditionName] = matchConditionsObj[conditionName] ? `${matchConditionsObj[conditionName]} || ${condition}` : `${condition}`;
    }

    // 조건에 맞는 elem 배열 필터링
    const matchArray = listTrArray.filter((item, idx) => {
      for (let i = 0; i < Object.keys(matchConditionsObj).length; i++) {
        const conditionKey = Object.keys(matchConditionsObj)[i];
        const conditionValue = Object.values(matchConditionsObj)[i];

        const value = item.getAttribute(`data-${conditionKey}`);
        if ( !eval(conditionValue) ) return;
      }
      return item;
    });
    matchListArray = [...matchArray];


    // tbody 재배치
    $listTbody.innerHTML = '';
    matchListArray.forEach(item => $listTbody.appendChild(item));
  }

  setFilter();
  setList();
  $filterBtn.addEventListener('click', onClickBtnFilter);
}
window.addEventListener('load', filterList);


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