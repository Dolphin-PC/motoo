import { decryptAES256 } from "@/lib/util/util";

describe("decryptAES256", () => {
  it("should decrypt the encrypted string", () => {
    const encrypted =
      "Fom9EqrMeU3Qc+eT3ovhfZHndHfs/E3RmpF0esJCQx6EDbrsDirASVEiV3wDLAkk3iv76meIzayr4mX8ik2E2iUd3A+J39W/lYQIK/gZjUEp29uVThYR7J7e7uycBVvPVDLVvjK6IcAFOEVGRDSk7JbQCSWE3w3Yi4ZkfhTsfNRyC8Q0VUUyaAN6XLMU0HxZQmKRObk1Th0NcMPBnZAXbg==";
    const key = "ydhniptchqvkdpmqjtpuvlkegerhgshe";
    const iv = "dc50d78ebd1e07f4";
    const decrypted = decryptAES256(encrypted, key, iv);
    // Add your assertion here

    console.log(decrypted);
  });
});
