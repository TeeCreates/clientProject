import { useState } from "react";
import styled from "styled-components";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Form } from "./Form";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import { User } from "@auth0/auth0-react";
import { Loading } from "./Loading";
import { Services } from "./Services";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(1);
  const [padding, setPadding] = useState(0);
  const [numberLastMonth, setNumberLastMonth] = useState("");
  const [prevMonth, setPrevMonth] = useState(1);
  const [edit, setEdit] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  // const [displayedMonthNumber, setDisplayedMonthNumber] = useState("");

  const { setSeletectedDate, seletectedDate, accountEmail, servicesAndPrices } =
    useContext(UserContext);
  const handleIncrease = () => {
    setCurrentMonth(currentMonth + 1);
    setPadding(padding + 1);
    setPrevMonth(prevMonth - 1);
    setNumberLastMonth(previousMonthNumber - 1);
  };

  const handleDecrease = () => {
    setCurrentMonth(currentMonth - 1);
    setPadding(padding - 1);
    setPrevMonth(prevMonth + 1);
    setNumberLastMonth(previousMonthNumber - 1);
  };

  // console.log("test", numberLastMonth);

  // THIS ARRAY WILL HELP DETERMINE HOW MANY PADDING DAYS WE WILL NEED
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsInCalender = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dt = new Date();
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const current = new Date();
  current.setMonth(current.getMonth() - prevMonth);
  const previousMonthNumber =
    current.toLocaleString("default", {
      month: "numeric",
    }) - 1;

  // console.log(day, month, year);
  //(18 7 2022) it should 8 not 7, but it's because it's an index value

  const daysInMonth = new Date(year, month + currentMonth, 0).getDate();
  // month +2 will give me september
  // month -1 will give me last month

  // the 3rd value will indicate the first day of the month. When you give it a value of 0 it will provide you the
  //last day of the previous month.
  // 0 (last day of previous month)
  // -1 (second to last day of the previous month)
  // console.log("days in month", new Date(year, month + currentMonth, 0));

  const firstDayOfMonth = new Date(year, month + padding, 1);
  // 1 will give the first day

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // console.log("date string", dateString);
  const currentMonthNumber = new Date(new Date()).getMonth();
  const currentMonthWord = monthsInCalender[currentMonthNumber];

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  const displayedMonthWord = dateString.split(" ")[1];
  const displayedYear = dateString.split(" ")[3];
  // const prevMonth =

  const displayedMonthNumber = monthsInCalender.indexOf(displayedMonthWord);

  // console.log("padding days", paddingDays);

  let calenderDays = [];
  let paddingArrDays = [];
  let totalDisplayedCalender = [];
  const daySquare = () => {
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      if (i <= paddingDays) {
        let paddingDate = new Date(year, month, -i + 1).getDate();

        const prevMonth = new Date(year, month, -i + 1).toLocaleDateString(
          "en-us",
          {
            month: "long",
          }
        );
        const paddingObj = {
          day: paddingDate,
          monthWord: prevMonth,
          monthNumber: previousMonthNumber,
          year: displayedYear,
          max: 2,
          padding: "yes",
        };
        paddingArrDays.push(paddingObj);

        paddingArrDays.sort(function (a, b) {
          return a.day - b.day;
        });

        // console.log(paddingArrDays, "padding arr days");
      } else if (i > paddingDays) {
        const currentObj = {
          day: i - paddingDays,
          monthNumber: displayedMonthNumber,
          monthWord: displayedMonthWord,
          year: displayedYear,
          max: 2,
          padding: "no",
        };

        calenderDays.push(currentObj);
      }
    }
    paddingArrDays.forEach((day) => {
      totalDisplayedCalender.push(day);
    });

    calenderDays.forEach((day) => {
      totalDisplayedCalender.push(day);
    });
  };
  daySquare();
  // console.log(totalDisplayedCalender);
  // console.log("what?", new Date(year, month));

  const selectDate = (day) => {
    setSeletectedDate(day.monthWord + " " + day.day + " " + day.year);
  };

  let makeDate = new Date();
  // console.log("Original date: ", makeDate.toString());
  makeDate.setMonth(makeDate.getMonth() - 1);
  let lastMonthData = makeDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log("After subtracting a month: ", lastMonthData.split(", "));
  let splitLastMonthData = lastMonthData.split(",");
  let lastMonthNumber = splitLastMonthData[1];
  // console.log("actual previous month", lastMonthNumber);

  const isDateBeforeToday = (date) => {
    // console.log("date", date);
    let day = date.day;
    let monthNumber = date.monthNumber;
    // console.log("number", monthNumber);
    let year = date.year;

    return (
      new Date(new Date(year, monthNumber, day).toDateString()) <
      new Date(new Date().toDateString())
    );
  };

  console.log(edit);

  // const checkAvailability = () => {
  //   useEffect(()=>{

  //     fetch("")
  //   })
  // };

  const toggleEdit = () => {
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  //get all bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      await fetch("/api/booking-status-by-date", {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBookingStatus(data.data);
        });
    };
    fetchUserBookings();
  }, []);
  console.log("booking status", bookingStatus);
  //fecth all bookings
  // sort by date
  //max value 3
  // .length < max === can book

  const getIsBooked = (bookedStatus, date) => {
    // console.log("booking status", bookedStatus);
    // console.log(
    //   "test date phrase",
    //   date.monthWord + " " + date.day + " " + date.year
    // );
    // console.log(
    //   "result",
    //   typeof bookedStatus?.[date.monthWord + " " + date.day + " " + date.year]
    // );
    return (
      bookedStatus?.[date.monthWord + " " + date.day + " " + date.year] > 3
    );
  };
  return (
    <>
      {bookingStatus ? (
        <Container>
          <MonthSelecter>
            <BsFillArrowLeftCircleFill
              onClick={() => {
                handleDecrease();
              }}
            />
            <MonthDisplayed>{displayedMonthWord}</MonthDisplayed>
            <BsFillArrowRightCircleFill onClick={() => handleIncrease()} />
          </MonthSelecter>
          <Wrapper>
            <CalenderContainder>
              <Weekdays>
                <EachWeekDay>Sunday</EachWeekDay>
                <EachWeekDay>Monday</EachWeekDay>
                <EachWeekDay>Tuesday</EachWeekDay>
                <EachWeekDay>Wednesday</EachWeekDay>
                <EachWeekDay>Thursday</EachWeekDay>
                <EachWeekDay>Friday</EachWeekDay>
                <EachWeekDay>Saturday</EachWeekDay>
              </Weekdays>
              <CalenderDays>
                {totalDisplayedCalender.map((date, index) => {
                  return (
                    <Day
                      key={index}
                      isValid={!isDateBeforeToday(date)}
                      isEdit={edit}
                      isFullyBooked={getIsBooked(bookingStatus, date)}
                      onClick={() => {
                        if (!isDateBeforeToday(date)) {
                          selectDate(date);
                          date.max = date.max - 1;
                          console.log("max", date["max"]);
                        }
                      }}
                    >
                      {date.day}
                    </Day>
                  );
                })}
              </CalenderDays>
              {accountEmail === "thajanah_mk@hotmail.com" ? (
                <Edit onClick={() => toggleEdit()} isEdit={edit}>
                  edit
                </Edit>
              ) : null}
            </CalenderContainder>
            <div>
              <Form />
            </div>
          </Wrapper>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Calender;
const Day = styled.div`
  ${(props) =>
    (!props.isValid || props.isFullyBooked) &&
    `
    background: black;
    color: black;
    :hover{
      color:white
    }
  `}
  ${(props) =>
    props.isEdit &&
    `
    :hover{
background-color: pink;
    } 
   
  `}

  height: 100px;
  width: 100px;
  border: 1px solid black;
  margin: 5px;
`;

// const

const Weekdays = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 775px;
  margin-left: 5px;
`;
const EachWeekDay = styled.div`
  width: 150px;
  margin-right: 10px;
  margin-left: 10px;
  /* background: red; */
  display: flex;
  justify-content: center;
`;
const CalenderDays = styled.div`
  width: 870px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
`;

const CalenderContainder = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Edit = styled.button`
  ${(props) =>
    props.isEdit &&
    `
    background: black;
    color: white;
  `}
`;

const MonthSelecter = styled.div`
  padding: 20px;
  /* background-color: aquamarine; */
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
`;

const MonthDisplayed = styled.span`
  font-size: 20px;
  margin: 20px;
`;

const Container = styled.div`
  margin-bottom: 30px;
`;
