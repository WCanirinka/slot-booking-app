import React, { useState, useEffect, useCallback, Fragment } from "react";
import ReactDom from "react-dom";
import ApiClient from './lib/apiClient';
import StorageSelect from "./components/StorageSelect";
import SlotRequestForm from "./components/SlotRequestForm";
import SlotList from "./components/SlotList"

const App = () => {
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState(0)
  const [selectedDate, setSelectedDate] = useState(0)
  const [storageAction, setStorageAction] = useState([])
  const [selectedSlot, setSelectedSlot] = useState([])
  const [seeSlotAction, setSeeSlotAction] = useState(false)

  const fetchStorageAction = useCallback(() => {
    ApiClient.findAll('storages').then(({data}) => {
      setStorageAction(data)
    })
  }, [])

  useEffect(() => {
    fetchStorageAction()
  }, [fetchStorageAction])

  const renderForm = () => {
    if (selectedStorage) {
      return <SlotRequestForm storage={selectedStorage} setSelectedSlot={setSelectedSlot} setSeeSlotAction={setSeeSlotAction} setSelectedPeriod={setSelectedPeriod} setSelectedDate={setSelectedDate} />
    }
  }

  const renderSlots = () => {
    if (seeSlotAction) {
      return <SlotList selectedSlot={selectedSlot} storage={selectedStorage} period={selectedPeriod} date={selectedDate} />
    }
  }

  return <Fragment>
    <StorageSelect actes={storageAction} onSelectCallback={setSelectedStorage} />
    {renderForm()}
    {renderSlots()}
  </Fragment>
}

export default App;