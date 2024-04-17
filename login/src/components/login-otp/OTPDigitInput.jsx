import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "reactstrap";

const OTPDigitInput = ({ noOfOtp, setOTP }) => {
  const [otp, setOtp] = useState(Array(noOfOtp).fill(""));
  useEffect(() => {
    setOTP(otp.join(""));
  }, [otp]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`digit${index}-input`);
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      }
    } else {
      moveToNext(index);
    }
  };

  const moveToNext = (index) => {
    if (otp[index] && index !== noOfOtp - 1) {
      const nextInput = document.getElementById(`digit${index + 2}-input`);
      nextInput.focus();
      nextInput.select();
    }
  };

  const handleChange = (e, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = e.target.value;
    setOtp(otpCopy);
  };

  return (
    <>
      {otp.map((item, index) => (
        <Col className={`col-4${12 / noOfOtp}`}>
          <div className="mb-3">
            <label htmlFor="digit1-input" className="visually-hidden">
              {`Digit ${index + 1}`}
            </label>
            <input
              type="text"
              className="form-control bg-light border-light text-center"
              style={{ fontSize: "1.5rem" }}
              maxLength="1"
              id={`digit${index + 1}-input`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e, index)}
              value={otp[index]}
            />
          </div>
        </Col>
      ))}
    </>
  );
};

export default OTPDigitInput;
