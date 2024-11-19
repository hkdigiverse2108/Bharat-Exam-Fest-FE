import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimeSelector({
  confirm,
  setConfirm,
  onChangeTimeRange,
  onTimeRangeChange,
}) {
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");

  const [startTime, setStartTime] = useState(todayStartOfTheDay);
  const [endTime, setEndTime] = useState(todayStartOfTheDay);
  const [totalDuration, setTotalDuration] = useState("");

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
    calculateDuration(newValue, endTime);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
    calculateDuration(startTime, newValue);
  };

  const calculateDuration = (start, end) => {
    if (start && end) {
      const duration = dayjs(end).diff(dayjs(start), "minute");
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      const durationString = `${hours}h ${minutes}m`;
      setTotalDuration(durationString);
      onChangeTimeRange(durationString);
    }
  };

  const handleSave = () => {
    setConfirm(); // Call the confirm function
    onTimeRangeChange( totalDuration );
  };

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
            <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white bg-clip-border">
              <div className="w-full flex items-center text-nowrap">
                <p className="text-md w-full font-semibold text-slate-900 uppercase">
                  Start Time
                </p>
                <p className="text-md w-full font-semibold text-slate-900 uppercase">
                  End Time
                </p>
              </div>
              <div className="flex items-center justify-around border-t border-gray-600 w-full py-4">
                {/* Start Time */}
                <div className="border border-gray-400 rounded-lg p-2 space-y-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={startTime}
                      onChange={handleStartTimeChange}
                      disablePast
                      renderInput={(params) => (
                        <input {...params} className="border rounded p-2" />
                      )}
                      // textField={(params) => (
                      //   <TextField {...params} variant="outlined" />
                      // )}
                    />
                  </LocalizationProvider>
                </div>
                {/* End Time */}
                <div className="border border-gray-400 rounded-lg space-y-4 p-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={endTime}
                      onChange={handleEndTimeChange}
                      disablePast
                      renderInput={(params) => (
                        <input {...params} className="border rounded p-2" />
                      )}
                      // textField={(params) => (
                      //   <TextField {...params} variant="outlined" />
                      // )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              {totalDuration && (
                <div className="text-lg font-semibold">
                  Total Duration: {totalDuration}
                </div>
              )}
              <button
                onClick={handleSave}
                data-modal-toggle="deleteModal"
                type="button"
                className="py-2 px-24 max-w-md text-md font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export default function TimeSelector({ confirm, setConfirm }) {
//   const today = dayjs();
//   const yesterday = dayjs().subtract(1, "day");
//   const todayStartOfTheDay = today.startOf("day");
//   return (
//     <>
//       <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
//         <div className="flex items-center justify-center min-h-screen text-center sm:block">
//           <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//           </div>
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>

//           <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4  text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
//             <div className="relative space-y-4 w-full flex flex-col items-center rounded-xl p-4 overflow-hidden text-slate-700 bg-white  bg-clip-border">
//               <div className="w-full flex items-center text-nowrap">
//                 <p className="text-md w-full font-semibold text-slate-900 uppercase">
//                   Start Time
//                 </p>
//                 <p className="text-md w-full font-semibold text-slate-900 uppercase">
//                   End Time
//                 </p>
//               </div>
//               <div className="flex items-center  justify-around border-t border-gray-600 w-full py-4">
//                 {/* start time */}
//                 <div className="border border-gray-400 rounded-lg p-2 space-y-4">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DemoContainer
//                       components={[
//                         "DatePicker",
//                         "DateTimePicker",
//                         "TimePicker",
//                         "DateRangePicker",
//                         "DateTimeRangePicker",
//                       ]}
//                     >
//                       <DemoItem>
//                         <TimePicker
//                           defaultValue={todayStartOfTheDay}
//                           disablePast
//                         />
//                       </DemoItem>
//                     </DemoContainer>
//                   </LocalizationProvider>
//                 </div>
//                 {/* end time */}
//                 <div className="border border-gray-400 rounded-lg  space-y-4 p-2">
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DemoContainer
//                       components={[
//                         "DatePicker",
//                         "DateTimePicker",
//                         "TimePicker",
//                         "DateRangePicker",
//                         "DateTimeRangePicker",
//                       ]}
//                     >
//                       <DemoItem>
//                         <TimePicker
//                           defaultValue={todayStartOfTheDay}
//                           disablePast
//                         />
//                       </DemoItem>
//                     </DemoContainer>
//                   </LocalizationProvider>
//                 </div>
//               </div>
//               <button
//                 onClick={setConfirm}
//                 data-modal-toggle="deleteModal"
//                 type="button"
//                 className="py-2 px-24 max-w-md text-md font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
