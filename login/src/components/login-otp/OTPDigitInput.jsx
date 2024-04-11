import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";

const OTPDigitInput = ({ noOfOtp, setOTP }) => {
  const [otp, setOtp] = useState(Array(noOfOtp).fill(""));
  useEffect(() => {
    // console.log("OTP", otp.join(""));
    setOTP(otp.join(""));
  }, [otp]);
  return (
    <>
      {otp.map((item, index) => (
        <Col className={`col-4${12/noOfOtp}`}>
          <div className="mb-3">
            <label htmlFor="digit1-input" className="visually-hidden">
              {`Digit ${index + 1}`}
            </label>
            <input
              type="text"
              className="form-control bg-light border-light text-center"
              style={{ fontSize: "1.5rem" }}
              maxLength="1"
              id="digit1-input"
              onKeyUp={() => moveToNext(1)}
              onChange={(e) => {
                const otpCopy = [...otp];
                otpCopy[index] = e.target.value;
                setOtp(otpCopy);
              }}
            />
          </div>
        </Col>
      ))}
    </>
  );
};

export default OTPDigitInput;
