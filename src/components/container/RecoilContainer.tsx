"use client";

import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const RecoilContainer = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContainer;
