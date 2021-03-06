import React, { useState, useEffect } from "react";
import { Header, Error } from "../components/main";
import {
  Box,
  BusinessCard,
  Button,
  Input,
  MainContainer,
} from "../components/main/UI";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import axios from "axios";

//TODO:User Image Ekleme Yapılacak

const Register = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [cookie, setCookies] = useCookies(["token"]);

  const token = cookie.token;

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [KVKK, setKVKK] = useState(false);
  const [announcement, setAnnouncement] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleRegister = () => {
    if (firstPassword === secondPassword) {
      axios
        .post(`${API_URL}/auth/register`, {
          userName: name,
          userSurname: surname,
          userEmail: email,
          userPassword: firstPassword,
          userPhone: phone,
          KVKK,
          announcement,
        })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          navigate("/register/email-verification");
        })
        .catch((err) => {
          setError(true);
          setErroMessage(err.response.data);
        });
    }
  };
  return (
    <>
      <Header />
      <MainContainer>
        <Box className="w-5/6 md:w-1/3">
          <h1 className="font-bold text-xl text-textColor">Kayıt Ol</h1>
          <Error error={error}>{errorMessage}</Error>
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex flex-col md:flex-row gap-x-8 gap-y-4">
              <Input
                setError={setError}
                inputType="text"
                value={name}
                setState={setName}
                placeholder="İsim"
              />
              <Input
                setError={setError}
                inputType="text"
                value={surname}
                setState={setSurname}
                placeholder="Soyisim"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 gap-y-4">
              <Input
                setError={setError}
                inputType="email"
                value={email}
                setState={setEmail}
                placeholder="E-Posta"
              />
              <Input
                setError={setError}
                inputType="tel"
                value={phone}
                setState={setPhone}
                placeholder="Telefon"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 gap-y-4">
              <Input
                setError={setError}
                inputType="password"
                value={firstPassword}
                setState={setFirstPassword}
                placeholder="Şifre"
              />
              <Input
                setError={setError}
                inputType="password"
                value={secondPassword}
                setState={setSecondPassword}
                placeholder="Şifre Tekrar"
              />
            </div>
            <div className="flex flex-col w-10/12 gap-x-8 gap-y-4 items-center">
              <label className="text-textColor text-xs flex items-center gap-1">
                <input
                  value={KVKK}
                  onClick={() => setKVKK(!KVKK)}
                  type="checkbox"
                />
                <span className="flex">
                  <a
                    target="_blank"
                    href="https://randevum.tech/privacy-policy"
                  >
                    Gizlilik Politikası
                  </a>
                  'nı Okudum ve Kabul Ediyorum
                </span>
              </label>
              <label className="text-textColor text-xs flex items-center gap-1">
                <input
                  value={announcement}
                  onClick={() => setAnnouncement(!announcement)}
                  type="checkbox"
                />
                <h1>
                  Duyuru ve Son Güncellemeleri SMS ve Posta Olarak Almayı Kabul
                  Ediyorum
                </h1>
              </label>
            </div>
          </div>
          <Button
            onClick={handleRegister}
            disabled={
              !name ||
              !surname ||
              !email ||
              !phone ||
              !firstPassword ||
              !secondPassword ||
              !KVKK
            }
          >
            Kayıt Ol
          </Button>
        </Box>
        <BusinessCard href="https://business.randevum.tech/register">
          İşletme Kaydı İçin Tıklayınız
        </BusinessCard>
      </MainContainer>
    </>
  );
};

export default Register;
