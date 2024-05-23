"use client";

import Button from "@/components/buttons/Button";
import Section from "@/components/section/Section";
import { fetchHelperWithData } from "@/lib/api/helper";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import { StatusCode } from "@/pages/api";
import { TGroupLikeStockInfo } from "@/pages/service/stock/StockService";

const TabScroll = ({
  groupLikeStockList,
}: {
  groupLikeStockList: TGroupLikeStockInfo[];
}) => {
  const { registryRef, handleScroll, headerRef } = useTabScroll({
    length: groupLikeStockList.length,
  });

  const handleAdd = async () => {
    const groupName = prompt("추가할 그룹명을 입력해주세요.");

    if (groupName) {
      const res = await fetchHelperWithData<object, null>({
        method: "POST",
        url: "/api/stock/like/group/new",
        data: { groupName },
      });

      if (res.status === StatusCode.SUCCESS) {
        alert(res.message);
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* XXX :: z-index를 준 이유 : Section.Accordion > Button에서 클릭시 transform효과를 주게되는데, 이때 새로운 [스택 컨텍스트]가 생성되어 z-index가 올라가게 됨  */}
      <div className="sticky top-0 z-10" ref={headerRef}>
        <Section.Scroll title="관심주식">
          <div className="sticky left-0">
            <Button primary onClick={handleAdd}>
              +
            </Button>
          </div>
          {groupLikeStockList.map((group, idx) => {
            return (
              <Button key={idx} tabIndex={idx} onClick={handleScroll}>
                {group.groupName}
              </Button>
            );
          })}
        </Section.Scroll>
      </div>
      {groupLikeStockList.map((group, idx) => {
        return (
          <div key={idx} tabIndex={idx} ref={registryRef}>
            <Section.Accordion
              index={idx}
              title={group.groupName}
              noContent={<Button primary>주식 추가하기</Button>}
            >
              {group.likeStockInfoList.length &&
                group.likeStockInfoList.map((likeStock, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <p>
                        {likeStock.name} ({likeStock.stockId})
                      </p>
                      <Button primary>BUY</Button>
                    </div>
                  );
                })}
            </Section.Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default TabScroll;
