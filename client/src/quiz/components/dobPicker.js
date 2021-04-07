import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

/**
 * 
 * @returns a general date picker in the format dd/MM/yyy
 */
const DobPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="dobPicker">
    <DatePicker 
    id="DatePicker"
    dateFormat="dd/MM/yyyy"
    required
    selected={startDate}
    onChange={date => setStartDate(date)} 
    className="Datepicker pa2"
    placeholderText="Select a date"
    calendarClassName="rasta-stripes"
    popperModifiers={{
        offset: {
          enabled: true,
          offset: "0px, 0px"
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "scrollParent"
        }
      }}
    />
    </div>
  );
};

export default DobPicker