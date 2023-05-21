import React, { FC } from "react";
import { CurrencyList } from "../api/CurrencyList";
import TextField from "@mui/material/TextField";
import { RxCrossCircled } from "react-icons/rx";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "styled-components";

const ConverterWrap = styled.div`
  text-align: center;
`;

const TextFieldWrap = styled.div`
  display: flex;
  padding-left: 20px;
  margin-top: 20px;
`;

const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -30px;
  cursor: pointer;
`;

type ICurrency = {
  currencies: string;
  CurrencyHandler: (e: SelectChangeEvent) => void;
  amount: string;
  AmountHandelr: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickDelete: () => void;
};

const Converter: FC<ICurrency> = ({
  currencies,
  CurrencyHandler,
  amount,
  AmountHandelr,
  onClickDelete,
}) => {
  return (
    <ConverterWrap>
      <FormControl required sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">currency</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          label="currency"
          value={currencies}
          onChange={CurrencyHandler}
        >
          {CurrencyList.map((item) => (
            <MenuItem key={item.id} value={item.type}>
              {item.type.toUpperCase()} / {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextFieldWrap>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "250px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            variant="standard"
            value={amount}
            onChange={AmountHandelr}
          />
        </Box>
        <DeleteBtn onClick={onClickDelete}>
          <RxCrossCircled size={18} />
        </DeleteBtn>
      </TextFieldWrap>
    </ConverterWrap>
  );
};

export default Converter;
