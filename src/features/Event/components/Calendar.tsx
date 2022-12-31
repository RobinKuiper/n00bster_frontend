// @flow 
import * as React from 'react';
import { Calendar as DatePicker } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"

import "react-multi-date-picker/styles/layouts/mobile.css"
// import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/colors/purple.css"

export const Calendar = () => {
    return (
        <DatePicker
            multiple
            fullYear={false}
            numberOfMonths={3}
            className="rmdp-mobile bg-dark purple"
            showOtherDays={false}
            weekStartDayIndex={1}
            onChange={() => console.log('date')}
            plugins={[
                <DatePanel />,
            ]}
            mapDays={({ date }) => {
                const isWeekend = [0, 6].includes(date.weekDay.index);

                // console.log(date)

                if(isWeekend){
                    return {
                        style: {
                            fontWeight: 'bold',
                            color: 'purple'
                        }
                    }
                }
            }}
        />
    );
};
