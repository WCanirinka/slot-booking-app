import React from 'react';
import moment from 'moment';
import ReactDom from 'react-dom';
import ApiClient from '../lib/apiClient';

const Slot = ({time, storage, period, available}) => {
  const bookSlot = (e) => {
    e.preventDefault()

    let startTime = moment(time).utc().format()
    let endTime = moment(time.add(period, 'minutes')).utc().format()
    ApiClient.create('slot', {
      startTime: startTime,
      endTime: endTime,
      storageId: storage.id,
    }).then(({data}) => {
      let startTime = moment(data.startTime)
      let endTime = moment(data.endTime)
      window.alert(`A slot has been booked from ${startTime.format('HH:mm')} to ${endTime.format('HH:mm')}`)
      window.location.reload()
    }).catch(() => {
      window.alert('Unsuccessful booking of the slot')
      window.location.reload()
    })
  }

  const bookSlotBtn = () => {
    if(available) {
      return <button className="btn btn-primary" onClick={bookSlot}>Reserve Slot</button>
    }
  }

  const timeIndicator = () => {
    indicatedTime = time.clone();
    return `From ${indicatedTime.format('HH:mm')} to ${indicatedTime.add(period, 'minutes').format('HH:mm')}`
  }

  return <li className={`list-group-item ${available ? 'bg-success' : 'bg-danger'}`}>
    <div className='row'>
      <div className='col-9'>
        <strong>Slot</strong>
        <br />
        <em>{timeIndicator()}</em>
      </div>
      <div className='col-3'>
        {bookSlotBtn()}
      </div>
    </div>
  </li>
}

export default Slot;
