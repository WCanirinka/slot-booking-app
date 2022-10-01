import React from 'react';
import ReactDom from 'react-dom';
import Select from 'react-select';

const StorageSelect = ({actes, onSelectCallback}) => {
  const parsedActes = (actes) => {
    return actes.map(({name, id}) => {
      return { label: name, value: id };
    })
  }

  const seeSelected = ({value}) => {
    return actes.find((storage) => storage.id === value)
  }

  return <div className='row m-5'>
    <div className='col-6 offset-3 bg-white p-5'>
      <div className='mb-3'>
        <h4>Select storage</h4>
      </div>
      <div className='mb-3'>
        <Select actes={parsedActes(actes)} onChange={(value) => onSelectCallback(seeSelected(value))} />
      </div>
    </div>
  </div>
}

export default StorageSelect;