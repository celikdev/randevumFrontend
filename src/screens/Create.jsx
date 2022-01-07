import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Header, Loader } from "../components/main";
import { Button, MainContainer } from "../components/main/UI";

import StarRatings from "react-star-ratings";
import { decodeToken } from "react-jwt";

//BUG:Mobilde Seçilen İptal Edilirken Görsel Problem Var

const Create = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem("token");
  const user = decodeToken(token);
  console.log(user.id);
  const { businessID } = useParams();
  const [data, setData] = useState([]);

  const [selectedDate, setSelecetedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/businesses/${businessID}`)
        .then((res) => setData(res.data));
    } else {
      navigate("/login");
    }
  }, []);

  const handleCreate = () => {
    axios.post(`${API_URL}/meets`, {
      userID: user.id,
      businessID,
    });
  };
  return (
    <>
      <Header />
      <MainContainer>
        <div className="w-11/12 md:w-4/5 flex flex-col gap-4 items-center bg-boxColor box-shadow py-8 rounded-lg">
          <h1 className="font-bold text-xl text-textColor">Oluştur</h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-x-12 w-full px-4 md:px-16">
            <img
              src={data.businessImage}
              alt="businessImage"
              className="w-full md:w-1/3"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-textColor text-lg font-semibold">
                {data.businessName}
              </h1>
              <h1 className="text-textColor text-sm">
                {data.businessCategory}
              </h1>
              <p className="text-textColor pt-4 text-sm">
                {data.businessAddress} <br /> {data.businessIlce} /{" "}
                {data.businessCountry}
              </p>
              {/* <div className="flex gap-x-1 pt-8 items-center">
                <StarRatings
                  rating={3.4}
                  starSpacing="1px"
                  starDimension="20px"
                  starRatedColor="#ff4757"
                  numberOfStars={5}
                />
                <h1 className="text-textColor pt-1 font-semibold text-xs">
                  ({data.businessPoint})
                </h1>
              </div> */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-textColor font-semibold text-sm">
                    Randevu Tarihini Seçiniz
                  </h1>
                  {data.businessMeetDates ? (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4">
                      {data.businessMeetDates.map((meetDate, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setSelecetedDate(
                              meetDate == selectedDate ? "" : meetDate
                            )
                          }
                          className={`${
                            selectedDate == meetDate
                              ? "border-transparent bg-textColor text-boxColor"
                              : ""
                          } border-2 border-borderAndOtherRed text-textColor font-semibold px-2 py-2 rounded-lg text-sm transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent`}
                        >
                          {meetDate}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <Loader />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-textColor font-semibold text-sm">
                    Randevu Saatini Seçiniz
                  </h1>
                  {data.businessMeetTimes ? (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2">
                      {data.businessMeetTimes.map((meetTime, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setSelectedTime(
                              meetTime == selectedTime ? "" : meetTime
                            )
                          }
                          className={`${
                            selectedTime == meetTime
                              ? "border-transparent bg-textColor text-boxColor"
                              : "text-textColor border-borderAndOtherRed "
                          } border-2 font-semibold px-2 py-2 rounded-lg text-sm transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent`}
                        >
                          {meetTime}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center pt-4">
                <Button disabled={!selectedTime || !selectedDate}>
                  Randevu Oluştur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default Create;