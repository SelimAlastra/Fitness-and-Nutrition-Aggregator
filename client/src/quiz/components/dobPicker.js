import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DobPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="dobPicker">
    <DatePicker 
    required
                    selected={startDate}
                    onChange={date => setStartDate(date)} 
                    dateFormat="Pp"
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