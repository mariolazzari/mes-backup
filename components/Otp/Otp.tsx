"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { OtpProps } from ".";

export const Otp = ({ qrUrl }: OtpProps) => {
  const [otp, setOtp] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center mb-4">MES OTP Login</CardTitle>
        <CardDescription>
          Utilizza questo QR code in Google Authenticator
        </CardDescription>
      </CardHeader>
      <CardContent className="w-[380px] my-4 flex flex-col items-center">
        <Image
          className="mx-auto"
          src={qrUrl}
          alt="QR Code"
          width={300}
          height={300}
        />

        <InputOTP name="token" onChange={setOtp} maxLength={6} autoFocus>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="cursor-pointer"
          disabled={otp.length < 6}
          type="submit"
        >
          Verifica
        </Button>
      </CardFooter>
    </Card>
  );
};
