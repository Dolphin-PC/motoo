import { useSetRecoilState } from "recoil";
import { loadingInfoState, loadingState } from "./atom";

const useLoadingPortal = (
  ID: "main"
): {
  setLoading: (newValue: boolean) => void;
  setLoadingInfo: (newValue: {
    loading: boolean;
    id: string;
    message: string;
  }) => void;
} => {
  const setLoadingInfo = useSetRecoilState(loadingInfoState(ID));
  const setLoading = useSetRecoilState(loadingState(ID));

  return {
    setLoading,
    setLoadingInfo,
  };
};

export default useLoadingPortal;
