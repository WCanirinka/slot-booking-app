import React, {useState} from 'react';
import ReactDom from 'react-dom';
import DatePicker from 'react-datepicker';
import ApiClient from '../lib/apiClient';

const today = new Date()
const minDate = new Date(today)
minDate.setDate(today.getDate() + 1)

const SlotRequestForm = ({storage, setBookedSlot, setShowSlotActions, setPickedPeriod, setPickedDate}) => {
  const [date, setDate] = useState(minDate);
  const [period, setPeriod] = useState(0);
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(period)) {
      setError('Set period!')
    } else if ((period %15) !== 0) {
      setError('Period set in 15 minutes intervals')
    } else if (period <= 0) {
      setError('Period has to be greater than zero')
    } else if (date < minDate) {
      setError(`Date must be greater than of ${minDate}!`)
    } else {
      ApiClient.findAll('slots', {filter: { date: date, storage_id: storage.id }}, { include: 'storage'})
                .then(({data}) => {
                  setPickedDate(date)
                  setPickedPeriod(period)
                  setBookedSlot(data)
                  setShowSlotActions(true)
                  setError('')
                })
    }
  }

  const errorAlert = () => {
    if(error.length > 0) {
      return <div className='alert alert-danger' role='alert'>
        {error}
      </div>
    }
  }

  return <div className='row m-5'>
    <div className='col-6 offset-3 bg-white p-5'>
      <h4 className='mb-3'>Check storage <strong>{storage.name}</strong> availability</h4>
    </div>
    <form onSubmit={handleSubmit}>
      {errorAlert()}
      <div className='mb-3'>
        <label className='form-label'>Date</label>
        <DatePicker className='form-control' minDate={minDate} selected={date} onChange={(date) => setDate(date)} />
        <div className='form-text'>Select date for your time slot</div>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Period</label>
        <div className='input-group'>
          <input type='number' min={0} interval={15} value={period} onInput={({currentTarget}) => setPeriod(parseInt(currentTarget.value))} className='form-control' aria-describedby='minAddon' />
          <span className='input-group-text' id='minAddon'>min</span>
        </div>
        <div id='selectHelp' className='form-text'>Period for time slot</div>
      </div>
      <input type='submit' value='Submit' className='btn btn-primary' />
    </form>
  </div>
}

export default SlotRequestForm;