import { GroupLikeStock } from "./GroupLikeStock";
import { AccountInfo } from "./AccountInfo";

describe("GroupLikeStock", () => {
  describe("create", () => {
    it("should create a new GroupLikeStock instance", async () => {
      // Arrange
      const accountNumber: AccountInfo["accountNumber"] = "1234567890";
      const groupName: GroupLikeStock["groupName"] = "Test Group";

      // Act
      const createdGroupLikeStock = await GroupLikeStock.create({
        accountNumber,
        groupName,
      });

      // Assert
      expect(createdGroupLikeStock).toBeInstanceOf(GroupLikeStock);
      expect(createdGroupLikeStock.accountNumber).toBe(accountNumber);
      expect(createdGroupLikeStock.groupName).toBe(groupName);
    });
  });
});
