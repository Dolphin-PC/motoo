"use client";

import Button from "@/components/buttons/Button";
import Section from "@/components/section/Section";
import { fetchHelperWithData } from "@/lib/api/helper";
import { useTabScroll } from "@/lib/hooks/useTabScroll";
import { EnumCResponseStatus } from "@/pages/api";
import { TGroupLikeStockInfo } from "@/pages/service/stock/StockService";

// XXX렌더링최적화 :: TabScroll할 때, tabOpenStateList atom의 재렌더링 최적화 방법이 없을까.....

const TabScroll = ({
  groupLikeStockList,
}: {
  groupLikeStockList: TGroupLikeStockInfo[];
}) => {
  const { registryRef, handleScroll, headerRef, isOpenTabList } = useTabScroll({
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

      if (res.status === EnumCResponseStatus.SUCCESS) {
        alert(res.message);
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-0" ref={headerRef}>
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
              isOpen={isOpenTabList[idx]}
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
