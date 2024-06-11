import React from "react";

import RecoilContainer from "@/components/container/RecoilContainer";
import SignInForm from "@/app/(account)/sign-in/components/form";

const SignInPage = () => {
  return (
    <RecoilContainer>
      <h3 className="text-center mb-5 text-primary-500">Sign In</h3>

      <SignInForm />
    </RecoilContainer>
  );
};

export default SignInPage;
