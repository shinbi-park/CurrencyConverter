import React, { useEffect, useState } from "react";
import Converter from "../component/Converter";
import axios from "axios";
import { CurrencyList } from "../api/CurrencyList";
import { TbEqual } from "react-icons/tb";
import { styled } from "styled-components";
import { Typography } from "@mui/material";

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  border: 2px solid #d8dee1;
  padding: 20px;
`;

const ConverTitle = styled.div`
  padding-bottom: 20px;
`;

const EqualIcon = styled.div`
  margin: 0 20px;
`;

const Main = () => {
  const [curFrom, setCurFrom] = useState<string>("");
  const [curTo, setCurTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("1000");
  const [isAmount, setIsAmount] = useState<boolean>(true);
  const [ConvertData, setConvertData] = useState<number>(1);

  const getValueFirst = async () => {
    await axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/krw.json`
      )
      .then((response) => {
        const targetCurrency = CurrencyList[29].type;
        const CurrentCurrency = Object.keys(response.data)[1];
        setCurFrom(CurrentCurrency);
        setCurTo(targetCurrency);
        setConvertData(response.data[CurrentCurrency][targetCurrency]);
      });
  };

  useEffect(() => {
    getValueFirst();
  }, []);

  let toConvert: string, fromConvert: string;
  const sanitizedAmount = amount.replace(/,/g, "");
  if (isAmount) {
    fromConvert = amount
      .replace(/[^\d]+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");

    toConvert = (parseFloat(sanitizedAmount) * ConvertData).toLocaleString();
    if (!fromConvert) {
      toConvert = "0";
    }
  } else {
    toConvert = amount
      .replace(/[^\d]+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");

    fromConvert = (parseFloat(sanitizedAmount) / ConvertData).toLocaleString();
    if (!toConvert) {
      toConvert = "0";
    }
  }

  const getValueChange = async () => {
    await axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curFrom}/${curTo}.json`
      )
      .then((response) => {
        setConvertData(response.data[curTo]);
      });
  };

  useEffect(() => {
    if (curFrom.length !== 0) {
      getValueChange();
    }
  }, [curFrom, curTo]);

  const onChangeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = String(e.target.value)
      .replace(/[^\d]+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    setAmount(e.target.value);
    setIsAmount(true);
  };

  const onChangeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = String(e.target.value)
      .replace(/[^\d]+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    setAmount(e.target.value);
    setIsAmount(false);
  };

  const onClickDelete = () => {
    setAmount("1");
  };

  return (
    <MainWrap>
      <MainContainer>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 2, display: { xs: "none", sm: "block" } }}
        >
          <ConverTitle>금액</ConverTitle>
        </Typography>

        <Converter
          currencies={curFrom}
          CurrencyHandler={(e) => {
            setCurFrom(e.target.value);
          }}
          amount={fromConvert}
          AmountHandelr={onChangeFromAmount}
          onClickDelete={onClickDelete}
        />
      </MainContainer>

      <EqualIcon>
        <TbEqual size={"60px"} />
      </EqualIcon>
      <MainContainer>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <ConverTitle>환율</ConverTitle>
        </Typography>

        <Converter
          currencies={curTo}
          CurrencyHandler={(e) => {
            setCurTo(e.target.value);
          }}
          amount={toConvert}
          AmountHandelr={onChangeToAmount}
          onClickDelete={onClickDelete}
        />
      </MainContainer>
    </MainWrap>
  );
};

export default Main;
