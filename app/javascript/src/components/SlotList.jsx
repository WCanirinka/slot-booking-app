import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import Slot from "./Slot";

const SlotList = ({reservedSlots, storage, date, period}) => {
  const beginActions = () => {
    let startHour = moment(date).set({hours: 0, minutes: 0, seconds: 0});
    let endHour = moment(date).set({hours: 24, minutes: 0, seconds: 0});
    let slotChoices = []

    while (startHour < endHour) {
      let time = startHour.clone();
      slotChoices.push(time);
      startHour = startHour.add(period, 'minutes');
    }
    return slotChoices;
  }

  const isSlotBooked = (time) => {
    let isBooked = false;
    bookedSlots.forEach((slot) => {
      let slotStartTime = moment.utc(slot.startTime)
      let startTime = time.clone()
      let slotEndTime = moment.utc(slot.endTime)
      let endTime = time.clone()
      endTime.add(period, 'minutes')

      if (startTime.isBetween(slotStartTime, slotEndTime) ||
          endTime.isBetween(slotStartTime, slotEndTime) ||
          slotStartTime.isBetween(startTime, endTime) ||
          slotEndTime.isBetween(startTime, endTime) ||
          startTime.isSame(slotStartTime) ||
          endTime.isSame(slotEndTime)) {
            isBooked = true
      }
    })
    return isBooked
  }

  const showSlots = () => {
    let actes = beginActions();
    let items = actes.map((time) => {
      if (isSlotBooked(time)) {
        return <Slot key={time.toString()}
                      time={time}
                      period={period}
                      available={false}
                      storage={storage} />
      } else {
        return <Slot key={time.toString()}
                      time={time}
                      period={period}
                      available={false}
                      storage={storage} />
      }
    })
    return items;
  }

  const pickedDate = () => {
    return moment(date).format("MM Do YYYY")
  }

  return <div className='row m-5'>
    <div className='col-6 offset-3 bg-white p-5'>
      <div className='mb-3'>
        <h4>Select available slot {pickedDate()}</h4>
      </div>
      <div className='mb-3'>
        <ul className='list-group'>
          {showSlots()}
        </ul>
      </div>
    </div>
  </div>
}

export default SlotList;